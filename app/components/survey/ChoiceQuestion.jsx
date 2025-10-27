/**
 * Componente para renderizar preguntas de tipo opción múltiple (choice)
 */

export default function ChoiceQuestion({ question, value, onChange }) {
  // Normalizar opciones: pueden ser strings o objetos {value, icon, label}
  const normalizedOptions = question.options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt, icon: null };
    }
    return opt;
  });

  return (
    <div className="options-container">
      {normalizedOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`option-button ${value === option.value ? "selected" : ""}`}
          onClick={() => onChange(option.value)}
        >
          <span className="option-label">{option.label}</span>
          {option.icon && <span className="option-icon">{option.icon}</span>}
        </button>
      ))}
    </div>
  );
}
