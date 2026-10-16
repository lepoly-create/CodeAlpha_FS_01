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
    <section className="min-h-screen bg-[#f9f9ff] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              Catalogue MarketElectro
            </span>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#141b2b]">
              Explorez nos produits
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#524535]">
              Découvrez nos produits électroniques. Connectez-vous pour
              ajouter des articles au panier et gérer vos favoris.
            </p>
          </div>

          <div className="inline-flex items-center self-start rounded-full border border-[#e5e7eb] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#524535] shadow-xs sm:self-auto">
            <span className="mr-1.5 font-bold text-[#141b2b]">
              {filteredProducts.length}
            </span>
            {filteredProducts.length > 1
              ? "produits disponibles"
              : "produit disponible"}
          </div>
        </div>

        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#524535]/60" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un produit, une référence, une catégorie..."
            className="h-10 rounded-[0.25rem] border border-[#e5e7eb] bg-white pl-10 text-sm shadow-xs focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[320px] sm:h-[380px] animate-pulse rounded-lg bg-[#f1f3ff] border border-[#e5e7eb]"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center rounded-lg border border-[#ba1a1a]/20 bg-[#ffdad6]/40 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-[#ba1a1a]" />
            <p className="mt-3 text-sm font-semibold text-[#141b2b]">
              Impossible de charger le catalogue.
            </p>
            <p className="mt-1 text-xs text-[#524535]">{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-[#e5e7eb] bg-white p-8 text-center">
            <PackageSearch className="h-8 w-8 text-[#524535]/60" />
            <p className="mt-3 text-sm font-semibold text-[#141b2b]">
              Aucun produit trouvé
            </p>
            <p className="mt-1 text-xs text-[#524535]">
              Essayez une autre recherche.
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <PublicProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
