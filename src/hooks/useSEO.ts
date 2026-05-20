import { useEffect } from "react";
import { getCanonicalUrl, SEOConfig, SITE_URL } from "@/lib/seo";

const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d16ab386-6465-4137-8089-97a339a64d3f/id-preview-23e75fd9--a8732c81-e46a-49c9-a90a-8138c6a62d47.lovable.app-1775205095330.png";

const setMeta = (selector: string, attribute: string, value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!el) {
    el = selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");
    const match = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }

  el.setAttribute(attribute, value);
};

export const applySEO = ({ title, description, path, image }: SEOConfig) => {
  const canonical = getCanonicalUrl(path);
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : DEFAULT_OG_IMAGE;

  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", canonical);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", canonical);
  setMeta('meta[property="og:type"]', "content", "website");
  setMeta('meta[property="og:image"]', "content", ogImage);
  setMeta('meta[property="og:image:width"]', "content", "1200");
  setMeta('meta[property="og:image:height"]', "content", "630");
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:image"]', "content", ogImage);
};

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    applySEO(config);
  }, [config.title, config.description, config.path, config.image]);
};
