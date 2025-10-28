# Sistema de Productos - Migración de Local a Shopify API

Este documento explica cómo funciona el nuevo sistema de productos y cómo migrar de datos locales a la API de Shopify.

## 📋 Estructura del Sistema

```
app/
├── config/
│   └── productConfig.js          # Configuración centralizada
├── data/
│   └── productConstants.js       # Datos locales (mantener como fallback)
├── services/
│   ├── productService.js         # Servicio principal de productos
│   └── shopifyProductAdapter.js  # Adaptador Shopify → Formato Local
├── utils/
│   └── productWrapper.js         # Wrapper para compatibilidad
└── routes/
    └── api.shopify.products.jsx  # Endpoint API de Shopify
```

## 🚀 Estado Actual

**Fuente de datos activa:** `LOCAL` (productConstants.js)

El sistema está completamente funcional con datos locales. Todos los cambios son **retrocompatibles**.

## 🔄 Cómo Funciona

### 1. Configuración (productConfig.js)

```javascript
// Cambiar esta variable cuando estés listo para usar Shopify API
export const PRODUCT_DATA_SOURCE = "local"; // o "shopify"
```

### 2. Servicio de Productos (productService.js)

El servicio abstrae la fuente de datos:

```javascript
import { getProducts } from "../services/productService";

// Funciona con ambas fuentes sin cambios en el código
const productos = await getProducts();
```

### 3. Adaptador de Shopify (shopifyProductAdapter.js)

Convierte automáticamente los productos de Shopify al formato de `productConstants.js`:

**Shopify API Response:**
```json
{
  "id": "123456",
  "title": "RETORN ADULT POLLO",
  "product_type": "Dry Food",
  "tags": ["dog", "adult", "chicken"],
  "variants": [...]
}
```

**Se convierte a:**
```javascript
{
  PERRO_ADULT_POLLO: {
    nombre: "RETORN ADULT POLLO",
    tipo: "Seco",
    animal: "Perro",
    segmento: "Adulto Pollo",
    kcalEmKg: 3674,
    imagen: "...",
    variantes: [...],
    variantes_small: [...]
  }
}
```

## 📝 Pasos para Activar Shopify API

### Paso 1: Verificar el Endpoint

El endpoint `/api/shopify/products` ya está creado en:
```
app/routes/api.shopify.products.jsx
```

Prueba que funciona accediendo a: `https://tu-dominio.com/api/shopify/products`

### Paso 2: Configurar Metafields en Shopify (Opcional pero recomendado)

Para información nutricional precisa, agrega metafields a tus productos en Shopify:

1. Ve a tu Admin de Shopify
2. Settings → Custom data → Products
3. Agrega estos metafields:
   - `nutrition.kcal_per_kg` (tipo: decimal)
   - `nutrition.protein` (tipo: decimal)
   - `nutrition.fat` (tipo: decimal)

### Paso 3: Etiquetar Productos en Shopify

Agrega tags relevantes a tus productos para que el adaptador funcione mejor:

**Tags recomendados:**
- Tipo animal: `dog`, `cat`, `perro`, `gato`
- Tipo comida: `dry`, `wet`, `seco`, `húmedo`
- Edad: `puppy`, `kitten`, `adult`, `senior`
- Especiales: `light`, `sterilized`, `esterilizado`
- Tamaño croqueta: `small-bite`, `regular-bite`

### Paso 4: Activar la API

En `app/config/productConfig.js`, cambia:

```javascript
export const PRODUCT_DATA_SOURCE = "shopify"; // ← Cambiar de "local" a "shopify"
```

O usa una variable de entorno:
```bash
PRODUCT_DATA_SOURCE=shopify
```

### Paso 5: Probar

```javascript
import { getProducts, getCurrentDataSource } from "../services/productService";

// Verificar fuente activa
console.log(getCurrentDataSource()); // Debe mostrar "shopify"

// Obtener productos
const productos = await getProducts();
console.log(productos);
```

