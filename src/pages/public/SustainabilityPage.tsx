import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Droplets, ArrowRight, CheckCircle2, Leaf, Factory, Send, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useSections } from '@/lib/pageSections';
import { sustainabilitySections } from '@/data/pageSections/sustainability';
import { SectionIcon } from '@/lib/sectionIcons';

// Project Image Carousel with Auto-Slide & Manual Controls
function ProjectImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3.5 seconds
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [images]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full md:w-72 lg:w-80 h-56 sm:h-60 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg bg-slate-900 group">
            {/* Images */}
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img
                        src={img}
                        alt={`${title} - ${idx + 1}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                                'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Slide"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:scale-110 shadow-md"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Slide"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:scale-110 shadow-md"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </>
            )}

            {/* Slide Indicators / Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? 'w-5 h-1.5 bg-sky-400'
                                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function SustainabilityPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('sustainability', DEFAULT_PAGE_CONTENTS['sustainability']);
    const section = useSections(content, sustainabilitySections);
    const heroExtras = section('hero-extras');
    const waterCrisis = section('water-crisis');
    const whoWeAre = section('who-we-are');
    const solutions = section('solutions');
    const projects = section('projects');
    const inquiry = section('inquiry');
    const [submitting, setSubmitting] = useState(false);
    const { send, guardFields } = useLeadSubmit();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        projectType: 'solar_water',
        note: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อและเบอร์โทรศัพท์' : 'Please provide your name and phone number');
            return;
        }

        setSubmitting(true);
        const result = await send((meta) =>
            formService.submitInquiry({
                source: 'sustainability',
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                company: formData.company,
                message: formData.note,
                projectType: formData.projectType,
            }, meta)
        );
        setSubmitting(false);
        if (!result) return;
        setSubmitted(true);
        toast.success(
            lang === 'th'
                ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายความยั่งยืนจะติดต่อกลับโดยเร็วที่สุด'
                : 'Inquiry submitted successfully! Our Sustainability team will contact you shortly.'
        );
    };

    const scrollToProjects = () => {
        const el = document.querySelector('#sustainability-projects');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToForm = () => {
        const el = document.querySelector('#sustainability-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = content.metaTitle || (lang === 'th'
        ? 'กลยุทธ์และการพัฒนาความยั่งยืน (Sustainability Strategy) | Agile Assets'
        : 'Sustainability Strategy & ESG Development | Agile Assets');
    const description = content.metaDescription || (lang === 'th'
        ? 'กลยุทธ์และการพัฒนาความยั่งยืนของ Agile Assets - สินเชื่อโรงงานน้ำดื่ม พลังงานโซลาร์เซลล์ และเศรษฐกิจหมุนเวียนเพื่อชุมชนและสิ่งแวดล้อม'
        : 'Agile Assets Sustainability Strategy - Clean water financing, solar PV integration, circular economy, and community empowerment.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/sustainability/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Consistent min-h-[96vh] Container Height) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12">
                    {/* Background: Sustainability & Global Green Innovation */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=85"}
                            alt="Agile Assets Sustainability Strategy"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in opacity-90"
                            loading="eager"
                        />
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/80 to-slate-950/70" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/80" />
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-teal-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
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
                                    <Leaf className="w-3.5 h-3.5" />
                                </div>
                                <span>{lang === 'th' ? (content.heroBadgeTh || 'ESG & Sustainability Strategy • ความยั่งยืน') : (content.heroBadgeEn || 'ESG & Sustainability Strategy')}</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'กลยุทธ์และการพัฒนาความยั่งยืน') : (content.heroTitleEn || content.heroTitleTh || 'Sustainability Strategy & ESG')}
                            </h1>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn || 'ความมุ่งมั่นและความตั้งใจของเรา') : (content.heroSubtitleEn || content.heroSubtitleTh || 'Our Dedication to Sustainable Enterprise & Green Energy')}
                            </p>

                            {/* CTA Buttons */}
                            {!heroExtras.hidden && (<div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={scrollToProjects}
                                    className="btn-dynamic-theme inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <span>{heroExtras.t('t01')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.03]"
                                >
                                    <span>{heroExtras.t('t02')}</span>
                                </button>
                            </div>)}
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ปัญหาของการบริโภคน้ำไม่สะอาด (Clean Water Crisis) ─── */}
                {!waterCrisis.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-red-600 dark:text-red-500 tracking-tight font-sans mb-3">
                                    {waterCrisis.t('t01')}
                                </h2>
                                <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
                                    {waterCrisis.t('t02')}
                                </p>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400">
                                    {waterCrisis.t('t03')}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 4 Circular Image Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {waterCrisis.items.map((item, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="rounded-3xl p-6 bg-card text-card-foreground border border-border shadow-lg hover:shadow-xl hover:border-red-500/40 transition-all duration-300 flex flex-col items-center text-center group h-full">
                                        {/* Circular Image */}
                                        <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={item.t('image')}
                                                alt={item.t('title')}
                                                className="w-full h-full object-cover object-center"
                                                loading="lazy"
                                            />
                                        </div>
                                        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                                            {item.t('title')}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {item.t('desc')}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 3. เราเป็นใคร (Who We Are - Agile Corporate Deep Blue) ─── */}
                {!whoWeAre.hidden && (<section className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans mb-2">
                                    {whoWeAre.t('t01')}
                                </h2>
                                <p className="text-xl sm:text-2xl font-bold text-sky-300 font-sans">
                                    {whoWeAre.t('t02')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Top: Image + Corporate Description */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                            <div className="lg:col-span-5">
                                <ScrollReveal animation="fade-right">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
                                        <img
                                            src={whoWeAre.t('img03')}
                                            alt="Agile Assets Clean Water Engineering"
                                            className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>

                            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                <ScrollReveal animation="fade-left">
                                    <p>
                                        {whoWeAre.t('t04')}
                                    </p>
                                    <p>
                                        {whoWeAre.t('t05')}
                                    </p>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* Bottom: เราทำอะไร (What We Do) */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {whoWeAre.t('t06')}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                                        <Factory className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-2">
                                        {whoWeAre.t('t07')}
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        {whoWeAre.t('t08')}
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                                        <Droplets className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-2">
                                        {whoWeAre.t('t09')}
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        {whoWeAre.t('t10')}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={scrollToProjects}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                                >
                                    <span>{whoWeAre.t('t11')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 4. โซลูชั่นของเรา (Our Solutions - Clean Light/Glass) ─── */}
                {!solutions.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans mb-3">
                                    {solutions.t('t01')}
                                </h2>
                                <p className="text-base sm:text-lg font-semibold text-sky-600 dark:text-sky-400 mb-4">
                                    {solutions.t('t02')}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                    {solutions.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 3 Solution Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {solutions.items.map((item, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                                    <div className="rounded-2xl p-6 bg-card text-card-foreground border border-border shadow-md text-center flex flex-col items-center justify-center h-full">
                                        <div className={`w-14 h-14 rounded-2xl ${item.t('color')} border flex items-center justify-center mb-3`}>
                                            <SectionIcon name={item.raw.icon} className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xs sm:text-sm font-bold text-foreground">
                                            {item.t('title')}
                                        </h3>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* ─── 5. โครงการด้านความยั่งยืนของเรา (Our Sustainability Projects) ─── */}
                {!projects.hidden && (<section id="sustainability-projects" className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans mb-3">
                                    {projects.t('t01')}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300">
                                    {projects.t('t02')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 3 Horizontal Project Cards */}
                        <div className="space-y-6 max-w-5xl mx-auto mb-12">
                            {projects.items.map((p, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                                    <div className="rounded-3xl p-6 sm:p-8 bg-white text-slate-900 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                                        {/* Project Images Auto Carousel */}
                                        <ProjectImageCarousel
                                            images={p.lines('images')}
                                            title={p.t('title')}
                                        />

                                        {/* Project Details */}
                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-base sm:text-lg font-bold text-sky-700">
                                                {p.t('title')}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {p.t('desc')}
                                            </p>

                                            <div className="pt-2 border-t border-slate-100">
                                                <p className="text-xs font-bold text-emerald-700 mb-1.5 flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                    <span>{p.t('impactTitle')}</span>
                                                </p>
                                                <div className="space-y-1">
                                                    {(p.lines('stats')).map((st, si) => (
                                                        <p key={si} className="text-xs font-semibold text-slate-700">
                                                            {st}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Partner With Us Button */}
                        <div className="text-center">
                            <button
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:scale-105 transition-all"
                            >
                                <span>{projects.t('t03')}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>)}

                {/* ─── 6. Sustainability Partnership Inquiry Form ─── */}
                {!inquiry.hidden && (<section id="sustainability-form" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={inquiry.t('img01')}
                            alt="Sustainability Partnership Form"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase font-sans mb-3">
                                    {inquiry.t('t02')}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {inquiry.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Form Card */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900/95 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-400/40">
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
                                                setFormData({ name: '', phone: '', email: '', company: '', projectType: 'solar_water', note: '' });
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
                                                <label htmlFor="sustainability-field-1" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t07')}
                                                </label>
                                                <input id="sustainability-field-1"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={inquiry.t('t08')}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="sustainability-field-2" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t09')}
                                                </label>
                                                <input id="sustainability-field-2"
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
                                                <label htmlFor="sustainability-field-3" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t10')}
                                                </label>
                                                <input id="sustainability-field-3"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="sustainability-field-4" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {inquiry.t('t11')}
                                                </label>
                                                <input id="sustainability-field-4"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={inquiry.t('t12')}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="sustainability-field-5" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {inquiry.t('t13')}
                                            </label>
                                            <select id="sustainability-field-5"
                                                value={formData.projectType}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                            >
                                                <option value="solar_water">{inquiry.t('t14')}</option>
                                                <option value="solar_pv">{inquiry.t('t15')}</option>
                                                <option value="rpet_packaging">{inquiry.t('t16')}</option>
                                                <option value="other_esg">{inquiry.t('t17')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="sustainability-field-6" className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {inquiry.t('t18')}
                                            </label>
                                            <textarea id="sustainability-field-6"
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
