/**
 * ServicioCard — card individual reutilizable del grid de Servicios.
 *
 * Props:
 *   icono       {string} emoji representativo del servicio
 *   nombre      {string} título del servicio
 *   descripcion {string} texto breve
 *   servicioId  {string} valor con el que se pre-rellena #servicio-select
 *
 * El botón "Consultar más info →":
 *   1) prerellena el <select id="servicio-select"> del formulario de contacto
 *   2) hace scroll suave hasta #contacto
 */
export default function ServicioCard({ icono, nombre, descripcion, servicioId }) {
  const handleConsultar = () => {
    // 1) Pre-rellenar el select del formulario (si ya está montado).
    const select = document.getElementById('servicio-select');
    if (select) {
      select.value = servicioId;
      // Disparamos 'change' por si el formulario gestiona su estado en React.
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // 2) Scroll suave al formulario de contacto.
    const contacto = document.getElementById('contacto');
    if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className="servicio-card">
      <span className="servicio-card__icono" aria-hidden="true">
        {icono}
      </span>
      <h3 className="servicio-card__nombre">{nombre}</h3>
      <p className="servicio-card__desc">{descripcion}</p>
      <button
        type="button"
        className="servicio-card__btn"
        onClick={handleConsultar}
      >
        Consultar más info →
      </button>
    </article>
  );
}
