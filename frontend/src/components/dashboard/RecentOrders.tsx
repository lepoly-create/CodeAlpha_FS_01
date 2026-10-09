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
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  processing: {
    label: "En préparation",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  shipped: {
    label: "Expédiée",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
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
    className: "bg-rose-50 text-rose-700 border-rose-200",
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
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Commandes récentes
          </CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">
            Retrouvez vos dernieres commandes.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewAll}
          className="hidden rounded-xl text-xs sm:text-sm text-slate-600 hover:bg-slate-100 sm:flex"
        >
          Voir tout
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Aucune commande enregistrée
            </h3>

            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Vos commandes apparaîtront ici dès que vous aurez validé votre premier panier.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {orders.map((order) => {
              const status = statusConfig[order.status] || {
                label: order.status,
                className: "bg-slate-100 text-slate-700 border-slate-200",
              };

              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              const firstProduct = order.items[0]?.product;

              return (
                <div
                  key={order._id}
                  className="flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {firstProduct?.image ? (
                        <img
                          src={firstProduct.image}
                          alt={firstProduct.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">
                          Commande N {order._id.slice(-6).toUpperCase()}
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="truncate text-xs font-medium text-slate-600">
                        {firstProduct?.name || "Produit"}
                        {order.items.length > 1 &&
                          ` + ${order.items.length - 1} autre${
                            order.items.length - 1 > 1 ? "s" : ""
                          }`}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {totalItems} article{totalItems > 1 ? "s" : ""} •{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 sm:justify-end">
                    <p className="text-sm font-bold text-slate-900">
                      {formatPrice(order.totalAmount)}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewOrderDetails?.(order._id)}
                      className="rounded-xl border-slate-200 hover:bg-slate-100 text-xs text-slate-700"
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

        <div className="border-t border-slate-100 p-4 sm:hidden">
          <Button
            variant="outline"
            onClick={onViewAll}
            className="w-full rounded-xl border-slate-200 text-xs"
          >
            Voir toutes les commandes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}