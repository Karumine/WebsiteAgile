import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useSections } from '@/lib/pageSections';
import { homeEligibilitySections } from '@/data/pageSections/homeEligibility';
import { getSectionIcon } from '@/lib/sectionIcons';

function useAnimatedStat(raw: string | undefined, fallback: string, duration: number = 1800, trigger: boolean = false): string {
    const rawVal = (raw && raw.trim().length > 0) ? raw.trim() : fallback;
    const match = rawVal.match(/^([^\d]*)(\d[\d,.]*)(.*)$/);

    const prefix = match ? match[1] : '';
    const numStr = match ? match[2].replace(/,/g, '') : '';
    const suffix = match ? match[3] : '';
    const targetNum = numStr ? parseFloat(numStr) : null;

    const [currentNum, setCurrentNum] = useState<number>(0);

    useEffect(() => {
        if (!trigger || targetNum === null || isNaN(targetNum)) return;
        let start = 0;
        const totalSteps = duration / 16;
        const increment = targetNum / totalSteps;
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetNum) {
                setCurrentNum(targetNum);
                clearInterval(timer);
            } else {
                setCurrentNum(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [targetNum, duration, trigger]);

    if (targetNum === null || isNaN(targetNum)) {
        return rawVal;
    }

    if (!trigger) {
        return `${prefix}0${suffix}`;
    }

    return `${prefix}${currentNum.toLocaleString()}${suffix}`;
}

export function CustomerEligibilitySection() {
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);
    const section = useSections(content, homeEligibilitySections);
    const eligibility = section('eligibility');
    const { settings } = useSiteSettings();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 350);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const factoryCount = useAnimatedStat(settings.impactStats?.factoriesServed, '40', 1600, isVisible);
    const contractsCount = useAnimatedStat(settings.impactStats?.totalContractsCount, '50', 1800, isVisible);
    const valueCount = useAnimatedStat(settings.impactStats?.totalCreditValueMB, '400', 2000, isVisible);

    if (eligibility.hidden) return null;
    return (
        <section ref={sectionRef} className="relative pt-20 sm:pt-24 pb-28 bg-[#0a234d] text-white overflow-hidden">
            {/* Background Decorative Grid and Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 @container">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-400 mb-3 font-sans">
                            {eligibility.t('t01')}
                        </p>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
                            {eligibility.t('t02')}
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 6-Card Grid (5 Criteria Cards + 1 CTA Card) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
                    {eligibility.items.map((item, index) => {
                        const IconComp = getSectionIcon(item.raw.icon);
                        return (
                            <ScrollReveal
                                key={index}
                                animation="fade-up"
                                delay={index * 80}
                                className="flex flex-col h-full"
                            >
                                <div className="group flex flex-col h-full rounded-3xl p-7 sm:p-8 bg-white text-slate-900 shadow-xl border border-white/20 hover:shadow-2xl hover:border-sky-400/60 transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                        <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-extrabold text-sky-900 font-sans mb-3 group-hover:text-sky-600 transition-colors">
                                        {item.t('title')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                        {item.t('desc')}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}

                    {/* Card 6: CTA Card */}
                    <ScrollReveal animation="fade-up" delay={400} className="flex flex-col h-full">
                        <div className="relative group flex flex-col items-center justify-center text-center h-full rounded-3xl p-7 sm:p-8 bg-white text-slate-900 shadow-xl border border-white/20 hover:shadow-2xl hover:border-sky-400/60 transition-all duration-300 overflow-hidden hover:-translate-y-1">
                            {/* Decorative Silk Ribbon Pattern */}
                            <div className="absolute inset-0 pointer-events-none opacity-35">
                                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-50,250 C100,50 300,280 450,120" stroke="#0284c7" strokeWidth="2" strokeOpacity="0.4" />
                                    <path d="M-20,280 C150,100 320,320 480,180" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.3" />
                                </svg>
                            </div>

                            <div className="relative z-10 space-y-3 flex flex-col items-center">
                                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-extrabold text-sky-900 font-sans">
                                    {eligibility.t('t03')}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    {eligibility.t('t04')}
                                </p>
                                <div className="pt-2">
                                    <button
                                        onClick={() => {
                                            navigate('/leasing-application');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <span>{eligibility.t('t05')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Floating Impact Stats Card at Bottom */}
                <ScrollReveal animation="zoom-in" delay={200}>
                    <div className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl border border-white/40 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                            {/* Counter 1 */}
                            <div className="text-center pt-4 sm:pt-0 first:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {factoryCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {eligibility.t('t06')}
                                </div>
                            </div>

                            {/* Counter 2 */}
                            <div className="text-center pt-6 sm:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {contractsCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {eligibility.t('t07')}
                                </div>
                            </div>

                            {/* Counter 3 */}
                            <div className="text-center pt-6 sm:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {valueCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {eligibility.t('t08')}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
