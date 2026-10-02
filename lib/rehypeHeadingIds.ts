import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { createHeadingSlugger } from "./headingSlug";

/**
 * Rehype plugin: give every heading an `id` derived from our own
 * Turkish-aware ASCII slugger (see `createHeadingSlugger`). Replaces
 * `rehype-slug` so the ids match `extractHeadings()` exactly and read cleanly.
 */
export function rehypeHeadingIds() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    const slug = createHeadingSlugger();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "element", (node: any) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;
      node.properties = node.properties || {};
      if (!node.properties.id) node.properties.id = slug(toString(node));
    });
  };
}
