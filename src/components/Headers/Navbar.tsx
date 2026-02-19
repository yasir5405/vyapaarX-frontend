import { Link, useNavigate } from "react-router-dom";
import GlobalSearch from "../Search/GlobalSearch";
import NavBarActions from "./NavBarActions";
import MobileNav from "./MobileNav";
import { CATEGORIES } from "@/config/nav";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 border-b shadow-2xs flex items-center justify-between px-4 md:px-12 z-50 bg-white">
      <div className="h-full flex items-center justify-center gap-3 md:gap-6">
        <MobileNav />
        <img
          src="/logo.png"
          alt="Logo"
          className="object-cover h-10 md:h-full w-8 md:w-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex items-center justify-center gap-6 lg:gap-10 h-full">
        {CATEGORIES.map((category: string, idx) => (
          <Link
            key={idx}
            className="font-semibold text-xs text-black relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-11.5 after:hidden hover:after:block after:h-0.5 after:w-[160%] after:bg-primary hidden md:block"
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
