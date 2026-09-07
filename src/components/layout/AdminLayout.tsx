import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
    LayoutDashboard,
    BarChart3,
    Image,
    Newspaper,
    Settings,
    LogOut,
    Menu,
    X,
    ShoppingBag,
    HelpCircle,
    Building2,
    ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import logoCmyk from '@/assets/Logo_Agile Assets_CMYK.png';

export function AdminLayout() {
    const { user, logout } = useAuth();
    const { lang, setLang } = useLanguage();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarLinks = [
        { to: '/management-portal/dashboard', icon: LayoutDashboard, labelEn: 'Dashboard', labelTh: 'แผงควบคุม' },
        { to: '/management-portal/banner', icon: Image, labelEn: 'Hero Banner', labelTh: 'แบนเนอร์หลัก' },
        { to: '/management-portal/news', icon: Newspaper, labelEn: 'News & Articles', labelTh: 'ข่าวสารและบทความ' },
        { to: '/management-portal/assets', icon: ShoppingBag, labelEn: 'Assets for Sale', labelTh: 'เครื่องจักรมือสอง' },
        { to: '/management-portal/rates', icon: BarChart3, labelEn: 'Interest Rates', labelTh: 'อัตราดอกเบี้ย' },
        { to: '/management-portal/faq', icon: HelpCircle, labelEn: 'FAQ & Help', labelTh: 'คำถามที่พบบ่อย (FAQ)' },
        { to: '/management-portal/company', icon: Building2, labelEn: 'Company & Stats', labelTh: 'ข้อมูลบริษัท & สถิติ' },
        { to: '/management-portal/custom', icon: Settings, labelEn: 'Custom Fields', labelTh: 'ข้อมูลโปรโมชัน' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/management-portal');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar (Always Fixed Full Height) */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 w-64 bg-navy border-r border-border flex flex-col transition-transform duration-300 ease-in-out',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo & Live Website Link */}
                <div className="p-3.5 sm:p-4 border-b border-border flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img src={logoCmyk} alt="Agile Assets Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 drop-shadow-sm" />
                        <div className="min-w-0">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white block truncate">Agile Assets</span>
                            <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider leading-none mt-0.5">CMS Portal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {/* Live Website Button Beside Company Name */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/25 text-xs font-semibold transition-all hover:scale-105 active:scale-95 group shadow-sm"
                            title={lang === 'th' ? 'เปิดหน้าเว็บจริงในแท็บใหม่' : 'Open live website in new tab'}
                        >
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <span className="text-[11px] whitespace-nowrap">{lang === 'th' ? 'เปิดเว็บจริง' : 'Live Site'}</span>
                        </a>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-muted-foreground hover:text-foreground p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-h-0">
                    {sidebarLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                )
                            }
                        >
                            <link.icon className="w-4.5 h-4.5 shrink-0" />
                            <span className="truncate">{lang === 'th' ? link.labelTh : link.labelEn}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User & Logout */}
                <div className="p-3 border-t border-border shrink-0">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{user?.username}</p>
                            <p className="text-[10px] text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut className="w-4.5 h-4.5 shrink-0" />
                        <span>{lang === 'th' ? 'ออกจากระบบ' : 'Sign Out'}</span>
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64 flex-1 flex flex-col min-h-screen min-w-0">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 h-14 glass border-b border-border flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-sm sm:text-base font-semibold text-foreground">
                            {lang === 'en' ? 'Content Management System (CMS)' : 'ระบบจัดการเนื้อหา (CMS)'}
                        </h1>
                    </div>

                    {/* Right Tools: Theme & Language Switcher */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/25 text-xs font-semibold"
                            title={lang === 'th' ? 'เปิดหน้าเว็บจริง (แท็บใหม่)' : 'Open live website in new tab'}
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{lang === 'th' ? 'เว็บจริง' : 'Live'}</span>
                        </a>
                        <ThemeToggle />
                        <div className="flex items-center p-0.5 rounded-full border border-border glass bg-card/80">
                            <button
                                type="button"
                                onClick={() => setLang('th')}
                                className={cn(
                                    'px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200',
                                    lang === 'th'
                                        ? 'bg-sky-500 text-white shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                TH
                            </button>
                            <button
                                type="button"
                                onClick={() => setLang('en')}
                                className={cn(
                                    'px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200',
                                    lang === 'en'
                                        ? 'bg-sky-500 text-white shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

