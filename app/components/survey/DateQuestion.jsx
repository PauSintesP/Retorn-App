import { useState, useRef, useEffect } from "react";

/**
 * Componente para renderizar preguntas de tipo fecha con selector personalizado
 */

export default function DateQuestion({ question, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const containerRef = useRef(null);

  // Meses en español
  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  // Generar años (últimos 30 años)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Generar días según el mes y año seleccionado
  const getDaysInMonth = (month, year) => {
    if (!month || !year) return 31;
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedMonth, selectedYear) },
    (_, i) => String(i + 1).padStart(2, "0")
  );

  // Inicializar valores desde value prop
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split("-");
      setSelectedYear(year);
      setSelectedMonth(month);
      setSelectedDay(day);
    }
  }, [value]);

  // Actualizar value cuando cambian los selectores
  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const newDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
      onChange(newDate);
      setIsOpen(false);
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const formatDisplayDate = () => {
    if (!value) return "Selecciona la fecha de nacimiento";
    
    const [year, month, day] = value.split("-");
    const monthName = months.find(m => m.value === month)?.label || "";
    return `${day} de ${monthName} de ${year}`;
  };

  const getAgeText = () => {
    if (!value) return "";
    
    const birthDate = new Date(value);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    let ageText = "";
    if (years > 0) {
      ageText = `${years} año${years !== 1 ? 's' : ''}`;
      if (months > 0) {
        ageText += ` y ${months} mes${months !== 1 ? 'es' : ''}`;
      }
    } else if (months > 0) {
      ageText = `${months} mes${months !== 1 ? 'es' : ''}`;
    } else {
      ageText = "Recién nacido";
    }
    
    return `· Aproximadamente ${ageText}`;
  };

  return (
    <div className="options-container" ref={containerRef}>
      {/* Input principal que abre el selector */}
      <div 
        className="custom-date-input"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Seleccionar fecha de nacimiento"
      >
        <div className="date-input-content">
          <div className="date-text-container">
            <span className={`date-display-text ${!value ? 'placeholder' : ''}`}>
              {formatDisplayDate()}
            </span>
            {value && (
              <span className="date-age-text">
                {getAgeText()}
              </span>
            )}
          </div>
          <div className={`date-chevron ${isOpen ? 'open' : ''}`}>▼</div>
        </div>
      </div>

      {/* Panel de selección desplegable */}
      {isOpen && (
        <div className="date-picker-panel">
          <div className="date-picker-header">
            <span className="picker-title">Selecciona la fecha de nacimiento</span>
          </div>

          <div className="date-selectors-grid">
            {/* Selector de Día */}
            <div className="date-selector-column">
              <label className="date-selector-label">Día</label>
              <div className="date-selector-scroll">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`date-option ${selectedDay === day ? 'selected' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Mes */}
            <div className="date-selector-column">
              <label className="date-selector-label">Mes</label>
              <div className="date-selector-scroll">
                {months.map((month) => (
                  <button
                    key={month.value}
                    type="button"
                    className={`date-option ${selectedMonth === month.value ? 'selected' : ''}`}
                    onClick={() => setSelectedMonth(month.value)}
                  >
                    {month.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Año */}
            <div className="date-selector-column">
              <label className="date-selector-label">Año</label>
              <div className="date-selector-scroll">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`date-option ${selectedYear === String(year) ? 'selected' : ''}`}
                    onClick={() => setSelectedYear(String(year))}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="date-picker-footer">
            <button
              type="button"
              className="date-clear-btn"
              onClick={() => {
                setSelectedDay("");
                setSelectedMonth("");
                setSelectedYear("");
                onChange("");
                setIsOpen(false);
              }}
            >
              Limpiar selección
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
