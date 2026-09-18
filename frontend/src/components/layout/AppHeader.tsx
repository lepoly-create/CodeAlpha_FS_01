import {
  Bell,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

import CartButton from "@/components/cart/CartButton";
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
        
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" className="hidden h-10 w-10 sm:inline-flex" aria-label="Notifications">
          <Bell className="h-6 w-6 stroke-[1.5]" />
        </Button>

        <Link
          to="/profile"
          className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-neutral-100 sm:inline-flex"
          aria-label="Profil"
        >
          <CircleUserRound className="h-6 w-6 stroke-[1.5]" />
        </Link>

        {user?.role !== "admin" && <CartButton />}

        <Button
            variant="ghost"
            onClick={logout}
            className="inline-flex text-sm"
            >
            Déconnexion
        </Button>
      </div>
    </header>
  );
}