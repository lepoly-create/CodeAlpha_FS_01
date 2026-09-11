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
  const firstName = user.fullName.trim().split(" ")[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-white">
      <div className="relative z-10 flex flex-col gap-6 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 w-10 rounded-full bg-primary" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              MarketElectro
            </span>
            <div className="h-1.5 w-10 rounded-full bg-primary" />

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Bonjour, {firstName}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Retrouvez vos commandes, vos favoris et votre panier
            depuis votre espace personnel.
          </p>

          <div className="mt-6">
            <Button
              onClick={onExploreProducts}
              className="rounded-xl px-5 cursor-pointer"
            >
              Découvrir les produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-neutral-100">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`Photo de ${user.fullName}`}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-neutral-500">
                {firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-neutral-50" />
      <div className="pointer-events-none absolute -bottom-24 right-24 h-40 w-40 rounded-full bg-neutral-50" />
    </div>
  );
}