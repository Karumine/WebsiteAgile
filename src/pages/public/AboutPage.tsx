import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Clock,
    Award,
    TrendingUp,
    HeartHandshake,
    ChevronDown,
    ChevronUp,
    Building2,
    Sun,
    Truck,
    Sparkles,
    Briefcase,
    GraduationCap,
    Users
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

// Assets
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import storyOriginImg from '@/assets/story_origin_engineers.png';
import storyMachineryImg from '@/assets/story_machinery_finance.png';
import advisorChairmanImg from '@/assets/advisor_chairman.png';
import directorProfile1Img from '@/assets/director_profile_1.png';
import directorProfile2Img from '@/assets/director_profile_2.png';

export function AboutPage() {
    const { lang } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    // Scroll to top upon mounting
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Accordion state for executive profiles
    const [openDirector, setOpenDirector] = useState<string | null>('dir-1');

    const toggleDirector = (id: string) => {
        setOpenDirector(openDirector === id ? null : id);
    };

    const title = lang === 'en'
        ? 'About Us • Agile Assets | Engineering Roots & Machinery Finance'
        : 'เกี่ยวกับเรา • Agile Assets | รากฐานวิศวกรรมและสินเชื่อเครื่องจักรอุตสาหกรรม';
    const description = lang === 'en'
        ? 'Learn about Agile Assets story, advisory board, executive leadership, 16+ years of history, mission, and industrial leasing capabilities.'
        : 'เรื่องราวของอาจิไลท์ แอสเซทส์ รากฐานทางวิศวกรรม คณะกรรมการที่ปรึกษา ผู้บริหาร วิสัยทัศน์ และประสบการณ์กว่า 16 ปีด้านสินเชื่อเครื่องจักร';

    const corePillars = [
        {
            icon: Clock,
            titleTh: 'อนุมัติรวดเร็ว',
            titleEn: 'Fast Approval',
            descTh: 'ทราบผลเบื้องต้นใน 24 - 48 ชม.',
            descEn: 'Turnaround within 24-48 Hours',
        },
        {
            icon: Award,
            titleTh: 'บริการมืออาชีพ',
            titleEn: 'Professional Service',
            descTh: 'ทีมผู้เชี่ยวชาญเครื่องจักรและการเงิน',
            descEn: 'Engineering & Finance Specialists',
        },
        {
            icon: ShieldCheck,
            titleTh: 'โปร่งใส ตรงไปตรงมา',
            titleEn: 'Transparent & Fair',
            descTh: 'เงื่อนไขชัดเจน ไม่มีค่าธรรมเนียมแอบแฝง',
            descEn: 'No hidden fees, transparent terms',
        },
        {
            icon: TrendingUp,
            titleTh: 'โครงสร้างยืดหยุ่น',
            titleEn: 'Flexible Structuring',
            descTh: 'ออกแบบค่างวดสอดคล้องกับกระแสเงินสด',
            descEn: 'Customized to business cash flows',
        },
        {
            icon: HeartHandshake,
            titleTh: 'พันธมิตรแข็งแกร่ง',
            titleEn: 'Strong Partnership',
            descTh: 'เครือข่ายสถาบันการเงินและผู้ผลิตเครื่องจักร',
            descEn: 'Ecosystem of banks and OEMs',
        },
    ];

    const milestones = [
        {
            year: '2010',
            titleTh: 'จุดเริ่มต้นก่อตั้งบริษัท',
            titleEn: 'Company Inception',
            descTh: 'ก่อตั้งโดยทีมวิศวกรผู้เชี่ยวชาญเครื่องจักร เริ่มให้บริการสินเชื่อเช่าซื้ออุตสาหกรรม',
            descEn: 'Founded by industrial engineers providing tailored equipment leasing',
        },
        {
            year: '2014',
            titleTh: 'ขยายวงเงินและบริการ',
            titleEn: 'Nationwide Expansion',
            descTh: 'ขยายการสนับสนุนสินเชื่อครอบคลุมทั่วประเทศ วงเงินสะสมกว่า 5,000 ล้านบาท',
            descEn: 'Expanded leasing services nationwide exceeding ฿5B in cumulative credit',
        },
        {
            year: '2017',
            titleTh: 'พัฒนาโซลูชันเฉพาะอุตสาหกรรม',
            titleEn: 'Industry Solutions',
            descTh: 'เปิดสายบริการสินเชื่อเครื่องมือแพทย์และยานพาหนะขนส่งเชิงพาณิชย์',
            descEn: 'Launched medical tech & commercial logistics fleet financing lines',
        },
        {
            year: '2021',
            titleTh: 'ริเริ่ม Green & ESG Financing',
            titleEn: 'Green Loan Transition',
            descTh: 'บุกเบิกสินเชื่อพลังงานสะอาด โซลาร์เซลล์โรงงาน และระบบลดการปล่อยคาร์บอน',
            descEn: 'Pioneered industrial solar rooftop & ESG clean energy loans',
        },
        {
            year: '2024 - 2026',
            titleTh: 'สินทรัพย์กว่า 2.5 หมื่นล้านบาท',
            titleEn: '฿25B+ Assets & Leadership',
            descTh: 'ก้าวสู่ผู้นำด้านสินเชื่อและโซลูชันเงินทุนที่ได้รับความไว้วางใจสูงสุดในไทย',
            descEn: 'Top-tier non-bank equipment financing institution trusted by 5,000+ companies',
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Top Sub-Hero Banner (About Us Header) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Graphic */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets About Us"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-down">
                            {/* Breadcrumb Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/30 text-xs font-semibold text-sky-400 mb-5 shadow-lg">
                                <Link to="/" className="hover:text-white transition-colors">
                                    {lang === 'th' ? 'หน้าหลัก' : 'Home'}
                                </Link>
                                <span className="opacity-50">/</span>
                                <span className="text-white font-bold">{lang === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 font-sans drop-shadow-2xl">
                                ABOUT US
                            </h1>
                            <p className="text-sm sm:text-lg text-sky-200/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                                {lang === 'th'
                                    ? 'สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างมั่นคงและยั่งยืนของภาคธุรกิจไทย'
                                    : 'Bridging financial possibilities to drive tangible and resilient industrial growth across Thailand.'}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ABOUT US Overview & 5 Core Pillars ─── */}
                <section className="py-16 lg:py-20 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-10">
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    ABOUT US
                                </h2>
                                <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full mb-6" />
                            </div>
                        </ScrollReveal>

                        {/* Top Announcement Highlight Bar */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-2xl p-4 sm:p-5 bg-sky-500/10 border border-sky-500/25 text-center mb-10 shadow-sm">
                                <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-300 leading-relaxed">
                                    {lang === 'th'
                                        ? '✨ บริษัท อาจิไลท์ แอสเซทส์ จำกัด ให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม ยานพาหนะเชิงพาณิชย์ เครื่องมือแพทย์ และสินเชื่อหมุนเวียนธุรกิจครบวงจร'
                                        : '✨ Agile Assets Co., Ltd. provides comprehensive industrial machinery leasing, commercial fleet, medical equipment, and working capital solutions.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Paragraphs Story */}
                        <ScrollReveal animation="fade-up" delay={150}>
                            <div className="max-w-4xl mx-auto space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed mb-14 text-center">
                                <p>
                                    {lang === 'th'
                                        ? 'อาจิไลท์ แอสเซทส์ ก่อตั้งขึ้นโดยกลุ่มผู้บริหารและวิศวกรที่มีประสบการณ์ยาวนานในแวดวงเครื่องจักรอุตสาหกรรมและตลาดการเงิน เราเข้าใจดีว่า “เครื่องจักรและเทคโนโลยี” คือหัวใจสำคัญของขีดความสามารถในการแข่งขันของภาคการผลิตไทย แต่ข้อจำกัดด้านเงินทุนมักเป็นอุปสรรคสำคัญที่ทำให้ผู้ประกอบการไม่สามารถขยายงานได้ตามศักยภาพ'
                                        : 'Agile Assets was established by seasoned executives and engineers with profound expertise in industrial technology and financial markets. We understand that modern equipment is the lifeblood of competitive manufacturing, yet capital constraints frequently bottleneck growth.'}
                                </p>
                                <p>
                                    {lang === 'th'
                                        ? 'เราจึงมุ่งมั่นทำหน้าที่เป็น “พันธมิตรทางการเงินที่เข้าใจวิศวกรรม” ออกแบบโครงสร้างสินเชื่อที่ยืดหยุ่น รวดเร็ว และตอบโจทย์สภาพคล่องอย่างแท้จริง เพื่อเป็นกำลังสำคัญในการผลักดันให้ธุรกิจไทยเติบโตอย่างมั่นคง'
                                        : 'We are dedicated to being the "Engineering-Minded Financial Partner", structuring agile, fast, and bespoke capital models that empower Thai enterprises to scale with confidence.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 5 Core Pillars Grid */}
                        <div className="text-center mb-8">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans">
                                {lang === 'th' ? '5 จุดเด่นที่ทำให้เราแตกต่างและได้รับความไว้วางใจ' : '5 Key Strengths That Set Us Apart'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {corePillars.map((pillar, idx) => (
                                <ScrollReveal
                                    key={idx}
                                    animation="fade-up"
                                    delay={idx * 100}
                                    className="flex flex-col h-full"
                                >
                                    <div
                                        className={`rounded-2xl p-5 text-center flex flex-col items-center justify-between h-full border transition-all duration-300 ${
                                            isDark
                                                ? 'bg-slate-900/70 border-sky-500/20 hover:border-sky-400 hover:bg-slate-900'
                                                : 'bg-white border-slate-200 hover:border-sky-400 shadow-md hover:shadow-xl'
                                        }`}
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-3">
                                            <pillar.icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground mb-1.5 font-sans">
                                            {lang === 'th' ? pillar.titleTh : pillar.titleEn}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground leading-snug">
                                            {lang === 'th' ? pillar.descTh : pillar.descEn}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 3. Deep Navy Engineering Roots Feature Box ─── */}
                <section className="py-16 lg:py-20 relative overflow-hidden bg-slate-950 text-white">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 opacity-90" />
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Text Story */}
                            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Engineering Roots • รากฐานวิศวกรรม</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans leading-snug text-white">
                                    {lang === 'th'
                                        ? 'จากความเข้าใจในเครื่องจักร สู่โซลูชันการเงินที่ตอบโจทย์โรงงานจริง'
                                        : 'Deep Machinery Knowledge Powering Real-World Industrial Capital'}
                                </h2>

                                <div className="pl-4 border-l-2 border-sky-400">
                                    <p className="text-sm sm:text-base font-semibold text-sky-200 leading-relaxed italic">
                                        {lang === 'th'
                                            ? '“เราไม่ได้มองเครื่องจักรเป็นเพียงหลักประกัน แต่มองเป็นเครื่องยนต์ขับเคลื่อนความมั่งคั่งของภาคธุรกิจ”'
                                            : '“We view machinery not merely as collateral, but as the core engine powering industrial wealth.”'}
                                    </p>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                                    {lang === 'th'
                                        ? 'ด้วยทีมงานที่มีรากฐานจากวิศวกรรมอุตสาหการ เราจึงมีความสามารถในการประเมินประสิทธิภาพเครื่องจักร รอบอายุการใช้งาน และผลตอบแทนจากการลงทุน (ROI) ได้อย่างแม่นยำ ทำให้เราสามารถอนุมัติวงเงินที่สูงกว่า และเสนอเงื่อนไขที่ตรงจุดกว่าสถาบันการเงินทั่วไป'
                                        : 'With our engineering heritage, we accurately assess equipment lifecycle, production efficiency, and ROI dynamics—enabling higher credit lines and far more tailored structures than traditional lenders.'}
                                </p>
                            </ScrollReveal>

                            {/* Right Image */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-6">
                                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-sky-400/30 shadow-2xl relative group">
                                    <img
                                        src={storyOriginImg}
                                        alt="Agile Assets Engineering Team"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                                        <p className="text-white font-bold text-sm">
                                            {lang === 'th' ? 'วิศวกรผู้เชี่ยวชาญตรวจประเมินหน้างานจริง' : 'On-site Industrial Machinery Inspection'}
                                        </p>
                                        <p className="text-sky-300 text-xs mt-0.5">
                                            {lang === 'th' ? 'รองรับเครื่องจักรอุตสาหกรรมหนักทุกประเภท' : 'Supporting all types of heavy machinery & production lines'}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* ─── 4. Company History (ไทม์ไลน์ประวัติองค์กร) ─── */}
                <section className="py-16 lg:py-20 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-3">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Milestones</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                                    Company History
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {lang === 'th'
                                        ? 'เส้นทางการเติบโตและพัฒนาการตลอดกว่า 16 ปีแห่งความเชี่ยวชาญ'
                                        : 'Our 16-year trajectory of growth, trust, and industrial empowerment'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Horizontal Milestones Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {milestones.map((m, idx) => (
                                <ScrollReveal
                                    key={m.year}
                                    animation="fade-up"
                                    delay={idx * 120}
                                    className="flex flex-col h-full"
                                >
                                    <div
                                        className={`rounded-2xl p-6 flex flex-col justify-between h-full border transition-all duration-300 ${
                                            isDark
                                                ? 'bg-slate-900/70 border-sky-500/20 hover:border-sky-400'
                                                : 'bg-white border-slate-200 hover:border-sky-400 shadow-md hover:shadow-xl'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-2xl sm:text-3xl font-black text-sky-500 font-sans">
                                                    {m.year}
                                                </span>
                                                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                                            </div>
                                            <h3 className="text-base font-bold text-foreground mb-2 font-sans">
                                                {lang === 'th' ? m.titleTh : m.titleEn}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed mt-2 pt-3 border-t border-border/60">
                                            {lang === 'th' ? m.descTh : m.descEn}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 5. OUR MISSION & VISION & CHANGE ASSETS INTO PROFITS ─── */}
                <section className="py-16 lg:py-20 relative overflow-hidden bg-slate-900/40 border-y border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    OUR MISSION & VISION
                                </h2>
                                <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full" />
                            </div>
                        </ScrollReveal>

                        {/* Top: Mission & Vision 2-Column Showcase */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
                            <ScrollReveal animation="fade-right" className="lg:col-span-5">
                                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-sky-500/20">
                                    <img
                                        src={storyMachineryImg}
                                        alt="Mission & Vision Collaboration"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 space-y-6">
                                {/* Mission */}
                                <div
                                    className={`rounded-2xl p-6 border ${
                                        isDark
                                            ? 'bg-slate-900/80 border-sky-500/30'
                                            : 'bg-white border-slate-200 shadow-md'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                                            M
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans">
                                            {lang === 'th' ? 'พันธกิจ (Our Mission)' : 'Our Mission'}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'th'
                                            ? 'มุ่งมั่นสร้างสะพานเชื่อมโอกาสทางการเงินแก่ผู้ประกอบการไทย ด้วยความเข้าใจทางวิศวกรรม เพื่อปลดล็อกศักยภาพการผลิตและผลักดันธุรกิจให้เติบโตอย่างยั่งยืน'
                                            : 'Committed to delivering accessible, engineering-driven financing solutions that unlock production potential and propel Thai businesses to sustainable prosperity.'}
                                    </p>
                                </div>

                                {/* Vision */}
                                <div
                                    className={`rounded-2xl p-6 border ${
                                        isDark
                                            ? 'bg-slate-900/80 border-sky-500/30'
                                            : 'bg-white border-slate-200 shadow-md'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                                            V
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans">
                                            {lang === 'th' ? 'วิสัยทัศน์ (Our Vision)' : 'Our Vision'}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'th'
                                            ? 'เป็นผู้นำด้านสินเชื่อเครื่องจักรอุตสาหกรรมและโซลูชันเงินทุนที่ได้รับความไว้วางใจสูงสุดในภูมิภาค เคียงข้างทุกก้าวการเติบโตของภาคอุตสาหกรรม'
                                            : 'To be the most trusted non-bank equipment financing and capital partner in Southeast Asia, standing beside every industrial success story.'}
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Graphic Card: CHANGE ASSETS INTO PROFITS & Categories */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* Left Graphic Banner Card */}
                            <ScrollReveal animation="zoom-in" className="lg:col-span-5 flex flex-col h-full">
                                <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border border-sky-400/30 shadow-2xl flex flex-col justify-between relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                                    <div>
                                        <span className="text-4xl sm:text-6xl font-black text-amber-400/30 font-sans block mb-2">
                                            A
                                        </span>
                                        <h3 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-sans text-white leading-none mb-1">
                                            CHANGE
                                        </h3>
                                        <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-sans text-sky-400 leading-none mb-2">
                                            ASSETS
                                        </h3>
                                        <p className="text-sm font-light text-slate-300 tracking-widest uppercase mb-1">
                                            into
                                        </p>
                                        <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-sans text-amber-400 leading-none">
                                            PROFITS
                                        </h3>
                                    </div>

                                    <div className="pt-8 mt-8 border-t border-white/15">
                                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                                            {lang === 'th'
                                                ? 'เปลี่ยนเครื่องจักรและสินทรัพย์เป็นพลังสร้างผลกำไรและกระแสเงินสดหมุนเวียนอย่างต่อเนื่อง'
                                                : 'Transform your machinery and industrial capital into enduring cash flow and operating profits.'}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Right 3 Product Category Photo Cards */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 flex flex-col justify-between">
                                <div className="space-y-3 mb-4">
                                    <h3 className="text-lg font-bold text-foreground font-sans">
                                        {lang === 'th' ? 'หมวดหมู่เครื่องจักรและอุปกรณ์ที่รองรับ' : 'Categories of Machinery & Equipment'}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === 'th' ? 'ครอบคลุมทุกกลุ่มอุตสาหกรรมการผลิตหลักของประเทศ' : 'Covering core manufacturing, logistics and clean technology'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                                    {/* 1. CNC & Industrial */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80"
                                            alt="Industrial Machinery"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Building2 className="w-5 h-5 text-sky-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {lang === 'th' ? 'เครื่องจักรอุตสาหกรรม' : 'CNC & Machinery'}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {lang === 'th' ? 'CNC, Robot, เครื่องฉีดพลาสติก' : 'Machining, Robotics'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. Solar & Clean Tech */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80"
                                            alt="Solar Clean Energy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Sun className="w-5 h-5 text-amber-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {lang === 'th' ? 'พลังงานสะอาด & Solar' : 'Solar & ESG Tech'}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {lang === 'th' ? 'Solar Rooftop, BESS' : 'Commercial Solar, Storage'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3. Logistics & Fleet */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80"
                                            alt="Commercial Fleet"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Truck className="w-5 h-5 text-emerald-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {lang === 'th' ? 'ยานพาหนะขนส่ง' : 'Commercial Fleet'}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {lang === 'th' ? 'รถบรรทุก, หัวลาก EV' : 'Prime movers, EV trucks'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* ─── 6. ADVISORY BOARD PROFILES & EXECUTIVE TEAM ─── */}
                <section className="py-16 lg:py-24 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-3">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>Leadership & Governance</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    ADVISORY BOARD PROFILES
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {lang === 'th'
                                        ? 'คณะกรรมการที่ปรึกษาและทีมผู้บริหารผู้ขับเคลื่อนองค์กรด้วยหลักธรรมาภิบาลและความเชี่ยวชาญ'
                                        : 'Advisory board and senior executive team steering Agile Assets with visionary governance.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Top: Advisory Board Chairman Card */}
                        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto mb-20">
                            <div
                                className={`rounded-3xl p-8 sm:p-10 text-center border relative overflow-hidden shadow-xl transition-all duration-300 ${
                                    isDark
                                        ? 'bg-slate-900/80 border-sky-500/25'
                                        : 'bg-white border-slate-200 shadow-slate-200/80'
                                }`}
                            >
                                {/* Circle Headshot */}
                                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden mx-auto mb-6 border-4 border-sky-400/60 shadow-xl">
                                    <img
                                        src={advisorChairmanImg}
                                        alt="Chairman of Advisory Board"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-sans mb-1">
                                    {lang === 'th' ? 'คุณประเสริฐ ชัยประเสริฐกิจ' : 'Mr. Prasert Chaiprasertkit'}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-sky-500 uppercase tracking-wider mb-4">
                                    {lang === 'th' ? 'ประธานคณะกรรมการที่ปรึกษา (Chairman of the Advisory Board)' : 'Chairman of the Advisory Board'}
                                </p>

                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                                    {lang === 'th'
                                        ? 'อดีตผู้บริหารระดับสูงและที่ปรึกษาองค์กรชั้นนำในอุตสาหกรรมการเงินและภาคการผลิต มีประสบการณ์ชี้นำยุทธศาสตร์การเติบโตและการกำกับดูแลกิจการที่ดีกว่า 30 ปี'
                                        : 'Former senior executive and corporate advisor across financial institutions and manufacturing industries, with over 30 years of strategic leadership and governance excellence.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Sub-Header: DIRECTORS PROFILE */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2 font-sans">
                                    DIRECTORS PROFILE
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    {lang === 'th' ? 'ทีมผู้บริหารสายงานกลยุทธ์และการปฏิบัติการ' : 'Executive Leadership & Operational Directors'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Directors 2-Column Cards with Accordions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
                            {/* Director 1 */}
                            <ScrollReveal animation="fade-right" delay={100}>
                                <div
                                    className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                                        isDark
                                            ? 'bg-slate-900/70 border-sky-500/20 shadow-xl'
                                            : 'bg-white border-slate-200 shadow-lg'
                                    }`}
                                >
                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-md flex-shrink-0">
                                            <img
                                                src={directorProfile1Img}
                                                alt="Managing Director"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground font-sans">
                                                {lang === 'th' ? 'คุณศุภชัย เลิศรัตนวิทย์' : 'Mr. Suphachai Lertrattanawit'}
                                            </h4>
                                            <p className="text-xs font-semibold text-sky-500 mt-0.5">
                                                {lang === 'th' ? 'กรรมการผู้จัดการ (Managing Director)' : 'Managing Director'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Trigger */}
                                    <button
                                        onClick={() => toggleDirector('dir-1')}
                                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 font-semibold text-xs transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{lang === 'th' ? 'ดูประวัติและประสบการณ์การทำงาน' : 'View Profile & Experience'}</span>
                                        </span>
                                        {openDirector === 'dir-1' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {/* Accordion Content */}
                                    {openDirector === 'dir-1' && (
                                        <div className="mt-4 pt-4 border-t border-border/60 space-y-3 text-xs text-muted-foreground animate-fade-in">
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{lang === 'th' ? 'การศึกษา' : 'Education'}:</span>
                                                </p>
                                                <p>• M.S. Industrial Engineering, Chulalongkorn University</p>
                                                <p>• B.Eng. Mechanical Engineering, KMUTT</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{lang === 'th' ? 'ประสบการณ์การทำงาน' : 'Key Experience'}:</span>
                                                </p>
                                                <p>• ผู้อำนวยการฝ่ายสินเชื่ออุตสาหกรรม บริษัทการเงินชั้นนำ (10 ปี)</p>
                                                <p>• ที่ปรึกษาการลงทุนเครื่องจักรและเทคโนโลยีการผลิต</p>
                                                <p>• ผู้ร่วมก่อตั้ง Agile Assets Co., Ltd.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            {/* Director 2 */}
                            <ScrollReveal animation="fade-left" delay={150}>
                                <div
                                    className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                                        isDark
                                            ? 'bg-slate-900/70 border-sky-500/20 shadow-xl'
                                            : 'bg-white border-slate-200 shadow-lg'
                                    }`}
                                >
                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-md flex-shrink-0">
                                            <img
                                                src={directorProfile2Img}
                                                alt="Senior Executive Director"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground font-sans">
                                                {lang === 'th' ? 'คุณกฤษดา พงษ์ไพศาล' : 'Mr. Kritsada Pongphaisan'}
                                            </h4>
                                            <p className="text-xs font-semibold text-sky-500 mt-0.5">
                                                {lang === 'th' ? 'รองกรรมการผู้จัดการอาวุโส (Senior Executive Director)' : 'Senior Executive Director'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Trigger */}
                                    <button
                                        onClick={() => toggleDirector('dir-2')}
                                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 font-semibold text-xs transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{lang === 'th' ? 'ดูประวัติและประสบการณ์การทำงาน' : 'View Profile & Experience'}</span>
                                        </span>
                                        {openDirector === 'dir-2' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {/* Accordion Content */}
                                    {openDirector === 'dir-2' && (
                                        <div className="mt-4 pt-4 border-t border-border/60 space-y-3 text-xs text-muted-foreground animate-fade-in">
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{lang === 'th' ? 'การศึกษา' : 'Education'}:</span>
                                                </p>
                                                <p>• Master of Business Administration (MBA - Finance), NIDA</p>
                                                <p>• B.B.A. Finance & Banking, Thammasat University</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{lang === 'th' ? 'ประสบการณ์การทำงาน' : 'Key Experience'}:</span>
                                                </p>
                                                <p>• ผู้เชี่ยวชาญการบริหารความเสี่ยงสินเชื่อธุรกิจ (Credit Underwriting)</p>
                                                <p>• ผู้วางโครงสร้างกองทุนเพื่อความยั่งยืน ESG Green Financing</p>
                                                <p>• กรรมการบริหารสายงานปฏิบัติการ Agile Assets Co., Ltd.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* ─── 7. Bottom CTA Strip ─── */}
                <section className="py-16 relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white">
                    <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 font-sans text-white">
                                {lang === 'th'
                                    ? 'พร้อมเติบโตและขยายกำลังการผลิตไปกับ Agile Assets หรือยัง?'
                                    : 'Ready to Scale Your Production with Agile Assets?'}
                            </h2>
                            <p className="text-xs sm:text-base text-sky-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                                {lang === 'th'
                                    ? 'ปรึกษาทีมผู้เชี่ยวชาญด้านสินเชื่อเครื่องจักรเพื่อรับโครงสร้างวงเงินที่ดีที่สุดสำหรับกิจการของคุณ'
                                    : 'Consult our equipment financing specialists today for the most optimal credit structure.'}
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={() => navigate('/#contact')}
                                    className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl hover:scale-105 active:scale-[0.98] transition-all"
                                >
                                    <span>{lang === 'th' ? 'ปรึกษาผู้เชี่ยวชาญ' : 'Consult Our Team'}</span>
                                </button>
                                <button
                                    onClick={() => navigate('/#calculator')}
                                    className="px-8 py-4 rounded-2xl bg-sky-700/60 hover:bg-sky-700 text-white font-bold text-sm border border-white/30 backdrop-blur-md hover:scale-105 active:scale-[0.98] transition-all"
                                >
                                    <span>{lang === 'th' ? 'คำนวณค่างวดสินเชื่อ' : 'Calculate Loan'}</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
