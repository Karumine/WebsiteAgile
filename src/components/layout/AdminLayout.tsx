import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
    TrendingUp,
    LayoutDashboard,
    BarChart3,
    Image,
    Newspaper,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
    { to: '/management-portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/management-portal/rates', icon: BarChart3, label: 'Interest Rates' },
    { to: '/management-portal/banner', icon: Image, label: 'Hero Banner' },
    { to: '/management-portal/news', icon: Newspaper, label: 'News & Articles' },
    { to: '/management-portal/custom', icon: Settings, label: 'Custom Fields' },
];

export function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/management-portal');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-navy border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Logo */}
                <div className="p-5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gradient">Agile Assets</span>
                            <p className="text-[10px] text-muted-foreground">CMS Portal</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                )
                            }
                        >
                            <link.icon className="w-4.5 h-4.5" />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* User & Logout */}
                <div className="p-3 border-t border-border">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{user?.username}</p>
                            <p className="text-[10px] text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 h-14 glass border-b border-border flex items-center px-4 gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-muted-foreground hover:text-foreground"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-sm font-semibold text-foreground">Content Management System</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
