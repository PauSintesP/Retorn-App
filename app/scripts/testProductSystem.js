/**
 * Script de prueba para verificar el sistema de productos
 * Ejecutar con: node --loader tsx app/scripts/testProductSystem.js
 */

import { 
  getProducts, 
  getCurrentDataSource,
  getCacheInfo,
  clearProductsCache 
} from "../services/productService";
import { getProductSourceInfo } from "../config/productConfig";
import { PRODUCTOS as PRODUCTOS_LOCAL } from "../data/productConstants";

async function testProductSystem() {
  console.log("=================================");
  console.log("  PRUEBA DEL SISTEMA DE PRODUCTOS");
  console.log("=================================\n");

  // 1. Verificar configuración
  console.log("1. CONFIGURACIÓN:");
  console.log("-----------------");
  const sourceInfo = getProductSourceInfo();
  console.log("Fuente de datos:", sourceInfo.source);
  console.log("Usando Shopify:", sourceInfo.usingShopify);
  console.log("Usando Local:", sourceInfo.usingLocal);
  console.log("Fallback habilitado:", sourceInfo.fallbackEnabled);
  console.log("Tiempo de cache:", sourceInfo.cacheTime, "ms\n");

  // 2. Probar obtención de productos
  console.log("2. OBTENER PRODUCTOS:");
  console.log("----------------------");
  try {
    console.log("Obteniendo productos...");
    const startTime = Date.now();
    const productos = await getProducts();
    const endTime = Date.now();
    
    const productKeys = Object.keys(productos);
    console.log("✓ Productos obtenidos exitosamente");
    console.log("  - Tiempo:", endTime - startTime, "ms");
    console.log("  - Total productos:", productKeys.length);
    console.log("  - Fuente real:", getCurrentDataSource());
    
    // Mostrar algunos productos de ejemplo
    console.log("\n  Productos de ejemplo:");
    productKeys.slice(0, 3).forEach(key => {
      const prod = productos[key];
      console.log(`    - ${key}:`);
      console.log(`      Nombre: ${prod.nombre}`);
      console.log(`      Tipo: ${prod.tipo} | Animal: ${prod.animal}`);
      console.log(`      Variantes: ${prod.variantes?.length || 0}`);
    });
    
  } catch (error) {
    console.log("✗ Error obteniendo productos:", error.message);
  }

  // 3. Verificar cache
  console.log("\n3. INFORMACIÓN DE CACHE:");
  console.log("-------------------------");
  const cacheInfo = getCacheInfo();
  console.log("Tiene cache:", cacheInfo.hasCache);
  if (cacheInfo.hasCache) {
    console.log("Cache válido:", cacheInfo.isValid);
    console.log("Edad del cache:", cacheInfo.cacheAge, "ms");
  }

  // 4. Probar cache
  console.log("\n4. PRUEBA DE CACHE:");
  console.log("--------------------");
  console.log("Segunda llamada (debe usar cache si está activo)...");
  const startTime2 = Date.now();
  await getProducts();
  const endTime2 = Date.now();
  console.log("✓ Tiempo:", endTime2 - startTime2, "ms");
  console.log("  (Debería ser < 5ms si usó cache)");

  // 5. Comparar con datos locales
  console.log("\n5. COMPARACIÓN CON DATOS LOCALES:");
  console.log("----------------------------------");
  const localKeys = Object.keys(PRODUCTOS_LOCAL);
  const productos = await getProducts();
  const currentKeys = Object.keys(productos);
  
  console.log("Productos en local:", localKeys.length);
  console.log("Productos actual:", currentKeys.length);
  
  if (getCurrentDataSource() === "local") {
    console.log("✓ Usando datos locales (esperado en desarrollo)");
  } else {
    console.log("✓ Usando API de Shopify");
    
    // Verificar productos que faltan
    const missing = localKeys.filter(k => !currentKeys.includes(k));
    if (missing.length > 0) {
      console.log("\n⚠️  Productos en local pero no en API:");
      missing.forEach(k => console.log(`    - ${k}`));
    }
  }

  // 6. Limpiar cache
  console.log("\n6. LIMPIEZA DE CACHE:");
  console.log("----------------------");
  clearProductsCache();
  console.log("✓ Cache limpiado");

  console.log("\n=================================");
  console.log("  PRUEBA COMPLETADA");
  console.log("=================================\n");
}

// Ejecutar prueba
testProductSystem().catch(error => {
  console.error("Error en prueba:", error);
  process.exit(1);
});
