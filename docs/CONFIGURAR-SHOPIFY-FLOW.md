# ✅ SOLUCIÓN: Configurar Shopify Flow (Método Simplificado)

## 🎯 El Problema Resuelto

Shopify Flow no mostraba "Properties" o "Attributes" en el selector. 

**SOLUCIÓN**: Ahora usamos **Order Note** que es mucho más fácil de encontrar.

---

## 📋 Configuración Paso a Paso

### 1️⃣ Crear el Workflow

1. Ve a **Settings** → **Apps and sales channels** → **Shopify Flow**
2. Click **Create workflow**
3. Nombre: `Pedidos desde Encuesta`

### 2️⃣ Configurar el Trigger

1. Click en **Select a trigger**
2. Busca y selecciona: **`Order paid`**
   - (También puedes usar "Order created" si prefieres)

### 3️⃣ Agregar la Condición ⭐ ESTO ES LO IMPORTANTE

1. Click en el **+** debajo del trigger
2. Selecciona **Add condition**
3. En el campo de búsqueda escribe: **`note`**
4. Selecciona: **`Order → Note`**
5. Operador: **`contains`** (o "contiene")
6. Valor: **`App Encuesta Retorn`**

**Debería verse así:**
```
Order.note contains "App Encuesta Retorn"
```

### 4️⃣ Agregar la Acción

Ahora decide qué hacer con estos pedidos:

**OPCIÓN A - Agregar un Tag:**
```
Action: Add tag to order
Tag: encuesta-retorn
```

**OPCIÓN B - Enviar Email:**
```
Action: Send internal email
To: gal.la@retorn.com
Subject: 🎯 Nuevo pedido desde encuesta
Body: 
  Pedido: {{ order.name }}
  Cliente: {{ order.customer.email }}
  Total: {{ order.total_price }}
```

**OPCIÓN C - Agregar Tag al Cliente:**
```
Action: Add tag to customer
Tag: uso-encuesta
```

### 5️⃣ Activar el Workflow

1. Click en **Turn on workflow** (esquina superior derecha)
2. El toggle debe estar en **verde** ✅

---

## 🧪 Probar que Funciona

### Paso 1: Hacer una compra de prueba
1. Completa tu encuesta
2. Agrega productos al carrito
3. Ve al checkout y completa el pago

### Paso 2: Verificar en el Admin
1. Ve a **Orders** en Shopify Admin
2. Abre el pedido que acabas de hacer
3. Busca el campo **"Note"** (Nota)
4. Deberías ver: `ORIGEN: App Encuesta Retorn`

### Paso 3: Verificar que el Flow funcionó
1. Ve a Shopify Flow
2. Abre tu workflow
3. Click en **Workflow runs** (ejecuciones)
4. Deberías ver tu pedido listado con ✅

---

## 📸 Cómo se ve en Shopify Flow

```
┌─────────────────────────────────┐
│   Trigger: Order paid           │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│   Condition:                    │
│   Order.note                    │
│   contains                      │
│   "App Encuesta Retorn"         │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│   Action:                       │
│   Add tag to order              │
│   Tag: "encuesta-retorn"        │
└─────────────────────────────────┘
```

---

## 🔍 Buscar en Shopify Flow

Si no encuentras el campo "Note", aquí están los pasos exactos:

1. En la condición, click en el campo de búsqueda
2. Escribe: **`note`**
3. Deberías ver aparecer: **`Order → Note`**
4. Click en **`Note`**
5. Selecciona operador **`contains`**
6. Escribe el texto: **`App Encuesta Retorn`**

---

## ❓ Troubleshooting

### "No encuentro el campo Note"

**Solución:** Escríbelo manualmente:
1. En la condición, pega esto en el campo:
   ```
   {{ order.note }}
   ```
2. Operador: `contains`
3. Valor: `App Encuesta Retorn`

### "El workflow no se ejecuta"

**Checklist:**
- [ ] El workflow está **activado** (toggle verde)
- [ ] Usaste el trigger **Order paid** (no "Order created")
- [ ] La condición dice **"contains"** no "equals"
- [ ] El texto es exactamente: **`App Encuesta Retorn`** (con mayúsculas)
- [ ] Hiciste una compra de prueba **DESPUÉS** de activar el workflow

### "No veo la nota en el pedido"

**Verificación:**
1. Abre la consola del navegador (F12)
2. Completa la encuesta
3. Agrega al carrito
4. Deberías ver en la consola:
   ```
   📝 Nota del pedido: "ORIGEN: App Encuesta Retorn"
   ```
5. Si no lo ves, recarga la página del proyecto

---

## ✅ Checklist Final

- [ ] Workflow creado
- [ ] Trigger "Order paid" seleccionado
- [ ] Condición: `Order.note contains "App Encuesta Retorn"`
- [ ] Acción agregada (tag/email)
- [ ] Workflow **ACTIVADO** (toggle verde)
- [ ] Compra de prueba realizada
- [ ] Nota visible en el pedido
- [ ] Workflow ejecutado correctamente (✅ en "Workflow runs")

---

## 🎉 ¡Listo!

Una vez configurado, todos los pedidos que vengan de tu encuesta tendrán la nota automáticamente y Shopify Flow los detectará.

**Ejemplo de lo que verás en Shopify Admin:**

```
Order #1234
Customer: Juan Pérez
Total: €45.00

Note: ORIGEN: App Encuesta Retorn

Tags: encuesta-retorn ← Agregado automáticamente por Flow
```

---

## 💡 Ideas Adicionales

### Acción: Descuento Automático
Puedes crear un descuento para clientes que usen la encuesta:

1. Action: **Apply discount code**
2. Code: `ENCUESTA15`
3. Este código debe existir previamente en Shopify

### Acción: Enviar Email al Cliente
```
Action: Send customer email
Subject: ¡Gracias por usar nuestra encuesta!
Body: Hemos preparado tu pedido personalizado...
```

### Acción: Actualizar Metafield del Cliente
```
Action: Update customer metafield
Namespace: custom
Key: used_survey
Value: true
```

---

**¿Necesitas ayuda?** Revisa que el texto sea exactamente `App Encuesta Retorn` (respetando mayúsculas y espacios).
