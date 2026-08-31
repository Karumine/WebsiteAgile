import { useState, useEffect, useRef } from 'react';
import { ChevronUp, MessageSquare } from 'lucide-react';

export function QuickContactWidget() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const rafRef = useRef<number>(0);

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToContact = () => {
        const contact = document.querySelector('#contact');
        contact?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
            {/* Quick Contact Button */}
            <button
                onClick={scrollToContact}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-sky-500/35 hover:scale-110 active:scale-95 transition-all duration-300 glow-cyan group"
                title="Quick Financing Consultation"
            >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Scroll To Top */}
            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full glass border border-sky-400/30 text-foreground flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-5 h-5 text-sky-400" />
                </button>
            )}
        </div>
    );
}
