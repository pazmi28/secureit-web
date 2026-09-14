# Estado del proyecto — BytIA

> Bitácora compartida entre roles. Fuente de verdad de qué se ha hecho y qué queda abierto entre ejecuciones.
> Fase actual: pruebas de funcionamiento con 3 roles (Director, Desarrollo, Marketing — este último incorporado el 2026-09-15 en modo práctica). Ver `docs/sistema-agentes-roles-secureit.md`.

## Cómo se usa este fichero

- Cada rol añade una entrada nueva al final del bloque del día correspondiente (no edites entradas de otros roles ni de días anteriores).
- El Director lee este fichero al empezar cada ejecución y lo relee después de que cada rol operativo termine.
- Formato de entrada: qué se asignó/hizo, resultado, qué queda pendiente, y una nota si algo debería revisarlo un rol que todavía no existe (Diseño/CEO).

---

## 2026-09-14

### Director
- **Contexto:** Puesta en marcha del sistema de roles. Arranque en fase de pruebas con 2 roles activos (Director, Desarrollo); el resto de roles del diseño completo (`docs/sistema-agentes-roles-secureit.md`) quedan para más adelante.
- **Tarea asignada:** Housekeeping — (1) eliminar `SoporteTecnico.css` huérfano, (2) actualizar checklist "Pendiente — Desarrollo" de `CLAUDE.md` a la realidad del código.
- **Dispara a:** Desarrollo

### Director (cierre)
- **Resultado revisado:** confirmado con `git status`/`git diff` — `SoporteTecnico.css` y su carpeta eliminados, nota huérfana quitada de `CLAUDE.md`, checklist "Pendiente — Desarrollo" actualizado (10 ítems marcados `[x]`, quedan sin marcar solo "Test responsive mobile" y "Deploy en Vercel", correctamente porque no son verificables leyendo código). Build en verde.
- **Nota de proceso:** en esta ejecución el subagente `desarrollo` (`.claude/agents/desarrollo.md`) no apareció disponible por el tool Agent — probablemente porque la sesión ya estaba iniciada cuando se creó el fichero. Se ejecutó la tarea con el agente `general-purpose` usando el mismo prompt de rol como workaround. Pendiente de validar en un chat nuevo si `desarrollo` aparece ya en la lista de subagentes.
- **Sin encadenar:** ningún rol adicional activo en esta fase (Diseño/Marketing/CEO no existen todavía). Nota para cuando existan: nada relevante que revisar de esta tarea (housekeeping puro, sin cambios visuales ni de contenido).
- **Queda abierto:** cambios sin commitear (a la espera de que el usuario confirme si quiere que se commiteen), y validar en chat nuevo la disponibilidad del subagente `desarrollo`.

### Desarrollo
- **Hecho:** Housekeeping de dos tareas asignadas por Director. (1) Confirmado que ningún archivo importaba `src/components/SoporteTecnico/SoporteTecnico.css`; eliminado el archivo y la carpeta `SoporteTecnico/` (quedó vacía), y quitada la nota de huérfano correspondiente en `CLAUDE.md`. (2) Revisado `src/` y `src/App.js` contra el checklist "Pendiente — Desarrollo" de `CLAUDE.md`: marcados como hechos todos los ítems ya implementados y ensamblados (App.js limpio, variables CSS globales, useReveal.js, Navbar, Hero, Servicios con tabs + ServicioCard/SoporteTecnicoCard, DetalleServicio ×3, Nosotros, Contacto con formulario, Footer, ensamblaje en App.js); quedan sin marcar solo "Test responsive mobile" y "Deploy en Vercel", que no son verificables leyendo código.
- **Build/lint:** OK — `npm run build` (CI=true) compila con "Compiled successfully.", sin warnings de ESLint.
- **Pendiente:** Test responsive mobile y Deploy en Vercel (fuera del alcance de este housekeeping).
- **Nota para futuros roles:** ninguna

