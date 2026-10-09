import { ArrowRight} from "lucide-react";
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-7 text-white shadow-xl sm:p-8">
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200 backdrop-blur-md border border-white/10">
            <span>MarketElectro Espace Client</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ravi de vous revoir, {firstName}
          </h1>

          <p className="text-sm font-normal leading-relaxed text-slate-300 sm:text-base">
            Consultez le suivi de vos commandes récentes, vos produits favoris et gérez votre panier en toute simplicité depuis votre tableau de bord.
          </p>

          <div className="pt-2">
            <Button
              onClick={onExploreProducts}
              className="rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 shadow-md transition-all active:scale-95"
            >
              Explorer le catalogue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Avatar Profil Grandes Écrans */}
        <div className="hidden shrink-0 lg:block">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-1 ring-4 ring-white/10 backdrop-blur-md">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`Photo de ${user.fullName}`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white">
                {firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Formes décoratives en arrière-plan */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-blue-500/15 blur-2xl" />
    </div>
  );
}