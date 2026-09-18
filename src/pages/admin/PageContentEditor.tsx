import { useState, useMemo } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PageCustomContent, PageSectionItem } from '@/types';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { 
    FileEdit, Save, RotateCcw, ExternalLink, Plus, Trash2, 
    Search, Layers, Sparkles, CheckCircle, Image as ImageIcon,
    Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PageDefinition {
    id: string;
    category: string;
    nameTh: string;
    nameEn: string;
    path: string;
    defaultHeroTitleTh: string;
    defaultHeroTitleEn: string;
    defaultHeroSubtitleTh: string;
    defaultHeroSubtitleEn: string;
    defaultBadgeTh: string;
    defaultBadgeEn: string;
    defaultImage: string;
    defaultCtaTextTh?: string;
    defaultCtaTextEn?: string;
    defaultCtaLink?: string;
    defaultItems?: PageSectionItem[];
}

const getPageDef = (id: string, category: string, fallbackNameTh: string, nameEn: string, path: string): PageDefinition => {
    const master = DEFAULT_PAGE_CONTENTS[id];
    return {
        id,
        category,
        nameTh: master?.pageName || fallbackNameTh,
        nameEn,
        path,
        defaultHeroTitleTh: master?.heroTitleTh || '',
        defaultHeroTitleEn: master?.heroTitleEn || '',
        defaultHeroSubtitleTh: master?.heroSubtitleTh || '',
        defaultHeroSubtitleEn: master?.heroSubtitleEn || '',
        defaultBadgeTh: master?.heroBadgeTh || '',
        defaultBadgeEn: master?.heroBadgeEn || '',
        defaultImage: master?.heroImage || '',
        defaultCtaTextTh: master?.ctaTextTh || 'ขอสินเชื่อกับเรา',
        defaultCtaTextEn: master?.ctaTextEn || 'Financing with Us',
        defaultCtaLink: master?.ctaLink || '/leasing-application',
        defaultItems: master?.items || [],
    };
};

const PAGES_LIST: PageDefinition[] = [
    // 1. หน้าหลักและทั่วไป
    getPageDef('home', 'หน้าหลัก', 'หน้าแรก (Home Page)', 'Home Page', '/'),
    getPageDef('about', 'หน้าหลัก', 'เกี่ยวกับเรา (About Us)', 'About Us', '/about'),
    getPageDef('work-for-us', 'หน้าหลัก', 'ร่วมงานกับเรา (Work for Us)', 'Work For Us', '/work-for-us'),

    // 2. โซลูชันสินเชื่ออุตสาหกรรม
    getPageDef('drinking-water', 'สินเชื่ออุตสาหกรรม', 'โรงงานผลิตน้ำดื่ม (Drinking Water)', 'Drinking Water Production', '/drinking-water-production'),
    getPageDef('livestock-farm', 'สินเชื่ออุตสาหกรรม', 'ฟาร์มปศุสัตว์ (Livestock Farm)', 'Livestock Farm Equipment', '/livestock-farm'),
    getPageDef('food-processing', 'สินเชื่ออุตสาหกรรม', 'โรงงานแปรรูปอาหาร (Food Processing)', 'Food Processing Plant', '/food-processing'),
    getPageDef('biogas-production', 'สินเชื่ออุตสาหกรรม', 'โรงไฟฟ้าก๊าซชีวภาพ (Biogas Production)', 'Biogas Power Generation', '/biogas-production'),
    getPageDef('solar-power', 'สินเชื่ออุตสาหกรรม', 'พลังงานแสงอาทิตย์ (Solar Rooftop)', 'Solar Power Generation', '/solar-power-generation'),
    getPageDef('chiller', 'สินเชื่ออุตสาหกรรม', 'เครื่องทำความเย็น (Industrial Chiller)', 'Industrial Chiller', '/chiller'),
    getPageDef('injection-molding', 'สินเชื่ออุตสาหกรรม', 'เครื่องฉีดพลาสติก (Injection Molding)', 'Injection Molding Machine', '/injection-molding-machine'),
    getPageDef('generator-set', 'สินเชื่ออุตสาหกรรม', 'เครื่องกำเนิดไฟฟ้า (Generator Set)', 'Industrial Generator Set', '/generator-set'),

    // 3. องค์กรและบริการ
    getPageDef('sustainability', 'องค์กรและบริการ', 'ความยั่งยืน & ESG (Sustainability)', 'Sustainability & ESG', '/sustainability'),
    getPageDef('investor-relations', 'องค์กรและบริการ', 'นักลงทุนสัมพันธ์ (Investor Relations)', 'Investor Relations', '/investor-relations'),
    getPageDef('projects', 'องค์กรและบริการ', 'โครงการ & กิจกรรม (Projects & Activity)', 'Projects & Activity', '/project'),
    getPageDef('contact', 'องค์กรและบริการ', 'ติดต่อเรา (Contact Us)', 'Contact Us', '/contact'),

    // 4. เครื่องมือและข้อตกลง
    getPageDef('calculator', 'เครื่องมือและข้อตกลง', 'คำนวณสินเชื่อ (Financing Calculator)', 'Loan Calculator', '/calculator'),
    getPageDef('interest-rate', 'เครื่องมือและข้อตกลง', 'แปลงอัตราดอกเบี้ย (Interest Rate Conversion)', 'Interest Rate Converter', '/interest-rate-conversion'),
    getPageDef('nc-nda', 'เครื่องมือและข้อตกลง', 'สัญญา NC-NDA (Non-Disclosure Agreement)', 'NC-NDA Agreement', '/nc-nda'),
    getPageDef('cookie-policy', 'เครื่องมือและข้อตกลง', 'นโยบายคุกกี้ (Cookie & Privacy Policy)', 'Cookie Policy', '/cookie-policy'),
];

export function PageContentEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [selectedPageId, setSelectedPageId] = useState<string>('drinking-water');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const activePageDef = useMemo(() => {
        return PAGES_LIST.find((p) => p.id === selectedPageId) || PAGES_LIST[0];
    }, [selectedPageId]);

    const getInitialContent = (pageId: string, def: PageDefinition): PageCustomContent => {
        const saved = settings.pageContents?.[pageId];
        const master = DEFAULT_PAGE_CONTENTS[pageId];
        return {
            id: def.id,
            pageName: def.nameTh,
            titleTh: saved?.titleTh || master?.titleTh || def.defaultHeroTitleTh,
            titleEn: saved?.titleEn || master?.titleEn || def.defaultHeroTitleEn,
            metaTitle: saved?.metaTitle || master?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: saved?.metaDescription || master?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: saved?.heroBadgeTh || master?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: saved?.heroBadgeEn || master?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: saved?.heroTitleTh || master?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: saved?.heroTitleEn || master?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: saved?.heroSubtitleTh || master?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: saved?.heroSubtitleEn || master?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: saved?.heroImage || master?.heroImage || def.defaultImage,
            ctaTextTh: saved?.ctaTextTh || master?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อกับเรา',
            ctaTextEn: saved?.ctaTextEn || master?.ctaTextEn || def.defaultCtaTextEn || 'Financing with Us',
            ctaLink: saved?.ctaLink || master?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: saved?.contentTh || master?.contentTh || '',
            contentEn: saved?.contentEn || master?.contentEn || '',
            items: (saved?.items && saved.items.length > 0) ? saved.items : (master?.items || def.defaultItems || []),
        };
    };

    // Current page content state (saved or fallback to master default)
    const [editContent, setEditContent] = useState<PageCustomContent>(() => {
        return getInitialContent(selectedPageId, activePageDef);
    });

    // When selectedPageId changes, reload form
    const handleSelectPage = (pageId: string) => {
        setSelectedPageId(pageId);
        const def = PAGES_LIST.find((p) => p.id === pageId) || PAGES_LIST[0];
        setEditContent(getInitialContent(pageId, def));
    };

    const updateField = <K extends keyof PageCustomContent>(key: K, value: PageCustomContent[K]) => {
        setEditContent((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Equipment / Feature Items manipulation
    const addItem = () => {
        const newItem: PageSectionItem = {
            id: `item-${Date.now()}`,
            title: 'เครื่องจักร / ฟีเจอร์ใหม่',
            titleEn: 'New Equipment / Feature',
            description: 'รายละเอียดคุณสมบัติ ประสิทธิภาพ และประโยชน์ที่ลูกค้าจะได้รับ',
            descEn: 'Specification details, operating efficiency, and commercial benefits.',
            badge: 'คุณสมบัติเด่น',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            link: '/leasing-application',
        };
        setEditContent((prev) => ({
            ...prev,
            items: [...(prev.items || []), newItem],
        }));
    };

    const removeItem = (id: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).filter((item) => item.id !== id),
        }));
    };

    const updateItemField = (id: string, field: keyof PageSectionItem, value: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleSave = () => {
        const existing = settings.pageContents || {};
        const updatedPages = {
            ...existing,
            [selectedPageId]: {
                ...editContent,
                lastUpdated: new Date().toISOString(),
            },
        };

        updateSettings({ pageContents: updatedPages });
        toast.success(
            lang === 'th'
                ? `บันทึกเนื้อหาหน้า "${activePageDef.nameTh}" เรียบร้อยแล้ว!`
                : `Page "${activePageDef.nameEn}" content saved successfully!`
        );
    };

    const handleReset = () => {
        const def = activePageDef;
        const master = DEFAULT_PAGE_CONTENTS[selectedPageId];
        const freshDefault: PageCustomContent = {
            id: def.id,
            pageName: def.nameTh,
            titleTh: master?.titleTh || def.defaultHeroTitleTh,
            titleEn: master?.titleEn || def.defaultHeroTitleEn,
            metaTitle: master?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: master?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: master?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: master?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: master?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: master?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: master?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: master?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: master?.heroImage || def.defaultImage,
            ctaTextTh: master?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อกับเรา',
            ctaTextEn: master?.ctaTextEn || def.defaultCtaTextEn || 'Financing with Us',
            ctaLink: master?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: master?.contentTh || '',
            contentEn: master?.contentEn || '',
            items: master?.items || def.defaultItems || [],
        };

        setEditContent(freshDefault);

        const existing = { ...(settings.pageContents || {}) };
        delete existing[selectedPageId];
        updateSettings({ pageContents: existing });

        toast.success(
            lang === 'th'
                ? `รีเซ็ตเนื้อหาหน้า "${def.nameTh}" กลับเป็นค่าเริ่มต้นแล้ว`
                : `Reset "${def.nameEn}" to system defaults.`
        );
    };

    // Filter pages list
    const filteredPages = useMemo(() => {
        return PAGES_LIST.filter((p) => {
            const matchesSearch =
                p.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.path.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const categories = ['all', ...new Set(PAGES_LIST.map((p) => p.category))];

    const isPageCustomized = !!settings.pageContents?.[selectedPageId];

    return (
        <div className="space-y-8 max-w-7xl">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'ระบบจัดการเนื้อหาทุกหน้า' : 'Universal Page Content Editor'}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {lang === 'th' ? 'จัดการเนื้อหาทุกหน้าของเว็บไซต์' : 'Edit Content Across All Pages'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {lang === 'th'
                            ? 'เลือหน้าที่ต้องการแก้ไข ปรับแต่งข้อความพาดหัว สโลแกน รายการเครื่องจักร ภาพประกอบ และ SEO ได้ครบจบในที่เดียว'
                            : 'Select any page to customize headlines, descriptions, equipment cards, images, and SEO metadata.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={activePageDef.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>{lang === 'th' ? 'ดูหน้าเว็บจริง' : 'View Live Page'}</span>
                    </a>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>{lang === 'th' ? 'รีเซ็ตหน้านี้' : 'Reset Page'}</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        <span>{lang === 'th' ? 'บันทึกข้อมูลหน้านี้' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Layout: Left Page Selector (4 cols) & Right Editor Form (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Page Navigator */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="glass rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-sky-400" />
                                {lang === 'th' ? 'เลือกหน้าที่ต้องการแก้ไข' : 'Select Page'}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                {filteredPages.length} {lang === 'th' ? 'หน้า' : 'pages'}
                            </span>
                        </div>

                        {/* Search input */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={lang === 'th' ? 'ค้นหาชื่อหน้า หรือ URL...' : 'Search page or url...'}
                                className="w-full pl-8 pr-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-white/5 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {cat === 'all' ? (lang === 'th' ? 'ทั้งหมด' : 'All') : cat}
                                </button>
                            ))}
                        </div>

                        {/* Page items list */}
                        <div className="max-h-[580px] overflow-y-auto space-y-1.5 pr-1 pt-2">
                            {filteredPages.map((page) => {
                                const isSelected = page.id === selectedPageId;
                                const hasCustom = !!settings.pageContents?.[page.id];
                                return (
                                    <button
                                        key={page.id}
                                        type="button"
                                        onClick={() => handleSelectPage(page.id)}
                                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 group ${
                                            isSelected
                                                ? 'border-primary bg-primary/10 shadow-sm'
                                                : 'border-border/60 hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <p className={`text-xs font-bold truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                    {lang === 'th' ? page.nameTh : page.nameEn}
                                                </p>
                                                {hasCustom && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="มีข้อมูลแก้ไขพิเศษ" />
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                                                {page.path}
                                            </p>
                                        </div>

                                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground shrink-0">
                                            {page.category}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Form Editor */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Page Active Banner */}
                    <div className="glass rounded-2xl p-5 flex items-center justify-between gap-4 border-l-4 border-l-primary">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-bold text-foreground truncate">
                                    {lang === 'th' ? activePageDef.nameTh : activePageDef.nameEn}
                                </h2>
                                {isPageCustomized ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                                        <CheckCircle className="w-3 h-3" />
                                        <span>กำหนดเอง (Customized)</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-semibold">
                                        <span>ค่าเริ่มต้น (Default)</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-mono text-muted-foreground mt-0.5">
                                URL Path: <a href={activePageDef.path} target="_blank" rel="noreferrer" className="text-primary hover:underline">{activePageDef.path}</a>
                            </p>
                        </div>

                        <a
                            href={activePageDef.path}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 p-2 rounded-xl bg-navy-light hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                            title="เปิดดูหน้าจริง"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Section 1: Hero Banner Text (TH / EN) */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '1. ส่วนหัวและแบนเนอร์หลัก (Hero Section)' : '1. Hero Section'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge ป้ายกำกับ (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeTh || ''}
                                    onChange={(e) => updateField('heroBadgeTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น SMART INDUSTRY"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge Label (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeEn || ''}
                                    onChange={(e) => updateField('heroBadgeEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. SMART INDUSTRY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    พาดหัวหลัก Hero Title (TH) *
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleTh || ''}
                                    onChange={(e) => updateField('heroTitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความพาดหัวหลักของหน้าภาษาไทย"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Hero Title (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleEn || ''}
                                    onChange={(e) => updateField('heroTitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Hero headline in English"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    คำบรรยายรอง Subtitle (TH)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleTh || ''}
                                    onChange={(e) => updateField('heroSubtitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความบรรยายรายละเอียดใต้พาดหัว"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Subtitle (EN)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleEn || ''}
                                    onChange={(e) => updateField('heroSubtitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Intro description in English"
                                />
                            </div>
                        </div>

                        {/* Hero Image URL */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                URL รูปภาพประกอบหลัก (Hero Image URL)
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <ImageIcon className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={editContent.heroImage || ''}
                                        onChange={(e) => updateField('heroImage', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                        placeholder="https://... หรือ /assets/..."
                                    />
                                </div>
                                {editContent.heroImage && (
                                    <img
                                        src={editContent.heroImage}
                                        alt="Preview"
                                        className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ข้อความปุ่ม CTA (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextTh || ''}
                                    onChange={(e) => updateField('ctaTextTh', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น ขอสินเชื่อด่วน"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    CTA Button Text (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextEn || ''}
                                    onChange={(e) => updateField('ctaTextEn', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. Apply Now"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ลิงก์ปลายทาง (Link URL)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaLink || ''}
                                    onChange={(e) => updateField('ctaLink', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary font-mono"
                                    placeholder="/leasing-application"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Section / Equipment Items */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-sky-400" />
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                    {lang === 'th' ? '2. รายการเครื่องจักร & ไฮไลต์ (Section Items)' : '2. Highlighted Items'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={addItem}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{lang === 'th' ? 'เพิ่มรายการ' : 'Add Item'}</span>
                            </button>
                        </div>

                        {(!editContent.items || editContent.items.length === 0) ? (
                            <div className="text-center py-6 border border-dashed border-border rounded-xl">
                                <p className="text-xs text-muted-foreground">
                                    {lang === 'th'
                                        ? 'ยังไม่มีรายการเครื่องจักรที่กำหนดเอง (ระบบจะใช้รายการพื้นฐานของหน้านี้)'
                                        : 'No custom section items added. Default template items will be used.'}
                                </p>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="mt-2 text-xs font-semibold text-primary hover:underline"
                                >
                                    + {lang === 'th' ? 'คลิกเพื่อเพิ่มรายการแรก' : 'Click to add first item'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {editContent.items.map((item, index) => (
                                    <div key={item.id} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary">
                                                #{index + 1} {item.title || 'รายการใหม่'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive p-1"
                                                title="ลบรายการนี้"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ชื่อเครื่องจักร / หัวข้อ (TH)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateItemField(item.id, 'title', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Title (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.titleEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'titleEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    คำอธิบาย (TH)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.description}
                                                    onChange={(e) => updateItemField(item.id, 'description', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Description (EN)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.descEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'descEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    URL รูปภาพ
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.image || ''}
                                                    onChange={(e) => updateItemField(item.id, 'image', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ป้ายกำกับ (Badge Tag)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.badge || ''}
                                                    onChange={(e) => updateItemField(item.id, 'badge', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="เช่น มาตรฐานสากล"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Section 3: SEO Metadata */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '3. ข้อมูล SEO & Search Engines' : '3. SEO & Metadata'}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Title (ชื่อที่จะปรากฏบนแถบเบราว์เซอร์และผลการค้นหา Google)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.metaTitle || ''}
                                    onChange={(e) => updateField('metaTitle', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น สินเชื่อโรงงานผลิตน้ำดื่ม | Agile Assets"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Description (คำอธิบายย่อสำหรับการค้นหา)
                                </label>
                                <textarea
                                    rows={2}
                                    value={editContent.metaDescription || ''}
                                    onChange={(e) => updateField('metaDescription', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="คำอธิบายสรุปความยาวประมาณ 120-160 ตัวอักษร"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-between p-4 glass rounded-2xl">
                        <span className="text-xs text-muted-foreground">
                            {lang === 'th'
                                ? 'อย่าลืมกด "บันทึกข้อมูลหน้านี้" เพื่อบันทึกการแก้ไขลงในระบบ'
                                : 'Remember to click Save Changes to apply your updates.'}
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                            >
                                {lang === 'th' ? 'รีเซ็ตหน้านี้' : 'Reset'}
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01]"
                            >
                                {lang === 'th' ? 'บันทึกข้อมูลหน้านี้' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
