import { useNavigate } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Retorn App - Recomendador de Productos</h1>
      
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <button
          onClick={() => navigate("/app/survey")}
          style={{
            backgroundColor: "#008060",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Iniciar Cuestionario
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Bienvenido al Sistema de Recomendación 🎯</h2>
        <p>
          Esta aplicación te ayudará a encontrar los productos más adecuados según tus necesidades específicas.
          Completa el cuestionario personalizado y obtén recomendaciones inteligentes basadas en tus respuestas.
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>¿Cómo funciona?</h3>
        <ol>
          <li><strong>Paso 1:</strong> Haz clic en "Iniciar Cuestionario" para comenzar</li>
          <li><strong>Paso 2:</strong> Responde las preguntas sobre tus necesidades</li>
          <li><strong>Paso 3:</strong> Recibe recomendaciones personalizadas de productos</li>
          <li><strong>Paso 4:</strong> Accede directamente a los productos recomendados</li>
        </ol>
      </div>

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f6f6f7", borderRadius: "8px" }}>
        <h3>Características</h3>
        <ul>
          <li>✓ Cuestionario Personalizado - Preguntas diseñadas específicamente para entender tus necesidades</li>
          <li>✓ Algoritmo Inteligente - Sistema avanzado de recomendación basado en múltiples factores</li>
          <li>✓ Resultados Instantáneos - Obtén tus recomendaciones inmediatamente al completar el cuestionario</li>
        </ul>
      </div>
    </div>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
