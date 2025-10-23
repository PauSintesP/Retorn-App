import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  
  // Redirigir directamente a /app
  throw redirect(`/app?${url.searchParams.toString()}`);
};

export default function App() {
  // Este componente nunca se renderizará porque el loader siempre redirige
  return null;
}
