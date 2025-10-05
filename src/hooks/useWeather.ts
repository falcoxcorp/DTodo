import { useState, useEffect } from 'react';
import { envConfig } from '../config/env';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  isDay: boolean;
  timeOfDay: string;
  localTime: string;
  isLoading: boolean;
  error: string | null;
}

export const useWeather = (city: string, province: string): WeatherData => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    description: '',
    icon: '',
    humidity: 0,
    windSpeed: 0,
    feelsLike: 0,
    isDay: true,
    timeOfDay: '',
    localTime: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city || !province) {
        setWeatherData(prev => ({ ...prev, isLoading: false, error: 'Ubicación no disponible' }));
        return;
      }

      setWeatherData(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Lista de APIs gratuitas del clima como fallback
        const weatherAPIs = [
          {
            name: 'OpenWeatherMap',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${province},CU&appid=${envConfig.openWeatherApiKey || 'demo'}&units=metric&lang=es`,
            parser: (data: any) => {
              const cubanTime = getCubanTime();
              const isDayTime = cubanTime.isDay;
              return {
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: getWeatherIcon(data.weather[0].main, isDayTime),
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
                feelsLike: Math.round(data.main.feels_like),
                isDay: isDayTime,
                timeOfDay: cubanTime.timeOfDay,
                localTime: cubanTime.localTime,
              };
            }
          },
          {
            name: 'WeatherAPI',
            url: `https://api.weatherapi.com/v1/current.json?key=${envConfig.weatherApiKey || 'demo'}&q=${city},Cuba&lang=es`,
            parser: (data: any) => {
              const cubanTime = getCubanTime();
              const isDayTime = cubanTime.isDay;
              return {
                temperature: Math.round(data.current.temp_c),
                description: data.current.condition.text,
                icon: getWeatherIcon(data.current.condition.text, isDayTime),
                humidity: data.current.humidity,
                windSpeed: Math.round(data.current.wind_kph),
                feelsLike: Math.round(data.current.feelslike_c),
                isDay: isDayTime,
                timeOfDay: cubanTime.timeOfDay,
                localTime: cubanTime.localTime,
              };
            }
          }
        ];

        let weatherResult = null;
        let lastError = null;

        // Intentar cada API
        for (const api of weatherAPIs) {
          try {
            console.log(`🌤️ Intentando obtener clima de ${api.name} para ${city}, ${province}...`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(api.url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'DTodo-Weather/1.0',
              },
              mode: 'cors',
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            weatherResult = api.parser(data);
            
            console.log(`✅ Clima obtenido de ${api.name}:`, weatherResult);
            break; // Salir del bucle si fue exitoso
            
          } catch (err: any) {
            console.warn(`❌ Error con ${api.name}:`, err.message);
            lastError = err;
            continue;
          }
        }

        if (weatherResult) {
          setWeatherData({
            ...weatherResult,
            isLoading: false,
            error: null,
          });
        } else {
          // Si todas las APIs fallan, usar datos simulados basados en Cuba
          console.warn('⚠️ Todas las APIs fallaron, usando datos simulados para Cuba');
          const simulatedWeather = generateCubanWeather(city, province);
          setWeatherData({
            ...simulatedWeather,
            isLoading: false,
            error: 'APIs no disponibles - Datos estimados',
          });
        }
        
      } catch (error: any) {
        console.error('Error general obteniendo clima:', error);
      // Usar una tasa de fallback configurada
        setWeatherData({
          ...simulatedWeather,
          isLoading: false,
          error: 'Error de conexión - Datos estimados',
        });
      }
    };

    fetchWeather();
    
    // Actualizar cada 10 minutos
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [city, province]);

  return weatherData;
};

