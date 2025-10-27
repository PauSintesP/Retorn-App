# 🚀 Guía de Despliegue - Retorn Survey Extension

## 📋 Pre-requisitos

1. Tener instalado Shopify CLI:
```bash
npm install -g @shopify/cli @shopify/app
```

2. Estar autenticado con Shopify:
```bash
shopify auth login
```

## 🎯 Pasos para Desplegar la Extensión

### 1. Desplegar la extensión al Partner Dashboard

```bash
npm run deploy
```

O directamente:

```bash
shopify app deploy
```

Este comando:
- ✅ Empaqueta la extensión
- ✅ La sube a tu cuenta de Partner
- ✅ La hace disponible para instalación

### 2. Probar en modo desarrollo (opcional)

Si quieres probar antes de desplegar:

```bash
shopify app dev
```

Esto abrirá:
- Tu app en modo desarrollo
- Podrás ver la extensión en el Theme Editor
- Los cambios se actualizan en tiempo real

### 3. Instalar en tu tienda

1. Ve a **Shopify Admin** de tu tienda
2. **Apps** → Busca "Retorn"
3. Haz clic en **Instalar**
4. Acepta los permisos

### 4. Activar la extensión en el tema

1. Ve a **Online Store** → **Themes**
2. Haz clic en **Customize** en tu tema activo
3. En la barra lateral izquierda, baja hasta **App embeds**
4. Activa **"Retorn Survey"**
5. (Opcional) Configura los ajustes globales
6. Haz clic en **Save**

### 5. Agregar el cuestionario a una página

#### Opción A: Como sección en una página

1. En el Theme Editor, selecciona la página donde quieres el cuestionario
2. Haz clic en **Add section**
3. Ve a la pestaña **Apps**
4. Selecciona **"Retorn Survey"**
5. Configura:
   - Título y descripción
   - Colores (primario, acento, fondo)
   - Dimensiones y espaciado
   - Estilos visuales
6. Haz clic en **Save**

#### Opción B: Como bloque dentro de una sección existente

1. Selecciona una sección existente en tu página
2. Haz clic en **Add block**
3. Busca **"Retorn Survey"**
4. Configura según necesites
5. Guarda

## ⚙️ Configuración Recomendada

### Para página de inicio:
```
Título: "Encuentra la dieta perfecta"
Descripción: "Responde 4 minutos de preguntas..."
Ancho máximo: 1200px
Margen superior: 80px
Margen inferior: 80px
Mostrar sombra: Sí
```

### Para página de productos:
```
Título: "¿No sabes cuál elegir?"
Ancho máximo: 900px
Margen superior: 40px
Margen inferior: 40px
```

## 🎨 Personalización de Colores

Los colores se sincronizan automáticamente entre:
- El contenedor exterior (configurado en el Theme Editor)
- El iframe del cuestionario (se pasan como query params)

Colores configurables:
- **Color primario**: Texto principal
- **Color de acento**: Botones y destacados
- **Color de fondo**: Fondo del cuestionario

## 🔧 Solución de Problemas

### La extensión no aparece en Apps

```bash
# Re-desplegar
shopify app deploy

# O forzar actualización
shopify app deploy --force
```

### El iframe no se redimensiona

Verifica que la URL del cuestionario esté correcta:
- **Producción**: `https://retorn-app.vercel.app/public/survey`
- **Desarrollo**: `http://localhost:3000/public/survey`

### Los colores no se aplican

1. Verifica que estés usando formato hexadecimal: `#739f99`
2. Los colores se pasan automáticamente via URL
3. Refresca el Theme Editor después de cambiar colores

## 📱 Testing

### Desktop
1. Abre el Theme Editor
2. Navega a la página con el cuestionario
3. Haz clic en el botón de vista previa

### Mobile
1. En el Theme Editor, haz clic en el ícono de móvil (arriba)
2. O abre la tienda en tu móvil
3. El cuestionario es 100% responsive

## 🌐 URLs Importantes

- **Cuestionario público**: `https://retorn-app.vercel.app/public/survey`
- **Shopify Partner Dashboard**: https://partners.shopify.com
- **Documentación Shopify**: https://shopify.dev/docs/apps/build/online-store

## 📦 Estructura de Archivos Creados

```
extensions/
└── retorn-survey-embed/
    ├── shopify.extension.toml  (Config de la extensión)
    ├── README.md               (Documentación)
    ├── blocks/
    │   └── survey-embed.liquid (Bloque principal)
    ├── locales/
    │   ├── en.default.json     (Traducciones inglés)
    │   └── es.json             (Traducciones español)
    ├── assets/                 (Vacío por ahora)
    └── snippets/               (Vacío por ahora)
```

## ✅ Checklist de Despliegue

- [ ] Ejecutar `npm run deploy`
- [ ] Instalar app en la tienda
- [ ] Activar extensión en App embeds
- [ ] Agregar cuestionario a página deseada
- [ ] Configurar colores y textos
- [ ] Probar en desktop
- [ ] Probar en móvil
- [ ] Verificar que el iframe se redimensiona
- [ ] Probar agregar productos al carrito
- [ ] Hacer clic en "Save" en el Theme Editor
- [ ] Publicar el tema

## 🎉 ¡Listo!

Tu cuestionario Retorn ahora está disponible para todos los clientes de tu tienda Shopify.

### Próximos pasos:
- Monitorea las respuestas en el admin
- Ajusta colores según tu marca
- Considera agregar el cuestionario en más páginas
- Prueba diferentes posiciones para maximizar conversión

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo.
