import type { RequestFormBlock, RequestPageListResponse, RequestPageResponse } from "@/types/strapi";

async function fetchRequestFormFromCollection(
  slug: string,
): Promise<RequestFormBlock | undefined> {
  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const endpoints = [
    `${strapiUrl}/api/form-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[form][populate]=*`,
    `${strapiUrl}/api/request-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[form][populate]=*`,
  ];

  try {
    for (const endpoint of endpoints) {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) continue;

      const payload: RequestPageListResponse = await response.json();
      const first = payload.data?.[0];

      const form = first?.form ?? first?.attributes?.form;
      if (form) return form;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

async function fetchRequestFormFromSingleType(): Promise<RequestFormBlock | undefined> {
  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const endpoint = `${strapiUrl}/api/request-page?populate[form][populate]=*`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return undefined;

    const payload: RequestPageResponse = await response.json();
    return payload.data?.form ?? payload.data?.attributes?.form;
  } catch {
    return undefined;
  }
}

export async function getRequestFormConfigBySlug(
  slug: string,
): Promise<RequestFormBlock | undefined> {
  return fetchRequestFormFromCollection(slug);
}

export async function getRequestFormConfig(
  slug: string,
): Promise<RequestFormBlock | undefined> {
  const collectionConfig = await fetchRequestFormFromCollection(slug);
  if (collectionConfig) return collectionConfig;

  return fetchRequestFormFromSingleType();
}
