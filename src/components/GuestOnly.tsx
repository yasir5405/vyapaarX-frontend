import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";

const GuestOnly = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <GlobalLoader />;
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default GuestOnly;
