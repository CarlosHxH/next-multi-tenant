// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { TenantSummary } from "@/types/tenant";
import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { data, loading, error } = useFetch<TenantSummary[]>(`/api/v1/tenants`);

  // Estado de Carregamento Inteligente (Skeleton Cards)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
        <div className="w-full max-w-4xl">
          <div className="h-8 w-64 bg-gray-800 rounded-lg animate-pulse mb-2 mx-auto" />
          <div className="h-4 w-96 bg-gray-800 rounded-lg animate-pulse mb-12 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-gray-900 border border-gray-800 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado de Erro Amigável
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 text-center">
        <span className="text-6xl mb-4">🛸</span>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">404</h1>
        <p className="text-gray-400 max-w-sm">Ops! Não conseguimos carregar a lista de restaurantes disponíveis no momento.</p>
      </div>
    );
  }

  // Estado de Lista Vazia
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 text-center">
        <span className="text-6xl mb-4">🍽️</span>
        <h1 className="text-2xl font-bold mb-2">Nenhum restaurante ativo</h1>
        <p className="text-gray-400">Volte mais tarde para conferir as novidades.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
      <header className="text-center mt-12 mb-16 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent sm:text-5xl">
          Plataforma Multi-Tenant
        </h1>
        <p className="mt-4 text-base text-gray-400">
          Descubra e acesse as nossas lojas parceiras de demonstração focadas em delivery.
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((restaurant) => (
            <Link 
              key={restaurant.id} 
              href={restaurant.href}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-lg shadow-black/40 hover:-translate-y-1"
            >
              {/* Container da Imagem */}
              <div className="relative h-44 w-full bg-gray-800 overflow-hidden">
                <Image
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Overlay gradiente escuro para contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
              </div>

              {/* Informações do Tenant */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {restaurant.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span className="flex items-center text-amber-500 font-medium">★ {restaurant.rattings}</span>
                    <span>•</span>
                    <span>Delivery</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-gray-400 text-xs font-mono">/{restaurant.slug}</span>
                  <span className="text-amber-400 font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
                    Visitar Loja <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}