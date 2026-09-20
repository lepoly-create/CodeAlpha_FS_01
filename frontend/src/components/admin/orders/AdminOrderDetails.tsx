import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  User,
  Mail,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";

import type { AdminOrder } from "@/services/admin-order.service";

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
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

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
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-white/95 p-5 backdrop-blur sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Order details
            </p>

            <h2 id="order-details-title" className="mt-1 truncate text-xl font-semibold text-slate-950">
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
          {/* Customer */}
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

          {/* Order information */}
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
                  {new Date(
                    order.createdAt
                  ).toLocaleString("fr-FR")}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last update
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {new Date(
                    order.updatedAt
                  ).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="overflow-hidden rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 border-b bg-slate-50/60 p-4">
              <Package className="h-4 w-4 text-slate-600" />

              <h3 className="font-semibold text-slate-900">
                Ordered products
              </h3>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-3 p-4 sm:gap-4"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {item.quantity} ×{" "}
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <p className="shrink-0 text-right font-semibold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t bg-muted/30 p-4">
              <span className="font-semibold text-slate-900">
                Total
              </span>

              <span className="text-lg font-bold">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </section>

          {/* Actions */}
          {canChangeStatus && (
            <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
              <h3 className="font-semibold text-amber-950">
                Order actions
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Confirm the order or cancel it. If the
                order is cancelled, its quantities will be
                returned to the product stock.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4" />

                  {loading
                    ? "Updating..."
                    : "Confirm order"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={onCancel}
                  disabled={loading}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />

                  {loading
                    ? "Updating..."
                    : "Cancel order"}
                </Button>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t bg-slate-50/60 p-4">
          <Button
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