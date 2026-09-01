import { useState } from 'react';
import './Servicios.css';
import ServicioCard from './ServicioCard';
import SoporteTecnicoCard from './SoporteTecnicoCard';
import useReveal from '../../hooks/useReveal';

// Los servicioId deben coincidir con los <option value> de #servicio-select
// en el formulario de Contacto.
const SERVICIOS_CIBERSEGURIDAD = [
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

// Catálogo de arranque: servicios sueltos de bajo compromiso, pensados para
// captar al usuario que busca algo puntual (particulares y pequeñas pymes)
// antes de convertirse en cliente de mantenimiento recurrente o de los
// servicios de ciberseguridad del otro tab.
const SERVICIOS_SOPORTE = [
  {
    icono: '💽',
    nombre: 'Formateo e instalación de Windows',
    resumen: 'Equipo limpio, rápido y con todos los drivers al día.',
    detalle:
      'Copiamos tus archivos importantes, formateamos el disco e instalamos Windows desde cero con todos los drivers del fabricante. Configuramos las actualizaciones, un antivirus básico y los programas esenciales que nos indiques.',
    incluye: [
      'Copia de seguridad de tus archivos antes de empezar',
      'Instalación limpia de Windows + drivers',
      'Configuración de actualizaciones y antivirus',
      'Instalación de hasta 3 programas a elegir',
    ],
    precio: 'Desde 35€',
    duracion: '24-48h',
  },
  {
    icono: '🦠',
    nombre: 'Eliminación de virus y malware',
    resumen: 'Tu equipo lento o con anuncios raros, limpio de nuevo.',
    detalle:
      'Analizamos el equipo con varias herramientas profesionales para detectar y eliminar virus, malware, barras de herramientas y programas no deseados. Revisamos también el arranque para que el rendimiento vuelva a la normalidad.',
    incluye: [
      'Análisis completo con herramientas profesionales',
      'Eliminación de virus, malware y adware',
      'Limpieza de programas de inicio',
      'Recomendaciones para evitar reinfecciones',
    ],
    precio: 'Desde 30€',
    duracion: '1-2h',
  },
  {
    icono: '⚙️',
    nombre: 'Ampliación de memoria RAM',
    resumen: 'Más memoria, más fluidez con varios programas abiertos.',
    detalle:
      'Valoramos qué memoria admite tu equipo, la instalamos y comprobamos que el sistema la reconoce correctamente. Ideal si notas que el ordenador se ralentiza al abrir varias pestañas o programas a la vez.',
    incluye: [
      'Diagnóstico de compatibilidad',
      'Instalación de los nuevos módulos',
      'Comprobación de estabilidad',
      'Memoria no incluida en el precio de mano de obra',
    ],
    precio: 'Desde 20€ + memoria',
    duracion: '30 min',
  },
  {
    icono: '💾',
    nombre: 'Cambio de disco a SSD',
    resumen: 'El upgrade que más se nota: arranques en segundos.',
    detalle:
      'Sustituimos tu disco duro mecánico por un SSD y clonamos todo tu sistema, programas y archivos tal cual estaban, sin tener que reinstalar nada. Es el cambio con mayor mejora de velocidad percibida.',
    incluye: [
      'Clonado completo del disco actual',
      'Instalación física del SSD',
      'Verificación de arranque e integridad de datos',
      'Disco no incluido en el precio de mano de obra',
    ],
    precio: 'Desde 50€ + disco',
    duracion: '1-2h',
  },
  {
    icono: '🖥️',
    nombre: 'Cambio de pantalla de portátil',
    resumen: 'Pantalla rota o con líneas, sustituida con garantía.',
    detalle:
      'Sustituimos la pantalla dañada por una compatible con tu modelo exacto. Revisamos también la bisagra y el cableado de vídeo para descartar otras causas antes de dar el equipo por cerrado.',
    incluye: [
      'Diagnóstico del panel y del cableado de vídeo',
      'Sustitución de la pantalla',
      'Comprobación de imagen y táctil (si aplica)',
      'Pantalla no incluida en el precio de mano de obra',
    ],
    precio: 'Desde 40€ + pantalla',
    duracion: '24-48h',
  },
  {
    icono: '🧩',
    nombre: 'Instalación y configuración de software',
    resumen: 'Office, impresoras, VPN o el programa que necesites, listo.',
    detalle:
      'Instalamos y configuramos el software que necesites en tu día a día: paquete ofimático, impresoras en red, clientes de correo, VPN o programas de gestión. Dejamos todo probado y funcionando antes de irnos.',
    incluye: [
      'Instalación y activación del software',
      'Configuración según tu forma de trabajar',
      'Prueba funcional antes de finalizar',
      'Licencias no incluidas si el software es de pago',
    ],
    precio: 'Desde 20€',
    duracion: '30-60 min',
  },
];

const TABS = [
  { id: 'soporte', label: 'Soporte & Mantenimiento' },
  { id: 'ciberseguridad', label: 'Ciberseguridad Empresarial' },
];

/**
 * Servicios — sección única con dos tabs:
 *   1) Soporte & Mantenimiento (activo por defecto) — catálogo de servicios
 *      sueltos con acordeón <details>, pensado como puerta de entrada de
 *      bajo compromiso para particulares y pequeñas pymes.
 *   2) Ciberseguridad Empresarial — grid 2×2 de las cards enterprise.
 *
 * El cambio de tab se controla con useState, sin librerías. Cada panel se
 * renderiza condicionalmente (no ambos a la vez) para que el fade de
 * `.servicios-panel` se dispare de nuevo en cada cambio.
 */
export default function Servicios() {
  const ref = useReveal();
  const [tabActivo, setTabActivo] = useState('soporte');

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
          Servicios que mantienen tu negocio funcionando
        </h2>
        <p className="servicios-subtitulo reveal d2">
          Desde una reparación puntual hasta la ciberseguridad de toda tu
          empresa: elige lo que necesitas.
        </p>

        <div className="servicios-tabs reveal d3" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tabActivo === tab.id}
              className={`servicios-tab ${
                tabActivo === tab.id ? 'is-active' : ''
              }`}
              onClick={() => setTabActivo(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabActivo === 'soporte' ? (
          <div key="soporte" role="tabpanel" className="servicios-panel">
            <div className="soporte-grid">
              {SERVICIOS_SOPORTE.map((s) => (
                <SoporteTecnicoCard key={s.nombre} {...s} />
              ))}
            </div>
          </div>
        ) : (
          <div
            key="ciberseguridad"
            role="tabpanel"
            className="servicios-panel"
          >
            <div className="servicios-grid">
              {SERVICIOS_CIBERSEGURIDAD.map((s) => (
                <ServicioCard key={s.servicioId} {...s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
