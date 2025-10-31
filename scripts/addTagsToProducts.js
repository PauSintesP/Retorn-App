/**
 * Script para agregar tags a productos de Shopify basándose en el CSV
 * Este script lee el CSV y agrega tags automáticamente a cada producto
 * 
 * Tags que se agregarán:
 * - Tipo: "Seco" o "Humedo"
 * - Animal: "Perro" o "Gato"
 * - Segmento: "Cachorros", "Adulto", "Senior Light", etc.
 * 
 * USO:
 * node scripts/addTagsToProducts.js
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Shopify
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
  console.error('❌ Error: Faltan credenciales de Shopify en .env');
  process.exit(1);
}

/**
 * Lee el CSV y construye un mapa de SKU/ID → información del producto
 */
function parseCSV() {
  const csvPath = path.join(__dirname, '../app/Calculadora Manual DEFINITIVA.xlsx - Productos.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');
  
  const productMap = new Map();
  
  // Saltar las primeras 5 líneas (encabezados y vacías)
  for (let i = 5; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parsear CSV manualmente (columnas: ID,EAN,Cantidad,SKU,Nombre,Tipo Alimento,Tipo Animal,Segmento,kcal Em/kg,LINK WEB)
    const parts = line.split(',');
    if (parts.length < 9) continue;
    
    const variantId = parts[0]?.trim();
    const sku = parts[3]?.trim();
    const tipo = parts[5]?.trim();
    const animal = parts[6]?.trim();
    const segmento = parts[7]?.trim();
    const kcal = parts[8]?.trim();
    
    if (variantId && tipo && animal && segmento && kcal) {
      const info = { tipo, animal, segmento, kcal };
      
      // Agregar por variant ID
      if (variantId) {
        productMap.set(variantId, info);
      }
      
      // Agregar por SKU si existe
      if (sku && sku !== '') {
        productMap.set(sku, info);
      }
    }
  }
  
  console.log(`✅ CSV parseado: ${productMap.size} variantes encontradas`);
  return productMap;
}

/**
 * Obtiene todos los productos de Shopify
 */
async function fetchAllProducts() {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/2025-01/products.json?limit=250&vendor=Retorn`;
  
  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.products;
}

/**
 * Actualiza los tags de un producto en Shopify
 */
async function updateProductTags(productId, newTags) {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/2025-01/products/${productId}.json`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: {
        id: productId,
        tags: newTags.join(', '),
      },
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error updating product ${productId}: ${response.status} - ${errorText}`);
  }
  
  return await response.json();
}

/**
 * Agrega metafield de calorías a un producto
 */
async function addCaloriesMetafield(productId, kcalValue) {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/2025-01/products/${productId}/metafields.json`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      metafield: {
        namespace: 'custom',
        key: 'kcal_em_kg',
        value: kcalValue,
        type: 'number_integer',
      },
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`⚠️  Error adding metafield to product ${productId}: ${response.status} - ${errorText}`);
    return null;
  }
  
  return await response.json();
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando proceso de actualización de tags...\n');
  
  // 1. Parsear CSV
  const productMap = parseCSV();
  
  // 2. Obtener productos de Shopify
  console.log('📦 Obteniendo productos de Shopify...');
  const products = await fetchAllProducts();
  console.log(`✅ ${products.length} productos obtenidos\n`);
  
  let updatedCount = 0;
  let skippedCount = 0;
  
  // 3. Procesar cada producto
  for (const product of products) {
    console.log(`\n📦 Procesando: ${product.title}`);
    
    // Buscar información en el CSV usando SKU o variant ID
    let productInfo = null;
    let matchedBy = null;
    
    for (const variant of product.variants) {
      if (variant.sku && productMap.has(variant.sku)) {
        productInfo = productMap.get(variant.sku);
        matchedBy = `SKU ${variant.sku}`;
        break;
      }
      if (variant.id && productMap.has(variant.id.toString())) {
        productInfo = productMap.get(variant.id.toString());
        matchedBy = `ID ${variant.id}`;
        break;
      }
    }
    
    if (!productInfo) {
      console.log(`   ⚠️  No se encontró en CSV - omitiendo`);
      skippedCount++;
      continue;
    }
    
    console.log(`   ✅ Match encontrado por ${matchedBy}`);
    console.log(`   📋 Info: ${productInfo.tipo} | ${productInfo.animal} | ${productInfo.segmento} | ${productInfo.kcal} kcal`);
    
    // Construir nuevos tags (agregar a los existentes)
    const existingTags = typeof product.tags === 'string' 
      ? product.tags.split(',').map(t => t.trim()).filter(t => t)
      : Array.isArray(product.tags) 
      ? product.tags 
      : [];
    
    const newTags = [
      ...existingTags,
      productInfo.tipo,
      productInfo.animal,
      productInfo.segmento,
    ];
    
    // Eliminar duplicados
    const uniqueTags = [...new Set(newTags)];
    
    console.log(`   🏷️  Tags a agregar: ${uniqueTags.join(', ')}`);
    
    try {
      // Actualizar tags
      await updateProductTags(product.id, uniqueTags);
      console.log(`   ✅ Tags actualizados`);
      
      // Agregar metafield de calorías
      await addCaloriesMetafield(product.id, productInfo.kcal);
      console.log(`   ✅ Metafield de calorías agregado: ${productInfo.kcal} kcal/kg`);
      
      updatedCount++;
      
      // Rate limiting: esperar 0.5 segundos entre requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`   ❌ Error actualizando producto: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ PROCESO COMPLETADO');
  console.log(`   📦 Productos actualizados: ${updatedCount}`);
  console.log(`   ⚠️  Productos omitidos: ${skippedCount}`);
  console.log('='.repeat(60));
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
