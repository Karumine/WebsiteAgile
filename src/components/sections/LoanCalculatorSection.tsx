import { useState, useId } from 'react';
import { Calculator, DollarSign, Calendar, TrendingUp, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Cached formatter instance (avoids re-creation on every call)
const thCurrencyFormatter = new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 });

export function LoanCalculatorSection() {
    const { t, lang } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [amount, setAmount] = useState<number>(3000000);
    const [months, setMonths] = useState<number>(48);
    const [rate, setRate] = useState<number>(4.75);

    const amountId = useId();
    const monthsId = useId();
    const rateId = useId();

    // Standard commercial equipment flat-rate or simple amortization calculation
    const totalInterest = (amount * (rate / 100) * (months / 12));
    const totalPayment = amount + totalInterest;
    const monthlyPayment = Math.round(totalPayment / months);

    const formatCurrency = (val: number) => {
        return thCurrencyFormatter.format(val);
    };

    const presetAmounts = [1000000, 3000000, 5000000, 10000000, 20000000];
    const tenureOptions = [12, 24, 36, 48, 60, 72, 84];

    const handleApplyCalculation = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Pre-fill amount
            const amountInput = document.querySelector('input[name="amount"]') as HTMLInputElement;
            if (amountInput) {
                amountInput.value = formatCurrency(amount);
            }
            // Pre-fill message
            const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
            if (messageInput) {
                messageInput.value = `${lang === 'th' ? 'ต้องการขอสินเชื่อวงเงินประมาณ' : 'Requesting financing of approx'} ${formatCurrency(amount)} THB, ${months} ${lang === 'th' ? 'เดือน' : 'months'} (${lang === 'th' ? 'ประมาณการค่างวด' : 'est. monthly payment'}: ฿${formatCurrency(monthlyPayment)}/mo).`;
            }
        }
    };

    return (
        <section id="calculator" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            {/* Ambient Lighting */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <Calculator className="w-3.5 h-3.5" />
                            <span>{t('calc.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('calc.title')}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('calc.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Calculator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left: Interactive Input Controls */}
                    <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-7 flex flex-col h-full">
                        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-500/20 flex flex-col justify-between space-y-8 h-full">
                        {/* 1. Loan Amount Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label htmlFor={amountId} className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-sky-400" />
                                    {t('calc.loanAmount')}
                                </label>
                                <span className="text-xl sm:text-2xl font-extrabold text-sky-400 font-sans">
                                    ฿{formatCurrency(amount)}
                                </span>
                            </div>

                            <input
                                id={amountId}
                                type="range"
                                min={500000}
                                max={50000000}
                                step={500000}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-sky-400"
                            />

                            {/* Preset Buttons */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {presetAmounts.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setAmount(p)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                            amount === p
                                                ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30'
                                                : 'bg-card border-border text-foreground/80 hover:text-foreground hover:bg-sky-500/10'
                                        }`}
                                    >
                                        ฿{p >= 1000000 ? `${p / 1000000}M` : `${p / 1000}k`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Tenure (Months) Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label htmlFor={monthsId} className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-sky-400" />
                                    {t('calc.tenure')}
                                </label>
                                <span className="text-xl sm:text-2xl font-extrabold text-sky-400 font-sans">
                                    {months} {t('calc.months')} ({Math.round((months / 12) * 10) / 10} {lang === 'th' ? 'ปี' : 'yrs'})
                                </span>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                {tenureOptions.map((m) => (
                                    <button
                                        key={m}
                                        id={m === months ? monthsId : undefined}
                                        onClick={() => setMonths(m)}
                                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                                            months === m
                                                ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30 scale-105'
                                                : 'bg-card border-border text-foreground/80 hover:text-foreground hover:bg-sky-500/10'
                                        }`}
                                    >
                                        {m} {lang === 'th' ? 'ด.' : 'Mo'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Interest Rate Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label htmlFor={rateId} className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-sky-400" />
                                    {t('calc.interestRate')}
                                </label>
                                <span className="text-lg sm:text-xl font-bold text-sky-400 font-sans">
                                    {rate.toFixed(2)}% {t('rates.apr')}
                                </span>
                            </div>

                            <input
                                id={rateId}
                                type="range"
                                min={3.5}
                                max={12.0}
                                step={0.25}
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-sky-400"
                            />
                            <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-medium">
                                <span>3.50% (Tier 1 Preferred)</span>
                                <span>6.00% (Standard)</span>
                                <span>12.00%</span>
                            </div>
                        </div>
                    </div>
                    </ScrollReveal>

                    {/* Right: Real-Time Calculation Result Card */}
                    <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-5 flex flex-col h-full">
                        <div
                            className={`rounded-3xl p-6 sm:p-10 border backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full ${
                                isDark
                                    ? 'bg-gradient-to-br from-sky-900/40 via-slate-900/90 to-black/90 border-sky-400/30 shadow-2xl'
                                    : 'bg-gradient-to-br from-sky-50/80 via-white to-sky-100/60 border-sky-200 shadow-2xl shadow-sky-950/10'
                            }`}
                        >
                            {/* Glow Corner */}
                            <div
                                className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
                                    isDark ? 'bg-sky-400/15' : 'bg-sky-400/10'
                                }`}
                            />

                            <div>
                                <div
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 border ${
                                        isDark
                                            ? 'bg-sky-400/15 border-sky-400/30 text-sky-300'
                                            : 'bg-sky-500/10 border-sky-300/80 text-sky-700'
                                    }`}
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Agile Assets Transparent Rates</span>
                                </div>

                                <p
                                    className={`text-xs uppercase tracking-widest font-bold mb-2 ${
                                        isDark ? 'text-slate-300' : 'text-slate-500'
                                    }`}
                                >
                                    {t('calc.monthlyPayment')}
                                </p>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span
                                        className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-sans ${
                                            isDark ? 'text-white text-gradient' : 'text-sky-600'
                                        }`}
                                    >
                                        ฿{formatCurrency(monthlyPayment)}
                                    </span>
                                    <span
                                        className={`text-sm font-semibold ${
                                            isDark ? 'text-sky-300' : 'text-sky-700'
                                        }`}
                                    >
                                        / {lang === 'th' ? 'เดือน' : 'month'}
                                    </span>
                                </div>

                                {/* Breakdown Summary */}
                                <div
                                    className={`space-y-4 pt-6 border-t mb-8 ${
                                        isDark ? 'border-white/10' : 'border-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                                            {t('calc.loanAmount')}
                                        </span>
                                        <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            ฿{formatCurrency(amount)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                                            {t('calc.totalInterest')}
                                        </span>
                                        <span className={`font-bold ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                                            ฿{formatCurrency(Math.round(totalInterest))}
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center justify-between text-xs sm:text-sm pt-3 border-t ${
                                            isDark ? 'border-white/10' : 'border-slate-200'
                                        }`}
                                    >
                                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {t('calc.totalPayment')}
                                        </span>
                                        <span
                                            className={`font-extrabold text-base ${
                                                isDark ? 'text-white' : 'text-slate-900'
                                            }`}
                                        >
                                            ฿{formatCurrency(Math.round(totalPayment))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Apply Trigger */}
                            <div>
                                <button
                                    onClick={handleApplyCalculation}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 glow-cyan"
                                >
                                    <CheckCircle2 className="w-4.5 h-4.5" />
                                    <span>{t('calc.applyNow')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <p
                                    className={`text-[11px] leading-relaxed mt-4 text-center ${
                                        isDark ? 'text-slate-400/80' : 'text-slate-500'
                                    }`}
                                >
                                    {t('calc.disclaimer')}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
