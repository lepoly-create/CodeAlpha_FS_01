import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardUser } from "@/services/dashboard.service";

interface DashboardWelcomeProps {
  user: DashboardUser;
  onExploreProducts: () => void;
}

export default function DashboardWelcome({
  user,
  onExploreProducts,
}: DashboardWelcomeProps) {
  const firstName = user.fullName.trim().split(" ")[0] || "Client";

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-[#22252a] to-[#16171a] p-6 sm:p-8 text-white shadow-xl border border-[#293040]">
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#835500]/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#ffb955] border border-[#835500]/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e59b22]" />
            <span>MarketElectro Espace Client</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Ravi de vous revoir, {firstName}
          </h1>

          <p className="text-sm font-normal leading-relaxed text-[#dce2f7]/80 sm:text-base">
            Consultez le suivi de vos commandes récentes, vos produits favoris et gérez votre panier en toute simplicité depuis votre tableau de bord.
          </p>

          <div className="pt-2">
            <Button
              onClick={onExploreProducts}
              className="rounded-[0.25rem] bg-[#e59b22] text-white hover:bg-[#d97706] shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] font-semibold px-6 transition-all active:scale-95"
            >
              Explorer le catalogue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Avatar Profil Grandes Écrans */}
        <div className="hidden shrink-0 lg:block">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1a1c20] p-1 ring-2 ring-[#e59b22]/40">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`Photo de ${user.fullName}`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-[#e59b22]">
                {firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}