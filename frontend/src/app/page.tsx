import BlockRenderer from "@/components/BlockRenderer";
import type { LandingBlock, LandingResponse } from "@/types/strapi";

async function getLandingBlocks(): Promise<LandingBlock[]> {
  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const endpoint = `${strapiUrl}/api/landing-page?populate[blocks][populate]=*`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return [];

    const payload: LandingResponse = await response.json();
    return payload.data?.blocks ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const blocks = await getLandingBlocks();
  return (
    <main>
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
