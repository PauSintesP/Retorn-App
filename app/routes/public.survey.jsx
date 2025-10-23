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
   * Maneja el cambio de respuesta
   */
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  /**
   * Avanza a la siguiente pregunta
   */
  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setDirection("forward");
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 50);
    } else {
      // Última pregunta - mostrar recomendación o formulario de contacto
      if (tienePatologias()) {
        setShowPathologyContact(true);
      } else {
        const recomendacion = calcularRecomendacionProductos(answers);
        setRecommendation(recomendacion);
        setShowRecommendation(true);
      }
    }
  };

  /**
   * Retrocede a la pregunta anterior
   */
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
      }, 50);
    }
  };

  /**
   * Verifica si la respuesta actual es válida
   */
  const isAnswerValid = () => {
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple-choice") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== "";
  };

  /**
   * Maneja el envío del formulario de contacto
   */
  const handleContactSubmit = async (contactData) => {
    console.log("Formulario de contacto enviado:", contactData);
    
    // Calcular recomendación después del formulario
    const recomendacion = calcularRecomendacionProductos(answers);
    setRecommendation(recomendacion);
    setShowPathologyContact(false);
    setShowRecommendation(true);
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
                onBack={() => setShowPathologyContact(false)}
              />
            </div>
          ) : showRecommendation && recommendation ? (
            <div className="recommendation-wrapper">
              <RecommendationResult
                recommendation={recommendation}
                answers={answers}
                onRestart={() => {
                  setAnswers({});
                  setCurrentStep(0);
                  setStarted(false);
                  setShowRecommendation(false);
                  setShowPathologyContact(false);
                  setRecommendation(null);
                }}
              />
            </div>
          ) : (
            <>
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  direction={direction}
                />
              )}

              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                showBack={currentStep > 0}
                canProceed={isAnswerValid()}
                isLastQuestion={currentStep === totalQuestions - 1}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
