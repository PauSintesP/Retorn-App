# Configuración de Vercel para Retorn-App

## Variables de Entorno Requeridas

Debes configurar las siguientes variables de entorno en tu proyecto de Vercel:

### 1. Variables de Shopify (REQUERIDAS)
```
SHOPIFY_API_KEY=f482244be36568d0feadd8b8dd320f00
SHOPIFY_API_SECRET=<tu-api-secret-desde-partner-dashboard>
SHOPIFY_APP_URL=https://retorn-app.vercel.app
SCOPES=write_products
```

### 2. Cómo configurar las variables en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto "Retorn-App"
3. Ve a **Settings** → **Environment Variables**
4. Añade cada variable con su valor correspondiente
5. Selecciona los entornos: **Production**, **Preview**, y **Development**
6. Haz clic en **Save**

### 3. Dónde encontrar los valores

- **SHOPIFY_API_KEY**: En tu Partner Dashboard → Apps → Retorn-App → Client ID
- **SHOPIFY_API_SECRET**: En tu Partner Dashboard → Apps → Retorn-App → API secret key (debajo del Client ID)
- **SHOPIFY_APP_URL**: La URL de tu deployment en Vercel (https://retorn-app.vercel.app)
- **SCOPES**: Los permisos que necesita tu app (actualmente: write_products)

## Configuración en Shopify Partner Dashboard

### App URL Configuration
- **App URL**: `https://retorn-app.vercel.app`
- **Allowed redirection URL(s)**:
  - `https://retorn-app.vercel.app/auth/callback`
  - `https://retorn-app.vercel.app/auth/shopify/callback`

## Troubleshooting

### La app muestra una página vacía (documento triste)

**Causa**: Falta configurar las variables de entorno o hay un error en la autenticación.

**Solución**:
1. Verifica que todas las variables de entorno estén configuradas en Vercel
2. Asegúrate de que `SHOPIFY_API_SECRET` sea correcto
3. Redeploy la app después de añadir las variables
4. Desinstala y reinstala la app en tu tienda de desarrollo

### Error "Host not allowed" o "Invalid redirect_uri"

**Causa**: Las URLs de redirect no coinciden exactamente.

**Solución**:
1. Verifica que las URLs en Shopify Partner Dashboard sean exactamente:
   - `https://retorn-app.vercel.app/auth/callback`
   - `https://retorn-app.vercel.app/auth/shopify/callback`
2. Asegúrate de usar HTTPS (no HTTP)
3. No incluyas barra final (`/`) al final de las URLs

### La app pide el dominio de la tienda

**Causa**: La app no está siendo instalada desde Shopify Admin correctamente.

**Solución**:
1. Asegúrate de instalar la app desde el Shopify Partner Dashboard
2. Ve a Apps → Retorn-App → Test your app → Select store
3. NO accedas directamente a la URL `https://retorn-app.vercel.app`

## Comandos útiles

### Para hacer deploy
```bash
git add .
git commit -m "Configuración de OAuth y redirect URLs"
git push
```

Vercel automáticamente hará el deploy cuando hagas push a la rama `main`.

### Para verificar las variables de entorno localmente
```bash
npm run dev
```

Asegúrate de tener un archivo `.env` local con las mismas variables para desarrollo local.

## Próximos pasos

1. ✅ Configurar todas las variables de entorno en Vercel
2. ✅ Verificar URLs de redirect en Partner Dashboard
3. ✅ Hacer redeploy de la aplicación
4. ✅ Desinstalar la app de tu tienda de desarrollo (si ya estaba instalada)
5. ✅ Reinstalar la app desde el Partner Dashboard
6. ✅ Probar que la app carga correctamente
