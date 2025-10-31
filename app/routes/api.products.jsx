/**
 * API Route para obtener productos desde Shopify (para uso público)
 * Este endpoint puede ser llamado desde el cliente sin autenticación
 * 
 * Soporta dos modos:
 * 1. Sin parámetros: Obtiene todos los productos (vendor=Retorn)
 * 2. Con IDs: /api/products?ids=123&ids=456 → Obtiene solo esos productos específicos
 */

/**
 * Loader: Obtiene productos desde Shopify y los devuelve en formato JSON
 */
export async function loader({ request }) {
  try {
    const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;
    const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    
    if (!shopifyStoreUrl || !shopifyAccessToken) {
      console.error("Missing Shopify credentials in server environment");
      return Response.json({
        success: false,
        error: "Server configuration error: Missing Shopify credentials",
        products: [],
      }, { status: 500 });
    }
    
    // Extraer parámetros de IDs de la URL
    const url = new URL(request.url);
    const productIds = url.searchParams.getAll('ids');
    
    let apiUrl;
    
    if (productIds && productIds.length > 0) {
      // Modo 1: Obtener productos específicos por IDs
      console.log(`[API Products] Fetching specific products by IDs:`, productIds);
      
      // Shopify API acepta múltiples IDs con "ids" separados por coma
      const idsParam = productIds.join(',');
      apiUrl = `https://${shopifyStoreUrl}/admin/api/2025-01/products.json?ids=${idsParam}`;
      
    } else {
      // Modo 2: Obtener todos los productos (vendor=Retorn)
      console.log(`[API Products] Fetching all products (vendor=Retorn)`);
      apiUrl = `https://${shopifyStoreUrl}/admin/api/2025-01/products.json?limit=250&vendor=Retorn`;
    }
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopifyAccessToken,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Products] Shopify API error: ${response.status}`, errorText);
      return Response.json({
        success: false,
        error: `Shopify API error: ${response.status} ${response.statusText}`,
        products: [],
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    if (!data.products) {
      console.error("[API Products] Invalid response from Shopify - no products field");
      return Response.json({
        success: false,
        error: "Invalid response from Shopify API",
        products: [],
      }, { status: 500 });
    }
    
    console.log(`[API Products] Successfully fetched ${data.products.length} products`);
    
    return Response.json({
      success: true,
      products: data.products,
      count: data.products.length,
    });
    
  } catch (error) {
    console.error("[API Products] Error:", error);
    return Response.json({
      success: false,
      error: error.message,
      products: [],
    }, { status: 500 });
  }
}
