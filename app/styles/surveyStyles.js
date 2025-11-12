/**
 * Estilos CSS para el componente de encuesta
 * Se inyectan dinámicamente en el componente
 */

export const getSurveyStyles = (direction, theme = {}) => {
  const {
    primary = '#3E3E3E',
    paginate = '#739f99',
    borderRadius = '8px',
    bg = '#ffffff'
  } = theme;

  return `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --jdgm-primary-color: ${primary};
    --jdgm-secondary-color: rgba(62, 62, 62, 0.1);
    --jdgm-star-color: #ffcf00;
    --jdgm-write-review-text-color: white;
    --jdgm-write-review-bg-color: ${primary};
    --jdgm-paginate-color: ${paginate};
    --jdgm-border-radius: ${borderRadius};
    --jdgm-reviewer-name-color: ${primary};
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  body {
    background: ${bg} !important;
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(40px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes fadeSlideOut {
    from {
      opacity: 0;
      transform: translateX(-40px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  .survey-container {
    width: 100%;
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height para móviles */
    display: flex;
    flex-direction: column;
    background: #ffffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--jdgm-primary-color);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    box-sizing: border-box;
    transform: scale(0.75);
    transform-origin: top center;
  }

  .survey-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(115, 159, 153, 0.05) 0%, transparent 70%);
    animation: pulse 8s ease-in-out infinite;
    pointer-events: none;
  }

  .progress-bar-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(115, 159, 153, 0.15);
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #5fb3a1 0%, #739f99 100%);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(115, 159, 153, 0.4);
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  }

  .survey-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0.75rem 0.75rem 0.75rem;
    margin-top: 4px;
    position: relative;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: calc(100% - 4px);
    box-sizing: border-box;
  }

  /* Alineación especial para la pregunta de patologías en móvil */
  .survey-content:has(.pathology-question) {
    justify-content: flex-start;
  }

  /* Tablet y Desktop: volver al centrado para todas las preguntas */
  @media (min-width: 600px) {
    .survey-content:has(.pathology-question) {
      justify-content: center;
    }
  }

  .question-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 0.8rem;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(115, 159, 153, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    padding: 1rem 0.85rem;
    max-width: 100%;
    width: 100%;
    min-width: 280px;
    max-height: 100%;
    animation: ${direction === "forward" ? "fadeSlideIn" : "fadeSlideOut"} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1px solid rgba(115, 159, 153, 0.1);
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
  }

  /* Tablet */
  @media (min-width: 600px) {
    .survey-content {
      padding: 2rem 1rem 1.25rem 1rem;
      padding-bottom: 100px;
    }

    .question-card {
      padding: 1.75rem 1.35rem;
      border-radius: 1.2rem;
      max-width: 90%;
      min-width: 450px;
    }
  }

  /* Desktop */
  @media (min-width: 768px) {
    .survey-content {
      padding: 3.5rem 1rem 2.5rem 1rem;
      padding-bottom: 80px;
    }

    .question-card {
      padding: 3rem 1.75rem;
      border-radius: 1.6rem;
      max-width: 900px;
      min-width: 550px;
      box-shadow: 
        0 30px 80px rgba(0, 0, 0, 0.08),
        0 10px 30px rgba(115, 159, 153, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }
  }

  /* Decorative top stripe removed to keep a cleaner card header */
  .question-card::before {
    display: none;
  }

  .question-header {
    margin-bottom: 0.75rem;
    text-align: center;
  }

  @media (min-width: 600px) {
    .question-header {
      margin-bottom: 1.15rem;
    }
  }

  @media (min-width: 768px) {
    .question-header {
      margin-bottom: 1.5rem;
    }
  }

  .question-number {
    color: var(--jdgm-paginate-color);
    font-family: 'Oswald', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 0.4rem;
    display: inline-block;
    padding: 0.25rem 0.6rem;
    background: rgba(115, 159, 153, 0.08);
    border-radius: 20px;
  }

  .question-text {
    font-family: 'Oswald', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
    line-height: 1.3;
    margin: 0;
    padding: 0 0.15rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    min-height: 2.2rem;
  }

  @media (min-width: 600px) {
    .question-header {
      margin-bottom: 1.15rem;
    }

    .question-number {
      font-size: 0.7rem;
      letter-spacing: 2px;
      padding: 0.35rem 0.85rem;
      margin-bottom: 0.75rem;
    }

    .question-text {
      font-size: 1.25rem;
      line-height: 1.4;
      padding: 0 0.5rem;
      min-height: 2.5rem;
    }
  }

  @media (min-width: 768px) {
    .question-text {
      font-size: 1.75rem;
      line-height: 1.35;
    }
  }
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
    text-align: center;
  }

  @media (min-width: 768px) {
    .question-header {
      margin-bottom: 2.5rem;
      text-align: left;
    }

    .question-number {
      font-size: 0.75rem;
      letter-spacing: 2.5px;
      margin-bottom: 1rem;
      padding: 0.4rem 1rem;
    }

    .question-text {
      font-size: 2.2rem;
      line-height: 1.25;
      text-align: left;
    }
  }

  /* Contenedor de opciones - Márgenes mejorados */
  .options-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0;
    padding: 0.5rem 0.15rem 0 0.15rem;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
  }

  @media (min-width: 600px) {
    .options-container {
      gap: 0.95rem;
      padding: 0.65rem 0.5rem 0 0.5rem;
    }
  }

  @media (min-width: 768px) {
    .options-container {
      gap: 1rem;
      padding: 0.75rem 0 0 0;
    }
  }

  .option-button {
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
    border: 2px solid rgba(115, 159, 153, 0.15);
    border-radius: 8px;
    padding: 0.75rem 0.85rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: var(--jdgm-primary-color);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 52px;
  }

  @media (min-width: 600px) {
    .option-button {
      padding: 1rem 1.25rem;
      font-size: 0.95rem;
      gap: 0.75rem;
      min-height: 62px;
    }
  }

  @media (min-width: 768px) {
    .option-button {
      padding: 1.3rem 1.75rem;
      font-size: 1.05rem;
      gap: 1rem;
      min-height: auto;
    }
  }

  .option-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
    line-height: 1;
  }

  @media (min-width: 600px) {
    .option-icon {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .option-icon {
      font-size: 2rem;
    }
  }

  .option-label {
    flex: 1;
    line-height: 1.3;
    word-break: break-word;
  }

  @media (min-width: 600px) {
    .option-label {
      line-height: 1.35;
    }
  }

  .option-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(115, 159, 153, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .option-button:hover::before {
    left: 100%;
  }

  .option-button:hover {
    background: linear-gradient(135deg, #e8f5e9 0%, #d4ede8 100%);
    border-color: var(--jdgm-paginate-color);
    transform: translateY(-2px);
    box-shadow: 
      0 4px 12px rgba(115, 159, 153, 0.18),
      0 2px 6px rgba(115, 159, 153, 0.1);
  }

  .option-button.selected {
    background: linear-gradient(135deg, #d4ede8 0%, #c8e6df 100%);
    border-color: var(--jdgm-paginate-color);
    border-width: 2.5px;
    color: var(--jdgm-primary-color);
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: none;
  }

  /* Optimización para preguntas con pocos botones (2-3 opciones) - Mobile */
  .options-container:has(.option-button:nth-child(2):last-child) .option-button,
  .options-container:has(.option-button:nth-child(3):last-child) .option-button {
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
    min-height: 60px;
  }

  .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
  .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
    font-size: 1.6rem;
  }

  @media (min-width: 600px) {
    .options-container:has(.option-button:nth-child(2):last-child) .option-button,
    .options-container:has(.option-button:nth-child(3):last-child) .option-button {
      padding: 1.1rem 1.5rem;
      font-size: 1rem;
      min-height: 70px;
    }

    .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
    .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
      font-size: 2rem;
    }
  }

  @media (min-width: 768px) {
    .options-container:has(.option-button:nth-child(2):last-child) .option-button,
    .options-container:has(.option-button:nth-child(3):last-child) .option-button {
      padding: 1.3rem 1.75rem;
      font-size: 1.05rem;
      min-height: auto;
    }

    .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
    .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
      font-size: 2.2rem;
    }
  }

  /* Terms and Conditions Styles */
  .terms-container {
    margin: 0 0 2rem 0;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(115, 159, 153, 0.15);
  }

  .terms-label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;
    padding: 1.25rem 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    border: 2px solid rgba(115, 159, 153, 0.15);
    transition: all 0.25s ease;
  }

  .terms-label:hover {
    background: rgba(115, 159, 153, 0.05);
    border-color: rgba(115, 159, 153, 0.3);
  }

  .terms-checkbox {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.875rem;
    margin-top: 0.1rem;
    cursor: pointer;
    accent-color: var(--jdgm-paginate-color);
  }

  .terms-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--jdgm-primary-color);
  }

  .terms-links {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    padding-top: 0.75rem;
  }

  .terms-link {
    color: var(--jdgm-paginate-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .terms-link:hover {
    color: var(--jdgm-primary-color);
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    .terms-container {
      margin: 0 0 2.5rem 0;
      padding-bottom: 2rem;
    }

    .terms-label {
      padding: 1.5rem 1.25rem;
    }

    .terms-checkbox {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }

    .terms-text {
      font-size: 1rem;
      line-height: 1.65;
    }

    .terms-links {
      font-size: 0.95rem;
      margin-top: 1.25rem;
      padding-top: 1rem;
    }
  }

  /* Inputs de texto y número - Márgenes mejorados */
  .text-input {
    width: calc(100% - 0.5rem);
    margin: 0 0.25rem;
    padding: 1rem 1rem;
    font-size: 0.95rem;
    border-radius: 8px;
    border: 2px solid rgba(115, 159, 153, 0.2);
    outline: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter', sans-serif;
    background: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .text-input {
      width: calc(100% - 1rem);
      margin: 0 0.5rem;
      padding: 1.15rem 1.15rem;
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    .text-input {
      width: 100%;
      margin: 0;
      padding: 1.3rem 1.25rem;
      font-size: 1.05rem;
    }
  }

  .text-input:focus {
    border-color: var(--jdgm-paginate-color);
    box-shadow: 
      0 4px 16px rgba(115, 159, 153, 0.12),
      0 0 0 4px rgba(115, 159, 153, 0.08);
    transform: translateY(-2px);
    background: white;
  }

  /* ============================================ */
  /* SELECTOR DE FECHAS PERSONALIZADO */
  /* ============================================ */

  /* Selector custom responsive - Mobile First */
  .custom-date-input {
    width: calc(100% - 0.5rem);
    max-width: calc(100% - 0.5rem);
    margin: 0 0.25rem;
    padding: 0.9rem 1rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-height: 54px;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .custom-date-input {
      width: calc(100% - 1rem);
      max-width: calc(100% - 1rem);
      margin: 0 0.5rem;
      padding: 1.25rem 1.25rem;
      min-height: 62px;
    }
  }

  @media (min-width: 768px) {
    .custom-date-input {
      width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }

  .custom-date-input:hover {
    border-color: #739f99;
    box-shadow: 0 4px 16px rgba(115, 159, 153, 0.15);
    transform: translateY(-2px);
  }

  .custom-date-input:focus {
    outline: none;
    border-color: #5fb3a1;
    box-shadow: 0 0 0 4px rgba(95, 179, 161, 0.15), 0 4px 16px rgba(95, 179, 161, 0.1);
  }

  .date-input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
  }

  @media (min-width: 600px) {
    .date-input-content {
      gap: 1rem;
    }
  }

  .date-text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }

  @media (min-width: 600px) {
    .date-text-container {
      gap: 0.5rem;
    }
  }

  .date-display-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #3E3E3E;
    line-height: 1.3;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 600px) {
    .date-display-text {
      font-size: 1rem;
      line-height: 1.4;
    }
  }

  .date-display-text.placeholder {
    color: #999;
    font-weight: 500;
  }

  .date-age-text {
    font-size: 0.75rem;
    color: #739f99;
    font-weight: 600;
    line-height: 1.3;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 600px) {
    .date-age-text {
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }
    padding: 0.4rem 0.75rem;
    background: rgba(115, 159, 153, 0.1);
    border-radius: 6px;
    display: inline-block;
    width: fit-content;
  }

  .date-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #739f99;
    transition: all 0.3s ease;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  .date-chevron.open {
    transform: rotate(180deg);
  }

  .date-chevron svg {
    display: block;
  }

  /* Panel de selección - Mobile First */
  .date-picker-panel {
    margin: 1.25rem auto 0;
    max-width: 100%;
    background: white;
    border-radius: 16px;
    padding: 1.25rem 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(115, 159, 153, 0.1);
    border: 2px solid rgba(115, 159, 153, 0.2);
    animation: fadeSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .date-picker-header {
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    border-bottom: 2px solid rgba(115, 159, 153, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .picker-title {
    font-size: 1rem;
    font-weight: 700;
    color: #5fb3a1;
    flex: 1;
    text-align: center;
    font-family: 'Oswald', sans-serif;
  }

  .date-picker-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(115, 159, 153, 0.1);
    border: none;
    border-radius: 50%;
    color: #739f99;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
  }

  .date-picker-close:hover {
    background: rgba(115, 159, 153, 0.2);
    transform: scale(1.1);
    color: #5fb3a1;
  }

  .date-picker-close:active {
    transform: scale(0.95);
  }

  .date-selectors-grid {
    display: grid;
    grid-template-columns: 1fr 1.8fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .date-selector-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .date-selector-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #739f99;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0 0.25rem;
    text-align: center;
    margin-bottom: 0.25rem;
    font-family: 'Oswald', sans-serif;
  }

  .date-selector-scroll {
    max-height: 180px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
    background: rgba(115, 159, 153, 0.04);
    border-radius: 10px;
    scrollbar-width: thin;
    scrollbar-color: rgba(115, 159, 153, 0.3) transparent;
    -webkit-overflow-scrolling: touch;
  }

  .date-selector-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .date-selector-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .date-selector-scroll::-webkit-scrollbar-thumb {
    background: rgba(115, 159, 153, 0.3);
    border-radius: 10px;
  }

  .date-selector-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 159, 153, 0.5);
  }

  .date-option {
    padding: 0.9rem 1rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.2);
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #3E3E3E;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }

  .date-option:hover:not(.selected) {
    border-color: #739f99;
    background: rgba(95, 179, 161, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.15);
  }

  .date-option:active:not(.selected) {
    transform: translateY(0);
  }

  .date-option.selected {
    background: linear-gradient(135deg, #5fb3a1 0%, #4a9888 100%);
    border-color: #5fb3a1;
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(95, 179, 161, 0.35);
    transform: scale(1.02);
  }

  .date-picker-footer {
    display: flex;
    justify-content: center;
    padding-top: 1.25rem;
    margin-top: 0.5rem;
    border-top: 2px solid rgba(115, 159, 153, 0.15);
  }

  .date-clear-btn {
    padding: 0.95rem 2.25rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.3);
    border-radius: 10px;
    color: #739f99;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.25s ease;
    min-height: 48px;
    font-family: 'Inter', sans-serif;
  }

  .date-clear-btn:hover {
    background: rgba(115, 159, 153, 0.1);
    border-color: #5fb3a1;
    color: #5fb3a1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.2);
  }

  .date-clear-btn:active {
    transform: translateY(0);
  }

  /* Responsive Tablet */
  @media (min-width: 600px) {
    .custom-date-input {
      padding: 1.35rem 1.5rem;
      min-height: 68px;
      border-radius: 14px;
    }

    .date-display-text {
      font-size: 1.05rem;
    }

    .date-age-text {
      font-size: 0.9rem;
      padding: 0.5rem 0.85rem;
    }

    .date-picker-panel {
      padding: 1.75rem 1.5rem;
      border-radius: 18px;
    }

    .picker-title {
      font-size: 1.1rem;
    }

    .date-picker-close {
      width: 2.25rem;
      height: 2.25rem;
      font-size: 1.65rem;
    }

    .date-selectors-grid {
      gap: 1rem;
    }

    .date-selector-scroll {
      max-height: 200px;
      padding: 0.85rem 0.6rem;
      gap: 0.6rem;
    }

    .date-option {
      padding: 1rem 1.1rem;
      font-size: 1rem;
      min-height: 52px;
    }

    .date-clear-btn {
      padding: 1rem 2.5rem;
      font-size: 1rem;
    }
  }

  /* Responsive Desktop */
  @media (min-width: 768px) {
    .custom-date-input {
      padding: 1.5rem 1.75rem;
      min-height: 72px;
      border-radius: 16px;
    }

    .date-display-text {
      font-size: 1.1rem;
    }

    .date-age-text {
      font-size: 0.95rem;
      padding: 0.55rem 0.95rem;
    }

    .date-picker-panel {
      padding: 2rem 1.75rem;
      border-radius: 20px;
      max-width: 650px;
    }

    .picker-title {
      font-size: 1.15rem;
    }

    .date-picker-close {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.75rem;
    }

    .date-selectors-grid {
      grid-template-columns: 1fr 2fr 1fr;
      gap: 1.25rem;
    }

    .date-selector-label {
      font-size: 0.8rem;
    }

    .date-selector-scroll {
      max-height: 220px;
      padding: 1rem 0.75rem;
      gap: 0.65rem;
    }

    .date-option {
      padding: 1.1rem 1.25rem;
      font-size: 1.05rem;
      min-height: 56px;
    }

    .date-clear-btn {
      padding: 1.1rem 2.75rem;
      font-size: 1.05rem;
      min-height: 52px;
    }
  }

  /* Mejoras para pantallas muy pequeñas */
  @media (max-width: 400px) {
    .custom-date-input {
      padding: 1.1rem 1rem;
      min-height: 58px;
    }

    .date-display-text {
      font-size: 0.9rem;
    }

    .date-age-text {
      font-size: 0.8rem;
      padding: 0.35rem 0.65rem;
    }

    .date-picker-panel {
      padding: 1rem 0.85rem;
      margin: 1rem auto 0;
    }

    .picker-title {
      font-size: 0.95rem;
    }

    .date-picker-close {
      width: 1.85rem;
      height: 1.85rem;
      font-size: 1.4rem;
    }

    .date-selector-label {
      font-size: 0.7rem;
    }

    .date-selector-scroll {
      max-height: 160px;
      padding: 0.6rem 0.4rem;
      gap: 0.45rem;
    }

    .date-option {
      padding: 0.8rem 0.85rem;
      font-size: 0.9rem;
      min-height: 44px;
    }

    .date-clear-btn {
      padding: 0.85rem 1.75rem;
      font-size: 0.9rem;
    }
  }
      font-size: 0.95rem;
    }

    .date-selector-label {
      font-size: 0.75rem;
    }

    .date-picker-footer {
      padding-top: 1rem;
    }

    .date-clear-btn {
      padding: 0.7rem 1.25rem;
      font-size: 0.85rem;
      width: 100%;
    }
  }

  /* Tablet breakpoint */
  @media (min-width: 600px) and (max-width: 767px) {
    .date-picker-panel {
      padding: 1.5rem;
    }

    .date-selectors-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .date-selector-column:nth-child(3) {
      grid-column: 1 / -1;
    }
  }

  /* Estilos específicos para input de fecha NATIVO (fallback) */
  .date-input {
    cursor: pointer;
    color: #333;
    font-weight: 500;
    position: relative;
    padding-right: 3.5rem;
  }

  .date-input::-webkit-calendar-picker-indicator {
    cursor: pointer;
    position: absolute;
    right: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, #5fb3a1 0%, #739f99 100%);
    color: white;
    width: 36px;
    height: 36px;
    opacity: 0.9;
  }

  .date-input::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.3);
  }

  /* Mejora para Firefox y otros navegadores */
  .date-input::-moz-calendar-picker-indicator {
    cursor: pointer;
  }
  
  /* Estilos para el calendario nativo de Chrome/Edge */
  .date-input::-webkit-datetime-edit {
    padding: 0.25rem 0.5rem;
  }
  
  .date-input::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  
  .date-input::-webkit-datetime-edit-text {
    color: #739f99;
    padding: 0 0.2rem;
  }
  
  .date-input::-webkit-datetime-edit-month-field,
  .date-input::-webkit-datetime-edit-day-field,
  .date-input::-webkit-datetime-edit-year-field {
    background: rgba(115, 159, 153, 0.08);
    color: #3E3E3E;
    padding: 0.4rem 0.6rem;
    border-radius: 5px;
    transition: all 0.2s ease;
  }
  
  .date-input::-webkit-datetime-edit-month-field:focus,
  .date-input::-webkit-datetime-edit-day-field:focus,
  .date-input::-webkit-datetime-edit-year-field:focus {
    background: rgba(115, 159, 153, 0.15);
    outline: 2px solid rgba(115, 159, 153, 0.3);
    outline-offset: 2px;
  }

  /* ============================================ */
  /* ESTILOS PARA PREGUNTAS MÚLTIPLES CON 2 COLUMNAS */
  /* ============================================ */

  /* Mobile: UNA SOLA COLUMNA para mejor legibilidad */
  .two-columns-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.7rem;
    margin-bottom: 0.75rem;
  }

  /* Tablet pequeña: sigue en una columna */
  @media (min-width: 500px) {
    .two-columns-container {
      gap: 0.8rem;
    }
  }

  /* Tablet: dos columnas */
  @media (min-width: 650px) {
    .two-columns-container {
      grid-template-columns: 1fr 1fr;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
  }

  /* Desktop: mayor separación */
  @media (min-width: 900px) {
    .two-columns-container {
      gap: 1.1rem;
    }
  }

  /* Variante con 3 columnas: columna izquierda, centro (Otros), derecha */
  .two-columns-container.three-column {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  @media (min-width: 650px) {
    .two-columns-container.three-column {
      grid-template-columns: 1fr auto 1fr;
      align-items: start;
    }
  }

  /* Centro para el botón 'Otros' */
  .center-column {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ajustes para el botón 'Otros' cuando está en la columna central */
  .two-columns-container.three-column .otros-button {
    width: 100%;
  }

  @media (min-width: 650px) {
    .two-columns-container.three-column .otros-button {
      width: auto;
      min-width: 170px;
    }
  }

  @media (min-width: 900px) {
    .two-columns-container.three-column .otros-button {
      min-width: 180px;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  @media (min-width: 500px) {
    .column {
      gap: 0.8rem;
    }
  }

  @media (min-width: 650px) {
    .column {
      gap: 0.85rem;
    }
  }

  @media (min-width: 900px) {
    .column {
      gap: 0.95rem;
    }
  }

  .patologias-info-text {
    text-align: center;
    margin-top: 1.15rem;
    margin-bottom: 0;
    color: #666;
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    font-style: italic;
    line-height: 1.4;
  }

  @media (min-width: 600px) {
    .patologias-info-text {
      margin-top: 1.5rem;
      font-size: 0.95rem;
    }
  }

  .otros-button {
    width: 100%;
  }

  .otros-text-container {
    animation: fadeSlideIn 0.3s ease-out;
    margin-top: 0.9rem !important;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 500px) {
    .otros-text-container {
      margin-top: 1rem !important;
    }
  }

  @media (min-width: 650px) {
    .otros-text-container {
      margin-top: 1.1rem !important;
    }
  }

  /* Asegurar que el input de "Otros" no se desborde y tenga buen tamaño */
  .otros-text-container .text-input {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0.9rem 1rem;
    font-size: 0.9rem;
    box-sizing: border-box;
    border: 2px solid rgba(115, 159, 153, 0.2);
    border-radius: 8px;
    transition: border-color 0.2s ease;
  }

  .otros-text-container .text-input:focus {
    border-color: var(--jdgm-paginate-color);
    outline: none;
  }

  @media (min-width: 500px) {
    .otros-text-container .text-input {
      padding: 1rem 1.15rem;
      font-size: 0.95rem;
    }
  }

  @media (min-width: 650px) {
    .otros-text-container .text-input {
      padding: 1.1rem 1.25rem;
      font-size: 1rem;
    }
  }

  /* ============================================ */
  /* NUEVO BANNER DE ALERTA - ESTILO PROMOCIONAL */
  /* ============================================ */
  
  /* Wrapper que reserva el espacio para la alerta - SIEMPRE OCUPA ESPACIO */
  .patologia-alert-wrapper {
    min-height: 100px;
    margin-top: 1.25rem;
    display: flex;
    align-items: flex-start;
    transition: min-height 0.3s ease;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
  }

  @media (min-width: 600px) {
    .patologia-alert-wrapper {
      min-height: 110px;
      margin-top: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .patologia-alert-wrapper {
      min-height: 100px;
      margin-top: 2rem;
    }
  }
  
  .patologia-alert-banner {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: 0.85rem 2.25rem 0.85rem 0.85rem;
    background: linear-gradient(135deg, #FFF9E6 0%, #FFFBF0 100%);
    border: 2px solid #FFD700;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
    animation: fadeIn 0.3s ease-out;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (min-width: 600px) {
    .patologia-alert-banner {
      padding: 1.25rem 3rem 1.25rem 1.5rem;
      border-radius: 16px;
    }
  }

  @media (min-width: 768px) {
    .patologia-alert-banner {
      padding: 1.5rem 3.5rem 1.5rem 2rem;
    }
  }

  .alert-banner-content {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .alert-banner-content {
      gap: 1rem;
    }
  }

  @media (min-width: 768px) {
    .alert-banner-content {
      gap: 1.25rem;
    }
  }

  .alert-banner-icon {
    font-size: 1.3rem;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  @media (min-width: 600px) {
    .alert-banner-icon {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 768px) {
    .alert-banner-icon {
      font-size: 2rem;
    }
  }

  .alert-banner-text {
    flex: 1;
    font-family: 'Inter', sans-serif;
    color: #3E3E3E;
    min-width: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .alert-banner-text p {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.4;
    color: #4a4a4a;
    font-weight: 500;
    word-break: break-word;
  }

  @media (min-width: 600px) {
    .alert-banner-text p {
      font-size: 0.9rem;
      line-height: 1.55;
    }
  }

  @media (min-width: 768px) {
    .alert-banner-text p {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }

  .alert-banner-close {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    background: transparent;
    border: none;
    color: #666;
    font-size: 1.15rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    .alert-banner-close {
      top: 0.875rem;
      right: 0.875rem;
      font-size: 1.4rem;
      width: 2rem;
      height: 2rem;
    }
  }

  @media (min-width: 768px) {
    .alert-banner-close {
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
      width: 2.25rem;
      height: 2.25rem;
    }
  }

  .alert-banner-close:hover {
    background: rgba(0, 0, 0, 0.08);
    color: #333;
    transform: scale(1.1);
  }

  .alert-banner-close:active {
    transform: scale(0.95);
  }

  /* ============================================ */
  /* MEJORA RESPONSIVIDAD PREGUNTA PATOLOGÍAS */
  /* ============================================ */
  
  /* Contenedor específico para pregunta de patologías - ALTURA FIJA PARA EVITAR DESPLAZAMIENTOS */
  .patologias-question {
    position: relative;
  }

  /* Reservar espacio para la alerta desde el inicio */
  .patologias-question::after {
    content: '';
    display: block;
    height: 0;
    transition: height 0.3s ease;
  }

  /* Los botones de patologías tienen un estilo mejorado */
  .patologia-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .option-text {
    flex: 1;
    text-align: left;
  }

  .option-check {
    width: 22px;
    height: 22px;
    border: 2px solid var(--jdgm-paginate-color);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: bold;
    color: white;
    background: transparent;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    margin-left: 0.65rem;
  }

  @media (min-width: 500px) {
    .option-check {
      width: 24px;
      height: 24px;
      font-size: 1rem;
      margin-left: 0.75rem;
    }
  }

  @media (min-width: 650px) {
    .option-check {
      width: 26px;
      height: 26px;
      font-size: 1.1rem;
      margin-left: 0.85rem;
    }
  }

  @media (min-width: 900px) {
    .option-check {
      width: 28px;
      height: 28px;
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }

  .option-check.checked {
    background: var(--jdgm-paginate-color);
    border-color: var(--jdgm-paginate-color);
    box-shadow: 0 2px 8px rgba(115, 159, 153, 0.4);
  }

  /* Asegurar que los botones mantengan tamaño consistente */
  .patologias-question .option-button {
    min-height: 54px;
    height: auto;
    padding: 0.85rem 1rem;
  }

  @media (min-width: 500px) {
    .patologias-question .option-button {
      min-height: 58px;
      padding: 0.95rem 1.15rem;
    }
  }

  @media (min-width: 650px) {
    .patologias-question .option-button {
      min-height: 62px;
      padding: 1.05rem 1.3rem;
    }
  }

  @media (min-width: 900px) {
    .patologias-question .option-button {
      min-height: 58px;
      padding: 1.15rem 1.5rem;
    }
  }
    }
  }

  /* DEPRECATED - Mantener para compatibilidad pero no se usa */
  .patologia-alert {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    margin-top: 1rem;
    padding: 1rem 0.85rem;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%);
    border-left: 4px solid #ff9800;
    border-radius: 5px;
    animation: fadeSlideIn 0.4s ease-out;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .patologia-alert {
      gap: 1rem;
      margin-top: 1.5rem;
      padding: 1.5rem;
    }
  }

  .alert-icon {
    font-size: 1.35rem;
    margin: 0;
    line-height: 1;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    .alert-icon {
      font-size: 1.8rem;
    }
  }

  .alert-text {
    margin: 0;
    color: #e65100;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.5;
    flex: 1;
  }

  @media (min-width: 600px) {
    .alert-text {
      font-size: 0.95rem;
    }
  }

  @media (min-width: 768px) {
    .alert-text {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
    font-size: 0.95rem;
    line-height: 1.6;
    font-weight: 500;
  }

  /* Contenedor principal de navegación y términos */
  .navigation-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .navigation-buttons {
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
  }
  
  /* Si solo hay un botón (sin "Anterior"), centrarlo */
  .navigation-buttons:has(button:only-child) {
    justify-content: center;
  }

  .nav-button {
    flex: 1;
    min-width: 0;
    max-width: none;
    padding: 0.9rem 0.75rem;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-button.full-width {
    flex: 1;
  }

  @media (min-width: 600px) {
    .navigation-buttons {
      gap: 1rem;
    }

    .nav-button {
      padding: 1rem 1.5rem;
      font-size: 0.88rem;
      letter-spacing: 1px;
      white-space: normal;
    }
  }

  @media (min-width: 768px) {
    .nav-button {
      flex: 0 0 auto;
      min-width: 160px;
      padding: 1.05rem 2rem;
      font-size: 0.92rem;
      letter-spacing: 1.5px;
    }
  }

  /* Contenedor interno para los botones dentro de la question-card */
  .controls-inner {
    width: 100%;
    margin-top: 1rem;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 600px) {
    .controls-inner {
      margin-top: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .controls-inner {
      margin-top: 2rem;
    }
  }

  /* Fila de botones de navegación */
  .navigation-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
    width: 100%;
  }

  @media (min-width: 600px) {
    .navigation-buttons {
      gap: 0.85rem;
    }
  }

  @media (min-width: 768px) {
    .navigation-buttons {
      gap: 1rem;
    }
  }

  .nav-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
  }

  .nav-button:hover::before {
    width: 300px;
    height: 300px;
  }

  .nav-button.secondary {
    background: linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%);
    color: #666;
    border: 2px solid rgba(0, 0, 0, 0.06);
  }

  .nav-button.secondary:hover:not(:disabled) {
    background: linear-gradient(135deg, #ebebeb 0%, #e0e0e0 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .nav-button.primary {
    background: linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%);
    background-size: 200% 100%;
    color: white;
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.3),
      0 2px 6px rgba(115, 159, 153, 0.15);
    border: none;
  }

  .nav-button.primary:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 10px 28px rgba(115, 159, 153, 0.35),
      0 4px 10px rgba(115, 159, 153, 0.2);
    background-position: 100% 0;
  }

  .nav-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Checkbox de términos - aparece arriba de los botones */
  .terms-checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.85rem 0.75rem;
    background: rgba(115, 159, 153, 0.05);
    border-radius: 8px;
    border: 1.5px solid rgba(115, 159, 153, 0.2);
    margin-bottom: 0.5rem;
  }

  @media (min-width: 600px) {
    .terms-checkbox-container {
      padding: 1rem 1rem;
    }
  }

  @media (min-width: 768px) {
    .terms-checkbox-container {
      padding: 1.25rem 1.25rem;
    }
  }

  .terms-error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(220, 38, 38, 0.08);
    border-left: 3px solid #dc2626;
    border-radius: 4px;
    margin-top: 0.375rem;
    animation: slideDown 0.3s ease-out;
  }

  @media (min-width: 600px) {
    .terms-error-message {
      padding: 0.625rem 0.875rem;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .terms-error-icon {
    font-size: 0.9rem;
    color: #dc2626;
    line-height: 1;
  }

  @media (min-width: 600px) {
    .terms-error-icon {
      font-size: 1rem;
    }
  }

  .terms-error-text {
    font-size: 0.75rem;
    color: #dc2626;
    font-weight: 500;
    line-height: 1.3;
  }

  @media (min-width: 600px) {
    .terms-error-text {
      font-size: 0.8125rem;
    }
  }

  .terms-checkbox-label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;
    width: 100%;
  }

  .terms-checkbox-input {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-right: 0.6rem;
    margin-top: 0.125rem;
    cursor: pointer;
    accent-color: var(--jdgm-paginate-color);
  }

  @media (min-width: 600px) {
    .terms-checkbox-input {
      width: 1.125rem;
      height: 1.125rem;
      margin-right: 0.75rem;
    }
  }

  @media (min-width: 768px) {
    .terms-checkbox-input {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.875rem;
    }
  }

  .terms-checkbox-text {
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--jdgm-primary-color);
  }

  @media (min-width: 600px) {
    .terms-checkbox-text {
      font-size: 0.85rem;
    }
  }

  @media (min-width: 768px) {
    .terms-checkbox-text {
      font-size: 0.9rem;
    }
  }

  .submit-button {
    width: 100%;
    max-width: 100%;
    padding: 1.1rem 1.5rem;
    border: none;
    border-radius: 5px;
    background: linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%);
    background-size: 200% 100%;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    box-shadow: 
      0 4px 16px rgba(115, 159, 153, 0.3),
      0 2px 6px rgba(115, 159, 153, 0.15);
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .submit-button {
      width: auto;
      min-width: 200px;
      max-width: 300px;
      padding: 1.1rem 2.2rem;
      font-size: 0.95rem;
      letter-spacing: 1.5px;
      box-shadow: 
        0 6px 20px rgba(115, 159, 153, 0.3),
        0 2px 6px rgba(115, 159, 153, 0.15);
    }
  }

  .submit-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .submit-button:hover:not(:disabled)::before {
    width: 400px;
    height: 400px;
  }

  .submit-button:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 10px 28px rgba(115, 159, 153, 0.35),
      0 4px 10px rgba(115, 159, 153, 0.2);
    background-position: 100% 0;
  }

  .submit-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* ============================================ */
  /* ESTILOS PARA RECOMENDACIÓN DE PRODUCTOS */
  /* ============================================ */
  
  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    color: var(--jdgm-paginate-color);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .back-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(115, 159, 153, 0.1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: 0;
  }

  .back-button:hover::before {
    transform: scaleX(1);
  }

  .back-button:hover {
    color: var(--jdgm-primary-color);
    transform: translateX(-3px);
  }

  .back-button:active {
    transform: translateX(-5px) scale(0.98);
  }

  .back-button svg {
    position: relative;
    z-index: 1;
    width: 20px;
    height: 20px;
  }

  .back-button span {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .back-button {
      font-size: 1rem;
      padding: 0.875rem 1.25rem;
    }

    .back-button svg {
      width: 24px;
      height: 24px;
    }
  }

  .recommendation-container {
    max-width: 100%;
    width: 100%;
    height: 100%;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(115, 159, 153, 0.4) transparent;
    margin: 0;
  }

  .recommendation-container::-webkit-scrollbar {
    width: 8px;
  }

  .recommendation-container::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  .recommendation-container::-webkit-scrollbar-thumb {
    background: rgba(115, 159, 153, 0.4);
    border-radius: 10px;
  }

  .recommendation-container::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 159, 153, 0.6);
  }

  @media (min-width: 600px) {
    .recommendation-container {
      max-width: 95%;
      padding: 0.75rem;
    }
  }

  @media (min-width: 768px) {
    .recommendation-container {
      max-width: 900px;
      padding: 1.5rem;
    }
  }

  .recommendation-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding: 1.5rem 1rem;
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.12) 0%, rgba(95, 179, 161, 0.08) 100%);
    border-radius: 16px;
    border: 1px solid rgba(115, 159, 153, 0.2);
    box-shadow: 
      0 4px 16px rgba(115, 159, 153, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    position: relative;
    overflow: hidden;
  }

  .recommendation-header::before {
    content: '🎉';
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.5rem;
    opacity: 0.3;
  }

  @media (min-width: 600px) {
    .recommendation-header {
      margin-bottom: 2rem;
      padding: 2rem 1.5rem;
      border-radius: 20px;
    }

    .recommendation-header::before {
      top: 1rem;
      right: 1rem;
      font-size: 2rem;
    }
  }

  @media (min-width: 768px) {
    .recommendation-header {
      margin-bottom: 2.5rem;
      padding: 2.5rem 2rem;
      border-radius: 24px;
    }

    .recommendation-header::before {
      top: 1.5rem;
      right: 1.5rem;
      font-size: 2.5rem;
    }
  }

  .recommendation-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 0.5rem 0;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #3E3E3E 0%, #5a5a5a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 600px) {
    .recommendation-title {
      font-size: 1.9rem;
      margin: 0 0 0.65rem 0;
    }
  }

  @media (min-width: 768px) {
    .recommendation-title {
      font-size: 2.6rem;
      line-height: 1.2;
      margin: 0 0 0.75rem 0;
    }
  }

  .recommendation-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #739f99;
    margin: 0;
    line-height: 1.5;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  @media (min-width: 600px) {
    .recommendation-subtitle {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    .recommendation-subtitle {
      font-size: 1.15rem;
    }
  }

  .mixta-info {
    background: rgba(115, 159, 153, 0.08);
    border-left: 4px solid var(--jdgm-paginate-color);
    padding: 0.875rem 1rem;
    border-radius: 6px;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 600px) {
    .mixta-info {
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .mixta-info {
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
    }
  }

  .mixta-description {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: var(--jdgm-primary-color);
    font-weight: 500;
    line-height: 1.5;
  }

  @media (min-width: 768px) {
    .mixta-description {
      font-size: 1.05rem;
    }
  }

  .mixta-products-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 0 0 2rem 0;
  }

  @media (min-width: 768px) {
    .mixta-products-grid {
      flex-direction: row;
      gap: 1.5rem;
      margin-bottom: 3rem;
      align-items: stretch;
    }
  }

  .mixta-products-grid .product-card {
    margin-bottom: 0;
    flex: 1;
    min-width: 0;
  }

  .product-card {
    background: white;
    border-radius: 8px;
    padding: 0.85rem 0.6rem;
    margin-bottom: 0.85rem;
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(115, 159, 153, 0.1);
    border: 1px solid rgba(115, 159, 153, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (min-width: 600px) {
    .product-card {
      padding: 1.25rem;
      margin-bottom: 1.25rem;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.08),
        0 4px 10px rgba(115, 159, 153, 0.1);
    }
  }

  @media (min-width: 768px) {
    .product-card {
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.08),
        0 8px 20px rgba(115, 159, 153, 0.1);
    }
    
    .mixta-products-grid .product-card {
      padding: 1.5rem;
    }
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.12),
      0 12px 30px rgba(115, 159, 153, 0.15);
  }

  .product-image-container {
    width: 100%;
    height: 160px;
    margin: 0 0 0.85rem 0;
    overflow: hidden;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    border-radius: 6px;
    position: relative;
  }

  @media (min-width: 600px) {
    .product-image-container {
      height: 220px;
      margin: 0 0 1.25rem 0;
    }
  }

  @media (min-width: 768px) {
    .product-image-container {
      height: 300px;
      margin: 0 0 1.5rem 0;
    }
    
    .mixta-products-grid .product-image-container {
      height: 250px;
    }
  }

  .product-image {
    max-width: 90%;
    max-height: 90%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
    display: block;
    margin: auto;
  }

  .product-card:hover .product-image {
    transform: scale(1.05);
  }

  .product-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
    min-height: 2rem;
  }

  @media (min-width: 600px) {
    .product-header {
      margin-bottom: 1rem;
    }
  }

  .product-type {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1.8px;
    color: var(--jdgm-paginate-color);
    margin: 0;
    font-weight: 500;
  }

  @media (min-width: 600px) {
    .product-type {
      font-size: 0.85rem;
      letter-spacing: 2px;
    }
  }

  .product-badge {
    padding: 0.3rem 0.7rem;
    background: rgba(115, 159, 153, 0.12);
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--jdgm-paginate-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (min-width: 600px) {
    .product-badge {
      padding: 0.4rem 1rem;
      font-size: 0.8rem;
    }
  }

  .product-croqueta-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem;
    background: linear-gradient(135deg, #8B6B47 0%, #A0826D 100%);
    border-radius: 8px;
    margin-bottom: 0.85rem;
    box-shadow: 0 2px 8px rgba(139, 107, 71, 0.15);
    min-height: 2.5rem;
  }

  @media (min-width: 600px) {
    .product-croqueta-badge {
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      min-height: 3rem;
    }
  }

  .product-croqueta-placeholder {
    background: transparent;
    box-shadow: none;
    padding: 0.6rem 0.75rem;
    visibility: hidden;
  }

  @media (min-width: 600px) {
    .product-croqueta-placeholder {
      padding: 0.75rem 1rem;
    }
  }

  .croqueta-icon {
    font-size: 1rem;
    color: #FFE4C4;
    font-weight: bold;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    .croqueta-icon {
      font-size: 1.2rem;
    }
  }

  .croqueta-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .croqueta-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
    line-height: 1.3;
  }

  @media (min-width: 600px) {
    .croqueta-text {
      font-size: 0.9rem;
    }
  }

  .croqueta-disponibilidad {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    font-style: italic;
  }

  @media (min-width: 600px) {
    .croqueta-disponibilidad {
      font-size: 0.75rem;
    }
  }

  .croqueta-size {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.15);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-left: auto;
  }

  @media (min-width: 600px) {
    .croqueta-size {
      font-size: 0.85rem;
      padding: 0.25rem 0.6rem;
    }
  }

  .product-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 0.7rem 0;
    font-weight: 600;
    line-height: 1.2;
    min-height: 2rem;
    display: flex;
    align-items: center;
  }

  @media (min-width: 600px) {
    .product-name {
      font-size: 1.2rem;
      margin: 0 0 1rem 0;
      min-height: 2.5rem;
      line-height: 1.25;
    }
  }

  @media (min-width: 768px) {
    .product-name {
      font-size: 1.35rem;
      margin: 0 0 1.5rem 0;
      min-height: 3.5rem;
      line-height: 1.3;
    }
    
    .mixta-products-grid .product-name {
      font-size: 1.25rem;
      margin: 0 0 1rem 0;
      min-height: 3.2rem;
    }
  }

  .product-info {
    background: rgba(115, 159, 153, 0.05);
    border-radius: 5px;
    padding: 0.7rem 0.6rem;
    margin-bottom: 0.7rem;
  }

  @media (min-width: 600px) {
    .product-info {
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    .product-info {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mixta-products-grid .product-info {
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(115, 159, 153, 0.1);
    gap: 0.85rem;
  }

  @media (min-width: 600px) {
    .info-item {
      padding: 0.6rem 0;
      gap: 1rem;
    }
  }

  @media (min-width: 768px) {
    .info-item {
      padding: 0.75rem 0;
    }
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .info-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    .info-label {
      font-size: 0.85rem;
    }
  }

  @media (min-width: 768px) {
    .info-label {
      font-size: 0.95rem;
    }
  }

  .info-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
  }

  @media (min-width: 600px) {
    .info-value {
      font-size: 1.2rem;
    }
  }

  .product-link {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.8rem 1.5rem;
    background: var(--jdgm-paginate-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 2px solid var(--jdgm-paginate-color);
  }

  @media (min-width: 600px) {
    .product-link {
      margin-top: 2rem;
      padding: 0.9rem 1.75rem;
      font-size: 0.85rem;
    }
  }

  @media (min-width: 768px) {
    .product-link {
      margin-top: 2.5rem;
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }

  .product-link:hover {
    background: transparent;
    color: var(--jdgm-paginate-color);
    transform: translateX(5px);
  }

  .cart-action-section {
    margin: 1.5rem 0 1rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    width: 100%;
    max-width: 100%;
    padding: 0;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .cart-action-section {
      margin: 2rem 0 1.5rem 0;
      gap: 1rem;
    }
  }

  @media (min-width: 768px) {
    .cart-action-section {
      margin: 5rem 0 2.5rem 0;
      gap: 1.5rem;
    }
  }

  /* Contenedor de notificaciones apiladas - Sin overflow propio */
  .notifications-stack {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding: 0;
    box-sizing: border-box;
    overflow: visible; /* Evitar scroll múltiple */
  }

  @media (min-width: 500px) {
    .notifications-stack {
      gap: 0.9rem;
      margin-bottom: 1.4rem;
    }
  }

  @media (min-width: 650px) {
    .notifications-stack {
      gap: 1.1rem;
      margin-bottom: 1.6rem;
    }
  }

  @media (min-width: 900px) {
    .notifications-stack {
      gap: 1.3rem;
      margin-bottom: 2rem;
    }
  }

  /* Contenedor de botones de acción */
  .action-buttons-container {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 0;
    margin-top: 1.5rem;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .action-buttons-container {
      gap: 1.25rem;
      margin-top: 2rem;
    }
  }

  @media (min-width: 768px) {
    .action-buttons-container {
      flex-direction: row;
      justify-content: center;
      gap: 1.75rem;
      align-items: center;
    }
  }

  /* Estilos para los banners de descuento - Mobile First MEJORADO */
  .discount-banner {
    width: 100%;
    max-width: 100%;
    padding: 1.15rem 1rem;
    padding-right: 2.75rem; /* Espacio para el botón de cerrar */
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    box-sizing: border-box;
  }

  .discount-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0.3;
  }

  .discount-banner:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  /* Botón para cerrar notificaciones - Mejorado para móvil y táctil */
  .banner-close-button {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 1.85rem;
    height: 1.85rem;
    min-width: 1.85rem;
    min-height: 1.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    color: inherit;
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.25s ease;
    opacity: 0.75;
    padding: 0;
    z-index: 10;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent; /* Mejor para táctil */
  }

  .banner-close-button:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.18);
    transform: scale(1.08);
  }

  .banner-close-button:active {
    transform: scale(0.92);
    background: rgba(0, 0, 0, 0.22);
  }

  .first-order-banner {
    background: linear-gradient(135deg, #f5f0e8 0%, #e8dfc8 100%);
    border: 2px solid #c9b896;
    color: #5d5342;
  }

  .first-order-banner::before {
    color: #c9b896;
  }

  .subscription-banner {
    background: linear-gradient(135deg, #f0ebe3 0%, #ddd5c7 100%);
    border: 2px solid #b8ad94;
    color: #524a3d;
  }

  .subscription-banner::before {
    color: #b8ad94;
  }

  .discount-icon {
    font-size: 2.25rem;
    flex-shrink: 0;
    filter: grayscale(20%);
    margin-bottom: 0;
    line-height: 1;
  }

  .discount-content {
    flex: 1;
    text-align: left;
    width: 100%;
    max-width: 100%;
    padding-right: 0;
    overflow-x: hidden;
    overflow-y: visible;
    box-sizing: border-box;
  }

  .discount-title {
    font-family: 'Oswald', sans-serif; /* Tipografía consistente con títulos */
    font-size: 1.15rem; /* Más grande y visible en móvil */
    font-weight: 600;
    color: inherit;
    margin: 0 0 0.5rem 0;
    line-height: 1.35;
    letter-spacing: 0.3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .discount-description {
    font-family: 'Inter', sans-serif; /* Consistencia tipográfica */
    font-size: 0.98rem; /* Más grande y legible en móvil */
    color: inherit;
    opacity: 0.92;
    margin: 0 0 0.35rem 0;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .discount-description strong {
    font-weight: 700;
    color: inherit;
    white-space: nowrap;
  }

  .discount-note {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: inherit;
    opacity: 0.75;
    margin: 0;
    font-style: italic;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .subscription-link {
    display: inline-block;
    color: #8b7355;
    text-decoration: none;
    font-family: 'Inter', sans-serif; /* Consistencia tipográfica */
    font-weight: 600;
    font-size: 0.95rem; /* Más grande y visible en móvil */
    transition: all 0.3s ease;
    margin-top: 0.35rem;
    border-bottom: 1.5px solid transparent;
    padding: 0.15rem 0;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  .subscription-link:hover {
    color: #6d5a45;
    border-bottom-color: currentColor;
    transform: translateX(3px);
  }

  .apply-coupon-button {
    display: inline-block;
    background-color: #8b7355;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.85rem 1.5rem;
    font-family: 'Oswald', sans-serif; /* Consistencia con botones principales */
    font-size: 1rem; /* Más grande y visible en móvil */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.65rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    -webkit-tap-highlight-color: transparent;
  }

  .apply-coupon-button:hover {
    background-color: #6d5a45;
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.22);
  }

  .apply-coupon-button:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  /* Tablet pequeña */
  @media (min-width: 500px) {
    .discount-banner {
      padding: 1.3rem 1.15rem;
      padding-right: 3rem;
      gap: 0.85rem;
    }

    .discount-icon {
      font-size: 2.5rem;
    }

    .discount-title {
      font-size: 1.25rem;
      margin-bottom: 0.6rem;
    }

    .discount-description {
      font-size: 1.05rem;
    }

    .subscription-link {
      font-size: 1rem;
    }

    .apply-coupon-button {
      font-size: 1.05rem;
      padding: 0.9rem 1.6rem;
    }

    .banner-close-button {
      top: 0.5rem;
      right: 0.5rem;
      width: 1.75rem;
      height: 1.75rem;
      min-width: 1.75rem;
      min-height: 1.75rem;
      font-size: 1.4rem;
    }
  }

  /* Tablet */
  @media (min-width: 650px) {
    .discount-banner {
      width: 100%;
      flex-direction: row;
      align-items: center;
      padding: 1.5rem 1.4rem;
      padding-right: 3.75rem;
      gap: 1.25rem;
      margin: 0;
      border-radius: 14px;
    }

    .discount-icon {
      font-size: 2.75rem;
      margin-bottom: 0;
    }

    .discount-content {
      text-align: left;
      padding-right: 0;
    }

    .discount-title {
      font-size: 1.3rem;
      margin-bottom: 0.65rem;
      letter-spacing: 0.4px;
    }

    .discount-description {
      font-size: 1.08rem;
      line-height: 1.55;
    }

    .discount-note {
      font-size: 0.88rem;
    }

    .subscription-link {
      font-size: 1.05rem;
    }

    .apply-coupon-button {
      font-size: 1.05rem;
      padding: 0.8rem 1.5rem;
    }

    .banner-close-button {
      top: 0.7rem;
      right: 0.7rem;
      width: 2.25rem;
      height: 2.25rem;
      min-width: 2.25rem;
      min-height: 2.25rem;
      font-size: 1.65rem;
    }
  }

  /* Desktop */
  @media (min-width: 900px) {
    .discount-banner {
      width: 100%;
      max-width: 920px;
      margin: 0 auto;
      padding: 2rem 1.75rem;
      padding-right: 4.5rem;
      gap: 1.6rem;
    }

    .discount-icon {
      font-size: 3.25rem;
    }

    .discount-title {
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
    }

    .discount-description {
      font-size: 1.15rem;
      line-height: 1.6;
    }

    .discount-note {
      font-size: 0.95rem;
    }

    .subscription-link {
      font-size: 1.1rem;
    }

    .apply-coupon-button {
      font-size: 1.1rem;
      padding: 0.9rem 1.75rem;
    }

    .banner-close-button {
      top: 0.85rem;
      right: 0.85rem;
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
      font-size: 1.8rem;
    }
  }
      min-width: 2.5rem;
      min-height: 2.5rem;
      font-size: 1.8rem;
    }

    .banner-close-button {
      top: 1rem;
      right: 1rem;
      width: 2.75rem;
      height: 2.75rem;
      font-size: 2rem;
    }
  }

  /* Cart Button - Hereda estilos de .nav-button.primary */
  .cart-button {
    width: 100%;
    gap: 0.75rem;
    padding: 1.5rem 2rem !important;
    font-size: 1.1rem !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
  }

  .cart-button-icon {
    font-size: 1.4rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .cart-button-text {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 600px) {
    .cart-button {
      gap: 0.85rem;
      padding: 1.65rem 2.25rem !important;
      font-size: 1.15rem !important;
    }

    .cart-button-icon {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .cart-button {
      width: auto;
      min-width: 350px;
      flex: 1;
      max-width: 500px;
      gap: 1rem;
      padding: 1.75rem 2.5rem !important;
      font-size: 1.2rem !important;
    }

    .cart-button-icon {
      font-size: 1.6rem;
    }
  }

  /* Estilo para contenedor secundario */
  .action-buttons-container.secondary {
    margin-top: 1rem;
  }

  @media (min-width: 600px) {
    .action-buttons-container.secondary {
      margin-top: 1.25rem;
    }
  }

  /* Restart Survey Button - Más discreto y pequeño */
  .action-buttons-container .restart-survey-button,
  .cart-action-section .restart-survey-button,
  button.restart-survey-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    color: #999;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: none;
    position: relative;
    overflow: hidden;
    opacity: 0.7;
  }

  .action-buttons-container .restart-survey-button:hover,
  .cart-action-section .restart-survey-button:hover,
  button.restart-survey-button:hover {
    background: #f5f5f5;
    color: #666;
    transform: none;
    box-shadow: none;
    border-color: #ccc;
    opacity: 1;
  }

  .action-buttons-container .restart-survey-button:active,
  .cart-action-section .restart-survey-button:active,
  button.restart-survey-button:active {
    transform: scale(0.98);
    box-shadow: none;
  }

  @media (min-width: 600px) {
    .action-buttons-container .restart-survey-button,
    .cart-action-section .restart-survey-button,
    button.restart-survey-button {
      padding: 0.8rem 1.25rem;
      font-size: 0.85rem;
      letter-spacing: 0.4px;
      border-radius: 8px;
    }
  }

  @media (min-width: 768px) {
    .action-buttons-container .restart-survey-button,
    .cart-action-section .restart-survey-button,
    button.restart-survey-button {
      width: auto;
      min-width: 200px;
      max-width: 280px;
      padding: 0.85rem 1.5rem;
      font-size: 0.875rem;
    }
  }

  .recommendation-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid rgba(115, 159, 153, 0.1);
  }

  @media (min-width: 600px) {
    .recommendation-footer {
      margin-top: 2.5rem;
      padding-top: 2rem;
    }
  }

  @media (min-width: 768px) {
    .recommendation-footer {
      margin-top: 3rem;
    }
  }

  .footer-note {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
    margin: 0;
  }

  @media (min-width: 600px) {
    .footer-note {
      font-size: 0.95rem;
    }
  }

  /* Estilos adicionales para recomendación mejorada */
  .calorie-info {
    background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
    border-radius: 16px;
    padding: 1.5rem 1.25rem;
    margin-bottom: 2rem;
    border: 2px solid rgba(115, 159, 153, 0.2);
    box-shadow: 
      0 8px 24px rgba(115, 159, 153, 0.08),
      0 2px 8px rgba(115, 159, 153, 0.04);
    position: relative;
    overflow: hidden;
  }

  .calorie-info::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #5fb3a1 0%, #739f99 50%, #8fc4b8 100%);
    border-radius: 16px 16px 0 0;
  }

  @media (min-width: 600px) {
    .calorie-info {
      padding: 2rem 1.75rem;
      margin-bottom: 2.5rem;
      border-radius: 20px;
    }

    .calorie-info::before {
      height: 5px;
      border-radius: 20px 20px 0 0;
    }
  }

  @media (min-width: 768px) {
    .calorie-info {
      padding: 2.5rem 2rem;
      border-radius: 24px;
    }

    .calorie-info::before {
      height: 6px;
      border-radius: 24px 24px 0 0;
    }
  }

  .calorie-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.25rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1.25rem 0;
    font-weight: 700;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .calorie-title::before {
    content: '📊';
    font-size: 1.4rem;
  }

  @media (min-width: 600px) {
    .calorie-title {
      font-size: 1.4rem;
      margin: 0 0 1.5rem 0;
    }

    .calorie-title::before {
      font-size: 1.6rem;
    }
  }

  @media (min-width: 768px) {
    .calorie-title {
      font-size: 1.6rem;
      margin: 0 0 1.75rem 0;
    }

    .calorie-title::before {
      font-size: 1.8rem;
    }
  }

  .calorie-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  @media (min-width: 600px) {
    .calorie-details {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    .calorie-details {
      gap: 1.5rem;
    }
  }

  .calorie-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 0.85rem;
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.06) 0%, rgba(115, 159, 153, 0.02) 100%);
    border-radius: 12px;
    border: 1px solid rgba(115, 159, 153, 0.15);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .calorie-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #5fb3a1 0%, #739f99 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .calorie-item:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 20px rgba(115, 159, 153, 0.15),
      0 2px 6px rgba(115, 159, 153, 0.08);
    border-color: rgba(115, 159, 153, 0.3);
  }

  .calorie-item:hover::before {
    opacity: 1;
  }

  @media (min-width: 600px) {
    .calorie-item {
      padding: 1.15rem 1rem;
      border-radius: 14px;
    }

    .calorie-item::before {
      width: 4px;
    }
  }

  @media (min-width: 768px) {
    .calorie-item {
      padding: 1.25rem 1.15rem;
    }
  }

  .calorie-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  @media (min-width: 600px) {
    .calorie-label {
      font-size: 0.8rem;
      letter-spacing: 0.6px;
      gap: 0.4rem;
    }
  }

  @media (min-width: 768px) {
    .calorie-label {
      font-size: 0.85rem;
      gap: 0.45rem;
    }
  }

  .calorie-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.6rem;
    color: var(--jdgm-paginate-color);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  @media (min-width: 600px) {
    .calorie-value {
      font-size: 1.8rem;
    }
  }

  @media (min-width: 768px) {
    .calorie-value {
      font-size: 2rem;
    }
  }

  .products-section {
    margin: 2rem 0;
  }

  .products-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.6rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1.5rem 0;
    font-weight: 600;
    text-align: center;
  }

  .mixta-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5rem;
    color: var(--jdgm-paginate-color);
    margin: 0 0 0.75rem 0;
    font-weight: 600;
  }

  .mixta-note {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #666;
    margin: 0.5rem 0 0 0;
    font-style: italic;
  }

  .product-main {
    margin-bottom: 1.5rem;
  }

  .product-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #666;
    margin: 0.5rem 0 0 0;
  }

  .product-nutrition {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nutrition-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(115, 159, 153, 0.05);
    border-radius: 5px;
    transition: all 0.2s ease;
  }

  .nutrition-item:hover {
    background: rgba(115, 159, 153, 0.1);
  }

  .nutrition-item.highlight {
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.15) 0%, rgba(115, 159, 153, 0.08) 100%);
    border: 2px solid rgba(115, 159, 153, 0.2);
  }

  .nutrition-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .nutrition-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .nutrition-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
  }

  .nutrition-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
  }

  .footer-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    background: rgba(115, 159, 153, 0.05);
    border-radius: 5px;
  }

  .footer-card-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .footer-icon {
    font-size: 1.8rem;
    margin: 0;
    flex-shrink: 0;
  }

  .footer-card .footer-note {
    text-align: left;
    font-style: normal;
    margin: 0;
  }

  .restart-section {
    max-width: 800px;
    width: 100%;
    padding: 0 2rem;
  }

  .recommendation-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .pathology-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* ============================================ */
  /* PATHOLOGY CONTACT FORM STYLES */
  /* ============================================ */

  .pathology-contact-container {
    max-width: 100%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0.75rem 0.5rem;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (min-width: 768px) {
    .pathology-contact-container {
      max-width: 900px;
      padding: 1.5rem 1rem;
    }
  }
  @media (min-width: 768px) {
    .pathology-contact-container {
      padding: 3rem 2rem;
    }
  }

  .pathology-contact-header {
    text-align: center;
    margin-bottom: 1.25rem;
    padding: 0 0.25rem;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .pathology-contact-header {
      margin-bottom: 3rem;
      padding: 0;
    }
  }

  .pathology-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
    animation: pulse 2s ease-in-out infinite;
  }

  @media (min-width: 768px) {
    .pathology-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
  }

  .pathology-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  @media (min-width: 768px) {
    .pathology-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  }

  .pathology-subtitle {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 0.25rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  @media (min-width: 768px) {
    .pathology-subtitle {
      font-size: 1.1rem;
      padding: 0;
    }
  }

  .pathology-benefits {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
  }

  @media (min-width: 600px) {
    .pathology-benefits {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
      padding: 2rem;
    }
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    color: #333;
  }

  .benefit-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .benefit-text {
    font-weight: 500;
  }

  .pathology-contact-form {
    background: white;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  @media (min-width: 768px) {
    .pathology-contact-form {
      padding: 2.5rem;
    }
  }

  .form-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  @media (min-width: 768px) {
    .form-title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .form-input {
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 5px;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--jdgm-paginate-color);
    box-shadow: 0 0 0 3px rgba(115, 159, 153, 0.1);
  }

  .form-input::placeholder {
    color: #999;
  }

  .form-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 600px) {
    .form-actions {
      flex-direction: row;
      gap: 1rem;
      margin-top: 2rem;
    }
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    min-width: 0;
    padding: 1rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .btn-primary,
    .btn-secondary {
      padding: 1.25rem 2rem;
      font-size: 1.1rem;
      white-space: normal;
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--jdgm-paginate-color), #5a8a84);
    color: white;
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(115, 159, 153, 0.4);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #e0e0e0;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #e9ecef;
    border-color: #ccc;
  }

  .form-note {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #666;
    text-align: center;
    line-height: 1.5;
  }

  /* Success State */
  .pathology-contact-success {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 3rem 1rem;
    text-align: center;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
  }

  @media (min-width: 768px) {
    .pathology-contact-success {
      max-width: 600px;
      padding: 4rem 2rem;
    }
  }
  }

  .success-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    animation: pulse 1.5s ease-in-out;
  }

  .success-title {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
    margin-bottom: 1rem;
  }

  .success-message {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .success-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .btn-back-success {
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(135deg, var(--jdgm-paginate-color), #5a8a84);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.3);
  }

  .btn-back-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(115, 159, 153, 0.4);
  }

  .success-footer {
    margin-top: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 5px;
  }

  .success-footer p {
    margin: 0;
    color: #333;
    font-size: 0.95rem;
  }

  /* ============================================ */
  /* INTRO SCREEN STYLES */
  /* ============================================ */
      width: 100%;
    }
  }
`;
};

