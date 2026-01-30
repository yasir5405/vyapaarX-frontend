import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-dvh w-full">
      <div>Navbar</div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
