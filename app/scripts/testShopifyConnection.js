/**
 * Script de prueba para verificar la conexión con la API de Shopify
 * y validar que los productos se pueden obtener correctamente
 * 
 * Uso: node app/scripts/testShopifyConnection.js
 */

import 'dotenv/config';

// Simular fetch si no está disponible en Node (versiones antiguas)
import fetch from 'node-fetch';
globalThis.fetch = fetch;

/**
 * Prueba la conexión directa a la API de Shopify
 */
async function testShopifyConnection() {
  console.log("\n🔍 Verificando configuración...\n");
  
  const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;
  const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const productDataSource = process.env.PRODUCT_DATA_SOURCE;
  
  // Verificar variables de entorno
  console.log("📋 Variables de entorno:");
  console.log(`   SHOPIFY_STORE_URL: ${shopifyStoreUrl ? '✅ Configurada' : '❌ Falta'}`);
  console.log(`   SHOPIFY_ACCESS_TOKEN: ${shopifyAccessToken ? '✅ Configurada' : '❌ Falta'}`);
  console.log(`   PRODUCT_DATA_SOURCE: ${productDataSource || 'local'}`);
  
  if (!shopifyStoreUrl || !shopifyAccessToken) {
    console.error("\n❌ Error: Faltan credenciales de Shopify en el archivo .env");
    console.log("\nAsegúrate de configurar:");
    console.log("   - SHOPIFY_STORE_URL");
    console.log("   - SHOPIFY_ACCESS_TOKEN");
    return;
  }
  
  // Construir URL de la API
  const apiUrl = `https://${shopifyStoreUrl}/admin/api/2025-01/products.json?limit=5`;
  
  console.log("\n🌐 Conectando a la API de Shopify...");
  console.log(`   URL: ${apiUrl.replace(/\/admin.*/, '/admin/api/...')}`);
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopifyAccessToken,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`\n❌ Error HTTP: ${response.status} ${response.statusText}`);
      console.error(`   Detalles: ${errorText}`);
      return;
    }
    
    const data = await response.json();
    
    if (!data.products) {
      console.error("\n❌ Error: Respuesta inválida de Shopify (no hay productos)");
      return;
    }
    
    console.log("\n✅ Conexión exitosa!");
    console.log(`\n📦 Productos obtenidos: ${data.products.length}`);
    
    // Mostrar información de los primeros productos
    if (data.products.length > 0) {
      console.log("\n📋 Primeros productos encontrados:");
      data.products.slice(0, 3).forEach((product, index) => {
        console.log(`\n   ${index + 1}. ${product.title}`);
        console.log(`      ID: ${product.id}`);
        console.log(`      Tipo: ${product.product_type || 'Sin tipo'}`);
        console.log(`      Tags: ${product.tags || 'Sin tags'}`);
        console.log(`      Variantes: ${product.variants?.length || 0}`);
        
        if (product.variants && product.variants.length > 0) {
          const variant = product.variants[0];
          console.log(`      Primera variante:`);
          console.log(`         - SKU: ${variant.sku || 'Sin SKU'}`);
          console.log(`         - Precio: ${variant.price} ${variant.currency || ''}`);
          console.log(`         - Peso: ${variant.weight} ${variant.weight_unit || ''}`);
        }
      });
    }
    
    console.log("\n✨ Todo configurado correctamente!\n");
    
  } catch (error) {
    console.error("\n❌ Error al conectar con Shopify:");
    console.error(`   ${error.message}`);
    console.error("\nVerifica que:");
    console.log("   1. Tu tienda Shopify está activa");
    console.log("   2. El SHOPIFY_ACCESS_TOKEN es válido");
    console.log("   3. El token tiene permisos de lectura de productos");
  }
}

// Ejecutar prueba
testShopifyConnection().catch(error => {
  console.error("\n💥 Error inesperado:", error);
  process.exit(1);
});
