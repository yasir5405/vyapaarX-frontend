import { getProducts, type Products } from "@/api/product.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import OrderTableSkeleton from "../Skeletons/OrderTableSkeleton";
import AddProductForm from "../Forms/AddProductForm";
import UpdateProductForm from "../Forms/UpdateProductForm";

const productStatusStyles: Record<"true" | "false", string> = {
  true: "bg-green-100 text-green-800",
  false: "bg-red-100 text-red-800",
};

const AdminProducts = () => {
  const LIMIT = 10;
  const [products, setProducts] = useState<Products[] | null>(null);

  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [cursorHistory, setCursorHistory] = useState<(number | undefined)[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProducts({
          limit: LIMIT,
          cursor,
        });

        setProducts(res.data);
        setNextCursor(res.nextCursor ?? undefined);
        console.log(res.data);
      } catch {
        toast.error("Error in fetching products");
      } finally {
        setLoading(false);
      }
    })();
  }, [cursor, refreshKey]);
  return (
    <div className="w-full flex flex-col gap-7">
      <AddProductForm onSuccess={() => setRefreshKey((k) => k + 1)} />

      <Table>
        <TableCaption>All products</TableCaption>

        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-25">Product Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!products && <OrderTableSkeleton />}

          {products?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No products found
              </TableCell>
            </TableRow>
          )}

          {products &&
            products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">#{product.id}</TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {product.name}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {product.companyName}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      productStatusStyles[
                        String(product.isActive) as "true" | "false"
                      ]
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell className="text-right font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </TableCell>

                <TableCell className="text-right">
                  <UpdateProductForm
                    product={product}
                    onSuccess={() => setRefreshKey((k) => k + 1)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          disabled={!cursor || loading}
          onClick={() => {
            setCursor(undefined);
            setCursorHistory([]);
          }}
        >
          First Page
        </Button>

        <Button
          variant="outline"
          disabled={cursorHistory.length === 0 || loading}
          onClick={() => {
            const newHistory = [...cursorHistory];
            const previousCursor = newHistory.pop();
            setCursorHistory(newHistory);
            setCursor(previousCursor);
          }}
        >
          Previous
        </Button>

        <Button
          disabled={!nextCursor || loading}
          onClick={() => {
            setCursorHistory([...cursorHistory, cursor]);
            setCursor(nextCursor);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminProducts;
