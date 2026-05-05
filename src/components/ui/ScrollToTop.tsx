import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component automatically scrolls the window to the top
 * whenever the route changes (page navigation).
 * 
 * This improves UX by ensuring users always start at the top of a new page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
