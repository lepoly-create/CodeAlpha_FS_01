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
  pending: "bg-[#ffddb5]/60 text-[#835500] border-[#835500]/20",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-[#ffdad6]/60 text-[#ba1a1a] border-[#ba1a1a]/20",
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
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const data = await getMyOrders();

        if (isMounted) {
          setOrders(data);

          if (orderId) {
            const order = data.find((item) => item._id === orderId);
            setSelectedOrder(order ?? (await getMyOrder(orderId)));
          }
        }
      } catch (error: unknown) {
        if (isMounted) {
          toast.error(
            (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Impossible de charger vos commandes.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center">
        <p className="text-sm font-medium text-[#524535]">Chargement des commandes...</p>
      </section>
    );
  }

  if (orderId && selectedOrder) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#524535] hover:text-[#835500] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à mes commandes
        </Link>

        <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
          <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#f1f3ff] pb-5">
            <div>
              <CardTitle className="text-lg sm:text-xl font-bold text-[#141b2b]">
                Commande #{selectedOrder._id.slice(-8).toUpperCase()}
              </CardTitle>
              <p className="mt-1 text-xs sm:text-sm text-[#524535]">
                Passée le {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold self-start sm:self-auto ${statusStyles[selectedOrder.status]}`}
            >
              {statusLabels[selectedOrder.status]}
            </span>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            {selectedOrder.items.map((item) => (
              <div
                key={`${item.product._id}-${item.quantity}`}
                className="flex items-center justify-between gap-4 border-b border-[#f1f3ff] pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-[#141b2b]">{item.product.name}</p>
                  <p className="text-xs text-[#524535]">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#141b2b]">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="flex justify-between border-t border-[#e5e7eb] pt-4 text-base font-bold text-[#141b2b]">
              <span>Total</span>
              <span className="text-[#835500]">{formatPrice(selectedOrder.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
          Espace Client
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141b2b]">
          Mes commandes
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#524535]">
          Retrouvez toutes les commandes passées avec votre compte et suivez leur statut.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="rounded-lg border border-dashed border-[#e5e7eb] bg-white shadow-xs">
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#e9edff] text-[#0053db]">
              <Package className="h-8 w-8 text-[#0053db]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#141b2b]">Aucune commande enregistrée</p>
              <p className="mt-1 text-xs text-[#524535]">
                Vous n'avez pas encore passé de commande sur notre boutique.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex h-10 items-center justify-center rounded-[0.25rem] bg-[#e59b22] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] transition-all"
            >
              Découvrir les produits
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <Card className="rounded-lg border border-[#e5e7eb] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e59b22]/50 hover:shadow-md">
                <CardContent className="flex flex-col justify-between gap-4 p-4 sm:p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[#141b2b]">
                      Commande #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="mt-1 text-xs text-[#524535]">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}{" "}
                      article(s) • {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                    <span className="text-base font-bold text-[#141b2b]">
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
