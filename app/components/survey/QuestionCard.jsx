import ChoiceQuestion from "./ChoiceQuestion";
import TextQuestion from "./TextQuestion";
import NumberQuestion from "./NumberQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DateQuestion from "./DateQuestion";

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
      default:
        return null;
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-number">
          Pregunta {questionNumber} de {totalQuestions}
        </div>
        <h2 className="question-text">{questionText}</h2>
        {question.info && (
          <p style={{
            marginTop: "12px",
            color: "#666",
            fontSize: "0.9rem",
            fontStyle: "italic",
          }}>
            {question.info}
          </p>
        )}
      </div>

      {renderQuestionInput()}
      
      {children}
    </div>
  );
}
