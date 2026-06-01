/**
 * Convenience helpers for referencing dlite CSS custom properties.
 * Consumers must load variables.css (or variables.dark.css) at
 * the document level so these vars resolve at runtime.
 */

/** Semantic color token */
export const color = (name: string) =>
  `var(--tk-dlite-semantic-color-${name})`;

/** Semantic typography token */
export const type = (name: string) =>
  `var(--tk-dlite-semantic-typography-${name})`;

/** Semantic spacing token */
export const space = (name: string) =>
  `var(--tk-dlite-semantic-spacing-${name})`;

/**
 * Semantic motion duration token (since tokens 0.3.0).
 * Names: instant, micro, quick, snappy, base, substantial, slow, xslow, pulse, toast, dismiss.
 */
export const duration = (name: string) =>
  `var(--tk-dlite-semantic-motion-duration-${name})`;

/** Semantic motion easing token — standard, entrance, exit, linear (since tokens 0.3.0) */
export const easing = (name: string) =>
  `var(--tk-dlite-semantic-motion-easing-${name})`;

/** Semantic border-radius token */
export const radius = (name: string) =>
  `var(--tk-dlite-semantic-border-radius-${name})`;

/** Semantic elevation token */
export const elevation = (name: string) =>
  `var(--tk-dlite-semantic-elevation-${name})`;

/** Semantic z-index layer token — default, sticky, dropdown, overlay, modal (since tokens 0.3.0) */
export const zIndex = (name: string) =>
  `var(--tk-dlite-semantic-z-index-${name})`;
