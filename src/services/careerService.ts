import { apiRequest } from './apiClient';
import type { JobApplicationCreate, JobApplication } from '@/types';

export const careerService = {
    async applyJob(application: JobApplicationCreate): Promise<{ success: boolean; data?: any; error?: string }> {
        const result = await apiRequest('/careers/apply', {
            method: 'POST',
            body: JSON.stringify(application),
        });
        return {
            success: result.success,
            data: result.data,
            error: result.error || result.message,
        };
    },

    async getApplications(params?: {
        status?: string;
        positionId?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{ success: boolean; data?: JobApplication[]; error?: string }> {
        const result = await apiRequest<JobApplication[]>('/careers/applications', {
            method: 'GET',
            params: params as any,
        });
        return {
            success: result.success,
            data: result.data,
            error: result.error || result.message,
        };
    },

    async updateStatus(
        id: string,
        status: string,
        notes?: string
    ): Promise<{ success: boolean; error?: string }> {
        const result = await apiRequest(`/careers/applications/${encodeURIComponent(id)}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes }),
        });
        return {
            success: result.success,
            error: result.error || result.message,
        };
    },
};
