/**
 * Ruta de diagnóstico del sistema de productos
 * Acceder a: /app/product-diagnostics
 */

import { json } from "react-router";
import { useLoaderData } from "react-router";
import { 
  getProducts, 
  getCurrentDataSource,
  getCacheInfo 
} from "../services/productService";
import { getProductSourceInfo } from "../config/productConfig";

export async function loader() {
  const startTime = Date.now();
  
  try {
    const productos = await getProducts();
    const loadTime = Date.now() - startTime;
    
    const productKeys = Object.keys(productos);
    const sourceInfo = getProductSourceInfo();
    const cacheInfo = getCacheInfo();
    
    // Estadísticas por tipo
    const stats = {
      total: productKeys.length,
      perros: productKeys.filter(k => productos[k].animal === "Perro").length,
      gatos: productKeys.filter(k => productos[k].animal === "Gato").length,
      secos: productKeys.filter(k => productos[k].tipo === "Seco").length,
      humedos: productKeys.filter(k => productos[k].tipo === "Humedo").length,
    };
    
    // Productos de ejemplo
    const ejemplos = productKeys.slice(0, 5).map(key => ({
      key,
      nombre: productos[key].nombre,
      tipo: productos[key].tipo,
      animal: productos[key].animal,
      segmento: productos[key].segmento,
      variantes: productos[key].variantes?.length || 0,
      variantesSmall: productos[key].variantes_small?.length || 0,
    }));
    
    return json({
      success: true,
      loadTime,
      source: getCurrentDataSource(),
      sourceInfo,
      cacheInfo,
      stats,
      ejemplos,
    });
    
  } catch (error) {
    return json({
      success: false,
      error: error.message,
      loadTime: Date.now() - startTime,
    });
  }
}

export default function ProductDiagnostics() {
  const data = useLoaderData();
  
  if (!data.success) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>❌ Error en Sistema de Productos</h1>
        <div style={styles.errorBox}>
          <p><strong>Error:</strong> {data.error}</p>
          <p><strong>Tiempo:</strong> {data.loadTime}ms</p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔍 Diagnóstico del Sistema de Productos</h1>
      
      {/* Configuración */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>⚙️ Configuración</h2>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Fuente de datos:</span>
            <span style={styles.value}>
              {data.source === "shopify" ? "🌐 Shopify API" : "💾 Datos Locales"}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Tiempo de carga:</span>
            <span style={styles.value}>{data.loadTime}ms</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Fallback habilitado:</span>
            <span style={styles.value}>
              {data.sourceInfo.fallbackEnabled ? "✅ Sí" : "❌ No"}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Tiempo de cache:</span>
            <span style={styles.value}>{data.sourceInfo.cacheTime / 1000}s</span>
          </div>
        </div>
      </section>
      
      {/* Cache */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>💾 Estado del Cache</h2>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Cache activo:</span>
            <span style={styles.value}>
              {data.cacheInfo.hasCache ? "✅ Sí" : "❌ No"}
            </span>
          </div>
          {data.cacheInfo.hasCache && (
            <>
              <div style={styles.row}>
                <span style={styles.label}>Cache válido:</span>
                <span style={styles.value}>
                  {data.cacheInfo.isValid ? "✅ Sí" : "⚠️ Expirado"}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Edad del cache:</span>
                <span style={styles.value}>
                  {Math.round(data.cacheInfo.cacheAge / 1000)}s
                </span>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Estadísticas */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>📊 Estadísticas</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{data.stats.total}</div>
            <div style={styles.statLabel}>Total Productos</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{data.stats.perros}</div>
            <div style={styles.statLabel}>Perros</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{data.stats.gatos}</div>
            <div style={styles.statLabel}>Gatos</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{data.stats.secos}</div>
            <div style={styles.statLabel}>Secos</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{data.stats.humedos}</div>
            <div style={styles.statLabel}>Húmedos</div>
          </div>
        </div>
      </section>
      
      {/* Ejemplos */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>📦 Productos de Ejemplo</h2>
        <div style={styles.table}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Clave</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Animal</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Segmento</th>
                <th style={styles.th}>Variantes</th>
              </tr>
            </thead>
            <tbody>
              {data.ejemplos.map((prod, idx) => (
                <tr key={idx} style={styles.tableRow}>
                  <td style={styles.td}><code>{prod.key}</code></td>
                  <td style={styles.td}>{prod.nombre}</td>
                  <td style={styles.td}>{prod.animal}</td>
                  <td style={styles.td}>{prod.tipo}</td>
                  <td style={styles.td}>{prod.segmento}</td>
                  <td style={styles.td}>
                    {prod.variantes}
                    {prod.variantesSmall > 0 && ` (+${prod.variantesSmall} small)`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Instrucciones */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>📖 Próximos Pasos</h2>
        <div style={styles.card}>
          {data.source === "local" ? (
            <>
              <p>✅ Sistema funcionando correctamente con datos locales.</p>
              <p><strong>Para activar Shopify API:</strong></p>
              <ol>
                <li>Verifica que el endpoint <code>/api/shopify/products</code> funcione</li>
                <li>Configura tags en tus productos de Shopify</li>
                <li>Cambia <code>PRODUCT_DATA_SOURCE</code> a "shopify" en <code>productConfig.js</code></li>
                <li>Recarga esta página para verificar</li>
              </ol>
            </>
          ) : (
            <>
              <p>✅ Sistema funcionando con Shopify API!</p>
              <p><strong>Recomendaciones:</strong></p>
              <ul>
                <li>Verifica que todos los productos necesarios estén presentes</li>
                <li>Revisa que los segmentos se identifiquen correctamente</li>
                <li>Configura metafields para información nutricional precisa</li>
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#555',
  },
  section: {
    marginBottom: '2rem',
  },
  card: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  errorBox: {
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    padding: '1.5rem',
    color: '#c00',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  label: {
    fontWeight: '500',
    color: '#666',
  },
  value: {
    fontWeight: '600',
    color: '#333',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  statCard: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#739f99',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '0.5rem',
  },
  table: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    background: '#f5f5f5',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '1rem',
    color: '#555',
  },
};
