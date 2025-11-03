/**
 * Adaptador para convertir productos de Shopify al formato local
 * Sistema 100% dinámico que extrae información desde Shopify (tags, metafields, título)
 * NO usa base de datos hardcodeada - todo se actualiza automáticamente desde Shopify
 */

import { filterAllowedVariants } from "../data/allowedProducts.js";

/**
 * Mapea un array de productos de Shopify al formato local
 * @param {Array} shopifyProducts - Array de productos desde la API de Shopify
 * @returns {Object} Objeto con productos en formato local (misma estructura que PRODUCTOS)
 */
export function mapShopifyProductsToLocal(shopifyProducts) {
  const mappedProducts = {};
  
  shopifyProducts.forEach(shopifyProduct => {
    if (!isProductAlimento(shopifyProduct)) {
      return;
    }
    
    const allowedVariants = filterAllowedVariants(shopifyProduct.variants);
    if (allowedVariants.length === 0) {
      return;
    }
    
    const filteredProduct = {
      ...shopifyProduct,
      variants: allowedVariants
    };
    
    const localProduct = mapSingleProduct(filteredProduct);
    if (localProduct && localProduct.key && localProduct.data) {
      mappedProducts[localProduct.key] = localProduct.data;
    }
  });
  
  return mappedProducts;
}

/**
 * Determina si un producto es alimento (pienso o comida húmeda)
 * Excluye juguetes, accesorios, arena, etc.
 * @param {Object} shopifyProduct - Producto de Shopify
 * @returns {boolean} true si es alimento, false si no
 */
function isProductAlimento(shopifyProduct) {
  const title = (shopifyProduct.title || "").toLowerCase();
  const productType = (shopifyProduct.product_type || "").toLowerCase();
  const tags = Array.isArray(shopifyProduct.tags) 
    ? shopifyProduct.tags 
    : (typeof shopifyProduct.tags === 'string' ? shopifyProduct.tags.split(',').map(t => t.trim().toLowerCase()) : []);
  
  // LISTA NEGRA: Excluir productos que NO son alimento
  const exclusionKeywords = [
    'juguete', 'toy', 'rub ball', 'rub bouncy', 'rub chain', 'rub chew', 'rub flipper',
    'rub floating', 'rub flosser', 'rub fly', 'rub free jump', 'rub gossy', 'rub heavy',
    'rub hole', 'rub jumpty', 'rub loop', 'rub piggy', 'rub rugby', 'rub snorky',
    'rub spike', 'rub star', 'rub strong', 'rub teether', 'rub wheel',
    'arena', 'litter',
    'arnés', 'arnes', 'harness',
    'camiseta', 'shirt', 'cat lover', 'dog lover',
    'cepillo', 'brush', 'dog brush',
    'vaso medidor', 'measuring cup',
    'mochila', 'backpack', 'bol ecológico',
    'caja de regalo', 'gift box', 'cajita navideña',
    'llavero', 'keychain',
    'galleta de halloween', 'galletas navideñas', // Galletas decorativas (no alimento)
  ];
  
  // Verificar título y product_type
  for (const keyword of exclusionKeywords) {
    if (title.includes(keyword) || productType.includes(keyword)) {
      return false;
    }
  }
  
  // Verificar tags - excluir productos Rub que NO son alimento
  const excludedTags = ['rub perros', 'rub gatos', 'juguetes', 'toys', 'accesorios', 'accessories', 'ropa ecológica'];
  for (const excludedTag of excludedTags) {
    if (tags.includes(excludedTag.toLowerCase())) {
      return false;
    }
  }
  
  // LISTA BLANCA: Solo incluir productos de tipo alimenticio
  const foodProductTypes = [
    'pienso', 'comida húmeda', 'comida humeda',
    'pienso seco', 'pienso semihúmedo', 'pienso semihumedo',
    'snacks perros', 'snacks gatos', // Snacks alimenticios SÍ
    'latas', 'wet food', 'pack', 'packs especiales'
  ];
  
  // Verificar si contiene palabras clave de alimento en product_type
  const isFoodType = foodProductTypes.some(foodType => 
    productType.includes(foodType)
  );
  
  if (isFoodType) {
    return true;
  }
  
  // Verificar si el título contiene palabras clave de alimento
  const foodKeywordsInTitle = [
    'pienso', 'comida', 'lata', 'pack', 
    'natural rabbit bites', // Este es alimento
    'tuna jerky', // Este es alimento
  ];
  
  const hasFoodInTitle = foodKeywordsInTitle.some(keyword => 
    title.includes(keyword)
  );
  
  if (hasFoodInTitle) {
    return true;
  }
  
  // Verificar tags de alimento
  const foodTags = ['pienso', 'cachorro', 'senior', 'gato', 'perro', 'salmón', 'pollo', 'cordero', 'pescado'];
  const hasFoodTag = tags.some(tag => 
    foodTags.some(foodTag => tag.toLowerCase().includes(foodTag))
  );
  
  return hasFoodTag;
}

