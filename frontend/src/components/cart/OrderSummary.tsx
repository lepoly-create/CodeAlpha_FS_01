import { formatPrice } from "@/lib/format-price";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({
  subtotal,
}: OrderSummaryProps) {
  return (
    <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span className="font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">
            Shipping
          </span>

          <span className="font-medium">
            Free
          </span>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between">
            <span className="text-base font-semibold">
              Total
            </span>

            <span className="text-xl font-bold">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}