import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  icon: LucideIcon;
  count: number | string;

  trend?: number;
  period?: string;
}
const AdminHomeCard = ({ count, icon: Icon, name, period, trend }: Props) => {
  const isPositive = typeof trend === "number" && trend >= 0;

  const navigate = useNavigate();

  return (
    <div
      className="border border-neutral-200 h-20 flex gap-3 items-center flex-1 p-4 rounded-md cursor-pointer hover:border-neutral-300"
      onClick={() => navigate(`/admin/${name.toLowerCase()}`)}
    >
      <div className="rounded-full bg-primary h-10 w-10 flex items-center justify-center">
        <Icon strokeWidth={2} className="text-white" />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase text-accent-foreground">
          {name}
        </p>

        <p className="font-semibold font-sm text-muted-foreground">{count}</p>

        {trend !== undefined && period && (
          <p
            className={`text-xs font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(trend)} {period}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminHomeCard;
