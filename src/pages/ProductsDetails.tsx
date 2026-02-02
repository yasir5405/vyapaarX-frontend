import { getProduct, type Products } from "@/api/product.api";
import BreadCrumbs from "@/components/Headers/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductsDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Products | null>(null);

  useEffect(() => {
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
      <div className="flex w-full py-4">
        <img
          src={product?.image ?? ""}
          alt={product?.name}
          className="w-[58%] h-150 object-cover object-center"
        />

        <div className="flex flex-col w-[42%] h-full px-6 py-3 gap-6">
          <div className="flex flex-col w-full">
            <h1 className="font-semibold text-2xl">{product?.companyName}</h1>
            <h1 className="font-medium text-xl text-neutral-500">
              {product?.name}
            </h1>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full gap-4 items-center">
              <p className="font-bold text-2xl">&#8377;{product?.price}</p>

              <p className="text-xl text-zinc-400">
                MRP{" "}
                <span className="line-through">&#8377;{product?.price}</span>
              </p>

              <p className="text-xl font-semibold text-primary">(60% OFF)</p>
            </div>

            <p className="font-semibold text-primary text-xs">
              Inclusive of all taxes
            </p>

            <div className="flex w-full items-center gap-5">
              <Button className="flex-1">
                <ShoppingBag /> ADD TO CART
              </Button>
              <Button variant={"outline"} className="flex-1 capitalize">
                <Heart /> WISHLIST
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col w-full gap-3">
            <h1 className="font-semibold uppercase flex items-center gap-2">
              Product Details <FileText size={16} strokeWidth={1} />{" "}
            </h1>

            <p className="font-extralight text-neutral-500">
              {product?.description}
            </p>

            <h1 className="font-semibold flex items-center gap-2">
              Highlights
            </h1>

            <ul className="list-disc pl-4">
              {product?.highlights.map((point, idx) => (
                <li className="text-sm" key={idx}>
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
