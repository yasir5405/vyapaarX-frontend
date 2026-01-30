import { getMe, type User } from "@/api/auth.api";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const findUser = async () => {
      const u = await getMe();
      setUser(u.data);
    };
    findUser();
  });
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
    </div>
  );
};

export default Home;
