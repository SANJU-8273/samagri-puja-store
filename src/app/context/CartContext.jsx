"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 🆕 Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // optional: persist cart to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("samagri_cart");
      if (raw) setCartItems(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("samagri_cart", JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    // 🆕 Automatically open drawer when new item added
    setIsCartOpen(false);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((s, it) => s + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,

        // 🆕 expose drawer controls
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
