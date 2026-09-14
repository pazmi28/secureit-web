# Sistema multiagente por roles — Proyecto BytIA
> Fecha: 2026-09-13 · Actualizado: 2026-09-14 (rebrand SecureIT → BytIA, arranque en fase de pruebas)
> Chat de referencia: Claude.ai
> Complementa: `metodologia_test.md` y `estado_actual_web-informatica-v1.md`

---

## 🎯 Objetivo

Definir una estructura de agentes/prompts por rol (a modo de "empresa simulada") para mantener y hacer evolucionar la web corporativa de BytIA de forma más autónoma, con un rol Director que reparte trabajo y un rol CEO que revisa el conjunto.

---

## 🧪 Fase actual: pruebas de funcionamiento con 2 roles

Antes de construir los 5 roles completos, se arranca solo con **Director** y **Desarrollo** para validar que el mecanismo básico funciona (lectura de `estado_proyecto.md`, asignación de tarea, ejecución, escritura de resultado) antes de invertir en CEO, Marketing, Diseño o en automatización con GitHub Actions.

- Motivo: el checklist de desarrollo de `CLAUDE.md` todavía tiene casi todos los componentes por construir — con un único responsable, Marketing/Diseño/CEO no tienen aún nada real que revisar (sin tráfico, sin contenido definitivo, sin Analytics).
- Alcance de esta fase: ejecución manual dentro de una sesión de Claude Code en VS Code. Sin GitHub Actions, sin headless, sin `CLAUDE_CODE_OAUTH_TOKEN` todavía.
- Los apartados de CEO, Marketing, Diseño y automatización que siguen en este documento quedan como diseño de referencia para cuando se amplíe el sistema — no se activan en esta fase.

---

## 👥 Roles definidos

Se descartó una lista extensa de roles tipo "empresa grande" en favor de algo ajustado al tamaño real del proyecto (MVP, un solo responsable, hosting en Vercel).

### Nivel dirección

**Director** — orquestador diario
- Lee `estado_proyecto.md` al inicio de cada ejecución.
- Prioriza qué rol(es) deben actuar según tareas pendientes y bloqueos.
- Redacta y asigna la tarea concreta a cada rol, con contexto suficiente.
- Tras cada rol que termina, revisa su entrada nueva en el fichero y decide si dispara a otro rol en cadena (ej. Desarrollo cambia el hero → dispara a Diseño para revisar coherencia visual, o a Marketing si afecta al mensaje).
- Cierra el día con un resumen breve de qué se hizo y qué queda abierto.

**CEO** — revisión periódica (no necesariamente diaria)
- Lee el histórico completo de `estado_proyecto.md`, no solo el último día.
- Detecta huecos: cosas que ningún rol cubre, o tareas repetidas sin cerrar.
- Evalúa si el ritmo de avance coincide con el roadmap (dominio, EmailJS, contenido real de empresa).
- Propone 2-3 prioridades estratégicas para los próximos días.
- Señala riesgos (ej. seguir con nombre/contenido placeholder demasiado tiempo).

### Roles operativos

**Desarrollo** (incluye lo que sería "Sistemas" en un VPS)
- Implementa los cambios de código que el Director asigna.
- Revisa dependencias (`npm audit`), actualiza paquetes sin romper el build de Vercel.
- Vigila variables de entorno y configuración de Vercel/Supabase.
- Comprueba que el build pasa el ESLint estricto antes de cerrar una tarea.
- Propone mejoras técnicas (rendimiento, estructura de componentes, deuda técnica).

> Nota: se decidió NO crear un rol "Sistemas" independiente. En Vercel (serverless, sin control de servidor) las tareas clásicas de sistemas (parcheo de SO, hardening, certificados) desaparecen. Lo poco que queda (dependencias, env vars, configuración de Vercel/Supabase) se absorbe dentro de Desarrollo. Si algún día se migra a VPS, sí tendría sentido separarlo de nuevo.

