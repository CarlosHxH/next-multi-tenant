"use client";

import { CartProvider } from "@/providers/CartProvider";
import { useParams } from "next/navigation";

interface TenantLayoutProps {
  children: React.ReactNode;
}

export default function TenantLayout({ children }: TenantLayoutProps) {
  const params = useParams();
  const tenant = params.tenant as string;

  return (
    <CartProvider tenant={tenant}>
      {children}
    </CartProvider>
  );
}

