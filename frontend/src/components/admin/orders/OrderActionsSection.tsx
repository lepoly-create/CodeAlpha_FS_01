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
    <section className="rounded-lg border border-[#835500]/20 bg-[#ffddb5]/15 p-4 sm:p-5">
      <h3 className="text-sm font-bold text-[#835500]">
        Actions sur la commande
      </h3>

      <p className="mt-1 text-xs text-[#524535] leading-relaxed">
        Confirmez la commande ou annulez-la. Si la commande est annulée, ses quantités seront immédiatement réintégrées dans les stocks disponibles.
      </p>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="gap-2 rounded-[0.25rem] bg-[#e59b22] text-xs font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] cursor-pointer h-9 px-4"
        >
          <CheckCircle className="h-4 w-4" />

          {loading
            ? "Mise à jour en cours..."
            : "Confirmer la commande"}
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={onCancel}
          disabled={loading}
          className="gap-2 rounded-[0.25rem] bg-[#ba1a1a] hover:bg-[#93000a] text-xs font-semibold text-white cursor-pointer h-9 px-4"
        >
          <XCircle className="h-4 w-4" />

          {loading
            ? "Mise à jour en cours..."
            : "Annuler la commande"}
        </Button>
      </div>
    </section>
  );
}