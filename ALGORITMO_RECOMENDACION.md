# 🧮 Algoritmo de Recomendación de Productos RETORN

## Descripción General

Sistema completo de cálculo de necesidades calóricas y recomendación de productos para mascotas (perros y gatos) basado en múltiples factores individuales.

---

## 📊 Estructura del Sistema

### Archivos Creados

1. **`/app/data/productConstants.js`** (722 líneas)
   - Factores de cálculo para perros y gatos
   - Catálogo completo de productos (seco y húmedo)
   - Clasificación de razas de perros por tamaño
   - Valores kcal/kg de cada producto

2. **`/app/utils/productRecommendation.js`** (500+ líneas)
   - Algoritmo principal de cálculo de calorías
   - Selección inteligente de productos
   - Cálculo de cantidades diarias
   - Lógica para alimentación mixta

3. **`/app/components/survey/RecommendationResult.jsx`**
   - Componente visual para mostrar resultados
   - Cards de productos recomendados
   - Información de cantidades y enlaces

4. **`/app/styles/surveyStyles.js`** (actualizado)
   - Estilos para vista de recomendación
   - Diseño responsive
   - Animaciones y hover effects

---

## 🐕 Algoritmo para PERROS

### Fórmula Principal

```
Kcal/día = FACT_ESTERILIZADO × FACT_SNACKS × FACTOR_EDAD × (VAR_ACTIVIDAD × PESO^0.75)
```

### Factores de Cálculo

#### 1. **FACTOR_EDAD** (según tamaño y edad en meses)

**Razas Pequeñas/Medianas:**
- 0-4 meses: 2.0
- 4-6 meses: 1.6
- 6-10 meses: 1.2
- 10-12 meses: 1.0

**Razas Grandes:**
- 0-4 meses: 2.0
- 4-8 meses: 1.6
- 8-12 meses: 1.4
- 12-18 meses: 1.2
- 18-24 meses: 1.0

**Adultos:**
- Adulto normal: 1.0
- Senior: 0.8
- Raza gigante adulta: 1.5

#### 2. **VAR_ACTIVIDAD**

- Adulto - Baja: 95
- Adulto - Media: 130
- Adulto - Muy Alta (Deportiva): 180
- Cachorro: 130
- Senior: 130

#### 3. **FACT_ESTERILIZADO**

- Sí: 0.9
- No: 1.0

#### 4. **FACT_SNACKS**

- 1 o menos al día: 1.0
- 2-3 al día: 0.9
- Más de 3: 0.88

### Lógica de Selección de Productos

#### Producto Seco (Pienso)

**Cachorros:**
- ➡️ RETORN PUPPY SALMON (3451 kcal/kg)

**Senior o Sobrepeso:**
- ➡️ RETORN LIGHT AND SENIOR (3453 kcal/kg)

**Adulto según preferencia:**
- Pollo → RETORN ADULT POLLO (3674 kcal/kg)
- Cordero → RETORN ADULT CORDERO (3440 kcal/kg)
- Salmón → RETORN ADULT SALMON (3327 kcal/kg)
- Por defecto → RETORN ADULT SALMON

**Razas Pequeñas:**
- Automáticamente selecciona variantes "Small Bite" cuando disponibles

#### Producto Húmedo (Latas)

Según el producto seco seleccionado:
- Puppy → PUPPY CORDERO Y POLLO (1265 kcal/kg)
- Cordero → CORDERO CON ARROZ (896 kcal/kg)
- Pollo → POLLO CON ZANAHORIAS (854 kcal/kg)
- Salmón/Light → PESCADO CON ZANAHORIA (1090 kcal/kg)

### Cálculo de Cantidades

#### Alimentación Seca (100%)

```
Gramos/día = (Kcal/día ÷ kcal_producto/kg) × 1000
```

#### Alimentación Mixta (75% Seco + 25% Húmedo)

```
Kcal_seco = Kcal/día × 0.75
Kcal_húmedo = Kcal/día × 0.25

Gramos_seco/día = (Kcal_seco ÷ kcal_seco/kg) × 1000
Gramos_húmedo/día = (Kcal_húmedo ÷ kcal_húmedo/kg) × 1000
```

### Ejemplo de Cálculo (Perro)

