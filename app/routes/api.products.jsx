/**
 * API Route para obtener productos desde Shopify (para uso público)
 * Este endpoint puede ser llamado desde el cliente sin autenticación
 */

/**
 * Loader: Obtiene productos desde Shopify y los devuelve en formato JSON
 */
export async function loader() {
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
    
    // Construir la URL de la API de Shopify Admin REST
    const apiUrl = `https://${shopifyStoreUrl}/admin/api/2025-01/products.json?limit=250`;
    
    console.log(`[API Products] Fetching from Shopify: ${shopifyStoreUrl}`);
    
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
