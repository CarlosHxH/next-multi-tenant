"use client";

import { CartProvider } from "@/providers/CartProvider";
import { TenantProvider } from "@/providers/TenantContext";
import { useParams } from "next/navigation";

interface TenantLayoutProps {
  children: React.ReactNode;
}

export default function TenantLayout({ children }: TenantLayoutProps) {
  const params = useParams();
  const tenant = params.tenant as string;

  return (
    <TenantProvider tenant={tenant}>
      <CartProvider tenant={tenant}>
        {children}
      </CartProvider>
    </TenantProvider>
  );
}

