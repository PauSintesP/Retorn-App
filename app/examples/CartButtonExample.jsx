/**
 * EJEMPLO COMPLETO: Botón "Agregar al Carrito" con Estilos Garantizados
 * 
 * Este archivo muestra 3 formas diferentes de asegurar que los estilos se apliquen:
 * 1. Con especificidad CSS aumentada (RECOMENDADO)
 * 2. Con estilos inline (garantizado pero no ideal)
 * 3. Con un custom hook que inyecta estilos (reutilizable)
 */

import { useState, useEffect } from 'react';

// ============================================
// SOLUCIÓN 1: Especificidad CSS Aumentada
// ============================================

export function CartButtonWithCSS() {
  return (
    <div className="action-buttons-container">
      <button className="add-to-cart-button">
        <span className="cart-icon">🛒</span>
        <span>Agregar productos al carrito</span>
      </button>
    </div>
  );
}

// ============================================
// SOLUCIÓN 2: Estilos Inline (Garantizado)
// ============================================

export function CartButtonInline() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.9rem 0.75rem',
    background: 'linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%)',
    backgroundSize: '200% 100%',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 6px 20px rgba(115, 159, 153, 0.3), 0 2px 6px rgba(115, 159, 153, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverStyles = {
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 10px 28px rgba(115, 159, 153, 0.35), 0 4px 10px rgba(115, 159, 153, 0.2)',
    backgroundPosition: '100% 0',
  };

  const activeStyles = {
    transform: 'translateY(-2px) scale(1.01)',
    boxShadow: '0 6px 20px rgba(115, 159, 153, 0.3), 0 2px 6px rgba(115, 159, 153, 0.15)',
  };

  const buttonStyles = {
    ...baseStyles,
    ...(isHovered && !isActive ? hoverStyles : {}),
    ...(isActive ? activeStyles : {}),
  };

  return (
    <button
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <span style={{ fontSize: '1.2em', lineHeight: 1, position: 'relative', zIndex: 1 }}>
        🛒
      </span>
      <span style={{ position: 'relative', zIndex: 1 }}>
        Agregar productos al carrito
      </span>
    </button>
  );
}

// ============================================
// SOLUCIÓN 3: Custom Hook con Estilos Inyectados
// ============================================

