import { useState, useEffect } from "react";
import { Form, redirect } from "react-router";
import { authenticate } from "../shopify.server";
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
 * Loader: Autentica al usuario admin
 */
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return {};
};

/**
 * Action: Procesa y guarda las respuestas del formulario
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const answers = {};
  
  for (let i = 1; i <= 10; i++) {
    answers[`q${i}`] = form.get(`q${i}`) || "";
  }

  // TODO: Persistir respuestas en base de datos o API externa
  // eslint-disable-next-line no-console
  console.log("Survey answers:", answers);

  return redirect(`/app?survey=success`);
};

/**
 * Componente principal de la página de encuesta
 */
export default function SurveyPage() {
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
    // Verificar patologías de gato (pregunta 7_gato)
    const patologiasGato = answers["q7_gato"];
    if (Array.isArray(patologiasGato) && 
        patologiasGato.length > 0 && 
        !patologiasGato.includes("Ninguna")) {
      return true;
    }

    // Verificar patologías de perro (pregunta 9_perro)
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
   * Maneja el cambio de respuesta para la pregunta actual
   */
  const handleAnswer = (value) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [`q${currentQuestion.id}`]: value,
      };

      // Si es la pregunta q1 (tipo de animal), limpiar respuestas específicas del animal anterior
      if (currentQuestion.id === 1) {
        // Limpiar respuestas específicas de perro
        delete newAnswers.q3_perro;
        delete newAnswers.q4_perro;
        delete newAnswers.q5_perro;
        delete newAnswers.q6_perro;
        delete newAnswers.q7_perro;
        delete newAnswers.q8_perro;
        delete newAnswers.q9_perro;
        delete newAnswers.q9_perro_otros;
        delete newAnswers.q10_perro;
        delete newAnswers.q11_perro;
        
        // Limpiar respuestas específicas de gato
        delete newAnswers.q3_gato;
        delete newAnswers.q4_gato_gatito;
        delete newAnswers.q5_gato;
        delete newAnswers.q6_gato;
        delete newAnswers.q7_gato;
        delete newAnswers.q7_gato_otros;
        delete newAnswers.q8_gato;
      }

      return newAnswers;
    });
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
    
    try {
      // Verificar si tiene patologías
      if (tienePatologias()) {
        // Mostrar formulario de contacto en lugar de recomendación
        setShowPathologyContact(true);
        return;
      }

      // Si no tiene patologías, calcular recomendación normal
      console.log("📊 Calculando recomendación desde la API de Shopify...");
      const result = await calcularRecomendacionProductos(answers);
      console.log("✅ Recomendación calculada:", result);
      setRecommendation(result);
      setShowRecommendation(true);
      
      // TODO: Guardar en base de datos si es necesario
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

  return (
    <>
      <style>{getSurveyStyles(direction)}</style>

      <div className="survey-container">
        {/* Ocultar barra de progreso en intro y primera pregunta */}
        <ProgressBar 
          progress={progress} 
          show={started && currentStep > 0 && !showRecommendation && !showPathologyContact} 
        />

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
                onRestart={handleRestart}
              />
            </div>
          ) : (
            <Form method="post" onSubmit={handleSubmit}>
              {/* Hidden inputs para enviar todas las respuestas */}
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
      </Form>
          )}
        </div>
      </div>
    </>
  );
}
