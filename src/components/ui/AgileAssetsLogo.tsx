import React from 'react';

interface AgileAssetsLogoProps {
    className?: string;
    variant?: 'full' | 'icon' | 'hero';
    textClassName?: string;
}

export const AgileAssetsLogo: React.FC<AgileAssetsLogoProps> = ({
    className = '',
    variant = 'full',
    textClassName = '',
}) => {
    if (variant === 'icon') {
        return (
            <div className={`relative flex items-center justify-center ${className}`}>
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-md"
                >
                    <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0284c7" />
                            <stop offset="50%" stopColor="#0369a1" />
                            <stop offset="100%" stopColor="#0c4a6e" />
                        </linearGradient>
                        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#7dd3fc" />
                        </linearGradient>
                    </defs>
                    {/* Outer Shield / Geometric Fold */}
                    <path
                        d="M20 18 L50 8 L80 18 L80 62 C80 78 50 92 50 92 C50 92 20 78 20 62 Z"
                        fill="url(#shieldGrad)"
                        stroke="rgba(56, 189, 248, 0.4)"
                        strokeWidth="2"
                    />
                    {/* Inner Origami Fold Facet */}
                    <path
                        d="M50 8 L80 18 L80 62 C80 78 50 92 50 92 L50 8 Z"
                        fill="#0c4a6e"
                        fillOpacity="0.5"
                    />
                    {/* AA Monogram + Scales Symbol */}
                    <text
                        x="33"
                        y="56"
                        fill="#ffffff"
                        fontSize="26"
                        fontWeight="800"
                        fontFamily="Prompt, sans-serif"
                        letterSpacing="-1"
                    >
                        A
                    </text>
                    <text
                        x="49"
                        y="56"
                        fill="#7dd3fc"
                        fontSize="26"
                        fontWeight="800"
                        fontFamily="Prompt, sans-serif"
                        letterSpacing="-1"
                    >
                        A
                    </text>
                    {/* Scales / Horizon Beam */}
                    <line x1="32" y1="64" x2="68" y2="64" stroke="url(#goldAccent)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="34" cy="70" r="3.5" fill="#38bdf8" />
                    <circle cx="66" cy="70" r="3.5" fill="#38bdf8" />
                    <path d="M50 64 L50 74" stroke="#7dd3fc" strokeWidth="2" />
                </svg>
            </div>
        );
    }

    if (variant === 'hero') {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center">
                    {/* Outer Glow Halo */}
                    <div className="absolute inset-0 bg-sky-400/25 rounded-2xl blur-xl animate-pulse-glow" />
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 drop-shadow-2xl"
                    >
                        <defs>
                            <linearGradient id="heroShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0284c7" />
                                <stop offset="50%" stopColor="#0369a1" />
                                <stop offset="100%" stopColor="#082f49" />
                            </linearGradient>
                            <linearGradient id="heroCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#bae6fd" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M18 16 L50 6 L82 16 L82 64 C82 82 50 94 50 94 C50 94 18 82 18 64 Z"
                            fill="url(#heroShieldGrad)"
                            stroke="rgba(125, 211, 252, 0.6)"
                            strokeWidth="2.5"
                        />
                        <path
                            d="M50 6 L82 16 L82 64 C82 82 50 94 50 94 L50 6 Z"
                            fill="#082f49"
                            fillOpacity="0.55"
                        />
                        <text
                            x="31"
                            y="55"
                            fill="#ffffff"
                            fontSize="28"
                            fontWeight="800"
                            fontFamily="Prompt, sans-serif"
                        >
                            A
                        </text>
                        <text
                            x="49"
                            y="55"
                            fill="#7dd3fc"
                            fontSize="28"
                            fontWeight="800"
                            fontFamily="Prompt, sans-serif"
                        >
                            A
                        </text>
                        <line x1="30" y1="64" x2="70" y2="64" stroke="url(#heroCyanGrad)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="33" cy="71" r="4" fill="#38bdf8" />
                        <circle cx="67" cy="71" r="4" fill="#38bdf8" />
                        <path d="M50 64 L50 76" stroke="#bae6fd" strokeWidth="2.5" />
                    </svg>
                </div>
                <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
                        Agile Assets
                    </span>
                </div>
            </div>
        );
    }

    // Default Full Navbar Logo
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="w-9 h-9 flex-shrink-0">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-sm"
                >
                    <defs>
                        <linearGradient id="navShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0284c7" />
                            <stop offset="50%" stopColor="#0369a1" />
                            <stop offset="100%" stopColor="#0c4a6e" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M20 18 L50 8 L80 18 L80 62 C80 78 50 92 50 92 C50 92 20 78 20 62 Z"
                        fill="url(#navShieldGrad)"
                        stroke="rgba(56, 189, 248, 0.4)"
                        strokeWidth="2"
                    />
                    <path
                        d="M50 8 L80 18 L80 62 C80 78 50 92 50 92 L50 8 Z"
                        fill="#0c4a6e"
                        fillOpacity="0.45"
                    />
                    <text
                        x="33"
                        y="56"
                        fill="#ffffff"
                        fontSize="25"
                        fontWeight="800"
                        fontFamily="Prompt, sans-serif"
                    >
                        A
                    </text>
                    <text
                        x="49"
                        y="56"
                        fill="#7dd3fc"
                        fontSize="25"
                        fontWeight="800"
                        fontFamily="Prompt, sans-serif"
                    >
                        A
                    </text>
                    <line x1="32" y1="64" x2="68" y2="64" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="34" cy="70" r="3.5" fill="#38bdf8" />
                    <circle cx="66" cy="70" r="3.5" fill="#38bdf8" />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-tight font-sans leading-none ${textClassName || 'text-foreground'}`}>
                    Agile Assets
                </span>
                <span className="text-[9px] tracking-widest uppercase font-bold text-sky-400 mt-0.5">
                    Growth • Good Capital
                </span>
            </div>
        </div>
    );
};
