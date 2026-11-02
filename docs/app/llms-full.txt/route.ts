import { getLlmsFull } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await getLlmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
