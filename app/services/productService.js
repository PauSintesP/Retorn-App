/**
 * Servicio de productos - Abstrae la fuente de datos (local o API Shopify)
 * Permite cambiar fácilmente entre datos estáticos y API sin modificar el código de negocio
 */

import { PRODUCTOS as PRODUCTOS_LOCAL } from "../data/productConstants";
import { mapShopifyProductsToLocal } from "./shopifyProductAdapter";
import { 
  isUsingShopifyAPI, 
  ENABLE_FALLBACK, 
  SHOPIFY_PRODUCTS_API_ENDPOINT,
  PRODUCTS_CACHE_TIME,
  logProductInfo 
} from "../config/productConfig";

// Cache simple en memoria para productos de Shopify
let productsCache = null;
let cacheTimestamp = null;

/**
 * Obtiene todos los productos desde la API de Shopify
 * @returns {Promise<Object>} Objeto con todos los productos en el formato local
 */
export async function getProducts() {
  // Verificar si tenemos cache válido
  if (productsCache && cacheTimestamp && (Date.now() - cacheTimestamp < PRODUCTS_CACHE_TIME)) {
    logProductInfo("Using cached products from Shopify");
    return productsCache;
  }
  
  try {
    logProductInfo("Fetching products from Shopify API");
    const shopifyProducts = await fetchShopifyProducts();
    const mappedProducts = mapShopifyProductsToLocal(shopifyProducts);
    
    // Actualizar cache
    productsCache = mappedProducts;
    cacheTimestamp = Date.now();
    
    const productCount = Object.keys(mappedProducts).length;
    
    logProductInfo("Products fetched successfully from Shopify", { 
      total: productCount
    });
    
    console.log(`✅ ${productCount} productos cargados desde Shopify API`);
    
    return mappedProducts;
    
  } catch (error) {
    console.error("❌ Error fetching from Shopify API:", error);
    
    if (ENABLE_FALLBACK) {
      console.warn("⚠️ FALLBACK ACTIVADO: Usando datos locales hardcodeados (esto NO debería pasar en producción)");
      console.warn("⚠️ Por favor, verifica tu conexión a Shopify y las credenciales");
      return PRODUCTOS_LOCAL;
    }
    
    throw new Error(`No se pudieron cargar los productos de Shopify: ${error.message}`);
  }
}

/**
 * Obtiene un producto específico por su clave
 * @param {string} productKey - Clave del producto (ej: "PERRO_ADULT_POLLO")
 * @returns {Promise<Object|null>} Producto o null si no existe
 */
export async function getProductByKey(productKey) {
  const products = await getProducts();
  return products[productKey] || null;
}

/**
 * Busca productos por filtros
 * @param {Object} filters - Filtros a aplicar
 * @param {string} filters.animal - "Perro" o "Gato"
 * @param {string} filters.tipo - "Seco" o "Humedo"
 * @param {string} filters.segmento - Segmento del producto
 * @returns {Promise<Array>} Array de productos que cumplen los filtros
 */
export async function findProducts(filters = {}) {
  const products = await getProducts();
  const productsArray = Object.values(products);
  
  return productsArray.filter(product => {
    if (filters.animal && product.animal !== filters.animal) return false;
    if (filters.tipo && product.tipo !== filters.tipo) return false;
    if (filters.segmento && product.segmento !== filters.segmento) return false;
    return true;
  });
}

/**
 * Función para obtener productos desde la API de Shopify
 * @returns {Promise<Array>} Array de productos de Shopify
 */
async function fetchShopifyProducts() {
  // Verificar si tenemos las variables de entorno necesarias
  const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;
  const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  
  if (!shopifyStoreUrl || !shopifyAccessToken) {
    throw new Error("Missing Shopify credentials. Please set SHOPIFY_STORE_URL and SHOPIFY_ACCESS_TOKEN in your .env file");
  }
  
  // Construir la URL de la API de Shopify Admin REST
  const apiUrl = `https://${shopifyStoreUrl}/admin/api/2025-01/products.json?limit=250`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyAccessToken,
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  
  if (!data.products) {
    throw new Error("Invalid response from Shopify API - no products field");
  }
  
  return data.products;
}

/**
 * Limpia el cache de productos
 * Útil cuando se actualizan productos en Shopify
 */
export function clearProductsCache() {
  productsCache = null;
  cacheTimestamp = null;
  logProductInfo("Products cache cleared");
}

/**
 * Obtiene información del cache actual
 * @returns {Object} Información del cache
 */
export function getCacheInfo() {
  return {
    hasCache: productsCache !== null,
    cacheAge: cacheTimestamp ? Date.now() - cacheTimestamp : null,
    isValid: productsCache && cacheTimestamp && (Date.now() - cacheTimestamp < PRODUCTS_CACHE_TIME),
  };
}

/**
 * Obtiene la fuente de datos actual
 * @returns {string} "shopify" o "local"
 */
export function getCurrentDataSource() {
  return isUsingShopifyAPI() ? "shopify" : "local";
}
