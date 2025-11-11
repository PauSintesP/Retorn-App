# Solución de Scroll Único para Cuestionario

## 🎯 Problema Resuelto
Se eliminaron los **dobles scrolls** que aparecían cuando el contenido de una pregunta era más largo que la pantalla.

## ✅ Solución Implementada

### Arquitectura de Capas de Scroll

```
┌─────────────────────────────────────────┐
│ HTML/BODY (overflow: hidden, fixed)     │ ← Sin scroll global
│ ┌─────────────────────────────────────┐ │
│ │ .survey-container (100vh, fixed)    │ │ ← Contenedor principal fijo
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ .survey-content (overflow-y)    │ │ │ ← ÚNICO scroll si es necesario
│ │ │ ┌───────────────────────────┐   │ │ │
│ │ │ │ .question-card (scroll)   │   │ │ │ ← Scroll interno si necesario
│ │ │ │ - Contenido pregunta      │   │ │ │
│ │ │ │ - Opciones                │   │ │ │
│ │ │ │ - Botones navegación      │   │ │ │
│ │ │ └───────────────────────────┘   │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Cambios Clave en CSS

#### 1. HTML/Body - Sin Scroll Global
```css
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;           /* ← Elimina scroll global */
  width: 100%;
  height: 100%;
  position: fixed;            /* ← Previene scroll en navegación */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

#### 2. Survey Container - Contenedor Fijo
```css
.survey-container {
  width: 100%;
  height: 100vh;
  height: 100dvh;             /* ← Dynamic viewport para móviles */
  display: flex;
  flex-direction: column;
  position: fixed;            /* ← Fijo en la pantalla */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;           /* ← Sin scroll en el contenedor */
  box-sizing: border-box;
}
```

#### 3. Survey Content - Scroll Principal
```css
.survey-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  margin-top: 4px;
  overflow-x: hidden;
  overflow-y: auto;           /* ← ÚNICO scroll vertical */
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: calc(100% - 4px);   /* ← Resta la altura de la barra de progreso */
  box-sizing: border-box;
}
```

#### 4. Question Card - Scroll Interno si Necesario
```css
.question-card {
  /* ... otros estilos ... */
  max-height: 100%;           /* ← No excede el contenedor */
  overflow-x: hidden;
  overflow-y: auto;           /* ← Scroll interno si contenido es largo */
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
```

## 🔄 Flujo de Scroll

### Caso 1: Contenido Pequeño (sin scroll)
```
┌──────────────────────┐
│ survey-content       │
│  ┌────────────────┐  │
│  │ question-card  │  │
│  │                │  │
│  │ Pregunta       │  │
│  │ Opciones       │  │
│  │ Botones        │  │
│  │                │  │
│  └────────────────┘  │
│                      │
└──────────────────────┘
```
✅ No aparece scroll (contenido cabe en pantalla)

### Caso 2: Contenido Grande (con scroll)
```
┌──────────────────────┐
│ survey-content  ↕️   │ ← Scroll visible
│  ┌────────────────┐  │
│  │ question-card  │  │
│  │                │  │
│  │ Pregunta       │  │
│  │ Opción 1       │  │
│  │ Opción 2       │  │
│  │ Opción 3       │  │
│  │ Opción 4       │  │
│  │ Opción 5       │  │
│  │ Opción 6       │  │
│  │ Opción 7       │  │
│  │ Opción 8       │  │
│  │ Botones        │  │
│  └────────────────┘  │
└──────────────────────┘
```
✅ Aparece UN SOLO scroll en `.survey-content`

### Caso 3: Pregunta con Selector Desplegable (fecha/patologías)
```
┌──────────────────────┐
│ survey-content  ↕️   │ ← Scroll principal
│  ┌────────────────┐  │
│  │ question-card  │  │
│  │                │  │
│  │ Pregunta       │  │
│  │ Input fecha    │  │
│  │ ┌────────────┐ │  │
│  │ │ Día    ↕️  │ │  │ ← Scroll interno solo en selector
│  │ │ Mes    ↕️  │ │  │
│  │ │ Año    ↕️  │ │  │
│  │ └────────────┘ │  │
│  │ Botones        │  │
│  └────────────────┘  │
└──────────────────────┘
```
✅ Scroll principal + scroll interno en selector (contenido corto)

