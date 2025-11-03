import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

/**
 * Herramienta para extraer Product IDs correctos y generar el productIdMapping.js
 */

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  try {
    const response = await admin.rest.resources.Product.all({
      session: admin.session,
      limit: 250,
      vendor: "Retorn",
    });
    
    const products = response.data || [];
    
    // Agrupar productos por clasificación
    const mappingData = {};
    
    products.forEach(product => {
      const tags = Array.isArray(product.tags) 
        ? product.tags 
        : (typeof product.tags === 'string' ? product.tags.split(',').map(t => t.trim().toLowerCase()) : []);
      
      const title = (product.title || "").toLowerCase();
      const productType = (product.product_type || "").toLowerCase();
      
      // Detectar tipo de alimento
      let tipo = "Desconocido";
      if (productType.includes('seco') || productType.includes('pienso')) {
        tipo = "Seco";
      } else if (productType.includes('húmedo') || productType.includes('humedo') || 
                 productType.includes('latas') || title.includes('lata') || title.includes('pack')) {
        tipo = "Húmedo";
      }
      
      // Detectar animal
      let animal = "Desconocido";
      if (tags.some(tag => tag.includes('perro')) || title.includes('perro') || title.includes('dog')) {
        animal = "Perro";
      } else if (tags.some(tag => tag.includes('gato')) || title.includes('gato') || title.includes('gatito') || title.includes('cat')) {
        animal = "Gato";
      }
      
      // Detectar segmento
      let segmento = "Sin clasificar";
      
      if (title.includes('cachorro') || title.includes('puppy') || title.includes('gatito') || title.includes('kitten')) {
        segmento = "Cachorros";
      } else if (title.includes('senior') || title.includes('light')) {
        if (animal === "Gato" && (title.includes('esterilizado') || title.includes('sterilized'))) {
          segmento = "Esterilizados Light";
        } else {
          segmento = "Senior Light";
        }
      } else if (title.includes('esterilizado') || title.includes('sterilized')) {
        segmento = "Esterilizados Light";
      } else if (title.includes('adulto') || title.includes('adult')) {
        // Detectar tipo de proteína para adultos
        if (title.includes('pollo') || title.includes('chicken')) {
          segmento = "Adulto Pollo";
        } else if (title.includes('cordero') || title.includes('lamb')) {
          segmento = "Adulto Cordero";
        } else if (title.includes('salmón') || title.includes('salmon')) {
          segmento = "Adulto Salmón";
        } else if (title.includes('pescado') || title.includes('fish')) {
          segmento = "Adulto Pescado";
        } else {
          segmento = "Adulto";
        }
      }
      
      const key = `${animal} ${tipo} ${segmento}`;
      
      if (!mappingData[key]) {
        mappingData[key] = {
          animal,
          tipo,
          segmento,
          productIds: [],
          products: []
        };
      }
      
      mappingData[key].productIds.push(product.id.toString());
      mappingData[key].products.push({
        id: product.id.toString(),
        title: product.title,
        handle: product.handle,
      });
    });
    
    return {
      success: true,
      mappingData,
    };
    
  } catch (error) {
    console.error("[Extract Product IDs] Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default function ExtractProductIds() {
  const data = useLoaderData();
  
  if (!data.success) {
    return (
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>❌ Error</h1>
        <p style={{ color: "red" }}>{data.error}</p>
      </div>
    );
  }
  
  // Generar código JavaScript para productIdMapping.js
  const generateMappingCode = () => {
    let code = "export const PRODUCT_ID_MAPPING = [\n";
    
    Object.entries(data.mappingData)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .forEach(([key, value]) => {
        if (value.productIds.length === 0) return;
        
        code += `  // ${key}\n`;
        code += `  {\n`;
        code += `    animal: "${value.animal}",\n`;
        code += `    tipo: "${value.tipo}",\n`;
        code += `    segmento: "${value.segmento}",\n`;
        code += `    productIds: [\n`;
        
        value.products.forEach(product => {
          code += `      ${product.id}, // ${product.title}\n`;
        });
        
        code += `    ]\n`;
        code += `  },\n\n`;
      });
    
    code += "];\n\n";
    code += "export function getProductIdsBySegment(animal, tipo, segmento) {\n";
    code += "  const entry = PRODUCT_ID_MAPPING.find(\n";
    code += "    (item) => item.animal === animal && item.tipo === tipo && item.segmento === segmento\n";
    code += "  );\n";
    code += "  return entry ? entry.productIds : [];\n";
    code += "}\n";
    
    return code;
  };
  
  const mappingCode = generateMappingCode();
  
  return (
    <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "12px" }}>
      <h1>🔧 Generador de Product ID Mapping</h1>
      
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        backgroundColor: "#fef3c7",
        borderRadius: "8px",
        border: "1px solid #fbbf24"
      }}>
        <h3 style={{ marginTop: 0 }}>📋 Instrucciones:</h3>
        <ol>
          <li>Copia el código de abajo</li>
          <li>Reemplaza el contenido de <code>app/data/productIdMapping.js</code></li>
          <li>Haz commit y push</li>
          <li>Prueba de nuevo el survey</li>
        </ol>
      </div>
      
      <h2>📦 Productos encontrados por categoría:</h2>
      <div style={{ marginBottom: "30px" }}>
        {Object.entries(data.mappingData)
          .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .map(([key, value]) => (
            <div key={key} style={{ 
              marginBottom: "15px", 
              padding: "10px", 
              backgroundColor: "#f5f5f5",
              borderRadius: "4px"
            }}>
              <strong style={{ color: "#2563eb" }}>{key}</strong>
              <span style={{ marginLeft: "10px", color: "#059669" }}>
                ({value.productIds.length} producto{value.productIds.length !== 1 ? 's' : ''})
              </span>
              <div style={{ marginTop: "5px", fontSize: "11px" }}>
                {value.products.map(p => (
                  <div key={p.id} style={{ marginLeft: "15px" }}>
                    • ID: {p.id} - {p.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      
      <h2>💾 Código generado para productIdMapping.js:</h2>
      <div style={{ 
        backgroundColor: "#1e293b", 
        color: "#e2e8f0", 
        padding: "20px",
        borderRadius: "8px",
        overflow: "auto",
        maxHeight: "600px"
      }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(mappingCode);
            alert("✅ Código copiado al portapapeles!");
          }}
          style={{
            marginBottom: "15px",
            padding: "10px 20px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
          📋 Copiar código
        </button>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {mappingCode}
        </pre>
      </div>
    </div>
  );
}
