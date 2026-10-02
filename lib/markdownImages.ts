/**
 * Insert an image (already formatted as a `![alt](url)` markdown line) into a
 * post body, right after the section it illustrates.
 *
 *  - `afterHeading` given & found → placed just below that `##`/`###` heading.
 *  - not found / empty → placed after the first `##` heading.
 *  - no headings at all → appended.
 *
 * Never drops the image; never inserts inside a fenced code block boundary.
 */
export function insertImageAfterHeading(
  content: string,
  imageMarkdown: string,
  afterHeading?: string,
): string {
  const img = imageMarkdown.trim();
  if (!img) return content;
  if (content.includes(img)) return content; // idempotent

  const lines = content.split("\n");
  const norm = (s: string) =>
    s
      .replace(/^#{1,6}\s+/, "")
      .replace(/[*_`]/g, "")
      .trim()
      .toLocaleLowerCase("tr-TR");
  const target = afterHeading ? norm(afterHeading) : "";

  let headingIdx = -1;
  let firstHeadingIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!/^#{2,6}\s+/.test(lines[i])) continue;
    if (firstHeadingIdx === -1) firstHeadingIdx = i;
    if (target && norm(lines[i]) === target) {
      headingIdx = i;
      break;
    }
  }
  if (headingIdx === -1) headingIdx = firstHeadingIdx;
  if (headingIdx === -1) {
    return `${content.trimEnd()}\n\n${img}\n`;
  }

  // Skip the heading line and any blank line right after it, then insert so the
  // image sits above the section's first paragraph.
  let insertAt = headingIdx + 1;
  while (insertAt < lines.length && lines[insertAt].trim() === "") insertAt++;
  lines.splice(insertAt, 0, "", img, "");
  return lines.join("\n");
}

/**
 * Regenerate case: drop any existing `![alt](replaceUrl)` line (and the blank
 * lines that were padding it) before inserting the fresh image, so a "yeniden
 * üret" doesn't stack duplicates in the body.
 */
export function replaceOrInsertImageAfterHeading(
  content: string,
  imageMarkdown: string,
  afterHeading?: string,
  replaceUrl?: string,
): string {
  let next = content;
  if (replaceUrl) {
    const url = replaceUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // `![...](url)` optionally on its own line, plus one trailing newline.
    next = next
      .replace(
        new RegExp(`\\n*^!\\[[^\\]]*\\]\\(${url}\\)[^\\n]*$\\n?`, "m"),
        "\n\n",
      )
      .replace(/\n{3,}/g, "\n\n"); // don't let repeated regens pile up blanks
  }
  return insertImageAfterHeading(next, imageMarkdown, afterHeading);
}
