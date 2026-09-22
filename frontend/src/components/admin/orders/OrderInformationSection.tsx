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
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
          <Clock className="h-4 w-4 text-slate-600" />
        </div>

        <h3 className="font-semibold text-slate-900">
          Order information
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">
            Created
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Last update
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {formatOrderDate(order.updatedAt)}
          </p>
        </div>
      </div>
    </section>
  );
}