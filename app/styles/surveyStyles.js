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
    --base-font-size: 16px;
  }

  /* Ajuste de tamaño base para pantallas pequeñas */
  @media (max-width: 380px), (max-height: 700px) {
    :root {
      --base-font-size: 14px;
    }
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 320px), (max-height: 600px) {
    :root {
      --base-font-size: 12px;
    }
    html {
      font-size: 12px;
    }
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: var(--base-font-size);
  }

  body {
    background: ${bg} !important;
  }

  @keyframes fadeSlideIn {
    0% {
      opacity: 0;
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeSlideOut {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
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

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .survey-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--jdgm-primary-color);
    position: relative;
    box-sizing: border-box;
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
    transition: width 0.5s ease-out;
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
    padding: 0.5rem 0.75rem 2rem 0.75rem;
    margin-top: 4px;
    position: relative;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
  }

  /* Alineación especial para la pregunta de patologías en móvil */
  .survey-content:has(.pathology-question) {
    justify-content: flex-start;
  }

  /* Alineación para la pantalla de recomendación - siempre desde arriba */
  .survey-content:has(.recommendation-container) {
    justify-content: flex-start;
    padding-top: 1.5rem;
  }

  /* Tablet y Desktop: volver al centrado para todas las preguntas */
  @media (min-width: 600px) {
    .survey-content:has(.pathology-question) {
      justify-content: center;
    }

    .survey-content:has(.recommendation-container) {
      justify-content: flex-start;
      padding-top: 1.25rem;
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
    padding: 0.85rem 0.75rem;
    max-width: 100%;
    width: 100%;
    min-width: 280px;
    animation: ${direction === "forward" ? "fadeSlideIn" : "fadeSlideOut"} 0.4s ease-out;
    border: 1px solid rgba(115, 159, 153, 0.1);
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  /* Tablet */
  @media (min-width: 600px) {
    .survey-content {
      padding: 0.75rem 1rem 2rem 1rem;
    }

    .question-card {
      padding: 1.35rem 1.15rem;
      border-radius: 1rem;
      max-width: 85%;
      min-width: 400px;
    }
  }

  /* Desktop */
  @media (min-width: 768px) {
    .survey-content {
      padding: 1rem 1rem 2rem 1rem;
    }

    .question-card {
      padding: 2rem 1.5rem;
      border-radius: 1.4rem;
      max-width: 700px;
      min-width: 500px;
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
    font-size: 0.55rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.35rem;
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: rgba(115, 159, 153, 0.08);
    border-radius: 20px;
  }

  .question-text {
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
    line-height: 1.25;
    margin: 0;
    padding: 0 0.1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    min-height: auto;
  }

  @media (min-width: 600px) {
    .question-header {
      margin-bottom: 1rem;
    }

    .question-number {
      font-size: 0.65rem;
      letter-spacing: 1.5px;
      padding: 0.3rem 0.7rem;
      margin-bottom: 0.6rem;
    }

    .question-text {
      font-size: 1.15rem;
      line-height: 1.35;
      padding: 0 0.35rem;
    }
  }

  @media (min-width: 768px) {
    .question-text {
      font-size: 1.5rem;
      line-height: 1.3;
    }
  }
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
    text-align: center;
  }

  @media (min-width: 768px) {
    .question-header {
      margin-bottom: 2rem;
      text-align: left;
    }

    .question-number {
      font-size: 0.7rem;
      letter-spacing: 2px;
      margin-bottom: 0.85rem;
      padding: 0.35rem 0.85rem;
    }

    .question-text {
      font-size: 1.8rem;
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
    padding: 0.65rem 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: var(--jdgm-primary-color);
    cursor: pointer;
    transition: all 0.25s ease-out;
    text-align: left;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 48px;
  }

  @media (min-width: 600px) {
    .option-button {
      padding: 0.85rem 1.1rem;
      font-size: 0.9rem;
      gap: 0.65rem;
      min-height: 56px;
    }
  }

  @media (min-width: 768px) {
    .option-button {
      padding: 1.1rem 1.5rem;
      font-size: 1rem;
      gap: 0.85rem;
      min-height: auto;
    }
  }

  .option-icon {
    font-size: 1rem;
    flex-shrink: 0;
    line-height: 1;
  }

  @media (min-width: 600px) {
    .option-icon {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 768px) {
    .option-icon {
      font-size: 1.7rem;
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
    padding: 0.75rem 0.9rem;
    font-size: 0.85rem;
    min-height: 54px;
    max-width: 400px;
    margin: 0 auto;
  }

  .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
  .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
    font-size: 1.4rem;
  }

  @media (min-width: 600px) {
    .options-container:has(.option-button:nth-child(2):last-child) .option-button,
    .options-container:has(.option-button:nth-child(3):last-child) .option-button {
      padding: 0.95rem 1.3rem;
      font-size: 0.95rem;
      min-height: 64px;
      max-width: 450px;
    }

    .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
    .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 768px) {
    .options-container:has(.option-button:nth-child(2):last-child) .option-button,
    .options-container:has(.option-button:nth-child(3):last-child) .option-button {
      padding: 1.15rem 1.6rem;
      font-size: 1rem;
      min-height: auto;
      max-width: 350px;
    }

    .options-container:has(.option-button:nth-child(2):last-child) .option-icon,
    .options-container:has(.option-button:nth-child(3):last-child) .option-icon {
      font-size: 1.9rem;
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
    transition: all 0.25s ease-out;
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
    transform: translateY(-1px);
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
    padding: 0.75rem 0.85rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-height: 48px;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .custom-date-input {
      width: calc(100% - 1rem);
      max-width: calc(100% - 1rem);
      margin: 0 0.5rem;
      padding: 1rem 1.1rem;
      min-height: 56px;
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
    font-size: 0.82rem;
    font-weight: 600;
    color: #3E3E3E;
    line-height: 1.25;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 600px) {
    .date-display-text {
      font-size: 0.92rem;
      line-height: 1.35;
    }
  }

  .date-display-text.placeholder {
    color: #999;
    font-weight: 500;
  }

  .date-age-text {
    font-size: 0.7rem;
    color: #739f99;
    font-weight: 600;
    line-height: 1.25;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 600px) {
    .date-age-text {
      font-size: 0.8rem;
      line-height: 1.35;
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
    margin: 1rem auto 0;
    max-width: 100%;
    background: white;
    border-radius: 12px;
    padding: 0.8rem 0.7rem;
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
    padding-bottom: 0.6rem;
    margin-bottom: 0.8rem;
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
    gap: 0.5rem;
    margin-bottom: 0.8rem;
  }

  .date-selector-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .date-selector-label {
    font-size: 0.7rem;
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
    max-height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.6rem 0.4rem;
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
    padding: 0.6rem 0.7rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.2);
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #3E3E3E;
    cursor: pointer;
    transition: all 0.25s ease-out;
    text-align: center;
    min-height: 40px;
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
    padding-top: 0.8rem;
    margin-top: 0.4rem;
    border-top: 2px solid rgba(115, 159, 153, 0.15);
  }

  .date-clear-btn {
    padding: 0.75rem 1.8rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.3);
    border-radius: 10px;
    color: #739f99;
    font-weight: 700;
    font-size: 0.85rem;
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
  }

  /* Pantallas de escritorio pequeñas o con poca altura */
  @media (min-width: 768px) and (max-height: 800px) {
    .date-picker-panel {
      padding: 1rem 1.2rem;
      margin: 0.5rem auto 0;
    }

    .date-picker-header {
      padding-bottom: 0.5rem;
      margin-bottom: 0.7rem;
    }

    .date-selectors-grid {
      gap: 0.7rem;
      margin-bottom: 0.7rem;
    }

    .date-selector-scroll {
      max-height: 150px;
      padding: 0.6rem 0.5rem;
      gap: 0.4rem;
    }

    .date-option {
      padding: 0.6rem 0.8rem;
      font-size: 0.9rem;
      min-height: 38px;
    }

    .date-picker-footer {
      padding-top: 0.6rem;
      margin-top: 0.3rem;
    }

    .date-clear-btn {
      padding: 0.7rem 1.5rem;
      font-size: 0.85rem;
    }
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
    transition: all 0.25s ease-out;
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
  /* POPUP DE PATOLOGÍA */
  /* ============================================ */
  
  .pathology-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;
  }

  .pathology-popup {
    background: white;
    border-radius: 16px;
    padding: 2rem 1.5rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideUp 0.3s ease-out;
    text-align: center;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .pathology-popup-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: #666;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.25rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .pathology-popup-close:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
    transform: rotate(90deg);
  }

  .pathology-popup-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .pathology-popup-text {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #4a4a4a;
    margin: 0 0 1.5rem 0;
    font-weight: 500;
  }

  .pathology-popup-button {
    background: linear-gradient(135deg, #6ec1b3 0%, #739f99 100%);
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.25s ease-out;
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.3);
  }

  .pathology-popup-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(115, 159, 153, 0.4);
  }

  @media (min-width: 600px) {
    .pathology-popup {
      padding: 2.5rem 2rem;
    }

    .pathology-popup-icon {
      font-size: 3.5rem;
    }

    .pathology-popup-text {
      font-size: 1.05rem;
    }

    .pathology-popup-button {
      padding: 1rem 2.5rem;
      font-size: 1rem;
    }
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

  /* ============================================ */
  /* MEJORA RESPONSIVIDAD PREGUNTA PATOLOGÍAS */
  /* ============================================ */
  
  /* Contenedor específico para pregunta de patologías */
  .patologias-question {
    position: relative;
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
    transition: all 0.25s ease-out;
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
    padding: 0.75rem 0.65rem;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
    text-transform: uppercase;
    letter-spacing: 0.4px;
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
      padding: 0.85rem 1.3rem;
      font-size: 0.82rem;
      letter-spacing: 0.8px;
      white-space: normal;
    }
  }

  @media (min-width: 768px) {
    .nav-button {
      flex: 0 0 auto;
      min-width: 160px;
      padding: 0.95rem 1.8rem;
      font-size: 0.88rem;
      letter-spacing: 1.2px;
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
    background: linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%);
    border-color: rgba(0, 0, 0, 0.12);
  }

  .nav-button.primary {
    background: linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%);
    background-size: 200% 100%;
    color: white;
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.3),
      0 2px 6px rgba(115, 159, 153, 0.15);
    border: 2px solid transparent;
  }

  .nav-button.primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #5fb3a1 0%, #6a8f8a 50%, #4fa091 100%);
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.35),
      0 2px 6px rgba(115, 159, 153, 0.2);
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
    transition: all 0.25s ease-out;
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
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(115, 159, 153, 0.35),
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
    min-height: auto;
    padding: 0.5rem;
    box-sizing: border-box;
    margin: 0 auto;
    animation: fadeSlideIn 0.4s ease-out;
  }

  @media (min-width: 600px) {
    .recommendation-container {
      max-width: 90%;
      padding: 1rem;
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
    margin-bottom: 1.25rem;
    margin-top: 0.5rem;
    padding: 1.75rem 1rem;
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.12) 0%, rgba(95, 179, 161, 0.08) 100%);
    border-radius: 16px;
    border: 1px solid rgba(115, 159, 153, 0.2);
    box-shadow: 
      0 4px 16px rgba(115, 159, 153, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 600px) {
    .recommendation-header {
      margin-bottom: 1.5rem;
      margin-top: 0.75rem;
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
      margin-bottom: 1.75rem;
      margin-top: 1rem;
      padding: 2rem 2rem;
      border-radius: 20px;
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
    padding: 0.75rem 0.6rem;
    margin-bottom: 0.85rem;
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(115, 159, 153, 0.1);
    border: 1px solid rgba(115, 159, 153, 0.15);
    transition: all 0.25s ease-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (min-width: 600px) {
    .product-card {
      padding: 1rem;
      margin-bottom: 1.25rem;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.08),
        0 4px 10px rgba(115, 159, 153, 0.1);
    }
  }

  @media (min-width: 768px) {
    .product-card {
      padding: 1.1rem;
      margin-bottom: 1.25rem;
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.08),
        0 8px 20px rgba(115, 159, 153, 0.1);
    }
    
    .mixta-products-grid .product-card {
      padding: 1rem;
    }
  }

  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 16px 40px rgba(0, 0, 0, 0.1),
      0 6px 15px rgba(115, 159, 153, 0.12);
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

  .product-badge-croqueta {
    padding: 0.3rem 0.7rem;
    background: linear-gradient(135deg, rgba(139, 107, 71, 0.12) 0%, rgba(160, 130, 109, 0.18) 100%);
    border: 1px solid rgba(139, 107, 71, 0.25);
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: #5d4a36;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (min-width: 600px) {
    .product-badge-croqueta {
      padding: 0.4rem 1rem;
      font-size: 0.8rem;
    }
  }



  .product-name {
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
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
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
      min-height: 2.5rem;
      line-height: 1.25;
    }
  }

  @media (min-width: 768px) {
    .product-name {
      font-size: 1.2rem;
      margin: 0 0 1.25rem 0;
      min-height: 3rem;
      line-height: 1.3;
    }
    
    .mixta-products-grid .product-name {
      font-size: 1.15rem;
      margin: 0 0 1rem 0;
      min-height: 2.8rem;
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
    transition: all 0.25s ease-out;
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.35rem;
    margin-bottom: 0.5rem;
    padding: 0;
    box-sizing: border-box;
    overflow: visible;
  }

  @media (min-width: 500px) {
    .notifications-stack {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.4rem;
      margin-bottom: 0.6rem;
    }
  }

  @media (min-width: 650px) {
    .notifications-stack {
      gap: 0.45rem;
      margin-bottom: 0.7rem;
    }
  }

  @media (min-width: 900px) {
    .notifications-stack {
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
  }

  /* Contenedor de botones de acción */
  .action-buttons-container {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.65rem;
    padding: 0;
    margin-top: 1rem;
    box-sizing: border-box;
  }

  @media (min-width: 600px) {
    .action-buttons-container {
      flex-direction: row;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    .action-buttons-container {
      gap: 1rem;
      margin-top: 1.5rem;
    }
  }

  /* Estilos para los banners de descuento - Mobile First MEJORADO */
  .discount-banner {
    width: 100%;
    max-width: 100%;
    padding: 0.45rem 0.5rem;
    padding-right: 1.6rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease-out;
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
    height: 2px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0.3;
  }

  .discount-banner:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  /* Botón para cerrar notificaciones - Mejorado para móvil y táctil */
  .banner-close-button {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 1.1rem;
    height: 1.1rem;
    min-width: 1.1rem;
    min-height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    color: inherit;
    font-size: 0.85rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.25s ease;
    opacity: 0.75;
    padding: 0;
    z-index: 10;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
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
    font-size: 1.1rem;
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
    font-family: 'Oswald', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    color: inherit;
    margin: 0 0 0.2rem 0;
    line-height: 1.2;
    letter-spacing: 0.15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .discount-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.58rem;
    color: inherit;
    opacity: 0.9;
    margin: 0 0 0.15rem 0;
    line-height: 1.25;
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
    font-size: 0.55rem;
    color: inherit;
    opacity: 0.72;
    margin: 0;
    font-style: italic;
    line-height: 1.25;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .subscription-link {
    display: inline-block;
    color: #8b7355;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.58rem;
    transition: all 0.3s ease;
    margin-top: 0.15rem;
    border-bottom: 1.5px solid transparent;
    padding: 0.08rem 0;
    line-height: 1.3;
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
    border-radius: 6px;
    padding: 0.55rem 1rem;
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.4rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    -webkit-tap-highlight-color: transparent;
  }

  .apply-coupon-button:hover {
    background-color: #6d5a45;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.22);
  }

  .apply-coupon-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  /* Tablet pequeña */
  @media (min-width: 500px) {
    .discount-banner {
      padding: 0.5rem 0.6rem;
      padding-right: 1.8rem;
      gap: 0.3rem;
    }

    .discount-icon {
      font-size: 1.2rem;
    }

    .discount-title {
      font-size: 0.68rem;
      margin-bottom: 0.25rem;
    }

    .discount-description {
      font-size: 0.6rem;
    }

    .subscription-link {
      font-size: 0.6rem;
    }

    .apply-coupon-button {
      font-size: 0.65rem;
      padding: 0.45rem 0.85rem;
    }

    .banner-close-button {
      top: 0.25rem;
      right: 0.25rem;
      width: 1.15rem;
      height: 1.15rem;
      min-width: 1.15rem;
      min-height: 1.15rem;
      font-size: 0.9rem;
    }
  }

  /* Tablet */
  @media (min-width: 650px) {
    .discount-banner {
      width: 100%;
      flex-direction: row;
      align-items: center;
      padding: 0.55rem 0.65rem;
      padding-right: 2rem;
      gap: 0.5rem;
      margin: 0;
      border-radius: 7px;
    }

    .discount-icon {
      font-size: 1.3rem;
      margin-bottom: 0;
    }

    .discount-content {
      text-align: left;
      padding-right: 0;
    }

    .discount-title {
      font-size: 0.7rem;
      margin-bottom: 0.25rem;
      letter-spacing: 0.2px;
    }

    .discount-description {
      font-size: 0.62rem;
      line-height: 1.3;
    }

    .discount-note {
      font-size: 0.58rem;
    }

    .subscription-link {
      font-size: 0.62rem;
    }

    .apply-coupon-button {
      font-size: 0.67rem;
      padding: 0.5rem 0.9rem;
    }

    .banner-close-button {
      top: 0.3rem;
      right: 0.3rem;
      width: 1.2rem;
      height: 1.2rem;
      min-width: 1.2rem;
      min-height: 1.2rem;
      font-size: 0.95rem;
    }
  }

  /* Desktop */
  @media (min-width: 900px) {
    .discount-banner {
      width: 100%;
      max-width: 920px;
      margin: 0 auto;
      padding: 0.6rem 0.75rem;
      padding-right: 2.2rem;
      gap: 0.6rem;
    }

    .discount-icon {
      font-size: 1.4rem;
    }

    .discount-title {
      font-size: 0.72rem;
      margin-bottom: 0.45rem;
    }

    .discount-description {
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .discount-note {
      font-size: 0.72rem;
    }

    .subscription-link {
      font-size: 0.8rem;
    }

    .apply-coupon-button {
      font-size: 0.85rem;
      padding: 0.65rem 1.3rem;
    }

    .banner-close-button {
      top: 0.55rem;
      right: 0.55rem;
      width: 1.7rem;
      height: 1.7rem;
      min-width: 1.7rem;
      min-height: 1.7rem;
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

  /* ===================================================== */
  /* BOTONES DE ACCIÓN - COPIADO EXACTO DE .nav-button   */
  /* ===================================================== */

  /* Botón de CARRITO - Estilo PRIMARIO (verde) - IGUAL que .nav-button.primary */
  .cart-button {
    /* Base - copiado de .nav-button */
    flex: 1;
    min-width: 0;
    max-width: none;
    padding: 0.75rem 0.65rem;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Primary - copiado de .nav-button.primary */
    background: linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%);
    background-size: 200% 100%;
    color: white;
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.3),
      0 2px 6px rgba(115, 159, 153, 0.15);
    border: 2px solid transparent;
  }

  .cart-button::before {
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

  .cart-button:hover::before {
    width: 300px;
    height: 300px;
  }

  .cart-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #5fb3a1 0%, #6a8f8a 50%, #4fa091 100%);
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.35),
      0 2px 6px rgba(115, 159, 153, 0.2);
  }

  @media (min-width: 600px) {
    .cart-button {
      padding: 0.85rem 1.3rem;
      font-size: 0.82rem;
      letter-spacing: 0.8px;
      white-space: normal;
    }
  }

  @media (min-width: 768px) {
    .cart-button {
      flex: 0 0 auto;
      min-width: 160px;
      padding: 0.95rem 1.8rem;
      font-size: 0.88rem;
      letter-spacing: 1.2px;
    }
  }

  /* Botón RESTART - Estilo SECUNDARIO (gris) - IGUAL que .nav-button.secondary */
  .restart-survey-button {
    /* Base - copiado de .nav-button */
    flex: 1;
    min-width: 0;
    max-width: none;
    padding: 0.75rem 0.65rem;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Secondary - copiado de .nav-button.secondary */
    background: linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%);
    color: #666;
    border: 2px solid rgba(0, 0, 0, 0.06);
  }

  .restart-survey-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%);
    border-color: rgba(0, 0, 0, 0.12);
  }

  @media (min-width: 600px) {
    .restart-survey-button {
      padding: 0.85rem 1.3rem;
      font-size: 0.82rem;
      letter-spacing: 0.8px;
      white-space: normal;
    }
  }

  @media (min-width: 768px) {
    .restart-survey-button {
      flex: 0 0 auto;
      min-width: 160px;
      padding: 0.95rem 1.8rem;
      font-size: 0.88rem;
      letter-spacing: 1.2px;
    }
  }

  /* ===================================================== */
  /* CONTENEDOR DE BOTONES - Layout en columna centrado  */
  /* ===================================================== */
  
  .action-buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 600px) {
    .action-buttons-container {
      gap: 1rem;
      max-width: 500px;
    }
  }

  @media (min-width: 900px) {
    .action-buttons-container {
      gap: 1.25rem;
      max-width: 600px;
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
    padding: 1.25rem 1rem;
    margin-bottom: 1.25rem;
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
      padding: 1.5rem 1.25rem;
      margin-bottom: 2rem;
      border-radius: 20px;
    }

    .calorie-info::before {
      height: 5px;
      border-radius: 20px 20px 0 0;
    }
  }

  @media (min-width: 768px) {
    .calorie-info {
      padding: 1.5rem 1.5rem;
      margin-bottom: 1.75rem;
      border-radius: 20px;
    }

    .calorie-info::before {
      height: 6px;
      border-radius: 24px 24px 0 0;
    }
  }

  .calorie-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1rem 0;
    font-weight: 700;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .calorie-title::before {
    font-size: 1.2rem;
  }

  @media (min-width: 600px) {
    .calorie-title {
      font-size: 1.25rem;
      margin: 0 0 1.25rem 0;
    }

    .calorie-title::before {
      font-size: 1.4rem;
    }
  }

  @media (min-width: 768px) {
    .calorie-title {
      font-size: 1.4rem;
      margin: 0 0 1.5rem 0;
    }

    .calorie-title::before {
      font-size: 1.6rem;
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
    margin: 1.5rem 0;
  }

  .products-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.3rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1.25rem 0;
    font-weight: 600;
    text-align: center;
  }

  .mixta-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.25rem;
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



  .product-nutrition {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nutrition-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  @media (min-width: 500px) {
    .nutrition-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  @media (min-width: 768px) {
    .nutrition-grid {
      gap: 0.65rem;
    }
  }

  .nutrition-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.7rem;
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
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    .nutrition-icon {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .nutrition-icon {
      font-size: 1.55rem;
    }
  }

  .nutrition-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
  }

  .nutrition-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    color: #666;
    font-weight: 500;
  }

  @media (min-width: 600px) {
    .nutrition-label {
      font-size: 0.75rem;
    }
  }

  @media (min-width: 768px) {
    .nutrition-label {
      font-size: 0.78rem;
    }
  }

  .nutrition-value {
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 600px) {
    .nutrition-value {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    .nutrition-value {
      font-size: 1.05rem;
    }
  }

  .nutrition-duration {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 0.85rem;
    background: rgba(115, 159, 153, 0.08);
    border-radius: 8px;
    text-align: center;
    margin-top: 0.25rem;
  }

  .nutrition-duration-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
  }

  .nutrition-duration-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.15rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
  }

  @media (min-width: 600px) {
    .nutrition-duration {
      padding: 0.95rem;
    }

    .nutrition-duration-label {
      font-size: 0.85rem;
    }

    .nutrition-duration-value {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    .nutrition-duration {
      padding: 1rem;
    }

    .nutrition-duration-label {
      font-size: 0.88rem;
    }

    .nutrition-duration-value {
      font-size: 1.3rem;
    }
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
    animation: fadeSlideIn 0.4s ease-out;
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

