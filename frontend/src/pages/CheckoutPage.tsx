import { ArrowLeft, ShoppingBag, Truck, Info, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { createOrder } from "@/services/order.service";
import { formatPrice } from "@/lib/format-price";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartCount } = useCart();
  const [loading, setLoading] = useState(false);

  if (!cart || cart.items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
        <ShoppingBag className="h-12 w-12 text-neutral-400" />

        <h1 className="mt-6 text-3xl font-bold">
          Votre panier est vide
        </h1>

        <p className="mt-2 text-neutral-500">
          Ajoutez des articles avant de valider votre commande.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[0.25rem] bg-[#e59b22] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] transition-all"
        >
          Découvrir les produits
        </Link>
      </section>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

  const handleCreateOrder = async () => {
    try {
      setLoading(true);

      await createOrder();

      toast.success(
        "Commande validée avec succès ! Votre panier a été vidé.",
      );

      navigate("/dashboard");
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de créer la commande."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-[#835500] hover:text-[#e59b22] transition-colors font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au panier
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#141b2b] sm:text-3xl">
          Validation de la commande
        </h1>

        <p className="mt-1 text-sm text-[#524535]">
          Vérifiez vos articles et confirmez votre commande.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 items-start">
        <div className="space-y-6">
          {/* Note sur le mode de règlement (Stage & Démo) */}
          <div className="rounded-lg border border-[#0053db]/20 bg-[#e9edff]/50 p-4 sm:p-5 text-sm text-[#00174b]">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#0053db] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-[#00174b] flex items-center gap-2">
                  <span>Mode de règlement : Paiement à la livraison (Démonstration)</span>
                </p>
                <p className="text-xs text-[#003797] leading-relaxed">
                  Dans le cadre de cette version de démonstration, la commande est enregistrée directement dans votre espace client. Les stocks sont automatiquement décrémentés en temps réel de manière transactionnelle.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs font-medium text-[#0053db]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0053db]" />
                  <span>Aucun débit bancaire immédiat requis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des articles */}
          <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#f1f3ff] pb-4">
              <h2 className="text-base font-bold text-[#141b2b] sm:text-lg">
                Articles commandés
              </h2>
              <span className="text-xs font-semibold text-[#524535] bg-[#f1f3ff] px-2.5 py-1 rounded-full border border-[#e5e7eb]">
                {cartCount} {cartCount === 1 ? "article" : "articles"}
              </span>
            </div>

            <div className="divide-y divide-[#f1f3ff]">
              {cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.quantity}`}
                  className="flex gap-4 py-4 first:pt-4"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[0.25rem] bg-[#f9f9ff] sm:h-20 sm:w-20 border border-[#e5e7eb] p-1 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#524535]/70">
                      {item.product.category}
                    </p>

                    <h3 className="mt-0.5 truncate font-semibold text-sm sm:text-base text-[#141b2b]">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-xs sm:text-sm text-[#524535]">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold sm:text-base text-[#141b2b]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne latérale de commande */}
        <aside className="space-y-4">
          <OrderSummary subtotal={subtotal} showActions={false} />

          <Button
            onClick={handleCreateOrder}
            disabled={loading}
            className="min-h-[48px] h-auto w-full py-3 px-4 rounded-[0.25rem] bg-[#e59b22] text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] text-center justify-center"
          >
            {loading ? (
              "Validation en cours..."
            ) : (
              <span className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
                <Truck className="h-4 w-4 shrink-0" />
                <span>Confirmer la commande (Paiement à la livraison)</span>
              </span>
            )}
          </Button>

          <p className="text-center text-[11px] text-[#524535]/70">
            En confirmant, vous acceptez les conditions générales de vente.
          </p>
        </aside>
      </div>
    </section>
  );
}
