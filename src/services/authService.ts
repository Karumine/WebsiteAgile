import { apiRequest, setAuthToken, clearAuthToken, getAuthToken } from './apiClient';
import type { LoginResponseData, User } from '@/types';

export interface LoginResult {
    success: boolean;
    user?: User;
    status: number;
    error?: string;
}

/** Reads `exp` from a JWT without verifying it (the server verifies). */
export function getTokenExpiry(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
}

export const authService = {
    async login(username: string, password: string): Promise<LoginResult> {
        const result = await apiRequest<LoginResponseData>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if (result.success && result.data?.accessToken) {
            const authData = result.data;
            setAuthToken(authData.accessToken, authData.refreshToken);
            return {
                success: true,
                status: result.status,
                user: authData.user || { username, role: 'admin' },
            };
        }

        return {
            success: false,
            status: result.status,
            error: result.error || result.message || 'Login failed',
        };
    },

    logout(): void {
        if (getAuthToken()) {
            void apiRequest('/auth/logout', { method: 'POST', timeout: 5000 });
        }
        clearAuthToken();
    },
};