**Marketing** (incluye SEO)
- Planning semanal de publicaciones en redes.
- Redacta copys y briefs para Canva/CapCut (o conectores MCP si están disponibles).
- Metadatos, títulos, estructura de contenido para SEO básico.
- Analiza resultados cuando haya Google Analytics conectado.
- Propone mejoras de captación orgánica.

> Nota: se descartó un rol "SEO" independiente por ahora — se solapa mucho con Marketing y Desarrollo, y con tráfico aún bajo no hay suficiente que analizar día a día por separado. Queda como función dentro de Marketing, no descartado a futuro.

**Diseño**
- Revisa coherencia visual tras cambios de Desarrollo (paleta, tipografía, espaciados).
- Propone mejoras de UI/UX (ej. animación del menú hamburguesa pendiente).
- Valida que el sitio se mantiene fiel a la referencia Apple-style acordada.
- Señala inconsistencias entre secciones (dark/light alternancia, breakpoints móviles).

---

## 🔁 Flujo de trabajo

```
Director  →  lee estado_proyecto.md, reparte tareas
   ↓
Roles operativos (Desarrollo · Marketing · Diseño)
   ↓ (cada uno escribe su resultado)
estado_proyecto.md  ←→  Director (relee tras cada rol)
   ↓
Director encadena a otro rol si detecta dependencia
   (ej: Desarrollo cambia algo → dispara a Diseño/Marketing)
   ↓
CEO  →  revisión periódica del histórico completo, visión y propuestas
```

**Clave del encadenado reactivo**: en Claude Code, los subagentes no se llaman entre sí directamente — es siempre el hilo principal (el Director) quien delega. Por eso el prompt del Director debe decir explícitamente: *"tras cada subagente que termine, revisa el fichero central por entradas nuevas; si detectas cambios relevantes para otro rol, invócalo inmediatamente con ese contexto antes de continuar"*. Esto da un encadenado dentro de la misma ejecución, no entre ejecuciones independientes.

**Fichero central**: `estado_proyecto.md` (o una tabla en Supabase más adelante) actúa como bitácora compartida — cada agente escribe ahí qué hizo y qué propone, y es la única fuente de verdad entre roles.

---

## ⚙️ Mecanismo de ejecución: Claude Code

Dado que el flujo de trabajo habitual es local con VS Code + extensión de Claude Code, la vía natural son los **subagentes de Claude Code** (`.claude/agents/`): cada rol como subagente con su propio system prompt, contexto aislado y permisos de herramientas definidos.

### Ejecución manual
Se invoca dentro de una sesión de Claude Code en VS Code — el Director orquesta a los demás roles en esa misma sesión.

### Ejecución automática (headless)
Para que corra solo (ej. una vez al día) sin abrir VS Code:

- Usar el modo headless de Claude Code: `claude -p "prompt del rol"`.
- Alternativa a los subagentes internos: un script orquestador (bash/node) hace de "Director" externo — lee `estado_proyecto.md`, decide qué rol toca, y lanza `claude -p` con el prompt de ese rol como llamada independiente. Cada rol es un fichero de prompt + una invocación `claude -p`.

### ¿Requiere API de pago?
**No es obligatorio.** Confirmado en la documentación oficial de Claude Code:
- Con suscripción Pro/Max, se genera un token con `claude setup-token`, que produce un `CLAUDE_CODE_OAUTH_TOKEN`. Este token se guarda como secret en GitHub y sustituye a `ANTHROPIC_API_KEY` — el uso se factura contra la suscripción, no como API de pago aparte.
- **Importante**: esto solo funciona sin el flag `--bare`. En modo `--bare` (arranque más rápido, sin subagentes/skills/hooks), Claude Code exige sí o sí `ANTHROPIC_API_KEY`. Como el flujo de roles necesita subagentes, no se debe usar `--bare`.
- El token puede expirar o invalidarse (ej. si cierras sesión localmente, o al cambiar de plan Pro→Max) — revisar si el workflow empieza a fallar con error de autenticación.
- El uso sigue contando contra los límites de uso del plan personal — con 5 roles ejecutándose a diario, vigilar el consumo las primeras semanas.

