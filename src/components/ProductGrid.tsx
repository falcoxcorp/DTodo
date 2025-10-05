import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';
import Pagination from './Pagination';
import { Product } from '../types';
import { categories } from '../data/categories';
import { calculateRealCategoryCounts } from '../utils/categoryUtils';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onAddToCart, 
  selectedCategory = 'all', 
  searchQuery = '' 
}) => {
  // Debug: Encontrar productos sin subcategoría definida
  React.useEffect(() => {
    if (selectedCategory === 'electronics') {
      const electronicsProducts = products.filter(p => p.category === 'electronics');
      const definedSubcategories = ['smartphones', 'computadoras', 'laptop', 'tablets', 'accessories', 'wifi-equipment'];
      
      console.log('=== DEBUG PRODUCTOS ELECTRÓNICOS ===');
      console.log('Total productos electrónicos:', electronicsProducts.length);
      
      electronicsProducts.forEach(product => {
        console.log(`Producto: ${product.name} | Subcategoría: ${product.subcategory}`);
      });
      
      const missingProducts = electronicsProducts.filter(p => !definedSubcategories.includes(p.subcategory));
      console.log('Productos sin subcategoría definida:', missingProducts.length);
      missingProducts.forEach(product => {
        console.log(`PERDIDO: ${product.name} | Subcategoría: ${product.subcategory}`);
      });
      
      // Contar por subcategoría
      const subcategoryCounts = {};
      electronicsProducts.forEach(product => {
        subcategoryCounts[product.subcategory] = (subcategoryCounts[product.subcategory] || 0) + 1;
      });
      console.log('Conteo por subcategoría:', subcategoryCounts);
    }
  }, [products, selectedCategory]);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const itemsPerPage = 16;

  const filteredProducts = products.filter(product => {
    // Debug: log para ver qué está pasando
    if (selectedCategory === 'electronics' && selectedSubcategory === 'accesorios') {
      console.log('Product:', product.name, 'Category:', product.category, 'Subcategory:', product.subcategory);
    }
    
    const subcategoryMatch = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return subcategoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Calcular productos por categoría dinámicamente
  const getProductCountByCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      return products.length;
    }
    return products.filter(product => product.category === categoryId).length;
  };

  const currentCategoryCount = getProductCountByCategory(selectedCategory);
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubcategory, sortBy, priceRange, products]);


  // Función para obtener marcas según la categoría
  const getBrandsForCategory = (categoryId: string): string[] => {
    const brandsByCategory: Record<string, string[]> = {
      'electronics': ['Apple', 'Samsung', 'Google', 'Sony', 'Dell', 'HP', 'ASUS', 'Xiaomi', 'Huawei', 'OnePlus', 'LG'],
      'food': ['Nestlé', 'Coca-Cola', 'PepsiCo', 'Unilever', 'Kraft Heinz', 'Danone', 'Kelloggs', 'General Mills', 'Ferrero', 'Mondelez'],
      'appliances': ['LG', 'Samsung', 'Whirlpool', 'GE', 'Bosch', 'Electrolux', 'Frigidaire', 'KitchenAid', 'Maytag', 'Haier'],
      'energy': ['Tesla', 'SolarEdge', 'Enphase', 'Canadian Solar', 'JinkoSolar', 'Trina Solar', 'First Solar', 'SunPower', 'Fronius', 'Huawei'],
      'tools': ['DeWalt', 'Makita', 'Bosch', 'Milwaukee', 'Ryobi', 'Black+Decker', 'Stanley', 'Craftsman', 'Ridgid', 'Porter-Cable'],
      'beauty': ['L\'Oréal', 'Unilever', 'P&G', 'Estée Lauder', 'Shiseido', 'LVMH', 'Coty', 'Revlon', 'Maybelline', 'MAC'],
      'clothing': ['Nike', 'Adidas', 'H&M', 'Zara', 'Uniqlo', 'Gap', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren'],
      'beverages': ['Coca-Cola', 'PepsiCo', 'Nestlé', 'Red Bull', 'Monster', 'Dr Pepper', 'Sprite', 'Fanta', 'Pepsi', 'Mountain Dew'],
      'pets': ['Purina', 'Mars Petcare', 'Hill\'s', 'Royal Canin', 'Blue Buffalo', 'IAMS', 'Pedigree', 'Whiskas', 'Friskies', 'Eukanuba'],
      'office': ['HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Dell', 'Lenovo', 'Microsoft', 'Logitech', 'Staples'],
      'transport': ['Toyota', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Honda', 'Nissan', 'Volkswagen', 'Hyundai', 'Kia'],
      'mobile': ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Sony', 'Motorola', 'Nokia', 'Oppo'],
      'currency': ['Bitcoin', 'Ethereum', 'Binance', 'Coinbase', 'Kraken', 'PayPal', 'Western Union', 'MoneyGram', 'Wise', 'Remitly'],
      'games': ['Sony', 'Microsoft', 'Nintendo', 'Steam', 'Epic Games', 'Activision', 'EA', 'Ubisoft', 'Rockstar', 'Blizzard'],
      'others': ['Amazon', 'eBay', 'Alibaba', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Costco', 'IKEA', 'Wayfair'],
      'news': ['CNN', 'BBC', 'Reuters', 'AP', 'Bloomberg', 'Forbes', 'Wall Street Journal', 'New York Times', 'Guardian', 'El País']
    };

    return brandsByCategory[categoryId] || brandsByCategory['electronics'];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catálogo Completo de Productos</h1>
          <p className="text-gray-600 mt-1">
            Mostrando {filteredProducts.length} de {currentCategoryCount} productos
            {searchQuery && <span> para "{searchQuery}"</span>}
            {selectedCategory !== 'all' && selectedCategoryData && (
              <span> en categoría {selectedCategoryData.name}</span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
            <option value="newest">Más nuevos</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 xl:w-72 space-y-4 lg:space-y-6 ${showFilters ? 'mb-6 lg:mb-0' : ''}`}>
          {/* Subcategories */}
          {selectedCategoryData && (
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Subcategorías</h3>
              <div className="space-y-1.5 lg:space-y-2 max-h-40 lg:max-h-48 overflow-y-auto">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="subcategory"
                    value="all"
                    checked={selectedSubcategory === 'all'}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="mr-2 lg:mr-3 text-blue-600"
                  />
                  <span className="text-sm lg:text-base">Todas las subcategorías</span>
                </label>
                {selectedCategoryData.subcategories.map((subcategory) => (
                  <label key={subcategory.id} className="flex items-center">
                    <input
                      type="radio"
                      name="subcategory"
                      value={subcategory.id}
                      checked={selectedSubcategory === subcategory.id}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="mr-2 lg:mr-3 text-blue-600"
                    />
                    <span className="text-sm lg:text-base">{subcategory.name} ({subcategory.count})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Rango de Precio</h3>
            <div className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-xs lg:text-sm text-gray-600 mb-1">Mínimo</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-2 py-1.5 lg:px-3 lg:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs lg:text-sm text-gray-600 mb-1">Máximo</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-2 py-1.5 lg:px-3 lg:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="20000"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Marcas</h3>
            <div className="space-y-1.5 lg:space-y-2 max-h-40 lg:max-h-48 overflow-y-auto">
              {getBrandsForCategory(selectedCategory).map((brand) => (
                <label key={brand} className="flex items-center">
                  <input type="checkbox" className="mr-2 lg:mr-3 text-blue-600" />
                  <span className="text-sm lg:text-base">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 lg:py-12">
              <p className="text-gray-500 text-base lg:text-lg">No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>

              <ProductQuickView
                product={quickViewProduct}
                isOpen={quickViewProduct !== null}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={onAddToCart}
              />
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;