**Datos de entrada:**
- Raza: Mediano (Border Collie)
- Peso: 12 kg
- Edad: Adulto
- Actividad: Media
- Esterilizado: Sí
- Snacks: 2-3 al día
- Preferencia: Salmón

**Cálculo:**
```
FACT_EDAD = 1.0 (Adulto)
VAR_ACTIVIDAD = 130 (Media)
FACT_ESTERILIZADO = 0.9 (Sí)
FACT_SNACKS = 0.9 (2-3/día)

Kcal/día = 0.9 × 0.9 × 1.0 × (130 × 12^0.75)
         = 0.81 × (130 × 6.447)
         = 0.81 × 838.11
         = 678.87 kcal/día
```

**Producto:** RETORN ADULT SALMON (3327 kcal/kg)

**Alimentación Seca:**
```
Gramos/día = (678.87 ÷ 3327) × 1000 = 204g/día
```

**Alimentación Mixta:**
```
Seco (75%): (509.15 ÷ 3327) × 1000 = 153g/día
Húmedo (25%): (169.72 ÷ 1090) × 1000 = 156g/día
```

---

## 🐱 Algoritmo para GATOS

### Fórmula Principal

```
Kcal/día = FACT × (PESO^FACT2)
```

### Factores de Cálculo

Según edad y condición:

| Caso | FACT | FACT2 |
|------|------|-------|
| Gatito 1.5-5 meses | 250 | 1.0 |
| Gatito 4-7 meses | 130 | 1.0 |
| Gatito 7-9 meses | 100 | 1.0 |
| Gatito 9-12 meses | 80 | 1.0 |
| Gatito >12 meses | 60 | 1.0 |
| **Adulto normal** | **100** | **0.67** |
| **Adulto esterilizado/sobrepeso** | **130** | **0.4** |
| **Senior** | **45** | **1.0** |

### Lógica de Selección de Productos

#### Producto Seco (Pienso)

**Gatitos:**
- ➡️ RETORN CAT KITTEN (4173 kcal/kg)

**Esterilizado o Sobrepeso:**
- ➡️ RETORN CAT LIGHT STERILIZED (3940 kcal/kg)

**Adulto normal:**
- ➡️ RETORN CAT ADULT CHICKEN (4070 kcal/kg)
- O RETORN CAT ADULT FISH (3686 kcal/kg)

#### Producto Húmedo (Latas)

Según el producto seco:
- Kitten → KITTEN POLLO (871 kcal/kg)
- Pollo/Esterilizado → POLLO CON CONEJO (943 kcal/kg)
- Pescado → ATÚN CON GAMBAS (653 kcal/kg)

### Ejemplo de Cálculo (Gato)

**Datos de entrada:**
- Peso: 4.5 kg
- Edad: Adulto
- Esterilizado: Sí

**Cálculo:**
```
FACT = 130 (Adulto esterilizado)
FACT2 = 0.4

Kcal/día = 130 × (4.5^0.4)
         = 130 × 1.824
         = 237.12 kcal/día
```

**Producto:** RETORN CAT LIGHT STERILIZED (3940 kcal/kg)

**Alimentación Seca:**
```
Gramos/día = (237.12 ÷ 3940) × 1000 = 60g/día
```

**Alimentación Mixta:**
```
Seco (75%): (177.84 ÷ 3940) × 1000 = 45g/día
Húmedo (25%): (59.28 ÷ 943) × 1000 = 63g/día
```

---

## 🎯 Selección Inteligente de Tamaños

El sistema recomienda automáticamente el tamaño de bolsa más adecuado:

### Criterio de Selección

1. **Calcular consumo mensual**: `Gramos_diarios × 30`
2. **Rango ideal**: Entre 2-4 semanas de duración
3. **Buscar variante óptima** que caiga en ese rango
4. **Razas pequeñas**: Priorizar variantes "Small Bite"

### Variantes Disponibles

**Perros:**
- 500g, 3kg, 6kg, 12kg, 20kg
- Small Bite: 500g, 3kg, 12kg

**Gatos:**
- 500g, 2kg

**Latas:**
- Perros: 185g, 400g
- Gatos: 80g

---

## 📋 Flujo de Uso

