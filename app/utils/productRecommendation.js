import {
  FACTOR_EDAD_PERRO,
  VAR_ACTIVIDAD_PERRO,
  FACT_ESTERILIZADO,
  FACT_SNACKS,
  PORCENTAJE_ALIMENTACION_MIXTA,
  FACTOR_GATO,
  RAZAS_PERROS,
} from "../data/productConstants";

import { getRecommendedProducts } from "../services/productService";
import { mapShopifyProductsToLocal } from "../services/shopifyProductAdapter";
import { getVariantIdOverride } from "../data/productVariantMapping";

function calcularEdadEnMeses(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  const diffTime = Math.abs(hoy - nacimiento);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const meses = Math.floor(diffDays / 30.44);
  
  return meses;
}

function determinarTamanoRaza(tamano) {
  switch (tamano) {
    case "Pequeño":
      return "Pequeño";
    case "Mediano":
      return "Mediano";
    case "Grande":
      return "Grande";
    default:
      return "Mediano";
  }
}

function determinarFactorEdadPerro(tamano, edad, fechaNacimiento) {
  const meses = calcularEdadEnMeses(fechaNacimiento);
  
  if (edad === "Cachorro" && meses !== null) {
    if (tamano === "Pequeño" || tamano === "Mediano") {
      if (meses <= 4) return FACTOR_EDAD_PERRO["Pequeño-Cachorro-0-4"];
      if (meses <= 6) return FACTOR_EDAD_PERRO["Pequeño-Cachorro-4-6"];
      if (meses <= 10) return FACTOR_EDAD_PERRO["Pequeño-Cachorro-6-10"];
      return FACTOR_EDAD_PERRO["Pequeño-Cachorro-10-12"];
    } else if (tamano === "Grande") {
      if (meses <= 4) return FACTOR_EDAD_PERRO["Grande-Cachorro-0-4"];
      if (meses <= 8) return FACTOR_EDAD_PERRO["Grande-Cachorro-4-8"];
      if (meses <= 12) return FACTOR_EDAD_PERRO["Grande-Cachorro-8-12"];
      if (meses <= 18) return FACTOR_EDAD_PERRO["Grande-Cachorro-12-18"];
      return FACTOR_EDAD_PERRO["Grande-Cachorro-18-24"];
    }
  }
  
  if (edad === "Adulto") {
    return FACTOR_EDAD_PERRO["Adulto"];
  }
  
  if (edad === "Senior") {
    return FACTOR_EDAD_PERRO["Senior"];
  }
  
  return FACTOR_EDAD_PERRO["Adulto"];
}

function determinarVariableActividad(edad, nivelActividad) {
  if (edad === "Cachorro") {
    return VAR_ACTIVIDAD_PERRO["Cachorro"];
  }
  
  if (edad === "Senior") {
    return VAR_ACTIVIDAD_PERRO["Senior"];
  }
  
  return VAR_ACTIVIDAD_PERRO[nivelActividad] || VAR_ACTIVIDAD_PERRO["Media"];
}

function resolverSegmentoPerroSeco(answers) {
  const edad = answers.q4_perro;
  const preferencia = answers.q11_perro || "";
  const patologias = answers.q9_perro;

  if (edad === "Cachorro") return "Cachorros";
  
  // Prioridad 1: Si el cliente pide explícitamente Light en la preferencia
  if (preferencia.includes("Light")) return "Senior Light";
  
  // Prioridad 2: Si es Senior o tiene sobrepeso
  if (edad === "Senior" || patologias?.includes("Sobrepeso")) return "Senior Light";

  // Prioridad 3: Preferencias de sabor para adultos
  if (preferencia.includes("Pollo")) return "Adulto Pollo";
  if (preferencia.includes("Cordero")) return "Adulto Cordero";
  if (preferencia.includes("Salmón")) return "Adulto Salmón";

  return "Adulto Salmón";
}

function resolverSegmentoPerroHumedo(segmentoSeco, preferencia) {
  if (segmentoSeco && segmentoSeco.includes("Cachorro")) return "Cachorros";
  
  if (preferencia) {
    if (preferencia.includes("Lata Pollo con Zanahorias") || preferencia.includes("Pollo zanahoria") || 
        (preferencia.includes("Pollo") && !preferencia.includes("Cordero") && !preferencia.includes("Pescado"))) {
      return "Adulto Pollo";
    }
    
    if (preferencia.includes("Lata Cordero con Arroz") || preferencia.includes("Cordero arroz") || 
        (preferencia.includes("Cordero") && !preferencia.includes("Pollo"))) {
      return "Adulto Cordero";
    }
    
    if (preferencia.includes("Lata Pescado con Zanahorias") || preferencia.includes("Pesc zanahoria") || 
        preferencia.includes("Pesc") || preferencia.includes("Pescado") || preferencia.includes("Salmón")) {
      return "Adulto Pescado";
    }
    
    if (preferencia.includes("Lata Cachorro") || preferencia.includes("Lata cachorro") || preferencia.includes("Cachorro")) {
      return "Cachorros";
    }
  }
  
  if (segmentoSeco) {
    if (segmentoSeco.includes("Cordero")) return "Adulto Cordero";
    if (segmentoSeco.includes("Pollo")) return "Adulto Pollo";
  }
  
  return "Adulto Pescado";
}

