/**
 * Componente para renderizar preguntas de tipo selección múltiple
 * Con soporte para dos columnas, texto de advertencia y campo "Otros" inline
 */

import { useState } from "react";

export default function MultipleChoiceQuestion({ question, value = [], onChange, answers }) {
  const [otrosTexto, setOtrosTexto] = useState("");
  
  const handleToggle = (option) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(option)) {
      onChange(currentValues.filter((v) => v !== option));
    } else {
      onChange([...currentValues, option]);
    }
  };

  const handleOtrosChange = (text) => {
    setOtrosTexto(text);
    // Guardar el texto en las respuestas
    const questionId = question.id;
    const otrosKey = `${questionId}_otros`;
    
    // Actualizar directamente en answers (se propagará al padre)
    if (answers) {
      answers[otrosKey] = text;
    }
  };

  const currentValues = Array.isArray(value) ? value : [];
  const tienePatologias = currentValues.length > 0 && !currentValues.includes("Ninguna");
  const tieneOtros = currentValues.includes("Otros");

  // Dividir opciones en dos columnas, colocando "Otros" en la segunda columna
  const opcionesSinOtros = question.options.filter(opt => opt !== "Otros");
  const columna1 = opcionesSinOtros.slice(0, 4); // Primeros 4: Sobrepeso, Alergias, Digestiones, Problemas en la piel
  const columna2 = [...opcionesSinOtros.slice(4), "Otros"]; // Últimos 3 + Otros: Problemas articulares, Problemas dentales, Diabetes, Otros

  return (
    <div className="options-container">
      {/* Contenedor de dos columnas */}
      <div className="two-columns-container">
        <div className="column">
          {columna1.map((option) => {
            const isSelected = currentValues.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`option-button ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(option)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{option}</span>
                <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}>
                  {isSelected ? "✓" : "○"}
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
                className={`option-button ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(option)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{option}</span>
                <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}>
                  {isSelected ? "✓" : "○"}
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

      {/* Alerta naranja si se seleccionó alguna patología */}
      {tienePatologias && (
        <div className="patologia-alert">
          <p className="alert-icon">⚠️</p>
          <p className="alert-text">
            
            Evaluaremos una dieta personalizada para entender mejor qué necesita y ofrecerle 
            la mejor alimentación adaptada a su condición.
          </p>
        </div>
      )}
    </div>
  );
}
