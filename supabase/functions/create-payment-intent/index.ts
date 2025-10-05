import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-12-18.acacia",
    });

    const { amount, currency = "usd", metadata = {} } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata,
      description: `Pedido ${metadata.order_number || 'N/A'} - ${metadata.customer_name || 'Cliente'}`,
      receipt_email: metadata.customer_email || undefined,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    // Marcar el PaymentIntent como confirmado automáticamente para simular el pago
    // En producción, el cliente confirmaría esto con Stripe Elements
    const confirmedPayment = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: 'pm_card_visa', // Tarjeta de prueba
        return_url: 'https://tu-dominio.com/success'
      }
    );

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        status: confirmedPayment.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});