import { Province } from '../types/location';

export const provinces: Province[] = [
  {
    id: 'pinar-del-rio',
    name: 'Pinar del Río',
    code: 'PR',
    region: 'Occidente',
    municipalities: [
      { id: 'consolacion-del-sur', name: 'Consolación del Sur', code: 'CS' },
      { id: 'guane', name: 'Guane', code: 'GU' },
      { id: 'la-palma', name: 'La Palma', code: 'LP' },
      { id: 'los-palacios', name: 'Los Palacios', code: 'LPA' },
      { id: 'mantua', name: 'Mantua', code: 'MA' },
      { id: 'minas-de-matahambre', name: 'Minas de Matahambre', code: 'MM' },
      { id: 'pinar-del-rio-city', name: 'Pinar del Río', code: 'PRC' },
      { id: 'san-juan-y-martinez', name: 'San Juan y Martínez', code: 'SJM' },
      { id: 'san-luis', name: 'San Luis', code: 'SL' },
      { id: 'sandino', name: 'Sandino', code: 'SA' },
      { id: 'vinales', name: 'Viñales', code: 'VI' }
    ]
  },
  {
    id: 'artemisa',
    name: 'Artemisa',
    code: 'AR',
    region: 'Occidente',
    municipalities: [
      { id: 'alquizar', name: 'Alquízar', code: 'AL' },
      { id: 'artemisa-city', name: 'Artemisa', code: 'ARC' },
      { id: 'bahia-honda', name: 'Bahía Honda', code: 'BH' },
      { id: 'bauta', name: 'Bauta', code: 'BA' },
      { id: 'caimito', name: 'Caimito', code: 'CA' },
      { id: 'candelaria', name: 'Candelaria', code: 'CD' },
      { id: 'guanajay', name: 'Guanajay', code: 'GJ' },
      { id: 'guira-de-melena', name: 'Güira de Melena', code: 'GM' },
      { id: 'mariel', name: 'Mariel', code: 'MR' },
      { id: 'san-antonio-de-los-banos', name: 'San Antonio de los Baños', code: 'SAB' },
      { id: 'san-cristobal', name: 'San Cristóbal', code: 'SC' }
    ]
  },
  {
    id: 'la-habana',
    name: 'La Habana',
    code: 'LH',
    region: 'Occidente',
    municipalities: [
      { id: 'arroyo-naranjo', name: 'Arroyo Naranjo', code: 'AN' },
      { id: 'boyeros', name: 'Boyeros', code: 'BO' },
      { id: 'centro-habana', name: 'Centro Habana', code: 'CH' },
      { id: 'cerro', name: 'Cerro', code: 'CE' },
      { id: 'cotorro', name: 'Cotorro', code: 'CO' },
      { id: 'diez-de-octubre', name: 'Diez de Octubre', code: 'DO' },
      { id: 'guanabacoa', name: 'Guanabacoa', code: 'GB' },
      { id: 'habana-del-este', name: 'Habana del Este', code: 'HE' },
      { id: 'habana-vieja', name: 'Habana Vieja', code: 'HV' },
      { id: 'la-lisa', name: 'La Lisa', code: 'LL' },
      { id: 'marianao', name: 'Marianao', code: 'MN' },
      { id: 'playa', name: 'Playa', code: 'PL' },
      { id: 'plaza-de-la-revolucion', name: 'Plaza de la Revolución', code: 'PR' },
      { id: 'regla', name: 'Regla', code: 'RG' },
      { id: 'san-miguel-del-padron', name: 'San Miguel del Padrón', code: 'SMP' }
    ]
  },
  {
    id: 'mayabeque',
    name: 'Mayabeque',
    code: 'MY',
    region: 'Occidente',
    municipalities: [
      { id: 'batabano', name: 'Batabanó', code: 'BT' },
      { id: 'bejucal', name: 'Bejucal', code: 'BJ' },
      { id: 'guines', name: 'Güines', code: 'GN' },
      { id: 'jaruco', name: 'Jaruco', code: 'JR' },
      { id: 'madruga', name: 'Madruga', code: 'MD' },
      { id: 'melena-del-sur', name: 'Melena del Sur', code: 'MS' },
      { id: 'nueva-paz', name: 'Nueva Paz', code: 'NP' },
      { id: 'quivican', name: 'Quivicán', code: 'QV' },
      { id: 'san-jose-de-las-lajas', name: 'San José de las Lajas', code: 'SJL' },
      { id: 'san-nicolas', name: 'San Nicolás', code: 'SN' },
      { id: 'santa-cruz-del-norte', name: 'Santa Cruz del Norte', code: 'SCN' }
    ]
  },
  {
    id: 'matanzas',
    name: 'Matanzas',
    code: 'MT',
    region: 'Occidente',
    municipalities: [
      { id: 'calimete', name: 'Calimete', code: 'CL' },
      { id: 'cardenas', name: 'Cárdenas', code: 'CR' },
      { id: 'colon', name: 'Colón', code: 'CN' },
      { id: 'jaguey-grande', name: 'Jagüey Grande', code: 'JG' },
      { id: 'jovellanos', name: 'Jovellanos', code: 'JV' },
      { id: 'limonar', name: 'Limonar', code: 'LI' },
      { id: 'los-arabos', name: 'Los Arabos', code: 'LA' },
      { id: 'martí', name: 'Martí', code: 'MR' },
      { id: 'matanzas-city', name: 'Matanzas', code: 'MTC' },
      { id: 'pedro-betancourt', name: 'Pedro Betancourt', code: 'PB' },
      { id: 'perico', name: 'Perico', code: 'PE' },
      { id: 'union-de-reyes', name: 'Unión de Reyes', code: 'UR' },
      { id: 'varadero', name: 'Varadero', code: 'VR' }
    ]
  },
  {
    id: 'villa-clara',
    name: 'Villa Clara',
    code: 'VC',
    region: 'Centro',
    municipalities: [
      { id: 'caibarien', name: 'Caibarién', code: 'CB' },
      { id: 'camajuani', name: 'Camajuaní', code: 'CM' },
      { id: 'cifuentes', name: 'Cifuentes', code: 'CF' },
      { id: 'corralillo', name: 'Corralillo', code: 'CO' },
      { id: 'encrucijada', name: 'Encrucijada', code: 'EN' },
      { id: 'manicaragua', name: 'Manicaragua', code: 'MN' },
      { id: 'placetas', name: 'Placetas', code: 'PL' },
      { id: 'quemado-de-guines', name: 'Quemado de Güines', code: 'QG' },
      { id: 'ranchuelo', name: 'Ranchuelo', code: 'RN' },
      { id: 'remedios', name: 'Remedios', code: 'RE' },
      { id: 'sagua-la-grande', name: 'Sagua la Grande', code: 'SG' },
      { id: 'santa-clara', name: 'Santa Clara', code: 'SC' },
      { id: 'santo-domingo', name: 'Santo Domingo', code: 'SD' }
    ]
  },
  {
    id: 'cienfuegos',
    name: 'Cienfuegos',
    code: 'CF',
    region: 'Centro',
    municipalities: [
      { id: 'abreus', name: 'Abreus', code: 'AB' },
      { id: 'aguada-de-pasajeros', name: 'Aguada de Pasajeros', code: 'AP' },
      { id: 'cienfuegos-city', name: 'Cienfuegos', code: 'CFC' },
      { id: 'cruces', name: 'Cruces', code: 'CR' },
      { id: 'cumanayagua', name: 'Cumanayagua', code: 'CU' },
      { id: 'palmira', name: 'Palmira', code: 'PA' },
      { id: 'rodas', name: 'Rodas', code: 'RO' },
      { id: 'santa-isabel-de-las-lajas', name: 'Santa Isabel de las Lajas', code: 'SI' }
    ]
  },
  {
    id: 'sancti-spiritus',
    name: 'Sancti Spíritus',
    code: 'SS',
    region: 'Centro',
    municipalities: [
      { id: 'cabaiguan', name: 'Cabaiguán', code: 'CB' },
      { id: 'fomento', name: 'Fomento', code: 'FO' },
      { id: 'jatibonico', name: 'Jatibonico', code: 'JT' },
      { id: 'la-sierpe', name: 'La Sierpe', code: 'LS' },
      { id: 'sancti-spiritus-city', name: 'Sancti Spíritus', code: 'SSC' },
      { id: 'taguasco', name: 'Taguasco', code: 'TG' },
      { id: 'trinidad', name: 'Trinidad', code: 'TR' },
      { id: 'yaguajay', name: 'Yaguajay', code: 'YG' }
    ]
  },
  {
    id: 'ciego-de-avila',
    name: 'Ciego de Ávila',
    code: 'CA',
    region: 'Centro',
    municipalities: [
      { id: 'barrancas', name: 'Baraguá', code: 'BA' },
      { id: 'bolivia', name: 'Bolivia', code: 'BO' },
      { id: 'chambas', name: 'Chambas', code: 'CH' },
      { id: 'ciego-de-avila-city', name: 'Ciego de Ávila', code: 'CAC' },
      { id: 'ciro-redondo', name: 'Ciro Redondo', code: 'CR' },
      { id: 'florencia', name: 'Florencia', code: 'FL' },
      { id: 'majagua', name: 'Majagua', code: 'MJ' },
      { id: 'moron', name: 'Morón', code: 'MO' },
      { id: 'primero-de-enero', name: 'Primero de Enero', code: 'PE' },
      { id: 'venezuela', name: 'Venezuela', code: 'VE' }
    ]
  },
  {
    id: 'camaguey',
    name: 'Camagüey',
    code: 'CM',
    region: 'Centro',
    municipalities: [
      { id: 'camaguey-city', name: 'Camagüey', code: 'CMC' },
      { id: 'carlos-manuel-de-cespedes', name: 'Carlos Manuel de Céspedes', code: 'CC' },
      { id: 'esmeralda', name: 'Esmeralda', code: 'ES' },
      { id: 'florida', name: 'Florida', code: 'FL' },
      { id: 'guaimaro', name: 'Guáimaro', code: 'GM' },
      { id: 'jimaguayu', name: 'Jimaguayú', code: 'JM' },
      { id: 'minas', name: 'Minas', code: 'MI' },
      { id: 'najasa', name: 'Najasa', code: 'NJ' },
      { id: 'nuevitas', name: 'Nuevitas', code: 'NU' },
      { id: 'santa-cruz-del-sur', name: 'Santa Cruz del Sur', code: 'SC' },
      { id: 'sierra-de-cubitas', name: 'Sierra de Cubitas', code: 'SI' },
      { id: 'sibanicu', name: 'Sibancú', code: 'SB' },
      { id: 'vertientes', name: 'Vertientes', code: 'VE' }
    ]
  },
  {
    id: 'las-tunas',
    name: 'Las Tunas',
    code: 'LT',
    region: 'Oriente',
    municipalities: [
      { id: 'amancio', name: 'Amancio', code: 'AM' },
      { id: 'colombia', name: 'Colombia', code: 'CO' },
      { id: 'jesus-menendez', name: 'Jesús Menéndez', code: 'JM' },
      { id: 'jobabo', name: 'Jobabo', code: 'JO' },
      { id: 'las-tunas-city', name: 'Las Tunas', code: 'LTC' },
      { id: 'majibacoa', name: 'Majibacoa', code: 'MJ' },
      { id: 'manatí', name: 'Manatí', code: 'MA' },
      { id: 'puerto-padre', name: 'Puerto Padre', code: 'PP' }
    ]
  },
  {
    id: 'holguin',
    name: 'Holguín',
    code: 'HO',
    region: 'Oriente',
    municipalities: [
      { id: 'antilla', name: 'Antilla', code: 'AN' },
      { id: 'baguanos', name: 'Báguanos', code: 'BG' },
      { id: 'banes', name: 'Banes', code: 'BA' },
      { id: 'cacocum', name: 'Cacocum', code: 'CA' },
      { id: 'calixto-garcia', name: 'Calixto García', code: 'CG' },
      { id: 'cueto', name: 'Cueto', code: 'CU' },
      { id: 'frank-pais', name: 'Frank País', code: 'FP' },
      { id: 'gibara', name: 'Gibara', code: 'GI' },
      { id: 'holguin-city', name: 'Holguín', code: 'HOC' },
      { id: 'mayari', name: 'Mayarí', code: 'MY' },
      { id: 'moa', name: 'Moa', code: 'MO' },
      { id: 'rafael-freyre', name: 'Rafael Freyre', code: 'RF' },
      { id: 'sagua-de-tanamo', name: 'Sagua de Tánamo', code: 'ST' },
      { id: 'urbano-noris', name: 'Urbano Noris', code: 'UN' }
    ]
  },
  {
    id: 'granma',
    name: 'Granma',
    code: 'GR',
    region: 'Oriente',
    municipalities: [
      { id: 'bartolome-maso', name: 'Bartolomé Masó', code: 'BM' },
      { id: 'bayamo', name: 'Bayamo', code: 'BA' },
      { id: 'buey-arriba', name: 'Buey Arriba', code: 'BR' },
      { id: 'campechuela', name: 'Campechuela', code: 'CA' },
      { id: 'cauto-cristo', name: 'Cauto Cristo', code: 'CC' },
      { id: 'guisa', name: 'Guisa', code: 'GU' },
      { id: 'jiguani', name: 'Jiguaní', code: 'JI' },
      { id: 'manzanillo', name: 'Manzanillo', code: 'MZ' },
      { id: 'media-luna', name: 'Media Luna', code: 'ML' },
      { id: 'niquero', name: 'Niquero', code: 'NI' },
      { id: 'pilon', name: 'Pilón', code: 'PI' },
      { id: 'rio-cauto', name: 'Río Cauto', code: 'RC' },
      { id: 'yara', name: 'Yara', code: 'YA' }
    ]
  },
  {
    id: 'santiago-de-cuba',
    name: 'Santiago de Cuba',
    code: 'SC',
    region: 'Oriente',
    municipalities: [
      { id: 'contramaestre', name: 'Contramaestre', code: 'CO' },
      { id: 'guama', name: 'Guamá', code: 'GU' },
      { id: 'mella', name: 'Mella', code: 'ME' },
      { id: 'palma-soriano', name: 'Palma Soriano', code: 'PS' },
      { id: 'san-luis', name: 'San Luis', code: 'SL' },
      { id: 'santiago-de-cuba-city', name: 'Santiago de Cuba', code: 'SCC' },
      { id: 'segundo-frente', name: 'Segundo Frente', code: 'SF' },
      { id: 'songo-la-maya', name: 'Songo-La Maya', code: 'SM' },
      { id: 'tercer-frente', name: 'Tercer Frente', code: 'TF' }
    ]
  },
  {
    id: 'guantanamo',
    name: 'Guantánamo',
    code: 'GT',
    region: 'Oriente',
    municipalities: [
      { id: 'baracoa', name: 'Baracoa', code: 'BA' },
      { id: 'caimanera', name: 'Caimanera', code: 'CA' },
      { id: 'el-salvador', name: 'El Salvador', code: 'ES' },
      { id: 'guantanamo-city', name: 'Guantánamo', code: 'GTC' },
      { id: 'imias', name: 'Imías', code: 'IM' },
      { id: 'maisi', name: 'Maisí', code: 'MA' },
      { id: 'manuel-tames', name: 'Manuel Tames', code: 'MT' },
      { id: 'niceto-perez', name: 'Niceto Pérez', code: 'NP' },
      { id: 'san-antonio-del-sur', name: 'San Antonio del Sur', code: 'SA' },
      { id: 'yateras', name: 'Yateras', code: 'YA' }
    ]
  },
  {
    id: 'isla-de-la-juventud',
    name: 'Isla de la Juventud',
    code: 'IJ',
    region: 'Especial',
    municipalities: [
      { id: 'isla-de-la-juventud-city', name: 'Nueva Gerona', code: 'NG' }
    ]
  }
];
