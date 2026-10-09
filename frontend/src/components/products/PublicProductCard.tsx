import { Eye, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format-price";

interface PublicProductCardProps {
  product: Product;
}

export default function PublicProductCard({ product }: PublicProductCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-0 border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10">
      
      {/* Container Image avec Overlay */}
      <div className="relative aspect-square overflow-hidden bg-slate-100/70 p-6">
        {/* Tag de catégorie */}
        <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-md">
          {product.category}
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Bouton Aperçu Rapide au survol */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            <Eye className="h-4 w-4 text-indigo-600" />
            Aperçu rapide
          </Link>
        </div>
      </div>

      {/* Contenu Produit */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Note / Avis factices pour dynamiser */}
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span className="ml-1 text-[11px] font-semibold text-slate-400">(4.9)</span>
          </div>

          <h3 className="mt-2 line-clamp-1 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {product.description}
          </p>
        </div>

        {/* Pied de carte avec prix et CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Prix TTC</span>
            <span className="text-lg font-extrabold text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <Link
            to="/products"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white shadow-sm"
            aria-label={`Acheter ${product.name}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>

    </article>
  );
}