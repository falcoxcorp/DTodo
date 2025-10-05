import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Eye, AlertCircle } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

interface WeatherWidgetProps {
  city: string;
  province: string;
  compact?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, province, compact = false }) => {
  const weather = useWeather(city, province);

  if (weather.isLoading) {
    return (
      <div className="flex items-center gap-2 text-white/80">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span className="text-xs">Cargando clima...</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-white">
        <span className="text-lg">{weather.icon}</span>
        <div className="flex items-center gap-1">
          <Thermometer className="w-3 h-3" />
          <span className="text-sm font-medium">{weather.temperature}°C</span>
        </div>
        <span className="text-xs text-white/80 capitalize">
          {weather.description} {weather.timeOfDay && `• ${weather.timeOfDay}`}
        </span>
        {weather.error && (
          <AlertCircle className="w-3 h-3 text-yellow-300" title={weather.error} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white min-w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{city}</h3>
          <p className="text-xs text-white/80">
            {province}, Cuba • {weather.localTime}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl">{weather.icon}</div>
          <div className="text-xs text-white/80 mt-1">
            {weather.isDay ? '☀️ Día' : '🌙 Noche'}
          </div>
          {weather.error && (
            <AlertCircle className="w-4 h-4 text-yellow-300 mx-auto mt-1" title={weather.error} />
          )}
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-2xl font-bold">{weather.temperature}°C</div>
          <div className="text-xs text-white/80">
            Sensación: {weather.feelsLike}°C
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm capitalize font-medium">
            {weather.description}
          </div>
          <div className="text-xs text-white/80 capitalize">
            {weather.timeOfDay}
          </div>
        </div>
      </div>

      {/* Weather details */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Droplets className="w-3 h-3 text-blue-300" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3 h-3 text-gray-300" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3 text-green-300" />
          <span>Buena</span>
        </div>
      </div>

      {/* Status indicator */}
      {weather.error && (
        <div className="mt-2 text-xs text-yellow-200 text-center">
          {weather.error}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;