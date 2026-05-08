import { globalStructuredData } from "@/lib/seo";

export default function GlobalStructuredData() {
  return (
    <script
      id="global-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
    />
  );
}