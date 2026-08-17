import { useState } from 'react';
import { ArrowRight, Download, BookOpen, Sparkles, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import storyOriginImg from '@/assets/story_origin_engineers.jpg';
import storyMachineryImg from '@/assets/story_machinery_finance.jpg';
import storyGrowthImg from '@/assets/story_growth_team.jpg';

export function OurStorySection() {
    const { t, lang } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [activeModal, setActiveModal] = useState<'story' | 'newsletter' | null>(null);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const handleDownloadNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        setDownloadSuccess(true);
        setTimeout(() => {
            setDownloadSuccess(false);
            setActiveModal(null);
        }, 2200);
    };

    const handleScrollTo = (targetId: string) => {
        const el = document.querySelector(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const storyCards = [
        {
            id: 'origin',
            image: storyOriginImg,
            tag: t('story.card1.tag'),
            title: t('story.card1.title'),
            quote: t('story.card1.quote'),
            desc: t('story.card1.desc'),
            btnText: t('story.card1.btn'),
            icon: BookOpen,
            action: () => setActiveModal('story'),
        },
        {
            id: 'machinery',
            image: storyMachineryImg,
            tag: t('story.card2.tag'),
            title: t('story.card2.title'),
            quote: t('story.card2.quote'),
            desc: t('story.card2.desc'),
            btnText: t('story.card2.btn'),
            icon: Download,
            action: () => setActiveModal('newsletter'),
        },
        {
            id: 'growth',
            image: storyGrowthImg,
            tag: t('story.card3.tag'),
            title: t('story.card3.title'),
            quote: t('story.card3.quote'),
            desc: t('story.card3.desc'),
            btnText: t('story.card3.btn'),
            icon: TrendingUp,
            action: () => handleScrollTo('#about'),
        },
    ];

    return (
        <section id="our-story" className="relative pt-12 sm:pt-16 pb-20 lg:pb-24 overflow-hidden bg-background">
            {/* --- Subtle Dynamic Background Waves / Silk Ribbons --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
                <svg
                    className="absolute w-full h-full object-cover"
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-100,450 C300,200 800,700 1540,250"
                        stroke="url(#storyWaveGrad1)"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                    />
                    <path
                        d="M-50,600 C450,300 950,850 1600,400"
                        stroke="url(#storyWaveGrad2)"
                        strokeWidth="2"
                    />
                    <path
                        d="M100,200 C600,600 1100,100 1500,500"
                        stroke="url(#storyWaveGrad1)"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                    />
                    <defs>
                        <linearGradient id="storyWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="storyWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
                            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Soft Radial Ambient Lighting */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-sky-500/10 rounded-full blur-[130px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* --- Section Header --- */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 shadow-sm border transition-all duration-300">
                            <span className="text-xs font-black tracking-widest text-sky-600 dark:text-sky-400 uppercase font-sans">
                                {t('story.badge')}
                            </span>
                        </div>

                        {/* Section Title */}
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-sans text-foreground">
                            {t('story.title')}
                        </h2>

                        {/* Section Subtitle */}
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {t('story.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* --- 3 Interactive Corporate Story Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
                    {storyCards.map((card, idx) => (
                        <ScrollReveal
                            key={card.id}
                            animation="fade-up"
                            delay={idx * 160}
                            className="flex flex-col h-full"
                        >
                            <div
                                className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-500 border relative overflow-hidden ${
                                    isDark
                                        ? 'bg-slate-900/70 border-sky-500/20 hover:border-sky-400/50 hover:bg-slate-900/95 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2'
                                        : 'bg-white border-slate-200/90 hover:border-sky-300 hover:bg-white shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-sky-100 hover:-translate-y-2'
                                }`}
                            >
                                {/* Card Top: Premium High-Res Image with Aspect 16:10 */}
                                <div>
                                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/10] shadow-md bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Subtle Gradient Shadow on Image Bottom */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        {/* Corner Tag */}
                                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white">
                                            {card.tag}
                                        </div>
                                    </div>

                                    {/* Card Header: Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 font-sans leading-snug group-hover:text-sky-500 transition-colors">
                                        {card.title}
                                    </h3>

                                    {/* Card Subtitle / Quote Accent */}
                                    <div className="mb-4 pl-3.5 border-l-2 border-sky-400">
                                        <p className="text-xs sm:text-sm font-bold text-foreground/90 leading-snug font-sans">
                                            {card.quote}
                                        </p>
                                    </div>

                                    {/* Card Body Description */}
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-6">
                                        {card.desc}
                                    </p>
                                </div>

                                {/* Card Footer: Action Button matching original layout */}
                                <div className="pt-2">
                                    <button
                                        onClick={card.action}
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        <card.icon className="w-4 h-4" />
                                        <span>{card.btnText}</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* --- Interactive Story Detail Modal --- */}
            {activeModal === 'story' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
                    <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-muted text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase mb-3">
                            <Sparkles className="w-4 h-4" />
                            <span>{t('story.badge')} • {lang === 'th' ? 'เรื่องราวของเรา' : 'Our Heritage'}</span>
                        </div>

                        <h3 className="text-2xl font-extrabold text-foreground mb-4 font-sans">
                            {t('story.card1.title')}
                        </h3>

                        <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                            <img src={storyOriginImg} alt="Agile Assets Origin" className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p className="font-semibold text-foreground text-base">
                                {t('story.card1.quote')}
                            </p>
                            <p>
                                {lang === 'th'
                                    ? 'อาจิไลท์ แอสเซทส์ ก่อตั้งขึ้นจากทีมวิศวกรผู้เชี่ยวชาญด้านเทคโนโลยีเครื่องจักรอุตสาหกรรม เราเข้าใจอย่างลึกซึ้งถึงรอบการทำงาน การคืนทุน และความสำคัญของเครื่องจักรที่ทันสมัยต่อความสามารถในการแข่งขันของภาคการผลิต'
                                    : 'Agile Assets was founded by a dedicated team of engineers with deep industrial tech expertise. We understand equipment lifecycles, ROI dynamics, and the pivotal role modern machinery plays in competitive manufacturing.'}
                            </p>
                            <p>
                                {lang === 'th'
                                    ? 'เรามุ่งมั่นทลายข้อจำกัดทางการเงินแบบเดิม ด้วยการสร้างโซลูชันสินเชื่อเช่าซื้อ (Leasing) และสินเชื่อเพื่อธุรกิจที่คล่องตัว อนุมัติไว โครงสร้างยืดหยุ่น เพื่อเป็นพลังขับเคลื่อนให้ผู้ประกอบการไทยเติบโตอย่างมั่นคง'
                                    : 'We aim to break traditional financing barriers by delivering agile, fast-approval leasing and working capital solutions tailored to empower businesses to scale resiliently.'}
                            </p>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors"
                            >
                                {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Interactive Newsletter Download Modal --- */}
            {activeModal === 'newsletter' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
                    <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-2xl overflow-hidden animate-slide-up">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-muted text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-500 flex items-center justify-center mb-4">
                            <Download className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-extrabold text-foreground mb-2 font-sans">
                            {lang === 'th' ? 'ดาวน์โหลด Agile Assets Newsletter' : 'Download Agile Assets Newsletter'}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-6">
                            {lang === 'th'
                                ? 'รับบทวิเคราะห์แนวโน้มอุตสาหกรรม ดอกเบี้ย และโซลูชันสินเชื่อเครื่องจักรประจำไตรมาส'
                                : 'Get quarterly industrial market insights, interest rate trends, and machinery financing outlook.'}
                        </p>

                        {downloadSuccess ? (
                            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <span>{lang === 'th' ? 'กำลังดาวน์โหลด Newsletter ให้ท่าน...' : 'Downloading Newsletter now...'}</span>
                            </div>
                        ) : (
                            <form onSubmit={handleDownloadNewsletter} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        {lang === 'th' ? 'อีเมลสำหรับรับเอกสาร' : 'Your Business Email'}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="company@domain.com"
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'ยืนยันและดาวน์โหลด (PDF)' : 'Confirm & Download (PDF)'}</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
