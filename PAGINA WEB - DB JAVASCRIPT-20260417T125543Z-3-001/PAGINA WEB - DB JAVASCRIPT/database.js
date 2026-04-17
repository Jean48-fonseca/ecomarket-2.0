const db = {
    // 1. PRODUCTOS
    products: [
        { id: 'p001', nombre: "Manzanas Orgánicas (1Kg)", precio: 8.00, categoria: "Frutas", descripcion: "Manzanas rojas frescas y cultivadas orgánicamente.", imagen: "https://us.123rf.com/450wm/zadorozhna/zadorozhna1501/zadorozhna150100111/35803130-las-manzanas-org%C3%A1nicas-en-cesta-en-la-hierba-del-verano-manzanas-frescas-en-la-naturaleza.jpg?ver=6", stock: 20 },
        { id: 'p002', nombre: "Platano de seda (x5 Unidades)", precio: 3.00, categoria: "Frutas", descripcion: "Plátanos dulces, perfectos para un snack rápido.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkcL-xuTj7doAsA6IqSkm20yuMkm35M7oBg&s", stock: 30 },
        { id: 'p003', nombre: "Espinaca Fresca (1Kg)", precio: 5.00, categoria: "Verduras", descripcion: "Bolsa grande de hojas frescas de espinaca.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYW5TlAZ-8Rm8IuLHKtVfEeCIiYQWOZyd-A&s", stock: 15 },
        { id: 'p004', nombre: "Zanahorias (1Kg)", precio: 4.00, categoria: "Verduras", descripcion: "Zanahorias pequeñas y tiernas, listas para consumir.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiVyHtFgSvJedmcwkPs5K6oDlaKAoLUHcGA&s", stock: 25 },
        { id: 'p005', nombre: "Pan Integral Artesanal", precio: 9.90, categoria: "Panadería", descripcion: "Pan hecho con masa madre, 100% integral.", imagen: "https://petitfitbycris.com/wp-content/uploads/2019/06/pan-integral_web.jpg", stock: 10 },
        { id: 'p006', nombre: "Leche Fresca Entera", precio: 4.50, categoria: "Lácteos y Bebidas", descripcion: "Leche de vaca fresca y pasteurizada, sin aditivos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxxNpdULQnHPhTGRCoEbe9Ol8HQoAbeZCiQ&s", stock: 18 },
        { id: 'p007', nombre: "Huevos de Corral (x12)", precio: 14.90, categoria: "Despensa", descripcion: "Docena de huevos de gallinas criadas en libertad.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6voqRlJj9sWvww_hEOgHuikLBIWjFtnIRw&s", stock: 22 },
        { id: 'p008', nombre: "Arroz Integral (1Kg)", precio: 5.90, categoria: "Granos y Legumbres", descripcion: "Arroz integral de grano largo, alto en fibra.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG_jzR47n6nwGgaJeFv_bFOWoNEkKI4U7OMA&s", stock: 40 },
        { id: 'p009', nombre: "Miel de Abeja Pura (Envase)", precio: 22.00, categoria: "Despensa", descripcion: "Miel natural de flores, sin procesar.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEg2UdpZjw8smW3r6QV_iwQfiiurKMADh4d83cXus8Jok70d2tfRP4RAY&s", stock: 12 },
        { id: 'p010', nombre: "Jugo de Naranja Natural", precio: 7.50, categoria: "Lácteos y Bebidas", descripcion: "Jugo recién exprimido, sin azúcares añadidos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KCQlAerRMlqgtxsnAMcryWD2YvUUlkjwUg&s", stock: 20 }, //waaa
        { id: 'p011', nombre: "Pimiento Rojo Orgánico (1Kg)", precio: 7.00, categoria: "Verduras", descripcion: "Pimientos grandes y dulces, ideales para ensaladas.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILWVq_FFLKW2Wwby_yjqHcNp-Pl7QP6LwEQ&s", stock: 17 },
        { id: 'p012', nombre: "Uvas Verdes sin Pepa (1Kg)", precio: 10.00, categoria: "Frutas", descripcion: "Bolsa de uvas crujientes y muy dulces.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1rMT21ZJIbRjJxLu9hlciFK7e01M1ftnOA&s", stock: 14 },
        { id: 'p013', nombre: "Lentejas (500g)", precio: 3.50, categoria: "Granos y Legumbres", descripcion: "Lentejas secas de alta calidad para guisos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOlsoTKTWDAnjpMJicENrDg3CsBXJfK3A6A&s", stock: 50 },
        { id: 'p014', nombre: "Queso Fresco Light (250g)", precio: 5.50, categoria: "Lácteos y Bebidas", descripcion: "Queso bajo en grasa y sodio, perfecto para dietas.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZc3EgA5dYdtYotWiycBHKLD_XlX6h5Mq9A&s", stock: 8 },
        { id: 'p015', nombre: "Galletas de Avena", precio: 2.00, categoria: "Snacks", descripcion: "Galletas horneadas con avena y pasas.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkO5_7dWxMQ3dJwgyi7PeoaGdoBqsVZcYBlA&s", stock: 35 },
        { id: 'p016', nombre: "Palta (Unidad)", precio: 1.80, categoria: "Frutas", descripcion: "Aguacate cremoso, listo para hacer guacamole.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR759kczHnruEZrnZJI-C4XZoTlzX-2W99nrg&s", stock: 10 },
        { id: 'p017', nombre: "Tomate (1Kg)", precio: 4.00, categoria: "Verduras", descripcion: "Pequeños tomates cherry, sabor intenso.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8bOUpxXzW1VwmThj0IvEvhSwTQBTKl2L4A&s", stock: 13 },
        { id: 'p018', nombre: "Frijol Negro (1Kg)", precio: 5.50, categoria: "Granos y Legumbres", descripcion: "Frijoles de cocción rápida y sabor tradicional.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsU1zRpO3eitxAaaiA-9iRmd8WKEAucFuLew&s", stock: 30 },
        { id: 'p019', nombre: "Yogurt Griego Natural", precio: 6.00, categoria: "Lácteos y Bebidas", descripcion: "Yogurt con alto contenido proteico, sin azúcar.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGxtvgWJZHTjWwSbWjyoX1eX1y2C4o7X2ew&s", stock: 40 },
        { id: 'p020', nombre: "Aceite de Oliva Extra Virgen (500ml)", precio: 30.00, categoria: "Despensa", descripcion: "Aceite de primera prensa en frío.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0JSg8Tqs0NkTb4XFvQYpBxQZU6NRKHK-mQ&s", stock: 23 },
        { id: 'p021', nombre: "Barra de Cereal Orgánica", precio: 1.50, categoria: "Snacks", descripcion: "Barra energética con semillas y frutos secos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GfRmkUp1XCv2ZFL0CWBzJXqpRt-C0KaLew&s", stock: 45 },
        { id: 'p022', nombre: "Nueces Mixtas (200g)", precio: 10.90, categoria: "Snacks", descripcion: "Mix de nueces, almendras y castañas.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-SyfUlH_xlqREMi-m6dwEy1mERhKwo_oNA&s", stock: 20 },
        { id: 'p023', nombre: "Limon (1Kg)", precio: 9.00, categoria: "Frutas", descripcion: "Limones ácidos y muy jugosos, perfectos para jugos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVkInUhnkwUkNo6AmGxw9P_WNLszdJijoTA&s", stock: 18 },
        { id: 'p024', nombre: "Cebolla (1Kg)", precio: 4.50, categoria: "Verduras", descripcion: "Cebollas grandes para aderezos y guisos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RvN92BzTgbzYA8XZJpYV3vInLK120Y8mug&s", stock: 28 },
        { id: 'p025', nombre: "Pan de Molde sin Gluten", precio: 9.90, categoria: "Panadería", descripcion: "Apto para celíacos, esponjoso y sabroso.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbEiwBubFrYYfcrknHFikDC_-ErFwhL6JXg&s", stock: 15 },
        { id: 'p026', nombre: "Harina de Avena (1Kg)", precio: 7.90, categoria: "Despensa", descripcion: "Harina fina ideal para repostería y desayunos.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJOZ1kAj99ioB2MUbch48DgfBtgEN0JLO-w&s", stock: 23 },
        { id: 'p027', nombre: "Pasta de Trigo Duro (500g)", precio: 4.40, categoria: "Granos y Legumbres", descripcion: "Pasta de cocción al dente, sin huevo.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLslXgZ25qxr8QRyZFNfr4mP--9w8tKprYYA&s", stock: 33 },
        { id: 'p028', nombre: "Agua Mineral sin Gas (1L)", precio: 2.50, categoria: "Lácteos y Bebidas", descripcion: "Agua pura de manantial.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTanzM1YPUth0DrHaDLSmL2JvaYrIZcjDLhZg&s", stock: 50 }
    ],

    // 2. COLECCIÓN DE SEDES (TIENDAS)
    // Información de tus tiendas para el checkout.
    locations: [
        { id: 'sede-callao', nombre: "Callao" },
        { id: 'sede-ventanilla', nombre: "Ventanilla" },
        { id: 'sede-sanisidro', nombre: "San Isidro" },
        { id: 'sede-sanborja', nombre: "San Borja" },
        { id: 'sede-sanmiguel', nombre: "San Miguel" },
        { id: 'sede-magdalena', nombre: "Magdalena" },
        { id: 'sede-lince', nombre: "Lince" },
        { id: 'sede-jesusmaria', nombre: "Jesús María" },
        { id: 'sede-carabayllo', nombre: "Carabayllo" },
        { id: 'sede-puentepiedra', nombre: "Puente Piedra" }
    ],

    // 3. PRODUCTOS DESTACADOS

    featuredProductIds: ['p001', 'p016', 'p005', 'p020'],

    // 4. MÉTODOS DE LA BASE DE DATOS
    
    // Método para obtener todos los productos
    getAllProducts: function() {
        return this.products;
    },

    // Método para obtener un producto por su ID
    getProductById: function(id) {
        return this.products.find(p => p.id === id);
    },

    // Método para obtener los productos destacados
    getFeaturedProducts: function() {
        return this.featuredProductIds.map(id => this.getProductById(id));
    },
    
    // Método para obtener todas las sedes
    getAllLocations: function() {
        return this.locations;
    }
};