function resolverSegmentoGatoSeco(answers) {
  const edad = answers.q3_gato;
  const castrado = answers.q6_gato;
  const patologias = answers.q7_gato;
  const preferencia = answers.q9_gato || "";

  if (edad === "Gatito") return "Cachorros";
  
  if (castrado === "Sí" || patologias?.includes("Sobrepeso")) return "Esterilizados Light";
  
  if (preferencia.includes("Pollo")) return "Adulto Pollo";
  if (preferencia.includes("Pescado")) return "Adulto Pescado";
  if (preferencia.includes("Esterilizados")) return "Esterilizados Light";
  if (preferencia.includes("Gatito")) return "Cachorros";
  
  return "Adulto Pollo";
}

function resolverSegmentoGatoHumedo(segmentoSeco, preferencia) {
  if (segmentoSeco && (segmentoSeco.includes("Cachorro") || segmentoSeco.includes("Gatito"))) {
    return "Cachorros";
  }
  
  // Revisar la preferencia del usuario primero (de q9_gato)
  // Mapear según las opciones de la pregunta 9 para gatos (Mixta):
  // - "Pollo + Lata Pollo con Conejo" → Adulto Pollo
  // - "Pescado + Lata Atún con Gambas" → Adulto Pescado
  // - "Esterilizados + Lata Pollo" → Adulto Pollo
  // - "Gatito + Lata Gatitos" → Cachorros
  
  if (preferencia) {
    // Si menciona "Lata Pollo con Conejo", "Lata Pollo", o "Pollo"
    if (preferencia.includes("Lata Pollo con Conejo") || preferencia.includes("Lata Pollo") || 
        (preferencia.includes("Pollo") && !preferencia.includes("Pescado") && !preferencia.includes("Atún"))) {
      return "Adulto Pollo";
    }
    
    // Si menciona "Lata Atún con Gambas", "Pescado", o "Atún"
    if (preferencia.includes("Lata Atún con Gambas") || preferencia.includes("Pescado") || 
        preferencia.includes("Atún") || preferencia.includes("Fish")) {
      return "Adulto Pescado";
    }
    
    // Si menciona "Lata Gatitos" o "Gatito"
    if (preferencia.includes("Lata Gatitos") || preferencia.includes("Gatito")) {
      return "Cachorros";
    }
    
    // "Esterilizados" va con Pollo por defecto
    if (preferencia.includes("Esterilizados")) {
      return "Adulto Pollo";
    }
  }
  
  // Si no hay preferencia clara, revisar el segmento seco
  if (segmentoSeco) {
    if (segmentoSeco.includes("Pollo") || segmentoSeco.includes("Esterilizado")) {
      return "Adulto Pollo";
    }
  }
  
  return "Adulto Pescado"; // default a pescado
}

async function fetchYMapearPrimero(animal, tipo, segmento, tamanoCroqueta = null) {
  try {
    const productosShopify = await getRecommendedProducts(animal, tipo, segmento);
    if (!productosShopify || productosShopify.length === 0) return null;
    const mapeados = mapShopifyProductsToLocal(productosShopify);
    
    // Si es alimento seco para perros y hay especificación de tamaño de croqueta
    if (animal === "Perro" && tipo === "Seco" && tamanoCroqueta && Object.keys(mapeados).length > 1) {
      // Buscar producto con croqueta del tamaño correcto
      const productosCroquetaPequeña = Object.values(mapeados).filter(p => 
        p.nombre?.toLowerCase().includes("pequeña") || 
        p.nombre?.toLowerCase().includes("small")
      );
      
      const productosCroquetaRegular = Object.values(mapeados).filter(p => 
        !p.nombre?.toLowerCase().includes("pequeña") && 
        !p.nombre?.toLowerCase().includes("small")
      );
      
      if (tamanoCroqueta === "pequeña" && productosCroquetaPequeña.length > 0) {
        console.log(`[Recomendación] Seleccionado producto con croqueta pequeña`);
        return productosCroquetaPequeña[0];
      } else if (tamanoCroqueta === "grande" && productosCroquetaRegular.length > 0) {
        console.log(`[Recomendación] Seleccionado producto con croqueta regular`);
        return productosCroquetaRegular[0];
      }
    }
    
    // Por defecto, devolver el primero
    const primero = Object.values(mapeados)[0];
    return primero || null;
  } catch (e) {
    console.error("[Recomendación] Error obteniendo productos:", e);
    return null;
  }
}

/**
 * Determina el tipo de croqueta recomendada según el peso del perro
 * Tabla de referencia:
 * - Mini/Toy (hasta 5kg): Pequeña (10mm)
 * - Pequeño (5-10kg): Pequeña (10mm)
 * - Mediano (10-25kg): Regular/Grande (15mm)
 * - Grande (25-40kg): Regular/Grande (15mm)
 * - Gigante (>40kg): Regular/Grande (15mm)
 */
function determinarTipoCroqueta(peso) {
  if (!peso || isNaN(peso)) {
    return {
      tipo: "Regular",
      diametro: "15 mm",
      tamanoCroqueta: "grande"
    };
  }
  
  const pesoNum = parseFloat(peso);
  
  if (pesoNum <= 10) {
    return {
      tipo: "Pequeña",
      diametro: "10 mm",
      tamanoCroqueta: "pequeña"
    };
  } else {
    return {
      tipo: "Regular",
      diametro: "15 mm",
      tamanoCroqueta: "grande"
    };
  }
}

/**
 * Detecta el tipo de croqueta real del producto seleccionado
 * Analiza el nombre y variantes del producto para determinar si tiene croqueta pequeña o regular
 */
