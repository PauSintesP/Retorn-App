/**
 * Adaptador para convertir productos de Shopify al formato local
 * Mapea los datos de la API de Shopify al formato usado en productConstants.js
 */

import { getProductInfoBySKU } from '../data/productDatabase.js';

/**
 * Mapea un array de productos de Shopify al formato local
 * @param {Array} shopifyProducts - Array de productos desde la API de Shopify
 * @returns {Object} Objeto con productos en formato local (misma estructura que PRODUCTOS)
 */
export function mapShopifyProductsToLocal(shopifyProducts) {
  const mappedProducts = {};
  
  console.log(`[Adapter] Procesando ${shopifyProducts.length} productos de Shopify...`);
  
  shopifyProducts.forEach(shopifyProduct => {
    const localProduct = mapSingleProduct(shopifyProduct);
    if (localProduct && localProduct.key && localProduct.data) {
      // Solo incluir productos que están en nuestra base de datos (productos RETORN reales)
      if (localProduct.data.kcalEmKg > 0) {
        mappedProducts[localProduct.key] = localProduct.data;
        console.log(`[Adapter] ✅ ${shopifyProduct.title} (${localProduct.data.tipo}, ${localProduct.data.animal}, ${localProduct.data.kcalEmKg} kcal)`);
      } else {
        console.log(`[Adapter] ❌ Omitido (no en DB): ${shopifyProduct.title}`);
      }
    }
  });
  
  console.log(`[Adapter] Total productos válidos: ${Object.keys(mappedProducts).length}`);
  
  return mappedProducts;
}

/**
 * Mapea un único producto de Shopify al formato local
 * @param {Object} shopifyProduct - Producto desde Shopify API
 * @returns {Object} Producto en formato local
 */
function mapSingleProduct(shopifyProduct) {
  try {
    // Extraer información básica del producto
    const title = shopifyProduct.title || "";
    const productType = shopifyProduct.product_type || "";
    const vendor = shopifyProduct.vendor || "";
    const tags = shopifyProduct.tags || [];
    
    // Buscar información en la base de datos
    let productInfo = null;
    let sku = null;
    
    // Intentar con SKU de todas las variantes hasta encontrar match
    if (shopifyProduct.variants && shopifyProduct.variants.length > 0) {
      for (const variant of shopifyProduct.variants) {
        if (variant.sku) {
          productInfo = getProductInfoBySKU(variant.sku);
          if (productInfo) {
            sku = variant.sku;
            break;
          }
        }
      }
    }
    
    // Si no está en la base de datos, omitir
    if (!productInfo) {
      const firstSku = shopifyProduct.variants?.[0]?.sku || 'sin-sku';
      console.log(`[Adapter] ❌ SKU no encontrado en DB: ${title} (SKU: ${firstSku})`);
      return {
        key: generateProductKey(title, tags),
        data: {
          nombre: title,
          tipo: "Seco",
          animal: "Perro",
          segmento: "Adulto",
          kcalEmKg: 0, // Marcado como no válido
          imagen: "",
          variantes: []
        }
      };
    }
    
    console.log(`[Adapter] ✅ Match encontrado: ${title} (SKU: ${sku})`);
    
    // Usar datos de la base de datos
    const tipo = productInfo.tipo;
    const animal = productInfo.animal;
    const segmento = productInfo.segmento;
    const kcalEmKg = productInfo.kcalEmKg;
    
    // Determinar clave del producto
    const productKey = generateProductKey(title, tags);
    
    // Extraer imagen principal
    const imagen = shopifyProduct.images && shopifyProduct.images[0] 
      ? shopifyProduct.images[0].src 
      : "";
    
    // Obtener handle del producto para construir URLs
    const productHandle = shopifyProduct.handle || "";
    
    // Mapear variantes
    const variantes = mapVariants(shopifyProduct.variants, tipo, productHandle);
    
    // Separar variantes por tamaño de croqueta si aplica
    const { variantes_regular, variantes_small } = separateVariantsBySize(variantes, tags);
    
    const localProduct = {
      nombre: title,
      tipo: tipo,
      animal: animal,
      segmento: segmento,
      kcalEmKg: kcalEmKg,
      imagen: imagen,
      variantes: variantes_regular,
    };
    
    // Agregar variantes_small solo si existen
    if (variantes_small.length > 0) {
      localProduct.variantes_small = variantes_small;
    }
    
    return {
      key: productKey,
      data: localProduct
    };
    
  } catch (error) {
    console.error("Error mapping Shopify product:", error, shopifyProduct);
    return null;
  }
}

