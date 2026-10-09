import { ArrowRight, AlertCircle, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";
import PublicProductCard from "@/components/products/PublicProductCard";

export default function FeaturedProductsSection() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="products" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
              Sélection du mois
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Les incontournables du moment.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Découvrez les appareils électroniques les plus plébiscités par nos clients ce mois-ci.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
          >
            Voir tous les produits ({products.length})
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Skeleton Loading moderne */}
        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[380px] animate-pulse rounded-2xl bg-slate-100/80 border-0 border-slate-200/60"
              />
            ))}
          </div>
        )}

        {/* État Erreur */}
        {error && !loading && (
          <div className="mt-12 rounded-3xl border border-red-200 bg-red-50/50 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 text-sm font-bold text-slate-900">
              Impossible de charger le catalogue actuellement.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Veuillez vérifier votre connexion internet ou réessayer ultérieurement.
            </p>
          </div>
        )}

        {/* État Vide */}
        {!loading && !error && featuredProducts.length === 0 && (
          <div className="mt-12 rounded-3xl border-0 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
            <PackageX className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-bold text-slate-900">
              Aucun produit disponible en vedette.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Revenez bientôt pour découvrir notre nouvelle arrivage.
            </p>
          </div>
        )}

        {/* Grille des produits */}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <PublicProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}