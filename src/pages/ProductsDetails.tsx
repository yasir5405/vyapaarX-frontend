import { addToCart } from "@/api/cart.api";
import { getProduct, type Products } from "@/api/product.api";
import BreadCrumbs from "@/components/Headers/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { FileText, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductsDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Products | null>(null);

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }
      setLoading(true);

      const res = await addToCart({ productId: product!.id, quantity: 1 });

      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }

      toast.success(res.message);
    } catch {
      toast.error("Error adding item to your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await getProduct(productId!);

        setProduct(res.data);
        console.log(res.data);
      } catch {
        console.log("Error fetching");
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="w-full flex flex-col">
      <BreadCrumbs productName={product?.name} />
      <div className="flex flex-col md:flex-row w-full py-4 gap-4 md:gap-0">
        <img
          src={product?.image ?? "/no-image.png"}
          alt={product?.name}
          className="w-full md:w-[58%] h-96 md:h-150 object-cover object-center rounded-lg md:rounded-none"
        />

        <div className="flex flex-col w-full md:w-[42%] h-full px-0 md:px-6 py-3 gap-4 md:gap-6">
          <div className="flex flex-col w-full">
            <h1 className="font-semibold text-xl md:text-2xl">
              {product?.companyName}
            </h1>
            <h1 className="font-medium text-lg md:text-xl text-neutral-500">
              {product?.name}
            </h1>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap w-full gap-2 md:gap-4 items-center">
              <p className="font-bold text-xl md:text-2xl">
                &#8377;{product?.price}
              </p>

              <p className="text-lg md:text-xl text-zinc-400">
                MRP{" "}
                <span className="line-through">&#8377;{product?.price}</span>
              </p>

              <p className="text-lg md:text-xl font-semibold text-primary">
                (60% OFF)
              </p>
            </div>

            <p className="font-semibold text-primary text-xs">
              Inclusive of all taxes
            </p>

            <div className="flex w-full items-center gap-3 md:gap-5">
              <Button
                className="flex-1 text-sm md:text-base"
                disabled={loading}
                onClick={handleAddToCart}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner /> Adding to cart...
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" /> ADD TO
                    CART
                  </>
                )}
              </Button>
              <Button
                variant={"outline"}
                className="flex-1 capitalize text-sm md:text-base"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" /> WISHLIST
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col w-full gap-3">
            <h1 className="font-semibold text-sm md:text-base uppercase flex items-center gap-2">
              Product Details <FileText size={16} strokeWidth={1} />{" "}
            </h1>

            <p className="font-extralight text-sm md:text-base text-neutral-500">
              {product?.description}
            </p>

            <h1 className="font-semibold text-sm md:text-base flex items-center gap-2">
              Highlights
            </h1>

            <ul className="list-disc pl-4">
              {product?.highlights.map((point, idx) => (
                <li className="text-xs md:text-sm" key={idx}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
