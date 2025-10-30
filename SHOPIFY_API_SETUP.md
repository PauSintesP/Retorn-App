# 🚀 Guía de Configuración - API de Shopify

## ✅ Pasos Completados

Ya he configurado todo lo necesario para que puedas consultar productos desde tu tienda Shopify en lugar de usar los datos hardcodeados. Aquí está lo que se ha hecho:

### 1. Archivo `.env` Creado
Ubicación: `c:\Users\pausi\Documents\Projectes Pau\appsShopify\Retorn-App\.env`

**Debes completar tus credenciales reales aquí:**

```env
SHOPIFY_API_KEY=tu_api_key_aqui
SHOPIFY_API_SECRET=tu_api_secret_aqui
SHOPIFY_ACCESS_TOKEN=tu_access_token_aqui
SHOPIFY_STORE_URL=tu_tienda.myshopify.com
PRODUCT_DATA_SOURCE=shopify
```

### 2. Código Actualizado
- ✅ `productService.js` - Ahora usa la API de Shopify con tus credenciales
- ✅ `.gitignore` - Ya protege el archivo `.env` (no se subirá al repositorio)
- ✅ `.env.example` - Plantilla para referencia sin credenciales reales

### 3. Script de Prueba Creado
Ubicación: `app/scripts/testShopifyConnection.js`

---

## 📝 Próximos Pasos para Ti

### Paso 1: Completa el archivo `.env` con tus credenciales

Abre el archivo `.env` y reemplaza:

```env
SHOPIFY_API_KEY=TU_API_KEY_REAL
SHOPIFY_API_SECRET=TU_SECRET_REAL
SHOPIFY_ACCESS_TOKEN=TU_TOKEN_REAL
SHOPIFY_STORE_URL=tu-tienda.myshopify.com
```

**¿Dónde obtener estas credenciales?**

1. Ve a tu Panel de Admin de Shopify
2. Configuración > Aplicaciones y canales de venta
3. Desarrollar aplicaciones > Crea una app si no tienes
4. Copia:
   - API key
   - API secret
   - Admin API access token (necesitas generar uno con permisos de `read_products`)

### Paso 2: Prueba la Conexión

Ejecuta el script de prueba en PowerShell:

```powershell
node app/scripts/testShopifyConnection.js
```

Este script verificará:
- ✅ Que las credenciales estén configuradas
- ✅ Que la conexión a Shopify funcione
- ✅ Que puedas obtener productos

### Paso 3: Inicia tu Aplicación

Una vez verificada la conexión, inicia tu app normalmente:

```powershell
npm run dev
```

Ahora tu aplicación obtendrá los productos directamente desde Shopify en lugar de `productConstants.js`.

---

## 🔧 Cómo Funciona

### Flujo de Datos:

1. **Tu app** → llama a `getProducts()` en `productService.js`
2. **productService.js** → detecta `PRODUCT_DATA_SOURCE=shopify` en `.env`
3. **API Request** → hace petición a `https://tu-tienda.myshopify.com/admin/api/2025-01/products.json`
4. **Shopify responde** → con todos tus productos
5. **shopifyProductAdapter.js** → convierte los productos de Shopify al formato que usa tu app
6. **Cache** → guarda los productos en memoria por 5 minutos
7. **Tu app** → recibe los productos listos para usar en recomendaciones

### Ventajas:

- ✅ **Datos siempre actualizados** desde Shopify
- ✅ **Cache de 5 minutos** para optimizar rendimiento
- ✅ **Fallback automático** a datos locales si Shopify falla (configurable)
- ✅ **Misma estructura** de código - no necesitas cambiar nada más

---

## 🛠️ Configuración Avanzada

### Cambiar el tiempo de caché

En `app/config/productConfig.js`:

```javascript
export const PRODUCTS_CACHE_TIME = 5 * 60 * 1000; // 5 minutos
// Cambia a 10 minutos: 10 * 60 * 1000
```

### Deshabilitar fallback a datos locales

En `app/config/productConfig.js`:

```javascript
export const ENABLE_FALLBACK = false; // No usar datos locales si Shopify falla
```

### Volver a usar datos locales

En `.env`:

```env
PRODUCT_DATA_SOURCE=local
```

---

## 🔍 Resolución de Problemas

### Error: "Missing Shopify credentials"
**Solución:** Verifica que todas las variables estén en `.env` sin espacios extras.

### Error: "401 Unauthorized"
**Solución:** El `SHOPIFY_ACCESS_TOKEN` es inválido o no tiene permisos de `read_products`.

### Error: "404 Not Found"
**Solución:** Verifica que `SHOPIFY_STORE_URL` sea correcto (formato: `tu-tienda.myshopify.com`).

### Los productos no se actualizan
**Solución:** Espera 5 minutos (tiempo de caché) o reinicia la aplicación.

---

## 📚 Recursos Adicionales

- [Shopify Admin API - Products](https://shopify.dev/docs/api/admin-rest/2025-01/resources/product)
- [Crear Custom App en Shopify](https://help.shopify.com/en/manual/apps/app-types/custom-apps)

---

## 🎉 ¡Listo!

Una vez completes tus credenciales y ejecutes el script de prueba, tu app estará conectada a Shopify.

**¿Tienes dudas?** Revisa los logs que genera el script de prueba para identificar cualquier problema.
