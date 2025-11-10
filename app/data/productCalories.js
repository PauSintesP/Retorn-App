/**
 * BASE DE DATOS DE CALORÍAS POR PRODUCTO
 * Mapea SKU y Variant ID → kcal EM/kg
 * 
 * Fuente: Calculadora Manual DEFINITIVA.xlsx - Productos.csv
 * Última actualización: Noviembre 2025
 */

export const PRODUCT_CALORIES_BY_SKU = {
  // ========================================
  // PERROS - PIENSO SECO
  // ========================================
  
  // CACHORROS - SALMON (3451 kcal/kg)
  "RET005000": 3451,
  "RET00503": 3451,
  "RET0051": 3451,
  "RET0052": 3451,
  
  // LIGHT & SENIOR - SALMON (3453 kcal/kg)
  "RET006500": 3453,
  "RET00603": 3453,
  "RET0062": 3453,
  "RET0063": 3453,
  
  // ADULTO POLLO (3674 kcal/kg)
  "RETAP500": 3674,
  "RETAP03": 3674,
  "RETAP12": 3674,
  "RETAP20": 3674,
  "RETAP500S": 3674,  // Small Bite
  "RETAP03S": 3674,   // Small Bite
  "RETAP12S": 3674,   // Small Bite
  
  // ADULTO CORDERO (3440 kcal/kg)
  "RET0033500": 3440,
  "RET00333": 3440,
  "RET0032": 3440,
  "RET0030": 3440,
  "RET0033500S": 3440,  // Small Bite
  "RET00333S": 3440,    // Small Bite
  "RET0032S": 3440,     // Small Bite
  
  // ADULTO SALMON (3327 kcal/kg)
  "RET002500": 3327,
  "RET00203": 3327,
  "RET0022": 3327,
  "RET0023": 3327,
  "RET002500S": 3327,  // Small Bite
  "RET00203S": 3327,   // Small Bite
  "RET0022S": 3327,    // Small Bite
  
  // ========================================
  // GATOS - PIENSO SECO
  // ========================================
  
  // ADULTO PESCADO (3686 kcal/kg)
  "RET501500": 3686,
  "RET501": 3686,
  "RET5018": 3686,
  
  // ADULTO POLLO (4070 kcal/kg)
  "RET502500": 4070,
  "RET502": 4070,
  "RET5028": 4070,
  
  // LIGHT ESTERILIZADOS (3940 kcal/kg)
  "RET503500": 3940,
  "RET503": 3940,
  "RET5038": 3940,
  
  // KITTEN (4173 kcal/kg)
  "RET500500": 4173,
  "RET500": 4173,
  "RET5008": 4173,
  
  // ========================================
  // GATOS - COMIDA HÚMEDA (80gr)
  // ========================================
  
  // KITTEN POLLO (871 kcal/kg)
  "RET4529K": 871,
  "RET4529KC": 871,
  
  // POLLO (971 kcal/kg)
  "RET4529": 971,
  "RET4529C": 971,
  "RET4529C24": 971,
  
  // POLLO CON CONEJO (943 kcal/kg)
  "RET4530": 943,
  "RET4530C": 943,
  "RET4530C24": 943,
  
  // ATUN CON MEJILLONES (656 kcal/kg)
  "RET4535": 656,
  "RET4535C": 656,
  "RET4535C24": 656,
  
  // ATUN CON SARDINA (704 kcal/kg)
  "RET4536": 704,
  "RET4536C": 704,
  "RET4536C24": 704,
  
  // ATUN CON SALMON (746 kcal/kg)
  "RET4537": 746,
  "RET4537C24": 746,
  
  // ATUN CON GAMBAS (653 kcal/kg)
  "RET4538": 653,
  "RET4538C": 653,
  "RET4538C24": 653,
  
  // ========================================
  // PERROS - COMIDA HÚMEDA
  // ========================================
  
  // CORDERO CON ARROZ (896 kcal/kg)
  "RET479801E": 896,
  "RET4798014E": 896,
  
  // ONLY CORDERO (920 kcal/kg)
  "RET479805E": 920,
  "RET4798054": 920,
  
  // POLLO CON ZANAHORIAS (854 kcal/kg)
  "RET479803E": 854,
  "RET4798034E": 854,
  
  // ONLY POLLO (962 kcal/kg)
  "RET479806E": 962,
  "RET4798064E": 962,
  
  // PESCADO CON ZANAHORIA (1090 kcal/kg)
  "RET479807E": 1090,
  "RET4798074": 1090,
  
  // PESCADO CON PATATAS (966 kcal/kg)
  "RET479802E": 966,
  
  // PUPPY CORDERO Y POLLO (1265 kcal/kg)
  "RET479808E": 1265,
};

