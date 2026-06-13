import RequestForm from "@/components/RequestForm";
import { getRequestFormConfig } from "@/lib/strapi/request-form";

type RequestSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RequestSlugPage({ params }: RequestSlugPageProps) {
  const { slug } = await params;
  const config = await getRequestFormConfig(slug);

  return (
    <main>
      <RequestForm config={config} />
    </main>
  );
}
