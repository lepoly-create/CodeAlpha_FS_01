import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface OrderActionsSectionProps {
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function OrderActionsSection({
  loading,
  onConfirm,
  onCancel,
}: OrderActionsSectionProps) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
      <h3 className="font-semibold text-amber-950">
        Order actions
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Confirm the order or cancel it. If the order is
        cancelled, its quantities will be returned to
        the product stock.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
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
          type="button"
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
  );
}