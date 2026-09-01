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
import { cn } from '@/lib/utils';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function AssetForSalePage() {
    const { lang } = useLanguage();

    // Featured Machine Gallery slider
    const mainImages = [
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/9522_0.jpg',
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
    const secondaryImages = [
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024,h_768/https://agileassets.co.th/wp-content/uploads/2026/04/9525_0-1-1024x768.jpg',
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024,h_768/https://agileassets.co.th/wp-content/uploads/2026/04/9511_0-1024x768.jpg',
        'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024,h_768/https://agileassets.co.th/wp-content/uploads/2026/04/9510_0-1024x768.jpg',
    ];

    // Comment Form states
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [authorWebsite, setAuthorWebsite] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingComment(true);

        setTimeout(() => {
            setIsSubmittingComment(false);
            toast.success(
                lang === 'th'
                    ? 'ส่งความคิดเห็นเรียบร้อยแล้ว ความคิดเห็นของคุณจะปรากฏหลังผ่านการอนุมัติ'
                    : 'Your comment has been submitted and is pending moderation.'
            );
            setCommentText('');
            setAuthorName('');
            setAuthorEmail('');
            setAuthorWebsite('');
        }, 800);
    };

    const specs = [
        { label: 'Capacity', value: '400 Cfm' },
        { label: 'Controller Model', value: 'AUJW04CT' },
        { label: 'Speed', value: '2500 RPM' },
        { label: 'Horse system', value: '115 HP' },
        { label: 'Compressor Oil', value: '50 ml' },
        { label: 'Fuel (Diesel)', value: '100 L' },
        { label: 'Net Weight', value: '1300 Kgs' },
        { label: 'Tower Speed', value: '40 Km/Hr' },
        { label: 'Overall LxBxH (mm)', value: '3200x1615x1870' },
    ];

    const pageTitle = lang === 'th'
        ? 'Asset for Sale ขายเครื่องจักรมือสอง สินทรัพย์รอการขาย | Agile Assets'
        : 'Asset for Sale | Agile Assets Used Industrial Machinery Auction';
    const pageDescription = lang === 'th'
        ? 'สินทรัพย์รอการขาย ประมูลเครื่องจักรมือสอง คุณภาพดี เครื่องจักรแนะนำที่ไม่ควรพลาด จาก Agile Assets'
        : 'Used industrial equipment and machinery for auction and direct sale from Agile Assets.';

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
                            src={heroBg}
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
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/80 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-sky-400/20 text-sky-300">
                                    <Tag className="w-3.5 h-3.5" />
                                </div>
                                <span>Certified Pre-Owned Machinery & Equipment</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-sky-200/90 mb-2 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                                    Asset For Sale
                                </span>
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? 'สินทรัพย์รอการขายและประมูลเครื่องจักรมือสอง' : 'Certified Used Industrial Machinery'}
                            </p>

                            {/* CTA Action Button */}
                            <div className="flex justify-center">
                                <a
                                    href="#auction-section"
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <Tag className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'ดูรายการเครื่องจักรพร้อมส่งมอบ' : 'Explore Available Assets'}</span>
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Section Header & Category Banner ─── */}
                <section id="auction-section" className="py-14 sm:py-20 bg-background scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1 font-mono uppercase tracking-wider">
                                    Asset for Sale
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground font-sans">
                                    {lang === 'th' ? 'สินทรัพย์รอการขาย' : 'Assets for Sale'}
                                </h2>
                            </div>

                            {/* Blue Category Banner */}
                            <div className="bg-gradient-to-r from-blue-900 via-sky-950 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 border border-sky-500/30 backdrop-blur-xl">
                                <h3 className="text-lg sm:text-xl font-bold font-sans mb-1 text-white">
                                    {lang === 'th' ? 'ประมูลเครื่องจักรมือสอง คุณภาพดี' : 'High Quality Used Industrial Machinery Auction'}
                                </h3>
                                <p className="text-xs sm:text-sm text-sky-200 font-normal">
                                    {lang === 'th' ? 'เครื่องจักรแนะนำที่ไม่ควรพลาด ตรวจเช็กมาตรฐานพร้อมใช้งานทันที' : 'Featured Machinery & Equipment for Bidding, thoroughly inspected and certified'}
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
                                                Agile Assets Co., Ltd.
                                            </span>
                                        </div>

                                        {/* Tag badge */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                            <Tag className="w-3.5 h-3.5" />
                                            <span>แนะนำ / Featured</span>
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
                                                    Air Compressor
                                                </h3>
                                                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                                                    Doosan Model P415
                                                </p>
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
                                                ติดต่อวิศวกรเพื่อขอเข้าดูเครื่องจักร :{' '}
                                                <a href="tel:0952460255" className="text-sky-600 dark:text-sky-400 font-bold hover:underline">
                                                    095-246-0255
                                                </a>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <a
                                            href="https://line.me/R/ti/p/%40884ukedb"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 rounded-xl bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>ติดต่อเข้าร่วมประมูลเครื่องจักร</span>
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
                                            src={img}
                                            alt={`Used Machine Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                                            <span className="text-white/30 text-xs sm:text-sm font-bold tracking-wider uppercase select-none">
                                                Agile Assets Co., Ltd.
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* ─── 5. Comment Section (ใส่ความเห็น) ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans mb-1">
                                    {lang === 'th' ? 'ใส่ความเห็น' : 'Leave a Reply'}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                    {lang === 'th'
                                        ? 'อีเมลของคุณจะไม่แสดงให้คนอื่นเห็น ช่องข้อมูลที่จำเป็นถูกทำเครื่องหมาย *'
                                        : 'Your email address will not be published. Required fields are marked *'}
                                </p>

                                <form onSubmit={handleCommentSubmit} className="space-y-4 max-w-4xl">
                                    {/* Textarea */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {lang === 'th' ? 'ความเห็น *' : 'Comment *'}
                                        </label>
                                        <textarea
                                            rows={6}
                                            required
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm resize-none"
                                        />
                                    </div>

                                    {/* 3 Inputs Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'ชื่อ *' : 'Name *'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Name"
                                                value={authorName}
                                                onChange={(e) => setAuthorName(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'อีเมล *' : 'Email *'}
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Email"
                                                value={authorEmail}
                                                onChange={(e) => setAuthorEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'เว็บไซต์' : 'Website'}
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="Website"
                                                value={authorWebsite}
                                                onChange={(e) => setAuthorWebsite(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                                            />
                                        </div>
                                    </div>

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
                                            <span>{lang === 'th' ? 'ส่งความคิดเห็น' : 'Post Comment'}</span>
                                        </button>
                                    </div>
                                </form>
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
