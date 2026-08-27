import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown, Check, Tag } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
    badgeColor?: string;
    icon?: ReactNode;
}

interface CustomSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (val: string) => void;
    label?: string;
    placeholder?: string;
}

export function CustomSelect({ options, value, onChange, label, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>}

            {/* Select Trigger Box */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-between px-3.5 py-2 rounded-xl bg-card hover:bg-accent/50 border border-border hover:border-primary/50 text-foreground text-xs font-medium cursor-pointer transition-all shadow-sm select-none min-h-[42px]"
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <Tag className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors flex-shrink-0" />
                    {selectedOption?.badgeColor ? (
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide truncate ${selectedOption.badgeColor}`}>
                            {selectedOption.label}
                        </span>
                    ) : (
                        <span className="truncate font-semibold text-foreground">
                            {selectedOption ? selectedOption.label : placeholder || 'Select option'}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </div>
            </div>

            {/* Dropdown Menu Popover */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 w-full p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border dark:border-sky-500/30 shadow-2xl shadow-slate-400/20 dark:shadow-black/80 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="max-h-60 overflow-y-auto space-y-1 p-0.5">
                        {options.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                                        isSelected
                                            ? 'bg-primary/10 text-primary border border-primary/30 shadow-sm'
                                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span>{opt.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {opt.badgeColor && (
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${opt.badgeColor}`}>
                                                {opt.value}
                                            </span>
                                        )}
                                        {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
