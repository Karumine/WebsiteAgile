import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useSections } from '@/lib/pageSections';
import { homeProjectsSections } from '@/data/pageSections/homeProjects';

export function OurProjectsSection() {
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);
    const section = useSections(content, homeProjectsSections);
    const projectsGallery = section('projects-gallery');
    const navigate = useNavigate();

    if (projectsGallery.hidden) return null;
    return (
        <section className="py-20 sm:py-24 bg-background text-foreground overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-800 dark:text-sky-400 mb-3 font-sans">
                            {projectsGallery.t('t01')}
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                            {projectsGallery.t('t02')}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                            {projectsGallery.t('t03')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* 12-Image Collage Grid (6 cols x 2 rows on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-14">
                    {projectsGallery.items.map((photo, index) => (
                        <ScrollReveal
                            key={index}
                            animation="fade-up"
                            delay={index * 40}
                            className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-border/80 group"
                        >
                            <div className="w-full h-full relative overflow-hidden">
                                <img
                                    src={photo.t('src')}
                                    alt={photo.t('alt')}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = photo.t('fallback');
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Action Button: ดูโครงการทั้งหมดของเรา */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            navigate('/project');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-400/25 hover:scale-105 active:scale-95 transition-all"
                    >
                        <span>{projectsGallery.t('t04')}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
