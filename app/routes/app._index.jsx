import { useNavigate } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { getSurveyStyles } from "../styles/surveyStyles";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: getSurveyStyles("forward") }} />
      <div className="survey-container">
        <div className="survey-content">
          <div className="question-card">
            <div className="question-header">
              <div className="question-number">Bienvenid@ 🐾</div>
              <h2 className="question-text">Dieta personalizada para tus pelud@s</h2>
              <p style={{ 
                marginTop: '16px', 
                color: 'var(--jdgm-primary-color)', 
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                Descubre la alimentación perfecta para tu mascota con nuestro cuestionario personalizado
              </p>
            </div>

            <div style={{ 
              marginTop: '32px',
              padding: '24px',
              backgroundColor: 'var(--jdgm-secondary-color)',
              borderRadius: '12px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--jdgm-primary-color)'
              }}>
                ¿Qué incluye?
              </h3>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ 
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
                  <span><strong>Cuestionario Personalizado</strong> - Solo 4 minutos para conocer a tu mascota</span>
                </li>
                <li style={{ 
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
                  <span><strong>Recomendaciones Inteligentes</strong> - Productos adaptados a sus necesidades</span>
                </li>
                <li style={{ 
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
                  <span><strong>Resultados Instantáneos</strong> - Accede directamente a los productos recomendados</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => navigate("/app/survey")}
              className="submit-button"
              style={{ marginTop: '32px', width: '100%' }}
            >
              Empezar cuestionario →
            </button>

            <p style={{ 
              textAlign: 'center', 
              marginTop: '16px', 
              color: '#999', 
              fontSize: '0.875rem' 
            }}>
              ⏱️ Dura aproximadamente 4 minutos
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
