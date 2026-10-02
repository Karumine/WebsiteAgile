import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ChevronDown, ArrowRight, Search, X, DollarSign, Calculator } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import { useSections, toLines } from '@/lib/pageSections';
import { knowledgePageSections } from '@/data/pageSections/knowledgePage';

interface KnowledgeArticle {
    id: string;
    titleTh: string;
    titleEn: string;
    category: 'financing' | 'interest' | 'management' | 'esg';
    categoryTh: string;
    categoryEn: string;
    date: string;
    readTimeTh: string;
    readTimeEn: string;
    image: string;
    excerptTh: string;
    excerptEn: string;
    contentTh: string[];
    contentEn: string[];
}

export function KnowledgePage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('knowledge', DEFAULT_PAGE_CONTENTS['knowledge']);
    const section = useSections(content, knowledgePageSections);
    const heroExtras = section('hero-extras');
    const mainSec = section('main');
    const categoriesSec = section('categories');
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

    const articles: KnowledgeArticle[] = mainSec.items.map((it) => ({ id: it.raw.id, titleTh: it.raw.titleTh, titleEn: it.raw.titleEn, category: it.raw.category, categoryTh: it.raw.categoryTh, categoryEn: it.raw.categoryEn, date: it.raw.date, readTimeTh: it.raw.readTimeTh, readTimeEn: it.raw.readTimeEn, image: it.raw.image, excerptTh: it.raw.excerptTh, excerptEn: it.raw.excerptEn, contentTh: toLines(it.raw.contentTh || ''), contentEn: toLines(it.raw.contentEn || '') })) as KnowledgeArticle[];

    const categories = categoriesSec.items.map((it) => ({ id: it.raw.id, labelTh: it.raw.labelTh, labelEn: it.raw.labelEn }));

    const filteredArticles = articles.filter((article) => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === '' ||
            article.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerptTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerptEn.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const scrollToKnowledge = () => {
        const el = document.getElementById('knowledge');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pageTitle = content.metaTitle || (lang === 'th'
        ? 'คลังความรู้ (Knowledge Center) | Agile Assets สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม'
        : 'Knowledge Center | Agile Assets - Industrial Machinery Financing Insights');
    const pageDescription = content.metaDescription || (lang === 'th'
        ? 'ศูนย์รวมบทความ ความรู้ด้านการเช่าซื้อเครื่องจักรอุตสาหกรรม การคำนวณอัตราดอกเบี้ย การบริหารเงินทุน และเทรนด์ ESG โรงงาน'
        : 'Agile Assets Knowledge Center — Comprehensive guides on machinery leasing, interest calculations, financial management, and ESG sustainability.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/knowledge/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || heroBg}
                            alt="Agile Assets Knowledge Center"
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
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-slate-950/80 border text-xs font-semibold mb-5 shadow-lg"
                                style={{
                                    borderColor: 'rgba(var(--accent-rgb, 56 189 248), 0.3)',
                                    color: 'var(--theme-sky-300, #7dd3fc)',
                                    boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb, 2 132 199), 0.1)',
                                }}
                            >
                                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--theme-sky-400, #38bdf8)' }} />
                                <span>{(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'Knowledge Center · Financial & Machinery Insights') : (content.heroBadgeEn || content.heroBadgeTh || 'Knowledge Center · Financial & Machinery Insights'))}</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-sky-200/90 mb-3 font-sans tracking-wide drop-shadow-md">
                                {heroExtras.t('t01')}
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl font-sans mb-4 bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                                {(lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'Knowledge Center') : (content.heroTitleEn || content.heroTitleTh || 'Knowledge Center'))}
                            </h1>
                            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md mb-8">
                                {(lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn || 'ศูนย์รวมบทความและคู่มือวางแผนทางการเงิน จัดซื้อเครื่องจักร และเทรนด์ ESG เพื่อการเติบโตอย่างยั่งยืน') : (content.heroSubtitleEn || content.heroSubtitleTh || 'Comprehensive guides on machinery financing, interest rate strategies, and industrial ESG innovations.'))}
                            </p>

                            {/* Learn More Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToKnowledge}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <span>{heroExtras.t('t02')}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. คลังความรู้ (Main Knowledge Section) ─── */}
                {!mainSec.hidden && (<section id="knowledge" className="relative py-16 sm:py-24 overflow-hidden bg-background">
                    {/* Subtle Silk Wave Gradients */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
                        <svg className="absolute w-full h-full object-cover" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-100,300 C400,100 900,600 1600,200" stroke="url(#knowWaveGrad1)" strokeWidth="1.5" strokeDasharray="6 6" />
                            <path d="M-50,500 C450,250 950,750 1600,350" stroke="url(#knowWaveGrad2)" strokeWidth="2" />
                            <defs>
                                <linearGradient id="knowWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="knowWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
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
                            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 shadow-sm border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                                    {mainSec.t('t01')}
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans mb-4 bg-gradient-to-r from-blue-900 via-sky-600 to-blue-800 dark:from-white dark:via-sky-200 dark:to-sky-400 bg-clip-text text-transparent">
                                    {mainSec.t('t02')}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                    {mainSec.t('t03')}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Search & Category Filter Bar */}
                        <div className="mb-12 space-y-4">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                {/* Category Buttons */}
                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                                selectedCategory === cat.id
                                                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                                                    : 'glass border border-slate-200 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:border-sky-500/30'
                                            }`}
                                        >
                                            {lang === 'th' ? cat.labelTh : cat.labelEn}
                                        </button>
                                    ))}
                                </div>

                                {/* Search Box */}
                                <div className="relative w-full md:w-72">
                                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder={mainSec.t('t04')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Articles Grid */}
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">
                                    {mainSec.t('t05')}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                                {filteredArticles.map((article, idx) => (
                                    <ScrollReveal key={article.id} animation="fade-up" delay={idx * 60}>
                                        <div
                                            onClick={() => setActiveArticle(article)}
                                            className="h-full flex flex-col glass rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group cursor-pointer"
                                        >
                                            {/* Thumbnail Image */}
                                            <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={article.image}
                                                    alt={lang === 'th' ? article.titleTh : article.titleEn}
                                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-sky-500/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md shadow-sky-500/20">
                                                    {lang === 'th' ? article.categoryTh : article.categoryEn}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Meta Info */}
                                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{article.date}</span>
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{lang === 'th' ? article.readTimeTh : article.readTimeEn}</span>
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-2 mb-2 font-sans">
                                                        {lang === 'th' ? article.titleTh : article.titleEn}
                                                    </h3>

                                                    {/* Excerpt */}
                                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                                        {lang === 'th' ? article.excerptTh : article.excerptEn}
                                                    </p>
                                                </div>

                                                {/* Read More Link */}
                                                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                                    <span>{mainSec.t('t06')}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}

                        {/* CTA Box */}
                        <ScrollReveal animation="fade-up">
                            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-500/20">
                                <div className="text-center md:text-left space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold font-sans">
                                        {mainSec.t('t07')}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                                        {mainSec.t('t08')}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                                    <a
                                        href={mainSec.t('link09')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <DollarSign className="w-4 h-4" />
                                        <span>{mainSec.t('t10')}</span>
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigate('/#calculator');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <Calculator className="w-4 h-4" />
                                        <span>{mainSec.t('t11')}</span>
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 3. Article Modal / Reader ─── */}
                {!mainSec.hidden && (activeArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
                        <div
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveArticle(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Category Badge & Meta */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-lg bg-blue-900/10 dark:bg-blue-900/40 text-blue-900 dark:text-sky-300 text-xs font-bold">
                                    {lang === 'th' ? activeArticle.categoryTh : activeArticle.categoryEn}
                                </span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs text-slate-400">{activeArticle.date}</span>
                            </div>

                            {/* Article Title */}
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans mb-5 leading-snug">
                                {lang === 'th' ? activeArticle.titleTh : activeArticle.titleEn}
                            </h2>

                            {/* Hero Image in Modal */}
                            <div className="rounded-2xl overflow-hidden mb-6 aspect-16/9 bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={activeArticle.image}
                                    alt={lang === 'th' ? activeArticle.titleTh : activeArticle.titleEn}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Article Body */}
                            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                {(lang === 'th' ? activeArticle.contentTh : activeArticle.contentEn).map((para, pIdx) => (
                                    <p key={pIdx} className={para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') || para.startsWith('4.') || para.startsWith('5.') ? 'font-medium pl-2' : ''}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Modal Footer CTA */}
                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                <div className="text-xs text-slate-400">
                                    {mainSec.t('t12')}
                                </div>
                                <a
                                    href={mainSec.t('link13')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs tracking-wide shadow-md hover:scale-105 transition-all"
                                >
                                    {mainSec.t('t14')}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
