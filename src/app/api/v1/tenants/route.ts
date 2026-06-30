// app/api/v1/[tenant]/route.ts
import { tenantsData } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

// 1. Use NextRequest instead of the standard Request
export async function GET(request: NextRequest) {
  // 2. Extract host safely. Fallback to 'localhost:3000' if header is missing
  const host = request.headers.get('host') || 'localhost:3000';
  // 3. Determine protocol dynamically (HTTP vs HTTPS)
  // Especially important if deploying to Vercel/production
  const proto = request.headers.get('x-forwarded-proto') || 'http';

  // 4. Map your data securely
  const tenants = tenantsData.map(item => ({
    id: item.tenant_id,
    slug: `${proto}://${item.slug}.${host.replace('www.','')}`,
    name: item.name
  }));

  // 5. Fix the validation check (an array is always truthy, check length instead)
  if (tenants.length === 0) {
    return NextResponse.json({ error: 'Estabelecimento não encontrado' }, { status: 404 });
  }

  return NextResponse.json(tenants);
}
