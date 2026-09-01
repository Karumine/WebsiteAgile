import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Menu, X, ChevronDown, ChevronRight, Sparkles, 
    Newspaper, Award, Droplets, Wheat, Factory, Flame, Sun, Snowflake, 
    Cog, Zap, Boxes, BookOpen, Mail, Leaf, Calculator, Percent, HelpCircle, Phone, Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AgileAssetsLogo } from '@/components/ui/AgileAssetsLogo';

// ─── Static menu data (extracted outside component to avoid re-creation) ───
const EQUIPMENT_CATEGORIES = [
    {
        id: 'industry' as const,
        titleKey: 'menu.industrySolutions',
        icon: Factory,
        items: [
            { id: 'drinking-water', labelKey: 'menu.drinkingWater', icon: Droplets, href: '/drinking-water-production' },
            { id: 'livestock-farm', labelKey: 'menu.livestockFarm', icon: Wheat, href: '/livestock-farm' },
            { id: 'food-processing', labelKey: 'menu.foodProcessing', icon: Factory, href: '/food-processing' },
            { id: 'biogas-production', labelKey: 'menu.biogasProduction', icon: Flame, href: '/biogas-production' },
            { id: 'solar-power', labelKey: 'menu.solarPower', icon: Sun, href: '/solar-power-generation' },
        ]
    },
    {
        id: 'industrial' as const,
        titleKey: 'menu.industrialEquipment',
        icon: Boxes,
        items: [
            { id: 'chiller', labelKey: 'menu.chiller', icon: Snowflake, href: '/chiller' },
            { id: 'injection-molding', labelKey: 'menu.injectionMolding', icon: Cog, href: '/injection-molding-machine' },
            { id: 'generator-set', labelKey: 'menu.generatorSet', icon: Zap, href: '/generator-set' },
        ]
    }
];

const PRESS_MENU = [
    { icon: Sparkles, labelKey: 'menu.projectsActivity', href: '/project' },
    { icon: Award, labelKey: 'menu.successStory', href: '/success-story' },
    { icon: BookOpen, labelKey: 'menu.knowledgeContents', href: '/knowledge' },
    { icon: Newspaper, labelKey: 'menu.newsUpdate', href: '/news-update' },
    { icon: Mail, labelKey: 'menu.newsletter', href: '/newsletter' },
];

const ABOUT_MENU = [
    { icon: Leaf, labelKey: 'menu.sustainabilityCampaign', href: '/sustainability' },
    { icon: Calculator, labelKey: 'menu.financingCalculator', href: '/calculator' },
    { icon: Percent, labelKey: 'menu.interestRateConverter', href: '/interest-rate-conversion' },
    { icon: HelpCircle, labelKey: 'menu.faq', href: '/faq' },
    { icon: Phone, labelKey: 'menu.contactUs', href: '/contact' },
    { icon: Briefcase, labelKey: 'menu.workForUs', href: '/#contact' },
];

const EQUIPMENT_PATHS = new Set([
    '/drinking-water-production', '/livestock-farm', '/food-processing',
    '/biogas-production', '/solar-power-generation', '/solar-power-generation-en',
    '/en/solar-power-generation-en', '/chiller', '/injection-molding-machine', '/generator-set',
]);

const INVESTOR_PATHS = new Set(['/investor-relations', '/en/investor-relations']);

const PRESS_PATHS = new Set([
    '/project', '/project-activity', '/success-story',
    '/knowledge', '/news-update', '/newsletter',
]);

const ABOUT_PATHS = new Set([
    '/about', '/about-us', '/en/about-us', '/sustainability',
    '/en/sustainability-2', '/calculator', '/interest-rate-conversion',
    '/interest-rate-conversion-2', '/en/interest-rate-conversion-2',
    '/faq', '/faq-2', '/frequently-asked-questions', '/en/faq-2',
    '/contact', '/contact-us', '/contact-2', '/en/contact-2',
    '/nc-nda', '/nda', '/non-disclosure-agreement', '/en/nc-nda',
]);

