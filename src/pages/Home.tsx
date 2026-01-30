import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <LogoutButton />
    </div>
  );
};

export default Home;
