import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import StripeCheckout from './StripeCheckout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [isStripeCheckoutOpen, setIsStripeCheckoutOpen] = React.useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500 USD
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsStripeCheckoutOpen(true);
  };

  const handleClearCart = () => {
    items.forEach(item => onRemoveItem(item.id));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold">Carrito de Compras</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4 text-sm sm:text-base">Tu carrito está vacío</p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-xs sm:text-sm mb-2">
                        {formatPrice(item.price)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:bg-gray-100 rounded text-gray-600"
                          >
                            <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-600"
                          >
                            <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                        >
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Subtotal:</span>
                  <span className="text-blue-600 font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Envío:</span>
                  <span className="text-blue-600 font-semibold">
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                💳 Pagar con Stripe
              </button>
              
              <button
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Continuar comprando
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
      
      <StripeCheckout
        isOpen={isStripeCheckoutOpen}
        onClose={() => setIsStripeCheckoutOpen(false)}
        items={items}
        onClearCart={handleClearCart}
      />
    </>
  );
};

export default Cart;