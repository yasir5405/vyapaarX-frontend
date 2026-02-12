import { Search, Settings2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserOrderCard from "../Cards/UserOrderCard";
import { useEffect, useState } from "react";
import { getOrders, type OrderResponse } from "@/api/order.api";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useAuth } from "@/context/AuthContext";

const UserOrders = () => {
  const [orders, setOrders] = useState<OrderResponse["orders"]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrders();

        if (!res.success || !res.data) {
          toast.error(res.error?.message ?? res.message);
          return;
        }

        setOrders(res.data);
      } catch {
        toast.error("Error fetching orders. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-2 py-2">
        <div className="md:flex flex-col hidden">
          <h1 className="font-semibold text-lg">All orders</h1>
          <p className="text-sm">from anytime</p>
        </div>

        <div className="flex gap-2 pb-3 md:py-0">
          <InputGroup className="w-full md:min-w-sm">
            <InputGroupInput placeholder="Search in orders" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button
            variant={"outline"}
            className="hover:bg-transparent font-semibold"
          >
            <Settings2 />
            FILTER
          </Button>
        </div>
      </div>

      <Separator className="hidden md:block" />

      <div className="w-full flex flex-col gap-6 md:gap-2 bg-neutral-100">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <Spinner />
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No orders found
          </div>
        ) : (
          orders.map((order) => <UserOrderCard key={order.id} {...order} />)
        )}
      </div>
    </div>
  );
};

export default UserOrders;