function detectarTipoCroquetaProducto(producto) {
  if (!producto || producto.tipo !== "Seco" || producto.animal !== "Perro") {
    return null; // Solo aplica a alimentos secos para perros
  }
  
  const nombreLower = producto.nombre?.toLowerCase() || "";
  
  // Verificar si tiene variantes de ambos tipos
  const tieneVariantesSmall = producto.variantes?.some(v => 
    v.sku?.toLowerCase().includes('s') || 
    v.cantidad?.toLowerCase().includes('small') ||
    v.cantidad?.toLowerCase().includes('pequeña')
  );
  
  const tieneVariantesRegular = producto.variantes?.some(v => 
    !v.sku?.toLowerCase().includes('s') && 
    !v.cantidad?.toLowerCase().includes('small') &&
    !v.cantidad?.toLowerCase().includes('pequeña')
  );
  
  // Detectar si el producto específico es small bite
  const esSmallBite = nombreLower.includes('small') || 
                      nombreLower.includes('pequeña') ||
                      producto.segmento?.toLowerCase().includes('razas s');
  
  if (esSmallBite) {
    return {
      tipo: "Pequeña",
      diametro: "10 mm",
      disponibilidad: tieneVariantesRegular ? "También disponible en croqueta regular" : "Tamaño único"
    };
  } else {
    return {
      tipo: "Regular",
      diametro: "15 mm",
      disponibilidad: tieneVariantesSmall ? "También disponible en croqueta pequeña" : "Tamaño único"
    };
  }
}

/**
 * Determina el caso específico para gatos
 * Según Excel: diferentes FACT y FACT2 según edad y condiciones
 */
function determinarCasoGato(edad, mesesSeleccionados, castrado, patologias) {
  const meses = calcularEdadEnMeses(mesesSeleccionados);
  
  if (edad === "Gatito") {
    // Con fecha de nacimiento
    if (meses !== null) {
      if (meses < 4) return FACTOR_GATO["Gatito-1.5-5"];      // 1-4 meses: 250, 1
      if (meses <= 7) return FACTOR_GATO["Gatito-4-7"];       // 4-7 meses: 130, 1
      if (meses <= 9) return FACTOR_GATO["Gatito-7-9"];       // 7-9 meses: 100, 1
      if (meses <= 12) return FACTOR_GATO["Gatito-9-12"];     // 9-12 meses: 100, 1 (mismo que 7-9)
      return FACTOR_GATO["Gatito-12-14"];                     // >12 meses: 80, 1
    }
    
    // Sin fecha de nacimiento, usar selector manual
    const rangoMeses = mesesSeleccionados;
    if (rangoMeses === "1-4 meses") return FACTOR_GATO["Gatito-1.5-5"];
    if (rangoMeses === "4-7 meses") return FACTOR_GATO["Gatito-4-7"];
    if (rangoMeses === "7-9 meses") return FACTOR_GATO["Gatito-7-9"];
    if (rangoMeses === "9-12 meses") return FACTOR_GATO["Gatito-9-12"];
    if (rangoMeses === "12-14 meses") return FACTOR_GATO["Gatito-12-14"];
    
    // Default para gatito
    return FACTOR_GATO["Gatito-4-7"];
  }
  
  if (edad === "Senior") {
    return FACTOR_GATO["Senior"]; // 45, 1
  }
  
  // Adulto
  const tieneSobrepeso = patologias?.includes("Sobrepeso");
  if (castrado === "Sí" || tieneSobrepeso) {
    return FACTOR_GATO["Adulto-Esterilizado"]; // 130, 0.4
  }
  
  return FACTOR_GATO["Adulto"]; // 100, 0.67
}

// ============================================
// ALGORITMO PRINCIPAL: PERROS
// ============================================

/**
 * Calcula las calorías diarias necesarias para un perro
 * Fórmula: Kcal_dia = FACTOR_ESTERILIZADO * FACTOR_SNACKS * FACTOR_EDAD * (VAR * PESO^0.75)
 * 
 * Donde:
 * - FACTOR_ESTERILIZADO = 0.8 si está esterilizado, 1 si no
 * - FACTOR_SNACKS = 0.9 si consume snacks habitualmente, 1 si no
 * - FACTOR_EDAD depende de edad y tamaño (ver tabla en productConstants.js)
 * - VAR = factor de actividad (95 baja, 130 media, 180 alta)
 * - PESO = peso del perro en kg
 */
