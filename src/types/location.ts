export interface Municipality {
  id: string;
  name: string;
  code: string;
}

export interface Province {
  id: string;
  name: string;
  code: string;
  region: string;
  municipalities: Municipality[];
}

export interface LocationContextType {
  selectedProvince: Province | null;
  selectedMunicipality: Municipality | null;
  setSelectedProvince: (province: Province | null) => void;
  setSelectedMunicipality: (municipality: Municipality | null) => void;
  provinces: Province[];
  isLocationSelected: boolean;
}