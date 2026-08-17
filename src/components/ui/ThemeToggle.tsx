import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`relative flex h-8 w-[4.25rem] items-center rounded-full p-1 transition-all duration-[600ms] overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50 shadow-inner flex-shrink-0 ${
                isDark ? 'bg-[#0f172a] border border-sky-950' : 'bg-[#38bdf8] border border-sky-300'
            }`}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* --- Dark Mode Background (Stars & Moon Glow) --- */}
            <div
                className={`absolute inset-0 transition-all duration-[600ms] ease-in-out pointer-events-none ${
                    isDark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
                {/* 4-point star */}
                <svg
                    className="absolute top-[6px] left-[10px] w-2.5 h-2.5 text-white animate-[pulse_3s_ease-in-out_infinite]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2l1.63 5.48a2 2 0 001.4 1.4L20.5 10.5l-5.48 1.63a2 2 0 00-1.4 1.4L12 19l-1.63-5.48a2 2 0 00-1.4-1.4L3.5 10.5l5.48-1.63a2 2 0 001.4-1.4z" />
                </svg>
                {/* Tiny stars */}
                <div className="absolute top-[18px] left-[8px] w-[2px] h-[2px] bg-white rounded-full animate-[ping_4s_ease-in-out_infinite]" />
                <div className="absolute top-[14px] left-[20px] w-[2px] h-[2px] bg-white rounded-full opacity-60" />
                <div className="absolute top-[7px] left-[24px] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-80 animate-[pulse_2s_ease-in-out_infinite]" />
                <div className="absolute top-[20px] left-[16px] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-70" />

                {/* Subtle moon glow */}
                <div
                    className={`absolute top-[-10px] right-[-5px] w-12 h-12 bg-sky-400/20 rounded-full blur-md transition-transform duration-[600ms] ${
                        isDark ? 'scale-100' : 'scale-50'
                    }`}
                />
            </div>

            {/* --- Light Mode Background (Clouds) --- */}
            <div
                className={`absolute inset-0 transition-all duration-[600ms] ease-in-out pointer-events-none ${
                    isDark ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
                {/* Cloud shapes */}
                <div className="absolute top-[7px] right-[8px] w-4 h-3.5 bg-white rounded-full opacity-100" />
                <div className="absolute top-[11px] right-[4px] w-5 h-2.5 bg-white rounded-full opacity-100" />
                <div className="absolute top-[13px] right-[14px] w-4 h-2.5 bg-white rounded-full opacity-100" />
                <div className="absolute top-[8px] right-[16px] w-3.5 h-2.5 bg-white rounded-full opacity-90" />
            </div>

            {/* --- Thumb Tracker --- */}
            <div
                className={`transform transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] relative flex items-center justify-center rounded-full shadow-md w-6 h-6 z-10 ${
                    isDark
                        ? 'translate-x-[2.25rem] bg-transparent rotate-[360deg]'
                        : 'translate-x-0 bg-[#fbbf24] rotate-0'
                }`}
            >
                {/* Sun rays (Light mode) */}
                <div
                    className={`absolute inset-[-3px] transition-all duration-[600ms] ${
                        isDark ? 'opacity-0 scale-50 rotate-[-90deg]' : 'opacity-100 scale-100 rotate-0'
                    }`}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#fbbf24] fill-[#fde047]">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                        />
                    </svg>
                </div>

                {/* Moon (Dark mode) — perfectly aligned without overflowing */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-[600ms] ${
                        isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-[90deg]'
                    }`}
                >
                    <svg
                        className="w-5 h-5 text-[#f8fafc] fill-[#f8fafc] drop-shadow-[0_0_4px_rgba(56,189,248,0.7)]"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                </div>
            </div>
        </button>
    );
}
