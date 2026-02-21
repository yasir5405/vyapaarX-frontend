import type { Products } from "@/api/product.api";
import ProductCard from "./Cards/ProductCard";

interface Props {
  title: string;
  desc: string;
  products: Products[];
}
const HomeSection = ({ title, products, desc }: Props) => {
  return (
    <div className="w-full flex flex-col my-10 gap-1.5">
      <h1 className="text-lg md:text-3xl font-semibold uppercase">{title}</h1>
      <p className="text-xs md:text-sm font-semibold text-muted-foreground block md:hidden">
        {desc}
      </p>

      <div className="w-full max-w-8xl px-0 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 md:mt-7 md:gap-10">
        {products &&
          products
            .slice(0, 8)
            .map((product, idx) => <ProductCard {...product} key={idx} />)}
      </div>
    </div>
  );
};

export default HomeSection;