export function calcularCaloriasPerro(answers) {
  const tamano = answers.q3_perro; // "Pequeño", "Mediano", "Grande"
  const edad = answers.q4_perro; // "Cachorro", "Adulto", "Senior"
  const nivelActividad = answers.q5_perro; // "Baja", "Media", "Muy Alta (Deportiva)"
  const peso = parseFloat(answers.q6_perro); // Peso en kg
  const snacks = answers.q7_perro; // "1 o menos", "2-3", "Muchos (Más de 3)"
  const castrado = answers.q8_perro; // "Sí", "No"
  const patologias = answers.q9_perro; // Patologías
  const fechaNacimiento = answers.q2b;
  
  if (!peso || isNaN(peso)) {
    throw new Error("Peso no válido");
  }
  
  // 1. FACTOR_ESTERILIZADO: 0.8 si está esterilizado o tiene sobrepeso, 1 si no
  const FACTOR_ESTERILIZADO = (castrado === "Sí" || patologias?.includes("Sobrepeso")) ? 0.8 : 1;
  
  // 2. FACTOR_SNACKS: 0.9 si consume snacks, 1 si no
  let FACTOR_SNACKS = 1;
  if (snacks === "2-3" || snacks === "Muchos (Más de 3)") {
    FACTOR_SNACKS = 0.9;
  }
  
  // 3. FACTOR_EDAD: según edad, tamaño y meses (ver tabla en productConstants.js)
  const FACTOR_EDAD = determinarFactorEdadPerro(tamano, edad, fechaNacimiento);
  
  // 4. VAR: Variable de actividad base según edad y nivel
  const VAR = determinarVariableActividad(edad, nivelActividad);
  
  // 5. Cálculo de la tasa metabólica basal: VAR * PESO^0.75
  const tasaMetabolica = VAR * Math.pow(peso, 0.75);
  
  // 6. Fórmula completa: FACTOR_ESTERILIZADO * FACTOR_SNACKS * FACTOR_EDAD * tasaMetabolica
  const kcalDiarias = FACTOR_ESTERILIZADO * FACTOR_SNACKS * FACTOR_EDAD * tasaMetabolica;
  
  return {
    kcalDiarias: Math.round(kcalDiarias * 10) / 10, // Redondear a 1 decimal
    factores: {
      FACTOR_ESTERILIZADO,
      FACTOR_SNACKS,
      FACTOR_EDAD,
      VAR,
      tasaMetabolica: Math.round(tasaMetabolica * 10) / 10,
      peso,
      edad,
      tamano,
      nivelActividad,
      castrado,
    }
  };
}

/**
 * Calcula las calorías diarias necesarias para un gato
 */
export function calcularCaloriasGato(answers) {
  const edad = answers.q3_gato; // "Gatito", "Adulto", "Senior"
  const mesesGatito = answers.q4_gato_gatito; // "1-4 meses", "4-7 meses", etc.
  const peso = parseFloat(answers.q5_gato); // Peso en kg
  const castrado = answers.q6_gato; // "Sí", "No"
  const patologias = answers.q7_gato; // Array de patologías
  const fechaNacimiento = answers.q2b;
  
  if (!peso || isNaN(peso)) {
    throw new Error("Peso no válido");
  }
  
  // Determinar caso específico
  const caso = determinarCasoGato(edad, mesesGatito || fechaNacimiento, castrado, patologias);
  
  // Fórmula: FACT * (PESO^FACT2)
  const kcalDiarias = caso.FACT * Math.pow(peso, caso.FACT2);
  
  return {
    kcalDiarias: Math.round(kcalDiarias * 100) / 100,
    factores: {
      FACT: caso.FACT,
      FACT2: caso.FACT2,
      peso,
    }
  };
}

// ============================================
// SELECCIÓN DE PRODUCTOS
// ============================================

/**
 * Selecciona el producto seco adecuado para un perro
 */
async function seleccionarProductoSecoPerro(answers) {
  const segmentoSeco = resolverSegmentoPerroSeco(answers);
  const peso = parseFloat(answers.q6_perro);
  const tipoCroqueta = determinarTipoCroqueta(peso);
  
  console.log("🔍 Seleccionando producto seco para perro → segmento:", segmentoSeco, "| croqueta:", tipoCroqueta.tamanoCroqueta);
  return await fetchYMapearPrimero("Perro", "Seco", segmentoSeco, tipoCroqueta.tamanoCroqueta);
}

/**
 * Selecciona el producto húmedo adecuado para un perro
 */
async function seleccionarProductoHumedoPerro(productoSeco, answers) {
  const preferencia = answers?.q11_perro || "";
  const segmentoHumedo = resolverSegmentoPerroHumedo(productoSeco?.segmento, preferencia);
  console.log("🔍 Seleccionando producto húmedo para perro → segmento:", segmentoHumedo);
  return await fetchYMapearPrimero("Perro", "Humedo", segmentoHumedo);
}

/**
 * Selecciona el producto seco adecuado para un gato
 */
async function seleccionarProductoSecoGato(answers) {
  const segmentoSeco = resolverSegmentoGatoSeco(answers);
  console.log("🔍 Seleccionando producto seco para gato → segmento:", segmentoSeco);
  return await fetchYMapearPrimero("Gato", "Seco", segmentoSeco);
}

/**
 * Selecciona producto húmedo para gato
 */
async function seleccionarProductoHumedoGato(productoSeco, answers) {
  const preferencia = answers?.q9_gato || "";
  const segmentoHumedo = resolverSegmentoGatoHumedo(productoSeco?.segmento, preferencia);
  console.log("🔍 Seleccionando producto húmedo para gato → segmento:", segmentoHumedo);
  return await fetchYMapearPrimero("Gato", "Humedo", segmentoHumedo);
}

// ============================================
// CÁLCULO DE CANTIDADES
// ============================================

/**
 * Calcula los gramos de producto diarios necesarios
 * 
 * @param {number} kcalDiarias - Calorías diarias que necesita el animal
 * @param {number} kcalEmKg - Calorías por kilogramo del producto (kcal EM/kg)
 * @returns {number} - Gramos diarios del producto
 * 
 * Fórmula: gramos_diarios = (kcal_diarias / kcal_por_kg) * 1000
 * 
 * Ejemplo:
 * - Perro necesita 800 kcal/día
 * - Producto tiene 3500 kcal/kg
 * - Gramos = (800 / 3500) * 1000 = 228.57g ≈ 229g/día
 */
