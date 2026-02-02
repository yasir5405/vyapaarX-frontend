import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  type?: "link" | "button";
}

const LogoutButton = ({ type = "button" }: LogoutButtonProps) => {
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
  if (type === "button") {
    return <Button onClick={handleLogout}>Logout</Button>;
  }
  return (
    <p
      className="text-sm text-muted-foreground hover:text-black cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </p>
  );
};

export default LogoutButton;
