/**
 * API Pública de Productos - Proxy para Shopify API
 * Este endpoint permite acceder a los productos de Shopify desde el cliente
 * sin exponer las credenciales
 */

import {
  getShopifyStoreUrl,
  getShopifyAccessToken,
  hasShopifyCredentials
} from "../config/shopifyEnvironment";
import { mapShopifyProductsToLocal } from "../services/shopifyProductAdapter";

/**
 * Loader que maneja las peticiones GET a este endpoint
 */
export const loader = async () => {
  try {
    // Verificar que tenemos credenciales configuradas
    if (!hasShopifyCredentials()) {
      return new Response(
        JSON.stringify({
          error: "Missing Shopify credentials"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    const storeUrl = getShopifyStoreUrl();
    const accessToken = getShopifyAccessToken();
    
    // Construir URL de la API de Shopify
    const shopifyApiUrl = `https://${storeUrl}/admin/api/2025-01/products.json?limit=250`;
    
    // Hacer petición a Shopify
    const response = await fetch(shopifyApiUrl, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Shopify API error: ${response.statusText}`
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    const data = await response.json();
    const shopifyProducts = data.products || [];
    
    // Mapear productos al formato local
    const mappedProducts = mapShopifyProductsToLocal(shopifyProducts);
    
    // Devolver productos con cache de 5 minutos
    return new Response(
      JSON.stringify(mappedProducts),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=600"
        }
      }
    );
  } catch (error) {
    console.error("[api.public.products] Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }
};
