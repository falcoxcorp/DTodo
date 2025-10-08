import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

interface RecentProductsProps {
  onProductClick: (product: Product) => void;
}

const RecentProducts: React.FC<RecentProductsProps> = ({ onProductClick }) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    loadRecentProducts();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setItemsPerView(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2);
    } else {
      setItemsPerView(4);
    }
  };

  const loadRecentProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .gt('stock', 0)
        .order('created_at', { ascending: false })
        .limit(15);

      if (error) throw error;

      if (data && data.length >= 10) {
        const formattedProducts = data.map(p => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.base_price) || 0,
          originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
          image: p.image_url,
          rating: p.rating || 4.5,
          reviews: p.reviews_count || 0,
          category: p.category_id || 'electronics',
          subcategory: p.subcategory_id || 'otros',
          brand: p.brand || '',
          description: p.description || '',
          specifications: {},
          inStock: p.stock > 0,
          availableLocations: {
            provinces: ['all'],
            municipalities: ['all']
          }
        }));
        setRecentProducts(formattedProducts);
      } else {
        const { data: allProducts, error: allError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .gt('stock', 0);

        if (allError) throw allError;

        if (allProducts && allProducts.length > 0) {
          const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, Math.min(15, allProducts.length));

          const formattedProducts = selected.map(p => ({
            id: p.id,
            name: p.name,
            price: parseFloat(p.base_price) || 0,
            originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
            image: p.image_url,
            rating: p.rating || 4.5,
            reviews: p.reviews_count || 0,
            category: p.category_id || 'electronics',
            subcategory: p.subcategory_id || 'otros',
            brand: p.brand || '',
            description: p.description || '',
            specifications: {},
            inStock: p.stock > 0,
            availableLocations: {
              provinces: ['all'],
              municipalities: ['all']
            }
          }));
          setRecentProducts(formattedProducts);
        }
      }
    } catch (error) {
      console.error('Error loading recent products:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex < recentProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900">
              Recién Llegados
            </h2>
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre los últimos productos agregados a nuestra tienda
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Nuevos productos cada semana</span>
          </div>
        </div>

        <div className="relative">
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => onProductClick(product)}
                  />
                </div>
              ))}
            </div>
          </div>

          {currentIndex < recentProducts.length - itemsPerView && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(recentProducts.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
