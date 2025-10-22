# 🎨 Diagrama de Arquitectura - Encuesta

## 📐 Flujo de Componentes

```
┌─────────────────────────────────────────────────┐
│         app.survey.jsx (Ruta Principal)         │
│                                                  │
│  Estado:                                        │
│  • currentStep, answers, direction, started     │
│                                                  │
│  Lógica:                                        │
│  • handleAnswer(), goNext(), goPrevious()       │
│  • isCurrentQuestionAnswered()                  │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ ProgressBar  │  │ SurveyIntro  │
│              │  │              │
│ Props:       │  │ Props:       │
│ • progress   │  │ • onStart    │
└──────────────┘  └──────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│         QuestionCard                │
│                                     │
│  Props:                            │
│  • question, questionNumber,       │
│    totalQuestions, value,          │
│    onChange, direction, answers    │
│                                     │
│  Decide qué tipo renderizar:       │
└──────────┬──────────────────────────┘
           │
    ┌──────┴─────────────────────────┐
    │                                 │
    ▼           ▼           ▼         ▼
┌─────────┐ ┌────────┐ ┌─────────┐ ┌──────────────┐
│ Choice  │ │  Text  │ │ Number  │ │   Multiple   │
│ Question│ │Question│ │Question │ │Choice Question│
└─────────┘ └────────┘ └─────────┘ └──────────────┘
           │
           ▼
┌───────────────────────┐
│  NavigationButtons    │
│                       │
│  Props:              │
│  • onPrevious/Next   │
│  • canGoBack/Next    │
│  • isLastQuestion    │
└───────────────────────┘
```

## 🔄 Flujo de Datos

```
┌──────────────────────────────────────────────────────┐
│ 1. Usuario interactúa (click, escribir, Enter)      │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────┐
│ 2. Componente hijo llama onChange(value)            │
│    • ChoiceQuestion → onChange(option)              │
│    • TextQuestion → onChange(e.target.value)        │
│    • MultipleChoice → onChange([...selected])       │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────┐
│ 3. QuestionCard pasa value a handleAnswer()         │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────┐
│ 4. handleAnswer actualiza estado answers            │
│    setAnswers(prev => ({                            │
│      ...prev,                                       │
│      [`q${currentQuestion.id}`]: value              │
│    }))                                              │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────┐
│ 5. getVisibleQuestions(answers) recalcula preguntas │
│    • Filtra por condition(answers)                  │
│    • Actualiza visibleQuestions array              │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────┐
│ 6. Re-render con nuevas preguntas visibles          │
│    • Progreso actualizado                           │
│    • Pregunta actual puede cambiar                  │
│    • Validación recalculada                         │
└──────────────────────────────────────────────────────┘
```

## 🎯 Flujo de Navegación

```
                    ┌─────────────┐
                    │   INICIO    │
                    │ (not started)│
                    └──────┬──────┘
                           │
                    [Enter / Click]
                           │
                           ▼
              ┌────────────────────────┐
              │   PREGUNTA 1           │
              │   currentStep = 0      │
              └──────┬─────────────────┘
                     │
           ┌─────────┴──────────┐
           │                    │
    [Responder]          [Sin responder]
           │                    │
           ▼                    ▼
    canGoNext=true      canGoNext=false
           │               (botón disabled)
           │
      [Click Siguiente]
           │
           ▼
    ┌──────────────────┐
    │ goNext()         │
    │ • direction =    │
    │   "forward"      │
    │ • currentStep++  │
    └────────┬─────────┘
             │
             ▼
    ┌────────────────────────┐
    │   PREGUNTA 2           │
    │   currentStep = 1      │
    └──────┬─────────────────┘
           │
      [Click Anterior]
           │
           ▼
    ┌──────────────────┐
    │ goPrevious()     │
    │ • direction =    │
    │   "backward"     │
    │ • currentStep--  │
    └────────┬─────────┘
             │
             ▼
    Vuelta a pregunta anterior
             
             ⋮
             
    ┌────────────────────────┐
    │   ÚLTIMA PREGUNTA      │
    │   isLastQuestion=true  │
    └──────┬─────────────────┘
           │
      [Responder]
           │
           ▼
    ┌────────────────────────┐
    │ Botón "Enviar"         │
    │ visible                │
    └──────┬─────────────────┘
           │
      [Submit Form]
           │
           ▼
    ┌────────────────────────┐
    │ action() procesa datos │
    │ redirect("/app?        │
    │   survey=success")     │
    └────────────────────────┘
```

