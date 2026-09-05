import { ArrowRight, Mail, UserRound } from "lucide-react";

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
  //const firstName = user.fullName.trim().split(" ")[0];

  const initials = user.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-none">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-lg font-semibold text-neutral-950">
          Mon compte
        </CardTitle>

        <p className="mt-1 text-sm text-neutral-500">
          Gérez vos informations personnelles.
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`Photo de ${user.fullName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-neutral-600">
                {initials || "U"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-neutral-950">
              {user.fullName}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <UserRound className="h-4 w-4 text-neutral-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                Type de compte
              </p>

              <p className="mt-0.5 text-sm font-semibold capitalize text-neutral-800">
                {user.role === "customer" ? "Client" : "Administrateur"}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onViewProfile}
          className="mt-5 w-full rounded-xl"
        >
          Voir mon profil
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}