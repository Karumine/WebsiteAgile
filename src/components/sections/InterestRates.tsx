import { TrendingUp, Star } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatRate } from '@/lib/utils';

export function InterestRates() {
    const { settings } = useSiteSettings();
    const { interestRates } = settings;
    const { t } = useLanguage();

    return (
        <section id="rates" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/30 to-background" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-blue-400 mb-4">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {t('rates.badge')}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {t('rates.title')}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('rates.subtitle')}
                    </p>
                </div>

                {/* Rates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interestRates.map((rate, index) => (
                        <div
                            key={rate.id}
                            className="group relative glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {rate.featured && (
                                <div className="absolute -top-3 right-4">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-400/20">
                                        <Star className="w-3 h-3" />
                                        {t('rates.featured')}
                                    </span>
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                                    {rate.product}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {rate.description}
                                </p>
                            </div>

                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-4xl font-bold text-primary">
                                    {formatRate(rate.rate)}
                                </span>
                                <span className="text-sm text-muted-foreground pb-1">{t('rates.apr')}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <span className="text-xs text-muted-foreground">{t('rates.term')}</span>
                                <span className="text-sm font-medium text-foreground">{rate.term}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-muted-foreground">
                        {t('rates.disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}