function useCartButtonStyles() {
  useEffect(() => {
    const styleId = 'cart-button-guaranteed-styles';
    
    // Verificar si ya existe
    if (document.getElementById(styleId)) return;

    // Crear elemento style
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
      .guaranteed-cart-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.9rem 0.75rem;
        background: linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%);
        background-size: 200% 100%;
        color: white;
        border: none;
        border-radius: 8px;
        font-family: 'Oswald', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 6px 20px rgba(115, 159, 153, 0.3),
          0 2px 6px rgba(115, 159, 153, 0.15);
        position: relative;
        overflow: hidden;
      }

      .guaranteed-cart-button > span {
        position: relative;
        z-index: 1;
      }

      .guaranteed-cart-button::before {
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
        z-index: 0;
      }

      .guaranteed-cart-button:hover::before {
        width: 300px;
        height: 300px;
      }

      .guaranteed-cart-button:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
          0 10px 28px rgba(115, 159, 153, 0.35),
          0 4px 10px rgba(115, 159, 153, 0.2);
        background-position: 100% 0;
      }

      .guaranteed-cart-button:active {
        transform: translateY(-2px) scale(1.01);
        box-shadow: 
          0 6px 20px rgba(115, 159, 153, 0.3),
          0 2px 6px rgba(115, 159, 153, 0.15);
      }

      .guaranteed-cart-icon {
        font-size: 1.2em;
        line-height: 1;
      }

      @media (min-width: 600px) {
        .guaranteed-cart-button {
          padding: 1rem 1.5rem;
          font-size: 0.88rem;
          letter-spacing: 1px;
        }
      }

      @media (min-width: 768px) {
        .guaranteed-cart-button {
          min-width: 160px;
          padding: 1.05rem 2rem;
          font-size: 0.92rem;
          letter-spacing: 1.5px;
        }
      }
    `;

    // Inyectar en el head
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
}

export function CartButtonWithHook() {
  useCartButtonStyles(); // ← Garantiza estilos

  return (
    <button className="guaranteed-cart-button">
      <span className="guaranteed-cart-icon">🛒</span>
      <span>Agregar productos al carrito</span>
    </button>
  );
}

// ============================================
// COMPONENTE DE DEMOSTRACIÓN
// ============================================

export default function CartButtonDemo() {
  const [selectedSolution, setSelectedSolution] = useState('css');

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '1rem',
        fontFamily: 'Oswald, sans-serif'
      }}>
        🛒 Botón "Agregar al Carrito" - Demostración
      </h1>

      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Selecciona una solución para ver cómo se garantiza la aplicación de estilos:
      </p>

      {/* Selector de solución */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setSelectedSolution('css')}
          style={{
            padding: '0.5rem 1rem',
            background: selectedSolution === 'css' ? '#739f99' : '#f5f5f5',
            color: selectedSolution === 'css' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Especificidad CSS
        </button>

        <button
          onClick={() => setSelectedSolution('inline')}
          style={{
            padding: '0.5rem 1rem',
            background: selectedSolution === 'inline' ? '#739f99' : '#f5f5f5',
            color: selectedSolution === 'inline' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Estilos Inline
        </button>

        <button
          onClick={() => setSelectedSolution('hook')}
          style={{
            padding: '0.5rem 1rem',
            background: selectedSolution === 'hook' ? '#739f99' : '#f5f5f5',
            color: selectedSolution === 'hook' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Custom Hook
        </button>
      </div>

      {/* Descripción de la solución */}
      <div style={{
        background: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        borderLeft: '4px solid #739f99'
      }}>
        {selectedSolution === 'css' && (
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
              ⭐ Especificidad CSS (Recomendado)
            </h3>
            <p style={{ margin: 0, color: '#666' }}>
              Aumenta la especificidad usando selectores múltiples:
              <code style={{ 
                background: '#fff', 
                padding: '0.2rem 0.4rem', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                display: 'block',
                marginTop: '0.5rem'
              }}>
                .action-buttons-container .add-to-cart-button
              </code>
            </p>
          </div>
        )}

        {selectedSolution === 'inline' && (
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
              ✅ Estilos Inline (Garantizado)
            </h3>
            <p style={{ margin: 0, color: '#666' }}>
              Aplica estilos directamente en el componente con el atributo <code>style</code>.
              Garantiza que se apliquen, pero no permite pseudo-clases como :hover.
            </p>
          </div>
        )}

        {selectedSolution === 'hook' && (
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
              🎯 Custom Hook (Reutilizable)
            </h3>
            <p style={{ margin: 0, color: '#666' }}>
              Inyecta estilos dinámicamente usando un hook de React.
              Combina lo mejor de ambos mundos: garantía y reutilización.
            </p>
          </div>
        )}
      </div>

      {/* Botón de demostración */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          Vista Previa:
        </h3>

        {selectedSolution === 'css' && <CartButtonWithCSS />}
        {selectedSolution === 'inline' && <CartButtonInline />}
        {selectedSolution === 'hook' && <CartButtonWithHook />}
      </div>

      {/* Código de ejemplo */}
      <div style={{
        marginTop: '2rem',
        background: '#1e1e1e',
        padding: '1rem',
        borderRadius: '8px',
        overflow: 'auto'
      }}>
        <pre style={{
          margin: 0,
          color: '#d4d4d4',
          fontSize: '0.85rem',
          fontFamily: 'monospace'
        }}>
          {selectedSolution === 'css' && `<div className="action-buttons-container">
  <button className="add-to-cart-button">
    <span className="cart-icon">🛒</span>
    <span>Agregar productos al carrito</span>
  </button>
</div>`}

          {selectedSolution === 'inline' && `<button
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.9rem 0.75rem',
    // ... más estilos
  }}
>
  <span>🛒</span>
  <span>Agregar productos al carrito</span>
</button>`}

          {selectedSolution === 'hook' && `import { useCartButtonStyles } from './hooks/useCartButtonStyles';

function MyComponent() {
  useCartButtonStyles(); // ← Inyecta estilos
  
  return (
    <button className="guaranteed-cart-button">
      <span className="guaranteed-cart-icon">🛒</span>
      <span>Agregar productos al carrito</span>
    </button>
  );
}`}
        </pre>
      </div>
    </div>
  );
}
