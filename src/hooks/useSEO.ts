import { useEffect } from "react";
import { getCanonicalUrl, SEOConfig } from "@/lib/seo";

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

export const applySEO = ({ title, description, path }: SEOConfig) => {
  const canonical = getCanonicalUrl(path);

  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", canonical);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", canonical);
  setMeta('meta[property="og:type"]', "content", "website");
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
};

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    applySEO(config);
  }, [config.title, config.description, config.path]);
};