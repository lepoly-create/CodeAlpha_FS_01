import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DashboardOrder } from "@/services/dashboard.service";

interface RecentOrdersProps {
  orders: DashboardOrder[];
  onViewAll: () => void;
}

const statusConfig = {
  pending: {
    label: "En attente",
    className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },
  confirmed: {
    label: "Confirmée",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },
  cancelled: {
    label: "Annulée",
    className: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(price);
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
}: RecentOrdersProps) {
  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-neutral-100 px-6 py-5">
        <div>
          <CardTitle className="text-lg font-semibold text-neutral-950">
            Commandes récentes
          </CardTitle>

          <p className="mt-1 text-sm text-neutral-500">
            Retrouvez vos dernières commandes.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewAll}
          className="hidden rounded-xl cursor-pointer text-sm sm:flex"
        >
          Voir toutes
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
              <Package className="h-6 w-6 text-neutral-500" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-neutral-950">
              Aucune commande pour le moment
            </h3>

            <p className="mt-1 max-w-sm text-sm text-neutral-500">
              Vos commandes apparaîtront ici dès que vous aurez effectué
              votre premier achat.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => {
              const status = statusConfig[order.status];

              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              const firstProduct = order.items[0]?.product;

              return (
                <div
                  key={order._id}
                  className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-neutral-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                      {firstProduct?.image ? (
                        <img
                          src={firstProduct.image}
                          alt={firstProduct.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-5 w-5 text-neutral-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-neutral-950">
                          Commande #{order._id.slice(-6).toUpperCase()}
                        </p>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-neutral-500">
                        {firstProduct?.name || "Produit"}
                        {order.items.length > 1 &&
                          ` + ${order.items.length - 1} autre${
                            order.items.length - 1 > 1 ? "s" : ""
                          }`}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {totalItems} article{totalItems > 1 ? "s" : ""} ·{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <p className="text-base font-bold text-neutral-950">
                      {formatPrice(order.totalAmount)}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Navigation vers le détail de la commande à brancher plus tard.
                      }}
                      className="rounded-xl"
                    >
                      Détails
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-neutral-100 px-6 py-4 sm:hidden">
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="w-full rounded-xl cursor-pointer"
          >
            Voir toutes les commandes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}