import { useState, useEffect } from "react";
import { getVisibleQuestions } from "../data/surveyQuestions";
import { getSurveyStyles } from "../styles/surveyStyles";
import ProgressBar from "../components/survey/ProgressBar";
import SurveyIntro from "../components/survey/SurveyIntro";
import QuestionCard from "../components/survey/QuestionCard";
import NavigationButtons from "../components/survey/NavigationButtons";
import RecommendationResult from "../components/survey/RecommendationResult";
import PathologyContactForm from "../components/survey/PathologyContactForm";
import { calcularRecomendacionProductos } from "../utils/productRecommendation";

/**
 * Loader: Esta ruta es PÚBLICA, no requiere autenticación
 */
export const loader = async () => {
  return { public: true };
};

/**
 * Action: Procesa las respuestas del cuestionario (público)
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const answers = {};
  
  for (let i = 1; i <= 10; i++) {
    answers[`q${i}`] = form.get(`q${i}`) || "";
  }

  // TODO: Guardar en base de datos o enviar a webhook
  console.log("Public survey answers:", answers);

  return { success: true, answers };
};

/**
 * Componente principal del cuestionario PÚBLICO
 */
export default function PublicSurveyPage() {
  // Estado
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [started, setStarted] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPathologyContact, setShowPathologyContact] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  // Obtener preguntas visibles basadas en las respuestas actuales
  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentStep];
  const totalQuestions = visibleQuestions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  /**
   * Verifica si el usuario tiene alguna patología
   */
  const tienePatologias = () => {
    const patologiasGato = answers["q7_gato"];
    if (Array.isArray(patologiasGato) && 
        patologiasGato.length > 0 && 
        !patologiasGato.includes("Ninguna")) {
      return true;
    }

    const patologiasPerro = answers["q9_perro"];
    if (Array.isArray(patologiasPerro) && 
        patologiasPerro.length > 0 && 
        !patologiasPerro.includes("Ninguna")) {
      return true;
    }

    return false;
  };

  /**
   * Efecto: Iniciar encuesta con tecla Enter
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!started && (e.key === "Enter" || e.key === "\r")) {
        setStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started]);

  /**
   * Efecto: Ajustar currentStep si cambia el número de preguntas visibles
   */
  useEffect(() => {
    if (currentStep >= visibleQuestions.length && visibleQuestions.length > 0) {
      setCurrentStep(visibleQuestions.length - 1);
    }
  }, [visibleQuestions.length, currentStep]);

  /**
   * Efecto: Enviar altura al iframe padre para auto-resize
   */
  useEffect(() => {
    const sendHeight = () => {
      try {
        const h = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: "retorn-survey-height", height: h }, "*");
      } catch (e) {
        // Silenciar errores de postMessage
      }
    };

    // Enviar altura inicial
    sendHeight();

    // Observar cambios de tamaño del contenido
    const ro = new ResizeObserver(sendHeight);
    ro.observe(document.documentElement);
    ro.observe(document.body);

    // Enviar periódicamente por si hay animaciones o cambios dinámicos
    const interval = setInterval(sendHeight, 600);

    // Cleanup
    return () => {
      ro.disconnect();
      clearInterval(interval);
    };
  }, []);

  /**
   * Maneja el cambio de respuesta para la pregunta actual
   */
  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${currentQuestion.id}`]: value,
    }));
  };

  /**
   * Navega a la siguiente pregunta
   */
  const goNext = () => {
    setDirection("forward");
    setTimeout(() => {
      // Verificar si es pregunta de patologías con respuestas
      const esPatologias = currentQuestion.id === "7_gato" || currentQuestion.id === "9_perro";
      const respuestaPatologias = answers[`q${currentQuestion.id}`];
      const tienePatologiasActual = Array.isArray(respuestaPatologias) && 
                              respuestaPatologias.length > 0 &&
                              !respuestaPatologias.includes("Ninguna");
      
      if (esPatologias && tienePatologiasActual) {
        // Saltar al final del formulario (última pregunta)
        setCurrentStep(totalQuestions - 1);
      } else {
        // Navegación normal
        setCurrentStep((prev) => Math.min(prev + 1, totalQuestions - 1));
      }
    }, 50);
  };

  /**
   * Navega a la pregunta anterior
   */
  const goPrevious = () => {
    setDirection("backward");
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, 50);
  };

  /**
   * Verifica si la pregunta actual está respondida y cumple las validaciones
   */
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    const answer = answers[`q${currentQuestion.id}`];
    
    // Pregunta no requerida sin respuesta
    if (!currentQuestion.required && (answer === undefined || answer === "")) {
      return true;
    }
    
    // Pregunta tipo multiple
    if (currentQuestion.type === "multiple") {
      return !currentQuestion.required || (Array.isArray(answer) && answer.length > 0);
    }
    
    // Respuesta vacía en pregunta requerida
    if (answer === undefined || answer === "") {
      return false;
    }
    
    // Validaciones para tipo texto
    if (currentQuestion.type === "text") {
      const textValue = String(answer);
      if (currentQuestion.minLength && textValue.length < currentQuestion.minLength) {
        return false;
      }
      if (currentQuestion.maxLength && textValue.length > currentQuestion.maxLength) {
        return false;
      }
    }
    
    // Validaciones para tipo número
    if (currentQuestion.type === "number") {
      const numValue = parseFloat(answer);
      if (isNaN(numValue)) {
        return false;
      }
      if (numValue < 0) {
        return false;
      }
      if (currentQuestion.min !== undefined && numValue < currentQuestion.min) {
        return false;
      }
      if (currentQuestion.max !== undefined && numValue > currentQuestion.max) {
        return false;
      }
    }
    
    return true;
  };

  const canGoNext = isCurrentQuestionAnswered();
  const canGoBack = currentStep > 0;
  const isLastQuestion = currentStep === totalQuestions - 1;

  /**
   * Calcula y muestra la recomendación de productos
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Verificar si tiene patologías
      if (tienePatologias()) {
        // Mostrar formulario de contacto en lugar de recomendación
        setShowPathologyContact(true);
        return;
      }

      // Si no tiene patologías, calcular recomendación normal
      const result = calcularRecomendacionProductos(answers);
      setRecommendation(result);
      setShowRecommendation(true);
      
      console.log("Recomendación calculada:", result);
    } catch (error) {
      console.error("Error calculando recomendación:", error);
      alert("Hubo un error al calcular la recomendación. Por favor, revisa tus respuestas.");
    }
  };

  /**
   * Volver del formulario de contacto al cuestionario
   */
  const handleBackFromContact = () => {
    setShowPathologyContact(false);
  };

  /**
   * Reinicia el formulario para hacer otra encuesta
   */
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowRecommendation(false);
    setShowPathologyContact(false);
    setRecommendation(null);
    setStarted(false);
  };

  // Renderizado principal
  return (
    <>
      <style>{getSurveyStyles(direction)}</style>

      <div className="survey-container">
        <ProgressBar progress={progress} />

        <div className="survey-content">
          {!started ? (
            <SurveyIntro onStart={() => setStarted(true)} />
          ) : showPathologyContact ? (
            <div className="pathology-wrapper">
              <PathologyContactForm 
                answers={answers} 
                onBack={handleBackFromContact}
              />
            </div>
          ) : showRecommendation ? (
            <div className="recommendation-wrapper">
              <RecommendationResult
                recommendation={recommendation}
                answers={answers}
                onRestart={handleRestart}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Campos ocultos para mantener las respuestas */}
              {Object.entries(answers).map(([key, value]) => (
                <input
                  key={key}
                  type="hidden"
                  name={key}
                  value={Array.isArray(value) ? value.join(",") : value}
                />
              ))}

              <QuestionCard
                question={currentQuestion}
                questionNumber={currentStep + 1}
                totalQuestions={totalQuestions}
                value={answers[`q${currentQuestion.id}`]}
                onChange={handleAnswer}
                direction={direction}
                answers={answers}
              >
                {/* Botones de navegación - Solo si NO es la última pregunta */}
                {!isLastQuestion && (
                  <div className="controls-inner">
                    <NavigationButtons
                      onPrevious={goPrevious}
                      onNext={goNext}
                      canGoBack={canGoBack}
                      canGoNext={canGoNext}
                      isLastQuestion={false}
                    />
                  </div>
                )}

                {/* Botones finales - Solo en la última pregunta */}
                {isLastQuestion && (
                  <div className="controls-inner">
                    <div className="navigation-buttons">
                      {canGoBack && (
                        <button
                          type="button"
                          onClick={goPrevious}
                          className="nav-button secondary"
                        >
                          ← Anterior
                        </button>
                      )}
                      <button
                        type="submit"
                        className="submit-button"
                        disabled={!canGoNext}
                        style={canGoBack ? {} : { width: '100%' }}
                      >
                        Enviar respuestas ✓
                      </button>
                    </div>
                  </div>
                )}
              </QuestionCard>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
