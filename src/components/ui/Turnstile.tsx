import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile';

interface TurnstileApi {
    render: (el: HTMLElement, options: Record<string, unknown>) => string;
    remove: (widgetId: string) => void;
}

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
    if (window.turnstile) return Promise.resolve();
    scriptPromise ??= new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
            scriptPromise = null;
            reject(new Error('Turnstile failed to load'));
        };
        document.head.appendChild(script);
    });
    return scriptPromise;
}

interface TurnstileProps {
    lang: 'th' | 'en';
    onToken: (token: string | undefined) => void;
}

/** Cloudflare Turnstile bot check. Renders nothing unless VITE_TURNSTILE_SITE_KEY is set. */
export function Turnstile({ lang, onToken }: TurnstileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const onTokenRef = useRef(onToken);

    useEffect(() => {
        onTokenRef.current = onToken;
    }, [onToken]);

    useEffect(() => {
        if (!TURNSTILE_SITE_KEY) return;
        let widgetId: string | undefined;
        let cancelled = false;

        loadTurnstile()
            .then(() => {
                if (cancelled || !containerRef.current || !window.turnstile) return;
                widgetId = window.turnstile.render(containerRef.current, {
                    sitekey: TURNSTILE_SITE_KEY,
                    language: lang,
                    theme: 'auto',
                    callback: (token: string) => onTokenRef.current(token),
                    'expired-callback': () => onTokenRef.current(undefined),
                    'error-callback': () => onTokenRef.current(undefined),
                });
            })
            .catch(() => onTokenRef.current(undefined));

        return () => {
            cancelled = true;
            if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
        };
    }, [lang]);

    if (!TURNSTILE_SITE_KEY) return null;
    return <div ref={containerRef} className="flex justify-center min-h-[65px]" />;
}
