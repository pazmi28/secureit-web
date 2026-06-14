import { useEffect, useRef } from 'react';

/**
 * useReveal — anima la entrada de elementos al hacer scroll usando
 * Intersection Observer (API nativa, sin librerías).
 *
 * Uso:
 *   const ref = useReveal();
 *   return (
 *     <section ref={ref}>
 *       <h2 className="reveal">Título</h2>
 *       <p className="reveal d1">Texto</p>
 *     </section>
 *   );
 *
 * Devuelve un ref que se ancla al contenedor de la sección. El hook
 * observa todos los descendientes con clase `.reveal` dentro de ese
 * contenedor y les añade `.visible` cuando entran en el viewport.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15]  Fracción visible para disparar.
 * @param {string} [options.rootMargin='0px 0px -10% 0px']  Margen del root.
 * @param {boolean} [options.once=true]  Si true, deja de observar tras revelar.
 * @returns {React.RefObject} ref para el contenedor de la sección.
 */
export default function useReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    // Fallback: si el navegador no soporta IntersectionObserver,
    // mostramos todo directamente sin animación.
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            // Modo repetible: re-oculta al salir del viewport.
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return containerRef;
}
