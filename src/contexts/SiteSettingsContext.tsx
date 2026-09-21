import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { SiteSettings, ThemeSettings } from '@/types';
import defaultSettingsData from '@/data/defaultSettings.json';
import { themeService } from '@/services/themeService';

const STORAGE_KEY = 'agile_assets_settings';
const SAVE_DEBOUNCE_MS = 500;

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

    root.style.setProperty('--primary', activeTheme.primaryColor);
    root.style.setProperty('--grad-primary-1', activeTheme.gradientStart);
    root.style.setProperty('--grad-primary-2', activeTheme.gradientEnd);
    root.style.setProperty('--ring', activeTheme.accentColor);

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
    root.style.setProperty('--btn-primary-fg', activeTheme.buttonTextColor);
}

interface SiteSettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => void;
    resetSettings: () => void;
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

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(loadSettings);
    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    // Apply theme changes dynamically whenever themeSettings updates
    useEffect(() => {
        applyThemeToDom(settings.themeSettings);
    }, [settings.themeSettings]);

    // Initial fetch from backend API with fallback
    useEffect(() => {
        let isMounted = true;
        themeService.getTheme().then((res) => {
            if (isMounted && res.success && res.data) {
                setSettings((prev) => ({
                    ...prev,
                    themeSettings: res.data,
                }));
            }
        }).catch((err) => {
            console.warn('Backend theme fetch unavailable, using local theme:', err);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    // Debounced localStorage write
    useEffect(() => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }, SAVE_DEBOUNCE_MS);
        return () => {
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        };
    }, [settings]);

    const updateSettings = (newSettings: Partial<SiteSettings>) => {
        setSettings((prev) => ({
            ...prev,
            ...newSettings,
            lastUpdated: new Date().toISOString(),
        }));

        if (newSettings.themeSettings) {
            themeService.updateTheme(newSettings.themeSettings).catch((err) => {
                console.warn('Could not sync theme to backend API:', err);
            });
        }
    };

    const resetSettings = () => {
        const defaults = defaultSettingsData as SiteSettings;
        setSettings(defaults);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    };

    return (
        <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
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
