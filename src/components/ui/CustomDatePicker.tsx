import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CustomDatePickerProps {
    value: string; // 'YYYY-MM-DD'
    onChange: (dateStr: string) => void;
    label?: string;
    placeholder?: string;
}

const THAI_MONTHS = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตลุาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const ENG_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function CustomDatePicker({ value, onChange, label, placeholder }: CustomDatePickerProps) {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Current displayed month & year in calendar popup
    const initialDate = value ? new Date(value) : new Date();
    const [viewDate, setViewDate] = useState<Date>(isNaN(initialDate.getTime()) ? new Date() : initialDate);

    // Sync viewDate when value changes
    useEffect(() => {
        if (value) {
            const d = new Date(value);
            if (!isNaN(d.getTime())) setViewDate(d);
        }
    }, [value]);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    const prevMonth = () => {
        setViewDate(new Date(viewYear, viewMonth - 1, 1));
    };

    const nextMonth = () => {
        setViewDate(new Date(viewYear, viewMonth + 1, 1));
    };

    // Calculate days for month grid
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const handleSelectDay = (day: number) => {
        const selectedMonth = String(viewMonth + 1).padStart(2, '0');
        const selectedDay = String(day).padStart(2, '0');
        const formatted = `${viewYear}-${selectedMonth}-${selectedDay}`;
        onChange(formatted);
        setIsOpen(false);
    };

    const selectToday = () => {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const formatted = `${y}-${m}-${d}`;
        onChange(formatted);
        setViewDate(today);
        setIsOpen(false);
    };

    // Format display string
    const formatDisplay = (dateStr: string) => {
        if (!dateStr) return placeholder || (lang === 'th' ? 'เลือกวันที่...' : 'Select date...');
        const [y, m, d] = dateStr.split('-').map(Number);
        if (!y || !m || !d) return dateStr;

        if (lang === 'th') {
            const monthTh = THAI_MONTHS[m - 1] || '';
            const yearTh = y + 543;
            return `${d} ${monthTh} ${yearTh}`;
        } else {
            const monthEn = ENG_MONTHS[m - 1] || '';
            return `${monthEn} ${d}, ${y}`;
        }
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const [y, m, d] = value.split('-').map(Number);
        return y === viewYear && m === viewMonth + 1 && d === day;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>}

            {/* Trigger Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-between px-3.5 py-2 rounded-xl bg-card hover:bg-accent/50 border border-border hover:border-primary/50 text-foreground text-xs font-medium cursor-pointer transition-all shadow-sm select-none min-h-[42px]"
            >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <CalendarIcon className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors flex-shrink-0" />
                    <span className={`truncate ${value ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                        {formatDisplay(value)}
                    </span>
                </div>
                {!value && (
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20 shrink-0 ml-2">
                        YYYY-MM-DD
                    </span>
                )}
            </div>

            {/* Calendar Popover Modal */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-border dark:border-sky-500/30 shadow-2xl shadow-slate-400/20 dark:shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
                    {/* Popover Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                        <div className="flex items-center gap-1 font-bold text-sm text-foreground">
                            <span>{lang === 'th' ? THAI_MONTHS[viewMonth] : ENG_MONTHS[viewMonth]}</span>
                            <span className="text-primary dark:text-sky-400">{lang === 'th' ? viewYear + 543 : viewYear}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={prevMonth}
                                className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={nextMonth}
                                className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors ml-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {(lang === 'th' ? WEEKDAYS_TH : WEEKDAYS_EN).map((day, idx) => (
                            <span key={idx} className="text-[11px] font-bold text-muted-foreground py-1">
                                {day}
                            </span>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty padding cells for first week */}
                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                            <div key={`empty-${idx}`} className="h-8" />
                        ))}

                        {/* Month Days */}
                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const active = isSelected(dayNum);
                            const current = isToday(dayNum);

                            return (
                                <button
                                    key={dayNum}
                                    type="button"
                                    onClick={() => handleSelectDay(dayNum)}
                                    className={`h-8 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center relative ${
                                        active
                                            ? 'bg-gradient-to-br from-sky-400 to-blue-600 text-white font-bold shadow-md shadow-sky-500/40 scale-105'
                                            : current
                                            ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
                                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    <span>{dayNum}</span>
                                    {current && !active && (
                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Footer Action */}
                    <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs">
                        <button
                            type="button"
                            onClick={selectToday}
                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold transition-colors"
                        >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lang === 'th' ? 'เลือกวันนี้' : 'Select Today'}</span>
                        </button>

                        <label className="relative cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-[11px] underline">
                            <span>{lang === 'th' ? 'เลือกจากปฏิทินเครื่อง' : 'Native Picker'}</span>
                            <input
                                type="date"
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setIsOpen(false);
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
