// app/[tenant]/product/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "react-use-cart";
import CartDrawer from "@/components/CartDrawer";
import { ProductDetailsResponse, Product } from "@/types/tenant";
import { ShoppingCart, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ProductDetailsPageProps {
  tenant: string;
  id: string;
}

export default function ProductDetailsPage({ tenant, id }: ProductDetailsPageProps) {
  // Buscamos os dados do tenant para garantir o contexto e regras do restaurante
  const { data, loading, error } = useFetch<ProductDetailsResponse>(`/api/v1/tenants/${tenant}/products/${id}`);
  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemsCount = totalItems;

  const tenantData = data?.tenant ?? null;
  const apiProduct = data?.product ?? null;

  // Estados de carregamento e erro da API
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Carregando detalhes do produto...</p>
      </div>
    );
  }

  if (error || !tenantData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <AlertCircle size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Restaurante não encontrado</h1>
        <Link href={`/${tenant}`} className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors">
          Voltar ao início
        </Link>
      </div>
    );
  }

  // Encontra o produto específico dentro das categorias do Tenant carregado
  let product: Product | undefined = apiProduct ?? undefined;
  if (!product && tenantData) {
    for (const category of tenantData.categories) {
      const found = category.products.find((p) => p.product_id === id);
      if (found) {
        product = found;
        break;
      }
    }
  }

  // Se o restaurante existe mas o ID do produto não
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <AlertCircle size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
        <p className="text-gray-500 mt-1">Este item não faz parte do cardápio atual.</p>
        <Link href={`/${tenant}`} className="mt-4 px-5 py-2 bg-amber-500 text-gray-950 font-bold rounded-xl text-sm hover:bg-amber-600 transition-colors">
          Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  // Funções de controle de quantidade
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = product.price * quantity;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 antialiased pb-32">
      {/* Barra de Navegação Superior Fixa */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-30 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href={`/${tenant}`}
            className="flex items-center text-sm font-bold text-gray-700 hover:text-amber-600 transition-colors gap-1"
          >
            <ArrowLeft size={18} />
            Cardápio
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md max-w-[180px] truncate">
            {tenantData.name}
          </span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Bloco da Imagem do Produto */}
        <div className="md:col-span-2 relative h-64 md:h-80 w-full bg-gray-200 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className={`object-cover ${!product.available ? "grayscale" : ""}`}
            priority
          />
          {!product.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-600 text-white font-bold px-4 py-1.5 rounded-lg text-sm uppercase tracking-wider">
                Esgotado
              </span>
            </div>
          )}
        </div>

        {/* Detalhes e customização do Produto */}
        <div className="md:col-span-3 flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
            <p className="text-emerald-600 font-extrabold text-xl mt-1">
              R$ {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              {product.description}
            </p>

            {/* Campo de Observações do Cliente */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Alguma observação? (Opcional)
              </label>
              <textarea
                id="notes"
                rows={3}
                maxLength={140}
                placeholder="Ex: Tirar cebola, maionese à parte, ponto da carne..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!product.available}
                className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-gray-300 bg-gray-50/50 resize-none"
              />
              <div className="text-right text-[10px] text-gray-400 mt-1">
                {notes.length}/140 caracteres
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fixo de Compra (Padrão Apps de Delivery modernos) */}
      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 py-4 px-4 shadow-xl z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">

          {/* Seletor de Quantidade */}
          <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl p-1 shadow-inner">
            <button
              onClick={handleDecrement}
              disabled={!product.available || quantity <= 1}
              className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-gray-800 text-sm select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={!product.available}
              className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
            >
              +
            </button>
          </div>

          {/* Botão de Submit Principal */}
          <button
            disabled={!product.available}
            onClick={() => {
              addItem({
                id: id,
                name: product.name,
                price: product.price,
                quantity,
                image_url: product.image_url,
                notes,
              });
              toast.success(`${product?.name} adicionado!`);
              setQuantity(1);
              setNotes("");
            }}
            className={`flex-1 h-12 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-between px-6 ${product.available
                ? "bg-amber-500 text-gray-950 hover:bg-amber-600 active:scale-[0.99]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            <span>{product.available ? "Adicionar ao carrinho" : "Produto Indisponível"}</span>
            {product.available && (
              <span className="font-extrabold bg-black/10 px-2.5 py-1 rounded-md text-xs">
                R$ {totalPrice.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} tenant={tenant} tenantData={tenantData} />
    </main>
  );
}