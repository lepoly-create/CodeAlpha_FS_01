import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Search,
} from "lucide-react";

import CartButton from "@/components/cart/CartButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function AppHeader() {
    const { logout } = useAuth();
  return (
    <header className="flex h-24 items-center justify-between px-9">
      {/* Search */}
      <div className="relative w-95">
        <Search className="absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 stroke-[1.5]" />

        <Input
          placeholder="Search"
          className="h-14 rounded-xl border-0 bg-neutral-200 pl-14 text-xl shadow-none placeholder:text-black focus-visible:ring-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Bell className="h-6 w-6 stroke-[1.5]" />
        </Button>

        <Button variant="ghost" size="icon" className="h-10 w-10">
          <CircleUserRound className="h-6 w-6 stroke-[1.5]" />
        </Button>

        <Button variant="ghost" size="icon" className="h-10 w-10">
          <ChevronDown className="h-6 w-6 stroke-[1.5]" />
        </Button>

        <Button
            variant="ghost"
            onClick={logout}
            className="text-sm"
            >
            Logout
        </Button>
      </div>
      <CartButton />
    
    </header>
  );
}