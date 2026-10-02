import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Award, ArrowRight, Send, Check, Factory, ChevronRight, Building, FileCheck, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import { useSections } from '@/lib/pageSections';
import { investorRelationsSections } from '@/data/pageSections/investorRelations';
import { SectionIcon } from '@/lib/sectionIcons';

interface StatItem {
    value: string;
    unit: string;
    labelTh: string;
    labelEn: string;
    subTh: string;
    subEn: string;
    icon: React.ComponentType<{ className?: string }>;
}

function StatMetricCard({ st, lang }: { st: StatItem; lang: string }) {
    const IconComp = st.icon;
    const targetNum = parseFloat(st.value.replace(/,/g, ''));
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isNaN(targetNum)) return;
        let start = 0;
        const duration = 1800;
        const totalSteps = duration / 16;
        const increment = targetNum / totalSteps;
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetNum) {
                setCount(targetNum);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [targetNum]);

    const displayValue = isNaN(targetNum) ? st.value : count.toLocaleString();

    return (
        <div className="rounded-2xl p-6 sm:p-7 bg-card text-card-foreground border border-border shadow-2xl hover:border-sky-500/60 transition-all duration-300 hover:shadow-sky-500/10 text-center flex flex-col items-center justify-center group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                <IconComp className="w-6 h-6" />
            </div>
            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-sky-600 dark:text-sky-400 tracking-tight font-sans">
                    {displayValue}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-sky-300">
                    {st.unit}
                </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                {lang === 'th' ? st.labelTh : st.labelEn}
            </h3>
            <p className="text-xs text-muted-foreground">
                {lang === 'th' ? st.subTh : st.subEn}
            </p>
        </div>
    );
}

