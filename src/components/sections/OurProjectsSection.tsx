import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function OurProjectsSection() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const projectPhotos = [
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/307397-1024x1024.jpg',
            fallback: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
            alt: 'Factory project handover & customer partnership',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/338213071_6247572745332805_2982020131925519013_n-1024x689.jpg',
            fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            alt: 'Agile Assets signage and customer handover ceremony',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
            alt: 'Machinery inspection team and plant managers',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/20240910_142452-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
            alt: 'Customer gift and financing agreement congratulation',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/S__1933333-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
            alt: 'Corporate plant signage and team audit',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/11896-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
            alt: 'Customer discussion and partnership gift handover',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/237098_0-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
            alt: 'Agro-industrial livestock barn inspection site',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/237159_0-1-1024x768.jpg',
            fallback: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80',
            alt: 'Engineering site visit and installation team review',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361722-1024x478.jpg',
            fallback: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&q=80',
            alt: 'Client office gift giving and financing support meeting',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361726-1024x478.jpg',
            fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            alt: 'Factory staff and Agile Assets engineering delegation',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_754/https://agileassets.co.th/wp-content/uploads/2022/01/263065161_417825200062927_7117604202506920683_n-754x1024-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
            alt: 'Plant delivery ceremony and banner handover',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_768/https://agileassets.co.th/wp-content/uploads/2022/03/361724-768x1645.jpg',
            fallback: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
            alt: 'Industrial bottling warehouse plant commissioning',
        },
    ];

    return (
        <section className="py-20 sm:py-24 bg-background text-foreground overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-800 dark:text-sky-400 mb-3 font-sans">
                            OUR PROJECTS
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                            {lang === 'th' ? 'โครงการของเรา' : 'Our Financed Projects & Activities'}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                            {lang === 'th'
                                ? 'เราให้การสนับสนุนผู้รับสินเชื่อและสนับสนุนคนขายเครื่องจักร'
                                : 'Empowering machinery buyers and equipment distributors nationwide.'}
                        </p>
                    </div>
                </ScrollReveal>

                {/* 12-Image Collage Grid (6 cols x 2 rows on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-14">
                    {projectPhotos.map((photo, index) => (
                        <ScrollReveal
                            key={index}
                            animation="fade-up"
                            delay={index * 40}
                            className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-border/80 group"
                        >
                            <div className="w-full h-full relative overflow-hidden">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = photo.fallback;
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
                        <span>{lang === 'th' ? 'ดูโครงการทั้งหมดของเรา' : 'View All Our Projects'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
