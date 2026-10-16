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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      role="presentation"
      onClick={() => !loading && onCancel()}
    >
      <div
        className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#ba1a1a]">
              Désactivation référence
            </span>
            <h2 className="mt-0.5 text-base sm:text-lg font-bold text-[#141b2b]">
              Désactiver ce produit ?
            </h2>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#524535]">
              Êtes-vous sûr de vouloir désactiver le produit{" "}
              <span className="font-bold text-[#141b2b]">
                {product.name}
              </span>{" "}
              ?
            </p>

            <div className="mt-3 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3 text-xs text-[#524535] leading-relaxed">
              Le produit ne sera plus visible par les clients sur le catalogue public, mais l'ensemble de ses données et de son historique de commande sera conservé.
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#524535] hover:bg-[#f1f3ff] h-9 px-4 cursor-pointer"
          >
            Annuler
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-[0.25rem] bg-[#ba1a1a] hover:bg-[#93000a] text-xs font-semibold text-white h-9 px-4 cursor-pointer"
          >
            {loading ? "Désactivation..." : "Désactiver le produit"}
          </Button>
        </div>
      </div>
    </div>
  );
}