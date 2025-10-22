/**
 * Componente de botones de navegación para el formulario
 */

export default function NavigationButtons({ 
  onPrevious, 
  onNext, 
  canGoBack, 
  canGoNext, 
  isLastQuestion 
}) {
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
      <button
        type="button"
        onClick={onNext}
        className="nav-button primary"
        disabled={!canGoNext}
        style={canGoBack ? {} : { width: '100%' }}
      >
        {isLastQuestion ? "Finalizar ✓" : "Siguiente →"}
      </button>
    </div>
  );
}
