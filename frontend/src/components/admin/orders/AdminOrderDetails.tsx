import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  User,
  Mail,
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

export default function AdminOrderDetails({
  order,
  loading,
  onConfirm,
  onCancel,
  onClose,
}: AdminOrderDetailsProps) {
  const canChangeStatus = order.status === "pending";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Order #{order._id.slice(-8).toUpperCase()}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Order details and management
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="space-y-6 p-6">
          {/* Customer */}
          <section className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-semibold">
                Customer
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {order.user.fullName}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  Email
                </div>

                <p className="font-medium">
                  {order.user.email}
                </p>
              </div>
            </div>
          </section>

          {/* Order information */}
          <section className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-semibold">
                Order information
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Created
                </p>

                <p className="font-medium">
                  {new Date(
                    order.createdAt
                  ).toLocaleString("fr-FR")}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last update
                </p>

                <p className="font-medium">
                  {new Date(
                    order.updatedAt
                  ).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="rounded-lg border">
            <div className="flex items-center gap-2 border-b p-4">
              <Package className="h-4 w-4 text-muted-foreground" />

              <h3 className="font-semibold">
                Ordered products
              </h3>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-4 p-4"
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

                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t bg-muted/30 p-4">
              <span className="font-semibold">
                Total
              </span>

              <span className="text-lg font-bold">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </section>

          {/* Actions */}
          {canChangeStatus && (
            <section className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="font-semibold">
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
        <div className="flex justify-end border-t p-4">
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