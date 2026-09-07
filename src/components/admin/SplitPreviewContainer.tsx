import { useState, useEffect, type ReactNode } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2, Sparkles, RefreshCw, ExternalLink, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { IFramePreview } from '@/components/admin/IFramePreview';

interface SplitPreviewContainerProps {
    title: string;
    description: string;
    children: ReactNode; // Left Form Editor (40%)
    preview: ReactNode;  // Right Live Preview (60%)
    previewTitle?: string;
    actionButtons?: ReactNode;
    liveUrl?: string;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function SplitPreviewContainer({
    title,
    description,
    children,
    preview,
    previewTitle,
    actionButtons,
    liveUrl = '/',
}: SplitPreviewContainerProps) {
    const { lang } = useLanguage();
    const { theme: globalTheme } = useTheme();
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    // Live preview theme state: defaults to current global theme and tracks it
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(globalTheme);

    useEffect(() => {
        setPreviewTheme(globalTheme);
    }, [globalTheme]);

    const refreshPreview = () => setPreviewKey((prev) => prev + 1);

    const togglePreviewTheme = () => {
        setPreviewTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="space-y-6">
            {/* Top Title & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
                        <span>{title}</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                            Live 40/60
                        </span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
                {actionButtons && <div className="flex items-center gap-3">{actionButtons}</div>}
            </div>

            {/* Main Split Grid (40% Form / 60% Live Preview) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Pane (40% width on Desktop: lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass rounded-2xl p-5 border border-border shadow-sm">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
                            <span>{lang === 'th' ? '📝 ส่วนกรอกข้อมูล / แก้ไข' : '📝 Editor Form (40%)'}</span>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Right Pane (60% width on Desktop: lg:col-span-7) */}
                <div
                    className={`lg:col-span-7 transition-all duration-300 ${
                        isFullscreen
                            ? 'fixed inset-4 z-[100] bg-background/98 backdrop-blur-2xl p-6 rounded-3xl border border-sky-400/40 shadow-2xl overflow-y-auto flex flex-col'
                            : 'sticky top-20'
                    }`}
                >
                    <div className="rounded-2xl border border-border overflow-hidden shadow-xl flex flex-col bg-card">
                        {/* Preview Toolbar */}
                        <div className="px-4 py-3 bg-muted/40 border-b border-border flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                                <span>{previewTitle || (lang === 'th' ? 'พรีวิวผลลัพธ์บนหน้าเว็บจริง (60%)' : 'Live Real-Time Preview')}</span>
                            </div>

                            {/* Controls Right */}
                            <div className="flex items-center gap-2">
                                {/* Open Live Web Page for this section */}
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 transition-all border border-sky-500/30 text-xs flex items-center gap-1.5 font-semibold px-2.5 shadow-sm active:scale-95"
                                    title={lang === 'th' ? `ดูหน้านี้บนเว็บจริง (${liveUrl}) ในแท็บใหม่` : `View live page (${liveUrl}) in a new tab`}
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">{lang === 'th' ? 'ดูหน้านี้บนเว็บจริง' : 'View Live Page'}</span>
                                </a>

                                {/* Theme Mode Switcher for Preview */}
                                <button
                                    type="button"
                                    onClick={togglePreviewTheme}
                                    className="p-1.5 rounded-lg bg-background hover:bg-accent text-foreground transition-all border border-border flex items-center gap-1.5 text-xs font-semibold px-2.5 shadow-sm active:scale-95"
                                    title={
                                        lang === 'th'
                                            ? `สลับธีมพรีวิว (ปัจจุบัน: ${previewTheme === 'dark' ? 'Dark Mode' : 'Light Mode'})`
                                            : `Toggle preview theme (${previewTheme})`
                                    }
                                >
                                    {previewTheme === 'dark' ? (
                                        <>
                                            <Moon className="w-3.5 h-3.5 text-amber-400" />
                                            <span className="hidden sm:inline">Dark</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                                            <span className="hidden sm:inline">Light</span>
                                        </>
                                    )}
                                </button>

                                {/* Device Switcher */}
                                <div className="flex items-center bg-background rounded-lg p-1 border border-border">
                                    <button
                                        type="button"
                                        onClick={() => setDeviceMode('desktop')}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                            deviceMode === 'desktop' ? 'bg-sky-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        title="Desktop View (100%)"
                                    >
                                        <Monitor className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Desktop</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeviceMode('tablet')}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                            deviceMode === 'tablet' ? 'bg-sky-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        title="Tablet View (768px)"
                                    >
                                        <Tablet className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Tablet</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeviceMode('mobile')}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                            deviceMode === 'mobile' ? 'bg-sky-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        title="Mobile View (375px)"
                                    >
                                        <Smartphone className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Mobile</span>
                                    </button>
                                </div>

