-- Create Seller Applications Table
-- 
-- 1. New Tables
--    - seller_applications
--      - id (uuid, primary key) - Unique identifier for each application
--      - business_name (text) - Name of the business
--      - business_description (text) - Description of the business and products
--      - owner_name (text) - Full name of the business owner
--      - email (text) - Contact email address
--      - phone (text) - Contact phone number
--      - address (text) - Physical address of the business
--      - province (text) - Province/region where business is located
--      - business_type (text) - Type of business (manufacturer, distributor, retailer, etc.)
--      - products_categories (text) - Main product categories they want to sell
--      - monthly_volume (text) - Expected monthly sales volume
--      - website (text, nullable) - Business website if available
--      - status (text) - Application status (pending, approved, rejected)
--      - notes (text, nullable) - Admin notes about the application
--      - user_id (uuid, nullable) - Link to user account if they have one
--      - created_at (timestamptz) - When application was submitted
--      - updated_at (timestamptz) - Last update timestamp
-- 
-- 2. Security
--    - Enable RLS on seller_applications table
--    - Add policy for anyone to submit an application (insert)
--    - Add policy for users to view their own applications
--    - Add policy for admins to view and manage all applications
-- 
-- 3. Important Notes
--    - Applications are public for submission (no auth required)
--    - Users can optionally link their account
--    - Admins can review, approve, or reject applications
--    - Status defaults to 'pending' for new applications

CREATE TABLE IF NOT EXISTS seller_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  business_description text NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  province text NOT NULL,
  business_type text NOT NULL,
  products_categories text NOT NULL,
  monthly_volume text NOT NULL,
  website text,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE seller_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application
CREATE POLICY "Anyone can submit seller application"
  ON seller_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON seller_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Policy: Admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON seller_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can update applications
CREATE POLICY "Admins can update applications"
  ON seller_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can delete applications
CREATE POLICY "Admins can delete applications"
  ON seller_applications FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_seller_applications_status ON seller_applications(status);
CREATE INDEX IF NOT EXISTS idx_seller_applications_email ON seller_applications(email);
CREATE INDEX IF NOT EXISTS idx_seller_applications_created_at ON seller_applications(created_at DESC);