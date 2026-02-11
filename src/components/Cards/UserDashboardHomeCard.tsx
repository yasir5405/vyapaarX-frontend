import { ChevronRight, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  icon: LucideIcon;
  header: string;
  description: string;
  href: string;
}

const UserDashboardHomeCard = ({
  description,
  header,
  icon: Icon,
  href,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="md:h-60 md:w-56 w-full py-1 px-2 md:px-0 md:py-0 border border-neutral-200 md:border-neutral-300 hover:bg-neutral-100 cursor-pointer flex md:flex-col items-center md:justify-center gap-3 md:gap-0 relative"
      onClick={() => navigate(href)}
    >
      <Icon className="size-6 md:size-7" strokeWidth={1} />

      <div className="flex justify-center flex-col md:items-center">
        <h1 className="font-semibold text-sm mt-3 md:text-center">{header}</h1>
        <p className="text-muted-foreground text-xs md:text-center">
          {description}
        </p>
      </div>

      <ChevronRight
        className="size-4 absolute right-3 top-1/2 -translate-x-1/2 block md:hidden"
        strokeWidth={1}
      />
    </div>
  );
};

export default UserDashboardHomeCard;
