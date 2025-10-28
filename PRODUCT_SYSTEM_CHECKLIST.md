# ✅ Sistema de Productos: Checklist de Implementación

## 📋 Archivos Creados

- [x] `app/config/productConfig.js` - Configuración centralizada
- [x] `app/services/productService.js` - Servicio principal de productos
- [x] `app/services/shopifyProductAdapter.js` - Adaptador Shopify → Local
- [x] `app/utils/productWrapper.js` - Wrapper para compatibilidad
- [x] `app/routes/api.shopify.products.jsx` - Endpoint API
- [x] `app/routes/app.product-diagnostics.jsx` - Página de diagnóstico
- [x] `app/scripts/testProductSystem.js` - Script de prueba
- [x] `PRODUCT_MIGRATION_GUIDE.md` - Guía completa

## ✅ Estado Actual

- ✅ Sistema funcionando con datos locales (`productConstants.js`)
- ✅ `productConstants.js` se mantiene como fallback
- ✅ Arquitectura lista para migrar a Shopify API
- ✅ Todo el código existente sigue funcionando
- ✅ Sin cambios breaking

## 🚀 Para Activar Shopify API

### 1. Preparación en Shopify Admin

- [ ] Agregar tags a los productos:
  - [ ] Tipo animal: `dog`, `cat`, `perro`, `gato`
  - [ ] Tipo comida: `dry`, `wet`, `seco`, `húmedo`
  - [ ] Edad: `puppy`, `kitten`, `adult`, `senior`
  - [ ] Especiales: `light`, `sterilized`
  - [ ] Tamaño croqueta: `small-bite`, `regular-bite`

- [ ] (Opcional) Crear metafields personalizados:
  - [ ] `nutrition.kcal_per_kg` (número decimal)
  - [ ] `nutrition.protein` (número decimal)
  - [ ] `nutrition.fat` (número decimal)

### 2. Verificación Técnica

- [ ] Probar endpoint: `https://tu-dominio.com/api/shopify/products`
- [ ] Verificar que retorna JSON con productos
- [ ] Verificar autenticación en `shopify.server.js`

### 3. Activación

- [ ] Abrir `app/config/productConfig.js`
- [ ] Cambiar: `export const PRODUCT_DATA_SOURCE = "shopify";`
- [ ] Hacer commit y deploy

### 4. Pruebas Post-Activación

- [ ] Acceder a `/app/product-diagnostics`
- [ ] Verificar que muestra "🌐 Shopify API"
- [ ] Revisar estadísticas de productos
- [ ] Verificar que productos se mapean correctamente
- [ ] Probar el formulario de recomendaciones

## 🔧 Herramientas de Diagnóstico

### En el Navegador
```
https://tu-dominio.com/app/product-diagnostics
```

### En Consola del Navegador
```javascript
// Ver fuente de datos actual
import { getCurrentDataSource } from './app/services/productService';
console.log(getCurrentDataSource());

// Ver productos
import { getProducts } from './app/services/productService';
const productos = await getProducts();
console.log(productos);

// Limpiar cache
import { clearProductsCache } from './app/services/productService';
clearProductsCache();
```

## 🔄 Cambiar Entre Fuentes

### Usar Datos Locales
```javascript
// app/config/productConfig.js
export const PRODUCT_DATA_SOURCE = "local";
```

### Usar Shopify API
```javascript
// app/config/productConfig.js
export const PRODUCT_DATA_SOURCE = "shopify";
```

### Usar Variable de Entorno
```bash
# .env
PRODUCT_DATA_SOURCE=shopify
```

## 🛡️ Fallback Automático

Si Shopify API falla, el sistema automáticamente:
1. Detecta el error
2. Registra en console.error
3. Usa `productConstants.js` como respaldo
4. La aplicación sigue funcionando

Para desactivar fallback:
```javascript
// app/config/productConfig.js
export const ENABLE_FALLBACK = false;
```

## 📊 Monitoreo

### Verificar Estado
```javascript
import { getCacheInfo, getCurrentDataSource } from './app/services/productService';

console.log('Fuente:', getCurrentDataSource());
console.log('Cache:', getCacheInfo());
```

### Limpiar Cache
```javascript
import { clearProductsCache } from './app/services/productService';
clearProductsCache();
```

## 🐛 Solución de Problemas

### Problema: Productos no se cargan
**Solución:**
1. Verificar `PRODUCT_DATA_SOURCE` en `productConfig.js`
2. Probar endpoint `/api/shopify/products` manualmente
3. Revisar logs de consola
4. Verificar autenticación de Shopify

### Problema: Productos mal clasificados
**Solución:**
1. Revisar tags en Shopify Admin
2. Ajustar funciones en `shopifyProductAdapter.js`
3. Agregar metafields para información precisa

### Problema: Cache desactualizado
**Solución:**
```javascript
clearProductsCache(); // Forzar recarga
```

### Problema: Variantes incorrectas
**Solución:**
1. Verificar SKUs de variantes en Shopify
2. Ajustar `separateVariantsBySize()` en adaptador
3. Usar tags `small-bite` y `regular-bite`

## 📝 Notas Importantes

1. **NO BORRAR** `productConstants.js` - Es el fallback
2. **Tags son cruciales** - El adaptador los usa para clasificar
3. **Cache activo** - Productos se cachean 5 minutos
4. **Logging** - Solo en development mode
5. **Compatibilidad** - Todo el código existente sigue funcionando

## 📞 Siguiente Paso

1. **Ahora:** Sistema funcionando con datos locales ✅
2. **Siguiente:** Configurar tags en Shopify Admin
3. **Luego:** Cambiar `PRODUCT_DATA_SOURCE` a "shopify"
4. **Finalmente:** Probar en `/app/product-diagnostics`

---

**Documentación completa:** Ver `PRODUCT_MIGRATION_GUIDE.md`
