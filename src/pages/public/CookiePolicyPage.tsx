import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useSections } from '@/lib/pageSections';
import { cookiePolicySections } from '@/data/pageSections/cookiePolicy';

export function CookiePolicyPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('cookie-policy', DEFAULT_PAGE_CONTENTS['cookie-policy']);
    const section = useSections(content, cookiePolicySections);
    const overview = section('overview');
    const whatSec = section('what');
    const howSec = section('how');
    const manageSec = section('manage');
    const changesSec = section('changes');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500/20 selection:text-sky-500">
            <Helmet>
                <title>
                    {content.metaTitle || (lang === 'th'
                        ? 'นโยบายคุกกี้ (Cookies Policy) | Agile Assets'
                        : 'Cookies Policy | Agile Assets')}
                </title>
                <meta
                    name="description"
                    content={
                        content.metaDescription || (lang === 'th'
                            ? 'นโยบายการใช้คุกกี้ (Cookies Policy) ของบริษัท Agile Assets จำกัด เพื่ออธิบายความหมาย การทำงาน วัตถุประสงค์ และการจัดการปฏิเสธคุกกี้'
                            : 'Cookies Policy of Agile Assets Co., Ltd. explaining our use of cookies, purpose, functionality, and how to manage cookie preferences.')
                    }
                />
            </Helmet>

            {/* Global Navbar */}
            <Navbar />

            <main className="flex-1">
                {/* Hero Header Section */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-sky-900/20 via-background to-background overflow-hidden border-b border-border/40">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.15),transparent)]" />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal animation="fade-up">
                            {/* Breadcrumbs */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-400 mb-6">
                                <Link to="/" className="hover:underline">
                                    {lang === 'th' ? 'หน้าแรก' : 'Home'}
                                </Link>
                                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                                <span>{lang === 'th' ? 'นโยบายคุกกี้' : 'Cookies Policy'}</span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-sky-500 uppercase tracking-widest mb-2 font-mono">
                                {content.heroBadgeTh || content.heroBadgeEn || 'Cookies Policy'}
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'นโยบายคุกกี้') : (content.heroTitleEn || content.heroTitleTh || 'Cookies Policy')}
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {lang === 'th'
                                    ? (content.heroSubtitleTh || content.heroSubtitleEn || 'การคุ้มครองความเป็นส่วนตัวและความโปร่งใสในการเก็บรวบรวมข้อมูลผ่านเว็บไซต์ agileassets.co.th')
                                    : (content.heroSubtitleEn || content.heroSubtitleTh || 'Privacy protection and transparency regarding data collection on agileassets.co.th')}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Content Body */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-10 sm:space-y-12">

                            {/* Overview Box */}
                            {!overview.hidden && (<ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl glass border border-sky-500/20 bg-sky-500/5 relative overflow-hidden">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400 mt-1">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-3 font-sans">
                                            <p>
                                                {<>
                                                        {overview.t('t01')} <strong className="text-sky-500">{overview.t('t02')}</strong> {overview.t('t03')}
                                                    </>}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {overview.t('t04')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>)}

                            {/* Section 1: What are cookies */}
                            {!whatSec.hidden && (<ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            1
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {whatSec.t('t01')}
                                        </h2>
                                    </div>

                                    <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {whatSec.t('t02')}
                                        </p>
                                        <p>
                                            {whatSec.t('t03')}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>)}

                            {/* Section 2: How we use cookies */}
                            {!howSec.hidden && (<ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            2
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {howSec.t('t01')}
                                        </h2>
                                    </div>

                                    <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {howSec.t('t02')}
                                        </p>
                                        <p>
                                            {howSec.t('t03')}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>)}

                            {/* Section 3: Cookie Management & Browser Guides */}
                            {!manageSec.hidden && (<ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            3
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {manageSec.t('t01')}
                                        </h2>
                                    </div>

                                    <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11 space-y-4">
                                        <p>
                                            {manageSec.t('t02')}
                                        </p>

                                        {/* Browser Links Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            {manageSec.items.map((guide) => (
                                                <a
                                                    key={guide.t('name')}
                                                    href={guide.t('url')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/50 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all group"
                                                >
                                                    <div className="min-w-0 pr-2">
                                                        <p className="text-xs font-bold text-foreground group-hover:text-sky-500 transition-colors truncate">
                                                            {guide.t('name')}
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground truncate">
                                                            {guide.t('desc')}
                                                        </p>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-sky-400 flex-shrink-0 transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>)}

                            {/* Section 4: Changes to policy */}
                            {!changesSec.hidden && (<ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            4
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {changesSec.t('t01')}
                                        </h2>
                                    </div>

                                    <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {changesSec.t('t02')}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground font-mono pt-2">
                                            {changesSec.t('t03')}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>)}

                        </div>
                    </div>
                </section>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating Widgets */}
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