function calcularGramosProducto(kcalDiarias, kcalEmKg) {
  if (!kcalEmKg || kcalEmKg <= 0) {
    console.warn("⚠️ kcalEmKg no válido:", kcalEmKg);
    return 0;
  }
  
  if (!kcalDiarias || kcalDiarias <= 0) {
    console.warn("⚠️ kcalDiarias no válido:", kcalDiarias);
    return 0;
  }
  
  const gramos = (kcalDiarias / kcalEmKg) * 1000;
  return Math.round(gramos);
}

/**
 * Calcula las cantidades para alimentación mixta
 * 
 * Distribuye las calorías diarias entre alimento seco y húmedo según porcentajes configurados
 * Por defecto: 75% seco, 25% húmedo
 * 
 * @param {number} kcalDiarias - Calorías totales diarias que necesita el animal
 * @param {object} productoSeco - Producto seco con su kcalEmKg
 * @param {object} productoHumedo - Producto húmedo con su kcalEmKg
 * @returns {object} - { seco: gramos, humedo: gramos }
 * 
 * Ejemplo:
 * - Perro necesita 800 kcal/día
 * - 75% seco = 600 kcal → Si producto tiene 3500 kcal/kg → 171g/día
 * - 25% húmedo = 200 kcal → Si producto tiene 1000 kcal/kg → 200g/día
 */
function calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo) {
  // Distribuir calorías según porcentajes configurados
  const kcalSeco = kcalDiarias * PORCENTAJE_ALIMENTACION_MIXTA.SECO;
  const kcalHumedo = kcalDiarias * PORCENTAJE_ALIMENTACION_MIXTA.HUMEDO;
  
  console.log(`\n📊 Cálculo Alimentación Mixta:`);
  console.log(`   Calorías totales/día: ${kcalDiarias.toFixed(1)} kcal`);
  console.log(`   Distribución: ${PORCENTAJE_ALIMENTACION_MIXTA.SECO * 100}% seco + ${PORCENTAJE_ALIMENTACION_MIXTA.HUMEDO * 100}% húmedo`);
  console.log(`   → Seco: ${kcalSeco.toFixed(1)} kcal/día`);
  console.log(`   → Húmedo: ${kcalHumedo.toFixed(1)} kcal/día`);
  
  // Calcular gramos para cada tipo
  const gramosSeco = productoSeco?.kcalEmKg 
    ? calcularGramosProducto(kcalSeco, productoSeco.kcalEmKg)
    : 0;
    
  const gramosHumedo = productoHumedo?.kcalEmKg 
    ? calcularGramosProducto(kcalHumedo, productoHumedo.kcalEmKg)
    : 0;
  
  if (productoSeco?.kcalEmKg) {
    console.log(`   Producto Seco: ${productoSeco.kcalEmKg} kcal/kg → ${gramosSeco}g/día`);
  }
  
  if (productoHumedo?.kcalEmKg) {
    console.log(`   Producto Húmedo: ${productoHumedo.kcalEmKg} kcal/kg → ${gramosHumedo}g/día`);
  }
  
  return {
    seco: gramosSeco,
    humedo: gramosHumedo,
  };
}

/**
 * Calcula los gramos totales de una variante, considerando packs
 * @param {string} cantidad - String de cantidad (ej: "400 gr x 12ud", "3 kg", "185 gr")
 * @returns {number} - Gramos totales
 */
function calcularGramosTotales(cantidad) {
  const cantidadLower = cantidad.toLowerCase();
  
  // Patrón 1: "Caja 12 latas 185 g" o "Caja 18x80gr"
  const matchCaja = cantidadLower.match(/caja\s*(\d+)(?:\s*latas)?\s*(?:x\s*)?(\d+(?:\.\d+)?)\s*g/i);
  if (matchCaja) {
    const unidades = parseFloat(matchCaja[1]);
    const gramosPorUnidad = parseFloat(matchCaja[2]);
    return gramosPorUnidad * unidades;
  }
  
  // Patrón 2: "185 g x 12ud" o "400 gr x 12ud"
  const matchPack = cantidadLower.match(/(\d+(?:\.\d+)?)\s*gr?\s*x\s*(\d+)\s*ud/i);
  if (matchPack) {
    const gramosPorUnidad = parseFloat(matchPack[1]);
    const unidades = parseFloat(matchPack[2]);
    return gramosPorUnidad * unidades;
  }
  
  // Patrón 3: "Pack 12 ud" o "Pack 18 ud" (buscar en el título si no hay gramaje explícito)
  // En este caso, intentar extraer el gramaje base de otras variantes
  const matchPackSolo = cantidadLower.match(/(?:pack|caja)\s*(\d+)\s*(?:latas|ud)/i);
  if (matchPackSolo) {
    const unidades = parseFloat(matchPackSolo[1]);
    // Intentar encontrar un gramaje en el string
    const matchGramos = cantidadLower.match(/(\d+(?:\.\d+)?)\s*g/i);
    if (matchGramos) {
      const gramosPorUnidad = parseFloat(matchGramos[1]);
      return gramosPorUnidad * unidades;
    }
  }
  
  // Patrón 4: Si es en kg (sin pack)
  if (cantidadLower.includes("kg") && !cantidadLower.includes("x")) {
    const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
    return numeros ? parseFloat(numeros[1]) * 1000 : 0;
  }
  
  // Patrón 5: Gramos simples (lata individual)
  const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
  return numeros ? parseFloat(numeros[1]) : 0;
}

