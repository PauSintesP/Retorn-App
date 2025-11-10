
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

// ============================================
// PRODUCTOS DISPONIBLES
// ============================================



// ============================================
// RAZAS DE PERROS POR TAMAÑO
// ============================================

export const RAZAS_PERROS = {
  Pequeño: [
    "Pomerania (Spitz enano)", "Bichón maltés", "Grifón de Bruselas",
    "Chihuahua", "Toy spaniel inglés", "Yorkshire terrier",
    "Silky terrier (australiano)", "Pequinés", "Pinscher",
    "Shih Tzu", "Bichón frisé", "Bull terrier miniatura",
    "Dachshund Miniatura", "Pincher miniatura", "Cavaller King Charles spaniel",
    "Poodle Miniatura", "Schnauzer Miniatura", "Coton de Tulear",
    "Cairn terrier", "Border terrier", "Lhasa Apso",
    "Carlino", "Terrier australiano", "West Highland white terrier",
    "Fox terrier", "Bedlington terrier", "Bulldog francés",
    "Dandie Dinmont terrier", "Boston terrier", "Terrier galés (Welsh)",
    "Mestizo de raza pequeña"
  ],
  
  Mediano: [
    "Scottish terrier", "Basenji", "Cocker spaniel americano",
    "Terrier irlandés", "Spitz alemán Estándar", "Spitz finlandés",
    "Grifón vendeano", "Skye terrier", "Beagle",
    "Saluki", "Whippet", "Border collie",
    "Spaniel bretón", "Puli", "Cocker spaniel inglés",
    "Schnauzer Mediano", "Staffordshire bull terrier", "Welsh corgi Cardigan",
    "Springer spaniel galés", "Sussex spaniel", "Basset hound",
    "Bearded collie", "Braco de Saint Germain", "Perro de agua americano",
    "Setter inglés", "Shar-pei", "Springer spaniel inglés",
    "Airedale terrier", "Braco húngaro / Vizsla", "Chow Chow",
    "Perdiguero alemán", "Podenco ibicenco", "Husky siberiano",
    "Dálmata", "Bulldog", "Galgo afgano",
    "Grifón de pelo duro", "Perro de agua portugués", "Bull terrier",
    "Boxer", "Bobtail", "Samoyedo",
    "Braco francés", "Galgo español", "Pointer alemán",
    "Setter irlandés", "Pastor belga", "Dobermann",
    "Foxhound Inglés", "Galgo inglés", "Golden retriever",
    "Pointer", "Beauceron", "Collie",
    "Pastor catalán", "Schnauzer Gigante", "Chesapeake Bay retriever",
    "Clumber spaniel", "Gordon setter", "Labrador retriever",
    "Mestizo de raza mediana"
  ],
  
  Grande: [
    "Pastor alemán", "Pastor Bergamasco", "Akita Inu",
    "Alaskan malamute", "Pastor de Brie", "Retriever de pelo liso",
    "Boyero de Flandes", "Leonberger", "Dogo de Burdeos (mediano)",
    "Rottweiler", "Fila brasileño", "Galgo ruso (Borzoi)",
    "Kuvasz", "Boyero de Berna", "Mastín del Alentejo",
    "Perro de montaña de los Pirineos", "Bloodhound", "Komondor",
    "Mastín español", "Mastín napolitano", "San Bernardo",
    "Dogo de Burdeos", "Bullmstiff", "Gran Danés",
    "Mastín del Pirineo", "Terranova", "Dogo de Burdeos (grande)",
    "Mastín inglés", "Mestizo de raza grande"
  ]
};
