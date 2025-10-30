# 🎯 GUÍA RÁPIDA: Cambiar Entre Tiendas Local y Producción

## 🚀 Configuración Inicial (Solo Una Vez)

### 1. Configurar Variables de Entorno

Edita tu archivo `.env` y añade las credenciales de **AMBAS** tiendas:

```env
# Tienda de desarrollo local
SHOPIFY_STORE_URL=tu-tienda-dev.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_local_xxxxxx

# Tienda de producción (la real de Vercel)
SHOPIFY_STORE_URL_PRODUCTION=tu-tienda-real.myshopify.com
SHOPIFY_ACCESS_TOKEN_PRODUCTION=shpat_production_xxxxxx
```

### 2. Reiniciar el Servidor

Después de editar el `.env`:
```bash
# Ctrl+C para detener el servidor
npm run dev
```

---

## ⚡ Cambiar de Tienda (1 Solo Archivo)

### Para usar la TIENDA REAL de producción localmente:

1. Abre el archivo: `app/config/shopifyEnvironment.js`
2. Cambia la línea 13:

```javascript
export const DEVELOPMENT_MODE = "production"; // 👈 CAMBIA A "production"
```

3. Guarda el archivo
4. **Recarga tu navegador** (no necesitas reiniciar el servidor en desarrollo)

### Para volver a tu tienda de desarrollo local:

1. Abre el archivo: `app/config/shopifyEnvironment.js`
2. Cambia la línea 13:

```javascript
export const DEVELOPMENT_MODE = "local"; // 👈 CAMBIA A "local"
```

3. Guarda el archivo
4. Recarga tu navegador

---

## 📊 Verificar qué Tienda Estás Usando

### Método 1: Console del Servidor

Cuando inicies tu app (`npm run dev`), verás:

```bash
============================================================
🔧 CONFIGURACIÓN DE SHOPIFY API
============================================================
📍 Modo: LOCAL  (o PRODUCTION)
🏪 Entorno: Tienda de desarrollo local (o Tienda real de producción)
🌐 Store URL: ✅ Configurada
🔑 Access Token: ✅ Configurada
============================================================
```

### Método 2: Console del Navegador

Cuando cargues productos, verás:

```
============================================================
📡 API PUBLIC PRODUCTS - LOCAL (o PRODUCTION)
🏪 Tienda de desarrollo local (o Tienda real de producción)
============================================================
✅ Store URL: tu-tienda.myshopify.com
✅ Access Token: shpat_xxxxx...
✅ X productos cargados desde Shopify (local o production)
============================================================
```

---

## 🎯 Casos de Uso

### Escenario 1: Desarrollando Nueva Funcionalidad
```javascript
// shopifyEnvironment.js
export const DEVELOPMENT_MODE = "local";
```
- Usa tu tienda de desarrollo
- No afectas la tienda real
- Puedes hacer pruebas destructivas

### Escenario 2: Probando con Datos Reales (SIN PUSH!)
```javascript
// shopifyEnvironment.js
export const DEVELOPMENT_MODE = "production";
```
- Usa la tienda real de producción
- Pruebas localmente con datos reales
- **NO necesitas hacer git push para ver cambios**
- Puedes probar cómo se verán los productos reales

### Escenario 3: Verificar Bug Reportado en Producción
```javascript
// shopifyEnvironment.js
export const DEVELOPMENT_MODE = "production";
```
- Reproduces el bug localmente con datos de producción
- Debugging más fácil con tus herramientas locales
- Fix rápido sin deploy

---

## ⚠️ IMPORTANTE

### ✅ SÍ puedes:
- Cambiar entre tiendas cuantas veces quieras
- Probar localmente con datos de producción
- Hacer cambios en el código sin afectar producción (hasta que hagas push)

### ❌ NO deberías:
- Hacer operaciones de escritura en producción desde local (este setup es solo lectura)
- Subir el archivo `.env` a git
- Olvidarte de verificar qué modo estás usando antes de hacer cambios críticos

---

## 🔄 Flujo de Trabajo Recomendado

### Para nueva funcionalidad:

1. **Desarrollar en local:**
   ```javascript
   export const DEVELOPMENT_MODE = "local";
   ```

2. **Probar con datos reales (opcional):**
   ```javascript
   export const DEVELOPMENT_MODE = "production";
   ```

3. **Commit y push cuando esté listo:**
   ```bash
   git add .
   git commit -m "Nueva funcionalidad"
   git push
   ```

4. **Vercel despliega automáticamente**
   - Vercel SIEMPRE usa las variables de su dashboard
   - No importa qué tengas en `DEVELOPMENT_MODE`

---

## 🐛 Troubleshooting

### Error: "Missing Shopify credentials"
**Causa:** No configuraste las variables para ese entorno.

**Solución:**
- Si `DEVELOPMENT_MODE = "local"`: verifica `SHOPIFY_STORE_URL` y `SHOPIFY_ACCESS_TOKEN`
- Si `DEVELOPMENT_MODE = "production"`: verifica `SHOPIFY_STORE_URL_PRODUCTION` y `SHOPIFY_ACCESS_TOKEN_PRODUCTION`

### Los productos no cambian
**Causa:** Caché del navegador o del servidor.

**Solución:**
1. Recarga con Ctrl+F5 (hard reload)
2. O reinicia el servidor (`Ctrl+C` y `npm run dev`)

### ¿Cómo sé si Vercel usa local o production?
**Respuesta:** Vercel SIEMPRE usa las variables de su dashboard:
- En Vercel configura solo: `SHOPIFY_STORE_URL` y `SHOPIFY_ACCESS_TOKEN`
- Estas apuntan a tu tienda real
- El `DEVELOPMENT_MODE` solo afecta a tu entorno local

---

## 📝 Resumen Visual

```
┌─────────────────────────────────────────────┐
│  shopifyEnvironment.js                      │
│  DEVELOPMENT_MODE = "local" o "production"  │
└────────────────┬────────────────────────────┘
                 │
       ┌─────────┴─────────┐
       │                   │
    "local"           "production"
       │                   │
       ▼                   ▼
  ┌────────┐         ┌──────────┐
  │ .env   │         │  .env    │
  │ STORE  │         │  STORE_  │
  │ TOKEN  │         │  PROD    │
  └────────┘         │  TOKEN_  │
                     │  PROD    │
                     └──────────┘
```

---

## 🎉 Beneficios

✅ **Sin git push constantes** - Prueba con datos reales localmente
✅ **Cambio instantáneo** - Solo cambia 1 línea en 1 archivo
✅ **Seguro** - Solo lectura, no afectas producción
✅ **Flexible** - Cambia tantas veces como necesites
✅ **Debugging fácil** - Datos reales en tu entorno local

---

**¿Listo para probar?** Cambia el `DEVELOPMENT_MODE` y recarga tu navegador! 🚀