/**
 * Mapea las variantes de Shopify al formato local
 * @param {Array} shopifyVariants - Variantes desde Shopify
 * @param {string} tipo - Tipo de producto (Seco/Humedo)
 * @param {string} productHandle - Handle del producto para construir URL
 * @returns {Array} Array de variantes en formato local
 */
function mapVariants(shopifyVariants, tipo, productHandle) {
  if (!shopifyVariants || !Array.isArray(shopifyVariants)) {
    return [];
  }
  
  return shopifyVariants.map(variant => {
    // Extraer información de la variante
    const sku = variant.sku || "";
    const title = variant.title || "";
    const barcode = variant.barcode || "";
    
    // Determinar cantidad desde el título de la variante o weight
    const cantidad = extractQuantity(title, variant);
    
    // Construir URL del producto con la variante
    const link = productHandle 
      ? buildProductUrl(productHandle, variant.id)
      : "";
    
    return {
      ean: barcode,
      cantidad: cantidad,
      sku: sku,
      link: link,
      variantId: variant.id ? variant.id.toString() : "",
    };
  }).filter(v => v.cantidad); // Filtrar variantes sin cantidad
}

/**
 * Separa variantes por tamaño de croqueta (regular vs small)
 * @param {Array} variantes - Array de variantes
 * @param {Array} tags - Tags del producto
 * @returns {Object} Objeto con variantes_regular y variantes_small
 */
function separateVariantsBySize(variantes, tags) {
  const variantes_regular = [];
  const variantes_small = [];
  
  variantes.forEach(variante => {
    // Detectar si es small bite por el SKU o título
    const isSmallBite = variante.sku.toLowerCase().includes('s') || 
                        variante.cantidad.toLowerCase().includes('small');
    
    if (isSmallBite) {
      variantes_small.push(variante);
    } else {
      variantes_regular.push(variante);
    }
  });
  
  return { variantes_regular, variantes_small };
}

/**
 * Genera una clave única para el producto basándose en su título y tags
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @returns {string} Clave del producto (ej: "PERRO_ADULT_POLLO")
 */
function generateProductKey(title, tags) {
  // Normalizar título
  const normalized = title.toUpperCase()
    .replace(/RETORN\s*/i, "")
    .trim();
  
  // Convertir espacios a guiones bajos
  return normalized.replace(/\s+/g, "_");
}

/**
 * Determina el tipo de producto (Seco/Húmedo)
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @param {string} productType - Tipo de producto Shopify
 * @returns {string} "Seco" o "Humedo"
 */
function determineProductType(title, tags, productType) {
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());
  
  // Semihúmedo se considera SECO (es pienso con más humedad pero no latas)
  if (titleLower.includes("semihúmedo") || titleLower.includes("semihumedo")) {
    return "Seco";
  }
  
  // Solo latas/comida húmeda en lata se considera Húmedo
  if (titleLower.includes("lata") || 
      (titleLower.includes("húmedo") && !titleLower.includes("semi")) || 
      (titleLower.includes("humedo") && !titleLower.includes("semi")) ||
      tagsLower.includes("wet") ||
      tagsLower.includes("húmedo")) {
    return "Humedo";
  }
  
  return "Seco";
}

/**
 * Determina el animal (Perro/Gato)
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @param {string} productType - Tipo de producto Shopify
 * @returns {string} "Perro" o "Gato"
 */
function determineAnimal(title, tags, productType) {
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());
  
  if (titleLower.includes("cat") || 
      titleLower.includes("gato") ||
      tagsLower.includes("cat") ||
      tagsLower.includes("gato")) {
    return "Gato";
  }
  
  return "Perro";
}

/**
 * Determina el segmento del producto
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @returns {string} Segmento del producto
 */
