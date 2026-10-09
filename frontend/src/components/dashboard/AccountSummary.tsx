import { ArrowRight, Mail, ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardUser } from "@/services/dashboard.service";

interface AccountSummaryProps {
  user: DashboardUser;
  onViewProfile: () => void;
}

export default function AccountSummary({
  user,
  onViewProfile,
}: AccountSummaryProps) {
  const initials = user.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <CardHeader className="px-6 py-5 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Mon profil
          </CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">
            Aperçu de votre compte d'accès.
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-slate-200/60">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`Photo de ${user.fullName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-slate-600 text-base">
                  {initials || "U"}
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-1">
              <h3 className="truncate font-bold text-slate-900 text-sm">
                {user.fullName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <UserRound className="h-3.5 w-3.5 text-slate-400" /> Type de compte
              </span>
              <span className="font-semibold uppercase tracking-wider text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md">
                {user.role === "customer" ? "Client" : "Administrateur"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2.5">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Statut
              </span>
              <span className="text-emerald-700 font-semibold text-[11px]">
                Actif & Sécurisé
              </span>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="p-6 pt-0">
        <Button
          variant="outline"
          onClick={onViewProfile}
          className="w-full rounded-xl border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-800"
        >
          Gérer mon profil
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}