export function InvestorRelationsPage() {
    const { lang } = useLanguage();
    const { settings } = useSiteSettings();
    const { content } = usePageContent('investor-relations', DEFAULT_PAGE_CONTENTS['investor-relations']);
    const section = useSections(content, investorRelationsSections);
    const heroExtras = section('hero-extras');
    const growWithUs = section('grow-with-us');
    const investBullets = section('invest-bullets');
    const thankYou = section('thank-you');
    const services = section('services');
    const portfolio = section('portfolio');
    const partners = section('partners');
    const campaign = section('campaign');
    const inquiry = section('inquiry');
    const [submitting, setSubmitting] = useState(false);
    const { send, guardFields } = useLeadSubmit();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        interestType: 'equity',
        note: '',
    });

    const parseStat = (raw: string | undefined, fallbackVal: string, defaultUnit: string) => {
        const rawVal = (raw && raw.trim().length > 0) ? raw.trim() : fallbackVal;
        const match = rawVal.match(/^([^\d]*)(\d[\d,.]*)(.*)$/);
        if (!match) {
            return { value: rawVal, unit: defaultUnit };
        }
        const val = match[2];
        let unit = match[3]?.trim() || '';
        if (!unit) {
            unit = defaultUnit;
        } else if (defaultUnit.includes('MB') && !unit.includes('MB')) {
            unit = unit === '+' ? 'MB+' : `${unit} MB`;
        }
        return { value: val, unit };
    };

    const factoryStat = parseStat(settings.impactStats?.factoriesServed, '40', '+');
    const contractsStat = parseStat(settings.impactStats?.totalContractsCount, '54', '+');
    const valueStat = parseStat(settings.impactStats?.totalCreditValueMB, '399', 'MB+');

    // Key Performance Metrics (Counters) - Dynamically connected to SiteSettings impactStats
    const keyStats: StatItem[] = [
        {
            value: factoryStat.value,
            unit: factoryStat.unit,
            labelTh: 'โรงงานที่ให้สินเชื่อ',
            labelEn: 'Client Factories Supported',
            subTh: 'กระจายตัวในหลากหลายอุตสาหกรรมทั่วประเทศ',
            subEn: 'Diversified nationwide across critical sectors',
            icon: Factory,
        },
        {
            value: contractsStat.value,
            unit: contractsStat.unit,
            labelTh: 'สัญญาเช่าซื้อสะสม',
            labelEn: 'Hire Purchase Contracts',
            subTh: 'บริหารความเสี่ยงแบบ 100% Asset-Backed',
            subEn: '100% Asset-backed structured financing',
            icon: FileCheck,
        },
        {
            value: valueStat.value,
            unit: valueStat.unit,
            labelTh: 'มูลค่าสินเชื่อที่บริหารรวม',
            labelEn: 'Total Portfolio Managed',
            subTh: 'เติบโตอย่างมั่นคงต่อเนื่องทุกไตรมาส',
            subEn: 'Consistent quarterly expansion & strong cashflow',
            icon: TrendingUp,
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อและเบอร์โทรศัพท์' : 'Please provide your name and phone number');
            return;
        }

        setSubmitting(true);
        const result = await send((meta) =>
            formService.submitInquiry({
                source: 'investor-relations',
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                company: formData.company,
                message: formData.note,
                interestType: formData.interestType,
            }, meta)
        );
        setSubmitting(false);
        if (!result) return;
        setSubmitted(true);
        toast.success(
            lang === 'th'
                ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายนักลงทุนสัมพันธ์จะติดต่อกลับโดยเร็วที่สุด'
                : 'Inquiry submitted successfully! Our Investor Relations team will contact you shortly.'
        );
    };

    const scrollToForm = () => {
        const el = document.querySelector('#investor-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = content.metaTitle || (lang === 'th'
        ? 'นักลงทุนสัมพันธ์ (Investor Relations) | Agile Assets'
        : 'Investor Relations | Agile Assets - Machinery Hire Purchase & Growth');
    const description = content.metaDescription || (lang === 'th'
        ? 'ฝ่ายนักลงทุนสัมพันธ์ Agile Assets - ข้อมูลโครงสร้างการลงทุน หุ้นสามัญ ตั๋วเงิน ผลการดำเนินงานพอร์ตสินเชื่อ และโอกาสเติบโตร่วมกับเรา'
        : 'Agile Assets Investor Relations - Learn about our investment vehicles, asset-backed portfolio performance, equity participation, and commercial paper.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/investor-relations/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Consistent min-h-[96vh] Container Height) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12">
                    {/* Deep Futuristic Global Network Background */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || heroBg}
                            alt="Agile Assets Investor Relations"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* High-Contrast Vignettes & Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />

                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Glowing Ambient Lightings */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            {/* Category Badge */}
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border bg-slate-950/80 text-xs sm:text-sm font-bold mb-6 shadow-lg"
                                style={{
                                    borderColor: 'rgba(var(--accent-rgb, 56 189 248), 0.4)',
                                    color: 'var(--theme-sky-300, #7dd3fc)',
                                    boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb, 2 132 199), 0.1)',
                                }}
                            >
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'rgba(var(--accent-rgb, 56 189 248), 0.2)',
                                        color: 'var(--theme-sky-300, #7dd3fc)',
                                    }}
                                >
                                    <TrendingUp className="w-3.5 h-3.5" />
                                </div>
                                <span>{(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn) : (content.heroBadgeEn || content.heroBadgeTh)) || (lang === 'th' ? 'Investor Relations • นักลงทุนสัมพันธ์' : 'Investor Relations')}</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'นักลงทุนสัมพันธ์') : (content.heroTitleEn || content.heroTitleTh || 'Investor Relations')}
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn || 'ข้อมูลทางการเงินและโอกาสเติบโตร่วมกับเรา') : (content.heroSubtitleEn || content.heroSubtitleTh || 'Investor Relations')}
                            </p>

                            {/* CTA Button */}
                            {!heroExtras.hidden && (<div className="flex justify-center">
                                <button
                                    onClick={scrollToForm}
                                    className="btn-dynamic-theme inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <span>{(lang === 'th' ? (content.ctaTextTh || content.ctaTextEn) : (content.ctaTextEn || content.ctaTextTh)) || (heroExtras.t('t01'))}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>)}
                        </ScrollReveal>
                    </div>

                    {/* ─── Key Metrics Strip (Counters with Sharp High Contrast) ─── */}
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
                        <ScrollReveal animation="fade-up" delay={100}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                {keyStats.map((st, i) => (
                                    <StatMetricCard key={i} st={st} lang={lang} />
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ร่วมเป็นส่วนหนึ่งของการเติบโตไปกับเรา (Be a Part of Our Growth) ─── */}
                {!growWithUs.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Column: Business Model & Vision */}
                            <div className="lg:col-span-7 space-y-6">
                                <ScrollReveal animation="fade-right">
                                    <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
                                        {growWithUs.t('t01')}
                                    </p>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mt-2">
                                        {growWithUs.t('t02')}
                                    </h2>

                                    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pt-3">
                                        <p>
                                            {growWithUs.t('t03')}
                                        </p>
                                        <p>
                                            {growWithUs.t('t04')}
                                        </p>
                                        <p>
                                            {growWithUs.t('t05')}
                                        </p>
                                    </div>

                                    {/* 3 Bullet List */}
                                    <div className="pt-4 space-y-2.5">
                                        <p className="text-sm font-bold text-foreground">
                                            {growWithUs.t('t06')}
                                        </p>
                                        <div className="space-y-2">
                                            {investBullets.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                                                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-foreground">
                                                        {lang === 'th' ? item.t('th') : item.t('en')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column: 2 Investment Vehicle Cards & Direct Contact Box */}
                            <div className="lg:col-span-5 space-y-6">
                                <ScrollReveal animation="fade-left">
                                    <div className="space-y-4">
                                        {growWithUs.items.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-3xl p-6 sm:p-7 bg-card text-card-foreground border border-sky-500/30 dark:border-sky-500/20 shadow-xl hover:scale-[1.01] transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {opt.t('title')}
                                                    </h3>
                                                    <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 text-[10px] font-bold border border-sky-500/30 flex-shrink-0">
                                                        {opt.t('badge')}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                                    {opt.t('desc')}
                                                </p>
                                                <div className="space-y-1.5 border-t border-border pt-3">
                                                    {(opt.lines('highlights')).map((h, hi) => (
                                                        <div key={hi} className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                                                            <span>{h}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Contact Investor Relations Department Box */}
                                        <div className="rounded-3xl p-6 border border-sky-500/40 bg-card text-card-foreground shadow-xl">
                                            <p className="text-xs font-semibold text-sky-600 dark:text-sky-300 mb-2">
                                                {growWithUs.t('t07')}
                                            </p>
                                            <h4 className="text-base font-extrabold text-foreground mb-3">
                                                {growWithUs.t('t08')}
                                            </h4>
                                            <div className="space-y-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                                                    <a href={`mailto:${settings.companyInfo?.email || 'marketing@agileassets.co.th'}`} className="hover:text-sky-500 text-foreground font-medium underline underline-offset-2 transition-colors">
                                                        {settings.companyInfo?.email || 'marketing@agileassets.co.th'}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                                                    <a href={`tel:${(settings.companyInfo?.phone || '062-590-2227').replace(/[^0-9+]/g, '')}`} className="hover:text-sky-500 text-foreground font-bold transition-colors">
                                                        {settings.companyInfo?.phone || '062-590-2227'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>)}

                {/* ─── 3. ขอบคุณจากใจถึงนักลงทุน & ความมุ่งมั่นของเรา ─── */}
                {!thankYou.hidden && (<section className="py-20 lg:py-24 relative bg-slate-900/10 dark:bg-slate-900/40 border-y border-border/80 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            {/* Left: Thank You & Commitment Text */}
                            <div className="lg:col-span-7 space-y-6">
                                <ScrollReveal animation="fade-right">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400 mb-2">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>{thankYou.t('t01')}</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
                                        {thankYou.t('t02')}
                                    </h2>
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {<>
                                                <strong className="text-foreground">{thankYou.t('t03')}</strong> {thankYou.t('t04')}
                                            </>}
                                    </p>

                                    <div className="pt-4 border-t border-border">
                                        <h3 className="text-xl font-bold text-foreground mb-4">
                                            {thankYou.t('t05')}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {thankYou.items.map((c, idx) => (
                                                <div key={idx} className="bg-card text-card-foreground p-4 rounded-2xl border border-sky-500/20 text-center shadow-md">
                                                    <div className="w-8 h-8 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                                                        0{idx + 1}
                                                    </div>
                                                    <h4 className="text-sm font-bold text-foreground mb-1">
                                                        {c.t('title')}
                                                    </h4>
                                                    <p className="text-[11px] text-muted-foreground">
                                                        {c.t('desc')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right: Visual Illustration */}
                            <div className="lg:col-span-5">
                                <ScrollReveal animation="fade-left">
                                    <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl group">
                                        <img
                                            src={thankYou.t('img06')}
                                            alt="Partnership & Investment"
                                            className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-white/15 backdrop-blur-xl">
                                            <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">
                                                {thankYou.t('t07')}
                                            </p>
                                            <p className="text-xs text-white mt-1">
                                                {thankYou.t('t08')}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>)}

                {/* ─── 4. บริการทางการเงินของเรา (5 Industry Core Sectors) ─── */}
                {!services.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    {services.t('t01')}
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                                    {services.t('t02')}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {services.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 5 Industry Horizontal Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
                            {services.items.map((srv, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <a
                                        href={srv.t('href')}
                                        className="rounded-2xl p-5 bg-card text-card-foreground border border-border hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col items-center text-center group h-full"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 transition-all">
                                            <SectionIcon name={srv.raw.icon} className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-sky-500 transition-colors">
                                            {srv.t('title')}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                                            {srv.t('desc')}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-border w-full flex items-center justify-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                            <span>{services.t('t04')}</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </div>
                                    </a>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 5. ยอดรวมพอร์ตสินเชื่อ (Portfolio Total) ─── */}
                {!portfolio.hidden && (<section className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500 rounded-full blur-[140px]" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[140px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center sm:text-left mb-12">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
                                    {portfolio.t('t01')}
                                </h2>
                                <p className="text-2xl sm:text-3xl font-bold text-sky-300 tracking-wide font-sans mt-1">
                                    {portfolio.t('t02')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 2-Column Grid: Bar Chart (Left) + Executive Growth Image (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* Left Column: Responsive Interactive Bar Chart */}
                            <div className="lg:col-span-6 flex">
                                <ScrollReveal animation="fade-right" className="w-full flex">
                                    <div className="w-full rounded-3xl p-6 sm:p-8 bg-white text-slate-900 shadow-2xl flex flex-col justify-between">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-sky-500" />
                                                <span className="text-xs font-bold text-slate-700 tracking-wide">
                                                    {portfolio.t('t03')}
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-400">
                                                {portfolio.t('t04')}
                                            </span>
                                        </div>

                                        {/* Chart Area */}
                                        <div className="relative flex-1 min-h-[320px] sm:min-h-[360px] flex flex-col justify-end pt-6">
                                            {/* Y-Axis Grid Lines & Values (0, 100, 200, 300, 400) */}
                                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2 pb-10">
                                                {[400, 300, 200, 100, 0].map((val) => (
                                                    <div key={val} className="flex items-center gap-3 w-full">
                                                        <span className="text-xs font-bold text-slate-500 w-8 text-right font-sans">
                                                            {val}
                                                        </span>
                                                        <div className="flex-1 h-[1px] bg-slate-200" />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bars Container */}
                                            <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-6 pl-12 pr-2 h-[260px] sm:h-[300px] items-end pb-8">
                                                {portfolio.items.map((item, idx) => (
                                                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                                                        {/* The Bar */}
                                                        <div
                                                            className="w-full max-w-[72px] bg-[#4299e1] hover:bg-[#3182ce] rounded-t-md transition-all duration-700 relative flex items-center justify-center shadow-md group-hover:shadow-lg"
                                                            style={{ height: item.t('heightPercent') }}
                                                        >
                                                            {/* Value inside the Bar */}
                                                            <span className="text-[11px] sm:text-xs font-extrabold text-white whitespace-nowrap drop-shadow-sm px-1">
                                                                {Number(item.raw.mb)} {portfolio.t('t05')}
                                                            </span>
                                                        </div>

                                                        {/* X-Axis Year Label */}
                                                        <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 font-sans">
                                                            {lang === 'th' ? item.t('year') : item.t('yearEn')}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column: Executive Corporate Growth Image */}
                            <div className="lg:col-span-6 flex">
                                <ScrollReveal animation="fade-left" className="w-full flex">
                                    <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 relative flex flex-col justify-end bg-slate-900 group min-h-[360px]">
                                        <img
                                            src={portfolio.t('img06')}
                                            onError={(e) => {
                                                // Fallback image if network fails
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80';
                                            }}
                                            alt="Agile Assets Corporate Growth"
                                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                                        <div className="relative z-10 p-6 sm:p-8">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-xs font-bold text-sky-300 mb-3">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                <span>{portfolio.t('t07')}</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                                                {portfolio.t('t08')}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                                {portfolio.t('t09')}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>)}

                {/* ─── 6. เข้าพบผู้บริหารสถาบันการเงิน (Financial Institutions) ─── */}
                {!partners.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400 mb-3">
                                    <Building className="w-3.5 h-3.5" />
                                    <span>{partners.t('t01')}</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                                    {partners.t('t02')}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {partners.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 6 Partner Photo/Logo Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {partners.items.map((p, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="rounded-3xl overflow-hidden bg-card text-card-foreground border border-border hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col group h-full shadow-md">
                                        <div className="relative w-full h-48 bg-slate-900/60 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={p.t('image')}
                                                alt={p.t('name')}
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                        </div>
                                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-500 transition-colors mb-1">
                                                    {p.t('name')}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {p.t('type')}
                                                </p>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                                                <span>{partners.t('t04')}</span>
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 7. ข่าวสารความยั่งยืน Banner (Sustainability Campaign) ─── */}
                {!campaign.hidden && (<section className="py-12 relative bg-slate-900/10 dark:bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="zoom-in">
                            <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 bg-slate-950 p-8 sm:p-12 text-center text-white shadow-2xl">
                                <div className="absolute inset-0 z-0 opacity-40">
                                    <img
                                        src={campaign.t('img01')}
                                        alt="Sustainability Campaign"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/85" />
                                </div>

                                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                                        {campaign.t('t02')}
                                    </p>
                                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                                        {campaign.t('t03')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {campaign.t('t04')}
                                    </p>
                                    <div className="pt-2">
                                        <a
                                            href={campaign.t('link05')}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                                        >
                                            <span>{campaign.t('t06')}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 8. Investor Inquiries & Business Partnership Form ─── */}
                {!inquiry.hidden && (<section id="investor-form" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={inquiry.t('img01')}
                            alt="Investor Relations Partnership"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase font-sans mb-4">
                                    {inquiry.t('t02')}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {inquiry.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Inquiry Contact Form */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900/95 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-500 dark:text-sky-400 mx-auto flex items-center justify-center border border-sky-400/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {inquiry.t('t04')}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                            {inquiry.t('t05')}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: '', phone: '', email: '', company: '', interestType: 'equity', note: '' });
                                            }}
                                            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold"
                                        >
                                            {inquiry.t('t06')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="investor-relations-field-1" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t07')}
                                                </label>
                                                <input id="investor-relations-field-1"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={inquiry.t('t08')}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="investor-relations-field-2" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t09')}
                                                </label>
                                                <input id="investor-relations-field-2"
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="08X-XXX-XXXX"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="investor-relations-field-3" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t10')}
                                                </label>
                                                <input id="investor-relations-field-3"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="investor-relations-field-4" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t11')}
                                                </label>
                                                <input id="investor-relations-field-4"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={inquiry.t('t12')}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="investor-relations-field-5" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {inquiry.t('t13')}
                                            </label>
                                            <select id="investor-relations-field-5"
                                                value={formData.interestType}
                                                onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                            >
                                                <option value="equity">{inquiry.t('t14')}</option>
                                                <option value="promissory_notes">{inquiry.t('t15')}</option>
                                                <option value="syndication">{inquiry.t('t16')}</option>
                                                <option value="other">{inquiry.t('t17')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="investor-relations-field-6" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {inquiry.t('t18')}
                                            </label>
                                            <textarea id="investor-relations-field-6"
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={inquiry.t('t19')}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        {guardFields}
                                        <div className="pt-2 text-center">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                {submitting ? (
                                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>{inquiry.t('t20')}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
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
