import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IFramePreviewProps {
    children: ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    deviceWidth?: number; // 375 for mobile, 768 for tablet
    theme?: 'light' | 'dark';
}

export function IFramePreview({
    children,
    title = 'Live Responsive Preview',
    className = '',
    style = {},
    deviceWidth,
    theme,
}: IFramePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    const effectiveTheme = theme || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    // Initialize iframe document and synchronize styles
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Reset document structure
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html lang="th" class="${effectiveTheme}">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <title>${title}</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                    <style>
                        /* Base resets for preview frame */
                        html, body {
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            min-height: 100%;
                            background-color: transparent;
                            overflow-x: hidden;
                            -webkit-font-smoothing: antialiased;
                        }

                        /* Ensure previewed items render immediately */
                        .scroll-reveal-init {
                            opacity: 1 !important;
                            transform: none !important;
                            transition: none !important;
                        }

                        /* Custom slim scrollbar */
                        ::-webkit-scrollbar {
                            width: 5px;
                            height: 5px;
                        }
                        ::-webkit-scrollbar-track {
                            background: rgba(0, 0, 0, 0.05);
                        }
                        ::-webkit-scrollbar-thumb {
                            background: rgba(148, 163, 184, 0.35);
                            border-radius: 9999px;
                        }
                        ::-webkit-scrollbar-thumb:hover {
                            background: rgba(148, 163, 184, 0.6);
                        }
                    </style>
                </head>
                <body class="bg-background text-foreground selection:bg-sky-500 selection:text-white m-0 p-0 overflow-x-hidden">
                    <div id="preview-mount" style="width: 100%; min-height: 100%;"></div>
                </body>
            </html>
        `);
        doc.close();

        // Copy all parent stylesheets and style tags into the iframe
        const copyStyles = () => {
            if (!doc.head) return;
            doc.head.querySelectorAll('[data-preview-sync]').forEach((el) => el.remove());

            document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
                const clone = node.cloneNode(true) as HTMLElement;
                clone.setAttribute('data-preview-sync', 'true');
                doc.head.appendChild(clone);
            });

            // Synchronize dark/light class and color-scheme
            doc.documentElement.className = effectiveTheme;
            doc.documentElement.style.colorScheme = effectiveTheme;
        };

        copyStyles();

        // Watch parent head for dynamic CSS (Vite HMR & style changes)
        const observer = new MutationObserver(() => {
            copyStyles();
        });
        observer.observe(document.head, { childList: true, subtree: true });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const mount = doc.getElementById('preview-mount');
        setMountNode(mount);

        return () => {
            observer.disconnect();
        };
    }, [title, deviceWidth]);

    // Keep theme class in sync whenever effectiveTheme changes
    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;
        if (doc) {
            doc.documentElement.className = effectiveTheme;
            doc.documentElement.style.colorScheme = effectiveTheme;
        }
    }, [effectiveTheme]);

    return (
        <iframe
            ref={iframeRef}
            title={title}
            className={`block w-full h-full bg-background ${className}`}
            style={{
                border: 'none',
                width: '100%',
                height: '100%',
                ...style,
            }}
        >
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    );
}
