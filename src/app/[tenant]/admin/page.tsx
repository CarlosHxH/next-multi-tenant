"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { TenantData } from "@/types/tenant";

function countProducts(categories: TenantData["categories"]) {
  return categories.reduce((sum, category) => sum + category.products.length, 0);
}

function countAvailableProducts(categories: TenantData["categories"]) {
  return categories.reduce(
    (sum, category) => sum + category.products.filter((product) => product.available).length,
    0,
  );
}

const navigationItems = [
  { id: "overview", label: "Visão Geral" },
  { id: "stats", label: "Indicadores" },
  { id: "categories", label: "Categorias" },
  { id: "settings", label: "Configurações" },
];

export default function TenantAdminPage() {
  const params = useParams();
  const tenant = params.tenant as string;
  const { data, loading, error } = useFetch<TenantData>(`/api/v1/tenants/${tenant}`);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
  const availableCount = countAvailableProducts(data.categories);
  const categoryCount = data.categories.length;

  const sidebarContent = (
    <div className="flex h-full flex-col gap-6 p-6 bg-slate-950 text-white">
      <div className="space-y-3">
        <div className="rounded-3xl bg-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">Tenant</p>
          <h2 className="mt-3 text-2xl font-bold text-white">{data.name}</h2>
          <p className="mt-2 text-sm text-gray-300">Painel administrativo por tenant.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Status</span>
            <span className={data.active ? "text-emerald-400" : "text-rose-400"}>{data.active ? "Ativo" : "Inativo"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Produtos</span>
            <span>{productCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Disponíveis</span>
            <span>{availableCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Categorias</span>
            <span>{categoryCount}</span>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-100 transition hover:border-amber-400/50 hover:bg-amber-500/10"
            onClick={() => setDrawerOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <Link
          href={`/${tenant}`}
          className="block rounded-3xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-gray-100 transition hover:bg-white/20"
        >
          Ver loja
        </Link>
        <Link
          href="/"
          className="block rounded-3xl bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Ir para inicial
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative min-h-screen">
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-80 lg:border-r lg:border-white/10 lg:bg-slate-950/95 lg:flex lg:flex-col lg:h-screen lg:overflow-y-auto">
          {sidebarContent}
        </aside>

        <div className="lg:ml-80">
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80">Admin</p>
              <p className="text-lg font-semibold text-white">{data.name}</p>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-400/50 hover:bg-slate-900"
            >
              Menu
            </button>
          </div>

          <div className="px-4 py-6 lg:px-10">
            <section id="overview" className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80">Administração do Tenant</p>
                  <h1 className="mt-2 text-4xl font-extrabold text-white">{data.name}</h1>
                  <p className="mt-3 max-w-2xl text-gray-400">
                    Painel administrativo para cada tenant com informações rápidas, catálogo e ações.
                  </p>
                </div>
              </div>
            </section>

            <section id="stats" className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Total de produtos</p>
                <p className="mt-4 text-xl sm:text-4xl font-bold text-white">{productCount}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Disponíveis</p>
                <p className="mt-4 text-xl sm:text-4xl font-bold text-white">{availableCount}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Categorias</p>
                <p className="mt-4 text-xl sm:text-4xl font-bold text-white">{categoryCount}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Taxa de entrega</p>
                <p className="mt-4 text-xl sm:text-4xl font-bold text-white">R$ {data.delivery_rules.fixed_fee.toFixed(2)}</p>
              </div>
            </section>

            <section id="categories" className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Categorias & Produtos</h2>
                  <p className="mt-2 text-gray-400">Veja cada categoria e os produtos cadastrados.</p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {data.categories.map((category) => (
                  <div key={category.category_id}>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                        <p className="mt-1 text-sm text-gray-400">{category.products.length} produto(s)</p>
                      </div>
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-300">
                        {category.products.length} itens
                      </span>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {category.products.map((product) => (
                        <div
                          key={product.product_id}
                          className="rounded-3xl border border-white/10 bg-slate-900/85 p-4 transition-all duration-200 hover:border-amber-400/50 hover:bg-slate-900/95"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <div className="relative h-28 w-full overflow-hidden rounded-3xl bg-gray-800 sm:h-24 sm:w-24">
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-white">{product.name}</h4>
                              <p className="mt-3 text-sm leading-6 text-gray-400 line-clamp-3">
                                {product.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between">
                            <span className="font-semibold text-white">R$ {product.price.toFixed(2)}</span>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                product.available
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : "bg-rose-500/15 text-rose-300"
                              }`}
                            >
                              {product.available ? "Disponível" : "Indisponível"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="settings" className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div>
                <h2 className="text-2xl font-bold">Configurações</h2>
                <p className="mt-2 text-gray-400">Ajustes rápidos para este tenant.</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Telefone</p>
                  <p className="mt-3 text-white">{data.whatsapp_phone ?? "Não cadastrado"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Avaliação</p>
                  <p className="mt-3 text-white">{data.rattings}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {drawerOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setDrawerOpen(false)} />
        )}

        <aside
          className={`fixed inset-y-0 right-0 z-50 w-80 transform border-l border-white/10 bg-slate-950/95 transition duration-300 lg:hidden ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80">Menu</p>
                <p className="text-lg font-semibold text-white">{data.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Fechar
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
