/**
 * BASE DE DATOS ULTRA-LIGERA: Solo IDs de productos
 * Mapea las respuestas del cuestionario → IDs de productos en Shopify
 * 
 * Estructura:
 * {
 *   animal: "Perro" | "Gato",
 *   tipo: "Seco" | "Humedo" | "Mixta",
 *   segmento: "Cachorros" | "Adulto Pollo" | "Senior Light" | etc.,
 *   productIds: [1303298474050, 1303206658114, ...] // IDs de productos en Shopify
 * }
 */

export const PRODUCT_ID_MAPPING = [
  // ========================================
  // PERROS - PIENSO SECO
  // ========================================
  
  // Cachorros
  {
    animal: "Perro",
    tipo: "Seco",
    segmento: "Cachorros",
    productIds: [
      1303206658114, // Pienso Natural para Cachorros de Salmón
    ]
  },
  
  // Adultos - Pollo
  {
    animal: "Perro",
    tipo: "Seco",
    segmento: "Adulto Pollo",
    productIds: [
      1303216783426, // Pienso Natural para Perros de Pollo
      4500505952322, // Pienso Natural para Perros de Pollo - Croqueta Pequeña
    ]
  },
  
  // Adultos - Cordero
  {
    animal: "Perro",
    tipo: "Seco",
    segmento: "Adulto Cordero",
    productIds: [
      1303265804354, // Pienso Natural para Perros de Cordero
      4500503134274, // Pienso Natural para Perros de Cordero - Croqueta Pequeña
    ]
  },
  
  // Adultos - Salmón
  {
    animal: "Perro",
    tipo: "Seco",
    segmento: "Adulto Salmón",
    productIds: [
      1303212752962, // Pienso Natural para Perros de Salmón
      649056944194,  // Pienso Natural para Perros de Salmón Noruego - Croqueta pequeña
    ]
  },
  
  // Senior / Light
  {
    animal: "Perro",
    tipo: "Seco",
    segmento: "Senior Light",
    productIds: [
      1303298474050, // Pienso Natural de Salmón para Perros Light & Senior
    ]
  },
  
  // ========================================
  // PERROS - COMIDA HÚMEDA
  // ========================================
  
  // Cachorros
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Cachorros",
    productIds: [
      4478516494402, // Comida Húmeda para Cachorros de Cordero y Pollo
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Cordero",
    productIds: [
      1445571788866, // Comida Húmeda para Perros de Cordero con Arroz
      1665418526786, // Comida Húmeda para Perros Only Cordero
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Pollo",
    productIds: [
      1445558648898, // Comida Húmeda para Perros de Pollo con Zanahorias
      1664867696706, // Comida Húmeda para Perros Only Pollo
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Pescado",
    productIds: [
      1697823129666, // Comida Húmeda para Perros de Pescado con Zanahorias
    ]
  },
  
  // ========================================
  // GATOS - PIENSO SECO
  // ========================================
  
  // Cachorros (Kittens)
  {
    animal: "Gato",
    tipo: "Seco",
    segmento: "Cachorros",
    productIds: [
      7530696016089, // Pienso para Gatitos
    ]
  },
  
  // Adultos - Pollo
  {
    animal: "Gato",
    tipo: "Seco",
    segmento: "Adulto Pollo",
    productIds: [
      7530661085401, // Pienso para Gatos de Pollo
    ]
  },
  
  // Adultos - Pescado
  {
    animal: "Gato",
    tipo: "Seco",
    segmento: "Adulto Pescado",
    productIds: [
      7530636017881, // Pienso para Gatos de Pescado
    ]
  },
  
  // Esterilizados
  {
    animal: "Gato",
    tipo: "Seco",
    segmento: "Esterilizados Light",
    productIds: [
      7530676453593, // Pienso para Gatos Esterilizados
    ]
  },
  
  // ========================================
  // GATOS - COMIDA HÚMEDA
  // ========================================
  
  {
    animal: "Gato",
    tipo: "Humedo",
    segmento: "Cachorros",
    productIds: [
      7440749658329, // Comida Húmeda para Gatitos de Pollo
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Humedo",
    segmento: "Adulto Pollo",
    productIds: [
      1445586436162, // Comida Húmeda para Gatos de Pollo
      1445611077698, // Comida Húmeda para Gatos de Pollo con Conejo
      1445639815234, // Comida Húmeda para Gatos de Vacuno con Pollo
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Humedo",
    segmento: "Adulto Pescado",
    productIds: [
      1445627297858, // Comida Húmeda para Gatos de Atún con Gambas
      1445615730754, // Comida Húmeda para Gatos de Atún con Mejillones
      1445633556546, // Comida Húmeda para Gatos de Atún con Salmón
      1445635555394, // Comida Húmeda para Gatos de Atún con Sardina
      4503341695042, // Comida Húmeda de Filetes de Atún natural con Calamar para Gatos
      4503340908610, // Comida Húmeda de Filetes de Atún natural con Gambas para Gatos
      6123769004215, // Comida Húmeda de Filetes de Atún natural con Mejillones para Gatos
      4445143072834, // Comida Húmeda de Filetes de Atún natural con Salmón para Gatos
      4503334420546, // Comida Húmeda de Filetes de Atún natural para Gatos
    ]
  },
  
  // ========================================
  // MIXTA (SECO + HÚMEDO)
  // ========================================
  
  // Perros - Mixta (devuelve ambos tipos: seco Y húmedo)
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Cachorros",
    productIds: [
      1303206658114, // Pienso seco Cachorros Salmón
      4478516494402, // Latas Cachorros Cordero y Pollo
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Pollo",
    productIds: [
      1303216783426, // Pienso seco Pollo
      4500505952322, // Pienso seco Pollo - Croqueta Pequeña
      1445558648898, // Latas Pollo con Zanahorias
      1664867696706, // Latas Only Pollo
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Cordero",
    productIds: [
      1303265804354, // Pienso seco Cordero
      4500503134274, // Pienso seco Cordero - Croqueta Pequeña
      1445571788866, // Latas Cordero con Arroz
      1665418526786, // Latas Only Cordero
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Salmón",
    productIds: [
      1303212752962, // Pienso seco Salmón
      649056944194,  // Pienso seco Salmón - Croqueta pequeña
      1697823129666, // Latas Pescado con Zanahorias (PRIORIDAD)
      1445560811586, // Latas Pescado con Patatas
      4503345004610, // Latas Atún con Boniato
      4503343530050, // Latas Atún con Calabaza
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Pescado",
    productIds: [
      1303212752962, // Pienso seco Salmón (default para pescado)
      649056944194,  // Pienso seco Salmón - Croqueta pequeña
      1697823129666, // Latas Pescado con Zanahorias (PRIORIDAD)
      1445560811586, // Latas Pescado con Patatas
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Senior Light",
    productIds: [
      1303298474050, // Pienso seco Light & Senior
      1697823129666, // Latas Pescado con Zanahorias (PRIORIDAD)
      1445560811586, // Latas Pescado con Patatas
    ]
  },
  
  // Gatos - Mixta
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Cachorros",
    productIds: [
      7530696016089, // Pienso seco Gatitos
      7440749658329, // Latas Gatitos Pollo
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Adulto Pollo",
    productIds: [
      7530661085401, // Pienso seco Gatos Pollo
      1445586436162, // Latas Pollo
      1445611077698, // Latas Pollo con Conejo
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Adulto Pescado",
    productIds: [
      7530636017881, // Pienso seco Gatos Pescado
      1445627297858, // Latas Atún con Gambas
      1445615730754, // Latas Atún con Mejillones
      1445633556546, // Latas Atún con Salmón
      1445635555394, // Latas Atún con Sardina
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Esterilizados Light",
    productIds: [
      7530676453593, // Pienso seco Gatos Esterilizados
      1445586436162, // Latas Pollo
    ]
  },
];

/**
 * Obtiene los IDs de productos que coinciden con las respuestas del usuario
 * @param {string} animal - "Perro" o "Gato"
 * @param {string} tipo - "Seco", "Humedo" o "Mixta"
 * @param {string} segmento - "Cachorros", "Adulto Pollo", etc.
 * @returns {Array<number>} Array de IDs de productos en Shopify
 */
export function getProductIds(animal, tipo, segmento) {
  const match = PRODUCT_ID_MAPPING.find(
    mapping => 
      mapping.animal === animal && 
      mapping.tipo === tipo && 
      mapping.segmento === segmento
  );
  
  return match ? match.productIds : [];
}
