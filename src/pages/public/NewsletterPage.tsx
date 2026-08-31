import { Helmet } from 'react-helmet-async';
import { Download, ExternalLink, FileText, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

interface NewsletterItem {
    id: string;
    titleTh: string;
    titleEn: string;
    issueTh: string;
    issueEn: string;
    pdfUrl: string;
    year: string;
}

export function NewsletterPage() {
    const { lang } = useLanguage();

    const newsletters: NewsletterItem[] = [
        {
            id: 'newsletter-1',
            titleTh: 'Agile Assets Newsletter No.1',
            titleEn: 'Agile Assets Newsletter No.1',
            issueTh: 'ฉบับที่ 1',
            issueEn: 'Issue No.1',
            pdfUrl: 'https://agileassets.co.th/wp-content/uploads/2026/03/Agile-Assets-Newsletter.-No1.pdf',
            year: '2026',
        },
        {
            id: 'newsletter-2',
            titleTh: 'Agile Assets Newsletter No.2',
            titleEn: 'Agile Assets Newsletter No.2',
            issueTh: 'ฉบับที่ 2',
            issueEn: 'Issue No.2',
            pdfUrl: 'https://agileassets.co.th/wp-content/uploads/2026/03/Agile-Assets-Newsletter.-No2.pdf',
            year: '2026',
        },
        {
            id: 'newsletter-3',
            titleTh: 'Newsletter Issue 3 Final',
            titleEn: 'Newsletter Issue 3 Final',
            issueTh: 'ฉบับที่ 3 (ล่าสุด)',
            issueEn: 'Issue No.3 (Latest)',
            pdfUrl: 'https://agileassets.co.th/wp-content/uploads/2026/06/Newsletter-issue-3_Final.pdf',
            year: '2026',
        },
    ];

    const scrollToNewsletter = () => {
        const el = document.getElementById('newsletter');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pageTitle = lang === 'th'
        ? 'ดาวน์โหลดจดหมายข่าว (Newsletter Download) | Agile Assets'
        : 'Newsletter Download | Agile Assets - Industrial Machinery Financing';
    const pageDescription = lang === 'th'
        ? 'ดาวน์โหลดจดหมายข่าว (Newsletter) รวมข้อมูลธุรกิจ บทวิเคราะห์ และอัปเดตจากบริษัทครบถ้วน ดาวน์โหลด Newsletter ล่าสุดได้ที่นี่'
        : 'Download Agile Assets Newsletters — Industry insights, machinery finance updates, and ESG growth reports.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/newsletter/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Exact Tree of Growth as Home & Project Pages) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets Newsletter"
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
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-3 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-8">
                                Agile Newsletter
                            </h1>

                            {/* Learn More Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToNewsletter}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <span>Learn More</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. จดหมายข่าวประจำปี (3 PDF Embed Documents Grid) ─── */}
                <section id="newsletter" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12 sm:mb-16">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                                    Agile Newsletter
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight font-sans">
                                    {lang === 'th' ? 'จดหมายข่าวประจำปี' : 'Annual Newsletters'}
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* 3 Columns PDF Viewer Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {newsletters.map((item, idx) => (
                                <ScrollReveal key={item.id} animation="fade-up" delay={idx * 80}>
                                    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-300 hover:border-sky-500/50">
                                        {/* Card Header Bar */}
                                        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-bold text-white truncate">
                                                        {lang === 'th' ? item.titleTh : item.titleEn}
                                                    </h3>
                                                    <span className="text-[11px] text-slate-400">
                                                        {lang === 'th' ? item.issueTh : item.issueEn}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <a
                                                    href={item.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={lang === 'th' ? 'เปิดดูเต็มจอ' : 'Open in New Tab'}
                                                    className="p-2 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                                <a
                                                    href={item.pdfUrl}
                                                    download
                                                    title={lang === 'th' ? 'ดาวน์โหลดเอกสาร' : 'Download PDF'}
                                                    className="p-2 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* PDF Embed / Interactive Viewer Body */}
                                        <div className="relative flex-1 w-full min-h-[520px] sm:min-h-[640px] bg-slate-950">
                                            <iframe
                                                title={lang === 'th' ? item.titleTh : item.titleEn}
                                                src={`${item.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                                                className="w-full h-full min-h-[520px] sm:min-h-[640px] border-0"
                                                loading="lazy"
                                            />

                                            {/* Overlay for quick action on hover/fallback */}
                                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs">
                                                <span className="text-slate-400">
                                                    PDF • Agile Assets
                                                </span>
                                                <a
                                                    href={item.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-medium shadow transition-all"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    <span>{lang === 'th' ? 'อ่านฉบับเต็ม' : 'Read Full PDF'}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