function determineSegment(title, tags) {
  const titleLower = title.toLowerCase();
  
  // Cachorros
  if (titleLower.includes("puppy") || titleLower.includes("cachorro") || titleLower.includes("kitten")) {
    return "Cachorros";
  }
  
  // Senior / Light
  if (titleLower.includes("senior") || titleLower.includes("light")) {
    return "Senior Light";
  }
  
  // Esterilizados
  if (titleLower.includes("sterilized") || titleLower.includes("esterilizado")) {
    return "Esterilizados Light";
  }
  
  // Adultos por tipo de proteína
  if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
    return titleLower.includes("conejo") ? "Pollo Conejo" : 
           titleLower.includes("zanahoria") ? "Pollo Zanahoria" : "Adulto Pollo";
  }
  
  if (titleLower.includes("cordero") || titleLower.includes("lamb")) {
    return titleLower.includes("arroz") ? "Cordero Arroz" : "Adulto Cordero";
  }
  
  if (titleLower.includes("salmon") || titleLower.includes("salmón")) {
    return titleLower.includes("atun") ? "Salmón" : "Adulto Salmón";
  }
  
  if (titleLower.includes("pescado") || titleLower.includes("fish")) {
    return titleLower.includes("patata") ? "Pescado Patatas" : 
           titleLower.includes("zanahoria") ? "Pescado Zanahoria" : "Adulto Pescado";
  }
  
  if (titleLower.includes("atun") || titleLower.includes("tuna")) {
    if (titleLower.includes("mejillon")) return "Mejillones";
    if (titleLower.includes("sardina")) return "Sardina";
    if (titleLower.includes("gamba")) return "Gambas";
  }
  
  if (titleLower.includes("only")) {
    if (titleLower.includes("cordero")) return "Only Cordero";
    if (titleLower.includes("pollo")) return "Only Pollo";
  }
  
  return "Adulto";
}

/**
 * Extrae las calorías del producto desde metafields o usa valores por defecto
 * @param {Object} shopifyProduct - Producto de Shopify
 * @returns {number} Kcal por kg
 */
function extractCalories(shopifyProduct) {
  // Intentar obtener desde metafields
  if (shopifyProduct.metafields) {
    const caloriesField = shopifyProduct.metafields.find(
      mf => mf.key === "kcal_per_kg" || mf.key === "calories"
    );
    
    if (caloriesField && caloriesField.value) {
      return parseFloat(caloriesField.value);
    }
  }
  
  const title = shopifyProduct.title.toLowerCase();
  
  // Valores por defecto basados en tipo de producto
  if (title.includes("húmedo") || title.includes("humedo") || title.includes("lata")) {
    return 1000; // Comida húmeda
  }
  
  if (title.includes("puppy") || title.includes("cachorro")) {
    return 3600; // Cachorros
  }
  
  if (title.includes("light") || title.includes("senior")) {
    return 3300; // Light/Senior
  }
  
  // Por defecto para cualquier producto
  return 3500;
}

/**
 * Extrae la cantidad desde el título de la variante
 * @param {string} title - Título de la variante
 * @param {Object} variant - Objeto variante de Shopify
 * @returns {string} Cantidad formateada
 */
function extractQuantity(title, variant) {
  // Intentar extraer desde el título
  if (title && title !== "Default Title") {
    // Patrón para detectar:
    // - "185 gr", "400 g", "3 kg", "500gr"
    // - "Caja 12 latas 185 g", "185 gr x 12ud"
    
    // Buscar "Caja X latas Y g/kg"
    const boxMatch = title.match(/caja\s+(\d+)\s+latas?\s+(\d+)\s*(gr?|g|kg)/i);
    if (boxMatch) {
      return `Caja ${boxMatch[1]} latas ${boxMatch[2]} ${boxMatch[3]}`;
    }
    
    // Buscar "X g/kg x Y ud"
    const multiMatch = title.match(/(\d+)\s*(gr?|g|kg)\s*x\s*(\d+)\s*ud/i);
    if (multiMatch) {
      return `${multiMatch[1]} ${multiMatch[2]} x ${multiMatch[3]}ud`;
    }
    
    // Buscar cantidad simple: "185 g", "3 kg", "500gr"
    const simpleMatch = title.match(/(\d+(?:\.\d+)?)\s*(gr?|g|kg)/i);
    if (simpleMatch) {
      const amount = simpleMatch[1];
      let unit = simpleMatch[2].toLowerCase();
      
      // Normalizar unidades
      if (unit === 'gr' || unit === 'g') {
        unit = 'g';
      } else if (unit === 'kg') {
        unit = 'kg';
      }
      
      return `${amount} ${unit}`;
    }
  }
  
  // Intentar desde weight (en gramos)
  if (variant.weight && variant.weight > 0) {
    const weightInGrams = variant.weight;
    if (weightInGrams >= 1000) {
      const weightInKg = (weightInGrams / 1000).toFixed(1);
      return `${weightInKg} kg`;
    }
    return `${weightInGrams} g`;
  }
  
  return "";
}

/**
 * Construye la URL del producto con la variante
 * @param {string} productHandle - Handle del producto (slug URL)
 * @param {number} variantId - ID de la variante
 * @returns {string} URL del producto
 */
function buildProductUrl(productHandle, variantId) {
  if (!productHandle) return "";
  
  return `https://retorn.com/products/${productHandle}?variant=${variantId}`;
}
