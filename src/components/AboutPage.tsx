import React from 'react';
import { ArrowLeft, ShoppingBag, Home, Shirt, Battery, Car } from 'lucide-react';

interface AboutPageProps {
  onGoBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onGoBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onGoBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Sobre DTodo Cuba</h1>
            <p className="text-xl text-blue-100">Todo lo que necesitas, en un solo lugar</p>
          </div>

          <div className="px-8 py-12 space-y-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bienvenido a <span className="font-semibold text-blue-600">Dtodo</span>, tu tienda online donde encuentras todo lo que necesitas en un solo lugar.
                Nuestro objetivo es ofrecerte una experiencia de compra rápida, segura y confiable, con una gran variedad de productos que se adaptan a tu estilo de vida.
              </p>
            </div>

            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                En Dtodo creemos que el tiempo es valioso, por eso reunimos diferentes categorías para que no tengas que buscar en varios sitios:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <ShoppingBag className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Tecnología y Electrónica</h3>
                  <p className="text-gray-600">Los últimos smartphones, tablets, laptops y accesorios tecnológicos</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <Home className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Hogar y Decoración</h3>
                  <p className="text-gray-600">Electrodomésticos, muebles y todo para tu hogar</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <Shirt className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Moda y Accesorios</h3>
                  <p className="text-gray-600">Estilo y tendencias para toda la familia</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                <Battery className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Energía Renovable</h3>
                  <p className="text-gray-600">Paneles solares, baterías y kits de energía</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors md:col-span-2">
                <Car className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Transporte y Alquiler de Vehículos</h3>
                  <p className="text-gray-600">Soluciones de movilidad para tus necesidades</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué nos hace diferentes?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">✓</span>
                  <span><strong>Calidad garantizada</strong> en todos nuestros productos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">✓</span>
                  <span><strong>Precios accesibles</strong> para todos los presupuestos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">✓</span>
                  <span><strong>Servicio al cliente cercano</strong>, siempre pensando en tu comodidad</span>
                </li>
              </ul>
            </div>

            <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Comprar es muy fácil</h2>
              <p className="text-lg mb-6 text-gray-200">
                Solo eliges tu producto, pagas de forma segura y lo recibes en la puerta de tu casa.
              </p>
              <div className="text-4xl mb-4">🚚✨</div>
            </div>

            <div className="text-center pt-6">
              <p className="text-xl text-gray-700 mb-4">
                Te invitamos a descubrir todo lo que tenemos para ti y a formar parte de nuestra comunidad de clientes satisfechos.
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                <span>👉</span>
                <span>Dtodo: Todo lo que necesitas, en un solo lugar.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
