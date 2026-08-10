import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { cart, cartCount, loading } = useCart();

  if (loading) {
    return (
      <section className="px-6 py-8">
        <p className="text-sm text-neutral-500">
          Loading your cart...
        </p>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <ShoppingBag className="h-7 w-7 text-neutral-500" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-neutral-500">
          Discover our latest electronics and add your
          favorite products to your cart.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

  return (
    <section className="px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-neutral-500">
          Shopping cart
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight">
          My Cart
        </h1>

        <p className="mt-2 text-neutral-500">
          {cartCount} {cartCount === 1 ? "item" : "items"} in
          your cart
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Products */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <article
              key={item._id}
              className="flex gap-5 rounded-2xl border border-neutral-200 bg-white p-4"
            >
              {/* Image */}
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product information */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {item.product.category}
                  </p>

                  <h2 className="mt-1 truncate text-lg font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    ${item.product.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity + remove */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-neutral-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="flex h-9 min-w-10 items-center justify-center border-x border-neutral-200 text-sm font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Item total */}
              <div className="hidden text-right sm:block">
                <p className="font-semibold">
                  $
                  {(
                    item.product.price * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            </article>
          ))}
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
                ${subtotal.toLocaleString()}
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
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Button className="mt-6 h-12 w-full rounded-xl text-base">
            Proceed to checkout
          </Button>

          <Link
            to="/products"
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}