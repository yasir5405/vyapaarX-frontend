import { Banknote, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import type { Order } from "@/api/order.api";
import { Separator } from "../ui/separator";

const OrderPriceBreakDownMobile = ({ order }: { order: Order }) => {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <ChevronDown className="size-5 text-primary cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Payment information</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col px-4 pb-4 gap-3">
          <div className="w-full flex flex-col text-sm gap-2">
            {order.orderItems.map((item) => (
              <div className="flex items-center justify-between">
                <p className="line-clamp-1 text-muted-foreground">
                  {item.quantity} x {item.productName}
                </p>

                <p className="font-semibold">₹ {item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <p className="line-clamp-1 text-muted-foreground">Platform Fee</p>

              <p className="font-semibold">₹ 23</p>
            </div>
          </div>

          <Separator />

          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Total Paid</p>

              <p className="font-semibold">₹ {order.totalAmount}</p>
            </div>

            <div className="w-full py-3 px-5 flex items-center gap-7 bg-muted rounded-md">
              <Banknote strokeWidth={1.1} />

              <p className="text-sm capitalize">{order.status.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderPriceBreakDownMobile;
