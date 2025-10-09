import React from 'react';
import { ArrowRight, Zap, Shield, Truck, ChevronLeft, ChevronRight, Star, Gift, Clock } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import WeatherWidget from './WeatherWidget';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState('');
  const { selectedProvince, selectedMunicipality } = useLocation();

  // Actualizar hora de Cuba desde WorldTimeAPI
  React.useEffect(() => {
    let localInterval: NodeJS.Timeout;

    const fetchCubaTime = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/America/Havana');
        const data = await response.json();

        if (data.datetime) {
          const serverTime = new Date(data.datetime);

          // Actualizar cada segundo desde el tiempo del servidor
          const updateLocalTime = () => {
            const now = new Date();
            const elapsed = now.getTime() - new Date(data.datetime).getTime();
            const currentServerTime = new Date(serverTime.getTime() + elapsed);

            let hours = currentServerTime.getHours();
            const minutes = currentServerTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentServerTime.getSeconds().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Convertir a formato 12 horas
            hours = hours % 12;
            hours = hours ? hours : 12; // Si es 0, mostrar 12
            const hoursStr = hours.toString().padStart(2, '0');

            setCurrentTime(`${hoursStr}:${minutes}:${seconds} ${ampm}`);
          };

          updateLocalTime();
          localInterval = setInterval(updateLocalTime, 1000);
        }
      } catch (error) {
        console.error('Error fetching Cuba time:', error);
        // Fallback a hora local del navegador con zona horaria
        const updateTime = () => {
          const now = new Date();
          const cubaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Havana' }));
          let hours = cubaTime.getHours();
          const minutes = cubaTime.getMinutes().toString().padStart(2, '0');
          const seconds = cubaTime.getSeconds().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';

          // Convertir a formato 12 horas
          hours = hours % 12;
          hours = hours ? hours : 12; // Si es 0, mostrar 12
          const hoursStr = hours.toString().padStart(2, '0');

          setCurrentTime(`${hoursStr}:${minutes}:${seconds} ${ampm}`);
        };

        updateTime();
        localInterval = setInterval(updateTime, 1000);
      }
    };

    fetchCubaTime();
    // Sincronizar con el servidor cada 5 minutos
    const syncInterval = setInterval(fetchCubaTime, 5 * 60 * 1000);

    return () => {
      if (localInterval) clearInterval(localInterval);
      clearInterval(syncInterval);
    };
  }, []);

  const slides = [
    {
      title: "MEGA OFERTAS",
      subtitle: "Hasta 70% de descuento",
      description: "En productos seleccionados de tecnología y electrodomésticos",
      buttonText: "Comprar Ahora",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      gradient: "from-blue-600 via-purple-600 to-purple-800",
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: { text: "-70%", color: "bg-red-500" },
      features: ["Envío Gratis", "Garantía 2 años", "Entrega 24h"]
    },
    {
      title: "iPhone 17 Pro Max",
      subtitle: "La revolución llegó",
      description: "Descubre el smartphone más avanzado con tecnología de vanguardia",
      buttonText: "Ver Modelos",
      buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
      gradient: "from-slate-900 via-gray-800 to-black",
      image: "https://photos.pinksale.finance/file/pinksale-logo-upload/1759204504607-d0ce474494d3dea706dac41544ed58db.jpg",
      badge: { text: "NUEVO", color: "bg-green-500" },
      features: ["Chip A18 Pro", "Cámara 48MP", "Titanio Premium"]
    },
    {
      title: "Smart TVs Premier",
      subtitle: "Entretenimiento sin límites",
      description: "40\" y 43\" con Android TV, WiFi y aplicaciones integradas",
      buttonText: "Explorar TVs",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      image: "https://photos.pinksale.finance/file/pinksale-logo-upload/1759978661708-dba04b09e7e157ca093e39a7a5311761.png",
      badge: { text: "4K HDR", color: "bg-blue-500" },
      features: ["Android TV", "WiFi Integrado", "Apps Populares"]
    },
    {
      title: "Ventiladores Inteligentes",
      subtitle: "Frescura y tecnología",
      description: "Portátiles con batería 20,000mAh y control remoto 360°",
      buttonText: "Ver Ventiladores",
      buttonColor: "bg-cyan-500 hover:bg-cyan-600",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      image: "https://photos.pinksale.finance/file/pinksale-logo-upload/1759978687561-ef2d13d63f1a2fc3f50b7bc100c5c6ad.png",
      badge: { text: "ECO", color: "bg-green-600" },
      features: ["20,000mAh", "Control Remoto", "Rotación 360°"]
    },
    {
      title: "Conectividad Total",
      subtitle: "WiFi de alta velocidad",
      description: "Routers TP-Link con 300Mbps y cobertura completa para tu hogar",
      buttonText: "Ver Equipos",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-gray-900",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: { text: "300Mbps", color: "bg-orange-500" },
      features: ["Doble Antena", "4 Puertos LAN", "Fácil Setup"]
    },
    {
      title: "Combos de Comida",
      subtitle: "Todo lo que necesitas",
      description: "Paquetes completos con frijoles, pasta, arroz, aceite y más - ¡Ahorra hasta $105 USD!",
      buttonText: "Ver Combos",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      gradient: "from-green-600 via-emerald-600 to-teal-700",
      image: "https://photos.pinksale.finance/file/pinksale-logo-upload/1759977491552-e157e9294f5d68a7e6759fb5e40c904f.png",
      badge: { text: "$105 USD", color: "bg-red-600" },
      features: ["3 Frijol Negro (Lb)", "Pasta + Espaguetis", "Leche + Café"]
    },
    {
      title: "Envía Remesas a Cuba",
      subtitle: "Rápido, seguro y confiable",
      description: "Transferencias de dinero directas a Cuba con las mejores tarifas del mercado y entrega garantizada",
      buttonText: "Enviar Ahora",
      buttonColor: "bg-green-500 hover:bg-green-600",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      image: "https://photos.pinksale.finance/file/pinksale-logo-upload/1760021142857-5f4ed5e9f9d0368e655845defea9012a.png",
      badge: { text: "SEGURO", color: "bg-emerald-600" },
      features: ["Entrega Rápida", "Mejor Tarifa", "100% Seguro"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // 10 segundos por slide
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative overflow-hidden">
      {/* Barra verde superior */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-1 sm:py-2 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {selectedProvince && selectedMunicipality ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm font-medium animate-pulse text-center sm:text-left" itemProp="serviceArea">
                🎉 ¡Bienvenido desde {selectedMunicipality.name}, {selectedProvince.name}! Productos disponibles en tu zona 🚚⚡
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs sm:text-sm font-medium">
                  <WeatherWidget
                    city={selectedMunicipality.name}
                    province={selectedProvince.name}
                    compact={true}
                  />
                </div>
                {currentTime && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-bold tabular-nums">{currentTime}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm font-medium animate-pulse px-2">
              🎉 ¡Bienvenido a DTodo Cuba - Tienda Online Líder! Selecciona tu provincia y municipio para ver productos electrónicos, smartphones, electrodomésticos y tecnología disponibles con envío gratis 🚚📱💻
            </p>
          )}
        </div>
      </div>

      {/* Hero principal */}
      <div className={`bg-gradient-to-br ${currentSlideData.gradient} text-white relative min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] overflow-hidden`}>
        {/* Patrón de fondo animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 border-2 border-white rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-16 right-10 sm:top-32 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 border border-white rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 left-16 sm:bottom-20 sm:left-32 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-16 right-5 sm:bottom-32 sm:right-10 w-10 h-10 sm:w-20 sm:h-20 border-2 border-white rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 sm:w-8 sm:h-8 bg-white rounded-full opacity-30 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-12 sm:h-12 border border-white rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Overlay gradient para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Contenido izquierdo */}
            <div className="text-center lg:text-left">
              <div className="mb-6 sm:mb-8">
                {/* Badge superior */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 flex-wrap justify-center lg:justify-start">
                  <span className={`${currentSlideData.badge.color} text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse`}>
                    {currentSlideData.badge.text}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs sm:text-sm ml-1 sm:ml-2">4.9/5 ⭐</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 leading-tight">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 mb-4 sm:mb-6">
                  {currentSlideData.subtitle}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
                <button className={`${currentSlideData.buttonColor} px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3`}>
                  {currentSlideData.buttonText}
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
                <button className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 backdrop-blur-sm">
                  Catálogo Completo
                </button>
              </div>

              {/* Características destacadas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {currentSlideData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-xl backdrop-blur-sm">
                      {index === 0 && <Truck className="w-4 h-4 sm:w-6 sm:h-6" />}
                      {index === 1 && <Shield className="w-4 h-4 sm:w-6 sm:h-6" />}
                      {index === 2 && <Zap className="w-4 h-4 sm:w-6 sm:h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm">{feature}</h3>
                      <p className="text-xs text-blue-100 hidden sm:block">
                        {index === 0 && "Compras +$500 CUP"}
                        {index === 1 && "Productos originales"}
                        {index === 2 && "En toda Cuba"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido derecho - Imagen del producto */}
            <div className="relative mt-6 lg:mt-0">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="w-full max-w-sm sm:max-w-lg mx-auto rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-4" style={{ aspectRatio: '4/3' }}>
                  <img
                    key={currentSlide}
                    src={currentSlideData.image}
                    alt="Productos destacados"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Elementos flotantes decorativos */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-green-400 text-green-900 px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg z-20 font-bold text-xs sm:text-sm animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full animate-pulse"></div>
                  En Stock
                </div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-yellow-400 text-yellow-900 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg z-20 animate-pulse">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-black">-25%</div>
                  <div className="text-xs sm:text-sm font-bold">Descuento</div>
                </div>
              </div>

              {/* Elementos adicionales flotantes */}
              <div className="absolute top-1/4 -right-3 sm:-right-6 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg z-20 animate-bounce" style={{ animationDelay: '1s' }}>
                <Gift className="w-3 h-3 sm:w-5 sm:h-5" />
              </div>

              <div className="absolute bottom-1/4 -left-3 sm:-left-6 bg-purple-500 text-white p-2 sm:p-3 rounded-full shadow-lg z-20 animate-bounce" style={{ animationDelay: '2s' }}>
                <Clock className="w-3 h-3 sm:w-5 sm:h-5" />
              </div>

              {/* Círculos decorativos de fondo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-white bg-opacity-10 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-white bg-opacity-5 rounded-full -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-white bg-opacity-3 rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Controles del slider */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-20">
          <button
            onClick={prevSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-6 sm:w-8 scale-125'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-2 sm:w-3'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Indicador de progreso */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              transition: 'width 10s linear'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;