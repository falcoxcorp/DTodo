# 🏪 DTodo Cuba - Tienda Online Líder

[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🚀 Descripción

DTodo Cuba es una tienda online moderna y completa especializada en electrónicos, electrodomésticos, smartphones y tecnología para el mercado cubano. Construida con las últimas tecnologías web para ofrecer una experiencia de compra excepcional.

## ✨ Características Principales

### 🛒 **E-commerce Completo**
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras persistente
- ✅ Sistema de favoritos
- ✅ Checkout completo con múltiples métodos de pago
- ✅ Gestión de inventario en tiempo real

### 🌍 **Localización Cubana**
- ✅ 15 provincias y 169 municipios de Cuba
- ✅ Productos disponibles por ubicación
- ✅ Información del clima en tiempo real
- ✅ Tipo de cambio USD/CUP actualizado

### 📱 **Experiencia de Usuario**
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Animaciones y micro-interacciones
- ✅ Carga rápida y optimizada

### 🔐 **Seguridad y Configuración**
- ✅ Variables de entorno para APIs
- ✅ Redirección automática HTTPS
- ✅ Configuración SSL/TLS
- ✅ Validación de formularios

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **APIs:** OpenWeatherMap, WeatherAPI, ElToque
- **Deployment:** Bolt Hosting

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/dtodo-cuba.git
cd dtodo-cuba
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

4. **Editar el archivo `.env` con tus claves:**
```env
# APIs del Clima (Gratuitas)
VITE_OPENWEATHER_API_KEY=tu_clave_openweather
VITE_WEATHERAPI_KEY=tu_clave_weatherapi

# Configuración SSL
VITE_ENABLE_HTTPS=true
VITE_SSL_REDIRECT=true
```

5. **Ejecutar en desarrollo:**
```bash
npm run dev
```

## 🔑 Configuración de APIs

### 🌤️ **APIs del Clima (Gratuitas)**

1. **OpenWeatherMap:**
   - Registrarse en: https://openweathermap.org/api
   - Obtener API key gratuita (1000 llamadas/día)
   - Agregar a `.env`: `VITE_OPENWEATHER_API_KEY=tu_clave`

2. **WeatherAPI:**
   - Registrarse en: https://www.weatherapi.com/
   - Obtener API key gratuita (1 millón llamadas/mes)
   - Agregar a `.env`: `VITE_WEATHERAPI_KEY=tu_clave`

### 💱 **API de Tipo de Cambio**
- **ElToque:** API pública sin clave requerida
- **Fallback:** Tasa configurable en `.env`

### 🔐 **Configuración SSL**
```env
VITE_ENABLE_HTTPS=true
VITE_SSL_REDIRECT=true
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Navegación principal
│   ├── Hero.tsx        # Banner principal
│   ├── ProductGrid.tsx # Catálogo de productos
│   ├── Cart.tsx        # Carrito de compras
│   ├── WeatherWidget.tsx # Widget del clima
│   └── SSLRedirect.tsx # Redirección HTTPS
├── contexts/           # Context API
│   ├── LocationContext.tsx
│   └── FavoritesContext.tsx
├── hooks/              # Custom hooks
│   ├── useWeather.ts   # Hook del clima
│   └── useExchangeRate.ts # Hook tipo de cambio
├── data/               # Datos estáticos
│   ├── products.ts     # Catálogo de productos
│   ├── categories.ts   # Categorías
│   └── provinces/      # Provincias y municipios
├── config/             # Configuración
│   └── env.ts          # Variables de entorno
└── types/              # Tipos TypeScript
```

## 🌟 Características Avanzadas

### 🌤️ **Sistema del Clima**
- Detección automática día/noche
- Iconos dinámicos (☀️🌙⛅☁️🌧️)
- Temperatura y condiciones actuales
- Actualización cada 10 minutos

### 💱 **Tipo de Cambio**
- Múltiples fuentes de datos
- Actualización automática
- Fallback en caso de fallo de APIs
- Conversión USD/CUP en tiempo real

### 📍 **Geolocalización**
- 15 provincias de Cuba
- 169 municipios
- Productos por ubicación
- Persistencia en localStorage

## 🚀 Deployment

### **Bolt Hosting (Recomendado)**
```bash
npm run build
# Deploy automático desde el panel de Bolt
```

### **Netlify**
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### **Vercel**
```bash
npm run build
# Deploy con Vercel CLI
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
npm run typecheck    # Verificación TypeScript
```

## 🌍 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_OPENWEATHER_API_KEY` | Clave OpenWeatherMap | No |
| `VITE_WEATHERAPI_KEY` | Clave WeatherAPI | No |
| `VITE_ENABLE_HTTPS` | Habilitar HTTPS | No |
| `VITE_SSL_REDIRECT` | Redirección SSL | No |
| `VITE_STORE_NAME` | Nombre de la tienda | No |
| `VITE_STORE_EMAIL` | Email de contacto | No |
| `VITE_STORE_PHONE` | Teléfono de contacto | No |

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email:** tiendadtodoinfo@gmail.com
- **Teléfono:** +1 (786) 475-8945
- **Sitio Web:** https://electro-website-comp-tqmq.bolt.host/

## 🙏 Agradecimientos

- **APIs Gratuitas:** OpenWeatherMap, WeatherAPI, ElToque
- **Iconos:** Lucide React
- **Imágenes:** Pexels
- **Hosting:** Bolt Hosting

---

**DTodo Cuba** - *La manera más fácil y rápida de conseguir lo que buscas en Cuba* 🇨🇺✨