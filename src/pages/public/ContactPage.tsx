import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, ChevronRight, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { cn } from '@/lib/utils';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';
import { useSections } from '@/lib/pageSections';
import { contactSections } from '@/data/pageSections/contact';


export function ContactPage() {
    const { lang } = useLanguage();
    const { settings } = useSiteSettings();
    const { content } = usePageContent('contact', DEFAULT_PAGE_CONTENTS['contact']);
    const section = useSections(content, contactSections);
    const contactCards = section('contact-cards');
    const location = section('location');
    const faqForm = section('faq-form');
    const companyInfo = settings.companyInfo;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Contact Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { send, guardFields } = useLeadSubmit();

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await send((meta) =>
            formService.submitContact({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
            }, meta)
        );
        setIsSubmitting(false);
        if (!result) return;

        setIsSubmitted(true);
        toast.success(
            lang === 'th'
                ? 'ส่งข้อความเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง'
                : 'Your message has been sent successfully. Our team will contact you within 24 hours.'
        );
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    const pageTitle = content.metaTitle || (lang === 'th'
        ? 'ติดต่อเรา (Contact Us) | Agile Assets สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม'
        : 'Contact Us | Agile Assets Industrial Equipment Financing');
    const pageDescription = content.metaDescription || (lang === 'th'
        ? 'ติดต่อ Agile Assets สำนักงานใหญ่ โทร. 02-000-9392, 02-005-1599 อีเมล rattinun@agileassets.co.th พร้อมแผนที่และการเดินทาง'
        : 'Contact Agile Assets Head Office, phone numbers, email, interactive location maps, and submit inquiries online.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/contact/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || heroBg}
                            alt="Agile Assets Contact Us"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />

                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Ambient Aura Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                {lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'Agile Assets') : (content.heroBadgeEn || content.heroBadgeTh || 'Agile Assets')}
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-4">
                                {lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'ติดต่อเรา') : (content.heroTitleEn || content.heroTitleTh || 'Contact Us')}
                            </h1>
                            {(content.heroSubtitleTh || content.heroSubtitleEn) && (
                                <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                                    {lang === 'th' ? (content.heroSubtitleTh || content.heroSubtitleEn) : (content.heroSubtitleEn || content.heroSubtitleTh)}
                                </p>
                            )}
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Top 3 Contact Cards ─── */}
                {!contactCards.hidden && (<section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Tel Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans mb-3">
                                        {contactCards.t('t01')}
                                    </h3>
                                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                                        <p>
                                            <a href={`tel:${companyInfo?.phone?.replace(/[^0-9]/g, '') || '020009392'}`} className="hover:text-sky-600 transition-colors font-semibold text-slate-800 dark:text-slate-200">
                                                {companyInfo?.phone || '02-0009392'}
                                            </a>
                                            {companyInfo?.operatingHours && (
                                                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    {contactCards.t('t02')} {companyInfo.operatingHours}
                                                </span>
                                            )}
                                        </p>
                                        <p>
                                            <a href={contactCards.t('link03')} className="hover:text-sky-600 transition-colors">{contactCards.t('t04')}</a>
                                        </p>
                                        <p>
                                            <a href={contactCards.t('link05')} className="hover:text-sky-600 transition-colors">{contactCards.t('t06')}</a>,{' '}
                                            <a href={contactCards.t('link07')} className="hover:text-sky-600 transition-colors">{contactCards.t('t08')}</a>
                                        </p>
                                        <p>
                                            <a href={contactCards.t('link09')} className="hover:text-sky-600 transition-colors">{contactCards.t('t10')}</a>,{' '}
                                            <a href={contactCards.t('link11')} className="hover:text-sky-600 transition-colors">{contactCards.t('t12')}</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans mb-3">
                                        {contactCards.t('t13')}
                                    </h3>
                                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                                        <p>
                                            <a href={`mailto:${companyInfo?.email || 'rattinun@agileassets.co.th'}`} className="hover:text-sky-600 transition-colors font-semibold text-slate-800 dark:text-slate-200">
                                                {companyInfo?.email || 'rattinun@agileassets.co.th'}
                                            </a>
                                        </p>
                                        <p>
                                            <a href={contactCards.t('link14')} className="hover:text-sky-600 transition-colors">
                                                {contactCards.t('t15')}
                                            </a>
                                        </p>
                                        {companyInfo?.lineId && (
                                            <p className="text-sky-600 dark:text-sky-400 font-bold text-xs pt-1">
                                                {contactCards.t('t16')} {companyInfo.lineId}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Head Office Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans mb-3">
                                        {contactCards.t('t17')}
                                    </h3>
                                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                                        <p>{companyInfo?.address || 'เลขที่ 20 หมู่ 1 ถ.สุขุมวิท ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270'}</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 3. Company Location (ที่ตั้งบริษัท) ─── */}
                {!location.hidden && (<section className="py-14 sm:py-20 bg-white dark:bg-slate-900/60">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 font-sans mb-2">
                                    {location.t('t01')}
                                </h2>
                                <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 font-sans">
                                    {location.t('t02')}
                                </p>
                            </div>

                            {/* Dual Map Visual: Graphic Illustration & Google Map */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                {/* Graphic Road Map */}
                                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-950 p-2">
                                    <img
                                        src={location.t('img03')}
                                        alt="Agile Assets Head Office Graphic Map"
                                        className="w-full h-auto object-contain rounded-xl hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Interactive Google Maps Iframe */}
                                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-[340px] sm:h-[400px] lg:h-[420px] bg-slate-100 dark:bg-slate-950">
                                    <iframe
                                        src={location.t('img04')}
                                        title="อาไจล์ แอสเซ็ทส์ แผนที่ Google Maps"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>)}

                {/* ─── 4. FAQ & Contact Form Section (2 Columns) ─── */}
                {!faqForm.hidden && (<section className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                            {/* Left Column: FAQ Accordion */}
                            <div className="lg:col-span-6 space-y-4">
                                <ScrollReveal animation="fade-up">
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-sans mb-6">
                                        {faqForm.t('t01')}
                                    </h2>

                                    <div className="space-y-3">
                                        {faqForm.items.map((faq, index) => {
                                            const isOpen = openIndex === index;
                                            return (
                                                <div
                                                    key={faq.raw.id}
                                                    className={cn(
                                                        "rounded-xl border transition-all duration-200 overflow-hidden",
                                                        isOpen
                                                            ? "bg-sky-50/50 dark:bg-slate-900 border-sky-300 dark:border-sky-700 shadow-sm"
                                                            : "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                                                    )}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAccordion(index)}
                                                        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left gap-3"
                                                    >
                                                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 font-sans leading-snug">
                                                            {faq.t('question')}
                                                        </span>
                                                        <ChevronRight className={cn(
                                                            "w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0",
                                                            isOpen && "rotate-90 text-sky-500"
                                                        )} />
                                                    </button>

                                                    {isOpen && (
                                                        <div className="px-4 sm:px-5 pb-4 pt-1 animate-fade-in border-t border-slate-100 dark:border-slate-800">
                                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-950 p-3 rounded-lg">
                                                                “{faq.t('answer')}”
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column: Contact Message Form (Navy Blue Box) */}
                            <div className="lg:col-span-6">
                                <ScrollReveal animation="fade-up">
                                    <div className="bg-blue-900 dark:bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-blue-800 dark:border-slate-800">
                                        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans mb-2 tracking-tight">
                                            {faqForm.t('t02')}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-sky-200/90 font-light mb-8">
                                            {faqForm.t('t03')}
                                        </p>

                                        {isSubmitted ? (
                                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center space-y-3 animate-fade-in border border-white/20">
                                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                                                    <CheckCircle2 className="w-7 h-7" />
                                                </div>
                                                <h3 className="text-base font-bold text-white">
                                                    {faqForm.t('t04')}
                                                </h3>
                                                <p className="text-xs text-sky-200">
                                                    {faqForm.t('t05')}
                                                </p>
                                                <button
                                                    onClick={() => setIsSubmitted(false)}
                                                    className="mt-3 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all"
                                                >
                                                    {faqForm.t('t06')}
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                                {/* Names row */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder={faqForm.t('t07')}
                                                        aria-label={faqForm.t('t07')}
                                                        required
                                                        maxLength={100}
                                                        autoComplete="given-name"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder={faqForm.t('t08')}
                                                        aria-label={faqForm.t('t08')}
                                                        maxLength={100}
                                                        autoComplete="family-name"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                                                    />
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <input
                                                        type="email"
                                                        placeholder={faqForm.t('t09')}
                                                        aria-label={faqForm.t('t09')}
                                                        maxLength={200}
                                                        autoComplete="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                                                    />
                                                </div>

                                                {/* Subject */}
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder={faqForm.t('t10')}
                                                        aria-label={faqForm.t('t10')}
                                                        maxLength={300}
                                                        value={subject}
                                                        onChange={(e) => setSubject(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                                                    />
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <textarea
                                                        rows={4}
                                                        placeholder={faqForm.t('t11')}
                                                        aria-label={faqForm.t('t11')}
                                                        maxLength={5000}
                                                        required
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm resize-none"
                                                    />
                                                </div>

                                                {guardFields}

                                                {/* Submit Button */}
                                                <div className="pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="px-8 py-3 rounded-xl bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-900/40 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                                                    >
                                                        {isSubmitting ? (
                                                            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                        ) : (
                                                            <Send className="w-4 h-4" />
                                                        )}
                                                        <span>{faqForm.t('t12')}</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>)}
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