                                {/* Refresh */}
                                <button
                                    type="button"
                                    onClick={refreshPreview}
                                    className="p-1.5 rounded-lg bg-background hover:bg-accent text-foreground transition-colors border border-border"
                                    title="Refresh preview canvas"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>

                                {/* Fullscreen Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-1.5 rounded-lg bg-background hover:bg-accent text-foreground transition-colors border border-border"
                                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
                                >
                                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Chrome Mockup Sub-bar */}
                        <div className="px-4 py-1.5 bg-muted/25 border-b border-border flex items-center gap-2 text-[11px] text-muted-foreground">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="flex-1 bg-background rounded px-3 py-0.5 text-[11px] text-foreground/80 font-mono text-center truncate mx-4 border border-border">
                                https://agileassets.co.th{liveUrl.startsWith('/') ? liveUrl : `/${liveUrl}`} ({previewTheme.toUpperCase()})
                            </div>
                            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                {deviceMode === 'desktop' ? '100% Desktop View' : deviceMode === 'tablet' ? '768px Tablet Frame' : '375px Mobile Frame'}
                            </div>
                        </div>

                        {/* Interactive Preview Canvas Window */}
                        <div className="p-2 sm:p-4 overflow-y-auto max-h-[82vh] overflow-x-auto flex justify-center bg-muted/10">
                            {deviceMode === 'mobile' ? (
                                <div
                                    key={`${previewKey}-${previewTheme}`}
                                    className="w-[375px] max-w-full h-[680px] max-h-[75vh] rounded-[2.5rem] border-[10px] border-slate-800 dark:border-slate-900 shadow-2xl my-3 bg-background flex-shrink-0 shadow-sky-500/15 flex flex-col overflow-hidden relative ring-1 ring-border"
                                >
                                    {/* Smartphone Dynamic Island Mockup */}
                                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-24 h-4 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center pointer-events-none shadow-sm">
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2 opacity-70" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
                                    </div>

                                    {/* Isolated True 375px Viewport IFrame */}
                                    <div className="flex-1 w-full h-full pt-6 overflow-hidden">
                                        <IFramePreview deviceWidth={375} title="375px Mobile Frame" theme={previewTheme}>
                                            <div className={previewTheme}>
                                                {preview}
                                            </div>
                                        </IFramePreview>
                                    </div>

                                    {/* iPhone Home Indicator Bar */}
                                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 w-28 h-1 bg-slate-400/40 rounded-full pointer-events-none" />
                                </div>
                            ) : deviceMode === 'tablet' ? (
                                <div
                                    key={`${previewKey}-${previewTheme}`}
                                    className="w-[768px] max-w-full h-[720px] max-h-[75vh] rounded-3xl border-[8px] border-slate-800 dark:border-slate-900 shadow-2xl my-2 bg-background flex-shrink-0 shadow-sky-500/15 flex flex-col overflow-hidden relative ring-1 ring-border"
                                >
                                    {/* Tablet Front Camera */}
                                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 w-2.5 h-2.5 rounded-full bg-slate-950 opacity-70 pointer-events-none shadow-sm" />

                                    {/* Isolated True 768px Viewport IFrame */}
                                    <div className="flex-1 w-full h-full pt-4 overflow-hidden">
                                        <IFramePreview deviceWidth={768} title="768px Tablet Frame" theme={previewTheme}>
                                            <div className={previewTheme}>
                                                {preview}
                                            </div>
                                        </IFramePreview>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={`${previewKey}-${previewTheme}`}
                                    className="w-full h-[74vh] max-h-[74vh] rounded-xl border border-border shadow-inner bg-background overflow-hidden"
                                >
                                    <IFramePreview title="Desktop Preview" theme={previewTheme}>
                                        <div className={`min-h-full ${previewTheme}`}>
                                            {preview}
                                        </div>
                                    </IFramePreview>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
