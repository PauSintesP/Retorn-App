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
  const [showTermsError, setShowTermsError] = useState(false);
  
  const handleNext = (e) => {
    if (isLastQuestion && !termsAccepted) {
      setShowTermsError(true);
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
  
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    if (e.target.checked) {
      setShowTermsError(false); // Ocultar error cuando se acepta
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
    <div className="navigation-wrapper">
      {isLastQuestion && (
        <div className="terms-checkbox-container">
          <label className="terms-checkbox-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
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
          {showTermsError && (
            <div className="terms-error-message">
              <span className="terms-error-icon">⚠</span>
              <span className="terms-error-text">Es obligatorio aceptar los términos para continuar</span>
            </div>
          )}
        </div>
      )}
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
        <button
          type="button"
          onClick={handleNext}
          className={`nav-button primary ${!canGoBack ? 'full-width' : ''}`}
          disabled={isNextDisabled}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
