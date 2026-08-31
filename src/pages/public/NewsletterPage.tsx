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
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
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
                            {/* Breadcrumb / Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/30 text-xs font-semibold text-sky-300 mb-5 shadow-lg shadow-sky-500/10">
                                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                                <span>Agile Newsletter · Annual Reports & Insights</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-sky-200/90 mb-3 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl font-sans mb-4 bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                                Agile Newsletter
                            </h1>
                            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md mb-8">
                                {lang === 'th'
                                    ? 'รวบรวมจดหมายข่าวประจำปี สรุปผลการดำเนินงาน และสาระความรู้สินเชื่อเครื่องจักรอุตสาหกรรม'
                                    : 'Annual corporate newsletters, operational recaps, and specialized machinery finance reports.'}
                            </p>

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
                <section id="newsletter" className="relative py-16 sm:py-24 overflow-hidden bg-background">
                    {/* Subtle Silk Wave Gradients */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
                        <svg className="absolute w-full h-full object-cover" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-100,300 C400,100 900,600 1600,200" stroke="url(#nlWaveGrad1)" strokeWidth="1.5" strokeDasharray="6 6" />
                            <path d="M-50,500 C450,250 950,750 1600,350" stroke="url(#nlWaveGrad2)" strokeWidth="2" />
                            <defs>
                                <linearGradient id="nlWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="nlWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
                                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px]" />
                        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 shadow-sm border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                                    Agile Newsletter
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans mb-4 bg-gradient-to-r from-blue-900 via-sky-600 to-blue-800 dark:from-white dark:via-sky-200 dark:to-sky-400 bg-clip-text text-transparent">
                                    {lang === 'th' ? 'จดหมายข่าวประจำปี' : 'Annual Newsletters'}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                    {lang === 'th'
                                        ? 'ดาวน์โหลดและอ่านฉบับเต็มของจดหมายข่าว Agile Assets แบบ Interactive'
                                        : 'Download and read full interactive editions of Agile Assets annual reports.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 3 Columns PDF Viewer Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {newsletters.map((item, idx) => (
                                <ScrollReveal key={item.id} animation="fade-up" delay={idx * 80}>
                                    <div className="flex flex-col h-full glass border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xl group transition-all duration-300 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10">
                                        {/* Card Header Bar */}
                                        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-3">
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
