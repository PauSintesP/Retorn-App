# Estructura del Proyecto - Encuesta de Mascotas

## 📁 Organización de Archivos

```
app/
├── components/
│   └── survey/
│       ├── ChoiceQuestion.jsx          # Pregunta de opción única
│       ├── MultipleChoiceQuestion.jsx  # Pregunta de múltiples opciones
│       ├── TextQuestion.jsx            # Pregunta de texto libre
│       ├── NumberQuestion.jsx          # Pregunta numérica
│       ├── QuestionCard.jsx            # Contenedor principal de pregunta
│       ├── NavigationButtons.jsx       # Botones anterior/siguiente
│       ├── ProgressBar.jsx             # Barra de progreso
│       └── SurveyIntro.jsx             # Pantalla de introducción
│
├── data/
│   └── surveyQuestions.js              # Definición de todas las preguntas
│
├── styles/
│   └── surveyStyles.js                 # Estilos CSS de la encuesta
│
└── routes/
    ├── app.survey.jsx                  # Ruta principal (refactorizada)
    └── app.survey.backup.jsx           # Backup del archivo original
```

## 🎯 Descripción de Componentes

### Componentes de UI (`/components/survey/`)

#### **QuestionCard.jsx**
Componente principal que:
- Renderiza el encabezado con número de pregunta
- Decide qué tipo de input mostrar según `question.type`
- Maneja preguntas dinámicas (funciones en lugar de strings)
- Muestra información adicional si existe

#### **ChoiceQuestion.jsx**
Para preguntas de opción única:
- Renderiza botones para cada opción
- Marca la opción seleccionada
- Callback `onChange` cuando se selecciona

#### **MultipleChoiceQuestion.jsx**
Para preguntas de múltiples opciones:
- Permite seleccionar/deseleccionar varias opciones
- Muestra checkmark visual (✓ o ○)
- Maneja arrays de valores seleccionados

#### **TextQuestion.jsx**
Para preguntas de texto libre:
- Input type="text"
- Placeholder personalizable
- Previene submit en Enter (manejado por padre)

#### **NumberQuestion.jsx**
Para preguntas numéricas:
- Input type="number" con step="0.1"
- Ideal para pesos (kg con decimales)

#### **NavigationButtons.jsx**
Botones de navegación:
- Botón "Anterior" (solo si no es primera pregunta)
- Botón "Siguiente" o "Finalizar" según posición
- Disabled automático si pregunta no respondida

#### **ProgressBar.jsx**
Barra de progreso fija en top:
- Calcula porcentaje basado en preguntas visibles
- Animación suave con gradiente

#### **SurveyIntro.jsx**
Pantalla de bienvenida:
- Título "Dieta personalizada para tus pelud@s"
- Duración estimada
- Botón para comenzar
- Escucha tecla Enter

### Datos (`/data/`)

#### **surveyQuestions.js**
Exporta:
- `QUESTIONS`: Array con todas las preguntas
- `getVisibleQuestions(answers)`: Función que filtra preguntas según respuestas

Cada pregunta tiene:
```javascript
{
  id: "3_perro",                    // ID único
  question: "...",                   // String o función (name) => string
  type: "choice",                    // choice, text, number, multiple
  options: ["...", "..."],          // Solo para choice/multiple
  required: true,                    // Si es obligatoria
  placeholder: "...",               // Solo para text/number
  info: "...",                      // Texto informativo adicional
  condition: (answers) => boolean   // Función de visibilidad condicional
}
```

### Estilos (`/styles/`)

#### **surveyStyles.js**
Exporta función `getSurveyStyles(direction)`:
- CSS-in-JS como template string
- Estilos responsive (mobile-first)
- Animaciones (fadeSlideIn, fadeSlideOut, pulse, shimmer)
- Variables CSS de color (--jdgm-*)
- Gradientes y sombras modernas

### Ruta Principal (`/routes/`)

#### **app.survey.jsx**
Componente principal que:
1. **Loader**: Autentica usuario admin
2. **Action**: Procesa respuestas del formulario
3. **Estado**:
   - `currentStep`: Índice de pregunta actual
   - `answers`: Objeto con respuestas (key: `q${id}`)
   - `direction`: "forward" o "backward" para animaciones
   - `started`: Boolean para mostrar intro o preguntas

4. **Lógica**:
   - `getVisibleQuestions()`: Filtra preguntas según respuestas
   - `handleAnswer()`: Guarda respuesta en estado
   - `goNext()` / `goPrevious()`: Navegación con animación
   - `isCurrentQuestionAnswered()`: Validación de pregunta respondida

5. **Efectos**:
   - Enter key para iniciar encuesta
   - Ajuste de `currentStep` si cambia número de preguntas visibles

## 🔄 Flujo de Datos

```
Usuario selecciona respuesta
    ↓
QuestionCard.onChange()
    ↓
handleAnswer() actualiza estado
    ↓
getVisibleQuestions() recalcula preguntas visibles
    ↓
Re-render con nuevas preguntas
```

## 🎨 Convenciones de Código

- **Componentes**: PascalCase (QuestionCard.jsx)
- **Funciones**: camelCase (handleAnswer, goNext)
- **Constantes**: UPPER_SNAKE_CASE (QUESTIONS)
- **CSS Classes**: kebab-case (question-card, nav-button)
- **Props destructuring**: Siempre en parámetros de función
- **Comentarios**: JSDoc style para funciones exportadas

## 🚀 Cómo Extender

### Agregar un nuevo tipo de pregunta:

1. Crear componente en `/components/survey/NuevoTipoQuestion.jsx`
2. Importarlo en `QuestionCard.jsx`
3. Agregar case en el switch de `renderQuestionInput()`
4. Agregar preguntas con `type: "nuevo-tipo"` en `surveyQuestions.js`

### Modificar estilos:

1. Editar `/styles/surveyStyles.js`
2. Los cambios se aplican automáticamente
3. Mantener variables CSS para consistencia

### Agregar preguntas:

1. Editar `/data/surveyQuestions.js`
2. Agregar objeto al array `QUESTIONS`
3. Usar `condition` para lógica condicional

## 📝 Notas

- **Backup**: El archivo original está en `app.survey.backup.jsx`
- **IDs de preguntas**: Usar formato `{numero}_{tipo}` para claridad (ej: `3_perro`, `7_gato`)
- **Respuestas múltiples**: Se guardan como array, se envían como string separado por comas
- **Validación**: Las preguntas `required: true` bloquean navegación hasta ser respondidas

## 🐛 Debugging

Para ver el estado actual:
```javascript
console.log('Answers:', answers);
console.log('Current step:', currentStep);
console.log('Visible questions:', visibleQuestions);
```

Para probar sin validación:
```javascript
// Temporalmente en isCurrentQuestionAnswered()
return true; // Desactivar validación
```
