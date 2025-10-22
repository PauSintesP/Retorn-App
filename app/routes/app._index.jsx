import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const navigate = useNavigate();
  const shopify = useAppBridge();

  const startSurvey = () => {
    navigate("/app/survey");
  };

  return (
    <s-page heading="Retorn App - Recomendador de Productos">
      <s-button slot="primary-action" onClick={startSurvey} variant="primary">
        Iniciar Cuestionario
      </s-button>

      <s-section heading="Bienvenido al Sistema de Recomendación 🎯">
        <s-paragraph>
          Esta aplicación te ayudará a encontrar los productos más adecuados según tus necesidades específicas.
          Completa el cuestionario personalizado y obtén recomendaciones inteligentes basadas en tus respuestas.
        </s-paragraph>
      </s-section>

      <s-section heading="¿Cómo funciona?">
        <s-unordered-list>
          <s-list-item>
            <strong>Paso 1:</strong> Haz clic en "Iniciar Cuestionario" para comenzar
          </s-list-item>
          <s-list-item>
            <strong>Paso 2:</strong> Responde las preguntas sobre tus necesidades
          </s-list-item>
          <s-list-item>
            <strong>Paso 3:</strong> Recibe recomendaciones personalizadas de productos
          </s-list-item>
          <s-list-item>
            <strong>Paso 4:</strong> Accede directamente a los productos recomendados
          </s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Características">
        <s-paragraph>
          <s-text weight="semibold">✓ Cuestionario Personalizado</s-text>
        </s-paragraph>
        <s-paragraph>
          Preguntas diseñadas específicamente para entender tus necesidades.
        </s-paragraph>
        
        <s-paragraph>
          <s-text weight="semibold">✓ Algoritmo Inteligente</s-text>
        </s-paragraph>
        <s-paragraph>
          Sistema avanzado de recomendación basado en múltiples factores.
        </s-paragraph>
        
        <s-paragraph>
          <s-text weight="semibold">✓ Resultados Instantáneos</s-text>
        </s-paragraph>
        <s-paragraph>
          Obtén tus recomendaciones inmediatamente al completar el cuestionario.
        </s-paragraph>
      </s-section>

      <s-section slot="aside" heading="¿Listo para comenzar?">
        <s-stack direction="block" gap="base">
          <s-button onClick={startSurvey} variant="primary" fullWidth>
            Ir al Cuestionario
          </s-button>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
