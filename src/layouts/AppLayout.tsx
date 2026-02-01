import Navbar from "@/components/Headers/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-dvh w-full relative py-26 px-12">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
