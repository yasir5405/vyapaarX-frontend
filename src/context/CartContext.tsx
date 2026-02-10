import { getCart } from "@/api/cart.api";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  count: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const refreshCart = async () => {
    const res = await getCart();

    if (res.success && res.data?.cartItems) {
      const total = res.data.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );

      setCount(total);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ count, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
