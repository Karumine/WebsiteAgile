import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowRightLeft, Droplets, Wheat, Factory, Flame, Sun } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { InterestRates } from '@/components/sections/InterestRates';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function InterestRateConversionPage() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    // Form states
    const [conversionType, setConversionType] = useState<'flatToEff' | 'effToFlat'>('flatToEff');
    const [inputRate, setInputRate] = useState<string>('7');
    const [installmentMonths, setInstallmentMonths] = useState<number>(15);
    const [convertedRate, setConvertedRate] = useState<string>('');

    // Conversion calculation
    const calculateRate = () => {
        const rate = parseFloat(inputRate) || 0;
        const months = installmentMonths;
        const years = months / 12;

        if (rate <= 0 || months <= 0) {
            setConvertedRate('');
            return;
        }

        if (conversionType === 'flatToEff') {
            // Flat Rate -> Effective Rate
            // Formula: (2 * years * flatRate) / (years + 1)
            const eff = (2 * years * rate) / (years + 1);
            setConvertedRate(eff.toFixed(2));
        } else {
            // Effective Rate -> Flat Rate
            // Formula: (effectiveRate * (years + 1)) / (2 * years)
            const flat = (rate * (years + 1)) / (2 * years);
            setConvertedRate(flat.toFixed(2));
        }
    };

    useEffect(() => {
        calculateRate();
    }, [conversionType, inputRate, installmentMonths]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculateRate();
    };

    // 5 Industries for bottom grid
    const industries = [
        {
            titleTh: 'สินเชื่อธุรกิจผลิตน้ำดื่ม',
            titleEn: 'Drinking Water Production',
            descTh: 'สินเชื่อเช่าซื้อสำหรับเครื่องจักรและอุปกรณ์ในการผลิตน้ำดื่ม',
            descEn: 'Machinery leasing for purified drinking water manufacturing',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/03/ธุรกิจผลิตน้ำดื่ม.jpg',
            href: '/drinking-water-production',
            icon: Droplets,
        },
        {
            titleTh: 'สินเชื่อฟาร์มปศุสัตว์',
            titleEn: 'Livestock Farm Financing',
            descTh: 'สินเชื่อเช่าซื้อสำหรับอุปกรณ์และระบบการจัดการแบบบูรณาการในฟาร์มปศุสัตว์',
            descEn: 'Integrated agricultural & livestock climate system loans',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/03/ฟาร์มปศุสัตว์ไก่.jpg',
            href: '/livestock-farm',
            icon: Wheat,
        },
        {
            titleTh: 'สินเชื่อธุรกิจแปรรูปอาหาร',
            titleEn: 'Food Processing Machinery',
            descTh: 'สินเชื่อเช่าซื้อสำหรับเครื่องจักรในกระบวนการแปรรูปอาหาร',
            descEn: 'Commercial grade food processing & packing equipment',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/03/ธุรกิจแปรรูปอาหาร2.jpg',
            href: '/food-processing',
            icon: Factory,
        },
        {
            titleTh: 'สินเชื่อผลิตพลังงานก๊าซชีวภาพ',
            titleEn: 'Biogas Production Systems',
            descTh: 'สินเชื่อเช่าซื้อสำหรับอุปกรณ์และเครื่องจักรที่ใช้ในการผลิตก๊าซชีวภาพ',
            descEn: 'Industrial anaerobic digestion & biogas gen-sets financing',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/03/ธุรกิจผลิตพลังงานจากก๊าซชีวภาพ.jpg',
            href: '/biogas-production',
            icon: Flame,
        },
        {
            titleTh: 'สินเชื่อผลิตพลังงานจากแสงอาทิตย์',
            titleEn: 'Solar Power Generation',
            descTh: 'สินเชื่อเช่าซื้อสำหรับอุปกรณ์สำหรับการผลิตพลังงานแสงอาทิตย์',
            descEn: 'Commercial solar PV rooftops & clean energy inverters',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/03/ธุรกิจผลิตพลังงานจากแสงอาทิตย์.jpg',
            href: '/solar-power-generation-en',
            icon: Sun,
        },
    ];

    const pageTitle = lang === 'th'
        ? 'แปลงดอกเบี้ย Flat Rate / Effective Rate | Agile Assets'
        : 'Interest Rate Converter | Agile Assets - Flat Rate vs Effective Rate';
    const pageDescription = lang === 'th'
        ? 'แปลงดอกเบี้ยคงที่ Flat Rate เป็น ดอกเบี้ยลดต้นลดดอก Effective Rate คำนวณอัตราดอกเบี้ยแม่นยำ ใช้งานง่าย ช่วยคำนวณสินเชื่อได้แม่นยำ'
        : 'Convert between Flat Rate and Effective Rate for industrial equipment financing and factory machinery loans with Agile Assets.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/interest-rate-conversion/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets Interest Rate Converter"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                        
                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                Interest Rate Converter
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-4">
                                โปรแกรมแปลงดอกเบี้ย
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Explanation Section ─── */}
                <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1">
                                    Interest Rate Converter
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 font-sans">
                                    แปลงดอกเบี้ย Flat Rate / Effective Rate
                                </h2>
                            </div>

                            <div className="mb-14 space-y-4">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans">
                                    ดอกเบี้ยคงที่ ( Flat Rate ) กับ ดอกเบี้ยแบบลดลดดอก ( Effective) แตกต่างกันอย่างไร
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                                    <strong>ดอกเบี้ยคงที่ ( Flat Rate )</strong> คือ อัตราดอกเบี้ยที่ผู้ให้สินเชื่อกำหนดไว้ตายตัว โดยจะไม่มีการปรับยอดชำระตลอดการทำสัญญา โดยคำนวณจากจำนวนเงินต้นที่ขอสินเชื่อ และนำมาหารกับจำนวนงวดที่ต้องจ่ายในอัตราการคิดดอกเบี้ยที่เท่ากันในแต่ละครั้งของการชำระหนี้ ทำให้ยอดชำระต่องวดเท่ากันทุกงวด จนครบจำนวนงวดตามสัญญา
                                </p>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                                    <strong>ดอกเบี้ยลดต้นลดดอก ( Effective)</strong> คือ ดอกเบี้ยที่เปลี่ยนแปลงไปตามจำนวนเงินต้นที่ผู้ขอสินเชื่อได้ชำระในแต่ละงวด โดยดอกเบี้ยจะลดลงเรื่อย ๆ ตามเงินต้นที่ลดลง เนื่องจากถูกหักออกไปจากการชำระหนี้งวดก่อนหน้า หรือการที่เราผ่อนหรือชำระในแต่ละงวด จะทำให้เงินต้นลดลงดอกเบี้ยที่เรียกเก็บ จากเราก็จะลดลงไปด้วย
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* ─── 3. Converter Form & Illustration ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                                {/* Form Left */}
                                <div className="lg:col-span-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans mb-6">
                                        โปรแกรมแปลงดอกเบี้ย FLAT RATE / EFFECTIVE RATE
                                    </h3>

                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        {/* ประเภทดอกเบี้ย */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                                            <label className="sm:col-span-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                ประเภทดอกเบี้ย
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={conversionType}
                                                    onChange={(e) => {
                                                        const val = e.target.value as 'flatToEff' | 'effToFlat';
                                                        setConversionType(val);
                                                        if (val === 'flatToEff') {
                                                            setInputRate('7');
                                                        } else {
                                                            setInputRate('12.92');
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
                                                >
                                                    <option value="flatToEff">Flat Rate (คงที่) &gt; Effective Rate</option>
                                                    <option value="effToFlat">Effective Rate &gt; Flat Rate (คงที่)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* ดอกเบี้ย */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                                            <label className="sm:col-span-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                ดอกเบี้ย<span className="text-red-500 font-bold ml-0.5">*</span>
                                            </label>
                                            <div className="sm:col-span-7">
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={inputRate}
                                                        onChange={(e) => setInputRate(e.target.value)}
                                                        placeholder="7"
                                                        required
                                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm pr-8"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ระยะเวลาผ่อนชำระ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                                            <label className="sm:col-span-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                ระยะเวลาผ่อนชำระ
                                            </label>
                                            <div className="sm:col-span-7">
                                                <select
                                                    value={installmentMonths}
                                                    onChange={(e) => setInstallmentMonths(parseInt(e.target.value, 10))}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
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

                                        {/* ดอกเบี้ยเทียบเท่า */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                                            <label className="sm:col-span-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                ดอกเบี้ยเทียบเท่า
                                            </label>
                                            <div className="sm:col-span-7">
                                                <input
                                                    type="text"
                                                    value={convertedRate ? `${convertedRate} %` : ''}
                                                    readOnly
                                                    placeholder="คำนวณอัตโนมัติ"
                                                    className="w-full px-3 py-2 rounded-lg border border-sky-300 dark:border-sky-800 bg-sky-50/80 dark:bg-sky-950/40 text-blue-900 dark:text-sky-300 font-bold text-xs sm:text-sm focus:outline-none shadow-sm cursor-default"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Action Button */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                            >
                                                <ArrowRightLeft className="w-4 h-4" />
                                                <span>แปลงดอกเบี้ย</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Graphic Right */}
                                <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                                    <img
                                        src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024,h_683/https://agileassets.co.th/wp-content/uploads/2026/05/piles-coins-top-graph-1024x683.jpg"
                                        alt="Coins on Growth Financial Graph"
                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* ─── 4. โซลูชั่นทางการเงินของเราในอุตสาหกรรม (5 Industry Cards) ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12">
                                <h3 className="text-xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 font-sans">
                                    โซลูชั่นทางการเงินของเราในอุตสาหกรรม
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
                                {industries.map((ind, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={ind.image}
                                                    alt={ind.titleTh}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1.5 line-clamp-2">
                                                    {lang === 'th' ? ind.titleTh : ind.titleEn}
                                                </h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                                                    {lang === 'th' ? ind.descTh : ind.descEn}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 pt-0">
                                            <button
                                                onClick={() => navigate(ind.href)}
                                                className="w-full py-2 px-3 rounded-lg bg-sky-400 hover:bg-sky-500 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 group-hover:shadow-md"
                                            >
                                                <span>อ่านเพิ่มเติม</span>
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Dual Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://line.me/R/ti/p/%40884ukedb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all text-center active:scale-95"
                                >
                                    ขอสินเชื่อกับเรา
                                </a>

                                <button
                                    onClick={() => navigate('/calculator')}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm transition-all text-center active:scale-95"
                                >
                                    คำนวณค่างวด
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Live Interest Rates from CMS */}
                <InterestRates />
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
