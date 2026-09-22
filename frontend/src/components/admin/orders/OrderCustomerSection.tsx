import { Mail, User } from "lucide-react";

import type { AdminOrder } from "@/types/admin";

interface OrderCustomerSectionProps {
  order: AdminOrder;
}

export default function OrderCustomerSection({
  order,
}: OrderCustomerSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
          <User className="h-4 w-4 text-slate-600" />
        </div>

        <h3 className="font-semibold text-slate-900">
          Customer
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">
            Name
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {order.user.fullName}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            Email
          </div>

          <p className="mt-1 break-all font-medium text-slate-900">
            {order.user.email}
          </p>
        </div>
      </div>
    </section>
  );
}