import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Droplets, DollarSign, ArrowRight, Send, Download, ShieldCheck, FileText, Check } from 'lucide-react';
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
import { drinkingWaterSections } from '@/data/pageSections/drinkingWater';

export function DrinkingWaterPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('drinking-water', DEFAULT_PAGE_CONTENTS['drinking-water']);
    const section = useSections(content, drinkingWaterSections);
    const showcase = section('showcase');
    const extra = section('extra');
    const inquiry = section('inquiry');

    const [submitting, setSubmitting] = useState(false);
    const { send, guardFields } = useLeadSubmit();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        note: '',
    });

    const machines = [
        {
            id: 1,
            titleTh: 'เครื่องเป่าขวด',
            titleEn: 'PET Bottle Blow Molding Machine',
            descTh: 'ใช้ในการขึ้นรูปขวดพลาสติกจาก Preform เพื่อให้ได้ขวดที่ได้มาตรฐาน รองรับการผลิตปริมาณสูง',
            descEn: 'High-speed automated PET bottle blow molding system from preforms for consistent, food-grade bottle production.',
            image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80',
            badge: 'ความเร็วสูง / High Speed',
        },
        {
            id: 2,
            titleTh: 'เครื่องบรรจุน้ำ',
            titleEn: 'Automatic Water Bottling Machine',
            descTh: 'ใช้ในการบรรจุน้ำลงขวดด้วยความแม่นยำ เพื่อควบคุมปริมาณ ความสะอาด และกระบวนการผลิต',
            descEn: 'Precision 3-in-1 monoblock rotary rinsing, filling, and capping system ensuring hygienic packaging.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            badge: 'ระบบ 3-in-1 อัตโนมัติ',
        },
        {
            id: '3',
            titleTh: 'เครื่องสวมฉลาก',
            titleEn: 'Automatic Sleeve Labeling Machine',
            descTh: 'ใช้ในการติดฉลากลงบนขวดหรือบรรจุภัณฑ์อัตโนมัติ เพื่อให้ตำแหน่งถูกต้อง สม่ำเสมอ และสินค้าเป็นมาตรฐาน',
            descEn: 'High-precision automated shrink sleeve labeling and positioning machine for all bottle shapes.',
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80',
            badge: 'ตำแหน่งแม่นยำ 100%',
        },
        {
            id: 4,
            titleTh: 'เครื่องซีนและอบร้อน',
            titleEn: 'Cap Sealing & Shrink Tunnel',
            descTh: 'ใช้ในการซีลฝาและหุ้มฟิล์มสินค้า เพื่อป้องกันการรั่วซึมและเพิ่มความปลอดภัยของผลิตภัณฑ์',
            descEn: 'Steam/electric heat shrink tunnel for tamper-evident cap sealing and bundle wrap packaging.',
            image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80',
            badge: 'ซีลสุญญากาศมาตรฐาน อย.',
        },
        {
            id: 5,
            titleTh: 'ชุดปั้มลม (Air Compressor)',
            titleEn: 'High-Pressure Air Compressor',
            descTh: 'ใช้จ่ายลมให้กับเครื่องจักรในสายการผลิต เพื่อรองรับการทำงานอย่างต่อเนื่องและมีประสิทธิภาพ',
            descEn: 'Industrial oil-free screw air compressor supplying continuous pneumatic power to bottling lines.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            badge: 'ลมสะอาด Oil-Free',
        },
        {
            id: 6,
            titleTh: 'เครื่องปั้มวันที่',
            titleEn: 'Inkjet / Laser Date Coding Printer',
            descTh: 'ใช้พิมพ์วันผลิตและวันหมดอายุบนสินค้า เพื่อความถูกต้องและเป็นไปตามมาตรฐาน',
            descEn: 'Continuous inkjet / laser marking for real-time batch numbers, MFG, and EXP date printing.',
            image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80',
            badge: 'พิมพ์คมชัด รวดเร็ว',
        },
        {
            id: 7,
            titleTh: 'ระบบกรองน้ำ RO',
            titleEn: 'RO Water Purification System',
            descTh: 'ใช้ในการกรองและปรับคุณภาพน้ำ เพื่อให้ได้น้ำที่สะอาด ปลอดภัย และได้มาตรฐาน',
            descEn: 'Multi-stage Reverse Osmosis & UV sterilization system guaranteeing ultra-pure drinking water.',
            image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80',
            badge: 'มาตรฐานสากล GMP / อย.',
        },
        {
            id: 8,
            titleTh: 'ระบบสายพานลำเลียง',
            titleEn: 'Automated Conveyor System',
            descTh: 'ใช้ในการลำเลียงสินค้าในสายการผลิต เพิ่มความต่อเนื่อง ลดแรงงาน และเพิ่มประสิทธิภาพการผลิต',
            descEn: 'Stainless steel modular belt conveyor network connecting all manufacturing stages seamlessly.',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
            badge: 'สเตนเลส SUS304',
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
                source: 'drinking-water-production',
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                company: formData.company,
                message: formData.note,
            }, meta)
        );
        setSubmitting(false);
        if (!result) return;
        setSubmitted(true);
        toast.success(
            lang === 'th'
                ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายสินเชื่อจะติดต่อกลับภายใน 24 ชั่วโมง'
                : 'Inquiry submitted successfully! Our financing specialist will contact you within 24 hours.'
        );
    };

    const scrollToForm = () => {
        const el = document.querySelector('#inquiry-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const requestDocument = (docName: string) => {
        const note = lang === 'th' ? `ขอรับเอกสาร: ${docName}` : `Requesting document: ${docName}`;
        setFormData((prev) => ({ ...prev, note: prev.note ? `${prev.note}\n${note}` : note }));
        toast(lang === 'th' ? 'กรอกชื่อและเบอร์โทร แล้วเจ้าหน้าที่จะส่งเอกสารให้ทางอีเมล' : 'Leave your name and phone and we will email you the document.');
        scrollToForm();
    };

    const title = content.metaTitle || (lang === 'th'
        ? 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม (Drinking Water Production) | Agile Assets'
        : 'Drinking Water Production Line Financing | Agile Assets');
    const description = content.metaDescription || (lang === 'th'
        ? 'Agile Assets บริการสินเชื่อเช่าซื้อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม เช่าซื้อเครื่องเป่าขวด เครื่องบรรจุน้ำดื่ม เครื่องสวมฉลาก และระบบกรองน้ำ RO'
        : 'Agile Assets provides comprehensive machinery hire-purchase financing for drinking water production lines, blow molding, filling, and RO systems.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/drinking-water-production/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Full Size as Home Page: min-h-[96vh]) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Unique Drinking Water Bottling Plant Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1920&q=85"}
                            alt="Drinking Water Production Line"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                            fetchPriority="high"
                            width={1920}
                            height={1080}
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/75 to-slate-950/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/75" />
                    </div>

                    {/* Glowing Ambient Lightings */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

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
                                    <Droplets className="w-3.5 h-3.5" />
                                </div>
                                <span>{lang === 'th' ? (content.heroBadgeTh || 'Financing Service • Industry Solutions') : (content.heroBadgeEn || 'Financing Service • Industry Solutions')}</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม') : (content.heroTitleEn || content.heroTitleTh || 'Drinking Water Production')}
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? (content.heroSubtitleTh || 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม') : (content.heroSubtitleEn || 'Machinery & Turnkey Line Financing')}
                            </p>

                            {/* CTA Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 btn-dynamic-theme"
                                >
                                    <DollarSign className="w-5 h-5" />
                                    <span>{lang === 'th' ? (content.ctaTextTh || 'ขอสินเชื่อกับเรา') : (content.ctaTextEn || 'Financing with Us')}</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Machinery Showcase (8 Machines Grid) ─── */}
                {!showcase.hidden && (<section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    {showcase.t('t01')}
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 font-sans">
                                    {showcase.t('t02')}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {showcase.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 8 Machinery Cards Grid (4 columns on desktop, exactly like the original site) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
                            {((content.items && content.items.length > 0)
                                ? content.items.map((item) => ({
                                    id: item.id,
                                    titleTh: item.title,
                                    titleEn: item.titleEn || item.title,
                                    descTh: item.description,
                                    descEn: item.descEn || item.description,
                                    image: item.image || 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80',
                                    badge: item.badge || 'เครื่องจักรมาตรฐาน',
                                }))
                                : machines
                            ).map((m, idx) => (
                                <ScrollReveal key={m.id} animation="fade-up" delay={idx * 50}>
                                    <div className="glass-card h-full rounded-3xl p-5 sm:p-6 border border-border/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col group">
                                        {/* Machine Image */}
                                        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-slate-900/40 flex items-center justify-center">
                                            <img
                                                src={m.image}
                                                alt={m.titleTh}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-sky-300">
                                                {m.badge}
                                            </div>
                                        </div>

                                        {/* Titles & Descriptions */}
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="text-lg font-extrabold text-foreground mb-1 group-hover:text-sky-400 transition-colors">
                                                {lang === 'th' ? m.titleTh : m.titleEn}
                                            </h3>
                                            <p className="text-xs font-medium text-sky-500/80 mb-3">
                                                {lang === 'th' ? m.titleEn : m.titleTh}
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                                                {lang === 'th' ? m.descTh : m.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Center CTA Button */}
                        <ScrollReveal animation="zoom-in">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] transition-all duration-200"
                                >
                                    <span>{showcase.t('t04')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 3. Our Clients (ลูกค้าสินเชื่อน้ำดื่มของเรา) ─── */}
                {!extra.hidden && (<section className="py-20 lg:py-28 relative bg-slate-900/30 border-y border-border/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    {extra.t('t01')}
                                </h2>
                                <p className="text-lg font-semibold text-sky-400">
                                    {extra.t('t02')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Client Photo Gallery Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {extra.items.map((c, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="glass-card rounded-2xl overflow-hidden border border-border/80 group hover:border-sky-500/30 transition-all duration-300">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={c.t('image')}
                                                alt={c.t('title')}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-xs font-bold text-foreground mb-1 line-clamp-1">
                                                {c.t('title')}
                                            </h4>
                                            <p className="text-[11px] text-muted-foreground line-clamp-2">
                                                {c.t('desc')}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Download Catalogues Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                            <a
                                href="#inquiry-form"
                                onClick={(e) => { e.preventDefault(); requestDocument('Company Profile (PDF)'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <Download className="w-3.5 h-3.5 text-sky-400" />
                                <span>{extra.t('t03')}</span>
                            </a>
                            <a
                                href="#inquiry-form"
                                onClick={(e) => { e.preventDefault(); requestDocument('Drinking Water Catalogue (PDF)'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <FileText className="w-3.5 h-3.5 text-sky-400" />
                                <span>{extra.t('t04')}</span>
                            </a>
                            <a
                                href="#inquiry-form"
                                onClick={(e) => { e.preventDefault(); requestDocument('Machinery Leasing Guide (PDF)'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                                <span>{extra.t('t05')}</span>
                            </a>
                        </div>
                    </div>
                </section>)}

                {/* ─── 4. Business Partnership Inquiries Form ─── */}
                {!inquiry.hidden && (<section id="inquiry-form" className="py-20 lg:py-28 relative overflow-hidden">
                    {/* Background Handshake / Corporate Image with Dark Luxury Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={inquiry.t('img01')}
                            alt="Business Partnership"
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
                            <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center border border-sky-400/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {inquiry.t('t04')}
                                        </h3>
                                        <p className="text-xs text-slate-300 max-w-md mx-auto">
                                            {inquiry.t('t05')}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: '', phone: '', email: '', company: '', note: '' });
                                            }}
                                            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                                        >
                                            {inquiry.t('t06')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="drinking-water-field-1" className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {inquiry.t('t07')}
                                                </label>
                                                <input id="drinking-water-field-1"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={inquiry.t('t08')}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="drinking-water-field-2" className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {inquiry.t('t09')}
                                                </label>
                                                <input id="drinking-water-field-2"
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="08X-XXX-XXXX"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="drinking-water-field-3" className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {inquiry.t('t10')}
                                                </label>
                                                <input id="drinking-water-field-3"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="drinking-water-field-4" className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {inquiry.t('t11')}
                                                </label>
                                                <input id="drinking-water-field-4"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={inquiry.t('t12')}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="drinking-water-field-5" className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                {inquiry.t('t13')}
                                            </label>
                                            <textarea id="drinking-water-field-5"
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={inquiry.t('t14')}
                                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
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
                                                        <span>{inquiry.t('t15')}</span>
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
