import { Clock } from "lucide-react";

import type { AdminOrder } from "@/types/admin";

interface OrderInformationSectionProps {
  order: AdminOrder;
}

const formatOrderDate = (date: string): string => {
  return new Date(date).toLocaleString("fr-FR");
};

export default function OrderInformationSection({
  order,
}: OrderInformationSectionProps) {
  return (
    <section className="rounded-lg border border-[#e5e7eb] bg-[#f9f9ff] p-4 sm:p-5">
      <div className="mb-3.5 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-[0.25rem] bg-white border border-[#e5e7eb] shadow-2xs">
          <Clock className="h-3.5 w-3.5 text-[#835500]" />
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-[#141b2b]">
          Historique de la commande
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold text-[#524535]">
            Date de création
          </p>

          <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#141b2b]">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-[#524535]">
            Dernière mise à jour
          </p>

          <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#141b2b]">
            {formatOrderDate(order.updatedAt)}
          </p>
        </div>
      </div>
    </section>
  );
}