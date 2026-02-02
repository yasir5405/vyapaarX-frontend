import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type BreadCrumbProps = {
  productName?: string;
};
const BreadCrumbs = ({ productName }: BreadCrumbProps) => {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      <Link to={"/"} className="hover:text-foreground">
        Home
      </Link>

      {segments.map((segment, idx) => {
        const isLast = idx === segments.length - 1;

        if (!isNaN(Number(segment))) {
          return (
            <span key={idx} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="font-medium text-foreground">
                {productName ?? "Product"}
              </span>
            </span>
          );
        }

        const label =
          segment === "products" ? "Products" : segment.replace("-", " ");

        const href = "/" + segments.slice(0, idx + 1).join("/");

        return (
          <span key={href} className="flex items-center">
            <ChevronRight className="mx-2 h-4 w-4" />

            {isLast ? (
              <span className="font-bold text-foreground capitalize">
                {label}
              </span>
            ) : (
              <Link to={href} className="hover:text-foreground capitalize">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
