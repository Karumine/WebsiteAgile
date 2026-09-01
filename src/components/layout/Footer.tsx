import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
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
        if (href === '/' || href === '#home') {
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }
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
        { labelKey: 'nav.investorRelations', href: '/investor-relations' },
        { labelKey: 'menu.projectsActivity', href: '/project' },
        { labelKey: 'nav.about', href: '/about-us' },
        { labelKey: 'menu.ncNda', href: '/nc-nda' },
        { labelKey: 'nav.assetForSale', href: '/used-machine' },
        { labelKey: 'nav.calculator', href: '/calculator' },
        { labelKey: 'nav.faq', href: '/faq' },
        { labelKey: 'nav.contact', href: '/contact' },
    ];

    const financingProducts = [
        { name: lang === 'th' ? 'สินเชื่อโรงงานผลิตน้ำดื่ม' : 'Financing for Drinking Water Production', href: '/drinking-water-production' },
        { name: lang === 'th' ? 'สินเชื่อฟาร์มปศุสัตว์' : 'Financing for Livestock Farm', href: '/livestock-farm' },
        { name: lang === 'th' ? 'สินเชื่อโรงงานแปรรูปอาหาร' : 'Financing for Food Processing', href: '/food-processing' },
        { name: lang === 'th' ? 'สินเชื่อโรงไฟฟ้าก๊าซชีวภาพ' : 'Financing for Biogas Production', href: '/biogas-production' },
        { name: lang === 'th' ? 'สินเชื่อโรงไฟฟ้าพลังงานแสงอาทิตย์' : 'Financing for Solar Power Generation', href: '/solar-power-generation' },
    ];

    return (
        <footer className="border-t border-border/80 bg-slate-950 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                if (location.pathname === '/') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    navigate('/');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
                        >
                            <AgileAssetsLogo variant="full" />
                        </a>
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
                            {quickLinks.slice(0, 6).map((item) => (
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

                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} {companyInfo.name}. {t('footer.copyright')}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                        <button onClick={() => handleNavClick('/nc-nda')} className="hover:text-sky-400 transition-colors">
                            {lang === 'th' ? 'สัญญาการรักษาความลับ (NC-NDA)' : 'NC-NDA Agreement'}
                        </button>
                        <span>•</span>
                        <button onClick={() => handleNavClick('/cookie-policy')} className="hover:text-sky-400 transition-colors">
                            {lang === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy'}
                        </button>
                        <span>•</span>
                        <button onClick={() => handleNavClick('/privacy-policy')} className="hover:text-sky-400 transition-colors">
                            {lang === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
