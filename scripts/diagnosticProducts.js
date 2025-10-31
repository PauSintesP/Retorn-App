/**
 * Script de diagnóstico para ver qué productos se están mapeando y cuáles no
 * Ayuda a identificar problemas con la clasificación automática
 */

import 'dotenv/config';

const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
  console.error('❌ Error: Faltan credenciales de Shopify en .env');
  process.exit(1);
}

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

async function main() {
  console.log('🔍 Diagnóstico de productos Shopify\n');
  
  const products = await fetchAllProducts();
  console.log(`📦 Total productos en Shopify: ${products.length}\n`);
  
  console.log('═'.repeat(80));
  
  products.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.title}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Vendor: ${product.vendor}`);
    console.log(`   Product Type: ${product.product_type}`);
    console.log(`   Tags: ${product.tags || '(sin tags)'}`);
    console.log(`   Variantes: ${product.variants.length}`);
    
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, vIndex) => {
        console.log(`      ${vIndex + 1}. ${variant.title} - SKU: ${variant.sku || '(sin SKU)'} - ID: ${variant.id}`);
      });
    }
    
    console.log(`   Imágenes: ${product.images ? product.images.length : 0}`);
    console.log('   ' + '─'.repeat(76));
  });
  
  console.log('\n' + '═'.repeat(80));
  console.log('\n📊 RESUMEN:');
  console.log(`   Total productos: ${products.length}`);
  
  const withTags = products.filter(p => p.tags && p.tags.length > 0);
  const withoutTags = products.filter(p => !p.tags || p.tags.length === 0);
  
  console.log(`   Con tags: ${withTags.length}`);
  console.log(`   Sin tags: ${withoutTags.length}`);
  
  if (withoutTags.length > 0) {
    console.log('\n⚠️  PRODUCTOS SIN TAGS (usarán parsing del título):');
    withoutTags.forEach(p => {
      console.log(`   - ${p.title}`);
    });
  }
  
  console.log('\n💡 RECOMENDACIÓN:');
  console.log('   Ejecuta: npm run tags:add');
  console.log('   Para agregar tags automáticamente a todos los productos');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
