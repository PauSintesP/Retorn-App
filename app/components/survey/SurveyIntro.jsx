/**
 * Componente de pantalla de introducción de la encuesta
 */

export default function SurveyIntro({ onStart }) {
  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-number">Dura 4 minutos</div>
        <h2 className="question-text">Dieta personalizada para tus pelud@s</h2>
        <p style={{ 
          marginTop: '12px', 
          color: 'var(--jdgm-primary-color)', 
          fontSize: '1rem' 
        }}>
          Te pediremos información para poder elaborar la dieta
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="submit-button"
        style={{ marginTop: '2rem' }}
      >
        Empezar →
      </button>
      <p style={{ 
        textAlign: 'center', 
        marginTop: '1rem', 
        color: '#999', 
        fontSize: '0.875rem' 
      }}>
        Presiona Enter para comenzar
      </p>
    </div>
  );
}
