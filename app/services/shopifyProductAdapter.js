/**
 * Adaptador para convertir productos de Shopify al formato local
 * Sistema 100% dinámico que extrae información desde Shopify (tags, metafields, título)
 * NO usa base de datos hardcodeada - todo se actualiza automáticamente desde Shopify
 */

/**
 * Mapea un array de productos de Shopify al formato local
 * @param {Array} shopifyProducts - Array de productos desde la API de Shopify
 * @returns {Object} Objeto con productos en formato local (misma estructura que PRODUCTOS)
 */
export function mapShopifyProductsToLocal(shopifyProducts) {
  const mappedProducts = {};
  
  console.log(`[Adapter] Procesando ${shopifyProducts.length} productos de Shopify...`);
  
  shopifyProducts.forEach(shopifyProduct => {
    // FILTRO: Solo incluir productos alimenticios (Pienso y Comida Húmeda)
    if (!isProductAlimento(shopifyProduct)) {
      console.log(`[Adapter] ⏭️  Omitido (no es alimento): ${shopifyProduct.title}`);
      return;
    }
    
    const localProduct = mapSingleProduct(shopifyProduct);
    if (localProduct && localProduct.key && localProduct.data) {
      // Incluir todos los productos alimenticios con vendor=Retorn
      mappedProducts[localProduct.key] = localProduct.data;
      console.log(`[Adapter] ✅ ${shopifyProduct.title} (${localProduct.data.tipo}, ${localProduct.data.animal}, ${localProduct.data.segmento}, ${localProduct.data.kcalEmKg} kcal)`);
    }
  });
  
  console.log(`[Adapter] Total productos mapeados: ${Object.keys(mappedProducts).length}`);
  
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
    // Extraer información básica del producto
    const title = shopifyProduct.title || "";
    const productType = shopifyProduct.product_type || "";
    const vendor = shopifyProduct.vendor || "";
    const tags = Array.isArray(shopifyProduct.tags) 
      ? shopifyProduct.tags 
      : (typeof shopifyProduct.tags === 'string' ? shopifyProduct.tags.split(',').map(t => t.trim()) : []);
    
    console.log(`[Adapter] Analizando: "${title}"`);
    console.log(`[Adapter] Tags disponibles:`, tags);
    
    // EXTRAER INFORMACIÓN DESDE SHOPIFY (tags, metafields, título)
    const tipo = extractProductType(title, tags, productType);
    const animal = extractAnimal(title, tags);
    const segmento = extractSegment(title, tags);
    const kcalEmKg = extractCalories(shopifyProduct, title, tags);
    
    console.log(`[Adapter] Clasificación extraída: tipo=${tipo}, animal=${animal}, segmento=${segmento}, kcal=${kcalEmKg}`);
    
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
      productId: shopifyProduct.id ? shopifyProduct.id.toString() : "",
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
    console.error("[Adapter] Error mapping Shopify product:", error, shopifyProduct?.title);
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
  // 1. PRIORIDAD: Intentar obtener desde metafields
  if (shopifyProduct.metafields && Array.isArray(shopifyProduct.metafields)) {
    const caloriesField = shopifyProduct.metafields.find(
      mf => mf.key === "kcal_per_kg" || mf.key === "kcal_em_kg" || mf.key === "calories" || mf.key === "calorias"
    );
    
    if (caloriesField && caloriesField.value) {
      const calories = parseFloat(caloriesField.value);
      if (!isNaN(calories) && calories > 0) {
        console.log(`[Adapter] ✅ Calorías desde metafield: ${calories} kcal/kg`);
        return calories;
      }
    }
  }
  
  // 2. Intentar extraer desde body_html o descripción
  if (shopifyProduct.body_html) {
    const kcalMatch = shopifyProduct.body_html.match(/(\d{3,4})\s*kcal[\s\/]*kg/i);
    if (kcalMatch) {
      const calories = parseInt(kcalMatch[1]);
      console.log(`[Adapter] ✅ Calorías desde descripción: ${calories} kcal/kg`);
      return calories;
    }
  }
  
  // 3. FALLBACK: Valores por defecto basados en tipo y segmento
  const titleLower = title.toLowerCase();
  const tipo = extractProductType(title, tags, "");
  
  console.log(`[Adapter] ⚠️  Usando calorías por defecto basadas en tipo/segmento`);
  
  // Comida húmeda (latas)
  if (tipo === "Humedo") {
    if (titleLower.includes("kitten") || titleLower.includes("cachorro")) {
      return 871; // Latas para cachorros
    }
    return 900; // Latas para adultos (promedio)
  }
  
  // Comida seca (pienso)
  if (titleLower.includes("puppy") || titleLower.includes("cachorro") || titleLower.includes("kitten")) {
    if (titleLower.includes("cat") || titleLower.includes("gato")) {
      return 4173; // Gatitos
    }
    return 3451; // Cachorros de perro
  }
  
  if (titleLower.includes("light") || titleLower.includes("senior")) {
    return 3453; // Light/Senior
  }
  
  if (titleLower.includes("sterilized") || titleLower.includes("esterilizado")) {
    return 3940; // Esterilizados
  }
  
  // Adultos por proteína
  if (titleLower.includes("cat") || titleLower.includes("gato")) {
    if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
      return 4070; // Gato adulto pollo
    }
    if (titleLower.includes("pescado") || titleLower.includes("fish")) {
      return 3686; // Gato adulto pescado
    }
    return 3800; // Gato adulto genérico
  }
  
  // Perros adultos
  if (titleLower.includes("pollo") || titleLower.includes("chicken")) {
    return 3674; // Adulto pollo
  }
  if (titleLower.includes("cordero") || titleLower.includes("lamb")) {
    return 3440; // Adulto cordero
  }
  if (titleLower.includes("salmon") || titleLower.includes("salmón")) {
    return 3327; // Adulto salmón
  }
  
  // Por defecto
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
