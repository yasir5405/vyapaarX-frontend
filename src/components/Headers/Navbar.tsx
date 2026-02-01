import { Link } from "react-router-dom";
import GlobalSearch from "../Search/GlobalSearch";
import NavBarActions from "./NavBarActions";
import { Package } from "lucide-react";

const Navbar = () => {
  const categories = ["men", "women", "kids", "home", "beauty", "studio"];
  return (
    <nav className="fixed top-0 left-0 w-full h-20 border-b shadow-2xs flex items-center justify-between px-12 z-9999999 bg-white">
      <Package className="h-6 w-6" />

      <div className="flex items-center justify-center gap-10 h-full">
        {categories.map((category: string, idx) => (
          <Link
            key={idx}
            className="font-semibold text-xs relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-11.5 after:hidden hover:after:block after:h-0.5 after:w-[160%] after:bg-primary "
            to={`/${category}`}
          >
            {category.toUpperCase()}
          </Link>
        ))}
      </div>

      <GlobalSearch />

      <NavBarActions />
    </nav>
  );
};

export default Navbar;
