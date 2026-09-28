import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, DollarSign, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function KeyFinancingServicesSection() {
    const { lang } = useLanguage();
    const navigate = useNavigate();
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);

    const isEn = lang === 'en';

    const sectionBadge = isEn
        ? (content.machineryBadgeEn || content.machineryBadgeTh || 'KEY FINANCING SERVICES')
        : (content.machineryBadgeTh || content.machineryBadgeEn || 'KEY FINANCING SERVICES');

    const sectionTitle = isEn
        ? (content.machineryTitleEn || content.machineryTitleTh || 'Industrial Equipment Hire Purchase Solutions')
        : (content.machineryTitleTh || content.machineryTitleEn || 'บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม');

    const rawMachines = (content.machineryItems && content.machineryItems.length > 0)
        ? content.machineryItems
        : (DEFAULT_PAGE_CONTENTS['home']?.machineryItems || []);

    const machines = rawMachines.map((item, idx) => {
        const title = isEn ? (item.titleEn || item.title) : (item.title || item.titleEn || '');
        const subTitle = isEn ? (item.subTitleEn || item.subTitle || item.descEn || '') : (item.subTitle || item.subTitleEn || item.description || '');
        const href = item.link || '/';
        const image = item.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80';
        return {
            id: item.id || `mac-${idx}`,
            title,
            subTitle,
            image,
            fallbackImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
            href,
        };
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const totalItems = machines.length;

    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };
        updateVisibleCount();
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateVisibleCount, 150);
        };
        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, [totalItems]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }, [totalItems]);

    // Auto-scroll every 4.5 seconds (pauses when tab is hidden or hovered)
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                nextSlide();
            }
        }, 4500);
        return () => clearInterval(interval);
    }, [isHovered, nextSlide]);

    return (
        <section className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold text-sky-500 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                            <span>{sectionBadge}</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans">
                            {sectionTitle}
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 3-Card Carousel Window */}
                <div
                    className="relative overflow-hidden py-4 -mx-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Arrow Left */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 backdrop-blur-md border border-border hover:border-sky-400 text-foreground hover:text-sky-500 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-80 hover:opacity-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Navigation Arrow Right */}
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 backdrop-blur-md border border-border hover:border-sky-400 text-foreground hover:text-sky-500 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-80 hover:opacity-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Cards Track */}
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                        }}
                    >
                        {[...machines, ...machines, ...machines].map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="flex-shrink-0 px-3 cursor-pointer group"
                                style={{
                                    width: `${100 / visibleCount}%`,
                                }}
                                onClick={() => {
                                    navigate(item.href);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <div className="flex flex-col items-center text-center p-4 rounded-3xl transition-all duration-300 hover:-translate-y-1.5">
                                    {/* Machine Image */}
                                    <div className="w-full h-56 sm:h-64 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 p-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = item.fallbackImage;
                                            }}
                                        />
                                    </div>

                                    {/* Title & Subtitle */}
                                    <h3 className="text-lg sm:text-xl font-bold text-sky-800 dark:text-sky-400 font-sans mb-1.5 group-hover:text-sky-500 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                                        {item.subTitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2.5 mt-8 mb-10">
                    {machines.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to machinery slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                currentIndex % totalItems === idx
                                    ? 'w-8 bg-sky-500 shadow-md shadow-sky-500/40'
                                    : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-sky-400/60'
                            }`}
                        />
                    ))}
                </div>

                {/* 2 Action Buttons: ขอสินเชื่อกับเรา & คำนวณค่างวด */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-lg mx-auto">
                    {/* Primary Button: ขอสินเชื่อกับเรา */}
                    <button
                        onClick={() => {
                            navigate('/leasing-application');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all glow-cyan"
                    >
                        <DollarSign className="w-5 h-5" />
                        <span>{lang === 'th' ? 'ขอสินเชื่อกับเรา' : 'Apply for Financing'}</span>
                    </button>

                    {/* Secondary Button: คำนวณค่างวด */}
                    <button
                        onClick={() => {
                            navigate('/calculator');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-card hover:bg-sky-500/10 text-foreground border border-sky-400/30 hover:border-sky-400 font-bold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                        <Calculator className="w-5 h-5 text-sky-500" />
                        <span>{lang === 'th' ? 'คำนวณค่างวด' : 'Financing Calculator'}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
