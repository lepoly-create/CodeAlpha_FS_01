import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/contexts/CartContext";
import OrderSummary from "@/components/cart/OrderSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart, cartCount, loading, updateQuantity, removeItem } = useCart();

  {/* État de chargement avec Skeleton */}
  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:p-8">
        <div className="h-6 w-36 animate-pulse rounded bg-slate-200 mb-2" />
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200 mb-8" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 w-full animate-pulse rounded-2xl bg-slate-100 border border-slate-200/60"
              />
            ))}
          </div>
          <div className="h-80 w-full animate-pulse rounded-2xl bg-slate-100 border border-slate-200/60" />
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
    <section className="min-h-screen w-full bg-slate-50/60 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Entête */}
        <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-5">
          <Link
            to="/products"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2 w-fit"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Retour à la boutique
          </Link>

          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-slate-900" />
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Mon Panier
            </h1>
            <span className="ml-2 rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              {cartCount}
            </span>
          </div>
        </div>

        {/* Grille Panier + Résumé */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          
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
          {/*<OrderSummary subtotal={subtotal} /> */}

          <aside className="space-y-2">
            <OrderSummary
              subtotal={subtotal}
            />

            <Link
              to="/checkout"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Proceed to checkout
            </Link>

            <Link
              to="/products"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}