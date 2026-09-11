import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface AdminProductDeleteDialogProps {
  product: Product | null;
  open: boolean;
  loading?: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function AdminProductDeleteDialog({
  product,
  open,
  loading = false,
  onConfirm,
  onCancel,
}: AdminProductDeleteDialogProps) {
  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Disable product?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Are you sure you want to disable{" "}
              <span className="font-medium text-foreground">
                {product.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              The product will no longer be visible to customers,
              but its data will be preserved.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Disabling..." : "Disable product"}
          </Button>
        </div>
      </div>
    </div>
  );
}