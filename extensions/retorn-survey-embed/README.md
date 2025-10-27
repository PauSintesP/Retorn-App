# Retorn Survey - Theme App Extension

Esta extensión permite incrustar el cuestionario de recomendación de productos Retorn en cualquier página de tu tienda Shopify.

## 🚀 Instalación y Despliegue

### 1. Desplegar la extensión

```bash
npm run shopify app deploy
```

O si usas el CLI directamente:

```bash
shopify app deploy
```

### 2. Activar en el tema

1. Ve a tu **Admin de Shopify** → **Temas**
2. Haz clic en **Personalizar** en tu tema activo
3. En el editor de temas, ve a **App embeds** (en la parte inferior izquierda)
4. Activa **"Retorn Survey"**
5. Configura los ajustes según tus necesidades

### 3. Agregar a una página

En el editor de temas:
1. Ve a la página donde quieres agregar el cuestionario
2. Haz clic en **"Agregar sección"**
3. En la pestaña **"Apps"**, selecciona **"Retorn Survey"**
4. Configura los colores, textos y estilos
5. Guarda los cambios

## ⚙️ Configuración Disponible

### Textos
- **Título**: Personaliza el título que aparece sobre el cuestionario
- **Descripción**: Agrega una descripción explicativa
- **Tamaño de fuente**: Ajusta el tamaño del título y descripción
- **Alineación**: Izquierda, centro o derecha

### Diseño
- **Ancho máximo**: Controla el ancho del contenedor
- **Color de fondo**: Personaliza el fondo del contenedor
- **Padding**: Espacio interno del contenedor
- **Márgenes**: Espacio superior e inferior
- **Radio de bordes**: Esquinas redondeadas
- **Sombra**: Activa/desactiva la sombra

### Colores del Cuestionario
- **Color primario**: Color principal del texto
- **Color de acento**: Color de botones y elementos destacados
- **Color de fondo**: Fondo interno del cuestionario

### Avanzado
- **URL del cuestionario**: URL donde está alojado (por defecto: Vercel)
- **Altura mínima**: Altura inicial del iframe

## 🎨 Personalización

Los colores se pasan automáticamente al iframe mediante query params, por lo que el cuestionario se adapta a tu marca.

## 🔧 Funcionalidades

- ✅ **Auto-resize**: El iframe se ajusta automáticamente al contenido
- ✅ **Responsive**: Funciona perfectamente en móvil y desktop
- ✅ **Integración con carrito**: Los productos recomendados se pueden agregar directamente
- ✅ **Scroll suave**: Al iniciar el cuestionario, hace scroll automáticamente
- ✅ **Personalizable**: Todos los colores, textos y estilos son configurables

## 📱 Uso en el Theme Editor

Los clientes pueden ver y usar el cuestionario directamente desde cualquier página donde lo agregues:
- Página de inicio
- Páginas de productos
- Páginas personalizadas
- Páginas de colecciones

## 🔒 Seguridad

El iframe incluye configuración de sandbox para seguridad:
- `allow-forms`: Permite envío de formularios
- `allow-scripts`: Permite JavaScript
- `allow-same-origin`: Permite comunicación entre padre e iframe
- `allow-popups`: Permite abrir ventanas para agregar al carrito

## 🆘 Soporte

Si necesitas ayuda, contacta con el equipo de desarrollo.
