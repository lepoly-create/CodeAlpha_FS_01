import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CartEmptyState() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#e9edff] text-[#0053db] shadow-xs border border-[#e5e7eb]">
        <ShoppingBag className="h-10 w-10 text-[#0053db]" />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
        Votre panier est vide
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-[#524535] leading-relaxed">
        Découvrez notre sélection de produits électroniques et ajoutez vos coups de cœur pour commencer vos achats.
      </p>

      <Link to="/products" className="mt-6">
        <Button
          size="lg"
          className="h-11 rounded-[0.25rem] bg-[#e59b22] px-6 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] transition-all cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            Découvrir le catalogue
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </Link>
    </section>
  );
}