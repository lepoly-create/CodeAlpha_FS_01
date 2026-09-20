import { ArrowRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminOrder } from "@/services/admin-order.service";
import { formatPrice } from "@/lib/format-price";

interface AdminRecentOrdersProps {
  orders: AdminOrder[];
  onViewOrders: () => void;
}

const statusConfig = {
  pending: {
    label: "En attente",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },

  confirmed: {
    label: "Confirmée",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },

  cancelled: {
    label: "Annulée",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  },
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function AdminRecentOrders({
  orders,
  onViewOrders,
}: AdminRecentOrdersProps) {
  return (
    <Card className="w-full rounded-2xl border-neutral-200 bg-white shadow-none lg:max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-neutral-100 px-4 py-4 sm:px-5">
        <div>
          <CardTitle className="text-base font-semibold sm:text-lg">
            Commandes récentes
          </CardTitle>

          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Les dernières commandes de la boutique.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onViewOrders}
          className="hidden rounded-xl sm:flex"
        >
          Voir toutes les comandes
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
              <Package className="h-6 w-6 text-neutral-400" />
            </div>

            <p className="mt-4 text-sm font-semibold">
              Aucune commande
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Les nouvelles commandes apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="max-h-80 divide-y divide-neutral-100 overflow-y-auto">
            {orders.map((order) => {
              const status = statusConfig[order.status];

              return (
                <div
                  key={order._id}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-neutral-50 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-neutral-950">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-1 truncate text-sm text-neutral-500">
                      {order.user?.fullName || "Client inconnu"}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <span className="text-sm font-bold text-neutral-950">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        
      </CardContent>
    </Card>
  );
}