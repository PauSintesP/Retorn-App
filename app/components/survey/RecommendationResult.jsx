/**
 * Componente para mostrar la recomendación de productos
 */

export default function RecommendationResult({ recommendation }) {
  if (!recommendation) {
    return null;
  }

  const { tipoAnimal, nombreMascota, kcalDiarias, recomendacion, factores } = recommendation;

  // Función para agregar productos al carrito de Shopify
  const agregarAlCarrito = () => {
    const productos = [];
    
    if (recomendacion.tipo === "seca") {
      productos.push(recomendacion.productoSeco);
    } else if (recomendacion.tipo === "mixta") {
      productos.push(recomendacion.productoSeco);
      productos.push(recomendacion.productoHumedo);
    }

    // Construir URL del carrito con múltiples productos
    const cartItems = productos
      .map(p => {
        const variantId = p.varianteRecomendada.variantId;
        return variantId ? `${variantId}:1` : null;
      })
      .filter(Boolean)
      .join(',');

    if (cartItems) {
      window.open(`https://retorn.com/cart/${cartItems}`, '_blank');
    } else {
      // Fallback: ir al carrito vacío
      window.open('https://retorn.com/cart', '_blank');
    }
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <h2 className="recommendation-title">
          Recomendación Personalizada para {nombreMascota}
        </h2>
        <p className="recommendation-subtitle">
          {tipoAnimal} • {Math.round(kcalDiarias)} kcal/día necesarias
        </p>
      </div>

      {factores && (
        <div className="calorie-info">
          <h3 className="calorie-title">Cálculo Nutricional</h3>
          <div className="calorie-details">
            <div className="calorie-item">
              <span className="calorie-label">Calorías diarias:</span>
              <span className="calorie-value">{Math.round(kcalDiarias)} kcal</span>
            </div>
            {factores.peso && (
              <div className="calorie-item">
                <span className="calorie-label">Peso actual:</span>
                <span className="calorie-value">{factores.peso} kg</span>
              </div>
            )}
            {factores.edadMeses !== undefined && (
              <div className="calorie-item">
                <span className="calorie-label">Edad:</span>
                <span className="calorie-value">
                  {factores.edadMeses < 12 
                    ? `${factores.edadMeses} meses` 
                    : `${Math.floor(factores.edadMeses / 12)} años`}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="products-section">
        {recomendacion.tipo === "seca" && (
          <>
            <h3 className="products-title">Tu Producto Recomendado</h3>
            <ProductCard
              producto={recomendacion.productoSeco}
              tipo="Alimentación Seca"
              kcalDiarias={kcalDiarias}
            />
          </>
        )}

        {recomendacion.tipo === "mixta" && (
          <>
            <div className="mixta-info">
              <h3 className="mixta-title">Alimentación Mixta</h3>
              <p className="mixta-description">
                Distribución óptima: 75% Alimento Seco + 25% Alimento Húmedo
              </p>
              <p className="mixta-note">
                Esta combinación proporciona las {Math.round(kcalDiarias)} kcal diarias necesarias
              </p>
            </div>
            
            <ProductCard
              producto={recomendacion.productoSeco}
              tipo="Alimento Seco (75%)"
              kcalDiarias={kcalDiarias}
              porcentaje={75}
            />
            
            <ProductCard
              producto={recomendacion.productoHumedo}
              tipo="Alimento Húmedo (25%)"
              kcalDiarias={kcalDiarias}
              porcentaje={25}
            />
          </>
        )}
      </div>

      <div className="cart-action-section">
        <button 
          onClick={agregarAlCarrito}
          className="add-to-cart-button"
        >
          Agregar {recomendacion.tipo === "mixta" ? "productos" : "producto"} al carrito
        </button>
      </div>

      <div className="recommendation-footer">
        <div className="footer-card">
          <p className="footer-note">
            Esta recomendación ha sido calculada específicamente para {nombreMascota} 
            considerando su edad, peso, actividad física y condiciones particulares.
          </p>
        </div>
        
        <div className="footer-card">
          <p className="footer-note">
            Las cantidades indicadas son aproximadas. Ajusta según la condición corporal 
            y consulta con tu veterinario ante cualquier duda.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ producto, tipo, kcalDiarias, porcentaje }) {
  const calcularDuracion = () => {
    const cantidadOriginal = producto.varianteRecomendada.cantidad.toLowerCase();
    const cantidadStr = cantidadOriginal.replace(/[^0-9.]/g, "");
    const cantidad = parseFloat(cantidadStr);
    
    // Detectar si está en gramos o kilogramos
    let gramosTotales;
    if (cantidadOriginal.includes('gr') && !cantidadOriginal.includes('kg')) {
      // Está en gramos (ej: "80 gr", "400 gr")
      gramosTotales = cantidad;
    } else {
      // Está en kilogramos (ej: "2 kg", "12kg")
      gramosTotales = cantidad * 1000;
    }
    
    const dias = Math.round(gramosTotales / producto.gramosDiarios);

    // Mostrar en semanas principalmente para mayor claridad
    if (dias < 7) {
      return `${dias} día${dias !== 1 ? 's' : ''}`;
    } else if (dias < 60) {
      const semanas = Math.floor(dias / 7);
      const diasRestantes = dias % 7;
      if (diasRestantes <= 1) {
        return `${semanas} semana${semanas !== 1 ? 's' : ''}`;
      } else {
        return `${semanas} semana${semanas !== 1 ? 's' : ''} y ${diasRestantes} días`;
      }
    } else {
      const meses = Math.floor(dias / 30);
      const diasRestantes = dias % 30;
      const semanasRestantes = Math.floor(diasRestantes / 7);
      
      if (semanasRestantes === 0) {
        return `${meses} mes${meses !== 1 ? 'es' : ''}`;
      } else {
        return `${meses} mes${meses !== 1 ? 'es' : ''} y ${semanasRestantes} semana${semanasRestantes !== 1 ? 's' : ''}`;
      }
    }
  };

  const calcularKcalPorcion = () => {
    if (porcentaje) {
      return Math.round((kcalDiarias * porcentaje) / 100);
    }
    return Math.round((producto.gramosDiarios * producto.kcalEmKg) / 1000);
  };

  return (
    <div className="product-card">
      {producto.imagen && (
        <div className="product-image-container">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="product-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      <div className="product-header">
        <h3 className="product-type">{tipo}</h3>
        <span className="product-badge">{producto.segmento}</span>
      </div>

      <div className="product-main">
        <h4 className="product-name">{producto.nombre}</h4>
        <p className="product-description">
          {producto.tipo === "Seco" ? "Alimento seco completo" : "Alimento húmedo premium"} 
          {" "}para {producto.animal.toLowerCase()}s
        </p>
      </div>
      
      <div className="product-nutrition">
        <div className="nutrition-item highlight">
          <span className="nutrition-icon">🍽️</span>
          <div className="nutrition-content">
            <span className="nutrition-label">Cantidad diaria</span>
            <span className="nutrition-value">{Math.round(producto.gramosDiarios)}g/día</span>
          </div>
        </div>

        <div className="nutrition-item">
          <span className="nutrition-icon">⚡</span>
          <div className="nutrition-content">
            <span className="nutrition-label">Energía por porción</span>
            <span className="nutrition-value">{calcularKcalPorcion()} kcal</span>
          </div>
        </div>

        <div className="nutrition-item">
          <span className="nutrition-icon">📦</span>
          <div className="nutrition-content">
            <span className="nutrition-label">Formato recomendado</span>
            <span className="nutrition-value">{producto.varianteRecomendada.cantidad}</span>
          </div>
        </div>

        <div className="nutrition-item">
          <div className="nutrition-content">
            <span className="nutrition-label">Duración aproximada</span>
            <span className="nutrition-value">{calcularDuracion()}</span>
          </div>
        </div>
      </div>

      <a
        href={producto.varianteRecomendada.link || producto.link}
        target="_blank"
        rel="noopener noreferrer"
        className="product-link"
      >
        Ver producto en tienda
      </a>
    </div>
  );
}
