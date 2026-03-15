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

/** Semantic duration token */
export const duration = (name: string) =>
  `var(--tk-dlite-semantic-duration-${name})`;

/** Semantic border-radius token */
export const radius = (name: string) =>
  `var(--tk-dlite-semantic-border-radius-${name})`;

/** Semantic elevation token */
export const elevation = (name: string) =>
  `var(--tk-dlite-semantic-elevation-${name})`;
