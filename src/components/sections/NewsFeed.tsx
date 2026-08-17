import { useState, useMemo } from 'react';
import { Newspaper, Pin, CalendarDays, ArrowRight, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { NewsItem } from '@/types';

// ─── XSS Sanitization ───
function sanitizeHtml(html: string): string {
    let clean = html.replace(/<\s*(script|iframe|object|embed|form|style)\b[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '');
    clean = clean.replace(/<\s*(script|iframe|object|embed|form)\b[^>]*\/?>/gi, '');
    clean = clean.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
    clean = clean.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');
    clean = clean.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');
    return clean;
}

export function NewsFeed() {
    const { settings } = useSiteSettings();
    const { lang, t } = useLanguage();
    const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const getField = (article: NewsItem, field: 'title' | 'excerpt' | 'content'): string => {
        if (lang === 'en') {
            const enField = article[`${field}_en` as keyof NewsItem] as string;
            return enField || (article[field] as string);
        }
        return (article[field] as string) || (article[`${field}_en` as keyof NewsItem] as string) || '';
    };

    const getSafeHtml = (article: NewsItem, field: 'title' | 'excerpt' | 'content'): string => {
        return sanitizeHtml(getField(article, field));
    };

    const sortedNews = useMemo(() =>
        [...settings.news].sort((a, b) => {
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }),
        [settings.news]
    );

    const featuredArticle = sortedNews.length > 0 && sortedNews[0].pinned ? sortedNews[0] : null;
    const gridArticles = featuredArticle ? sortedNews.slice(1) : sortedNews;

    const itemsPerPage = 3;
    const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
    const paginatedNews = gridArticles.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const openArticle = sortedNews.find((a) => a.id === selectedArticle);

    const getImageUrl = (article: NewsItem) => {
        return article.image || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80`;
    };

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    return (
        <>
            <section id="news" className="py-16 lg:py-20 relative overflow-hidden bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                                <Newspaper className="w-3.5 h-3.5" />
                                <span>{t('news.badge')}</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                                {t('news.title')}
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                {t('news.subtitle')}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Featured Article (first pinned) */}
                    {featuredArticle && (
                        <ScrollReveal animation="fade-up" delay={100}>
                            <div
                                className="group glass-card rounded-3xl overflow-hidden mb-12 cursor-pointer border border-sky-500/20 hover:border-sky-400/50 shadow-2xl transition-all duration-500"
                                onClick={() => setSelectedArticle(featuredArticle.id)}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12">
                                    {/* Image */}
                                    <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
                                        <img
                                            src={getImageUrl(featuredArticle)}
                                            alt={getField(featuredArticle, 'title')}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white text-xs font-bold shadow-lg">
                                                <Pin className="w-3 h-3 inline mr-1 fill-current" />
                                                {t('news.pinned')}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                                                {featuredArticle.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <CalendarDays className="w-4 h-4 text-sky-400" />
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {formatDate(featuredArticle.date)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-4 group-hover:text-sky-400 transition-colors leading-tight font-sans">
                                            {getField(featuredArticle, 'title')}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                            {stripHtml(getField(featuredArticle, 'excerpt'))}
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-sky-400 font-bold text-sm group-hover:gap-3 transition-all">
                                            <span>{t('news.readMore')}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedNews.map((article, index) => (
                            <ScrollReveal
                                key={article.id}
                                animation="fade-up"
                                delay={index * 120}
                                className="flex flex-col h-full"
                            >
                                <article
                                    className="group glass-card rounded-3xl overflow-hidden border border-border/80 hover:border-sky-400/40 transition-all duration-300 flex flex-col cursor-pointer h-full"
                                    onClick={() => setSelectedArticle(article.id)}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={getImageUrl(article)}
                                            alt={getField(article, 'title')}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                                                {article.category}
                                            </span>
                                            {article.pinned && (
                                                <span className="inline-flex items-center gap-1 text-xs text-white bg-sky-500/90 backdrop-blur-sm px-2 py-1 rounded-full font-bold">
                                                    <Pin className="w-3 h-3" />
                                                    {t('news.pinned')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1 justify-between">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-400 transition-colors mb-2 line-clamp-2 font-sans">
                                                {getField(article, 'title')}
                                            </h3>

                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                                                {stripHtml(getField(article, 'excerpt'))}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {formatDate(article.date)}
                                                </span>
                                            </div>
                                            <span className="text-xs text-sky-400 font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                {t('news.readMore')}
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                                className="p-2.5 rounded-xl glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            i === currentPage
                                                ? 'bg-sky-400 w-8'
                                                : 'bg-slate-700 w-2.5 hover:bg-slate-500'
                                        }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-2.5 rounded-xl glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Article Modal */}
            {openArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="relative w-full max-w-3xl glass-card rounded-3xl animate-slide-up border border-sky-400/30 bg-slate-950/95"
                        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image */}
                        <div className="relative flex-shrink-0" style={{ height: '180px', overflow: 'hidden' }}>
                            <img
                                src={getImageUrl(openArticle)}
                                alt={getField(openArticle, 'title')}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold">
                                    {openArticle.category}
                                </span>
                                {openArticle.pinned && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                                        <Pin className="w-3 h-3" />
                                        {t('news.pinned')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', padding: '2rem', wordBreak: 'break-word' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarDays className="w-4 h-4 text-sky-400" />
                                <span className="text-xs text-muted-foreground font-semibold">
                                    {formatDate(openArticle.date)}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-6 leading-tight font-sans">
                                {getField(openArticle, 'title')}
                            </h2>
                            <div
                                className="rich-content text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4"
                                dangerouslySetInnerHTML={{ __html: getSafeHtml(openArticle, 'content') }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
