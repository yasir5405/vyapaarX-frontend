import { getProducts, type Products } from "@/api/product.api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
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

const productStatusStyles: Record<"true" | "false", string> = {
  true: "bg-green-100 text-green-800",
  false: "bg-red-100 text-red-800",
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [searchParams] = useSearchParams();

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({
          cursor: Number(cursor),
          limit: Number(limit),
        });

        setProducts(res.data);
        console.log(res.data);
      } catch {
        toast.error("Error in fetching products");
      }
    })();
  }, [cursor, limit]);
  return (
    <div className="w-full flex flex-col gap-7">
      <Button className="self-end">
        <Plus /> Add Product
      </Button>

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
                colSpan={4}
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
                  <Button size={"xs"}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;
