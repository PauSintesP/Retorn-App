# Código de Embed para tu Tienda Shopify

## Opción 1: Iframe con auto-resize (RECOMENDADO)

Crea una nueva página en tu tienda Shopify y pega este código en el HTML:

```html
<!-- Iframe del cuestionario -->
<iframe 
  id="retorn-survey"
  src="https://retorn-app.vercel.app/public/survey"
  style="width: 100%; min-height: 400px; border: none; border-radius: 12px;"
  title="Cuestionario Personalizado Retorn"
  sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
></iframe>

<!-- Script para auto-ajustar altura -->
<script>
  window.addEventListener('message', function(e) {
    if (!e.data || e.data.type !== 'retorn-survey-height') return;
    
    var iframe = document.getElementById('retorn-survey');
    if (iframe && e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  }, false);
</script>
```

## Opción 2: Botón flotante con modal (Mejor UX)

Añade este código al final de tu tema (Edit code → theme.liquid antes del `</body>`):

```html
<!-- Botón flotante -->
<button id="retorn-survey-btn" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #3E3E3E;
  color: white;
  padding: 16px 24px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 9999;
  transition: transform 0.2s;
">
  🐾 Encuentra tu dieta ideal
</button>

<!-- Modal con iframe -->
<div id="retorn-survey-modal" style="
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 10000;
  justify-content: center;
  align-items: center;
">
  <div style="
    position: relative;
    width: 90%;
    max-width: 900px;
    height: 90%;
    background: white;
    border-radius: 12px;
    overflow: hidden;
  ">
    <button id="retorn-survey-close" style="
      position: absolute;
      top: 16px;
      right: 16px;
      background: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 10001;
    ">×</button>
    
    <iframe 
      id="retorn-survey-iframe"
      src="https://retorn-app.vercel.app/public/survey"
      style="width: 100%; height: 100%; border: none;"
      title="Cuestionario Personalizado Retorn"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
    ></iframe>
  </div>
</div>

<script>
  (function() {
    const btn = document.getElementById('retorn-survey-btn');
    const modal = document.getElementById('retorn-survey-modal');
    const closeBtn = document.getElementById('retorn-survey-close');
    const iframe = document.getElementById('retorn-survey-iframe');
    
    // Abrir modal
    btn.addEventListener('click', function() {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    // Auto-resize del iframe
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'retorn-survey-height' && e.data.height) {
        iframe.style.height = Math.min(e.data.height, window.innerHeight * 0.9) + 'px';
      }
    }, false);

    // Efecto hover en el botón
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  })();
</script>
```

## Opción 3: Sección personalizada en el tema

Si quieres más control, crea un nuevo snippet en tu tema (Snippets → Create new snippet → `retorn-survey.liquid`):

```liquid
<div class="retorn-survey-section">
  <div class="retorn-survey-wrapper">
    <iframe 
      src="https://retorn-app.vercel.app/public/survey"
      class="retorn-survey-iframe"
      title="Cuestionario Personalizado Retorn"
      loading="lazy"
    ></iframe>
  </div>
</div>

<style>
  .retorn-survey-section {
    width: 100%;
    padding: 40px 20px;
    background: #f9f9f9;
  }
  
  .retorn-survey-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  
  .retorn-survey-iframe {
    width: 100%;
    height: 800px;
    border: none;
    display: block;
  }
  
  @media (max-width: 768px) {
    .retorn-survey-iframe {
      height: 600px;
    }
  }
</style>
```

Luego incluye el snippet donde quieras: `{% render 'retorn-survey' %}`

## Opción 4: Link directo

Simplemente crea un enlace en tu menú o página que apunte a:

```
https://retorn-app.vercel.app/public/survey
```

## Configuración adicional

### Para capturar respuestas en tu sistema

Si quieres recibir las respuestas del cuestionario, puedes:

1. **Configurar un webhook** en tu backend
2. **Usar Google Analytics** para tracking
3. **Integrar con Klaviyo/Mailchimp** para email marketing

### Para personalizar colores

Puedes pasar parámetros en la URL:

```
https://retorn-app.vercel.app/public/survey?primaryColor=FF6B6B&shop=tu-tienda.myshopify.com
```

## Notas importantes

- ✅ El cuestionario es completamente responsive (funciona en móvil)
- ✅ No requiere autenticación de Shopify
- ✅ Las respuestas se calculan en tiempo real
- ✅ Redirecciona a los productos recomendados en tu tienda
- 🔒 Asegúrate de que tu dominio permita iframes si usas embed

## Soporte

Si necesitas personalizar colores, textos o funcionalidades, contacta al desarrollador.
