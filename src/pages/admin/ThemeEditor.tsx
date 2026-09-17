import { useState } from 'react';
import { useSiteSettings, DEFAULT_THEME_SETTINGS, applyThemeToDom } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ThemeSettings } from '@/types';
import { 
    Palette, Save, RotateCcw, ExternalLink, Sparkles, Check, 
    ArrowRight, CheckCircle2, Sliders, Eye 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Preset {
    id: string;
    nameTh: string;
    nameEn: string;
    primary: string;
    start: string;
    end: string;
    accent: string;
    textColor: string;
}

const PRESETS: Preset[] = [
    {
        id: 'sky',
        nameTh: 'Agile Signature Sky Blue (ค่าเริ่มต้น)',
        nameEn: 'Agile Signature Sky Blue (Default)',
        primary: '#0284c7',
        start: '#0284c7',
        end: '#0369a1',
        accent: '#38bdf8',
        textColor: '#ffffff',
    },
    {
        id: 'navy',
        nameTh: 'Corporate Deep Navy (สุขุม น่าเชื่อถือ)',
        nameEn: 'Corporate Deep Navy',
        primary: '#1e40af',
        start: '#2563eb',
        end: '#1e40af',
        accent: '#60a5fa',
        textColor: '#ffffff',
    },
    {
        id: 'emerald',
        nameTh: 'Eco Emerald Green (พลังงานสะอาด ESG)',
        nameEn: 'Eco Emerald Green (ESG)',
        primary: '#059669',
        start: '#10b981',
        end: '#047857',
        accent: '#34d399',
        textColor: '#ffffff',
    },
    {
        id: 'amber',
        nameTh: 'Vibrant Amber Gold (มั่งคั่ง โดดเด่น)',
        nameEn: 'Vibrant Amber Gold',
        primary: '#d97706',
        start: '#f59e0b',
        end: '#b45309',
        accent: '#fbbf24',
        textColor: '#ffffff',
    },
    {
        id: 'violet',
        nameTh: 'Modern Royal Violet (นวัตกรรม เทคโนโลยี)',
        nameEn: 'Modern Royal Violet',
        primary: '#7c3aed',
        start: '#8b5cf6',
        end: '#6d28d9',
        accent: '#a78bfa',
        textColor: '#ffffff',
    },
    {
        id: 'crimson',
        nameTh: 'Bold Crimson (หนักแน่น ทันสมัย)',
        nameEn: 'Bold Crimson Red',
        primary: '#dc2626',
        start: '#ef4444',
        end: '#b91c1c',
        accent: '#f87171',
        textColor: '#ffffff',
    },
    {
        id: 'slate',
        nameTh: 'Minimalist Charcoal Slate (พรีเมียม เรียบหรู)',
        nameEn: 'Minimalist Charcoal Slate',
        primary: '#334155',
        start: '#475569',
        end: '#1e293b',
        accent: '#94a3b8',
        textColor: '#ffffff',
    },
];

export function ThemeEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [theme, setTheme] = useState<ThemeSettings>(() => {
        return settings.themeSettings || DEFAULT_THEME_SETTINGS;
    });

    const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark');

    // Live preview update
    const updateThemeField = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
        const nextTheme = { ...theme, [key]: value };
        setTheme(nextTheme);
        applyThemeToDom(nextTheme);
    };

    const applyPreset = (preset: Preset) => {
        const nextTheme: ThemeSettings = {
            ...theme,
            primaryColor: preset.primary,
            gradientStart: preset.start,
            gradientEnd: preset.end,
            accentColor: preset.accent,
            buttonTextColor: preset.textColor,
        };
        setTheme(nextTheme);
        applyThemeToDom(nextTheme);
        toast.success(lang === 'th' ? `เลือกโทนสี "${preset.nameTh}" แล้ว` : `Preset "${preset.nameEn}" applied`);
    };

    const handleSave = () => {
        updateSettings({ themeSettings: theme });
        applyThemeToDom(theme);
        toast.success(lang === 'th' ? 'บันทึกการตั้งค่าสีและธีมสำเร็จแล้ว!' : 'Theme settings saved successfully!');
    };

    const handleReset = () => {
        setTheme(DEFAULT_THEME_SETTINGS);
        updateSettings({ themeSettings: DEFAULT_THEME_SETTINGS });
        applyThemeToDom(DEFAULT_THEME_SETTINGS);
        toast.success(lang === 'th' ? 'รีเซ็ตกลับเป็นค่าเริ่มต้นเรียบร้อย' : 'Reset to default theme');
    };

    const radiusClasses: Record<string, string> = {
        'rounded-md': 'rounded-md',
        'rounded-xl': 'rounded-xl',
        'rounded-2xl': 'rounded-2xl',
        'rounded-full': 'rounded-full',
    };

    const activeRadiusClass = radiusClasses[theme.buttonRadius] || 'rounded-xl';

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                        <Palette className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'การตั้งค่าธีม & สีปุ่ม' : 'Theme & Button Styles'}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {lang === 'th' ? 'ปรับแต่งสีปุ่มและธีมของเว็บ' : 'Button & Brand Appearance Customizer'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {lang === 'th'
                            ? 'กำหนดโทนสีหลัก สีกราเดียนต์ และรูปทรงของปุ่มทุกปุ่มบนเว็บไซต์ โดยแสดงผลแบบเรียลไทม์ทันที'
                            : 'Customize primary buttons, gradient highlights, and button radius across the entire website in real-time.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>{lang === 'th' ? 'ดูหน้าเว็บจริง' : 'View Live Site'}</span>
                    </a>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>{lang === 'th' ? 'รีเซ็ต' : 'Reset'}</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        <span>{lang === 'th' ? 'บันทึกการตั้งค่า' : 'Save Theme'}</span>
                    </button>
                </div>
            </div>

            {/* Presets Row */}
            <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            {lang === 'th' ? '1. เลือกชุดโทนสีสำเร็จรูป (Color Presets)' : '1. Choose Color Preset'}
                        </h2>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {lang === 'th' ? 'หรือปรับแต่งสีเองด้านล่าง' : 'Or fine-tune custom colors below'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {PRESETS.map((preset) => {
                        const isSelected = theme.primaryColor === preset.primary && theme.gradientStart === preset.start;
                        return (
                            <button
                                key={preset.id}
                                type="button"
                                onClick={() => applyPreset(preset)}
                                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 group hover:scale-[1.02] active:scale-[0.98] ${
                                    isSelected
                                        ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/30'
                                        : 'border-border bg-card/60 hover:bg-white/5'
                                }`}
                            >
                                <div
                                    className="w-8 h-8 rounded-lg shadow-inner shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, ${preset.start} 0%, ${preset.end} 100%)`,
                                    }}
                                >
                                    {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-bold text-foreground truncate">
                                        {lang === 'th' ? preset.nameTh : preset.nameEn}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.start }} />
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.end }} />
                                        <span className="text-[10px] text-muted-foreground font-mono">{preset.primary}</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom Color Controls & Live Interactive Preview (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Controls (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Color Pickers */}
                    <div className="glass rounded-2xl p-6 space-y-5">
                        <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-sky-400" />
                            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '2. ปรับแต่งรหัสสีอิสระ (Custom Hex Color)' : '2. Custom Color Pickers'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Primary Button Color */}
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    {lang === 'th' ? 'สีปุ่มหลัก (Primary Color)' : 'Primary Button Color'}
                                </label>
                                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-navy-light border border-border">
                                    <input
                                        type="color"
                                        value={theme.primaryColor}
                                        onChange={(e) => updateThemeField('primaryColor', e.target.value)}
                                        className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={theme.primaryColor}
                                        onChange={(e) => updateThemeField('primaryColor', e.target.value)}
                                        className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none uppercase"
                                    />
                                </div>
                            </div>

                            {/* Accent Glow Color */}
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    {lang === 'th' ? 'สีประกาย / เส้นขอบ (Accent Glow)' : 'Accent & Focus Ring'}
                                </label>
                                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-navy-light border border-border">
                                    <input
                                        type="color"
                                        value={theme.accentColor}
                                        onChange={(e) => updateThemeField('accentColor', e.target.value)}
                                        className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={theme.accentColor}
                                        onChange={(e) => updateThemeField('accentColor', e.target.value)}
                                        className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none uppercase"
                                    />
                                </div>
                            </div>

                            {/* Gradient Start */}
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    {lang === 'th' ? 'สีกราเดียนต์เริ่มต้น (Gradient From)' : 'Gradient Start'}
                                </label>
                                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-navy-light border border-border">
                                    <input
                                        type="color"
                                        value={theme.gradientStart}
                                        onChange={(e) => updateThemeField('gradientStart', e.target.value)}
                                        className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={theme.gradientStart}
                                        onChange={(e) => updateThemeField('gradientStart', e.target.value)}
                                        className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none uppercase"
                                    />
                                </div>
                            </div>

                            {/* Gradient End */}
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    {lang === 'th' ? 'สีกราเดียนต์สิ้นสุด (Gradient To)' : 'Gradient End'}
                                </label>
                                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-navy-light border border-border">
                                    <input
                                        type="color"
                                        value={theme.gradientEnd}
                                        onChange={(e) => updateThemeField('gradientEnd', e.target.value)}
                                        className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={theme.gradientEnd}
                                        onChange={(e) => updateThemeField('gradientEnd', e.target.value)}
                                        className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none uppercase"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shape & Button Radius Controls */}
                    <div className="glass rounded-2xl p-6 space-y-5">
                        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            {lang === 'th' ? '3. รูปทรงและความโค้งมนของปุ่ม (Button Shape & Radius)' : '3. Button Radius & Style'}
                        </h2>

                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-2">
                                {lang === 'th' ? 'ความโค้งมนของขอบปุ่ม (Border Radius)' : 'Border Radius'}
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {[
                                    { id: 'rounded-md', label: 'มนเล็ก (6px)', sample: 'rounded-md' },
                                    { id: 'rounded-xl', label: 'มาตรฐาน (12px)', sample: 'rounded-xl' },
                                    { id: 'rounded-2xl', label: 'มนมาก (16px)', sample: 'rounded-2xl' },
                                    { id: 'rounded-full', label: 'แคปซูล (Pill)', sample: 'rounded-full' },
                                ].map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => updateThemeField('buttonRadius', r.id as ThemeSettings['buttonRadius'])}
                                        className={`p-3 border text-center transition-all ${r.sample} ${
                                            theme.buttonRadius === r.id
                                                ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                                                : 'border-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        }`}
                                    >
                                        <span className="text-xs block">{r.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-2">
                                {lang === 'th' ? 'เอฟเฟกต์ปุ่มกด (Button Style Effect)' : 'Button Style Effect'}
                            </label>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { id: 'gradient', labelTh: 'กราเดียนต์มิติสูง', labelEn: 'Vibrant Gradient' },
                                    { id: 'solid', labelTh: 'สีพื้นเรียบหรู', labelEn: 'Solid Flat' },
                                    { id: 'glow', labelTh: 'เรืองแสงหรูหรา', labelEn: 'Soft Ambient Glow' },
                                ].map((s) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => updateThemeField('buttonStyle', s.id as ThemeSettings['buttonStyle'])}
                                        className={`p-3 rounded-xl border text-center transition-all ${
                                            theme.buttonStyle === s.id
                                                ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                                                : 'border-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        }`}
                                    >
                                        <span className="text-xs block">{lang === 'th' ? s.labelTh : s.labelEn}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Interactive Preview (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass rounded-2xl p-6 sticky top-20 space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-sky-400" />
                                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                    {lang === 'th' ? 'ตัวอย่างปุ่มจริง (Live Preview)' : 'Interactive Preview'}
                                </h2>
                            </div>
                            {/* Preview Mode toggle */}
                            <div className="flex items-center p-0.5 rounded-lg border border-border bg-navy-light text-xs">
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode('dark')}
                                    className={`px-2 py-1 rounded-md transition-all ${
                                        previewMode === 'dark' ? 'bg-navy font-bold text-foreground shadow' : 'text-muted-foreground'
                                    }`}
                                >
                                    Dark
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode('light')}
                                    className={`px-2 py-1 rounded-md transition-all ${
                                        previewMode === 'light' ? 'bg-white font-bold text-slate-900 shadow' : 'text-muted-foreground'
                                    }`}
                                >
                                    Light
                                </button>
                            </div>
                        </div>

                        {/* Simulated Canvas */}
                        <div
                            className={`p-6 rounded-2xl border border-border transition-colors duration-300 space-y-5 ${
                                previewMode === 'dark' ? 'bg-[#0b1528] text-white' : 'bg-slate-50 text-slate-900'
                            }`}
                        >
                            <p className="text-xs text-muted-foreground text-center">
                                {lang === 'th' ? 'ทดสอบกดเพื่อดูความลื่นไหลและสีสันจริง' : 'Click buttons to test feel & appearance'}
                            </p>

                            {/* 1. Primary CTA Button (Hero Sized) */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                                    Primary CTA Button (ปุ่มหลักขนาดใหญ่)
                                </span>
                                <button
                                    type="button"
                                    style={{
                                        background:
                                            theme.buttonStyle === 'solid'
                                                ? theme.primaryColor
                                                : `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`,
                                        color: theme.buttonTextColor,
                                        boxShadow:
                                            theme.buttonStyle === 'glow'
                                                ? `0 10px 25px -5px ${theme.accentColor}60`
                                                : `0 10px 25px -5px ${theme.primaryColor}40`,
                                    }}
                                    className={`w-full py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${activeRadiusClass}`}
                                >
                                    <span>{lang === 'th' ? 'ขอสินเชื่อกับเรา (Financing with Us)' : '$ Financing with Us'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* 2. Secondary & Outline */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                                    Secondary & Action Buttons
                                </span>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        style={{
                                            borderColor: `${theme.primaryColor}60`,
                                            color: theme.primaryColor,
                                        }}
                                        className={`py-2.5 px-4 font-semibold text-xs border flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all cursor-pointer ${activeRadiusClass}`}
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>คำนวณสินเชื่อ</span>
                                    </button>
                                    <button
                                        type="button"
                                        style={{
                                            background: `${theme.primaryColor}20`,
                                            color: theme.primaryColor,
                                        }}
                                        className={`py-2.5 px-4 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-pointer ${activeRadiusClass}`}
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>สมัครงาน</span>
                                    </button>
                                </div>
                            </div>

                            {/* 3. Small Badge / Tag */}
                            <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                                <span className="text-muted-foreground text-[11px]">Active Color Code:</span>
                                <span className="font-mono text-xs font-bold" style={{ color: theme.primaryColor }}>
                                    {theme.primaryColor}
                                </span>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-muted-foreground flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>
                                {lang === 'th'
                                    ? 'การเปลี่ยนแปลงจะถูกส่งต่อไปยังตัวแปร CSS ของระบบ และมีผลต่อทั้งหน้าบ้านและระบบหลังบ้านทันทีที่กดบันทึก'
                                    : 'Saved changes dynamically map to root CSS tokens and apply across all pages and buttons.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
