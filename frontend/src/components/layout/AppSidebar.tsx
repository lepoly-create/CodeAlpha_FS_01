import {
  House,
  PanelLeft,
  Settings,
  ShoppingCart,
  Store,
  UserCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

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
];

const adminNavigationItems = [
  { label: "Dashboard", icon: House, path: "/admin" },
  { label: "Produits", icon: ShoppingCart, path: "/admin/products" },
  { label: "Commandes", icon: Store, path: "/admin/orders" },
  { label: "Utilisateurs", icon: UserCircle, path: "/admin/users" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { user } = useAuth();
  const navigationItems =
    user?.role === "admin"
      ? adminNavigationItems
      : customerNavigationItems;

  return (
    <>
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] shrink-0 flex-col border-r border-neutral-200 bg-white px-4 py-5 shadow-xl transition-transform duration-200 lg:sticky lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${
      open ? "translate-x-0" : "-translate-x-full"
    }`}>
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
          className="h-9 w-9 rounded-lg lg:hidden"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <PanelLeft className="h-4 w-4 stroke-[1.5]" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-col gap-1.5" aria-label="Navigation principale">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
              }`}
            >
              <Icon className="h-6 w-6 stroke-[1.5]" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
    </>
  );
}