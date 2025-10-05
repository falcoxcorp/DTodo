import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { X, CreditCard, Shield, Zap, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { useLocation } from '../contexts/LocationContext';
import { stripePromise, formatPriceForStripe } from '../config/stripe';

interface StripeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ isOpen, onClose, items, onClearCart }) => {
  const { selectedProvince, selectedMunicipality } = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: selectedMunicipality?.name || '',
    postalCode: '',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + shipping + tax;

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return customerInfo.firstName && customerInfo.lastName && customerInfo.email && 
           customerInfo.phone && customerInfo.address;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe no se pudo cargar');
      }

      // Simular creación de sesión de checkout
      // En producción, esto sería una llamada a tu backend
      const checkoutSession = {
        id: 'cs_test_' + Date.now(),
        url: null // En demo mode, no redirigimos
      };

      // Simular proceso de pago exitoso
      await new Promise(resolve => setTimeout(resolve, 3000));

      const orderNum = 'DTD-' + Date.now().toString().slice(-6);
      setOrderNumber(orderNum);
      setOrderCompleted(true);
      setIsProcessing(false);
      
      // Clear cart after successful order
      setTimeout(() => {
        onClearCart();
      }, 2000);

    } catch (err: any) {
      console.error('Error en checkout de Stripe:', err);
      setError(err.message || 'Error procesando el pago');
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (orderCompleted) {
      setOrderCompleted(false);
      setCurrentStep(1);
      setCustomerInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: selectedMunicipality?.name || '',
        postalCode: '',
        notes: ''
      });
      setError(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  if (orderCompleted) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClose} />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Pago Exitoso! 🎉
            </h2>
            
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado exitosamente con Stripe.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Número de pedido:</p>
              <p className="text-lg font-bold text-blue-600">{orderNumber}</p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>📧 Recibirás confirmación por email</p>
              <p>📱 Te contactaremos para coordinar entrega</p>
              <p>🚚 Envío a {selectedMunicipality?.name}, {selectedProvince?.name}</p>
              <p>⏱️ Tiempo estimado: 3-7 días hábiles</p>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-start justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Checkout con Stripe</h2>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 2 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Información de Entrega a Cuba
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.firstName}
                          onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.lastName}
                          onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tus apellidos"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+53 5555 5555"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección en Cuba *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.address}
                          onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Calle, número, entre calles..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ciudad"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código Postal
                        </label>
                        <input
                          type="text"
                          value={customerInfo.postalCode}
                          onChange={(e) => handleCustomerInfoChange('postalCode', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notas adicionales
                        </label>
                        <textarea
                          value={customerInfo.notes}
                          onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Instrucciones especiales para la entrega..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Stripe Payment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      Pago Seguro con Stripe
                    </h3>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-blue-900">Pago 100% Seguro</h4>
                          <p className="text-sm text-blue-700">
                            Procesado por Stripe, la plataforma de pagos más confiable del mundo
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium">💳 Visa</span>
                      </div>
                      <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium">💳 Mastercard</span>
                      </div>
                      <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium">🍎 Apple Pay</span>
                      </div>
                      <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium">🔵 PayPal</span>
                      </div>
                    </div>

                    {/* Customer Info Review */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">Información de Entrega</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>{customerInfo.firstName} {customerInfo.lastName}</strong></p>
                        <p>{customerInfo.email}</p>
                        <p>{customerInfo.phone}</p>
                        <p>{customerInfo.address}</p>
                        <p>{customerInfo.city}, {selectedProvince?.name}, Cuba</p>
                      </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <div>
                            <h4 className="font-medium text-red-900">Error en el pago</h4>
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
                
                {currentStep < 2 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep1()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar a Pago
                  </button>
                ) : (
                  <button
                    onClick={handleStripeCheckout}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando con Stripe...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Pagar con Stripe
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-80 bg-gray-50 p-6 border-l">
              <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío a Cuba:</span>
                  <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Impuestos:</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Stripe Security Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Powered by Stripe</span>
                </div>
                <div className="text-xs text-blue-800 space-y-1">
                  <p>🔒 Encriptación SSL de 256 bits</p>
                  <p>🛡️ Cumple con PCI DSS</p>
                  <p>🌍 Confiado por millones</p>
                  <p>💳 Datos nunca almacenados</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Entrega a Cuba</span>
                </div>
                <div className="text-xs text-green-800 space-y-1">
                  <p>📍 {selectedMunicipality?.name}, {selectedProvince?.name}</p>
                  <p>⏱️ 3-7 días hábiles</p>
                  <p>🚚 {shipping === 0 ? 'Envío gratuito' : 'Envío incluido'}</p>
                  <p>📞 Seguimiento completo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;