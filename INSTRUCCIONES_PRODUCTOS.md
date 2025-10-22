# Instrucciones para Completar la Configuración de Productos

## ✅ Cambios Completados

### 1. **Algoritmo de Selección Mejorado**
- ✅ Duración óptima: 21-56 días (3-8 semanas)
- ✅ Punto ideal: 35 días (5 semanas)
- ✅ Sistema de puntuación con 3 factores:
  - 50% Proximidad a duración ideal
  - 30% Eficiencia por tamaño del animal
  - 20% Costo-eficiencia
- ✅ Cálculo de duración mejorado (redondeo correcto, mejor formato)

### 2. **Emoticonos Eliminados**
- ❌ 🎉 del título principal
- ❌ 📊 de "Cálculo Nutricional"
- ❌ 🍽️ de títulos de sección
- ❌ 📊 de "Distribución óptima"
- ❌ 💡 y 🎯 del footer
- ❌ ⏱️ y 🔢 de campos no esenciales
- ✅ Conservados: 🍽️, ⚡, 📦 (esenciales en tarjetas de nutrición)

### 3. **Botón de Carrito Implementado**
- ✅ Botón "Agregar producto/productos al carrito"
- ✅ Funciona con alimentación seca (1 producto) y mixta (2 productos)
- ✅ Abre en nueva pestaña
- ✅ Estilos aplicados con gradiente y efectos hover

### 4. **Soporte para Imágenes de Productos**
- ✅ Componente preparado para mostrar imágenes
- ✅ Estilos CSS aplicados con efecto hover
- ✅ Fallback cuando no hay imagen disponible

---

## 📋 Tareas Pendientes

### Paso 1: Agregar URLs de Imágenes

En el archivo `app/data/productConstants.js`, agrega el campo `imagen` a cada producto:

```javascript
PERRO_PUPPY_SALMON: {
  nombre: "RETORN PUPPY SALMON",
  imagen: "https://retorn.com/cdn/shop/files/puppy-salmon.jpg", // ← AGREGAR ESTA LÍNEA
  tipo: "Seco",
  animal: "Perro",
  segmento: "Cachorros",
  kcalEmKg: 3451,
  // ... resto del producto
},
```

**¿Cómo obtener las URLs?**
1. Ve a tu tienda Shopify: https://retorn.com/admin
2. Productos → Selecciona un producto
3. En la sección de medios, haz clic derecho en la imagen → "Copiar dirección de imagen"
4. La URL debe tener este formato: `https://retorn.com/cdn/shop/files/[nombre-producto].jpg`

### Paso 2: Agregar IDs de Variantes de Shopify

Para que el botón "Agregar al carrito" funcione, necesitas agregar el `variantId` de Shopify a cada variante:

```javascript
variantes: [
  { 
    ean: "8436540365361", 
    cantidad: "500 gr", 
    sku: "RET005000",
    variantId: "12345678901234" // ← AGREGAR ESTA LÍNEA
  },
  { 
    ean: "8436540364869", 
    cantidad: "3 kg", 
    sku: "RET00503",
    variantId: "12345678901235" // ← AGREGAR ESTA LÍNEA
  },
  // ... resto de variantes
],
```

**¿Cómo obtener los IDs de variantes?**

#### Opción A: Desde la Admin de Shopify
1. Ve a Productos en tu admin de Shopify
2. Selecciona un producto
3. En la sección de variantes, el ID aparece en la URL o en los detalles
4. El formato es un número largo (ej: `40234567890123`)

#### Opción B: Usando la API de Shopify (recomendado)
Puedes crear un script para obtener todos los IDs automáticamente:

```javascript
// Script para obtener variant IDs
fetch('https://retorn.com/products/[handle].json')
  .then(res => res.json())
  .then(data => {
    data.variants.forEach(variant => {
      console.log(`SKU: ${variant.sku}, ID: ${variant.id}`);
    });
  });
```

Reemplaza `[handle]` con el handle del producto (la parte final de la URL).

