import { redirect } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  // Redirigir automáticamente a la encuesta
  throw redirect("/app/survey");
};

export default function Index() {
  // Este componente nunca se renderizará porque el loader siempre redirige a /app/survey
  return null;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
