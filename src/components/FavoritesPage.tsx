import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductQuickView from './ProductQuickView';
import { Product } from '../types';

interface FavoritesPageProps {
  onAddToCart: (product: Product) => void;
  onGoBack?: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onAddToCart, onGoBack }) => {
  const { favorites, removeFromFavorites, favoritesCount } = useFavorites();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        )}
        <div className="text-center py-16">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No tienes productos favoritos
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Explora nuestros productos y haz clic en el corazón ♥ para agregar tus favoritos aquí.
          </p>
          <button 
            onClick={onGoBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            Mis Favoritos
          </h1>
          <p className="text-gray-600 mt-2">
            Tienes {favoritesCount} producto{favoritesCount !== 1 ? 's' : ''} en tu lista de favoritos
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden">
            {/* Image container */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NUEVO
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Remove from favorites button */}
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-2 right-2 p-2 bg-red-50 text-red-500 rounded-full shadow-md hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Brand */}
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? '✓ En stock' : '✗ Agotado'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Agregar' : 'Agotado'}
                </button>

                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="p-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  title="Vista rápida"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="p-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  title="Eliminar de favoritos"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default FavoritesPage;