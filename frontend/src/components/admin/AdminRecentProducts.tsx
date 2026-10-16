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
    <Card className="w-full rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-[#f1f3ff] px-4 py-4 sm:px-6">
        <div>
          <CardTitle className="text-base font-bold text-[#141b2b] sm:text-lg">
            Produits récents
          </CardTitle>

          <p className="mt-0.5 text-xs text-[#524535]">
            Les derniers produits électroniques ajoutés au catalogue.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onViewProducts}
          className="rounded-[0.25rem] text-xs font-semibold text-[#835500] hover:bg-[#e9edff] hover:text-[#e59b22] px-2.5 h-8 gap-1.5"
        >
          <span className="hidden sm:inline">Voir tous les produits</span>
          <span className="sm:hidden">Voir tout</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#524535]">
              <Package className="h-6 w-6" />
            </div>

            <p className="mt-3 text-sm font-bold text-[#141b2b]">
              Aucun produit
            </p>
          </div>
        ) : (
          <div className="max-h-80 divide-y divide-[#f1f3ff] overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={onViewProducts}
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[#f9f9ff] sm:px-6 cursor-pointer"
              >
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-1 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Package className="h-5 w-5 text-[#524535]/60" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-semibold text-[#141b2b]">
                    {product.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#524535]">
                    Stock : <span className="font-bold text-[#141b2b]">{product.stock}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#141b2b]">
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