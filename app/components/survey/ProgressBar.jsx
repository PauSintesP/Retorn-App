/**
 * Componente de barra de progreso para la encuesta
 * Se oculta en la pantalla de introducción y en la primera pregunta
 */

export default function ProgressBar({ progress, show = true }) {
  if (!show) return null;
  
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
