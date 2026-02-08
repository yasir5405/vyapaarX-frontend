import {
  DollarSign,
  Home,
  Package,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { NavUser } from "./nav-user";

interface SidebarButtonProps {
  icon: LucideIcon;
  name: string;
  href: string;
}

const data: SidebarButtonProps[] = [
  { icon: Home, name: "Home", href: "/admin" },
  { icon: Package, name: "Products", href: "/admin/products" },
  { icon: Receipt, name: "Orders", href: "/admin/orders" },
  { icon: Users, name: "Users", href: "/admin/users" },
  { icon: DollarSign, name: "Revenue", href: "/admin/revenue" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavigation = (href: string) => {
    navigate(href);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="object-cover h-10 md:h-full w-8 md:w-10 cursor-pointer"
            onClick={() => handleNavigation("/admin")}
          />

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          {data.map((button, idx) => {
            const isActive = location.pathname === button.href;
            
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  size="lg"
                  className={`group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[state=collapsed]:justify-center cursor-pointer ${
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }`}
                  tooltip={button.name}
                  onClick={() => handleNavigation(button.href)}
                >
                  <button.icon />
                  <span className="group-data-[state=collapsed]:hidden">
                    {button.name}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              avatar: "",
              email: user.email,
              name: user.name,
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
