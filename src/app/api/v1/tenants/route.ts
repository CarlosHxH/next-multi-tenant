// app/api/v1/[tenant]/route.ts
import { tenantsData } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. Captura o host e remove o 'www.' salvando o resultado em uma nova constante
  const rawHost = request.headers.get('host') || 'localhost:3000';
  const host = rawHost.replace(/^www\./, ''); 

  // 2. Detecta o protocolo (http em desenvolvimento, https em produção)
  const proto = request.headers.get('x-forwarded-proto') || 'http';

  // 3. Mapeia os dados aplicando a formatação correta de subdomínio
  const tenants = tenantsData.map(item => ({
    id: item.tenant_id,
    slug: item.slug,
    url: `${proto}://${item.slug}.${host}`,
    name: item.name,
    image_url: item.image_url,
    rattings: item.rattings.toString(),
  }));

  // 4. Validação corrigida
  if (tenants.length === 0) {
    return NextResponse.json({ error: 'Estabelecimento não encontrado' }, { status: 404 });
  }

  return NextResponse.json(tenants);
}
