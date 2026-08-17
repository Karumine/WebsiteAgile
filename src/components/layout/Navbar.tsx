import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, DollarSign, Sparkles, Building2, Stethoscope, Truck, Sun, RefreshCw, BarChart2, ShieldCheck, Newspaper, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AgileAssetsLogo } from '@/components/ui/AgileAssetsLogo';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
    const { lang, setLang, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        setActiveDropdown(null);
        if (href.startsWith('/')) {
            navigate(href);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/' + href);
            } else {
                const el = document.querySelector(href);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    const toggleLang = () => {
        setLang(lang === 'th' ? 'en' : 'th');
    };

    const equipmentMenu = [
        { icon: Building2, labelKey: 'menu.industrialMachinery', href: '#financing' },
        { icon: Stethoscope, labelKey: 'menu.medicalEquipment', href: '#financing' },
        { icon: Truck, labelKey: 'menu.commercialFleet', href: '#financing' },
        { icon: Sun, labelKey: 'menu.cleanEnergy', href: '#financing' },
        { icon: RefreshCw, labelKey: 'menu.factoring', href: '#financing' },
        { icon: Sparkles, labelKey: 'menu.saleAndLeaseback', href: '#financing' },
    ];

    const irMenu = [
        { icon: BarChart2, labelKey: 'menu.financialReports', href: '/about' },
        { icon: ShieldCheck, labelKey: 'menu.governance', href: '/about' },
        { icon: Award, labelKey: 'menu.shareholderInfo', href: '/about' },
    ];

    const pressMenu = [
        { icon: Newspaper, labelKey: 'menu.pressReleases', href: '#news' },
        { icon: Sparkles, labelKey: 'menu.mediaKit', href: '#news' },
    ];

    const aboutMenu = [
        { icon: Building2, labelKey: 'menu.ourStory', href: '/about' },
        { icon: Award, labelKey: 'menu.leadership', href: '/about' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-black/5'
                    : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent backdrop-blur-none shadow-none'
            )}
        >
            {/* Bottom Border Line — Fades in/out in exact sync with background */}
            <div
                className={cn(
                    'absolute bottom-0 left-0 right-0 h-[1px] bg-border/80 transition-opacity duration-300 pointer-events-none',
                    scrolled ? 'opacity-100' : 'opacity-0'
                )}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('#home');
                        }}
                        className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <AgileAssetsLogo variant="full" textClassName={scrolled ? 'text-foreground' : 'text-white'} />
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {/* Equipment Financing Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('equipment')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => handleNavClick('#financing')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                    activeDropdown === 'equipment'
                                        ? 'text-sky-400 bg-sky-500/15'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.equipmentFinancing')}
                                <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200" />
                            </button>

                            {activeDropdown === 'equipment' && (
                                <div className="absolute top-full left-0 w-80 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-3 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl">
                                        <div className="px-3 py-2 border-b border-border/60 mb-2">
                                            <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                                                {t('nav.equipmentFinancing')}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                {t('nav.equipmentFinancing.desc')}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            {equipmentMenu.map((item) => (
                                                <button
                                                    key={item.labelKey}
                                                    onClick={() => handleNavClick(item.href)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-foreground hover:bg-sky-500/15 hover:text-sky-400 transition-all"
                                                >
                                                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 text-sky-400">
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <span>{t(item.labelKey)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Investor Relations Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('ir')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => handleNavClick('#about')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                    activeDropdown === 'ir'
                                        ? 'text-sky-400 bg-sky-500/15'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.investorRelations')}
                                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                            </button>

                            {activeDropdown === 'ir' && (
                                <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-2 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl space-y-1">
                                        {irMenu.map((item) => (
                                            <button
                                                key={item.labelKey}
                                                onClick={() => handleNavClick(item.href)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium text-foreground hover:bg-sky-500/15 hover:text-sky-400 transition-all"
                                            >
                                                <item.icon className="w-4 h-4 text-sky-400" />
                                                <span>{t(item.labelKey)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Press Center Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('press')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => handleNavClick('#news')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                    activeDropdown === 'press'
                                        ? 'text-sky-400 bg-sky-500/15'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.pressCenter')}
                                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                            </button>

                            {activeDropdown === 'press' && (
                                <div className="absolute top-full left-0 w-60 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-2 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl space-y-1">
                                        {pressMenu.map((item) => (
                                            <button
                                                key={item.labelKey}
                                                onClick={() => handleNavClick(item.href)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium text-foreground hover:bg-sky-500/15 hover:text-sky-400 transition-all"
                                            >
                                                <item.icon className="w-4 h-4 text-sky-400" />
                                                <span>{t(item.labelKey)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* About Us Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('about')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => handleNavClick('/about')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                    activeDropdown === 'about'
                                        ? 'text-sky-400 bg-sky-500/15'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.about')}
                                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                            </button>

                            {activeDropdown === 'about' && (
                                <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-2 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl space-y-1">
                                        {aboutMenu.map((item) => (
                                            <button
                                                key={item.labelKey}
                                                onClick={() => handleNavClick(item.href)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium text-foreground hover:bg-sky-500/15 hover:text-sky-400 transition-all"
                                            >
                                                <item.icon className="w-4 h-4 text-sky-400" />
                                                <span>{t(item.labelKey)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Asset for Sale */}
                        <button
                            onClick={() => handleNavClick('#assets-for-sale')}
                            className={cn(
                                'px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                scrolled
                                    ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                    : 'text-slate-100 hover:text-white hover:bg-white/15'
                            )}
                        >
                            {t('nav.assetForSale')}
                        </button>

                        {/* Rates & Calculator */}
                        <button
                            onClick={() => handleNavClick('#calculator')}
                            className={cn(
                                'px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                                scrolled
                                    ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                    : 'text-slate-100 hover:text-white hover:bg-white/15'
                            )}
                        >
                            {t('nav.calculator')}
                        </button>
                    </nav>

                    {/* Right Tools & CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Flag-based Language Switcher */}
                        <button
                            onClick={toggleLang}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 hover:scale-105',
                                scrolled
                                    ? 'glass border-border hover:border-sky-400/50 text-foreground'
                                    : 'bg-black/30 border-white/20 hover:border-sky-400/60 text-white backdrop-blur-md'
                            )}
                            title="Toggle Thai / English"
                        >
                            <span className="text-base leading-none">
                                {lang === 'th' ? '🇹🇭' : '🇺🇸'}
                            </span>
                            <span className="font-bold tracking-wide text-sky-400">
                                {lang.toUpperCase()}
                            </span>
                        </button>

                        {/* Primary Action Button */}
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                        >
                            <DollarSign className="w-4 h-4" />
                            {t('nav.financingWithUs')}
                        </button>
                    </div>

                    {/* Mobile Menu Trigger & Controls */}
                    <div className="flex items-center gap-2 xl:hidden">
                        <ThemeToggle />

                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass text-xs font-semibold text-foreground"
                        >
                            <span className="text-sm">{lang === 'th' ? '🇹🇭' : '🇺🇸'}</span>
                            <span className="text-sky-400">{lang.toUpperCase()}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl glass text-foreground hover:text-sky-400 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Navigation */}
            <div
                className={cn(
                    'xl:hidden overflow-hidden transition-all duration-300 border-t border-border/80 bg-background/95 backdrop-blur-2xl',
                    isOpen ? 'max-h-[85vh] overflow-y-auto py-4 shadow-2xl' : 'max-h-0 py-0'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 space-y-2">
                    {/* Equipment Financing Accordion */}
                    <div>
                        <button
                            onClick={() => setMobileOpenMenu(mobileOpenMenu === 'equipment' ? null : 'equipment')}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                        >
                            <span>{t('nav.equipmentFinancing')}</span>
                            <ChevronDown
                                className={cn(
                                    'w-4 h-4 transition-transform duration-200',
                                    mobileOpenMenu === 'equipment' ? 'rotate-180 text-sky-400' : ''
                                )}
                            />
                        </button>
                        {mobileOpenMenu === 'equipment' && (
                            <div className="pl-4 pr-2 py-1 space-y-1">
                                {equipmentMenu.map((item) => (
                                    <button
                                        key={item.labelKey}
                                        onClick={() => handleNavClick(item.href)}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-sky-400 hover:bg-white/5 rounded-lg transition-colors text-left"
                                    >
                                        <item.icon className="w-3.5 h-3.5 text-sky-400" />
                                        <span>{t(item.labelKey)}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Asset for Sale */}
                    <button
                        onClick={() => handleNavClick('#assets-for-sale')}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                    >
                        {t('nav.assetForSale')}
                    </button>

                    {/* Calculator */}
                    <button
                        onClick={() => handleNavClick('#calculator')}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                    >
                        {t('nav.calculator')}
                    </button>

                    {/* Rates */}
                    <button
                        onClick={() => handleNavClick('#rates')}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                    >
                        {t('nav.rates')}
                    </button>

                    {/* Press Center */}
                    <button
                        onClick={() => handleNavClick('#news')}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                    >
                        {t('nav.pressCenter')}
                    </button>

                    {/* About Us */}
                    <button
                        onClick={() => handleNavClick('/about')}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-sky-500/10 transition-colors"
                    >
                        {t('nav.about')}
                    </button>

                    {/* Contact CTA */}
                    <div className="pt-2">
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30"
                        >
                            <DollarSign className="w-4 h-4" />
                            {t('nav.financingWithUs')}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
