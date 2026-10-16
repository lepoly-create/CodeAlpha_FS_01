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
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="px-6 py-5 border-b border-[#f1f3ff]">
          <CardTitle className="text-base sm:text-lg font-bold text-[#141b2b]">
            Mon profil
          </CardTitle>
          <p className="mt-0.5 text-xs text-[#524535]">
            Aperçu de votre compte d'accès.
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#ffddb5]/60 border border-[#835500]/20 flex items-center justify-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`Photo de ${user.fullName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="font-bold text-[#835500] text-base">
                  {initials || "U"}
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-1">
              <h3 className="truncate font-bold text-[#141b2b] text-sm">
                {user.fullName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#524535]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#524535]/60" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#524535] flex items-center gap-1.5 font-medium">
                <UserRound className="h-3.5 w-3.5 text-[#524535]/60" /> Type de compte
              </span>
              <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#f1f3ff] text-[#141b2b] px-2 py-0.5 rounded-full border border-[#e5e7eb]">
                {user.role === "customer" ? "Client" : "Administrateur"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-[#e5e7eb] pt-2.5">
              <span className="text-[#524535] flex items-center gap-1.5 font-medium">
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
          className="w-full rounded-[0.25rem] border-[#e5e7eb] hover:bg-[#f1f3ff] text-xs font-semibold text-[#141b2b] h-9"
        >
          Gérer mon profil
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}