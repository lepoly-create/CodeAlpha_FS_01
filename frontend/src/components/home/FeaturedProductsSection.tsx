import { ArrowRight, AlertCircle, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";
import PublicProductCard from "@/components/products/PublicProductCard";

export default function FeaturedProductsSection() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="products" className="relative bg-white py-16 sm:py-20 border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded border border-[#835500]/20 bg-[#ffddb5]/50 px-3 py-1 text-xs font-bold text-[#835500]">
              Sélection du mois
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#141b2b] sm:text-4xl">
              Les incontournables du moment.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#524535]">
              Découvrez les appareils électroniques les plus plébiscités par nos clients ce mois-ci.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#835500] transition-colors hover:text-[#e59b22]"
          >
            Voir tous les produits ({products.length})
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[320px] sm:h-[380px] animate-pulse rounded-lg bg-[#f1f3ff] border border-[#e5e7eb]"
              />
            ))}
          </div>
        )}

        {/* État Erreur */}
        {error && !loading && (
          <div className="mt-12 rounded-lg border border-[#ba1a1a]/20 bg-[#ffdad6]/30 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-[#ba1a1a]" />
            <p className="mt-3 text-sm font-bold text-[#141b2b]">
              Impossible de charger le catalogue actuellement.
            </p>
            <p className="mt-1 text-xs text-[#524535]">
              Veuillez vérifier votre connexion internet ou réessayer ultérieurement.
            </p>
          </div>
        )}

        {/* État Vide */}
        {!loading && !error && featuredProducts.length === 0 && (
          <div className="mt-12 rounded-lg border border-dashed border-[#e5e7eb] bg-[#f9f9ff] p-12 text-center">
            <PackageX className="mx-auto h-10 w-10 text-[#524535]/60" />
            <p className="mt-3 text-sm font-bold text-[#141b2b]">
              Aucun produit disponible en vedette.
            </p>
            <p className="mt-1 text-xs text-[#524535]">
              Revenez bientôt pour découvrir notre nouvel arrivage.
            </p>
          </div>
        )}

        {/* Grille des produits */}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <PublicProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}