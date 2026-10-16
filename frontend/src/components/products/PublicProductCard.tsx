import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format-price";

interface PublicProductCardProps {
  product: Product;
}

export default function PublicProductCard({ product }: PublicProductCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e59b22]/50 hover:shadow-[0_10px_25px_-5px_rgba(17,24,39,0.08)]">

      {/* Container Image avec Fond Studio Pur */}
      <div className="relative aspect-square overflow-hidden bg-[#f9f9ff] p-3 sm:p-5 flex items-center justify-center border-b border-[#f1f3ff]">
        {/* Tag de catégorie */}
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10 rounded-full bg-white/95 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#524535] shadow-xs border border-[#e5e7eb]">
          {product.category}
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenu Produit */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 lg:p-5">
        <div>
          {/* Note / Avis avec étoiles dorées tech */}
          <div className="flex items-center gap-0.5 sm:gap-1 text-[#e59b22]">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e59b22]" />
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e59b22]" />
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e59b22]" />
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e59b22]" />
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e59b22]" />
            <span className="ml-1 text-[10px] sm:text-[11px] font-semibold text-[#524535]">(4.9)</span>
          </div>

          <h3 className="mt-1.5 sm:mt-2 line-clamp-2 text-xs sm:text-sm font-semibold text-[#141b2b] tracking-[-0.01em] transition-colors group-hover:text-[#835500]">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-[#524535]">
            {product.description}
          </p>
        </div>

        {/* Pied de carte avec prix et CTA */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-[#f1f3ff] pt-2.5 sm:pt-3">
          <div className="min-w-0 pr-1">
            <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#524535]/80 block">Prix TTC</span>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-[#141b2b] tracking-tight truncate block">
              {formatPrice(product.price)}
            </span>
          </div>

          <Link
            to="/products"
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#e59b22] text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] transition-all duration-200 hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-95"
            aria-label={`Acheter ${product.name}`}
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>

    </article>
  );
}