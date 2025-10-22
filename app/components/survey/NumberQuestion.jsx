/**
 * Componente para renderizar preguntas de tipo numérico
 */

export default function NumberQuestion({ question, value, onChange }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // El Enter será manejado por el componente padre
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Permitir valor vacío
    if (newValue === "") {
      onChange("");
      return;
    }

    const numValue = parseFloat(newValue);
    
    // Validar que sea un número válido
    if (isNaN(numValue)) {
      return;
    }

    // Validar valores negativos
    if (numValue < 0) {
      return;
    }

    // Aplicar validaciones de min/max si existen
    if (question.min !== undefined && numValue < question.min) {
      return;
    }
    
    if (question.max !== undefined && numValue > question.max) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="options-container">
      <input
        type="number"
        step="0.1"
        min={question.min || 0}
        max={question.max}
        className="text-input"
        value={value || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={question.placeholder || "Ej: 12"}
        autoFocus
      />
      {(question.min !== undefined || question.max !== undefined) && (
        <p style={{
          marginTop: "0.5rem",
          color: "#666",
          fontSize: "0.85rem",
          fontStyle: "italic",
        }}>
          {question.min !== undefined && question.max !== undefined
            ? `Valor entre ${question.min} y ${question.max} kg`
            : question.min !== undefined
            ? `Mínimo ${question.min} kg`
            : `Máximo ${question.max} kg`}
        </p>
      )}
    </div>
  );
}
