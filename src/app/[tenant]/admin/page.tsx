"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { TenantData } from "@/types/tenant";

function countProducts(categories: TenantData["categories"]) {
  return categories.reduce((sum, category) => sum + category.products.length, 0);
}

export default function TenantAdminPage() {
  const params = useParams();
  const tenant = params.tenant as string;
  const { data, loading, error } = useFetch<TenantData>(`/api/v1/tenants/${tenant}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
        <div className="space-y-3 w-full max-w-xl">
          <div className="h-10 rounded-2xl bg-gray-800 animate-pulse" />
          <div className="h-6 rounded-xl bg-gray-800 animate-pulse" />
          <div className="h-24 rounded-3xl bg-gray-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center text-center gap-4">
        <span className="text-6xl">⚠️</span>
        <h1 className="text-3xl font-bold">Tenant não encontrado</h1>
        <p className="max-w-md text-gray-400">
          Não foi possível localizar o tenant solicitado. Verifique se a URL está correta ou tente novamente mais tarde.
        </p>
        <Link
          href="/"
          className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-gray-950 hover:bg-amber-400 transition"
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const productCount = countProducts(data.categories);
  const categoryCount = data.categories.length;

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80">Administração do Tenant</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">{data.name}</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">
              Esta é a página administrativa de cada tenant. Aqui você pode visualizar informações principais do tenant e conferir o catálogo de produtos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${tenant}`}
              className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-gray-100 transition hover:bg-white/20"
            >
              Ver loja
            </Link>
            <Link
              href="/"
              className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-amber-400"
            >
              Ir para tela inicial
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Status</p>
            <p className="mt-4 text-3xl font-bold text-white">{data.active ? "Ativo" : "Inativo"}</p>
            <p className="mt-3 text-gray-400">ID do tenant: {data.tenant_id}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Produtos</p>
            <p className="mt-4 text-3xl font-bold text-white">{productCount}</p>
            <p className="mt-3 text-gray-400">Distribuídos em {categoryCount} categorias</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Entrega</p>
            <p className="mt-4 text-3xl font-bold text-white">R$ {data.delivery_rules.fixed_fee.toFixed(2)}</p>
            <p className="mt-3 text-gray-400">Estimativa {data.delivery_rules.estimated_time_minutes}</p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Categorias & Produtos</h2>
              <p className="mt-2 text-gray-400">Lista simples dos itens disponíveis neste tenant.</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {data.categories.map((category) => (
              <div key={category.category_id} className="rounded-3xl border border-white/10 bg-gray-900/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{category.products.length} produto(s)</p>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-300">
                    {category.products.length}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {category.products.map((product) => (
                    <div key={product.product_id} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gray-800">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{product.name}</h4>
                          <p className="mt-1 text-sm text-gray-400 line-clamp-2">{product.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
                        <span>R$ {product.price.toFixed(2)}</span>
                        <span>{product.available ? "Disponível" : "Indisponível"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
