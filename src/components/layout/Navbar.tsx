import { useState } from 'react';
import { Menu, X, TrendingUp, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
    { labelKey: 'nav.home', href: '#home' },
    { labelKey: 'nav.rates', href: '#rates' },
    { labelKey: 'nav.news', href: '#news' },
    { labelKey: 'nav.about', href: '#about' },
    { labelKey: 'nav.contact', href: '#contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleLang = () => {
        setLang(lang === 'th' ? 'en' : 'th');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gradient">Agile Assets</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                            >
                                {t(link.labelKey)}
                            </button>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                        >
                            <Globe className="w-3.5 h-3.5 text-gold" />
                            <span className={lang === 'th' ? 'text-gold' : ''}>TH</span>
                            <span className="text-border">/</span>
                            <span className={lang === 'en' ? 'text-gold' : ''}>EN</span>
                        </button>
                    </div>

                    {/* Mobile: Language + Toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleLang}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                        >
                            <Globe className="w-3 h-3 text-gold" />
                            <span className={lang === 'th' ? 'text-gold' : ''}>TH</span>
                            <span className="text-border">/</span>
                            <span className={lang === 'en' ? 'text-gold' : ''}>EN</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={cn(
                    'md:hidden overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-64 border-t border-border' : 'max-h-0'
                )}
            >
                <div className="px-4 py-2 space-y-1 glass">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {t(link.labelKey)}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
