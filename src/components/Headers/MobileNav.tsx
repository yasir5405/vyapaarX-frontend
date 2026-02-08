import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/LogoutButton";
import { CATEGORIES, PROFILE_LINKS, SAVED_LINKS } from "@/config/nav";

const MobileNav = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-4 z-100">
          <div className="flex flex-col gap-4">
            {/* Brand */}
            <SheetClose asChild>
              <div
                className="text-xl font-bold flex items-center gap-2  cursor-pointer"
                onClick={() => navigate("/")}
              >
                Memora{" "}
                <img
                  src="/logo.png"
                  alt=""
                  className="object-cover h-10 md:h-full w-8 md:w-10"
                />
              </div>
            </SheetClose>

            <Separator />

            {/* Categories */}
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <SheetClose asChild key={category}>
                  <Link
                    to={`/${category}`}
                    className="text-sm font-semibold uppercase"
                  >
                    {category}
                  </Link>
                </SheetClose>
              ))}
            </div>

            <Separator />

            {/* Profile Section */}
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">
                  {user ? `Hello, ${user.name}` : "Welcome"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user ? user.email : "Login to manage orders"}
                </p>
              </div>
            </div>

            {!user && (
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">LOGIN / SIGNUP</Link>
                </Button>
              </SheetClose>
            )}

            <Separator />

            {/* Orders / Cart / Contact */}
            <div className="flex flex-col gap-2">
              {PROFILE_LINKS.map((link) => (
                <SheetClose asChild key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-black"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>

            <Separator />

            {/* Saved */}
            <div className="flex flex-col gap-2">
              {SAVED_LINKS.map((link) => (
                <SheetClose asChild key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-black"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>

            {user && (
              <>
                <Separator />

                <div className="flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link
                      to="/update-profile"
                      className="text-sm text-muted-foreground hover:text-black"
                    >
                      Update Profile
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      to="/admin"
                      className="text-sm text-muted-foreground hover:text-black"
                    >
                      Admin Hashboard
                    </Link>
                  </SheetClose>

                  <LogoutButton type="button" />
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
