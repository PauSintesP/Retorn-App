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
      31708495183938, // Comida Húmeda para Cachorros (Puppy) Cordero y Pollo 185gr
      31708495216706, // Pack 12ud - Comida Húmeda para Cachorros
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Cordero",
    productIds: [
      6751012257975, // Comida Húmeda para Perros de Cordero con Arroz
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Pollo",
    productIds: [
      6751009210551, // Comida Húmeda para Perros de Pollo con Zanahoria y Conejo
      6750994235559, // Comida Húmeda para Perros de Pollo con Zanahoria
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Humedo",
    segmento: "Adulto Pescado",
    productIds: [
      6751006752955, // Comida Húmeda para Perros de Pescado con Patata y Zanahoria
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
      6750823940267, // Comida Húmeda para Gatitos de Pollo
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Humedo",
    segmento: "Adulto Pollo",
    productIds: [
      6750811062439, // Comida Húmeda para Gatos de Pollo con Zanahoria
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Humedo",
    segmento: "Adulto Pescado",
    productIds: [
      6750819942583, // Comida Húmeda para Gatos de Pescado con Zanahoria
      6750817124519, // Comida Húmeda para Gatos de Atún con Mejillones
      6750814830759, // Comida Húmeda para Gatos de Atún con Sardina
      6750812471463, // Comida Húmeda para Gatos de Atún con Gambas
      6751014387911, // Comida Húmeda para Gatos de Salmón con Atún
    ]
  },
  
  // ========================================
  // MIXTA (SECO + HÚMEDO)
  // ========================================
  
  // Perros - Mixta (devuelve ambos tipos: seco Y húmedo)
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Pollo",
    productIds: [
      1303216783426, // Pienso seco Pollo
      4500505952322, // Pienso seco Pollo - Croqueta Pequeña
      6751009210551, // Latas Pollo con Zanahoria y Conejo
      6750994235559, // Latas Pollo con Zanahoria
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Cordero",
    productIds: [
      1303265804354, // Pienso seco Cordero
      4500503134274, // Pienso seco Cordero - Croqueta Pequeña
      6751012257975, // Latas Cordero con Arroz
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Salmón",
    productIds: [
      1303212752962, // Pienso seco Salmón
      649056944194,  // Pienso seco Salmón - Croqueta pequeña
      6751006752955, // Latas Pescado con Patata y Zanahoria (para salmón)
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Adulto Pescado",
    productIds: [
      1303212752962, // Pienso seco Salmón (default para pescado)
      649056944194,  // Pienso seco Salmón - Croqueta pequeña
      6751006752955, // Latas Pescado con Patata y Zanahoria
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Cachorros",
    productIds: [
      1303206658114, // Pienso seco Cachorros de Salmón
      31708495183938, // Latas Puppy Cordero y Pollo 185gr
      31708495216706, // Pack 12ud Latas Puppy
    ]
  },
  
  {
    animal: "Perro",
    tipo: "Mixta",
    segmento: "Senior Light",
    productIds: [
      1303298474050, // Pienso seco Light & Senior
      6751006752955, // Latas Pescado (compatible con light/senior)
    ]
  },
  
  // Gatos - Mixta
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Cachorros",
    productIds: [
      7530696016089, // Pienso seco
      6750823940267, // Latas
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Adulto Pollo",
    productIds: [
      7530661085401, // Pienso seco
      6750811062439, // Latas
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Adulto Pescado",
    productIds: [
      7530636017881, // Pienso seco
      6750819942583, // Latas atún
      6750817124519, // Latas mejillones
      6750814830759, // Latas sardina
      6750812471463, // Latas gambas
      6751014387911, // Latas salmón
    ]
  },
  
  {
    animal: "Gato",
    tipo: "Mixta",
    segmento: "Esterilizados Light",
    productIds: [
      7530676453593, // Pienso seco Esterilizados
      6750811062439, // Latas Pollo con Zanahoria (compatible con esterilizados)
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
