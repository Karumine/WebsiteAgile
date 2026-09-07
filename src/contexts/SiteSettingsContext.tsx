import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { SiteSettings } from '@/types';
import defaultSettingsData from '@/data/defaultSettings.json';

const STORAGE_KEY = 'agile_assets_settings';
const SAVE_DEBOUNCE_MS = 500;

interface SiteSettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => void;
    resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const DATA_VERSION = '2026-v3-multi-assets';

function loadSettings(): SiteSettings {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as SiteSettings & { _version?: string };
            // Check if stored data contains old dummy items or missing version
            const hasDummyAssets = parsed.usedMachinery?.some((m) => m.id === 'asset-001' || m.title.includes('เครื่องบรรจุน้ำดื่มอัตโนมัติ 24 หัวจ่าย'));
            const hasDummyNews = parsed.news?.some((n) => n.id === 'news-001' && n.title.includes('แนวโน้มตลาด'));
            const hasDummyCompany = parsed.companyInfo?.phone === '02-123-4567';

            if (hasDummyAssets || hasDummyNews || hasDummyCompany || parsed._version !== DATA_VERSION) {
                const fresh = { ...(defaultSettingsData as SiteSettings), _version: DATA_VERSION };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
                return fresh;
            }
            return parsed;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    const fresh = { ...(defaultSettingsData as SiteSettings), _version: DATA_VERSION };
    return fresh;
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(loadSettings);
    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

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
