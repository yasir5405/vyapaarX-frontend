import type { Order } from "@/api/order.api";
import { ChevronRight, PackageCheck, Star } from "lucide-react";

const UserOrderCard = (order: Order) => {
  return (
    <div className="w-full bg-white p-4 flex flex-col rounded-md">
      <div className="flex gap-2 items-center py-1">
        <PackageCheck />

        <div className="flex flex-col h-full justify-center">
          <p className="text-xs font-semibold text-emerald-600">
            {order.status}
          </p>

          <p className="text-xs text-neutral-600">
            On{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="w-full p-4 flex gap-4 flex-col bg-neutral-100">
        <div className="w-full h-full py-3 flex gap-4 cursor-pointer hover:bg-neutral-200 relative">
          <ChevronRight className="size-5 absolute top-1/2 right-3 -translate-y-1/2" />
          <img
            src={order.orderItems[0]?.product.image ?? "/no-image.png"}
            alt=""
            className="w-16 h-16 object-cover rounded"
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-semibold">
              {order.orderItems[0].product.companyName}
            </h1>

            <p className="text-xs text-muted-foreground">
              {order.orderItems[0].product.description}
            </p>
            <p className="text-xs text-muted-foreground font-semibold">
              Total amount: ₹{order.totalAmount}
            </p>
          </div>
        </div>

        <ul className="list-disc ml-6">
          <li className="text-sm text-muted-foreground">
            The product was bought on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </li>
        </ul>

        <div className="w-full flex flex-col gap-4">
          <div className="ml-2 w-full flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className="size-4 cursor-pointer text-primary"
                />
              ))}
            </div>

            <p className="mr-2 text-sm font-semibold text-primary">
              Write Review
            </p>
          </div>

          <p className="ml-2 text-sm">
            Write Review &{" "}
            <span className="font-semibold text-emerald-600">
              win Cashback!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
