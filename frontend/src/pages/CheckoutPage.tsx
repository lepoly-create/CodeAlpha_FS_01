import {
  ArrowLeft,
  CreditCard,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/services/order.service";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cart, cartCount } = useCart();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!cart || cart.items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <ShoppingBag className="h-7 w-7 text-neutral-500" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-neutral-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      setError("");

      const order = await createOrder();

      navigate(`/orders/${order._id}`);
    } catch (error: unknown) {
      console.error(
        "Erreur lors de la création de la commande :",
        error,
      );

      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: { data?: unknown } }).response !== null &&
        "data" in
          (error as { response?: { data?: unknown } }).response!
          ? (
              error as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      setError(message ?? "Unable to complete your order.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Checkout
        </h1>

        <p className="mt-2 text-neutral-500">
          Review your order before confirming your purchase.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Order items */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Order items
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                {cartCount}{" "}
                {cartCount === 1 ? "item" : "items"}
              </p>
            </div>

            <ShoppingBag className="h-5 w-5 text-neutral-400" />
          </div>

          <div className="mt-6 divide-y divide-neutral-200">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {item.product.category}
                  </p>

                  <h3 className="mt-1 truncate font-semibold">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    ${item.product.price.toLocaleString()} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  $
                  {(
                    item.product.price *
                    item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span className="font-medium">
                ${total.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">
                Shipping
              </span>

              <span className="font-medium">
                Free
              </span>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            onClick={handleCheckout}
            disabled={processing}
            className="mt-6 h-12 w-full rounded-xl text-base"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Confirm order
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-xs text-neutral-500">
            Your order will be created securely on the server.
          </p>
        </aside>
      </div>
    </section>
  );
}