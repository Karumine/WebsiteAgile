import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle2, ShieldCheck, FileText, CheckCircle, Building2, RefreshCw, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useSections } from '@/lib/pageSections';
import { leasingApplicationSections } from '@/data/pageSections/leasingApplication';

export function LeasingApplicationPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('leasing-application', DEFAULT_PAGE_CONTENTS['leasing-application']);
    const section = useSections(content, leasingApplicationSections);
    const mainSec = section('main');

    const [applicantType, setApplicantType] = useState<'corporate' | 'individual'>('corporate');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        businessType: '',
        machineInterest: '',
        address1: '',
        address2: '',
        district: '',
        province: '',
        postalCode: '',
        phone: '',
        email: '',
        purposeNew: true,
        purposeReplace: false,
        purposeOther: false,
        otherDetails: '',
        acceptConsent: false,
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { send, guardFields } = useLeadSubmit();
    const isCorporate = applicantType === 'corporate';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await send((meta) =>
            formService.submitLeasing({
                applicantType,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                companyName: formData.companyName.trim() || undefined,
                businessType: formData.businessType.trim(),
                machineInterest: formData.machineInterest.trim(),
                address1: formData.address1.trim(),
                address2: formData.address2.trim() || undefined,
                district: formData.district.trim(),
                province: formData.province.trim(),
                postalCode: formData.postalCode.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                purpose: { new: formData.purposeNew, replace: formData.purposeReplace, other: formData.purposeOther },
                otherDetails: formData.otherDetails.trim() || undefined,
                acceptConsent: formData.acceptConsent,
            }, meta)
        );
        setIsSubmitting(false);
        if (!result) return;
        setSubmitted(true);
        document.getElementById('leasing-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const title = content.metaTitle || (lang === 'en'
        ? 'Leasing Application Form | Agile Assets'
        : 'ใบสมัครสินเชื่อเช่าซื้อเครื่องจักร | Agile Assets');
    const description = content.metaDescription || (lang === 'en'
        ? 'Apply for industrial machinery leasing and hire purchase financing with Agile Assets.'
        : 'สมัครขอสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม และโซลูชันเงินทุนเพื่อการเติบโตของธุรกิจกับ Agile Assets');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://agileassets.co.th/leasing-application" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* Hero Banner with Industrial Engine / Generator Image */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-950 text-white">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.heroImage || 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1800&q=80'}
                            alt="Leasing Application Form"
                            className="w-full h-full object-cover object-center"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-sky-950/85 to-slate-950/90" />
                        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    </div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-400 mb-3 drop-shadow">
                                {(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn || 'LEASING APPLICATION FORM') : (content.heroBadgeEn || content.heroBadgeTh || 'LEASING APPLICATION FORM'))}
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sans drop-shadow-md">
                                {(lang === 'th' ? (content.heroTitleTh || content.heroTitleEn || 'ใบสมัครสินเชื่อเช่าซื้อเครื่องจักร') : (content.heroTitleEn || content.heroTitleTh || 'Machinery Leasing Application Form'))}
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Content & Two-Column Application Form */}
                {!mainSec.hidden && (<section className="py-14 sm:py-20 bg-slate-50/60 dark:bg-slate-950/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Centered Heading */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12 sm:mb-16">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
                                    {mainSec.t('t01')}
                                </h2>
                                <div className="w-16 h-1 bg-sky-500 rounded-full mx-auto mt-3" />
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                            {/* Left Column: Guidelines, Terms & Required Documents */}
                            <ScrollReveal animation="fade-right" className="lg:col-span-5 space-y-8">
                                {/* Services Block */}
                                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-500/20 shadow-lg space-y-6">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-sky-800 dark:text-sky-400 font-sans mb-1">
                                            {mainSec.t('t02')}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {mainSec.t('t03')}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">
                                                    {mainSec.t('t04')}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                    {mainSec.t('t05')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0">
                                                <RefreshCw className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">
                                                    {mainSec.t('t06')}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                    {mainSec.t('t07')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Conditions */}
                                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border space-y-5">
                                    <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                                        {mainSec.t('t08')}
                                    </h3>

                                    <div className="space-y-4 text-xs sm:text-sm">
                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>{mainSec.t('t09')}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {mainSec.t('t10')}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>{mainSec.t('t11')}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {mainSec.t('t12')}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{mainSec.t('t13')}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {mainSec.t('t14')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Required Documents */}
                                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <FileText className="w-5 h-5 text-sky-500" />
                                        <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                                            {mainSec.t('t15')}
                                        </h3>
                                    </div>

                                    <div className="space-y-2.5 text-xs text-muted-foreground">
                                        <p className="font-semibold text-foreground">
                                            {mainSec.t('t16')}
                                        </p>
                                        <ul className="space-y-2 pl-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t17')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t18')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t19')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t20')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t21')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t22')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t23')}</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>{mainSec.t('t24')}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Right Column: Application Form */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7">
                                <div id="leasing-form-card" className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-500/25 shadow-2xl bg-card scroll-mt-28">
                                    {submitted ? (
                                        <div className="py-12 text-center space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground">
                                                {mainSec.t('t25')}
                                            </h3>
                                            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                                                {mainSec.t('t26')}
                                            </p>
                                            <div className="pt-4">
                                                <button
                                                    onClick={() => setSubmitted(false)}
                                                    className="px-6 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-400 transition-all"
                                                >
                                                    {mainSec.t('t27')}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            {/* ผู้ขอสินเชื่อ Type Selector */}
                                            <div>
                                                <label className="block text-xs font-bold text-foreground mb-2">
                                                    {mainSec.t('t28')}
                                                </label>
                                                <div className="flex items-center gap-6">
                                                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                                                        <input
                                                            type="radio"
                                                            name="applicantType"
                                                            checked={applicantType === 'corporate'}
                                                            onChange={() => setApplicantType('corporate')}
                                                            className="w-4 h-4 text-sky-500 focus:ring-sky-400"
                                                        />
                                                        <span>{mainSec.t('t29')}</span>
                                                    </label>

                                                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                                                        <input
                                                            type="radio"
                                                            name="applicantType"
                                                            checked={applicantType === 'individual'}
                                                            onChange={() => setApplicantType('individual')}
                                                            className="w-4 h-4 text-sky-500 focus:ring-sky-400"
                                                        />
                                                        <span>{mainSec.t('t30')}</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Row 1: Name | Last Name */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="leasing-application-field-1" className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {mainSec.t('t31')}
                                                    </label>
                                                    <input id="leasing-application-field-1"
                                                        type="text"
                                                        required
                                                        value={formData.firstName}
                                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                        placeholder={mainSec.t('t32')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="leasing-application-field-2" className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {mainSec.t('t33')}
                                                    </label>
                                                    <input id="leasing-application-field-2"
                                                        type="text"
                                                        required
                                                        value={formData.lastName}
                                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                        placeholder={mainSec.t('t34')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 2: Company Name */}
                                            <div>
                                                <label htmlFor="leasing-application-field-3" className="block text-xs font-semibold text-muted-foreground mb-1">
                                                    {mainSec.t('t35')}{isCorporate ? ' *' : ''}
                                                </label>
                                                <input id="leasing-application-field-3"
                                                    type="text"
                                                    required={isCorporate}
                                                    maxLength={200}
                                                    value={formData.companyName}
                                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                    placeholder={mainSec.t('t36')}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Row 3: Business Type | Machine Interest */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="leasing-application-field-4" className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {mainSec.t('t37')}
                                                    </label>
                                                    <input id="leasing-application-field-4"
                                                        type="text"
                                                        required
                                                        value={formData.businessType}
                                                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                                        placeholder={mainSec.t('t38')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="leasing-application-field-5" className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {mainSec.t('t39')}
                                                    </label>
                                                    <input id="leasing-application-field-5"
                                                        type="text"
                                                        required
                                                        value={formData.machineInterest}
                                                        onChange={(e) => setFormData({ ...formData, machineInterest: e.target.value })}
                                                        placeholder={mainSec.t('t40')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 4: Address 1 & Address 2 */}
                                            <div className="space-y-3">
                                                <label className="block text-xs font-bold text-foreground">
                                                    {mainSec.t('t41')}
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="leasing-application-field-6" className="block text-xs text-muted-foreground mb-1">
                                                            {mainSec.t('t42')}
                                                        </label>
                                                        <input id="leasing-application-field-6"
                                                            type="text"
                                                            required
                                                            value={formData.address1}
                                                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                                                            placeholder={mainSec.t('t43')}
                                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="leasing-application-field-7" className="block text-xs text-muted-foreground mb-1">
                                                            {mainSec.t('t44')}
                                                        </label>
                                                        <input id="leasing-application-field-7"
                                                            type="text"
                                                            value={formData.address2}
                                                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                                            placeholder={mainSec.t('t45')}
                                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row 5: District | Province */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="leasing-application-field-8" className="block text-xs text-muted-foreground mb-1">
                                                        {mainSec.t('t46')}
                                                    </label>
                                                    <input id="leasing-application-field-8"
                                                        type="text"
                                                        required
                                                        value={formData.district}
                                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                        placeholder={mainSec.t('t47')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="leasing-application-field-9" className="block text-xs text-muted-foreground mb-1">
                                                        {mainSec.t('t48')}
                                                    </label>
                                                    <input id="leasing-application-field-9"
                                                        type="text"
                                                        required
                                                        value={formData.province}
                                                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                                        placeholder={mainSec.t('t49')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 6: Postal Code | Mobile Phone */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="leasing-application-field-10" className="block text-xs text-muted-foreground mb-1">
                                                        {mainSec.t('t50')}
                                                    </label>
                                                    <input id="leasing-application-field-10"
                                                        type="text"
                                                        required
                                                        inputMode="numeric"
                                                        pattern="[0-9]{5}"
                                                        maxLength={5}
                                                        title={mainSec.t('t51')}
                                                        autoComplete="postal-code"
                                                        value={formData.postalCode}
                                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/D/g, '') })}
                                                        placeholder={mainSec.t('t52')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="leasing-application-field-11" className="block text-xs text-muted-foreground mb-1">
                                                        {mainSec.t('t53')}
                                                    </label>
                                                    <input id="leasing-application-field-11"
                                                        type="tel"
                                                        required
                                                        inputMode="tel"
                                                        pattern="[0-9+-s]{9,15}"
                                                        maxLength={15}
                                                        title={mainSec.t('t54')}
                                                        autoComplete="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder={mainSec.t('t55')}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 7: Email */}
                                            <div>
                                                <label htmlFor="leasing-application-field-12" className="block text-xs text-muted-foreground mb-1">
                                                    {mainSec.t('t56')}
                                                </label>
                                                <input id="leasing-application-field-12"
                                                    type="email"
                                                    required
                                                    maxLength={200}
                                                    autoComplete="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={mainSec.t('t57')}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Row 8: Purpose Checklist */}
                                            <div className="space-y-2 pt-1">
                                                <label className="block text-xs font-bold text-foreground">
                                                    {mainSec.t('t58')}
                                                </label>
                                                <div className="space-y-2 text-xs">
                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeNew}
                                                            onChange={(e) => setFormData({ ...formData, purposeNew: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{mainSec.t('t59')}</span>
                                                    </label>

                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeReplace}
                                                            onChange={(e) => setFormData({ ...formData, purposeReplace: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{mainSec.t('t60')}</span>
                                                    </label>

                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeOther}
                                                            onChange={(e) => setFormData({ ...formData, purposeOther: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{mainSec.t('t61')}</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Row 9: Other Details Textarea */}
                                            <div>
                                                <label htmlFor="leasing-application-field-13" className="block text-xs text-muted-foreground mb-1">
                                                    {mainSec.t('t62')}
                                                </label>
                                                <textarea id="leasing-application-field-13"
                                                    rows={3}
                                                    value={formData.otherDetails}
                                                    onChange={(e) => setFormData({ ...formData, otherDetails: e.target.value })}
                                                    placeholder={mainSec.t('t63')}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all resize-none"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Row 10: PDPA Consent Checkbox */}
                                            <div className="pt-2">
                                                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        checked={formData.acceptConsent}
                                                        onChange={(e) => setFormData({ ...formData, acceptConsent: e.target.checked })}
                                                        className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400 mt-0.5"
                                                    />
                                                    <span>
                                                        {mainSec.t('t64')}
                                                        <Link to={mainSec.t('link65')} target="_blank" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
                                                            {mainSec.t('t66')}
                                                        </Link>
                                                        {' *'}
                                                    </span>
                                                </label>
                                            </div>

                                            {guardFields}

                                            {/* Submit Button */}
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                            <span>{mainSec.t('t67')}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-4 h-4" />
                                                            <span>{mainSec.t('t68')}</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </ScrollReveal>
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
