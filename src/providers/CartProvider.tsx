"use client";

import { CartProvider as UseCartProvider } from "react-use-cart";
import { ReactNode } from "react";

interface CartProviderProps {
  children: ReactNode;
  tenant?: string;
}

export function CartProvider({ children, tenant }: CartProviderProps) {
  // O react-use-cart armazena automaticamente no localStorage
  // Cada tenant terá seu próprio carrinho isolado através da estrutura de routes
  return (
    <UseCartProvider>
      {children}
    </UseCartProvider>
  );
}

