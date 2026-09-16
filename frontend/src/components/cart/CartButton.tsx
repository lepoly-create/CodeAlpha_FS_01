import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-neutral-100"
        aria-label={`Panier contenant ${cartCount} article${
            cartCount > 1 ? "s" : ""
        }`}
        >
      <ShoppingCart className="h-5 w-5" />

      {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
            </span>
      )}
    </Link>
  );
}