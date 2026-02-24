import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import type { NewsItem } from '@/types';
import { generateId, formatDate } from '@/lib/utils';
import { Plus, Trash2, Save, Pin, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function NewsEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const [articles, setArticles] = useState<NewsItem[]>([...settings.news]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const addArticle = () => {
        const newArticle: NewsItem = {
            id: generateId(),
            title: '',
            excerpt: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            pinned: false,
            category: 'Company News',
        };
        setArticles([newArticle, ...articles]);
        setExpandedId(newArticle.id);
    };

    const removeArticle = (id: string) => {
        setArticles(articles.filter((a) => a.id !== id));
        if (expandedId === id) setExpandedId(null);
    };

    const updateArticle = (id: string, field: keyof NewsItem, value: string | boolean) => {
        setArticles(articles.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    };

    const validate = (): boolean => {
        for (const article of articles) {
            if (!article.title.trim()) {
                setError('All articles must have a title.');
                return false;
            }
            if (!article.excerpt.trim()) {
                setError(`Excerpt for "${article.title}" is required.`);
                return false;
            }
            if (!article.content.trim()) {
                setError(`Content for "${article.title}" is required.`);
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        setError('');
        setSuccess('');
        if (!validate()) return;
        updateSettings({ news: articles });
        setSuccess('News articles saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const categories = ['Company News', 'Market Analysis', 'Education', 'Product Update', 'Press Release'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">News & Articles</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage news articles and announcements.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={addArticle}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Article
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-white font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        Save All
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {success}
                </div>
            )}

            <div className="space-y-3">
                {articles.map((article) => {
                    const isExpanded = expandedId === article.id;

                    return (
                        <div key={article.id} className="glass rounded-xl overflow-hidden">
                            {/* Header */}
                            <div
                                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {article.pinned && <Pin className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {article.title || 'Untitled Article'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{formatDate(article.date)} · {article.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeArticle(article.id); }}
                                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                </div>
                            </div>

                            {/* Expanded Form */}
                            {isExpanded && (
                                <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Title *</label>
                                            <input
                                                type="text"
                                                value={article.title}
                                                onChange={(e) => updateArticle(article.id, 'title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Article title"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                                                <select
                                                    value={article.category}
                                                    onChange={(e) => updateArticle(article.id, 'category', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                >
                                                    {categories.map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={article.date}
                                                    onChange={(e) => updateArticle(article.id, 'date', e.target.value)}
                                                    className="px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Excerpt *</label>
                                        <input
                                            type="text"
                                            value={article.excerpt}
                                            onChange={(e) => updateArticle(article.id, 'excerpt', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Short summary shown on cards"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Content *</label>
                                        <textarea
                                            value={article.content}
                                            onChange={(e) => updateArticle(article.id, 'content', e.target.value)}
                                            rows={5}
                                            className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                            placeholder="Full article content"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateArticle(article.id, 'pinned', !article.pinned)}
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${article.pinned
                                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                                    : 'text-muted-foreground border border-border hover:text-foreground'
                                                }`}
                                        >
                                            <Pin className="w-3 h-3" />
                                            {article.pinned ? 'Pinned' : 'Pin Article'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-12 glass rounded-xl">
                    <p className="text-muted-foreground text-sm">No articles yet. Click "New Article" to create one.</p>
                </div>
            )}
        </div>
    );
}
