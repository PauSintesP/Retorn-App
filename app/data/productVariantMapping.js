/**
 * Mapeo opcional de variantes por cantidad para productos específicos
 *
 * Uso: permite forzar el ID de la variante (variantId) que se debe usar
 * cuando la recomendación selecciona una cantidad textual concreta (ej: "3 kg", "12 kg", "185 g x 12ud").
 *
 * NOTA:
 * - Usa los IDs numéricos de Shopify (REST) de ProductVariant (los que devuelve nuestra API pública /api/products).
 * - Si no hay entrada para un producto o una cantidad, se usará la variante detectada automáticamente.
 *
 * Estructura del mapeo:
 * {
 *   [productId: string | number]: Array<{
 *     cantidad: string;        // Debe coincidir con el campo "cantidad" que mostramos (ej: "3 kg", "12 kg", "185 g x 12ud")
 *     variantId: string | number; // ID de la variante que quieres forzar para esa cantidad
 *   }>
 * }
 */

export const PRODUCT_VARIANT_MAPPING = {
  // Ejemplos (rellena con tus datos reales si quieres forzar variantes):
  // 1303216783426: [
  //   { cantidad: "3 kg", variantId: "1234567890" },
  //   { cantidad: "12 kg", variantId: "1234567899" },
  // ],
  // 4500505952322: [
  //   { cantidad: "3 kg", variantId: "9876543210" }, // Croqueta pequeña
  // ],
};

/**
 * Devuelve un variantId forzado si existe un mapeo para productId+cantidad.
 */
export function getVariantIdOverride(productId, cantidad) {
  if (!productId || !cantidad) return null;
  const entries = PRODUCT_VARIANT_MAPPING[productId] || PRODUCT_VARIANT_MAPPING[Number(productId)] || [];
  const match = entries.find(e => (e.cantidad || '').toLowerCase() === cantidad.toLowerCase());
  return match ? String(match.variantId) : null;
}
