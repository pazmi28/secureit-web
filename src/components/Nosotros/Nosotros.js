import './Nosotros.css';
import useReveal from '../../hooks/useReveal';

const STATS = [
  { num: '50+', label: 'empresas protegidas' },
  { num: '8+', label: 'años de experiencia' },
  { num: '0', label: 'brechas en clientes con monitorización' },
  { num: '2h', label: 'tiempo máximo de respuesta' },
];

const SECTORES = [
  'Pyme industrial',
  'Sector legal',
  'Sanidad privada',
  'Distribución',
  'Educación',
];

/**
 * Nosotros — sección clara con 4 stats grandes + fila de sectores.
 */
export default function Nosotros() {
  const ref = useReveal();

  return (
    <section id="nosotros" data-theme="light" className="nosotros" ref={ref}>
      <div className="container">
        <p className="nosotros-eyebrow reveal">Quiénes somos</p>
        <h2 className="nosotros-titulo reveal d1">
          Ciberseguridad de confianza, resultados que se miden
        </h2>
        <p className="nosotros-subtitulo reveal d2">
          Llevamos casi una década protegiendo a empresas de Zaragoza y todo
          Aragón. Cifras que respaldan nuestra forma de trabajar.
        </p>

        <div className="nosotros-stats reveal d3">
          {STATS.map((s) => (
            <div className="nosotros-stat" key={s.label}>
              <span className="nosotros-stat__num">{s.num}</span>
              <span className="nosotros-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="nosotros-sectores reveal d4">
          {SECTORES.map((sector) => (
            <span className="nosotros-pill" key={sector}>
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
