import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electrónicos',
    icon: '📱',
    count: 16, // Real count based on actual products
    subcategories: [
      { id: 'smartphones', name: 'Celulares', count: 14 },
      { id: 'computadoras', name: 'Computadoras', count: 0 },
      { id: 'laptops', name: 'Laptops', count: 0 },
      { id: 'tablets', name: 'Tablets', count: 0 },
      { id: 'wifi-equipment', name: 'Equipos WiFi', count: 1 },
      { id: 'accessories', name: 'Accesorios', count: 1 }
    ]
  },
  {
    id: 'food',
    name: 'Alimentos',
    icon: '🍽️',
    count: 14,
    subcategories: [
      { id: 'combos', name: 'Combos de Comidas', count: 14 },
      { id: 'gourmet', name: 'Gourmet', count: 0 },
      { id: 'wines', name: 'Vinos', count: 0 },
      { id: 'cheese', name: 'Quesos', count: 0 },
      { id: 'delicatessen', name: 'Delicatessen', count: 0 }
    ]
  },
  {
    id: 'appliances',
    name: 'Electrodomésticos',
    icon: '📺',
    count: 5, // Updated count: 2 TVs + 3 fans
    subcategories: [
      { id: 'televisions', name: 'Televisores', count: 2 },
      { id: 'fans', name: 'Ventiladores', count: 3 }, // Updated count
      { id: 'refrigerators', name: 'Refrigeradoras', count: 0 },
      { id: 'washing-machines', name: 'Lavadoras', count: 0 },
      { id: 'microwaves', name: 'Microondas', count: 0 },
      { id: 'vacuum-cleaners', name: 'Aspiradoras', count: 0 },
      { id: 'other-equipment', name: 'Otros Equipos', count: 0 },
      { id: 'spare-parts-accessories', name: 'Repuestos y Accesorios', count: 0 }
    ]
  },
  {
    id: 'energy',
    name: 'Energía Renovable',
    icon: '🔋',
    count: 8, // 4 batteries + 3 inverters + 1 solar panel
    subcategories: [
      { id: 'solar-panels', name: 'Paneles Solares', count: 1 },
      { id: 'solar-batteries', name: 'Baterías Solares', count: 4 },
      { id: 'inverters', name: 'Inversores', count: 3 },
      { id: 'mppt-controllers', name: 'Reguladores MPPT', count: 0 },
      { id: 'generators', name: 'Generadores de Energía', count: 0 },
      { id: 'complete-kits', name: 'Kits Completos', count: 0 }
    ]
  },
  {
    id: 'tools',
    name: 'Ferretería',
    icon: '🔧',
    count: 0,
    subcategories: [
      { id: 'power-tools', name: 'Herramientas Eléctricas', count: 0 },
      { id: 'hand-tools', name: 'Herramientas Manuales', count: 0 },
      { id: 'garden', name: 'Jardín', count: 0 },
      { id: 'construction', name: 'Construcción', count: 0 }
    ]
  },
  {
    id: 'beauty',
    name: 'Belleza y Cuidado',
    icon: '💄',
    count: 0,
    subcategories: [
      { id: 'skincare', name: 'Skincare', count: 0 },
      { id: 'makeup', name: 'Maquillaje', count: 0 },
      { id: 'fragrances', name: 'Fragancias', count: 0 },
      { id: 'hair-care', name: 'Cuidado Capilar', count: 0 }
    ]
  },
  {
    id: 'clothing',
    name: 'Ropa, Calzado y Accesorios',
    icon: '👕',
    count: 0,
    subcategories: [
      { id: 'men-clothing', name: 'Ropa Hombres', count: 0 },
      { id: 'women-clothing', name: 'Ropa Mujeres', count: 0 },
      { id: 'kids-clothing', name: 'Ropa Niños', count: 0 },
      { id: 'shoes', name: 'Calzado', count: 0 },
      { id: 'accessories', name: 'Accesorios', count: 0 },
      { id: 'sportswear', name: 'Deportiva', count: 0 }
    ]
  },
  {
    id: 'beverages',
    name: 'Bebidas e Infusiones',
    icon: '☕',
    count: 5,
    subcategories: [
      { id: 'alcoholic', name: 'Bebidas Alcohólicas', count: 1 },
      { id: 'non-alcoholic', name: 'Bebidas Sin Alcohol', count: 1 },
      { id: 'coffee-tea', name: 'Café y Té', count: 3 },
      { id: 'infusions', name: 'Infusiones', count: 0 },
      { id: 'natural-juices', name: 'Jugos Naturales', count: 1 },
      { id: 'energy-drinks', name: 'Bebidas Energéticas', count: 0 }
    ]
  },
  {
    id: 'pets',
    name: 'Mascotas',
    icon: '🐕',
    count: 0,
    subcategories: [
      { id: 'dog-food', name: 'Alimento para Perros', count: 0 },
      { id: 'cat-food', name: 'Alimento para Gatos', count: 0 },
      { id: 'pet-toys', name: 'Juguetes', count: 0 },
      { id: 'pet-accessories', name: 'Accesorios', count: 0 },
      { id: 'pet-hygiene', name: 'Cuidado e Higiene', count: 0 },
      { id: 'pet-medicine', name: 'Medicamentos', count: 0 }
    ]
  },
  {
    id: 'office',
    name: 'Materiales de Oficina',
    icon: '📋',
    count: 0,
    subcategories: [
      { id: 'stationery', name: 'Papelería', count: 0 },
      { id: 'filing', name: 'Archivadores', count: 0 },
      { id: 'writing', name: 'Escritura', count: 0 },
      { id: 'office-tech', name: 'Tecnología Oficina', count: 0 },
      { id: 'furniture', name: 'Mobiliario', count: 0 },
      { id: 'supplies', name: 'Suministros', count: 0 }
    ]
  },
  {
    id: 'transport',
    name: 'Transporte',
    icon: '🚗',
    count: 0,
    subcategories: [
      { id: 'cars', name: 'Automóviles', count: 0 },
      { id: 'motorcycles', name: 'Motocicletas', count: 0 },
      { id: 'bicycles', name: 'Bicicletas', count: 0 },
      { id: 'spare-parts', name: 'Repuestos', count: 0 },
      { id: 'car-accessories', name: 'Accesorios', count: 0 },
      { id: 'maintenance', name: 'Mantenimiento', count: 0 }
    ]
  },
  {
    id: 'currency',
    name: 'Divisas',
    icon: '💰',
    count: 0,
    subcategories: [
      { id: 'usd', name: 'Dólar Americano', count: 0 },
      { id: 'eur', name: 'Euro', count: 0 },
      { id: 'mxn', name: 'Peso Mexicano', count: 0 },
      { id: 'bitcoin', name: 'Bitcoin', count: 0 },
      { id: 'ethereum', name: 'Ethereum', count: 0 },
      { id: 'other-crypto', name: 'Otras Criptomonedas', count: 0 }
    ]
  },
  {
    id: 'games',
    name: 'Juegos y Juguetes',
    icon: '🎮',
    count: 0,
    subcategories: [
      { id: 'video-games', name: 'Videojuegos', count: 0 },
      { id: 'consoles', name: 'Consolas', count: 0 },
      { id: 'toys', name: 'Juguetes Infantiles', count: 0 },
      { id: 'board-games', name: 'Juegos de Mesa', count: 0 },
      { id: 'puzzles', name: 'Puzzles', count: 0 },
      { id: 'collectibles', name: 'Coleccionables', count: 0 }
    ]
  },
  {
    id: 'others',
    name: 'Combos De Comidas',
    icon: '🍱',
    count: 7,
    subcategories: [
      { id: 'food-combos', name: 'Combos Mixtos', count: 7 },
      { id: 'premium-combos', name: 'Combos Premium', count: 0 },
      { id: 'basic-combos', name: 'Combos Básicos', count: 0 },
      { id: 'special-combos', name: 'Combos Especiales', count: 0 }
    ]
  },
  {
    id: 'news',
    name: 'Noticias',
    icon: '📰',
    count: 0,
    subcategories: [
      { id: 'tech-news', name: 'Tecnología', count: 0 },
      { id: 'business-news', name: 'Negocios', count: 0 },
      { id: 'work-news', name: 'Trabajo', count: 0 },
      { id: 'sales-news', name: 'Ventas', count: 0 },
      { id: 'sports-news', name: 'Deporte', count: 0 },
      { id: 'entertainment-news', name: 'Farándula y Entretenimiento', count: 0 },
      { id: 'health-news', name: 'Salud', count: 0 }
    ]
  }
];

export const getAllSubcategories = () => {
  return categories.flatMap(category => 
    category.subcategories.map(sub => ({
      ...sub,
      categoryId: category.id,
      categoryName: category.name
    }))
  );
};