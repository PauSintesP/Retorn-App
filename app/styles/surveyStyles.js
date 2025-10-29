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

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .survey-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--jdgm-primary-color);
    position: relative;
    overflow: hidden;
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    z-index: 100;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #5fb3a1 0%, #739f99 50%, #8fc4b8 100%);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 20px rgba(115, 159, 153, 0.5);
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  }

  .survey-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.5rem;
    margin-top: 4px;
    position: relative;
    z-index: 1;
  }

  .question-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 1.2rem;
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(115, 159, 153, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    padding: 1.75rem 1rem;
    max-width: 95%;
    width: 100%;
    animation: ${direction === "forward" ? "fadeSlideIn" : "fadeSlideOut"} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1px solid rgba(115, 159, 153, 0.1);
    position: relative;
    margin: 0 auto;
  }

  /* Tablet y Desktop */
  @media (min-width: 768px) {
    .survey-content {
      padding: 3rem 1rem;
    }

    .question-card {
      padding: 3.5rem 2rem;
      border-radius: 1.6rem;
      max-width: 900px;
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
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .question-number {
    color: var(--jdgm-paginate-color);
    font-family: 'Oswald', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.75rem;
    display: inline-block;
    padding: 0.35rem 0.85rem;
    background: rgba(115, 159, 153, 0.08);
    border-radius: 20px;
  }

  .question-text {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--jdgm-primary-color);
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

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    margin-bottom: 0;
  }

  .option-button {
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
    border: 2px solid rgba(115, 159, 153, 0.15);
    border-radius: 5px;
    padding: 1rem 1.25rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: var(--jdgm-primary-color);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  @media (min-width: 768px) {
    .option-button {
      padding: 1.3rem 1.75rem;
      font-size: 1.05rem;
      gap: 1rem;
    }
  }

  .option-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .option-icon {
      font-size: 2rem;
    }
  }

  .option-label {
    flex: 1;
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
    transform: translateY(-3px) scale(1.01);
    box-shadow: 
      0 8px 24px rgba(115, 159, 153, 0.2),
      0 4px 8px rgba(115, 159, 153, 0.1);
  }

  .option-button.selected {
    background: linear-gradient(135deg, #d4ede8 0%, #c8e6df 100%);
    border-color: var(--jdgm-paginate-color);
    border-width: 2.5px;
    color: var(--jdgm-primary-color);
    box-shadow: 
      0 6px 20px rgba(115, 159, 153, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: scale(1.02);
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

  .text-input {
    width: 100%;
    padding: 1rem 1rem;
    font-size: 0.95rem;
    border-radius: 5px;
    border: 2px solid rgba(115, 159, 153, 0.2);
    outline: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter', sans-serif;
    background: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .text-input {
      padding: 1.3rem 1.25rem;
      font-size: 1.05rem;
    }
  }

  .text-input:focus {
    border-color: var(--jdgm-paginate-color);
    box-shadow: 
      0 8px 24px rgba(115, 159, 153, 0.15),
      0 0 0 4px rgba(115, 159, 153, 0.08);
    transform: translateY(-2px);
    background: white;
  }

  /* ============================================ */
  /* SELECTOR DE FECHAS PERSONALIZADO */
  /* ============================================ */

  .custom-date-input {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    background: white;
    border: 2px solid rgba(115, 159, 153, 0.3);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
  }

  .custom-date-input:hover {
    border-color: #739f99;
    box-shadow: 0 4px 16px rgba(115, 159, 153, 0.12);
  }

  .custom-date-input:focus {
    outline: none;
    border-color: #5fb3a1;
    box-shadow: 0 0 0 3px rgba(95, 179, 161, 0.15);
  }

  .date-input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .date-text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .date-display-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: #3E3E3E;
    line-height: 1.5;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .date-display-text.placeholder {
    color: #999;
    font-weight: 500;
  }

  .date-age-text {
    font-size: 0.875rem;
    color: #739f99;
    font-weight: 500;
    line-height: 1.5;
  }

  .date-chevron {
    font-size: 0.75rem;
    color: #739f99;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: 0.5rem;
  }

  .date-chevron.open {
    transform: rotate(180deg);
  }

  /* Panel de selección */
  .date-picker-panel {
    margin: 1.5rem auto 0;
    max-width: 100%;
    background: white;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 2px solid rgba(115, 159, 153, 0.2);
    animation: fadeSlideIn 0.3s ease;
  }

  .date-picker-header {
    padding-bottom: 1.25rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(115, 159, 153, 0.15);
  }

  .picker-title {
    font-size: 1rem;
    font-weight: 600;
    color: #5fb3a1;
    text-align: center;
  }

  .date-selectors-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .date-selector-column {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .date-selector-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #739f99;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0 0.5rem;
    text-align: center;
    margin-bottom: 0.25rem;
  }

  .date-selector-scroll {
    max-height: 149px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
    background: rgba(115, 159, 153, 0.04);
    border-radius: 5px;
    scrollbar-width: thin;
    scrollbar-color: rgba(115, 159, 153, 0.25) transparent;
  }

  .date-selector-scroll::-webkit-scrollbar {
    width: 5px;
  }

  .date-selector-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .date-selector-scroll::-webkit-scrollbar-thumb {
    background: rgba(115, 159, 153, 0.25);
    border-radius: 5px;
  }

  .date-selector-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 159, 153, 0.4);
  }

  .date-option {
    padding: 0.85rem 1rem;
    background: white;
    border: 1.5px solid rgba(115, 159, 153, 0.2);
    border-radius: 5px;
    font-size: 0.925rem;
    font-weight: 500;
    color: #3E3E3E;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .date-option:hover:not(.selected) {
    border-color: #739f99;
    background: rgba(95, 179, 161, 0.05);
    transform: translateY(-1px);
  }

  .date-option.selected {
    background: #5fb3a1;
    border-color: #5fb3a1;
    color: white;
    font-weight: 700;
    box-shadow: 0 3px 10px rgba(95, 179, 161, 0.25);
  }

  .date-picker-footer {
    display: flex;
    justify-content: center;
    padding-top: 1.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid rgba(115, 159, 153, 0.15);
  }

  .date-clear-btn {
    padding: 0.85rem 2rem;
    background: white;
    border: 1.5px solid rgba(115, 159, 153, 0.3);
    border-radius: 5px;
    color: #739f99;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .date-clear-btn:hover {
    background: rgba(115, 159, 153, 0.08);
    border-color: #739f99;
    color: #5fb3a1;
  }

  /* Responsive para móvil */
  @media (max-width: 600px) {
    .custom-date-input {
      max-width: 100%;
      padding: 1.25rem 1.5rem;
    }

    .date-input-content {
      gap: 1rem;
    }

    .date-picker-panel {
      max-width: 100%;
      padding: 1.5rem;
      margin: 1rem auto 0;
    }

    .date-selectors-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .date-selector-scroll {
      max-height: 180px;
      padding: 0.5rem 0.25rem;
    }

    .date-display-text {
      font-size: 0.975rem;
    }

    .date-age-text {
      font-size: 0.825rem;
    }

    .date-picker-footer {
      padding-top: 1.25rem;
    }

    .date-clear-btn {
      padding: 0.75rem 1.5rem;
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

  .two-columns-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  /* Variante con 3 columnas: columna izquierda, centro (Otros), derecha */
  .two-columns-container.three-column {
    grid-template-columns: 1fr auto 1fr;
    align-items: start;
  }

  /* Centro para el botón 'Otros' */
  .center-column {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ajustes para el botón 'Otros' cuando está en la columna central */
  .two-columns-container.three-column .otros-button {
    width: auto;
    min-width: 160px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .patologias-info-text {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0;
    color: #666;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    font-style: italic;
  }

  .otros-button {
    width: 100%;
  }

  .otros-text-container {
    animation: fadeSlideIn 0.3s ease-out;
  }

  /* Alerta de patología */
  .patologia-alert {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%);
    border-left: 4px solid #ff9800;
    border-radius: 5px;
    animation: fadeSlideIn 0.4s ease-out;
  }

  .alert-icon {
    font-size: 1.8rem;
    margin: 0;
    line-height: 1;
    flex-shrink: 0;
  }

  .alert-text {
    margin: 0;
    color: #e65100;
    font-family: 'Inter', sans-serif;
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
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  /* Si solo hay un botón (sin "Anterior"), centrarlo */
  .navigation-buttons:has(button:only-child) {
    justify-content: center;
  }

  .nav-button {
    flex: 1 1 auto;
    min-width: 120px;
    max-width: 100%;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 1.2px;
    position: relative;
    overflow: hidden;
  }

  .nav-button.full-width {
    flex: 1 1 100%;
  }

  @media (min-width: 768px) {
    .nav-button {
      flex: 0 0 auto;
      min-width: 160px;
      padding: 1.1rem 2.2rem;
      font-size: 0.95rem;
      letter-spacing: 1.5px;
    }
  }

  /* Contenedor interno para los botones dentro de la question-card */
  .controls-inner {
    width: 100%;
    margin-top: 1.5rem;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .controls-inner {
      margin-top: 2.5rem;
    }
  }

  /* Fila de botones de navegación */
  .navigation-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    width: 100%;
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
    align-items: flex-start;
    padding: 1rem;
    background: rgba(115, 159, 153, 0.05);
    border-radius: 8px;
    border: 1.5px solid rgba(115, 159, 153, 0.2);
    margin-bottom: 0.5rem;
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
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 0.75rem;
    margin-top: 0.125rem;
    cursor: pointer;
    accent-color: var(--jdgm-paginate-color);
  }

  .terms-checkbox-text {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--jdgm-primary-color);
  }

  .terms-link {
    color: var(--jdgm-paginate-color);
    text-decoration: underline;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .terms-link:hover {
    color: var(--jdgm-primary-color);
  }

  @media (min-width: 768px) {
    .terms-checkbox-input {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.875rem;
    }

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

  /* Columnas en móvil - una sola columna */
  .two-columns-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (min-width: 768px) {
    .two-columns-container {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  .patologia-alert {
    padding: 1rem;
    gap: 0.75rem;
  }

  @media (min-width: 768px) {
    .patologia-alert {
      padding: 1.5rem;
      gap: 1rem;
    }

    .alert-icon {
      font-size: 1.5rem;
    }

    .alert-text {
      font-size: 0.9rem;
    }
  }

  /* ============================================ */
  /* ESTILOS PARA RECOMENDACIÓN DE PRODUCTOS */
  /* ============================================ */
  
  .recommendation-container {
    max-width: 95%;
    width: 100%;
    padding: 0.75rem;
  }

  @media (min-width: 768px) {
    .recommendation-container {
      max-width: 900px;
      padding: 1.5rem;
    }
  }

  .recommendation-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem 1rem;
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.1) 0%, rgba(115, 159, 153, 0.05) 100%);
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    .recommendation-header {
      margin-bottom: 3rem;
      padding: 2rem;
    }
  }

  .recommendation-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.75rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    line-height: 1.2;
  }

  @media (min-width: 768px) {
    .recommendation-title {
      font-size: 2.5rem;
    }
  }

  .recommendation-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #666;
    margin: 0;
  }

  @media (min-width: 768px) {
    .recommendation-subtitle {
      font-size: 1.1rem;
    }
  }

  .mixta-info {
    background: rgba(115, 159, 153, 0.08);
    border-left: 4px solid var(--jdgm-paginate-color);
    padding: 1rem 1.25rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
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
    border-radius: 5px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(115, 159, 153, 0.1);
    border: 1px solid rgba(115, 159, 153, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
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
    height: 280px;
    margin: 0 0 1.5rem 0;
    overflow: hidden;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    border-radius: 8px;
    position: relative;
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
    margin-bottom: 1rem;
    min-height: 2rem;
  }

  .product-type {
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--jdgm-paginate-color);
    margin: 0;
    font-weight: 500;
  }

  .product-badge {
    padding: 0.4rem 1rem;
    background: rgba(115, 159, 153, 0.12);
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--jdgm-paginate-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .product-croqueta-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, #8B6B47 0%, #A0826D 100%);
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(139, 107, 71, 0.15);
    min-height: 3rem;
  }

  .product-croqueta-placeholder {
    background: transparent;
    box-shadow: none;
    padding: 0.75rem 1rem;
    visibility: hidden;
  }

  .croqueta-icon {
    font-size: 1.2rem;
    color: #FFE4C4;
    font-weight: bold;
  }

  .croqueta-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
  }

  .croqueta-size {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.15);
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    margin-left: auto;
  }

  @media (max-width: 767px) {
    .product-croqueta-badge {
      padding: 0.6rem 0.85rem;
      gap: 0.4rem;
      min-height: 2.75rem;
    }

    .product-croqueta-placeholder {
      padding: 0.6rem 0.85rem;
    }

    .croqueta-icon {
      font-size: 1rem;
    }

    .croqueta-text {
      font-size: 0.85rem;
    }

    .croqueta-size {
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
    }
  }

  .product-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1rem 0;
    font-weight: 600;
    line-height: 1.25;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
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
    padding: 1rem;
    margin-bottom: 1rem;
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
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(115, 159, 153, 0.1);
    gap: 1rem;
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
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .info-label {
      font-size: 0.95rem;
    }
  }

  .info-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    color: var(--jdgm-primary-color);
    font-weight: 600;
  }

  .product-link {
    display: inline-block;
    margin-top: auto;
    padding: 0.9rem 1.75rem;
    background: var(--jdgm-paginate-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 2px solid var(--jdgm-paginate-color);
  }

  @media (min-width: 768px) {
    .product-link {
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
    margin: 2rem 0 1.5rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .cart-action-section {
      margin: 5rem 0 2.5rem 0;
      gap: 1.5rem;
    }
  }

  /* Estilos para los banners de descuento */
  .discount-banner {
    width: 100%;
    max-width: 800px;
    padding: 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.75rem auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
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
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
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
    font-size: 2.5rem;
    flex-shrink: 0;
    filter: grayscale(20%);
  }

  .discount-content {
    flex: 1;
    text-align: left;
  }

  .discount-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: inherit;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    letter-spacing: 0.3px;
  }

  .discount-description {
    font-size: 0.9rem;
    color: inherit;
    opacity: 0.9;
    margin: 0 0 0.3rem 0;
    line-height: 1.5;
  }

  .discount-description strong {
    font-weight: 700;
    color: inherit;
  }

  .discount-note {
    font-size: 0.75rem;
    color: inherit;
    opacity: 0.7;
    margin: 0;
    font-style: italic;
  }

  .subscription-link {
    display: inline-block;
    color: #8b7355;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    margin-top: 0.25rem;
    border-bottom: 1px solid transparent;
  }

  .subscription-link:hover {
    color: #6d5a45;
    border-bottom-color: currentColor;
    transform: translateX(3px);
  }

  @media (min-width: 768px) {
    .discount-banner {
      padding: 2rem;
      gap: 1.5rem;
    }

    .discount-icon {
      font-size: 3rem;
    }

    .discount-title {
      font-size: 1.2rem;
    }

    .discount-description {
      font-size: 1rem;
    }

    .discount-note {
      font-size: 0.85rem;
    }

    .subscription-link {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .discount-banner {
      flex-direction: column;
      text-align: center;
      padding: 1.25rem;
    }

    .discount-content {
      text-align: center;
    }

    .discount-icon {
      font-size: 2rem;
    }
  }

  .add-to-cart-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.2rem 1.5rem;
    background: linear-gradient(135deg, var(--jdgm-paginate-color) 0%, #5a8a84 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 8px 20px rgba(115, 159, 153, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    .add-to-cart-button {
      width: auto;
      min-width: 300px;
      max-width: 320px;
      padding: 1.2rem 2rem;
      font-size: 1rem;
    }
  }

  .add-to-cart-button:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 15px 40px rgba(115, 159, 153, 0.4),
      0 6px 16px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #5a8a84 0%, var(--jdgm-paginate-color) 100%);
  }

  .add-to-cart-button:active {
    transform: translateY(-1px);
  }

  .restart-survey-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.2rem 1.5rem;
    background: white;
    color: var(--jdgm-paginate-color);
    border: 2px solid var(--jdgm-paginate-color);
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(115, 159, 153, 0.15);
  }

  @media (min-width: 768px) {
    .restart-survey-button {
      width: auto;
      min-width: 300px;
      max-width: 320px;
      padding: 1.2rem 2rem;
      font-size: 1rem;
    }
  }

  .restart-survey-button:hover {
    background: var(--jdgm-paginate-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(115, 159, 153, 0.3);
  }

  .restart-survey-button:active {
    transform: translateY(-1px);
  }

  .recommendation-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(115, 159, 153, 0.1);
  }

  .footer-note {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #666;
    font-style: italic;
    margin: 0;
  }

  /* Estilos adicionales para recomendación mejorada */
  .calorie-info {
    background: linear-gradient(135deg, rgba(115, 159, 153, 0.08) 0%, rgba(115, 159, 153, 0.03) 100%);
    border-radius: 5px;
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    border: 2px solid rgba(115, 159, 153, 0.15);
  }

  .calorie-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.3rem;
    color: var(--jdgm-primary-color);
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  .calorie-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .calorie-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: white;
    border-radius: 5px;
  }

  .calorie-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
  }

  .calorie-value {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    color: var(--jdgm-paginate-color);
    font-weight: 600;
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
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    background: rgba(115, 159, 153, 0.05);
    border-radius: 5px;
  }

  .footer-icon {
    font-size: 1.8rem;
    margin: 0;
    flex-shrink: 0;
  }

  .footer-card .footer-note {
    text-align: left;
    font-style: normal;
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
  }

  /* ============================================ */
  /* PATHOLOGY CONTACT FORM STYLES */
  /* ============================================ */

  .pathology-contact-container {
    max-width: 95%;
    margin: 0 auto;
    padding: 1.5rem 0.5rem;
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
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .pathology-contact-header {
      margin-bottom: 3rem;
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
    font-size: 0.95rem;
    color: #666;
    line-height: 1.6;
    max-width: 100%;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    .pathology-subtitle {
      font-size: 1.1rem;
    }
  }

  .pathology-benefits {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 5px;
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
    padding: 1.5rem;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
    padding: 1rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 768px) {
    .btn-primary,
    .btn-secondary {
      padding: 1.25rem 2rem;
      font-size: 1.1rem;
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
    max-width: 95%;
    margin: 0 auto;
    padding: 4rem 1rem;
    text-align: center;
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

