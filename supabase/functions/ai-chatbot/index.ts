import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DEEPSEEK_API_KEY = "sk-91d6c1d647f8422f8c54f14dc22d499f";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: Message[];
  sessionId?: string;
  userId?: string;
}

// Función para generar hash de una consulta
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Función para reintentar llamadas con backoff exponencial
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        console.log(`Reintento ${i + 1}/${maxRetries} después de ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// Función para llamar a DeepSeek API
async function callDeepSeekAPI(messages: Message[]): Promise<string> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.7,
      max_tokens: 800,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`DeepSeek API Error (${response.status}):`, errorText);
    throw new Error(`DeepSeek API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, conversationHistory = [], sessionId, userId }: ChatRequest = await req.json();

    if (!message || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El mensaje no puede estar vacío" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[${sessionId}] Procesando mensaje:`, message.substring(0, 50));

    // Crear cliente de Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Verificar cache primero
    const queryHash = hashString(message.toLowerCase().trim());
    const { data: cachedResponse } = await supabase
      .from("chat_response_cache")
      .select("response")
      .eq("query_hash", queryHash)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (cachedResponse) {
      console.log(`[${sessionId}] Respuesta encontrada en caché`);
      return new Response(
        JSON.stringify({
          response: cachedResponse.response,
          cached: true,
          conversationId: sessionId || crypto.randomUUID(),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Obtener productos e información de la tienda
    const { data: products } = await supabase
      .from("products")
      .select("id, name, brand, base_price, description, stock_quantity, category_id")
      .gt("stock_quantity", 0)
      .order("name");

    const { data: categories } = await supabase
      .from("categories")
      .select("id, name, description")
      .order("name");

    // Crear mapa de categorías para fácil acceso
    const categoryMap = new Map(categories?.map(c => [c.id, c]) || []);

    // Construir catálogo de productos organizado por categoría
    const productsByCat: Record<string, any[]> = {};
    products?.forEach(p => {
      const cat = categoryMap.get(p.category_id);
      const catName = cat?.name || "Otros";
      if (!productsByCat[catName]) {
        productsByCat[catName] = [];
      }
      productsByCat[catName].push(p);
    });

    // Crear contexto del sistema
    const systemContext = `Eres un asistente de ventas experto, profesional y amigable de DTodo, una tienda e-commerce cubana especializada en electrónica y electrodomésticos.

## INFORMACIÓN DE LA TIENDA
• Nombre: DTodo
• Productos: Smartphones, electrodomésticos, computadoras, accesorios
• Cobertura: Entrega en las 15 provincias de Cuba
• Pago: Aceptamos tarjetas de crédito/débito vía Stripe (seguro y confiable)
• Garantía: Todos los productos tienen garantía del fabricante
• Envío: Coordinamos envíos rápidos y seguros

## CATÁLOGO ACTUAL (${products?.length || 0} productos en stock)
${Object.entries(productsByCat).map(([catName, prods]) => `
### ${catName} (${prods.length} productos)
${prods.slice(0, 10).map(p => `• ${p.name} - ${p.brand}
  Precio: $${p.base_price} USD | Stock: ${p.stock_quantity} unidades
  ${p.description || 'Producto de alta calidad'}`).join('\n')}`).join('\n')}

## TU PERSONALIDAD
• Eres profesional pero cercano - hablas de forma natural y amigable
• Eres experto en tecnología - conoces detalles técnicos de los productos
• Eres consultivo - haces preguntas para entender las necesidades del cliente
• Eres honesto - si no tienes un producto, ofreces alternativas similares
• Eres eficiente - das respuestas concisas pero completas (máximo 150 palabras)

## GUÍA DE RESPUESTAS

1. **Consultas de productos:**
   - Proporciona precio, características clave, disponibilidad
   - Menciona beneficios específicos para el cliente
   - Si hay varias opciones, pregunta sobre el presupuesto y necesidades

2. **Comparaciones:**
   - Destaca diferencias principales (precio, características, marca)
   - Recomienda según el mejor valor o necesidades específicas
   - Sé objetivo y honesto

3. **Disponibilidad y envío:**
   - Confirma stock en tiempo real
   - Menciona que enviamos a toda Cuba
   - Explica que el cliente puede elegir su provincia al hacer el pedido

4. **Precios y pagos:**
   - Los precios están en USD pero aceptamos pago en CUP según tasa de cambio
   - El pago es 100% seguro vía Stripe
   - Aceptamos todas las tarjetas principales

5. **Consultas generales:**
   - Responde con información de la tienda
   - Ofrece ayuda adicional
   - Guía hacia una venta si es apropiado

## IMPORTANTE
• SIEMPRE responde en español
• NUNCA inventes productos que no están en el catálogo
• SIEMPRE usa precios actuales del catálogo
• Si no sabes algo, sé honesto y ofrece alternativas
• Mantén un tono conversacional y natural
• Adáptate al estilo del cliente (formal/informal)`;

    // Preparar mensajes para la API
    const messages: Message[] = [
      { role: "system", content: systemContext },
      ...conversationHistory.slice(-8), // Últimos 8 mensajes para contexto
      { role: "user", content: message },
    ];

    // Llamar a DeepSeek con reintentos
    console.log(`[${sessionId}] Llamando a DeepSeek API...`);
    const assistantResponse = await retryWithBackoff(
      () => callDeepSeekAPI(messages),
      3, // 3 reintentos
      1000 // 1 segundo de delay inicial
    );

    console.log(`[${sessionId}] Respuesta generada exitosamente`);

    // Guardar en cache preguntas comunes (menos de 50 caracteres)
    if (message.length < 50 && !message.toLowerCase().includes("mi") && !message.toLowerCase().includes("yo")) {
      await supabase
        .from("chat_response_cache")
        .upsert({
          query_hash: queryHash,
          response: assistantResponse,
          metadata: { message_length: message.length },
        }, { onConflict: "query_hash" })
        .then(() => console.log(`[${sessionId}] Respuesta guardada en caché`));
    }

    // Guardar conversación si hay sessionId
    if (sessionId) {
      const newMessages = [
        ...conversationHistory,
        { role: "user", content: message },
        { role: "assistant", content: assistantResponse },
      ];

      await supabase
        .from("chat_conversations")
        .upsert({
          session_id: sessionId,
          user_id: userId || null,
          messages: newMessages,
          updated_at: new Date().toISOString(),
        }, { onConflict: "session_id" })
        .then(() => console.log(`[${sessionId}] Conversación guardada`));
    }

    return new Response(
      JSON.stringify({
        response: assistantResponse,
        conversationId: sessionId || crypto.randomUUID(),
        cached: false,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en ai-chatbot function:", error);
    
    // Determinar tipo de error y dar respuesta apropiada
    let errorMessage = "Lo siento, hubo un problema. Por favor, inténtalo de nuevo.";
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes("DeepSeek")) {
        errorMessage = "Temporalmente no puedo conectar con el servicio de IA. Por favor, inténtalo en unos momentos.";
        statusCode = 503;
      } else if (error.message.includes("timeout")) {
        errorMessage = "La solicitud tardó demasiado. Por favor, inténtalo de nuevo.";
        statusCode = 504;
      }
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        technical_error: error instanceof Error ? error.message : "Error desconocido"
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});