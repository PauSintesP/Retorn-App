import ChoiceQuestion from "./ChoiceQuestion";
import TextQuestion from "./TextQuestion";
import NumberQuestion from "./NumberQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DateQuestion from "./DateQuestion";
import TermsQuestion from "./TermsQuestion";

/**
 * Componente principal que renderiza una pregunta según su tipo
 */

export default function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  value, 
  onChange,
  direction,
  answers,
  children
}) {
  // Resolver el texto de la pregunta si es una función
  const questionText = typeof question.question === "function"
    ? question.question(answers.q2)
    : question.question;

  // Resolver las opciones si son una función (para preguntas dinámicas)
  const resolvedQuestion = {
    ...question,
    options: typeof question.options === "function"
      ? question.options(answers)
      : question.options
  };

  // Renderizar el componente apropiado según el tipo de pregunta
  const renderQuestionInput = () => {
    switch (question.type) {
      case "choice":
        return (
          <ChoiceQuestion
            question={resolvedQuestion}
            value={value}
            onChange={onChange}
          />
        );
      case "text":
        return (
          <TextQuestion
            question={question}
            value={value}
            onChange={onChange}
          />
        );
      case "number":
        return (
          <NumberQuestion
            question={question}
            value={value}
            onChange={onChange}
          />
        );
      case "multiple":
        return (
          <MultipleChoiceQuestion
            question={question}
            value={value}
            onChange={onChange}
            answers={answers}
          />
        );
      case "date":
        return (
          <DateQuestion
            question={question}
            value={value}
            onChange={onChange}
          />
        );
      case "terms":
        return (
          <TermsQuestion
            question={question}
            value={value}
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  // Verificar si es la pregunta de patologías
  const isPathologyQuestion = question.id === "7_gato" || question.id === "9_perro";
  const questionCardClass = isPathologyQuestion ? "question-card pathology-question" : "question-card";

  // Verificar si es la pregunta de alimentación para aplicar estilo compacto
  const isAlimentacionQuestion = question.id === "8_gato" || question.id === "10_perro";

  return (
    <div className={questionCardClass}>
      <div className="question-header">
        <div className="question-number">
          Pregunta {questionNumber} de {totalQuestions}
        </div>
        <h2 className="question-text">{questionText}</h2>
        {question.info && (
          <p style={{
            marginTop: "8px",
            color: "#666",
            fontSize: isAlimentacionQuestion ? "0.65rem" : "0.7rem",
            fontStyle: "italic",
            lineHeight: isAlimentacionQuestion ? "1.3" : "1.4",
            maxWidth: isAlimentacionQuestion ? "90%" : "85%",
            margin: "8px auto 0",
            whiteSpace: isAlimentacionQuestion ? "pre-line" : "normal",
          }}>
            {isAlimentacionQuestion 
              ? "Las recetas mixtas están formuladas para obtener\nlas kcal necesarias distribuidas en 75% seco 25% húmedo"
              : question.info
            }
          </p>
        )}
      </div>

      {/* Renderizar input ANTES de children solo si NO es type "terms" */}
      {question.type !== "terms" && renderQuestionInput()}
      
      {/* Renderizar términos ANTES de los botones de navegación */}
      {question.type === "terms" && renderQuestionInput()}
      
      {children}
    </div>
  );
}
