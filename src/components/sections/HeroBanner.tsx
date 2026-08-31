import { useNavigate } from 'react-router-dom';
import { DollarSign, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { AgileAssetsLogo } from '@/components/ui/AgileAssetsLogo';

import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function HeroBanner() {
    const { t } = useLanguage();
    const { settings } = useSiteSettings();
    const navigate = useNavigate();

    const headline = settings.banner?.headline || 'Growth – Good Capital';
    const subheadline = settings.banner?.subheadline || t('hero.titleTh');
    const ctaText = settings.banner?.ctaText || t('hero.ctaFinancing');
    const ctaLink = settings.banner?.ctaLink || '/leasing-application';

    return (
        <section id="home" className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
            {/* High-Resolution Tree of Growth Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Agile Assets Growth Tree"
                    className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
                {/* Dynamic Vignette & Ambient Light Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                
                {/* Soft Bottom Fog/Fade Gradient into next section */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
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

                {/* Main Headline: Growth – Good Capital */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                    <span className="text-white">{headline}</span>
                </h1>

                {/* Thai Sub-headline with glowing soft tone */}
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-wide mb-10 drop-shadow-lg font-sans">
                    {subheadline}
                </p>

                {/* Call-to-Action Action Button */}
                <div className="flex items-center justify-center max-w-md mx-auto">
                    <button
                        onClick={() => {
                            if (ctaLink.startsWith('#')) {
                                const elem = document.querySelector(ctaLink);
                                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                navigate(ctaLink);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/35 hover:shadow-sky-400/60 hover:scale-105 active:scale-[0.98] transition-all duration-200 glow-cyan group"
                    >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span>{ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
