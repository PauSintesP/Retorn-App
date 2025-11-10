
// ============================================
// FACTORES DE CÁLCULO PARA PERROS
// ============================================

export const FACTOR_EDAD_PERRO = {
  // Razas Pequeñas/Medianas
  "Pequeño-Cachorro-0-4": 2,
  "Pequeño-Cachorro-4-6": 1.6,
  "Pequeño-Cachorro-6-10": 1.2,
  "Pequeño-Cachorro-10-12": 1,
  "Mediano-Cachorro-0-4": 2,
  "Mediano-Cachorro-4-6": 1.6,
  "Mediano-Cachorro-6-10": 1.2,
  "Mediano-Cachorro-10-12": 1,
  
  // Razas Grandes
  "Grande-Cachorro-0-4": 2,
  "Grande-Cachorro-4-8": 1.6,
  "Grande-Cachorro-8-12": 1.4,
  "Grande-Cachorro-12-18": 1.2,
  "Grande-Cachorro-18-24": 1,
  
  // Adultos
  "Adulto": 1,
  "Senior": 0.8,
  "Adulto-Raza-Gigante": 1.5,
};

export const VAR_ACTIVIDAD_PERRO = {
  "Baja": 95,
  "Media": 130,
  "Muy Alta (Deportiva)": 180,
  "Cachorro": 130,
  "Senior": 130,
};

export const FACT_ESTERILIZADO = {
  "Sí": 0.9,
  "No": 1,
};

export const FACT_SNACKS = {
  "1 o menos": 1,
  "2-3": 0.9,
  "Muchos (Más de 3)": 0.88,
};

export const PORCENTAJE_ALIMENTACION_MIXTA = {
  SECO: 0.75,
  HUMEDO: 0.25,
};

// ============================================
// FACTORES DE CÁLCULO PARA GATOS
// ============================================

export const FACTOR_GATO = {
  // Gatitos por edad en meses
  "Gatito-1.5-5": { FACT: 250, FACT2: 1 },    // 6-20 semanas = 1.5-5 meses
  "Gatito-4-7": { FACT: 130, FACT2: 1 },      // 4-7 meses
  "Gatito-7-9": { FACT: 100, FACT2: 1 },      // 7-9 meses
  "Gatito-9-12": { FACT: 80, FACT2: 1 },      // 9-12 meses
  "Gatito-12-14": { FACT: 60, FACT2: 1 },     // >12 meses (12-14 por pregunta)
  
  // Adutos
  "Adulto": { FACT: 100, FACT2: 0.67 },
  "Adulto-Esterilizado": { FACT: 130, FACT2: 0.4 },
  "Senior": { FACT: 45, FACT2: 1 },
};


