"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import dishes from "../data/dishes";
import { DELIVERY_FEE } from "../lib/format";

export const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  // Only { id, quantity } is stored; names, prices and photos always come from dishes.js.
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const addItem = (dish, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === dish.id);
      if (existing) {
        return prev.map((l) =>
          l.id === dish.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { id: dish.id, quantity }];
    });
  };

  const setQuantity = (id, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity } : l))
    );
  };

  const removeItem = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
  const clearCart = () => setLines([]);

  const value = useMemo(() => {
    const items = lines
      .map((l) => {
        const dish = dishes.find((d) => d.id === l.id);
        return dish ? { ...dish, quantity: l.quantity } : null;
      })
      .filter(Boolean);
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const delivery = items.length ? DELIVERY_FEE : 0;
    return {
      items,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      ready,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
