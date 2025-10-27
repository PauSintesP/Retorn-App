/**
 * Componente de botones de navegación para el formulario
 */

import { useState } from "react";

export default function NavigationButtons({ 
  onPrevious, 
  onNext, 
  canGoBack, 
  canGoNext, 
  isLastQuestion,
  currentQuestion,
  currentAnswer
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleNext = (e) => {
    if (isLastQuestion && !termsAccepted) {
      return; // No permitir avanzar si no ha aceptado los términos
    }
    
    // Si onNext espera un evento (como handleSubmit), pasárselo
    // Si no, simplemente llamar la función
    if (e && typeof onNext === 'function') {
      onNext(e);
    } else if (typeof onNext === 'function') {
      onNext();
    }
  };

  const isNextDisabled = !canGoNext || (isLastQuestion && !termsAccepted);

  // Determinar el texto del botón
  const getButtonText = () => {
    if (isLastQuestion) return "Finalizar ✓";
    
    // Si es pregunta de patologías (tipo multiple con id que incluye "gato" o "perro" y no "otros")
    const isPathologyQuestion = currentQuestion && 
      currentQuestion.type === "multiple" && 
      (currentQuestion.id === "7_gato" || currentQuestion.id === "9_perro");
    
    if (isPathologyQuestion) {
      // Si no hay respuesta o el array está vacío, mostrar "Ninguna"
      const hasPathologies = Array.isArray(currentAnswer) && currentAnswer.length > 0;
      return hasPathologies ? "Siguiente →" : "Ninguna →";
    }
    
    return "Siguiente →";
  };

  return (
    <div className="navigation-buttons">
      {canGoBack && (
        <button
          type="button"
          onClick={onPrevious}
          className="nav-button secondary"
        >
          ← Anterior
        </button>
      )}
      <div className="next-button-container" style={canGoBack ? {} : { width: '100%' }}>
        {isLastQuestion && (
          <div className="terms-checkbox-container">
            <label className="terms-checkbox-label">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="terms-checkbox-input"
              />
              <span className="terms-checkbox-text">
                Acepto los{" "}
                <a 
                  href="https://retorn.com/policies/terms-of-service" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="terms-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  términos del servicio
                </a>
                {" "}y la{" "}
                <a 
                  href="https://retorn.com/policies/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="terms-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  política de privacidad
                </a>
              </span>
            </label>
          </div>
        )}
        <button
          type="button"
          onClick={handleNext}
          className="nav-button primary"
          disabled={isNextDisabled}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
