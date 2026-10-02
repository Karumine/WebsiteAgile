import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, ChevronLeft, ChevronRight, Send, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { cn } from '@/lib/utils';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import { useSections } from '@/lib/pageSections';
import { usedMachineSections } from '@/data/pageSections/usedMachine';

export function AssetForSalePage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('used-machine', DEFAULT_PAGE_CONTENTS['used-machine']);
    const section = useSections(content, usedMachineSections);
    const heroExtras = section('hero-extras');
    const featured = section('featured');
    const specsSec = section('specs');
    const gallerySec = section('gallery');
    const { settings } = useSiteSettings();
    const machineryList = settings.usedMachinery || [];
    const primaryAsset = machineryList[0];
    const otherAssets = machineryList.slice(1);

    // Featured Machine Gallery slider
    const mainImages = [
        primaryAsset?.image || 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/9522_0.jpg',
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/20250515_111129-scaled.jpg',
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/9525_0.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? mainImages.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === mainImages.length - 1 ? 0 : prev + 1));
    };

    // 3 Secondary Gallery Images
    const secondaryImages = gallerySec.items.map((it) => it.raw.value);

    // Comment Form states
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [authorPhone, setAuthorPhone] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const { send, guardFields } = useLeadSubmit();

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingComment(true);
        const result = await send((meta) =>
            formService.submitInquiry({
                source: 'asset-for-sale',
                name: authorName.trim(),
                email: authorEmail.trim(),
                phone: authorPhone.trim(),
                message: commentText.trim(),
            }, meta)
        );
        setIsSubmittingComment(false);
        if (!result) return;

        toast.success(
            lang === 'th'
                ? 'ส่งคำถามเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด'
                : 'Your inquiry has been sent. Our team will contact you shortly.'
        );
        setCommentText('');
        setAuthorName('');
        setAuthorEmail('');
        setAuthorPhone('');
    };

    const specs = specsSec.items.map((it) => ({ label: it.raw.label, value: it.raw.value }));

    const pageTitle = content.metaTitle || (lang === 'th'
        ? 'Asset for Sale ขายเครื่องจักรมือสอง สินทรัพย์รอการขาย | Agile Assets'
        : 'Asset for Sale | Agile Assets Used Industrial Machinery Auction');
    const pageDescription = content.metaDescription || (lang === 'th'
        ? 'สินทรัพย์รอการขาย ประมูลเครื่องจักรมือสอง คุณภาพดี เครื่องจักรแนะนำที่ไม่ควรพลาด จาก Agile Assets'
        : 'Used industrial equipment and machinery for auction and direct sale from Agile Assets.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/used-machine/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || heroBg}
                            alt="Agile Assets Asset For Sale"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/75 to-slate-950/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/80" />

                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-down">
                            {/* Category Badge */}
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl border bg-slate-950/80 text-xs sm:text-sm font-bold mb-6 shadow-lg"
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
                                    <Tag className="w-3.5 h-3.5" />
                                </div>
                                <span>{(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'Certified Pre-Owned Machinery & Equipment') : (content.heroBadgeEn || content.heroBadgeTh || 'Certified Pre-Owned Machinery & Equipment'))}</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-sky-200/90 mb-2 font-sans tracking-wide drop-shadow-md">
                                {heroExtras.t('t01')}
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                                    {(lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'Asset For Sale') : (content.heroTitleEn || content.heroTitleTh || 'Asset For Sale'))}
                                </span>
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {(lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn || 'สินทรัพย์รอการขายและประมูลเครื่องจักรมือสอง') : (content.heroSubtitleEn || content.heroSubtitleTh || 'Certified Used Industrial Machinery'))}
                            </p>

                            {/* CTA Action Button */}
                            <div className="flex justify-center">
                                <a
                                    href="#auction-section"
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <Tag className="w-4 h-4" />
                                    <span>{heroExtras.t('t02')}</span>
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Featured Auction Machine & Gallery ─── */}
                {!featured.hidden && (<section id="auction-section" className="py-14 sm:py-20 bg-background scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1 font-mono uppercase tracking-wider">
                                    {featured.t('t01')}
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground font-sans">
                                    {featured.t('t02')}
                                </h2>
                            </div>

                            {/* Blue Category Banner */}
                            <div className="bg-gradient-to-r from-blue-900 via-sky-950 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 border border-sky-500/30 backdrop-blur-xl">
                                <h3 className="text-lg sm:text-xl font-bold font-sans mb-1 text-white">
                                    {featured.t('t03')}
                                </h3>
                                <p className="text-xs sm:text-sm text-sky-200 font-normal">
                                    {featured.t('t04')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* ─── 3. Featured Auction Machine (Air Compressor) ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                    {/* Left: Image Slider with Watermark */}
                                    <div className="lg:col-span-7 relative bg-slate-950 flex items-center justify-center min-h-[350px] sm:min-h-[420px] overflow-hidden group">
                                        <img
                                            src={mainImages[currentImageIndex]}
                                            alt="Doosan Model P415 Air Compressor"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Watermark text */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                                            <span className="text-white/40 text-2xl sm:text-4xl font-extrabold tracking-widest uppercase drop-shadow-md select-none">
                                                {featured.t('t05')}
                                            </span>
                                        </div>

                                        {/* Tag badge */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                            <Tag className="w-3.5 h-3.5" />
                                            <span>{featured.t('t06')}</span>
                                        </div>

                                        {/* Slider Navigation Arrows */}
                                        <button
                                            type="button"
                                            onClick={prevImage}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-md active:scale-95"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextImage}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-md active:scale-95"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>

                                        {/* Slide Indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                                            {mainImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={cn(
                                                        "h-2 rounded-full transition-all duration-300",
                                                        currentImageIndex === idx ? "w-6 bg-sky-400" : "w-2 bg-white/50"
                                                    )}
                                                    aria-label={`Slide ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Machine Specifications */}
                                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="mb-4">
                                                <h3 className="text-xl sm:text-2xl font-extrabold text-blue-900 dark:text-sky-400 font-sans">
                                                    {lang === 'en' ? (primaryAsset?.title_en || primaryAsset?.title || 'Air Compressor') : (primaryAsset?.title || 'Air Compressor')}
                                                </h3>
                                                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                                                    {primaryAsset?.category || 'Doosan Model P415'}
                                                </p>
                                                {primaryAsset?.price && (
                                                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                                        {primaryAsset.price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Specs Table */}
                                            <div className="space-y-1.5 mb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                                {specs.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                                        <span className="font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
                                                        <span className="font-semibold text-slate-900 dark:text-white">: {item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Engineer Contact Notice */}
                                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-6">
                                                {featured.t('t07')}{' '}
                                                <a href={featured.t('link08')} className="text-sky-600 dark:text-sky-400 font-bold hover:underline">
                                                    {featured.t('t09')}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <a
                                            href={featured.t('link10')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 rounded-xl bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>{featured.t('t11')}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* ─── 4. Secondary Gallery Grid (3 Cards) ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                                {secondaryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 group"
                                    >
                                        <img
                                            src={featured.t('img12') || img}
                                            alt={`Used Machine Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                                            <span className="text-white/30 text-xs sm:text-sm font-bold tracking-wider uppercase select-none">
                                                {featured.t('t05')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* ─── 4. Additional Pre-Owned Machinery Catalog ─── */}
                        {otherAssets.length > 0 && (
                            <ScrollReveal animation="fade-up">
                                <div className="mb-16">
                                    <div className="text-center mb-8">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-bold mb-2">
                                            <Tag className="w-3 h-3" />
                                            <span>{featured.t('t13')}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-sans mb-2">
                                            {featured.t('t14')}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                                            {featured.t('t15')}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {otherAssets.map((asset) => (
                                            <div
                                                key={asset.id}
                                                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:border-sky-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                                            >
                                                <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                                                    <img
                                                        src={asset.image}
                                                        alt={asset.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                                                        <span className="text-white/30 text-xs font-bold tracking-wider uppercase select-none">
                                                            {featured.t('t05')}
                                                        </span>
                                                    </div>
                                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                                        {asset.category}
                                                    </div>
                                                    {asset.status === 'available' && (
                                                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold shadow-md">
                                                            {featured.t('t16')}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans mb-1 group-hover:text-sky-400 transition-colors">
                                                            {lang === 'en' ? (asset.title_en || asset.title) : asset.title}
                                                        </h4>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                                                            {asset.description || asset.condition}
                                                        </p>
                                                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-4">
                                                            {asset.price}
                                                        </div>
                                                    </div>

                                                    <a
                                                        href={featured.t('link17')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-3 px-4 rounded-xl bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                        <span>{featured.t('t18')}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* ─── 5. Asset Inquiry ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans mb-1">
                                    {featured.t('t19')}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                    {featured.t('t20')}
                                </p>

                                <form onSubmit={handleCommentSubmit} className="space-y-4 max-w-4xl">
                                    {/* Textarea */}
                                    <div>
                                        <label htmlFor="asset-for-sale-field-1" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {featured.t('t21')}
                                        </label>
                                        <textarea id="asset-for-sale-field-1"
                                            rows={6}
                                            required
                                            maxLength={5000}
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm resize-none"
                                        />
                                    </div>

                                    {/* 3 Inputs Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="asset-for-sale-field-2" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {featured.t('t22')}
                                            </label>
                                            <input id="asset-for-sale-field-2"
                                                type="text"
                                                required
                                                placeholder={featured.t('t23')}
                                                maxLength={200}
                                                autoComplete="name"
                                                value={authorName}
                                                onChange={(e) => setAuthorName(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="asset-for-sale-field-3" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {featured.t('t24')}
                                            </label>
                                            <input id="asset-for-sale-field-3"
                                                type="email"
                                                required
                                                placeholder="name@company.com"
                                                maxLength={200}
                                                autoComplete="email"
                                                value={authorEmail}
                                                onChange={(e) => setAuthorEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="asset-for-sale-field-4" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {featured.t('t25')}
                                            </label>
                                            <input id="asset-for-sale-field-4"
                                                type="tel"
                                                placeholder="08X-XXX-XXXX"
                                                maxLength={20}
                                                autoComplete="tel"
                                                value={authorPhone}
                                                onChange={(e) => setAuthorPhone(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {guardFields}

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingComment}
                                            className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                                        >
                                            {isSubmittingComment ? (
                                                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            ) : (
                                                <Send className="w-3.5 h-3.5" />
                                            )}
                                            <span>{featured.t('t26')}</span>
                                        </button>
                                    </div>
                                </form>
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
