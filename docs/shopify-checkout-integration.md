# Integración de Checkout con Shopify Flow

## 📋 Descripción General

Esta implementación permite que una aplicación web externa (encuesta) redirija correctamente a los usuarios al checkout de Shopify, inyectando automáticamente una propiedad de línea oculta (`_source: app_encuesta`) que activa automatizaciones en Shopify Flow.

## 🎯 Funcionalidad Principal: `redirectToCheckout`

### Propósito
Generar un Cart Permalink de Shopify con line item properties personalizadas para rastreo y automatización.

### Código de la Función

```javascript
/**
 * Función para redirigir al checkout de Shopify con line item properties
 * 
 * @description
 * Genera un Cart Permalink de Shopify e inyecta la propiedad `_source: app_encuesta`
 * para que Shopify Flow pueda detectar y procesar el pedido automáticamente.
 * Maneja correctamente el frame busting cuando la app está en un iframe.
 * 
 * @param {string} variantId - ID de la variante del producto de Shopify (ej: "gid://shopify/ProductVariant/12345" o "12345")
 * @param {number} quantity - Cantidad del producto a agregar
 * @param {string} shopDomain - Dominio de la tienda Shopify (ej: "retorn.com")
 * 
 * @example
 * // Uso simple
 * redirectToCheckout('48123456789', 2, 'retorn.com');
 * 
 * @example
 * // Con botón HTML
 * <button onclick="redirectToCheckout('48123456789', 1, 'retorn.com')">
 *   Comprar Ahora
 * </button>
 */
const redirectToCheckout = (variantId, quantity, shopDomain) => {
  try {
    // 1. Construir el Cart Permalink base
    // Formato: https://{domain}/cart/{variantId}:{quantity}
    const cartPermalink = `https://${shopDomain}/cart/${variantId}:${quantity}`;
    
    // 2. Inyectar Line Item Property (CRÍTICO para Shopify Flow)
    // El guion bajo "_source" hace que la propiedad sea oculta en el carrito
    // Esto permite que Shopify Flow detecte el origen del pedido
    const propertyKey = encodeURIComponent('properties[_source]');
    const propertyValue = encodeURIComponent('app_encuesta');
    const checkoutUrl = `${cartPermalink}?${propertyKey}=${propertyValue}`;
    
    console.log('🛒 Redirigiendo al checkout de Shopify...');
    console.log('  📦 Variant ID:', variantId);
    console.log('  🔢 Cantidad:', quantity);
    console.log('  🏪 Dominio:', shopDomain);
    console.log('  🔗 URL completa:', checkoutUrl);
    console.log('  🏷️ Property inyectada: _source=app_encuesta');
    
    // 3. Frame Busting: Detectar si estamos en un iframe y redirigir en la ventana principal
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      console.log('  🖼️ Detectado iframe - Forzando redirección en ventana principal');
      try {
        // Intentar acceder al top frame (puede fallar por políticas de seguridad CORS)
        window.top.location.href = checkoutUrl;
      } catch (securityError) {
        console.warn('  ⚠️ No se pudo acceder a window.top (bloqueo de seguridad)');
        console.log('  🔄 Fallback: Abriendo en nueva pestaña');
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // No estamos en iframe, redirección normal
      window.location.href = checkoutUrl;
    }
    
  } catch (error) {
    console.error('❌ Error en redirectToCheckout:', error);
    // Fallback de emergencia: abrir en nueva pestaña sin properties
    const fallbackUrl = `https://${shopDomain}/cart/${variantId}:${quantity}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
};
```

## 🔧 Componentes Técnicos

### 1. Cart Permalink
```
https://{shopDomain}/cart/{variantId}:{quantity}
```
- **shopDomain**: Dominio de tu tienda (ej: `retorn.com`)
- **variantId**: ID numérico de la variante (ej: `48123456789`)
- **quantity**: Cantidad a agregar (ej: `2`)

### 2. Line Item Properties
```
?properties[_source]=app_encuesta
```
- **Clave**: `properties[_source]` (el `_` hace que sea oculta)
- **Valor**: `app_encuesta` (identificador para Shopify Flow)

### 3. Frame Busting
```javascript
const isInIframe = window.self !== window.top;
```
Detecta si la app está dentro de un iframe y fuerza la redirección en la ventana principal.

## 📝 Ejemplos de Uso

### Ejemplo 1: Botón Simple
```html
<button onclick="redirectToCheckout('48123456789', 1, 'retorn.com')">
  Comprar Ahora
</button>
```

### Ejemplo 2: React Component
```jsx
const ProductButton = ({ variantId, quantity }) => {
  const handleClick = () => {
    redirectToCheckout(variantId, quantity, 'retorn.com');
  };

  return (
    <button onClick={handleClick}>
      Agregar al Carrito
    </button>
  );
};
```

### Ejemplo 3: Múltiples Productos
```javascript
// Para agregar múltiples productos a la vez
const agregarVariosProductos = () => {
  const items = [
    '48123456789:2',  // Producto 1, cantidad 2
    '48987654321:1',  // Producto 2, cantidad 1
  ].join(',');
  
  const shopDomain = 'retorn.com';
  const cartPermalink = `https://${shopDomain}/cart/${items}`;
  const propertyKey = encodeURIComponent('properties[_source]');
  const propertyValue = encodeURIComponent('app_encuesta');
  const checkoutUrl = `${cartPermalink}?${propertyKey}=${propertyValue}`;
  
  // Frame busting
  const isInIframe = window.self !== window.top;
  if (isInIframe) {
    try {
      window.top.location.href = checkoutUrl;
    } catch (e) {
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    }
  } else {
    window.location.href = checkoutUrl;
  }
};
```

## 🔄 Integración con Shopify Flow

### Configuración del Workflow

1. **Trigger**: Order Created
2. **Condition**: `properties._source` equals `app_encuesta`
3. **Action**: Tu automatización personalizada (enviar email, agregar tag, etc.)

### Ejemplo de Condición en Shopify Flow
```
IF line_item.properties._source == "app_encuesta"
THEN
  - Add tag to order: "encuesta-recommendation"
  - Send notification to staff
  - Update customer metafield
