import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { DashboardProduct } from "@/services/dashboard.service";

interface RecommendedProductsProps {
  products: DashboardProduct[];
  onViewProducts: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function RecommendedProducts({
  products,
  onViewProducts,
}: RecommendedProductsProps) {
  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-6 py-5">
        <div>
          <CardTitle className="text-lg font-semibold text-neutral-950">
            Vous pourriez aussi aimer
          </CardTitle>

          <p className="mt-1 text-sm text-neutral-500">
            Découvrez quelques produits qui pourraient vous intéresser.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewProducts}
          className="hidden rounded-xl sm:flex"
        >
          Voir les produits
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
              <Package className="h-5 w-5 text-neutral-400" />
            </div>

            <p className="mt-3 text-sm font-medium text-neutral-800">
              Aucun produit à afficher
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Revenez bientôt pour découvrir nos produits.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-neutral-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-8 w-8 text-neutral-400" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="truncate text-sm font-semibold text-neutral-950">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-neutral-950">
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
            className="w-full rounded-xl"
          >
            Voir tous les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}