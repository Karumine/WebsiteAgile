import { Target, Users, Award, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
    const { t } = useLanguage();

    const values = [
        {
            icon: Target,
            titleKey: 'about.precision',
            descKey: 'about.precision.desc',
        },
        {
            icon: Users,
            titleKey: 'about.clientFirst',
            descKey: 'about.clientFirst.desc',
        },
        {
            icon: Award,
            titleKey: 'about.excellence',
            descKey: 'about.excellence.desc',
        },
        {
            icon: Lightbulb,
            titleKey: 'about.innovation',
            descKey: 'about.innovation.desc',
        },
    ];

    return (
        <section id="about" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {t('about.title')} <span className="text-gradient">Agile Assets</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div
                            key={value.titleKey}
                            className="group glass rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-400/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-400/20 transition-colors">
                                <value.icon className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{t(value.descKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
