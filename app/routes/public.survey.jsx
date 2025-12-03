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

export const loader = async () => {
  return { public: true };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const answers = {};
  
  for (let i = 1; i <= 10; i++) {
    answers[`q${i}`] = form.get(`q${i}`) || "";
  }

  return { success: true, answers };
};

export default function PublicSurveyPage() {
  const [searchParams] = useSearchParams();
  
  const theme = {
    primary: searchParams.get("primary") ? `#${searchParams.get("primary").replace('#', '')}` : undefined,
    paginate: searchParams.get("accent") ? `#${searchParams.get("accent").replace('#', '')}` : undefined,
    borderRadius: searchParams.get("radius") || undefined,
    bg: searchParams.get("bg") ? `#${searchParams.get("bg").replace('#', '')}` : undefined,
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [started, setStarted] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPathologyContact, setShowPathologyContact] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (started && currentStep === 0) {
      window.parent.postMessage({
        type: 'retorn-survey-started'
      }, '*');
    }
  }, [started, currentStep]);

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentStep];
  const totalQuestions = visibleQuestions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

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

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    const answer = answers[`q${currentQuestion.id}`];
    
    if (!currentQuestion.required && (answer === undefined || answer === "")) {
      return true;
    }
    
    if (currentQuestion.type === "multiple") {
      return !currentQuestion.required || (Array.isArray(answer) && answer.length > 0);
    }
    
    if (answer === undefined || answer === "") {
      return false;
    }
    
    if (currentQuestion.type === "text") {
      const textValue = String(answer);
      if (currentQuestion.minLength && textValue.length < currentQuestion.minLength) {
        return false;
      }
      if (currentQuestion.maxLength && textValue.length > currentQuestion.maxLength) {
        return false;
      }
    }
    
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

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "\r") {
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        
        if (showRecommendation || showPathologyContact) return;
        
        const nextButton = document.querySelector('.nav-button.primary:not(:disabled)');
        if (nextButton) {
          nextButton.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [started, showRecommendation, showPathologyContact]);

  useEffect(() => {
    if (currentStep >= visibleQuestions.length && visibleQuestions.length > 0) {
      setCurrentStep(visibleQuestions.length - 1);
    }
  }, [visibleQuestions.length, currentStep]);

  useEffect(() => {
    const sendHeight = () => {
      try {
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        
        // Agregar margen solo si estamos en la pantalla de recomendación
        const extraMargin = showRecommendation ? 100 : 50;
        const finalHeight = height + extraMargin;
        
        window.parent.postMessage({ 
          type: "retorn-survey-height", 
          height: finalHeight
        }, "*");
        console.log('📤 Altura enviada:', finalHeight, showRecommendation ? '(con recomendación)' : '');
      } catch (e) {
        console.error('Error enviando altura:', e);
      }
    };

    // Esperar un poco más en la pantalla de recomendación para que todo se renderice
    const delay = showRecommendation ? 500 : 300;
    const timeoutId = setTimeout(sendHeight, delay);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [started, showRecommendation, showPathologyContact, currentStep]);

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

  const goNext = () => {
    setDirection("forward");
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, totalQuestions - 1));
    }, 50);
  };

  const goPrevious = () => {
    setDirection("backward");
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, 50);
  };

  const canGoNext = isCurrentQuestionAnswered();
  const canGoBack = currentStep > 0;
  const isLastQuestion = currentStep === totalQuestions - 1;

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setIsLoading(true);
    
    try {
      if (tienePatologias()) {
        setShowPathologyContact(true);
        setIsLoading(false);
        return;
      }

      const result = await calcularRecomendacionProductos(answers);
      setRecommendation(result);
      setShowRecommendation(true);
    } catch (error) {
      console.error("Error calculando recomendación:", error);
      alert("Hubo un error al calcular la recomendación. Por favor, revisa tus respuestas.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackFromContact = () => {
    setShowPathologyContact(false);
  };

  const handleBackFromRecommendation = () => {
    setShowRecommendation(false);
    setRecommendation(null);
    setCurrentStep(totalQuestions - 1);
  };

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
      <style>{getSurveyStyles(direction, theme)}</style>

      <div className="survey-container">
        {/* Ocultar barra de progreso en intro y primera pregunta */}
        <ProgressBar 
          progress={progress} 
          show={started && currentStep > 0 && !showRecommendation && !showPathologyContact} 
        />

        <div className="survey-content">
          {isLoading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              minHeight: '400px',
              background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)'
            }}>
              <div style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                marginBottom: '2rem'
              }}>
                {/* Círculo exterior pulsante */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '4px solid rgba(115, 159, 153, 0.2)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}></div>
                
                {/* Círculo medio rotatorio */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '4px solid transparent',
                  borderTopColor: '#739f99',
                  borderRightColor: '#739f99',
                  animation: 'spin 1.5s linear infinite'
                }}></div>
                
                {/* Círculo interior con icono */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #739f99 0%, #5fb3a1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  animation: 'fadeInOut 2s ease-in-out infinite',
                  boxShadow: '0 4px 20px rgba(115, 159, 153, 0.3)'
                }}>
                  🐾
                </div>
              </div>

              {/* Texto animado */}
              <div style={{
                textAlign: 'center',
                maxWidth: '400px'
              }}>
                <h3 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.5rem',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: '600',
                  color: '#3E3E3E',
                  animation: 'slideUp 0.6s ease-out'
                }}>
                  Analizando las necesidades de tu mascota
                </h3>
                <p style={{
                  margin: '0',
                  fontSize: '1rem',
                  color: '#739f99',
                  fontFamily: 'Inter, sans-serif',
                  animation: 'slideUp 0.6s ease-out 0.2s both'
                }}>
                  Buscando el mejor producto personalizado...
                </p>
                
                {/* Puntos animados */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '1.5rem'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#739f99',
                    animation: 'bounce 1.4s ease-in-out infinite'
                  }}></div>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#739f99',
                    animation: 'bounce 1.4s ease-in-out 0.2s infinite'
                  }}></div>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#739f99',
                    animation: 'bounce 1.4s ease-in-out 0.4s infinite'
                  }}></div>
                </div>
              </div>

              <style>{`
                @keyframes spin {
                  0% { transform: translate(-50%, -50%) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                @keyframes pulse {
                  0%, 100% { 
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                  }
                  50% { 
                    transform: translate(-50%, -50%) scale(1.1);
                    opacity: 0.5;
                  }
                }
                
                @keyframes fadeInOut {
                  0%, 100% { opacity: 0.8; }
                  50% { opacity: 1; }
                }
                
                @keyframes slideUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                @keyframes bounce {
                  0%, 80%, 100% { 
                    transform: translateY(0);
                  }
                  40% { 
                    transform: translateY(-12px);
                  }
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
                onBack={handleBackFromRecommendation}
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