## 🛡️ Seguridad y Fallback

El sistema incluye fallback automático:

```javascript
export const ENABLE_FALLBACK = true; // en productConfig.js
```

Si la API de Shopify falla, automáticamente usará `productConstants.js` como respaldo.

## 💾 Cache

Los productos de Shopify se cachean por **5 minutos** para mejorar rendimiento:

```javascript
import { clearProductsCache, getCacheInfo } from "../services/productService";

// Limpiar cache manualmente (ej: después de actualizar productos)
clearProductsCache();

// Ver estado del cache
console.log(getCacheInfo());
```

## 🔧 Uso en Código Existente

### Opción A: Async/Await (Recomendado)

```javascript
import { getProducts } from "../services/productService";

export async function calcularRecomendacion(answers) {
  const productos = await getProducts();
  const productoSeco = productos.PERRO_ADULT_POLLO;
  // ...
}
```

### Opción B: Mantener Código Síncrono (Compatibilidad)

```javascript
import { initializeProducts, getProductsSync } from "../utils/productWrapper";

// Al inicio de tu aplicación
await initializeProducts();

// Luego usar síncronamente
const productos = getProductsSync();
const productoSeco = productos.PERRO_ADULT_POLLO;
```

## 📊 Mapeo de Campos Shopify → Local

| Shopify Field | Local Field | Notas |
|--------------|-------------|-------|
| `title` | `nombre` | Directo |
| `product_type` + `tags` | `tipo` | "Seco" o "Humedo" |
| `tags` | `animal` | "Perro" o "Gato" |
| `tags` + `title` | `segmento` | Ej: "Adulto Pollo" |
| `metafields.kcal_per_kg` | `kcalEmKg` | O valor por defecto |
| `images[0].src` | `imagen` | Primera imagen |
| `variants` | `variantes` | Array mapeado |
| `variants` (filtrado) | `variantes_small` | Solo small-bite |

## ⚠️ Consideraciones Importantes

1. **No eliminar productConstants.js** - Sirve como fallback y referencia
2. **Tags son cruciales** - El adaptador depende de tags para clasificar productos
3. **Metafields opcionales** - Si no existen, usa valores por defecto
4. **Cache activo** - Productos se cachean 5 minutos
5. **Logging en desarrollo** - Logs detallados solo en development mode

## 🐛 Troubleshooting

### Los productos no se cargan desde Shopify

1. Verificar que `PRODUCT_DATA_SOURCE = "shopify"`
2. Revisar que el endpoint `/api/shopify/products` funciona
3. Verificar autenticación de Shopify en `shopify.server.js`
4. Revisar logs de consola

### Productos mal mapeados

1. Revisar tags en Shopify Admin
2. Ajustar funciones en `shopifyProductAdapter.js`:
   - `determineProductType()`
   - `determineAnimal()`
   - `determineSegment()`
3. Agregar metafields para información precisa

### Cache desactualizado

```javascript
import { clearProductsCache } from "../services/productService";
clearProductsCache(); // Forzar recarga
```

## 📞 Preguntas Frecuentes

**Q: ¿Puedo usar ambas fuentes a la vez?**
A: No, pero puedes cambiar entre ellas modificando `PRODUCT_DATA_SOURCE`.

**Q: ¿Qué pasa si elimino productConstants.js?**
A: No lo elimines. Es el fallback si Shopify falla.

**Q: ¿Cómo actualizo productos sin esperar el cache?**
A: Llama a `clearProductsCache()` después de actualizar en Shopify.

**Q: ¿Funciona con productos sin metafields?**
A: Sí, el adaptador usa valores por defecto si no hay metafields.

---

**Estado:** ✅ Sistema preparado y funcionando con datos locales
**Próximo paso:** Configurar tags en Shopify y activar `PRODUCT_DATA_SOURCE = "shopify"`
