import { Package } from "lucide-react";

import { formatPrice } from "@/lib/format-price";

import type { AdminOrder } from "@/types/admin";

interface OrderItemsSectionProps {
  order: AdminOrder;
}

export default function OrderItemsSection({
  order,
}: OrderItemsSectionProps) {
  return (
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
                {item.quantity} × {formatPrice(item.price)}
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
  );
}