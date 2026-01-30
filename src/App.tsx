import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { Admin, Home, Login, Register, Unauthorized } from "./pages";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import GuestOnly from "./components/GuestOnly";

const App = () => {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
