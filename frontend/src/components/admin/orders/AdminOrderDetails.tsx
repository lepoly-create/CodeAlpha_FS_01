import { Trash2, X } from "lucide-react";

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
  onDelete?: () => void;
}

const statusStyles = {
  pending: "bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20",
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20",
} satisfies Record<AdminOrder["status"], string>;

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
} satisfies Record<AdminOrder["status"], string>;

export default function AdminOrderDetails({
  order,
  loading,
  onConfirm,
  onCancel,
  onClose,
  onDelete,
}: AdminOrderDetailsProps) {
  const canChangeStatus = order.status === "pending";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#f1f3ff] bg-white/95 p-5 backdrop-blur sm:p-6">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              Détails de la commande
            </span>

            <h2
              id="order-details-title"
              className="mt-1 truncate text-lg sm:text-xl font-extrabold text-[#141b2b]"
            >
              #{order._id.slice(-8).toUpperCase()}
            </h2>

            <p className="mt-0.5 text-xs text-[#524535]">
              Informations client, articles commandés et statut de livraison
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-bold ${statusStyles[order.status]
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
              aria-label="Fermer"
              className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff]"
            >
              <X className="h-4 w-4" />
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

        <div className="flex items-center justify-between border-t border-[#f1f3ff] bg-[#f9f9ff] p-4">
          {onDelete ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onDelete}
              disabled={loading}
              className="rounded-[0.25rem] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/50 hover:text-[#93000a] gap-1.5"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer la commande
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff]"
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}