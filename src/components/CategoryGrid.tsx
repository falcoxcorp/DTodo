import React from 'react';
import { calculateRealCategoryCounts } from '../utils/categoryUtils';
import { Product } from '../types';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  products?: Product[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect, products }) => {
  // Usar conteos reales calculados dinámicamente
  const categoriesWithRealCounts = calculateRealCategoryCounts(products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Explora Nuestras Categorías de Productos</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
          Descubre una amplia variedad de productos electrónicos, electrodomésticos, smartphones iPhone Samsung, smart TV, aires acondicionados, tablets, laptops y tecnología organizados por categorías para facilitar tu búsqueda y compra online en Cuba
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {categoriesWithRealCounts.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden relative transform hover:scale-105 ${
              category.count === 0 ? 'opacity-60' : ''
            }`}
          >
            <div className="p-3 sm:p-4 lg:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors text-xs sm:text-sm lg:text-base leading-tight">
                {category.name}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500">
                {category.count} producto{category.count !== 1 ? 's' : ''}
                {category.count === 0 && (
                  <span className="block text-[9px] sm:text-xs text-orange-500 mt-0.5 sm:mt-1">Próximamente</span>
                )}
              </p>
            </div>
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 transition-all duration-300 ${
              category.count > 0 
                ? 'bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5' 
                : 'bg-gray-400 bg-opacity-0 group-hover:bg-opacity-5'
            }`} />
            
            {/* Disabled overlay for empty categories */}
            {category.count === 0 && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Próximamente</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default CategoryGrid;