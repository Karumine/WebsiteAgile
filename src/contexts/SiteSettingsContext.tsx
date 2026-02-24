import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteSettings } from '@/types';
import defaultSettingsData from '@/data/defaultSettings.json';

const STORAGE_KEY = 'agile_assets_settings';

interface SiteSettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => void;
    resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

function loadSettings(): SiteSettings {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored) as SiteSettings;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    return defaultSettingsData as SiteSettings;
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(loadSettings);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
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
