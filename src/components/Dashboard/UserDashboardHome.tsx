import {
  FilePen,
  LocationEdit,
  PackageCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import UserDashboardHomeCard from "../Cards/UserDashboardHomeCard";
import { Button } from "../ui/button";
import LogoutButton from "../LogoutButton";

interface dashboardCardItemsInterface {
  icon: LucideIcon;
  header: string;
  description: string;
  href: string;
}

const UserDashboardHome = () => {
  const dashboardCardItems: dashboardCardItemsInterface[] = [
    {
      icon: PackageCheck,
      header: "Orders",
      description: "Check your order status",
      href: "/my/orders",
    },
    {
      icon: ShoppingBag,
      header: "Cart",
      description: "All your cart items",
      href: "/cart",
    },
    {
      icon: LocationEdit,
      header: "Saved Addresses",
      description: "Save addresses for a hassle free checkout",
      href: "/my/addresses",
    },
    {
      icon: FilePen,
      header: "Profile Details",
      description: "Change your profile details",
      href: "/my/profile/edit-profile",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-9">
      <div className="w-full p-6 bg-neutral-100 flex md:justify-between sm:items-center justify-center">
        <img
          src="https://constant.myntassets.com/mymyntra/assets/img/default-image.png"
          alt=""
          className="h-40 w-40"
        />

        <Button
          size={"xs"}
          variant={"outline"}
          className="uppercase border-neutral-400 hover:bg-transparent hidden md:flex"
        >
          Edit Profile
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
        {dashboardCardItems.map((item, idx) => (
          <UserDashboardHomeCard
            description={item.description}
            header={item.header}
            icon={item.icon}
            key={idx}
            href={item.href}
          />
        ))}
      </div>

      <LogoutButton size="lg" />
    </div>
  );
};

export default UserDashboardHome;
