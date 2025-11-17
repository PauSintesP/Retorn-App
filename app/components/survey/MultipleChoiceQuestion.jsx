/**
 * Componente para renderizar preguntas de tipo selección múltiple
 * Con soporte para dos columnas, texto de advertencia y campo "Otros" inline
 */

import { useState } from "react";

export default function MultipleChoiceQuestion({ question, value = [], onChange, answers }) {
  const [otrosTexto, setOtrosTexto] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  const handleToggle = (option) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(option)) {
      onChange(currentValues.filter((v) => v !== option));
      // Si desmarca "Otros", limpiar el texto
      if (option === "Otros") {
        setOtrosTexto("");
        const otrosKey = `${question.id}_otros`;
        if (answers) {
          answers[otrosKey] = "";
        }
      }
    } else {
      onChange([...currentValues, option]);
      // Mostrar popup cuando se selecciona una patología por primera vez
      if (option !== "Ninguna" && currentValues.length === 0) {
        
        setShowPopup(true);
      }
    }
  };

  const handleOtrosChange = (text) => {
    setOtrosTexto(text);
    const otrosKey = `${question.id}_otros`;
    if (answers) {
      answers[otrosKey] = text;
    }
  };

  const currentValues = Array.isArray(value) ? value : [];
  const tienePatologias = currentValues.length > 0 && !currentValues.includes("Ninguna");
  const tieneOtros = currentValues.includes("Otros");

  // Determinar el icono según el tipo de animal (basado en el ID de la pregunta)
  const esPatologiaPerro = question.id === "9_perro";
  const esPatologiaGato = question.id === "7_gato";
  const iconoAnimal = esPatologiaPerro ? "🐶" : esPatologiaGato ? "🐱" : "🐶";

  // Dividir opciones en dos columnas, colocando "Otros" en la segunda columna
  const opcionesSinOtros = question.options.filter(opt => opt !== "Otros");
  const columna1 = opcionesSinOtros.slice(0, 4); // Primeros 4: Sobrepeso, Alergias, Digestiones, Problemas en la piel
  const columna2 = [...opcionesSinOtros.slice(4), "Otros"]; // Últimos 3 + Otros: Problemas articulares, Problemas dentales, Diabetes, Otros

  return (
    <div className="options-container patologias-question">
      {/* Contenedor de dos columnas */}
      <div className="two-columns-container">
        <div className="column">
          {columna1.map((option) => {
            const isSelected = currentValues.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`option-button patologia-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(option)}
              >
                <span className="option-text">{option}</span>
                <span className={`option-check ${isSelected ? "checked" : ""}`}>
                  {isSelected && "✓"}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="column">
          {columna2.map((option) => {
            const isSelected = currentValues.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`option-button patologia-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(option)}
              >
                <span className="option-text">{option}</span>
                <span className={`option-check ${isSelected ? "checked" : ""}`}>
                  {isSelected && "✓"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Campo de texto para "Otros" - aparece inline */}
      {tieneOtros && (
        <div className="otros-text-container">
          <input
            type="text"
            className="text-input"
            value={otrosTexto}
            onChange={(e) => handleOtrosChange(e.target.value)}
            placeholder="Especifica otras patologías..."
            maxLength={200}
            autoFocus
          />
          <p style={{
            marginTop: "0.5rem",
            color: "#666",
            fontSize: "0.8rem",
            fontStyle: "italic",
          }}>
            {otrosTexto.length}/200 caracteres
          </p>
        </div>
      )}

      {/* Texto informativo debajo de las opciones */}
      <p className="patologias-info-text">
        Selecciona todas las que apliquen para personalizar la recomendación
      </p>

      {/* Popup modal */}
      {showPopup && (
        <div className="pathology-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="pathology-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="pathology-popup-close"
              onClick={() => setShowPopup(false)}
              aria-label="Cerrar"
              type="button"
            >
              ✕
            </button>
            <div className="pathology-popup-icon">{iconoAnimal}</div>
            <p className="pathology-popup-text">
              Evaluaremos una dieta personalizada para entender mejor qué necesita y ofrecerle la mejor alimentación adaptada a su condición.
            </p>
            <button 
              className="pathology-popup-button"
              onClick={() => setShowPopup(false)}
              type="button"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
