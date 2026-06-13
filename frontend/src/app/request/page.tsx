import RequestForm from "@/components/RequestForm";
import { getRequestFormConfig } from "@/lib/strapi/request-form";

export default async function RequestPage() {
  const config = await getRequestFormConfig("request");

  return (
    <main>
      <RequestForm config={config} />
    </main>
  );
}
