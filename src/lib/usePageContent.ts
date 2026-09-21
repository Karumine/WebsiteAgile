import { useMemo } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import type { PageCustomContent } from '@/types';
import { pageContentService } from '@/services/pageContentService';

export function usePageContent<T extends Partial<PageCustomContent>>(pageId: string, defaultContent: T) {
    const { settings, updateSettings } = useSiteSettings();

    const customData = settings.pageContents?.[pageId];

    const mergedContent = useMemo((): PageCustomContent => {
        const base: PageCustomContent = {
            id: pageId,
            pageName: pageId,
            titleTh: '',
            heroTitleTh: '',
            heroSubtitleTh: '',
            items: [],
            ...defaultContent,
        };

        if (!customData) return base;
        return {
            ...base,
            ...customData,
            items: customData.items && customData.items.length > 0 ? customData.items : base.items,
        };
    }, [pageId, customData, defaultContent]);

    const savePageContent = (newContent: Partial<PageCustomContent>) => {
        const existingPages = settings.pageContents || {};
        const basePage: PageCustomContent = {
            id: pageId,
            pageName: defaultContent.pageName || pageId,
            titleTh: defaultContent.titleTh || '',
            heroTitleTh: defaultContent.heroTitleTh || '',
            heroSubtitleTh: defaultContent.heroSubtitleTh || '',
            items: [],
            ...defaultContent,
        };
        const updatedPage: PageCustomContent = {
            ...basePage,
            ...existingPages[pageId],
            ...newContent,
            id: pageId,
            lastUpdated: new Date().toISOString(),
        };

        updateSettings({
            pageContents: {
                ...existingPages,
                [pageId]: updatedPage,
            },
        });

        // Sync with Backend API asynchronously
        pageContentService.updatePageContent(pageId, updatedPage).catch((err) => {
            console.warn(`Could not sync page [${pageId}] to backend API:`, err);
        });
    };

    const resetPageContent = () => {
        const existingPages = { ...(settings.pageContents || {}) };
        delete existingPages[pageId];
        updateSettings({
            pageContents: existingPages,
        });

        // Delete on Backend API
        pageContentService.deletePageContent(pageId).catch((err) => {
            console.warn(`Could not delete page [${pageId}] on backend API:`, err);
        });
    };

    return {
        content: mergedContent,
        isCustomized: !!customData,
        savePageContent,
        resetPageContent,
    };
}
