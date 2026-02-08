import { useState } from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "../LogoutButton";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  const links = ["Orders", "Cart", "Contact us"];

  const { user } = useAuth();

  return (
    <div
      className="relative h-full flex items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant={"ghost"}
        className="flex flex-col text-xs font-semibold md:px-4 md:py-7 hover:bg-transparent"
      >
        <User className="h-5 w-5" />
        <p className="hidden md:block">Profile</p>
      </Button>

      {/* Dropdown */}
      <div
        className={`absolute right-1/2 translate-x-1/2 top-full w-64 border bg-white shadow-lg flex flex-col gap-2 transition-all duration-200 ease-out z-50 ${open ? "opacity-100" : "opacity-0 pointer-events-none"} px-4 py-3`}
      >
        <div>
          {user ? (
            <p className="font-semibold text-sm flex cursor-pointer">
              Welcome {user.name}
            </p>
          ) : (
            <p className="font-semibold text-sm flex">Welcome</p>
          )}

          {user ? (
            <p className="text-xs text-muted-foreground cursor-pointer">
              {user.email}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              To access account and manage orders
            </p>
          )}

          {!user && (
            <Button asChild variant={"outline"} className="mt-3 w-full">
              <Link to={"/login"}>LOGIN/SIGNUP</Link>
            </Button>
          )}
        </div>

        <Separator />

        <div className="mt-2 flex flex-col gap-1 transition-all">
          {links.map((link, idx) => (
            <Link
              className="text-sm text-muted-foreground hover:text-black"
              key={idx}
              to={`/${link.toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>

        <Separator />

        <div className="mt-2 flex flex-col gap-1 transition-all">
          <Link
            className="text-sm text-muted-foreground hover:text-black"
            to={`/saved-cards`}
          >
            Saved Cards
          </Link>
          <Link
            className="text-sm text-muted-foreground hover:text-black"
            to={`/saved-addresses`}
          >
            Saved Addresses
          </Link>
        </div>

        {user && (
          <>
            <Separator />

            <div className="mt-2 flex flex-col gap-1 transition-all">
              <Link
                className="text-sm text-muted-foreground hover:text-black"
                to={`/update-profile`}
              >
                Update Profile
              </Link>

              {user?.role === "Admin" && (
                <Link
                  className="text-sm text-muted-foreground hover:text-black"
                  to={`/admin`}
                >
                  Admin Dashboard
                </Link>
              )}

              <LogoutButton type="link" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
