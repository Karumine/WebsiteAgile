import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import { useSections } from '@/lib/pageSections';
import { calculatorSections } from '@/data/pageSections/calculator';

export function CalculatorPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('calculator', DEFAULT_PAGE_CONTENTS['calculator']);
    const section = useSections(content, calculatorSections);
    const calc = section('calculator');

    // Form state
    const [machinePrice, setMachinePrice] = useState<string>('5000000');
    const [interestType, setInterestType] = useState<'flat' | 'effective'>('flat');
    const [downPaymentRate, setDownPaymentRate] = useState<number>(0);
    const [installmentPeriod, setInstallmentPeriod] = useState<number>(15);
    const [interestRate, setInterestRate] = useState<string>('8.90');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Loan figures are derived directly from the inputs
    const { loanPrincipal, monthlyPayment, totalInterest } = useMemo(() => {
        const rawPrice = parseFloat(machinePrice.replace(/,/g, '')) || 0;
        const principal = rawPrice * (1 - downPaymentRate);
        const months = installmentPeriod;
        const years = months / 12;
        const rate = parseFloat(interestRate) || 0;
        const format = (n: number) => n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (principal <= 0 || months <= 0 || rate <= 0) {
            return { loanPrincipal: principal, monthlyPayment: '', totalInterest: 0 };
        }

        if (interestType === 'flat') {
            const interest = principal * (rate / 100) * years;
            return { loanPrincipal: principal, monthlyPayment: format((principal + interest) / months), totalInterest: interest };
        }

        const monthlyRate = rate / 100 / 12;
        const monthly = (monthlyRate * principal) / (1 - Math.pow(1 + monthlyRate, -months));
        const interest = monthly * months - principal;
        return { loanPrincipal: principal, monthlyPayment: format(monthly), totalInterest: interest > 0 ? interest : 0 };
    }, [machinePrice, interestType, downPaymentRate, installmentPeriod, interestRate]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value === '') {
            setMachinePrice('');
            return;
        }
        const num = parseInt(value, 10);
        setMachinePrice(num.toLocaleString('en-US'));
    };

    const handleReset = () => {
        setMachinePrice('');
        setInterestType('flat');
        setDownPaymentRate(0);
        setInstallmentPeriod(15);
        setInterestRate('8.90');
        setIsSubmitted(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const pageTitle = content.metaTitle || (lang === 'th'
        ? 'คำนวณสินเชื่อ (Financing Calculator) | Agile Assets'
        : 'Financing Calculator | Agile Assets - Industrial Machinery Financing');
    const pageDescription = content.metaDescription || (lang === 'th'
        ? 'คำนวณสินเชื่อออนไลน์ รู้ค่างวด ดอกเบี้ย และวงเงินได้ทันที ใช้งานง่าย ช่วยวางแผนการเงินโรงงานได้อย่างแม่นยำ'
        : 'Calculate your industrial machinery loan installments and effective interest rates online with Agile Assets.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/calculator/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Matching Tree Background and Typography) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || heroBg}
                            alt="Agile Assets Financing Calculator"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />

                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                {lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'Agile Assets') : (content.heroBadgeEn || content.heroBadgeTh || 'Agile Assets')}
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-4">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'โปรแกรมคำนวณสินเชื่อ') : (content.heroTitleEn || content.heroTitleTh || 'Financing Calculator')}
                            </h1>
                            {(content.heroSubtitleTh || content.heroSubtitleEn) && (
                                <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                                    {lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn) : (content.heroSubtitleEn || content.heroSubtitleTh)}
                                </p>
                            )}
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Calculator Section ─── */}
                {!calc.hidden && (<section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                {/* Left Form Column */}
                                <div className="lg:col-span-7">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-sans mb-4">
                                        {calc.t('t01')}
                                    </h2>

                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                        {calc.t('t02')}
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* 1. มูลค่าเครื่องจักร */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t03')}<span className="text-red-500 font-bold ml-0.5">*</span>
                                            </label>
                                            <div className="sm:col-span-7">
                                                <input
                                                    type="text"
                                                    value={machinePrice}
                                                    onChange={handlePriceChange}
                                                    placeholder="เช่น 5,000,000"
                                                    required
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* 2. ประเภทดอกเบี้ย */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t04')}
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={interestType}
                                                    onChange={(e) => {
                                                        const type = e.target.value as 'flat' | 'effective';
                                                        setInterestType(type);
                                                        if (type === 'flat') {
                                                            setInterestRate('8.90');
                                                        } else {
                                                            setInterestRate('14.50');
                                                        }
                                                    }}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                >
                                                    <option value="flat">{calc.t('t05')}</option>
                                                    <option value="effective">{calc.t('t06')}</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 3. เงินดาวน์ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t07')}
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={downPaymentRate}
                                                    onChange={(e) => setDownPaymentRate(parseFloat(e.target.value))}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                >
                                                    <option value={0}>0%</option>
                                                    <option value={0.10}>10%</option>
                                                    <option value={0.15}>15%</option>
                                                    <option value={0.20}>20%</option>
                                                    <option value={0.30}>30%</option>
                                                    <option value={0.40}>40%</option>
                                                    <option value={0.50}>50%</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 4. ระยะเวลาผ่อนชำระ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t08')}
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={installmentPeriod}
                                                    onChange={(e) => setInstallmentPeriod(parseInt(e.target.value, 10))}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                >
                                                    <option value={15}>{calc.t('t09')}</option>
                                                    <option value={24}>{calc.t('t10')}</option>
                                                    <option value={30}>{calc.t('t11')}</option>
                                                    <option value={36}>{calc.t('t12')}</option>
                                                    <option value={48}>{calc.t('t13')}</option>
                                                    <option value={60}>{calc.t('t14')}</option>
                                                    <option value={72}>{calc.t('t15')}</option>
                                                    <option value={84}>{calc.t('t16')}</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 5. อัตราดอกเบี้ย (%) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t17')}
                                            </label>
                                            <div className="sm:col-span-7">
                                                <input
                                                    type="text"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(e.target.value)}
                                                    placeholder="8.90"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* 6. เงินที่ต้องผ่อนชำระ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {calc.t('t18')}
                                            </label>
                                            <div className="sm:col-span-7">
                                                <input
                                                    type="text"
                                                    value={monthlyPayment ? `${monthlyPayment} บาท / เดือน` : ''}
                                                    readOnly
                                                    placeholder="คำนวณอัตโนมัติ"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/40 text-blue-900 dark:text-sky-300 font-bold text-sm focus:outline-none shadow-sm cursor-default"
                                                />
                                            </div>
                                        </div>

                                        {/* Calculation Summary Details */}
                                        {loanPrincipal > 0 && monthlyPayment && (
                                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-xs space-y-2 mt-4">
                                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                                    <span>{calc.t('t19')}</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{loanPrincipal.toLocaleString('th-TH')} {calc.t('t20')}</span>
                                                </div>
                                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                                    <span>{calc.t('t21')}</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{totalInterest.toLocaleString('th-TH', { maximumFractionDigits: 0 })} {calc.t('t20')}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                                <span>{calc.t('t22')}</span>
                                            </button>

                                            <button
                                                type="submit"
                                                className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                            >
                                                <Send className="w-3.5 h-3.5" />
                                                <span>{calc.t('t23')}</span>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Submission Success Alert */}
                                    {isSubmitted && (
                                        <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 animate-fade-in">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                                                    {calc.t('t24')}
                                                </h4>
                                                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                                                    {calc.t('t25')} <strong className="underline">{monthlyPayment} {calc.t('t26')}</strong> {calc.t('t27')}
                                                </p>
                                                <a
                                                    href={calc.t('link28')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                                                >
                                                    <PhoneCall className="w-3.5 h-3.5" />
                                                    <span>{calc.t('t29')}</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Illustration Graphic Column */}
                                <div className="lg:col-span-5 flex flex-col items-center justify-center pt-6 lg:pt-0">
                                    <div className="relative w-full max-w-md mx-auto">
                                        <img
                                            src={calc.t('img30')}
                                            alt="Industrial Machinery Components & Gears"
                                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
