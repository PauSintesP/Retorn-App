/**
 * Lista EXCLUSIVA de IDs de variantes permitidos desde la Calculadora CSV
 * SOLO estos productos pueden ser recomendados
 * Cualquier producto que no esté en esta lista será RECHAZADO
 */

export const ALLOWED_VARIANT_IDS = new Set([
  // Cachorro Salmón
  "43289910542553", "42813746315481", "12167525924930",
  // Senior Light
  "43289889013977", "12167962591298", "12167962656834", "12167962689602",
  // Adulto Pollo
  "43289754370265", "12167859863618", "42655252512985", "42655252545753",
  "43289754337497", "42173524246745", "43161357779161",
  // Adulto Cordero
  "43289746342105", "42655137169625", "42655137267929", "42655137300697",
  "43289746309337", "42655137530073", "43161352339673",
  // Adulto Salmón
  "43289875513561", "42651916140761", "42651916173529", "42651916206297",
  "43289875480793", "43387689959641", "43161301516505",
  // Gato Pescado
  "43289984827609", "42413789053145", "43568574202073",
  // Gato Pollo
  "43289965068505", "42413796983001", "43568576463065",
  // Gato Esterilizados
  "43289957662937", "42413798064345", "43568580690137",
  // Gato Kitten
  "43290069303513", "42413796458713", "43568572661977",
  // Latas Gato Kitten
  "42037603729625", "42037603762393", "49479598047571",
  // Latas Gato Pollo
  "12632988188738", "14243705159746", "49139872891219",
  // Latas Gato Pollo con Conejo
  "12633061228610", "14243707453506", "49139879051603",
  // Latas Gato Atún con Mejillones
  "12633070927938", "14243686580290", "49139897893203",
  // Latas Gato Atún con Sardina
  "49139894681939", "14243698737218",
  // Latas Gato Atún con Salmón
  "12633123782722", "48154989461843",
  // Latas Gato Atún con Gambas
  "14092976554050", "14242700132418", "48155011350867",
  // Latas Perro Cordero con Arroz
  "12632940478530", "14250706075714", "14102309306434", "14250709057602",
  // Latas Perro Only Cordero
  "13839214772290", "14250754048066", "15962371194946", "15982942421058",
  // Latas Perro Pollo con Zanahorias
  "37988511940791", "37988515152055", "14102317400130", "14250742546498",
  // Latas Perro Only Pollo
  "13837300170818", "14250757816386", "14102298001474", "14250760896578",
  // Latas Perro Pescado con Zanahoria
  "14030012350530", "14250733207618", "15982645084226", "15982921744450",
  // Latas Perro Pescado con Patatas
  "12632863277122", "14250724851778",
  // Latas Perro Puppy
  "31708495183938", "31708495216706"
]);

/**
 * Verifica si una variante está permitida
 * @param {string|number} variantId - ID de la variante de Shopify
 * @returns {boolean} true si está permitida, false si no
 */
export function isVariantAllowed(variantId) {
  return ALLOWED_VARIANT_IDS.has(String(variantId));
}

/**
 * Filtra las variantes de un producto para quedarse solo con las permitidas
 * @param {Array} variants - Array de variantes de Shopify
 * @returns {Array} Array filtrado con solo las variantes permitidas
 */
export function filterAllowedVariants(variants) {
  if (!Array.isArray(variants)) return [];
  return variants.filter(v => isVariantAllowed(v.id));
}
