import {
  Bell,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

import CartButton from "@/components/cart/CartButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import BrandLogo from "@/components/common/BrandLogo";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[#e5e7eb] bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-9">
      {/* Côté Gauche : Menu Mobile + Logo */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-[0.25rem] text-[#141b2b] hover:bg-[#f1f3ff] lg:hidden"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <BrandLogo
          to={user?.role === "admin" ? "/admin" : "/dashboard"}
          className="lg:hidden"
          size="sm"
          rounded="md"
        />
      </div>

      {/* Centre : Espace fluide */}
      <div className="min-w-0 flex-1" />

      {/* Côté Droit : Actions & Profil */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-9 w-9 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff] hover:text-[#141b2b] sm:inline-flex"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 stroke-[1.75]" />
        </Button>

        {user?.role !== "admin" && <CartButton />}

        <Link
          to="/profile"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[0.25rem] text-[#524535] transition-colors hover:bg-[#f1f3ff] hover:text-[#141b2b]"
          aria-label="Mon profil"
          title="Mon profil"
        >
          <CircleUserRound className="h-5 w-5 stroke-[1.75]" />
        </Link>

        <Button
          variant="ghost"
          onClick={logout}
          className="hidden sm:inline-flex h-9 rounded-[0.25rem] px-3 text-xs font-semibold text-[#524535] hover:bg-[#ffdad6]/40 hover:text-[#ba1a1a]"
        >
          Déconnexion
        </Button>
      </div>
    </header>
  );
}