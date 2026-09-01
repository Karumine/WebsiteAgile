import React, { useEffect, useRef } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade';

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number; // in ms
    duration?: number; // in ms
    className?: string;
    threshold?: number;
    once?: boolean;
}

// ─── Single Shared IntersectionObserver (O(1) Memory & Zero React Re-render) ───
let sharedObserver: IntersectionObserver | null = null;
const elementsToCallback = new WeakMap<Element, (isIntersecting: boolean) => void>();

function getObserver(): IntersectionObserver {
    if (!sharedObserver && typeof window !== 'undefined') {
        sharedObserver = new IntersectionObserver(
            (entries) => {
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    const cb = elementsToCallback.get(entry.target);
                    if (cb) {
                        cb(entry.isIntersecting);
                    }
                }
            },
            {
                rootMargin: '0px 0px -20px 0px',
                threshold: 0.05,
            }
        );
    }
    return sharedObserver!;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 500,
    className = '',
    once = true,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        // If already visible, no need to re-observe
        if (el.classList.contains('scroll-reveal-visible')) return;

        const observer = getObserver();
        const onIntersect = (isIntersecting: boolean) => {
            if (isIntersecting) {
                el.classList.add('scroll-reveal-visible');
                if (once) {
                    observer.unobserve(el);
                    elementsToCallback.delete(el);
                }
            } else if (!once) {
                el.classList.remove('scroll-reveal-visible');
            }
        };

        elementsToCallback.set(el, onIntersect);
        observer.observe(el);

        return () => {
            observer.unobserve(el);
            elementsToCallback.delete(el);
        };
    }, [once]);

    const transitionStyle: React.CSSProperties = {
        transitionDuration: `${duration}ms`,
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    };

    return (
        <div
            ref={elementRef}
            style={transitionStyle}
            className={`scroll-reveal-init scroll-reveal-${animation} ${className}`}
        >
            {children}
        </div>
    );
};

