import { apiRequest, type ApiResult } from './apiClient';
import type {
    BannerSettings,
    CompanyInfo,
    CustomField,
    CustomPageItem,
    FaqItem,
    ImpactStats,
    InterestRate,
    NewsItem,
    PageCustomContent,
    SiteSettings,
    ThemeSettings,
    UsedMachineryItem,
} from '@/types';

/** Everything the public website needs, returned by one request. */
export type PublicSiteData = Partial<Omit<SiteSettings, 'customFields'>>;

export interface UploadedImage {
    url: string;
    width?: number;
    height?: number;
    size?: number;
}

type WithId = { id: string };

const sameJson = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const put = <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });

const del = (endpoint: string) => apiRequest<void>(endpoint, { method: 'DELETE' });

/** Upserts changed items and deletes removed ones, keyed by `id`. */
async function syncCollection<T extends WithId>(
    basePath: string,
    prev: T[] | undefined,
    next: T[]
): Promise<ApiResult<unknown>[]> {
    const prevById = new Map((prev || []).map((item) => [item.id, item]));
    const prevIndex = new Map((prev || []).map((item, index) => [item.id, index]));
    const nextIds = new Set(next.map((item) => item.id));
    const calls: Promise<ApiResult<unknown>>[] = [];

    next.forEach((item, index) => {
        if (!sameJson(prevById.get(item.id), item) || prevIndex.get(item.id) !== index) {
            calls.push(put(`${basePath}/${encodeURIComponent(item.id)}`, { ...item, sortOrder: index }));
        }
    });
    prevById.forEach((_item, id) => {
        if (!nextIds.has(id)) calls.push(del(`${basePath}/${encodeURIComponent(id)}`));
    });

    return Promise.all(calls);
}

async function syncPages(
    prev: Record<string, PageCustomContent> | undefined,
    next: Record<string, PageCustomContent>
): Promise<ApiResult<unknown>[]> {
    const calls: Promise<ApiResult<unknown>>[] = [];
    Object.entries(next).forEach(([pageId, page]) => {
        if (!sameJson(prev?.[pageId], page)) calls.push(put(`/pages/${encodeURIComponent(pageId)}`, page));
    });
    Object.keys(prev || {}).forEach((pageId) => {
        if (!(pageId in next)) calls.push(del(`/pages/${encodeURIComponent(pageId)}`));
    });
    return Promise.all(calls);
}

export const cmsService = {
    getPublicSite(): Promise<ApiResult<PublicSiteData>> {
        return apiRequest<PublicSiteData>('/site/public', { method: 'GET', timeout: 8000 });
    },

    getCustomFields(): Promise<ApiResult<CustomField[]>> {
        return apiRequest<CustomField[]>('/settings/custom-fields', { method: 'GET' });
    },

    /**
     * Publishes the sections present in `next` (callers pass only changed sections);
     * news/assets/pages are diffed per item against `prev`.
     * Resolves to the failed results (empty array = everything saved).
     */
    async publishChanges(prev: SiteSettings, next: Partial<SiteSettings>): Promise<ApiResult<unknown>[]> {
        const calls: Promise<ApiResult<unknown> | ApiResult<unknown>[]>[] = [];

        if (next.banner && next.banner !== prev.banner) {
            calls.push(put<BannerSettings>('/settings/banner', next.banner));
        }
        if (next.themeSettings && next.themeSettings !== prev.themeSettings) {
            calls.push(put<ThemeSettings>('/settings/theme', next.themeSettings));
        }
        if ((next.companyInfo && next.companyInfo !== prev.companyInfo) || (next.impactStats && next.impactStats !== prev.impactStats)) {
            const companyInfo: CompanyInfo = next.companyInfo || prev.companyInfo;
            const impactStats: ImpactStats = next.impactStats || prev.impactStats;
            calls.push(put('/settings/company', { ...companyInfo, impactStats }));
        }
        if (next.interestRates && next.interestRates !== prev.interestRates) {
            calls.push(put<InterestRate[]>('/rates', next.interestRates));
        }
        if (next.faqs && next.faqs !== prev.faqs) {
            calls.push(put<FaqItem[]>('/faqs', next.faqs));
        }
        if (next.customFields && next.customFields !== prev.customFields) {
            calls.push(put<CustomField[]>('/settings/custom-fields', next.customFields));
        }
        if (next.customPages && next.customPages !== prev.customPages) {
            calls.push(put<CustomPageItem[]>('/settings/custom-pages', next.customPages));
        }
        if (next.news && next.news !== prev.news) {
            calls.push(syncCollection<NewsItem>('/news', prev.news, next.news));
        }
        if (next.usedMachinery && next.usedMachinery !== prev.usedMachinery) {
            calls.push(syncCollection<UsedMachineryItem>('/assets', prev.usedMachinery, next.usedMachinery));
        }
        if (next.pageContents && next.pageContents !== prev.pageContents) {
            calls.push(syncPages(prev.pageContents, next.pageContents));
        }

        const results = (await Promise.all(calls)).flat();
        return results.filter((r) => !r.success);
    },

    uploadImage(file: File, folder: 'news' | 'assets' | 'banner' | 'pages'): Promise<ApiResult<UploadedImage>> {
        const body = new FormData();
        body.append('file', file);
        body.append('folder', folder);
        return apiRequest<UploadedImage>('/uploads/images', { method: 'POST', body, timeout: 60000 });
    },
};
