/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { SiteSettings, ThemeSettings } from '@/types';
import defaultSettingsData from '@/data/defaultSettings.json';
import { cmsService, type PublicSiteData } from '@/services/cmsService';
import { useAuth } from '@/contexts/AuthContext';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';

import { generateThemePalette } from '@/utils/themeColors';

const STORAGE_KEY = 'agile_assets_settings';

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
    primaryColor: '#0284c7',
    gradientStart: '#0284c7',
    gradientEnd: '#0369a1',
    buttonTextColor: '#ffffff',
    buttonRadius: 'rounded-xl',
    buttonStyle: 'gradient',
    accentColor: '#38bdf8',
};

export function applyThemeToDom(theme?: ThemeSettings) {
    if (typeof document === 'undefined') return;
    const activeTheme = theme || DEFAULT_THEME_SETTINGS;
    const root = document.documentElement;
    const palette = generateThemePalette(activeTheme);

    // Root brand variables
    root.style.setProperty('--primary', activeTheme.primaryColor);
    root.style.setProperty('--grad-primary-1', activeTheme.gradientStart);
    root.style.setProperty('--grad-primary-2', activeTheme.gradientEnd);
    root.style.setProperty('--ring', activeTheme.accentColor);
    root.style.setProperty('--accent', activeTheme.accentColor);

    // Dynamic brand shades (overrides sky-* and blue-* color system across site)
    root.style.setProperty('--theme-sky-50', palette.sky50);
    root.style.setProperty('--theme-sky-100', palette.sky100);
    root.style.setProperty('--theme-sky-200', palette.sky200);
    root.style.setProperty('--theme-sky-300', palette.sky300);
    root.style.setProperty('--theme-sky-400', palette.sky400);
    root.style.setProperty('--theme-sky-500', palette.sky500);
    root.style.setProperty('--theme-sky-600', palette.sky600);
    root.style.setProperty('--theme-sky-700', palette.sky700);
    root.style.setProperty('--theme-sky-800', palette.sky800);
    root.style.setProperty('--theme-sky-900', palette.sky900);
    root.style.setProperty('--theme-sky-950', palette.sky950);
    root.style.setProperty('--theme-blue-600', palette.blue600);

    // RGB components
    root.style.setProperty('--primary-rgb', palette.primaryRgb);
    root.style.setProperty('--accent-rgb', palette.accentRgb);

    // Ambient aura, glowing borders, and card effects
    root.style.setProperty('--glow-color', `rgba(${palette.accentRgb}, 0.35)`);
    root.style.setProperty('--glow-color-lg', `rgba(${palette.accentRgb}, 0.5)`);
    root.style.setProperty('--ambient-glow-1', `rgba(${palette.accentRgb}, 0.2)`);
    root.style.setProperty('--ambient-glow-2', `rgba(${palette.accentRgb}, 0.05)`);
    root.style.setProperty('--ambient-glow-blue', `rgba(${palette.primaryRgb}, 0.18)`);
    root.style.setProperty('--glass-card-hover-border', `rgba(${palette.accentRgb}, 0.35)`);
    root.style.setProperty('--glass-card-hover-shadow', `rgba(${palette.accentRgb}, 0.18)`);

    // Radius
    const radiusMap: Record<string, string> = {
        'rounded-md': '0.375rem',
        'rounded-xl': '0.75rem',
        'rounded-2xl': '1rem',
        'rounded-full': '9999px',
    };
    const radius = radiusMap[activeTheme.buttonRadius] || '0.75rem';
    root.style.setProperty('--radius', radius);
    root.style.setProperty('--btn-radius', radius);
    root.style.setProperty('--btn-primary-bg', activeTheme.primaryColor);
    root.style.setProperty('--btn-primary-fg', activeTheme.buttonTextColor || '#ffffff');

    // Dynamic button style preset
    if (activeTheme.buttonStyle === 'solid') {
        root.style.setProperty('--btn-primary-bg-style', activeTheme.primaryColor);
        root.style.setProperty('--btn-primary-shadow', `0 10px 25px -5px rgba(${palette.primaryRgb}, 0.35)`);
    } else if (activeTheme.buttonStyle === 'glow') {
        root.style.setProperty('--btn-primary-bg-style', `linear-gradient(135deg, ${activeTheme.gradientStart} 0%, ${activeTheme.gradientEnd} 100%)`);
        root.style.setProperty('--btn-primary-shadow', `0 0 25px 2px rgba(${palette.accentRgb}, 0.6)`);
    } else {
        root.style.setProperty('--btn-primary-bg-style', `linear-gradient(135deg, ${activeTheme.gradientStart} 0%, ${activeTheme.gradientEnd} 100%)`);
        root.style.setProperty('--btn-primary-shadow', `0 10px 25px -5px rgba(${palette.primaryRgb}, 0.4)`);
    }
}

