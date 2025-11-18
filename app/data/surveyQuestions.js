export const QUESTIONS = [
  {
    id: 1,
    question: "¿Qué pelud@ tienes?",
    type: "choice",
    options: ["Perro", "Gato"],
    required: true,
  },
  {
    id: 2,
    question: "¿Cómo se llama tu pelud@?",
    type: "text",
    required: true,
    placeholder: "Escribe el nombre aquí",
    minLength: 2,
    maxLength: 50,
  },
  {
    id: "2b",
    question: (name) => `¿Cuál es la fecha de nacimiento ${name ? `de ${name}` : "de tu pelud@"}?`,
    type: "date",
    required: true,
  },
  {
    id: "3_perro",
    question: (name) => `¿Tamaño de ${name || "tu pelud@"}?`,
    type: "choice",
    options: ["Pequeño", "Mediano", "Grande"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  {
    id: "3_gato",
    question: "¿En qué etapa se encuentra?",
    type: "choice",
    options: ["Gatito", "Adulto", "Senior"],
    required: true,
    condition: (answers) => answers.q1 === "Gato",
  },
  {
    id: "4_perro",
    question: "¿En qué etapa se encuentra?",
    type: "choice",
    options: ["Cachorro", "Adulto", "Senior"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q4 - Gato gatito: meses
  {
    id: "4_gato_gatito",
    question: "¡Gatito! ¿Cuántos meses tiene?",
    type: "choice",
    options: ["1-4 meses", "4-7 meses", "9-12 meses", "12-14 meses"],
    required: true,
    condition: (answers) => answers.q1 === "Gato" && answers["q3_gato"] === "Gatito",
  },
  // Q5 - Perro: actividad (solo para adultos)
  {
    id: "5_perro",
    question: "Nivel de actividad diaria",
    type: "choice",
    options: ["Baja", "Media", "Muy Alta (Deportiva)"],
    required: true,
    condition: (answers) => {
      // Solo se muestra si es perro Y es adulto (no cachorro ni senior)
      return answers.q1 === "Perro" && answers.q4_perro === "Adulto";
    },
  },
  // Q5 - Gato: peso
  {
    id: "5_gato",
    question: "¿Cuál es su peso ideal? En Kg",
    type: "number",
    required: true,
    placeholder: "Ej: 4.5",
    min: 1,
    max: 15,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q6 - Perro: peso
  {
    id: "6_perro",
    question: "¿Cuál es su peso ideal? En Kg",
    type: "number",
    required: true,
    placeholder: "Ej: 12",
    min: 1,
    max: 100,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q6 - Gato: castrado
  {
    id: "6_gato",
    question: "¿Está castrad@?",
    type: "choice",
    options: ["Sí", "No"],
    required: true,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q7 - Perro: snacks
  {
    id: "7_perro",
    question: "¿Cuántos premios o snacks come al día?",
    type: "choice",
    options: ["1 o menos", "2-3", "Muchos (Más de 3)"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q7 - Gato: patologías
  {
    id: "7_gato",
    question: "¿Tiene alguna de estas patologías?\n(puedes seleccionar varias)",
    type: "multiple",
    options: [
      "Sobrepeso",
      "Alergias o intolerancias",
      "Digestiones sensibles",
      "Problemas en la piel",
      "Problemas articulares",
      "Problemas dentales",
      "Diabetes",
      "Otros",
    ],
    required: false,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q8 - Perro: castrado
  {
    id: "8_perro",
    question: "¿Está castrad@?",
    type: "choice",
    options: ["Sí", "No"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q8 - Gato: alimentación
  {
    id: "8_gato",
    question: "¿Alimentación seca o mixta?",
    type: "choice",
    options: [
      { value: "Mixta", icon: "🥣🥫", label: "Mixta" },
      { value: "Seca", icon: "🥣", label: "Seca" }
    ],
    required: true,
    info: "Las recetas mixtas están formuladas para obtener las kcal necesarias distribuidas en 75% seco 25% húmedo",
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q9 - Perro: patologías
  {
    id: "9_perro",
    question: "¿Tiene alguna de estas patologías?\n(puedes seleccionar varias)",
    type: "multiple",
    options: [
      "Sobrepeso",
      "Alergias o intolerancias",
      "Digestiones sensibles",
      "Problemas en la piel",
      "Problemas articulares",
      "Problemas dentales",
      "Diabetes",
      "Otros",
    ],
    required: false,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q10 - Perro: alimentación
  {
    id: "10_perro",
    question: "¿Alimentación seca o mixta?",
    type: "choice",
    options: [
      { value: "Mixta", icon: "🥣🥫", label: "Mixta" },
      { value: "Seca", icon: "🥣", label: "Seca" }
    ],
    required: true,
    info: "Las recetas mixtas están formuladas para obtener las kcal necesarias distribuidas en 75% seco 25% húmedo",
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q11 - Perro: preferencia receta
  {
    id: "11_perro",
    question: "¿Tienes preferencia por alguna receta?",
    type: "choice",
    options: (answers) => {
      const edad = answers.q4_perro;
      const esSeca = answers["q10_perro"] === "Seca";
      const patologias = answers.q9_perro;
      const esSeniorOSobrepeso = edad === "Senior" || patologias?.includes("Sobrepeso");
      
      if (esSeca) {
        // SECO - Cachorro: Solo 1 ref → No mostrar pregunta
        if (edad === "Cachorro") return null;
        
        // SECO - Senior o Sobrepeso: Solo 1 ref (Senior Light) → No mostrar pregunta
        if (esSeniorOSobrepeso) return null;
        
        // SECO - Adulto: 3 opciones reales
        return [
          "Salmón",
          "Cordero",
          "Pollo",
          "¡Sorpréndeme!",
        ];
      } else {
        // MIXTA - Cachorro: Solo 1 ref → No mostrar pregunta
        if (edad === "Cachorro") return null;
        
        // MIXTA - Adulto/Senior: Ref por defecto → No mostrar pregunta
        return null;
      }
    },
    required: true,
    condition: (answers) => {
      if (answers.q1 !== "Perro") return false;
      
      const edad = answers.q4_perro;
      const esSeca = answers["q10_perro"] === "Seca";
      const patologias = answers.q9_perro;
      const esSeniorOSobrepeso = edad === "Senior" || patologias?.includes("Sobrepeso");
      
      // Solo mostrar para SECO + ADULTO (sin sobrepeso)
      return esSeca && edad === "Adulto" && !esSeniorOSobrepeso;
    },
  },
  // Q9 - Gato: preferencia receta
  {
    id: "9_gato",
    question: "¿Tienes preferencia por alguna receta?",
    type: "choice",
    options: (answers) => {
      const edad = answers.q3_gato;
      const castrado = answers.q6_gato;
      const patologias = answers.q7_gato;
      const esSeca = answers["q8_gato"] === "Seca";
      const esEsterilizadoOSobrepeso = castrado === "Sí" || patologias?.includes("Sobrepeso");
      
      if (esSeca) {
        // SECO - Gatito: Solo 1 ref → No mostrar pregunta
        if (edad === "Gatito") return null;
        
        // SECO - Esterilizado/Sobrepeso/Senior: Solo 1 ref → No mostrar pregunta
        if (esEsterilizadoOSobrepeso || edad === "Senior") return null;
        
        // SECO - Adulto (no esterilizado): 2 opciones reales
        return [
          "Pollo",
          "Pescado",
          "¡Sorpréndeme!",
        ];
      } else {
        // MIXTA - Gatito: Solo 1 ref → No mostrar pregunta
        if (edad === "Gatito") return null;
        
        // MIXTA - Adulto/Senior: Ref por defecto → No mostrar pregunta
        return null;
      }
    },
    required: true,
    condition: (answers) => {
      if (answers.q1 !== "Gato") return false;
      
      const edad = answers.q3_gato;
      const castrado = answers.q6_gato;
      const patologias = answers.q7_gato;
      const esSeca = answers["q8_gato"] === "Seca";
      const esEsterilizadoOSobrepeso = castrado === "Sí" || patologias?.includes("Sobrepeso");
      
      // Solo mostrar para SECO + ADULTO (no esterilizado, no sobrepeso, no senior)
      return esSeca && edad === "Adulto" && !esEsterilizadoOSobrepeso;
    },
  },
];

/**
 * Filtra las preguntas visibles basándose en las respuestas actuales
 * @param {Object} answers - Objeto con las respuestas actuales
 * @returns {Array} Array de preguntas filtradas
 */
export const getVisibleQuestions = (answers) => {
  return QUESTIONS.filter((q) => {
    if (!q.condition) return true;
    return q.condition(answers);
  });
};
