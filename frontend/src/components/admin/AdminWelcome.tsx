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
    <div className="relative overflow-hidden rounded-lg border border-[#22252a] bg-gradient-to-r from-[#16171a] via-[#1a1c20] to-[#22252a] text-white shadow-md">
      <div className="relative z-10 flex items-center justify-between p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e59b22] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#ffb955]">
              Administration • Emetix Tech Retail
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Bienvenue, {firstName}
          </h1>

          <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-[#9ca3af]">
            Gérez votre boutique, vos stocks de produits électroniques, vos commandes
            et vos clients depuis votre console d'administration.
          </p>
        </div>

        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[0.25rem] border border-[#835500]/30 bg-[#ffddb5]/10 text-[#e59b22] shadow-[0_4px_14px_0_rgba(229,155,34,0.25)] sm:flex">
          <ShieldCheck className="h-7 w-7" />
        </div>
      </div>

      {/* Halo ambré subtil */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#e59b22]/10 blur-[90px]" />
    </div>
  );
}