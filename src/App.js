import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Servicios from './components/Servicios/Servicios';
import DetalleServicio from './components/DetalleServicio/DetalleServicio';
import {
  EscudoVisual,
  PulsoVisual,
  AuditoriaVisual,
} from './components/DetalleServicio/Visuals';
import Nosotros from './components/Nosotros/Nosotros';
import Contacto from './components/Contacto/Contacto';
import Footer from './components/Footer/Footer';

function App() {
  // Las secciones se ensamblan en el orden definido en CLAUDE.md:
  // Navbar · Hero · Servicios · DetalleServicio ×3 · Nosotros · Contacto · Footer
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Servicios />

      <DetalleServicio
        id="detalle-firewall"
        dataTheme="dark"
        lado="izquierda"
        label="Firewall Enterprise"
        titulo="Un perímetro que no cede"
        descripcion="Desplegamos firewalls de nueva generación con filtrado avanzado, segmentación de red y reglas a medida. Tu tráfico, inspeccionado y controlado las 24 horas."
        servicioId="firewall"
        visual={<EscudoVisual />}
      />

      <DetalleServicio
        id="detalle-monitorizacion"
        dataTheme="light"
        lado="derecha"
        label="Monitorización 24/7"
        titulo="Vigilancia que nunca duerme"
        descripcion="Supervisamos tu infraestructura en tiempo real y detectamos anomalías antes de que se conviertan en incidentes. Respuesta inmediata ante cualquier amenaza."
        servicioId="monitorizacion"
        visual={<PulsoVisual />}
      />

      <DetalleServicio
        id="detalle-auditorias"
        dataTheme="dark"
        lado="izquierda"
        label="Auditorías de Seguridad"
        titulo="Conoce tus puntos débiles"
        descripcion="Analizamos tu seguridad de extremo a extremo con tests de intrusión y revisión de configuraciones. Te entregamos un informe claro con prioridades y plan de acción."
        servicioId="auditorias"
        visual={<AuditoriaVisual />}
      />

      <Nosotros />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
