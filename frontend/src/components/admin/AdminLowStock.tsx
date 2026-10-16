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
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-[#f1f3ff] px-6 py-4">
        <div>
          <CardTitle className="text-base font-bold text-[#141b2b]">
            Stock faible
          </CardTitle>

          <p className="mt-0.5 text-xs text-[#524535]">
            Produits nécessitant un réapprovisionnement.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/50 text-[#835500]">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {products.length === 0 ? (
          <div className="rounded-[0.25rem] bg-[#f9f9ff] border border-[#e5e7eb] px-4 py-6 text-center">
            <p className="text-sm font-bold text-[#141b2b]">
              Stock correct
            </p>

            <p className="mt-1 text-xs text-[#524535]">
              Aucun produit n'est actuellement en stock faible.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between gap-3 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3"
              >
                <p className="truncate text-xs sm:text-sm font-semibold text-[#141b2b]">
                  {product.name}
                </p>

                <span className="shrink-0 rounded-full bg-[#ffddb5] px-2.5 py-0.5 text-xs font-bold text-[#835500] shadow-2xs">
                  {product.stock} restant{product.stock > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          onClick={onViewProducts}
          className="mt-5 w-full rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:border-[#e59b22] hover:bg-[#f1f3ff] hover:text-[#835500] cursor-pointer"
        >
          Gérer les produits
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}