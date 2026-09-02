// Número de WhatsApp Business real.
const WHATSAPP_NUMERO = '34631019668';
const EMAIL_CONTACTO = 'hola@bytia.net';

/**
 * SoporteTecnicoCard — card individual del tab "Soporte & Mantenimiento".
 *
 * Se implementa con <details>/<summary> nativo: accesible por teclado y sin
 * depender de JS para abrir/cerrar. Al desplegarse muestra el detalle, qué
 * incluye y dos botones de contacto directo (WhatsApp y email) con el
 * nombre del servicio ya escrito en el mensaje.
 *
 * Props: icono, nombre, resumen, detalle, incluye (array), precio, duracion
 */
export default function SoporteTecnicoCard({
  icono,
  nombre,
  resumen,
  detalle,
  incluye,
  precio,
  duracion,
}) {
  const mensaje = `Hola, me interesa el servicio de "${nombre}" (BytIA).`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    mensaje
  )}`;
  const emailHref = `mailto:${EMAIL_CONTACTO}?subject=${encodeURIComponent(
    `Consulta: ${nombre}`
  )}&body=${encodeURIComponent(mensaje)}`;

  return (
    <details className="st-card">
      <summary className="st-card__summary">
        <span className="st-card__icono" aria-hidden="true">
          {icono}
        </span>
        <span className="st-card__cabecera">
          <span className="st-card__nombre">{nombre}</span>
          <span className="st-card__resumen">{resumen}</span>
        </span>
        <span className="st-card__precio">{precio}</span>
        <span className="st-card__chevron" aria-hidden="true">
          ▾
        </span>
      </summary>

      <div className="st-card__detalle">
        <p>{detalle}</p>

        <p className="st-card__incluye-titulo">Qué incluye</p>
        <ul className="st-card__incluye">
          {incluye.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="st-card__meta">
          <span>{precio}</span>
          <span aria-hidden="true">·</span>
          <span>Tiempo estimado: {duracion}</span>
        </div>

        <div className="st-card__acciones">
          <a
            href={whatsappHref}
            className="st-card__btn st-card__btn--fill"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Escribir por WhatsApp
          </a>
          <a href={emailHref} className="st-card__btn st-card__btn--ghost">
            ✉️ Enviar email
          </a>
        </div>
      </div>
    </details>
  );
}
