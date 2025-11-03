/**
 * Servicio de productos - Sistema híbrido ultra-ligero
 */

import { getProductIds } from "../data/productIdMapping.js";
import { mapShopifyProductsToLocal } from "./shopifyProductAdapter.js";
import { getProductSourceInfo } from "../config/productConfig.js";

export async function getRecommendedProducts(animal, tipo, segmento) {
  const productIds = getProductIds(animal, tipo, segmento);
  
  if (!productIds || productIds.length === 0) {
    return [];
  }
  
  const products = await fetchProductsByIds(productIds);
  
  return products;
}

async function fetchProductsByIds(productIds) {
  if (!productIds || productIds.length === 0) {
    return [];
  }
  
  try {
    const idsQuery = productIds.map(id => 'ids=' + id).join('&');
    const response = await fetch('/api/products?' + idsQuery);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (!data.success || !data.products) {
      return [];
    }
    
    return data.products;
    
  } catch (error) {
    return [];
  }
}

export async function fetchProductById(productId) {
  const products = await fetchProductsByIds([productId]);
  return products.length > 0 ? products[0] : null;
}

// ======================================================
// Compat helpers for diagnostics page
// ======================================================

/**
 * Obtiene todos los productos (vendor=Retorn) y los mapea al formato local.
 * Usado por la ruta de diagnóstico.
 */
export async function getProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      return {};
    }
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];
    const mapped = mapShopifyProductsToLocal(products);
    return mapped;
  } catch (e) {
    return {};
  }
}

/**
 * Fuente de datos actual en formato simple para UI de diagnóstico.
 */
export function getCurrentDataSource() {
  const info = getProductSourceInfo();
  return info.source; // 'shopify'
}

/**
 * Información de cache (placeholder sin cache persistente por ahora).
 */
export function getCacheInfo() {
  return {
    hasCache: false,
    isValid: false,
    cacheAge: 0,
  };
}
