import { apiRequest, type ApiResult } from './apiClient';
import type { SubmissionMeta, SubmissionReceipt } from './formService';
import type { JobApplicationCreate, JobApplication, PagedResult } from '@/types';

export const careerService = {
    applyJob(application: JobApplicationCreate, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        return apiRequest<SubmissionReceipt>('/careers/apply', {
            method: 'POST',
            body: JSON.stringify({ ...application, meta }),
        });
    },

    getApplications(params?: {
        status?: string;
        positionId?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<ApiResult<PagedResult<JobApplication>>> {
        return apiRequest<PagedResult<JobApplication>>('/careers/applications', {
            method: 'GET',
            params,
        });
    },

    updateStatus(id: string, status: JobApplication['status'], notes?: string): Promise<ApiResult<JobApplication>> {
        return apiRequest<JobApplication>(`/careers/applications/${encodeURIComponent(id)}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes }),
        });
    },
};
