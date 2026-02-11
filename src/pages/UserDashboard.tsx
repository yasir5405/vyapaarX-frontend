import UserDashboardHeader from "@/components/Dashboard/UserDashboardHeader";
import UserDashboardSidebar from "@/components/Dashboard/UserDashboardSidebar";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="py-2 min-h-dvh w-full px-0 md:py-10 md:px-40">
      <div className="w-full">
        <UserDashboardHeader />

        <div className="h-full w-full flex">
          <UserDashboardSidebar />

          <div className="h-full flex-1 p-0 md:p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
