import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // Si viene cualquier parámetro de Shopify, redirigir a /app y dejar que maneje la auth
  if (url.searchParams.toString()) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  // Por defecto, redirigir a /app
  throw redirect("/app");
};

export default function App() {
  // Este componente nunca se renderizará porque el loader siempre redirige
  return null;
}
