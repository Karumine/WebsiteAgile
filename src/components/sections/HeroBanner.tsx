import { ArrowRight, Shield, BarChart3, Clock } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroBanner() {
    const { settings } = useSiteSettings();
    const { banner } = settings;
    const { t } = useLanguage();

    const handleCTA = () => {
        const el = document.querySelector(banner.ctaLink);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Floating orbs */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
                <div className="max-w-3xl animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-gold mb-8">
                        <Shield className="w-3.5 h-3.5" />
                        {t('hero.badge')}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                        <span className="text-foreground">{banner.headline.split(' ').slice(0, -1).join(' ')} </span>
                        <span className="text-gradient">{banner.headline.split(' ').slice(-1)}</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                        {banner.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleCTA}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-gold text-white font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {banner.ctaText}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-white/5 transition-all"
                        >
                            {t('hero.learnMore')}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    {[
                        { icon: BarChart3, label: t('hero.stat.aum'), value: '$2.4B+' },
                        { icon: Shield, label: t('hero.stat.years'), value: '16+' },
                        { icon: Clock, label: t('hero.stat.approval'), value: t('hero.stat.approvalValue') },
                    ].map((stat) => (
                        <div key={stat.label} className="glass rounded-xl p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                <stat.icon className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
