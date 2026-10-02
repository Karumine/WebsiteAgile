import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Printer, CheckCircle2, RefreshCw, PenTool, Share2, Check, Building2, User, Mail, CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import { useSections } from '@/lib/pageSections';
import { ncNdaSections } from '@/data/pageSections/ncNda';

function isValidThaiId(digits: string): boolean {
    if (!/^\d{13}$/.test(digits)) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += Number(digits[i]) * (13 - i);
    return (11 - (sum % 11)) % 10 === Number(digits[12]);
}

function maskIdentity(value: string): string {
    const compact = value.replace(/\s/g, '');
    return compact.length <= 4 ? compact : '•'.repeat(compact.length - 4) + compact.slice(-4);
}

export function NcNdaPage() {
    const { lang } = useLanguage();
    const { content } = usePageContent('nc-nda', DEFAULT_PAGE_CONTENTS['nc-nda']);
    const section = useSections(content, ncNdaSections);
    const heroExtras = section('hero-extras');
    const doc = section('document');
    const signoff = section('signoff');
    const success = section('success');

    // Form state
    const [fullName, setFullName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { send, guardFields } = useLeadSubmit();
    const [submissionData, setSubmissionData] = useState<{
        refId: string;
        timestamp: string;
        fullName: string;
        idCard: string;
        email: string;
    } | null>(null);

    // Signature Pad canvas state
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [copied, setCopied] = useState(false);

    // Thai ID is formatted as X XXXX XXXXX XX X; passports are kept as uppercase alphanumerics
    const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/[a-z]/i.test(e.target.value)) {
            setIdCard(e.target.value.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 9));
            return;
        }
        const raw = e.target.value.replace(/\D/g, '').slice(0, 13);
        let formatted = '';
        if (raw.length > 0) formatted += raw.substring(0, 1);
        if (raw.length > 1) formatted += ' ' + raw.substring(1, 5);
        if (raw.length > 5) formatted += ' ' + raw.substring(5, 10);
        if (raw.length > 10) formatted += ' ' + raw.substring(10, 12);
        if (raw.length > 12) formatted += ' ' + raw.substring(12, 13);
        setIdCard(formatted);
    };

    // Canvas drawing helpers
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        ctx.beginPath();
        ctx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
        ctx.strokeStyle = '#0284c7'; // Sky-600 color
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    // Resize canvas resolution properly
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(2, 2);
            }
        }
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success(lang === 'th' ? 'คัดลอกลิงก์เรียบร้อยแล้ว' : 'Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อ-สกุล' : 'Please enter your full name');
            return;
        }

        const identity = idCard.replace(/\s/g, '');
        const isPassport = /[A-Z]/.test(identity);
        if (isPassport ? !/^[A-Z0-9]{6,9}$/.test(identity) : !isValidThaiId(identity)) {
            toast.error(lang === 'th' ? 'เลขบัตรประชาชน (13 หลัก) หรือเลขพาสปอร์ตไม่ถูกต้อง' : 'Please enter a valid 13-digit Thai ID or passport number');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            toast.error(lang === 'th' ? 'กรุณากรอกอีเมลให้ถูกต้อง' : 'Please enter a valid email address');
            return;
        }

        if (!hasSignature || !canvasRef.current) {
            toast.error(lang === 'th' ? 'กรุณาลงลายมือชื่อในช่องลายเซ็น' : 'Please sign in the signature box');
            return;
        }

        if (!agreed) {
            toast.error(lang === 'th' ? 'กรุณาทำเครื่องหมายยอมรับข้อกำหนดในสัญญา' : 'Please accept the agreement terms');
            return;
        }

        const canvas = canvasRef.current;
        const signature = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!signature) {
            toast.error(lang === 'th' ? 'ไม่สามารถอ่านลายเซ็นได้ กรุณาเซ็นใหม่อีกครั้ง' : 'Could not read the signature. Please sign again.');
            return;
        }

        setIsSubmitting(true);
        const result = await send((meta) =>
            formService.submitNda({
                fullName: fullName.trim(),
                idCard: identity,
                email: email.trim(),
                company: company.trim() || undefined,
                phone: phone.trim() || undefined,
                agreed,
                signature,
            }, meta)
        );
        setIsSubmitting(false);
        if (!result) return;

        const receipt = result.data;
        const submittedAt = receipt?.timestamp ? new Date(receipt.timestamp) : new Date();
        setSubmissionData({
            refId: receipt?.referenceNumber || '-',
            timestamp: submittedAt.toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }),
            fullName: fullName.trim(),
            idCard: maskIdentity(identity),
            email: email.trim(),
        });
        setIdCard('');
        setIsSuccessModalOpen(true);
        toast.success(
            lang === 'th'
                ? 'บันทึกและส่งข้อมูลสัญญารักษาความลับเรียบร้อยแล้ว'
                : 'NC-NDA Agreement successfully submitted!'
        );
    };

    const pageTitle = content.metaTitle || (lang === 'th'
        ? 'สัญญาการรักษาความลับของลูกค้า (NC-NDA) | Agile Assets'
        : 'Non-Circumvention & Non-Disclosure Agreement (NC-NDA) | Agile Assets');

    const pageDescription = content.metaDescription || (lang === 'th'
        ? 'สัญญาการรักษาความลับของลูกค้า (NC-NDA) บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด เพื่อคุ้มครองข้อมูลความลับและข้อกำหนด Non-Circumvention'
        : 'Non-Circumvention and Non-Disclosure Agreement (NC-NDA) for Agile Assets Co., Ltd. protecting confidential business information.');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500/20 selection:text-sky-500">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://agileassets.co.th/nc-nda" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* Hero Header Section */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-sky-950/20 via-background to-background overflow-hidden border-b border-border/40 print:hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.15),transparent)]" />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal animation="fade-up">
                            {/* Breadcrumbs */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-400 mb-6">
                                <Link to="/" className="hover:underline">
                                    {lang === 'th' ? 'หน้าแรก' : 'Home'}
                                </Link>
                                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                                <span>NC-NDA</span>
                            </div>

                            {/* Badge */}
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 border border-sky-400/30 text-sky-400">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>{(lang === 'th' ? (content.heroBadgeTh || content.heroBadgeEn) : (content.heroBadgeEn || content.heroBadgeTh)) || 'NC-NDA AGREEMENT'}</span>
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                                {lang === 'th'
                                    ? (content.heroTitleTh || content.heroTitleEn || 'สัญญาการรักษาความลับของลูกค้า')
                                    : (content.heroTitleEn || content.heroTitleTh || 'Customer Non-Disclosure Agreement')}
                            </h1>
                            <p className="text-base sm:text-lg text-sky-400 font-semibold mb-2">
                                (Non-Circumvention and Non-Disclosure Agreement)
                            </p>
                            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {lang === 'th'
                                    ? (content.heroSubtitleTh || content.heroSubtitleEn || 'ข้อตกลงและเงื่อนไขการคุ้มครองข้อมูลความลับทางการค้าและการไม่ก้าวข้ามหรือหลีกเลี่ยงผู้ให้ข้อมูล บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด')
                                    : (content.heroSubtitleEn || content.heroSubtitleTh || 'Confidentiality terms and non-circumvention covenants of Agile Assets Co., Ltd.')}
                            </p>

                            {/* Action Bar */}
                            {!heroExtras.hidden && (<div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                                <a
                                    href={heroExtras.t('link01')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition-all duration-200"
                                >
                                    <PenTool className="w-4 h-4" />
                                    <span>{heroExtras.t('t02')}</span>
                                </a>
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-xs sm:text-sm font-semibold transition-all duration-200"
                                >
                                    <Printer className="w-4 h-4 text-sky-400" />
                                    <span>{heroExtras.t('t03')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-xs sm:text-sm font-semibold transition-all duration-200"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
                                    <span>{copied ? (heroExtras.t('t04')) : (heroExtras.t('t05'))}</span>
                                </button>
                            </div>)}
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Document Content */}
                <section className="py-12 sm:py-16 bg-muted/20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            {/* Document Sheet Card */}
                            <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl shadow-xl shadow-black/5 p-6 sm:p-10 md:p-14 relative overflow-hidden print:shadow-none print:border-none print:p-0">
                                {/* Watermark Background Stamp */}
                                <div className="absolute top-10 right-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05] flex flex-col items-center">
                                    <ShieldCheck className="w-64 h-64 text-sky-500" />
                                </div>

                                {/* Official Header */}
                                {!doc.hidden && (<div className="text-center pb-8 mb-8 border-b border-border/60">
                                    <div className="inline-block px-3 py-1 rounded bg-sky-500/10 text-sky-500 font-mono text-xs font-bold tracking-widest uppercase mb-2">
                                        {doc.t('t01')}
                                    </div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-sans">
                                        {doc.t('t02')}
                                    </h2>
                                    <p className="text-sm sm:text-base font-bold text-sky-500 mt-1 font-mono">
                                        {doc.t('t03')}
                                    </p>
                                </div>)}

                                {/* Legal Text Body */}
                                {!doc.hidden && (<div className="space-y-6 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans text-justify">
                                    {/* Preamble */}
                                    <p className="indent-8 text-foreground/95">
                                        {lang === 'th' ? (
                                            <>
                                                {doc.t('t04')}<strong>{doc.t('t05')}</strong>{doc.t('t06')}<strong>{doc.t('t07')}</strong>{doc.t('t08')}
                                            </>
                                        ) : (
                                            <>
                                                {doc.t('t09')} <strong>{doc.t('t10')}</strong>{doc.t('t11')}
                                            </>
                                        )}
                                    </p>

                                    {/* Parties */}
                                    <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 sm:p-5 space-y-3">
                                        <div className="flex items-start gap-2">
                                            <span className="font-bold text-sky-500 flex-shrink-0">1.</span>
                                            <div>
                                                {<span>
                                                        <strong>{doc.t('t12')}</strong> {doc.t('t13')}<strong>{doc.t('t14')}</strong>{doc.t('t15')}
                                                    </span>}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 pt-2 border-t border-sky-500/15">
                                            <span className="font-bold text-sky-500 flex-shrink-0">2.</span>
                                            <div>
                                                {<span>
                                                        <strong>{doc.t('t16')}</strong> {doc.t('t17')}<strong>{doc.t('t18')}</strong>{doc.t('t19')}
                                                    </span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Introduction */}
                                    <p className="indent-8">
                                        {<>
                                                {doc.t('t20')}
                                            </>}
                                    </p>

                                    {/* Clause 1 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">1</span>
                                            {doc.t('t21')}
                                        </h3>
                                        <p className="pl-8">
                                            {<>
                                                    {doc.t('t22')} <strong>{doc.t('t23')}</strong> {doc.t('t24')}
                                                </>}
                                        </p>
                                    </div>

                                    {/* Clause 2 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">2</span>
                                            {doc.t('t25')}
                                        </h3>
                                        <p className="pl-8">
                                            {<>
                                                    {doc.t('t26')}
                                                </>}
                                        </p>
                                    </div>

                                    {/* Clause 3 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">3</span>
                                            {doc.t('t27')}
                                        </h3>
                                        <p className="pl-8">
                                            {<>
                                                    {doc.t('t28')}
                                                </>}
                                        </p>
                                    </div>

                                    {/* Clause 4 - Non-Circumvention (Highlighted Callout) */}
                                    <div className="pt-3">
                                        <div className="bg-sky-500/10 dark:bg-sky-950/40 border-2 border-sky-500/30 rounded-2xl p-5 sm:p-7 space-y-4">
                                            <div className="flex items-center gap-2.5 pb-2 border-b border-sky-500/20">
                                                <ShieldCheck className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                                <h3 className="font-extrabold text-foreground text-sm sm:text-base tracking-tight">
                                                    {doc.t('t29')}
                                                </h3>
                                            </div>

                                            <div className="space-y-3 pl-2 sm:pl-4">
                                                <p>
                                                    <strong className="text-sky-500">4.1</strong>{' '}
                                                    {lang === 'th' ? (
                                                        <>
                                                            {doc.t('t30')} <strong>{doc.t('t31')}</strong>{doc.t('t32')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {doc.t('t33')}
                                                        </>
                                                    )}
                                                </p>

                                                <p>
                                                    <strong className="text-sky-500">4.2</strong>{' '}
                                                    {<>
                                                            {doc.t('t34')}
                                                        </>}
                                                </p>

                                                <div className="p-3 bg-card/80 rounded-xl border border-sky-500/30 text-sky-500 font-semibold">
                                                    <p>
                                                        <strong className="text-foreground">4.3</strong>{' '}
                                                        {<>
                                                                {doc.t('t35')} <strong>{doc.t('t36')}</strong> {doc.t('t37')}
                                                            </>}
                                                    </p>
                                                </div>

                                                <p>
                                                    <strong className="text-sky-500">4.4</strong>{' '}
                                                    {<>
                                                            {doc.t('t38')}
                                                        </>}
                                                </p>

                                                <p>
                                                    <strong className="text-sky-500">4.5</strong>{' '}
                                                    {<>
                                                            {doc.t('t39')}
                                                        </>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clause 5 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">5</span>
                                            {doc.t('t40')}
                                        </h3>
                                        <p className="pl-8">
                                            {<>
                                                    {doc.t('t41')}
                                                </>}
                                        </p>
                                    </div>

                                    {/* Clause 6 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">6</span>
                                            {doc.t('t42')}
                                        </h3>
                                        <p className="pl-8">
                                            {<>
                                                    {doc.t('t43')}
                                                </>}
                                        </p>
                                    </div>

                                    {/* Conclusion */}
                                    <p className="indent-8 pt-4 text-foreground/95 border-t border-border/60">
                                        {<>
                                                {doc.t('t44')}
                                            </>}
                                    </p>
                                </div>)}
                            </div>
                        </ScrollReveal>

                        {/* Interactive Sign-off Form Section */}
                        {!signoff.hidden && (<div id="sign-form" className="mt-12 sm:mt-16 scroll-mt-28 print:hidden">
                            <ScrollReveal animation="fade-up">
                                <div className="bg-card border-2 border-sky-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/5">
                                    <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/80">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-500/20">
                                            <PenTool className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                                {signoff.t('t01')}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                {signoff.t('t02')}
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {/* Full Name */}
                                            <div className="space-y-2">
                                                <label htmlFor="nc-nda-field-1" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{signoff.t('t03')}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input id="nc-nda-field-1"
                                                    type="text"
                                                    required
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder={signoff.t('t04')}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>

                                            {/* ID Card / Passport */}
                                            <div className="space-y-2">
                                                <label htmlFor="nc-nda-field-2" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <CreditCard className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{signoff.t('t05')}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input id="nc-nda-field-2"
                                                    type="text"
                                                    required
                                                    value={idCard}
                                                    onChange={handleIdCardChange}
                                                    placeholder="X XXXX XXXXX XX X"
                                                    maxLength={17}
                                                    autoComplete="off"
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground font-mono outline-none transition-all tracking-wider"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2 sm:col-span-2">
                                                <label htmlFor="nc-nda-field-3" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{signoff.t('t06')}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input id="nc-nda-field-3"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Example@gmail.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>

                                            {/* Company Name (Optional) */}
                                            <div className="space-y-2">
                                                <label htmlFor="nc-nda-field-4" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <Building2 className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{signoff.t('t07')}</span>
                                                </label>
                                                <input id="nc-nda-field-4"
                                                    type="text"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    placeholder={signoff.t('t08')}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>

                                            {/* Phone (Optional) */}
                                            <div className="space-y-2">
                                                <label htmlFor="nc-nda-field-5" className="text-xs sm:text-sm font-semibold text-foreground">
                                                    <span>{signoff.t('t09')}</span>
                                                </label>
                                                <input id="nc-nda-field-5"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="08X-XXX-XXXX"
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Digital Signature Pad */}
                                        <div className="space-y-2 pt-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <PenTool className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{signoff.t('t10')}</span>
                                                </label>
                                                {hasSignature && (
                                                    <button
                                                        type="button"
                                                        onClick={clearSignature}
                                                        className="text-xs text-muted-foreground hover:text-rose-500 flex items-center gap-1 transition-colors"
                                                    >
                                                        <RefreshCw className="w-3 h-3" />
                                                        <span>{signoff.t('t11')}</span>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative rounded-xl border-2 border-dashed border-sky-500/30 bg-background/80 overflow-hidden h-36">
                                                <canvas
                                                    ref={canvasRef}
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseLeave={stopDrawing}
                                                    onTouchStart={startDrawing}
                                                    onTouchMove={draw}
                                                    onTouchEnd={stopDrawing}
                                                    className="w-full h-full cursor-crosshair touch-none"
                                                />
                                                {!hasSignature && (
                                                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-muted-foreground/50 gap-1">
                                                        <PenTool className="w-5 h-5" />
                                                        <span className="text-xs">
                                                            {signoff.t('t12')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Consent Agreement Checkbox */}
                                        <div className="pt-2">
                                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={agreed}
                                                    onChange={(e) => setAgreed(e.target.checked)}
                                                    className="w-4 h-4 mt-0.5 rounded border-border text-sky-500 focus:ring-sky-400"
                                                />
                                                <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                                                    {<>
                                                            {signoff.t('t13')}
                                                        </>}
                                                </span>
                                            </label>
                                        </div>

                                        {guardFields}

                                        {/* Submit Button */}
                                        <div className="pt-3">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                                        <span>{signoff.t('t14')}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <span>{signoff.t('t15')}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Security Notice */}
                                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                                            <Lock className="w-3.5 h-3.5 text-sky-500" />
                                            <span>
                                                {signoff.t('t16')}
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </ScrollReveal>
                        </div>)}
                    </div>
                </section>
            </main>

            {/* Success Modal */}
            {!success.hidden && (isSuccessModalOpen && submissionData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in print:hidden">
                    <div className="bg-card border border-sky-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <div className="text-center space-y-1.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                                {success.t('t01')}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {success.t('t02')}
                            </p>
                        </div>

                        {/* Confirmation Card */}
                        <div className="bg-muted/40 rounded-2xl p-4 space-y-2.5 text-xs sm:text-sm border border-border/60">
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{success.t('t03')}</span>
                                <span className="font-mono font-bold text-sky-500">{submissionData.refId}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{success.t('t04')}</span>
                                <span className="font-semibold text-foreground">{submissionData.fullName}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{success.t('t05')}</span>
                                <span className="font-mono text-foreground">{submissionData.idCard}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{success.t('t06')}</span>
                                <span className="text-foreground">{submissionData.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-muted-foreground">{success.t('t07')}</span>
                                <span className="text-foreground">{submissionData.timestamp}</span>
                            </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="flex-1 py-3 px-4 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                <Printer className="w-4 h-4 text-sky-400" />
                                <span>{success.t('t08')}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-500/25 transition-all"
                            >
                                {success.t('t09')}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {!success.hidden && (<QuickContactWidget />)}
            {!success.hidden && (<CookieConsent />)}
            {!success.hidden && (<Footer />)}
        </div>
    );
}
