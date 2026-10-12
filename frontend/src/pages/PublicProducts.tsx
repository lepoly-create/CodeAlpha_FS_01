import { Search, AlertCircle, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";

import PublicProductCard from "@/components/products/PublicProductCard";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/useProducts";

export default function PublicProducts() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.description, product.category].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [products, search]);

  return (
    <section className="min-h-screen bg-slate-50/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
              Catalogue MarketElectro
            </span>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              Explorez nos produits
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Découvrez nos produits électroniques. Connectez-vous pour
              ajouter des articles au panier et gérer vos favoris.
            </p>
          </div>

          <div className="inline-flex items-center self-start rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm sm:self-auto">
            <span className="mr-1 font-bold text-slate-900">
              {filteredProducts.length}
            </span>
            {filteredProducts.length > 1
              ? "produits disponibles"
              : "produit disponible"}
          </div>
        </div>

        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un produit..."
            className="h-11 rounded-xl border-slate-200/80 bg-white pl-10 text-sm shadow-sm"
          />
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[380px] animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="mt-3 text-sm font-semibold text-red-900">
              Impossible de charger le catalogue.
            </p>
            <p className="mt-1 text-xs text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
            <PackageSearch className="h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Aucun produit trouvé
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Essayez une autre recherche.
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <PublicProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
