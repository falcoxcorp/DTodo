// ================================
// DTODO CUBA - CONFIGURACIÓN DE STRIPE
// ================================

import { loadStripe } from '@stripe/stripe-js';
import { envConfig } from './env';

// Inicializar Stripe con la clave pública
export const stripePromise = loadStripe(envConfig.stripePublishableKey || 'pk_test_demo');

// Configuración de Stripe
export const stripeConfig = {
  // Monedas soportadas
  supportedCurrencies: ['USD', 'EUR'],
  
  // Configuración por defecto
  defaultCurrency: 'USD',
  
  // Configuración de checkout
  checkoutConfig: {
    mode: 'payment' as const,
    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/cart`,
    allowPromotionCodes: true,
    billingAddressCollection: 'required' as const,
    shippingAddressCollection: {
      allowedCountries: ['US', 'CA', 'MX', 'ES', 'FR', 'IT', 'DE', 'GB']
    },
    phoneNumberCollection: {
      enabled: true
    }
  },
  
  // Métodos de pago habilitados
  paymentMethods: [
    'card',
    'apple_pay',
    'google_pay',
    'link',
    'paypal'
  ],
  
  // Configuración de envío
  shippingOptions: [
    {
      shipping_rate_data: {
        type: 'fixed_amount' as const,
        fixed_amount: {
          amount: 0, // Envío gratis
          currency: 'usd',
        },
        display_name: 'Envío GRATIS a Cuba',
        delivery_estimate: {
          minimum: {
            unit: 'business_day' as const,
            value: 3,
          },
          maximum: {
            unit: 'business_day' as const,
            value: 7,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount' as const,
        fixed_amount: {
          amount: 2500, // $25 USD
          currency: 'usd',
        },
        display_name: 'Envío Express a Cuba',
        delivery_estimate: {
          minimum: {
            unit: 'business_day' as const,
            value: 1,
          },
          maximum: {
            unit: 'business_day' as const,
            value: 3,
          },
        },
      },
    },
  ]
};

// Función para formatear precios para Stripe (centavos)
export const formatPriceForStripe = (price: number): number => {
  return Math.round(price * 100); // Convertir a centavos
};

// Función para formatear precios desde Stripe
export const formatPriceFromStripe = (price: number): number => {
  return price / 100; // Convertir de centavos a dólares
};

// Función para crear sesión de checkout
export const createCheckoutSession = async (items: any[], customerInfo: any) => {
  try {
    // En producción, esto sería una llamada a tu backend
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description,
              images: [item.image],
              metadata: {
                brand: item.brand,
                category: item.category,
                product_id: item.id.toString()
              }
            },
            unit_amount: formatPriceForStripe(item.price),
          },
          quantity: item.quantity,
        })),
        customer_info: customerInfo,
        success_url: stripeConfig.checkoutConfig.successUrl,
        cancel_url: stripeConfig.checkoutConfig.cancelUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
};

export default stripeConfig;