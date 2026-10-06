import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, ChevronDown, ChevronUp, ArrowRight, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { careerService } from '@/services/careerService';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { useSections, type SectionItemView } from '@/lib/pageSections';
import { workForUsSections } from '@/data/pageSections/workForUs';
import { getSectionIcon } from '@/lib/sectionIcons';

export function WorkForUsPage() {
    const { lang } = useLanguage();

    // Connect to universal page content system
    const { content } = usePageContent('work-for-us', DEFAULT_PAGE_CONTENTS['work-for-us']);

    const section = useSections(content, workForUsSections);
    const heroExtras = section('hero-extras');
    const why = section('why');
    const benefits = section('benefits');
    const departments = section('departments');
    const jobsSection = section('jobs');
    const apply = section('apply');
    const process = section('process');
    const careerFaq = section('faq');
    const jobs = jobsSection.items;

    const [selectedDept, setSelectedDept] = useState('all');

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [appliedPosition, setAppliedPosition] = useState(() => jobs[0]?.raw.id || 'other');
    const [experienceYears, setExperienceYears] = useState('2-5 ปี');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { send, guardFields } = useLeadSubmit();

    // FAQ Accordion state
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const filteredJobs = selectedDept === 'all' ? jobs : jobs.filter((j) => j.raw.department === selectedDept);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !email.trim() || !phone.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' : 'Please fill in all required fields');
            return;
        }

        const trimmedResumeUrl = resumeUrl.trim();
        if (trimmedResumeUrl && !/^https:\/\//i.test(trimmedResumeUrl)) {
            toast.error(lang === 'th' ? 'ลิงก์ Resume ต้องขึ้นต้นด้วย https://' : 'Resume link must start with https://');
            return;
        }

        setIsSubmitting(true);
        const result = await send((meta) =>
            careerService.applyJob({
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                positionId: appliedPosition,
                positionTitle: jobs.find((j) => j.raw.id === appliedPosition)?.raw.titleTh || appliedPosition,
                experienceYears,
                expectedSalary: expectedSalary.trim(),
                resumeUrl: trimmedResumeUrl,
                coverLetter: coverLetter.trim(),
            }, meta)
        );
        setIsSubmitting(false);
        if (!result) return;

        toast.success(
            lang === 'th'
                ? 'ส่งใบสมัครเรียบร้อยแล้ว! ทีม HR ของ Agile Assets จะติดต่อกลับภายใน 2-3 วันทำการ'
                : 'Application submitted successfully! Our HR team will get in touch within 2-3 business days.'
        );

        // Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setExpectedSalary('');
        setResumeUrl('');
        setCoverLetter('');
    };

    const handleApplyClick = (job: SectionItemView) => {
        setAppliedPosition(job.raw.id);
        const formEl = document.getElementById('application-form');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pageTitle = content.metaTitle || (lang === 'th' ? 'ร่วมงานกับเรา (Work For Us) | Agile Assets' : 'Careers & Work For Us | Agile Assets');
    const pageDesc = content.metaDescription || (lang === 'th'
        ? 'ร่วมขับเคลื่อนอนาคตอุตสาหกรรมไทยและพลังงานสะอาดไปพร้อมกับ Agile Assets สวัสดิการระดับพรีเมียม โบนัส และโอกาสเติบโตแบบก้าวกระโดด'
        : 'Join Agile Assets to lead the green capital transformation. Enjoy top-tier benefits, flexible work, and accelerated career growth.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={content.heroImage} />
            </Helmet>

            {/* Top Navigation */}
            <Navbar />

            <main className="flex-1">
                {/* 1. Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden gradient-hero">
                    {/* Background Decorative Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in shadow-sm">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn) : (content.heroBadgeEn || content.heroBadgeTh)) || 'CAREERS & OPPORTUNITIES'}</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
                            {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'ร่วมงานกับ Agile Assets') : (content.heroTitleEn || content.heroTitleTh || 'Work with Agile Assets')}
                        </h1>

                        <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                            {lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn || 'ร่วมขับเคลื่อนอนาคตอุตสาหกรรมไทยและพลังงานสะอาดไปพร้อมกับเรา') : (content.heroSubtitleEn || content.heroSubtitleTh || 'Join us to empower Thai manufacturing with clean tech and dynamic capital.')}
                        </p>

                        {/* Action Buttons */}
                        {!heroExtras.hidden && (<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#open-positions"
                                className="btn-dynamic-theme w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-400/25 hover:shadow-blue-400/45 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <span>{heroExtras.t('primaryBtn')}</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#why-agile"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass border border-border text-foreground font-semibold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <span>{heroExtras.t('secondaryBtn')}</span>
                            </a>
                        </div>)}

                        {/* Key Stats Bar */}
                        {!heroExtras.hidden && (<div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {heroExtras.items.map((stat, i) => (
                                <div key={stat.raw.id || i} className="glass rounded-xl p-4 border border-border/80">
                                    <p className="text-2xl sm:text-3xl font-black text-primary">{stat.t('value')}</p>
                                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                                        {stat.t('label')}
                                    </p>
                                </div>
                            ))}
                        </div>)}
                    </div>
                </section>

                {/* 2. Section: Why Work With Agile? (ทำไมต้องทำกับ Agile) */}
                {!why.hidden && (<section id="why-agile" className="py-20 md:py-28 border-t border-border/60 bg-card/30 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                {why.t('badge')}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {why.t('title')}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {why.t('subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {why.items.map((pillar, idx) => {
                                const PillarIcon = getSectionIcon(pillar.raw.icon);
                                return (
                                <div
                                    key={pillar.raw.id || idx}
                                    className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <PillarIcon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-navy-light text-muted-foreground border border-border">
                                                {pillar.t('badge')}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {pillar.t('title')}
                                        </h3>
                                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                            {pillar.t('desc')}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-border/40 flex items-center text-xs font-semibold text-primary gap-1">
                                        <span>{why.t('cardCta')}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </section>)}

                {/* 3. Section: Benefits & What You Get (ทำงานกับ Agile ได้อะไร) */}
                {!benefits.hidden && (<section className="py-20 md:py-28 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                {benefits.t('badge')}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {benefits.t('title')}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {benefits.t('subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {benefits.items.map((benefit, i) => {
                                const BenefitIcon = getSectionIcon(benefit.raw.icon);
                                return (
                                <div
                                    key={benefit.raw.id || i}
                                    className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all flex flex-col justify-between hover:translate-y-[-3px]"
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                                            <BenefitIcon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground">
                                            {benefit.t('title')}
                                        </h3>
                                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                            {benefit.t('desc')}
                                        </p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </section>)}

                {/* 4. Section: Open Positions (ตำแหน่งงานที่เปิดรับ) */}
                {!jobsSection.hidden && (<section id="open-positions" className="py-20 md:py-28 border-t border-border/60 bg-card/20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                {jobsSection.t('badge')}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {jobsSection.t('title')}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                                {jobsSection.t('subtitle')}
                            </p>
                        </div>

                        {/* Department Filter Tabs */}
                        {!departments.hidden && (<div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                            {departments.items.map((tab, i) => (
                                <button
                                    key={tab.raw.id || i}
                                    type="button"
                                    onClick={() => setSelectedDept(tab.raw.code || 'all')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        selectedDept === (tab.raw.code || 'all')
                                            ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                                            : 'glass border border-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                                    }`}
                                >
                                    {tab.t('label')}
                                </button>
                            ))}
                        </div>)}

                        {/* Job Cards */}
                        <div className="space-y-4 max-w-5xl mx-auto">
                            {filteredJobs.map((job, i) => (
                                <div
                                    key={job.raw.id || i}
                                    className="glass rounded-2xl p-6 border border-border hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                                >
                                    <div className="space-y-2 min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                                {job.t('dept')}
                                            </span>
                                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                {job.t('type')}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {job.t('title')}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                            {job.t('desc')}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                                <span>{job.t('location')}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5 text-primary" />
                                                <span>{job.t('experience')}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleApplyClick(job)}
                                            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <span>{jobsSection.t('applyBtn')}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* 5. Section: Online Application Form (แบบฟอร์มสมัครงาน) */}
                {!apply.hidden && (<section id="application-form" className="py-20 md:py-28 relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                {apply.t('badge')}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {apply.t('title')}
                            </h2>
                            <p className="mt-3 text-sm text-muted-foreground">
                                {apply.t('subtitle')}
                            </p>
                        </div>

                        <div className="glass rounded-3xl p-6 sm:p-10 border border-border shadow-2xl relative">
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="work-for-us-field-1" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ชื่อ - นามสกุล *' : 'Full Name *'}
                                        </label>
                                        <input id="work-for-us-field-1"
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder={lang === 'th' ? 'เช่น สมชาย ใจดี' : 'e.g. Somchai Jaidee'}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="work-for-us-field-2" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'เบอร์โทรศัพท์ติดต่อ *' : 'Phone Number *'}
                                        </label>
                                        <input id="work-for-us-field-2"
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="08X-XXX-XXXX"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="work-for-us-field-3" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'อีเมลสำหรับติดต่อ *' : 'Email Address *'}
                                        </label>
                                        <input id="work-for-us-field-3"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="youremail@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="work-for-us-field-4" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ตำแหน่งที่สนใจสมัคร *' : 'Position Applied For *'}
                                        </label>
                                        <select id="work-for-us-field-4"
                                            value={appliedPosition}
                                            onChange={(e) => setAppliedPosition(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        >
                                            {jobs.map((j, i) => (
                                                <option key={j.raw.id || i} value={j.raw.id} className="bg-navy text-foreground">
                                                    {j.t('title')}
                                                </option>
                                            ))}
                                            <option value="other" className="bg-navy text-foreground">
                                                {lang === 'th' ? 'ตำแหน่งอื่นๆ (Other Openings)' : 'Other / Talent Pool'}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="work-for-us-field-5" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ประสบการณ์ทำงานโดยประมาณ' : 'Years of Experience'}
                                        </label>
                                        <select id="work-for-us-field-5"
                                            value={experienceYears}
                                            onChange={(e) => setExperienceYears(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        >
                                            <option value="จบใหม่ / 0-1 ปี" className="bg-navy">จบใหม่ / 0-1 ปี (Fresh Graduate)</option>
                                            <option value="1-2 ปี" className="bg-navy">1-2 ปี (Junior)</option>
                                            <option value="2-5 ปี" className="bg-navy">2-5 ปี (Mid-Level)</option>
                                            <option value="5+ ปีขึ้นไป" className="bg-navy">5+ ปีขึ้นไป (Senior / Lead)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="work-for-us-field-6" className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'เงินเดือนที่คาดหวัง (บาท/เดือน)' : 'Expected Salary (THB/Month)'}
                                        </label>
                                        <input id="work-for-us-field-6"
                                            type="text"
                                            value={expectedSalary}
                                            onChange={(e) => setExpectedSalary(e.target.value)}
                                            placeholder={lang === 'th' ? 'เช่น 35,000 - 45,000 หรือ ตามโครงสร้าง' : 'e.g. 40,000 - 55,000'}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="work-for-us-field-7" className="block text-xs font-bold text-foreground mb-2">
                                        {lang === 'th' ? 'ลิงก์ Resume / CV / LinkedIn / Portfolio' : 'Resume / Portfolio / LinkedIn URL'}
                                    </label>
                                    <input id="work-for-us-field-7"
                                        type="url"
                                        value={resumeUrl}
                                        onChange={(e) => setResumeUrl(e.target.value)}
                                        placeholder="https://drive.google.com/... หรือ https://linkedin.com/in/..."
                                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                                    />
                                    <p className="text-[11px] text-muted-foreground mt-1">
                                        {apply.t('resumeHint')}
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="work-for-us-field-8" className="block text-xs font-bold text-foreground mb-2">
                                        {lang === 'th' ? 'แนะนำตัวเองเบื้องต้น หรือเหตุผลที่อยากร่วมงานกับเรา' : 'Short Cover Letter / Introduction'}
                                    </label>
                                    <textarea id="work-for-us-field-8"
                                        rows={4}
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder={lang === 'th' ? 'เล่าสั้นๆ เกี่ยวกับทักษะ ประสบการณ์ และแรงบันดาลใจของคุณ...' : 'Tell us about your background and why you want to join Agile Assets...'}
                                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 leading-relaxed"
                                    />
                                </div>

                                {guardFields}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-400/25 hover:shadow-blue-400/50 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>{lang === 'th' ? 'กำลังส่งข้อมูล...' : 'Submitting...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{apply.t('submitBtn')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>)}

                {/* 6. Section: Recruitment Process (ขั้นตอนการคัดเลือก) */}
                {!process.hidden && (<section className="py-20 border-t border-border/60 bg-card/20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                {process.t('badge')}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                                {process.t('title')}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {process.items.map((step, idx) => (
                                <div key={step.raw.id || idx} className="glass rounded-2xl p-6 border border-border relative text-center">
                                    <span className="text-3xl font-black text-primary/40 block mb-2">
                                        {step.t('step')}
                                    </span>
                                    <h3 className="text-sm font-bold text-foreground">
                                        {step.t('title')}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                        {step.t('desc')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>)}

                {/* 7. Section: Careers FAQ */}
                {!careerFaq.hidden && (<section className="py-20 relative">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                                {careerFaq.t('title')}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {careerFaq.items.map((faq, i) => {
                                const isOpen = openFaqIndex === i;
                                return (
                                    <div key={faq.raw.id || i} className="glass rounded-xl border border-border overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:text-primary transition-colors"
                                        >
                                            <span>{faq.t('q')}</span>
                                            {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-4 text-xs sm:text-sm text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                                                {faq.t('a')}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>)}
            </main>

            {/* Footer */}
            <Footer />

            {/* Bottom PDPA Cookie Consent Banner */}
            <CookieConsent />

            {/* Floating Quick Action Widget & Back-to-Top */}
            <QuickContactWidget />
        </div>
    );
}
