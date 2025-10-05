import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden h-full flex flex-col w-full max-w-sm mx-auto">
      {/* Image container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 xs:h-36 sm:h-40 lg:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-[9px] xs:text-[10px] sm:text-xs font-bold px-1 xs:px-1.5 py-0.5 rounded">
              NUEVO
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-[9px] xs:text-[10px] sm:text-xs font-bold px-1 xs:px-1.5 py-0.5 rounded">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full shadow-md transition-all duration-300 ${
            isProductFavorite 
              ? 'bg-red-50 hover:bg-red-100 opacity-100' 
              : 'bg-white hover:bg-gray-50 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-colors ${
            isProductFavorite 
              ? 'text-red-500 fill-current' 
              : 'text-gray-600 hover:text-red-500'
          }`} />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="bg-white text-gray-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-xs sm:text-sm hover:bg-gray-50 hover:shadow-lg"
          >
            Vista rápida
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 xs:p-2.5 sm:p-3 flex-1 flex flex-col">
        {/* Brand */}
        <p className="text-[10px] xs:text-xs text-gray-500 mb-1">{product.brand}</p>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-1 xs:mb-1.5 line-clamp-2 hover:text-blue-600 cursor-pointer text-xs xs:text-sm flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 xs:gap-1.5 mb-1.5 xs:mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 xs:w-3 xs:h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] xs:text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-1.5 xs:mb-2">
          <div className="flex items-center gap-1 xs:gap-2 mb-1">
            <span className="text-sm xs:text-base sm:text-lg font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] xs:text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between mb-1.5 xs:mb-2">
          <span className={`text-[10px] xs:text-xs font-medium ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.inStock ? '✓ En stock' : '✗ Agotado'}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-blue-600 text-white py-1.5 xs:py-2 px-2 xs:px-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 xs:gap-1.5 text-xs xs:text-sm mt-auto"
        >
          <ShoppingCart className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
          {product.inStock ? 'Agregar al carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;