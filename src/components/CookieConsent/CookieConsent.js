import { useEffect, useState } from 'react';
import './CookieConsent.css';

const CONSENT_KEY = 'bytia_cookie_consent';
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

/**
 * Inyecta gtag.js de Google Analytics 4 y lo inicializa. No hace nada si
 * no hay Measurement ID configurado o si el script ya se ha inyectado.
 */
function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  if (document.getElementById('bytia-ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'bytia-ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

/**
 * CookieConsent — banner RGPD para el consentimiento de cookies analíticas
 * (GA4). Sin librerías externas: guarda la decisión en localStorage
 * (clave `bytia_cookie_consent`, valores "accepted"/"rejected") y solo
 * carga gtag.js si hay Measurement ID configurado Y el usuario ha
 * aceptado. Si ya existe una decisión guardada, no vuelve a mostrarse.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);

    if (consent === null) {
      setVisible(true);
      return;
    }

    if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  const handleDecision = (decision) => {
    window.localStorage.setItem(CONSENT_KEY, decision);
    setVisible(false);
    if (decision === 'accepted') {
      loadGoogleAnalytics();
    }
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
    >
      <p className="cookie-consent-texto">
        Usamos Google Analytics para medir las visitas a esta web y mejorar
        nuestros servicios. No usamos esta información con fines
        publicitarios. Puedes aceptar o rechazar el uso de cookies
        analíticas.
      </p>
      <div className="cookie-consent-botones">
        <button
          type="button"
          className="cookie-consent-btn cookie-consent-btn--rechazar"
          onClick={() => handleDecision('rejected')}
        >
          Rechazar
        </button>
        <button
          type="button"
          className="cookie-consent-btn cookie-consent-btn--aceptar"
          onClick={() => handleDecision('accepted')}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
