import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Droplets, Wheat, Factory, Flame, Sun, Sparkles, Box } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ServicesRangeSection() {
    const { lang } = useLanguage();
    const navigate = useNavigate();
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);

    const isEn = lang === 'en';

    const sectionBadge = isEn
        ? (content.solutionsBadgeEn || content.solutionsBadgeTh || 'OUR FINANCING SERVICES')
        : (content.solutionsBadgeTh || content.solutionsBadgeEn || 'OUR FINANCING SERVICES');

    const sectionTitle = isEn
        ? (content.solutionsTitleEn || content.solutionsTitleTh || 'Our Industry Financing Solutions')
        : (content.solutionsTitleTh || content.solutionsTitleEn || 'โซลูชั่นทางการเงินของเราในอุตสาหกรรม');

    const sectionSubtitle = isEn
        ? (content.solutionsSubtitleEn || content.solutionsSubtitleTh || 'Tailored machinery leasing and capital financing structures covering 5 essential industrial sectors.')
        : (content.solutionsSubtitleTh || content.solutionsSubtitleEn || 'โซลูชันสินเชื่อเช่าซื้อเครื่องจักรและอุปกรณ์ที่ปรับแต่งตามโครงสร้างธุรกิจ 5 กลุ่มอุตสาหกรรมหลัก');

    const iconMap: Record<string, typeof Droplets> = {
        'drinking-water': Droplets,
        'sol-1': Droplets,
        'livestock-farm': Wheat,
        'sol-2': Wheat,
        'food-processing': Factory,
        'sol-3': Factory,
        'biogas-production': Flame,
        'sol-4': Flame,
        'solar-power': Sun,
        'sol-5': Sun,
    };
    const availableIcons: Record<string, typeof Droplets> = {
        droplets: Droplets,
        water: Droplets,
        wheat: Wheat,
        farm: Wheat,
        factory: Factory,
        food: Factory,
        industry: Factory,
        flame: Flame,
        fire: Flame,
        biogas: Flame,
        sun: Sun,
        solar: Sun,
        box: Box,
        package: Box,
        sparkles: Sparkles,
    };
    const defaultIcons = [Droplets, Wheat, Factory, Flame, Sun, Box];

    const rawSolutions = (content.solutionsItems && content.solutionsItems.length > 0)
        ? content.solutionsItems
        : (DEFAULT_PAGE_CONTENTS['home']?.solutionsItems || []);

    const solutions = rawSolutions.map((item, idx) => {
        const title = isEn ? (item.titleEn || item.title) : (item.title || item.titleEn || '');
        const subTitle = isEn ? (item.subTitleEn || item.subTitle || item.titleEn || '') : (item.subTitle || item.subTitleEn || item.title || '');
        const desc = isEn ? (item.descEn || item.description) : (item.description || item.descEn || '');
        const tag = item.badge || '';
        const href = item.link || '/';
        const Icon = (item.icon && availableIcons[item.icon.toLowerCase()]) 
            || iconMap[item.id] 
            || defaultIcons[idx % defaultIcons.length];
        const btnText = isEn ? (item.btnTextEn || item.btnText || 'Read More') : (item.btnText || item.btnTextEn || 'อ่านเพิ่มเติม');

        return {
            id: item.id || `sol-${idx}`,
            title,
            subTitle,
            desc,
            image: item.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
            href,
            icon: Icon,
            tag,
            btnText,
        };
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const totalItems = solutions.length;

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

    // Auto-scroll every 4.5 seconds when not hovered (pauses when tab hidden)
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
        <section id="services" className="relative py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-slate-950/40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
                        <div className="text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold text-sky-500 mb-3">
                                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                                <span>{sectionBadge}</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans">
                                {sectionTitle}
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                                {sectionSubtitle}
                            </p>
                        </div>

                        {/* Navigation Buttons (Desktop & Tablet) */}
                        <div className="flex items-center gap-3 mt-6 md:mt-0">
                            <button
                                onClick={prevSlide}
                                aria-label="Previous Slide"
                                className="w-11 h-11 rounded-2xl bg-card border border-border/80 hover:border-sky-400/60 flex items-center justify-center text-foreground hover:text-sky-500 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next Slide"
                                className="w-11 h-11 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-105 active:scale-95 transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* 3-Card Carousel Window */}
                <div
                    className="relative overflow-hidden py-2 -mx-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                        }}
                    >
                        {/* Render all 5 solutions + cloned start for smooth infinite loop feeling */}
                        {[...solutions, ...solutions, ...solutions].map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="flex-shrink-0 px-3 flex flex-col"
                                style={{
                                    width: `${100 / visibleCount}%`,
                                }}
                            >
                                <div className="group flex flex-col h-full rounded-3xl overflow-hidden bg-card border border-border/80 hover:border-sky-400/50 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                                        {/* Icon Badge */}
                                        <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-sky-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>

                                        {/* Category Tag */}
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-sky-500/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-md shadow-sm">
                                            {item.tag}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-card">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 group-hover:text-sky-500 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-sky-500 dark:text-sky-400 font-semibold mb-3">
                                                {item.subTitle}
                                            </p>
                                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => {
                                                if (item.href?.startsWith('http')) {
                                                    window.open(item.href, '_blank');
                                                } else {
                                                    navigate(item.href);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                            }}
                                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            <span>{item.btnText}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots & Navigation Indicators */}
                <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
                    {solutions.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                currentIndex % totalItems === idx
                                    ? 'w-8 bg-sky-500 shadow-md shadow-sky-500/40'
                                    : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-sky-400/60'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
