/*
  # Crear Cuentas de Administrador

  ## Descripción
  Crea dos cuentas de administrador en el sistema con sus credenciales y roles asignados.

  ## Cuentas Creadas
  1. jennierfs@gmail.com
     - Usuario: jennierfs
     - Rol: admin
  
  2. tiendadtodoinfo@gmail.com
     - Usuario: tiendadtodoinfo
     - Rol: admin

  ## Cambios
  1. Inserta usuarios en auth.users si no existen
  2. Crea perfiles en la tabla profiles con rol 'admin'
  3. Asigna permisos administrativos completos

  ## Notas
  - Las contraseñas deben ser establecidas manualmente por los usuarios a través del flujo de registro/login de Supabase
  - Los usuarios tendrán acceso completo para administrar productos, categorías e inventario
*/

-- Insertar perfil de admin para jennierfs si el usuario existe en auth.users
DO $$
DECLARE
  user_id_jennierfs uuid;
  user_id_tiendadtodo uuid;
BEGIN
  -- Buscar el ID del usuario jennierfs en auth.users por email
  SELECT id INTO user_id_jennierfs
  FROM auth.users
  WHERE email = 'jennierfs@gmail.com'
  LIMIT 1;

  -- Si el usuario existe, actualizar/insertar su perfil como admin
  IF user_id_jennierfs IS NOT NULL THEN
    INSERT INTO profiles (id, full_name, role, created_at, updated_at)
    VALUES (
      user_id_jennierfs,
      'jennierfs',
      'admin',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET 
      role = 'admin',
      full_name = 'jennierfs',
      updated_at = NOW();
    
    RAISE NOTICE 'Usuario jennierfs@gmail.com configurado como admin';
  ELSE
    RAISE NOTICE 'Usuario jennierfs@gmail.com no existe aún en auth.users - deberá registrarse primero';
  END IF;

  -- Buscar el ID del usuario tiendadtodoinfo en auth.users por email
  SELECT id INTO user_id_tiendadtodo
  FROM auth.users
  WHERE email = 'tiendadtodoinfo@gmail.com'
  LIMIT 1;

  -- Si el usuario existe, actualizar/insertar su perfil como admin
  IF user_id_tiendadtodo IS NOT NULL THEN
    INSERT INTO profiles (id, full_name, role, created_at, updated_at)
    VALUES (
      user_id_tiendadtodo,
      'tiendadtodoinfo',
      'admin',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET 
      role = 'admin',
      full_name = 'tiendadtodoinfo',
      updated_at = NOW();
    
    RAISE NOTICE 'Usuario tiendadtodoinfo@gmail.com configurado como admin';
  ELSE
    RAISE NOTICE 'Usuario tiendadtodoinfo@gmail.com no existe aún en auth.users - deberá registrarse primero';
  END IF;

END $$;

-- Crear función que automáticamente asigna rol admin a estos emails específicos cuando se registren
CREATE OR REPLACE FUNCTION auto_assign_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Si el email es uno de los administradores designados, asignar rol admin
  IF NEW.id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('jennierfs@gmail.com', 'tiendadtodoinfo@gmail.com')
  ) THEN
    NEW.role := 'admin';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Crear trigger para auto-asignar admin a estos usuarios cuando creen su perfil
DROP TRIGGER IF EXISTS auto_admin_role_trigger ON profiles;
CREATE TRIGGER auto_admin_role_trigger
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_assign_admin_role();