/**
 * Selecciona la variante de tamaño más adecuada
 * Algoritmo optimizado para duraciones realistas de 4-10 semanas
 * MEJORA: Cantidades ligeramente superiores para mayor duración
 */
function seleccionarVariante(producto, gramosDiarios, tamano, esHumedo = false) {
  console.log(`\n🔍 seleccionarVariante: ${producto.nombre}`);
  console.log(`   Gramos diarios: ${gramosDiarios}g | Tamaño: ${tamano} | Húmedo: ${esHumedo}`);
  
  let variantes = producto.variantes;
  console.log(`   Variantes disponibles: ${variantes?.length || 0}`);
  if (variantes && variantes.length > 0) {
    console.log(`   Cantidades: ${variantes.map(v => v.cantidad).join(', ')}`);
  } else {
    console.warn(`   ⚠️ No hay variantes disponibles para ${producto.nombre}`);
    return null;
  }

  // Para productos húmedos, priorizar SIEMPRE los paquetes/cajas
  if (esHumedo) {
    // Filtrar variantes que sean packs o cajas (12, 18, 24, 25 unidades)
    const variantesPack = variantes.filter(v => {
      const cantidadLower = v.cantidad.toLowerCase();
      return (
        cantidadLower.includes("caja") ||
        cantidadLower.includes("pack") ||
        cantidadLower.includes("12 ud") || 
        cantidadLower.includes("12ud") ||
        cantidadLower.includes("18 ud") ||
        cantidadLower.includes("18ud") ||
        cantidadLower.includes("24 ud") ||
        cantidadLower.includes("24ud") ||
        cantidadLower.includes("25 ud") ||
        cantidadLower.includes("25ud") ||
        cantidadLower.includes("x 12") ||
        cantidadLower.includes("x 18") ||
        cantidadLower.includes("x 24") ||
        cantidadLower.includes("x 25")
      );
    });
    
    // Si hay packs, usar SOLO esos (ignorar latas individuales completamente)
    if (variantesPack.length > 0) {
      variantes = variantesPack;
      console.log(`✅ Comida húmeda: ${variantesPack.length} pack(s) disponible(s), ignorando latas individuales`);
    } else {
      console.log(`⚠️ Comida húmeda: No hay packs disponibles, usando latas individuales`);
    }
  }

  // Para perros pequeños, usar variantes "small bite" si están disponibles (solo secos)
  if (tamano === "Pequeño" && producto.variantes_small && !esHumedo) {
    variantes = producto.variantes_small;
  }

  // Ordenar variantes por tamaño (de menor a mayor)
  variantes.sort((a, b) => {
    const gramosA = calcularGramosTotales(a.cantidad);
    const gramosB = calcularGramosTotales(b.cantidad);
    return gramosA - gramosB;
  });

  // Duraciones óptimas
  // - Para comida húmeda: 30-60 días (1-2 meses) - más tiempo para los packs
  // - Para comida seca: 28-70 días (4-10 semanas)
  const diasOptimosMin = esHumedo ? 30 : 28;
  const diasOptimosMax = esHumedo ? 60 : 70;
  const diasIdeal = esHumedo ? 45 : 49; // 1.5 meses para húmedo, 7 semanas para seco

  let mejorVariante = variantes[variantes.length - 1]; // Default: la más grande
  let mejorPuntuacion = -Infinity;

  for (const variante of variantes) {
    const gramos = calcularGramosTotales(variante.cantidad);
    const diasDuracion = gramos / gramosDiarios;
    
    console.log(`Variante "${variante.cantidad}": ${gramos}g total, ${diasDuracion.toFixed(1)} días de duración`);

    let puntuacion = 0;

    // BONUS ESPECIAL para productos húmedos en pack/caja (20 puntos extra)
    if (esHumedo) {
      const cantidadLower = variante.cantidad.toLowerCase();
      const esPack = cantidadLower.includes("caja") || 
                     cantidadLower.includes("pack") ||
                     /\d+\s*ud/.test(cantidadLower);
      if (esPack) {
        puntuacion += 20;
        console.log(`  ✅ Bonus pack/caja: +20 puntos`);
      }
    }

    // Factor 1: Proximidad a la duración ideal (50% del peso)
    if (diasDuracion >= diasOptimosMin && diasDuracion <= diasOptimosMax) {
      // Máxima puntuación en el rango óptimo, favoreciendo el punto medio
      const distanciaIdeal = Math.abs(diasDuracion - diasIdeal);
      puntuacion += 100 - (distanciaIdeal * 1.5); // Penalización más suave
    } else if (diasDuracion < diasOptimosMin) {
      // Penalizar fuertemente duraciones muy cortas
      const deficit = diasOptimosMin - diasDuracion;
      // Para comida húmeda, penalizar AÚN MÁS las duraciones cortas
      const factorPenalizacion = esHumedo ? 5 : 3;
      puntuacion += 50 - (deficit * factorPenalizacion);
    } else {
      // Penalizar levemente duraciones muy largas (preferimos más cantidad)
      const exceso = diasDuracion - diasOptimosMax;
      puntuacion += 80 - (exceso * 1); // Penalización muy suave
    }

    // Factor 2: Eficiencia por tamaño del animal (30% del peso)
    if (tamano === "Pequeño") {
      // Para perros pequeños: preferir 3-12 kg
      if (gramos >= 3000 && gramos <= 12000) {
        puntuacion += 30;
      } else if (gramos < 3000) {
        puntuacion += 10; // Penalizar muy pequeño
      } else if (gramos <= 20000) {
        puntuacion += 25; // Aceptar cantidades mayores
      } else {
        puntuacion += 15;
      }
    } else if (tamano === "Mediano") {
      // Para perros medianos: preferir 6-20 kg
      if (gramos >= 6000 && gramos <= 20000) {
        puntuacion += 30;
      } else if (gramos < 6000) {
        puntuacion += 10;
      } else {
        puntuacion += 25; // Aceptar cantidades mayores
      }
    } else if (tamano === "Grande") {
      // Para perros grandes: preferir 12+ kg
      if (gramos >= 12000) {
        puntuacion += 30;
      } else if (gramos >= 6000) {
        puntuacion += 15;
      } else {
        puntuacion += 5; // Muy pequeño para perro grande
      }
    } else {
      // Para gatos (sin tamaño especificado)
      if (gramos >= 2000 && gramos <= 6000) {
        puntuacion += 30;
      } else if (gramos > 6000) {
        puntuacion += 25; // Aceptar cantidades mayores
      } else {
        puntuacion += 15;
      }
    }

    // Factor 3: Costo-eficiencia (20% del peso)
    // Tamaños más grandes son más económicos por gramo
    const costoPorKg = 1 / (gramos / 1000);
    puntuacion += Math.max(0, 20 - costoPorKg * 1.5); // Favorece más las cantidades grandes

    // BONUS: Para productos húmedos, dar 50 puntos extra a packs de 12
    if (esHumedo && (variante.cantidad.toLowerCase().includes("12 ud") || 
                     variante.cantidad.toLowerCase().includes("12ud") ||
                     variante.cantidad.toLowerCase().includes("x 12"))) {
      puntuacion += 50; // Gran bonus para packs de 12
    }

    if (puntuacion > mejorPuntuacion) {
      mejorPuntuacion = puntuacion;
      mejorVariante = variante;
    }
  }

  console.log(`   ✅ Variante seleccionada: ${mejorVariante?.cantidad || 'NINGUNA'} (puntuación: ${mejorPuntuacion.toFixed(1)})`);
  return mejorVariante;
}

