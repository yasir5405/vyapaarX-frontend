import { getProducts, type Products } from "@/api/product.api";
import ProductCard from "@/components/Cards/ProductCard";
import HomePageCarousel from "@/components/carousel/HomePageCarousel";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [searchParams] = useSearchParams();

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({
          cursor: Number(cursor),
          limit: Number(limit),
        });

        setProducts(res.data);
        console.log(res.data);
      } catch {
        console.log("Error fetching");
      }
    };

    fetchProducts();
  }, [cursor, limit]);
  return (
    <div className="h-dvh w-full">
      <HomePageCarousel />

      <div className="w-full py-4 flex flex-col gap-4 items-center mt-6">
        <h1 className="font-bold text-4xl">Top Products</h1>

        <div className="w-full grid grid-cols-4 gap-4">
          {products &&
            products
              .slice(0, 8)
              .map((product, idx) => <ProductCard {...product} key={idx} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
