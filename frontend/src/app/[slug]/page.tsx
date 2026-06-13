import { notFound } from "next/navigation";
import RequestForm from "@/components/RequestForm";
import { getRequestFormConfigBySlug } from "@/lib/strapi/request-form";

type SlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const RESERVED_SLUGS = new Set(["request", "api"]);

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const config = await getRequestFormConfigBySlug(slug);
  if (!config) {
    notFound();
  }

  return (
    <main>
      <RequestForm config={config} />
    </main>
  );
}
