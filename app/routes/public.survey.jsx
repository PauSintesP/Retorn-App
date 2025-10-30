import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();
  
  // Construir tema desde query params
  const theme = {
    primary: searchParams.get("primary") ? `#${searchParams.get("primary").replace('#', '')}` : undefined,
    paginate: searchParams.get("accent") ? `#${searchParams.get("accent").replace('#', '')}` : undefined,
    borderRadius: searchParams.get("radius") || undefined,
    bg: searchParams.get("bg") ? `#${searchParams.get("bg").replace('#', '')}` : undefined,
  };

  // Estado
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [started, setStarted] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPathologyContact, setShowPathologyContact] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Comunicación con iframe padre (para auto-resize)
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({
        type: 'retorn-survey-height',
        height: height
      }, '*');
    };

    // Enviar altura inicial y en cada cambio
    sendHeight();
    
    // Observer para detectar cambios en el DOM
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    
    // Cleanup
    return () => observer.disconnect();
  }, [currentStep, started, showRecommendation, showPathologyContact]);

  // Notificar cuando el cuestionario inicia
  useEffect(() => {
    if (started && currentStep === 0) {
      window.parent.postMessage({
        type: 'retorn-survey-started'
      }, '*');
    }
  }, [started, currentStep]);

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
   * Efecto: Navegar con tecla Enter durante la encuesta
   */
  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e) => {
      // Solo procesar Enter
      if (e.key === "Enter" || e.key === "\r") {
        // No procesar si está escribiendo en un input o textarea
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        
        // Si estamos en la pantalla final, no hacer nada
        if (showRecommendation || showPathologyContact) return;
        
        // Obtener el botón "Siguiente" y hacer click en él si está habilitado
        const nextButton = document.querySelector('.nav-button.primary:not(:disabled)');
        if (nextButton) {
          nextButton.click();
        }
      }
    };

    // Usar capture phase para capturar el evento antes
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [started, showRecommendation, showPathologyContact]);

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
      // Navegación normal a la siguiente pregunta
      setCurrentStep((prev) => Math.min(prev + 1, totalQuestions - 1));
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

  const canGoNext = isCurrentQuestionAnswered();
  const canGoBack = currentStep > 0;
  const isLastQuestion = currentStep === totalQuestions - 1;

  /**
   * Calcula y muestra la recomendación de productos
   */
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setIsLoading(true); // Activar loading
    
    try {
      // Verificar si tiene patologías
      if (tienePatologias()) {
        // Mostrar formulario de contacto en lugar de recomendación
        setShowPathologyContact(true);
        setIsLoading(false);
        return;
      }

      // Si no tiene patologías, calcular recomendación normal
      console.log("📊 Calculando recomendación desde la API de Shopify (public)...");
      const result = await calcularRecomendacionProductos(answers);
      console.log("✅ Recomendación calculada:", result);
      setRecommendation(result);
      setShowRecommendation(true);
    } catch (error) {
      console.error("Error calculando recomendación:", error);
      alert("Hubo un error al calcular la recomendación. Por favor, revisa tus respuestas.");
    } finally {
      setIsLoading(false); // Desactivar loading
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
      <style>{getSurveyStyles(direction, theme)}</style>

      <div className="survey-container">
        <ProgressBar progress={progress} />

        <div className="survey-content">
          {isLoading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              minHeight: '300px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid ' + (theme.primary || '#4A90E2'),
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{
                marginTop: '1.5rem',
                fontSize: '1.1rem',
                color: '#666'
              }}>
                Buscando el mejor producto para tu mascota...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : !started ? (
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
                {/* Botones de navegación */}
                <div className="controls-inner">
                  <NavigationButtons
                    onPrevious={goPrevious}
                    onNext={isLastQuestion ? handleSubmit : goNext}
                    canGoBack={canGoBack}
                    canGoNext={canGoNext}
                    isLastQuestion={isLastQuestion}
                    currentQuestion={currentQuestion}
                    currentAnswer={answers[`q${currentQuestion.id}`]}
                  />
                </div>
              </QuestionCard>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
