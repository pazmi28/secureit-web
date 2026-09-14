# Estado del proyecto — BytIA

> Bitácora compartida entre roles. Fuente de verdad de qué se ha hecho y qué queda abierto entre ejecuciones.
> Fase actual: pruebas de funcionamiento con 2 roles (Director, Desarrollo). Ver `docs/sistema-agentes-roles-secureit.md`.

## Cómo se usa este fichero

- Cada rol añade una entrada nueva al final del bloque del día correspondiente (no edites entradas de otros roles ni de días anteriores).
- El Director lee este fichero al empezar cada ejecución y lo relee después de que Desarrollo termine.
- Formato de entrada: qué se asignó/hizo, resultado, qué queda pendiente, y una nota si algo debería revisarlo un rol que todavía no existe (Diseño/Marketing/CEO).

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
