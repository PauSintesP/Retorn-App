/**
 * Constantes y factores para el cálculo de recomendaciones de productos
 */

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

// ============================================
// PORCENTAJES PARA ALIMENTACIÓN MIXTA
// ============================================

/**
 * Distribución de calorías en alimentación mixta
 * Por defecto: 75% del alimento seco, 25% del alimento húmedo
 */
export const PORCENTAJE_ALIMENTACION_MIXTA = {
  SECO: 0.75,    // 75% de las calorías diarias provienen del alimento seco
  HUMEDO: 0.25,  // 25% de las calorías diarias provienen del alimento húmedo
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
  
  // Adultos
  "Adulto": { FACT: 100, FACT2: 0.67 },
  "Adulto-Esterilizado": { FACT: 130, FACT2: 0.4 },
  "Senior": { FACT: 45, FACT2: 1 },
};

// ============================================
// PRODUCTOS DISPONIBLES
// ============================================

export const PRODUCTOS = {
  // PERROS - SECO
  PERRO_PUPPY_SALMON: {
    nombre: "RETORN PUPPY SALMON",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Cachorros",
    kcalEmKg: 3451,
    imagen:"https://retorn.com/cdn/shop/products/puppy-746297.png?v=1652985873&width=600",
    variantes: [
      { ean: "8436540365361", cantidad: "500 gr", sku: "RET005000", link: "https://retorn.com/products/pienso-natural-cachorros-salmon?variant=43289910542553", variantId: "43289910542553" },
      { ean: "8436540364869", cantidad: "3 kg", sku: "RET00503", link: "https://retorn.com/products/pienso-natural-cachorros-salmon?variant=42813746315481", variantId: "42813746315481" },
      { ean: "8436540360533", cantidad: "6 kg", sku: "RET0051", link: "https://retorn.com/products/pienso-natural-cachorros-salmon?variant=12167525924930", variantId: "12167525924930" },
      { ean: "8436540360540", cantidad: "12 kg", sku: "RET0052", link: "https://retorn.com/products/pienso-natural-cachorros-salmon?variant=12167525924930", variantId: "12167525924930" },
    ],
  },
  
  PERRO_LIGHT_SENIOR: {
    nombre: "RETORN LIGHT AND SENIOR",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Senior Light",
    kcalEmKg: 3261,
    imagen:"https://retorn.com/cdn/shop/products/LIGHT-NUEVO-890632_31768bad-c4bc-41d6-af0c-d9a0e42df91f.png?v=1653027050&width=600",
    variantes: [
      { ean: "8436540366009", cantidad: "500 gr", sku: "RET006500", link: "https://retorn.com/products/pienso-natural-perros-light?variant=43289889013977", variantId: "43289889013977" },
      { ean: "8436540365071", cantidad: "3 kg", sku: "RET00603", link: "https://retorn.com/products/pienso-natural-perros-light?variant=12167962591298", variantId: "12167962591298" },
      { ean: "8436540360588", cantidad: "12 kg", sku: "RET0062", link: "https://retorn.com/products/pienso-natural-perros-light?variant=12167962656834", variantId: "12167962656834" },
      { ean: "8436540360595", cantidad: "20 kg", sku: "RET0063", link: "https://retorn.com/products/pienso-natural-perros-light?variant=12167962689602", variantId: "12167962689602" },
    ],
  },
  
  PERRO_ADULT_POLLO: {
    nombre: "RETORN ADULT POLLO",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Adulto Pollo",
    kcalEmKg: 3674,
    imagen:"https://retorn.com/cdn/shop/products/POLLOPNG-621576.png?v=1644848369&width=600",
    variantes: [
      { ean: "8436540365989", cantidad: "500 gr", sku: "RETAP500", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=43289754370265", variantId: "43289754370265" },
      { ean: "8436540364616", cantidad: "3 kg", sku: "RETAP03", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=12167859863618", variantId: "12167859863618" },
      { ean: "8436540364630", cantidad: "12 kg", sku: "RETAP12", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=42655252512985", variantId: "42655252512985" },
      { ean: "8436540365095", cantidad: "20 kg", sku: "RETAP20", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=42655252545753", variantId: "42655252545753" },
    ],
    variantes_small: [
      { ean: "8436540365996", cantidad: "500 gr", sku: "RETAP500S", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=43289754337497", variantId: "43289754337497" },
      { ean: "8436540365170", cantidad: "3 kg", sku: "RETAP03S", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=42173524246745", variantId: "42173524246745" },
      { ean: "8436540366153", cantidad: "12 kg", sku: "RETAP12S", link: "https://retorn.com/products/pienso-natural-perros-pollo?variant=43161357779161", variantId: "43161357779161" },
    ],
  },
  
  PERRO_ADULT_CORDERO: {
    nombre: "RETORN ADULT CORDERO",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Adulto Cordero",
    kcalEmKg: 3440,
    imagen:"https://retorn.com/cdn/shop/products/corderopng-237535.png?v=1644848356&width=600",
    variantes: [
      { ean: "8436540365965", cantidad: "500 gr", sku: "RET0033500", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=43289746342105", variantId: "43289746342105" },
      { ean: "8436540360304", cantidad: "3 kg", sku: "RET00333", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=42655137169625", variantId: "42655137169625" },
      { ean: "8436540360243", cantidad: "12 kg", sku: "RET0032", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=42655137267929", variantId: "42655137267929" },
      { ean: "8436540360519", cantidad: "20 kg", sku: "RET0030", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=42655137300697", variantId: "42655137300697" },
    ],
    variantes_small: [
      { ean: "8436540365972", cantidad: "500 gr", sku: "RET0033500S", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=43289746309337", variantId: "43289746309337" },
      { ean: "8436540365286", cantidad: "3 kg", sku: "RET00333S", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=42655137530073", variantId: "42655137530073" },
      { ean: "8436540365798", cantidad: "12 kg", sku: "RET0032S", link: "https://retorn.com/products/pienso-natural-perros-cordero?variant=43161352339673", variantId: "43161352339673" },
    ],
  },
  
  PERRO_ADULT_SALMON: {
    nombre: "RETORN ADULT SALMON",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Adulto Salmón",
    kcalEmKg: 3327,
    imagen:"https://retorn.com/cdn/shop/products/RETORNSALMONREGULARBITE_FRONTAL-456406.png?v=1706562908&width=600",
    variantes: [
      { ean: "8436540365958", cantidad: "500 gr", sku: "RET002500", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=43289875513561", variantId: "43289875513561" },
      { ean: "8436540365934", cantidad: "3 kg", sku: "RET00203", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=42651916140761", variantId: "42651916140761" },
      { ean: "8436540360069", cantidad: "12 kg", sku: "RET0022", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=42651916173529", variantId: "42651916173529" },
      { ean: "8436540360281", cantidad: "20 kg", sku: "RET0023", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=42651916206297", variantId: "42651916206297" },
    ],
    variantes_small: [
      { ean: "8436540365941", cantidad: "500 gr", sku: "RET002500S", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=43289875480793", variantId: "43289875480793" },
      { ean: "8436540367372", cantidad: "3 kg", sku: "RET00203S", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=43387689959641", variantId: "43387689959641" },
      { ean: "8436540365590", cantidad: "12 kg", sku: "RET0022S", link: "https://retorn.com/products/pienso-natural-perros-salmon?variant=43161301516505", variantId: "43161301516505" },
    ],
  },
  
  // PERROS - HÚMEDO
  PERRO_HUMEDO_PUPPY: {
    nombre: "RETORN LATAS PERRO PUPPY CORDERO Y POLLO",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Cachorros",
    kcalEmKg: 1265,
    imagen:"https://retorn.com/cdn/shop/products/PUPPY185G-207717.png?v=1706065787&width=600",
    variantes: [
      { ean: "8436540362452", cantidad: "185 gr", sku: "RET479808", link: "https://retorn.com/products/comida-humeda-para-cachorros?variant=31708495183938", variantId: "31708495183938" },
      { ean: "18436540362459", cantidad: "185 gr x 12ud", sku: "RET479808E", link: "https://retorn.com/products/comida-humeda-para-cachorros?variant=31708495216706", variantId: "31708495216706" },
    ],
  },
  
  PERRO_HUMEDO_CORDERO_ARROZ: {
    nombre: "RETORN LATAS PERRO CORDERO CON ARROZ",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Cordero Arroz",
    kcalEmKg: 896,
    imagen:"https://retorn.com/cdn/shop/products/LAMBRICEX2-458482.png?v=1706065787&width=600",
    variantes: [
      { ean: "8436540361547", cantidad: "185 gr", sku: "RET479801", link: "https://retorn.com/products/comida-humeda-perros-cordero-arroz", variantId: "12632940478530" },
      { ean: "18436540361544", cantidad: "185 gr x 12ud", sku: "RET479801E", link: "https://retorn.com/products/comida-humeda-perros-cordero-arroz?variant=14250706075714", variantId: "14250706075714" },
      { ean: "8436540361127", cantidad: "400 gr", sku: "RET4798014", link: "https://retorn.com/products/comida-humeda-perros-cordero-arroz?variant=14102309306434", variantId: "14102309306434" },
      { ean: "18436540361124", cantidad: "400 gr x 12ud", sku: "RET4798014E", link: "https://retorn.com/products/comida-humeda-perros-cordero-arroz?variant=14250709057602", variantId: "14250709057602" },
    ],
  },
  
  PERRO_HUMEDO_POLLO_ZANAHORIA: {
    nombre: "RETORN LATAS PERRO POLLO CON ZANAHORIAS",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Pollo Zanahoria",
    kcalEmKg: 854,
    imagen:"https://retorn.com/cdn/shop/products/CHICKENCARROTSx2-438226.png?v=1706065788&width=600",
    variantes: [
      { ean: "8436540360373", cantidad: "185 gr", sku: "RET479803", link: "https://retorn.com/products/comida-humeda-perros-pollo-zanahorias", variantId: "37988511940791" },
      { ean: "18436540360370", cantidad: "185 gr x 12ud", sku: "RET479803E", link: "https://retorn.com/products/comida-humeda-perros-pollo-zanahorias?variant=37988515152055", variantId: "37988515152055" },
      { ean: "8436540361110", cantidad: "400 gr", sku: "RET4798034", link: "https://retorn.com/products/comida-humeda-perros-pollo-zanahorias?variant=14102317400130", variantId: "14102317400130" },
      { ean: "18436540361117", cantidad: "400 gr x 12ud", sku: "RET4798034E", link: "https://retorn.com/products/comida-humeda-perros-pollo-zanahorias?variant=14250742546498", variantId: "14250742546498" },
    ],
  },
  
  PERRO_HUMEDO_ONLY_CORDERO: {
    nombre: "RETORN LATAS PERRO ONLY CORDERO",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Only Cordero",
    kcalEmKg: 920,
    imagen:"https://retorn.com/cdn/shop/products/ONLYLAMBx2-172529.png?v=1706065789&width=600",
    variantes: [
      { ean: "8436540361493", cantidad: "185 gr", sku: "RET479805", link: "https://retorn.com/products/comida-humeda-perros-only-cordero?variant=13839214772290", variantId: "13839214772290" },
      { ean: "18436540361490", cantidad: "185 gr x 12ud", sku: "RET479805E", link: "https://retorn.com/products/comida-humeda-perros-only-cordero?variant=14250754048066", variantId: "14250754048066" },
      { ean: "8436540361097", cantidad: "400 gr", sku: "RET4798054", link: "https://retorn.com/products/comida-humeda-perros-only-cordero?variant=15962371194946", variantId: "15962371194946" },
      { ean: "18436540361094", cantidad: "400 gr x 12ud", sku: "RET4798054E", link: "https://retorn.com/products/comida-humeda-perros-only-cordero?variant=15982942421058", variantId: "15982942421058" },
    ],
  },
  
  PERRO_HUMEDO_ONLY_POLLO: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Only Pollo",
    kcalEmKg: 962,
    imagen:"https://retorn.com/cdn/shop/products/ONLYCHICKENx2-998172.png?v=1706065788&width=823",
    variantes: [
      { ean: "8436540361509", cantidad: "185 gr", sku: "RET479806", link: "https://retorn.com/products/comida-humeda-perros-only-pollo?variant=13837300170818", variantId: "13837300170818" },
      { ean: "18436540361506", cantidad: "185 gr x 12ud", sku: "RET479806E", link: "https://retorn.com/products/comida-humeda-perros-only-pollo?variant=14250757816386", variantId: "14250757816386" },
      { ean: "8436540361080", cantidad: "400 gr", sku: "RET4798064", link: "https://retorn.com/products/comida-humeda-perros-only-pollo?variant=14102298001474", variantId: "14102298001474" },
      { ean: "18436540361087", cantidad: "400 gr x 12ud", sku: "RET4798064E", link: "https://retorn.com/products/comida-humeda-perros-only-pollo?variant=14250760896578", variantId: "14250760896578" },
    ],
  },
  
  PERRO_HUMEDO_PESCADO_PATATAS: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Pescado Patatas",
    kcalEmKg: 966,
    imagen:"https://retorn.com/cdn/shop/products/FISHPOTATO185G-529110.png?v=1706065787&width=823",
    variantes: [
      { ean: "8436540360366", cantidad: "185 gr", sku: "RET479802", link: "https://retorn.com/products/comida-humeda-perros-pescado-patatas?variant=12632863277122", variantId: "12632863277122" },
      { ean: "18436540360363", cantidad: "185 gr x 12ud", sku: "RET479802E", link: "https://retorn.com/products/comida-humeda-perros-pescado-patatas?variant=14250724851778", variantId: "14250724851778" },
    ],
  },
  
  PERRO_HUMEDO_PESCADO_ZANAHORIA: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Perro",
    segmento: "Pescado Zanahoria",
    kcalEmKg: 1090,
    imagen:"https://retorn.com/cdn/shop/products/FISHCARROTSx2-122584.png?v=1706065787&width=823",
    variantes: [
      { ean: "8436540360991", cantidad: "185 gr", sku: "RET479807", link: "https://retorn.com/products/comida-humeda-perros-pescado-zanahorias?variant=14030012350530", variantId: "14030012350530" },
      { ean: "18436540360998", cantidad: "185 gr x 12ud", sku: "RET479807E", link: "https://retorn.com/products/comida-humeda-perros-pescado-zanahorias?variant=14250733207618", variantId: "14250733207618" },
      { ean: "8436540361134", cantidad: "400 gr", sku: "RET4798074", link: "https://retorn.com/products/comida-humeda-perros-pescado-zanahorias?variant=15982645084226", variantId: "15982645084226" },
      { ean: "18436540361131", cantidad: "400 gr x 12ud", sku: "RET4798074E", link: "https://retorn.com/products/comida-humeda-perros-pescado-zanahorias?variant=15982921744450", variantId: "15982921744450" },
    ],
  },
  
  // GATOS - SECO
  GATO_ADULT_FISH: {
    nombre: "DEMO",
    tipo: "Seco",
    animal: "Gato",
    segmento: "Adulto Pescado",
    kcalEmKg: 3686,
    imagen:"https://retorn.com/cdn/shop/products/pescado-frontal-406912.png?v=1644848375&width=600",
    variantes: [
      { ean: "8436540365415", cantidad: "500 gr", sku: "RET501500", link: "https://retorn.com/products/pienso-para-gatos-pescado?variant=43289984827609", variantId: "43289984827609" },
      { ean: "8436540360922", cantidad: "2 kg", sku: "RET501", link: "https://retorn.com/products/pienso-para-gatos-pescado?variant=42413789053145", variantId: "42413789053145" },
      { ean: "8436540365439", cantidad: "8kg", sku: "RET5018", link: "https://retorn.com/products/pienso-para-gatos-pescado?variant=43568574202073", variantId: "43568574202073" },
    ],
  },
  
  GATO_ADULT_CHICKEN: {
    nombre: "DEMO",
    tipo: "Seco",
    animal: "Gato",
    segmento: "Adulto Pollo",
    kcalEmKg: 4070,
    imagen:"https://retorn.com/cdn/shop/products/Pollo-Frontal-338141.png?v=1644848366&width=600",
    variantes: [
      { ean: "8436540365392", cantidad: "500 gr", sku: "RET502500", link: "https://retorn.com/products/pienso-para-gatos-pollo?variant=43289965068505", variantId: "43289965068505" },
      { ean: "8436540360939", cantidad: "2 kg", sku: "RET502", link: "https://retorn.com/products/pienso-para-gatos-pollo?variant=42413796983001", variantId: "42413796983001" },
      { ean: "8436540365446", cantidad: "8kg", sku: "RET5028", link: "https://retorn.com/products/pienso-para-gatos-pollo?variant=43568576463065", variantId: "43568576463065" },
    ],
  },
  
  GATO_LIGHT_STERILIZED: {
    nombre: "DEMO",
    tipo: "Seco",
    animal: "Gato",
    segmento: "Esterilizados Light",
    kcalEmKg: 3650,
    imagen:"https://retorn.com/cdn/shop/products/light-frontal-917731.png?v=1644848591&width=600",
    variantes: [
      { ean: "8436540365408", cantidad: "500 gr", sku: "RET503500", link: "https://retorn.com/products/pienso-para-gatos-esterilizados?variant=43289957662937", variantId: "43289957662937" },
      { ean: "8436540360946", cantidad: "2 kg", sku: "RET503", link: "https://retorn.com/products/pienso-para-gatos-esterilizados?variant=42413798064345", variantId: "42413798064345" },
      { ean: "8436540365453", cantidad: "8kg", sku: "RET5038", link: "https://retorn.com/products/pienso-para-gatos-esterilizados?variant=43568580690137", variantId: "43568580690137" },
    ],
  },
  
  GATO_KITTEN: {
    nombre: "DEMO",
    tipo: "Seco",
    animal: "Gato",
    segmento: "Cachorros",
    kcalEmKg: 3800,
    imagen:"https://retorn.com/cdn/shop/products/pienso-cachorro-gato.-frontalpng-643794.png?v=1644848383&width=600",
    variantes: [
      { ean: "8436540365378", cantidad: "500 gr", sku: "RET500500", link: "https://retorn.com/products/pienso-para-gatitos?variant=43290069303513", variantId: "43290069303513" },
      { ean: "8436540360915", cantidad: "2 kg", sku: "RET500", link: "https://retorn.com/products/pienso-para-gatitos?variant=42413796458713", variantId: "42413796458713" },
      { ean: "8436540365422", cantidad: "8kg", sku: "RET5008", link: "https://retorn.com/products/pienso-para-gatitos?variant=43568572661977", variantId: "43568572661977" },
    ],
  },
  
  // GATOS - HÚMEDO
  GATO_HUMEDO_KITTEN: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Cachorros",
    kcalEmKg: 871,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-KITTEN.png?v=1733226585&width=600",
    variantes: [
      { ean: "8436540365040", cantidad: "80 gr", sku: "RET4529K", link: "https://retorn.com/products/comida-humeda-para-gatitos-de-pollo?variant=42037603729625", variantId: "42037603729625" },
      { ean: "18436540365047", cantidad: "80 gr X 18 ud", sku: "RET4529KC", link: "https://retorn.com/products/comida-humeda-para-gatitos-de-pollo?variant=42037603762393", variantId: "42037603762393" },
      { ean: "18436540371253", cantidad: "80 gr X 24 ud", sku: "", link: "https://retorn.com/products/comida-humeda-para-gatitos-de-pollo?variant=49479598047571", variantId: "49479598047571" },
    ],
  },
  
  GATO_HUMEDO_POLLO: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Pollo",
    kcalEmKg: 971,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-CHICKEN.png?v=1733226502&width=600",
    variantes: [
      { ean: "8436540360106", cantidad: "80 gr", sku: "RET4529", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo?variant=12632988188738", variantId: "12632988188738" },
      { ean: "18436540360103", cantidad: "80 gr X 18 ud", sku: "RET4529C", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo?variant=14243705159746", variantId: "14243705159746" },
      { ean: "18436540371185", cantidad: "80 gr X 24 ud", sku: "RET4529C24", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo?variant=49139872891219", variantId: "49139872891219" },
    ],
  },
  
  GATO_HUMEDO_POLLO_CONEJO: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Pollo Conejo",
    kcalEmKg: 943,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-CHICKEN-RABBIT.png?v=1733226412&width=600",
    variantes: [
      { ean: "8436540360113", cantidad: "80 gr", sku: "RET4530", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo-conejo", variantId: "12633061228610" },
      { ean: "18436540360110", cantidad: "80 gr X 18 ud", sku: "RET4530C", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo-conejo?variant=14243707453506", variantId: "14243707453506" },
      { ean: "18436540371192", cantidad: "80 gr X 24 ud", sku: "RET4530C24", link: "https://retorn.com/products/comida-humeda-para-gatos-pollo-conejo?variant=49139879051603", variantId: "49139879051603" },
    ],
  },
  
  GATO_HUMEDO_ATUN_MEJILLONES: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Mejillones",
    kcalEmKg: 656,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-TUNA-MUSSELS-238869.png?v=1729854404&width=600",
    variantes: [
      { ean: "8436540360441", cantidad: "80 gr", sku: "RET4535", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-mejillones?variant=12633070927938", variantId: "12633070927938" },
      { ean: "18436540360448", cantidad: "80 gr X 18 ud", sku: "RET4535C", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-mejillones?variant=14243686580290", variantId: "14243686580290" },
      { ean: "18436540371222", cantidad: "80 gr X 24 ud", sku: "RET4535C24", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-mejillones?variant=49139897893203", variantId: "49139897893203" },
    ],
  },
  
  GATO_HUMEDO_ATUN_SARDINA: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Sardina",
    kcalEmKg: 704,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-TUNA-SARDINE_5791371b-7bed-4548-badb-d84316573d60-997838.png?v=1729854406&width=600",
    variantes: [
      { ean: "8436540360434", cantidad: "80 gr", sku: "RET4536", link: "https://retorn.com/products/comida-humeda-gatos-atun-sardina?variant=12633132662850", variantId: "12633132662850" },
      { ean: "18436540360431", cantidad: "80 gr X 18 ud", sku: "RET4536C", link: "https://retorn.com/products/comida-humeda-gatos-atun-sardina?variant=14243698737218", variantId: "14243698737218" },
      { ean: "18436540371239", cantidad: "80 gr X 24 ud", sku: "RET4536C24", link: "https://retorn.com/products/comida-humeda-gatos-atun-sardina?variant=49139894681939", variantId: "49139894681939" },
    ],
  },
  
  GATO_HUMEDO_ATUN_SALMON: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Salmón",
    kcalEmKg: 746,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-TUNA-SALMON_751e8b4c-703a-4ba7-bfd6-f1ed6419c9a7-722088.png?v=1730434438&width=600",
    variantes: [
      { ean: "8436540360427", cantidad: "80 gr", sku: "RET4537", link: "https://retorn.com/products/comida-humeda-gatos-atun-salmon?variant=12633123782722", variantId: "12633123782722" },
      { ean: "18436540371215", cantidad: "80 gr X 24 ud", sku: "RET4537C24", link: "https://retorn.com/products/comida-humeda-gatos-atun-salmon?variant=48154989461843", variantId: "48154989461843" },
    ],
  },
  
  GATO_HUMEDO_ATUN_GAMBAS: {
    nombre: "DEMO",
    tipo: "Humedo",
    animal: "Gato",
    segmento: "Gambas",
    kcalEmKg: 653,
    imagen:"https://retorn.com/cdn/shop/files/RETORN-CAT-TUNA-SHRIMPS_OPEN-420861.png?v=1726581515&width=600",
    variantes: [
      { ean: "8436540360489", cantidad: "80 gr", sku: "RET4538", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-gambas", variantId: "14092976554050" },
      { ean: "18436540360486", cantidad: "80 gr X 18 ud", sku: "RET4538C", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-gambas?variant=14242700132418", variantId: "14242700132418" },
      { ean: "18436540371246", cantidad: "80 gr X 24 ud", sku: "RET4538C24", link: "https://retorn.com/products/comida-humeda-para-gatos-atun-gambas?variant=48155011350867", variantId: "48155011350867" },
    ],
  },
};

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
