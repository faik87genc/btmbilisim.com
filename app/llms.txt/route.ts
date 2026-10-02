import { LLMS_TXT, llmsResponse } from "@/lib/llmsTxt";

export const dynamic = "force-static";

export function GET() {
  return llmsResponse(LLMS_TXT);
}
