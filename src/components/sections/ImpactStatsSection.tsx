import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function useCounter(end: number, duration: number = 2000, trigger: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration, trigger]);

    return count;
}

export function ImpactStatsSection() {
    const { lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const projectsCount = useCounter(500, 1800, isVisible);
    const valueCount = useCounter(25000, 2000, isVisible);
    const co2Count = useCounter(100000, 2200, isVisible);

    const stats = [
        {
            value: `${projectsCount.toLocaleString()}+`,
            label: lang === 'th' ? 'โครงการ' : 'Projects Completed',
        },
        {
            value: `${valueCount.toLocaleString()}+`,
            label: lang === 'th' ? 'มูลค่า (ล้านบาท)' : 'Financed Value (MB)',
        },
        {
            value: `${co2Count.toLocaleString()}+`,
            label: lang === 'th' ? 'ลดการปล่อยก๊าซเรือนกระจก (ตัน)' : 'GHG Reduced (Tons CO2e)',
        },
    ];

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal animation="zoom-in">
                    <div className="rounded-3xl bg-sky-100/80 dark:bg-sky-950/40 border border-sky-300/40 dark:border-sky-800/40 p-8 sm:p-12 shadow-lg shadow-sky-500/5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-sky-300/60 dark:divide-sky-800/60">
                            {stats.map((item, idx) => (
                                <div key={idx} className="text-center pt-6 sm:pt-0 first:pt-0 sm:px-4">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-600 dark:text-sky-400 font-sans tracking-tight mb-2">
                                        {item.value}
                                    </div>
                                    <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
