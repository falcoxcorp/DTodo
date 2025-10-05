import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, MapPin, ChevronDown, Search, Settings, Package, Heart, User as UserCircle, Shield } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/categories';
import { envConfig } from '../config/env';
import { AuthModal } from './AuthModal';
import ExchangeRateWidget from './ExchangeRateWidget';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string, categoryId: string) => void;
  onGoHome: () => void;
  onViewChange: (view: 'home' | 'products' | 'category' | 'favorites' | 'profile' | 'orders' | 'settings' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onCartClick,
  onSearch,
  onGoHome,
  onViewChange
}) => {
  const { user, isAdmin, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  
  const { selectedProvince, selectedMunicipality } = useLocation();
  const { provinces, setSelectedProvince, setSelectedMunicipality } = useLocation();
  const { favorites, favoritesCount, removeFromFavorites } = useFavorites();

  // Hook para cerrar menús al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Cerrar dropdown de categorías
      if (showCategoryDropdown && !target.closest('[data-dropdown="category"]')) {
        setShowCategoryDropdown(false);
      }
      
      // Cerrar dropdown de ubicación
      if (showLocationDropdown && !target.closest('[data-dropdown="location"]')) {
        setShowLocationDropdown(false);
      }
      
      // Cerrar dropdown de cuenta
      if (showAccountDropdown && !target.closest('[data-dropdown="account"]')) {
        setShowAccountDropdown(false);
      }
      
      // Cerrar dropdown de favoritos
      if (showFavoritesDropdown && !target.closest('[data-dropdown="favorites"]')) {
        setShowFavoritesDropdown(false);
      }
    };

    // Agregar event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showLocationDropdown, showAccountDropdown, showFavoritesDropdown]);
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
    <>
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span>📞 {envConfig.storePhone}</span>
              <span className="hidden sm:inline">✉️ {envConfig.storeEmail}</span>
            </div>
            <div className="hidden md:block">
              <ExchangeRateWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button onClick={onGoHome} className="focus:outline-none">
              <img 
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759091716456-b53fc732716f623a355c8668ce01be14.png" 
                alt="DTodo Logo" 
                className="h-12 sm:h-14 lg:h-16 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>
          </div>

          {/* Advanced Search Section */}
          <div className="flex-1 max-w-4xl mx-6 hidden lg:block">
            <div className="flex gap-2">
              {/* Category Selector */}
              <div className="relative" data-dropdown="category">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center justify-between w-48 px-4 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-l-lg hover:bg-yellow-500 transition-colors"
                >
                  <span className="truncate">
                    {selectedCategoryData ? `${selectedCategoryData.icon} ${selectedCategoryData.name}` : 'Categorías'}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
                </button>
                
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setShowCategoryDropdown(false);
                          onSearch(searchQuery, 'all');
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
                            onSearch(searchQuery, category.id);
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
              <div className="relative" data-dropdown="location">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center justify-between w-56 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-300"
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
                  <div className="absolute top-full left-0 w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
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
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Right side icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Favorites */}
            <div className="relative hidden sm:block" data-dropdown="favorites">
              <button
                onClick={() => setShowFavoritesDropdown(!showFavoritesDropdown)}
                className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favoritesCount > 0 ? 'text-red-500 fill-current' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              
              {showFavoritesDropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Mis Favoritos ({favoritesCount})</h3>
                      <button
                        onClick={() => {
                          onViewChange('favorites');
                          setShowFavoritesDropdown(false);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Ver todos
                      </button>
                    </div>
                  </div>
                  
                  {favorites.length === 0 ? (
                    <div className="p-6 text-center">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No tienes productos favoritos</p>
                      <p className="text-sm text-gray-400 mt-1">Haz clic en ♥ para agregar productos</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {favorites.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-sm text-blue-600 font-semibold">
                              ${product.price} USD
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromFavorites(product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      {favorites.length > 5 && (
                        <div className="p-3 text-center border-t border-gray-100">
                          <button 
                            onClick={() => {
                              onViewChange('favorites');
                              setShowFavoritesDropdown(false);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Ver todos los favoritos ({favorites.length})
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User account */}
            <div className="relative hidden sm:block" data-dropdown="account">
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm hidden md:inline">Cuenta</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              {showAccountDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user?.user_metadata?.full_name || 'Usuario'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user ? user.email : 'Inicia sesión para más opciones'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        onViewChange('profile');
                        setShowAccountDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <UserCircle className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Mi Perfil</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        onViewChange('orders');
                        setShowAccountDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Mis Pedidos</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        onViewChange('favorites');
                        setShowAccountDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Lista de Deseos</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        onViewChange('settings');
                        setShowAccountDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Configuración</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          onViewChange('admin');
                          setShowAccountDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors bg-blue-50 border border-blue-200"
                      >
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-700 font-medium">Panel Admin</span>
                      </button>
                    )}

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      {!user ? (
                        <>
                          <button
                            onClick={() => {
                              setAuthMode('signin');
                              setShowAuthModal(true);
                              setShowAccountDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <span className="text-blue-600 font-medium">Iniciar Sesión</span>
                          </button>

                          <button
                            onClick={() => {
                              setAuthMode('signup');
                              setShowAuthModal(true);
                              setShowAccountDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <span className="text-gray-700">Crear Cuenta</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            await signOut();
                            setShowAccountDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span className="text-red-600 font-medium">Cerrar Sesión</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-1 text-gray-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on smaller screens */}
        <div className="lg:hidden border-t border-gray-200 py-2 sm:py-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar en la tienda..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">📱 Electrónicos</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🍽️ Alimentos</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">📺 Electrodomésticos</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🔋 Energía</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🔧 Ferretería</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">💄 Belleza</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">👕 Ropa</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">☕ Bebidas</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🐕 Mascotas</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">📋 Oficina</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🚗 Transporte</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">💰 Divisas</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">🎮 Juegos</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">📦 Otros</a>
            <a href="#" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">📰 Noticias</a>
            <a href="#" className="block py-3 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium">🔥 Ofertas</a>
            <div className="border-t border-gray-200 pt-2">
              <a href="#" className="flex items-center gap-2 py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <User className="w-5 h-5" />
                Mi Cuenta
              </a>
            </div>
          </div>
        </div>
      )}
    </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;