export type PublishableSection = (typeof PUBLISHABLE_KEYS)[number];

interface SiteSettingsContextType {
    settings: SiteSettings;
    /** Updates the local draft + live preview. Nothing reaches the live site until `publish()`. */
    updateSettings: (newSettings: Partial<SiteSettings>) => void;
    resetSettings: () => void;
    /** Sections edited since the last publish (only tracked for backend sessions). */
    pendingSections: PublishableSection[];
    isPublishing: boolean;
    publish: () => Promise<boolean>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const DATA_VERSION = '2026-v4-full-cms-theme';

function loadSettings(): SiteSettings {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as SiteSettings & { _version?: string };
            const hasDummyAssets = parsed.usedMachinery?.some((m) => m.id === 'asset-001' || m.title.includes('เครื่องบรรจุน้ำดื่มอัตโนมัติ 24 หัวจ่าย'));
            const hasDummyNews = parsed.news?.some((n) => n.id === 'news-001' && n.title.includes('แนวโน้มตลาด'));
            const hasDummyCompany = parsed.companyInfo?.phone === '02-123-4567';

            if (hasDummyAssets || hasDummyNews || hasDummyCompany) {
                const fresh = {
                    ...(defaultSettingsData as unknown as SiteSettings),
                    themeSettings: DEFAULT_THEME_SETTINGS,
                    pageContents: {},
                    _version: DATA_VERSION
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
                applyThemeToDom(fresh.themeSettings);
                return fresh;
            }

            // Ensure themeSettings and pageContents are defined
            parsed.themeSettings = parsed.themeSettings || DEFAULT_THEME_SETTINGS;
            parsed.pageContents = parsed.pageContents || {};

            // Unhashed /assets/* paths never exist after a Vite build (older defaults stored one).
            Object.values(parsed.pageContents).forEach((page) => {
                if (page?.heroImage?.startsWith('/assets/')) page.heroImage = '';
            });
            parsed.impactStats = parsed.impactStats || (defaultSettingsData as unknown as SiteSettings).impactStats;
            parsed.companyInfo = parsed.companyInfo || (defaultSettingsData as unknown as SiteSettings).companyInfo;

            // Auto-backfill default data if sections/items are missing, empty, or dummy in saved localStorage
            const homeDefault = DEFAULT_PAGE_CONTENTS['home'];
            if (homeDefault) {
                if (!parsed.pageContents['home']) {
                    parsed.pageContents['home'] = { ...homeDefault };
                } else {
                    const home = parsed.pageContents['home'];
                    const isSolutionsDummy = !home.solutionsItems || home.solutionsItems.length === 0 ||
                        (home.solutionsItems.length === 1 && (home.solutionsItems[0].title === 'กลุ่มอุตสาหกรรมใหม่' || home.solutionsItems[0].title.includes('กลุ่มอุตสาหกรรมใหม่')));
                    if (isSolutionsDummy) {
                        home.solutionsItems = homeDefault.solutionsItems || [];
                    }

                    const isMachineryDummy = !home.machineryItems || home.machineryItems.length === 0 ||
                        (home.machineryItems.length === 1 && (home.machineryItems[0].title === 'เครื่องจักรอุตสาหกรรมใหม่' || home.machineryItems[0].title.includes('เครื่องจักรอุตสาหกรรมใหม่')));
                    if (isMachineryDummy) {
                        home.machineryItems = homeDefault.machineryItems || [];
                    }

                    if (!home.items || home.items.length === 0) {
                        home.items = homeDefault.items || [];
                    }
                }
                // Fix industrial equipment hero badges if they were set to Industry Solutions
                if (parsed.pageContents) {
                    const industrialIds = ['chiller', 'injection-molding', 'generator-set'];
                    industrialIds.forEach(id => {
                        if (parsed.pageContents![id] && parsed.pageContents![id].heroBadgeTh === 'Financing Service • Industry Solutions') {
                            parsed.pageContents![id].heroBadgeTh = 'Financing Service • Industrial Equipment';
                            parsed.pageContents![id].heroBadgeEn = 'Financing Service • Industrial Equipment';
                        }
                    });
                }

                // Persist the clean defaults to localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            }

            parsed._version = DATA_VERSION;
            applyThemeToDom(parsed.themeSettings);
            return parsed;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    const fresh = {
        ...(defaultSettingsData as unknown as SiteSettings),
        themeSettings: DEFAULT_THEME_SETTINGS,
        pageContents: {},
        _version: DATA_VERSION
    };
    applyThemeToDom(fresh.themeSettings);
    return fresh;
}

const SYNC_CHANNEL = 'agile_assets_settings_sync';

const PUBLIC_KEYS = [
    'banner', 'interestRates', 'news', 'companyInfo', 'impactStats',
    'usedMachinery', 'faqs', 'themeSettings', 'pageContents', 'customPages',
] as const;

const PUBLISHABLE_KEYS = [...PUBLIC_KEYS, 'customFields'] as const;

function changedSections(current: SiteSettings, baseline: SiteSettings): PublishableSection[] {
    return PUBLISHABLE_KEYS.filter((key) => JSON.stringify(current[key]) !== JSON.stringify(baseline[key]));
}

/** Keeps only known, well-shaped sections from an API payload. */
function pickPublicSections(data: PublicSiteData): Partial<SiteSettings> {
    const picked: Record<string, unknown> = {};
    PUBLIC_KEYS.forEach((key) => {
        const value = data[key];
        if (value === undefined || value === null) return;
        const expectsArray = ['interestRates', 'news', 'usedMachinery', 'faqs', 'customPages'].includes(key);
        if (expectsArray ? Array.isArray(value) : typeof value === 'object' && !Array.isArray(value)) {
            picked[key] = value;
        }
    });
    return picked as Partial<SiteSettings>;
}

const DRAFT_KEY = 'agile_assets_cms_draft';

function hasDraft(): boolean {
    return localStorage.getItem(DRAFT_KEY) === '1';
}

function setDraftFlag(dirty: boolean) {
    if (dirty) localStorage.setItem(DRAFT_KEY, '1');
    else localStorage.removeItem(DRAFT_KEY);
}

function persistAndBroadcast(next: SiteSettings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
        console.error('Failed to write settings to localStorage:', err);
    }
    try {
        const ch = new BroadcastChannel(SYNC_CHANNEL);
        ch.postMessage(next);
        ch.close();
    } catch {
        // BroadcastChannel unsupported: other tabs still receive the storage event
    }
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const { isServerSession } = useAuth();
    const [settings, setSettings] = useState<SiteSettings>(loadSettings);
    const settingsRef = useRef(settings);
    const [baseline, setBaseline] = useState<SiteSettings>(settings);
    const baselineRef = useRef(baseline);
    const isServerSessionRef = useRef(isServerSession);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
        isServerSessionRef.current = isServerSession;
    }, [isServerSession]);

