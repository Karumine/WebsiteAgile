import { BarChart3, Newspaper, Settings, Clock, ExternalLink, Image, ShoppingBag, HelpCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/lib/utils';

export function DashboardPage() {
    const { settings } = useSiteSettings();
    const { lang } = useLanguage();

    const stats = [
        {
            icon: Newspaper,
            label: lang === 'th' ? 'ข่าวสาร & บทความ' : 'News & Articles',
            value: settings.news?.length || 0,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            to: '/management-portal/news',
        },
        {
            icon: ShoppingBag,
            label: lang === 'th' ? 'เครื่องจักรมือสอง/รอขาย' : 'Assets for Sale',
            value: settings.usedMachinery?.length || 0,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            to: '/management-portal/assets',
        },
        {
            icon: BarChart3,
            label: lang === 'th' ? 'ผลิตภัณฑ์สินเชื่อ' : 'Financing Rates',
            value: settings.interestRates?.length || 0,
            color: 'text-sky-400',
            bg: 'bg-sky-400/10',
            to: '/management-portal/rates',
        },
        {
            icon: HelpCircle,
            label: lang === 'th' ? 'คำถาม FAQ' : 'FAQ Items',
            value: settings.faqs?.length || 0,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            to: '/management-portal/faq',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    {lang === 'th' ? 'แผงควบคุม CMS (Dashboard)' : 'Content Management Dashboard'}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {lang === 'th' ? 'จัดการและอัปเดตคอนเทนต์ทั้งหมดของเว็บไซต์ Agile Assets' : 'Manage and control all content across Agile Assets website'}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            {stat.to && (
                                <Link to={stat.to} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    {lang === 'th' ? 'ทางลัดการจัดการคอนเทนต์' : 'Quick Actions'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: lang === 'th' ? 'จัดการข่าวสาร & กิจกรรม' : 'Manage News & Articles', desc: 'โพสต์ข่าวและภาพกิจกรรมใหม่', to: '/management-portal/news', icon: Newspaper },
                        { label: lang === 'th' ? 'จัดการเครื่องจักรมือสอง' : 'Manage Used Machinery', desc: 'เพิ่มสินทรัพย์และอัปเดตราคา', to: '/management-portal/assets', icon: ShoppingBag },
                        { label: lang === 'th' ? 'แก้ไขข้อมูลบริษัท & สถิติ' : 'Company Profile & Stats', desc: 'ปรับเบอร์โทร และสถิติผลงานโรงงาน', to: '/management-portal/company', icon: Building2 },
                        { label: lang === 'th' ? 'แก้ไขแบนเนอร์หลัก' : 'Edit Hero Banner', desc: 'ปรับสโลแกนและภาพหน้าแรก', to: '/management-portal/banner', icon: Image },
                        { label: lang === 'th' ? 'จัดการคำถามที่พบบ่อย' : 'Manage FAQ Items', desc: 'เพิ่มคำถามคำตอบสำหรับลูกค้า', to: '/management-portal/faq', icon: HelpCircle },
                        { label: lang === 'th' ? 'แก้ไขอัตราดอกเบี้ย' : 'Edit Interest Rates', desc: 'ปรับอัตราดอกเบี้ยสินเชื่อ', to: '/management-portal/rates', icon: BarChart3 },
                    ].map((action) => (
                        <Link
                            key={action.label}
                            to={action.to}
                            className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-all group"
                        >
                            <action.icon className="w-5 h-5 text-blue-400 mb-3" />
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                                {action.label}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent News */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Recent Articles</h2>
                <div className="glass rounded-xl divide-y divide-border">
                    {settings.news.slice(0, 5).map((article) => (
                        <div key={article.id} className="px-5 py-4 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(article.date)}</p>
                            </div>
                            <span className="text-xs font-medium text-blue-400 bg-blue-400/ px-2.5 py-1 rounded-full flex-shrink-0">
                                {article.category}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* View Public Site */}
            <div className="text-center">
                <Link
                    to="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                    View Public Website
                </Link>
            </div>
        </div>
    );
}
