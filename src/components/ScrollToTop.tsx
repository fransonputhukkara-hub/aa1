import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to top on route (pathname) change; hash links are handled per-page. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
