import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.webp';

export function CalculatorPage() {
    const { lang } = useLanguage();

    // Form state
    const [machinePrice, setMachinePrice] = useState<string>('5000000');
    const [interestType, setInterestType] = useState<'flat' | 'effective'>('flat');
    const [downPaymentRate, setDownPaymentRate] = useState<number>(0);
    const [installmentPeriod, setInstallmentPeriod] = useState<number>(15);
    const [interestRate, setInterestRate] = useState<string>('8.90');
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [loanPrincipal, setLoanPrincipal] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Calculate loan details
    useEffect(() => {
        const rawPrice = parseFloat(machinePrice.replace(/,/g, '')) || 0;
        const principal = rawPrice * (1 - downPaymentRate);
        setLoanPrincipal(principal);

        const months = installmentPeriod;
        const years = months / 12;
        const rate = parseFloat(interestRate) || 0;

        if (principal <= 0 || months <= 0 || rate <= 0) {
            setMonthlyPayment('');
            setTotalInterest(0);
            return;
        }

        if (interestType === 'flat') {
            const flatRateDecimal = rate / 100;
            const interest = principal * flatRateDecimal * years;
            const monthly = (principal + interest) / months;
            setTotalInterest(interest);
            setMonthlyPayment(monthly.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        } else {
            const effectiveRateDecimal = rate / 100;
            const monthlyRate = effectiveRateDecimal / 12;
            const monthly = (monthlyRate * principal) / (1 - Math.pow(1 + monthlyRate, -months));
            const interest = (monthly * months) - principal;
            setTotalInterest(interest > 0 ? interest : 0);
            setMonthlyPayment(monthly.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
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
        setMonthlyPayment('');
        setIsSubmitted(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const pageTitle = lang === 'th'
        ? 'คำนวณสินเชื่อ (Financing Calculator) | Agile Assets'
        : 'Financing Calculator | Agile Assets - Industrial Machinery Financing';
    const pageDescription = lang === 'th'
        ? 'คำนวณสินเชื่อออนไลน์ รู้ค่างวด ดอกเบี้ย และวงเงินได้ทันที ใช้งานง่าย ช่วยวางแผนการเงินโรงงานได้อย่างแม่นยำ'
        : 'Calculate your industrial machinery loan installments and effective interest rates online with Agile Assets.';

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
                            src={heroBg}
                            alt="Agile Assets Financing Calculator"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                Financing Calculator
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-4">
                                โปรแกรมคำนวณสินเชื่อ
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Calculator Section ─── */}
                <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                {/* Left Form Column */}
                                <div className="lg:col-span-7">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-sans mb-4">
                                        คำนวณสินเชื่อโดย AGILE ASSETS
                                    </h2>

                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                        ดอกเบี้ยลดต้นลดดอก ( Effective) คือ ดอกเบี้ยที่เปลี่ยนแปลงไปตามจำนวนเงินต้นที่ผู้ขอสินเชื่อได้ชำระในแต่ละงวด โดยดอกเบี้ยจะลดลงเรื่อย ๆ ตามเงินต้นที่ลดลง เนื่องจากถูกหักออกไปจากการชำระหนี้งวดก่อนหน้า หรือการที่เราผ่อนหรือชำระในแต่ละงวด จะทำให้เงินต้นลดลงดอกเบี้ยที่เรียกเก็บ จากเราก็จะลดลงไปด้วย
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* 1. มูลค่าเครื่องจักร */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                มูลค่าเครื่องจักร<span className="text-red-500 font-bold ml-0.5">*</span>
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
                                                ประเภทดอกเบี้ย
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
                                                    <option value="flat">Flat Rate (คงที่)</option>
                                                    <option value="effective">Effective Rate (ลดต้นลดดอก)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 3. เงินดาวน์ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                เงินดาวน์
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
                                                ระยะเวลาผ่อนชำระ
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={installmentPeriod}
                                                    onChange={(e) => setInstallmentPeriod(parseInt(e.target.value, 10))}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
                                                >
                                                    <option value={15}>15 เดือน</option>
                                                    <option value={24}>24 เดือน (2 ปี)</option>
                                                    <option value={30}>30 เดือน</option>
                                                    <option value={36}>36 เดือน (3 ปี)</option>
                                                    <option value={48}>48 เดือน (4 ปี)</option>
                                                    <option value={60}>60 เดือน (5 ปี)</option>
                                                    <option value={72}>72 เดือน (6 ปี)</option>
                                                    <option value={84}>84 เดือน (7 ปี)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 5. อัตราดอกเบี้ย (%) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                                            <label className="sm:col-span-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                อัตราดอกเบี้ย(%)
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
                                                เงินที่ต้องผ่อนชำระ
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
                                                    <span>วงเงินสินเชื่อ (หลังหักเงินดาวน์):</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{loanPrincipal.toLocaleString('th-TH')} บาท</span>
                                                </div>
                                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                                    <span>ประมาณการดอกเบี้ยรวมตลอดสัญญา:</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{totalInterest.toLocaleString('th-TH', { maximumFractionDigits: 0 })} บาท</span>
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
                                                <span>ล้างข้อมูล</span>
                                            </button>

                                            <button
                                                type="submit"
                                                className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                            >
                                                <Send className="w-3.5 h-3.5" />
                                                <span>Submit</span>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Submission Success Alert */}
                                    {isSubmitted && (
                                        <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 animate-fade-in">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                                                    บันทึกการคำนวณสินเชื่อสำเร็จ!
                                                </h4>
                                                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                                                    ค่างวดโดยประมาณ: <strong className="underline">{monthlyPayment} บาท/เดือน</strong> ท่านสามารถติดต่อเจ้าหน้าที่สินเชื่อเพื่อรับเงื่อนไขอัตราดอกเบี้ยพิเศษเฉพาะโรงงานของท่านได้ทันที
                                                </p>
                                                <a
                                                    href="https://line.me/R/ti/p/%40884ukedb"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                                                >
                                                    <PhoneCall className="w-3.5 h-3.5" />
                                                    <span>ปรึกษาเจ้าหน้าที่สินเชื่อทาง LINE</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Illustration Graphic Column */}
                                <div className="lg:col-span-5 flex flex-col items-center justify-center pt-6 lg:pt-0">
                                    <div className="relative w-full max-w-md mx-auto">
                                        <img
                                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/elementor/thumbs/BG3@300x-8-scaled-e1775098240775-rle932y5135na1zc22d4pk6m1ykg488qdgq4codu74.png"
                                            alt="Industrial Machinery Components & Gears"
                                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
