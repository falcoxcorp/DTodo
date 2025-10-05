/*
  # Agregar información del cliente a órdenes

  1. Cambios en la tabla `orders`
    - Agregar `customer_name` (text) - Nombre completo del cliente
    - Agregar `customer_email` (text) - Email del cliente
    - Agregar `customer_phone` (text) - Teléfono del cliente
    - Agregar `shipping_address` (text) - Dirección de envío
    - Agregar `shipping_city` (text) - Ciudad de envío
    - Agregar `shipping_province` (text) - Provincia de envío
    - Agregar `shipping_municipality` (text) - Municipio de envío
    
  2. Notas
    - Estos campos permiten guardar información del cliente directamente en la orden
    - Facilita el procesamiento de órdenes sin autenticación
    - La información se envía a Stripe como metadata
*/

-- Agregar columnas de información del cliente a orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_name'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_email'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'shipping_address'
  ) THEN
    ALTER TABLE orders ADD COLUMN shipping_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'shipping_city'
  ) THEN
    ALTER TABLE orders ADD COLUMN shipping_city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'shipping_province'
  ) THEN
    ALTER TABLE orders ADD COLUMN shipping_province text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'shipping_municipality'
  ) THEN
    ALTER TABLE orders ADD COLUMN shipping_municipality text;
  END IF;
END $$;

-- Hacer que user_id sea opcional (para órdenes sin autenticación)
DO $$
BEGIN
  ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;