import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // Si viene el parámetro 'shop', redirigir al flujo de login OAuth
  if (url.searchParams.get("shop")) {
    throw redirect(`/auth/login?${url.searchParams.toString()}`);
  }

  // Si ya está autenticado o no hay shop, redirigir a /app
  throw redirect(`/app?${url.searchParams.toString()}`);
};

export default function App() {
  // Este componente nunca se renderizará porque el loader siempre redirige
  return null;
}
