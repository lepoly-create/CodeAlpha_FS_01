import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminOrder } from "@/services/admin-order.service";
import { formatPrice } from "@/lib/format-price";

interface AdminOrderTableProps {
  orders: AdminOrder[];
  onView: (order: AdminOrder) => void;
  onDelete: (order: AdminOrder) => void;
}

const statusStyles: Record<AdminOrder["status"], string> = {
  pending: "bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20",
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20",
};

const statusLabels: Record<AdminOrder["status"], string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
};

export default function AdminOrderTable({
  orders,
  onView,
  onDelete,
}: AdminOrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#e5e7eb] bg-white p-10 text-center shadow-xs">
        <p className="text-sm font-semibold text-[#524535]">
          Aucune commande trouvée.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* VUE MOBILE (< 768px) : Cartes tactiles de commandes */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => {
          const totalItems = order.items.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return (
            <div
              key={order._id}
              className="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#f1f3ff] pb-2.5">
                <div>
                  <span className="font-bold text-xs text-[#141b2b]">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <p className="text-[11px] text-[#524535]">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusStyles[order.status]
                    }`}
                >
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-sm text-[#141b2b]">
                  {order.user?.fullName || "Client inconnu"}
                </p>
                <p className="text-xs text-[#524535]">
                  {order.user?.email || "Email indisponible"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#524535]">
                  {totalItems} article{totalItems > 1 ? "s" : ""}
                </span>
                <span className="text-sm font-bold text-[#141b2b]">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>

              <div className="flex items-center gap-2 border-t border-[#f1f3ff] pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(order)}
                  className="flex-1 rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff] h-9 gap-1.5"
                >
                  <Eye className="h-3.5 w-3.5 text-[#0053db]" />
                  Détails
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(order)}
                  className="flex-1 rounded-[0.25rem] border-[#ffdad6] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 h-9 gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Supprimer
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VUE TABLETTE & DESKTOP (>= 768px) : Tableau classique */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead className="border-b border-[#f1f3ff] bg-[#f9f9ff] text-[#141b2b]">
              <tr>
                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Commande
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Client
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Articles
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Montant
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Statut
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Date
                </th>

                <th className="px-5 py-3.5 text-right font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f1f3ff]">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-colors hover:bg-[#f9f9ff]"
                >
                  <td className="px-5 py-3.5 font-bold text-xs text-[#141b2b]">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#141b2b]">
                        {order.user?.fullName || "Client inconnu"}
                      </p>

                      <p className="text-[11px] text-[#524535]">
                        {order.user?.email || "Email indisponible"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-xs font-semibold text-[#141b2b]">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}{" "}
                    article(s)
                  </td>

                  <td className="px-5 py-3.5 font-bold text-sm text-[#141b2b]">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusStyles[order.status]
                        }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-xs text-[#524535]">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(order)}
                        className="h-8 rounded-[0.25rem] text-xs font-semibold text-[#524535] hover:bg-[#e9edff] hover:text-[#0053db] gap-1.5 px-2.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Détails
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(order)}
                        className="h-8 rounded-[0.25rem] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/50 hover:text-[#93000a] px-2.5"
                        title="Supprimer la commande"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}