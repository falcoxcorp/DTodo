/*
  # Agregar campos de producto a order_items

  1. Cambios en la tabla `order_items`
    - Agregar `product_name` (text) - Nombre del producto
    - Agregar `product_brand` (text) - Marca del producto
    - Agregar `product_image` (text) - URL de la imagen del producto
    
  2. Notas
    - Estos campos permiten mantener un snapshot de la información del producto
    - Útil para mostrar detalles de órdenes incluso si el producto cambia o se elimina
*/

-- Agregar columnas de información del producto a order_items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'product_name'
  ) THEN
    ALTER TABLE order_items ADD COLUMN product_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'product_brand'
  ) THEN
    ALTER TABLE order_items ADD COLUMN product_brand text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'product_image'
  ) THEN
    ALTER TABLE order_items ADD COLUMN product_image text;
  END IF;
END $$;