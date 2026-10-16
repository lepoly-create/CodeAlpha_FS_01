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
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#e5e7eb] bg-white p-8 text-center shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f3ff] text-[#524535]">
          <PackageSearch className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-base font-bold text-[#141b2b]">
          Aucun produit trouvé
        </h3>
        <p className="mt-1 text-xs text-[#524535] max-w-sm">
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