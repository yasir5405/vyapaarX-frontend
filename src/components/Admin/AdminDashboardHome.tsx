import { IndianRupee, Package, Receipt, Users } from "lucide-react";
import AdminHomeCard from "./AdminHomeCard";
import AdminHomeOrderTables from "./AdminHomeOrderTables";
import { getAdminOverview, type AdminOverview } from "@/api/admin.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminHomeCardSkeleton from "../Skeletons/AdminHomeCardSkeleton";

const AdminDashboardHome = () => {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAdminOverview();
        if (res.success) setOverview(res.data);
      } catch {
        toast.error("Error while fetching Admin Overview");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Reports</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <AdminHomeCardSkeleton />
            <AdminHomeCardSkeleton />
            <AdminHomeCardSkeleton />
            <AdminHomeCardSkeleton />
          </>
        ) : (
          <>
            <AdminHomeCard
              name="Products"
              icon={Package}
              count={overview?.productCount ?? 0}
              trend={+2}
              period="this week"
            />

            <AdminHomeCard
              name="Orders"
              icon={Receipt}
              count={overview?.orderCount ?? 0}
              trend={-1}
              period="today"
            />

            <AdminHomeCard
              name="Users"
              icon={Users}
              count={overview?.userCount ?? 0}
              trend={+3}
              period="this month"
            />

            <AdminHomeCard
              name="Revenue"
              icon={IndianRupee}
              count={`₹${overview?.revenue.toLocaleString("en-IN") ?? 0}`}
              trend={+18}
              period="this month"
            />
          </>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <AdminHomeOrderTables />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
