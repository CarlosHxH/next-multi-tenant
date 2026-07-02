// app/_tenants/[tenant]/page.tsx
import { use } from 'react';
import ProductDetailsPage from './ProductDetailsPage';

interface ProductDetailsPageProps {
  params: Promise<{ tenant: string, id: string }>;
}

export default function ProductPage({ params }: ProductDetailsPageProps) {
  const {tenant, id} = use(params);
  return <ProductDetailsPage id={id} tenant={tenant}/>
}