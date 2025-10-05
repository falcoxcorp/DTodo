/*
  # Sistema de Roles de Administrador

  ## Descripción
  Agrega sistema de roles para administradores que pueden gestionar productos, inventario y categorías.

  ## Cambios

  1. Nueva columna en profiles
    - `role` (text) - Rol del usuario: 'user' o 'admin'
    - Default: 'user'

  2. Función helper para verificar admin
    - `is_admin()` - Retorna true si el usuario actual es admin

  3. Políticas RLS actualizadas
    - Solo admins pueden INSERT/UPDATE/DELETE en products
    - Solo admins pueden INSERT/UPDATE/DELETE en categories
    - Solo admins pueden INSERT/UPDATE en inventory
    - Usuarios normales solo pueden SELECT (leer)

  4. Trigger para asignar rol inicial
    - Nuevo usuario = 'user' por defecto
    - Primer usuario registrado = 'admin' automáticamente

  ## Notas
  - Para hacer admin a un usuario manualmente: UPDATE profiles SET role = 'admin' WHERE id = 'user_id';
  - Los admins tienen acceso completo a toda la gestión de productos
*/

-- Agregar columna role a profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Función para verificar si el usuario actual es admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$;

-- Trigger para hacer admin al primer usuario
CREATE OR REPLACE FUNCTION set_first_user_as_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  IF user_count = 0 THEN
    NEW.role := 'admin';
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS make_first_user_admin ON profiles;
CREATE TRIGGER make_first_user_admin
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_first_user_as_admin();

-- Actualizar políticas de products
DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON products;

CREATE POLICY "Only admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (is_admin());

-- Actualizar políticas de categories
DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON categories;

CREATE POLICY "Only admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (is_admin());

-- Actualizar políticas de inventory
DROP POLICY IF EXISTS "Allow authenticated users to insert inventory" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated users to update inventory" ON inventory;

CREATE POLICY "Only admins can insert inventory"
  ON inventory FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update inventory"
  ON inventory FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete inventory"
  ON inventory FOR DELETE
  TO authenticated
  USING (is_admin());

-- Política para que los usuarios puedan leer inventory públicamente
CREATE POLICY "Anyone can read inventory"
  ON inventory FOR SELECT
  TO public
  USING (true);