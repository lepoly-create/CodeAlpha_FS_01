import { ArrowRight, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DashboardOrder } from "@/services/dashboard.service";
import { formatPrice } from "@/lib/format-price";

interface RecentOrdersProps {
  orders: DashboardOrder[];
  onViewAll: () => void;
  onViewOrderDetails?: (orderId: string) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "En attente",
    className: "bg-[#ffddb5]/60 text-[#835500] border-[#835500]/20",
  },
  processing: {
    label: "En préparation",
    className: "bg-[#e9edff] text-[#0053db] border-[#0053db]/20",
  },
  shipped: {
    label: "Expédiée",
    className: "bg-[#f1f3ff] text-[#141b2b] border-[#e5e7eb]",
  },
  confirmed: {
    label: "Confirmée",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  delivered: {
    label: "Livrée",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  cancelled: {
    label: "Rejetée",
    className: "bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20",
  },
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default function RecentOrders({
  orders,
  onViewAll,
  onViewOrderDetails,
}: RecentOrdersProps) {
  return (
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-[#f1f3ff] px-6 py-5">
        <div>
          <CardTitle className="text-base sm:text-lg font-bold text-[#141b2b]">
            Commandes récentes
          </CardTitle>
          <p className="mt-0.5 text-xs text-[#524535]">
            Retrouvez vos dernières commandes en cours et passées.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewAll}
          className="hidden rounded-[0.25rem] text-xs sm:text-sm text-[#835500] hover:text-[#e59b22] hover:bg-[#e9edff] sm:flex font-semibold"
        >
          Voir tout
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#524535]">
              <Package className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#141b2b]">
              Aucune commande enregistrée
            </h3>

            <p className="mt-1 max-w-sm text-xs text-[#524535]">
              Vos commandes apparaîtront ici dès que vous aurez validé votre premier panier.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f1f3ff]">
            {orders.map((order) => {
              const status = statusConfig[order.status] || {
                label: order.status,
                className: "bg-[#f1f3ff] text-[#141b2b] border-[#e5e7eb]",
              };

              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              const firstProduct = order.items[0]?.product;

              return (
                <div
                  key={order._id}
                  className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#f9f9ff] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff]">
                      {firstProduct?.image ? (
                        <img
                          src={firstProduct.image}
                          alt={firstProduct.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-5 w-5 text-[#524535]/50" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-[#141b2b]">
                          Commande N° {order._id.slice(-6).toUpperCase()}
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="truncate text-xs font-medium text-[#524535]">
                        {firstProduct?.name || "Produit"}
                        {order.items.length > 1 &&
                          ` + ${order.items.length - 1} autre${order.items.length - 1 > 1 ? "s" : ""
                          }`}
                      </p>

                      <p className="text-[11px] text-[#524535]/70">
                        {totalItems} article{totalItems > 1 ? "s" : ""} •{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-[#f1f3ff] pt-3 sm:border sm:pt-0 sm:justify-end">
                    <p className="text-sm font-bold text-[#141b2b]">
                      {formatPrice(order.totalAmount)}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewOrderDetails?.(order._id)}
                      className="rounded-[0.25rem] border-[#e5e7eb] hover:bg-[#f1f3ff] text-xs font-semibold text-[#141b2b]"
                    >
                      Détails
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-[#f1f3ff] p-4 sm:hidden">
          <Button
            variant="outline"
            onClick={onViewAll}
            className="w-full rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold"
          >
            Voir toutes les commandes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}