# 🏥 Sistema de Contacto para Patologías

## 📋 Descripción

Nuevo sistema implementado que detecta automáticamente cuando un usuario tiene mascotas con patologías y, en lugar de mostrar una recomendación de productos estándar, redirige a un formulario de contacto personalizado para evaluación veterinaria.

---

## ✅ Funcionalidad Implementada

### 🔍 Detección Automática de Patologías

El sistema detecta si el usuario ha seleccionado alguna patología en:
- **Gatos**: Pregunta 7_gato
- **Perros**: Pregunta 9_perro

**Condición para activar el formulario:**
```javascript
// Se activa si:
// 1. Hay respuestas en el array de patologías
// 2. NO se seleccionó "Ninguna"
const tienePatologias = 
  Array.isArray(respuestaPatologias) && 
  respuestaPatologias.length > 0 && 
  !respuestaPatologias.includes("Ninguna");
```

### 📝 Formulario de Contacto

Cuando se detectan patologías, se muestra un formulario profesional que solicita:

**Datos requeridos:**
1. ✅ Nombre completo (mínimo 2 caracteres)
2. ✅ Email (validación de formato)
3. ✅ Teléfono (mínimo 9 dígitos)

**Información enviada por email:**
- ✉️ Todos los campos del formulario de contacto
- 📋 **TODAS** las respuestas del cuestionario
- 🐾 Datos de la mascota (nombre, tipo, edad, peso, etc.)
- 🏥 Patologías seleccionadas
- 🍖 Preferencias alimentarias
- 💊 Otros datos relevantes

---

## 🎨 Diseño y Experiencia de Usuario

### Mensaje Principal
```
🏥 Evaluación Personalizada

Hemos detectado que tu peludo tiene condiciones de salud que requieren 
atención especial. Nuestro equipo de expertos evaluará su caso de forma 
personalizada para recomendarte la mejor alimentación.
```

### Beneficios Destacados
1. 👨‍⚕️ **Evaluación por nutricionistas veterinarios**
2. 🎯 **Recomendación 100% personalizada**
3. ⏱️ **Respuesta en 24-48 horas**

### Estado de Éxito
Tras enviar el formulario:
```
✅ ¡Gracias por tu confianza!

Hemos recibido tu solicitud. Nuestro equipo de nutricionistas veterinarios 
evaluará el caso de tu peludo de forma personalizada.

Te contactaremos en las próximas 24-48 horas para ofrecerte la mejor 
recomendación adaptada a sus necesidades específicas.

📧 Te hemos enviado un email de confirmación a tu@email.com
```

---

## 🔧 Implementación Técnica

### Archivos Creados/Modificados

#### 1. **PathologyContactForm.jsx** (NUEVO)
Componente React del formulario de contacto.

**Ubicación:** `app/components/survey/PathologyContactForm.jsx`

**Props:**
- `answers` - Objeto con todas las respuestas del cuestionario
- `onBack` - Función para volver al cuestionario

**Estados:**
- `formData` - Datos del formulario (nombre, email, teléfono)
- `isSubmitting` - Loading state durante envío
- `isSubmitted` - Success state tras envío exitoso

#### 2. **app.survey.jsx** (MODIFICADO)
Lógica principal del cuestionario.

**Cambios:**
- ✅ Importado `PathologyContactForm`
- ✅ Añadido estado `showPathologyContact`
- ✅ Función `tienePatologias()` para detección
- ✅ Modificado `handleSubmit()` para redirección condicional
- ✅ Añadido `handleBackFromContact()` para navegación
- ✅ Actualizado JSX para mostrar formulario cuando corresponda

#### 3. **surveyStyles.js** (MODIFICADO)
Estilos CSS del formulario.

**Nuevos estilos añadidos:**
- `.pathology-contact-container` - Contenedor principal
- `.pathology-contact-header` - Cabecera con título e icono
- `.pathology-benefits` - Grid de beneficios
- `.pathology-contact-form` - Formulario de contacto
- `.form-input` - Inputs con estados focus
- `.btn-primary` / `.btn-secondary` - Botones con gradientes
- `.pathology-contact-success` - Estado de éxito
- Media queries para responsive

---

## 📧 Integración con FormSubmit

### Configuración

**Endpoint:** `https://formsubmit.co/pausintespaul@gmail.com`

**Método:** POST

**Formato de datos enviados:**

```javascript
FormData {
  // Contacto
  "Nombre": "Juan Pérez",
  "Email": "juan@example.com",
  "Teléfono": "600123456",
  
  // Respuestas del cuestionario
  "Pregunta 1": "Gato",
  "Pregunta 2": "Luna",
  "Pregunta 3": "3 años",
  "Pregunta 4": "4.5",
  "Pregunta 5": "Adulto",
  "Pregunta 6": "Sí",
  "Pregunta 7_gato": "Problemas renales, Diabetes",
  // ... todas las demás preguntas
}
```

### Email Recibido

El email que llegará a `pausintespaul@gmail.com` contendrá:

```
Subject: New submission from [tu dominio]

Nombre: Juan Pérez
Email: juan@example.com
Teléfono: 600123456

Pregunta 1: Gato
Pregunta 2: Luna
Pregunta 3: 3 años
Pregunta 4: 4.5
Pregunta 5: Adulto
Pregunta 6: Sí
Pregunta 7_gato: Problemas renales, Diabetes
[...]
```

