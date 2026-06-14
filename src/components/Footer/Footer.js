import './Footer.css';

const NAV_LINKS = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Contacto', id: 'contacto' },
];

/**
 * Footer — fondo oscuro --dark con borde superior sutil.
 * Logo + copyright a la izquierda, links a la derecha (desktop).
 */
export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer data-theme="dark" className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a
            href="#inicio"
            className="footer-logo"
            onClick={(e) => scrollTo(e, 'inicio')}
          >
            Secure<span>IT</span>
          </a>
          <p className="footer-copy">
            © 2026 SecureIT · Ciberseguridad empresarial · Zaragoza
          </p>
        </div>

        <div className="footer-links">
          <nav className="footer-nav">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
                {l.label}
              </a>
            ))}
          </nav>
          <nav className="footer-legal">
            {/* href temporal "/" hasta que existan las páginas legales.
                Evita el error jsx-a11y/anchor-is-valid del build de Vercel. */}
            <a href="/">Política de privacidad</a>
            <a href="/">Aviso legal</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