### 1. Usuario completa formulario
```
- Tipo de mascota (Perro/Gato)
- Nombre
- Fecha de nacimiento
- [Perro] Tamaño, edad, actividad, peso, snacks, esterilizado, preferencia, patologías, alimentación
- [Gato] Edad, meses (gatito), peso, esterilizado, patologías, alimentación
```

### 2. Sistema calcula
```javascript
import { calcularRecomendacionProductos } from './utils/productRecommendation';

const resultado = calcularRecomendacionProductos(answers);
```

### 3. Resultado incluye
```javascript
{
  tipoAnimal: "Perro" | "Gato",
  nombreMascota: string,
  kcalDiarias: number,
  tipoAlimentacion: "Seca" | "Mixta",
  factores: { ... }, // Factores usados en cálculo
  recomendacion: {
    tipo: "seca" | "mixta",
    productoSeco: {
      nombre: string,
      kcalEmKg: number,
      varianteRecomendada: { ean, cantidad, sku },
      gramosDiarios: number,
      link: string
    },
    productoHumedo?: { ... } // Solo si alimentación mixta
  }
}
```

### 4. Vista de resultados
```
✅ Productos recomendados
✅ Cantidades diarias exactas
✅ Tamaño de bolsa óptimo
✅ SKU y EAN para pedido
✅ Links directos a tienda
```

---

## 🔧 Funciones Principales

### `calcularCaloriasPerro(answers)`
Calcula kcal/día necesarias para perros

### `calcularCaloriasGato(answers)`
Calcula kcal/día necesarias para gatos

### `calcularRecomendacionProductos(answers)`
**Función principal** - Orquesta todo el proceso:
1. Identifica tipo de animal
2. Calcula calorías necesarias
3. Selecciona productos apropiados
4. Calcula cantidades (seca o mixta)
5. Elige tamaños de bolsa óptimos
6. Retorna recomendación completa

---

## 🎨 Integración en el Formulario

Para integrar en `app.survey.jsx`:

```javascript
import { calcularRecomendacionProductos } from "../utils/productRecommendation";
import RecommendationResult from "../components/survey/RecommendationResult";

// Después de completar el formulario:
const handleSubmit = (e) => {
  e.preventDefault();
  
  try {
    const recomendacion = calcularRecomendacionProductos(answers);
    setRecommendation(recomendacion);
    setShowResults(true);
  } catch (error) {
    console.error("Error:", error);
  }
};

// En el render:
{showResults && (
  <RecommendationResult recommendation={recommendation} />
)}
```

---

## ✅ Validaciones Implementadas

- ✅ Peso válido (números positivos dentro de rangos)
- ✅ Fecha de nacimiento (cálculo automático de edad en meses)
- ✅ Manejo de casos especiales (gatitos sin fecha)
- ✅ Selección automática de variantes según raza
- ✅ Fallback a valores por defecto si faltan datos
- ✅ Detección de patologías (sobrepeso) para productos especiales

---

## 📦 Catálogo de Productos

### Perros - Seco (11 SKUs base + variantes)
- Puppy Salmon
- Light & Senior
- Adult Pollo (normal + small bite)
- Adult Cordero (normal + small bite)  
- Adult Salmón (normal + small bite)

### Perros - Húmedo (7 referencias)
- Puppy Cordero y Pollo
- Cordero con Arroz
- Only Cordero
- Pollo con Zanahorias
- Only Pollo
- Pescado con Zanahoria
- Pescado con Patatas

### Gatos - Seco (4 referencias)
- Kitten
- Adult Fish
- Adult Chicken
- Light Sterilized

### Gatos - Húmedo (7 referencias)
- Kitten Pollo
- Pollo
- Pollo con Conejo
- Atún con Mejillones
- Atún con Sardina
- Atún con Salmón
- Atún con Gambas

**Total: 29 productos diferentes con múltiples variantes**

---

## 🚀 Próximos Pasos

1. Integrar en el formulario principal
2. Agregar persistencia de recomendaciones
3. Crear página de resumen con opción de compra
4. Implementar email con recomendación
5. Dashboard para revisitar recomendaciones
6. Sistema de alertas (reorden de producto)

---

## 📚 Referencias

- Algoritmo basado en fórmulas proporcionadas por RETORN
- Factores validados con estándares nutricionales
- Productos del catálogo oficial RETORN 2024
- Valores kcal/kg certificados por laboratorio
