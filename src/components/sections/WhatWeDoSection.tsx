import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useSections } from '@/lib/pageSections';
import { homeWhatWeDoSections } from '@/data/pageSections/homeWhatWeDo';
import { SectionIcon } from '@/lib/sectionIcons';

export function WhatWeDoSection() {
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);
    const section = useSections(content, homeWhatWeDoSections);
    const whatWeDo = section('what-we-do');
    const navigate = useNavigate();

    if (whatWeDo.hidden) return null;
    return (
        <section className="relative py-20 sm:py-24 bg-[#0a234d] text-white overflow-hidden">
            {/* Background Decorative Grid and Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 2-Column Main Section: Image on Left + Text on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
                    {/* Left: Featured Image with Soft Rounded Corners */}
                    <ScrollReveal animation="fade-right" className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img
                                src={whatWeDo.t('img01')}
                                alt="Agile Assets Financing Support"
                                className="w-full h-[360px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&q=80';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </ScrollReveal>

                    {/* Right: WHAT WE DO Detailed Content */}
                    <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-6 space-y-6">
                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide font-sans mb-6">
                                {whatWeDo.t('t02')}
                            </h2>

                            {/* Section 1: ก้าวแรกของการเติบโต */}
                            <div className="space-y-2 mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-sky-300">
                                    {whatWeDo.t('t03')}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
                                    {whatWeDo.t('t04')}
                                </p>
                            </div>

                            {/* Section 2: ABOUT AGILE ASSETS */}
                            <div className="space-y-3">
                                <h3 className="text-lg sm:text-xl font-bold text-sky-300">
                                    {whatWeDo.t('t05')}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
                                    {whatWeDo.t('t06')}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
                                    {whatWeDo.t('t07')}
                                </p>
                            </div>

                            {/* Action Button: รู้จักเราให้มากขึ้น */}
                            <div className="pt-4">
                                <button
                                    onClick={() => {
                                        navigate('/about-us');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-sky-400/25 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <span>{whatWeDo.t('t08')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Bottom 3-Pill Feature Bar (CLOSE / CARING / FLEXIBLE) */}
                <ScrollReveal animation="fade-up" delay={250}>
                    <div className="rounded-2xl sm:rounded-3xl bg-sky-100/90 dark:bg-sky-950/60 backdrop-blur-md p-6 sm:p-8 border border-sky-300/30 text-slate-900 dark:text-white shadow-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-sky-300/40 dark:divide-sky-800/60">
                            {whatWeDo.items.map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center pt-4 sm:pt-0 first:pt-0 sm:px-4">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-300 mb-3 shadow-lg border border-sky-200/50 dark:border-sky-700/50">
                                        <SectionIcon name={item.raw.icon} className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>
                                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-wider mb-1 font-sans">
                                        {item.t('title')}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        {item.t('desc')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
