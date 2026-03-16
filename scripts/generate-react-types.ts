/**
 * Generates react.d.ts from Lit component source files.
 *
 * Reads every src/components/dl-*.ts, extracts @customElement tag names
 * and @property() declarations, then writes dist/react.d.ts with
 * React JSX IntrinsicElements typings.
 *
 * Usage:  node --import tsx scripts/generate-react-types.ts
 *   (called automatically by `npm run build`)
 */

import * as fs from "node:fs";
import * as path from "node:path";

const COMPONENTS_DIR = path.resolve(import.meta.dirname, "../src/components");
const OUTPUT_FILE = path.resolve(import.meta.dirname, "../dist/react.d.ts");

interface PropInfo {
  /** Property name as written in TS */
  name: string;
  /** HTML attribute name (may differ via `attribute:` option) */
  attribute: string;
  /** TypeScript type annotation as a string */
  tsType: string;
}

interface ComponentInfo {
  /** Custom element tag, e.g. "dl-button" */
  tag: string;
  /** Class name, e.g. "DlButton" */
  className: string;
  /** Source file name, e.g. "dl-button.ts" */
  fileName: string;
  /** Relative import path, e.g. "./components/dl-button.js" */
  importPath: string;
  /** Extracted properties */
  props: PropInfo[];
  /** Extra type names referenced by props that need to be imported */
  referencedTypes: string[];
}

// ---------- Parsing helpers ----------

function extractTag(source: string): string | null {
  const m = source.match(/@customElement\(\s*['"]([^'"]+)['"]\s*\)/);
  return m ? m[1] : null;
}

function extractClassName(source: string): string | null {
  const m = source.match(/export\s+class\s+(\w+)\s+extends\s+LitElement/);
  return m ? m[1] : null;
}

/**
 * Extract all @property() declarations and their TS types.
 *
 * Handles patterns like:
 *   @property({ reflect: true }) variant: 'a' | 'b' = 'a';
 *   @property({ type: Boolean, reflect: true }) disabled = false;
 *   @property() gap = '400';
 *   @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
 *   @property({ type: Array, converter: { ... } }) options: SelectOption[] = [];
 */
function extractProps(source: string): { props: PropInfo[]; referencedTypes: string[] } {
  const props: PropInfo[] = [];
  const referencedTypes: string[] = [];

  // Match @property(...) on one OR multiple lines, followed by the property declaration.
  // We use a regex that captures the decorator options and the property line.
  const propRegex =
    /@property\(([^)]*(?:\{[^}]*\}[^)]*)?)\)\s*(\w+)(?:\s*[:]\s*([^=;]+?))?\s*=\s*([^;]+);/g;

  let match: RegExpExecArray | null;
  while ((match = propRegex.exec(source)) !== null) {
    const decoratorOptions = match[1].trim();
    const propName = match[2];
    const explicitType = match[3]?.trim();
    const defaultValue = match[4].trim();

    // Determine the HTML attribute name
    let attribute = toKebabCase(propName);
    const attrMatch = decoratorOptions.match(/attribute\s*:\s*['"]([^'"]+)['"]/);
    if (attrMatch) {
      attribute = attrMatch[1];
    }

    // Determine the TS type
    let tsType: string;
    if (explicitType) {
      // Use the explicit annotation, e.g.: 'info' | 'success' | 'warning' | 'danger'
      tsType = cleanType(explicitType);
      // Track any non-primitive type references (e.g. SelectOption[])
      const typeRefs = tsType.match(/\b[A-Z]\w+/g);
      if (typeRefs) {
        for (const ref of typeRefs) {
          if (!referencedTypes.includes(ref)) {
            referencedTypes.push(ref);
          }
        }
      }
    } else if (decoratorOptions.includes("type: Boolean") || defaultValue === "true" || defaultValue === "false") {
      tsType = "boolean";
    } else if (decoratorOptions.includes("type: Number") || /^-?\d+(\.\d+)?$/.test(defaultValue)) {
      tsType = "number";
    } else if (decoratorOptions.includes("type: Array")) {
      tsType = "string"; // In HTML attributes, arrays are passed as JSON strings
    } else {
      tsType = "string";
    }

    props.push({ name: propName, attribute, tsType });
  }

  return { props, referencedTypes };
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function cleanType(t: string): string {
  // Remove line-breaks and extra spaces
  return t.replace(/\s+/g, " ").trim();
}

// ---------- Code generation ----------

function generateReactDts(components: ComponentInfo[]): string {
  // Collect all imports: class imports grouped by file, plus extra type references
  const importLines: string[] = [];
  for (const c of components) {
    const extras = c.referencedTypes;
    const names = [c.className, ...extras].join(", ");
    importLines.push(`import type { ${names} } from "${c.importPath}";`);
  }

  const elements = components
    .map((c) => {
      const propsObj = c.props
        .map((p) => `          "${p.attribute}"?: ${p.tsType};`)
        .join("\n");

      const propsBlock = propsObj
        ? `{\n${propsObj}\n        }`
        : "object";

      return `      "${c.tag}": WCProps<${c.className}, ${propsBlock}>;`;
    })
    .join("\n");

  return `/**
 * Auto-generated React JSX type declarations for dlite web components.
 * DO NOT EDIT — regenerate with: npm run build
 *
 * Usage in a React/Next.js project — add to any .d.ts file:
 *   /// <reference types="web-components-dlite/react" />
 */

${importLines.join("\n")}
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type WCProps<El, Extra = object> = DetailedHTMLProps<
  HTMLAttributes<El>,
  El
> &
  Extra;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
${elements}
    }
  }
}
`;
}

// ---------- Main ----------

function main() {
  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.startsWith("dl-") && f.endsWith(".ts"))
    .sort();

  const components: ComponentInfo[] = [];

  for (const file of files) {
    const source = fs.readFileSync(path.join(COMPONENTS_DIR, file), "utf-8");
    const tag = extractTag(source);
    const className = extractClassName(source);
    if (!tag || !className) {
      console.warn(`⚠ Skipping ${file}: missing @customElement or class export`);
      continue;
    }

    const { props, referencedTypes } = extractProps(source);
    const importPath = `./components/${file.replace(/\.ts$/, ".js")}`;
    components.push({ tag, className, fileName: file, importPath, props, referencedTypes });
  }

  const output = generateReactDts(components);

  // Ensure dist/ exists
  const distDir = path.dirname(OUTPUT_FILE);
  fs.mkdirSync(distDir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
  console.log(
    `✓ Generated ${OUTPUT_FILE} with ${components.length} components, ${components.reduce((n, c) => n + c.props.length, 0)} total props`
  );
}

main();
