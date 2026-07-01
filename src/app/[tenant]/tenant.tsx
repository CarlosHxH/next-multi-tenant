// app/[tenant]/page.tsx
"use client";
import { useFetch } from "@/hooks/useFetch";
import { TenantData } from "@/types/tenant";


export default function TenantHomePage({ tenant }: { tenant: string }) {
  const { data, loading, error } = useFetch<TenantData>(`/api/v1/tenants/${tenant}`);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Carregando cardápio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-gray-600">Ops! Esse tenant não foi encontrado.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-gray-600">Ops! Esse tenant não foi encontrado.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header da Loja */}
      <header className="bg-white border-b border-gray-200 py-8 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {data.name}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>⏱️ {data.delivery_rules.estimated_time_minutes} min</span>
            <span>•</span>
            <span>Entrega: R$ {data.delivery_rules.fixed_fee.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Grid de Categorias e Produtos */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        {data.categories.map((category) => (
          <div key={category.category_id} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.products.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-emerald-600 font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      className="px-4 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                      disabled={!product.available}
                    >
                      {product.available ? 'Adicionar' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}