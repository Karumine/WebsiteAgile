import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`relative flex h-8 w-[4.5rem] items-center rounded-full p-1 transition-all duration-[800ms] overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${isDark ? 'bg-[#1e293b]' : 'bg-[#38bdf8]'
                }`}
            aria-label="Toggle theme"
        >
            {/* --- Dark Mode Background (Stars & Moon Glow) --- */}
            <div
                className={`absolute inset-0 transition-all duration-[800ms] ease-in-out pointer-events-none ${isDark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
            >
                {/* 4-point star */}
                <svg className="absolute top-[6px] left-[14px] w-2.5 h-2.5 text-white animate-[pulse_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.63 5.48a2 2 0 001.4 1.4L20.5 10.5l-5.48 1.63a2 2 0 00-1.4 1.4L12 19l-1.63-5.48a2 2 0 00-1.4-1.4L3.5 10.5l5.48-1.63a2 2 0 001.4-1.4z" />
                </svg>
                {/* Tiny stars  */}
                <div className="absolute top-[18px] left-[10px] w-[2px] h-[2px] bg-white rounded-full animate-[ping_4s_ease-in-out_infinite]"></div>
                <div className="absolute top-[14px] left-[26px] w-[2px] h-[2px] bg-white rounded-full opacity-60"></div>
                <div className="absolute top-[8px] left-[29px] w-[1px] h-[1px] bg-white rounded-full opacity-80 animate-[pulse_2s_ease-in-out_infinite]"></div>
                <div className="absolute top-[22px] left-[20px] w-[2px] h-[2px] bg-white rounded-full opacity-70"></div>

                {/* Subtle moon glow */}
                <div className={`absolute top-[-10px] right-[-10px] w-14 h-14 bg-blue-400/20 rounded-full blur-md transition-transform duration-[800ms] ${isDark ? 'scale-100' : 'scale-50'}`}></div>
            </div>

            {/* --- Light Mode Background (Clouds) --- */}
            <div
                className={`absolute inset-0 transition-all duration-[800ms] ease-in-out pointer-events-none ${isDark ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
            >
                {/* Cloud shapes using multiple divs */}
                <div className="absolute top-[8px] right-[10px] w-5 h-4 bg-white rounded-full opacity-100"></div>
                <div className="absolute top-[12px] right-[4px] w-6 h-3 bg-white rounded-full opacity-100"></div>
                <div className="absolute top-[14px] right-[18px] w-5 h-3 bg-white rounded-full opacity-100"></div>
                <div className="absolute top-[9px] right-[20px] w-4 h-3 bg-white rounded-full opacity-90"></div>
            </div>

            {/* --- Thumb Tracker --- */}
            <div
                className={`transform transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] relative flex items-center justify-center rounded-full shadow-md w-[1.375rem] h-[1.375rem] z-10 ${isDark ? 'translate-x-[2.625rem] bg-transparent rotate-[360deg]' : 'translate-x-[2px] bg-[#fbbf24] rotate-0'
                    }`}
            >
                {/* Sun rays (Light mode) */}
                <div className={`absolute inset-[-4px] transition-all duration-[800ms] ${isDark ? 'opacity-0 scale-50 rotate-[-90deg]' : 'opacity-100 scale-100 rotate-0'}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#fbbf24] fill-[#fde047]">
                        <circle cx="12" cy="12" r="5" />
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                </div>

                {/* Moon (Dark mode) */}
                <div className={`absolute inset-[-2px] flex items-center justify-center transition-all duration-[800ms] ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-[90deg]'}`}>
                    <svg className="w-[1.125rem] h-[1.125rem] text-[#f8fafc] fill-[#f8fafc] drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </div>
            </div>
        </button>
    );
}
