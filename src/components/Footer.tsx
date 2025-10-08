import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Store } from 'lucide-react';
import { envConfig } from '../config/env';

interface FooterProps {
  onNavigate?: (view: 'about') => void;
  onOpenSellerForm?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSellerForm }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-3 sm:mb-4 relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl p-2 sm:p-3 shadow-2xl transform group-hover:scale-105 transition-transform duration-300 inline-block">
                <img
                  src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759091716456-b53fc732716f623a355c8668ce01be14.png"
                  alt="DTodo Cuba Logo - Tienda Online Líder Electrónicos Electrodomésticos"
                  className="h-10 sm:h-12 lg:h-16 w-auto block"
                  itemProp="logo"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base" itemProp="description">
              🛍️ Dtodo: tu tienda online de confianza.

En Dtodo encuentras todo lo que necesitas en un solo lugar: tecnología, hogar, moda, energía renovable y mucho más.
Compra fácil, segura y con entregas rápidas 🚚✨
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.facebook.com/DTodoCuba" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook DTodo Cuba" itemProp="sameAs">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/DTodoCuba" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram DTodo Cuba" itemProp="sameAs">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://twitter.com/DTodoCuba" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter DTodo Cuba" itemProp="sameAs">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.youtube.com/DTodoCuba" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="YouTube DTodo Cuba" itemProp="sameAs">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">INFORMACIÓN Y SERVICIOS</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base text-left"
                >
                  Sobre DTodo Cuba
                </button>
              </li>
              <li><a href="/terminos-condiciones" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Términos y Condiciones</a></li>
              <li><a href="/politica-privacidad" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Política de Privacidad</a></li>
              <li><a href="/politica-devoluciones" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Devoluciones y Cambios</a></li>
              <li><a href="/garantias" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Garantías y Servicio</a></li>
              <li><a href="/preguntas-frecuentes" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Preguntas Frecuentes</a></li>
              <li><a href="/envios-cuba" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Envíos a Cuba</a></li>
              <li><a href="/metodos-pago" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base">Métodos de Pago</a></li>
              <li>
                <button
                  onClick={onOpenSellerForm}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base text-left group"
                >
                  <Store className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  <span className="group-hover:text-blue-400 transition-colors">Vende con Nosotros</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">CONTACTO Y ATENCIÓN</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${envConfig.storePhone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base\" itemProp="telephone">{envConfig.storePhone}</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${envConfig.storeEmail}`} className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm lg:text-base break-all" itemProp="email">{envConfig.storeEmail}</a>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                <address className="text-gray-300 text-xs sm:text-sm lg:text-base not-italic" itemProp="address">
                  {envConfig.storeAddress.split(', ').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < envConfig.storeAddress.split(', ').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </address>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-green-400 text-xs sm:text-sm">⏰</span>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-base">Atención 24/7</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-4 sm:mt-6">
              <h5 className="font-semibold mb-2 text-xs sm:text-sm lg:text-base">Ofertas y Novedades</h5>
              <p className="text-gray-400 text-xs mb-2">Recibe ofertas exclusivas, nuevos productos y descuentos especiales</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-400 text-xs sm:text-sm"
                  aria-label="Email para newsletter"
                />
                <button className="bg-blue-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-r-lg hover:bg-blue-700 transition-colors" aria-label="Suscribirse al newsletter">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left" itemProp="copyrightNotice">
            © 2024 DTodo Cuba - Tienda Online Líder. Todos los derechos reservados. E-commerce, Electrónicos, Electrodomésticos, Smartphones, Tecnología Cuba.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-gray-400 text-xs sm:text-sm">Métodos de pago seguros:</span>
            <div className="flex gap-1 sm:gap-2">
              <div className="bg-white text-gray-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold" title="Visa">VISA</div>
              <div className="bg-white text-gray-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold" title="Mastercard">MC</div>
              <div className="bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold" title="Zelle">ZELLE</div>
              <div className="bg-blue-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold" title="Efectivo">CASH</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;