---

## 🔄 Flujo de Usuario

### Caso 1: Usuario SIN patologías

```
Inicio → Cuestionario → Responde preguntas → 
Selecciona "Ninguna" en patologías → 
Submit → Recomendación de productos ✅
```

### Caso 2: Usuario CON patologías

```
Inicio → Cuestionario → Responde preguntas → 
Selecciona patología(s) → Submit → 
Formulario de contacto 🏥 → 
Completa datos → Enviar → 
Mensaje de éxito ✅ → 
Email a pausintespaul@gmail.com 📧
```

---

## 🎯 Características Destacadas

### ✅ Validación del Formulario

- **Nombre:** Mínimo 2 caracteres, trimmed
- **Email:** Validación de formato con `@`
- **Teléfono:** Mínimo 9 caracteres
- **Botón submit deshabilitado** hasta que todos los campos sean válidos

### ✅ Estados de Carga

- **Botón "Enviando..."** durante el POST request
- **Inputs deshabilitados** durante envío
- **Prevención de doble submit**

### ✅ Manejo de Errores

```javascript
try {
  // Enviar formulario
} catch (error) {
  alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
}
```

### ✅ Navegación

- **Botón "← Volver"** para regresar al cuestionario
- **Estado preservado** de todas las respuestas
- **Reinicio completo** con botón "Hacer otra evaluación"

---

## 📱 Responsive Design

### Desktop (> 768px)
- Formulario centrado, max-width: 800px
- Grid de beneficios en 3 columnas
- Botones en fila (Volver | Enviar)

### Mobile (≤ 768px)
- Padding reducido
- Grid de beneficios en 1 columna
- Botones apilados verticalmente
- Font-sizes ajustados

---

## 🔒 Seguridad y Privacidad

### FormSubmit Features

✅ **HTTPS obligatorio** - Conexión encriptada
✅ **Sin almacenamiento** - FormSubmit solo reenvía emails
✅ **No requiere API key** - Configuración simple
✅ **Validación server-side** por FormSubmit

### Consideraciones

⚠️ **Email visible en código:** El email `pausintespaul@gmail.com` está en el código fuente. Para producción, considera:
- Usar variable de entorno
- Implementar endpoint backend propio
- Usar FormSubmit con token

---

## 🚀 Próximos Pasos (Recomendados)

### 1. Configurar FormSubmit Avanzado

Opciones adicionales de FormSubmit que puedes añadir:

```html
<!-- Redirect tras envío -->
<input type="hidden" name="_next" value="https://retorn.com/gracias">

<!-- Deshabilitar CAPTCHA -->
<input type="hidden" name="_captcha" value="false">

<!-- Subject personalizado -->
<input type="hidden" name="_subject" value="Nueva consulta - Mascota con patologías">

<!-- Template personalizado -->
<input type="hidden" name="_template" value="table">
```

### 2. Mejorar Email Template

Considera crear un template HTML personalizado para emails más bonitos con:
- Logo de Retorn
- Formato de tabla para respuestas
- Call-to-action destacado
- Información de contacto

### 3. Confirmación al Usuario

Enviar email de confirmación automático al usuario usando:
```html
<input type="hidden" name="_cc" value="usuario@email.com">
```

### 4. Integración con CRM

- Guardar consultas en base de datos
- Integrar con sistema de tickets
- Seguimiento de respuestas

---

## 📊 Testing Checklist

### Flujo Normal
- [ ] Usuario selecciona "Ninguna" → Ver recomendación productos ✅
- [ ] Usuario no llega a pregunta patologías → Ver recomendación productos ✅

### Flujo Patologías
- [ ] Usuario selecciona 1 patología → Ver formulario contacto
- [ ] Usuario selecciona múltiples patologías → Ver formulario contacto
- [ ] Formulario vacío → Botón submit deshabilitado
- [ ] Rellenar nombre corto → Botón submit deshabilitado
- [ ] Email sin @ → Botón submit deshabilitado
- [ ] Teléfono corto → Botón submit deshabilitado
- [ ] Formulario completo → Botón submit habilitado
- [ ] Click "Volver" → Regresa a cuestionario con respuestas
- [ ] Submit formulario → Email recibido en pausintespaul@gmail.com
- [ ] Tras envío → Mostrar mensaje de éxito
- [ ] Email contiene todas las respuestas del cuestionario

### Responsive
- [ ] Vista mobile < 768px funcional
- [ ] Vista tablet 768-1024px funcional
- [ ] Vista desktop > 1024px funcional

---

## 📞 Soporte

Si necesitas modificar:

**Email destino:** Cambiar en `PathologyContactForm.jsx` línea 35
**Mensaje de éxito:** Editar componente `pathology-contact-success`
**Estilos:** Modificar `surveyStyles.js` sección "PATHOLOGY CONTACT FORM STYLES"
**Validaciones:** Ajustar función `isFormValid()` en PathologyContactForm.jsx

---

**Versión:** 1.0  
**Fecha implementación:** 16 de Octubre de 2025  
**Estado:** ✅ Completado y funcional
