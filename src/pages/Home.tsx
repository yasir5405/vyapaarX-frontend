import { getHomeProducts, type HomeProducts } from "@/api/product.api";
import HomePageCarousel from "@/components/carousel/HomePageCarousel";
import HomeSection from "@/components/HomeSection";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [products, setProducts] = useState<HomeProducts | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getHomeProducts();

        if (!res.success) {
          toast.error(res.error?.message ?? res.message);
          return;
        }

        setProducts(res.data);
        // toast.success(res.message);
        console.log(res.message);
        console.log(res.data);
      } catch {
        console.log("Error fetching");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <HomePageCarousel />

      <div className="w-full py-4 flex flex-col gap-4 items-center mt-3">
        <img
          className="font-bold text-2xl md:text-4xl"
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JANUARY/30/nvEZ4rsQ_dd989122431e477a9f6cc2d1fe0f3e72.jpg"
        />
      </div>

      {products && (
        <HomeSection products={products?.newArrivals} title="New Arrivals" desc="Discover the latest trends and fresh styles just added to our collection" />
      )}

      {products && (
        <HomeSection products={products?.menProducts} title="Men's" desc="Explore our curated collection of men's fashion and accessories" />
      )}

      {products && (
        <HomeSection products={products?.womenProducts} title="Women's" desc="Browse elegant styles and trending fashion for women" />
      )}
    </div>
  );
};

export default Home;
