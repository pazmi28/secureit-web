# SecureIT — Contexto para Claude Code

## ¿Qué es este proyecto?
Web corporativa estática para una empresa de servicios informáticos especializada en ciberseguridad empresarial (firewalls, monitorización, auditorías, consultoría IT). Fase 1: web informativa para captación de clientes. Fase 2 futura: portal de clientes con autenticación.

## Stack técnico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | React 18 | Hooks, componentes funcionales |
| Estilos | CSS vanilla | SIN librerías UI externas (no MUI, Chakra, Tailwind) |
| Formulario | console.log por ahora | EmailJS se integrará en fase posterior |
| Despliegue | Vercel | Conectado a GitHub, auto-deploy en push a main |
| Versiones | Git + GitHub | Push a main = deploy automático |
| Lenguaje | JavaScript | Sin TypeScript |
| Package manager | npm | CRA como base |

**Reglas de stack:**
- NO instalar React Router — es una single page sin rutas
- NO instalar Firebase — no hay datos dinámicos en esta fase
- NO instalar librerías de animación (Framer Motion, GSAP) — usar CSS + Intersection Observer nativo
- CSS vanilla únicamente, comentar donde no sea obvio

## Estructura de carpetas

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── Hero/
│   │   ├── Hero.js
│   │   └── Hero.css
│   ├── Servicios/
│   │   ├── Servicios.js       ← grid 2x2 de cards
│   │   ├── ServicioCard.js    ← card individual reutilizable
│   │   └── Servicios.css
│   ├── DetalleServicio/
│   │   ├── DetalleServicio.js ← sección split texto+visual
│   │   └── DetalleServicio.css
│   ├── Nosotros/
│   │   ├── Nosotros.js
│   │   └── Nosotros.css
│   ├── Contacto/
│   │   ├── Contacto.js
│   │   └── Contacto.css
│   └── Footer/
│       ├── Footer.js
│       └── Footer.css
├── hooks/
│   └── useReveal.js           ← hook Intersection Observer reutilizable
├── App.js                     ← ensambla todas las secciones
├── App.css                    ← variables CSS globales + reset
└── index.js
```

## Diseño

### Paleta de colores
```css
:root {
  --dark:       #0a0a0f;   /* fondo hero y secciones oscuras */
  --dark2:      #111118;   /* fondo secciones oscuras alternativas */
  --light:      #f5f5f7;   /* fondo secciones claras */
  --light2:     #ffffff;   /* fondo secciones claras alternativas */
  --blue:       #1a8cff;   /* color de acento principal */
  --blue-dark:  #0f5faa;   /* hover del acento */
  --text-dark:  #f5f5f7;   /* texto sobre fondos oscuros */
  --text-muted: #a1a1aa;   /* texto secundario sobre fondos oscuros */
  --text-light: #1d1d1f;   /* texto sobre fondos claros */
  --text-light2:#6e6e73;   /* texto secundario sobre fondos claros */
  --border:     rgba(255,255,255,0.08); /* bordes sobre oscuro */
}
```

### Tipografía
- system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- SIN Google Fonts ni fuentes externas

### Comportamiento del Navbar
- Posición: fixed, z-index alto
- Estado inicial: transparente (sobre hero oscuro)
- Al hacer scroll sobre secciones claras: fondo rgba(245,245,247,0.85) + blur(20px) + borde inferior sutil — cambiar clase a `.scrolled-light`
- Al hacer scroll sobre secciones oscuras (después del hero): fondo rgba(10,10,15,0.82) + blur(20px) — clase `.scrolled-dark`
- Detectar con getBoundingClientRect() en el evento scroll
- Contiene: Logo | Links ancla | Botón CTA → #contacto

### Animaciones de scroll
- Usar Intersection Observer API (JS nativo, sin librerías)
- Clase base: `.reveal` → opacity:0 + translateY(28px)
- Clase activa: `.reveal.visible` → opacity:1 + translateY(0)
- Transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1)
- Delays escalonados con clases: `.d1` (0.12s) `.d2` (0.24s) `.d3` (0.36s) `.d4` (0.48s)
- Hook reutilizable en `hooks/useReveal.js`

### Estructura de secciones (orden fijo)
1. `<Navbar />` — fija
2. `<Hero />` — 100vh, fondo --dark
3. `<Servicios />` — 100vh, fondo --dark2, id="servicios"
4. `<DetalleServicio />` × 3 — 100vh c/u, alternando claro/oscuro
5. `<Nosotros />` — ~60vh, fondo --light2, id="nosotros"
6. `<Contacto />` — 100vh, fondo --dark, id="contacto"
7. `<Footer />` — fondo --dark, borde superior

## Secciones — detalle

### Hero
- Eyebrow: "Ciberseguridad empresarial · Zaragoza"
- Título: "Tu empresa, blindada." (la palabra "blindada" en color --blue)
- Subtítulo: descripción breve de servicios
- 2 botones: "Solicitar auditoría gratuita" (fill) + "Ver servicios" (outline → #servicios)
- Banda de 3 stats: 50+ empresas · 8+ años · 24/7
- Grid decorativo de fondo + glow radial central

### Servicios (grid 2×2)
Cada `<ServicioCard>` recibe props: `icono`, `nombre`, `descripcion`, `servicioId`
El botón "Consultar más info →" de cada card:
- Scrollea suavemente a `#contacto`
- Pre-rellena el `<select>` del formulario con el servicio correspondiente
- Implementar con `document.getElementById('servicio-select').value = servicioId`

