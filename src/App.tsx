import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import {
  Admin,
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  Unauthorized,
} from "./pages";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import GuestOnly from "./components/GuestOnly";
import ProductsDetails from "./pages/ProductsDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminDashboardHome from "./components/Admin/AdminDashboardHome";

const App = () => {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductsDetails />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
