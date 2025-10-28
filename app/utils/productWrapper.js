/**
 * Wrapper para obtener productos de forma síncrona o asíncrona
 * Mantiene compatibilidad con el código existente
 */

import { getProducts, getProductByKey } from "../services/productService";
import { PRODUCTOS as PRODUCTOS_LOCAL } from "../data/productConstants";
import { isUsingLocalData } from "../config/productConfig";

// Cache local para acceso síncrono
let _cachedProducts = null;

/**
 * Inicializa el cache de productos
 * DEBE llamarse antes de usar las funciones síncronas
 * @returns {Promise<void>}
 */
export async function initializeProducts() {
  if (isUsingLocalData()) {
    _cachedProducts = PRODUCTOS_LOCAL;
    return;
  }
  
  try {
    _cachedProducts = await getProducts();
  } catch (error) {
    console.error("Error initializing products:", error);
    _cachedProducts = PRODUCTOS_LOCAL; // Fallback
  }
}

/**
 * Obtiene todos los productos (versión síncrona)
 * Requiere que initializeProducts() haya sido llamado previamente
 * @returns {Object} Productos en formato local
 */
export function getProductsSync() {
  if (!_cachedProducts) {
    console.warn("Products not initialized, using local data");
    return PRODUCTOS_LOCAL;
  }
  return _cachedProducts;
}

/**
 * Obtiene un producto por clave (versión síncrona)
 * @param {string} key - Clave del producto
 * @returns {Object|null} Producto o null
 */
export function getProductByKeySync(key) {
  const products = getProductsSync();
  return products[key] || null;
}

/**
 * Obtiene todos los productos (versión asíncrona)
 * @returns {Promise<Object>} Productos en formato local
 */
export async function getProductsAsync() {
  return await getProducts();
}

/**
 * Obtiene un producto por clave (versión asíncrona)
 * @param {string} key - Clave del producto
 * @returns {Promise<Object|null>} Producto o null
 */
export async function getProductByKeyAsync(key) {
  return await getProductByKey(key);
}

/**
 * Verifica si los productos están inicializados
 * @returns {boolean}
 */
export function areProductsInitialized() {
  return _cachedProducts !== null;
}

/**
 * Limpia el cache local
 */
export function clearLocalCache() {
  _cachedProducts = null;
}

// Exportar por defecto la versión síncrona para compatibilidad
export const PRODUCTOS = new Proxy({}, {
  get(target, prop) {
    const products = getProductsSync();
    return products[prop];
  },
  ownKeys(target) {
    const products = getProductsSync();
    return Object.keys(products);
  },
  has(target, prop) {
    const products = getProductsSync();
    return prop in products;
  },
  getOwnPropertyDescriptor(target, prop) {
    const products = getProductsSync();
    if (prop in products) {
      return {
        enumerable: true,
        configurable: true,
        value: products[prop]
      };
    }
  }
});
