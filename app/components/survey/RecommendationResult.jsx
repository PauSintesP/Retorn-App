/**
 * Componente para mostrar la recomendación de productos
 */

import { useState } from "react";

export default function RecommendationResult({ recommendation, onBack = () => { }, onRestart = () => { } }) {
  const [showFirstOrderBanner, setShowFirstOrderBanner] = useState(true);
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(true);
  const [cuponCopiado, setCuponCopiado] = useState(false);

  if (!recommendation) {
    return null;
  }

  const { tipoAnimal, nombreMascota, kcalDiarias, recomendacion, factores, tipoCroqueta } = recommendation;

  // Función para copiar el cupón al portapapeles
  const copiarCupon = async () => {
    try {
      await navigator.clipboard.writeText('RET15');
      setCuponCopiado(true);
      console.log('✅ Cupón RET15 copiado al portapapeles');

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setCuponCopiado(false);
      }, 2000);
    } catch (error) {
      console.error('❌ Error al copiar cupón:', error);
      // Fallback para navegadores que no soporten clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = 'RET15';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCuponCopiado(true);
        setTimeout(() => {
          setCuponCopiado(false);
        }, 2000);
      } catch (err) {
        console.error('❌ Fallback también falló:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Función para calcular la cantidad necesaria basada en los gramos diarios y el formato del producto
  const calcularCantidadProducto = (producto) => {
    if (!producto || !producto.varianteRecomendada) return 1;

    const cantidadOriginal = producto.varianteRecomendada.cantidad || "";
    const cantidadLower = cantidadOriginal.toLowerCase();

    let gramosPorUnidad = 0;

    // Para productos con packs: "Caja 12 latas 185 g" o "Caja 18x80gr"
    const matchCaja = cantidadLower.match(/caja\s*(\d+)(?:\s*latas)?\s*(?:x\s*)?(\d+(?:\.\d+)?)\s*g/i);
    if (matchCaja) {
      const unidades = parseFloat(matchCaja[1]);
      const gramosPorLata = parseFloat(matchCaja[2]);
      gramosPorUnidad = gramosPorLata * unidades;
    }
    // Para formato "185 gr x 12ud" o "400 gr x 12ud"
    else {
      const matchPack = cantidadLower.match(/(\d+(?:\.\d+)?)\s*gr?\s*x\s*(\d+)\s*ud/i);
      if (matchPack) {
        const gramosPorLata = parseFloat(matchPack[1]);
        const unidades = parseFloat(matchPack[2]);
        gramosPorUnidad = gramosPorLata * unidades;
      }
      // Si es en kg (sin pack)
      else if (cantidadLower.includes("kg") && !cantidadLower.includes("x")) {
        const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
        gramosPorUnidad = numeros ? parseFloat(numeros[1]) * 1000 : 0;
      }
      // Si es en gramos simples (lata individual)
      else {
        const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
        gramosPorUnidad = numeros ? parseFloat(numeros[1]) : 0;
      }
    }

    if (!gramosPorUnidad || gramosPorUnidad <= 0 || !producto.gramosDiarios) return 1;

    // Calcular cuántos días dura una unidad
    const diasPorUnidad = gramosPorUnidad / producto.gramosDiarios;

    // Si dura más de 25 días, devolver 1 unidad
    // Si dura menos, calcular cuántas unidades necesita para aproximadamente 1 mes
    if (diasPorUnidad >= 25) {
      return 1;
    } else {
      return Math.max(1, Math.ceil(30 / diasPorUnidad));
    }
  };



  // Función para agregar productos al carrito de Shopify
  const agregarAlCarrito = () => {
    try {
      const items = [];

      console.log('🛒 Construyendo carrito de compras...');

      // Añadir producto seco si existe
      if (recomendacion.productoSeco?.varianteRecomendada?.variantId) {
        const cantidad = calcularCantidadProducto(recomendacion.productoSeco);
        const variantId = recomendacion.productoSeco.varianteRecomendada.variantId;
        items.push(`${variantId}:${cantidad}`);
        console.log(`  ✅ Producto seco: ${recomendacion.productoSeco.nombre}`);
        console.log(`     - Variant ID: ${variantId}`);
        console.log(`     - Cantidad: ${cantidad} unidad(es)`);
      }

      // Añadir producto húmedo si existe (alimentación mixta)
      if (recomendacion.productoHumedo?.varianteRecomendada?.variantId) {
        const cantidad = calcularCantidadProducto(recomendacion.productoHumedo);
        const variantId = recomendacion.productoHumedo.varianteRecomendada.variantId;
        items.push(`${variantId}:${cantidad}`);
        console.log(`  ✅ Producto húmedo: ${recomendacion.productoHumedo.nombre}`);
        console.log(`     - Variant ID: ${variantId}`);
        console.log(`     - Cantidad: ${cantidad} unidad(es)`);
      }

      // Validar que haya productos
      if (items.length === 0) {
        console.error('❌ No hay productos para agregar al carrito');
        return;
      }

      // Construir la URL del carrito de Shopify sin cupón
      const cartUrl = `https://retorn.com/cart/${items.join(',')}`;

      console.log(`  🔗 URL del carrito: ${cartUrl}`);
      console.log('  🚀 Abriendo carrito en nueva pestaña...');
      console.log('  ℹ️ Recuerda aplicar el cupón RET15 en el checkout');

      // Abrir el carrito en nueva pestaña
      window.open(cartUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('❌ Error al agregar productos al carrito:', error);
    }
  };

  return (
    <div className="recommendation-container">
      <button
        className="back-button"
        onClick={onBack}
        aria-label="Volver a la última pregunta"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Volver</span>
      </button>

      {factores && (
        <div className="calorie-info">
          <h3 className="calorie-title">
            Cálculo Nutricional para {nombreMascota} {tipoAnimal === "Perro" ? "🐶" : "🐱"}
          </h3>
          {recomendacion.tipo === "mixta" && (
            <p className="mixta-note" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#666' }}>
              <strong>Alimentación Mixta:</strong> Distribución óptima 75% Alimento Seco + 25% Alimento Húmedo. Esta combinación proporciona las {Math.round(kcalDiarias)} kcal diarias necesarias.
            </p>
          )}
          <div className="calorie-details">
            <div className="calorie-item">
              <span className="calorie-label">⚡ Calorías diarias</span>
              <span className="calorie-value">{Math.round(kcalDiarias)} kcal</span>
            </div>
            {factores.peso && (
              <div className="calorie-item">
                <span className="calorie-label">⚖️ Peso actual</span>
                <span className="calorie-value">{factores.peso} kg</span>
              </div>
            )}
            {factores.edadMeses !== undefined && (
              <div className="calorie-item">
                <span className="calorie-label">🎂 Edad</span>
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
        {recomendacion.tipo === "seca" && recomendacion.productoSeco && (
          <>
            <h3 className="products-title">Tu Producto Recomendado</h3>
            <ProductCard
              producto={recomendacion.productoSeco}
              tipo="Alimento Seco"
              kcalDiarias={kcalDiarias}
              tipoCroqueta={tipoCroqueta}
              tipoAnimal={tipoAnimal}
            />
          </>
        )}

        {recomendacion.tipo === "mixta" && (
          <>
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
        {/* Notificaciones apiladas */}
        <div className="notifications-stack">
          {/* Mensaje de descuento para primer pedido */}
          {showFirstOrderBanner && (
            <div style={{
              backgroundColor: '#f9f3e8',
              border: '1px solid #e8dcc8',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2.8rem',
                flexShrink: 0,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>🎉</div>
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div>
                  <h4 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 0.3rem 0',
                    lineHeight: '1.2'
                  }}>¡Aprovecha tu primer pedido!</h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    color: '#666',
                    margin: '0',
                    lineHeight: '1.3'
                  }}>
                    Usa este cupón y obtén un <strong style={{ color: '#333' }}>15% de descuento</strong>
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: '#fff',
                  border: '1px solid #d5d5d5',
                  borderRadius: '8px',
                  padding: '0.5rem 0.6rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: '#333',
                      letterSpacing: '0.5px'
                    }}>RET15</div>
                  </div>
                  <button
                    onClick={copiarCupon}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      backgroundColor: cuponCopiado ? '#e8f5e9' : '#f5f5f5',
                      border: `1.5px solid ${cuponCopiado ? '#81c784' : '#d5d5d5'}`,
                      borderRadius: '6px',
                      padding: '0.5rem 0.9rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: cuponCopiado ? '#2e7d32' : '#555',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: 'nowrap'
                    }}
                    title="Copiar código al portapapeles"
                  >
                    {cuponCopiado ? (
                      <>Copiado ✓</>
                    ) : (
                      <>Copiar 📋</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje de suscripción */}
          {showSubscriptionBanner && (
            <div style={{
              backgroundColor: '#f9f3e8',
              border: '1px solid #e8dcc8',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2.8rem',
                flexShrink: 0,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>⭐</div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.2'
                }}>¡Hazte suscriptor y disfruta de un 10% de descuento en todos tus pedidos!</h4>
                <a
                  href="https://retorn.com/pages/suscripcion"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    color: '#739f99',
                    fontWeight: '500',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#5fb3a1'}
                  onMouseLeave={(e) => e.target.style.color = '#739f99'}
                >
                  Más información sobre la suscripción →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div
          className="action-buttons-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.75rem',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          <button
            onClick={onRestart}
            className="restart-survey-button"
            style={{
              flex: '1',
              padding: '0.85rem 0.75rem',
              border: '2px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '8px',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s ease-out',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'normal',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%)',
              color: '#666'
            }}
          >
            Realizar otro cuestionario
          </button>

          <button
            onClick={agregarAlCarrito}
            className="cart-button"
            style={{
              flex: '1',
              padding: '0.85rem 0.75rem',
              border: '2px solid transparent',
              borderRadius: '8px',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s ease-out',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'normal',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6ec1b3 0%, #739f99 50%, #5fb3a1 100%)',
              backgroundSize: '200% 100%',
              color: 'white',
              boxShadow: '0 6px 20px rgba(115, 159, 153, 0.3), 0 2px 6px rgba(115, 159, 153, 0.15)'
            }}
          >
            Agregar los productos al carrito
          </button>
        </div>
      </div>

      <div className="recommendation-footer">
        <div className="footer-card">
          <h4 className="footer-card-title">📊 Cálculo de cantidades</h4>
          <p className="footer-note">
            Las cantidades se calculan según las calorías que necesita {nombreMascota}{" "}
            ({Math.round(kcalDiarias)} kcal/día) y la densidad energética de cada producto.
            {recomendacion.tipo === "mixta" && (
              <> En alimentación mixta, el 75% de las calorías provienen del alimento seco y el 25% del alimento húmedo.</>
            )}
          </p>
        </div>

        <div className="footer-card">
          <h4 className="footer-card-title">🎯 Personalización</h4>
          <p className="footer-note">
            Esta recomendación ha sido calculada específicamente para {nombreMascota}{" "}
            considerando su edad, peso, actividad física y condiciones particulares.
          </p>
        </div>

        <div className="footer-card">
          <h4 className="footer-card-title">⚠️ Ajustes</h4>
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
  if (!producto) {
    return (
      <div className="product-card">
        <div className="product-content">
          <div className="product-header">
            <h3 className="product-type">{tipo}</h3>
          </div>
          <div className="product-main">
            <h4 className="product-name">Producto no encontrado</h4>
            <p className="product-description">No hemos podido localizar un producto para este caso.</p>
          </div>
        </div>
      </div>
    );
  }

  // Log de depuración para ver qué datos llegan
  console.log(`\n🎴 ProductCard para ${producto.nombre}:`);
  console.log(`   varianteRecomendada:`, producto.varianteRecomendada);
  console.log(`   gramosDiarios: ${producto.gramosDiarios}g`);
  console.log(`   variantes disponibles: ${producto.variantes?.length || 0}`);
  console.log(`   tipoCroqueta recibido:`, tipoCroqueta);
  console.log(`   tipoAnimal:`, tipoAnimal);
  console.log(`   tipo producto:`, tipo);

  // Determinar si debe mostrar el badge de croqueta
  const debesMostrarCroqueta = () => {
    // Solo para perros, alimento seco, y si hay información de tipoCroqueta
    if (!tipoCroqueta || tipoAnimal !== "Perro" || !tipo.includes("Seco")) {
      console.log(`   ❌ No mostrar badge: tipoCroqueta=${!!tipoCroqueta}, tipoAnimal=${tipoAnimal}, tipo=${tipo}`);
      return false;
    }

    // Mostrar siempre que haya información de tipoCroqueta
    // (ya sea que tenga disponibilidad de otro tipo o no)
    console.log(`   ✅ Mostrar badge de croqueta: ${tipoCroqueta.tipo}`);
    return true;
  };

  const mostrarBadgeCroqueta = debesMostrarCroqueta();

  const formatearCantidad = () => {
    const cantidadOriginal = producto.varianteRecomendada?.cantidad || "";
    return cantidadOriginal;
  };

  const calcularDuracion = () => {
    const cantidadOriginal = producto.varianteRecomendada?.cantidad || "";
    if (!cantidadOriginal) {
      return "No disponible";
    }

    let gramosTotales = 0;
    const cantidadLower = cantidadOriginal.toLowerCase();

    // Para productos con packs: "Caja 12 latas 185 g" o "Caja 18x80gr"
    const matchCaja = cantidadLower.match(/caja\s*(\d+)(?:\s*latas)?\s*(?:x\s*)?(\d+(?:\.\d+)?)\s*g/i);
    if (matchCaja) {
      const unidades = parseFloat(matchCaja[1]);
      const gramosPorUnidad = parseFloat(matchCaja[2]);
      gramosTotales = gramosPorUnidad * unidades;
      console.log(`Caja: ${unidades} latas × ${gramosPorUnidad}g = ${gramosTotales}g`);
    }
    // Para formato "185 gr x 12ud" o "400 gr x 12ud"
    else {
      const matchPack = cantidadLower.match(/(\d+(?:\.\d+)?)\s*gr?\s*x\s*(\d+)\s*ud/i);
      if (matchPack) {
        const gramosPorUnidad = parseFloat(matchPack[1]);
        const unidades = parseFloat(matchPack[2]);
        gramosTotales = gramosPorUnidad * unidades;
        console.log(`Pack: ${gramosPorUnidad}g × ${unidades}ud = ${gramosTotales}g`);
      }
      // Si es en kg (sin pack)
      else if (cantidadLower.includes("kg") && !cantidadLower.includes("x")) {
        const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
        gramosTotales = numeros ? parseFloat(numeros[1]) * 1000 : 0;
        console.log(`Kg: ${cantidadLower} = ${gramosTotales}g`);
      }
      // Si es en gramos simples (lata individual)
      else {
        const numeros = cantidadLower.match(/(\d+(?:\.\d+)?)/);
        gramosTotales = numeros ? parseFloat(numeros[1]) : 0;
        console.log(`Gramos simples: ${cantidadLower} = ${gramosTotales}g`);
      }
    }

    if (!gramosTotales || gramosTotales <= 0) {
      console.warn(`⚠️ No se pudo calcular gramos totales de "${cantidadOriginal}"`);
      return "Consultar envase";
    }

    if (!producto.gramosDiarios || producto.gramosDiarios <= 0) {
      console.warn(`⚠️ Gramos diarios no válidos: ${producto.gramosDiarios}`);
      return "Consultar envase";
    }

    const dias = Math.round(gramosTotales / producto.gramosDiarios);
    console.log(`Duración: ${gramosTotales}g ÷ ${producto.gramosDiarios}g/día = ${dias} días`);

    // Validación adicional
    if (dias <= 0) {
      console.warn(`⚠️ Duración calculada inválida: ${dias} días`);
      return "Menos de 1 día";
    }

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
    return producto.kcalEmKg ? Math.round((producto.gramosDiarios * producto.kcalEmKg) / 1000) : 0;
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
          {mostrarBadgeCroqueta && (
            <span className="product-badge-croqueta">
              {tipoCroqueta.tipo === "Regular" ? "Croqueta Regular" : "Croqueta Pequeña"}
              {tipoCroqueta.diametro && ` - ${tipoCroqueta.diametro}`}
            </span>
          )}
        </div>

        <div className="product-main">
          <h4 className="product-name">{producto.nombre}</h4>
        </div>

        <div className="product-nutrition">
          <div className="nutrition-grid">
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
              <span className="nutrition-icon">🔥</span>
              <div className="nutrition-content">
                <span className="nutrition-label">Densidad energética</span>
                <span className="nutrition-value">{producto.kcalEmKg || 'N/A'} kcal/kg</span>
              </div>
            </div>

            <div className="nutrition-item">
              <span className="nutrition-icon">📦</span>
              <div className="nutrition-content">
                <span className="nutrition-label">Formato recomendado</span>
                <span className="nutrition-value">{formatearCantidad()}</span>
              </div>
            </div>
          </div>

          <div className="nutrition-duration">
            <span className="nutrition-duration-label">Duración aproximada</span>
            <span className="nutrition-duration-value">{calcularDuracion()}</span>
          </div>
        </div>
      </div>

      <a
        href={producto.varianteRecomendada?.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="product-link"
      >
        Ver producto en tienda
      </a>
    </div>
  );
}
