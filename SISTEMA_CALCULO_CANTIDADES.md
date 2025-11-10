# Sistema de Cálculo de Cantidades de Alimento

## 📊 Resumen Ejecutivo

El sistema calcula automáticamente la cantidad exacta de alimento (en gramos) que debe comer la mascota diariamente, basándose en:

1. **Calorías necesarias** del perro/gato (calculadas según peso, edad, actividad, etc.)
2. **Densidad energética** del producto (kcal/kg)
3. **Tipo de alimentación** (seca o mixta)

---

## 🔢 Fórmula Principal

### Para Alimentación Seca (100%)

```
gramos_diarios = (calorías_necesarias / kcal_por_kg_producto) × 1000
```

**Ejemplo:**
- Perro necesita: 800 kcal/día
- Producto tiene: 3500 kcal/kg
- Cálculo: (800 / 3500) × 1000 = **228.57g ≈ 229g/día**

---

### Para Alimentación Mixta (75% seco + 25% húmedo)

#### Distribución de calorías:
```
calorías_seco = calorías_totales × 0.75
calorías_húmedo = calorías_totales × 0.25
```

#### Cálculo de gramos:
```
gramos_seco = (calorías_seco / kcal_kg_seco) × 1000
gramos_húmedo = (calorías_húmedo / kcal_kg_húmedo) × 1000
```

**Ejemplo:**
- Perro necesita: 800 kcal/día
- Producto seco: 3500 kcal/kg
- Producto húmedo: 1000 kcal/kg

**Cálculo:**
1. Seco (75%): 800 × 0.75 = 600 kcal
   - Gramos: (600 / 3500) × 1000 = **171g/día**
2. Húmedo (25%): 800 × 0.25 = 200 kcal
   - Gramos: (200 / 1000) × 1000 = **200g/día**

---

## 🐕 Cálculo de Calorías Necesarias (Perros)

### Fórmula completa:
```
kcal_día = FACTOR_ESTERILIZADO × FACTOR_SNACKS × FACTOR_EDAD × (VAR × PESO^0.75)
```

### Factores:

#### 1. FACTOR_ESTERILIZADO
- **Esterilizado o con sobrepeso**: 0.8
- **No esterilizado**: 1.0

#### 2. FACTOR_SNACKS
- **1 o menos snacks**: 1.0
- **2-3 snacks**: 0.9
- **Más de 3 snacks**: 0.88

#### 3. FACTOR_EDAD
Depende del tamaño y edad:

**Razas Pequeñas/Medianas (Cachorros):**
- 0-4 meses: 2.0
- 4-6 meses: 1.6
- 6-10 meses: 1.2
- 10-12 meses: 1.0

**Razas Grandes (Cachorros):**
- 0-4 meses: 2.0
- 4-8 meses: 1.6
- 8-12 meses: 1.4
- 12-18 meses: 1.2
- 18-24 meses: 1.0

**Adultos/Seniors:**
- Adulto: 1.0
- Senior: 0.8

#### 4. VAR (Variable de Actividad)
- **Baja**: 95
- **Media**: 130
- **Muy Alta (Deportiva)**: 180
- **Cachorro**: 130 (independiente de la actividad)
- **Senior**: 130 (independiente de la actividad)

### Ejemplo completo (Perro):

**Datos del perro:**
- Peso: 15 kg
- Edad: Adulto
- Tamaño: Mediano
- Actividad: Media
- Esterilizado: Sí
- Snacks: 2-3 al día

**Cálculo paso a paso:**

1. **FACTOR_ESTERILIZADO** = 0.8 (está esterilizado)
2. **FACTOR_SNACKS** = 0.9 (consume 2-3 snacks)
3. **FACTOR_EDAD** = 1.0 (adulto)
4. **VAR** = 130 (actividad media)
5. **Tasa metabólica**: 130 × (15^0.75) = 130 × 7.62 = **990.6**
6. **Kcal totales**: 0.8 × 0.9 × 1.0 × 990.6 = **713.2 kcal/día**

**Cantidades de alimento:**

Si usa **pienso seco** (3500 kcal/kg):
- (713.2 / 3500) × 1000 = **203.8g/día ≈ 204g/día**

Si usa **alimentación mixta**:
- Seco (75%): (534.9 / 3500) × 1000 = **152.8g/día**
- Húmedo (25%): (178.3 / 1000) × 1000 = **178.3g/día**

---

## 🐱 Cálculo de Calorías Necesarias (Gatos)

### Fórmula:
```
kcal_día = FACT × (PESO^FACT2)
```

Los factores varían según edad y condición:

### Factores FACT y FACT2:

#### Gatitos (por edad en meses):
- 1-4 meses: FACT=250, FACT2=1
- 4-7 meses: FACT=130, FACT2=1
- 7-9 meses: FACT=100, FACT2=1
- 9-12 meses: FACT=80, FACT2=1
- 12-14 meses: FACT=60, FACT2=1

#### Adultos:
- **Normal**: FACT=100, FACT2=0.67
- **Esterilizado**: FACT=130, FACT2=0.4
- **Senior**: FACT=45, FACT2=1