**Servicios actuales (sustituir cuando se definan los reales):**
- Firewall Enterprise
- Monitorización 24/7
- Auditorías de Seguridad
- Consultoría IT

### DetalleServicio (sección split)
Props: `lado` ('izquierda'|'derecha'), `label`, `titulo`, `descripcion`, `visual`, `fondo` ('claro'|'oscuro')
- Firewall → lado izquierda, fondo claro, visual = SVG escudo
- Monitorización → lado derecha, fondo oscuro, visual = anillos de pulso animados CSS
- Auditorías → lado izquierda, fondo claro, visual = panel de estado (OK/Revisar/Crítico)
- Consultoría IT no tiene sección split propia → su CTA va directo a #contacto

### Nosotros
4 stats grandes: 50+ · 8+ · 0 · 2h
Fila de sectores: Pyme industrial · Sector legal · Sanidad privada · Distribución · Educación

### Contacto
Formulario con campos: nombre, empresa, email, teléfono, servicio (select), mensaje
**Por ahora:** onSubmit → console.log(formData) — NO integrar EmailJS todavía
El select de servicio tiene id="servicio-select" para que los botones de las cards puedan pre-rellenarlo
Datos de contacto: hola@secureit.es · +34 976 000 000 · Zaragoza, España (placeholder)

## Variables de entorno
No se necesitan en esta fase (sin Firebase, sin EmailJS aún).
Cuando se integre EmailJS añadir:
```
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
```

## Estado actual

### Completado
- [x] Análisis del proyecto
- [x] Mockup validado (Claude.ai chat — paleta azul tech oscuro)
- [x] Arquitectura decidida
- [x] CLAUDE.md creado

### Pendiente
- [ ] Limpiar App.js (eliminar boilerplate CRA)
- [ ] Crear variables CSS globales en App.css
- [ ] Crear hook useReveal.js
- [ ] Componente Navbar con lógica de scroll
- [ ] Componente Hero
- [ ] Componente Servicios + ServicioCard con botón pre-relleno
- [ ] Componentes DetalleServicio × 3
- [ ] Componente Nosotros
- [ ] Componente Contacto con formulario (console.log)
- [ ] Componente Footer
- [ ] Ensamblar en App.js
- [ ] Test responsive mobile
- [ ] Deploy en Vercel

## Instrucciones generales para Claude Code
- Construir componente a componente, en el orden del checklist
- Cada componente tiene su propio fichero CSS (no CSS global salvo variables)
- Los componentes NUNCA usan estilos inline salvo casos muy puntuales justificados
- Comentar el CSS donde la lógica no sea obvia (ej: truco de navbar con blur)
- El hook useReveal.js debe ser reutilizable en todos los componentes
- Respetar la paleta de variables CSS — nunca hardcodear colores en los componentes
- Mobile-first: probar siempre con @media (max-width: 768px)
- Al terminar cada componente, confirmar antes de pasar al siguiente
