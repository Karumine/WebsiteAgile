import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, DollarSign, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

/**
 * CustomPageView — renders any page created via the CMS "เพิ่มหน้า" modal.
 * Matched by its path in settings.customPages; content read from settings.pageContents[id].
 */
export function CustomPageView() {
    const location = useLocation();
    const { lang } = useLanguage();
    const { settings } = useSiteSettings();
    const navigate = useNavigate();
    const isEn = lang === 'en';

    // Match current path to a custom page
    const customPage = (settings.customPages || []).find(
        (p) => p.path === location.pathname
    );

    // If no custom page matched → show a styled 404 message inline
    if (!customPage) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-4">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-8xl font-black text-sky-500/30 mb-4">404</p>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {isEn ? 'Page Not Found' : 'ไม่พบหน้าที่ต้องการ'}
                    </h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        {isEn
                            ? 'The page you are looking for does not exist or has been removed.'
                            : 'หน้าที่คุณต้องการไม่มีอยู่ในระบบ หรืออาจถูกลบไปแล้ว'}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-sky-500/20"
                    >
                        <ArrowRight className="w-4 h-4" />
                        {isEn ? 'Back to Home' : 'กลับหน้าหลัก'}
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const pc = settings.pageContents?.[customPage.id];

    const badge       = isEn ? (pc?.heroBadgeEn  || pc?.heroBadgeTh  || customPage.nameEn)  : (pc?.heroBadgeTh  || pc?.heroBadgeEn  || customPage.nameTh);
    const heroTitle   = isEn ? (pc?.heroTitleEn   || pc?.heroTitleTh   || customPage.nameEn)  : (pc?.heroTitleTh   || pc?.heroTitleEn   || customPage.nameTh);
    const heroSub     = isEn ? (pc?.heroSubtitleEn || pc?.heroSubtitleTh || '')               : (pc?.heroSubtitleTh || pc?.heroSubtitleEn || '');
    const ctaText     = isEn ? (pc?.ctaTextEn     || pc?.ctaTextTh     || 'Financing with Us') : (pc?.ctaTextTh || pc?.ctaTextEn || 'ขอสินเชื่อกับเรา');
    const ctaLink     = pc?.ctaLink || '/leasing-application';
    const heroImage   = pc?.heroImage || heroBg;
    const metaTitle   = pc?.metaTitle || `${isEn ? customPage.nameEn : customPage.nameTh} | Agile Assets`;
    const metaDesc    = pc?.metaDescription || heroSub || '';
    const bodyContent = (isEn ? (pc?.contentEn || pc?.contentTh) : (pc?.contentTh || pc?.contentEn)) || '';
    const items       = pc?.items || [];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={heroImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDesc} />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroImage}
                            alt=""
                            className="w-full h-full object-cover object-center scale-105"
                            loading="eager"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/45 to-black/65" />
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Ambient glows */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />
                    <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-blue-600/12 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {badge && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/70 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                                <span>{badge}</span>
                            </div>
                        )}

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
                            {heroTitle}
                        </h1>

                        {heroSub && (
                            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                                {heroSub}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                onClick={() => navigate(ctaLink)}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm
                                    bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500
                                    text-white shadow-xl shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-sky-500/50"
                            >
                                <DollarSign className="w-4 h-4" />
                                {ctaText}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Body Content ─────────────────────────────────────── */}
                {bodyContent && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        <ScrollReveal>
                            <div
                                className="prose prose-invert prose-sky max-w-none text-slate-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: bodyContent }}
                            />
                        </ScrollReveal>
                    </section>
                )}

                {/* ── Feature / Equipment Cards ─────────────────────────── */}
                {items.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => {
                                const t  = isEn ? (item.titleEn  || item.title)       : (item.title       || item.titleEn  || '');
                                const d  = isEn ? (item.descEn   || item.description) : (item.description || item.descEn   || '');
                                const s  = isEn ? (item.subTitleEn || item.subTitle)  : (item.subTitle    || item.subTitleEn);
                                const b  = isEn ? (item.btnTextEn || item.btnText)    : (item.btnText     || item.btnTextEn);
                                return (
                                    <ScrollReveal key={item.id}>
                                        <div className="glass rounded-2xl border border-border/50 overflow-hidden flex flex-col h-full group
                                            hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10">
                                            {item.image && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={t}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    {item.badge && (
                                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-sky-500/90 text-white text-xs font-bold backdrop-blur-sm">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-base font-bold text-foreground mb-1">{t}</h3>
                                                {s && <p className="text-xs text-sky-400 font-semibold mb-2">{s}</p>}
                                                {d && <p className="text-xs text-muted-foreground leading-relaxed flex-1">{d}</p>}
                                                {(item.link || b) && (
                                                    <div className="mt-4">
                                                        <a
                                                            href={item.link || '#'}
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                                                        >
                                                            {b || (isEn ? 'Learn More' : 'อ่านเพิ่มเติม')}
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ── CTA Footer Banner ─────────────────────────────────── */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="glass rounded-3xl border border-sky-500/20 p-10 bg-gradient-to-br from-sky-500/10 to-blue-600/10 shadow-xl shadow-sky-500/10">
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                                {isEn ? 'Ready to get started?' : 'พร้อมเริ่มต้นกับเราหรือยัง?'}
                            </h2>
                            <p className="text-muted-foreground text-sm mb-6">
                                {isEn
                                    ? 'Our team is ready to design a financing plan tailored to your business.'
                                    : 'ทีมงานของเราพร้อมออกแบบแผนการเงินที่เหมาะสมกับธุรกิจของคุณ'}
                            </p>
                            <button
                                onClick={() => navigate(ctaLink)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                                    bg-gradient-to-r from-sky-500 to-blue-600 text-white
                                    hover:from-sky-400 hover:to-blue-500 transition-all duration-300 hover:scale-105
                                    shadow-lg shadow-sky-500/30"
                            >
                                {ctaText}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
