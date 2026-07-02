"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  notes: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  tenant: string;
}

export function CartProvider({ children, tenant }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Chave de armazenamento única por tenant
  const storageKey = `cart-items-${tenant}`;

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem(storageKey);
      if (storedItems) {
        try {
          setItems(JSON.parse(storedItems));
        } catch (error) {
          console.error("Erro ao carregar carrinho:", error);
        }
      }
      setIsHydrated(true);
    }
  }, [storageKey]);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, isHydrated, storageKey]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product_id === item.product_id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevItems, item];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.product_id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((i) =>
        i.product_id === productId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const updateNotes = useCallback((productId: string, notes: string) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.product_id === productId ? { ...i, notes } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isHydrated,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}

