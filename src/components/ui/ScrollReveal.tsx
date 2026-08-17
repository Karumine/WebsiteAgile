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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -40px 0px', // Triggers slightly before element reaches bottom
            }
        );

        const currentEl = elementRef.current;
        if (currentEl) {
            observer.observe(currentEl);
        }

        return () => {
            if (currentEl) {
                observer.unobserve(currentEl);
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