END
```

## 🚨 Consideraciones Importantes

### Seguridad del Iframe
- El navegador puede bloquear `window.top.location.href` por políticas CORS
- Siempre incluir un fallback con `window.open()`

### URL Encoding
- **Siempre** usar `encodeURIComponent()` para las properties
- Formato: `properties[_source]` → `properties%5B_source%5D`

### Variant ID Format
- Shopify acepta IDs numéricos: `48123456789`
- No usar el formato GID completo en el permalink

## 📊 Debugging

### Console Logs
La función incluye logs detallados:
```
🛒 Redirigiendo al checkout de Shopify...
  📦 Variant ID: 48123456789
  🔢 Cantidad: 2
  🏪 Dominio: retorn.com
  🔗 URL completa: https://retorn.com/cart/48123456789:2?properties%5B_source%5D=app_encuesta
  🏷️ Property inyectada: _source=app_encuesta
  🖼️ Detectado iframe - Forzando redirección en ventana principal
```

### Verificar Properties en Shopify
1. Completa una compra de prueba
2. Ve a Orders en el Admin
3. Abre el pedido
4. En "Line Items", verifica que aparezca `_source: app_encuesta`

## ✅ Checklist de Implementación

- [ ] Función `redirectToCheckout` implementada
- [ ] Variant IDs correctos obtenidos de Shopify
- [ ] Shop domain configurado
- [ ] Frame busting testeado
- [ ] Properties visibles en pedidos de prueba
- [ ] Shopify Flow configurado y activo
- [ ] Fallbacks funcionando correctamente

## 🔗 Recursos

- [Shopify Cart Permalinks](https://shopify.dev/docs/themes/architecture/templates/cart#cart-permalinks)
- [Shopify Line Item Properties](https://shopify.dev/docs/themes/liquid/reference/objects/line-item#line_item-properties)
- [Shopify Flow Documentation](https://help.shopify.com/en/manual/shopify-flow)

---

**Implementado por**: Frontend Senior Developer  
**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0
