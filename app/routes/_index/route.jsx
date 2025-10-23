import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  
  if (url.searchParams.get("embedded") === "1") {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  
  if (url.searchParams.get("shop")) {
    throw redirect(`/auth/login?${url.searchParams.toString()}`);
  }

  // Si viene el parámetro 'host' (típico de Shopify embedded apps), redirigir a /app
  if (url.searchParams.get("host")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  // Por defecto, redirigir a /app
  throw redirect("/app");
};

export default function App() {
  // Este componente nunca se renderizará porque el loader siempre redirige
  return null;
}
