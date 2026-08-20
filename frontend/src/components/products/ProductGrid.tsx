import ProductCard from "./ProductCard";

import type { Product } from "@/types/product";

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
      <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed">
        <p className="text-neutral-500">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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