import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthState, User } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
};

const STORAGE_KEY = 'agile_assets_auth';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface StoredAuth {
    user: User;
    expiresAt: number;
}

// ─── Synchronous loader (runs BEFORE first render) ───
function loadUserFromStorage(): User | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);

        // New format { user, expiresAt }
        if (parsed.expiresAt && parsed.user) {
            if (Date.now() < parsed.expiresAt) {
                return parsed.user;
            }
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        // Old format (just User object: { username, role })
        if (parsed.username && parsed.role) {
            const migratedUser: User = { username: parsed.username, role: parsed.role };
            const authData: StoredAuth = {
                user: migratedUser,
                expiresAt: Date.now() + SESSION_DURATION_MS,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
            return migratedUser;
        }

        localStorage.removeItem(STORAGE_KEY);
        return null;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    // Initialize synchronously — auth is available on first render
    const [user, setUser] = useState<User | null>(() => loadUserFromStorage());

    const login = (username: string, password: string): boolean => {
        if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
        ) {
            const adminUser: User = { username, role: 'admin' };
            setUser(adminUser);
            const authData: StoredAuth = {
                user: adminUser,
                expiresAt: Date.now() + SESSION_DURATION_MS,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading: false, // Always false since we load synchronously
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthState {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
