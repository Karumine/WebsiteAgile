import { useState, type ReactNode } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2, Sparkles, RefreshCw, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    const refreshPreview = () => setPreviewKey((prev) => prev + 1);

    return (
        <div className="space-y-6">
            {/* Top Title & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
                        <span>{title}</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-xs font-bold uppercase tracking-wider text-sky-400">
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
                    <div className="glass rounded-2xl border border-sky-400/30 overflow-hidden shadow-xl flex flex-col bg-slate-950/40">
                        {/* Preview Toolbar */}
                        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                                <Sparkles className="w-4 h-4 text-sky-400" />
                                <span>{previewTitle || (lang === 'th' ? 'พรีวิวผลลัพธ์บนหน้าเว็บจริง (60%)' : 'Live Real-Time Preview')}</span>
                            </div>

                            {/* Controls Right */}
                            <div className="flex items-center gap-2">
                                {/* Open Live Web Page */}
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 transition-colors border border-slate-700 text-xs flex items-center gap-1 font-semibold px-2.5"
                                    title="เปิดหน้าเว็บจริงในแท็บใหม่"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">{lang === 'th' ? 'เปิดเว็บจริง' : 'Live Page'}</span>
                                </a>

                                {/* Device Switcher */}
                                <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setDeviceMode('desktop')}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                            deviceMode === 'desktop' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
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
                                            deviceMode === 'tablet' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
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
                                            deviceMode === 'mobile' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
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
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                                    title="Refresh preview canvas"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>

                                {/* Fullscreen Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
                                >
                                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Chrome Mockup Sub-bar */}
                        <div className="px-4 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <div className="flex-1 bg-slate-800/60 rounded px-3 py-0.5 text-[11px] text-slate-300 font-mono text-center truncate mx-4 border border-slate-700/50">
                                https://agileassets.co.th{liveUrl} (Live Reactive Preview)
                            </div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {deviceMode === 'desktop' ? '100% Desktop View' : deviceMode === 'tablet' ? '768px Tablet Frame' : '375px Mobile Frame'}
                            </div>
                        </div>

                        {/* Interactive Preview Canvas Window */}
                        <div className="p-2 sm:p-4 overflow-y-auto max-h-[82vh] overflow-x-auto flex justify-center bg-slate-950/20 @container">
                            <div
                                key={previewKey}
                                className={`transition-all duration-500 @container ${
                                    deviceMode === 'mobile'
                                        ? 'w-[375px] max-w-full max-h-[68vh] overflow-y-auto overflow-x-hidden rounded-3xl border-8 border-slate-800 shadow-2xl my-3 bg-background flex-shrink-0 shadow-sky-500/10'
                                        : deviceMode === 'tablet'
                                        ? 'w-[768px] max-w-full max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-2xl border-4 border-slate-800 shadow-2xl my-2 bg-background flex-shrink-0 shadow-sky-500/10'
                                        : 'w-full max-h-[72vh] overflow-y-auto overflow-x-hidden rounded-xl border border-slate-800/60 bg-background'
                                }`}
                            >
                                {preview}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
