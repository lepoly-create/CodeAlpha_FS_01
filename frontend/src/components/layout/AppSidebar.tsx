import {
  House,
  MessageSquare,
  PanelLeft,
  Settings,
  ShoppingCart,
  Store,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const customerNavigationItems = [
  {
    label: "Dashboard",
    icon: House,
    path: "/dashboard",
  },
  {
    label: "Product",
    icon: ShoppingCart,
    path: "/products",
  },
  {
    label: "My Cart",
    icon: Store,
    path: "/cart",
  },
  {
    label: "Profile",
    icon: UserCircle,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Support",
    icon: MessageSquare,
    path: "/support",
  },
];

const adminNavigationItems = [
  { label: "Dashboard", icon: House, path: "/admin" },
  { label: "Produits", icon: ShoppingCart, path: "/admin/products" },
  { label: "Commandes", icon: Store, path: "/admin/orders" },
  { label: "Utilisateurs", icon: UserCircle, path: "/admin/users" },
];

export default function AppSidebar() {
  const { user } = useAuth();
  const navigationItems =
    user?.role === "admin"
      ? adminNavigationItems
      : customerNavigationItems;

  return (
    <aside className="sticky top-0 flex h-screen w-80 shrink-0 flex-col overflow-hidden border-r border-black bg-slate-100 px-5 py-5">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <span className="text-[25px] font-medium tracking-tight">
            MarketElectro
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md"
        >
          <PanelLeft className="h-4 w-4 stroke-[1.5]" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-16 flex flex-col gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex h-10 items-center gap-4 rounded-lg px-1 text-[20px] transition-colors hover:bg-white"
            >
              <Icon className="h-6 w-6 stroke-[1.5]" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}