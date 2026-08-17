import { TrendingUp, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatRate } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function InterestRates() {
    const { settings } = useSiteSettings();
    const { interestRates } = settings;
    const { t, lang } = useLanguage();

    const handleApply = (productName: string) => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const inputProduct = document.querySelector('select[name="productType"]') as HTMLSelectElement;
            if (inputProduct) {
                inputProduct.value = productName;
            }
        }
    };

    return (
        <section id="rates" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{t('rates.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('rates.title')}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('rates.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Rates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interestRates.map((rate, index) => (
                        <ScrollReveal
                            key={rate.id}
                            animation="fade-up"
                            delay={index * 120}
                            className="flex flex-col h-full"
                        >
                            <div
                                className={`group relative glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border h-full ${
                                    rate.featured
                                        ? 'border-sky-400/40 shadow-xl shadow-sky-500/10'
                                        : 'border-border/80 hover:border-sky-400/30'
                                }`}
                            >
                                {rate.featured && (
                                    <div className="absolute -top-3 right-6">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white text-xs font-bold shadow-lg shadow-sky-500/30">
                                            <Star className="w-3 h-3 fill-current" />
                                            {t('rates.featured')}
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-sky-400 transition-colors font-sans">
                                            {rate.product}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed min-h-[36px]">
                                            {rate.description}
                                        </p>
                                    </div>

                                    <div className="flex items-baseline gap-1.5 my-6">
                                        <span className="text-4xl sm:text-5xl font-extrabold text-sky-400 tracking-tight font-sans">
                                            {formatRate(rate.rate)}
                                        </span>
                                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            {t('rates.apr')}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between py-3 border-t border-border/60 text-xs">
                                        <span className="text-muted-foreground font-medium">{t('rates.term')}</span>
                                        <span className="font-bold text-foreground">{rate.term}</span>
                                    </div>

                                    <button
                                        onClick={() => handleApply(rate.product)}
                                        className="w-full mt-4 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white font-semibold text-xs transition-all duration-200"
                                    >
                                        <span>{lang === 'th' ? 'ขอสินเชื่ออัตรานี้' : 'Apply at this rate'}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t('rates.disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}
