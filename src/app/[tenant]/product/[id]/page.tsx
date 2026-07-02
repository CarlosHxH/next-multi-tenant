// app/_tenants/[tenant]/page.tsx
import { use } from 'react';
import ProductDetailsPage from './ProductDetailsPage';

interface ProductDetailsPageProps {
  params: {
    tenant: string;
    id: string;
  };
}

export default function ProductPage({ params }: ProductDetailsPageProps) {
  const { tenant, id } = params;
  // const {tenant} = use(params);
  return <ProductDetailsPage id={id} tenant={tenant}/>
}