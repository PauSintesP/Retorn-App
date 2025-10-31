/**
 * Servicio de productos - Sistema híbrido ultra-ligero
 */

import { getProductIds } from "../data/productIdMapping.js";

export async function getRecommendedProducts(animal, tipo, segmento) {
  console.log('[ProductService] Buscando productos para:', animal, tipo, segmento);
  
  const productIds = getProductIds(animal, tipo, segmento);
  
  if (!productIds || productIds.length === 0) {
    console.warn('[ProductService] No se encontraron IDs');
    return [];
  }
  
  console.log('[ProductService] IDs encontrados:', productIds);
  
  const products = await fetchProductsByIds(productIds);
  
  console.log('[ProductService] Productos obtenidos:', products.length);
  
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
      console.error('[ProductService] Error:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.success || !data.products) {
      console.error('[ProductService] Respuesta inválida');
      return [];
    }
    
    return data.products;
    
  } catch (error) {
    console.error('[ProductService] Error:', error);
    return [];
  }
}

export async function fetchProductById(productId) {
  const products = await fetchProductsByIds([productId]);
  return products.length > 0 ? products[0] : null;
}
