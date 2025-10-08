/*
  # Add Product Tracking Fields

  1. Changes to `products` table
    - Add `discount_percentage` (numeric) - Percentage discount for weekly deals
    - Add `is_weekly_deal` (boolean) - Flag for weekly deal products
    - Add `sales_count` (integer) - Track total number of sales
    - Add `created_at` (timestamptz) - Track when product was added
    - Add `updated_at` (timestamptz) - Track last update

  2. Changes to `order_items` table
    - Add trigger to increment sales_count when order is completed

  3. Function
    - Create function to update product sales count
    - Create trigger to auto-update sales count on order completion
*/

-- Add new columns to products table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE products ADD COLUMN discount_percentage numeric DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_weekly_deal'
  ) THEN
    ALTER TABLE products ADD COLUMN is_weekly_deal boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'sales_count'
  ) THEN
    ALTER TABLE products ADD COLUMN sales_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE products ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE products ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create function to increment product sales count
CREATE OR REPLACE FUNCTION increment_product_sales()
RETURNS TRIGGER AS $$
BEGIN
  -- Only increment if the order status is 'delivered'
  IF EXISTS (
    SELECT 1 FROM orders 
    WHERE id = NEW.order_id 
    AND status = 'delivered'
  ) THEN
    UPDATE products 
    SET sales_count = sales_count + NEW.quantity
    WHERE id = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on order_items
DROP TRIGGER IF EXISTS trigger_increment_product_sales ON order_items;
CREATE TRIGGER trigger_increment_product_sales
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION increment_product_sales();

-- Create function to increment sales when order status changes to delivered
CREATE OR REPLACE FUNCTION increment_sales_on_order_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'delivered' AND OLD.status IS DISTINCT FROM 'delivered' THEN
    UPDATE products p
    SET sales_count = sales_count + oi.quantity
    FROM order_items oi
    WHERE oi.order_id = NEW.id
    AND p.id = oi.product_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on orders table for status change
DROP TRIGGER IF EXISTS trigger_increment_sales_on_completion ON orders;
CREATE TRIGGER trigger_increment_sales_on_completion
  AFTER UPDATE ON orders
  FOR EACH ROW
  WHEN (NEW.status = 'delivered' AND OLD.status IS DISTINCT FROM 'delivered')
  EXECUTE FUNCTION increment_sales_on_order_completion();

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_is_weekly_deal ON products(is_weekly_deal) WHERE is_weekly_deal = true;
CREATE INDEX IF NOT EXISTS idx_products_sales_count ON products(sales_count DESC);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);