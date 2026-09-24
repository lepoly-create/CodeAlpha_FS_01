import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";

import useProducts from "@/hooks/useProducts";
import useProductFavorites from "@/hooks/useProductFavorites";
import useStoreProductFilters from "@/hooks/useStoreProductFilters";

export default function Products() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  const {
    favoriteIds,
    pendingFavoriteIds,
    addProductToFavorites,
    removeProductFromFavorites,
  } = useProductFavorites();

  const {
    search,
    category,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
  } = useStoreProductFilters(
    products,
    favoriteIds,
  );

  return (
    <section className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            MarketElectro
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>

          <p className="mt-2 text-neutral-500">
            Discover the latest electronics and accessories.
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          {filteredProducts.length} products
        </p>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />

        <Input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search products..."
          className="h-14 rounded-xl border-neutral-200 bg-neutral-100 pl-12 text-base shadow-none"
        />
      </div>

      <ProductFilters
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-115 animate-pulse rounded-2xl bg-neutral-100"
              />
            ),
          )}
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <ProductGrid
          products={filteredProducts}
          favoriteIds={favoriteIds}
          pendingFavoriteIds={pendingFavoriteIds}
          onAddFavorite={
            addProductToFavorites
          }
          onRemoveFavorite={
            removeProductFromFavorites
          }
        />
      )}
    </section>
  );
}