import './Hero.css';
import useReveal from '../../hooks/useReveal';

/**
 * Hero — primera sección, 100vh, fondo oscuro con grid decorativo + glow.
 * Lleva data-theme="hero" para que la Navbar permanezca transparente
 * mientras esta sección cruza la barra.
 */
export default function Hero() {
  const ref = useReveal();

  // Scroll suave a una sección por id (CSS ya aplica scroll-padding-top).
  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" data-theme="hero" className="hero" ref={ref}>
      {/* Fondos decorativos (CSS puro, sin imágenes) */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content container">
        <p className="hero-eyebrow reveal">
          Ciberseguridad empresarial · Zaragoza
        </p>

        <h1 className="hero-title reveal d1">
          Tu empresa, <span>blindada.</span>
        </h1>

        <p className="hero-subtitle reveal d2">
          Protegemos la infraestructura de tu negocio con firewalls
          enterprise, monitorización 24/7 y auditorías de seguridad.
          Tranquilidad digital para que tú te ocupes de crecer.
        </p>

        <div className="hero-actions reveal d3">
          <a
            href="#contacto"
            className="hero-btn hero-btn--fill"
            onClick={(e) => scrollTo(e, 'contacto')}
          >
            Solicitar auditoría gratuita
          </a>
          <a
            href="#servicios"
            className="hero-btn hero-btn--outline"
            onClick={(e) => scrollTo(e, 'servicios')}
          >
            Ver servicios
          </a>
        </div>

        <div className="hero-stats reveal d4">
          <div className="hero-stat">
            <span className="hero-stat__num">50+</span>
            <span className="hero-stat__label">empresas protegidas</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__num">8+</span>
            <span className="hero-stat__label">años de experiencia</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__num">24/7</span>
            <span className="hero-stat__label">monitorización activa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
