import { DollarSign, ArrowRight, Calculator, ShieldCheck, TrendingUp, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { AgileAssetsLogo } from '@/components/ui/AgileAssetsLogo';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function HeroBanner() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleScrollTo = (targetId: string) => {
        const el = document.querySelector(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const stats = [
        {
            icon: TrendingUp,
            value: t('hero.stat.aumValue'),
            label: t('hero.stat.aum'),
        },
        {
            icon: Clock,
            value: t('hero.stat.approvalValue'),
            label: t('hero.stat.approval'),
        },
        {
            icon: Award,
            value: t('hero.stat.yearsValue'),
            label: t('hero.stat.years'),
        },
        {
            icon: ShieldCheck,
            value: t('hero.stat.satisfactionValue'),
            label: t('hero.stat.satisfaction'),
        },
    ];

    return (
        <section id="home" className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
            {/* High-Resolution Tree of Growth Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Agile Assets Growth Tree"
                    className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                    loading="eager"
                />
                {/* Dynamic Vignette & Ambient Light Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
            </div>

            {/* Glowing Ambient Particles / Aura Lightings */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
            <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

            {/* Hero Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                {/* Agile Assets Central Emblem & Brand Name */}
                <div className="animate-fade-in mb-6">
                    <AgileAssetsLogo variant="hero" />
                </div>

                {/* Sub-badge with Currency/Growth Icon */}
                <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border text-xs sm:text-sm font-bold mb-6 shadow-lg animate-fade-in transition-all duration-300 ${
                        isDark
                            ? 'bg-slate-950/80 border-sky-400/40 text-sky-300 shadow-sky-500/10 glow-cyan'
                            : 'bg-white/85 border-sky-200 text-sky-800 shadow-sky-950/5'
                    }`}
                >
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-sky-400/20 text-sky-300' : 'bg-sky-500/15 text-sky-600'
                        }`}
                    >
                        <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <span>{t('hero.badge')}</span>
                </div>

                {/* Main Headline: Growth – Good Capital */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                    <span className="text-gradient">Growth – Good Capital</span>
                </h1>

                {/* Thai Sub-headline with glowing soft tone */}
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-6 drop-shadow-lg font-sans">
                    {t('hero.titleTh')}
                </p>

                {/* Narrative Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md font-normal">
                    {t('hero.description')}
                </p>

                {/* Call-to-Action Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-xl mx-auto">
                    {/* Primary Button: $ Financing with Us */}
                    <button
                        onClick={() => handleScrollTo('#contact')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/35 hover:shadow-sky-400/60 hover:scale-105 active:scale-[0.98] transition-all duration-200 glow-cyan group"
                    >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span>{t('hero.ctaFinancing')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Secondary Button: Loan Calculator */}
                    <button
                        onClick={() => handleScrollTo('#calculator')}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base border hover:scale-105 active:scale-[0.98] transition-all duration-200 backdrop-blur-xl shadow-lg ${
                            isDark
                                ? 'bg-slate-900/80 hover:bg-slate-800/90 text-white border-white/25 hover:border-sky-400/50'
                                : 'bg-white/90 hover:bg-white text-slate-900 border-sky-200/80 hover:border-sky-400/60 shadow-slate-900/10'
                        }`}
                    >
                        <Calculator className={`w-4.5 h-4.5 ${isDark ? 'text-sky-300' : 'text-sky-600'}`} />
                        <span>{t('hero.ctaCalculator')}</span>
                    </button>
                </div>
            </div>

            {/* Bottom Floating Stats Strip */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 sm:mt-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-slide-up">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border backdrop-blur-2xl transition-all duration-300 ${
                                isDark
                                    ? 'border-white/15 bg-slate-950/80 text-white hover:border-sky-400/50 hover:bg-slate-900/90 shadow-none'
                                    : 'border-sky-100/90 bg-white/90 text-slate-900 hover:border-sky-400/50 hover:bg-white shadow-xl shadow-slate-900/10'
                            }`}
                        >
                            <div
                                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl border flex items-center justify-center flex-shrink-0 ${
                                    isDark
                                        ? 'bg-sky-500/20 border-sky-400/30 text-sky-400'
                                        : 'bg-sky-500/10 border-sky-400/20 text-sky-600'
                                }`}
                            >
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="min-w-0">
                                <p
                                    className={`text-lg sm:text-2xl font-extrabold tracking-tight leading-tight truncate font-sans ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    className={`text-[11px] sm:text-xs font-semibold truncate mt-0.5 ${
                                        isDark ? 'text-slate-300' : 'text-slate-600'
                                    }`}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
