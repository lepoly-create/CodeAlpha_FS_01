import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/contexts/CartContext";
import OrderSummary from "@/components/cart/OrderSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart, cartCount, loading, updateQuantity, removeItem } = useCart();

  {/* État de chargement avec Skeleton */ }
  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:p-8">
        <div className="h-6 w-36 animate-pulse rounded bg-[#f1f3ff] mb-2" />
        <div className="h-8 w-48 animate-pulse rounded bg-[#f1f3ff] mb-8" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 w-full animate-pulse rounded-lg bg-[#f1f3ff] border border-[#e5e7eb]"
              />
            ))}
          </div>
          <div className="h-80 w-full animate-pulse rounded-lg bg-[#f1f3ff] border border-[#e5e7eb]" />
        </div>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <CartEmptyState />;
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen w-full bg-[#f9f9ff] py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Entête */}
        <div className="flex flex-col gap-1 border-b border-[#e5e7eb] pb-5">
          <Link
            to="/products"
            className="inline-flex items-center text-xs font-semibold text-[#524535] hover:text-[#835500] transition-colors mb-2 w-fit"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Retour à la boutique
          </Link>

          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-[#141b2b]" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
              Mon Panier
            </h1>
            <span className="ml-2 rounded-full bg-[#e9edff] px-2.5 py-0.5 text-xs font-bold text-[#0053db]">
              {cartCount}
            </span>
          </div>
        </div>

        {/* Grille Panier + Résumé */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">

          {/* Liste des Articles */}
          <div className="space-y-3">
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            ))}
          </div>

          {/* Résumé de Commande */}
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </section>
  );
}