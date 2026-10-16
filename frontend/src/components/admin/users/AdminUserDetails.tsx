import { CalendarDays, Mail, ShoppingBag, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/services/admin-user.service";
import { formatPrice } from "@/lib/format-price";

interface AdminUserDetailsProps {
  user: AdminUser;
  onClose: () => void;
}

export default function AdminUserDetails({
  user,
  onClose,
}: AdminUserDetailsProps) {
  const joinedDate = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg rounded-lg border border-[#e5e7eb] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-[#f1f3ff] p-5 sm:p-6 bg-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              Fiche client
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#141b2b]">
              Détails du client
            </h2>
            <p className="mt-0.5 text-xs text-[#524535]">
              Informations du compte et historique d'activité.
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff]"
            aria-label="Fermer les détails"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ffddb5]/60 text-[#835500] font-bold text-lg border border-[#835500]/20">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0 space-y-0.5">
              <h3 className="truncate text-base font-bold text-[#141b2b]">
                {user.fullName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#524535]">
                <Mail className="h-3.5 w-3.5 text-[#524535]/60" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#524535]">
                <ShoppingBag className="h-4 w-4 text-[#0053db]" />
                Commandes passées
              </div>

              <p className="mt-1.5 text-xl font-extrabold text-[#141b2b]">
                {user.totalOrders}
              </p>
            </div>

            <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3.5">
              <div className="text-xs font-semibold text-[#524535]">
                Dépenses totales
              </div>

              <p className="mt-1.5 text-xl font-extrabold text-[#141b2b]">
                {formatPrice(user.totalSpent)}
              </p>
            </div>

            <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#524535]">
                <Star className="h-4 w-4 text-[#e59b22]" />
                Articles favoris
              </div>

              <p className="mt-1.5 text-xl font-extrabold text-[#141b2b]">
                {user.favoriteProducts?.length ?? 0}
              </p>
            </div>

            <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#524535]">
                <CalendarDays className="h-4 w-4 text-[#524535]/70" />
                Date d'inscription
              </div>

              <p className="mt-1.5 text-xs font-bold text-[#141b2b]">
                {joinedDate}
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#f1f3ff]">
            <Button
              onClick={onClose}
              className="w-full sm:w-auto h-9 rounded-[0.25rem] bg-[#1a1c20] text-white hover:bg-[#22252a] text-xs font-semibold px-5"
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}