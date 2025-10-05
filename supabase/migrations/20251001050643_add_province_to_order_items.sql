/*
  # Add Province Tracking to Order Items

  ## Overview
  Adds province information to order items to track where products are being sold.
  This allows us to:
  - Identify which provinces have the most sales for each product
  - Display products with prices from their best-selling province
  - Provide better analytics for regional performance

  ## Changes

  ### 1. New Columns in order_items
  - `province_id` (text): The province where the order was placed
  - `province_name` (text): Human-readable province name for easy reference

  ### 2. New Columns in products
  - `stock` (integer): Global stock quantity for product availability checks
  - `base_price` (numeric): Base price for products without regional pricing
  - `original_price` (numeric): Optional original price for showing discounts

  ## Notes
  - Province information is captured at order time from the delivery address
  - Stock tracking helps filter out unavailable products from best sellers
  - These changes maintain backward compatibility with existing data
*/

-- Add province tracking to order_items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'province_id'
  ) THEN
    ALTER TABLE order_items ADD COLUMN province_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'province_name'
  ) THEN
    ALTER TABLE order_items ADD COLUMN province_name text;
  END IF;
END $$;

-- Add stock and pricing columns to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stock'
  ) THEN
    ALTER TABLE products ADD COLUMN stock integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'base_price'
  ) THEN
    ALTER TABLE products ADD COLUMN base_price numeric(10,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'original_price'
  ) THEN
    ALTER TABLE products ADD COLUMN original_price numeric(10,2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'rating'
  ) THEN
    ALTER TABLE products ADD COLUMN rating numeric(2,1) DEFAULT 4.5;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'reviews_count'
  ) THEN
    ALTER TABLE products ADD COLUMN reviews_count integer DEFAULT 0;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_order_items_province_id ON order_items(province_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_province ON order_items(product_id, province_id);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock) WHERE stock > 0;
