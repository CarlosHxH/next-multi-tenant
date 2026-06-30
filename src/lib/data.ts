export const tenantsData = [
    {
        tenant_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        slug: "1",
        name: "tenant1",
        active: true,
        delivery_rules: { fixed_fee: 7.00, estimated_time_minutes: "30-45" },
        categories: [
            {
                category_id: "cat_01",
                name: "item1",
                products: [
                    { product_id: "prod_101", name: "produto 1", description: "Descrição produto 1", price: 28.90, available: true }
                ]
            }
        ]
    },
    {
        tenant_id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        slug: "2",
        name: "tenant2",
        active: true,
        delivery_rules: { fixed_fee: 5.00, estimated_time_minutes: "45-60" },
        categories: [
            {
                category_id: "cat_02",
                name: "item2",
                products: [
                    { product_id: "prod_201", name: "item2", description: "Descrição 2", price: 45.00, available: true }
                ]
            }
        ]
    },
    {
        tenant_id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        slug: "tenant3",
        name: "tenant 3",
        active: true,
        delivery_rules: { fixed_fee: 5.00, estimated_time_minutes: "15-30" },
        categories: [
            {
                category_id: "cat_03",
                name: "item3",
                products: [
                    { product_id: "prod_3", name: "item3", description: "Descrição Item 3", price: 15.00, available: true }
                ]
            }
        ]
    }
];