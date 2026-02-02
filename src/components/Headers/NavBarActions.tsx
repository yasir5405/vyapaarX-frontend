import { Heart, ShoppingCart, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import ProfileMenu from "./ProfileMenu";

type NavBarActionsType = {
  name: string;
  icon: LucideIcon;
};

const NavBarActions = () => {
  const buttons: NavBarActionsType[] = [
    {
      icon: Heart,
      name: "Wishlist",
    },
    {
      icon: ShoppingCart,
      name: "Cart",
    },
  ];
  return (
    <div className="h-full flex items-center justify-center gap-1">
      <ProfileMenu />
      {buttons.map((button, idx) => (
        <ButtonGroup orientation={"vertical"} key={idx}>
          <Button
            variant={"ghost"}
            className="flex flex-col h-full text-xs font-semibold px-6 py-4 md:px-4 md:py-2"
          >
            <button.icon /> <p className="hidden md:block">{button.name}</p>
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
};

export default NavBarActions;
