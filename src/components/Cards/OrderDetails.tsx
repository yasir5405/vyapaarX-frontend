import { getOrder, type getOrderParams, type Order } from "@/api/order.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CircleCheck, Headset, PackageCheck, Star } from "lucide-react";
import OrderDetailsSkeleton from "../Skeletons/OrderDetailsSkeleton";

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
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
