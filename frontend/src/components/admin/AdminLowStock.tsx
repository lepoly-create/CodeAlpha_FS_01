import { AlertTriangle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminProduct } from "@/services/admin.service";

interface AdminLowStockProps {
  products: AdminProduct[];
  onViewProducts: () => void;
}

export default function AdminLowStock({
  products,
  onViewProducts,
}: AdminLowStockProps) {
  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-6 py-5">
        <div>
          <CardTitle className="text-lg font-semibold">
            Stock faible
          </CardTitle>

          <p className="mt-1 text-sm text-neutral-500">
            Produits nécessitant votre attention.
          </p>
        </div>

        <AlertTriangle className="h-5 w-5 text-neutral-500" />
      </CardHeader>

      <CardContent>
        {products.length === 0 ? (
          <div className="rounded-xl bg-neutral-50 px-4 py-6 text-center">
            <p className="text-sm font-medium text-neutral-800">
              Stock correct
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Aucun produit n'est actuellement en stock faible.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-100 p-3"
              >
                <p className="truncate text-sm font-medium">
                  {product.name}
                </p>

                <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  {product.stock} restant
                  {product.stock > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          onClick={onViewProducts}
          className="mt-5 w-full rounded-xl"
        >
          Gérer les produits
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}