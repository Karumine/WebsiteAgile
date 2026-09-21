import { apiRequest, setAuthToken, clearAuthToken } from './apiClient';
import type { LoginResponseData, User } from '@/types';

export const authService = {
    async login(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
        const result = await apiRequest<LoginResponseData>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if (result.success && result.data) {
            const authData = result.data;
            if (authData.accessToken) {
                setAuthToken(authData.accessToken, authData.refreshToken);
            }
            const user: User = authData.user || {
                username,
                role: 'admin',
            };
            return { success: true, user };
        }

        return {
            success: false,
            error: result.error || result.message || 'Login failed',
        };
    },

    logout(): void {
        clearAuthToken();
    },
};
