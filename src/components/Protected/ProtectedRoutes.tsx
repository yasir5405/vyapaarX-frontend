import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "../ui/spinner";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={"/unauthorized"}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
