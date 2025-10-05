/*
  # Sistema de Conversaciones del Chatbot AI

  1. Nueva Tabla: `chat_conversations`
    - `id` (uuid, primary key) - ID único de la conversación
    - `user_id` (uuid, nullable) - ID del usuario autenticado (null para anónimos)
    - `session_id` (text) - ID de sesión para usuarios no autenticados
    - `messages` (jsonb) - Array de mensajes en formato JSON
    - `metadata` (jsonb) - Información adicional (productos consultados, etc.)
    - `created_at` (timestamptz) - Fecha de creación
    - `updated_at` (timestamptz) - Última actualización

  2. Nueva Tabla: `chat_response_cache`
    - `id` (uuid, primary key) - ID único del cache
    - `query_hash` (text, unique) - Hash del query para búsqueda rápida
    - `response` (text) - Respuesta cacheada
    - `created_at` (timestamptz) - Fecha de creación
    - `expires_at` (timestamptz) - Fecha de expiración

  3. Seguridad
    - RLS habilitado en ambas tablas
    - Usuarios pueden ver solo sus propias conversaciones
    - Cache es de solo lectura para usuarios
*/

-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  messages jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at DESC);

-- Tabla de cache de respuestas
CREATE TABLE IF NOT EXISTS chat_response_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash text UNIQUE NOT NULL,
  response text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours')
);

-- Índice para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_chat_cache_query_hash ON chat_response_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_chat_cache_expires_at ON chat_response_cache(expires_at);

-- Función para limpiar cache expirado
CREATE OR REPLACE FUNCTION clean_expired_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM chat_response_cache WHERE expires_at < now();
END;
$$;

-- RLS para chat_conversations
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON chat_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all conversations"
  ON chat_conversations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS para chat_response_cache
ALTER TABLE chat_response_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cache"
  ON chat_response_cache FOR SELECT
  TO authenticated, anon
  USING (expires_at > now());

CREATE POLICY "Service role can manage cache"
  ON chat_response_cache FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);