### Ejemplo (Gato):

**Datos del gato:**
- Peso: 4 kg
- Edad: Adulto
- Esterilizado: Sí

**Cálculo:**
- FACT = 130
- FACT2 = 0.4
- Kcal = 130 × (4^0.4) = 130 × 1.74 = **226.2 kcal/día**

**Cantidades de alimento:**

Si usa **pienso seco** (3800 kcal/kg):
- (226.2 / 3800) × 1000 = **59.5g/día ≈ 60g/día**

Si usa **alimentación mixta**:
- Seco (75%): (169.65 / 3800) × 1000 = **44.6g/día**
- Húmedo (25%): (56.55 / 1000) × 1000 = **56.6g/día**

---

## 📦 Porcentajes Configurables

Los porcentajes para alimentación mixta están definidos en `app/data/productConstants.js`:

```javascript
export const PORCENTAJE_ALIMENTACION_MIXTA = {
  SECO: 0.75,    // 75% de las calorías del alimento seco
  HUMEDO: 0.25,  // 25% de las calorías del alimento húmedo
};
```

Puedes modificar estos valores si necesitas cambiar la distribución (por ejemplo, 80% seco / 20% húmedo).

---

## 🎯 Diferencias Clave: Seco vs Húmedo

### Alimento Seco
- **Mayor densidad energética**: ~3000-3700 kcal/kg
- **Menor cantidad en gramos**: Más calorías por gramo
- **Más económico por ración**

### Alimento Húmedo
- **Menor densidad energética**: ~800-1200 kcal/kg
- **Mayor cantidad en gramos**: Menos calorías por gramo
- **Mayor humedad**: ~75-80% agua vs ~10% en seco
- **Mayor palatabilidad**

### Ejemplo comparativo (800 kcal/día):

| Tipo | kcal/kg | Gramos/día |
|------|---------|------------|
| Seco (100%) | 3500 | 229g |
| Húmedo (100%) | 1000 | 800g |
| Mixta - Seco (75%) | 3500 | 171g |
| Mixta - Húmedo (25%) | 1000 | 200g |

---

## 🔧 Implementación Técnica

### Archivos principales:

1. **`app/data/productConstants.js`**
   - Factores de cálculo (FACTOR_EDAD, VAR_ACTIVIDAD, etc.)
   - Porcentajes de alimentación mixta

2. **`app/data/productCalories.js`**
   - Base de datos de calorías por producto (kcal EM/kg)
   - Mapeados por SKU

3. **`app/utils/productRecommendation.js`**
   - `calcularCaloriasPerro()`: Calcula kcal necesarias para perros
   - `calcularCaloriasGato()`: Calcula kcal necesarias para gatos
   - `calcularGramosProducto()`: Convierte kcal → gramos
   - `calcularAlimentacionMixta()`: Distribuye entre seco/húmedo

4. **`app/components/survey/RecommendationResult.jsx`**
   - Muestra las cantidades calculadas
   - Explica el cálculo al usuario

---

## 📝 Logs de Depuración

El sistema genera logs detallados en consola:

```
🎯 Calculando recomendación de productos...
   Animal: Perro | Alimentación: Mixta

📊 Cálculo Alimentación Mixta:
   Calorías totales/día: 713.2 kcal
   Distribución: 75% seco + 25% húmedo
   → Seco: 534.9 kcal/día
   → Húmedo: 178.3 kcal/día
   Producto Seco: 3500 kcal/kg → 153g/día
   Producto Húmedo: 1000 kcal/kg → 178g/día

📦 Alimentación MIXTA para Max:
   Total calorías: 713.2 kcal/día
   Seco (75%): 153g/día
   Húmedo (25%): 178g/día
```

---

## ✅ Validaciones

El sistema incluye validaciones para:

1. **Calorías del producto** (kcalEmKg > 0)
2. **Calorías necesarias** (kcalDiarias > 0)
3. **Peso del animal** (peso > 0)
4. **División por cero**

Si algún valor no es válido, retorna 0 y muestra un warning en consola.

---

## 🎨 Interfaz de Usuario

El componente `RecommendationResult` muestra:

1. **Calorías necesarias totales** del animal
2. **Cantidad diaria en gramos** por producto
3. **Energía por porción** (kcal)
4. **Densidad energética** del producto (kcal/kg)
5. **Explicación del cálculo** en el footer

Para alimentación mixta, muestra claramente:
- Total de calorías
- Porcentaje y gramos de alimento seco
- Porcentaje y gramos de alimento húmedo

---

## 🚀 Próximas Mejoras

Posibles mejoras futuras:

1. **Porcentajes personalizables**: Permitir al usuario elegir la distribución (ej: 80/20, 70/30)
2. **Ajuste por condición corporal**: Factor de corrección si el animal está delgado/gordo
3. **Histórico de consumo**: Seguimiento de si las cantidades funcionan
4. **Alertas de cantidad**: Avisar si la cantidad calculada es muy baja/alta
5. **Recetas caseras**: Incluir opciones de comida casera con valores nutricionales

---

**Última actualización**: Noviembre 2025
**Autor**: Sistema de Recomendación Retorn
