import { useState, useRef, useCallback } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import type { NewsItem } from '@/types';
import { generateId, formatDate } from '@/lib/utils';
import { Plus, Trash2, Save, Pin, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Upload, X, ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'blockquote'],
        ['clean'],
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'blockquote',
];

// ─── Image compression ───
function compressImage(file: File, maxWidth = 800, maxSizeKB = 200): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0, width, height);

                // Try progressively lower quality
                let quality = 0.8;
                let result = canvas.toDataURL('image/jpeg', quality);
                while (result.length > maxSizeKB * 1024 * 1.37 && quality > 0.1) {
                    quality -= 0.1;
                    result = canvas.toDataURL('image/jpeg', quality);
                }
                resolve(result);
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

type ArticleLang = 'th' | 'en';

export function NewsEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const [articles, setArticles] = useState<NewsItem[]>([...settings.news]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [articleLangs, setArticleLangs] = useState<Record<string, ArticleLang>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    const getArticleLang = (id: string): ArticleLang => articleLangs[id] || 'th';
    const setArticleLang = (id: string, lang: ArticleLang) => {
        setArticleLangs((prev) => ({ ...prev, [id]: lang }));
    };

    const addArticle = () => {
        const newArticle: NewsItem = {
            id: generateId(),
            title: '',
            title_en: '',
            excerpt: '',
            excerpt_en: '',
            content: '',
            content_en: '',
            date: new Date().toISOString().split('T')[0],
            pinned: false,
            category: 'Company News',
            image: '',
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

    const handleImageUpload = useCallback(async (articleId: string, file: File) => {
        setUploadingId(articleId);
        try {
            const base64 = await compressImage(file);
            // Use functional updater to avoid stale closure issue
            setArticles(prev => prev.map(a => a.id === articleId ? { ...a, image: base64 } : a));
        } catch {
            setError('Failed to process image. Please try another file.');
        }
        setUploadingId(null);
    }, []);

    const triggerFileInput = (articleId: string) => {
        setUploadingId(articleId);
        fileInputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && uploadingId) {
            handleImageUpload(uploadingId, file);
        }
        e.target.value = '';
    };

    const validate = (): boolean => {
        for (const article of articles) {
            if (!article.title.trim() && !article.title_en.trim()) {
                setError('ข่าวทุกรายการต้องมีชื่อเรื่องอย่างน้อย 1 ภาษา');
                return false;
            }
            if (!article.excerpt.trim() && !article.excerpt_en.trim()) {
                setError(`Excerpt for "${article.title || article.title_en}" is required in at least one language.`);
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
        setSuccess('บันทึกข่าวสารเรียบร้อยแล้ว!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const categories = ['Company News', 'Market Analysis', 'Education', 'Product Update', 'Press Release'];

    return (
        <div className="space-y-6">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
            />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">News & Articles</h1>
                    <p className="text-sm text-muted-foreground mt-1">จัดการข่าวสารและประกาศ รองรับภาษาไทย/อังกฤษ</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={addArticle}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        เพิ่มข่าว
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-white font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        บันทึก
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
                    const currentLang = getArticleLang(article.id);

                    return (
                        <div key={article.id} className="glass rounded-xl overflow-hidden">
                            {/* Header */}
                            <div
                                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {article.pinned && <Pin className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                                    {article.image && (
                                        <img src={article.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {article.title || article.title_en || 'Untitled Article'}
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
                                <div className="px-5 pb-5 space-y-5 border-t border-border pt-4">
                                    {/* ─── Image Upload ─── */}
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-2">รูปภาพข่าว</label>
                                        <div className="flex items-start gap-4">
                                            {article.image ? (
                                                <div className="relative group">
                                                    <img
                                                        src={article.image}
                                                        alt="Preview"
                                                        className="w-32 h-20 rounded-xl object-cover border border-border"
                                                    />
                                                    <button
                                                        onClick={() => updateArticle(article.id, 'image', '')}
                                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-32 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => triggerFileInput(article.id)}
                                                    disabled={uploadingId === article.id}
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all disabled:opacity-50"
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    {uploadingId === article.id ? 'กำลังอัปโหลด...' : 'อัปโหลดรูป'}
                                                </button>
                                                <p className="text-[10px] text-muted-foreground/60">รูปจะถูก compress ไม่เกิน 200KB</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ─── Category / Date / Pin Row ─── */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
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
                                                className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                onClick={() => updateArticle(article.id, 'pinned', !article.pinned)}
                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${article.pinned
                                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                                    : 'text-muted-foreground border border-border hover:text-foreground'
                                                    }`}
                                            >
                                                <Pin className="w-3 h-3" />
                                                {article.pinned ? 'ปักหมุดอยู่' : 'ปักหมุด'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* ─── TH / EN Language Tabs ─── */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-4 bg-navy-light rounded-lg p-1 w-fit">
                                            <button
                                                onClick={() => setArticleLang(article.id, 'th')}
                                                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${currentLang === 'th'
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                🇹🇭 ไทย
                                            </button>
                                            <button
                                                onClick={() => setArticleLang(article.id, 'en')}
                                                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${currentLang === 'en'
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                🇺🇸 English
                                            </button>
                                        </div>

                                        {/* Fields for current language */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                                    {currentLang === 'th' ? 'ชื่อเรื่อง (ไทย) *' : 'Title (English) *'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={currentLang === 'th' ? article.title : article.title_en}
                                                    onChange={(e) => updateArticle(article.id, currentLang === 'th' ? 'title' : 'title_en', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    placeholder={currentLang === 'th' ? 'กรอกชื่อเรื่องภาษาไทย' : 'Enter article title in English'}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                                    {currentLang === 'th' ? 'เนื้อหาย่อ (ไทย) *' : 'Excerpt (English) *'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={currentLang === 'th' ? article.excerpt : article.excerpt_en}
                                                    onChange={(e) => updateArticle(article.id, currentLang === 'th' ? 'excerpt' : 'excerpt_en', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    placeholder={currentLang === 'th' ? 'สรุปสั้นๆ สำหรับแสดงบนการ์ด' : 'Short summary shown on cards'}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                                    {currentLang === 'th' ? 'เนื้อหา (ไทย)' : 'Content (English)'}
                                                </label>
                                                <div className="quill-dark-wrapper">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={currentLang === 'th' ? article.content : article.content_en}
                                                        onChange={(value) => updateArticle(article.id, currentLang === 'th' ? 'content' : 'content_en', value)}
                                                        modules={quillModules}
                                                        formats={quillFormats}
                                                        placeholder={currentLang === 'th' ? 'พิมพ์เนื้อหาข่าวภาษาไทย...' : 'Type article content in English...'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-12 glass rounded-xl">
                    <p className="text-muted-foreground text-sm">ยังไม่มีข่าว คลิก "เพิ่มข่าว" เพื่อสร้างใหม่</p>
                </div>
            )}
        </div>
    );
}
