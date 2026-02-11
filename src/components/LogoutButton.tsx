import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

interface LogoutButtonProps {
  type?: "link" | "button";
  size?: "lg" | "sm" | "xs";
}

const LogoutButton = ({ type = "button", size }: LogoutButtonProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } catch {
      toast.error("Error while logging out. Please try again");
    }
    setLoading(false);
  };
  if (type === "button") {
    return (
      <Button size={size} onClick={handleLogout} disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            Logging out...
          </div>
        ) : (
          <>Logout</>
        )}
      </Button>
    );
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
