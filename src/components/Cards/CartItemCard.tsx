import { deleteCartItem, updateCart, type CartItem } from "@/api/cart.api";
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

  const [loading, setLoading] = useState(false);

  const handleDeleteItemFromCart = async (productId: number) => {
    try {
      setLoading(true);
      const res = await deleteCartItem({ productId });
      if (!res.success) {
        toast.error(res.error?.message ?? res.message);
        return;
      }
      toast.success(res.message);
      onSuccess();
    } catch {
      toast.error("Error removing item. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="border border-muted-foreground p-1 rounded-full shadow-md">
            <Spinner stroke="#ff7e5f" />
          </div>
        </div>
      )}
      <div className="w-full py-3 px-2 border flex flex-col sm:flex-row gap-3 relative">
        <Button
          variant={"link"}
          className="absolute top-2 right-2 z-10"
          onClick={() => handleDeleteItemFromCart(product.id)}
        >
          <X className="size-4.5" />
        </Button>
        <img
          src={product.image ?? "/no-image.png"}
          className="w-full sm:w-28 md:w-36 h-40 sm:h-28 md:h-36 object-cover border"
        />

        <div className="flex flex-col flex-1">
          <p className="font-semibold text-sm md:text-base pr-8">
            {product.name}
          </p>
          <p className="line-clamp-2 sm:line-clamp-1 text-xs sm:text-sm text-muted-foreground mt-1">
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

          <p className="text-sm text-foreground mt-1 font-semibold">
            ₹{price * quantity}
          </p>

          <p className="text-xs sm:text-sm mt-1 text-neutral-400">
            Added to cart on:{" "}
            {new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="border border-muted-foreground p-1 rounded-full shadow-md">
            <Spinner stroke="#ff7e5f" />
          </div>
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className="font-semibold text-xs sm:text-sm"
            disabled={loading}
          >
            Qty: {quantity}
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="px-4 sm:px-6">
          <SheetHeader>
            <SheetTitle className="text-base sm:text-lg">
              Select Quantity
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <SheetClose asChild className="pb-7 pt-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto">
              {Array.from({ length: 10 }).map((_, idx) => {
                const value = idx + 1;
                return (
                  <div
                    key={idx}
                    className={`border h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 flex items-center justify-center rounded-full cursor-pointer text-sm sm:text-base transition-colors hover:bg-muted ${quantity === idx + 1 ? "border-primary border-2 bg-primary/5 font-semibold" : "border-border"}`}
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
