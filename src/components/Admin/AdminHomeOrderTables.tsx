import { getAllOrders, type Order } from "@/api/order.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OrderTableSkeleton from "../Skeletons/OrderTableSkeleton";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const AdminHomeOrderTables = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        if (res.success && res.data?.orders) {
          setOrders(res.data?.orders);
        } else {
          setOrders([]);
          toast.error(res.error?.message ?? res.message);
        }
      } catch {
        setOrders([]);
        console.log("Error while fetching orders");
      }
    };

    fetchOrders();
  }, []);

  const totalAmount =
    orders?.reduce((sum, order) => sum + order.totalAmount, 0) ?? 0;

  return (
    <Table>
      <TableCaption>Recent Orders</TableCaption>

      <TableHeader>
        <TableRow className="bg-muted/40">
          <TableHead className="w-25">Order Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!orders && <OrderTableSkeleton />}

        {orders?.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-6 text-muted-foreground"
            >
              No orders found
            </TableCell>
          </TableRow>
        )}

        {orders &&
          orders.slice(0, 3).map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {order.user.email}
              </TableCell>
              <TableCell className="text-right font-medium">
                {order.totalAmount}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      <TableFooter>
        <TableRow className="bg-muted/50">
          <TableCell colSpan={3} className="font-semibold">
            Total
          </TableCell>
          <TableCell className="text-right font-semibold">
            ₹{totalAmount.toLocaleString("en-IN")}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default AdminHomeOrderTables;
