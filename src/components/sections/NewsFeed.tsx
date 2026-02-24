import { Newspaper, Pin, CalendarDays } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { formatDate } from '@/lib/utils';

export function NewsFeed() {
    const { settings } = useSiteSettings();
    const sortedNews = [...settings.news].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <section id="news" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-gold mb-4">
                        <Newspaper className="w-3.5 h-3.5" />
                        Latest Updates
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        News & Announcements
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay informed with the latest market insights, company news, and financial updates.
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedNews.map((article, index) => (
                        <article
                            key={article.id}
                            className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Category bar */}
                            <div className="h-1 gradient-gold" />

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                                        {article.category}
                                    </span>
                                    {article.pinned && (
                                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                                            <Pin className="w-3 h-3" />
                                            Pinned
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-2 line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                                    <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        {formatDate(article.date)}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
