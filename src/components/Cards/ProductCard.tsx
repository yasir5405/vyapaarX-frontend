import type { Products } from "@/api/product.api";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = (props: Products) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-84 h-80 flex flex-col px-4 py-4 gap-1 border-2 transition-all hover:shadow-md rounded-lg cursor-pointer"
      onClick={() => navigate(`/products/${props.id}`)}
    >
      <img
        src={props.image ?? ""}
        className="w-full h-50 rounded-lg object-cover object-center aspect-square"
      />

      <div className="flex items-center justify-between mt-1">
        <h1 className="font-semibold text-base">{props.companyName}</h1>

        <Button size={"icon-sm"} className="rounded-full">
          <Plus />
        </Button>
      </div>

      <p className="text-sm">{props.name}</p>

      <p className="text-sm font-semibold">&#36;{props.price}</p>
    </div>
  );
};

export default ProductCard;
