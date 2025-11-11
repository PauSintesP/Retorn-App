# Implementación del Botón "Ir al Carrito de Retorn"

## 📋 Resumen
Se ha implementado un botón en la pantalla de resultados de la encuesta que redirige al usuario directamente al carrito de Retorn con los productos recomendados y las cantidades correctas. Si el usuario ha aplicado el cupón, este se aplicará automáticamente en el carrito.

## ✨ Características Implementadas

### 1. **Gestión del Cupón de Descuento**
- Estado `cuponAplicado` que rastrea si el usuario ha activado el cupón RET15
- Función `aplicarCupon()` que actualiza el estado cuando el usuario hace clic en "Aplicar cupón"
- El banner muestra un mensaje diferente según el estado del cupón

### 2. **Cálculo Inteligente de Cantidades**
La función `calcularCantidadProducto(producto)` calcula automáticamente cuántas unidades del producto debe añadir al carrito basándose en:

- **Gramos diarios necesarios** de la mascota
- **Formato del producto** (kg, gramos, cajas, packs)
- **Duración estimada** del producto

**Lógica:**
- Si una unidad del producto dura más de 25 días → añade 1 unidad
- Si dura menos → calcula cuántas unidades son necesarias para aproximadamente 1 mes

**Formatos soportados:**
- "3 kg", "12 kg" → Sacos grandes
- "185 gr x 12ud" → Packs de latas
- "Caja 12 latas 185 g" → Cajas
- Latas individuales

### 3. **Función de Redirección al Carrito**
La función `irAlCarrito()`:

1. **Recopila los productos recomendados:**
   - Producto seco (si existe)
   - Producto húmedo (en caso de alimentación mixta)

2. **Construye el URL del carrito de Shopify:**
   ```
   https://retorn.com/cart/{variantId1}:{cantidad1},{variantId2}:{cantidad2}
   ```

3. **Aplica el cupón si está activado:**
   ```
   https://retorn.com/cart/{items}?discount=RET15
   ```

4. **Abre el carrito en una nueva pestaña**

### 4. **Diseño del Botón**
El botón sigue el mismo estilo que los botones de navegación:

**Características visuales:**
- Color principal: Gradiente de verde Retorn (#6ec1b3 → #739f99 → #5fb3a1)
- Icono de carrito (🛒)
- Texto en mayúsculas con font Oswald
- Efecto hover con elevación y animación
- Efecto de onda al pasar el ratón
- Responsive: se adapta a móvil, tablet y desktop

**Estructura:**
```jsx
<button onClick={irAlCarrito} className="add-to-cart-button">
  <span className="cart-button-icon">🛒</span>
  <span className="cart-button-text">Ir al carrito de Retorn</span>
</button>
```

## 📂 Archivos Modificados

### 1. `app/components/survey/RecommendationResult.jsx`
**Cambios:**
- ✅ Añadido estado `cuponAplicado`
- ✅ Función `aplicarCupon()`
- ✅ Función `calcularCantidadProducto(producto)`
- ✅ Función `irAlCarrito()`
- ✅ Botón "Ir al carrito de Retorn" con diseño principal
- ✅ Botón "Realizar otro cuestionario" como acción secundaria

### 2. `app/styles/surveyStyles.js`
**Cambios:**
- ✅ Estilos para `.add-to-cart-button`
- ✅ Estilos para `.cart-button-icon`
- ✅ Estilos para `.cart-button-text`
- ✅ Estilos para `.action-buttons-container.secondary`
- ✅ Efectos hover y activos
- ✅ Responsive design (móvil, tablet, desktop)

## 🎯 Flujo de Usuario

1. **Usuario completa la encuesta** → Ve los productos recomendados
2. **Banner de descuento visible** → Usuario puede hacer clic en "Aplicar cupón"
3. **Cupón aplicado** → El estado cambia y el mensaje se actualiza
4. **Usuario hace clic en "Ir al carrito de Retorn"**
5. **Sistema calcula cantidades automáticamente**
6. **Se abre nueva pestaña con:**
   - Productos correctos en el carrito
   - Cantidades calculadas según las necesidades
   - Cupón RET15 aplicado (si el usuario lo activó)

## 🔍 Ejemplo de URLs Generadas

### Alimentación Seca (Solo producto seco)
```
https://retorn.com/cart/48312345678:1
```

### Alimentación Mixta (Seco + Húmedo)
```
https://retorn.com/cart/48312345678:1,48398765432:2
```

### Con Cupón Aplicado
```
https://retorn.com/cart/48312345678:1?discount=RET15
```

## ✅ Validaciones Implementadas

- ✅ Verifica que exista el `variantId` antes de añadir al carrito
- ✅ Calcula cantidades mínimas de 1 unidad
- ✅ Maneja formatos de producto variados
- ✅ Valida gramos diarios antes de calcular cantidades
- ✅ Abre en nueva pestaña con seguridad (noopener, noreferrer)

## 🎨 Diseño Responsive

### Móvil (< 600px)
- Botón ancho completo
- Padding: 1.3rem 1.75rem
- Font-size: 1rem
- Icono: 1.4rem

### Tablet (600px - 768px)
- Botón ancho completo
- Padding: 1.4rem 2.25rem
- Font-size: 1.1rem
- Icono: 1.5rem

### Desktop (> 768px)
- Ancho automático con mín. 350px y máx. 500px
- Padding: 1.5rem 3rem
- Font-size: 1.15rem
- Icono: 1.6rem

## 🚀 Próximos Pasos Sugeridos

1. **Pruebas:** Verificar en diferentes dispositivos y navegadores
2. **Analytics:** Añadir tracking cuando se hace clic en el botón
3. **Optimización:** Considerar guardar el estado del cupón en localStorage
4. **UX:** Mostrar un mensaje de confirmación antes de redirigir (opcional)

## 📝 Notas Técnicas

- El cupón RET15 debe estar configurado en Shopify para funcionar
- La URL del carrito utiliza el formato estándar de Shopify
- Los variantId deben ser válidos y estar activos en la tienda
- Se usa `window.open()` para abrir en nueva pestaña sin perder el contexto de la encuesta
