import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { PageBlock } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { localize, toLines } from '@/lib/pageSections';
import { SectionIcon } from '@/lib/sectionIcons';
import { safeHref, isExternalUrl } from '@/lib/sanitize';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

type T = (key: string) => string;
interface BlockProps { block: PageBlock; t: T; items: { raw: Record<string, string>; t: T }[] }

const GRID: Record<string, string> = {
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
    const url = safeHref(href);
    if (url.startsWith('/') && !url.startsWith('//')) return <Link to={url} className={className}>{children}</Link>;
    const external = isExternalUrl(url);
    return <a href={url} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

function Header({ t, className }: { t: T; className?: string }) {
    const badge = t('badge'), title = t('title'), subtitle = t('subtitle');
    if (!badge && !title && !subtitle) return null;
    return (
        <div className={cn('text-center max-w-3xl mx-auto mb-12', className)}>
            {badge && <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">{badge}</span>}
            {title && <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">{title}</h2>}
            {subtitle && <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
        </div>
    );
}

const imgSrc = (url: string) => safeHref(url, '');

function TextBlock({ t }: BlockProps) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                    {t('badge') && <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">{t('badge')}</span>}
                    {t('title') && <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6">{t('title')}</h2>}
                    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {toLines(t('body')).map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

function CardsBlock({ t, items }: BlockProps) {
    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Header t={t} />
                <div className={cn('grid gap-5', GRID[t('columns')] || GRID['3'])}>
                    {items.map((it, i) => (
                        <ScrollReveal key={it.raw.id || i} delay={i * 60}>
                            <div className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all h-full hover:translate-y-[-3px]">
                                {it.raw.icon && (
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                                        <SectionIcon name={it.raw.icon} className="w-5 h-5" />
                                    </div>
                                )}
                                <h3 className="text-sm font-bold text-foreground">{it.t('title')}</h3>
                                {it.t('desc') && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{it.t('desc')}</p>}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImageCardsBlock({ t, items }: BlockProps) {
    const { lang } = useLanguage();
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Header t={t} />
                <div className={cn('grid gap-6', GRID[t('columns')] || GRID['3'])}>
                    {items.map((it, i) => (
                        <ScrollReveal key={it.raw.id || i}>
                            <div className="glass rounded-2xl border border-border/50 overflow-hidden flex flex-col h-full group hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10">
                                {imgSrc(it.raw.image) && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={imgSrc(it.raw.image)} alt={it.t('title')} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                        {it.t('badge') && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-sky-500/90 text-white text-xs font-bold backdrop-blur-sm">{it.t('badge')}</span>
                                        )}
                                    </div>
                                )}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-base font-bold text-foreground mb-1">{it.t('title')}</h3>
                                    {it.t('subtitle') && <p className="text-xs text-sky-400 font-semibold mb-2">{it.t('subtitle')}</p>}
                                    {it.t('desc') && <p className="text-xs text-muted-foreground leading-relaxed flex-1">{it.t('desc')}</p>}
                                    {it.raw.link && (
                                        <div className="mt-4">
                                            <SmartLink href={it.raw.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors">
                                                {it.t('btn') || (lang === 'en' ? 'Learn More' : 'อ่านเพิ่มเติม')}
                                                <ArrowRight className="w-3 h-3" />
                                            </SmartLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImageTextBlock({ t }: BlockProps) {
    const right = t('imagePosition') === 'right';
    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {imgSrc(t('image')) && (
                    <ScrollReveal animation={right ? 'fade-left' : 'fade-right'} className={cn(right && 'lg:order-2')}>
                        <img src={imgSrc(t('image'))} alt={t('title')} className="w-full rounded-3xl object-cover aspect-[4/3] shadow-2xl border border-border" loading="lazy" />
                    </ScrollReveal>
                )}
                <ScrollReveal animation={right ? 'fade-right' : 'fade-left'}>
                    {t('badge') && <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">{t('badge')}</span>}
                    {t('title') && <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">{t('title')}</h2>}
                    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {toLines(t('body')).map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    {t('btn') && t('btnLink') && (
                        <SmartLink href={t('btnLink')} className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 transition-all hover:scale-105 shadow-lg shadow-sky-500/30">
                            {t('btn')}
                            <ArrowRight className="w-4 h-4" />
                        </SmartLink>
                    )}
                </ScrollReveal>
            </div>
        </section>
    );
}

function StatsBlock({ t, items }: BlockProps) {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {t('title') && <h2 className="text-xl sm:text-2xl font-extrabold text-foreground text-center mb-8">{t('title')}</h2>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
                    {items.map((it, i) => (
                        <div key={it.raw.id || i} className="glass rounded-xl p-5 border border-border/80 text-center">
                            <p className="text-2xl sm:text-3xl font-black text-primary">{it.t('value')}</p>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">{it.t('label')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StepsBlock({ t, items }: BlockProps) {
    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/60 bg-card/20">
            <div className="max-w-7xl mx-auto">
                <Header t={t} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((it, i) => (
                        <div key={it.raw.id || i} className="glass rounded-2xl p-6 border border-border text-center">
                            <span className="text-3xl font-black text-primary/40 block mb-2">{it.t('step') || String(i + 1).padStart(2, '0')}</span>
                            <h3 className="text-sm font-bold text-foreground">{it.t('title')}</h3>
                            {it.t('desc') && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{it.t('desc')}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqBlock({ t, items }: BlockProps) {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {t('title') && <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">{t('title')}</h2>}
                <div className="space-y-3">
                    {items.map((it, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={it.raw.id || i} className="glass rounded-xl border border-border overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:text-primary transition-colors"
                                >
                                    <span>{it.t('q')}</span>
                                    {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-4 pt-3 text-xs sm:text-sm text-muted-foreground border-t border-border/40 leading-relaxed whitespace-pre-line">
                                        {it.t('a')}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function GalleryBlock({ t, items }: BlockProps) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {t('title') && <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">{t('title')}</h2>}
                <div className={cn('grid gap-4', GRID[t('columns')] || GRID['3'])}>
                    {items.filter((it) => imgSrc(it.raw.image)).map((it, i) => (
                        <figure key={it.raw.id || i} className="group">
                            <div className="overflow-hidden rounded-2xl border border-border aspect-[4/3]">
                                <img src={imgSrc(it.raw.image)} alt={it.t('caption')} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                            </div>
                            {it.t('caption') && <figcaption className="mt-2 text-xs text-muted-foreground text-center">{it.t('caption')}</figcaption>}
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CtaBlock({ t }: BlockProps) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <div className="glass rounded-3xl border border-sky-500/20 p-10 bg-gradient-to-br from-sky-500/10 to-blue-600/10 shadow-xl shadow-sky-500/10">
                    {t('title') && <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{t('title')}</h2>}
                    {t('subtitle') && <p className="text-muted-foreground text-sm mb-6">{t('subtitle')}</p>}
                    {t('btn') && (
                        <SmartLink href={t('btnLink') || '/leasing-application'} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/30">
                            {t('btn')}
                            <ArrowRight className="w-4 h-4" />
                        </SmartLink>
                    )}
                </div>
            </div>
        </section>
    );
}

const RENDERERS: Record<string, (p: BlockProps) => ReactNode> = {
    text: TextBlock,
    cards: CardsBlock,
    'image-cards': ImageCardsBlock,
    'image-text': ImageTextBlock,
    stats: StatsBlock,
    steps: StepsBlock,
    faq: FaqBlock,
    gallery: GalleryBlock,
    cta: CtaBlock,
};

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
    const { lang } = useLanguage();
    return (
        <>
            {blocks.filter((b) => !b.hidden).map((block) => {
                const Render = RENDERERS[block.type];
                if (!Render) return null;
                const fields = block.fields || {};
                return (
                    <Render
                        key={block.id}
                        block={block}
                        t={(key) => localize(fields, key, lang)}
                        items={(block.items || []).map((raw) => ({ raw, t: (key: string) => localize(raw, key, lang) }))}
                    />
                );
            })}
        </>
    );
}
