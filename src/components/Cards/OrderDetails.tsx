import { getOrder, type getOrderParams, type Order } from "@/api/order.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Banknote,
  CircleCheck,
  Headset,
  Mail,
  PackageCheck,
  Star,
} from "lucide-react";
import OrderDetailsSkeleton from "../Skeletons/OrderDetailsSkeleton";
import { Separator } from "../ui/separator";
import OrderPriceBreakDown from "./OrderPriceBreakDown";
import OrderPriceBreakDownMobile from "./OrderPriceBreakDownMobile";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchOrder = async ({ orderId }: getOrderParams) => {
      try {
        setLoading(true);
        const res = await getOrder({ orderId });

        if (!res.success || !res.data) {
          toast.error(res.error?.message ?? res.message);
          return;
        }

        setOrder(res.data);
      } catch {
        toast.error("Error fetching order. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder({ orderId: Number(orderId) });
  }, [orderId]);

  return (
    <div className="w-full flex flex-col">
      {loading || !order ? (
        <OrderDetailsSkeleton />
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-18 relative">
          {/* Help button */}
          <Button
            className="font-semibold absolute top-0 right-2"
            size={"sm"}
            variant={"secondary"}
          >
            Help
            <Headset />
          </Button>
          {order.orderItems.length === 1 ? (
            <>
              <img
                src={order?.orderItems[0].product.image ?? "/no-image.png"}
                className="h-36 w-36 object-cover rounded-md"
                onClick={() =>
                  navigate(`/products/${order?.orderItems[0].product.id}`)
                }
              />

              <h1 className="font-semibold text-sm mt-3 text-center">
                {order?.orderItems[0].product.companyName}
              </h1>

              <p className="text-sm text-muted-foreground text-center line-clamp-3 mt-1 max-w-[90%]">
                {order?.orderItems[0].product.description}
              </p>
            </>
          ) : (
            <div className="w-full mt-4">
              <div className="w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden">
                {order.orderItems.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className="flex gap-4 px-4 py-5 cursor-pointer group"
                      onClick={() => navigate(`/products/${item.product.id}`)}
                    >
                      <img
                        src={item.product.image ?? "/no-image.png"}
                        className="h-20 w-20 object-cover rounded-md shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
                        alt={item.product.companyName}
                      />

                      <div className="flex flex-col flex-1 min-w-0">
                        <h2 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">
                          {item.product.companyName}
                        </h2>

                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {item.product.description}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm font-semibold tracking-tight">
                            ₹ {item.price}
                          </p>

                          <span className="text-xs text-muted-foreground">
                            Qty × {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {index !== order.orderItems.length - 1 && (
                      <div className="mx-4 border-t" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex gap-2 items-center py-7 px-4 bg-emerald-500 mt-7">
            <PackageCheck className="text-white md:text-black" />
            <div className="h-full flex flex-col justify-center">
              <p className="text-xs font-semibold text-white flex items-center gap-1">
                {order?.status}
                <CircleCheck className="size-4" />
              </p>

              <p className="text-xs text-white">
                On{" "}
                {order &&
                  new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ul className="list-disc font-semibold w-full">
              <li className="text-sm text-muted-foreground">
                The product was bought on{" "}
                {order &&
                  new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-1 mt-8">
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

          <div className="w-full bg-white flex flex-col py-6 px-3.5 mt-6 gap-4">
            <h1 className="font-semibold text-base">Delivery Address</h1>

            <div className="flex flex-col w-full gap-2">
              <p className="flex gap-2 text-xs md:text-sm font-semibold">
                {order.user.name} <Separator orientation="vertical" />{" "}
                {order.user.email}
              </p>

              <p className="text-sm md:text-base text-muted-foreground">
                {order.addressSnapShot.addressLine},{" "}
                {order.addressSnapShot.city}, {order.addressSnapShot.state} -{" "}
                {order.addressSnapShot.postalCode}
              </p>
            </div>
          </div>

          <div className="w-full bg-white flex flex-col py-6 px-3.5 mt-6 gap-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-sm">Total Order Price</h1>

              <p className="font-semibold text-sm flex items-center justify-center gap-2">
                ₹ {order.totalAmount}.00 <OrderPriceBreakDown order={order} />{" "}
                <OrderPriceBreakDownMobile order={order} />
              </p>
            </div>

            <div className="w-full py-3 px-5 flex items-center gap-7 bg-muted rounded-md">
              <Banknote strokeWidth={1.1} />

              <p className="text-sm capitalize">{order.status.toLowerCase()}</p>
            </div>

            <Separator />

            <Button
              variant={"outline"}
              className="hover:bg-transparent font-semibold"
              size={"lg"}
            >
              Get Invoice
            </Button>
          </div>

          <div className="w-full bg-white flex flex-col py-6 px-3.5 mt-6 gap-4">
            <h1 className="font-semibold text-base">Updates sent to</h1>

            <p className="text-sm flex items-center gap-2">
              <Mail strokeWidth={1.4} className="size-4.5" />

              {order.user.email}
            </p>
          </div>

          <div className="w-full bg-white flex flex-col py-6 px-3.5 mt-6 gap-4">
            <p className="text-muted-foreground text-sm">
              Order ID # {order.id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
