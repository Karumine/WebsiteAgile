import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // If navigating to an anchor hash, scroll to that element
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If element isn't rendered immediately, retry after a short tick
                const timeoutId = setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
                return () => clearTimeout(timeoutId);
            }
        } else {
            // Normal page change: scroll immediately to top of page
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
