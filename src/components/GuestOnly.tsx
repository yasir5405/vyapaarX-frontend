import { useAuth } from "@/context/AuthContext";
import { Spinner } from "./ui/spinner";
import { Navigate, Outlet } from "react-router-dom";

const GuestOnly = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default GuestOnly;
