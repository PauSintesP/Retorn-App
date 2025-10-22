import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Retorn App - Recomendador de Productos</h1>
        <p className={styles.text}>
          Sistema inteligente de recomendación de productos personalizados basado en tus necesidades.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Dominio de tu tienda Shopify</span>
              <input className={styles.input} type="text" name="shop" placeholder="mi-tienda.myshopify.com" />
              <span>e.g: mi-tienda.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Acceder
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Cuestionario Personalizado</strong>. Preguntas diseñadas para entender las necesidades específicas de cada usuario.
          </li>
          <li>
            <strong>Recomendaciones Inteligentes</strong>. Algoritmo avanzado que sugiere los productos más adecuados según las respuestas.
          </li>
          <li>
            <strong>Integración con Shopify</strong>. Acceso directo a los productos recomendados en tu tienda.
          </li>
        </ul>
      </div>
    </div>
  );
}