/**
 * Mapea un único producto de Shopify al formato local
 * Extrae información desde tags, metafields y título del producto
 * @param {Object} shopifyProduct - Producto desde Shopify API
 * @returns {Object} Producto en formato local
 */
function mapSingleProduct(shopifyProduct) {
  try {
    const title = shopifyProduct.title || "";
    const productType = shopifyProduct.product_type || "";
    const vendor = shopifyProduct.vendor || "";
    const tags = Array.isArray(shopifyProduct.tags) 
      ? shopifyProduct.tags 
      : (typeof shopifyProduct.tags === 'string' ? shopifyProduct.tags.split(',').map(t => t.trim()) : []);
    
    const tipo = extractProductType(title, tags, productType);
    const animal = extractAnimal(title, tags);
    const segmento = extractSegment(title, tags);
    const kcalEmKg = extractCalories(shopifyProduct, title, tags);
    
    const productKey = generateProductKey(title, tags);
    
    const imagen = shopifyProduct.images && shopifyProduct.images[0] 
      ? shopifyProduct.images[0].src 
      : "";
    
    const productHandle = shopifyProduct.handle || "";
    
    const variantes = mapVariants(shopifyProduct.variants, tipo, productHandle);
    
    const productoEspecificaTamano = title.toLowerCase().includes('croqueta pequeña') || 
                                      title.toLowerCase().includes('croqueta grande') ||
                                      title.toLowerCase().includes('small bite');
    
    let variantes_regular = variantes;
    let variantes_small = [];
    
    if (!productoEspecificaTamano && tipo === "Seco" && animal === "Perro") {
      const separated = separateVariantsBySize(variantes, tags);
      variantes_regular = separated.variantes_regular;
      variantes_small = separated.variantes_small;
    }
    
    const localProduct = {
      nombre: title,
      tipo: tipo,
      animal: animal,
      segmento: segmento,
      productId: shopifyProduct.id ? shopifyProduct.id.toString() : "",
      kcalEmKg: kcalEmKg,
      imagen: imagen,
      variantes: variantes_regular,
    };
    
    if (variantes_small.length > 0) {
      localProduct.variantes_small = variantes_small;
    }
    
    return {
      key: productKey,
      data: localProduct
    };
    
  } catch (error) {
    console.error("[Adapter] Error mapping product:", shopifyProduct?.title);
    return null;
  }
}

/**
 * Genera una clave única para el producto basándose en su título
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto (no usado actualmente)
 * @returns {string} Clave del producto (ej: "PUPPY_SALMON_500_GR")
 */
function generateProductKey(title, tags) {
  // Normalizar título: remover "RETORN", convertir a mayúsculas, reemplazar espacios
  const normalized = title.toUpperCase()
    .replace(/RETORN\s*/gi, "")
    .replace(/\s+-\s+/g, "_") // Reemplazar " - " por "_"
    .replace(/\s+/g, "_") // Reemplazar espacios por "_"
    .replace(/[()]/g, "") // Remover paréntesis
    .trim();
  
  return normalized;
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
    const sku = variant.sku || "";
    const title = variant.title || "";
    const barcode = variant.barcode || "";
    
    const cantidad = extractQuantity(title, variant);
    
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
  }).filter(v => v.cantidad);
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
 * FUNCIONES DE EXTRACCIÓN DE INFORMACIÓN DESDE SHOPIFY
 * Estas funciones extraen información directamente desde tags, metafields y título
 * Sistema 100% dinámico - no requiere base de datos hardcodeada
 */

/**
 * Extrae el tipo de producto (Seco/Húmedo) desde tags o título
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @param {string} productType - Tipo de producto Shopify
 * @returns {string} "Seco" o "Humedo"
 */
