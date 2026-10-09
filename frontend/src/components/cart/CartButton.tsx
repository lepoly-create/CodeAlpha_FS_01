import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border-0 border-slate-200/80 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 shadow-sm"
      aria-label={`Panier contenant ${cartCount} article${
        cartCount > 1 ? "s" : ""
      }`}
    >
      <ShoppingBag className="h-5 w-5 text-slate-700" />

      {cartCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-in zoom-in-50 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white shadow-md">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}