const ASSET_PATHS = new Set([
    '/used-machine', '/used-machine-2', '/asset-for-sale',
    '/assets-for-sale', '/asset-for-sale-en', '/en/asset-for-sale-en',
]);
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<'industry' | 'industrial'>('industry');
    const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
    const [mobileOpenSubMenu, setMobileOpenSubMenu] = useState<string | null>(null);
    const { lang, setLang, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const rafRef = useRef<number>(0);

    // Throttled scroll handler using requestAnimationFrame
    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const isOver = window.scrollY > 20;
                setScrolled(prev => (prev !== isOver ? isOver : prev));
                rafRef.current = 0;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleNavClick = useCallback((href: string) => {
        setIsOpen(false);
        setActiveDropdown(null);
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
            const [hash, query] = href.split('?');
            const params = new URLSearchParams(query || '');
            const itemId = params.get('item');

            if (location.pathname !== '/') {
                navigate('/' + href);
            } else {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
                if (itemId) {
                    window.dispatchEvent(new CustomEvent('selectFinancingProduct', { detail: { itemId } }));
                }
            }
        }
    }, [navigate, location.pathname]);

    const currentSubItems = EQUIPMENT_CATEGORIES.find(c => c.id === activeSubMenu)?.items || EQUIPMENT_CATEGORIES[0].items;

    // Memoized active state checks
    const isEquipmentActive = useMemo(() => EQUIPMENT_PATHS.has(location.pathname), [location.pathname]);
    const isInvestorActive = useMemo(() => INVESTOR_PATHS.has(location.pathname), [location.pathname]);
    const isPressActive = useMemo(() => PRESS_PATHS.has(location.pathname), [location.pathname]);
    const isAboutActive = useMemo(() => ABOUT_PATHS.has(location.pathname), [location.pathname]);
    const isAssetActive = useMemo(() => ASSET_PATHS.has(location.pathname), [location.pathname]);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-200',
                scrolled
                    ? 'bg-background/90 backdrop-blur-md shadow-lg shadow-black/5'
                    : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent backdrop-blur-none shadow-none'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            setActiveDropdown(null);
                            if (location.pathname === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                navigate('/');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <AgileAssetsLogo variant="full" textClassName={scrolled ? 'text-foreground' : 'text-white'} />
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden xl:flex items-center gap-1.5">
                        {/* Equipment Financing Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('equipment')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveDropdown(activeDropdown === 'equipment' ? null : 'equipment');
                                }}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-default relative',
                                    (isEquipmentActive || activeDropdown === 'equipment')
                                        ? 'text-sky-400 bg-sky-500/20 shadow-sm shadow-sky-500/10 font-bold'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.equipmentFinancing')}
                                <ChevronDown className={cn("w-3.5 h-3.5 opacity-70 transition-transform duration-200", activeDropdown === 'equipment' && "rotate-180")} />
                                {isEquipmentActive && (
                                    <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                )}
                            </button>

                            {activeDropdown === 'equipment' && (
                                <div className="absolute top-full left-0 pt-2 animate-fade-in z-50">
                                    <div className="glass rounded-2xl shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl p-2 flex gap-2">
                                        {/* Left Column: Categories */}
                                        <div className="w-56 space-y-1">
                                            <div className="px-3 py-2 border-b border-border/60 mb-1">
                                                <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                                                    {t('nav.equipmentFinancing')}
                                                </p>
                                            </div>
                                            {EQUIPMENT_CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onMouseEnter={() => setActiveSubMenu(cat.id)}
                                                    onClick={() => setActiveSubMenu(cat.id)}
                                                    className={cn(
                                                        'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150',
                                                        activeSubMenu === cat.id
                                                             ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                                             : 'text-foreground hover:bg-sky-500/10 hover:text-sky-400 border border-transparent'
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <cat.icon className="w-4 h-4 text-sky-400" />
                                                        <span>{t(cat.titleKey)}</span>
                                                    </div>
                                                    <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Vertical Divider */}
                                        <div className="w-[1px] bg-border/60 self-stretch my-1" />

                                        {/* Right Column: Sub-items */}
                                        <div className="w-72 space-y-1 p-1">
                                            <div className="px-3 py-2 border-b border-border/60 mb-1">
                                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    {t(EQUIPMENT_CATEGORIES.find(c => c.id === activeSubMenu)?.titleKey || 'menu.industrySolutions')}
                                                </p>
                                            </div>
                                            {currentSubItems.map((item) => {
                                                const isSubActive = location.pathname === item.href;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleNavClick(item.href)}
                                                        className={cn(
                                                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all group",
                                                            isSubActive
                                                                ? "bg-sky-500/20 text-sky-400 font-bold border-l-2 border-sky-400 pl-3.5"
                                                                : "text-foreground hover:bg-sky-500/15 hover:text-sky-400"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                                                            isSubActive
                                                                ? "bg-sky-500 text-white"
                                                                : "bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white"
                                                        )}>
                                                            <item.icon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="truncate">{t(item.labelKey)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Investor Relations */}
                        <button
                            onClick={() => handleNavClick('/investor-relations')}
                            className={cn(
                                'px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 relative',
                                isInvestorActive
                                    ? 'text-sky-400 bg-sky-500/20 shadow-sm shadow-sky-500/10 font-bold'
                                    : scrolled
                                    ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                    : 'text-slate-100 hover:text-white hover:bg-white/15'
                            )}
                        >
                            {t('nav.investorRelations')}
                            {isInvestorActive && (
                                <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                            )}
                        </button>

                        {/* Press Center Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('press')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveDropdown(activeDropdown === 'press' ? null : 'press');
                                }}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-default relative',
                                    (isPressActive || activeDropdown === 'press')
                                        ? 'text-sky-400 bg-sky-500/20 shadow-sm shadow-sky-500/10 font-bold'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.pressCenter')}
                                <ChevronDown className={cn("w-3.5 h-3.5 opacity-70 transition-transform duration-200", activeDropdown === 'press' && "rotate-180")} />
                                {isPressActive && (
                                    <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                )}
                            </button>

                            {activeDropdown === 'press' && (
                                <div className="absolute top-full left-0 w-60 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-2 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl space-y-1">
                                        {PRESS_MENU.map((item) => {
                                            const isSubActive = location.pathname === item.href;
                                            return (
                                                <button
                                                    key={item.labelKey}
                                                    onClick={() => handleNavClick(item.href)}
                                                    className={cn(
                                                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all",
                                                        isSubActive
                                                            ? "bg-sky-500/20 text-sky-400 font-bold border-l-2 border-sky-400 pl-3.5"
                                                            : "text-foreground hover:bg-sky-500/15 hover:text-sky-400"
                                                    )}
                                                >
                                                    <item.icon className="w-4 h-4 text-sky-400" />
                                                    <span>{t(item.labelKey)}</span>
                                                </button>
                                            );
                                        })}
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
                                onClick={() => handleNavClick('/about-us')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 relative',
                                    (isAboutActive || activeDropdown === 'about')
                                        ? 'text-sky-400 bg-sky-500/20 shadow-sm shadow-sky-500/10 font-bold'
                                        : scrolled
                                        ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                                )}
                            >
                                {t('nav.about')}
                                <ChevronDown className={cn("w-3.5 h-3.5 opacity-70 transition-transform duration-200", activeDropdown === 'about' && "rotate-180")} />
                                {isAboutActive && (
                                    <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                )}
                            </button>

                            {activeDropdown === 'about' && (
                                <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in">
                                    <div className="glass rounded-2xl p-2 shadow-2xl border border-sky-500/20 bg-card/95 backdrop-blur-2xl space-y-1">
                                        {ABOUT_MENU.map((item) => {
                                            const isSubActive = location.pathname === item.href;
                                            return (
                                                <button
                                                    key={item.labelKey}
                                                    onClick={() => handleNavClick(item.href)}
                                                    className={cn(
                                                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all",
                                                        isSubActive
                                                            ? "bg-sky-500/20 text-sky-400 font-bold border-l-2 border-sky-400 pl-3.5"
                                                            : "text-foreground hover:bg-sky-500/15 hover:text-sky-400"
                                                    )}
                                                >
                                                    <item.icon className="w-4 h-4 text-sky-400" />
                                                    <span>{t(item.labelKey)}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Asset for Sale */}
                        <button
                            onClick={() => handleNavClick('/used-machine')}
                            className={cn(
                                'px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 relative',
                                isAssetActive
                                    ? 'text-sky-400 bg-sky-500/20 shadow-sm shadow-sky-500/10 font-bold'
                                    : scrolled
                                    ? 'text-foreground/80 hover:text-sky-400 hover:bg-sky-500/10'
                                    : 'text-slate-100 hover:text-white hover:bg-white/15'
                            )}
                        >
                            {t('nav.assetForSale')}
                            {isAssetActive && (
                                <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                            )}
                        </button>
                    </nav>

                    {/* Right Tools & Switchers (Desktop only, xl+) */}
                    <div className="hidden xl:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Segmented Language Switcher [TH | EN] */}
                        <div
                            className={cn(
                                'flex items-center p-0.5 rounded-full border transition-all duration-200',
                                scrolled
                                    ? 'glass border-border bg-card/80'
                                    : 'bg-black/40 border-white/20 backdrop-blur-md'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setLang('th')}
                                className={cn(
                                    'px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200',
                                    lang === 'th'
                                        ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                                        : scrolled
                                            ? 'text-muted-foreground hover:text-foreground'
                                            : 'text-white/60 hover:text-white'
                                )}
                                title="ภาษาไทย"
                            >
                                TH
                            </button>
                            <button
                                type="button"
                                onClick={() => setLang('en')}
                                className={cn(
                                    'px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200',
                                    lang === 'en'
                                        ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                                        : scrolled
                                            ? 'text-muted-foreground hover:text-foreground'
                                            : 'text-white/60 hover:text-white'
                                )}
                                title="English"
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Trigger & Controls (Visible on < xl only) */}
                    <div className="flex items-center gap-2 xl:hidden">
                        <ThemeToggle />

                        {/* Mobile Segmented Language Switcher [TH | EN] */}
                        <div
                            className={cn(
                                'flex items-center p-0.5 rounded-full border transition-all duration-200',
                                scrolled
                                    ? 'glass border-border bg-card/80'
                                    : 'bg-black/40 border-white/20 backdrop-blur-md'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setLang('th')}
                                className={cn(
                                    'px-2 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200',
                                    lang === 'th'
                                        ? 'bg-sky-500 text-white shadow-sm'
                                        : scrolled
                                            ? 'text-muted-foreground hover:text-foreground'
                                            : 'text-white/60 hover:text-white'
                                )}
                                title="ภาษาไทย"
                            >
                                TH
                            </button>
                            <button
                                type="button"
                                onClick={() => setLang('en')}
                                className={cn(
                                    'px-2 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200',
                                    lang === 'en'
                                        ? 'bg-sky-500 text-white shadow-sm'
                                        : scrolled
                                            ? 'text-muted-foreground hover:text-foreground'
                                            : 'text-white/60 hover:text-white'
                                )}
                                title="English"
                            >
                                EN
                            </button>
                        </div>

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
                    'xl:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-2xl',
                    isOpen ? 'max-h-[85vh] overflow-y-auto py-4 shadow-2xl border-t border-border/80' : 'max-h-0 py-0 border-none pointer-events-none'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 space-y-2">
                    {/* Equipment Financing Accordion */}
                    <div>
                        <button
                            onClick={() => setMobileOpenMenu(mobileOpenMenu === 'equipment' ? null : 'equipment')}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                                isEquipmentActive
                                    ? "text-sky-400 bg-sky-500/15 font-bold"
                                    : "text-foreground hover:bg-sky-500/10"
                            )}
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
                            <div className="pl-3 pr-2 py-1 space-y-2">
                                {EQUIPMENT_CATEGORIES.map((cat) => (
                                    <div key={cat.id} className="border-l-2 border-sky-500/30 pl-3 py-1 space-y-1">
                                        <button
                                            onClick={() => setMobileOpenSubMenu(mobileOpenSubMenu === cat.id ? null : cat.id)}
                                            className="w-full flex items-center justify-between py-1 text-xs font-bold text-sky-400"
                                        >
                                            <div className="flex items-center gap-2">
                                                <cat.icon className="w-3.5 h-3.5" />
                                                <span>{t(cat.titleKey)}</span>
                                            </div>
                                            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', mobileOpenSubMenu === cat.id ? 'rotate-180' : '')} />
                                        </button>
                                        {(mobileOpenSubMenu === cat.id || !mobileOpenSubMenu) && (
                                            <div className="space-y-1 pt-1">
                                                {cat.items.map((item) => {
                                                    const isSubActive = location.pathname === item.href;
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => handleNavClick(item.href)}
                                                            className={cn(
                                                                "w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors text-left",
                                                                isSubActive
                                                                    ? "bg-sky-500/20 text-sky-400 font-bold"
                                                                    : "text-muted-foreground hover:text-sky-400 hover:bg-white/5"
                                                            )}
                                                        >
                                                            <item.icon className="w-3 h-3 text-sky-400 flex-shrink-0" />
                                                            <span className="truncate">{t(item.labelKey)}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Investor Relations */}
                    <button
                        onClick={() => handleNavClick('/investor-relations')}
                        className={cn(
                            'w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isInvestorActive
                                ? 'text-sky-400 bg-sky-500/15 font-bold'
                                : 'text-foreground hover:bg-sky-500/10'
                        )}
                    >
                        {t('nav.investorRelations')}
                    </button>

                    {/* Press Center Expandable Mobile Menu */}
                    <div>
                        <button
                            onClick={() => setMobileOpenMenu(mobileOpenMenu === 'press' ? null : 'press')}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                                isPressActive
                                    ? "text-sky-400 bg-sky-500/15 font-bold"
                                    : "text-foreground hover:bg-sky-500/10"
                            )}
                        >
                            <span>{t('nav.pressCenter')}</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileOpenMenu === 'press' && "rotate-180")} />
                        </button>
                        {mobileOpenMenu === 'press' && (
                            <div className="pl-4 pr-2 py-2 space-y-1 bg-sky-500/5 rounded-xl mt-1">
                                {PRESS_MENU.map((item) => {
                                    const isSubActive = location.pathname === item.href;
                                    return (
                                        <button
                                            key={item.labelKey}
                                            onClick={() => handleNavClick(item.href)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                                                isSubActive
                                                    ? "bg-sky-500/20 text-sky-400 font-bold"
                                                    : "text-foreground hover:bg-sky-500/15 hover:text-sky-400"
                                            )}
                                        >
                                            <item.icon className="w-3.5 h-3.5 text-sky-400" />
                                            <span>{t(item.labelKey)}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* About Us Expandable Mobile Menu */}
                    <div>
                        <button
                            onClick={() => setMobileOpenMenu(mobileOpenMenu === 'about' ? null : 'about')}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                                isAboutActive
                                    ? "text-sky-400 bg-sky-500/15 font-bold"
                                    : "text-foreground hover:bg-sky-500/10"
                            )}
                        >
                            <span>{t('nav.about')}</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileOpenMenu === 'about' && "rotate-180")} />
                        </button>
                        {mobileOpenMenu === 'about' && (
                            <div className="pl-4 pr-2 py-2 space-y-1 bg-sky-500/5 rounded-xl mt-1">
                                {ABOUT_MENU.map((item) => {
                                    const isSubActive = location.pathname === item.href;
                                    return (
                                        <button
                                            key={item.labelKey}
                                            onClick={() => handleNavClick(item.href)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                                                isSubActive
                                                    ? "bg-sky-500/20 text-sky-400 font-bold"
                                                    : "text-foreground hover:bg-sky-500/15 hover:text-sky-400"
                                            )}
                                        >
                                            <item.icon className="w-3.5 h-3.5 text-sky-400" />
                                            <span>{t(item.labelKey)}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Asset for Sale */}
                    <button
                        onClick={() => handleNavClick('/used-machine')}
                        className={cn(
                            'w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isAssetActive
                                ? 'text-sky-400 bg-sky-500/15 font-bold'
                                : 'text-foreground hover:bg-sky-500/10'
                        )}
                    >
                        {t('nav.assetForSale')}
                    </button>
                </div>
            </div>
        </header>
    );
}