function extractProductType(title, tags, productType) {
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());
  
  // Buscar en tags primero (más confiable)
  if (tagsLower.includes('humedo') || tagsLower.includes('húmedo') || tagsLower.includes('wet')) {
    return "Humedo";
  }
  if (tagsLower.includes('seco') || tagsLower.includes('dry')) {
    return "Seco";
  }
  
  // Buscar en título
  // Semihúmedo se considera SECO (es pienso con más humedad pero no latas)
  if (titleLower.includes("semihúmedo") || titleLower.includes("semihumedo")) {
    return "Seco";
  }
  
  // Solo latas/comida húmeda en lata se considera Húmedo
  if (titleLower.includes("lata") || 
      (titleLower.includes("húmedo") && !titleLower.includes("semi")) || 
      (titleLower.includes("humedo") && !titleLower.includes("semi"))) {
    return "Humedo";
  }
  
  // Por defecto: Seco (la mayoría de productos son pienso seco)
  return "Seco";
}

/**
 * Extrae el tipo de animal (Perro/Gato) desde tags o título
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @returns {string} "Perro" o "Gato"
 */
function extractAnimal(title, tags) {
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());
  
  // Buscar en tags primero
  if (tagsLower.includes('gato') || tagsLower.includes('cat')) {
    return "Gato";
  }
  if (tagsLower.includes('perro') || tagsLower.includes('dog')) {
    return "Perro";
  }
  
  // Buscar en título
  if (titleLower.includes("cat") || 
      titleLower.includes("gato") ||
      titleLower.includes("kitten")) {
    return "Gato";
  }
  
  // Por defecto: Perro
  return "Perro";
}

/**
 * Extrae el segmento del producto desde tags o título
 * Analiza palabras clave para determinar: Cachorros, Senior, Esterilizados, Adulto + proteína
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @returns {string} Segmento del producto
 */
function extractSegment(title, tags) {
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());
  
  // Buscar en tags primero
  if (tagsLower.includes('cachorros') || tagsLower.includes('puppy') || tagsLower.includes('kitten')) {
    return "Cachorros";
  }
  if (tagsLower.includes('senior') || tagsLower.includes('light')) {
    return "Senior Light";
  }
  if (tagsLower.includes('esterilizado') || tagsLower.includes('sterilized')) {
    return "Esterilizados Light";
  }
  
  // Buscar en título
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
  
  // Adultos por tipo de proteína (para GATOS)
  // Gatos tienen segmentos específicos por proteína
  if (titleLower.includes("cat") || titleLower.includes("gato")) {
    if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
      return "Adulto Pollo";
    }
    if (titleLower.includes("pescado") || titleLower.includes("fish")) {
      return "Adulto Pescado";
    }
    if (titleLower.includes("salmon") || titleLower.includes("salmón")) {
      return "Salmón";
    }
    if (titleLower.includes("atun") || titleLower.includes("tuna")) {
      if (titleLower.includes("mejillon")) return "Mejillones";
      if (titleLower.includes("sardina")) return "Sardina";
      if (titleLower.includes("gamba")) return "Gambas";
    }
  }
  
  // Adultos por tipo de proteína (para PERROS)
  if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
    if (titleLower.includes("conejo")) return "Pollo Conejo";
    if (titleLower.includes("zanahoria")) return "Pollo Zanahoria";
    return "Adulto Pollo";
  }
  
  if (titleLower.includes("cordero") || titleLower.includes("lamb")) {
    if (titleLower.includes("arroz")) return "Cordero Arroz";
    return "Adulto Cordero";
  }
  
  if (titleLower.includes("salmon") || titleLower.includes("salmón")) {
    if (titleLower.includes("atun")) return "Salmón";
    return "Adulto Salmón";
  }
  
  if (titleLower.includes("pescado") || titleLower.includes("fish")) {
    if (titleLower.includes("patata")) return "Pescado Patatas";
    if (titleLower.includes("zanahoria")) return "Pescado Zanahoria";
    return "Adulto Pescado";
  }
  
  if (titleLower.includes("only")) {
    if (titleLower.includes("cordero")) return "Only Cordero";
    if (titleLower.includes("pollo")) return "Only Pollo";
  }
  
  // Por defecto: Adulto
  return "Adulto";
}

/**
 * Extrae las calorías del producto desde metafields o calcula desde el título
 * Prioridad: metafields > CSV data en descripción > valores por defecto basados en tipo
 * @param {Object} shopifyProduct - Producto de Shopify
 * @param {string} title - Título del producto
 * @param {Array} tags - Tags del producto
 * @returns {number} Kcal por kg
 */
