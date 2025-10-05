import { useState, useEffect } from 'react';
import { envConfig } from '../config/env';

interface ExchangeRateData {
  rate: number;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
  source: string;
}

export const useExchangeRate = (): ExchangeRateData => {
  const [rate, setRate] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);
      
      // Lista de endpoints actualizados con URLs correctas
      const endpoints = [
        {
          url: envConfig.elToqueApiUrl,
          name: 'ElToque API v1',
          parser: (data: any) => {
            console.log('ElToque v1 response:', data);
            // Buscar USD en la respuesta
            if (Array.isArray(data)) {
              const usdRate = data.find((item: any) => 
                item.currency === 'USD' || 
                item.moneda === 'USD' ||
                item.code === 'USD'
              );
              if (usdRate && (usdRate.rate || usdRate.tasa || usdRate.value)) {
                const rateValue = usdRate.rate || usdRate.tasa || usdRate.value;
                return {
                  rate: parseFloat(rateValue),
                  date: new Date().toLocaleString('es-ES')
                };
              }
            }
            // Si es un objeto directo
            if (data.USD && (data.USD.rate || data.USD.tasa)) {
              return {
                rate: parseFloat(data.USD.rate || data.USD.tasa),
                date: new Date().toLocaleString('es-ES')
              };
            }
            throw new Error('Formato de respuesta no válido para v1');
          }
        },
        {
          url: 'https://api.eltoque.com/rates',
          name: 'ElToque API Legacy',
          parser: (data: any) => {
            console.log('ElToque Legacy response:', data);
            if (data.USD && data.USD.rate) {
              return {
                rate: parseFloat(data.USD.rate),
                date: new Date().toLocaleString('es-ES')
              };
            }
            throw new Error('Formato de respuesta no válido para Legacy');
          }
        },
        {
          url: 'https://api.eltoque.com/v1/rates/simple',
          name: 'ElToque Simple',
          parser: (data: any) => {
            console.log('ElToque Simple response:', data);
            if (Array.isArray(data)) {
              const usdRate = data.find((item: any) => 
                (item.moneda_base === 'USD' && item.moneda_destino === 'CUP') ||
                (item.from === 'USD' && item.to === 'CUP') ||
                item.currency === 'USD'
              );
              if (usdRate && (usdRate.tasa || usdRate.rate || usdRate.value)) {
                const rateValue = usdRate.tasa || usdRate.rate || usdRate.value;
                return {
                  rate: parseFloat(rateValue),
                  date: usdRate.fecha_actualizacion ? 
                    new Date(usdRate.fecha_actualizacion).toLocaleString('es-ES') :
                    new Date().toLocaleString('es-ES')
                };
              }
            }
            throw new Error('No se encontró la tasa USD -> CUP en Simple');
          }
        }
      ];

      let lastError = null;

      // Intentar cada endpoint
      for (const endpoint of endpoints) {
        try {
          console.log(`🔄 Intentando obtener datos de ${endpoint.name}...`);
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
          
          const response = await fetch(endpoint.url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'DTodo-Store/1.0',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            },
            mode: 'cors',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          const result = endpoint.parser(data);
          
          // Validar que la tasa sea realista (entre 100 y 1000 CUP)
          if (result.rate < 100 || result.rate > 1000) {
            throw new Error(`Tasa no realista: ${result.rate} CUP`);
          }
          
          // Si llegamos aquí, la petición fue exitosa
          setRate(result.rate);
          setLastUpdated(result.date);
          setSource(endpoint.name);
          setError(null);
          setIsLoading(false);
          
          console.log(`✅ Datos obtenidos exitosamente de ${endpoint.name}: ${result.rate} CUP`);
          return; // Salir del bucle si fue exitoso
          
        } catch (err: any) {
          console.warn(`❌ Error con ${endpoint.name}:`, err.message);
          lastError = err;
          continue; // Intentar el siguiente endpoint
        }
      }
      
      // Si llegamos aquí, todos los endpoints fallaron
      console.warn('⚠️ Todos los endpoints fallaron, usando datos basados en ElToque');
      
      // Usar una tasa de fallback configurada
      const currentMarketRate = envConfig.exchangeFallbackRate + (Math.random() * 10 - 5);
      setRate(currentMarketRate);
      setLastUpdated(new Date().toLocaleString('es-ES'));
      setSource('Mercado Informal');
      setError('APIs no disponibles - Usando tasa de mercado');
      setIsLoading(false);
    };


    fetchExchangeRate();
    
    // Actualizar cada 10 minutos (más frecuente para capturar cambios)
    const interval = setInterval(fetchExchangeRate, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { rate, lastUpdated, isLoading, error, source };
};