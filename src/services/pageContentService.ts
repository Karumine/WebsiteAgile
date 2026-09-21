import { apiRequest } from './apiClient';
import type { PageCustomContent } from '@/types';

export const pageContentService = {
    async getPages(): Promise<{ success: boolean; data?: string[]; error?: string }> {
        const result = await apiRequest<string[]>('/pages', {
            method: 'GET',
        });
        if (result.success && result.data) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.error || result.message };
    },

    async getPageContent(pageId: string): Promise<{ success: boolean; data?: PageCustomContent; error?: string }> {
        const result = await apiRequest<PageCustomContent>(`/pages/${encodeURIComponent(pageId)}`, {
            method: 'GET',
        });
        if (result.success && result.data) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.error || result.message };
    },

    async updatePageContent(
        pageId: string,
        content: Partial<PageCustomContent>
    ): Promise<{ success: boolean; data?: PageCustomContent; error?: string }> {
        const result = await apiRequest<PageCustomContent>(`/pages/${encodeURIComponent(pageId)}`, {
            method: 'PUT',
            body: JSON.stringify(content),
        });
        if (result.success && result.data) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.error || result.message };
    },

    async deletePageContent(pageId: string): Promise<{ success: boolean; error?: string }> {
        const result = await apiRequest<void>(`/pages/${encodeURIComponent(pageId)}`, {
            method: 'DELETE',
        });
        return { success: result.success, error: result.error || result.message };
    },
};
