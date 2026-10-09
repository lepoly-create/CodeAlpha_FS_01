import { ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format-price";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const shippingCost = 0; // Offert
  const total = subtotal + shippingCost;

  return (
    <aside className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-5">
      <h2 className="text-base font-extrabold text-slate-900">
        Résumé de la commande
      </h2>

      {/* Code Promo */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Code Promo / Coupon
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Ex: ELECTRO10"
            className="h-9 rounded-xl border-slate-200 text-xs uppercase"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-xl text-xs font-semibold shrink-0"
          >
            Appliquer
          </Button>
        </div>
      </div>

      {/* Détails Financiers */}
      <div className="space-y-3 pt-2 text-xs sm:text-sm border-t border-slate-100">
        <div className="flex justify-between text-slate-600">
          <span>Sous-total</span>
          <span className="font-semibold text-slate-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600 items-center">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-emerald-600" />
            Frais de livraison
          </span>
          <span className="font-bold text-emerald-600 uppercase text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
            Gratuit
          </span>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-900">Total TTC</span>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 text-right">
            TVA incluse et livraison gratuite
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <Link
          to="/checkout"
          className="w-full h-11 rounded-xl bg-slate-900 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all"
        >
          <span className="flex items-center justify-center gap-2">
            Passer la commande
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <Link
          to="/products"
          className="w-full h-9 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
        >
          Poursuivre mes achats
        </Link>
      </div>

      {/* Reassurance */}
      <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>Paiement 100% sécurisé et données chiffrées</span>
      </div>
    </aside>
  );
}