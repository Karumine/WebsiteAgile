import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AgileAssetsLogo } from '@/components/ui/AgileAssetsLogo';

export function Footer() {
    const { settings } = useSiteSettings();
    const { companyInfo } = settings;
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (href: string) => {
        if (href.startsWith('/')) {
            navigate(href);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/' + href);
            } else {
                const el = document.querySelector(href);
                el?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const quickLinks = [
        { labelKey: 'nav.home', href: '/' },
        { labelKey: 'nav.equipmentFinancing', href: '#financing' },
        { labelKey: 'nav.assetForSale', href: '#assets-for-sale' },
        { labelKey: 'nav.calculator', href: '#calculator' },
        { labelKey: 'nav.rates', href: '#rates' },
        { labelKey: 'nav.news', href: '#news' },
        { labelKey: 'nav.about', href: '/about' },
        { labelKey: 'nav.contact', href: '#contact' },
    ];

    const financingProducts = [
        { name: lang === 'th' ? 'เครื่องจักรอุตสาหกรรม' : 'Industrial Machinery', href: '#financing' },
        { name: lang === 'th' ? 'เครื่องมือและอุปกรณ์แพทย์' : 'Medical Equipment', href: '#financing' },
        { name: lang === 'th' ? 'ยานพาหนะเชิงพาณิชย์' : 'Commercial Fleet', href: '#financing' },
        { name: lang === 'th' ? 'พลังงานสะอาดและโซลาร์' : 'Clean Tech & Solar', href: '#financing' },
        { name: lang === 'th' ? 'สินเชื่อแฟคตอริ่ง' : 'Factoring Solutions', href: '#financing' },
        { name: lang === 'th' ? 'ขายและเช่ากลับ' : 'Sale & Leaseback', href: '#financing' },
    ];

    return (
        <footer className="border-t border-border/80 bg-slate-950 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <AgileAssetsLogo variant="full" />
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                            {lang === 'th'
                                ? 'Agile Assets ผู้ให้บริการสินเชื่อเช่าซื้อเครื่องจักร ยานพาหนะเชิงพาณิชย์ และโซลูชันเงินทุนเพื่อการเติบโตอย่างยั่งยืน มุ่งมั่นเคียงข้างธุรกิจไทยตั้งแต่ปี 2010'
                                : 'Agile Assets — Premier equipment financing and bespoke capital solutions empowering enterprises with speed, transparency, and ESG-aligned growth since 2010.'}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Licensed Financial Institution</span>
                        </div>
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-sans">
                            {t('footer.quickLinks')}
                        </h3>
                        <ul className="space-y-2 text-xs">
                            {quickLinks.slice(0, 5).map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        className="text-slate-400 hover:text-sky-400 transition-colors text-left"
                                    >
                                        {t(item.labelKey)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Financing Services */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-sans">
                            {t('footer.services')}
                        </h3>
                        <ul className="space-y-2 text-xs">
                            {financingProducts.map((p, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => handleNavClick(p.href)}
                                        className="text-slate-400 hover:text-sky-400 transition-colors text-left"
                                    >
                                        {p.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-sans">
                            {t('footer.contact')}
                        </h3>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <a href={`tel:${companyInfo.phone}`} className="hover:text-sky-400 transition-colors">
                                    {companyInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <a href={`mailto:${companyInfo.email}`} className="hover:text-sky-400 transition-colors">
                                    {companyInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5 text-slate-300">
                                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed text-slate-400">{companyInfo.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} {companyInfo.name}. {t('footer.copyright')} |{' '}
                        {t('footer.license')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