#### Opción C: Desde el código fuente de la página
1. Ve a https://retorn.com/products/[producto]
2. Abre las herramientas de desarrollador (F12)
3. Busca en el HTML: `data-variant-id` o `variant-id`
4. Los IDs estarán en los elementos de selección de variantes

---

## 🎯 Lista de Productos que Necesitan Configuración

### Perros - Seco
- [ ] PERRO_PUPPY_SALMON
- [ ] PERRO_LIGHT_SENIOR
- [ ] PERRO_ADULT_POLLO (+ variantes_small)
- [ ] PERRO_ADULT_CORDERO (+ variantes_small)
- [ ] PERRO_ADULT_SALMON (+ variantes_small)
- [ ] PERRO_ADULT_PAVO (+ variantes_small)
- [ ] PERRO_ACTIVE_POLLO (+ variantes_small)

### Perros - Húmedo
- [ ] PERRO_HUMEDO_POLLO_MANZANA
- [ ] PERRO_HUMEDO_SALMON_BROCOLI
- [ ] PERRO_HUMEDO_CORDERO_ARANDANOS
- [ ] PERRO_HUMEDO_PAVO_ZANAHORIA

### Gatos - Seco
- [ ] GATO_KITTEN
- [ ] GATO_ADULT_POLLO
- [ ] GATO_ADULT_SALMON
- [ ] GATO_STERILIZED_POLLO
- [ ] GATO_STERILIZED_SALMON
- [ ] GATO_SENIOR

### Gatos - Húmedo
- [ ] GATO_HUMEDO_POLLO_CONEJO
- [ ] GATO_HUMEDO_ATUN_GAMBAS

---

## 🧪 Cómo Probar

1. **Sin IDs de variantes**: El botón abrirá el carrito vacío
2. **Con IDs de variantes**: El botón agregará los productos automáticamente
3. **Sin imágenes**: Las tarjetas de producto funcionarán normalmente, solo sin foto
4. **Con imágenes**: Se mostrará la imagen con efecto hover

---

## 💡 Ejemplo Completo

```javascript
PERRO_ADULT_POLLO: {
  nombre: "RETORN ADULT POLLO",
  imagen: "https://retorn.com/cdn/shop/files/adult-pollo.jpg",
  tipo: "Seco",
  animal: "Perro",
  segmento: "Adulto Pollo",
  kcalEmKg: 3674,
  variantes: [
    { 
      ean: "8436540365989", 
      cantidad: "500 gr", 
      sku: "RETAP500",
      variantId: "40234567890123"
    },
    { 
      ean: "8436540364616", 
      cantidad: "3 kg", 
      sku: "RETAP03",
      variantId: "40234567890124"
    },
    { 
      ean: "8436540364630", 
      cantidad: "12 kg", 
      sku: "RETAP12",
      variantId: "40234567890125"
    },
    { 
      ean: "8436540365095", 
      cantidad: "20 kg", 
      sku: "RETAP20",
      variantId: "40234567890126"
    },
  ],
  variantes_small: [
    { 
      ean: "8436540365996", 
      cantidad: "500 gr", 
      sku: "RETAP500S",
      variantId: "40234567890127"
    },
    { 
      ean: "8436540365170", 
      cantidad: "3 kg", 
      sku: "RETAP03S",
      variantId: "40234567890128"
    },
    { 
      ean: "8436540366153", 
      cantidad: "12 kg", 
      sku: "RETAP12S",
      variantId: "40234567890129"
    },
  ],
  link: "https://retorn.com/products/pienso-natural-perros-pollo",
},
```

---

## 🚀 Una vez completado

Cuando hayas agregado todos los `imagen` y `variantId`:

1. Guarda los cambios en `productConstants.js`
2. Reinicia el servidor de desarrollo
3. Prueba el formulario con diferentes mascotas
4. Verifica que:
   - Las imágenes se muestran correctamente
   - El botón de carrito funciona
   - Los productos se agregan correctamente al carrito de Shopify
   - Las duraciones son realistas (3-8 semanas típicamente)

---

¿Necesitas ayuda para obtener los IDs o las URLs de las imágenes? ¡Pregúntame!
