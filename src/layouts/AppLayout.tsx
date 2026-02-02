import Navbar from "@/components/Headers/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-dvh w-full relative pt-24 px-4 md:pt-26 md:px-12">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
