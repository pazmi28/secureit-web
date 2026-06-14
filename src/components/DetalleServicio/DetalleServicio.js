import './DetalleServicio.css';
import useReveal from '../../hooks/useReveal';

/**
 * DetalleServicio — sección split (texto + visual) reutilizable.
 *
 * Props:
 *   id          {string} id de la sección (ancla)
 *   dataTheme   {'dark'|'light'} tema de fondo (controla colores y Navbar)
 *   lado        {'izquierda'|'derecha'} posición del VISUAL en desktop
 *   label       {string} eyebrow superior
 *   titulo      {string} título de la sección
 *   descripcion {string} párrafo descriptivo
 *   servicioId  {string} valor para pre-rellenar #servicio-select
 *   visual      {JSX}    contenido visual (SVG / CSS) del lado gráfico
 */
export default function DetalleServicio({
  id,
  dataTheme,
  lado,
  label,
  titulo,
  descripcion,
  servicioId,
  visual,
}) {
  const ref = useReveal();

  const handleConsultar = (e) => {
    e.preventDefault();
    // 1) Pre-rellenar el select del formulario de contacto.
    const select = document.getElementById('servicio-select');
    if (select) {
      select.value = servicioId;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    // 2) Scroll suave al formulario.
    const contacto = document.getElementById('contacto');
    if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      data-theme={dataTheme}
      className={`detalle detalle--visual-${lado}`}
      ref={ref}
    >
      <div className="detalle-inner container">
        <div className="detalle__text">
          <p className="detalle__label reveal">{label}</p>
          <h2 className="detalle__titulo reveal d1">{titulo}</h2>
          <p className="detalle__desc reveal d2">{descripcion}</p>
          <a
            href="#contacto"
            className="detalle__link reveal d3"
            onClick={handleConsultar}
          >
            Consultar más info →
          </a>
        </div>

        <div className="detalle__visual reveal d2" aria-hidden="true">
          {visual}
        </div>
      </div>
    </section>
  );
}
