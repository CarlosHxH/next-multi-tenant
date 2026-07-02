"use client";

import { useCart, CartItem } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { openWhatsAppCheckout } from "@/lib/whatsapp";
import { TenantData } from "@/types/tenant";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: string;
  tenantData?: TenantData;
}

export default function CartDrawer({ isOpen, onClose, tenant, tenantData }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (!tenantData?.whatsapp_phone) {
      alert("Número de WhatsApp do restaurante não configurado.");
      return;
    }

    openWhatsAppCheckout({
      tenantName: tenantData.name,
      tenantPhone: tenantData.whatsapp_phone,
      items,
      totalPrice,
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Carrinho</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-4xl mb-3">🛒</span>
              <p className="text-gray-500 font-medium">Carrinho vazio</p>
              <p className="text-xs text-gray-400 mt-1">Adicione itens para continuar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  {/* Imagem */}
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Detalhes */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">
                      {item.name}
                    </h3>
                    {item.notes && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        Obs: {item.notes}
                      </p>
                    )}
                    <p className="text-sm font-bold text-emerald-600 mt-1">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-gray-400 hover:text-red-600 transition-colors text-sm font-bold"
                    >
                      ✕
                    </button>
                    <div className="flex items-center border border-gray-200 bg-white rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-6 py-4 space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-xl font-bold text-emerald-600">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Botões */}
            <div className="space-y-2">
              <button
                onClick={onClose}
                className="w-full h-11 bg-amber-500 text-gray-950 font-bold rounded-lg hover:bg-amber-600 transition-colors"
              >
                Continuar Comprando
              </button>
              <button
                onClick={handleCheckout}
                className="w-full h-11 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <span>💬</span> Finalizar no WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full h-10 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
