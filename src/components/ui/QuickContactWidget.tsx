import { useState, useEffect, useRef } from 'react';
import { ChevronUp, MessageCircle, X, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ─── Official Brand Icons ───
function LineIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.627.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.066.495.227l2.482 3.372V8.108c0-.345.282-.63.629-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.285.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
    );
}

function MessengerIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.302 2.247.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.192 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
        </svg>
    );
}

export function QuickContactWidget() {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    // Scroll listener for Top button
    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const isOver = window.scrollY > 400;
                setShowTopBtn(prev => (prev !== isOver ? isOver : prev));
                rafRef.current = 0;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const contactChannels = [
        {
            id: 'phone-office',
            title: lang === 'th' ? 'โทร 02-000-9392 (เบอร์บริษัท)' : 'Call 02-000-9392 (Office)',
            subtitle: '02-000-9392',
            href: 'tel:020009392',
            bgColor: 'bg-[#00D084] hover:bg-[#00B974]',
            shadowColor: 'shadow-[#00D084]/40',
            icon: <Phone className="w-6 h-6 text-white fill-white" />,
            delayClass: 'delay-150',
            translateClass: isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-12 opacity-0 scale-50 pointer-events-none',
        },
        {
            id: 'phone-oh',
            title: lang === 'th' ? 'โทร 098-283-7700 (คุณโอ๋)' : 'Call 098-283-7700 (Khun Oh)',
            subtitle: '098-283-7700',
            href: 'tel:0982837700',
            bgColor: 'bg-[#00D084] hover:bg-[#00B974]',
            shadowColor: 'shadow-[#00D084]/40',
            icon: <Phone className="w-6 h-6 text-white fill-white" />,
            delayClass: 'delay-100',
            translateClass: isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-9 opacity-0 scale-50 pointer-events-none',
        },
        {
            id: 'line',
            title: lang === 'th' ? 'ติดต่อผ่าน LINE Official' : 'Chat on LINE Official',
            subtitle: 'lin.ee/Pv7qZo0',
            href: 'https://lin.ee/Pv7qZo0',
            bgColor: 'bg-[#06C755] hover:bg-[#05b34c]',
            shadowColor: 'shadow-[#06C755]/40',
            icon: <LineIcon className="w-6 h-6 text-white" />,
            delayClass: 'delay-75',
            translateClass: isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-6 opacity-0 scale-50 pointer-events-none',
        },
        {
            id: 'messenger',
            title: lang === 'th' ? 'แชทผ่าน Facebook Messenger' : 'Chat on Facebook Messenger',
            subtitle: 'm.me/714238518447007',
            href: 'https://m.me/714238518447007',
            bgColor: 'bg-[#0084FF] hover:bg-[#0074e0]',
            shadowColor: 'shadow-[#0084FF]/40',
            icon: <MessengerIcon className="w-6 h-6 text-white" />,
            delayClass: 'delay-0',
            translateClass: isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-3 opacity-0 scale-50 pointer-events-none',
        },
    ];

    return (
        <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
            {/* Scroll To Top Button (Floats subtly above or beside) */}
            {showTopBtn && !isOpen && (
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full glass border border-sky-400/30 text-foreground flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-fade-in mb-1"
                    aria-label="Scroll to top"
                    title={lang === 'th' ? 'เลื่อนขึ้นด้านบน' : 'Scroll to top'}
                >
                    <ChevronUp className="w-5 h-5 text-sky-400" />
                </button>
            )}

            {/* ─── Pop-up Action Channel Buttons ─── */}
            <div className="flex flex-col items-end gap-3">
                {contactChannels.map((channel) => (
                    <div
                        key={channel.id}
                        className={`group relative flex items-center gap-3 transition-all duration-300 ease-out ${channel.delayClass} ${channel.translateClass}`}
                    >
                        {/* Hover Tooltip Label */}
                        <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/95 text-white text-xs font-medium whitespace-nowrap shadow-xl border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
                            {channel.title}
                        </span>

                        {/* Circular Action Button */}
                        <a
                            href={channel.href}
                            target={channel.href.startsWith('http') ? '_blank' : undefined}
                            rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full ${channel.bgColor} flex items-center justify-center shadow-xl ${channel.shadowColor} hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer`}
                            aria-label={channel.title}
                            title={channel.title}
                        >
                            {channel.icon}
                        </a>
                    </div>
                ))}
            </div>

            {/* ─── Main Toggle Button ─── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                    isOpen
                        ? 'bg-[#9f7aea] hover:bg-[#8b5cf6] text-white shadow-purple-500/40 rotate-90'
                        : 'bg-gradient-to-tr from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/40 glow-cyan rotate-0'
                }`}
                aria-label={isOpen ? 'Close contact menu' : 'Open contact channels'}
                title={isOpen ? (lang === 'th' ? 'ปิดเมนูติดต่อ' : 'Close') : (lang === 'th' ? 'ติดต่อเรา' : 'Contact Us')}
            >
                {/* Ping animation ring when closed */}
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-400 border-2 border-white"></span>
                    </span>
                )}

                {isOpen ? (
                    <X className="w-7 h-7 text-white stroke-[2.5]" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </button>
        </div>
    );
}

