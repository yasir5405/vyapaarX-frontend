import { getHomeProducts, type HomeProducts } from "@/api/product.api";
import HomePageCarousel from "@/components/carousel/HomePageCarousel";
import HomeSection from "@/components/HomeSection";
import { House, Search, Sparkle, User, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BottomLinks {
  name: string;
  icon: LucideIcon | string;
  href: string;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
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

  const bottomLinks: BottomLinks[] = [
    { name: "Home", icon: House, href: "/" },
    { name: "Browse", icon: Search, href: "/my/orders" },
    { name: "Beauty", icon: Sparkle, href: "/my/orders" },
    { name: "Profile", icon: User, href: "/my" },
  ];

  return (
    <div className="w-full relative">
      <HomePageCarousel />

      <div className="w-full py-4 flex flex-col gap-4 items-center mt-3">
        <img
          className="font-bold text-2xl md:text-4xl"
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JANUARY/30/nvEZ4rsQ_dd989122431e477a9f6cc2d1fe0f3e72.jpg"
        />
      </div>

      {products && (
        <HomeSection
          products={products?.newArrivals}
          title="New Arrivals"
          desc="Discover the latest trends and fresh styles just added to our collection"
        />
      )}

      {products && (
        <HomeSection
          products={products?.menProducts}
          title="Men's"
          desc="Explore our curated collection of men's fashion and accessories"
        />
      )}

      {products && (
        <HomeSection
          products={products?.womenProducts}
          title="Women's"
          desc="Browse elegant styles and trending fashion for women"
        />
      )}

      <div className="w-full fixed left-0 bottom-0 border-t bg-white flex items-center justify-between md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-16 px-5">
        {bottomLinks.map(({ href, icon: Icon, name }: BottomLinks, index) => {
          const isActive = pathname === href;
          return (
            <div
              className={`flex h-full relative flex-col items-center justify-center gap-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-0 ${isActive ? "after:bg-primary" : "after:bg-transparent"} after:h-0.5 ${pathname === "/" || pathname === "/my/profile" ? "after:w-[210%]" : "after:w-[160%]"}`}
              onClick={() => navigate(href)}
              key={index}
            >
              <Icon
                className={`size-5 ${isActive ? "text-primary" : ""}`}
                strokeWidth={1.5}
              />

              <h1 className={`text-sm ${isActive ? "text-primary" : ""}`}>
                {name}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
