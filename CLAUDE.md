# BytIA — Contexto para Claude Code

## ¿Qué es este proyecto?
Web corporativa estática para una empresa de soporte técnico, mantenimiento informático y ciberseguridad empresarial (soporte y mantenimiento como puerta de entrada; firewalls, monitorización, auditorías y consultoría IT como catálogo enterprise a futuro, una vez haya cartera de clientes). Fase 1: web informativa para captación de clientes. Fase 2 futura: portal de clientes con autenticación.

## Marca

| Elemento | Valor |
|----------|-------|
| Nombre | BytIA |
| Lema | "Pensamos en bytes, hablamos en soluciones." |
| Dominio | bytia.net (Hostalia) |
| Email corporativo | hola@bytia.net |
| Localización | Zaragoza, España |

### Logo
- **Concepto:** Wordmark tipográfico — la letra "B" rediseñada con trazos de circuito PCB y 3 conectores cuadrados a la izquierda. "Byt" en blanco, "IA" en azul eléctrico.
- **Estado:** Referencia generada (ChatGPT/DALL-E). Pendiente refinado final en Illustrator con tipografía Inter Bold real.
- **Archivos:** pendiente — guardar en `/public/logo.svg` cuando esté listo el vector.

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
│   │   ├── Servicios.js          ← sección única con 2 tabs (Soporte & Mantenimiento · Ciberseguridad Empresarial)
│   │   ├── ServicioCard.js       ← card del tab Ciberseguridad Empresarial (grid 2×2)
│   │   ├── SoporteTecnicoCard.js ← card <details> del tab Soporte & Mantenimiento (CTA WhatsApp/email)
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
> Nota: `components/SoporteTecnico/SoporteTecnico.css` quedó huérfano (sin importar desde ningún sitio) tras fusionar esa sección como tab dentro de `Servicios`. Se dejó sin borrar a propósito; pendiente decidir si se elimina.

## Diseño

### Tipografía
- system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- SIN Google Fonts ni fuentes externas

### Comportamiento del Navbar
- Posición: fixed, z-index alto
- Estado inicial: transparente (sobre hero oscuro)
- Al hacer scroll sobre secciones claras: fondo rgba(245,245,247,0.85) + blur(20px) + borde inferior sutil — cambiar clase a `.scrolled-light`
- Al hacer scroll sobre secciones oscuras (después del hero): fondo rgba(10,10,15,0.82) + blur(20px) — clase `.scrolled-dark`
- Detectar con getBoundingClientRect() en el evento scroll
- Contiene: Logo BytIA | Links ancla | Botón CTA → #contacto

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
3. `<Servicios />` — 100vh, fondo --dark2, id="servicios" — 2 tabs: Soporte & Mantenimiento (activo por defecto) · Ciberseguridad Empresarial
4. `<DetalleServicio />` × 3 — 100vh c/u (Firewall dark · Monitorización light · Auditorías dark)
5. `<Nosotros />` — ~60vh, fondo --light2, id="nosotros"
6. `<Contacto />` — 100vh, fondo --dark, id="contacto"
7. `<Footer />` — fondo --dark, borde superior

## Secciones — detalle