// Función para obtener la hora local de Cuba
const getCubanTime = () => {
  // Cuba está en UTC-5 (EST) todo el año (no usa horario de verano desde 2011)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cubanTime = new Date(utc + (-5 * 3600000)); // UTC-5
  
  const hour = cubanTime.getHours();
  const minutes = cubanTime.getMinutes();
  
  // Determinar si es día o noche (amanecer ~6:00, atardecer ~19:00 en Cuba)
  const isDay = hour >= 6 && hour < 19;
  
  let timeOfDay = '';
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'mañana';
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = 'tarde';
  } else if (hour >= 18 && hour < 22) {
    timeOfDay = 'noche';
  } else {
    timeOfDay = 'madrugada';
  }
  
  const localTime = cubanTime.toLocaleTimeString('es-CU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return { isDay, timeOfDay, localTime, hour };
};

// Función para generar datos del clima simulados para Cuba
const generateCubanWeather = (city: string, province: string) => {
  const cubanTime = getCubanTime();
  const isDayTime = cubanTime.isDay;
  
  const cubanCities = {
    'la-habana': { temp: 28, desc: 'soleado', humidity: 75 },
    'santiago-de-cuba': { temp: 30, desc: 'parcialmente nublado', humidity: 80 },
    'villa-clara': { temp: 27, desc: 'soleado', humidity: 70 },
    'matanzas': { temp: 29, desc: 'soleado', humidity: 78 },
    'pinar-del-rio': { temp: 26, desc: 'nublado', humidity: 82 },
    'holguin': { temp: 31, desc: 'soleado', humidity: 72 },
    'camaguey': { temp: 29, desc: 'parcialmente nublado', humidity: 74 },
    'cienfuegos': { temp: 28, desc: 'soleado', humidity: 76 },
    'sancti-spiritus': { temp: 27, desc: 'soleado', humidity: 73 },
    'ciego-de-avila': { temp: 28, desc: 'parcialmente nublado', humidity: 75 },
    'las-tunas': { temp: 30, desc: 'soleado', humidity: 71 },
    'granma': { temp: 31, desc: 'soleado', humidity: 77 },
    'guantanamo': { temp: 32, desc: 'soleado', humidity: 79 },
    'artemisa': { temp: 27, desc: 'soleado', humidity: 74 },
    'mayabeque': { temp: 28, desc: 'parcialmente nublado', humidity: 76 },
    'isla-de-la-juventud': { temp: 29, desc: 'soleado', humidity: 78 }
  };

  const provinceKey = province.toLowerCase().replace(/\s+/g, '-');
  const cityData = cubanCities[provinceKey as keyof typeof cubanCities] || cubanCities['la-habana'];
  
  // Agregar variación aleatoria
  const tempVariation = Math.random() * 4 - 2; // ±2°C
  const finalTemp = Math.round(cityData.temp + tempVariation);
  
  // Ajustar descripción según hora del día
  let description = cityData.desc;
  if (!isDayTime) {
    if (description.includes('soleado')) {
      description = 'despejado';
    }
  }
  
  return {
    temperature: finalTemp,
    description: description,
    icon: getWeatherIcon(description, isDayTime),
    humidity: cityData.humidity + Math.round(Math.random() * 10 - 5),
    windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
    feelsLike: finalTemp + Math.round(Math.random() * 4 - 2),
    isDay: isDayTime,
    timeOfDay: cubanTime.timeOfDay,
    localTime: cubanTime.localTime,
  };
};

// Función para obtener iconos del clima
const getWeatherIcon = (condition: string, isDay: boolean = true): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sol') || conditionLower.includes('clear') || conditionLower.includes('sunny') || conditionLower.includes('despejado')) {
    return isDay ? '☀️' : '🌙';
  } else if (conditionLower.includes('nub') || conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return isDay ? '☁️' : '☁️';
  } else if (conditionLower.includes('parcial') || conditionLower.includes('partly')) {
    return isDay ? '⛅' : '🌙';
  } else if (conditionLower.includes('lluv') || conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return '🌧️';
  } else if (conditionLower.includes('tormenta') || conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return '⛈️';
  } else if (conditionLower.includes('niebla') || conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return '🌫️';
  } else if (conditionLower.includes('viento') || conditionLower.includes('wind')) {
    return '💨';
  } else {
    return isDay ? '🌤️' : '🌙'; // Default
  }
};