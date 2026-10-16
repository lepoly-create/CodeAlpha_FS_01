import {
  House,
  PanelLeft,
  Settings,
  ShoppingCart,
  ClipboardList,
  Store,
  UserCircle,
  Headphones,
  LogOut,
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
    label: "Catalogue",
    icon: ShoppingCart,
    path: "/products",
  },
  {
    label: "Mon Panier",
    icon: Store,
    path: "/cart",
  },
  {
    label: "Mes Commandes",
    icon: ClipboardList,
    path: "/orders",
  },
  {
    label: "Mon Profil",
    icon: UserCircle,
    path: "/profile",
  },
  {
    label: "Support & Contact",
    icon: Headphones,
    path: "/contact",
  },
];

const adminNavigationItems = [
  { label: "Dashboard", icon: House, path: "/admin" },
  { label: "Produits", icon: ShoppingCart, path: "/admin/products" },
  { label: "Commandes", icon: Store, path: "/admin/orders" },
  { label: "Utilisateurs", icon: UserCircle, path: "/admin/users" },
  { label: "Paramètres", icon: Settings, path: "/admin/settings" },
];

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { user, logout } = useAuth();
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] shrink-0 flex-col border-r border-[#e5e7eb] bg-white px-4 py-5 shadow-2xl transition-transform duration-200 lg:fixed lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#141b2b]">
              Market<span className="text-[#e59b22]">Electro</span>
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-[0.25rem] lg:hidden text-[#141b2b] hover:bg-[#f1f3ff]"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <PanelLeft className="h-4 w-4 stroke-[1.5]" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-1.5" aria-label="Navigation principale">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin" || item.path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) => `flex min-h-[44px] items-center gap-3 rounded-[0.25rem] px-3.5 text-sm font-medium transition-colors ${isActive
                  ? "bg-[#1a1c20] text-white border-l-2 border-[#e59b22] font-semibold shadow-xs"
                  : "text-[#524535] hover:bg-[#f1f3ff] hover:text-[#141b2b]"
                  }`}
              >
                <Icon className="h-5 w-5 stroke-[1.75]" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profil & Déconnexion au bas de la Sidebar */}
        <div className="mt-auto border-t border-[#e5e7eb] pt-4">
          <div className="flex items-center justify-between gap-3 rounded-[0.25rem] bg-[#f9f9ff] p-2.5 border border-[#e5e7eb]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffddb5]/60 text-[#835500] font-bold text-xs border border-[#835500]/20">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-[#141b2b]">
                  {user?.fullName || "Utilisateur"}
                </p>
                <p className="text-[10px] text-[#524535] capitalize">
                  {user?.role === "admin" ? "Administrateur" : "Client"}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Se déconnecter"
              className="h-8 w-8 shrink-0 rounded-[0.25rem] text-[#524535] hover:bg-[#ffdad6]/50 hover:text-[#ba1a1a]"
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}