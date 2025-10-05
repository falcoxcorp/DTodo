// ================================
// DTODO CUBA - CONFIGURACIÓN DE ENTORNO
// ================================

interface EnvConfig {
  // APIs del Clima
  openWeatherApiKey: string;
  weatherApiKey: string;
  
  // Tipo de Cambio
  elToqueApiUrl: string;
  exchangeFallbackRate: number;
  
  // Configuración de la Tienda
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  
  // SSL/Seguridad
  enableHttps: boolean;
  sslRedirect: boolean;
  
  // Email
  emailJsServiceId: string;
  emailJsTemplateId: string;
  emailJsPublicKey: string;
  
  // Pagos
  stripePublishableKey: string;
  stripeSecretKey: string;

  // Supabase
  supabaseUrl: string;
  supabaseAnonKey: string;
  
  // Mapas
  googleMapsApiKey: string;
  
  // Analytics
  googleAnalyticsId: string;
  facebookPixelId: string;
  
  // Producción
  apiBaseUrl: string;
  cdnUrl: string;
  environment: string;
}

// Función para obtener variables de entorno con valores por defecto
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
};

const getNumberEnvVar = (key: string, defaultValue: number = 0): number => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Configuración exportada
export const envConfig: EnvConfig = {
  // APIs del Clima
  openWeatherApiKey: getEnvVar('VITE_OPENWEATHER_API_KEY'),
  weatherApiKey: getEnvVar('VITE_WEATHERAPI_KEY'),
  
  // Tipo de Cambio
  elToqueApiUrl: getEnvVar('VITE_ELTOQUE_API_URL', 'https://api.eltoque.com/v1/rates'),
  exchangeFallbackRate: getNumberEnvVar('VITE_EXCHANGE_FALLBACK_RATE', 435),
  
  // Configuración de la Tienda
  storeName: getEnvVar('VITE_STORE_NAME', 'DTodo Cuba'),
  storeEmail: getEnvVar('VITE_STORE_EMAIL', 'tiendadtodoinfo@gmail.com'),
  storePhone: getEnvVar('VITE_STORE_PHONE', '+1 (786) 475-8945'),
  storeAddress: getEnvVar('VITE_STORE_ADDRESS', '3682 W 12th Ave, Hialeah, FL 33012'),
  
  // SSL/Seguridad
  enableHttps: getBooleanEnvVar('VITE_ENABLE_HTTPS', true),
  sslRedirect: getBooleanEnvVar('VITE_SSL_REDIRECT', true),
  
  // Email
  emailJsServiceId: getEnvVar('VITE_EMAILJS_SERVICE_ID'),
  emailJsTemplateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID'),
  emailJsPublicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY'),
  
  // Pagos
  stripePublishableKey: getEnvVar('VITE_STRIPE_PUBLISHABLE_KEY'),
  stripeSecretKey: getEnvVar('VITE_STRIPE_SECRET_KEY'),

  // Supabase
  supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  
  // Mapas
  googleMapsApiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
  
  // Analytics
  googleAnalyticsId: getEnvVar('VITE_GOOGLE_ANALYTICS_ID'),
  facebookPixelId: getEnvVar('VITE_FACEBOOK_PIXEL_ID'),
  
  // Producción
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'https://api.dtodocuba.com'),
  cdnUrl: getEnvVar('VITE_CDN_URL', 'https://cdn.dtodocuba.com'),
  environment: getEnvVar('VITE_ENVIRONMENT', 'development'),
};

// Validaciones de desarrollo
if (envConfig.environment === 'development') {
  console.log('🔧 DTodo Cuba - Configuración de Entorno:', {
    hasOpenWeatherKey: !!envConfig.openWeatherApiKey,
    hasWeatherApiKey: !!envConfig.weatherApiKey,
    hasStripeKey: !!envConfig.stripePublishableKey,
    hasGoogleMapsKey: !!envConfig.googleMapsApiKey,
    httpsEnabled: envConfig.enableHttps,
    environment: envConfig.environment
  });
}

// Función para verificar si las APIs están configuradas
export const isApiConfigured = {
  weather: (): boolean => !!(envConfig.openWeatherApiKey || envConfig.weatherApiKey),
  payments: (): boolean => !!envConfig.stripePublishableKey,
  maps: (): boolean => !!envConfig.googleMapsApiKey,
  email: (): boolean => !!(envConfig.emailJsServiceId && envConfig.emailJsTemplateId && envConfig.emailJsPublicKey),
  analytics: (): boolean => !!(envConfig.googleAnalyticsId || envConfig.facebookPixelId),
  supabase: (): boolean => !!(envConfig.supabaseUrl && envConfig.supabaseAnonKey)
};

export const SUPABASE_URL = envConfig.supabaseUrl;
export const SUPABASE_ANON_KEY = envConfig.supabaseAnonKey;

export default envConfig;