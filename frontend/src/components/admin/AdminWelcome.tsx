import { ShieldCheck } from "lucide-react";

import type { AuthUser } from "@/services/auth.service";

interface AdminWelcomeProps {
  user: AuthUser;
}

export default function AdminWelcome({
  user,
}: AdminWelcomeProps) {
  const firstName = user.fullName
    .trim()
    .split(/\s+/)[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border-0 bg-white ">
      <div className="relative z-10 flex items-center justify-between p-7 sm:p-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 w-10 rounded-full bg-primary" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Administration
            </span>
            <div className="h-1.5 w-10 rounded-full bg-primary" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Bienvenue, {firstName}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Gérez votre boutique, vos produits, vos commandes
            et vos utilisateurs depuis votre espace
            d'administration.
          </p>
        </div>

        <div className="hidden h-16 w-16 items-center 
                      justify-center rounded-full bg-amber-300 lg:flex">
          <ShieldCheck className="h-8 w-8 text-neutral-700" />
        </div>
      </div>

      <div className="pointer-events-none 
                      absolute -right-16 -top-20 
                      h-56 w-56 rounded-full 
                      bg-neutral-300" />

      <div className="pointer-events-none 
                      absolute -bottom-24 right-24
                      h-40 w-40 rounded-full 
                      bg-neutral-300" />
    </div>
  );
}