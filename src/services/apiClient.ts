/**
 * API Client for Agile Assets Corporate Website
 * Connects to ASP.NET Core Backend (api.tunjai.in.th)
 * Supports Vite Proxy (/api/v1) in local development to prevent CORS errors,
 * and direct URL in production or configurable via VITE_API_URL.
 */

const TOKEN_KEY = 'agile_assets_token';
const REFRESH_TOKEN_KEY = 'agile_assets_refresh_token';

// In development, use relative '/api/v1' so Vite proxy routes it without CORS issues.
// In production or when VITE_API_URL is specified, use that.
export const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? '/api/v1' : 'https://api.tunjai.in.th/api/v1');

export interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
    timeout?: number;
}

export interface ApiResult<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    status: number;
}

export function getAuthToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string, refreshToken?: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}

export function clearAuthToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function apiRequest<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResult<T>> {
    const { params, timeout = 10000, headers = {}, ...customConfig } = options;

    let url = endpoint.startsWith('http')
        ? endpoint
        : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    if (params) {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.append(key, String(value));
            }
        });
        const qs = query.toString();
        if (qs) {
            url += (url.includes('?') ? '&' : '?') + qs;
        }
    }

    const token = getAuthToken();
    const reqHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers as Record<string, string>),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...customConfig,
            headers: reqHeaders,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        let data: any = null;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch {
                data = null;
            }
        } else {
            const text = await response.text();
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }
        }

        if (!response.ok) {
            const errorMsg =
                (data && typeof data === 'object' && (data.error?.message || data.message || data.title)) ||
                `HTTP Error ${response.status}: ${response.statusText}`;

            return {
                success: false,
                data: data?.data || data,
                message: errorMsg,
                error: errorMsg,
                status: response.status,
            };
        }

        // ASP.NET standard response: { success: true, data: ..., message: ... }
        // or raw entity object
        if (data && typeof data === 'object' && 'success' in data) {
            return {
                success: Boolean(data.success),
                data: data.data !== undefined ? data.data : data,
                message: data.message,
                status: response.status,
            };
        }

        return {
            success: true,
            data: data as T,
            status: response.status,
        };
    } catch (err: any) {
        clearTimeout(timeoutId);
        const isTimeout = err.name === 'AbortError';
        const errorMsg = isTimeout
            ? 'API Request timed out (10s)'
            : err.message || 'Network error / API unreachable';

        return {
            success: false,
            error: errorMsg,
            message: errorMsg,
            status: isTimeout ? 408 : 0,
        };
    }
}
