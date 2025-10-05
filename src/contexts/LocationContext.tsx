import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Province, Municipality, LocationContextType } from '../types/location';
import { provinces } from '../data/provinces';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dtodo-selected-province');
      if (saved) {
        const provinceData = JSON.parse(saved);
        return provinces.find(p => p.id === provinceData.id) || null;
      }
    }
    return null;
  });
  
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dtodo-selected-municipality');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return null;
  });

  // Efecto para guardar provincia en localStorage
  useEffect(() => {
    if (selectedProvince) {
      localStorage.setItem('dtodo-selected-province', JSON.stringify({
        id: selectedProvince.id,
        name: selectedProvince.name,
        code: selectedProvince.code,
        region: selectedProvince.region
      }));
    } else {
      localStorage.removeItem('dtodo-selected-province');
    }
  }, [selectedProvince]);

  // Efecto para guardar municipio en localStorage
  useEffect(() => {
    if (selectedMunicipality) {
      localStorage.setItem('dtodo-selected-municipality', JSON.stringify(selectedMunicipality));
    } else {
      localStorage.removeItem('dtodo-selected-municipality');
    }
  }, [selectedMunicipality]);

  const handleSetSelectedProvince = (province: Province | null) => {
    setSelectedProvince(province);
    setSelectedMunicipality(null); // Reset municipality when province changes
    if (!province) {
      localStorage.removeItem('dtodo-selected-municipality');
    }
  };

  const isLocationSelected = selectedProvince !== null && selectedMunicipality !== null;

  return (
    <LocationContext.Provider
      value={{
        selectedProvince,
        selectedMunicipality,
        setSelectedProvince: handleSetSelectedProvince,
        setSelectedMunicipality,
        provinces,
        isLocationSelected,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};