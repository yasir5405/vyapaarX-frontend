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
    <div className="w-full">
      <HomePageCarousel />

      <div className="w-full py-4 flex flex-col gap-4 items-center mt-3">
        <img
          className="font-bold text-2xl md:text-4xl"
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JANUARY/30/nvEZ4rsQ_dd989122431e477a9f6cc2d1fe0f3e72.jpg"
        />

        <div className="w-full max-w-8xl px-0 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 md:gap-5">
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
