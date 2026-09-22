import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { AdminOrder } from "@/types/admin";

import OrderActionsSection from "./OrderActionsSection";
import OrderCustomerSection from "./OrderCustomerSection";
import OrderInformationSection from "./OrderInformationSection";
import OrderItemsSection from "./OrderItemsSection";

interface AdminOrderDetailsProps {
  order: AdminOrder;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} satisfies Record<AdminOrder["status"], string>;

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
} satisfies Record<AdminOrder["status"], string>;

export default function AdminOrderDetails({
  order,
  loading,
  onConfirm,
  onCancel,
  onClose,
}: AdminOrderDetailsProps) {
  const canChangeStatus = order.status === "pending";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-white/95 p-5 backdrop-blur sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Order details
            </p>

            <h2
              id="order-details-title"
              className="mt-1 truncate text-xl font-semibold text-slate-950"
            >
              #{order._id.slice(-8).toUpperCase()}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review customer, products and status
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[order.status]
              }`}
            >
              {statusLabels[order.status]}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={loading}
              aria-label="Close order details"
              title="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          <OrderCustomerSection order={order} />

          <OrderInformationSection order={order} />

          <OrderItemsSection order={order} />

          {canChangeStatus && (
            <OrderActionsSection
              loading={loading}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </div>

        <div className="flex justify-end border-t bg-slate-50/60 p-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}