---

## 🤖 Automatización con GitHub Actions

Dado que el proyecto ya se despliega vía GitHub → Vercel (auto-deploy en push a main), GitHub Actions es el encaje natural para correr los agentes en segundo plano, sin infraestructura nueva.

**Diseño propuesto**:
- Workflow `.github/workflows/agentes-diarios.yml` con `schedule: cron`.
- El runner hace checkout del repo, instala Claude Code CLI, y ejecuta `claude -p` con el prompt de cada rol (Director primero, luego los que él decida).
- Los agentes escriben en `estado_proyecto.md`, y el workflow hace commit y push de los cambios.

**Puntos a vigilar**:
1. `CLAUDE_CODE_OAUTH_TOKEN` como secret de GitHub (ver sección anterior).
2. **Vercel puede disparar un deploy** cada vez que el workflow hace push, aunque solo cambie el fichero de estado. Mitigación: que los agentes escriban a una rama aparte, o configurar en Vercel la opción "Ignored Build Step" para que ignore builds cuando el único cambio sea ese fichero.

---

## 🖥️ Entorno de trabajo recomendado

**VS Code + extensión de Claude Code**, no Claude Desktop con Cowork.

Motivo: todo lo definido aquí (subagentes, ficheros de configuración `.claude/`, workflow de GitHub Actions, cambios en el repo web) es trabajo de código sobre un repositorio — el terreno natural de Claude Code. Cowork está orientado a trabajo de oficina no técnico (documentos, hojas de cálculo, tareas delegadas sobre apps de escritorio), no a gestionar un repo con subagentes y CI/CD. Además mantiene la coherencia con la metodología ya establecida (Claude.ai para análisis/decisiones, Claude Code para construir).

---

## 🚀 Mejora futura (anotada, no en el alcance base)

**Dashboard visual de estado de roles** (estilo "oficina de agentes"):
- Tabla en Supabase (`agentes_estado`): rol, estado (trabajando/esperando/inactivo), mensaje breve, timestamp.
- Cada subagente escribe su estado ahí al empezar y al terminar una tarea.
- Sección admin-only en la web (ruta no enlazada en el nav público) que hace polling a esa tabla y anima avatares por rol según el estado.
- Estilo visual: avatar pixel-art tipo "oficina retro" como estética propia — no se puede replicar el diseño de personajes de Habbo Hotel, es propiedad de Sulake y está protegido.
- Se deja como fase v2: primero hay que tener el sistema de subagentes funcionando y escribiendo en el fichero central de forma consistente antes de construir la capa visual encima.

---

## 📋 Pendiente / próximos pasos

### Fase de pruebas (2 roles)
- [x] Crear `.claude/agents/director.md` y `.claude/agents/desarrollo.md`
- [x] Definir formato/estructura de `estado_proyecto.md`
- [x] Escribir el prompt del Director con la lógica de encadenado reactivo (adaptada a 2 roles)
- [x] Decidir arranque: solo ejecución manual, sin GitHub Actions todavía
- [ ] Validar en la práctica: Director asigna tarea real a Desarrollo, Desarrollo la ejecuta y escribe en `estado_proyecto.md`, Director relee y cierra

### Ampliación futura (no en el alcance actual)
- [ ] Crear `.claude/agents/ceo.md`, `.claude/agents/marketing.md`, `.claude/agents/diseno.md` cuando haya contenido/tráfico real que justifiquen esos roles
- [ ] Si se automatiza: generar `CLAUDE_CODE_OAUTH_TOKEN` con `claude setup-token` y añadirlo como secret
- [ ] Configurar workflow de GitHub Actions (`.github/workflows/agentes-diarios.yml`)
- [ ] Configurar "Ignored Build Step" en Vercel para el fichero de estado
- [ ] (Futuro) Dashboard admin-only con avatares por rol
