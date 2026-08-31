import React, { useEffect, useRef, useState } from 'react';

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

// ─── Shared IntersectionObserver (single observer pattern) ───
// Instead of creating one observer per ScrollReveal instance, we share a single
// observer for all elements with the same threshold. This reduces O(n) observers → O(1).
type ObserverCallback = (isIntersecting: boolean) => void;

const observerMap = new Map<string, IntersectionObserver>();
const callbackMap = new Map<Element, ObserverCallback>();

function getSharedObserver(threshold: number, rootMargin: string): IntersectionObserver {
    const key = `${threshold}|${rootMargin}`;
    let observer = observerMap.get(key);
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const cb = callbackMap.get(entry.target);
                    if (cb) {
                        cb(entry.isIntersecting);
                    }
                });
            },
            { threshold, rootMargin }
        );
        observerMap.set(key, observer);
    }
    return observer;
}

function observeElement(element: Element, threshold: number, rootMargin: string, callback: ObserverCallback): () => void {
    const observer = getSharedObserver(threshold, rootMargin);
    callbackMap.set(element, callback);
    observer.observe(element);
    return () => {
        observer.unobserve(element);
        callbackMap.delete(element);
    };
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 700,
    className = '',
    threshold = 0.12,
    once = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const unobserveRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const currentEl = elementRef.current;
        if (!currentEl) return;

        const rootMargin = '0px 0px -40px 0px';

        unobserveRef.current = observeElement(
            currentEl,
            threshold,
            rootMargin,
            (isIntersecting) => {
                if (isIntersecting) {
                    setIsVisible(true);
                    if (once && unobserveRef.current) {
                        unobserveRef.current();
                        unobserveRef.current = null;
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            }
        );

        return () => {
            if (unobserveRef.current) {
                unobserveRef.current();
                unobserveRef.current = null;
            }
        };
    }, [threshold, once]);

    const getInitialStyle = (): React.CSSProperties => {
        let transform = 'none';

        if (!isVisible) {
            switch (animation) {
                case 'fade-up':
                    transform = 'translate3d(0, 32px, 0)';
                    break;
                case 'fade-down':
                    transform = 'translate3d(0, -32px, 0)';
                    break;
                case 'fade-left':
                    transform = 'translate3d(-36px, 0, 0)';
                    break;
                case 'fade-right':
                    transform = 'translate3d(36px, 0, 0)';
                    break;
                case 'zoom-in':
                    transform = 'scale(0.93)';
                    break;
                case 'fade':
                    transform = 'none';
                    break;
            }
        }

        return {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : transform,
            transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            willChange: 'opacity, transform',
        };
    };

    return (
        <div ref={elementRef} style={getInitialStyle()} className={className}>
            {children}
        </div>
    );
};
