/**
 * Componente para renderizar preguntas de tipo opción múltiple (choice)
 */

export default function ChoiceQuestion({ question, value, onChange }) {
  return (
    <div className="options-container">
      {question.options.map((option) => (
        <button
          key={option}
          type="button"
          className={`option-button ${value === option ? "selected" : ""}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
