import { apiRequest } from './apiClient';
import type { ThemeSettings } from '@/types';

export const themeService = {
    async getTheme(): Promise<{ success: boolean; data?: ThemeSettings; error?: string }> {
        const result = await apiRequest<ThemeSettings>('/settings/theme', {
            method: 'GET',
        });
        if (result.success && result.data) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.error || result.message };
    },

    async updateTheme(theme: ThemeSettings): Promise<{ success: boolean; data?: ThemeSettings; error?: string }> {
        const result = await apiRequest<ThemeSettings>('/settings/theme', {
            method: 'PUT',
            body: JSON.stringify(theme),
        });
        if (result.success && result.data) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.error || result.message };
    },
};
