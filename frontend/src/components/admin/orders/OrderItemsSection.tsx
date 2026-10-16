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
    <section className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      <div className="flex items-center gap-2 border-b border-[#f1f3ff] bg-[#f9f9ff] p-3.5 sm:p-4">
        <Package className="h-4 w-4 text-[#835500]" />

        <h3 className="text-xs sm:text-sm font-bold text-[#141b2b]">
          Articles commandés ({order.items.length})
        </h3>
      </div>

      <div className="divide-y divide-[#f1f3ff]">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-3 p-3.5 sm:p-4"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-1 flex items-center justify-center">
              {item.product.image ? (
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-[#524535]">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs sm:text-sm font-bold text-[#141b2b]">
                {item.product.name}
              </p>

              <p className="mt-0.5 text-[11px] sm:text-xs text-[#524535]">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>

            <p className="shrink-0 text-right text-xs sm:text-sm font-bold text-[#141b2b]">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#f1f3ff] bg-[#f9f9ff] p-4">
        <span className="text-xs sm:text-sm font-bold text-[#141b2b]">
          Total commande
        </span>

        <span className="text-sm sm:text-base font-bold text-[#835500]">
          {formatPrice(order.totalAmount)}
        </span>
      </div>
    </section>
  );
}