import { Link, useLocation } from "react-router-dom";

type Links = {
  name: string;
  href: string;
};

const UserDashboardSidebar = () => {
  const location = useLocation();
  console.log(location.pathname);

  const accountLinks: Links[] = [
    { name: "Profile", href: "/my/profile" },
    { name: "Addresses", href: "/my/addresses" },
  ];

  const legalLinks: Links[] = [
    { name: "Terms of use", href: "/termsofuse" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="max-w-56 h-full border-r border-neutral-300 pr-10 hidden md:block">
      <div className="w-full py-5.5 border-b border-neutral-300 flex flex-col">
        <Link
          to={"/my"}
          className={`text-sm ${location.pathname === "/my" ? "text-primary font-semibold" : "text-muted-foreground"}`}
        >
          Overview
        </Link>
      </div>

      <div className="w-full py-5.5 border-b border-neutral-300 flex flex-col gap-3">
        <h1 className="text-xs text-neutral-400 uppercase">Orders</h1>

        <Link
          to={"/my/orders"}
          className={`text-sm ${location.pathname.includes("/orders") ? "text-primary font-semibold" : "text-muted-foreground"}`}
        >
          Orders & Returns
        </Link>
      </div>

      <div className="w-full py-5.5 border-b border-neutral-300 flex flex-col gap-3">
        <h1 className="text-xs text-neutral-400 uppercase">Account</h1>

        <div className="w-full py-1 flex flex-col">
          {accountLinks.map((link, idx) => {
            const isActive = location.pathname.includes(link.href);
            return (
              <Link
                to={link.href}
                key={idx}
                className={`text-sm ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="w-full py-5.5 flex flex-col gap-3">
        <h1 className="text-xs text-neutral-400 uppercase">Legal</h1>

        <div className="w-full py-1 flex flex-col">
          {legalLinks.map((link, idx) => {
            const isActive = location.pathname.includes(link.href);
            return (
              <Link
                to={link.href}
                key={idx}
                className={`text-sm ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSidebar;
