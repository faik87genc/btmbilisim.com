import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const DISALLOW = ["/api/", "/admin/"];

// AI search, citation and assistant crawlers, named explicitly so allowing
// them is a visible decision rather than an accident of the `*` group. A
// crawler that matches a named group ignores `*`, so each group repeats the
// Disallow list. Keep in sync with AI_CRAWLERS in
// _legacy-static-site/scripts/build.py.
const AI_CRAWLERS = [
  // OpenAI: training, ChatGPT search index, user-initiated fetches
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training, Claude search index, user-initiated fetches
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity: search index, user-initiated fetches
  "PerplexityBot",
  "Perplexity-User",
  // Gemini training/grounding control (AI Overviews use plain Googlebot)
  "Google-Extended",
  // Apple Intelligence
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${site.baseUrl}/sitemap.xml`,
  };
}
