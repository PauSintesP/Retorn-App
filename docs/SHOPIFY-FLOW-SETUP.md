# 🎯 Configuración de Shopify Flow - Guía Paso a Paso

## 📋 Contexto

Tu aplicación ahora inyecta **Order Attributes** además de Line Item Properties, lo que hace mucho más fácil la detección en Shopify Flow.

## ✅ Configuración en Shopify Flow

### Paso 1: Crear un Nuevo Workflow

1. Ve a **Settings** → **Apps and sales channels** → **Shopify Flow**
2. Click en **Create workflow**
3. Dale un nombre: **"Procesar Pedidos de Encuesta"**

### Paso 2: Configurar el Trigger

1. Click en **Select a trigger**
2. Busca y selecciona: **"Order created"** o **"Order paid"**
   - **Recomendado**: "Order paid" (solo procesa pedidos pagados)

### Paso 3: Agregar la Condición

Esta es la parte que estabas intentando hacer. Ahora es MUCHO más fácil:

1. Click en el botón **"+"** debajo del trigger
2. Selecciona **"Add condition"**
3. En el campo de búsqueda, escribe: **`note.source`** o **`note attributes`**
4. Configura la condición:

   ```
   Condition: Order → Note attributes → source → equals → "app_encuesta"
   ```

   **O en formato visual:**
   ```
   Order.note_attributes.source == "app_encuesta"
   ```

### Paso 4: Agregar la Acción

Ahora configura qué hacer cuando se detecte un pedido de la encuesta:

**Opción A - Agregar Tag al Pedido:**
```
Action: Add tag to order
Tag: "encuesta-recomendacion"
```

**Opción B - Enviar Email al Equipo:**
```
Action: Send internal email
To: gal.la@retorn.com
Subject: 🎯 Nuevo pedido desde encuesta
Body: 
  Cliente: {{ order.customer.name }}
  Pedido: {{ order.name }}
  Total: {{ order.total_price }}
  Productos: {{ order.line_items }}
```

**Opción C - Agregar Tag al Cliente:**
```
Action: Add tag to customer
Tag: "uso-encuesta"
```

## 🔍 Ejemplo de Workflow Completo

```
┌─────────────────────────────┐
│   TRIGGER: Order paid       │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   CONDITION:                │
│   note_attributes.source    │
│   equals "app_encuesta"     │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   ACTION 1:                 │
│   Add tag to order          │
│   Tag: "encuesta"           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   ACTION 2:                 │
│   Add tag to customer       │
│   Tag: "uso-encuesta"       │
└─────────────────────────────┘
```

## 📝 Alternativa: Usar el Buscador de Shopify Flow

Si no encuentras `note_attributes.source` directamente:

### Método 1: Búsqueda por Categoría
1. En la condición, click en **"Select a variable"**
2. Navega: **Order** → **Note attributes** → **[Seleccionar custom attribute]**
3. Escribe manualmente: `source`
4. Operador: `equals`
5. Valor: `app_encuesta`

### Método 2: Usar Custom Liquid (Avanzado)
```liquid
{% if order.note_attributes.source == "app_encuesta" %}
  true
{% else %}
  false
{% endif %}
```

## 🧪 Verificar que Funciona

### Paso 1: Hacer una Compra de Prueba
1. Completa tu encuesta
2. Agrega productos al carrito
3. Completa el checkout

### Paso 2: Verificar en el Admin de Shopify
1. Ve a **Orders**
2. Abre el pedido de prueba
3. Busca en **Additional details**:
   ```
   Note attributes:
   - source: app_encuesta
   - encuesta_completada: true
   ```

### Paso 3: Verificar que el Flow se Ejecutó
1. Ve a tu workflow en Shopify Flow
2. Click en **"Workflow runs"** o **"Ejecuciones"**
3. Deberías ver tu pedido listado
4. Si hay un ícono verde ✅, funcionó
5. Si hay un icono rojo ❌, click para ver el error

## 🐛 Troubleshooting

### Problema: La condición no se cumple nunca

**Solución 1 - Verificar Note Attributes:**
```
1. Abre un pedido de prueba
2. Scroll hasta "Additional details"
3. Verifica que aparezca: source: app_encuesta
```

**Solución 2 - Usar condición más permisiva:**
```
Condición: Order → Note attributes → Contains key "source"
```

**Solución 3 - Verificar la URL generada:**
Abre la consola del navegador y busca:
```
🔗 URL del carrito: https://retorn.com/cart/123:1?properties%5B_source%5D=...&attributes%5Bsource%5D=app_encuesta
```

### Problema: No encuentro "note attributes" en el selector

**Solución - Escribir manualmente:**
1. En lugar de buscar, escribe directamente en el campo de condición:
   ```
   {{ order.note_attributes.source }}
   ```
2. Luego selecciona el operador `equals`
3. Y el valor `app_encuesta`

## 📊 Metadata Inyectada por la App

Tu aplicación ahora inyecta **dos tipos de metadata**:

### 1. Line Item Properties (en cada producto)
```
properties[_source] = "app_encuesta"
```
- Aparece en cada línea del pedido
- El `_` la hace oculta en el carrito
- Más difícil de acceder en Flow

### 2. Order Attributes (a nivel de pedido) ✅ RECOMENDADO
```
attributes[source] = "app_encuesta"
attributes[encuesta_completada] = "true"
```
- Aparece en el pedido completo
- **MUY FÁCIL** de acceder en Flow
- Visible en "Additional details"

## ✅ Checklist de Configuración

- [ ] Workflow creado en Shopify Flow
- [ ] Trigger: "Order paid" seleccionado
- [ ] Condición: `note_attributes.source == "app_encuesta"` configurada
- [ ] Acción agregada (tag, email, etc.)
- [ ] Workflow activado (toggle en verde)
- [ ] Compra de prueba realizada
- [ ] Order attributes verificados en el pedido
- [ ] Workflow ejecutado correctamente
- [ ] Tag o acción aplicada al pedido

## 🎯 Resumen Rápido

**Lo que tienes que hacer en Shopify Flow:**

1. Crear workflow
2. Trigger: **Order paid**
3. Condición: **Order.note_attributes.source** equals **"app_encuesta"**
4. Acción: **Add tag to order** → Tag: **"encuesta"**
5. Guardar y activar

**Listo.** 🎉

---

**Nota importante:** Usa **Order Attributes** (`note_attributes.source`) en lugar de Line Item Properties. Es mucho más fácil y confiable para Shopify Flow.