## 📱 Soporte Móvil

### Dynamic Viewport Height (dvh)
```css
height: 100vh;
height: 100dvh;  /* ← Considera barra de navegación móvil */
```

Esto soluciona el problema en iOS/Android donde la barra de navegación puede cambiar de tamaño.

### Smooth Scrolling Táctil
```css
-webkit-overflow-scrolling: touch;
```

Proporciona scroll suave nativo en dispositivos iOS.

## 🎨 Transiciones Entre Preguntas

Las animaciones funcionan sin afectar el scroll:

```css
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateX(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes fadeSlideOut {
  from {
    opacity: 0;
    transform: translateX(-40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
```

## 🧪 Ejemplo Completo Simplificado

Si quieres crear un cuestionario desde cero con esta arquitectura:

```jsx
import { useState } from 'react';

const questions = [
  { id: 1, text: "¿Cuál es tu nombre?", type: "text" },
  { id: 2, text: "¿Qué edad tienes?", type: "number" },
  { id: 3, text: "¿Cuál es tu color favorito?", type: "choice", options: ["Rojo", "Azul", "Verde"] }
];

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentStep];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .survey-container {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          background: #f5f5f5;
        }

        .survey-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
        }

        .question-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .question-text {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .option-button {
          padding: 1rem;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .option-button:hover {
          background: #e0e0e0;
          border-color: #999;
        }

        .option-button.selected {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .nav-buttons {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .nav-button {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button.primary {
          background: #4CAF50;
          color: white;
        }

        .nav-button.secondary {
          background: #f5f5f5;
          color: #333;
        }

        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="survey-container">
        <div className="survey-content">
          <div className="question-card">
            <h2 className="question-text">{currentQuestion.text}</h2>

            {currentQuestion.type === "text" && (
              <input
                type="text"
                className="input-field"
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                placeholder="Tu respuesta..."
              />
            )}

            {currentQuestion.type === "number" && (
              <input
                type="number"
                className="input-field"
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                placeholder="Tu respuesta..."
              />
            )}

            {currentQuestion.type === "choice" && (
              <div className="options-container">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`option-button ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                    onClick={() => setAnswers({ ...answers, [currentQuestion.id]: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="nav-buttons">
              {currentStep > 0 && (
                <button
                  className="nav-button secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Anterior
                </button>
              )}
              
              {currentStep < questions.length - 1 ? (
                <button
                  className="nav-button primary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!answers[currentQuestion.id]}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  className="nav-button primary"
                  onClick={() => alert('¡Cuestionario completado!')}
                  disabled={!answers[currentQuestion.id]}
                >
                  Finalizar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

## ✅ Checklist de Verificación

- [x] HTML/Body sin scroll global (`overflow: hidden`, `position: fixed`)
- [x] Survey Container fijo y sin scroll (`100vh/100dvh`, `position: fixed`)
- [x] Survey Content con scroll único (`overflow-y: auto`)
- [x] Question Card con scroll interno si necesario (`max-height: 100%`, `overflow-y: auto`)
- [x] Soporte para móviles (`100dvh`, `-webkit-overflow-scrolling: touch`)
- [x] Transiciones suaves entre preguntas
- [x] Wrappers (recommendation, pathology) con scroll apropiado
- [x] Selectores internos (fecha) con scroll contenido

## 🎯 Resultado Final

✅ **UN SOLO SCROLL** visible cuando el contenido lo requiere  
✅ **Sin scroll global** en el body  
✅ **Transiciones suaves** entre preguntas  
✅ **Funciona en móviles** con viewport dinámico  
✅ **Todo el contenido visible** sin cortes  
✅ **Experiencia fluida** en táctil y escritorio
