import { BarChart3, Newspaper, Settings, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { formatDate } from '@/lib/utils';

export function DashboardPage() {
    const { settings } = useSiteSettings();

    const stats = [
        {
            icon: BarChart3,
            label: 'Interest Rate Products',
            value: settings.interestRates.length,
            color: 'text-primary',
            bg: 'bg-primary/10',
            to: '/management-portal/rates',
        },
        {
            icon: Newspaper,
            label: 'Published Articles',
            value: settings.news.length,
            color: 'text-gold',
            bg: 'bg-gold/10',
            to: '/management-portal/news',
        },
        {
            icon: Settings,
            label: 'Custom Fields',
            value: settings.customFields.length,
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            to: '/management-portal/custom',
        },
        {
            icon: Clock,
            label: 'Last Updated',
            value: settings.lastUpdated ? formatDate(settings.lastUpdated) : '—',
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            to: '',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Overview of your site content and quick actions.
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
                <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Edit Interest Rates', desc: 'Update lending product rates', to: '/management-portal/rates', icon: BarChart3 },
                        { label: 'Post New Article', desc: 'Create news or announcement', to: '/management-portal/news', icon: Newspaper },
                        { label: 'Manage Custom Fields', desc: 'Add promotional campaign data', to: '/management-portal/custom', icon: Settings },
                    ].map((action) => (
                        <Link
                            key={action.label}
                            to={action.to}
                            className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-all group"
                        >
                            <action.icon className="w-5 h-5 text-gold mb-3" />
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
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
                            <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full flex-shrink-0">
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
