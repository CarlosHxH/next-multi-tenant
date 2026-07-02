import { CartItem } from "@/hooks/useCart";

export interface WhatsAppCheckoutConfig {
  tenantName: string;
  tenantPhone: string;
  items: CartItem[];
  totalPrice: number;
}

export function generateWhatsAppMessage(config: WhatsAppCheckoutConfig): string {
  const { tenantName, items, totalPrice } = config;

  let message = `*Novo Pedido - ${tenantName}*\n\n`;
  message += `📋 *Itens do Pedido:*\n`;

  items.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    message += `${index + 1}. ${item.name} (x${item.quantity})\n`;
    message += `   R$ ${itemTotal}\n`;

    if (item.notes) {
      message += `   📝 Obs: ${item.notes}\n`;
    }
  });

  message += `\n💰 *Total: R$ ${totalPrice.toFixed(2)}*\n`;
  message += `\n✅ Clique em "Confirmar" para finalizar o pedido.`;

  return message;
}

export function getWhatsAppCheckoutUrl(phone: string, message: string): string {
  // Remove caracteres especiais do telefone, mantém apenas números
  const cleanPhone = phone.replace(/\D/g, "");

  // Se não tem código de país (55 para Brasil), adiciona
  const phoneWithCountry = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;

  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message);

  // Retorna a URL do WhatsApp Web
  return `https://wa.me/${phoneWithCountry}?text=${encodedMessage}`;
}

export function openWhatsAppCheckout(config: WhatsAppCheckoutConfig): void {
  try {
    const message = generateWhatsAppMessage(config);
    const url = getWhatsAppCheckoutUrl(config.tenantPhone, message);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Erro ao abrir WhatsApp:", error);
    alert("Erro ao abrir WhatsApp. Verifique o número de telefone do restaurante.");
  }
}
