// app/[tenant]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { TenantData } from "@/types/tenant";

// interface TenantHomePageProps {
//   params: {
//     tenant: string;
//   };
// }
interface TenantProps {
  tenant:string;
}

export default function TenantHomePage({ tenant }: TenantProps) {
  // Nota: No Next.js App Router (Client Components), o ideal é desestruturar o params
  // const { tenant } = params;
  const { data, loading, error } = useFetch<TenantData>(`/api/v1/tenants/${tenant}`);

  // Loading Skeleton customizado para o Cardápio
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="h-48 w-full bg-gray-200 animate-pulse" />
        <div className="max-w-4xl w-full mx-auto p-4 mt-4 space-y-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <span className="text-5xl mb-4">🍽️</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Restaurante não encontrado</h1>
        <p className="text-gray-500 mb-6">O cardápio que você está tentando acessar não existe ou está indisponível.</p>
        <Link href="/" className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 antialiased pb-24">
      {/* Capa do Restaurante & Cabeçalho */}
      <div className="relative h-48 md:h-64 w-full bg-gray-900 overflow-hidden">
        <Image
          src={data.image_url}
          alt={data.name}
          fill
          className="object-cover opacity-40 blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
        
        {/* Botão de Voltar Flutuante */}
        {/* <Link 
          href="/" 
          className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg transition-transform hover:-translate-x-0.5"
        >
          <span className="text-sm font-bold">← Voltar</span>
        </Link> */}
      </div>

      {/* Perfil/Detalhes do Restaurante */}
      <header className="relative max-w-4xl mx-auto px-4 -mt-16 z-10 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden shadow border border-gray-100 bg-white flex-shrink-0">
              <Image src={data.image_url} alt={data.name} fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Aberto</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">{data.name}</h1>
            </div>
          </div>

          {/* Regras de Delivery */}
          <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 text-sm">
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tempo Est.</p>
              <p className="text-gray-800 font-bold mt-0.5">⏱️ {data.delivery_rules.estimated_time_minutes} min</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Taxa de Entrega</p>
              <p className="text-emerald-600 font-bold mt-0.5">
                {data.delivery_rules.fixed_fee === 0 ? "Grátis" : `R$ ${data.delivery_rules.fixed_fee.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Lista do Cardápio / Categorias */}
      <section className="max-w-4xl mx-auto px-4 space-y-10">
        {data.categories.map((category) => (
          <div key={category.category_id}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 sticky top-0 bg-gray-50/95 backdrop-blur py-2 z-20 border-b border-gray-200/60">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.products.map((product) => {
                const isAvailable = product.available;
                
                return (
                  <Link 
                    key={product.product_id} 
                    href={`/${tenant}/product/${product.product_id}`}
                    className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all group ${!isAvailable ? "opacity-60 bg-gray-50/50" : ""}`}
                  >
                    {/* Detalhes de Texto */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 md:line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-emerald-600 font-extrabold text-base">
                          R$ {product.price.toFixed(2)}
                        </span>
                        
                        <button
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isAvailable
                              ? "bg-amber-500 text-gray-950 hover:bg-amber-600 active:scale-95"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!isAvailable}
                        >
                          {isAvailable ? "Adicionar" : "Esgotado"}
                        </button>
                      </div>
                    </div>

                    {/* Imagem do Produto */}
                    {product.image_url && (
                      <div className="relative h-24 w-24 md:h-28 md:w-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 self-center border border-gray-50 shadow-inner">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          sizes="112px"
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            !isAvailable ? "grayscale filter" : ""
                          }`}
                        />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}