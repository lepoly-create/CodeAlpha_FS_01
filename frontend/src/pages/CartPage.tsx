import { ShoppingBag } from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "@/contexts/CartContext";

import OrderSummary from "@/components/cart/OrderSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const {
    cart,
    cartCount,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />

          <p className="mt-4 text-sm text-neutral-500">
            Loading your cart...
          </p>
        </div>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <CartEmptyState />;
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0,
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <ShoppingBag className="h-4 w-4" />
          <span>Shopping cart</span>
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          My Cart
        </h1>

        <p className="mt-2 text-neutral-500">
          {cartCount}{" "}
          {cartCount === 1
            ? "item"
            : "items"}{" "}
          in your cart
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onUpdateQuantity={
                updateQuantity
              }
              onRemoveItem={removeItem}
            />
          ))}
        </div>

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
    </section>
  );
}