    const commit = useCallback((next: SiteSettings) => {
        settingsRef.current = next;
        setSettings(next);
    }, []);

    const commitBaseline = useCallback((next: SiteSettings) => {
        baselineRef.current = next;
        setBaseline(next);
    }, []);

    useEffect(() => {
        applyThemeToDom(settings.themeSettings);
    }, [settings.themeSettings]);

    // Server content is the source of truth; localStorage only gives an instant first paint.
    // An admin's unpublished draft (shared with the preview iframe) is never overwritten.
    useEffect(() => {
        let cancelled = false;
        cmsService.getPublicSite().then((res) => {
            if (cancelled || !res.success || !res.data || typeof res.data !== 'object') return;
            const remote = pickPublicSections(res.data);
            if (Object.keys(remote).length === 0) return;
            const published = { ...settingsRef.current, ...remote };
            commitBaseline({ ...baselineRef.current, ...remote });
            if (hasDraft()) return;
            commit(published);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(published));
            } catch {
                // Storage full or blocked: the in-memory copy is still current
            }
        });
        return () => {
            cancelled = true;
        };
    }, [commit, commitBaseline]);

    useEffect(() => {
        if (!isServerSession) return;
        cmsService.getCustomFields().then((res) => {
            if (!res.success || !Array.isArray(res.data)) return;
            commitBaseline({ ...baselineRef.current, customFields: res.data });
            if (!hasDraft()) commit({ ...settingsRef.current, customFields: res.data });
        });
    }, [isServerSession, commit, commitBaseline]);

    // Cross-tab sync (e.g. admin editor tab -> live preview tab)
    useEffect(() => {
        let channel: BroadcastChannel | null = null;
        try {
            channel = new BroadcastChannel(SYNC_CHANNEL);
            channel.onmessage = (event) => {
                if (event.data && typeof event.data === 'object') commit(event.data);
            };
        } catch {
            // BroadcastChannel not supported in older browsers
        }

        const handleStorage = (e: StorageEvent) => {
            if (e.key !== STORAGE_KEY || !e.newValue) return;
            try {
                commit(JSON.parse(e.newValue));
            } catch (err) {
                console.error('Error syncing settings from storage event:', err);
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
            channel?.close();
        };
    }, [commit]);

    const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
        const prev = settingsRef.current;
        const updated: SiteSettings = {
            ...prev,
            ...newSettings,
            lastUpdated: new Date().toISOString(),
        };
        if (isServerSessionRef.current) setDraftFlag(true);
        commit(updated);
        persistAndBroadcast(updated);
    }, [commit]);

    const pendingSections = useMemo(
        () => (isServerSession ? changedSections(settings, baseline) : []),
        [isServerSession, settings, baseline]
    );

    const publish = useCallback(async (): Promise<boolean> => {
        const current = settingsRef.current;
        const base = baselineRef.current;
        const sections = changedSections(current, base);
        if (sections.length === 0) {
            setDraftFlag(false);
            return true;
        }

        const changes: Partial<SiteSettings> = {};
        sections.forEach((key) => {
            (changes as Record<string, unknown>)[key] = current[key];
        });

        setIsPublishing(true);
        const failures = await cmsService.publishChanges(base, changes);
        setIsPublishing(false);

        if (failures.length > 0) {
            const detail = failures[0].message || failures[0].error || '';
            toast.error(`เผยแพร่ไม่สำเร็จ ${failures.length} รายการ กรุณาลองอีกครั้ง ${detail}`.trim(), {
                id: 'cms-publish',
                duration: 8000,
            });
            return false;
        }

        commitBaseline(current);
        setDraftFlag(false);
        toast.success('เผยแพร่ขึ้นเว็บไซต์เรียบร้อยแล้ว', { id: 'cms-publish' });
        return true;
    }, [commitBaseline]);

    const resetSettings = useCallback(() => {
        const defaults = {
            ...(defaultSettingsData as unknown as SiteSettings),
            themeSettings: DEFAULT_THEME_SETTINGS,
            pageContents: {},
            _version: DATA_VERSION
        };
        commit(defaults);
        persistAndBroadcast(defaults);
    }, [commit]);

    const contextValue = useMemo(() => ({
        settings,
        updateSettings,
        resetSettings,
        pendingSections,
        isPublishing,
        publish,
    }), [settings, updateSettings, resetSettings, pendingSections, isPublishing, publish]);

    return (
        <SiteSettingsContext.Provider value={contextValue}>
            {children}
        </SiteSettingsContext.Provider>
    );
}

export function useSiteSettings(): SiteSettingsContextType {
    const context = useContext(SiteSettingsContext);
    if (!context) {
        throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
    }
    return context;
}
