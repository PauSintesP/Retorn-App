import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

/**
 * Ruta de diagnóstico para listar todos los productos de Shopify
 * Muestra Product IDs, Variant IDs, nombres, segmentos, etc.
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
    
    // Mapear productos a un formato más legible
    const productList = products.map(product => ({
      productId: product.id,
      title: product.title,
      handle: product.handle,
      productType: product.product_type,
      tags: product.tags || [],
      variants: product.variants.map(variant => ({
        variantId: variant.id,
        title: variant.title,
        sku: variant.sku,
        price: variant.price,
      })),
    }));
    
    return {
      success: true,
      count: productList.length,
      products: productList,
    };
    
  } catch (error) {
    console.error("[List Products] Error:", error);
    return {
      success: false,
      error: error.message,
      products: [],
    };
  }
};

export default function ListProducts() {
  const data = useLoaderData();
  
  if (!data.success) {
    return (
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>❌ Error al cargar productos</h1>
        <p style={{ color: "red" }}>{data.error}</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "12px" }}>
      <h1>📦 Listado de Productos de Shopify</h1>
      <p><strong>Total productos:</strong> {data.count}</p>
      
      <hr style={{ margin: "20px 0" }} />
      
      {data.products.map((product, index) => (
        <div key={product.productId} style={{ 
          marginBottom: "30px", 
          padding: "15px", 
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}>
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ fontSize: "14px", color: "#2563eb" }}>
              {index + 1}. {product.title}
            </strong>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "8px" }}>
            <div><strong>Product ID:</strong></div>
            <div style={{ color: "#059669", fontWeight: "bold" }}>{product.productId}</div>
            
            <div><strong>Handle:</strong></div>
            <div>{product.handle}</div>
            
            <div><strong>Product Type:</strong></div>
            <div>{product.productType}</div>
            
            <div><strong>Tags:</strong></div>
            <div>{Array.isArray(product.tags) ? product.tags.join(", ") : product.tags}</div>
          </div>
          
          <div style={{ marginTop: "15px" }}>
            <strong>Variantes ({product.variants.length}):</strong>
            <div style={{ 
              marginTop: "8px", 
              backgroundColor: "white", 
              padding: "10px",
              borderRadius: "4px"
            }}>
              {product.variants.map((variant, vIndex) => (
                <div key={variant.variantId} style={{ 
                  padding: "6px 0",
                  borderBottom: vIndex < product.variants.length - 1 ? "1px solid #eee" : "none"
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px", fontSize: "11px" }}>
                    <div><strong>Variant ID:</strong></div>
                    <div style={{ color: "#dc2626", fontWeight: "bold" }}>{variant.variantId}</div>
                    
                    <div><strong>Título:</strong></div>
                    <div>{variant.title}</div>
                    
                    <div><strong>SKU:</strong></div>
                    <div>{variant.sku || "N/A"}</div>
                    
                    <div><strong>Precio:</strong></div>
                    <div>{variant.price}€</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <hr style={{ margin: "30px 0" }} />
      
      <div style={{ 
        padding: "15px", 
        backgroundColor: "#fef3c7",
        borderRadius: "8px",
        border: "1px solid #fbbf24"
      }}>
        <h3 style={{ marginTop: 0 }}>💡 Cómo usar esta información:</h3>
        <ol style={{ marginBottom: 0 }}>
          <li><strong>Product ID</strong> (verde): Usar en <code>productIdMapping.js</code> para identificar productos</li>
          <li><strong>Variant ID</strong> (rojo): Usar en <code>productVariantMapping.js</code> para forzar variantes específicas</li>
          <li>Puedes copiar los IDs y pegarlos directamente en tus archivos de configuración</li>
        </ol>
      </div>
    </div>
  );
}
