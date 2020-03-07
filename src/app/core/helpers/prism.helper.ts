import * as prism from "prismjs";

/**
 * Get the JSON grammar of *PrismJS*
 * @returns - JSON grammar object
 */
export function getJSONGrammar() {
  return {
    property: {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      greedy: true
    },
    string: {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      greedy: true
    },
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };
}

/**
 * Add syntax highlighting to the code and
 * return the highlighted HTML
 * @param data - JSON Object to format
 */
export function formatCode(data: Object) {
  return prism.highlight(
    JSON.stringify(data, null, 2),
    getJSONGrammar(),
    "json"
  );
}
