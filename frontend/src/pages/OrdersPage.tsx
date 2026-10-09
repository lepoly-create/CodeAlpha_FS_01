import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Package } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import {
  getMyOrder,
  getMyOrders,
  type Order,
} from "@/services/order.service";

const statusLabels: Record<Order["status"], string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Rejetée",
};

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function OrdersPage() {
  const { orderId } = useParams<{ orderId?: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);

        if (orderId) {
          const order = data.find((item) => item._id === orderId);
          setSelectedOrder(order ?? (await getMyOrder(orderId)));
        }
      } catch (error: unknown) {
        toast.error(
          (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Impossible de charger vos commandes.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, [orderId]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center">
        <p className="text-sm text-neutral-500">Chargement des commandes...</p>
      </section>
    );
  }

  if (orderId && selectedOrder) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à mes commandes
        </Link>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>
                Commande #{selectedOrder._id.slice(-8).toUpperCase()}
              </CardTitle>
              <p className="mt-1 text-sm text-neutral-500">
                Passée le {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[selectedOrder.status]}`}
            >
              {statusLabels[selectedOrder.status]}
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedOrder.items.map((item) => (
              <div
                key={`${item.product._id}-${item.quantity}`}
                className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-neutral-500">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="flex justify-between border-t pt-4 font-bold">
              <span>Total</span>
              <span>{formatPrice(selectedOrder.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes commandes</h1>
        <p className="mt-2 text-neutral-500">
          Retrouvez toutes les commandes passées avec votre compte.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <Package className="h-10 w-10 text-neutral-400" />
            <p className="font-semibold">Aucune commande enregistrée</p>
            <Link
              to="/products"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Découvrir les produits
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <Card className="rounded-2xl transition-colors hover:bg-neutral-50">
                <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold">
                      Commande #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}{" "}
                      article(s) • {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                    <span className="font-bold">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
