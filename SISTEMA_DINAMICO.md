# 🚀 Sistema Dinámico de Productos RETORN

## ✅ ¿Qué se ha hecho?

Se ha **eliminado completamente la base de datos hardcodeada** (`productDatabase.js`) y se ha implementado un **sistema 100% dinámico** que obtiene toda la información directamente desde Shopify.

### Antes (❌ Sistema antiguo):
- Cada producto debía estar manualmente agregado en `productDatabase.js`
- Si cambiabas algo en Shopify (imagen, nombre, precio), NO se reflejaba en la encuesta
- Requería commits y deployments cada vez que agregabas un producto

### Ahora (✅ Sistema nuevo):
- **0 líneas de código hardcodeado** para productos
- Todo se lee directamente desde Shopify API
- Si cambias algo en el admin de Shopify, se refleja **automáticamente** en la encuesta
- Agregar/editar productos = simplemente hacerlo en Shopify

---

## 🏷️ Cómo funciona

El sistema extrae información de 3 fuentes (en orden de prioridad):

### 1. **Tags de Shopify** (Recomendado)
Los tags son la forma más fácil de clasificar productos. El sistema busca:

- **Tipo**: `Seco`, `Humedo` (o `Húmedo`), `wet`, `dry`
- **Animal**: `Perro`, `Gato`, `dog`, `cat`
- **Segmento**: `Cachorros`, `puppy`, `kitten`, `Senior`, `Light`, `Esterilizado`, `Sterilized`

**Ejemplo de tags para un producto:**
```
Seco, Perro, Adulto Pollo
```

### 2. **Metafields** (Para calorías)
Para las calorías (kcal/kg), el sistema busca un metafield con:
- **Namespace**: `custom`
- **Key**: `kcal_em_kg` (o `kcal_per_kg`, `calories`, `calorias`)
- **Type**: `number_integer`
- **Value**: `3674` (ejemplo)

### 3. **Título del producto** (Fallback inteligente)
Si no hay tags o metafields, el sistema analiza el título automáticamente:
- `RETORN PUPPY SALMON 500 GR` → Detecta: Seco, Perro, Cachorros, ~3451 kcal
- `RETORN LATAS GATO POLLO 80 GR` → Detecta: Humedo, Gato, Adulto Pollo, ~900 kcal

---

## 📋 Paso a paso: Configuración inicial

### Opción A: Agregar tags automáticamente desde el CSV

Ejecuta el script que cree para ti:

```bash
cd "c:\Users\pausi\Documents\Projectes Pau\appsShopify\Retorn-App"
node scripts/addTagsToProducts.js
```

Este script:
1. Lee tu CSV (`Calculadora Manual DEFINITIVA.xlsx - Productos.csv`)
2. Obtiene todos los productos de Shopify
3. Agrega los tags correctos automáticamente
4. Agrega metafields de calorías

**⚠️ IMPORTANTE:** Asegúrate de tener las credenciales en `.env`:
```env
SHOPIFY_STORE_URL=tu-tienda.myshopify.com
SHOPIFY_ACCESS_TOKEN=tu_access_token
```

### Opción B: Agregar tags manualmente (para productos nuevos)

Cuando agregues un nuevo producto en Shopify Admin:

1. Ve a **Products** → Selecciona el producto
2. En la sección **Tags**, agrega:
   - Tipo: `Seco` o `Humedo`
   - Animal: `Perro` o `Gato`
   - Segmento: `Cachorros`, `Adulto Pollo`, `Senior Light`, etc.
3. (Opcional) Agrega un metafield personalizado para calorías:
   - Namespace: `custom`
   - Key: `kcal_em_kg`
   - Value: número de calorías (ej: 3674)

**Ejemplo completo:**
```
Tags: Seco, Perro, Adulto Pollo
Metafield: custom.kcal_em_kg = 3674
```

---

## 🔄 Ventajas del sistema dinámico

### ✅ Actualizaciones en tiempo real
- Cambias la imagen del producto en Shopify → Se actualiza automáticamente en la encuesta
- Cambias el nombre → Se actualiza automáticamente
- Cambias el precio → Se actualiza automáticamente
- Agregas una nueva variante → Aparece automáticamente

