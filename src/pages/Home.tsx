import { getProducts } from "@/api/product.api";
import HomePageCarousel from "@/components/carousel/HomePageCarousel";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");

  const fetchProducts = async () => {
    try {
      const res = await getProducts({
        cursor: Number(cursor),
        limit: Number(limit),
      });

      console.log(res.data);
    } catch {
      console.log("Error fetching");
    }
  };
  return (
    <div className="h-dvh w-full">
      {/* <h1>Welcome {user?.name}</h1>
      <LogoutButton />

      <Button onClick={fetchProducts}>Fetch products</Button> */}

      <HomePageCarousel />
    </div>
  );
};

export default Home;
