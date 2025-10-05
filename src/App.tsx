import React, { useState, useEffect } from 'react';
import { LocationProvider, useLocation } from './contexts/LocationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import SSLRedirect from './components/SSLRedirect';
import { DatabaseSeeder } from './components/DatabaseSeeder';
import Header from './components/Header';
import AnimatedBrandsBar from './components/AnimatedBrandsBar';
import Hero from './components/Hero';
import LocationSelector from './components/LocationSelector';
import ProductGrid from './components/ProductGrid';
import CategoryGrid from './components/CategoryGrid';
import BestSellers from './components/BestSellers';
import Cart from './components/Cart';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import OrdersPage from './components/OrdersPage';
import SettingsPage from './components/SettingsPage';
import FavoritesPage from './components/FavoritesPage';
import AdminPanel from './components/AdminPanel';
import AboutPage from './components/AboutPage';
import AIChatbot from './components/AIChatbot';
import { products as staticProducts } from './data/products';
import { Product, CartItem } from './types';
import { supabase } from './lib/supabase';

const AppContent: React.FC = () => {
  const { isLocationSelected, selectedProvince, selectedMunicipality } = useLocation();
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'category' | 'favorites' | 'profile' | 'orders' | 'settings' | 'admin' | 'about'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadProducts = async () => {
      if (!selectedProvince) {
        setDbProducts([]);
        return;
      }

      try {
        const { data: regionData } = await supabase
          .from('regions')
          .select('id')
          .eq('name', selectedProvince.name)
          .maybeSingle();

        if (!regionData) {
          setDbProducts([]);
          return;
        }

        const { data: regionalProducts, error } = await supabase
          .from('products')
          .select(`
            *,
            regional_pricing!inner(price, is_available)
          `)
          .eq('is_active', true)
          .eq('regional_pricing.region_id', regionData.id)
          .eq('regional_pricing.is_available', true);

        if (error) throw error;

        const transformedProducts: Product[] = (regionalProducts || []).map((p: any) => ({
          id: parseInt(p.id) || Math.random() * 1000000,
          name: p.name,
          price: parseFloat(p.regional_pricing[0]?.price || p.base_price),
          image: p.image_url,
          category: p.category_id || 'others',
          subcategory: p.subcategory_id || 'otros',
          brand: p.brand,
          rating: 4.5,
          reviews: 0,
          inStock: p.stock > 0,
          isNew: false,
          description: p.description || '',
          specifications: {},
        }));

        setDbProducts(transformedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setDbProducts([]);
      }
    };

    loadProducts();
  }, [selectedProvince]);

  // Configurar meta tags dinámicamente
  React.useEffect(() => {
    // Actualizar título dinámicamente
    document.title = 'DTodo Cuba - Tienda Online #1 | Electrónicos, Electrodomésticos | Envío GRATIS 🇨🇺';
    
    // Agregar structured data para SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": ["Store", "OnlineStore", "LocalBusiness", "Organization"],
      "name": "DTodo Cuba",
      "alternateName": ["DTodo", "D Todo Cuba", "DTodo Tienda", "DTodo Store", "DTodo Shop", "DTodo Marketplace", "DTodo E-commerce"],
      "description": "Tienda online líder en Cuba especializada en electrónicos, electrodomésticos, smartphones iPhone Samsung, tablets, smart TV, aires acondicionados, refrigeradoras, lavadoras, microondas, ventiladores, tecnología y gadgets con envío gratis a toda la isla cubana incluyendo La Habana, Santiago de Cuba, Villa Clara, Matanzas, Pinar del Río, Holguín, Camagüey, Cienfuegos, Sancti Spíritus, Ciego de Ávila, Las Tunas, Granma, Guantánamo, Artemisa, Mayabeque e Isla de la Juventud",
      "url": "https://electro-website-comp-tqmq.bolt.host/",
      "logo": "https://photos.pinksale.finance/file/pinksale-logo-upload/1759091716456-b53fc732716f623a355c8668ce01be14.png",
      "image": [
        "https://photos.pinksale.finance/file/pinksale-logo-upload/1759091716456-b53fc732716f623a355c8668ce01be14.png"
      ],
      "slogan": "La manera más fácil y rápida de conseguir lo que buscas en Cuba",
      "foundingDate": "2024",
      "founder": {
        "@type": "Organization",
        "name": "DTodo Cuba"
      },
      "numberOfEmployees": "10-50",
      "knowsAbout": [
        "Electrónicos Cuba", "Electrodomésticos Cuba", "Smartphones Cuba", "iPhone Cuba", "Samsung Cuba", 
        "Smart TV Cuba", "Aires Acondicionados Cuba", "Refrigeradoras Cuba", "Lavadoras Cuba", 
        "Microondas Cuba", "Ventiladores Cuba", "Tablets Cuba", "Laptops Cuba", "Computadoras Cuba",
        "Tecnología Cuba", "Gadgets Cuba", "Móviles Cuba", "Celulares Cuba", "E-commerce Cuba",
        "Tienda Online Cuba", "Compras Online Cuba", "Delivery Cuba", "Envío Cuba", "Shopping Cuba"
      ],
      "serviceArea": {
        "@type": "Country",
        "name": "Cuba",
        "alternateName": ["República de Cuba", "CU", "Isla de Cuba"]
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "La Habana",
          "alternateName": ["Habana", "Capital", "Ciudad de La Habana"]
        },
        {
          "@type": "State", 
          "name": "Santiago de Cuba",
          "alternateName": ["Santiago", "Oriente"]
        },
        {
          "@type": "State",
          "name": "Villa Clara",
          "alternateName": ["Santa Clara", "Centro"]
        },
        {
          "@type": "State",
          "name": "Matanzas",
          "alternateName": ["Varadero", "Cárdenas"]
        },
        {
          "@type": "State",
          "name": "Pinar del Río",
          "alternateName": ["Viñales", "Occidente"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CU",
        "addressLocality": "Cuba",
        "addressRegion": "Florida",
        "postalCode": "33012"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.8576",
        "longitude": "-80.3014"
      },
      "telephone": "+1 (786) 475-8945",
      "email": "tiendadtodoinfo@gmail.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-786-836-8043",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": "CU"
        },
        {
          "@type": "ContactPoint",
          "email": "tiendadtodoinfo@gmail.com",
          "contactType": "sales",
          "availableLanguage": "Spanish"
        }
      ],
      "currenciesAccepted": ["USD", "CUP", "Dólar Americano", "Peso Cubano"],
      "paymentAccepted": [
        "Cash", "Credit Card", "Debit Card", "Bank Transfer", "Wire Transfer",
        "Efectivo", "Tarjeta de Crédito", "Tarjeta de Débito", "Transferencia Bancaria"
      ],
      "priceRange": "$1-$2000",
      "openingHours": ["Mo-Su 00:00-23:59"],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo Completo DTodo Cuba",
        "description": "Amplio catálogo de productos electrónicos, electrodomésticos y tecnología",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Electrónicos y Tecnología",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Smartphones iPhone Samsung",
                  "category": "Móviles y Celulares",
                  "description": "iPhone 17, iPhone 16, Samsung Galaxy, smartphones Android, móviles inteligentes"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Tablets y iPads",
                  "category": "Tablets",
                  "description": "iPad, tablets Android, tabletas digitales"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product", 
                  "name": "Laptops y Computadoras",
                  "category": "Computación",
                  "description": "Laptops, notebooks, computadoras portátiles, PCs"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Electrodomésticos y Hogar",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Smart TV y Televisores",
                  "category": "Televisión",
                  "description": "Smart TV, televisores inteligentes, TV LED, TV OLED, Android TV"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Aires Acondicionados",
                  "category": "Climatización",
                  "description": "Aires acondicionados, AC, climatizadores, refrigeración"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Electrodomésticos Cocina",
                  "category": "Cocina",
                  "description": "Refrigeradoras, microondas, lavadoras, cocinas, hornos"
                }
              }
            ]
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Envío Gratis Cuba",
          "description": "Envío gratuito a toda Cuba en compras superiores a $500 CUP"
        },
        {
          "@type": "Offer", 
          "name": "Garantía Total",
          "description": "Garantía completa en todos los productos"
        },
        {
          "@type": "Offer",
          "name": "Entrega Rápida",
          "description": "Entrega en 24-48 horas en principales ciudades"
        }
      ],
      "brand": {
        "@type": "Brand",
        "name": "DTodo Cuba",
        "logo": "https://photos.pinksale.finance/file/pinksale-logo-upload/1759091716456-b53fc732716f623a355c8668ce01be14.png"
      },
      "sameAs": [
        "https://www.facebook.com/DTodoCuba",
        "https://www.instagram.com/DTodoCuba", 
        "https://twitter.com/DTodoCuba",
        "https://www.youtube.com/DTodoCuba",
        "https://t.me/DTodoCuba",
        "https://wa.me/17868368043"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "María González"
          },
          "reviewBody": "Excelente tienda online, productos de calidad y envío rápido a La Habana"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating", 
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Carlos Rodríguez"
          },
          "reviewBody": "Compré un iPhone y llegó perfecto a Santiago de Cuba, muy recomendado"
        }
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const handleSearch = (query: string, categoryId: string) => {
    setSearchQuery(query);
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleViewChange = (view: 'home' | 'products' | 'category' | 'favorites' | 'profile' | 'orders' | 'settings' | 'admin' | 'about') => {
    setCurrentView(view);
  };

  const allProducts = [...staticProducts, ...dbProducts];

  const filteredProducts = allProducts.filter(product => {
    if (selectedProvince && selectedMunicipality && product.availableLocations) {
      const provinceMatch = product.availableLocations.provinces.includes(selectedProvince.id);
      const municipalityMatch = product.availableLocations.municipalities.includes('all') ||
                               product.availableLocations.municipalities.includes(selectedMunicipality.id);

      if (!provinceMatch || !municipalityMatch) {
        return false;
      }
    }

    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (currentView === 'admin') {
    return <AdminPanel onClose={() => setCurrentView('home')} />;
  }

  if (currentView === 'about') {
    return <AboutPage onGoBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        onGoHome={handleGoHome}
        onViewChange={handleViewChange}
      />

      <AnimatedBrandsBar />

      {!isLocationSelected ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                ¡Bienvenido a DTodo!
              </h1>
              <p className="text-lg text-gray-600">
                Para comenzar, selecciona tu ubicación en Cuba
              </p>
            </div>
            <LocationSelector />
          </div>
        </div>
      ) : (
        <>
          <Hero />
          {currentView === 'home' && (
            <>
              <CategoryGrid onCategorySelect={handleCategorySelect} products={allProducts} />
              <BestSellers onAddToCart={handleAddToCart} />
            </>
          )}
          {currentView === 'products' && (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          )}
          {currentView === 'favorites' && (
            <FavoritesPage
              onAddToCart={handleAddToCart}
              onGoBack={() => setCurrentView('home')}
            />
          )}
          {currentView === 'profile' && (
            <UserProfile />
          )}
          {currentView === 'orders' && (
            <OrdersPage />
          )}
          {currentView === 'settings' && (
            <SettingsPage />
          )}
        </>
      )}

      <Footer onNavigate={handleViewChange} />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <AIChatbot />

      <DatabaseSeeder />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <FavoritesProvider>
          <SSLRedirect />
          <AppContent />
        </FavoritesProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;