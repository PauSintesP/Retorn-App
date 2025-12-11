/**
 * API Proxy para agregar productos al carrito de Shopify
 * Evita problemas de CORS al hacer la llamada desde el servidor
 */

export async function action({ request }) {
  try {
    const { items, shopDomain } = await request.json();

    console.log('🔄 Proxy: Agregando productos al carrito de Shopify...');
    console.log('  🏪 Shop:', shopDomain);
    console.log('  📦 Items:', items.length);

    // Hacer la petición a Shopify desde el servidor (no hay CORS aquí)
    const response = await fetch(`https://${shopDomain}/cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Shopify:', errorText);
      throw new Error(`Shopify error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Productos agregados exitosamente');

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('❌ Error en proxy add-to-cart:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
