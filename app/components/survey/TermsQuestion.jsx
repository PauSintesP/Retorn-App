/**
 * Componente para aceptar términos y condiciones
 */

export default function TermsQuestion({ question, value, onChange }) {
  const isChecked = value === true || value === "accepted";

  const handleChange = (e) => {
    onChange(e.target.checked ? "accepted" : "");
  };

  return (
    <div className="terms-container">
      <label className="terms-label">
        <input
          type="checkbox"
          className="terms-checkbox"
          checked={isChecked}
          onChange={handleChange}
          required={question.required}
        />
        <span className="terms-text">
          {question.question}
        </span>
      </label>
      {question.termsLink && question.privacyLink && (
        <div className="terms-links">
          <a 
            href={question.termsLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="terms-link"
          >
            Términos y condiciones
          </a>
          {" · "}
          <a 
            href={question.privacyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="terms-link"
          >
            Política de privacidad
          </a>
        </div>
      )}
    </div>
  );
}
