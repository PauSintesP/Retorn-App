/**
 * Definición de todas las preguntas del formulario de encuesta
 * Incluye lógica condicional para mostrar preguntas específicas según las respuestas
 */

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
  // Q3 - Perro: tamaño
  {
    id: "3_perro",
    question: (name) => `¿De qué tamaño es o será ${name || "tu pelud@"} de mayor?`,
    type: "choice",
    options: ["Pequeño", "Mediano", "Grande"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q3 - Gato: edad
  {
    id: "3_gato",
    question: "¿Qué edad tiene?",
    type: "choice",
    options: ["Gatito", "Adulto", "Senior"],
    required: true,
    condition: (answers) => answers.q1 === "Gato",
  },
  // Q4 - Perro: edad
  {
    id: "4_perro",
    question: "¿Qué edad tiene?",
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
  // Q5 - Perro: actividad
  {
    id: "5_perro",
    question: "Nivel de actividad diaria",
    type: "choice",
    options: ["Baja", "Media", "Muy Alta (Deportiva)"],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
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
  // Q7 - Gato otros (si selecciona "Otros")
  {
    id: "7_gato_otros",
    question: "Especifica otras patologías",
    type: "text",
    required: false,
    placeholder: "Describe aquí...",
    maxLength: 200,
    condition: (answers) =>
      answers.q1 === "Gato" && answers["q7_gato"]?.includes("Otros"),
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
    options: ["Seca", "Mixta"],
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
  // Q9 - Perro otros (si selecciona "Otros")
  {
    id: "9_perro_otros",
    question: "Especifica otras patologías",
    type: "text",
    required: false,
    placeholder: "Describe aquí...",
    maxLength: 200,
    condition: (answers) =>
      answers.q1 === "Perro" && answers["q9_perro"]?.includes("Otros"),
  },
  // Q10 - Perro: alimentación
  {
    id: "10_perro",
    question: "¿Alimentación seca o mixta?",
    type: "choice",
    options: ["Seca", "Mixta"],
    required: true,
    info: "Las recetas mixtas están formuladas para obtener las kcal necesarias distribuidas en 75% seco 25% húmedo",
    condition: (answers) => answers.q1 === "Perro",
  },
  // Q11 - Perro: preferencia receta
  {
    id: "11_perro",
    question: "¿Tienes preferencia por alguna receta?",
    type: "choice",
    options: [
      "Salmón + Pesc zanahoria",
      "Cordero + Cordero arroz",
      "Pollo + Pollo zanahoria",
      "Salmón light + Pesc zanahoria",
      "Salmón Cachorro + Lata cachorro",
      "¡Sorpréndeme!",
    ],
    required: true,
    condition: (answers) => answers.q1 === "Perro",
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