### ✅ Mantenimiento simple
- **NO necesitas tocar código** para agregar/editar productos
- **NO necesitas hacer commits** para actualizar información
- **NO necesitas hacer deployments** para cambios de productos

### ✅ Escalable
- Agrega 100 productos nuevos → Solo agrégales los tags en Shopify
- Sin límites de productos
- Sin archivos gigantes de configuración

---

## 🧪 Cómo probar

1. **Ejecuta el script de tags** (si no lo has hecho):
   ```bash
   node scripts/addTagsToProducts.js
   ```

2. **Abre la encuesta** en tu navegador:
   ```
   https://retorn.com/pages/survey (o donde esté embedida)
   ```

3. **Completa la encuesta** con diferentes combinaciones:
   - Perro + Adulto + Pollo
   - Gato + Cachorros
   - Perro + Senior + Mixta

4. **Verifica que se recomienden productos correctos**

5. **Prueba cambiar algo en Shopify**:
   - Cambia la imagen de un producto
   - Actualiza la página de la encuesta
   - Verifica que se vea la imagen nueva

---

## 📊 Clasificación de productos

### Tipo de Alimento
- `Seco` - Pienso seco/kibble
- `Humedo` - Latas/comida húmeda

### Animal
- `Perro`
- `Gato`

### Segmentos
**Para perros:**
- `Cachorros` - Puppies
- `Adulto Pollo` - Adultos con pollo
- `Adulto Cordero` - Adultos con cordero
- `Adulto Salmón` - Adultos con salmón
- `Adulto Pescado` - Adultos con pescado
- `Senior Light` - Perros mayores o con sobrepeso
- `Cordero Arroz` - Variante con arroz
- `Pollo Conejo`, `Pollo Zanahoria`, etc.

**Para gatos:**
- `Cachorros` - Kittens
- `Adulto Pollo` - Adultos con pollo
- `Adulto Pescado` - Adultos con pescado
- `Esterilizados Light` - Gatos esterilizados
- `Salmón`, `Mejillones`, `Gambas`, `Sardina` - Variedades de sabores

### Calorías (kcal/kg) - Valores de referencia
- **Comida húmeda**: 871-1000 kcal/kg
- **Cachorros perro**: 3451 kcal/kg
- **Cachorros gato**: 4173 kcal/kg
- **Adultos perro**: 3327-3674 kcal/kg (según proteína)
- **Adultos gato**: 3686-4070 kcal/kg (según proteína)
- **Senior/Light**: 3453 kcal/kg
- **Esterilizados**: 3940 kcal/kg

---

## 🐛 Troubleshooting

### Problema: No se encuentran productos
**Solución:** Verifica que:
1. Los productos tengan `vendor=Retorn` en Shopify
2. Los tags estén bien escritos (sin errores de tipografía)
3. El script de tags se haya ejecutado correctamente

### Problema: Calorías incorrectas
**Solución:**
1. Agrega un metafield `custom.kcal_em_kg` con el valor correcto
2. O actualiza el fallback en `shopifyProductAdapter.js` función `extractCalories()`

### Problema: Segmento incorrecto
**Solución:**
1. Agrega un tag específico con el segmento correcto
2. O actualiza la función `extractSegment()` en `shopifyProductAdapter.js`

---

## 📝 Notas importantes

### ⚠️ Rate Limiting
El script de tags espera 0.5 segundos entre cada request para no exceder el rate limit de Shopify API.

### ⚠️ Permisos de API
Asegúrate de que tu `SHOPIFY_ACCESS_TOKEN` tenga permisos para:
- `read_products`
- `write_products`
- `write_product_listings`

### 💡 Recomendación
**Usa tags siempre que sea posible.** Son más fáciles de gestionar que metafields y permiten filtrado rápido.

---

## 🎯 Próximos pasos

1. **Ejecuta el script de tags** para configurar todos los productos existentes
2. **Prueba la encuesta** con diferentes combinaciones
3. **Documenta tu proceso** de agregar productos nuevos (siempre incluir tags)
4. **(Opcional)** Crea un template en Shopify con los tags pre-configurados para nuevos productos

---

## ✨ Resumen

**Antes:** 302 líneas de código hardcodeado que había que actualizar manualmente

**Ahora:** 0 líneas hardcodeadas, todo dinámico desde Shopify

**Resultado:** Sistema mantenible, escalable y actualizable sin tocar código 🚀