## 📦 Dependencias entre Archivos

```
app.survey.jsx
    ├── importa → surveyQuestions.js
    │   └── exporta: QUESTIONS, getVisibleQuestions()
    │
    ├── importa → surveyStyles.js
    │   └── exporta: getSurveyStyles(direction)
    │
    ├── importa → ProgressBar.jsx
    ├── importa → SurveyIntro.jsx
    ├── importa → QuestionCard.jsx
    │       ├── importa → ChoiceQuestion.jsx
    │       ├── importa → TextQuestion.jsx
    │       ├── importa → NumberQuestion.jsx
    │       └── importa → MultipleChoiceQuestion.jsx
    │
    └── importa → NavigationButtons.jsx
```

## 🧩 Responsabilidades

| Archivo | Responsabilidad | Tamaño |
|---------|----------------|--------|
| `app.survey.jsx` | Orquestador principal, estado global | ~180 líneas |
| `surveyQuestions.js` | Datos y lógica condicional | ~200 líneas |
| `surveyStyles.js` | Estilos CSS completos | ~400 líneas |
| `QuestionCard.jsx` | Decide qué componente renderizar | ~80 líneas |
| `ChoiceQuestion.jsx` | UI para opciones únicas | ~25 líneas |
| `MultipleChoiceQuestion.jsx` | UI para múltiples opciones | ~45 líneas |
| `TextQuestion.jsx` | Input de texto | ~30 líneas |
| `NumberQuestion.jsx` | Input numérico | ~30 líneas |
| `NavigationButtons.jsx` | Botones de navegación | ~35 líneas |
| `ProgressBar.jsx` | Barra de progreso | ~12 líneas |
| `SurveyIntro.jsx` | Pantalla intro | ~35 líneas |

## 🎨 Principios de Diseño Aplicados

### 1. **Separación de Responsabilidades**
- UI ≠ Lógica ≠ Datos ≠ Estilos
- Cada archivo tiene un propósito claro

### 2. **Composición sobre Herencia**
- Componentes pequeños que se combinan
- Props para comunicación

### 3. **DRY (Don't Repeat Yourself)**
- Lógica compartida en funciones
- Estilos centralizados

### 4. **Single Responsibility Principle**
- Un componente = Una tarea
- Fácil de entender y testear

### 5. **Open/Closed Principle**
- Abierto a extensión (nuevos tipos de pregunta)
- Cerrado a modificación (no tocar existentes)

## 🚀 Escalabilidad

### Agregar nuevo tipo de pregunta:
```javascript
// 1. Crear: DateQuestion.jsx
export default function DateQuestion({ question, value, onChange }) {
  return <input type="date" value={value} onChange={e => onChange(e.target.value)} />
}

// 2. Importar en QuestionCard.jsx
import DateQuestion from "./DateQuestion";

// 3. Agregar case
case "date": return <DateQuestion ... />;

// 4. Usar en surveyQuestions.js
{ id: "12", question: "¿Fecha?", type: "date", required: true }
```

### Agregar validación personalizada:
```javascript
// En surveyQuestions.js
{
  id: "peso",
  type: "number",
  validate: (value) => value > 0 && value < 100,
  errorMessage: "Peso debe estar entre 0 y 100kg"
}
```

### Agregar almacenamiento:
```javascript
// En app.survey.jsx action
import { saveSurveyResponse } from "../db.server";

export const action = async ({ request }) => {
  const answers = /* ... */;
  await saveSurveyResponse(answers);
  return redirect("/app/results");
};
```

---

**🎓 Esta arquitectura facilita el mantenimiento y crecimiento del proyecto!**
