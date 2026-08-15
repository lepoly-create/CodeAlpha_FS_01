/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  addToCart as addToCartRequest,
  getCart,
  updateCartItem,
  removeFromCart,
} from "@/services/cart.service";
import { useAuth } from "@/contexts/AuthContext";
import type { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total?: number;
}

interface CartContextValue {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;

  refreshCart: () => Promise<void>;

  addToCart: (
    productId: string,
    quantity?: number,
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    quantity: number,
  ) => Promise<void>;

  removeItem: (
    productId: string,
  ) => Promise<void>;
}

const CartContext = createContext<
  CartContextValue | undefined
>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const { user } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Récupérer le panier depuis le backend
   */
  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();

      setCart(data);
    } catch (error) {
      console.error(
        "Impossible de récupérer le panier :",
        error,
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Ajouter un produit
   */
  const addToCart = async (
    productId: string,
    quantity = 1,
  ) => {
    try {
      const updatedCart = await addToCartRequest({
        productId,
        quantity,
      });

      setCart(updatedCart);
    } catch (error) {
      console.error(
        "Impossible d'ajouter le produit au panier :",
        error,
      );

      throw error;
    }
  };

  /**
   * Modifier la quantité
   */
  const updateQuantity = async (
    productId: string,
    quantity: number,
  ) => {
    if (quantity < 1) {
      return;
    }

    try {
      const updatedCart = await updateCartItem(
        productId,
        quantity,
      );

      setCart(updatedCart);
    } catch (error) {
      console.error(
        "Impossible de modifier la quantité :",
        error,
      );

      throw error;
    }
  };

  /**
   * Supprimer un produit
   */
  const removeItem = async (
    productId: string,
  ) => {
    try {
      const updatedCart = await removeFromCart(
        productId,
      );

      setCart(updatedCart);
    } catch (error) {
      console.error(
        "Impossible de supprimer le produit :",
        error,
      );

      throw error;
    }
  };

  /**
   * Nombre total d'articles
   */
  const cartCount = useMemo(() => {
    if (!cart) {
      return 0;
    }

    return cart.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cart]);

  /**
   * Charger le panier lorsqu'un utilisateur
   * authentifié est disponible.
   */
  useEffect(() => {
    // Avoid calling setState synchronously within the effect body to prevent
    // cascading renders. Schedule the refresh on the next macrotask.
    const id = setTimeout(() => {
      void refreshCart();
    }, 0);

    return () => clearTimeout(id);
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        refreshCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur de CartProvider.",
    );
  }

  return context;
}