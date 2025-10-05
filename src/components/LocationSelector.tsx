import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

const LocationSelector: React.FC = () => {
  const {
    selectedProvince,
    selectedMunicipality,
    setSelectedProvince,
    setSelectedMunicipality,
    provinces,
  } = useLocation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Selecciona tu ubicación</h2>
      </div>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Para mostrarte los productos disponibles en tu provincia, necesitamos conocer tu ubicación en Cuba.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Province Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provincia
          </label>
          <div className="relative">
            <select
              value={selectedProvince?.id || ''}
              onChange={(e) => {
                const province = provinces.find(p => p.id === e.target.value);
                setSelectedProvince(province || null);
              }}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
            >
              <option value="">Selecciona una provincia</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Municipality Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Municipio
          </label>
          <div className="relative">
            <select
              value={selectedMunicipality?.id || ''}
              onChange={(e) => {
                const municipality = selectedProvince?.municipalities.find(m => m.id === e.target.value);
                setSelectedMunicipality(municipality || null);
              }}
              disabled={!selectedProvince}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <option value="">
                {selectedProvince ? 'Selecciona un municipio' : 'Primero selecciona una provincia'}
              </option>
              {selectedProvince?.municipalities.map((municipality) => (
                <option key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {selectedProvince && selectedMunicipality && (
        <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium text-sm sm:text-base">
              Ubicación seleccionada: {selectedMunicipality.name}, {selectedProvince.name}, Cuba
            </span>
          </div>
          <p className="text-green-700 text-xs sm:text-sm mt-2">
            ✅ Tu ubicación se ha guardado. Puedes cambiarla desde el buscador cuando quieras.
          </p>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium">
              <span>🎉</span>
              <span>¡Listo para explorar productos en tu zona!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;