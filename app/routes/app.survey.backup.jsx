import { useState, useEffect } from "react";
import { Form, redirect } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return {};
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const answers = {};
  for (let i = 1; i <= 10; i++) {
    answers[`q${i}`] = form.get(`q${i}`) || "";
  }

  // TODO: persist answers (DB, external API, etc.)
  // eslint-disable-next-line no-console
  console.log("Survey answers:", answers);

  return redirect(`/app?survey=success`);
};

// Definir todas las preguntas del flujo (las condicionales se filtrarán dinámicamente)
const QUESTIONS = [
  {
    id: 1,
    question: "¿Qué pelud@ tienes?",
    type: "choice",
    options: ["Perro", "Gato"],
    required: true,
  },
  {
    id: 2,
    question: "¿Cómo se llama tu pelud@?",
    type: "text",
    required: true,
    placeholder: "Escribe el nombre aquí",
  },
  // Q3 - Perro: tamaño
  {
    id: "3_perro",
    question: (name) => `¿De qué tamaño es o será ${name || "tu pelud@"} de mayor?`,
    type: "choice",
    options: ["Pequeño", "Mediano", "Grande"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q3 - Gato: edad
  {
    id: "3_gato",
    question: "¿Qué edad tiene?",
    type: "choice",
    options: ["Gatito", "Adulto", "Senior"],
    required: true,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q4 - Perro: edad
  {
    id: "4_perro",
    question: "¿Qué edad tiene?",
    type: "choice",
    options: ["Cachorro", "Adulto", "Senior"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q4 - Gato gatito: meses
  {
    id: "4_gato_gatito",
    question: "¡Gatito! ¿Cuántos meses tiene?",
    type: "choice",
    options: ["1-4 meses", "4-7 meses", "9-12 meses", "12-14 meses"],
    required: true,
    condition: (answers) => answers.q1 === "Gato" && answers["q3_gato"] === "Gatito",
  },
  // Q5 - Perro: actividad
  {
    id: "5_perro",
    question: "Nivel de actividad diaria",
    type: "choice",
    options: ["Baja", "Media", "Muy Alta (Deportiva)"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q5 - Gato: peso
  {
    id: "5_gato",
    question: "¿Cuál es su peso ideal? En Kg",
    type: "number",
    required: true,
    placeholder: "Ej: 4.5",
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q6 - Perro: peso
  {
    id: "6_perro",
    question: "¿Cuál es su peso ideal? En Kg",
    type: "number",
    required: true,
    placeholder: "Ej: 12",
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q6 - Gato: castrado
  {
    id: "6_gato",
    question: "¿Está castrad@?",
    type: "choice",
    options: ["Sí", "No"],
    required: true,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q7 - Perro: snacks
  {
    id: "7_perro",
    question: "¿Cuántos premios o snacks come al día?",
    type: "choice",
    options: ["1 o menos", "2-3", "Muchos (Más de 3)"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q7 - Gato: patologías
  {
    id: "7_gato",
    question: "¿Tiene alguna de estas patologías?\n(puedes seleccionar varias)",
    type: "multiple",
    options: [
      "Sobrepeso",
      "Alergias o intolerancias",
      "Digestiones sensibles",
      "Problemas en la piel",
      "Problemas articulares",
      "Problemas dentales",
      "Diabetes",
      "Otros",
    ],
    required: false,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q7 - Gato otros (si selecciona "Otros")
  {
    id: "7_gato_otros",
    question: "Especifica otras patologías",
    type: "text",
    required: false,
    placeholder: "Describe aquí...",
    condition: (answers) =>
      answers.q1 === "Gato" && answers["q7_gato"]?.includes("Otros"),
  },
  // Q8 - Perro: castrado
  {
    id: "8_perro",
    question: "¿Está castrad@?",
    type: "choice",
    options: ["Sí", "No"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q8 - Gato: alimentación
  {
    id: "8_gato",
    question: "¿Alimentación seca o mixta?",
    type: "choice",
    options: ["Seca", "Mixta"],
    required: true,
    info: "Las recetas mixtas están formuladas para obtener las kcal necesarias distribuidas en 75% seco 25% húmedo",
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q9 - Perro: patologías
  {
    id: "9_perro",
    question: "¿Tiene alguna de estas patologías?\n(puedes seleccionar varias)",
    type: "multiple",
    options: [
      "Sobrepeso",
      "Alergias o intolerancias",
      "Digestiones sensibles",
      "Problemas en la piel",
      "Problemas articulares",
      "Problemas dentales",
      "Diabetes",
      "Otros",
    ],
    required: false,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q9 - Perro otros (si selecciona "Otros")
  {
    id: "9_perro_otros",
    question: "Especifica otras patologías",
    type: "text",
    required: false,
    placeholder: "Describe aquí...",
    condition: (answers) =>
      answers.q1 === "Perro" && answers["q9_perro"]?.includes("Otros"),
  },
  // Q10 - Perro: alimentación
  {
    id: "10_perro",
    question: "¿Alimentación seca o mixta?",
    type: "choice",
    options: ["Seca", "Mixta"],
    required: true,
    info: "Las recetas mixtas están formuladas para obtener las kcal necesarias distribuidas en 75% seco 25% húmedo",
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q11 - Perro: preferencia receta
  {
    id: "11_perro",
    question: "¿Tienes preferencia por alguna receta?",
    type: "choice",
    options: [
      "Salmón + Pesc zanahoria",
      "Cordero + Cordero arroz",
      "Pollo + Pollo zanahoria",
      "Salmón light + Pesc zanahoria",
      "Salmón Cachorro + Lata cachorro",
      "¡Sorpréndeme!",
    ],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
];

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [started, setStarted] = useState(false);

  // Start survey on Enter key when intro is visible
  useEffect(() => {
    const onKey = (e) => {
      if (!started && (e.key === "Enter" || e.key === "\r")) {
        setStarted(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started]);

  // Filter visible questions based on answers
  const getVisibleQuestions = () => {
    return QUESTIONS.filter((q) => {
      if (!q.condition) return true;
      return q.condition(answers);
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentStep];
  const progress = started ? ((currentStep + 1) / visibleQuestions.length) * 100 : 0;
  const isLastQuestion = currentStep === visibleQuestions.length - 1;

  // Clamp currentStep if visible questions change
  useEffect(() => {
    if (started && currentStep >= visibleQuestions.length && visibleQuestions.length > 0) {
      setCurrentStep(visibleQuestions.length - 1);
    }
  }, [visibleQuestions.length, currentStep, started]);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${currentQuestion.id}`]: value,
    }));
  };

  const goNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setDirection("forward");
      setTimeout(() => setCurrentStep((prev) => prev + 1), 50);
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setTimeout(() => setCurrentStep((prev) => prev - 1), 50);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --jdgm-primary-color: #3E3E3E;
          --jdgm-secondary-color: rgba(62, 62, 62, 0.1);
          --jdgm-star-color: #ffcf00;
          --jdgm-write-review-text-color: white;
          --jdgm-write-review-bg-color: #3E3E3E;
          --jdgm-paginate-color: #739f99;
          --jdgm-border-radius: 0;
          --jdgm-reviewer-name-color: #3E3E3E;
        }

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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .survey-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2f1 50%, #f1f8e9 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--jdgm-primary-color);
          position: relative;
          overflow: hidden;
        }

        .survey-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(115, 159, 153, 0.05) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
          pointer-events: none;
        }

        .progress-bar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          z-index: 100;
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #5fb3a1 0%, #739f99 50%, #8fc4b8 100%);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(115, 159, 153, 0.5);
          position: relative;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
        }

        .survey-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }

        .question-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.08),
            0 10px 30px rgba(115, 159, 153, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          padding: 3.5rem 3rem;
          max-width: 650px;
          width: 100%;
          animation: ${direction === "forward" ? "fadeSlideIn" : "fadeSlideOut"} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(115, 159, 153, 0.1);
          position: relative;
        }

        .question-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #5fb3a1, #739f99, #8fc4b8);
          border-radius: 32px 32px 0 0;
        }

        .question-header {
          margin-bottom: 2.5rem;
        }

        .question-number {
          color: var(--jdgm-paginate-color);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(115, 159, 153, 0.08);
          border-radius: 20px;
        }

        .question-text {
          font-size: 2rem;
          font-weight: 700;
          color: var(--jdgm-primary-color);
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          margin-bottom: 2.5rem;
        }

        .option-button {
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          border: 2px solid rgba(115, 159, 153, 0.12);
          border-radius: 16px;
          padding: 1.4rem 1.75rem;
          font-size: 1.1rem;
          color: var(--jdgm-primary-color);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }

        .option-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(115, 159, 153, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .option-button:hover::before {
          left: 100%;
        }

        .option-button:hover {
          background: linear-gradient(135deg, #e8f5e9 0%, #d4ede8 100%);
          border-color: var(--jdgm-paginate-color);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 
            0 8px 24px rgba(115, 159, 153, 0.2),
            0 4px 8px rgba(115, 159, 153, 0.1);
        }

        .option-button.selected {
          background: linear-gradient(135deg, #d4ede8 0%, #c8e6df 100%);
          border-color: var(--jdgm-paginate-color);
          border-width: 2.5px;
          color: var(--jdgm-primary-color);
          box-shadow: 
            0 6px 20px rgba(115, 159, 153, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transform: scale(1.02);
        }

        .text-input {
          width: 100%;
          padding: 1.4rem 1.25rem;
          font-size: 1.125rem;
          border-radius: 16px;
          border: 2px solid rgba(115, 159, 153, 0.2);
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          background: rgba(255, 255, 255, 0.8);
        }

        .text-input:focus {
          border-color: var(--jdgm-paginate-color);
          box-shadow: 
            0 8px 24px rgba(115, 159, 153, 0.15),
            0 0 0 4px rgba(115, 159, 153, 0.08);
          transform: translateY(-2px);
          background: white;
        }

        .navigation-buttons {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .nav-button {
          flex: 1;
          padding: 1.15rem 2.5rem;
          border: none;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .nav-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }

        .nav-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .nav-button.secondary {
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          color: #666;
          border: 2px solid transparent;
        }

        .nav-button.secondary:hover:not(:disabled) {
          background: linear-gradient(135deg, #e8e8e8 0%, #dcdcdc 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-button.primary {
          background: linear-gradient(135deg, #5fb3a1 0%, #739f99 50%, #8fc4b8 100%);
          background-size: 200% 100%;
          color: white;
          box-shadow: 
            0 8px 24px rgba(115, 159, 153, 0.35),
            0 4px 8px rgba(115, 159, 153, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .nav-button.primary:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 
            0 12px 32px rgba(115, 159, 153, 0.4),
            0 6px 12px rgba(115, 159, 153, 0.25);
          background-position: 100% 0;
        }

        .nav-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-button {
          width: 100%;
          padding: 1.5rem 2rem;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #5fb3a1 0%, #739f99 50%, #8fc4b8 100%);
          background-size: 200% 100%;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          box-shadow: 
            0 12px 32px rgba(115, 159, 153, 0.4),
            0 6px 12px rgba(115, 159, 153, 0.25);
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-button:hover:not(:disabled)::before {
          width: 400px;
          height: 400px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 16px 40px rgba(115, 159, 153, 0.5),
            0 8px 16px rgba(115, 159, 153, 0.3);
          background-position: 100% 0;
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        @media (max-width: 768px) {
          .survey-content {
            padding: 2rem 1rem;
          }

          .question-card {
            padding: 2.5rem 2rem;
            border-radius: 24px;
          }

          .question-text {
            font-size: 1.6rem;
          }

          .option-button {
            padding: 1.2rem 1.25rem;
            font-size: 1rem;
          }

          .nav-button {
            padding: 1rem 1.5rem;
            font-size: 0.9rem;
          }

          .submit-button {
            padding: 1.25rem 1.5rem;
            font-size: 1.05rem;
          }
        }
      `}</style>

      <div className="survey-container">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="survey-content">
          {!started ? (
            <div className="question-card">
              <div className="question-header">
                <div className="question-number">Dura 4 minutos</div>
                <h2 className="question-text">Dieta personalizada para tus pelud@s</h2>
                <p style={{ marginTop: '12px', color: 'var(--jdgm-primary-color)', fontSize: '1rem' }}>
                  Te pediremos información para poder elaborar la dieta
                </p>
                <p style={{ marginTop: '8px', color: 'var(--jdgm-primary-color)', fontSize: '0.95rem' }}>
                  Pulsa Enter ↵ o usa el botón para empezar
                </p>
              </div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="nav-button primary"
                  onClick={() => setStarted(true)}
                >
                  Comenzar
                </button>
              </div>
            </div>
          ) : (
            <div className="question-card" key={currentStep}>
              <div className="question-header">
                <div className="question-number">
                  Pregunta {currentStep + 1} de {visibleQuestions.length}
                </div>
                <h2 className="question-text">
                  {typeof currentQuestion.question === "function"
                    ? currentQuestion.question(answers.q2)
                    : currentQuestion.question}
                </h2>
                {currentQuestion.info && (
                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                    {currentQuestion.info}
                  </p>
                )}
              </div>

              <div className="options-container">
                {/* Type: choice */}
                {currentQuestion.type === "choice" && currentQuestion.options && (
                  currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${
                        answers[`q${currentQuestion.id}`] === option ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))
                )}

                {/* Type: text */}
                {currentQuestion.type === "text" && (
                  <input
                    className="text-input"
                    type="text"
                    value={answers[`q${currentQuestion.id}`] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder || "Escribe la respuesta aquí"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!isLastQuestion && answers[`q${currentQuestion.id}`]) goNext();
                      }
                    }}
                  />
                )}

                {/* Type: number */}
                {currentQuestion.type === "number" && (
                  <input
                    className="text-input"
                    type="number"
                    step="0.1"
                    value={answers[`q${currentQuestion.id}`] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder || "Ej: 4.5"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!isLastQuestion && answers[`q${currentQuestion.id}`]) goNext();
                      }
                    }}
                  />
                )}

                {/* Type: multiple */}
                {currentQuestion.type === "multiple" && currentQuestion.options && (
                  currentQuestion.options.map((option) => {
                    const currentAnswers = answers[`q${currentQuestion.id}`] || [];
                    const isSelected = currentAnswers.includes(option);
                    
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`option-button ${isSelected ? "selected" : ""}`}
                        onClick={() => {
                          const updated = isSelected
                            ? currentAnswers.filter((a) => a !== option)
                            : [...currentAnswers, option];
                          handleAnswer(updated);
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>
                          {isSelected ? "✓" : "○"}
                        </span>
                        {option}
                      </button>
                    );
                  })
                )}
              </div>

              {!isLastQuestion ? (
                <div className="navigation-buttons">
                  <button
                    type="button"
                    className="nav-button secondary"
                    onClick={goPrevious}
                    disabled={currentStep === 0}
                  >
                    ← Anterior
                  </button>
                  <button
                    type="button"
                    className="nav-button primary"
                    onClick={goNext}
                    disabled={
                      currentQuestion.required && !answers[`q${currentQuestion.id}`]
                    }
                  >
                    Siguiente →
                  </button>
                </div>
              ) : (
                <Form method="post">
                  {Object.entries(answers).map(([key, value]) => (
                    <input
                      key={key}
                      type="hidden"
                      name={key}
                      value={Array.isArray(value) ? JSON.stringify(value) : value}
                    />
                  ))}
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={
                      currentQuestion.required && !answers[`q${currentQuestion.id}`]
                    }
                  >
                    🎉 Ver Recomendación
                  </button>
                </Form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
