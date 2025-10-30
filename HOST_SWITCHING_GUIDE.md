# 🔄 Guía: Cambiar entre Localhost y Vercel

## 📋 Resumen

Esta guía te muestra cómo **cambiar fácilmente entre desarrollo local (localhost) y preview del cliente (Vercel)** sin necesidad de hacer git push cada vez.

---

## 🎯 Problema Resuelto

**Antes**: Tenías que hacer `git add --all && git commit && git push` cada vez que querías que el cliente viera los cambios en Vercel.

**Ahora**: Puedes trabajar en localhost y cuando quieras mostrar al cliente, cambias con **un solo comando**.

---

## 🚀 Comandos Disponibles

### 1️⃣ Desarrollo en Localhost (Predeterminado)

```bash
npm run dev
```

o explícitamente:

```bash
npm run dev:localhost
```

**¿Qué hace?**
- Inicia Shopify CLI en `localhost:3000`
- Los productos vienen de la API de Shopify (tu tienda real)
- El app se ejecuta localmente para desarrollo rápido

**¿Cuándo usarlo?**
- Desarrollo día a día
- Pruebas rápidas de cambios
- Debugging local

---

### 2️⃣ Preview para el Cliente (Vercel)

```bash
npm run dev:vercel
```

**¿Qué hace?**
- Sigue trabajando en tu código local
- Pero el app se sirve a través de Vercel: `https://retorn-app.vercel.app`
- El cliente puede ver los cambios EN VIVO sin esperar git push

**¿Cuándo usarlo?**
- Cuando quieres mostrar cambios al cliente
- Para probar en el entorno real de Vercel
- Para verificar que todo funciona en producción

---

## 🔧 Cómo Funciona

### Arquitectura Simplificada

```
┌─────────────────────────────────────────────────────────┐
│                    TÚ (Desarrollador)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Opción A: npm run dev                                   │
│  ┌──────────────────────────────────────────┐           │
│  │   Shopify CLI → localhost:3000           │           │
│  │   App solo visible para ti               │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
│  Opción B: npm run dev:vercel                           │
│  ┌──────────────────────────────────────────┐           │
│  │   Shopify CLI → Vercel Tunnel            │           │
│  │   https://retorn-app.vercel.app          │           │
│  │   App visible para el cliente            │           │
│  └──────────────────────────────────────────┘           │
│                                                          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   API Shopify (Productos)     │
         │   Misma tienda en ambos casos │
         └───────────────────────────────┘
```

---

## 📝 Workflow Recomendado

### Día a día de desarrollo:

1. **Trabaja en local**:
   ```bash
   npm run dev
   ```
   
2. **Haz cambios en tu código**:
   - Edita archivos
   - Los cambios se reflejan automáticamente en localhost
   - Sin git push necesario

3. **Cuando el cliente quiera ver**:
   - Detén el servidor (Ctrl+C)
   - Cambia a modo Vercel:
     ```bash
     npm run dev:vercel
     ```
   - Comparte la URL: `https://retorn-app.vercel.app`
   - El cliente ve tus cambios EN VIVO

4. **Vuelve a desarrollo local**:
   - Detén el servidor (Ctrl+C)
   - Vuelve a local:
     ```bash
     npm run dev
     ```

---

## ⚠️ Importante: Productos Vienen de Shopify

**Ambos entornos usan la MISMA tienda de Shopify**:

- Los productos se obtienen de la API de Shopify
- Las credenciales están en `.env`:
  ```
  SHOPIFY_STORE_URL=tu-tienda.myshopify.com
  SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
  ```

**NO hay diferencia entre "tienda local" y "tienda producción"**. Solo cambias el HOST (localhost vs Vercel).

---

## 🐛 Troubleshooting

### Problema: "Missing Shopify credentials"

**Causa**: Las variables de entorno no están configuradas.

**Solución**:
1. Verifica que `.env` existe en la raíz del proyecto
2. Verifica que contiene:
   ```
   SHOPIFY_STORE_URL=tu-tienda.myshopify.com
   SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
   ```
3. Reinicia el servidor

---

### Problema: El cliente no ve los cambios en Vercel

**Causa**: Estás usando `npm run dev` (localhost) en lugar de `npm run dev:vercel`.

**Solución**:
1. Detén el servidor (Ctrl+C)
2. Ejecuta: `npm run dev:vercel`
3. Comparte la URL de Vercel

---

### Problema: Cambios no se reflejan en ningún entorno

**Causa**: El navegador puede tener caché.

**Solución**:
1. Recarga con Ctrl+F5 (hard refresh)
2. Abre en modo incógnito
3. Limpia caché del navegador

---

## 📊 Comparación: Antes vs Ahora

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Desarrollo local** | Shopify CLI en localhost | ✅ Igual (npm run dev) |
| **Mostrar al cliente** | git add + commit + push + esperar Vercel | ✅ npm run dev:vercel (instantáneo) |
| **Productos** | ❌ Hardcodeados | ✅ Desde API Shopify |
| **Tiempo para preview** | 2-5 minutos (git + Vercel build) | ⚡ 10 segundos |
| **Git commits** | Muchos commits de prueba | Solo commits con cambios finales |

---

## 🎓 Conceptos Clave

### ¿Qué es un "tunnel"?

Un tunnel permite que tu código local sea accesible desde internet. 

- `npm run dev:vercel` usa `--tunnel-url https://retorn-app.vercel.app`
- Tu código sigue en tu máquina
- Pero Shopify CLI lo expone en la URL de Vercel

### ¿Por qué no usar siempre Vercel?

Localhost es más rápido:
- Cambios instantáneos
- Sin latencia de red
- Debugging más fácil

Vercel es para:
- Mostrar al cliente
- Probar en entorno real
- Verificar deploy antes de git push

---

## 🔐 Seguridad

Las credenciales de Shopify:
- Nunca se exponen al cliente
- Están en `.env` (nunca en git)
- Se usan solo en el servidor

El cliente solo ve:
- La interfaz de la app
- Los productos (obtenidos de forma segura por el servidor)
- No tiene acceso a tokens ni credenciales

---

## 📚 Referencias

- `app/config/shopifyEnvironment.js`: Configuración centralizada
- `package.json`: Scripts de npm definidos
- `shopify.app.toml`: Configuración de Shopify CLI

---

## ✅ Checklist Rápido

Antes de empezar el día:
- [ ] `.env` está configurado con credenciales de Shopify
- [ ] `npm run dev` funciona en localhost
- [ ] Productos se cargan desde la API

Cuando el cliente quiera ver:
- [ ] Detener servidor local (Ctrl+C)
- [ ] Ejecutar `npm run dev:vercel`
- [ ] Compartir URL: https://retorn-app.vercel.app
- [ ] Cliente puede ver cambios EN VIVO

Después de la demo:
- [ ] Detener servidor Vercel (Ctrl+C)
- [ ] Volver a `npm run dev`
- [ ] Continuar desarrollo local

---

## 💡 Pro Tip

**Puedes tener dos terminales abiertas**:

Terminal 1 (Localhost):
```bash
npm run dev
```

Terminal 2 (Vercel - solo cuando cliente necesita ver):
```bash
npm run dev:vercel
```

Así puedes cambiar entre ambos sin detener nada. Solo comparte la URL correspondiente según quién necesita ver la app.

---

**¿Dudas?** Revisa `DEPLOY_EXTENSION.md` para más información sobre el deploy a producción (git push real).
