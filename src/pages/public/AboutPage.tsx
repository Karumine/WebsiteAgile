import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, Building2, Sun, Truck, Sparkles, Briefcase, GraduationCap, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';

// Assets
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import storyOriginImg from '@/assets/story_origin_engineers.png';
import storyMachineryImg from '@/assets/story_machinery_finance.png';
import advisorChairmanImg from '@/assets/advisor_chairman.png';
import directorProfile1Img from '@/assets/director_profile_1.png';
import directorProfile2Img from '@/assets/director_profile_2.png';
import { useSections } from '@/lib/pageSections';
import { aboutSections } from '@/data/pageSections/about';
import { SectionIcon } from '@/lib/sectionIcons';

export function AboutPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('about', DEFAULT_PAGE_CONTENTS['about']);
    const section = useSections(content, aboutSections);
    const overview = section('overview');
    const engineering = section('engineering');
    const history = section('history');
    const mission = section('mission');
    const leadership = section('leadership');
    const ctaStrip = section('cta');
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

    const title = content.metaTitle || (lang === 'en'
        ? 'About Us • Agile Assets | Engineering Roots & Machinery Finance'
        : 'เกี่ยวกับเรา • Agile Assets | รากฐานวิศวกรรมและสินเชื่อเครื่องจักรอุตสาหกรรม');
    const description = content.metaDescription || (lang === 'en'
        ? 'Learn about Agile Assets story, advisory board, executive leadership, 16+ years of history, mission, and industrial leasing capabilities.'
        : 'เรื่องราวของอาจิไลท์ แอสเซทส์ รากฐานทางวิศวกรรม คณะกรรมการที่ปรึกษา ผู้บริหาร วิสัยทัศน์ และประสบการณ์กว่า 16 ปีด้านสินเชื่อเครื่องจักร');

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
                            src={content.heroImage || heroBg}
                            alt="Agile Assets About Us"
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

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                {lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'Agile Assets') : (content.heroBadgeEn || content.heroBadgeTh || 'Agile Assets')}
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 font-sans drop-shadow-2xl">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'ABOUT US') : (content.heroTitleEn || content.heroTitleTh || 'ABOUT US')}
                            </h1>
                            <p className="text-sm sm:text-lg text-sky-200/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                                {lang === 'th'
                                    ? (content.heroSubtitleTh || content.heroSubtitleEn || 'สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างมั่นคงและยั่งยืนของภาคธุรกิจไทย')
                                    : (content.heroSubtitleEn || content.heroSubtitleTh || 'Bridging financial possibilities to drive tangible and resilient industrial growth across Thailand.')}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ABOUT US Overview & 5 Core Pillars ─── */}
                {!overview.hidden && (<section className="py-16 lg:py-20 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-10">
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    {overview.t('t01')}
                                </h2>
                                <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full mb-6" />
                            </div>
                        </ScrollReveal>

                        {/* Top Announcement Highlight Bar */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-2xl p-4 sm:p-5 bg-sky-500/10 border border-sky-500/25 text-center mb-10 shadow-sm">
                                <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-300 leading-relaxed">
                                    {overview.t('t02')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Paragraphs Story */}
                        <ScrollReveal animation="fade-up" delay={150}>
                            <div className="max-w-4xl mx-auto space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed mb-14 text-center">
                                <p>
                                    {overview.t('t03')}
                                </p>
                                <p>
                                    {overview.t('t04')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 5 Core Pillars Grid */}
                        <div className="text-center mb-8">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans">
                                {overview.t('t05')}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {overview.items.map((pillar, idx) => (
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
                                            <SectionIcon name={pillar.raw.icon} className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground mb-1.5 font-sans">
                                            {pillar.t('title')}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground leading-snug">
                                            {pillar.t('desc')}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 3. Deep Navy Engineering Roots Feature Box ─── */}
                {!engineering.hidden && (<section className="py-16 lg:py-20 relative overflow-hidden bg-slate-950 text-white">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 opacity-90" />
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Text Story */}
                            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>{engineering.t('t01')}</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans leading-snug text-white">
                                    {engineering.t('t02')}
                                </h2>

                                <div className="pl-4 border-l-2 border-sky-400">
                                    <p className="text-sm sm:text-base font-semibold text-sky-200 leading-relaxed italic">
                                        {engineering.t('t03')}
                                    </p>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                                    {engineering.t('t04')}
                                </p>
                            </ScrollReveal>

                            {/* Right Image */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-6">
                                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-sky-400/30 shadow-2xl relative group">
                                    <img
                                        src={engineering.t('img05') || storyOriginImg}
                                        alt="Agile Assets Engineering Team"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                                        <p className="text-white font-bold text-sm">
                                            {engineering.t('t06')}
                                        </p>
                                        <p className="text-sky-300 text-xs mt-0.5">
                                            {engineering.t('t07')}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>)}

                {/* ─── 4. Company History (ไทม์ไลน์ประวัติองค์กร) ─── */}
                {!history.hidden && (<section className="py-16 lg:py-20 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-3">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{history.t('t01')}</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                                    {history.t('t02')}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {history.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Horizontal Milestones Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {history.items.map((m, idx) => (
                                <ScrollReveal
                                    key={m.t('year')}
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
                                                    {m.t('year')}
                                                </span>
                                                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                                            </div>
                                            <h3 className="text-base font-bold text-foreground mb-2 font-sans">
                                                {m.t('title')}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed mt-2 pt-3 border-t border-border/60">
                                            {m.t('desc')}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 5. OUR MISSION & VISION & CHANGE ASSETS INTO PROFITS ─── */}
                {!mission.hidden && (<section className="py-16 lg:py-20 relative overflow-hidden bg-slate-900/40 border-y border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    {mission.t('t01')}
                                </h2>
                                <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full" />
                            </div>
                        </ScrollReveal>

                        {/* Top: Mission & Vision 2-Column Showcase */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
                            <ScrollReveal animation="fade-right" className="lg:col-span-5">
                                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-sky-500/20">
                                    <img
                                        src={mission.t('img02') || storyMachineryImg}
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
                                            {mission.t('t03')}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {mission.t('t04')}
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
                                            {mission.t('t05')}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {mission.t('t06')}
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
                                            {mission.t('t07')}
                                        </h3>
                                        <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-sans text-sky-400 leading-none mb-2">
                                            {mission.t('t08')}
                                        </h3>
                                        <p className="text-sm font-light text-slate-300 tracking-widest uppercase mb-1">
                                            {mission.t('t09')}
                                        </p>
                                        <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-sans text-amber-400 leading-none">
                                            {mission.t('t10')}
                                        </h3>
                                    </div>

                                    <div className="pt-8 mt-8 border-t border-white/15">
                                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                                            {mission.t('t11')}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Right 3 Product Category Photo Cards */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 flex flex-col justify-between">
                                <div className="space-y-3 mb-4">
                                    <h3 className="text-lg font-bold text-foreground font-sans">
                                        {mission.t('t12')}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {mission.t('t13')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                                    {/* 1. CNC & Industrial */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src={mission.t('img14')}
                                            alt="Industrial Machinery"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Building2 className="w-5 h-5 text-sky-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {mission.t('t15')}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {mission.t('t16')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. Solar & Clean Tech */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src={mission.t('img17')}
                                            alt="Solar Clean Energy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Sun className="w-5 h-5 text-amber-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {mission.t('t18')}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {mission.t('t19')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3. Logistics & Fleet */}
                                    <div className="rounded-2xl overflow-hidden relative group aspect-[4/5] sm:aspect-auto h-full border border-sky-500/20 shadow-md">
                                        <img
                                            src={mission.t('img20')}
                                            alt="Commercial Fleet"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <Truck className="w-5 h-5 text-emerald-400 mb-1.5" />
                                            <h4 className="text-xs font-bold font-sans">
                                                {mission.t('t21')}
                                            </h4>
                                            <p className="text-[10px] text-slate-300 mt-0.5">
                                                {mission.t('t22')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>)}

                {/* ─── 6. ADVISORY BOARD PROFILES & EXECUTIVE TEAM ─── */}
                {!leadership.hidden && (<section className="py-16 lg:py-24 relative overflow-hidden bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-3">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>{leadership.t('t01')}</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    {leadership.t('t02')}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {leadership.t('t03')}
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
                                        src={leadership.t('img04') || advisorChairmanImg}
                                        alt="Chairman of Advisory Board"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-sans mb-1">
                                    {leadership.t('t05')}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-sky-500 uppercase tracking-wider mb-4">
                                    {leadership.t('t06')}
                                </p>

                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                                    {leadership.t('t07')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Sub-Header: DIRECTORS PROFILE */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2 font-sans">
                                    {leadership.t('t08')}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    {leadership.t('t09')}
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
                                                src={leadership.t('img10') || directorProfile1Img}
                                                alt="Managing Director"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground font-sans">
                                                {leadership.t('t11')}
                                            </h4>
                                            <p className="text-xs font-semibold text-sky-500 mt-0.5">
                                                {leadership.t('t12')}
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
                                            <span>{leadership.t('t13')}</span>
                                        </span>
                                        {openDirector === 'dir-1' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {/* Accordion Content */}
                                    {openDirector === 'dir-1' && (
                                        <div className="mt-4 pt-4 border-t border-border/60 space-y-3 text-xs text-muted-foreground animate-fade-in">
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{leadership.t('t14')}:</span>
                                                </p>
                                                <p>{leadership.t('t15')}</p>
                                                <p>{leadership.t('t16')}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{leadership.t('t17')}:</span>
                                                </p>
                                                <p>{leadership.t('t18')}</p>
                                                <p>{leadership.t('t19')}</p>
                                                <p>{leadership.t('t20')}</p>
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
                                                src={leadership.t('img21') || directorProfile2Img}
                                                alt="Senior Executive Director"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground font-sans">
                                                {leadership.t('t22')}
                                            </h4>
                                            <p className="text-xs font-semibold text-sky-500 mt-0.5">
                                                {leadership.t('t23')}
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
                                            <span>{leadership.t('t13')}</span>
                                        </span>
                                        {openDirector === 'dir-2' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {/* Accordion Content */}
                                    {openDirector === 'dir-2' && (
                                        <div className="mt-4 pt-4 border-t border-border/60 space-y-3 text-xs text-muted-foreground animate-fade-in">
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{leadership.t('t14')}:</span>
                                                </p>
                                                <p>{leadership.t('t24')}</p>
                                                <p>{leadership.t('t25')}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                                                    <span>{leadership.t('t17')}:</span>
                                                </p>
                                                <p>{leadership.t('t26')}</p>
                                                <p>{leadership.t('t27')}</p>
                                                <p>{leadership.t('t28')}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>)}

                {/* ─── 7. Bottom CTA Strip ─── */}
                {!ctaStrip.hidden && (<section className="py-16 relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white">
                    <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 font-sans text-white">
                                {ctaStrip.t('t01')}
                            </h2>
                            <p className="text-xs sm:text-base text-sky-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                                {ctaStrip.t('t02')}
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={() => navigate('/#contact')}
                                    className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl hover:scale-105 active:scale-[0.98] transition-all"
                                >
                                    <span>{ctaStrip.t('t03')}</span>
                                </button>
                                <button
                                    onClick={() => navigate('/#calculator')}
                                    className="px-8 py-4 rounded-2xl bg-sky-700/60 hover:bg-sky-700 text-white font-bold text-sm border border-white/30 backdrop-blur-md hover:scale-105 active:scale-[0.98] transition-all"
                                >
                                    <span>{ctaStrip.t('t04')}</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}
            </main>

            <Footer />
        </div>
    );
}
