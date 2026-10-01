/**
 * API Client for Agile Assets Corporate Website
 * Connects to ASP.NET Core Backend (api.tunjai.in.th)
 * Uses the Vite proxy (/api/v1) in local development to avoid CORS,
 * and VITE_API_URL (or the production default) otherwise.
 */

const TOKEN_KEY = 'agile_assets_token';
const REFRESH_TOKEN_KEY = 'agile_assets_refresh_token';
export const AUTH_EXPIRED_EVENT = 'agile-assets:auth-expired';

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

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null;
}

function extractErrorMessage(body: unknown): string | undefined {
    if (!isObject(body)) return undefined;
    const err = body.error;
    if (isObject(err) && typeof err.message === 'string') return err.message;
    if (typeof err === 'string') return err;
    if (typeof body.message === 'string') return body.message;
    if (typeof body.title === 'string') return body.title;
    return undefined;
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
    const { params, timeout = 15000, headers = {}, body, ...customConfig } = options;

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
    // Only JSON bodies get a Content-Type: a bare GET stays a "simple" CORS request (no preflight).
    const reqHeaders: Record<string, string> = {
        Accept: 'application/json',
        ...(typeof body === 'string' ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers as Record<string, string>),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...customConfig,
            body,
            headers: reqHeaders,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const text = await response.text();
        let data: unknown = null;
        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }
        }

        if (response.status === 401 && token) {
            clearAuthToken();
            window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
        }

        if (!response.ok) {
            const errorMsg = extractErrorMessage(data) || `HTTP Error ${response.status}: ${response.statusText}`;
            return {
                success: false,
                data: (isObject(data) && 'data' in data ? data.data : data) as T,
                message: errorMsg,
                error: errorMsg,
                status: response.status,
            };
        }

        // Standard envelope: { success, data, message }
        if (isObject(data) && 'success' in data) {
            return {
                success: Boolean(data.success),
                data: (data.data !== undefined ? data.data : data) as T,
                message: typeof data.message === 'string' ? data.message : undefined,
                error: data.success ? undefined : extractErrorMessage(data),
                status: response.status,
            };
        }

        return {
            success: true,
            data: data as T,
            status: response.status,
        };
    } catch (err) {
        clearTimeout(timeoutId);
        const isTimeout = err instanceof DOMException && err.name === 'AbortError';
        const errorMsg = isTimeout
            ? 'API request timed out'
            : (err instanceof Error && err.message) || 'Network error / API unreachable';

        return {
            success: false,
            error: errorMsg,
            message: errorMsg,
            status: isTimeout ? 408 : 0,
        };
    }
}
