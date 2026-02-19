import { Banknote, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Order } from "@/api/order.api";
import { Separator } from "../ui/separator";

const OrderPriceBreakDown = ({ order }: { order: Order }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden md:block">
        <ChevronDown className="size-5 text-primary cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Payment Information
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default OrderPriceBreakDown;
