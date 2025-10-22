/**
 * Componente para renderizar preguntas de tipo texto
 */

export default function TextQuestion({ question, value, onChange }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // El Enter será manejado por el componente padre
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Aplicar validación de longitud máxima
    if (question.maxLength && newValue.length > question.maxLength) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="options-container">
      <input
        type="text"
        className="text-input"
        value={value || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={question.placeholder || "Escribe tu respuesta..."}
        minLength={question.minLength}
        maxLength={question.maxLength}
        autoFocus
      />
      {(question.minLength || question.maxLength) && (
        <p style={{
          marginTop: "0.5rem",
          color: "#666",
          fontSize: "0.85rem",
          fontStyle: "italic",
        }}>
          {question.minLength && question.maxLength
            ? `Entre ${question.minLength} y ${question.maxLength} caracteres${value ? ` (${value.length}/${question.maxLength})` : ""}`
            : question.minLength
            ? `Mínimo ${question.minLength} caracteres`
            : `Máximo ${question.maxLength} caracteres${value ? ` (${value.length}/${question.maxLength})` : ""}`}
        </p>
      )}
    </div>
  );
}
