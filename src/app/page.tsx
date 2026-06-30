// app/page.tsx
"use client";

import Link from "next/link";
import { TenantSummary } from "@/types/tenant";
import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { data, loading, error } = useFetch<TenantSummary[]>(`/api/v1/tenants`);


  const Tenants = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <p className="text-gray-500 animate-pulse">Carregando tenant...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-lg text-gray-600">Ops! Esse tenant não foi encontrado.</p>
        </div>
      );
    }
    if (!data) {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800">
          <h1 className="text-4xl font-bold mb-2">Vazio</h1>
        </div>
      );
    }
    return data.map((item) => (
      <Link key={item.id} href={item.slug} className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all shadow-lg">
        {item.name}
      </Link>
    ))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Plataforma Multi-Tenant</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Selecione uma das lojas de demonstração abaixo para acessar:
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        {Tenants()}
      </div>
    </div>
  );
}