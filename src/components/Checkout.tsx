import React, { useState } from 'react';
import { X, MapPin, CreditCard, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useLocation } from '../contexts/LocationContext';
import { supabase } from '../lib/supabase';
import { envConfig } from '../config/env';

interface CheckoutProps {
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

interface PaymentInfo {
  method: 'card' | 'transfer' | 'cash';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, items, onClearCart }) => {
  const { selectedProvince, selectedMunicipality } = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

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

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + shipping + tax;

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInfoChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return customerInfo.firstName && customerInfo.lastName && customerInfo.email && 
           customerInfo.phone && customerInfo.address;
  };

  const validateStep2 = () => {
    if (paymentInfo.method === 'cash') return true;
    if (paymentInfo.method === 'transfer') return true;
    return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardName;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const orderNum = 'DTD-' + Date.now().toString().slice(-6);

      // Convertir CUP a USD (tasa aproximada)
      const amountInUSD = total / 120; // 1 USD = 120 CUP aproximadamente

      let paymentIntentId = null;

      // Si el método es tarjeta, procesar pago con Stripe
      if (paymentInfo.method === 'card') {
        const response = await fetch(
          `${envConfig.supabaseUrl}/functions/v1/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${envConfig.supabaseAnonKey}`,
            },
            body: JSON.stringify({
              amount: amountInUSD,
              currency: 'usd',
              metadata: {
                order_number: orderNum,
                customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                delivery_address: customerInfo.address,
                city: customerInfo.city,
                province: selectedProvince?.name || '',
                municipality: selectedMunicipality?.name || '',
                payment_method: paymentInfo.method,
                items: JSON.stringify(items.map(item => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price
                }))),
                subtotal_cup: subtotal,
                shipping_cup: shipping,
                tax_cup: tax,
                total_cup: total,
                notes: customerInfo.notes || 'N/A'
              }
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Error al procesar el pago');
        }

        const data = await response.json();
        paymentIntentId = data.paymentIntentId;
      }

      // Guardar orden en la base de datos
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNum,
          status: 'pending',
          subtotal,
          shipping_cost: shipping,
          tax,
          total,
          currency: 'CUP',
          payment_status: paymentInfo.method === 'card' ? 'completed' : 'pending',
          payment_method: paymentInfo.method,
          stripe_payment_intent_id: paymentIntentId,
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          shipping_address: customerInfo.address,
          shipping_city: customerInfo.city,
          shipping_province: selectedProvince?.name || '',
          shipping_municipality: selectedMunicipality?.name || '',
          notes: customerInfo.notes
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Error al crear la orden');
      }

      // Guardar items de la orden
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        product_name: item.name,
        product_brand: item.brand,
        product_image: item.image
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
      }

      setOrderNumber(orderNum);
      setOrderCompleted(true);

      // Clear cart after successful order
      setTimeout(() => {
        onClearCart();
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Error al procesar la orden. Por favor intenta nuevamente.');
    } finally {
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
      setPaymentInfo({
        method: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      });
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
              ¡Pedido Confirmado!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado exitosamente.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Número de pedido:</p>
              <p className="text-lg font-bold text-blue-600">{orderNumber}</p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>📧 Recibirás un email de confirmación</p>
              <p>📱 Te contactaremos para coordinar la entrega</p>
              <p>🚚 Tiempo estimado: 24-48 horas</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
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
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Información de Entrega
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
                          Dirección *
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

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      Método de Pago
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Payment Method Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => handlePaymentInfoChange('method', 'card')}
                          className={`p-4 border-2 rounded-lg text-center transition-colors ${
                            paymentInfo.method === 'card'
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <CreditCard className="w-6 h-6 mx-auto mb-2" />
                          <span className="font-medium">Tarjeta</span>
                        </button>
                        
                        <button
                          onClick={() => handlePaymentInfoChange('method', 'transfer')}
                          className={`p-4 border-2 rounded-lg text-center transition-colors ${
                            paymentInfo.method === 'transfer'
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Truck className="w-6 h-6 mx-auto mb-2" />
                          <span className="font-medium">Transferencia</span>
                        </button>
                        
                        <button
                          onClick={() => handlePaymentInfoChange('method', 'cash')}
                          className={`p-4 border-2 rounded-lg text-center transition-colors ${
                            paymentInfo.method === 'cash'
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Shield className="w-6 h-6 mx-auto mb-2" />
                          <span className="font-medium">Efectivo</span>
                        </button>
                      </div>

                      {/* Card Payment Form */}
                      {paymentInfo.method === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Número de Tarjeta *
                            </label>
                            <input
                              type="text"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de Vencimiento *
                              </label>
                              <input
                                type="text"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV *
                              </label>
                              <input
                                type="text"
                                value={paymentInfo.cvv}
                                onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre en la Tarjeta *
                            </label>
                            <input
                              type="text"
                              value={paymentInfo.cardName}
                              onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nombre como aparece en la tarjeta"
                            />
                          </div>
                        </div>
                      )}

                      {/* Transfer Payment Info */}
                      {paymentInfo.method === 'transfer' && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Información para Transferencia</h4>
                          <div className="space-y-1 text-sm text-blue-800">
                            <p><strong>Banco:</strong> Banco Popular de Ahorro</p>
                            <p><strong>Cuenta:</strong> 9205-0000-0000-1234</p>
                            <p><strong>Titular:</strong> DTodo Cuba S.L.</p>
                            <p><strong>Concepto:</strong> Pedido DTodo</p>
                          </div>
                        </div>
                      )}

                      {/* Cash Payment Info */}
                      {paymentInfo.method === 'cash' && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Pago Contra Entrega</h4>
                          <p className="text-sm text-green-800">
                            Pagarás en efectivo cuando recibas tu pedido. Nuestro repartidor llevará cambio si es necesario.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Revisar Pedido</h3>
                    
                    {/* Customer Info Review */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">Información de Entrega</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>{customerInfo.firstName} {customerInfo.lastName}</strong></p>
                        <p>{customerInfo.email}</p>
                        <p>{customerInfo.phone}</p>
                        <p>{customerInfo.address}</p>
                        <p>{customerInfo.city}, {selectedProvince?.name}</p>
                      </div>
                    </div>

                    {/* Payment Method Review */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">Método de Pago</h4>
                      <p className="text-sm text-gray-600">
                        {paymentInfo.method === 'card' && 'Tarjeta de Crédito/Débito'}
                        {paymentInfo.method === 'transfer' && 'Transferencia Bancaria'}
                        {paymentInfo.method === 'cash' && 'Pago Contra Entrega'}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Productos</h4>
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 1 && !validateStep1()) ||
                      (currentStep === 2 && !validateStep2())
                    }
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      'Confirmar Pedido'
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
                  <span>Envío:</span>
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

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">Información de Entrega</span>
                </div>
                <div className="text-xs text-blue-800 space-y-1">
                  <p>📍 {selectedMunicipality?.name}, {selectedProvince?.name}</p>
                  <p>⏱️ Entrega en 24-48 horas</p>
                  <p>🚚 {shipping === 0 ? 'Envío gratuito' : 'Costo de envío incluido'}</p>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Compra Segura</span>
                </div>
                <div className="text-xs text-green-800 space-y-1">
                  <p>🔒 Pago 100% seguro</p>
                  <p>✅ Garantía de satisfacción</p>
                  <p>📞 Soporte 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;