/**
 * Configuración de fuente de datos para productos
 * Centraliza la configuración de dónde obtener los productos
 */

// ============================================
// CONFIGURACIÓN PRINCIPAL
// ============================================

/**
 * Define la fuente de datos para los productos
 * - "local": Usa productConstants.js (datos estáticos)
 * - "shopify": Usa API de Shopify (requiere configuración)
 * 
 * IMPORTANTE: Cambiar a "shopify" cuando tengas acceso a la API configurada
 */
export const PRODUCT_DATA_SOURCE = process.env.PRODUCT_DATA_SOURCE || "local";

/**
 * URL del endpoint de productos de Shopify
 * Solo se usa cuando PRODUCT_DATA_SOURCE = "shopify"
 */
export const SHOPIFY_PRODUCTS_API_ENDPOINT = "/api/shopify/products";

/**
 * Tiempo de caché para productos de Shopify (en milisegundos)
 * 5 minutos por defecto
 */
export const PRODUCTS_CACHE_TIME = 5 * 60 * 1000;

/**
 * Habilitar fallback a datos locales si Shopify falla
 */
export const ENABLE_FALLBACK = true;

// ============================================
// CONFIGURACIÓN DE METAFIELDS
// ============================================

/**
 * Nombres de metafields usados en Shopify para información nutricional
 */
export const SHOPIFY_METAFIELDS = {
  KCAL_PER_KG: "nutrition.kcal_per_kg",
  PROTEIN: "nutrition.protein",
  FAT: "nutrition.fat",
  FIBER: "nutrition.fiber",
  // Agregar más metafields según necesites
};

// ============================================
// CONFIGURACIÓN DE TAGS
// ============================================

/**
 * Tags de Shopify que ayudan a identificar productos
 */
export const PRODUCT_TAGS = {
  PERRO: ["dog", "perro"],
  GATO: ["cat", "gato"],
  SECO: ["dry", "seco"],
  HUMEDO: ["wet", "húmedo", "humedo", "lata"],
  CACHORRO: ["puppy", "cachorro", "kitten"],
  ADULTO: ["adult", "adulto"],
  SENIOR: ["senior"],
  LIGHT: ["light"],
  ESTERILIZADO: ["sterilized", "esterilizado"],
  SMALL_BITE: ["small-bite", "croqueta-pequeña"],
  REGULAR_BITE: ["regular-bite", "croqueta-regular"],
};

// ============================================
// CONFIGURACIÓN DE LOGGING
// ============================================

/**
 * Habilitar logs detallados para debugging
 */
export const ENABLE_PRODUCT_LOGS = process.env.NODE_ENV === "development";

/**
 * Helper para logs condicionales
 */
export function logProductInfo(message, data) {
  if (ENABLE_PRODUCT_LOGS) {
    console.log(`[ProductService] ${message}`, data);
  }
}

// ============================================
// HELPERS
// ============================================

/**
 * Verifica si estamos usando la API de Shopify
 */
export function isUsingShopifyAPI() {
  return PRODUCT_DATA_SOURCE === "shopify";
}

/**
 * Verifica si estamos usando datos locales
 */
export function isUsingLocalData() {
  return PRODUCT_DATA_SOURCE === "local";
}

/**
 * Obtiene información sobre la configuración actual
 */
export function getProductSourceInfo() {
  return {
    source: PRODUCT_DATA_SOURCE,
    usingShopify: isUsingShopifyAPI(),
    usingLocal: isUsingLocalData(),
    fallbackEnabled: ENABLE_FALLBACK,
    cacheTime: PRODUCTS_CACHE_TIME,
  };
}
