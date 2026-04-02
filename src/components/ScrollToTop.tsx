import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow same-page anchor scrolling
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const headerOffset = 102; // top banner + navbar
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, left: 0 });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
