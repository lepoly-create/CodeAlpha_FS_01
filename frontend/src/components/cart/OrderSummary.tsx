import { ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format-price";

interface OrderSummaryProps {
  subtotal: number;
  showActions?: boolean;
}

export default function OrderSummary({ subtotal, showActions = true }: OrderSummaryProps) {
  const shippingCost = 0; // Offert
  const total = subtotal + shippingCost;

  return (
    <aside className="sticky top-24 rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-xs space-y-5">
      <h2 className="text-base font-bold text-[#141b2b]">
        Résumé de la commande
      </h2>

      {/* Code Promo */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#524535]/80">
          Code Promo / Coupon
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Ex: TECH10"
            className="h-9 rounded-[0.25rem] border-[#e5e7eb] text-xs uppercase focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-[0.25rem] text-xs font-semibold shrink-0 border-[#e5e7eb]"
          >
            Appliquer
          </Button>
        </div>
      </div>

      {/* Détails Financiers */}
      <div className="space-y-3 pt-2 text-xs sm:text-sm border-t border-[#f1f3ff]">
        <div className="flex justify-between text-[#524535]">
          <span>Sous-total</span>
          <span className="font-semibold text-[#141b2b]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-[#524535] items-center">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-emerald-600" />
            Frais de livraison
          </span>
          <span className="font-bold text-emerald-700 uppercase text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Gratuit
          </span>
        </div>

        <div className="border-t border-[#e5e7eb] pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#141b2b]">Total TTC</span>
            <span className="text-xl font-extrabold text-[#141b2b] tracking-tight">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-[10px] text-[#524535]/70 mt-0.5 text-right">
            TVA incluse et livraison offerte
          </p>
        </div>
      </div>

      {/* Actions conditionnelles */}
      {showActions && (
        <div className="space-y-2.5 pt-2">
          <Link
            to="/checkout"
            className="w-full h-11 rounded-[0.25rem] bg-[#e59b22] text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] transition-all flex items-center justify-center gap-2"
          >
            Passer la commande
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/products"
            className="w-full h-9 rounded-[0.25rem] text-xs font-semibold text-[#835500] hover:bg-[#e9edff] flex items-center justify-center transition-colors"
          >
            Poursuivre mes achats
          </Link>
        </div>
      )}

      {/* Reassurance */}
      <div className="rounded-[0.25rem] bg-[#f9f9ff] p-3 border border-[#e5e7eb] flex items-center gap-2.5 text-[11px] text-[#524535]">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>Commande sécurisée et données chiffrées</span>
      </div>
    </aside>
  );
}