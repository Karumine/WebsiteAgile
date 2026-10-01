import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthState, LoginOutcome, User } from '@/types';
import { authService, getTokenExpiry } from '@/services/authService';
import { AUTH_EXPIRED_EVENT, getAuthToken } from '@/services/apiClient';

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = 'agile_assets_auth';
const LOCKOUT_KEY = 'agile_assets_login_lock';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000;

type SessionMode = 'server' | 'local';

interface StoredAuth {
    user: User;
    expiresAt: number;
    mode: SessionMode;
}

interface LockState {
    failures: number;
    lockedUntil: number;
}

function readLock(): LockState {
    try {
        return JSON.parse(sessionStorage.getItem(LOCKOUT_KEY) || '') as LockState;
    } catch {
        return { failures: 0, lockedUntil: 0 };
    }
}

function writeLock(lock: LockState) {
    sessionStorage.setItem(LOCKOUT_KEY, JSON.stringify(lock));
}

/** Offline admin login for `npm run dev` only; the whole branch is removed from production builds. */
function matchesDevCredentials(username: string, password: string): boolean {
    if (!import.meta.env.DEV) return false;
    const devUser = import.meta.env.VITE_DEV_ADMIN_USER as string | undefined;
    const devPass = import.meta.env.VITE_DEV_ADMIN_PASS as string | undefined;
    return Boolean(devUser && devPass && username === devUser && password === devPass);
}

function loadSession(): StoredAuth | null {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as Partial<StoredAuth> | null;
        if (!parsed?.user || !parsed.expiresAt || Date.now() >= parsed.expiresAt) return null;

        if (parsed.mode === 'server') {
            const token = getAuthToken();
            const tokenExpiry = token ? getTokenExpiry(token) : null;
            if (!token || (tokenExpiry !== null && Date.now() >= tokenExpiry)) return null;
            return parsed as StoredAuth;
        }

        return parsed.mode === 'local' && import.meta.env.DEV ? (parsed as StoredAuth) : null;
    } catch {
        return null;
    }
}

function persistSession(session: StoredAuth | null) {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<StoredAuth | null>(() => {
        const loaded = loadSession();
        if (!loaded) {
            localStorage.removeItem(STORAGE_KEY);
        }
        return loaded;
    });

    const logout = useCallback(() => {
        authService.logout();
        persistSession(null);
        setSession(null);
    }, []);

    useEffect(() => {
        const onExpired = () => {
            persistSession(null);
            setSession(null);
        };
        window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
        return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
    }, []);

    useEffect(() => {
        if (!session) return;
        const remaining = session.expiresAt - Date.now();
        const timer = setTimeout(logout, Math.max(remaining, 0));
        return () => clearTimeout(timer);
    }, [session, logout]);

    const login = useCallback(async (username: string, password: string): Promise<LoginOutcome> => {
        const lock = readLock();
        if (lock.lockedUntil > Date.now()) {
            return { ok: false, reason: 'locked', retryAfterSec: Math.ceil((lock.lockedUntil - Date.now()) / 1000) };
        }

        const start = (user: User, mode: SessionMode, expiresAt: number) => {
            const next: StoredAuth = { user, mode, expiresAt };
            persistSession(next);
            setSession(next);
            sessionStorage.removeItem(LOCKOUT_KEY);
            return { ok: true } as const;
        };

        const res = await authService.login(username, password);
        if (res.success && res.user) {
            const token = getAuthToken();
            const tokenExpiry = token ? getTokenExpiry(token) : null;
            return start(res.user, 'server', tokenExpiry ?? Date.now() + SESSION_DURATION_MS);
        }

        if (res.status === 429) {
            return { ok: false, reason: 'locked', retryAfterSec: 60 };
        }

        const backendDown = res.status === 0 || res.status >= 500 || res.status === 404 || res.status === 408;
        if (backendDown && matchesDevCredentials(username, password)) {
            return start({ username, role: 'admin' }, 'local', Date.now() + SESSION_DURATION_MS);
        }

        if (backendDown) {
            return { ok: false, reason: 'unavailable' };
        }

        const failures = lock.failures + 1;
        if (failures >= MAX_FAILED_ATTEMPTS) {
            writeLock({ failures: 0, lockedUntil: Date.now() + LOCKOUT_MS });
            return { ok: false, reason: 'locked', retryAfterSec: LOCKOUT_MS / 1000 };
        }
        writeLock({ failures, lockedUntil: 0 });
        return { ok: false, reason: 'invalid' };
    }, []);

    const value = useMemo<AuthState>(() => ({
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isServerSession: session?.mode === 'server',
        isLoading: false,
        login,
        logout,
    }), [session, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
