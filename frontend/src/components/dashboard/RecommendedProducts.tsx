import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { DashboardProduct } from "@/services/dashboard.service";
import { formatPrice } from "@/lib/format-price";

interface RecommendedProductsProps {
  products: DashboardProduct[];
  onViewProducts: () => void;
  onSelectProduct?: (productId: string) => void;
}

export default function RecommendedProducts({
  products,
  onViewProducts,
  onSelectProduct,
}: RecommendedProductsProps) {
  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Recommandé pour vous
          </CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">
            Une sélection d'articles basée sur les nouveautés du catalogue.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewProducts}
          className="hidden rounded-xl text-xs sm:text-sm text-slate-600 hover:bg-slate-100 sm:flex"
        >
          Tout le catalogue
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package className="h-6 w-6" />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Aucune recommandation disponible
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Revenez bientôt pour découvrir de nouveaux produits.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product._id}
                onClick={() => onSelectProduct?.(product._id)}
                className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-square relative overflow-hidden bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="p-3.5 space-y-1">
                  <h3 className="truncate text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 sm:hidden">
          <Button
            variant="outline"
            onClick={onViewProducts}
            className="w-full rounded-xl border-slate-200 text-xs"
          >
            Voir tous les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}