import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { Home, Login, Register } from "./pages";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