### Desarrollo
- **Hecho:** Prueba de verificación del flujo de roles Director→Desarrollo. Modificado el `<h1>` del Hero (`src/components/Hero/Hero.js`, línea 30-31): añadido " (prueba de roles)" al final del texto, después del punto, como texto plano dentro del mismo `<h1>`. El `<span>bytes</span>` se dejó intacto. No se tocó nada más de `Hero.js` ni de otros componentes.
- **Build/lint:** OK — `npm run build` compila con "Compiled successfully.", sin warnings nuevos.
- **Pendiente:** ninguno de esta tarea. El texto "(prueba de roles)" es temporal para la prueba del flujo; revertirlo cuando el Director lo indique.
- **Nota para futuros roles:** ninguna (cambio puramente de verificación, sin impacto visual/de contenido definitivo).

---

## 2026-09-15

### Desarrollo
- **Hecho:** Revertida la prueba de verificación del flujo de roles. En `src/components/Hero/Hero.js` (línea 30-31) se quitó el sufijo " (prueba de roles)" del `<h1>`, dejando el titular tal como estaba originalmente ("Pensamos en `bytes`, hablamos en soluciones."). No se tocó nada más del fichero. Confirmado en producción (Vercel) que el flujo Director→Desarrollo funcionó correctamente en la tarea anterior.
- **Build/lint:** OK — `npm run build` compila con "Compiled successfully.", sin warnings de ESLint.
- **Pendiente:** ninguno de esta tarea.
- **Nota para futuros roles:** ninguna.

### Director
- **Contexto:** El usuario pidió sustituir el logo genérico de texto del Navbar por el nuevo logo (`docs/logo_bytia.png`, referencia PNG con fondo negro sólido, aportada por el usuario), ajustando el tamaño.
- **Tarea ejecutada directamente** (sin encadenar al subagente `desarrollo`, por tratarse de un cambio acotado a un solo componente): copiado el PNG a `public/logo-bytia.png`; `Navbar.js` ahora renderiza `<img src="/logo-bytia.png" alt="BytIA">` en vez del wordmark de texto; `Navbar.css` envuelve el logo en una chip oscura (`.navbar-logo`, `background: var(--dark)`, `border-radius: 8px`) con `border`/`box-shadow` sutil solo en variante `.scrolled-light` para que tenga contraste sobre fondos claros — el fondo negro del PNG se funde con la chip en las variantes oscura/transparente. Imagen a `height: 40px` dentro de la chip.
- **Verificado visualmente** con `agent-browser` sobre el build de producción (`npm run build` + `serve`): navbar transparente sobre el hero, navbar oscuro (`.scrolled-dark`, sección Servicios) y navbar claro (`.scrolled-light`, sección Nosotros), más viewport mobile (390×844, con y sin menú hamburguesa abierto). En los tres estados y en mobile el tamaño y contraste de la chip se ven correctos.
- **Build/lint:** OK — `npm run build` (CI=true) compila con "Compiled successfully.".
- **Actualizado `CLAUDE.md`:** sección "Logo" — estado, ruta del archivo actual y nota de implementación sobre la chip (para revisar cuando llegue el vector SVG final).
- **Pendiente:** (1) el PNG pesa ~860KB, sin comprimir — no hay herramientas de imagen (ImageMagick/PIL/sharp) disponibles en este entorno para optimizarlo ahora; recomendable comprimirlo o sustituirlo por el SVG final antes de dar por cerrada la marca. (2) Vector final en Illustrator sigue pendiente (ya estaba en el checklist de marca de `CLAUDE.md`); cuando llegue, revisar si la chip de fondo oscuro del Navbar sigue haciendo falta (el SVG debería traer fondo transparente).
- **Nota para futuros roles:** ninguna (cambio de marca/UI, no hay roles de Diseño/Marketing activos todavía).
- **Sin commitear:** cambios en working tree a la espera de confirmación del usuario.