### Hero
- Eyebrow: "Soporte técnico y ciberseguridad · Zaragoza"
- Título: "Pensamos en bytes, hablamos en soluciones." (la palabra "bytes" en color --blue)
- Subtítulo: soporte técnico, mantenimiento y ciberseguridad — enfoque en soporte primero, ciberseguridad como parte de un catálogo más amplio
- 2 botones: "Solicitar diagnóstico gratuito" (fill) + "Ver servicios" (outline → #servicios)
- Banda de 3 stats: 50+ clientes atendidos · 8+ años de experiencia · 24-48h tiempo medio de respuesta
- Grid decorativo de fondo + glow radial central

### Servicios (sección con 2 tabs, id="servicios")
Estado del tab activo controlado con `useState` (sin librerías). Tab activo por defecto: **Soporte & Mantenimiento**. Cada panel se monta/desmonta condicionalmente al cambiar de tab (no ambos a la vez), lo que dispara una animación de fade en CSS (`@keyframes`, respeta `prefers-reduced-motion`) sin necesitar JS de animación.

**Tab 1 — Soporte & Mantenimiento** (catálogo de servicios sueltos, puerta de entrada de bajo compromiso)
Cada `<SoporteTecnicoCard>` es un `<details>`/`<summary>` nativo (accesible, sin JS para abrir/cerrar) con props: `icono`, `nombre`, `resumen`, `detalle`, `incluye` (array), `precio`, `duracion`.
Al desplegarse muestra el detalle completo y dos botones de contacto directo:
- WhatsApp → `https://wa.me/<numero>?text=...` con el nombre del servicio precargado
- Email → `mailto:hola@bytia.net?subject=...&body=...`
Número de WhatsApp Business real: +34 631 019 668.

**Tab 2 — Ciberseguridad Empresarial** (grid 2×2 de cards)
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
Props: `id`, `dataTheme` ('dark'|'light'), `lado` ('izquierda'|'derecha'), `label`, `titulo`, `descripcion`, `servicioId`, `visual` (JSX)
- Firewall → lado izquierda, fondo oscuro (dark), visual = SVG escudo con checkmark azul
- Monitorización → lado derecha, fondo claro (light), visual = anillos de pulso animados CSS
- Auditorías → lado izquierda, fondo oscuro (dark), visual = panel de estado (OK/Revisar/Crítico)
- Consultoría IT no tiene sección split propia → su CTA va directo a #contacto

### Nosotros
Título: "El soporte informático de confianza, resultados que se miden"
4 stats grandes: 50+ clientes atendidos · 8+ años de experiencia · 98% incidencias resueltas a la primera · 2h tiempo máximo de respuesta
Fila de sectores: Pyme industrial · Sector legal · Sanidad privada · Distribución · Educación

### Contacto
Título: "Cuéntanos qué necesitas" (evitar framing exclusivo de seguridad)
Formulario con campos: nombre, empresa, email, teléfono, servicio (select), mensaje
El select de servicio incluye una opción genérica "Soporte técnico y mantenimiento" (value="mantenimiento") antes de las 4 opciones enterprise, para quien llega directo al formulario sin pasar por una card
**Por ahora:** onSubmit → console.log(formData) — NO integrar EmailJS todavía
El select de servicio tiene id="servicio-select" para que los botones de las cards puedan pre-rellenarlo
Datos de contacto: hola@bytia.net · +34 976 000 000 · Zaragoza, España (placeholder teléfono)

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
- [x] Mockup validado (paleta azul tech oscuro)
- [x] Arquitectura decidida
- [x] CLAUDE.md creado
- [x] Nombre de marca: BytIA
- [x] Lema: "Pensamos en bytes, hablamos en soluciones."
- [x] Dominio registrado: bytia.net (Hostalia)
- [x] Email corporativo: hola@bytia.net
- [x] Logo — concepto definido (B-circuito), referencia generada, pendiente vector Illustrator
- [x] Marca verificada en OEPM (0 resultados para "bytia")

### Pendiente — Marca
- [ ] Refinado logo en Illustrator (Inter Bold + trazados B-circuito) → guardar en /public/logo.svg
- [ ] Registro marca OEPM (opcional pero recomendable)
- [ ] Definir servicios reales (sustituir placeholders del grid)
- [ ] Google My Business
- [ ] Configurar email corporativo hola@bytia.net en cliente de correo

### Pendiente — Desarrollo
- [ ] Limpiar App.js (eliminar boilerplate CRA)
- [ ] Crear variables CSS globales en App.css
- [ ] Crear hook useReveal.js
- [ ] Componente Navbar con lógica de scroll
- [ ] Componente Hero
- [ ] Componente Servicios con tabs (Soporte & Mantenimiento · Ciberseguridad Empresarial) + ServicioCard/SoporteTecnicoCard
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
