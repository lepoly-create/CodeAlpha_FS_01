import { Mail, User } from "lucide-react";

import type { AdminOrder } from "@/types/admin";

interface OrderCustomerSectionProps {
  order: AdminOrder;
}

export default function OrderCustomerSection({
  order,
}: OrderCustomerSectionProps) {
  return (
    <section className="rounded-lg border border-[#e5e7eb] bg-[#f9f9ff] p-4 sm:p-5">
      <div className="mb-3.5 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-[0.25rem] bg-white border border-[#e5e7eb] shadow-2xs">
          <User className="h-3.5 w-3.5 text-[#835500]" />
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-[#141b2b]">
          Informations Client
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold text-[#524535]">
            Nom complet
          </p>

          <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#141b2b]">
            {order.user?.fullName || "Utilisateur supprimé"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#524535]">
            <Mail className="h-3 w-3" />
            Adresse email
          </div>

          <p className="mt-0.5 break-all text-xs sm:text-sm font-medium text-[#141b2b]">
            {order.user?.email || "Compte supprimé ou indisponible"}
          </p>
        </div>
      </div>
    </section>
  );
}