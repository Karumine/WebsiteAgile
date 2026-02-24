import { useState, useMemo } from 'react';
import { Newspaper, Pin, CalendarDays, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/lib/utils';
import type { NewsItem } from '@/types';

// ─── XSS Sanitization ───
function sanitizeHtml(html: string): string {
    // Remove dangerous tags
    let clean = html.replace(/<\s*(script|iframe|object|embed|form|style)\b[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '');
    // Remove self-closing dangerous tags
    clean = clean.replace(/<\s*(script|iframe|object|embed|form)\b[^>]*\/?>/gi, '');
    // Remove on* event handlers (onclick, onerror, onload, etc.)
    clean = clean.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
    clean = clean.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');
    // Remove javascript: URLs
    clean = clean.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');
    return clean;
}

export function NewsFeed() {
    const { settings } = useSiteSettings();
    const { lang, t } = useLanguage();
    const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    // ─── Bilingual helper: pick the right field based on language ───
    const getField = (article: NewsItem, field: 'title' | 'excerpt' | 'content'): string => {
        if (lang === 'en') {
            const enField = article[`${field}_en` as keyof NewsItem] as string;
            return enField || (article[field] as string); // fallback to TH
        }
        return (article[field] as string) || (article[`${field}_en` as keyof NewsItem] as string) || '';
    };

    // ─── Sanitized content for rendering ───
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

    // Separate featured article from the grid list
    const featuredArticle = sortedNews.length > 0 && sortedNews[0].pinned ? sortedNews[0] : null;
    const gridArticles = featuredArticle ? sortedNews.slice(1) : sortedNews;

    const itemsPerPage = 3;
    const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
    const paginatedNews = gridArticles.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const openArticle = sortedNews.find((a) => a.id === selectedArticle);

    // Default placeholder for articles without images
    const getImageUrl = (article: NewsItem) => {
        return article.image || `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80`;
    };

    // Strip HTML tags for excerpt display (in case HTML is stored)
    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    return (
        <>
            <section id="news" className="py-24 relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-blue-400 mb-4">
                            <Newspaper className="w-3.5 h-3.5" />
                            {t('news.badge')}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            {t('news.title')}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {t('news.subtitle')}
                        </p>
                    </div>

                    {/* Featured Article (first pinned) */}
                    {featuredArticle && (
                        <div
                            className="group glass rounded-2xl overflow-hidden mb-10 cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            onClick={() => setSelectedArticle(featuredArticle.id)}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Image */}
                                <div className="relative h-64 lg:h-80 overflow-hidden">
                                    <img
                                        src={getImageUrl(featuredArticle)}
                                        alt={getField(featuredArticle, 'title')}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white text-xs font-semibold shadow-lg">
                                            <Pin className="w-3 h-3 inline mr-1" />
                                            {t('news.pinned')}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                                            {featuredArticle.category}
                                        </span>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CalendarDays className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(featuredArticle.date)}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                                        {getField(featuredArticle, 'title')}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                        {stripHtml(getField(featuredArticle, 'excerpt'))}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                                        {t('news.readMore')}
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedNews.map((article, index) => (
                            <article
                                key={article.id}
                                className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 flex flex-col cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => setSelectedArticle(article.id)}
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={getImageUrl(article)}
                                        alt={getField(article, 'title')}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        <span className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                            {article.category}
                                        </span>
                                        {article.pinned && (
                                            <span className="inline-flex items-center gap-1 text-xs text-white bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full">
                                                <Pin className="w-3 h-3" />
                                                {t('news.pinned')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                                        {getField(article, 'title')}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                                        {stripHtml(getField(article, 'excerpt'))}
                                    </p>

                                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                                {formatDate(article.date)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-blue-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                            {t('news.readMore')}
                                            <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-xl glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentPage
                                            ? 'bg-blue-400 w-8 rounded-full'
                                            : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-2 rounded-xl glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5"
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="relative w-full max-w-3xl glass rounded-2xl animate-slide-up"
                        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Compact Header Image */}
                        <div className="relative flex-shrink-0" style={{ height: '160px', overflow: 'hidden' }}>
                            <img
                                src={getImageUrl(openArticle)}
                                alt={getField(openArticle, 'title')}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-3 left-5 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-blue-400/90 text-white text-xs font-semibold">
                                    {openArticle.category}
                                </span>
                                {openArticle.pinned && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/80 text-white text-xs font-medium">
                                        <Pin className="w-3 h-3" />
                                        {t('news.pinned')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content — contained inside modal */}
                        <div style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', overflowX: 'hidden', padding: '1.5rem 2rem', wordBreak: 'break-word' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarDays className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-muted-foreground">
                                    {formatDate(openArticle.date)}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                                {getField(openArticle, 'title')}
                            </h2>
                            <div
                                className="rich-content text-muted-foreground leading-relaxed text-base"
                                dangerouslySetInnerHTML={{ __html: getSafeHtml(openArticle, 'content') }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
