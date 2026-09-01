import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const COOKIE_CONSENT_KEY = 'agile_assets_cookie_consent';

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            // Small delay for smooth entry
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        setVisible(false);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const handleOpenPolicy = () => {
        navigate('/cookie-policy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none animate-slide-up sm:pr-24 lg:pr-28">
            <div className="pointer-events-auto max-w-6xl mx-auto rounded-2xl border border-slate-200/80 dark:border-sky-500/30 bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-white shadow-2xl p-4 sm:p-5 backdrop-blur-2xl">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Cookie Description */}
                    <div className="flex items-start gap-3 flex-1">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-600 dark:text-sky-400 mt-0.5">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                            {t('cookie.text')}{' '}
                            <button
                                onClick={handleOpenPolicy}
                                className="text-sky-600 dark:text-sky-400 underline hover:text-sky-700 dark:hover:text-sky-300 font-bold transition-colors inline ml-1 cursor-pointer"
                            >
                                {t('cookie.privacyLink')}
                            </button>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 transition-all duration-200 hover:scale-105"
                        >
                            {t('cookie.accept')}
                        </button>

                        <button
                            onClick={handleDecline}
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-all duration-200"
                        >
                            {t('cookie.decline')}
                        </button>

                        <button
                            onClick={handleOpenPolicy}
                            className="px-3.5 py-2 rounded-xl text-sky-600 dark:text-sky-300 hover:text-sky-800 dark:hover:text-white text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            {t('cookie.readPolicy')}
                        </button>

                        <button
                            onClick={handleClose}
                            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ml-1"
                            aria-label="Close Cookie Notice"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
