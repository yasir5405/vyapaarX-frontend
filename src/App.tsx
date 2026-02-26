import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import {
  Addresses,
  Admin,
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  Unauthorized,
  UserDashboard,
  UserProfile,
} from "./pages";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import GuestOnly from "./components/GuestOnly";
import ProductsDetails from "./pages/ProductsDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminDashboardHome from "./components/Admin/AdminDashboardHome";
import UserCart from "./pages/Cart";
import UserDashboardHome from "./components/Dashboard/UserDashboardHome";
import UserOrders from "./components/Dashboard/UserOrders";
import OrderDetails from "./components/Cards/OrderDetails";
import EditProfileForm from "./components/Forms/EditProfileForm";

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
          <Route path="/cart" element={<UserCart />} />
        </Route>
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductsDetails />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["User", "Admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/my" element={<UserDashboard />}>
            <Route index element={<UserDashboardHome />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="profile/edit" element={<EditProfileForm />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
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
