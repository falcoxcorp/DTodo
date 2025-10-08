import React from 'react';
import { DollarSign } from 'lucide-react';

const ExchangeRateWidget: React.FC = () => {
  const handleClick = () => {
    window.open('https://eltoque.com/tasas-de-cambio-de-moneda-en-cuba-hoy', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-all text-white text-sm font-medium"
    >
      <DollarSign className="w-4 h-4" />
      <span>$ Tasa representativa del mercado informal en Cuba</span>
    </button>
  );
};

export default ExchangeRateWidget;