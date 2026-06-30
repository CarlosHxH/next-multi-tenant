// app/_tenants/[tenant]/page.tsx
import { use } from 'react';
import TenantHomePage from './tenant';

interface TenantPageProps {
  params: Promise<{ tenant: string }>;
}

export default function TenantPage({ params }: TenantPageProps) {
  const {tenant} = use(params);
  return <TenantHomePage tenant={tenant}/>
}