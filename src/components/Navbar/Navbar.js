import { useEffect, useState } from 'react';
import './Navbar.css';

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
 */
export default function Navbar() {
  // '' = transparente | 'scrolled-dark' | 'scrolled-light'
  const [variant, setVariant] = useState('');

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

  // Scroll suave a una sección por id (el CSS ya tiene scroll-padding-top).
  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${variant}`}>
      <div className="navbar-inner container">
        <a
          href="#inicio"
          className="navbar-logo"
          onClick={(e) => scrollTo(e, 'inicio')}
        >
          Secure<span>IT</span>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="#servicios" onClick={(e) => scrollTo(e, 'servicios')}>
              Servicios
            </a>
          </li>
          <li>
            <a href="#nosotros" onClick={(e) => scrollTo(e, 'nosotros')}>
              Nosotros
            </a>
          </li>
          <li>
            <a href="#contacto" onClick={(e) => scrollTo(e, 'contacto')}>
              Contacto
            </a>
          </li>
        </ul>

        <a
          href="#contacto"
          className="navbar-cta"
          onClick={(e) => scrollTo(e, 'contacto')}
        >
          Habla con nosotros
        </a>
      </div>
    </nav>
  );
}
