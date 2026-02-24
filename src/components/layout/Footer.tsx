import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
    const { settings } = useSiteSettings();
    const { companyInfo } = settings;
    const { t } = useLanguage();

    const quickLinks = [
        { labelKey: 'nav.home', href: '#home' },
        { labelKey: 'nav.rates', href: '#rates' },
        { labelKey: 'nav.news', href: '#news' },
        { labelKey: 'nav.about', href: '#about' },
        { labelKey: 'nav.contact', href: '#contact' },
    ];

    return (
        <footer className="border-t border-border bg-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-gradient">Agile Assets</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {companyInfo.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            {t('footer.quickLinks')}
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => {
                                            const el = document.querySelector(item.href);
                                            el?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-sm text-muted-foreground hover:text-gold transition-colors"
                                    >
                                        {t(item.labelKey)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            {t('footer.contact')}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-gold" />
                                {companyInfo.phone}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-gold" />
                                {companyInfo.email}
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                                {companyInfo.address}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} {companyInfo.name}. {t('footer.copyright')} |{' '}
                        {t('footer.license')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
