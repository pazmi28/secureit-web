import './Servicios.css';
import ServicioCard from './ServicioCard';
import useReveal from '../../hooks/useReveal';

// Los servicioId deben coincidir con los <option value> de #servicio-select
// en el formulario de Contacto.
const SERVICIOS = [
  {
    icono: '🛡️',
    nombre: 'Firewall Enterprise',
    descripcion:
      'Perímetro blindado con firewalls de nueva generación, filtrado avanzado y reglas a medida para tu red corporativa.',
    servicioId: 'firewall',
  },
  {
    icono: '📡',
    nombre: 'Monitorización 24/7',
    descripcion:
      'Vigilancia continua de tu infraestructura con detección de amenazas en tiempo real y respuesta inmediata.',
    servicioId: 'monitorizacion',
  },
  {
    icono: '🔍',
    nombre: 'Auditorías de Seguridad',
    descripcion:
      'Análisis exhaustivo de vulnerabilidades y test de intrusión para identificar y cerrar brechas antes que nadie.',
    servicioId: 'auditorias',
  },
  {
    icono: '💼',
    nombre: 'Consultoría IT',
    descripcion:
      'Acompañamiento estratégico en ciberseguridad y cumplimiento normativo adaptado a las necesidades de tu negocio.',
    servicioId: 'consultoria',
  },
];

/**
 * Servicios — sección con grid 2×2 de cards. Fondo oscuro --dark2.
 */
export default function Servicios() {
  const ref = useReveal();

  return (
    <section
      id="servicios"
      data-theme="dark"
      className="servicios"
      ref={ref}
    >
      <div className="container">
        <p className="servicios-eyebrow reveal">Qué hacemos</p>
        <h2 className="servicios-titulo reveal d1">
          Servicios que mantienen tu negocio a salvo
        </h2>
        <p className="servicios-subtitulo reveal d2">
          Soluciones de ciberseguridad de extremo a extremo, diseñadas para
          empresas que no pueden permitirse parar.
        </p>

        <div className="servicios-grid reveal d3">
          {SERVICIOS.map((s) => (
            <ServicioCard key={s.servicioId} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
