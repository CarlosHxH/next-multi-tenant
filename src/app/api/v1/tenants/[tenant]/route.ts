// app/api/v1/[tenant]/route.ts
import { tenantsData } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ tenant: string }>;
}

// 1. Alterado o primeiro parâmetro para 'NextRequest'
// 2. Modificada a tipagem do 'context' para aceitar a Promise conforme o Next.js exige
export async function GET(request: NextRequest, context: RouteContext) {
  // 3. Aguarda a Promise dos params ser resolvida antes de desestruturar
  const { tenant } = await context.params;

  // Garantia caso o tenant venha vazio
  if (!tenant) {
    return NextResponse.json({ error: 'Tenant inválido' }, { status: 400 });
  }

  const tenantData = tenantsData.find(t => t.slug.toLowerCase() === tenant.toLowerCase());

  if (!tenantData) {
    return NextResponse.json({ error: 'Estabelecimento não encontrado' }, { status: 404 });
  }

  return NextResponse.json(tenantData);
}