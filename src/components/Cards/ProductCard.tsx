import type { Products } from "@/api/product.api";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/api/cart.api";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const ProductCard = (props: Products) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { refreshCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }
      setLoading(true);

      const res = await addToCart({ productId: props.id, quantity: 1 });

      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }

      toast.success(res.message);
      refreshCart();
    } catch {
      toast.error("Error adding item to your cart.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onClick={() => navigate(`/products/${props.id}`)}
      className="w-full flex flex-col px-2 py-2 gap-1 border-2 transition-all hover:shadow-md rounded-lg cursor-pointer"
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden rounded-md bg-muted">
        <img
          src={props.image ?? "/no-image.png"}
          alt={props.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex items-center justify-between mt-1">
        <h1 className="text-sm md:text-base font-semibold truncate">
          {props.companyName}
        </h1>

        <Button
          size={"icon-xs"}
          className="rounded-full shrink-0"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? <Spinner /> : <Plus />}
        </Button>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
        {props.name}
      </p>

      <p className="text-sm md:text-base font-semibold">₹{props.price}</p>
    </div>
  );
};

export default ProductCard;
