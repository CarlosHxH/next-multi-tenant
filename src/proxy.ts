// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { environment } from './lib/environment';

export const config = {
  // Ignora explicitamente rotas internas do Next.js e arquivos estáticos comuns
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*$).*)',
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '127.0.0.1';

  // Força o hostname a ficar em minúsculo e remove espaços
  const hostname = req.headers.get('host')?.toLowerCase() || '';
  // O header "host" nunca traz protocolo (ex.: "1.localhost:3000"), então o
  // rootDomain também precisa estar sem protocolo nem barra final para que a
  // extração do subdomínio funcione em produção.
  const rootDomain = (process.env.NODE_ENV === 'production' ? environment.url : 'localhost:3000')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  // Extrai o subdomínio
  const currentHost = hostname.replace(`.${rootDomain}`, '').replace(rootDomain, '');

  if ( currentHost === '' || currentHost === 'www' || url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Remove barras duplicadas no final caso existam
  let cleanPath = `/${currentHost}${url.pathname}`;
  if (cleanPath.endsWith('/') && cleanPath !== '/') {
    cleanPath = cleanPath.slice(0, -1);
  }

  url.pathname = cleanPath;

  console.log(`[tenant] ${url.pathname}, ip: [${ip}]`);
  return NextResponse.rewrite(url);
}

//https://1.www.systemprog.online/