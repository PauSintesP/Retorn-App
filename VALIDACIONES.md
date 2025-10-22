# Validaciones Implementadas en el Formulario de Encuesta

## Resumen de Validaciones por Tipo de Pregunta

### � Preguntas de Fecha (type: "date")

#### Pregunta 2b: Fecha de nacimiento
- **Fecha mínima**: Hace 30 años (para mascotas muy longevas)
- **Fecha máxima**: Hoy (no puede ser una fecha futura)
- **Formato**: Selector de fecha nativo del navegador
- **Validaciones**:
  - ❌ No permite fechas futuras
  - ❌ No permite fechas anteriores a 30 años
  - ✅ Interfaz calendario fácil de usar
- **Feedback visual**: "Selecciona la fecha de nacimiento aproximada"

### �📝 Preguntas de Texto (type: "text")

#### Pregunta 2: Nombre del pelud@
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 50 caracteres
- **Feedback visual**: Contador de caracteres en tiempo real

#### Preguntas de patologías "Otros"
- **Longitud máxima**: 200 caracteres
- **Feedback visual**: Contador de caracteres mostrando uso actual
- Aplica a:
  - Q7_gato_otros: Otras patologías (Gatos)
  - Q9_perro_otros: Otras patologías (Perros)

### 🔢 Preguntas Numéricas (type: "number")

#### Pregunta 5_gato: Peso ideal del gato
- **Valor mínimo**: 1 kg
- **Valor máximo**: 15 kg
- **Validaciones**:
  - ❌ No permite valores negativos
  - ❌ No permite valores menores a 1 kg
  - ❌ No permite valores mayores a 15 kg
  - ✅ Permite decimales (ej: 4.5 kg)
- **Feedback visual**: "Valor entre 1 y 15 kg"

#### Pregunta 6_perro: Peso ideal del perro
- **Valor mínimo**: 1 kg
- **Valor máximo**: 100 kg
- **Validaciones**:
  - ❌ No permite valores negativos
  - ❌ No permite valores menores a 1 kg
  - ❌ No permite valores mayores a 100 kg
  - ✅ Permite decimales (ej: 12.5 kg)
- **Feedback visual**: "Valor entre 1 y 100 kg"

## Comportamiento de Validación

### Validación en Tiempo Real
- Los inputs de número **previenen** la entrada de valores inválidos
- Los inputs de texto **limitan** la longitud máxima mientras se escribe
- Los botones "Siguiente" y "Enviar" se **deshabilitan** automáticamente si:
  - La pregunta es requerida y no tiene respuesta
  - La respuesta no cumple con las validaciones de longitud
  - La respuesta no cumple con las validaciones de rango numérico

### Feedback Visual
1. **Preguntas de texto**:
   - Muestra contador: `(15/50)` caracteres usados
   - Se actualiza en tiempo real mientras escribes

2. **Preguntas numéricas**:
   - Muestra rango permitido: `"Valor entre X y Y kg"`
   - Aparece debajo del input como texto informativo

3. **Botones**:
   - Botón "Siguiente" deshabilitado (opaco) si validación falla
   - Botón "Enviar" deshabilitado hasta cumplir todas las validaciones

## Casos de Uso Bloqueados

### ❌ Valores No Permitidos

#### Pesos
- Peso negativo: `-5` kg ❌
- Peso cero: `0` kg ❌
- Gato muy pesado: `20` kg ❌ (máx: 15 kg)
- Perro muy pesado: `150` kg ❌ (máx: 100 kg)

#### Nombres
- Nombre muy corto: `"A"` ❌ (mín: 2 caracteres)
- Nombre muy largo: `"NombreDe51CaracteresQueSuperaElLimiteEstablecidoPara"` ❌ (máx: 50)

#### Descripciones
- Descripción muy larga en "Otros": Más de 200 caracteres ❌

### ✅ Valores Permitidos

#### Pesos
- Gato pequeño: `2.5` kg ✅
- Gato promedio: `4.5` kg ✅
- Gato grande: `8.0` kg ✅
- Perro pequeño: `5` kg ✅
- Perro mediano: `15.5` kg ✅
- Perro grande: `40` kg ✅

#### Nombres
- `"Lu"` ✅ (2 caracteres, mínimo)
- `"Max"` ✅
- `"Luna"` ✅
- `"Toby el Aventurero"` ✅

## Archivos Modificados

### 1. `/app/data/surveyQuestions.js`
Agregadas propiedades de validación y nueva pregunta de fecha:
```javascript
{
  id: "2b",
  question: (name) => `¿Cuál es la fecha de nacimiento ${name ? `de ${name}` : "de tu pelud@"}?`,
  type: "date",
  required: true,
}
```

### 2. `/app/components/survey/DateQuestion.jsx` (NUEVO)
- Componente para input tipo fecha
- Validación de rango (30 años atrás hasta hoy)
- Selector de calendario nativo
- Feedback informativo

### 3. `/app/components/survey/NumberQuestion.jsx`
- Función `handleChange` con validaciones de rango
- Prevención de valores negativos y fuera de rango
- Feedback visual de rangos permitidos

### 4. `/app/components/survey/TextQuestion.jsx`
- Función `handleChange` con validación de longitud máxima
- Atributos HTML `minLength` y `maxLength`
- Contador de caracteres en tiempo real

### 5. `/app/components/survey/QuestionCard.jsx`
- Importación de DateQuestion
- Renderizado condicional para tipo "date"

### 6. `/app/styles/surveyStyles.js`
- Estilos específicos para `.date-input`
- Personalización del selector de calendario
- Hover effects en el icono del calendario

### 7. `/app/routes/app.survey.jsx`
- Función `isCurrentQuestionAnswered` mejorada
- Validaciones completas para text y number
- Deshabilitación inteligente de botones

## Beneficios

✅ **Prevención de errores**: No permite enviar datos inválidos  
✅ **UX mejorada**: Feedback inmediato al usuario  
✅ **Datos consistentes**: Garantiza calidad de datos en backend  
✅ **Accesibilidad**: Usa atributos HTML nativos para validación  
✅ **Performance**: Validación en cliente (sin roundtrip al servidor)
