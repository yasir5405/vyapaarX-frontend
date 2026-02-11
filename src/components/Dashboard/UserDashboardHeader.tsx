import { useAuth } from "@/context/AuthContext";

const UserDashboardHeader = () => {
  const { user } = useAuth();
  return (
    <div className="w-full py-3 hidden md:flex flex-col border-b border-neutral-300">
      <h1 className="font-bold">Account</h1>
      <p className="text-xs text-muted-foreground">{user?.name}</p>
    </div>
  );
};

export default UserDashboardHeader;
