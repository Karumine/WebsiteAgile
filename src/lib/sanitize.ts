import DOMPurify from 'dompurify';

const SAFE_URL = /^(https?:|mailto:|tel:|\/(?!\/)|#|\.{0,2}\/)/i;

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
        node.setAttribute('rel', 'noopener noreferrer');
    }
});

export function sanitizeHtml(html: string | undefined | null): string {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select'],
        FORBID_ATTR: ['style'],
        ADD_ATTR: ['target'],
    });
}

export function safeHref(url: string | undefined | null, fallback = '#'): string {
    const value = (url || '').trim();
    return value && SAFE_URL.test(value) ? value : fallback;
}

export function isExternalUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
}
