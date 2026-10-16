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
      "bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20",
  },

  confirmed: {
    label: "Confirmée",
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },

  cancelled: {
    label: "Annulée",
    className:
      "bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20",
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
    <Card className="w-full rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-[#f1f3ff] px-4 py-4 sm:px-6">
        <div>
          <CardTitle className="text-base font-bold text-[#141b2b] sm:text-lg">
            Commandes récentes
          </CardTitle>

          <p className="mt-0.5 text-xs text-[#524535]">
            Les dernières commandes passées sur la boutique.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onViewOrders}
          className="rounded-[0.25rem] text-xs font-semibold text-[#835500] hover:bg-[#e9edff] hover:text-[#e59b22] px-2.5 h-8 gap-1.5"
        >
          <span className="hidden sm:inline">Voir toutes les commandes</span>
          <span className="sm:hidden">Voir tout</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#524535]">
              <Package className="h-6 w-6" />
            </div>

            <p className="mt-3 text-sm font-bold text-[#141b2b]">
              Aucune commande pour le moment
            </p>

            <p className="mt-1 text-xs text-[#524535]">
              Les nouvelles commandes apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="max-h-80 divide-y divide-[#f1f3ff] overflow-y-auto">
            {orders.map((order) => {
              const status = statusConfig[order.status];

              return (
                <div
                  key={order._id}
                  onClick={onViewOrders}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-[#f9f9ff] sm:px-6 cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#141b2b]">
                      Commande #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#524535]">
                      {order.user?.fullName || "Client inconnu"}
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#524535]/70">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <span className="text-sm font-bold text-[#141b2b]">
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