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

import { useAuth } from "@/contexts/useAuth";
import type { Cart } from "@/types/cart";

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
  const userId = user?.id ?? null;

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(
    Boolean(userId),
  );

  const refreshCart = useCallback(async () => {
    if (!userId) {
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
  }, [userId]);

  const addToCart = useCallback(
    async (
      productId: string,
      quantity = 1,
    ) => {
      try {
        const updatedCart =
          await addToCartRequest({
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
    },
    [],
  );

  const updateQuantity = useCallback(
    async (
      productId: string,
      quantity: number,
    ) => {
      if (quantity < 1) {
        return;
      }

      try {
        const updatedCart =
          await updateCartItem(
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
    },
    [],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        const updatedCart =
          await removeFromCart(productId);

        setCart(updatedCart);
      } catch (error) {
        console.error(
          "Impossible de supprimer le produit :",
          error,
        );

        throw error;
      }
    },
    [],
  );

  const cartCount = cart
    ? cart.items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      )
    : 0;

  useEffect(() => {
    const promise = Promise.resolve().then(refreshCart);

    return () => {
      void promise.catch(() => undefined);
    };
  }, [refreshCart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartCount,
      loading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
    }),
    [
      cart,
      cartCount,
      loading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
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