### Director
- **Contexto:** El usuario pidió incorporar el rol de Marketing para empezar a practicar cómo funcionaría el planning semanal de publicaciones de contenido, usando de forma explícita información de la web todavía no definitiva (servicios placeholder, stats/teléfono sin confirmar en `CLAUDE.md`).
- **Acción tomada:** Creado `.claude/agents/marketing.md` (rol Marketing, incluye SEO) siguiendo el mismo patrón que Director/Desarrollo. Actualizado `.claude/agents/director.md` para reconocer 3 roles activos y añadir lógica de encadenado hacia Marketing. Actualizado `docs/sistema-agentes-roles-secureit.md` (fase actual y checklist) y la cabecera de este fichero.
- **Tarea asignada:** generar un primer planning semanal de práctica en `docs/marketing/planning-semanal.md`, a partir de las secciones "Marca", "Servicios" y "Nosotros" de `CLAUDE.md`, marcando explícitamente qué datos son placeholder (stats, teléfono, servicios del grid aún por definir).
- **Dispara a:** Marketing

### Marketing
- **Hecho:** Primera ejecución del rol Marketing (práctica). Leído `CLAUDE.md` (secciones "Marca", "Servicios — detalle" y "Nosotros") y este fichero para conocer el estado real del proyecto. Generado el primer planning semanal de práctica en `docs/marketing/planning-semanal.md`: 5 publicaciones (lunes a viernes), canal principal asumido LinkedIn (con Instagram como secundario para la publicación del miércoles), cubriendo: presentación de marca, servicio de Soporte & Mantenimiento (CTA a WhatsApp real +34 631 019 668), stats de "Nosotros", sectores atendidos, y adelanto del catálogo de Ciberseguridad Empresarial.
- **Pendiente (a confirmar por el usuario antes de publicar contenido real):** (1) canal social definitivo (se asumió LinkedIn/Instagram sin decisión explícita); (2) stats de "Nosotros" (50+ clientes, 8+ años, 98% incidencias resueltas a la primera, 2h tiempo máximo de respuesta) — usadas tal cual pero marcadas como placeholder en `CLAUDE.md`, sin verificación externa; (3) teléfono de contacto (+34 976 000 000, placeholder explícito en `CLAUDE.md`) — no se ha usado en ninguna publicación, se dirigió el CTA a WhatsApp o al formulario web en su lugar; (4) catálogo definitivo del grid de Ciberseguridad Empresarial (Firewall Enterprise, Monitorización 24/7, Auditorías de Seguridad, Consultoría IT), marcado en el propio `CLAUDE.md` como placeholder pendiente de sustituir por los servicios reales.
- **Nota para futuros roles:** Diseño (cuando exista) debería revisar si necesita piezas gráficas simples para acompañar estas publicaciones (tarjeta de stats, grid 2×2 de servicios, carrusel de sectores) — no se ha producido ningún gráfico en esta tarea, solo el copy y el formato sugerido. Nada que Desarrollo deba ajustar en la web a raíz de este planning (no se promociona ninguna función no implementada).

### Director (cierre)
- **Resultado revisado:** `docs/marketing/planning-semanal.md` generado correctamente — 5 publicaciones con aviso de contenido de práctica en cabecera, cada una con red social, copy, CTA, formato y fuente/nota de trazabilidad a `CLAUDE.md`. Los datos placeholder (stats, teléfono, catálogo enterprise, canal social) quedan marcados de forma explícita y no se usó el teléfono placeholder en ningún CTA. No se tocó código de `src/` ni el checklist de `CLAUDE.md`.
- **Nota de proceso:** igual que ocurrió con `desarrollo` el 2026-09-14, el subagente `marketing` no apareció disponible por el tool Agent en esta misma sesión (se creó el fichero `.claude/agents/marketing.md` después de que la sesión ya estuviera iniciada). Se ejecutó con `general-purpose` pasando el prompt de rol completo como workaround. Pendiente de validar en un chat nuevo si `marketing` aparece ya en la lista de subagentes.
- **Sin encadenar:** Diseño y CEO siguen sin existir — la nota de Marketing sobre piezas gráficas queda registrada para cuando Diseño exista, sin actuar en su nombre. No hace falta encadenar a Desarrollo (el planning no promociona nada no implementado).
- **Queda abierto:** validar la disponibilidad de `marketing` como subagente en un chat nuevo; y antes de cualquier publicación real, que el usuario confirme canal social, stats verificadas, teléfono corporativo real y catálogo definitivo de servicios enterprise. Cambios sin commitear a la espera de confirmación del usuario.

---
