import React, { useState, useEffect } from 'react';
import { Tag, Flame } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

interface WeeklyDealsProps {
  onProductClick: (product: Product) => void;
}

const WeeklyDeals: React.FC<WeeklyDealsProps> = ({ onProductClick }) => {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeeklyDeals();
  }, []);

  const loadWeeklyDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_weekly_deal', true)
        .eq('is_active', true)
        .gt('stock', 0)
        .order('discount_percentage', { ascending: false })
        .limit(8);

      if (error) throw error;

      if (data && data.length >= 8) {
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
          },
          discount_percentage: p.discount_percentage || 0
        }));
        setDeals(formattedProducts);
      } else {
        const { data: allProducts, error: allError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .gt('stock', 0);

        if (allError) throw allError;

        if (allProducts && allProducts.length > 0) {
          const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, Math.min(8, allProducts.length));

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
            },
            discount_percentage: p.discount_percentage || 0
          }));
          setDeals(formattedProducts);
        }
      }
    } catch (error) {
      console.error('Error loading weekly deals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
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

  if (deals.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900">
              Ofertas de la Semana
            </h2>
            <Tag className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aprovecha estos descuentos especiales disponibles por tiempo limitado
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            <Flame className="w-5 h-5" />
            <span>Ofertas válidas esta semana</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <div key={product.id} className="relative">
              {product.discount_percentage > 0 && (
                <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  -{product.discount_percentage}%
                </div>
              )}
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeals;
