import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";

import useProducts from "@/hooks/useProducts";
import useProductFavorites from "@/hooks/useProductFavorites";
import useStoreProductFilters from "@/hooks/useStoreProductFilters";

export default function Products() {
  const { products, loading, error } = useProducts();

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
  } = useStoreProductFilters(products, favoriteIds);

  return (
    <section className="min-h-screen w-full bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        
        {/* Entête moderne */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Catalogue MarketElectro
            </span>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Explorez nos Produits
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Découvrez le meilleur de la technologie et des accessoires électroniques.
            </p>
          </div>

          <div className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600 self-start sm:self-auto">
            <span className="font-bold text-slate-900 mr-1">
              {filteredProducts.length}
            </span>
            {filteredProducts.length > 1 ? "produits disponibles" : "produit disponible"}
          </div>
        </div>

        {/* Barre de Recherche + Filtres */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, marque, référence..."
              className="h-11 rounded-xl focus:border-0 border-slate-200/80 bg-white pl-10 pr-4 text-xs sm:text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-slate-900 placeholder:text-slate-400"
            />
          </div>

          <ProductFilters
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
        </div>

        {/* État de chargement avec Skeletons compacts */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-3 shadow-sm"
              >
                <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-100" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                  <div className="pt-2 h-6 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="h-8 w-full animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* État d'erreur */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm font-semibold text-red-900">
              Une erreur est survenue lors du chargement des produits.
            </p>
            <p className="text-xs text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Affichage des Produits */}
        {!loading && !error && (
          <ProductGrid
            products={filteredProducts}
            favoriteIds={favoriteIds}
            pendingFavoriteIds={pendingFavoriteIds}
            onAddFavorite={addProductToFavorites}
            onRemoveFavorite={removeProductFromFavorites}
          />
        )}
      </div>
    </section>
  );
}