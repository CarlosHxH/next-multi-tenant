export const tenantsData = [
    {
        tenant_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        slug: "burger-house",
        name: "Burger House Artesanal",
        active: true,
        delivery_rules: { fixed_fee: 7.00, estimated_time_minutes: "30-45" },
        categories: [
            {
                category_id: "cat_bh_01",
                name: "Hambúrgueres",
                products: [
                    { 
                        product_id: "prod_bh_101", 
                        name: "Classic Burger", 
                        description: "Blended de carne 150g, queijo cheddar derretido, alface, tomate e maionese artesanal no pão brioche.", 
                        price: 28.90, 
                        image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    },
                    { 
                        product_id: "prod_bh_102", 
                        name: "Double Bacon BBQ", 
                        description: "Dois blends de 150g, muito bacon crocante, queijo prato e molho barbecue caseiro.", 
                        price: 39.90, 
                        image_url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            },
            {
                category_id: "cat_bh_02",
                name: "Acompanhamentos",
                products: [
                    { 
                        product_id: "prod_bh_201", 
                        name: "Batata Frita Rústica", 
                        description: "Porção de batatas fritas com casca, temperadas com páprica defumada e alecrim.", 
                        price: 14.90, 
                        image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            },
            {
                category_id: "cat_bh_03",
                name: "Bebidas",
                products: [
                    { 
                        product_id: "prod_bh_301", 
                        name: "Refrigerante Lata 350ml", 
                        description: "Coca-Cola original bem gelada.", 
                        price: 6.00, 
                        image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            }
        ]
    },
    {
        tenant_id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        slug: "pizza-paradisso",
        name: "Pizza Paradisso",
        active: true,
        delivery_rules: { fixed_fee: 5.00, estimated_time_minutes: "45-60" },
        categories: [
            {
                category_id: "cat_pp_01",
                name: "Pizzas Tradicionais",
                products: [
                    { 
                        product_id: "prod_pp_101", 
                        name: "Pizza Margherita", 
                        description: "Molho de tomate artesanal, muçarela de búfala, manjericão fresco e azeite de oliva.", 
                        price: 45.00, 
                        image_url: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    },
                    { 
                        product_id: "prod_pp_102", 
                        name: "Pizza Calabresa", 
                        description: "Molho de tomate, muçarela, calabresa defumada fatiada e cebola roxa.", 
                        price: 48.00, 
                        image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            },
            {
                category_id: "cat_pp_02",
                name: "Pizzas Doces",
                products: [
                    { 
                        product_id: "prod_pp_201", 
                        name: "Pizza de Brigadeiro com Morango", 
                        description: "Base de chocolate ao leite coberta com granulado e morangos frescos fatiados.", 
                        price: 38.00, 
                        image_url: "https://images.unsplash.com/photo-1613564834361-943694881731?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            }
        ]
    },
    {
        tenant_id: "f3c8d9a0-1234-5678-abcd-ef1234567890",
        slug: "sushi-zen",
        name: "Sushi Zen Delivery",
        active: true,
        delivery_rules: { fixed_fee: 9.00, estimated_time_minutes: "40-55" },
        categories: [
            {
                category_id: "cat_sz_01",
                name: "Combinados",
                products: [
                    { 
                        product_id: "prod_sz_101", 
                        name: "Combinado Geral 20 Peças", 
                        description: "5 Sashimis de salmão, 5 Joys, 5 Uramakis Filadélfia e 5 Hossomakis.", 
                        price: 65.00, 
                        image_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    },
                    { 
                        product_id: "prod_sz_102", 
                        name: "Combo Hot Roll 10 Peças", 
                        description: "Sushi empanado de salmão com cream cheese, tarê e gergelim.", 
                        price: 25.00, 
                        image_url: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            },
            {
                category_id: "cat_sz_02",
                name: "Pratos Quentes",
                products: [
                    { 
                        product_id: "prod_sz_201", 
                        name: "Yakisoba de Carne 500g", 
                        description: "Macarrão para yakisoba, carne bovina em tiras, legumes selecionados e molho shoyu especial.", 
                        price: 34.90, 
                        image_url: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            }
        ]
    },
    {
        tenant_id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d",
        slug: "sweet-dreams",
        name: "Sweet Dreams Doceria",
        active: true,
        delivery_rules: { fixed_fee: 4.50, estimated_time_minutes: "15-30" },
        categories: [
            {
                category_id: "cat_sd_01",
                name: "Fatias de Bolo",
                products: [
                    { 
                        product_id: "prod_sd_101", 
                        name: "Fatia Bolo de Cenoura com Brigadeiro", 
                        description: "Bolo de cenoura fofinho com uma cobertura generosa de brigadeiro gourmet 50% cacau.", 
                        price: 15.00, 
                        image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    },
                    { 
                        product_id: "prod_sd_102", 
                        name: "Red Velvet Premium", 
                        description: "Fatia de bolo Red Velvet com recheio cremoso à base de cream cheese e baunilha.", 
                        price: 18.50, 
                        image_url: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            },
            {
                category_id: "cat_sd_02",
                name: "Copos da Felicidade",
                products: [
                    { 
                        product_id: "prod_sd_201", 
                        name: "Copo da Felicidade de Ninho com Nutella", 
                        description: "Camadas alternadas de creme de Leite Ninho, Nutella pura, brownie picado e morangos.", 
                        price: 22.00, 
                        image_url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60",
                        available: true 
                    }
                ]
            }
        ]
    }
];
