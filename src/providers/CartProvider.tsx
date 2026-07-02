"use client";

import { CartProvider as UseCartProvider } from "react-use-cart";
import { ReactNode } from "react";

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <UseCartProvider>
      {children}
    </UseCartProvider>
  );
}
