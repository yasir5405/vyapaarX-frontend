import type { Products } from "@/api/product.api";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = (props: Products) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${props.id}`)}
      className="w-full h-96 flex flex-col px-2 py-2 gap-1 border-2 transition-all hover:shadow-md rounded-lg cursor-pointer"
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden rounded-md bg-muted">
        <img
          src={props.image ?? ""}
          alt={props.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex items-center justify-between mt-1">
        <h1 className="text-sm md:text-base font-semibold truncate">
          {props.companyName}
        </h1>

        <Button size={"icon-xs"} className="rounded-full shrink-0">
          <Plus />
        </Button>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
        {props.name}
      </p>

      <p className="text-sm md:text-base font-semibold">&#36;{props.price}</p>
    </div>
  );
};

export default ProductCard;
