/**
 * Componente para mostrar la recomendación de productos
 */

export default function RecommendationResult({ recommendation, onRestart }) {
  if (!recommendation) {
    return null;
  }

  const { tipoAnimal, nombreMascota, kcalDiarias, recomendacion, factores, tipoCroqueta } = recommendation;

  // Función para agregar productos al carrito de Shopify con cupón
  const agregarAlCarrito = () => {
    const productos = [];
    
    if (recomendacion.tipo === "seca") {
      productos.push(recomendacion.productoSeco);
    } else if (recomendacion.tipo === "mixta") {
      productos.push(recomendacion.productoSeco);
      productos.push(recomendacion.productoHumedo);
    }

    // Construir URL del carrito con múltiples productos y cupón de descuento
    const cartItems = productos
      .map(p => {
        const variantId = p.varianteRecomendada.variantId;
        return variantId ? `${variantId}:1` : null;
      })
      .filter(Boolean)
      .join(',');

    if (cartItems) {
      // Agregar el cupón RET15 automáticamente al carrito
      window.open(`https://retorn.com/cart/${cartItems}?discount=RET15`, '_blank');
    } else {
      // Fallback: ir al carrito con el cupón
      window.open('https://retorn.com/cart?discount=RET15', '_blank');
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
              tipoCroqueta={tipoCroqueta}
              tipoAnimal={tipoAnimal}
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
            
            <div className="mixta-products-grid">
              <ProductCard
                producto={recomendacion.productoSeco}
                tipo="Alimento Seco"
                kcalDiarias={kcalDiarias}
                porcentaje={75}
                tipoCroqueta={tipoCroqueta}
                tipoAnimal={tipoAnimal}
              />
              
              <ProductCard
                producto={recomendacion.productoHumedo}
                tipo="Alimento Húmedo"
                kcalDiarias={kcalDiarias}
                porcentaje={25}
              />
            </div>
          </>
        )}
      </div>

      <div className="cart-action-section">
        {/* Mensaje de descuento para primer pedido */}
        <div className="discount-banner first-order-banner">
          <div className="discount-icon">🎉</div>
          <div className="discount-content">
            <h4 className="discount-title">¡Aprovecha tu primer pedido!</h4>
            <p className="discount-description">
              Usa el cupón <strong>RET15</strong> y obtén un <strong>15% de descuento</strong> solo para tu primer pedido.
            </p>
            <p className="discount-note">*El cupón se aplicará automáticamente al crear tu cesta</p>
          </div>
        </div>

        <button 
          onClick={agregarAlCarrito}
          className="add-to-cart-button"
        >
          Agregar {recomendacion.tipo === "mixta" ? "productos" : "producto"} al carrito
        </button>

        {/* Mensaje de suscripción */}
        <div className="discount-banner subscription-banner">
          <div className="discount-icon">⭐</div>
          <div className="discount-content">
            <h4 className="discount-title">¡Hazte suscriptor y disfruta de un 10% de descuento en todos tus pedidos!</h4>
            <a 
              href="https://retorn.com/pages/suscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="subscription-link"
            >
              Más información sobre la suscripción →
            </a>
          </div>
        </div>
        
        {onRestart && (
          <button 
            onClick={onRestart}
            className="restart-survey-button"
          >
            Realizar otro cuestionario
          </button>
        )}
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

function ProductCard({ producto, tipo, kcalDiarias, porcentaje, tipoCroqueta, tipoAnimal }) {
  const calcularDuracion = () => {
    const cantidadOriginal = producto.varianteRecomendada.cantidad;
    let gramosTotales;
    
    // Para productos con packs (ej: "185 gr x 12ud" o "400 gr x 12ud")
    const matchPack = cantidadOriginal.match(/(\d+(?:\.\d+)?)\s*gr\s*x\s*(\d+)\s*ud/i);
    if (matchPack) {
      const gramosPorUnidad = parseFloat(matchPack[1]);
      const unidades = parseFloat(matchPack[2]);
      gramosTotales = gramosPorUnidad * unidades;
      console.log(`Pack: ${gramosPorUnidad}g × ${unidades}ud = ${gramosTotales}g`);
    }
    // Si es en kg (sin pack)
    else if (cantidadOriginal.toLowerCase().includes("kg") && !cantidadOriginal.includes("x")) {
      const numeros = cantidadOriginal.match(/(\d+(?:\.\d+)?)/);
      gramosTotales = numeros ? parseFloat(numeros[1]) * 1000 : 0;
    }
    // Si es en gramos simples
    else {
      const numeros = cantidadOriginal.match(/(\d+(?:\.\d+)?)/);
      gramosTotales = numeros ? parseFloat(numeros[1]) : 0;
    }
    
    const dias = Math.round(gramosTotales / producto.gramosDiarios);
    console.log(`Duración: ${gramosTotales}g ÷ ${producto.gramosDiarios}g/día = ${dias} días`);

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

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-type">{tipo}</h3>
          <span className="product-badge">{producto.segmento}</span>
        </div>

        {/* Mostrar tipo de croqueta solo para productos secos de perro */}
        {tipoCroqueta && tipoAnimal === "Perro" && tipo.includes("Seco") && (
          <div className="product-croqueta-badge">
            <span className="croqueta-icon">🍪</span>
            <span className="croqueta-text">Croqueta {tipoCroqueta.tipo}</span>
            <span className="croqueta-size">{tipoCroqueta.diametro}</span>
          </div>
        )}

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
