import { Product } from '../types';

const existingProducts: Product[] = [
  // Multicargador USB
  {
    id: 1,
    name: 'Multicargador USB 7 Puertos',
    price: 7,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042421441-e0bbb6888d5565ddd9c0a4fb75503f6d.jpeg',
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Universal',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: true,
    description: 'Multicargador USB de alta calidad con 7 puertos de carga simultánea. Perfecto para cargar múltiples dispositivos al mismo tiempo con tecnología de carga rápida y protección contra sobrecarga.',
    specifications: {
      'Puertos USB': '7 puertos',
      'Corriente de salida': '2.4A por puerto',
      'Potencia total': '60W',
      'Protección': 'Sobrecarga, cortocircuito',
      'Compatibilidad': 'Smartphones, tablets, dispositivos USB',
      'Material': 'ABS resistente al fuego',
      'Dimensiones': '15 x 8 x 3 cm',
      'Garantía': '1 año'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all'] // Disponible en todos los municipios de Villa Clara
    }
  },
  
  // Smart TV Premier 40"
  {
    id: 2,
    name: 'Smart TV Premier 40 Pulgadas',
    price: 250,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042564205-27b563b3fcf106d3682cc11bad80cebb.jpeg',
    category: 'appliances',
    subcategory: 'televisions',
    brand: 'Premier',
    rating: 4.3,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Smart TV Premier de 40 pulgadas con resolución Full HD y sistema operativo Android TV. Disfruta de tus aplicaciones favoritas como Netflix, YouTube y más con una calidad de imagen excepcional.',
    specifications: {
      'Tamaño de pantalla': '40 pulgadas',
      'Resolución': '1920 x 1080 Full HD',
      'Sistema operativo': 'Android TV',
      'Conectividad': 'WiFi, Bluetooth, HDMI x3, USB x2',
      'Procesador': 'Quad-core ARM Cortex-A55',
      'RAM': '1.5GB',
      'Almacenamiento': '8GB',
      'Audio': 'Dolby Audio, 20W',
      'Garantía': '2 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // Smart TV Premier 43"
  {
    id: 3,
    name: 'Smart TV Premier 43 Pulgadas',
    price: 280,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042564205-27b563b3fcf106d3682cc11bad80cebb.jpeg',
    category: 'appliances',
    subcategory: 'televisions',
    brand: 'Premier',
    rating: 4.4,
    reviews: 95,
    inStock: true,
    isNew: true,
    description: 'Smart TV Premier de 43 pulgadas con tecnología avanzada y sistema Android TV integrado. Perfecta para entretenimiento familiar con acceso a miles de aplicaciones y contenido en streaming.',
    specifications: {
      'Tamaño de pantalla': '43 pulgadas',
      'Resolución': '1920 x 1080 Full HD',
      'Sistema operativo': 'Android TV 11',
      'Conectividad': 'WiFi 802.11ac, Bluetooth 5.0, HDMI x3, USB x2',
      'Procesador': 'Quad-core ARM Cortex-A55',
      'RAM': '2GB',
      'Almacenamiento': '16GB',
      'Audio': 'Dolby Audio, 24W',
      'Garantía': '2 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // XIAOMI Redmi 15C
  {
    id: 4,
    name: 'XIAOMI Redmi 15C 128GB Midnight Black Dual SIM',
    price: 140,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042671502-d86fe3dd0c197b15fb534e670854c6b5.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'XIAOMI',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    isNew: true,
    description: 'XIAOMI Redmi 15C con 128GB de almacenamiento en elegante color Midnight Black. Smartphone de alto rendimiento con dual SIM, cámara avanzada y batería de larga duración para uso intensivo.',
    specifications: {
      'Pantalla': '6.74" IPS LCD, 90Hz',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '5MP',
      'Batería': '5000mAh',
      'Carga': '18W',
      'Sistema operativo': 'MIUI 14 basado en Android 13',
      'Conectividad': 'Dual SIM, 4G LTE, WiFi, Bluetooth 5.0',
      'Garantía': '1 año'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 16e 128GB
  {
    id: 5,
    name: 'iPhone 16e 128GB',
    price: 490,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042850645-dd79d147e13f1996e1f9f85bd2a17dd5.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviews: 456,
    inStock: true,
    isNew: true,
    description: 'iPhone 16e con 128GB de almacenamiento. La perfecta combinación de rendimiento y precio con el chip A17 Bionic, cámara avanzada y diseño premium de Apple.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED',
      'Procesador': 'Chip A17 Bionic',
      'Almacenamiento': '128GB',
      'Cámara principal': '48MP + 12MP Ultra Wide',
      'Cámara frontal': '12MP TrueDepth',
      'Batería': 'Hasta 20 horas de video',
      'Carga': 'MagSafe 15W, Lightning',
      'Sistema operativo': 'iOS 17',
      'Resistencia': 'IP68',
      'Colores disponibles': 'Azul, Rosa, Amarillo, Verde, Negro',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 16e 256GB
  {
    id: 6,
    name: 'iPhone 16e 256GB',
    price: 580,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759042968399-35804ed467b29fe77c0fc009582f0776.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviews: 389,
    inStock: true,
    isNew: true,
    description: 'iPhone 16e con 256GB de almacenamiento para usuarios que necesitan más espacio. Rendimiento excepcional con el chip A17 Bionic y todas las características premium de Apple.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED',
      'Procesador': 'Chip A17 Bionic',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide',
      'Cámara frontal': '12MP TrueDepth',
      'Batería': 'Hasta 20 horas de video',
      'Carga': 'MagSafe 15W, Lightning',
      'Sistema operativo': 'iOS 17',
      'Resistencia': 'IP68',
      'Colores disponibles': 'Azul, Rosa, Amarillo, Verde, Negro',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 256GB
  {
    id: 7,
    name: 'iPhone 17 256GB',
    price: 899,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759472792660-99515e4fc02825d13688d4129fe6717d.jpg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.9,
    reviews: 567,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 con 256GB, la nueva generación de smartphones Apple con chip A18 Bionic revolucionario, cámara mejorada y diseño renovado para la máxima experiencia móvil.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Bionic',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Batería': 'Hasta 22 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio aeroespacial',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 512GB
  {
    id: 8,
    name: 'iPhone 17 512GB',
    price: 1050,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759472886892-5baf8dff3ab85ecaf1ae4ff333980c00.jpg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.9,
    reviews: 423,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 con 512GB de almacenamiento masivo para profesionales y usuarios avanzados. Potencia sin límites con el chip A18 Bionic y capacidad para miles de fotos y videos.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Bionic',
      'Almacenamiento': '512GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Batería': 'Hasta 22 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio aeroespacial',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro 256GB
  {
    id: 9,
    name: 'iPhone 17 Pro 256GB',
    price: 1125,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759472980519-2ecb9b35bd60d2b4e866c382064544f7.jpg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 678,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro con 256GB, el smartphone más avanzado de Apple con sistema de cámaras Pro, pantalla ProMotion y construcción en titanio para usuarios profesionales.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 3x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Action Mode',
      'Batería': 'Hasta 23 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro 512GB
  {
    id: 10,
    name: 'iPhone 17 Pro 512GB',
    price: 1300,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043047120-b0bd9f0a523512fa93f708a22ecc2bde.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 534,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro con 512GB de almacenamiento premium para creadores de contenido y profesionales que demandan el máximo rendimiento y espacio de almacenamiento.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '512GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 3x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Action Mode',
      'Batería': 'Hasta 23 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro 1TB
  {
    id: 11,
    name: 'iPhone 17 Pro 1TB',
    price: 1530,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759472936912-99515e4fc02825d13688d4129fe6717d.jpg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 345,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro con 1TB de almacenamiento masivo, la configuración definitiva para profesionales que trabajan con video 4K, fotografía RAW y aplicaciones pesadas.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '1TB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 3x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Action Mode',
      'Batería': 'Hasta 23 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro Max 256GB Blue
  {
    id: 12,
    name: 'iPhone 17 Pro Max 256GB Blue',
    price: 1260,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043159447-3dc881860818180898fcd7761445ef36.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 789,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro Max en elegante color azul con 256GB. La pantalla más grande de Apple con tecnología ProMotion y el sistema de cámaras más avanzado para fotografía y video profesional.',
    specifications: {
      'Pantalla': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 5x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Cinematic Mode',
      'Batería': 'Hasta 29 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Color': 'Azul Titanio',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro Max 256GB Orange
  {
    id: 13,
    name: 'iPhone 17 Pro Max 256GB Orange',
    price: 1380,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043159447-3dc881860818180898fcd7761445ef36.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 456,
    inStock: true,
    isNew: true,
    isSale: true,
    discount: 10,
    originalPrice: 1533,
    description: 'iPhone 17 Pro Max en exclusivo color naranja con 256GB. Edición especial con acabado premium y todas las características Pro Max para una experiencia móvil sin igual.',
    specifications: {
      'Pantalla': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 5x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Cinematic Mode',
      'Batería': 'Hasta 29 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Color': 'Naranja Titanio (Edición Especial)',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro Max 512GB
  {
    id: 14,
    name: 'iPhone 17 Pro Max 512GB',
    price: 1450,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043159447-3dc881860818180898fcd7761445ef36.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 623,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro Max con 512GB de almacenamiento. La combinación perfecta de pantalla grande, rendimiento extremo y espacio abundante para contenido profesional.',
    specifications: {
      'Pantalla': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '512GB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 5x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Cinematic Mode',
      'Batería': 'Hasta 29 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro Max 1TB
  {
    id: 15,
    name: 'iPhone 17 Pro Max 1TB',
    price: 1550,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043159447-3dc881860818180898fcd7761445ef36.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 445,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro Max con 1TB de almacenamiento masivo. La configuración definitiva para creadores de contenido que necesitan la pantalla más grande y el máximo espacio de almacenamiento.',
    specifications: {
      'Pantalla': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '1TB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 5x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Cinematic Mode',
      'Batería': 'Hasta 29 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone 17 Pro Max 2TB
  {
    id: 16,
    name: 'iPhone 17 Pro Max 2TB',
    price: 2050,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043159447-3dc881860818180898fcd7761445ef36.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 5.0,
    reviews: 234,
    inStock: true,
    isNew: true,
    description: 'iPhone 17 Pro Max con 2TB de almacenamiento extremo. La configuración más avanzada disponible para profesionales que requieren capacidad ilimitada para proyectos de gran escala.',
    specifications: {
      'Pantalla': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Procesador': 'Chip A18 Pro',
      'Almacenamiento': '2TB',
      'Cámara principal': '48MP + 12MP Ultra Wide + 12MP Telephoto 5x',
      'Cámara frontal': '12MP TrueDepth con autofocus',
      'Video': '4K ProRes, Cinematic Mode',
      'Batería': 'Hasta 29 horas de video',
      'Carga': 'MagSafe 25W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Material': 'Titanio grado 5',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone Air 256GB
  {
    id: 17,
    name: 'iPhone Air 256GB',
    price: 1065,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043275300-5c8b1efb90f2c4ea3a6fd62d6f0d1d02.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.9,
    reviews: 567,
    inStock: true,
    isNew: true,
    description: 'iPhone Air con 256GB, el smartphone más ligero de Apple con diseño ultra-delgado y rendimiento excepcional. Perfecto equilibrio entre portabilidad y funcionalidad avanzada.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED',
      'Procesador': 'Chip A18',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 12MP Ultra Wide',
      'Cámara frontal': '12MP TrueDepth',
      'Batería': 'Hasta 20 horas de video',
      'Carga': 'MagSafe 20W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Peso': '165g (ultra-ligero)',
      'Grosor': '6.9mm',
      'Material': 'Aluminio aeroespacial',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },
  
  // iPhone Air 512GB
  {
    id: 18,
    name: 'iPhone Air 512GB',
    price: 1280,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759043275300-5c8b1efb90f2c4ea3a6fd62d6f0d1d02.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.9,
    reviews: 423,
    inStock: true,
    isNew: true,
    description: 'iPhone Air con 512GB de almacenamiento amplio en el diseño más ligero de Apple. Ideal para usuarios que buscan portabilidad extrema sin comprometer el rendimiento.',
    specifications: {
      'Pantalla': '6.1" Super Retina XDR OLED',
      'Procesador': 'Chip A18',
      'Almacenamiento': '512GB',
      'Cámara principal': '48MP + 12MP Ultra Wide',
      'Cámara frontal': '12MP TrueDepth',
      'Batería': 'Hasta 20 horas de video',
      'Carga': 'MagSafe 20W, USB-C',
      'Sistema operativo': 'iOS 18',
      'Resistencia': 'IP68',
      'Peso': '165g (ultra-ligero)',
      'Grosor': '6.9mm',
      'Material': 'Aluminio aeroespacial',
      'Garantía': '1 año Apple'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  }
];

// Nuevos productos agregados
const newProducts: Product[] = [
  // Ventilador Portátil con PowerBank
  {
    id: 19,
    name: 'Ventilador Portátil Multifuncional con PowerBank 40,000mAh',
    price: 80,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758911111964-c2f855b13bcde54bd10048c9ee24f56b.jpeg',
    category: 'appliances',
    subcategory: 'fans',
    brand: 'Universal',
    rating: 4.6,
    reviews: 187,
    inStock: true,
    isNew: true,
    description: 'Ventilador portátil revolucionario con batería de ultra alta capacidad de 40,000mAh que combina refrigeración personal, carga de dispositivos y iluminación LED en un solo dispositivo compacto. Perfecto para actividades al aire libre, emergencias y uso diario con hasta 58 horas de funcionamiento continuo.',
    specifications: {
      'Capacidad de batería': '40,000mAh Li-Polymer',
      'Autonomía ventilador': 'Hasta 58 horas de uso continuo',
      'Función PowerBank': 'Carga rápida para smartphones y tablets',
      'Puertos de carga': 'USB-A y USB-C',
      'Iluminación LED': '32 LEDs ultra brillantes',
      'Velocidades': '3 niveles de velocidad ajustables',
      'Material': 'ABS de alta resistencia',
      'Peso': '850g (ultraligero)',
      'Dimensiones': '18 x 12 x 5 cm',
      'Resistencia': 'IPX4 resistente a salpicaduras',
      'Tiempo de carga': '8-10 horas (carga completa)',
      'Garantía': '2 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung Galaxy A05 64GB
  {
    id: 20,
    name: 'Samsung Galaxy A05 64GB 4GB RAM Dual SIM Desbloqueado',
    price: 95,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758911267182-e9789735c204cdf01247cc96e6e5dadf.jpg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.3,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05 con diseño elegante y funcionalidad esencial para el uso diario. Equipado con pantalla amplia, cámara versátil y batería de larga duración. Versión internacional desbloqueada de fábrica compatible con todas las redes GSM globales.',
    specifications: {
      'Modelo': 'SM-A055M/DS',
      'Pantalla': '6.7" PLS LCD, 720 x 1600 pixels',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB (expandible hasta 1TB)',
      'Cámara principal': '50MP + 2MP profundidad',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh con carga rápida 25W',
      'Sistema operativo': 'Android 13 con One UI 5.1',
      'Conectividad': 'Dual SIM, 4G LTE, WiFi, Bluetooth 5.3',
      'Desbloqueo': 'Desbloqueado de fábrica GSM',
      'Colores disponibles': 'Negro, Plata, Verde',
      'Garantía': '1 año Samsung'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung Galaxy A05s 128GB
  {
    id: 21,
    name: 'Samsung Galaxy A05s 128GB 4GB RAM 6.7" Dual SIM Negro',
    price: 125,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758911320053-ce81442b9a361d379c6613c7caede8fc.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.4,
    reviews: 203,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05s en elegante color negro con mayor capacidad de almacenamiento y rendimiento mejorado. Diseñado para usuarios que buscan más espacio para aplicaciones, fotos y videos, con una experiencia fluida y confiable respaldada por la calidad Samsung.',
    specifications: {
      'Modelo': 'A057M/DS',
      'Pantalla': '6.7" PLS LCD, HD+ 720 x 1600',
      'Procesador': 'Qualcomm Snapdragon 680',
      'RAM': '4GB',
      'Almacenamiento': '128GB (expandible hasta 1TB)',
      'Cámara principal': '50MP + 2MP macro + 2MP profundidad',
      'Cámara frontal': '13MP con flash LED',
      'Batería': '5000mAh con carga rápida 25W',
      'Sistema operativo': 'Android 13 con One UI 5.1',
      'Conectividad': 'Dual SIM, 4G LTE global, WiFi 5, Bluetooth 5.1',
      'Seguridad': 'Sensor de huella lateral',
      'Audio': 'Altavoces estéreo',
      'Color': 'Negro elegante',
      'Garantía': '1 año Samsung'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung Galaxy A07
  {
    id: 22,
    name: 'Samsung Galaxy A07 64GB 4GB RAM 6.7" Helio G99',
    price: 110,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758911387841-10502e496e27318a855aae5ee304970a.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A07 con el potente procesador MediaTek Helio G99 para un rendimiento superior en gaming y multitarea. Pantalla amplia de 6.7 pulgadas y batería de 5000mAh para un uso intensivo durante todo el día. Lanzamiento agosto 2025 con las últimas innovaciones Samsung.',
    specifications: {
      'Pantalla': '6.7" Super AMOLED, FHD+ 1080 x 2400',
      'Procesador': 'MediaTek Helio G99 Octa-core',
      'GPU': 'Mali-G57 MC2',
      'RAM': '4GB LPDDR4X',
      'Almacenamiento': '64GB UFS 2.2 (expandible)',
      'Cámara principal': '64MP + 8MP ultra wide + 2MP macro',
      'Cámara frontal': '16MP con modo retrato',
      'Batería': '5000mAh con carga rápida 33W',
      'Sistema operativo': 'Android 14 con One UI 6.1',
      'Conectividad': '4G LTE, WiFi 6, Bluetooth 5.2, NFC',
      'Seguridad': 'Huella en pantalla + reconocimiento facial',
      'Audio': 'Dolby Atmos, jack 3.5mm',
      'Lanzamiento': 'Agosto 2025',
      'Garantía': '1 año Samsung'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung Galaxy A17 5G
  {
    id: 23,
    name: 'Samsung Galaxy A17 5G Triple Cámara 50MP Ultra Gran Angular',
    price: 170,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758911457955-9c1764f3e926a2f84e43a25d94eb64eb.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.7,
    reviews: 245,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A17 5G con sistema de triple cámara profesional que captura cada momento con precisión excepcional. Cámara principal de 50MP, ultra gran angular de 5MP y macro de 2MP para versatilidad fotográfica completa. Conectividad 5G para velocidades de internet ultrarrápidas y experiencia multimedia superior.',
    specifications: {
      'Pantalla': '6.7" Super AMOLED, FHD+ 2400x1080, 90Hz',
      'Procesador': 'Exynos 1380 5G Octa-core',
      'RAM': '6GB LPDDR5',
      'Almacenamiento': '128GB UFS 3.1 (expandible hasta 1TB)',
      'Cámara principal': '50MP f/1.8 con OIS',
      'Cámara ultra gran angular': '5MP f/2.2, 123° FOV',
      'Cámara macro': '2MP f/2.4 para primeros planos',
      'Cámara frontal': '13MP f/2.2 con modo retrato',
      'Video': '4K@30fps, estabilización digital',
      'Batería': '5000mAh con carga rápida 25W',
      'Sistema operativo': 'Android 14 con One UI 6.1',
      'Conectividad': '5G, WiFi 6, Bluetooth 5.3, NFC, GPS',
      'Seguridad': 'Huella en pantalla ultrasónica',
      'Resistencia': 'IP67 resistente al agua y polvo',
      'Garantía': '2 años Samsung'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  }
];

// Productos de Energía Renovable
const renewableEnergyProducts: Product[] = [
  // ECO-WORTHY Batería de litio LiFePO4 de 12 V 100 AH
  {
    id: 32,
    name: 'ECO-WORTHY Batería de litio LiFePO4 de 12 V 100 AH con pantalla SOC',
    price: 380,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759174716830-ddda01f0d370168d427c0daa4281bee2.jpeg',
    category: 'energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de 12V 100AH con tecnología Bluetooth integrada y pantalla SOC digital. Sistema de gestión de batería (BMS) avanzado con protección contra sobrecarga, descarga profunda y cortocircuito. Más de 4000 ciclos de vida útil y carga rápida para sistemas solares residenciales y comerciales.',
    specifications: {
      'Voltaje': '12.8V nominal',
      'Capacidad': '100Ah (1280Wh)',
      'Tecnología': 'LiFePO4 (Litio Ferro Fosfato)',
      'BMS': '100A con protecciones múltiples',
      'Bluetooth': 'Monitoreo remoto integrado',
      'Pantalla SOC': 'Digital con indicador de carga',
      'Ciclos de vida': 'Más de 4000 ciclos al 80%',
      'Temperatura operación': '-20°C a 60°C',
      'Dimensiones': '330 x 172 x 220 mm',
      'Peso': '13.5 kg',
      'Certificaciones': 'CE, FCC, RoHS',
      'Garantía': '5 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },
  
  // ECO-WORTHY Batería de litio 24V 100AH
  {
    id: 33,
    name: 'Batería de litio ECO-WORTHY Bluetooth de 24 V 100 AH con pantalla LED SOC',
    price: 750,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759178705699-046b9d2cc79eea5a4c53a8dea05da25c.jpg',
    category: 'energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de 24V 100AH con sistema BMS integrado y protección de baja temperatura. Pantalla LED SOC con conectividad Bluetooth para monitoreo remoto avanzado. Ideal para sistemas solares de mayor voltaje, autocaravanas y aplicaciones industriales que requieren mayor potencia y eficiencia.',
    specifications: {
      'Voltaje': '25.6V nominal',
      'Capacidad': '100Ah (2560Wh)',
      'Tecnología': 'LiFePO4 con células prismáticas',
      'BMS': '100A con protección baja temperatura',
      'Bluetooth': 'App móvil para monitoreo',
      'Pantalla': 'LED SOC con indicadores múltiples',
      'Ciclos de vida': 'Más de 6000 ciclos al 80%',
      'Temperatura operación': '-10°C a 55°C',
      'Protección baja temp': 'Desconexión automática <0°C',
      'Dimensiones': '522 x 240 x 219 mm',
      'Peso': '26.8 kg',
      'Corriente máxima': '100A continua',
      'Garantía': '7 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },
  
  // ECO-WORTHY Batería de litio 12V 300AH
  {
    id: 34,
    name: 'ECO-WORTHY Batería de litio LiFePO4 de 12 V 300 Ah Bluetooth con LED SOC',
    price: 899,
    originalPrice: 1058,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759178835996-6c3c9250ecaa0fc58459bb7c7df51d42.jpg',
    category: 'energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 5.0,
    reviews: 67,
    inStock: true,
    isNew: true,
    isSale: true,
    discount: 15,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de ultra alta capacidad 12V 300AH con 3840Wh de energía almacenada. BMS de 200A para aplicaciones de alta demanda y hasta 15,000 ciclos de vida profunda. Protección de baja temperatura y sistema de monitoreo Bluetooth avanzado. Ideal para sistemas solares residenciales completos y aplicaciones off-grid.',
    specifications: {
      'Voltaje': '12.8V nominal',
      'Capacidad': '300Ah (3840Wh)',
      'Tecnología': 'LiFePO4 grado A+',
      'BMS': '200A con protecciones avanzadas',
      'Bluetooth': 'Monitoreo en tiempo real',
      'Pantalla': 'LED SOC multi-función',
      'Ciclos de vida': 'Hasta 15,000 ciclos profundos',
      'Temperatura operación': '-20°C a 65°C',
      'Protección baja temp': 'Calentador interno automático',
      'Dimensiones': '522 x 269 x 220 mm',
      'Peso': '36.2 kg',
      'Corriente máxima': '200A continua',
      'Eficiencia': '95% de carga/descarga',
      'Garantía': '10 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // Inversor Solar Híbrido 4000W
  {
    id: 35,
    name: 'Inversor Solar Híbrido 4000W CC 24V a CA 120V con MPPT 140A',
    price: 550,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759179300580-2ed9a0261c4e45fc92ef2ea2b3366344.jpeg',
    category: 'energy',
    subcategory: 'inverters',
    brand: 'ECO-WORTHY',
    rating: 4.7,
    reviews: 123,
    inStock: true,
    isNew: true,
    description: 'Inversor solar híbrido de 4000W con onda sinusoidal pura para conversión eficiente de 24V DC a 120V AC. Controlador de carga MPPT de 140A integrado, pantalla LCD informativa y cubierta superior de vidrio templado. Ideal para sistemas solares residenciales y comerciales con máxima eficiencia energética.',
    specifications: {
      'Potencia': '4000W onda sinusoidal pura',
      'Voltaje entrada': '24V DC',
      'Voltaje salida': '120V AC ±3%',
      'Frecuencia': '60Hz ±0.3Hz',
      'Eficiencia': '95% conversión máxima',
      'MPPT': 'Controlador 140A integrado',
      'Pantalla': 'LCD con datos en tiempo real',
      'Protecciones': 'Sobrecarga, cortocircuito, temperatura',
      'Cubierta': 'Vidrio templado resistente',
      'Dimensiones': '485 x 275 x 155 mm',
      'Peso': '18.5 kg',
      'Temperatura operación': '-10°C a 50°C',
      'Certificaciones': 'CE, FCC, RoHS',
      'Garantía': '3 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // Panel Solar Canadian Solar 615W
  {
    id: 36,
    name: 'Panel Solar Canadian Solar 615W Bifacial TOPCon N-type',
    price: 220,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759179346340-1fa3f8b9703444c29847d82c33eabf41.jpeg',
    category: 'energy',
    subcategory: 'solar-panels',
    brand: 'Canadian Solar',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isNew: true,
    description: 'Panel solar Canadian Solar de 615W con tecnología bifacial TOPCon N-type de última generación. Modelo CS6.2-66TB TOPBiHiKu6 que captura energía por ambas caras, maximizando la generación total. Mayor eficiencia y menor degradación comparado con módulos convencionales, ideal para instalaciones residenciales y comerciales.',
    specifications: {
      'Modelo': 'CS6.2-66TB TOPBiHiKu6',
      'Potencia': '615W (frontal)',
      'Tecnología': 'Bifacial N-type TOPCon',
      'Eficiencia frontal': '22.8%',
      'Ganancia bifacial': 'Hasta 30% adicional',
      'Células': '132 células (6x22)',
      'Dimensiones': '2384 x 1303 x 35 mm',
      'Peso': '34.6 kg',
      'Marco': 'Aluminio anodizado',
      'Vidrio': 'Templado 3.2mm frontal/trasero',
      'Degradación año 1': 'Menos de 2%',
      'Degradación anual': '0.4% años 2-30',
      'Certificaciones': 'IEC 61215, IEC 61730, UL 1703',
      'Garantía producto': '15 años',
      'Garantía potencia': '30 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  }
];

// Productos específicos para Villa Clara
const villaClaraPhones: Product[] = [
  // Samsung A05 (4-64gb) Villa Clara
  {
    id: 1001,
    name: 'Samsung A05 (4-64GB)',
    price: 90,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206405690-4c576701893adc998fb95af7179b89a2.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.2,
    reviews: 45,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05 con 4GB de RAM y 64GB de almacenamiento. Smartphone accesible con rendimiento sólido para uso diario.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung A16 (4-128gb) Villa Clara
  {
    id: 1002,
    name: 'Samsung A16 (4-128GB)',
    price: 140,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206445143-486e16605df44d5890754d80e24b39bb.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A16 con 4GB de RAM y 128GB de almacenamiento. Diseño moderno con excelente cámara y rendimiento mejorado.',
    specifications: {
      'Pantalla': '6.7" Super AMOLED',
      'Procesador': 'MediaTek Dimensity 6100+',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '50MP + 5MP + 2MP',
      'Cámara frontal': '13MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung A06 (4-64gb) Villa Clara
  {
    id: 1003,
    name: 'Samsung A06 (4-64GB)',
    price: 100,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206481283-fec21bac12a1b526c9affb128a393ed9.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.1,
    reviews: 34,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A06 con 4GB de RAM y 64GB de almacenamiento. Smartphone funcional con características esenciales.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Nokia C12 (3-64gb) Villa Clara
  {
    id: 1004,
    name: 'Nokia C12 (3-64GB)',
    price: 70,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206516615-787399cee74330def48b2702433d0813.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Nokia',
    rating: 4.0,
    reviews: 28,
    inStock: true,
    isNew: true,
    description: 'Nokia C12 con 3GB de RAM y 64GB de almacenamiento. Smartphone básico y confiable con la calidad Nokia.',
    specifications: {
      'Pantalla': '6.3" IPS LCD',
      'Procesador': 'UNISOC SC9863A',
      'RAM': '3GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '8MP',
      'Cámara frontal': '5MP',
      'Batería': '3000mAh',
      'Sistema operativo': 'Android 12 (Go edition)'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Redmi 15C (16-256gb) Villa Clara
  {
    id: 1005,
    name: 'Redmi 15C (16-256GB)',
    price: 140,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206539870-21888c97540c6b3e77d03367a7fad17d.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Xiaomi Redmi 15C con 16GB de RAM y 256GB de almacenamiento. Alto rendimiento y gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.74" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '16GB',
      'Almacenamiento': '256GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '5MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'MIUI 14 based on Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Redmi A3X (4-128gb) Villa Clara
  {
    id: 1006,
    name: 'Redmi A3X (4-128GB)',
    price: 90,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206567970-f3d3ed1352f92f066345085be1ca2b39.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    rating: 4.3,
    reviews: 52,
    inStock: true,
    isNew: true,
    description: 'Xiaomi Redmi A3X con 4GB de RAM y 128GB de almacenamiento. Smartphone equilibrado con buena relación precio-rendimiento.',
    specifications: {
      'Pantalla': '6.71" IPS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '8MP',
      'Cámara frontal': '5MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Tecno 20 (8-256gb) Villa Clara
  {
    id: 1007,
    name: 'Tecno 20 (8-256GB)',
    price: 120,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206604640-bda1b9c9389afa3f2e6cb0c6ef2dcee5.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.5,
    reviews: 73,
    inStock: true,
    isNew: true,
    description: 'Tecno 20 con 8GB de RAM y 256GB de almacenamiento. Rendimiento superior y gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.7" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G85',
      'RAM': '8GB',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 2MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'HiOS 12 based on Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Tecno Go1 (3+3-64gb) Villa Clara
  {
    id: 1008,
    name: 'Tecno Go1 (3+3-64GB)',
    price: 90,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206633823-485c14ee615e86bacdf9125e2ccdcd5d.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.2,
    reviews: 41,
    inStock: true,
    isNew: true,
    description: 'Tecno Go1 con 3GB+3GB de RAM expandida y 64GB de almacenamiento. Smartphone básico con tecnología de expansión de memoria RAM.',
    specifications: {
      'Pantalla': '6.52" IPS LCD',
      'Procesador': 'UNISOC Tiger T606',
      'RAM': '3GB + 3GB expandida',
      'Almacenamiento': '64GB',
      'Cámara principal': '48MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '4000mAh',
      'Sistema operativo': 'HiOS 12 based on Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Tecno Spark 30C (4+4-256gb) Villa Clara
  {
    id: 1009,
    name: 'Tecno Spark 30C (4+4-256GB)',
    price: 105,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206659001-f6637d9d12980bf21aeab9329b5c384a.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.4,
    reviews: 61,
    inStock: true,
    isNew: true,
    description: 'Tecno Spark 30C con 4GB+4GB de RAM expandida y 256GB de almacenamiento. Excelente rendimiento con gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.67" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB + 4GB expandida',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'HiOS 14 based on Android 14'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Balde A35 (6-64gb) Villa Clara
  {
    id: 1010,
    name: 'Balde A35 (6-64GB)',
    price: 75,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206684913-5a68d7bc00ea7986442944e10e479077.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Balde',
    rating: 4.1,
    reviews: 33,
    inStock: true,
    isNew: true,
    description: 'Balde A35 con 6GB de RAM y 64GB de almacenamiento. Smartphone con buena cantidad de RAM para multitarea eficiente.',
    specifications: {
      'Pantalla': '6.5" IPS LCD',
      'Procesador': 'UNISOC Tiger T606',
      'RAM': '6GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '13MP + 2MP',
      'Cámara frontal': '5MP',
      'Batería': '4000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Samsung A05s (4-128gb) Villa Clara
  {
    id: 1011,
    name: 'Samsung A05s (4-128GB)',
    price: 120,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206708897-b51f8df4c872e813636b25e44ebdd6ec.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.3,
    reviews: 58,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05s con 4GB de RAM y 128GB de almacenamiento. Versión mejorada del A05 con mejor rendimiento y más almacenamiento.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'Qualcomm Snapdragon 680',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '50MP + 2MP + 2MP',
      'Cámara frontal': '13MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  }
];

// Productos para Ciego de Ávila y Sancti Spíritus
const ciegoAvilaSanctiSpiritusPhones: Product[] = [
  // Samsung F05 (4-64gb) - Solo para estas provincias
  {
    id: 2001,
    name: 'Samsung F05 (4-64GB)',
    price: 95,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206405690-4c576701893adc998fb95af7179b89a2.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.2,
    reviews: 42,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy F05 con 4GB de RAM y 64GB de almacenamiento. Smartphone con diseño moderno y rendimiento confiable.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Samsung A05 (4-64gb) - Precio diferente para estas provincias
  {
    id: 2002,
    name: 'Samsung A05 (4-64GB)',
    price: 100,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206405690-4c576701893adc998fb95af7179b89a2.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.2,
    reviews: 45,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05 con 4GB de RAM y 64GB de almacenamiento. Smartphone accesible con rendimiento sólido para uso diario.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Samsung A05s (4-128gb) - Precio diferente
  {
    id: 2003,
    name: 'Samsung A05s (4-128GB)',
    price: 130,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206708897-b51f8df4c872e813636b25e44ebdd6ec.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.3,
    reviews: 58,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A05s con 4GB de RAM y 128GB de almacenamiento. Versión mejorada del A05 con mejor rendimiento y más almacenamiento.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'Qualcomm Snapdragon 680',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '50MP + 2MP + 2MP',
      'Cámara frontal': '13MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Samsung A16 (4-128gb) - Precio diferente
  {
    id: 2004,
    name: 'Samsung A16 (4-128GB)',
    price: 155,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206445143-486e16605df44d5890754d80e24b39bb.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A16 con 4GB de RAM y 128GB de almacenamiento. Diseño moderno con excelente cámara y rendimiento mejorado.',
    specifications: {
      'Pantalla': '6.7" Super AMOLED',
      'Procesador': 'MediaTek Dimensity 6100+',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '50MP + 5MP + 2MP',
      'Cámara frontal': '13MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Samsung A06 (4-64gb) - Precio diferente
  {
    id: 2005,
    name: 'Samsung A06 (4-64GB)',
    price: 110,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206481283-fec21bac12a1b526c9affb128a393ed9.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.1,
    reviews: 34,
    inStock: true,
    isNew: true,
    description: 'Samsung Galaxy A06 con 4GB de RAM y 64GB de almacenamiento. Smartphone funcional con características esenciales.',
    specifications: {
      'Pantalla': '6.7" PLS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Nokia C12 (3-64gb) - Precio diferente
  {
    id: 2006,
    name: 'Nokia C12 (3-64GB)',
    price: 75,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206516615-787399cee74330def48b2702433d0813.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Nokia',
    rating: 4.0,
    reviews: 28,
    inStock: true,
    isNew: true,
    description: 'Nokia C12 con 3GB de RAM y 64GB de almacenamiento. Smartphone básico y confiable con la calidad Nokia.',
    specifications: {
      'Pantalla': '6.3" IPS LCD',
      'Procesador': 'UNISOC SC9863A',
      'RAM': '3GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '8MP',
      'Cámara frontal': '5MP',
      'Batería': '3000mAh',
      'Sistema operativo': 'Android 12 (Go edition)'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Redmi 15C (16-256gb) - Mismo precio
  {
    id: 2007,
    name: 'Redmi 15C (16-256GB)',
    price: 140,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206539870-21888c97540c6b3e77d03367a7fad17d.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Xiaomi Redmi 15C con 16GB de RAM y 256GB de almacenamiento. Alto rendimiento y gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.74" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '16GB',
      'Almacenamiento': '256GB',
      'Cámara principal': '50MP + 2MP',
      'Cámara frontal': '5MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'MIUI 14 based on Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Redmi A3X (4-128gb) - Precio diferente
  {
    id: 2008,
    name: 'Redmi A3X (4-128GB)',
    price: 95,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206567970-f3d3ed1352f92f066345085be1ca2b39.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    rating: 4.3,
    reviews: 52,
    inStock: true,
    isNew: true,
    description: 'Xiaomi Redmi A3X con 4GB de RAM y 128GB de almacenamiento. Smartphone equilibrado con buena relación precio-rendimiento.',
    specifications: {
      'Pantalla': '6.71" IPS LCD',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB',
      'Almacenamiento': '128GB',
      'Cámara principal': '8MP',
      'Cámara frontal': '5MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'Android 14'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Tecno 20 (8-256gb) - Precio diferente
  {
    id: 2009,
    name: 'Tecno 20 (8-256GB)',
    price: 125,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206604640-bda1b9c9389afa3f2e6cb0c6ef2dcee5.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.5,
    reviews: 73,
    inStock: true,
    isNew: true,
    description: 'Tecno 20 con 8GB de RAM y 256GB de almacenamiento. Rendimiento superior y gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.7" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G85',
      'RAM': '8GB',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + 2MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'HiOS 12 based on Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Tecno Go1 (3+3-64gb) - Precio diferente
  {
    id: 2010,
    name: 'Tecno Go1 (3+3-64GB)',
    price: 100,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206633823-485c14ee615e86bacdf9125e2ccdcd5d.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.2,
    reviews: 41,
    inStock: true,
    isNew: true,
    description: 'Tecno Go1 con 3GB+3GB de RAM expandida y 64GB de almacenamiento. Smartphone básico con tecnología de expansión de memoria RAM.',
    specifications: {
      'Pantalla': '6.52" IPS LCD',
      'Procesador': 'UNISOC Tiger T606',
      'RAM': '3GB + 3GB expandida',
      'Almacenamiento': '64GB',
      'Cámara principal': '48MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '4000mAh',
      'Sistema operativo': 'HiOS 12 based on Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Tecno Spark 30C (4+4-256gb) - Precio diferente
  {
    id: 2011,
    name: 'Tecno Spark 30C (4+4-256GB)',
    price: 120,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206659001-f6637d9d12980bf21aeab9329b5c384a.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Tecno',
    rating: 4.4,
    reviews: 61,
    inStock: true,
    isNew: true,
    description: 'Tecno Spark 30C con 4GB+4GB de RAM expandida y 256GB de almacenamiento. Excelente rendimiento con gran capacidad de almacenamiento.',
    specifications: {
      'Pantalla': '6.67" IPS LCD 90Hz',
      'Procesador': 'MediaTek Helio G36',
      'RAM': '4GB + 4GB expandida',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP + AI',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Sistema operativo': 'HiOS 14 based on Android 14'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  },

  // Balde A35 (6-64gb) - Precio diferente
  {
    id: 2012,
    name: 'Balde A35 (6-64GB)',
    price: 80,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759206684913-5a68d7bc00ea7986442944e10e479077.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Balde',
    rating: 4.1,
    reviews: 33,
    inStock: true,
    isNew: true,
    description: 'Balde A35 con 6GB de RAM y 64GB de almacenamiento. Smartphone con buena cantidad de RAM para multitarea eficiente.',
    specifications: {
      'Pantalla': '6.5" IPS LCD',
      'Procesador': 'UNISOC Tiger T606',
      'RAM': '6GB',
      'Almacenamiento': '64GB',
      'Cámara principal': '13MP + 2MP',
      'Cámara frontal': '5MP',
      'Batería': '4000mAh',
      'Sistema operativo': 'Android 13'
    },
    availableLocations: {
      provinces: ['ciego-de-avila', 'sancti-spiritus'],
      municipalities: ['all']
    }
  }
];

// Combine all products into a single array
export const products: Product[] = [
  ...existingProducts,
  ...newProducts,
  ...renewableEnergyProducts,
  ...villaClaraPhones,
  ...ciegoAvilaSanctiSpiritusPhones,
  
  // TP-Link Modem Router WiFi
  {
    id: 24,
    name: 'TP-Link TD-W8961N Modem Router WiFi 300Mbps',
    price: 60,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758910640347-b454636b74d23e195ef3aa9d98e7db0b.jpg',
    category: 'electronics',
    subcategory: 'wifi-equipment',
    brand: 'TP-Link',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: 'Modem Router WiFi TP-Link TD-W8961N de alto rendimiento con tecnología ADSL2+ y velocidades de hasta 300Mbps. Solución completa para conectividad doméstica y empresarial con 4 puertos LAN, doble antena para máxima cobertura y configuración plug-and-play. Ideal para streaming, gaming y trabajo remoto con conexión estable y segura.',
    specifications: {
      'Modelo': 'TD-W8961N',
      'Tecnología': 'ADSL2+ con WiFi 802.11n',
      'Velocidad WiFi': '300Mbps (2.4GHz)',
      'Puertos LAN': '4 puertos Ethernet 10/100Mbps',
      'Antenas': '2 antenas externas fijas 5dBi',
      'Seguridad': 'WPA/WPA2, WEP, Firewall SPI',
      'Funciones avanzadas': 'QoS, Port Forwarding, DMZ',
      'Configuración': 'Web interface, WPS button',
      'Dimensiones': '243 x 160 x 33 mm',
      'Alimentación': '12V/1A DC adapter',
      'Compatibilidad': 'Todos los proveedores ADSL',
      'Garantía': '2 años TP-Link'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Ventilador de Pedestal SANUMO
  {
    id: 25,
    name: 'Ventilador de Pedestal SANUMO FS40-21M 6 Velocidades',
    price: 100,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758910755282-2e9d956678905588e642e0bb91233cfb.jpeg',
    category: 'appliances',
    subcategory: 'fans',
    brand: 'SANUMO',
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Ventilador de pedestal SANUMO FS40-21M de alta potencia con 6 velocidades ajustables y temporizador programable. Diseño robusto con base estable de 2.5kg y altura ajustable de 1.35m. Motor silencioso y eficiente para máximo confort en espacios amplios. Ideal para hogares, oficinas y espacios comerciales con control preciso del flujo de aire.',
    specifications: {
      'Marca': 'SANUMO',
      'Modelo': 'FS40-21M',
      'Diámetro aspas': '40cm (16 pulgadas)',
      'Velocidades': '6 niveles ajustables',
      'Temporizador': '1 hora programable',
      'Altura': '1.35m ajustable',
      'Base': 'Redonda estable 2.5kg',
      'Voltaje': '110V/60Hz',
      'Potencia': '65W motor eficiente',
      'Oscilación': 'Horizontal automática 90°',
      'Nivel de ruido': 'Menos de 45dB (silencioso)',
      'Material': 'ABS resistente + metal',
      'Controles': 'Panel táctil + control remoto',
      'Garantía': '2 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Ventilador Portátil F6
  {
    id: 26,
    name: 'Ventilador Portátil F6 20000mAh Control Remoto 360°',
    price: 60,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1758910819887-b9366ee713f799afaad01c055db09f33.jpeg',
    category: 'appliances',
    subcategory: 'fans',
    brand: 'Universal',
    rating: 4.6,
    reviews: 134,
    inStock: true,
    isNew: true,
    description: 'Ventilador portátil F6 de última generación con batería de ultra alta capacidad 20000mAh y rotación completa de 360°. Incluye control remoto, función oscilante y gancho colgante para máxima versatilidad. Tecnología USB 9.0 para carga rápida y eficiencia energética superior. Perfecto para camping, oficina, dormitorio o cualquier espacio que necesite ventilación portátil.',
    specifications: {
      'Modelo': 'F6 Pro',
      'Batería': '20000mAh Li-ion de alta densidad',
      'Autonomía': 'Hasta 24 horas de uso continuo',
      'Rotación': '360° horizontal + vertical',
      'Control': 'Remoto inalámbrico + botones táctiles',
      'Oscilación': 'Automática programable',
      'Potencia': '15W motor brushless',
      'Carga': 'USB 9.0 carga rápida 2 horas',
      'Velocidades': '4 niveles + modo natural',
      'Dimensiones': '4.5" x 8.7" x 11.2" pulgadas',
      'Peso': '1.2kg ultraligero',
      'Montaje': 'Gancho colgante + base estable',
      'Ruido': 'Menos de 35dB (ultra silencioso)',
      'Garantía': '18 meses'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // ECO-WORTHY Batería de litio LiFePO4 de 12 V 100 AH
  {
    id: 27,
    name: 'ECO-WORTHY Batería de litio LiFePO4 de 12 V 100 AH con pantalla SOC',
    price: 380,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759174716830-ddda01f0d370168d427c0daa4281bee2.jpeg',
    category: 'renewable-energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de 12V 100AH con tecnología Bluetooth integrada y pantalla SOC digital. Sistema de gestión de batería (BMS) avanzado con protección contra sobrecarga, descarga profunda y cortocircuito. Más de 4000 ciclos de vida útil y carga rápida para sistemas solares residenciales y comerciales.',
    specifications: {
      'Voltaje': '12.8V nominal',
      'Capacidad': '100Ah (1280Wh)',
      'Tecnología': 'LiFePO4 (Litio Ferro Fosfato)',
      'BMS': '100A con protecciones múltiples',
      'Bluetooth': 'Monitoreo remoto integrado',
      'Pantalla SOC': 'Digital con indicador de carga',
      'Ciclos de vida': 'Más de 4000 ciclos al 80%',
      'Temperatura operación': '-20°C a 60°C',
      'Dimensiones': '330 x 172 x 220 mm',
      'Peso': '13.5 kg',
      'Certificaciones': 'CE, FCC, RoHS',
      'Garantía': '5 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // ECO-WORTHY Batería de litio 24V 100AH
  {
    id: 28,
    name: 'Batería de litio ECO-WORTHY Bluetooth de 24 V 100 AH con pantalla LED SOC',
    price: 750,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759178705699-046b9d2cc79eea5a4c53a8dea05da25c.jpg',
    category: 'renewable-energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de 24V 100AH con sistema BMS integrado y protección de baja temperatura. Pantalla LED SOC con conectividad Bluetooth para monitoreo remoto avanzado. Ideal para sistemas solares de mayor voltaje, autocaravanas y aplicaciones industriales que requieren mayor potencia y eficiencia.',
    specifications: {
      'Voltaje': '25.6V nominal',
      'Capacidad': '100Ah (2560Wh)',
      'Tecnología': 'LiFePO4 con células prismáticas',
      'BMS': '100A con protección baja temperatura',
      'Bluetooth': 'App móvil para monitoreo',
      'Pantalla': 'LED SOC con indicadores múltiples',
      'Ciclos de vida': 'Más de 6000 ciclos al 80%',
      'Temperatura operación': '-10°C a 55°C',
      'Protección baja temp': 'Desconexión automática <0°C',
      'Dimensiones': '522 x 240 x 219 mm',
      'Peso': '26.8 kg',
      'Corriente máxima': '100A continua',
      'Garantía': '7 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // ECO-WORTHY Batería de litio 12V 300AH
  {
    id: 29,
    name: 'ECO-WORTHY Batería de litio LiFePO4 de 12 V 300 Ah Bluetooth con LED SOC',
    price: 899,
    originalPrice: 1058,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759178835996-6c3c9250ecaa0fc58459bb7c7df51d42.jpg',
    category: 'renewable-energy',
    subcategory: 'solar-batteries',
    brand: 'ECO-WORTHY',
    rating: 5.0,
    reviews: 67,
    inStock: true,
    isNew: true,
    isSale: true,
    discount: 15,
    description: 'Batería de litio LiFePO4 ECO-WORTHY de ultra alta capacidad 12V 300AH con 3840Wh de energía almacenada. BMS de 200A para aplicaciones de alta demanda y hasta 15,000 ciclos de vida profunda. Protección de baja temperatura y sistema de monitoreo Bluetooth avanzado. Ideal para sistemas solares residenciales completos y aplicaciones off-grid.',
    specifications: {
      'Voltaje': '12.8V nominal',
      'Capacidad': '300Ah (3840Wh)',
      'Tecnología': 'LiFePO4 grado A+',
      'BMS': '200A con protecciones avanzadas',
      'Bluetooth': 'Monitoreo en tiempo real',
      'Pantalla': 'LED SOC multi-función',
      'Ciclos de vida': 'Hasta 15,000 ciclos profundos',
      'Temperatura operación': '-20°C a 65°C',
      'Protección baja temp': 'Calentador interno automático',
      'Dimensiones': '522 x 269 x 220 mm',
      'Peso': '36.2 kg',
      'Corriente máxima': '200A continua',
      'Eficiencia': '95% de carga/descarga',
      'Garantía': '10 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // Inversor Solar Híbrido 4000W
  {
    id: 30,
    name: 'Inversor Solar Híbrido 4000W CC 24V a CA 120V con MPPT 140A',
    price: 550,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759179300580-2ed9a0261c4e45fc92ef2ea2b3366344.jpeg',
    category: 'renewable-energy',
    subcategory: 'inverters',
    brand: 'ECO-WORTHY',
    rating: 4.7,
    reviews: 123,
    inStock: true,
    isNew: true,
    description: 'Inversor solar híbrido de 4000W con onda sinusoidal pura para conversión eficiente de 24V DC a 120V AC. Controlador de carga MPPT de 140A integrado, pantalla LCD informativa y cubierta superior de vidrio templado. Ideal para sistemas solares residenciales y comerciales con máxima eficiencia energética.',
    specifications: {
      'Potencia': '4000W onda sinusoidal pura',
      'Voltaje entrada': '24V DC',
      'Voltaje salida': '120V AC ±3%',
      'Frecuencia': '60Hz ±0.3Hz',
      'Eficiencia': '95% conversión máxima',
      'MPPT': 'Controlador 140A integrado',
      'Pantalla': 'LCD con datos en tiempo real',
      'Protecciones': 'Sobrecarga, cortocircuito, temperatura',
      'Cubierta': 'Vidrio templado resistente',
      'Dimensiones': '485 x 275 x 155 mm',
      'Peso': '18.5 kg',
      'Temperatura operación': '-10°C a 50°C',
      'Certificaciones': 'CE, FCC, RoHS',
      'Garantía': '3 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // Panel Solar Canadian Solar 615W
  {
    id: 31,
    name: 'Panel Solar Canadian Solar 615W Bifacial TOPCon N-type',
    price: 220,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759179346340-1fa3f8b9703444c29847d82c33eabf41.jpeg',
    category: 'renewable-energy',
    subcategory: 'solar-panels',
    brand: 'Canadian Solar',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isNew: true,
    description: 'Panel solar Canadian Solar de 615W con tecnología bifacial TOPCon N-type de última generación. Modelo CS6.2-66TB TOPBiHiKu6 que captura energía por ambas caras, maximizando la generación total. Mayor eficiencia y menor degradación comparado con módulos convencionales, ideal para instalaciones residenciales y comerciales.',
    specifications: {
      'Modelo': 'CS6.2-66TB TOPBiHiKu6',
      'Potencia': '615W (frontal)',
      'Tecnología': 'Bifacial N-type TOPCon',
      'Eficiencia frontal': '22.8%',
      'Ganancia bifacial': 'Hasta 30% adicional',
      'Células': '132 células (6x22)',
      'Dimensiones': '2384 x 1303 x 35 mm',
      'Peso': '34.6 kg',
      'Marco': 'Aluminio anodizado',
      'Vidrio': 'Templado 3.2mm frontal/trasero',
      'Degradación año 1': 'Menos de 2%',
      'Degradación anual': '0.4% años 2-30',
      'Certificaciones': 'IEC 61215, IEC 61730, UL 1703',
      'Garantía producto': '15 años',
      'Garantía potencia': '30 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['santa-clara', 'sagua-la-grande', 'placetas', 'camajuani', 'caibarien', 'remedios', 'ranchuelo', 'manicaragua', 'santo-domingo', 'encrucijada', 'corralillo', 'quemado-de-guines', 'cifuentes']
    }
  },

  // Cargador de Batería YONHAN 20A
  {
    id: 2013,
    name: 'YONHAN Cargador de Batería 20A 12V/24V Inteligente Automático',
    price: 60,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759349454992-a94138e4208a1e9b74b7db3a0badeb91.jpg',
    category: 'energy',
    subcategory: 'inverters',
    brand: 'YONHAN',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    isNew: true,
    description: 'Cargador de batería YONHAN de 20 amperios totalmente automático e inteligente para baterías de 12V y 24V. Incluye funciones de carga flotante, goteo, mantenimiento y reparación por pulsos. Compatible con baterías de plomo-ácido, AGM, gel y LiFePO4. Protección múltiple contra sobrecarga, cortocircuito y polaridad inversa.',
    specifications: {
      'Corriente de carga': '20A',
      'Voltaje': '12V/24V automático',
      'Tipos de batería': 'Plomo-ácido, AGM, Gel, LiFePO4',
      'Modos de carga': 'Inteligente, Flotador, Goteo, Mantenimiento, Reparación por pulsos',
      'Protecciones': 'Sobrecarga, Cortocircuito, Polaridad inversa, Sobrecalentamiento',
      'Pantalla': 'LED indicador de estado',
      'Conectores': 'Pinzas + conectores tipo anillo',
      'Cable de alimentación': '1.8m',
      'Temperatura de operación': '-20°C a 50°C',
      'Certificaciones': 'CE, RoHS',
      'Garantía': '2 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Batería LiFePO4 12V 100Ah
  {
    id: 2014,
    name: 'Batería Litio LiFePO4 12V 100Ah con BMS 100A Grupo 31',
    price: 270,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759349505775-c9e1700687e74b8dd1bb8e2f01b4440a.jpg',
    category: 'energy',
    subcategory: 'solar-batteries',
    brand: 'LiFePO4',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: 'Batería de litio LiFePO4 de 12V 100Ah con BMS integrado de 100A. Hasta 4000 ciclos profundos de carga/descarga. Protección a baja temperatura integrada. Ideal para sistemas solares, RV, marina, motores de arrastre y aplicaciones fuera de la red. Mucho más ligera que las baterías de plomo-ácido equivalentes, sin mantenimiento y con mayor vida útil.',
    specifications: {
      'Voltaje nominal': '12.8V',
      'Capacidad': '100Ah (1280Wh)',
      'Grupo': '31',
      'Tecnología': 'LiFePO4 (Litio Ferro Fosfato)',
      'BMS': '100A integrado con balanceo automático',
      'Ciclos de vida': 'Hasta 4000 ciclos al 100% DOD',
      'Profundidad de descarga': '100% DOD seguro',
      'Peso': '11.8 kg (75% más ligera que plomo-ácido)',
      'Dimensiones': '330 x 172 x 220 mm',
      'Protecciones': 'Sobrecarga, Sobredescarga, Cortocircuito, Baja temperatura',
      'Temperatura de operación': 'Carga: 0°C a 50°C, Descarga: -20°C a 60°C',
      'Aplicaciones': 'Solar, RV, Marina, Motor de arrastre, Off-grid',
      'Conexión en serie/paralelo': 'Hasta 4 unidades',
      'Garantía': '5 años'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Inversor DeWalt DXAEPI1000
  {
    id: 2015,
    name: 'Inversor de Potencia DeWalt DXAEPI1000 500W/1000W',
    price: 85,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759349756704-c0fb7863ee4020d3512973fa1c13f987.jpg',
    category: 'energy',
    subcategory: 'inverters',
    brand: 'DeWalt',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    isNew: true,
    description: 'Inversor de potencia DeWalt DXAEPI1000 con 500W de potencia continua y 1000W de potencia máxima. Convierte corriente DC de 12V a AC de 110V para alimentar herramientas eléctricas, electrodomésticos y dispositivos electrónicos. Ideal para uso en vehículos, camping, RV y situaciones de emergencia. Incluye puerto USB para carga de dispositivos móviles.',
    specifications: {
      'Modelo': 'DXAEPI1000',
      'Potencia continua': '500W',
      'Potencia máxima': '1000W (pico)',
      'Entrada': '12V DC',
      'Salida': '110V AC, 60Hz',
      'Forma de onda': 'Onda sinusoidal modificada',
      'Puertos de salida': '2 tomas AC + 1 puerto USB 2.1A',
      'Eficiencia': 'Hasta 90%',
      'Protecciones': 'Sobrecarga, Sobrecalentamiento, Bajo voltaje, Cortocircuito',
      'Ventilación': 'Ventilador de enfriamiento automático',
      'Indicadores': 'LED de estado y alarma',
      'Cable de entrada': '60cm con pinzas y terminal de batería',
      'Dimensiones': '25 x 15 x 7 cm',
      'Peso': '1.8 kg',
      'Garantía': '3 años DeWalt'
    },
    availableLocations: {
      provinces: ['villa-clara'],
      municipalities: ['all']
    }
  },

  // Arroz 10kg
  {
    id: 2016,
    name: 'Arroz 10kg',
    price: 21.1,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352092664-3ca3b229f6eb2ee2cb7d8abb2fe41d4d.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.5,
    reviews: 342,
    inStock: true,
    isNew: true,
    description: 'Arroz de primera calidad en presentación de 10 kilogramos. Ideal para familias y preparación de múltiples comidas. Grano largo y de excelente cocción.',
    specifications: {
      'Peso': '10 kg',
      'Tipo': 'Grano largo',
      'Origen': 'Importado',
      'Presentación': 'Saco',
      'Rendimiento': 'Aproximadamente 100 porciones',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Frijoles Negros 1kg
  {
    id: 2017,
    name: 'Frijoles Negros 1kg',
    price: 1.45,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352180163-162705cc9b4e8e40f627767747694f1d.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.6,
    reviews: 289,
    inStock: true,
    isNew: true,
    description: 'Frijoles negros de alta calidad en presentación de 1 kilogramo. Perfectos para preparar la tradicional comida cubana. Ricos en proteínas y fibra.',
    specifications: {
      'Peso': '1 kg',
      'Tipo': 'Frijoles negros',
      'Origen': 'Importado',
      'Presentación': 'Bolsa',
      'Valor nutricional': 'Alto en proteínas y fibra',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Leche en Polvo 1kg
  {
    id: 2018,
    name: 'Leche en Polvo 1kg',
    price: 9.75,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352214852-27ddf15536d9420eddae94bbd23f826f.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.7,
    reviews: 412,
    inStock: true,
    isNew: true,
    description: 'Leche en polvo entera de 1 kilogramo. Rica en calcio y vitaminas. Perfecta para toda la familia, fácil de preparar y conservar.',
    specifications: {
      'Peso': '1 kg',
      'Tipo': 'Leche entera en polvo',
      'Presentación': 'Bolsa',
      'Valor nutricional': 'Rica en calcio y vitaminas',
      'Preparación': 'Mezclar con agua',
      'Rendimiento': 'Aproximadamente 7 litros'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Malta Bucanero caja 24
  {
    id: 2019,
    name: 'Malta Bucanero Caja 24 Unidades',
    price: 22.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352236673-b6971a15b98f105ec44f0e577d799976.jpeg',
    category: 'beverages',
    subcategory: 'non-alcoholic',
    brand: 'Bucanero',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    isNew: true,
    description: 'Malta Bucanero en caja de 24 unidades. Bebida malta tradicional cubana, refrescante y nutritiva. Ideal para toda la familia.',
    specifications: {
      'Contenido': '24 unidades',
      'Volumen por unidad': '355ml',
      'Marca': 'Bucanero',
      'Tipo': 'Malta',
      'Presentación': 'Caja',
      'Conservación': 'Lugar fresco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Cartón de Huevos 30u
  {
    id: 2020,
    name: 'Cartón de Huevos 30 Unidades',
    price: 9.2,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352275119-54d1c3c96cafdde36c436103dcaf811f.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.6,
    reviews: 523,
    inStock: true,
    isNew: true,
    description: 'Cartón de huevos frescos con 30 unidades. Excelente fuente de proteínas y nutrientes esenciales. Ideal para el consumo diario.',
    specifications: {
      'Cantidad': '30 unidades',
      'Tipo': 'Huevos frescos',
      'Presentación': 'Cartón',
      'Tamaño': 'Mediano-Grande',
      'Conservación': 'Refrigerado',
      'Valor nutricional': 'Alto en proteínas'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Caja de Cerveza Cristal 24u
  {
    id: 2021,
    name: 'Caja de Cerveza Cristal 24 Unidades',
    price: 19.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352313969-411736afede4453ecf1fc0bae068ae91.jpeg',
    category: 'beverages',
    subcategory: 'alcoholic',
    brand: 'Cristal',
    rating: 4.7,
    reviews: 892,
    inStock: true,
    isNew: true,
    description: 'Cerveza Cristal en caja de 24 unidades. La cerveza más popular de Cuba, refrescante y de sabor suave. Perfecta para cualquier ocasión.',
    specifications: {
      'Contenido': '24 unidades',
      'Volumen por unidad': '355ml',
      'Marca': 'Cristal',
      'Tipo': 'Cerveza lager',
      'Graduación alcohólica': '4.9%',
      'Presentación': 'Caja'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Mortadella 1kg
  {
    id: 2022,
    name: 'Mortadella 1kg',
    price: 4.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352344738-db4e070af3a46780bc4917d4cbefe8ea.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.4,
    reviews: 267,
    inStock: true,
    isNew: true,
    description: 'Mortadella de 1 kilogramo. Embutido de alta calidad perfecto para sándwiches y comidas rápidas. Sabor tradicional y excelente textura.',
    specifications: {
      'Peso': '1 kg',
      'Tipo': 'Embutido',
      'Presentación': 'Pieza',
      'Conservación': 'Refrigerado',
      'Origen': 'Importado',
      'Uso': 'Sándwiches, bocadillos'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Paquete de Salchicha
  {
    id: 2023,
    name: 'Paquete de Salchichas',
    price: 2.35,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352374870-1959d3721200127bf633b8845e62ad46.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.3,
    reviews: 198,
    inStock: true,
    isNew: true,
    description: 'Paquete de salchichas de calidad. Perfectas para desayunos, meriendas y comidas rápidas. Fáciles de preparar.',
    specifications: {
      'Contenido': 'Paquete',
      'Tipo': 'Salchichas',
      'Presentación': 'Paquete sellado',
      'Conservación': 'Refrigerado',
      'Preparación': 'Hervir o freír',
      'Uso': 'Desayunos, bocadillos'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Pollo Entero 1300g
  {
    id: 2024,
    name: 'Pollo Entero 1300g',
    price: 6.8,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352402923-4895a29f107ed5e6080e3d001f1b8b2a.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    isNew: true,
    description: 'Pollo entero congelado de 1300 gramos aproximadamente. Excelente calidad y frescura. Ideal para preparar comidas familiares.',
    specifications: {
      'Peso': '1300g aproximadamente',
      'Tipo': 'Pollo entero',
      'Estado': 'Congelado',
      'Presentación': 'Pieza completa',
      'Conservación': 'Mantener congelado',
      'Uso': 'Asado, guisado, frito'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Caja de Pollo
  {
    id: 2025,
    name: 'Caja de Pollo',
    price: 32.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352434482-e327bbfc73f9eea6f5c14ed0306389c6.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    isNew: true,
    description: 'Caja de pollo congelado. Múltiples piezas de pollo de excelente calidad. Ideal para abastecer a la familia por varios días.',
    specifications: {
      'Contenido': 'Caja completa',
      'Tipo': 'Pollo en piezas',
      'Estado': 'Congelado',
      'Presentación': 'Caja',
      'Peso aproximado': 'Variable según caja',
      'Conservación': 'Mantener congelado'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Pomo Aceite 1lt
  {
    id: 2026,
    name: 'Aceite Vegetal 1 Litro',
    price: 3.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352469056-9ee032cd56e849b9385bc63e1fe61d4f.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.5,
    reviews: 389,
    inStock: true,
    isNew: true,
    description: 'Aceite vegetal de 1 litro. Ideal para cocinar, freír y preparar todo tipo de alimentos. Alta calidad y buen rendimiento.',
    specifications: {
      'Volumen': '1 litro',
      'Tipo': 'Aceite vegetal',
      'Presentación': 'Botella',
      'Uso': 'Cocina general, freír',
      'Conservación': 'Lugar fresco y seco',
      'Origen': 'Importado'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Azúcar 1kg
  {
    id: 2027,
    name: 'Azúcar 1kg',
    price: 2,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352510480-5ccb61941e17d7fef39a657a720ff0b8.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.4,
    reviews: 276,
    inStock: true,
    isNew: true,
    description: 'Azúcar refinada de 1 kilogramo. Perfecta para endulzar bebidas, postres y todo tipo de preparaciones culinarias.',
    specifications: {
      'Peso': '1 kg',
      'Tipo': 'Azúcar refinada',
      'Presentación': 'Bolsa',
      'Color': 'Blanca',
      'Conservación': 'Lugar seco',
      'Uso': 'Endulzar, repostería'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Paquete de Espaguetis
  {
    id: 2028,
    name: 'Paquete de Espaguetis',
    price: 1.85,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352550857-288afe0851d0f6bf51867b5e3243dfee.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    isNew: true,
    description: 'Paquete de espaguetis de alta calidad. Pasta de sémola de trigo perfecta para preparar deliciosas comidas italianas y criollas.',
    specifications: {
      'Contenido': 'Paquete',
      'Tipo': 'Espaguetis',
      'Presentación': 'Paquete sellado',
      'Ingredientes': 'Sémola de trigo',
      'Tiempo de cocción': '8-10 minutos',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Café La Llave
  {
    id: 2029,
    name: 'Café La Llave',
    price: 7.7,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352582058-4f7014c66201c8e443bf26c1c377ad7e.jpeg',
    category: 'beverages',
    subcategory: 'coffee-tea',
    brand: 'La Llave',
    rating: 4.8,
    reviews: 678,
    inStock: true,
    isNew: true,
    description: 'Café La Llave, el sabor tradicional cubano. Café molido de excelente calidad y aroma intenso. Perfecto para el cafecito diario.',
    specifications: {
      'Marca': 'La Llave',
      'Tipo': 'Café molido',
      'Presentación': 'Paquete',
      'Intensidad': 'Fuerte',
      'Origen': 'Importado',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Café Sello Rojo
  {
    id: 2030,
    name: 'Café Sello Rojo',
    price: 6.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352609852-21affe6417b0f57681e35c693376e99d.jpeg',
    category: 'beverages',
    subcategory: 'coffee-tea',
    brand: 'Sello Rojo',
    rating: 4.7,
    reviews: 523,
    inStock: true,
    isNew: true,
    description: 'Café Sello Rojo, reconocida marca colombiana. Sabor suave y aromático, perfecto para disfrutar en cualquier momento del día.',
    specifications: {
      'Marca': 'Sello Rojo',
      'Tipo': 'Café molido',
      'Presentación': 'Paquete',
      'Intensidad': 'Media-Fuerte',
      'Origen': 'Colombia',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Café El Dorado
  {
    id: 2031,
    name: 'Café El Dorado',
    price: 6.5,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352631516-1b8474851ef3186231050dfd6020d10e.jpeg',
    category: 'beverages',
    subcategory: 'coffee-tea',
    brand: 'El Dorado',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    isNew: true,
    description: 'Café El Dorado de alta calidad. Sabor balanceado y aromático, ideal para los amantes del buen café.',
    specifications: {
      'Marca': 'El Dorado',
      'Tipo': 'Café molido',
      'Presentación': 'Paquete',
      'Intensidad': 'Media',
      'Origen': 'Importado',
      'Conservación': 'Lugar fresco y seco'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Caja de Jugo
  {
    id: 2032,
    name: 'Caja de Jugo',
    price: 15,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352658619-644a442d85b0ffbafffc172a82739862.jpeg',
    category: 'beverages',
    subcategory: 'natural-juices',
    brand: 'Genérico',
    rating: 4.5,
    reviews: 367,
    inStock: true,
    isNew: true,
    description: 'Caja de jugos variados. Refrescantes y naturales, perfectos para toda la familia. Múltiples sabores disponibles.',
    specifications: {
      'Contenido': 'Caja múltiple',
      'Tipo': 'Jugos',
      'Presentación': 'Caja',
      'Variedad': 'Sabores variados',
      'Conservación': 'Lugar fresco',
      'Uso': 'Bebida refrescante'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Picadillo
  {
    id: 2033,
    name: 'Picadillo',
    price: 3,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352710303-a17a969ce756b2da9dc23c606db61a77.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.4,
    reviews: 298,
    inStock: true,
    isNew: true,
    description: 'Picadillo preparado de calidad. Listo para calentar y servir. Perfecta opción para comidas rápidas y sabrosas.',
    specifications: {
      'Tipo': 'Picadillo preparado',
      'Estado': 'Congelado',
      'Presentación': 'Paquete',
      'Conservación': 'Mantener congelado',
      'Preparación': 'Calentar y servir',
      'Uso': 'Comida diaria'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Puré de Tomate
  {
    id: 2034,
    name: 'Puré de Tomate',
    price: 1.75,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759352742732-8bc61a04ebbcccdf74ef5afecbe0604a.jpeg',
    category: 'food',
    subcategory: 'combos',
    brand: 'Genérico',
    rating: 4.3,
    reviews: 212,
    inStock: true,
    isNew: true,
    description: 'Puré de tomate concentrado. Ingrediente esencial para salsas, guisos y múltiples preparaciones culinarias. Sabor intenso y natural.',
    specifications: {
      'Tipo': 'Puré de tomate',
      'Concentración': 'Concentrado',
      'Presentación': 'Lata o paquete',
      'Uso': 'Salsas, guisos, sopas',
      'Conservación': 'Lugar fresco y seco',
      'Origen': 'Importado'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // ZTE Blade A35
  {
    id: 2035,
    name: 'ZTE Blade A35 6GB RAM + 64GB',
    price: 75,
    image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759471731998-42cb20198252f9cc058aa93c539e294c.jpeg',
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'ZTE',
    rating: 4.2,
    reviews: 45,
    inStock: true,
    isNew: true,
    description: 'ZTE Blade A35 con 6GB de RAM y 64GB de almacenamiento interno. Smartphone con excelente rendimiento para el día a día, pantalla amplia y gran autonomía de batería.',
    specifications: {
      'RAM': '6GB',
      'Almacenamiento': '64GB',
      'Pantalla': '6.75 pulgadas',
      'Sistema operativo': 'Android',
      'Procesador': 'Octa-core',
      'Cámara trasera': '50MP + 2MP',
      'Cámara frontal': '8MP',
      'Batería': '5000mAh',
      'Conectividad': '4G LTE, WiFi, Bluetooth',
      'Garantía': '1 año'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Juego Buscaminas
  {
    id: 9001,
    name: 'Buscaminas Clásico',
    price: 0,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'games',
    subcategory: 'puzzle',
    brand: 'DTodo Games',
    rating: 4.8,
    reviews: 523,
    inStock: true,
    isNew: true,
    description: 'Juego clásico de Buscaminas. Desafía tu lógica y estrategia encontrando todas las minas sin detonarlas. Múltiples niveles de dificultad.',
    specifications: {
      'Tipo': 'Juego de lógica',
      'Niveles': 'Fácil, Medio, Difícil',
      'Jugadores': '1 jugador',
      'Precio': 'Gratis'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  },

  // Juego Dominó
  {
    id: 9002,
    name: 'Dominó Clásico',
    price: 0,
    image: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'games',
    subcategory: 'board',
    brand: 'DTodo Games',
    rating: 4.9,
    reviews: 687,
    inStock: true,
    isNew: true,
    description: 'Juego tradicional cubano de Dominó. Juega contra la computadora con fichas realistas y reglas clásicas. Perfecto para practicar tu estrategia.',
    specifications: {
      'Tipo': 'Juego de mesa',
      'Fichas': '28 fichas clásicas',
      'Jugadores': '1 vs Computadora',
      'Dificultad': 'Media',
      'Precio': 'Gratis'
    },
    availableLocations: {
      provinces: ['la-habana', 'artemisa', 'mayabeque', 'pinar-del-rio', 'villa-clara', 'matanzas', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila', 'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba', 'guantanamo', 'isla-de-la-juventud'],
      municipalities: ['all']
    }
  }
];