// Mapeo por Variant ID → kcal/kg
export const PRODUCT_CALORIES_BY_VARIANT_ID = {
  // ========================================
  // PERROS - PIENSO SECO
  // ========================================
  
  // CACHORROS - SALMON
  43289910542553: 3451,  // 500gr
  42813746315481: 3451,  // 3kg
  12167525924930: 3451,  // 6kg y 12kg
  
  // LIGHT & SENIOR
  43289889013977: 3453,  // 500gr
  12167962591298: 3453,  // 3kg
  12167962656834: 3453,  // 12kg
  12167962689602: 3453,  // 20kg
  
  // ADULTO POLLO
  43289754370265: 3674,  // 500gr
  12167859863618: 3674,  // 3kg
  42655252512985: 3674,  // 12kg
  42655252545753: 3674,  // 20kg
  43289754337497: 3674,  // 500gr Small Bite
  42173524246745: 3674,  // 3kg Small Bite
  43161357779161: 3674,  // 12kg Small Bite
  
  // ADULTO CORDERO
  43289746342105: 3440,  // 500gr
  42655137169625: 3440,  // 3kg
  42655137267929: 3440,  // 12kg
  42655137300697: 3440,  // 20kg
  43289746309337: 3440,  // 500gr Small Bite
  42655137530073: 3440,  // 3kg Small Bite
  43161352339673: 3440,  // 12kg Small Bite
  
  // ADULTO SALMON
  43289875513561: 3327,  // 500gr
  42651916140761: 3327,  // 3kg
  42651916173529: 3327,  // 12kg
  42651916206297: 3327,  // 20kg
  43289875480793: 3327,  // 500gr Small Bite
  43387689959641: 3327,  // 3kg Small Bite
  43161301516505: 3327,  // 12kg Small Bite
  
  // ========================================
  // GATOS - PIENSO SECO
  // ========================================
  
  // ADULTO PESCADO
  43289984827609: 3686,  // 500gr
  42413789053145: 3686,  // 2kg
  43568574202073: 3686,  // 8kg
  
  // ADULTO POLLO
  43289965068505: 4070,  // 500gr
  42413796983001: 4070,  // 2kg
  43568576463065: 4070,  // 8kg
  
  // LIGHT ESTERILIZADOS
  43289957662937: 3940,  // 500gr
  42413798064345: 3940,  // 2kg
  43568580690137: 3940,  // 8kg
  
  // KITTEN
  43290069303513: 4173,  // 500gr
  42413796458713: 4173,  // 2kg
  43568572661977: 4173,  // 8kg
  
  // ========================================
  // GATOS - COMIDA HÚMEDA
  // ========================================
  
  // KITTEN POLLO
  42037603729625: 871,   // 80gr
  42037603762393: 871,   // 80gr x 18
  49479598047571: 871,   // 80gr x 24
  
  // POLLO
  12632988188738: 971,   // 80gr
  14243705159746: 971,   // 80gr x 18
  49139872891219: 971,   // 80gr x 24
  
  // POLLO CON CONEJO
  12633061228610: 943,   // 80gr
  14243707453506: 943,   // 80gr x 18
  49139879051603: 943,   // 80gr x 24
  
  // ATUN CON MEJILLONES
  14243686580290: 656,   // 80gr y 80gr x 18
  49139897893203: 656,   // 80gr x 24
  
  // ATUN CON SARDINA
  49139894681939: 704,   // 80gr y 80gr x 24
  14243698737218: 704,   // 80gr x 18
  
  // ATUN CON SALMON
  12633123782722: 746,   // 80gr
  48154989461843: 746,   // 80gr x 24
  
  // ATUN CON GAMBAS
  14092976554050: 653,   // 80gr
  14242700132418: 653,   // 80gr x 18
  48155011350867: 653,   // 80gr x 24
  
  // ========================================
  // PERROS - COMIDA HÚMEDA
  // ========================================
  
  // CORDERO CON ARROZ
  12632940478530: 896,   // 185gr
  14250706075714: 896,   // 185gr x 12
  14102309306434: 896,   // 400gr
  14250709057602: 896,   // 400gr x 12
  
  // ONLY CORDERO
  13839214772290: 920,   // 185gr
  14250754048066: 920,   // 185gr x 12
  15962371194946: 920,   // 400gr
  15982942421058: 920,   // 400gr x 12
  
  // POLLO CON ZANAHORIAS
  37988511940791: 854,   // 185gr
  37988515152055: 854,   // 185gr x 12
  14102317400130: 854,   // 400gr
  14250742546498: 854,   // 400gr x 12
  
  // ONLY POLLO
  13837300170818: 962,   // 185gr
  14250757816386: 962,   // 185gr x 12
  14102298001474: 962,   // 400gr
  14250760896578: 962,   // 400gr x 12
  
  // PESCADO CON ZANAHORIA
  14030012350530: 1090,  // 185gr
  14250733207618: 1090,  // 185gr x 12
  15982645084226: 1090,  // 400gr
  15982921744450: 1090,  // 400gr x 12
  
  // PESCADO CON PATATAS
  12632863277122: 966,   // 185gr
  14250724851778: 966,   // 185gr x 12
  
  // PUPPY CORDERO Y POLLO
  31708495183938: 1265,  // 185gr
  31708495216706: 1265,  // 185gr x 12
};

/**
 * Obtiene las calorías de un producto por SKU
 * @param {string} sku - El SKU del producto
 * @returns {number|null} - kcal/kg o null si no se encuentra
 */
export function getCaloriesBySku(sku) {
  return PRODUCT_CALORIES_BY_SKU[sku] || null;
}

/**
 * Obtiene las calorías de un producto por Variant ID
 * @param {number} variantId - El ID de la variante del producto
 * @returns {number|null} - kcal/kg o null si no se encuentra
 */
export function getCaloriesByVariantId(variantId) {
  return PRODUCT_CALORIES_BY_VARIANT_ID[variantId] || null;
}

/**
 * Enriquece un objeto de producto de Shopify con información de calorías
 * @param {Object} variant - Variante del producto de Shopify
 * @returns {Object} - Variante enriquecida con campo 'calories'
 */
export function enrichVariantWithCalories(variant) {
  const calories = getCaloriesByVariantId(variant.id) || getCaloriesBySku(variant.sku);
  
  return {
    ...variant,
    calories: calories,
    caloriesPerKg: calories, // Alias para mayor claridad
  };
}

/**
 * Enriquece un producto completo con calorías en todas sus variantes
 * @param {Object} product - Producto de Shopify con variantes
 * @returns {Object} - Producto enriquecido
 */
export function enrichProductWithCalories(product) {
  if (!product.variants || !Array.isArray(product.variants)) {
    return product;
  }
  
  return {
    ...product,
    variants: product.variants.map(enrichVariantWithCalories),
  };
}
