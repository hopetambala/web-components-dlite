/**
 * Generates react.d.ts from Lit component source files.
 *
 * Reads every src/components/dl-*.ts, extracts @customElement tag names
 * and @property() declarations, then writes dist/react.d.ts with
 * React JSX IntrinsicElements typings.
 *
 * Usage:  tsx scripts/generate-react-types.ts
 *   (called automatically by `npm run build`)
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS_DIR = path.resolve(__dirname, "../src/components");
const OUTPUT_FILE = path.resolve(__dirname, "../dist/react.d.ts");

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
 * Uses balanced-delimiter parsing (not a single regex) to correctly handle
 * nested parentheses/braces inside decorator options — e.g. converter functions.
 */
function extractProps(source: string): { props: PropInfo[]; referencedTypes: string[] } {
  const props: PropInfo[] = [];
  const referencedTypes: string[] = [];

  // Find each `@property(` occurrence, then walk forward counting parens to find
  // the matching `)`, then parse the property declaration that follows.
  const marker = "@property(";
  let searchFrom = 0;

  while (true) {
    const decoratorStart = source.indexOf(marker, searchFrom);
    if (decoratorStart === -1) break;

    // Find the matching `)` using paren counting, starting after the opening `(`
    const optionsStart = decoratorStart + marker.length;
    let depth = 1;
    let i = optionsStart;
    while (i < source.length && depth > 0) {
      if (source[i] === "(") depth++;
      else if (source[i] === ")") depth--;
      i++;
    }

    if (depth !== 0) {
      // Unbalanced parens — skip
      searchFrom = optionsStart;
      continue;
    }

    const decoratorOptions = source.slice(optionsStart, i - 1); // content between ( and )

    // Parse the property declaration after the closing `)`
    // Expect: `propertyName: TypeAnnotation = defaultValue;`  or  `propertyName = defaultValue;`
    const afterDecorator = source.slice(i).trimStart();
    const propMatch = afterDecorator.match(/^(\w+)(?:\s*:\s*([^=;]+?))?\s*=\s*([^;]+);/);

    if (!propMatch) {
      searchFrom = i;
      continue;
    }

    const propName = propMatch[1];
    const explicitType = propMatch[2]?.trim();
    const defaultValue = propMatch[3].trim();

    // Determine the HTML attribute name
    let attribute = toKebabCase(propName);
    const attrMatch = decoratorOptions.match(/attribute\s*:\s*['"]([^'"]+)['"]/);
    if (attrMatch) {
      attribute = attrMatch[1];
    }

    // Determine the TS type
    let tsType: string;
    if (explicitType) {
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
    searchFrom = i;
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
