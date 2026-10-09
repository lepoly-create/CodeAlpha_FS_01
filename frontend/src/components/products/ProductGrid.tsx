import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  favoriteIds: string[];
  pendingFavoriteIds: string[];
  onAddFavorite: (productId: string) => void;
  onRemoveFavorite: (productId: string) => void;
}

export default function ProductGrid({
  products,
  favoriteIds,
  pendingFavoriteIds,
  onAddFavorite,
  onRemoveFavorite,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <PackageSearch className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-900">
          Aucun produit trouvé
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Essayez de modifier votre recherche ou vos filtres de catégorie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isFavorite={favoriteIds.includes(product._id)}
          favoritePending={pendingFavoriteIds.includes(product._id)}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  );
}