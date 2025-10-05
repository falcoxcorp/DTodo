/*
  # Agregar todas las provincias de Cuba a la tabla regions

  ## Descripción
  Inserta todas las 16 provincias de Cuba en la tabla regions con sus códigos correspondientes
  para soportar precios regionales en el sistema.

  ## Provincias agregadas
  - Pinar del Río (pinar-del-rio)
  - Artemisa (artemisa)
  - La Habana (la-habana)
  - Mayabeque (mayabeque)
  - Matanzas (matanzas)
  - Villa Clara (villa-clara)
  - Cienfuegos (cienfuegos)
  - Sancti Spíritus (sancti-spiritus)
  - Ciego de Ávila (ciego-de-avila)
  - Camagüey (camaguey)
  - Las Tunas (las-tunas)
  - Holguín (holguin)
  - Granma (granma)
  - Santiago de Cuba (santiago-de-cuba)
  - Guantánamo (guantanamo)
  - Isla de la Juventud (isla-de-la-juventud)

  ## Notas
  - Los códigos coinciden con los IDs usados en el sistema de provincias del frontend
  - Se usa INSERT ... ON CONFLICT para evitar duplicados
*/

-- Limpiar tabla existente
DELETE FROM regional_pricing;
DELETE FROM regions;

-- Insertar todas las provincias de Cuba
INSERT INTO regions (name, code) VALUES
  ('Pinar del Río', 'pinar-del-rio'),
  ('Artemisa', 'artemisa'),
  ('La Habana', 'la-habana'),
  ('Mayabeque', 'mayabeque'),
  ('Matanzas', 'matanzas'),
  ('Villa Clara', 'villa-clara'),
  ('Cienfuegos', 'cienfuegos'),
  ('Sancti Spíritus', 'sancti-spiritus'),
  ('Ciego de Ávila', 'ciego-de-avila'),
  ('Camagüey', 'camaguey'),
  ('Las Tunas', 'las-tunas'),
  ('Holguín', 'holguin'),
  ('Granma', 'granma'),
  ('Santiago de Cuba', 'santiago-de-cuba'),
  ('Guantánamo', 'guantanamo'),
  ('Isla de la Juventud', 'isla-de-la-juventud')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name;