/**
 * Aplica override de variantId (si existe) para el producto/cantidad seleccionados.
 * Mantiene la misma cantidad elegida, pero fuerza el variantId y ajusta el link.
 */
function aplicarOverrideVariante(producto, variante) {
  try {
    if (!producto || !variante) return variante;
    const overrideId = getVariantIdOverride(producto.productId, variante.cantidad);
    if (!overrideId) return variante;

    const nuevaVariante = { ...variante, variantId: String(overrideId) };
    // Ajustar link para usar el nuevo variantId
    if (nuevaVariante.link) {
      const [base, q] = nuevaVariante.link.split("?");
      if (q && q.includes("variant=")) {
        nuevaVariante.link = `${base}?variant=${overrideId}`;
      } else {
        nuevaVariante.link = `${base}?variant=${overrideId}`;
      }
    }
    return nuevaVariante;
  } catch (e) {
    console.error("[Recomendación] Error aplicando override de variante:", e);
    return variante;
  }
}

// ============================================
// FUNCIÓN PRINCIPAL DE RECOMENDACIÓN
// ============================================

/**
 * Calcula la recomendación completa de productos
 */
export async function calcularRecomendacionProductos(answers) {
  const tipoAnimal = answers.q1; // "Perro" o "Gato"
  const tipoAlimentacion = tipoAnimal === "Perro" 
    ? answers.q10_perro 
    : answers.q8_gato; // "Seca" o "Mixta"
  
  console.log("🎯 Calculando recomendación de productos...");
  console.log("   Animal:", tipoAnimal, "| Alimentación:", tipoAlimentacion);
  // Con el nuevo sistema, obtendremos exactamente los productos necesarios por IDs
  
  let resultado = {
    tipoAnimal,
    nombreMascota: answers.q2,
    tipoAlimentacion,
  };
  
  try {
    if (tipoAnimal === "Perro") {
      // Calcular calorías
      const { kcalDiarias, factores } = calcularCaloriasPerro(answers);
      resultado.kcalDiarias = kcalDiarias;
      resultado.factores = factores;
      
      // Determinar tipo de croqueta según el peso
      const peso = parseFloat(answers.q6_perro);
      const tipoCroqueta = determinarTipoCroqueta(peso);
      
      // Seleccionar productos usando el sistema de IDs
      const productoSeco = await seleccionarProductoSecoPerro(answers);
      const productoHumedo = await seleccionarProductoHumedoPerro(productoSeco, answers);
      
      // Actualizar tipo de croqueta con información real del producto seleccionado
      const tipoCroquetaReal = detectarTipoCroquetaProducto(productoSeco);
      resultado.tipoCroqueta = tipoCroquetaReal || tipoCroqueta;
      
      if (tipoAlimentacion === "Seca") {
        // Solo producto seco
        const gramosDiarios = productoSeco ? calcularGramosProducto(kcalDiarias, productoSeco.kcalEmKg) : 0;
        let variante = productoSeco ? seleccionarVariante(productoSeco, gramosDiarios, answers.q3_perro, false) : null;
        if (productoSeco && variante) variante = aplicarOverrideVariante(productoSeco, variante);
        
        console.log(`\n📦 Alimentación SECA para ${answers.q2}:`);
        console.log(`   Producto: ${productoSeco?.nombre || 'N/A'}`);
        console.log(`   Calorías del producto: ${productoSeco?.kcalEmKg || 'N/A'} kcal/kg`);
        console.log(`   Calorías necesarias: ${kcalDiarias} kcal/día`);
        console.log(`   ➡️ Cantidad diaria: ${gramosDiarios}g/día`);
        console.log(`   Variante recomendada: ${variante?.cantidad || 'NINGUNA'}`);
        
        resultado.recomendacion = {
          tipo: "seca",
          productoSeco: productoSeco ? {
            ...productoSeco,
            varianteRecomendada: variante,
            gramosDiarios,
          } : null,
        };
      } else {
        // Alimentación mixta
        const cantidades = calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo);
        let varianteSeco = productoSeco ? seleccionarVariante(productoSeco, cantidades.seco, answers.q3_perro, false) : null;
        let varianteHumedo = productoHumedo ? seleccionarVariante(productoHumedo, cantidades.humedo, answers.q3_perro, true) : null;
        if (productoSeco && varianteSeco) varianteSeco = aplicarOverrideVariante(productoSeco, varianteSeco);
        if (productoHumedo && varianteHumedo) varianteHumedo = aplicarOverrideVariante(productoHumedo, varianteHumedo);
        
        console.log(`\n📦 Alimentación MIXTA para ${answers.q2}:`);
        console.log(`   Total calorías: ${kcalDiarias} kcal/día`);
        console.log(`   Seco (${PORCENTAJE_ALIMENTACION_MIXTA.SECO * 100}%): ${cantidades.seco}g/día`);
        console.log(`   Húmedo (${PORCENTAJE_ALIMENTACION_MIXTA.HUMEDO * 100}%): ${cantidades.humedo}g/día`);
        
        resultado.recomendacion = {
          tipo: "mixta",
          productoSeco: productoSeco ? {
            ...productoSeco,
            varianteRecomendada: varianteSeco,
            gramosDiarios: cantidades.seco,
          } : null,
          productoHumedo: productoHumedo ? {
            ...productoHumedo,
            varianteRecomendada: varianteHumedo,
            gramosDiarios: cantidades.humedo,
          } : null,
        };
      }
      
    } else if (tipoAnimal === "Gato") {
      // Calcular calorías
      const { kcalDiarias, factores } = calcularCaloriasGato(answers);
      resultado.kcalDiarias = kcalDiarias;
      resultado.factores = factores;
      
      // Seleccionar productos usando el sistema de IDs
      const productoSeco = await seleccionarProductoSecoGato(answers);
      const productoHumedo = await seleccionarProductoHumedoGato(productoSeco, answers);
      
      if (tipoAlimentacion === "Seca") {
        // Solo producto seco
        const gramosDiarios = productoSeco ? calcularGramosProducto(kcalDiarias, productoSeco.kcalEmKg) : 0;
        let variante = productoSeco ? seleccionarVariante(productoSeco, gramosDiarios, "Gato", false) : null;
        if (productoSeco && variante) variante = aplicarOverrideVariante(productoSeco, variante);
        
        console.log(`\n📦 Alimentación SECA para ${answers.q2}:`);
        console.log(`   Producto: ${productoSeco?.nombre || 'N/A'}`);
        console.log(`   Calorías del producto: ${productoSeco?.kcalEmKg || 'N/A'} kcal/kg`);
        console.log(`   Calorías necesarias: ${kcalDiarias} kcal/día`);
        console.log(`   ➡️ Cantidad diaria: ${gramosDiarios}g/día`);
        console.log(`   Variante recomendada: ${variante?.cantidad || 'NINGUNA'}`);
        
        resultado.recomendacion = {
          tipo: "seca",
          productoSeco: productoSeco ? {
            ...productoSeco,
            varianteRecomendada: variante,
            gramosDiarios,
          } : null,
        };
      } else {
        // Alimentación mixta
        const cantidades = calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo);
        let varianteSeco = productoSeco ? seleccionarVariante(productoSeco, cantidades.seco, "Gato", false) : null;
        let varianteHumedo = productoHumedo ? seleccionarVariante(productoHumedo, cantidades.humedo, "Gato", true) : null;
        if (productoSeco && varianteSeco) varianteSeco = aplicarOverrideVariante(productoSeco, varianteSeco);
        if (productoHumedo && varianteHumedo) varianteHumedo = aplicarOverrideVariante(productoHumedo, varianteHumedo);
        
        console.log(`\n📦 Alimentación MIXTA para ${answers.q2}:`);
        console.log(`   Total calorías: ${kcalDiarias} kcal/día`);
        console.log(`   Seco (${PORCENTAJE_ALIMENTACION_MIXTA.SECO * 100}%): ${cantidades.seco}g/día`);
        console.log(`   Húmedo (${PORCENTAJE_ALIMENTACION_MIXTA.HUMEDO * 100}%): ${cantidades.humedo}g/día`);
        
        resultado.recomendacion = {
          tipo: "mixta",
          productoSeco: productoSeco ? {
            ...productoSeco,
            varianteRecomendada: varianteSeco,
            gramosDiarios: cantidades.seco,
          } : null,
          productoHumedo: productoHumedo ? {
            ...productoHumedo,
            varianteRecomendada: varianteHumedo,
            gramosDiarios: cantidades.humedo,
          } : null,
        };
      }
    }
    
    return resultado;
    
  } catch (error) {
    console.error("Error calculando recomendación:", error);
    throw error;
  }
}
