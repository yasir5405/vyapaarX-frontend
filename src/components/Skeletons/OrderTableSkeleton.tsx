import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const OrderTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {/* Order ID */}
          <TableCell>
            <Skeleton className="h-4 w-10 animate-pulse" />
          </TableCell>

          {/* Status badge */}
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-md animate-pulse" />
          </TableCell>

          {/* User email */}
          <TableCell>
            <Skeleton className="h-4 w-40 animate-pulse" />
          </TableCell>

          {/* Amount */}
          <TableCell className="text-right">
            <Skeleton className="h-4 w-14 ml-auto animate-pulse" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default OrderTableSkeleton;
