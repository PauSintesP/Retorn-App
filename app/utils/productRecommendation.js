/**
 * Algoritmo para calcular las recomendaciones de productos
 * basándose en las respuestas del formulario
 */

import {
  FACTOR_EDAD_PERRO,
  VAR_ACTIVIDAD_PERRO,
  FACT_ESTERILIZADO,
  FACT_SNACKS,
  FACTOR_GATO,
  RAZAS_PERROS,
} from "../data/productConstants";

import { getProducts } from "../services/productService";

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Calcula la edad en meses desde la fecha de nacimiento
 */
function calcularEdadEnMeses(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  const diffTime = Math.abs(hoy - nacimiento);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const meses = Math.floor(diffDays / 30.44); // Promedio de días por mes
  
  return meses;
}

/**
 * Determina el tamaño de raza del perro
 */
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

/**
 * Determina el factor de edad para perros basándose en tamaño, edad y fecha de nacimiento
 */
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

/**
 * Determina la variable de actividad para perros
 */
function determinarVariableActividad(edad, nivelActividad) {
  if (edad === "Cachorro") {
    return VAR_ACTIVIDAD_PERRO["Cachorro"];
  }
  
  if (edad === "Senior") {
    return VAR_ACTIVIDAD_PERRO["Senior"];
  }
  
  // Adulto
  return VAR_ACTIVIDAD_PERRO[nivelActividad] || VAR_ACTIVIDAD_PERRO["Media"];
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
 * Fórmula Excel: FACT × (PESO ^ 0.75)
 * FACT depende de: edad, actividad, esterilización, patologías
 */
export function calcularCaloriasPerro(answers) {
  const tamano = answers.q3_perro; // "Pequeño", "Mediano", "Grande"
  const edad = answers.q4_perro; // "Cachorro", "Adulto", "Senior"
  const nivelActividad = answers.q5_perro; // "Baja", "Media", "Muy Alta (Deportiva)"
  const peso = parseFloat(answers.q6_perro); // Peso en kg
  const castrado = answers.q8_perro; // "Sí", "No"
  const patologias = answers.q9_perro; // Patologías
  const fechaNacimiento = answers.q2b;
  
  if (!peso || isNaN(peso)) {
    throw new Error("Peso no válido");
  }
  
  let FACT = 130; // Valor por defecto (adulto activo / cachorro)
  const FACT2 = 0.75; // Exponente fijo para perros
  
  // Determinar FACT según edad, actividad y condiciones
  if (edad === "Cachorro") {
    // Cachorros: siempre 130 (media actividad)
    FACT = 130;
  } else if (edad === "Senior") {
    // Senior: 95 (baja actividad)
    FACT = 95;
  } else {
    // Adultos: según actividad
    if (nivelActividad === "Baja") {
      FACT = 95;
    } else if (nivelActividad === "Media") {
      FACT = 130;
    } else if (nivelActividad === "Muy Alta (Deportiva)") {
      FACT = 180;
    }
    
    // Adulto esterilizado o con sobrepeso: usar 95 (como baja actividad)
    if (castrado === "Sí" || patologias?.includes("Sobrepeso")) {
      FACT = 95;
    }
  }
  
  // Fórmula Excel: FACT × (PESO ^ 0.75)
  const kcalDiarias = FACT * Math.pow(peso, FACT2);
  
  return {
    kcalDiarias: Math.round(kcalDiarias * 10) / 10, // Redondear a 1 decimal
    factores: {
      FACT,
      FACT2,
      peso,
      edad,
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
function seleccionarProductoSecoPerro(answers, productos) {
  const edad = answers.q4_perro;
  const preferencia = answers.q11_perro;
  const tamano = answers.q3_perro;
  const patologias = answers.q9_perro;
  
  console.log("🔍 Seleccionando producto seco para perro desde API...");
  console.log("   Edad:", edad, "| Preferencia:", preferencia, "| Tamaño:", tamano);
  
  // Cachorro
  if (edad === "Cachorro") {
    const producto = productos.PERRO_PUPPY_SALMON || Object.values(productos).find(p => 
      p.animal === "Perro" && p.segmento?.includes("Cachorro") && p.tipo === "Seco"
    );
    console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Senior o con sobrepeso
  if (edad === "Senior" || patologias?.includes("Sobrepeso")) {
    const producto = productos.PERRO_LIGHT_SENIOR || Object.values(productos).find(p => 
      p.animal === "Perro" && (p.segmento?.includes("Senior") || p.segmento?.includes("Light")) && p.tipo === "Seco"
    );
    console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Adulto - según preferencia
  if (preferencia) {
    if (preferencia.includes("Pollo")) {
      const producto = productos.PERRO_ADULT_POLLO || Object.values(productos).find(p => 
        p.animal === "Perro" && p.nombre?.toLowerCase().includes("pollo") && p.tipo === "Seco" && p.segmento?.includes("Adulto")
      );
      console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
      return producto;
    }
    if (preferencia.includes("Cordero")) {
      const producto = productos.PERRO_ADULT_CORDERO || Object.values(productos).find(p => 
        p.animal === "Perro" && p.nombre?.toLowerCase().includes("cordero") && p.tipo === "Seco" && p.segmento?.includes("Adulto")
      );
      console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
      return producto;
    }
    if (preferencia.includes("Salmón")) {
      const producto = productos.PERRO_ADULT_SALMON || Object.values(productos).find(p => 
        p.animal === "Perro" && p.nombre?.toLowerCase().includes("salmon") && p.tipo === "Seco" && p.segmento?.includes("Adulto")
      );
      console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
      return producto;
    }
  }
  
  // Por defecto: Salmón
  const productoDefault = productos.PERRO_ADULT_SALMON || Object.values(productos).find(p => 
    p.animal === "Perro" && p.tipo === "Seco" && p.segmento?.includes("Adulto")
  );
  console.log("   ✅ Producto por defecto:", productoDefault?.nombre || "No encontrado");
  return productoDefault;
}

/**
 * Selecciona el producto húmedo adecuado para un perro
 */
function seleccionarProductoHumedoPerro(productoSeco, productos) {
  const segmento = productoSeco.segmento;
  
  console.log("🔍 Seleccionando producto húmedo para perro, segmento:", segmento);
  
  if (segmento === "Cachorros" || segmento?.includes("Cachorro")) {
    const producto = productos.PERRO_HUMEDO_PUPPY || 
      Object.values(productos).find(p => 
        p.animal === "Perro" && 
        p.tipo === "Humedo" && 
        (p.segmento?.includes("Cachorro") || p.nombre?.toLowerCase().includes("cachorro") || p.nombre?.toLowerCase().includes("puppy"))
      );
    console.log("   ✅ Producto húmedo:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  if (segmento?.includes("Cordero")) {
    const producto = productos.PERRO_HUMEDO_CORDERO_ARROZ || 
      Object.values(productos).find(p => 
        p.animal === "Perro" && 
        p.tipo === "Humedo" && 
        (p.nombre?.toLowerCase().includes("cordero") || p.segmento?.includes("Cordero"))
      );
    console.log("   ✅ Producto húmedo:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  if (segmento?.includes("Pollo")) {
    const producto = productos.PERRO_HUMEDO_POLLO_ZANAHORIA || 
      Object.values(productos).find(p => 
        p.animal === "Perro" && 
        p.tipo === "Humedo" && 
        (p.nombre?.toLowerCase().includes("pollo") || p.segmento?.includes("Pollo"))
      );
    console.log("   ✅ Producto húmedo:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Salmón o Light/Senior - buscar pescado
  const productoDefault = productos.PERRO_HUMEDO_PESCADO_ZANAHORIA || 
    productos.PERRO_HUMEDO_PESCADO_PATATAS ||
    Object.values(productos).find(p => 
      p.animal === "Perro" && 
      p.tipo === "Humedo" && 
      (p.nombre?.toLowerCase().includes("pescado") || 
       p.nombre?.toLowerCase().includes("salmon") || 
       p.nombre?.toLowerCase().includes("fish") ||
       p.segmento?.includes("Pescado"))
    ) ||
    // Si no se encuentra ninguno específico, cualquier húmedo de perro
    Object.values(productos).find(p => 
      p.animal === "Perro" && 
      p.tipo === "Humedo"
    );
  
  console.log("   ✅ Producto húmedo por defecto:", productoDefault?.nombre || "No encontrado");
  return productoDefault;
}

/**
 * Selecciona el producto seco adecuado para un gato
 */
function seleccionarProductoSecoGato(answers, productos) {
  const edad = answers.q3_gato;
  const castrado = answers.q6_gato;
  const patologias = answers.q7_gato;
  
  console.log("🔍 Seleccionando producto seco para gato desde API...");
  console.log("   Edad:", edad, "| Castrado:", castrado);
  
  // Gatito
  if (edad === "Gatito") {
    const producto = productos.GATO_KITTEN || Object.values(productos).find(p => 
      p.animal === "Gato" && (p.segmento?.includes("Gatito") || p.segmento?.includes("Kitten")) && p.tipo === "Seco"
    );
    console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Esterilizado o con sobrepeso
  if (castrado === "Sí" || patologias?.includes("Sobrepeso")) {
    const producto = productos.GATO_LIGHT_STERILIZED || Object.values(productos).find(p => 
      p.animal === "Gato" && (p.segmento?.includes("Esterilizado") || p.segmento?.includes("Light")) && p.tipo === "Seco"
    );
    console.log("   ✅ Producto seleccionado:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Por defecto: Pollo (más popular)
  const productoDefault = productos.GATO_ADULT_CHICKEN || Object.values(productos).find(p => 
    p.animal === "Gato" && p.tipo === "Seco" && p.segmento?.includes("Adulto")
  );
  console.log("   ✅ Producto por defecto:", productoDefault?.nombre || "No encontrado");
  return productoDefault;
}

/**
 * Selecciona el producto húmedo adecuado para un gato
 */
function seleccionarProductoHumedoGato(productoSeco, productos) {
  const segmento = productoSeco.segmento;
  
  console.log("🔍 Seleccionando producto húmedo para gato, segmento:", segmento);
  
  if (segmento === "Cachorros" || segmento?.includes("Gatito") || segmento?.includes("Kitten")) {
    const producto = productos.GATO_HUMEDO_KITTEN || 
      Object.values(productos).find(p => 
        p.animal === "Gato" && 
        p.tipo === "Humedo" && 
        (p.segmento?.includes("Gatito") || 
         p.segmento?.includes("Kitten") ||
         p.nombre?.toLowerCase().includes("gatito") ||
         p.nombre?.toLowerCase().includes("kitten"))
      );
    console.log("   ✅ Producto húmedo:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  if (segmento?.includes("Pollo") || segmento?.includes("Esterilizado")) {
    const producto = productos.GATO_HUMEDO_POLLO_CONEJO || 
      Object.values(productos).find(p => 
        p.animal === "Gato" && 
        p.tipo === "Humedo" && 
        (p.nombre?.toLowerCase().includes("pollo") || 
         p.nombre?.toLowerCase().includes("chicken") ||
         p.segmento?.includes("Pollo"))
      );
    console.log("   ✅ Producto húmedo:", producto?.nombre || "No encontrado");
    return producto;
  }
  
  // Pescado o default
  const productoDefault = productos.GATO_HUMEDO_ATUN_GAMBAS || 
    Object.values(productos).find(p => 
      p.animal === "Gato" && 
      p.tipo === "Humedo" && 
      (p.nombre?.toLowerCase().includes("atun") || 
       p.nombre?.toLowerCase().includes("pescado") ||
       p.nombre?.toLowerCase().includes("fish") ||
       p.nombre?.toLowerCase().includes("tuna") ||
       p.segmento?.includes("Pescado") ||
       p.segmento?.includes("Atun"))
    ) ||
    // Si no se encuentra ninguno específico, cualquier húmedo de gato
    Object.values(productos).find(p => 
      p.animal === "Gato" && 
      p.tipo === "Humedo"
    );
  
  console.log("   ✅ Producto húmedo por defecto:", productoDefault?.nombre || "No encontrado");
  return productoDefault;
}

// ============================================
// CÁLCULO DE CANTIDADES
// ============================================

/**
 * Calcula los gramos de producto diarios
 */
function calcularGramosProducto(kcalDiarias, kcalEmKg) {
  // Fórmula: (Kcal/dia) / (kcal Em/kg de pienso) * 1000
  return Math.round((kcalDiarias / kcalEmKg) * 1000);
}

/**
 * Calcula las cantidades para alimentación mixta (75% seco, 25% húmedo)
 */
function calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo) {
  const kcalSeco = kcalDiarias * 0.75;
  const kcalHumedo = kcalDiarias * 0.25;
  
  const gramosSeco = Math.round((kcalSeco / productoSeco.kcalEmKg) * 1000);
  const gramosHumedo = Math.round((kcalHumedo / productoHumedo.kcalEmKg) * 1000);
  
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
  // Para productos con packs (ej: "185 gr x 12ud" o "400 gr x 12ud")
  const matchPack = cantidad.match(/(\d+(?:\.\d+)?)\s*gr\s*x\s*(\d+)\s*ud/i);
  if (matchPack) {
    const gramosPorUnidad = parseFloat(matchPack[1]);
    const unidades = parseFloat(matchPack[2]);
    return gramosPorUnidad * unidades;
  }
  
  // Si es en kg (sin pack)
  if (cantidad.toLowerCase().includes("kg") && !cantidad.includes("x")) {
    const numeros = cantidad.match(/(\d+(?:\.\d+)?)/);
    return numeros ? parseFloat(numeros[1]) * 1000 : 0;
  }
  
  // Si es en gramos simples
  const numeros = cantidad.match(/(\d+(?:\.\d+)?)/);
  return numeros ? parseFloat(numeros[1]) : 0;
}

/**
 * Selecciona la variante de tamaño más adecuada
 * Algoritmo optimizado para duraciones realistas de 4-10 semanas
 * MEJORA: Cantidades ligeramente superiores para mayor duración
 */
function seleccionarVariante(producto, gramosDiarios, tamano, esHumedo = false) {
  let variantes = producto.variantes;

  // Para productos húmedos, priorizar SIEMPRE los paquetes de 12 unidades
  if (esHumedo) {
    // Filtrar variantes que contengan "12 ud" o "12ud" en la cantidad
    const variantesPack12 = variantes.filter(v => 
      v.cantidad.toLowerCase().includes("12 ud") || 
      v.cantidad.toLowerCase().includes("12ud") ||
      v.cantidad.toLowerCase().includes("x 12")
    );
    
    // Si hay packs de 12, usar solo esos
    if (variantesPack12.length > 0) {
      variantes = variantesPack12;
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

  // MEJORA: Duraciones más largas - 4-10 semanas (28-70 días)
  const diasOptimosMin = 28; // 4 semanas (antes 21)
  const diasOptimosMax = 70; // 10 semanas (antes 56)
  const diasIdeal = 49; // 7 semanas (antes 35)

  let mejorVariante = variantes[variantes.length - 1]; // Default: la más grande
  let mejorPuntuacion = -Infinity;

  for (const variante of variantes) {
    const gramos = calcularGramosTotales(variante.cantidad);
    const diasDuracion = gramos / gramosDiarios;
    
    console.log(`Variante "${variante.cantidad}": ${gramos}g total, ${diasDuracion.toFixed(1)} días de duración`);

    let puntuacion = 0;

    // Factor 1: Proximidad a la duración ideal (50% del peso)
    if (diasDuracion >= diasOptimosMin && diasDuracion <= diasOptimosMax) {
      // Máxima puntuación en el rango óptimo, favoreciendo el punto medio
      const distanciaIdeal = Math.abs(diasDuracion - diasIdeal);
      puntuacion += 100 - (distanciaIdeal * 1.5); // Penalización más suave
    } else if (diasDuracion < diasOptimosMin) {
      // Penalizar fuertemente duraciones muy cortas
      const deficit = diasOptimosMin - diasDuracion;
      puntuacion += 50 - (deficit * 3); // Penalización reducida
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

  return mejorVariante;
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
  
  // Obtener productos desde la API de Shopify
  console.log("📦 Obteniendo productos desde la API...");
  const productos = await getProducts();
  console.log(`✅ ${Object.keys(productos).length} productos obtenidos desde la API`);
  
  // Log para debug: mostrar todos los productos disponibles
  console.log("📋 Lista de productos disponibles:");
  Object.entries(productos).forEach(([key, producto]) => {
    console.log(`   - ${key}: "${producto.nombre}" (${producto.animal} - ${producto.tipo})`);
  });
  
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
      resultado.tipoCroqueta = tipoCroqueta;
      
      // Seleccionar productos usando la API
      const productoSeco = seleccionarProductoSecoPerro(answers, productos);
      const productoHumedo = seleccionarProductoHumedoPerro(productoSeco, productos);
      
      if (tipoAlimentacion === "Seca") {
        // Solo producto seco
        const gramosDiarios = calcularGramosProducto(kcalDiarias, productoSeco.kcalEmKg);
        const variante = seleccionarVariante(productoSeco, gramosDiarios, answers.q3_perro, false);
        
        resultado.recomendacion = {
          tipo: "seca",
          productoSeco: {
            ...productoSeco,
            varianteRecomendada: variante,
            gramosDiarios,
          },
        };
      } else {
        // Alimentación mixta
        const cantidades = calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo);
        const varianteSeco = seleccionarVariante(productoSeco, cantidades.seco, answers.q3_perro, false);
        const varianteHumedo = seleccionarVariante(productoHumedo, cantidades.humedo, answers.q3_perro, true);
        
        resultado.recomendacion = {
          tipo: "mixta",
          productoSeco: {
            ...productoSeco,
            varianteRecomendada: varianteSeco,
            gramosDiarios: cantidades.seco,
          },
          productoHumedo: {
            ...productoHumedo,
            varianteRecomendada: varianteHumedo,
            gramosDiarios: cantidades.humedo,
          },
        };
      }
      
    } else if (tipoAnimal === "Gato") {
      // Calcular calorías
      const { kcalDiarias, factores } = calcularCaloriasGato(answers);
      resultado.kcalDiarias = kcalDiarias;
      resultado.factores = factores;
      
      // Seleccionar productos usando la API
      const productoSeco = seleccionarProductoSecoGato(answers, productos);
      const productoHumedo = seleccionarProductoHumedoGato(productoSeco, productos);
      
      if (tipoAlimentacion === "Seca") {
        // Solo producto seco
        const gramosDiarios = calcularGramosProducto(kcalDiarias, productoSeco.kcalEmKg);
        const variante = seleccionarVariante(productoSeco, gramosDiarios, "Gato", false);
        
        resultado.recomendacion = {
          tipo: "seca",
          productoSeco: {
            ...productoSeco,
            varianteRecomendada: variante,
            gramosDiarios,
          },
        };
      } else {
        // Alimentación mixta
        const cantidades = calcularAlimentacionMixta(kcalDiarias, productoSeco, productoHumedo);
        const varianteSeco = seleccionarVariante(productoSeco, cantidades.seco, "Gato", false);
        const varianteHumedo = seleccionarVariante(productoHumedo, cantidades.humedo, "Gato", true);
        
        resultado.recomendacion = {
          tipo: "mixta",
          productoSeco: {
            ...productoSeco,
            varianteRecomendada: varianteSeco,
            gramosDiarios: cantidades.seco,
          },
          productoHumedo: {
            ...productoHumedo,
            varianteRecomendada: varianteHumedo,
            gramosDiarios: cantidades.humedo,
          },
        };
      }
    }
    
    return resultado;
    
  } catch (error) {
    console.error("Error calculando recomendación:", error);
    throw error;
  }
}