function extractCalories(shopifyProduct, title, tags) {
  if (shopifyProduct.metafields && Array.isArray(shopifyProduct.metafields)) {
    const caloriesField = shopifyProduct.metafields.find(
      mf => mf.key === "kcal_per_kg" || mf.key === "kcal_em_kg" || mf.key === "calories" || mf.key === "calorias"
    );
    
    if (caloriesField && caloriesField.value) {
      const calories = parseFloat(caloriesField.value);
      if (!isNaN(calories) && calories > 0) {
        return calories;
      }
    }
  }
  
  if (shopifyProduct.body_html) {
    const kcalMatch = shopifyProduct.body_html.match(/(\d{3,4})\s*kcal[\s\/]*kg/i);
    if (kcalMatch) {
      return parseInt(kcalMatch[1]);
    }
  }
  
  const titleLower = title.toLowerCase();
  const tipo = extractProductType(title, tags, "");
  
  if (tipo === "Humedo") {
    if (titleLower.includes("kitten") || titleLower.includes("cachorro")) {
      return 871;
    }
    return 900;
  }
  
  if (titleLower.includes("puppy") || titleLower.includes("cachorro") || titleLower.includes("kitten")) {
    if (titleLower.includes("cat") || titleLower.includes("gato")) {
      return 4173;
    }
    return 3451;
  }
  
  if (titleLower.includes("light") || titleLower.includes("senior")) {
    return 3453;
  }
  
  if (titleLower.includes("sterilized") || titleLower.includes("esterilizado")) {
    return 3940;
  }
  
  if (titleLower.includes("cat") || titleLower.includes("gato")) {
    if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
      return 4070;
    }
    if (titleLower.includes("pescado") || titleLower.includes("fish")) {
      return 3686;
    }
    return 3800;
  }
  
  if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
    return 3674;
  }
  if (titleLower.includes("cordero") || titleLower.includes("lamb")) {
    return 3440;
  }
  if (titleLower.includes("salmon") || titleLower.includes("salmón")) {
    return 3327;
  }
  
  return 3500;
}

/**
 * Extrae la cantidad desde el título de la variante
 * @param {string} title - Título de la variante
 * @param {Object} variant - Objeto variante de Shopify
 * @returns {string} Cantidad formateada
 */
function extractQuantity(title, variant) {
  if (title && title !== "Default Title") {
    const boxMatch = title.match(/caja\s+(\d+)\s+latas?\s+(\d+)\s*(gr?|g|kg)/i);
    if (boxMatch) {
      return `Caja ${boxMatch[1]} latas ${boxMatch[2]} ${boxMatch[3]}`;
    }
    
    const compactBoxMatch = title.match(/caja\s*(\d+)\s*x\s*(\d+)\s*(gr?|g|kg)/i);
    if (compactBoxMatch) {
      return `Caja ${compactBoxMatch[1]} latas ${compactBoxMatch[2]} ${compactBoxMatch[3]}`;
    }
    
    // Buscar "X g/kg x Y ud"
    const multiMatch = title.match(/(\d+)\s*(gr?|g|kg)\s*x\s*(\d+)\s*ud/i);
    if (multiMatch) {
      const result = `${multiMatch[1]} ${multiMatch[2]} x ${multiMatch[3]}ud`;
      console.log(`      ✅ Pack detectado: ${result}`);
      return result;
    }
    
    // Buscar cantidad simple: "185 g", "3 kg", "500gr", "500g", "3kg" (CON o SIN espacio)
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
      
      const result = `${amount} ${unit}`;
      console.log(`      ✅ Cantidad simple: ${result}`);
      return result;
    }
  }
  
  // Intentar desde weight (en gramos)
  if (variant.weight && variant.weight > 0) {
    const weightInGrams = variant.weight;
    let result;
    if (weightInGrams >= 1000) {
      const weightInKg = (weightInGrams / 1000).toFixed(1);
      result = `${weightInKg} kg`;
    } else {
      result = `${weightInGrams} g`;
    }
    console.log(`      ⚠️ Usando weight como fallback: ${result} (${weightInGrams}g)`);
    return result;
  }
  
  console.warn(`      ❌ No se pudo extraer cantidad de "${title}"`);
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
