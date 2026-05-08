import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applySEO } from "@/hooks/useSEO";
import { getSEOConfig } from "@/lib/seo";

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySEO(getSEOConfig(pathname));
  }, [pathname]);

  return null;
}