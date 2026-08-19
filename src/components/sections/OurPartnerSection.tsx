import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function OurPartnerSection() {
    const { lang } = useLanguage();

    const partners = [
        {
            name: 'PHOOWANUS PANICH',
            tag: 'Limited Partnership',
            logoUrl: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_300/https://agileassets.co.th/wp-content/uploads/2021/11/logo-phoowanus-1.png',
            type: 'image',
            bgColor: '#0f172a',
            textColor: '#38bdf8',
            subtitle: 'หจก. ภูวนัส พาณิชย์',
        },
        {
            name: 'GRD Machine',
            tag: 'Industrial Systems',
            logoUrl: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_300/https://agileassets.co.th/wp-content/uploads/2021/11/logo-grd.png',
            type: 'image',
            bgColor: '#ffffff',
            textColor: '#16a34a',
            subtitle: 'GRD Industrial Machine',
        },
        {
            name: 'MITSUBISHI MOTORS',
            tag: 'Heavy Industries',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/320px-Mitsubishi_logo.svg.png',
            type: 'image',
            bgColor: '#ffffff',
            textColor: '#dc2626',
            subtitle: 'Mitsubishi Machinery',
        },
        {
            name: 'FANUC',
            tag: 'Robotics & CNC',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fanuc_logo.svg/320px-Fanuc_logo.svg.png',
            type: 'image',
            bgColor: '#ffffff',
            textColor: '#eab308',
            subtitle: 'Robotics & Factory Automation',
        },
        {
            name: 'HAITIAN',
            tag: 'Plastics Machinery',
            logoUrl: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_300/https://agileassets.co.th/wp-content/uploads/2021/11/logo-haitian.png',
            type: 'image',
            bgColor: '#ffffff',
            textColor: '#0284c7',
            subtitle: 'Injection Molding Global Leader',
        },
        {
            name: 'DAIKIN',
            tag: 'Industrial Chillers',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Daikin_logo.svg/320px-Daikin_logo.svg.png',
            type: 'image',
            bgColor: '#ffffff',
            textColor: '#0ea5e9',
            subtitle: 'Air & Water Cooled Chillers',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);
    const totalItems = partners.length;

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(4);
            }
        };
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, [totalItems]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }, [totalItems]);

    // Auto-scroll every 3.5 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 3500);
        return () => clearInterval(interval);
    }, [isHovered, nextSlide]);

    return (
        <section className="py-20 sm:py-24 bg-slate-50/70 dark:bg-slate-950/40 text-foreground overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-800 dark:text-sky-400 mb-3 font-sans">
                            OUR PARTNER & MACHINE
                        </p>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans">
                            {lang === 'th' ? 'คู่ค้าและเครื่องจักรที่เราให้บริการ' : 'Our Trusted Partners & Machine Brands'}
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 4-Item Carousel with Navigation Arrows */}
                <div
                    className="relative px-2 sm:px-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Partner"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border hover:border-sky-400 text-foreground hover:text-sky-500 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-90 hover:opacity-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={nextSlide}
                        aria-label="Next Partner"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border hover:border-sky-400 text-foreground hover:text-sky-500 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-90 hover:opacity-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Viewport */}
                    <div className="overflow-hidden py-4 -mx-3">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                            }}
                        >
                            {[...partners, ...partners, ...partners].map((partner, idx) => (
                                <div
                                    key={`${partner.name}-${idx}`}
                                    className="flex-shrink-0 px-3"
                                    style={{
                                        width: `${100 / visibleCount}%`,
                                    }}
                                >
                                    <div className="group h-40 sm:h-44 rounded-3xl p-6 bg-card border border-border/80 hover:border-sky-400/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-1">
                                        {/* Logo or Brand Typography Display */}
                                        <div className="h-16 flex items-center justify-center w-full mb-3 px-2">
                                            {partner.name === 'PHOOWANUS PANICH' ? (
                                                <div className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-700 shadow-md group-hover:border-sky-400 transition-colors">
                                                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                                                        🌿
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-[11px] font-extrabold tracking-wider leading-tight text-white">
                                                            PHOOWANUS PANICH
                                                        </div>
                                                        <div className="text-[9px] text-slate-400 font-medium">
                                                            LIMITED PARTNERSHIP
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : partner.name === 'GRD Machine' ? (
                                                <div className="flex items-center gap-1.5 font-black text-2xl tracking-tighter text-emerald-500 font-sans">
                                                    <span className="text-emerald-500">GR</span>
                                                    <span className="text-lime-500">D</span>
                                                    <span className="text-[10px] text-slate-400 tracking-normal ml-1">®</span>
                                                </div>
                                            ) : partner.name === 'MITSUBISHI MOTORS' ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="text-red-600 font-black text-xl tracking-wider font-sans">
                                                        ◆ MITSUBISHI
                                                    </div>
                                                    <div className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                                                        MOTORS & MACHINERY
                                                    </div>
                                                </div>
                                            ) : partner.name === 'FANUC' ? (
                                                <div className="text-red-600 font-black text-2xl tracking-widest font-sans drop-shadow-sm">
                                                    FANUC
                                                </div>
                                            ) : (
                                                <div className="font-extrabold text-lg text-sky-600 dark:text-sky-400 font-sans tracking-wide">
                                                    {partner.name}
                                                </div>
                                            )}
                                        </div>

                                        {/* Subtitle / Thai Descriptor */}
                                        <p className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
                                            {partner.subtitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {partners.map((item, idx) => (
                            <button
                                key={item.name}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to partner slide ${idx + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentIndex % totalItems === idx
                                        ? 'w-6 bg-sky-500 shadow-md shadow-sky-500/40'
                                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-sky-400/60'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
