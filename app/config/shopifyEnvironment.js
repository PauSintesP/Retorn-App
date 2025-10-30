/**
 * Configuración de Entorno - API de Shopify
 * 
 * Este archivo centraliza la configuración de conexión a Shopify
 * Permite cambiar fácilmente entre desarrollo local y producción
 */

// ============================================
// 🔧 CONFIGURACIÓN PRINCIPAL
// ============================================

/**
 * MODO DE DESARROLLO - HOST
 * Cambia este valor para alternar entre desarrollo local y producción:
 * 
 * - "localhost": Desarrollo local (http://localhost:3000)
 * - "vercel": Producción en Vercel (https://retorn-app.vercel.app)
 * 
 * ⚠️ CAMBIA SOLO ESTA LÍNEA PARA CAMBIAR DE ENTORNO
 * 
 * 🎯 IMPORTANTE: 
 * - Después de cambiar, ejecuta: npm run dev
 * - Shopify CLI automáticamente detectará el cambio
 */
export const DEVELOPMENT_MODE = "localhost"; // 👈 CAMBIA AQUÍ: "localhost" o "vercel"

/**
 * URLs de los diferentes entornos
 */
const HOSTS = {
  localhost: "http://localhost:3000",
  vercel: "https://retorn-app.vercel.app"
};

/**
 * Obtiene la URL del host activo
 */
export const getActiveHost = () => HOSTS[DEVELOPMENT_MODE] || HOSTS.localhost;

/**
 * Verifica si estamos en localhost
 */
export const isLocalhost = () => DEVELOPMENT_MODE === "localhost";

/**
 * Verifica si estamos en Vercel
 */
export const isVercel = () => DEVELOPMENT_MODE === "vercel";

// ============================================
// 📝 CONFIGURACIÓN DE TIENDAS SHOPIFY
// ============================================

// ============================================
// 📝 CONFIGURACIÓN DE TIENDAS SHOPIFY
// ============================================

/**
 * Configuración de la TIENDA REAL de Shopify
 * (De donde obtienes los productos vía API)
 */
const SHOPIFY_CONFIG = {
  SHOPIFY_STORE_URL: process.env.SHOPIFY_STORE_URL || "",
  SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN || "",
  DESCRIPTION: "Tienda Real de Shopify",
};

// ============================================
// 🎯 CONFIGURACIÓN ACTIVA
// ============================================

/**
 * La configuración de Shopify es la misma para ambos entornos
 * Solo cambia el HOST (localhost vs Vercel)
 */
export const ACTIVE_SHOPIFY_CONFIG = SHOPIFY_CONFIG;

/**
 * Helpers para acceder a la configuración activa
 */
export const getShopifyStoreUrl = () => ACTIVE_SHOPIFY_CONFIG.SHOPIFY_STORE_URL;
export const getShopifyAccessToken = () => ACTIVE_SHOPIFY_CONFIG.SHOPIFY_ACCESS_TOKEN;
export const getEnvironmentName = () => DEVELOPMENT_MODE;
export const getEnvironmentDescription = () => `${ACTIVE_SHOPIFY_CONFIG.DESCRIPTION} @ ${getActiveHost()}`;

/**
 * Verifica si las credenciales están configuradas
 */
export const hasShopifyCredentials = () => {
  return Boolean(
    ACTIVE_SHOPIFY_CONFIG.SHOPIFY_STORE_URL && 
    ACTIVE_SHOPIFY_CONFIG.SHOPIFY_ACCESS_TOKEN
  );
};

/**
 * Log de configuración (solo en desarrollo)
 */
export const logCurrentConfig = () => {
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    console.log("\n" + "=".repeat(60));
    console.log("🔧 CONFIGURACIÓN DE SHOPIFY API");
    console.log("=".repeat(60));
    console.log(`📍 Modo: ${DEVELOPMENT_MODE.toUpperCase()}`);
    console.log(`🏪 Entorno: ${ACTIVE_SHOPIFY_CONFIG.DESCRIPTION}`);
    console.log(`🌐 Store URL: ${ACTIVE_SHOPIFY_CONFIG.SHOPIFY_STORE_URL ? '✅ Configurada' : '❌ Falta'}`);
    console.log(`🔑 Access Token: ${ACTIVE_SHOPIFY_CONFIG.SHOPIFY_ACCESS_TOKEN ? '✅ Configurada' : '❌ Falta'}`);
    console.log("=".repeat(60) + "\n");
  }
};

// Ejecutar log al importar (solo en servidor y desarrollo)
if (typeof window === 'undefined') {
  logCurrentConfig();
}
