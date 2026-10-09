import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CartEmptyState() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100/80 text-slate-400 shadow-inner">
        <ShoppingBag className="h-10 w-10 text-slate-400" />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Votre panier est vide
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
        Découvrez notre sélection de produits électroniques et ajoutez vos coup de cœur pour commencer vos achats.
      </p>

      <Link to="/products">
        <Button
          size="lg"
          className="mt-6 h-11 rounded-xl bg-slate-900 px-6 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all"
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