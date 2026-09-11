import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminOrder } from "@/services/admin-order.service";

interface AdminOrderTableProps {
  orders: AdminOrder[];
  onView: (order: AdminOrder) => void;
}

const statusStyles = {
  pending:
    "bg-yellow-100 text-yellow-800",
  confirmed:
    "bg-green-100 text-green-800",
  cancelled:
    "bg-red-100 text-red-800",
};

export default function AdminOrderTable({
  orders,
  onView,
}: AdminOrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Order
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Customer
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Items
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Total
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Status
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Date
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-4 font-medium">
                  #{order._id.slice(-8).toUpperCase()}
                </td>

                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium">
                      {order.user.fullName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {order.user.email}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>

                <td className="px-4 py-4 font-medium">
                  {order.totalAmount.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  FCFA
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString("fr-FR")}
                </td>

                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(order)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}