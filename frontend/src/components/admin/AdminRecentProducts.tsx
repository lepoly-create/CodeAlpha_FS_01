import { ArrowRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminProduct } from "@/services/admin.service";
import { formatPrice } from "@/lib/format-price";

interface AdminRecentProductsProps {
  products: AdminProduct[];
  onViewProducts: () => void;
}

export default function AdminRecentProducts({
  products,
  onViewProducts,
}: AdminRecentProductsProps) {
  return (
    <Card className="w-full rounded-2xl border-neutral-200 bg-white shadow-none lg:max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-neutral-100 px-4 py-4 sm:px-5">
        <div>
          <CardTitle className="text-base font-semibold sm:text-lg">
            Produits récents
          </CardTitle>

          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Les derniers produits ajoutés.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewProducts}
          className="hidden rounded-xl sm:flex"
        >
          Voir toutes les produits
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Package className="h-8 w-8 text-neutral-400" />

            <p className="mt-3 text-sm font-medium">
              Aucun produit
            </p>
          </div>
        ) : (
          <div className="max-h-80 divide-y divide-neutral-100 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-neutral-50 sm:px-5"              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-5 w-5 text-neutral-400" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Stock : {product.stock}
                  </p>
                </div>

                <p className="text-sm font-bold">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}