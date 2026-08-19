import React from 'react';
import logoCmyk from '@/assets/Logo_Agile Assets_CMYK.png';

interface AgileAssetsLogoProps {
    className?: string;
    variant?: 'full' | 'icon' | 'hero';
    textClassName?: string;
    showTagline?: boolean;
}

export const AgileAssetsLogo: React.FC<AgileAssetsLogoProps> = ({
    className = '',
    variant = 'full',
    textClassName = '',
    showTagline = true,
}) => {
    if (variant === 'icon') {
        return (
            <div className={`relative flex items-center justify-center ${className}`}>
                <img
                    src={logoCmyk}
                    alt="Agile Assets Logo"
                    className="w-full h-full object-contain drop-shadow-md"
                />
            </div>
        );
    }

    if (variant === 'hero') {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="relative mb-3 flex items-center justify-center">
                    <img
                        src={logoCmyk}
                        alt="Agile Assets Logo"
                        className="h-20 sm:h-24 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md font-sans">
                        Agile Assets
                    </span>
                </div>
            </div>
        );
    }

    // Default Full Logo (Navbar / Footer)
    return (
        <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center">
                <img
                    src={logoCmyk}
                    alt="Agile Assets"
                    className="max-h-full max-w-full object-contain drop-shadow-sm"
                />
            </div>
            <div className="flex flex-col text-left">
                <span className={`text-base sm:text-lg font-bold tracking-tight font-sans leading-tight ${textClassName || 'text-foreground'}`}>
                    Agile Assets
                </span>
                {showTagline && (
                    <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-extrabold text-sky-500 dark:text-sky-400 leading-none mt-0.5">
                        GROWTH • GOOD CAPITAL
                    </span>
                )}
            </div>
        </div>
    );
};
