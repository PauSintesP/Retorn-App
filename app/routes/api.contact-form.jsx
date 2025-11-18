/**
 * API endpoint para enviar formulario de contacto de patologías
 */

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Leer el body del request
    const body = await request.text();
    const formData = JSON.parse(body);
    
    console.log("📧 Enviando formulario de contacto:", formData);
    
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
      const errorText = await response.text();
      console.error("❌ Error de FormSubmit:", response.status, errorText);
      throw new Error(`FormSubmit error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Formulario enviado exitosamente:", result);
    
    return Response.json({ 
      success: true, 
      message: "Formulario enviado correctamente",
      data: result 
    });
    
  } catch (error) {
    console.error("❌ Error al enviar formulario:", error);
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
