import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } catch {
      toast.error("Error while logging out. Please try again");
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
