import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { categories } from '../data/categories';

interface AdvancedSearchProps {
  onSearch: (query: string, categoryId: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const { selectedProvince, selectedMunicipality, provinces, setSelectedProvince, setSelectedMunicipality } = useLocation();

  const handleSearch = () => {
    onSearch(searchQuery, selectedCategory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-2">
          {/* Category Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center justify-between w-full lg:w-48 px-4 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-l-lg lg:rounded-lg hover:bg-yellow-500 transition-colors"
            >
              <span className="truncate">
                {selectedCategoryData ? `${selectedCategoryData.icon} ${selectedCategoryData.name}` : 'Categorías'}
              </span>
              <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                      selectedCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center justify-between w-full lg:w-56 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {selectedProvince && selectedMunicipality 
                    ? `${selectedMunicipality.name}, ${selectedProvince.name}`
                    : 'Seleccionar ubicación'
                  }
                </span>
              </div>
              <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
            </button>
            
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Province Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Provincia
                      </label>
                      <select
                        value={selectedProvince?.id || ''}
                        onChange={(e) => {
                          const province = provinces.find(p => p.id === e.target.value);
                          setSelectedProvince(province || null);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Selecciona provincia</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Municipality Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Municipio
                      </label>
                      <select
                        value={selectedMunicipality?.id || ''}
                        onChange={(e) => {
                          const municipality = selectedProvince?.municipalities.find(m => m.id === e.target.value);
                          setSelectedMunicipality(municipality || null);
                        }}
                        disabled={!selectedProvince}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                      >
                        <option value="">
                          {selectedProvince ? 'Selecciona municipio' : 'Primero selecciona provincia'}
                        </option>
                        {selectedProvince?.municipalities.map((municipality) => (
                          <option key={municipality.id} value={municipality.id}>
                            {municipality.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => setShowLocationDropdown(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar en la tienda..."
              className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg lg:rounded-none lg:rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;