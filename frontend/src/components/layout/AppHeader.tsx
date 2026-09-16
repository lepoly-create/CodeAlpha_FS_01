import {
  Bell,
  CircleUserRound,
  Menu,
  Search,
} from "lucide-react";

import CartButton from "@/components/cart/CartButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { logout, user } = useAuth();
  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 sm:px-6 lg:px-9">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 stroke-[1.5]" />

        <Input
          placeholder="Rechercher"
          aria-label="Rechercher"
          className="h-10 rounded-xl border-0 bg-neutral-100 pl-11 text-sm shadow-none placeholder:text-neutral-500 focus-visible:ring-1"
        />
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" className="hidden h-10 w-10 sm:inline-flex" aria-label="Notifications">
          <Bell className="h-6 w-6 stroke-[1.5]" />
        </Button>

        <Button variant="ghost" size="icon" className="hidden h-10 w-10 sm:inline-flex" aria-label="Profil">
          <CircleUserRound className="h-6 w-6 stroke-[1.5]" />
        </Button>

        {user?.role !== "admin" && <CartButton />}

        <Button
            variant="ghost"
            onClick={logout}
            className="hidden text-sm sm:inline-flex"
            >
            Déconnexion
        </Button>
      </div>
    </header>
  );
}