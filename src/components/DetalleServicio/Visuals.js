/* ============================================================
   Visuals — visuales JSX para cada DetalleServicio.
   Se pasan como prop `visual` desde App.js.
   ============================================================ */

/** Firewall — escudo SVG con checkmark azul. */
export function EscudoVisual() {
  return (
    <svg
      className="visual-escudo"
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cuerpo del escudo */}
      <path
        className="visual-escudo__cuerpo"
        d="M100 10 L180 45 V110 C180 165 145 200 100 212 C55 200 20 165 20 110 V45 Z"
      />
      {/* Borde interior sutil */}
      <path
        className="visual-escudo__borde"
        d="M100 30 L162 57 V110 C162 153 135 182 100 192 C65 182 38 153 38 110 V57 Z"
      />
      {/* Checkmark */}
      <path
        className="visual-escudo__check"
        d="M70 110 L92 132 L134 86"
        fill="none"
      />
    </svg>
  );
}

/** Monitorización — 3 anillos de pulso animados (CSS puro). */
export function PulsoVisual() {
  return (
    <div className="visual-pulso">
      <span className="visual-pulso__ring" />
      <span className="visual-pulso__ring" />
      <span className="visual-pulso__ring" />
      <span className="visual-pulso__core" />
    </div>
  );
}

/** Auditorías — panel con 5 filas de estado. */
export function AuditoriaVisual() {
  const filas = [
    { label: 'Firewall perimetral', estado: 'ok' },
    { label: 'Cifrado de datos', estado: 'ok' },
    { label: 'Backups automáticos', estado: 'revisar' },
    { label: 'Accesos y permisos', estado: 'ok' },
    { label: 'Puertos expuestos', estado: 'critico' },
  ];

  const texto = {
    ok: 'OK',
    revisar: 'Revisar',
    critico: 'Crítico',
  };

  return (
    <div className="visual-panel">
      <div className="visual-panel__head">
        <span className="visual-panel__dot" />
        <span className="visual-panel__dot" />
        <span className="visual-panel__dot" />
        <span className="visual-panel__title">Informe de auditoría</span>
      </div>
      <ul className="visual-panel__list">
        {filas.map((f) => (
          <li className="visual-panel__row" key={f.label}>
            <span className="visual-panel__label">{f.label}</span>
            <span className={`visual-panel__badge is-${f.estado}`}>
              {texto[f.estado]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
