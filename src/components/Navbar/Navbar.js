import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Contacto', id: 'contacto' },
];

/**
 * Navbar fija con fondo adaptativo según la sección bajo la barra.
 *
 * Convención: cada sección raíz debe llevar un atributo `data-theme`:
 *   - data-theme="hero"   → barra transparente (sobre el hero oscuro)
 *   - data-theme="dark"   → barra .scrolled-dark  (fondo oscuro + blur)
 *   - data-theme="light"  → barra .scrolled-light (fondo claro + blur)
 *
 * En cada scroll se mira qué sección cruza la línea de la navbar con
 * getBoundingClientRect() y se aplica la clase correspondiente.
 *
 * En mobile (<768px) los links se ocultan y aparece un menú hamburguesa
 * que abre un panel fullscreen con los links + CTA.
 */
export default function Navbar() {
  // '' = transparente | 'scrolled-dark' | 'scrolled-light'
  const [variant, setVariant] = useState('');
  // Estado del menú hamburguesa (solo relevante en mobile).
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const NAV_H = 72; // alto de la navbar (coincide con --navbar-h)

    const updateVariant = () => {
      // Punto de sondeo justo por debajo de la barra fija.
      const probeY = NAV_H + 1;
      const sections = document.querySelectorAll('[data-theme]');

      let current = null;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // La sección que cruza la línea de la navbar es la "activa".
        if (rect.top <= probeY && rect.bottom > probeY) current = section;
      });

      if (!current) {
        setVariant('');
        return;
      }

      const theme = current.dataset.theme;
      if (theme === 'hero') setVariant('');          // transparente
      else if (theme === 'light') setVariant('scrolled-light');
      else setVariant('scrolled-dark');
    };

    updateVariant(); // estado inicial al montar
    window.addEventListener('scroll', updateVariant, { passive: true });
    window.addEventListener('resize', updateVariant);

    return () => {
      window.removeEventListener('scroll', updateVariant);
      window.removeEventListener('resize', updateVariant);
    };
  }, []);

  // Cierra el menú al pasar a desktop o al pulsar Escape.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Bloquea el scroll del body mientras el panel está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Scroll suave a una sección por id (el CSS ya tiene scroll-padding-top).
  // Cierra el menú antes de desplazarse.
  const scrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${variant} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner container">
        <a
          href="#inicio"
          className="navbar-logo"
          onClick={(e) => scrollTo(e, 'inicio')}
        >
          Secure<span>IT</span>
        </a>

        {/* Links centrales — solo desktop */}
        <ul className="navbar-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — solo desktop */}
        <a
          href="#contacto"
          className="navbar-cta"
          onClick={(e) => scrollTo(e, 'contacto')}
        >
          Habla con nosotros
        </a>

        {/* Botón hamburguesa — solo mobile */}
        <button
          type="button"
          className={`navbar-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-toggle__line" />
          <span className="navbar-toggle__line" />
          <span className="navbar-toggle__line" />
        </button>
      </div>

      {/* Panel fullscreen — solo mobile */}
      <div
        id="navbar-menu"
        className={`navbar-menu ${menuOpen ? 'open' : ''}`}
      >
        <ul className="navbar-menu__links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="navbar-menu__cta"
          onClick={(e) => scrollTo(e, 'contacto')}
        >
          Habla con nosotros
        </a>
      </div>
    </nav>
  );
}
