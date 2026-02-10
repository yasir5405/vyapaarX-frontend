import { ShoppingCart, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

type NavBarActionsType = {
  name: string;
  icon: LucideIcon;
};

const NavBarActions = () => {
  const buttons: NavBarActionsType[] = [
    {
      icon: ShoppingCart,
      name: "Cart",
    },
  ];

  const { count } = useCart();

  
  return (
    <div className="h-full flex items-center justify-center gap-1">
      <ProfileMenu />
      {buttons.map((button, idx) => (
        <ButtonGroup orientation={"vertical"} key={idx}>
          <Button variant={"ghost"} asChild className="hover:bg-transparent">
            <Link
              className="flex flex-col h-full text-xs font-semibold px-6 py-4 md:px-4 md:py-2 relative"
              to={`/${button.name.toLowerCase()}`}
            >
              <button.icon />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
              <p className="hidden md:block">{button.name}</p>
            </Link>
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
};

export default NavBarActions;
