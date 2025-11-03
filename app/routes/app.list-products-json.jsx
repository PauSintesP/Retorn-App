import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

/**
 * Ruta de diagnóstico para listar todos los productos de Shopify en formato JSON
 * Útil para copiar/pegar IDs en archivos de configuración
 * 
 * URL: /app/list-products-json
 */

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  try {
    // Obtener todos los productos con vendor=Retorn
    const response = await admin.rest.resources.Product.all({
      session: admin.session,
      limit: 250,
      vendor: "Retorn",
    });
    
    const products = response.data || [];
    
    // Agrupar por segmento
    const productsBySegment = {};
    
    products.forEach(product => {
      const tags = Array.isArray(product.tags) 
        ? product.tags 
        : (typeof product.tags === 'string' ? product.tags.split(',').map(t => t.trim()) : []);
      
      // Intentar extraer segmento de los tags
      let segmento = "Sin clasificar";
      let tipo = "Desconocido";
      let animal = "Desconocido";
      
      // Detectar tipo
      if (tags.some(tag => tag.toLowerCase().includes('seco'))) {
        tipo = "Seco";
      } else if (tags.some(tag => tag.toLowerCase().includes('húmedo') || tag.toLowerCase().includes('humedo'))) {
        tipo = "Húmedo";
      }
      
      // Detectar animal
      if (tags.some(tag => tag.toLowerCase().includes('perro'))) {
        animal = "Perro";
      } else if (tags.some(tag => tag.toLowerCase().includes('gato'))) {
        animal = "Gato";
      }
      
      // Detectar segmento
      if (tags.some(tag => tag.toLowerCase().includes('cachorro'))) {
        segmento = "Cachorros";
      } else if (tags.some(tag => tag.toLowerCase().includes('senior') || tag.toLowerCase().includes('light'))) {
        segmento = "Senior Light";
      } else if (tags.some(tag => tag.toLowerCase().includes('esterilizado'))) {
        segmento = "Esterilizados Light";
      } else if (tags.some(tag => tag.toLowerCase().includes('adulto'))) {
        // Detectar tipo de proteína
        if (product.title.toLowerCase().includes('pollo')) {
          segmento = "Adulto Pollo";
        } else if (product.title.toLowerCase().includes('cordero')) {
          segmento = "Adulto Cordero";
        } else if (product.title.toLowerCase().includes('salmón') || product.title.toLowerCase().includes('salmon')) {
          segmento = "Adulto Salmón";
        } else if (product.title.toLowerCase().includes('pescado')) {
          segmento = "Adulto Pescado";
        } else {
          segmento = "Adulto";
        }
      }
      
      const key = `${animal} - ${tipo} - ${segmento}`;
      
      if (!productsBySegment[key]) {
        productsBySegment[key] = [];
      }
      
      productsBySegment[key].push({
        productId: product.id,
        title: product.title,
        handle: product.handle,
        productType: product.product_type,
        tags: tags,
        variants: product.variants.map(v => ({
          variantId: v.id,
          title: v.title,
          sku: v.sku,
        })),
      });
    });
    
    return json({
      success: true,
      totalProducts: products.length,
      bySegment: productsBySegment,
      allProducts: products.map(product => ({
        productId: product.id,
        title: product.title,
        handle: product.handle,
        productType: product.product_type,
        tags: product.tags,
        variants: product.variants.map(v => ({
          variantId: v.id,
          title: v.title,
          sku: v.sku,
        })),
      })),
    }, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    
  } catch (error) {
    console.error("[List Products JSON] Error:", error);
    return json({
      success: false,
      error: error.message,
      products: [],
    }, { status: 500 });
  }
};
