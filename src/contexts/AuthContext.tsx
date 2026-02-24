import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthState, User } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
};

const STORAGE_KEY = 'agile_assets_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
        ) {
            const adminUser: User = { username, role: 'admin' };
            setUser(adminUser);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
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
