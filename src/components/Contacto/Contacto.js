import './Contacto.css';
import useReveal from '../../hooks/useReveal';

/**
 * Contacto — formulario de captación. Fondo oscuro --dark, 100vh.
 *
 * El formulario es NO controlado: se lee con FormData en el submit. Así el
 * select #servicio-select puede ser pre-rellenado externamente (desde las
 * ServicioCard y los DetalleServicio) sin conflictos con el estado de React.
 *
 * Por ahora onSubmit → console.log(formData). EmailJS se integrará después.
 */
export default function Contacto() {
  const ref = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    // TODO: integrar EmailJS en fase posterior.
    console.log('Formulario de contacto enviado:', formData);
    e.target.reset();
  };

  return (
    <section id="contacto" data-theme="dark" className="contacto" ref={ref}>
      <div className="container contacto-inner">
        <header className="contacto-head">
          <p className="contacto-eyebrow reveal">Contacto</p>
          <h2 className="contacto-titulo reveal d1">
            Hablemos de tu seguridad
          </h2>
          <p className="contacto-subtitulo reveal d2">
            Primera consulta gratuita. Sin compromiso.
          </p>
        </header>

        <form className="contacto-form reveal d2" onSubmit={handleSubmit}>
          <div className="contacto-row">
            <div className="contacto-field">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>
            <div className="contacto-field">
              <label htmlFor="empresa">Empresa</label>
              <input type="text" id="empresa" name="empresa" />
            </div>
          </div>

          <div className="contacto-row">
            <div className="contacto-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="contacto-field">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" />
            </div>
          </div>

          <div className="contacto-field">
            <label htmlFor="servicio-select">Servicio de interés</label>
            <select
              id="servicio-select"
              name="servicio"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona un servicio…
              </option>
              <option value="firewall">Firewall Enterprise</option>
              <option value="monitorizacion">Monitorización 24/7</option>
              <option value="auditorias">Auditorías de Seguridad</option>
              <option value="consultoria">Consultoría IT</option>
            </select>
          </div>

          <div className="contacto-field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" />
          </div>

          <button type="submit" className="contacto-submit">
            Enviar consulta
          </button>
        </form>

        <div className="contacto-datos reveal d3">
          <a href="mailto:hola@secureit.es" className="contacto-dato">
            hola@secureit.es
          </a>
          <a href="tel:+34976000000" className="contacto-dato">
            +34 976 000 000
          </a>
          <span className="contacto-dato">Zaragoza, España</span>
        </div>
      </div>
    </section>
  );
}
