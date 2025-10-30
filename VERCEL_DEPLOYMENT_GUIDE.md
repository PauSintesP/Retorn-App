# 🚀 Deployment en Vercel - Guía Completa

## ⚠️ Problema Común: "Missing Shopify credentials"

Si ves este error en producción:
```
❌ Error fetching from Shopify API: Error: Missing Shopify credentials
```

Significa que las **variables de entorno no están configuradas en Vercel**.

## ✅ Solución: Configurar Variables de Entorno en Vercel

### Paso 1: Acceder a tu Proyecto en Vercel

1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto **Retorn-App**

### Paso 2: Configurar Environment Variables

1. En tu proyecto, ve a la pestaña **Settings**
2. En el menú lateral, selecciona **Environment Variables**
3. Añade las siguientes variables:

#### Variable 1: SHOPIFY_STORE_URL
- **Key:** `SHOPIFY_STORE_URL`
- **Value:** `tu-tienda.myshopify.com` (sin https://)
- **Environments:** Selecciona **Production**, **Preview**, y **Development**
- Click en **Save**

#### Variable 2: SHOPIFY_ACCESS_TOKEN
- **Key:** `SHOPIFY_ACCESS_TOKEN`
- **Value:** `shpat_xxxxxxxxxxxxxxxxxxxxx` (tu token de Shopify Admin)
- **Environments:** Selecciona **Production**, **Preview**, y **Development**
- Click en **Save**

### Paso 3: Obtener el Access Token de Shopify

Si no tienes el token:

1. Ve a tu **Shopify Admin**: https://admin.shopify.com/store/[tu-tienda]
2. Ve a **Settings** → **Apps and sales channels**
3. Click en **Develop apps** (o "Desarrollar apps" en español)
4. Si no tienes una app, click en **Create an app**
5. Nombre de la app: "Retorn Survey API" (o cualquier nombre)
6. Click en **Create app**
7. Ve a **Configure Admin API scopes**
8. Activa estos permisos:
   - ✅ `read_products`
   - ✅ `read_product_listings`
9. Click en **Save**
10. Ve a **API credentials**
11. Click en **Install app**
12. Confirma la instalación
13. Copia el **Admin API access token** que se genera
    - ⚠️ **IMPORTANTE:** Guárdalo en un lugar seguro, solo se muestra una vez

### Paso 4: Redeploy del Proyecto

Después de añadir las variables de entorno:

1. Ve a la pestaña **Deployments** en Vercel
2. Encuentra el último deployment exitoso
3. Click en los **tres puntos** (⋯) a la derecha
4. Selecciona **Redeploy**
5. Confirma con **Redeploy**

**O más simple:**

1. Haz un cambio pequeño en tu código (ej: añade un comentario)
2. Haz commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Redeploy for env vars"
   git push
   ```
3. Vercel automáticamente hará el deploy con las nuevas variables

### Paso 5: Verificar el Deployment

1. Espera a que el deployment termine (generalmente 1-3 minutos)
2. Ve a tu sitio en producción: `https://tu-app.vercel.app`
3. Abre el survey: `https://tu-app.vercel.app/public/survey`
4. Completa el formulario
5. En la consola del navegador (F12), deberías ver:
   ```
   ✅ X productos cargados desde Shopify API (público)
   ```

## 🔍 Verificar que Funcionó

### Método 1: Console del Navegador

1. Abre el survey en producción
2. Abre las **Developer Tools** (F12)
3. Ve a la pestaña **Console**
4. Completa el cuestionario hasta el final
5. Busca estos mensajes:
   ```
   🎯 Calculando recomendación de productos...
   📦 Obteniendo productos desde la API...
   ✅ X productos cargados desde Shopify API (público)
   ```

### Método 2: Network Tab

1. Abre las **Developer Tools** (F12)
2. Ve a la pestaña **Network**
3. Completa el cuestionario
4. Busca una petición a `/api/public/products`
5. Verifica que el **Status** sea `200 OK`
6. En la **Response**, deberías ver un JSON con tus productos

### Método 3: Endpoint Directo

Visita directamente el endpoint API:
```
https://tu-app.vercel.app/api/public/products
```

Deberías ver un JSON con tus productos de Shopify.

## 🚨 Troubleshooting

### Error: "Shopify credentials not configured"

**Causa:** Las variables de entorno no existen en Vercel o tienen nombres incorrectos.

**Solución:**
1. Verifica que las variables se llamen exactamente:
   - `SHOPIFY_STORE_URL` (sin espacios)
   - `SHOPIFY_ACCESS_TOKEN` (sin espacios)
2. Verifica que estén en los 3 entornos (Production, Preview, Development)
3. Haz redeploy

### Error: "Shopify API error: 401 Unauthorized"

**Causa:** El token de acceso es inválido o ha expirado.

**Solución:**
1. Ve a Shopify Admin
2. Regenera el token en **Apps and sales channels** → Tu app → **API credentials**
3. Actualiza `SHOPIFY_ACCESS_TOKEN` en Vercel
4. Haz redeploy

### Error: "Shopify API error: 403 Forbidden"

**Causa:** El token no tiene permisos para leer productos.

**Solución:**
1. Ve a Shopify Admin → Tu app
2. Ve a **Configuration** → **Admin API integration**
3. Verifica que `read_products` esté activado
4. Guarda los cambios
5. Si es necesario, reinstala la app

### Error: "Missing Shopify credentials" (después de configurar)

**Causa:** Vercel no ha recargado las variables.

**Solución:**
1. Haz un cambio en tu código (añade un comentario)
2. Commit y push
3. O haz redeploy manual desde Vercel

### Error: "CORS" o "Network Error"

**Causa:** Problema con el endpoint público.

**Solución:**
1. Verifica que el archivo `app/routes/api.public.products.jsx` existe
2. Verifica que no haya errores de sintaxis
3. Haz redeploy

## 📊 Cómo Funciona la Arquitectura

### En Desarrollo (Local)

```
Cliente (navegador)
    ↓
productService.js detecta que está en cliente
    ↓
Llama a /api/public/products (localhost)
    ↓
api.public.products.jsx (servidor local)
    ↓
Lee variables de .env local
    ↓
Fetch a Shopify API
    ↓
Retorna productos al cliente
```

### En Producción (Vercel)

```
Cliente (navegador del usuario)
    ↓
productService.js detecta que está en cliente
    ↓
Llama a /api/public/products (tu-app.vercel.app)
    ↓
api.public.products.jsx (Vercel serverless function)
    ↓
Lee variables de Vercel Environment Variables
    ↓
Fetch a Shopify API
    ↓
Retorna productos al cliente
```

### 🔒 Seguridad

✅ **Correcto:**
- Las credenciales están solo en el servidor (Vercel)
- El cliente solo ve los productos, no las credenciales
- El endpoint `/api/public/products` actúa como proxy seguro

❌ **Incorrecto (antes):**
- Intentar acceder a credenciales desde el navegador
- Exponer tokens en el código del cliente

## 📝 Checklist Final

Antes de declarar "todo funciona":

- [ ] Variables de entorno configuradas en Vercel
- [ ] Variables aplicadas a Production, Preview, y Development
- [ ] Deployment exitoso después de configurar las variables
- [ ] El survey público carga sin errores
- [ ] Los productos aparecen en las recomendaciones
- [ ] Console del navegador muestra "✅ X productos cargados"
- [ ] Network tab muestra `/api/public/products` con status 200

## 🎉 ¡Listo!

Si todos los pasos están completos, tu app debería funcionar correctamente en Vercel con productos cargados 100% desde Shopify.

---

**Notas Adicionales:**

- Las variables de entorno se actualizan inmediatamente al hacer redeploy
- No necesitas reiniciar Vercel, solo redeploy
- El caché de productos es de 5 minutos (cliente) y 10 minutos (CDN)
- Los logs del servidor se pueden ver en Vercel → Functions → Logs
