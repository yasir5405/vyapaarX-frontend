import { updateCart, type CartItem } from "@/api/cart.api";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

const CartItemCard = ({
  item,
  onSuccess,
}: {
  item: CartItem;
  onSuccess: () => void;
}) => {
  const { price, product, quantity } = item;
  return (
    <div className="w-full py-3 px-2 border flex gap-3 relative">
      <X className="size-4.5 absolute top-2 right-2 cursor-pointer" />
      <img
        src={product.image ?? "/no-image.png"}
        className="w-36 h-36 object-cover border"
      />

      <div className="flex flex-col">
        <p className="font-semibold text-sm">{product.name}</p>
        <p className="line-clamp-1 max-w-62.5 text-sm text-muted-foreground mt-1">
          {product.description}
        </p>
        <p className="line-clamp-1 text-xs text-neutral-400 font-extralight">
          Sold by: {product.companyName}
        </p>

        <p className="mt-2">
          <QuantityChanger
            productId={product.id}
            quantity={quantity}
            onSuccess={onSuccess}
          />
        </p>

        <p className="text-sm text-foreground mt-1 font-semibold">₹{price}</p>

        <p className="text-sm mt-1 text-neutral-400">
          Added to cart on:{" "}
          {new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;

const QuantityChanger = ({
  quantity,
  productId,
  onSuccess,
}: {
  quantity: number;
  productId: number;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const handleUpdateCart = async (value: number) => {
    try {
      setLoading(true);
      const res = await updateCart({ productId, quantity: value });
      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }
      toast.success("Quantity updated successfully");
      onSuccess();
    } catch {
      toast.error("Error while updating quantity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full Screen Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Spinner />
            <p className="text-sm text-white">Updating cart...</p>
          </div>
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className="font-semibold text-sm"
            disabled={loading}
          >
            Qty: {quantity}
            <ChevronDown />
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Select Quantity</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <SheetClose asChild className="pb-7">
            <div className="flex items-center justify-center gap-4">
              {Array.from({ length: 10 }).map((_, idx) => {
                const value = idx + 1;
                return (
                  <div
                    key={idx}
                    className={`border h-12 w-12 flex items-center justify-center rounded-full cursor-pointer ${quantity === idx + 1 ? "border-primary" : "border-black"}`}
                    onClick={() => handleUpdateCart(value)}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
};
