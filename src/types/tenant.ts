export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
}

export interface Category {
  category_id: string;
  name: string;
  products: Product[];
}

export interface TenantData {
  tenant_id: string;
  slug: string;
  name: string;
  active: boolean;
  rattings: string;
  image_url: string;
  delivery_rules: {
    fixed_fee: number;
    estimated_time_minutes: string;
  };
  categories: Category[];
}

// Formato retornado pela listagem GET /api/v1/tenants (slug é a URL completa).
export interface TenantSummary {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  rattings: string;
}