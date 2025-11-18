/**
 * API endpoint para enviar formulario de contacto de patologías
 */

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.json();
    
    // Aquí puedes integrar con tu servicio de email preferido
    // Opciones:
    // 1. SendGrid
    // 2. Resend
    // 3. Nodemailer con SMTP
    // 4. Shopify Email API (si está disponible)
    
    // Por ahora, vamos a usar FormSubmit desde el servidor (sin CORS)
    const response = await fetch(
      "https://formsubmit.co/ajax/gal.la@retorn.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`FormSubmit error: ${response.status}`);
    }

    const result = await response.json();
    
    return Response.json({ 
      success: true, 
      message: "Formulario enviado correctamente",
      data: result 
    });
    
  } catch (error) {
    console.error("Error al enviar formulario:", error);
    return Response.json(
      { 
        success: false, 
        error: "Error al enviar el formulario",
        details: error.message 
      },
      { status: 500 }
    );
  }
};
