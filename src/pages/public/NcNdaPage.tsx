import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
    ShieldCheck, ChevronRight, Printer, CheckCircle2, 
    RefreshCw, PenTool, Share2, Check, Building2, User, Mail, CreditCard, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function NcNdaPage() {
    const { lang } = useLanguage();

    // Form state
    const [fullName, setFullName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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

    // Format ID card input to: X XXXX XXXXX XX X
    const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อ-สกุล' : 'Please enter your full name');
            return;
        }

        if (!idCard.trim() || idCard.replace(/\s/g, '').length < 13) {
            toast.error(lang === 'th' ? 'กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก' : 'Please enter a valid 13-digit ID number');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            toast.error(lang === 'th' ? 'กรุณากรอกอีเมลให้ถูกต้อง' : 'Please enter a valid email address');
            return;
        }

        if (!agreed) {
            toast.error(lang === 'th' ? 'กรุณาทำเครื่องหมายยอมรับข้อกำหนดในสัญญา' : 'Please accept the agreement terms');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const refNumber = `NDA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
            const dateStr = new Date().toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
            });

            setSubmissionData({
                refId: refNumber,
                timestamp: dateStr,
                fullName: fullName.trim(),
                idCard: idCard.trim(),
                email: email.trim(),
            });

            setIsSubmitting(false);
            setIsSuccessModalOpen(true);
            toast.success(
                lang === 'th'
                    ? 'บันทึกและส่งข้อมูลสัญญารักษาความลับเรียบร้อยแล้ว'
                    : 'NC-NDA Agreement successfully submitted!'
            );
        }, 1200);
    };

    const pageTitle = lang === 'th'
        ? 'สัญญาการรักษาความลับของลูกค้า (NC-NDA) | Agile Assets'
        : 'Non-Circumvention & Non-Disclosure Agreement (NC-NDA) | Agile Assets';

    const pageDescription = lang === 'th'
        ? 'สัญญาการรักษาความลับของลูกค้า (NC-NDA) บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด เพื่อคุ้มครองข้อมูลความลับและข้อกำหนด Non-Circumvention'
        : 'Non-Circumvention and Non-Disclosure Agreement (NC-NDA) for Agile Assets Co., Ltd. protecting confidential business information.';

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
                                    <span>NC-NDA AGREEMENT</span>
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                                {lang === 'th'
                                    ? 'สัญญาการรักษาความลับของลูกค้า'
                                    : 'Customer Non-Disclosure Agreement'}
                            </h1>
                            <p className="text-base sm:text-lg text-sky-400 font-semibold mb-2">
                                (Non-Circumvention and Non-Disclosure Agreement)
                            </p>
                            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {lang === 'th'
                                    ? 'ข้อตกลงและเงื่อนไขการคุ้มครองข้อมูลความลับทางการค้าและการไม่ก้าวข้ามหรือหลีกเลี่ยงผู้ให้ข้อมูล บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด'
                                    : 'Confidentiality terms and non-circumvention covenants of Agile Assets Co., Ltd.'}
                            </p>

                            {/* Action Bar */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                                <a
                                    href="#sign-form"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition-all duration-200"
                                >
                                    <PenTool className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'ลงนามอิเล็กทรอนิกส์' : 'Sign Agreement Online'}</span>
                                </a>
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-xs sm:text-sm font-semibold transition-all duration-200"
                                >
                                    <Printer className="w-4 h-4 text-sky-400" />
                                    <span>{lang === 'th' ? 'พิมพ์เอกสาร' : 'Print Document'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-xs sm:text-sm font-semibold transition-all duration-200"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
                                    <span>{copied ? (lang === 'th' ? 'คัดลอกแล้ว' : 'Copied!') : (lang === 'th' ? 'แชร์ลิงก์' : 'Share')}</span>
                                </button>
                            </div>
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
                                <div className="text-center pb-8 mb-8 border-b border-border/60">
                                    <div className="inline-block px-3 py-1 rounded bg-sky-500/10 text-sky-500 font-mono text-xs font-bold tracking-widest uppercase mb-2">
                                        NC-NDA
                                    </div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-sans">
                                        {lang === 'th'
                                            ? 'สัญญาการรักษาความลับของลูกค้า'
                                            : 'Customer Confidentiality Agreement'}
                                    </h2>
                                    <p className="text-sm sm:text-base font-bold text-sky-500 mt-1 font-mono">
                                        (Non-Circumvention a non-disclosure agreement)
                                    </p>
                                </div>

                                {/* Legal Text Body */}
                                <div className="space-y-6 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans text-justify">
                                    {/* Preamble */}
                                    <p className="indent-8 text-foreground/95">
                                        {lang === 'th' ? (
                                            <>
                                                สัญญาให้เก็บรักษาข้อมูลฉบับนี้ (<strong>"สัญญา"</strong>) ทำขึ้นที่ บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด (สำนักงานใหญ่) เมื่อวันที่ (<strong>"วันที่มีผลใช้บังคับ"</strong>) โดยและระหว่าง:
                                            </>
                                        ) : (
                                            <>
                                                This Non-Disclosure and Non-Circumvention Agreement (the <strong>"Agreement"</strong>) is entered into at Agile Assets Co., Ltd. (Headquarters) as of the Effective Date, by and between:
                                            </>
                                        )}
                                    </p>

                                    {/* Parties */}
                                    <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 sm:p-5 space-y-3">
                                        <div className="flex items-start gap-2">
                                            <span className="font-bold text-sky-500 flex-shrink-0">1.</span>
                                            <div>
                                                {lang === 'th' ? (
                                                    <span>
                                                        <strong>บริษัท อาร์จิสท์ แอสเซ็ทส์ จำกัด</strong> (โดยนายพรรษา เริงศึกษา และ นายกอบพงศ์ อดิเรก กรรมการผู้มีอำนาจกระทำการแทนบริษัท) มีสำนักงานใหญ่ตั้งอยู่เลขที่ 20 หมู่ 1 ถนนสุขุมวิท ตำบลบางเมืองใหม่ อำเภอเมืองสมุทรปราการ จังหวัดสมุทรปราการ ทะเบียนนิติบุคคลเลขที่ 0115558012195 ซึ่งต่อไปนี้จะเรียกว่า (<strong>"ผู้ให้ข้อมูล"</strong>) ฝ่ายหนึ่ง กับ
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <strong>Agile Assets Co., Ltd.</strong> (represented by authorized directors Mr. Pansa Reongsuksa and Mr. Kobpong Adirek), having its principal office at 20 Moo 1, Sukhumvit Road, Bang Mueang Mai Subdistrict, Mueang Samut Prakan District, Samut Prakan Province, Corporate Registration No. 0115558012195 (hereinafter referred to as the <strong>"Disclosing Party"</strong>), of the one part; and
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 pt-2 border-t border-sky-500/15">
                                            <span className="font-bold text-sky-500 flex-shrink-0">2.</span>
                                            <div>
                                                {lang === 'th' ? (
                                                    <span>
                                                        <strong>ข้าพเจ้า</strong> ซึ่งต่อไปนี้จะเรียกว่า (<strong>"ผู้รับข้อมูล"</strong>) อีกฝ่ายหนึ่ง
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <strong>The Undersigned / Applicant</strong> (hereinafter referred to as the <strong>"Receiving Party"</strong>), of the other part.
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Introduction */}
                                    <p className="indent-8">
                                        {lang === 'th' ? (
                                            <>
                                                ตามที่ทั้งสองฝ่ายได้ทำสัญญาการรักษาความลับไว้ต่อกัน โดยที่ผู้ให้ข้อมูลเป็นเจ้าของข้อมูลตามสัญญาดังกล่าว มีความประสงค์ที่จะเปิดเผยข้อมูลให้แก่ผู้รับข้อมูล เพื่อใช้ในการดำเนินธุรกิจทั้งด้านทางการค้าและด้านกฎหมาย ซึ่งข้อมูลที่ผู้ให้ข้อมูลจะเปิดเผยให้แก่ผู้รับข้อมูล เป็นข้อมูลที่เป็นความลับของผู้ให้ข้อมูล ผู้ให้ข้อมูลจึงทำสัญญาฉบับนี้ขึ้น โดยมีข้อกำหนดและเงื่อนไขดังต่อไปนี้
                                            </>
                                        ) : (
                                            <>
                                                WHEREAS, the Disclosing Party possesses certain proprietary and confidential information and wishes to disclose such information to the Receiving Party for lawful business and commercial purposes; and WHEREAS, the parties desire to establish confidentiality safeguards and non-circumvention protection; NOW, THEREFORE, the parties agree as follows:
                                            </>
                                        )}
                                    </p>

                                    {/* Clause 1 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">1</span>
                                            {lang === 'th' ? 'คำนิยาม "ข้อมูลความลับ"' : 'Definition of "Confidential Information"'}
                                        </h3>
                                        <p className="pl-8">
                                            {lang === 'th' ? (
                                                <>
                                                    ในสัญญาฉบับนี้ คำว่า <strong>"ข้อมูลความลับ"</strong> หมายความรวมถึง สิ่งที่สื่อความหมายให้รู้ข้อความ เรื่องราว ข้อมูลเดิมเกี่ยวกับธุรกิจ กระบวนการดำเนินธุรกิจ แผน วิธีการและหลักปฏิบัติทางธุรกิจ หรือสิ่งอื่นใดอันเกี่ยวเนื่องกับธุรกิจของผู้ให้ข้อมูลและรายละเอียดทั้งปวงที่เป็นข้อมูลของผู้ให้ข้อมูล ไม่ว่าจะอยู่ในรูปแบบที่จับต้องได้หรือไม่ หรือสื่อแบบใด รวมทั้งข้อมูลของลูกค้า ตลอดจนข้อมูลอื่นใดที่อาจก่อให้เกิดความเสียหายกับผู้ให้ข้อมูล ไม่ว่าผู้ให้ข้อมูลจะแจ้งให้ทราบว่าเป็นความลับหรือไม่ก็ตาม
                                                </>
                                            ) : (
                                                <>
                                                    In this Agreement, <strong>"Confidential Information"</strong> encompasses all proprietary business data, trade secrets, processes, business plans, technical specifications, customer lists, pricing, financing structures, and any tangible or intangible materials relating to the Disclosing Party, whether or not expressly marked as confidential.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Clause 2 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">2</span>
                                            {lang === 'th' ? 'การเก็บรักษาและการใช้มาตรการความปลอดภัย' : 'Duty of Confidentiality and Protection'}
                                        </h3>
                                        <p className="pl-8">
                                            {lang === 'th' ? (
                                                <>
                                                    ข้อมูลใดๆ ที่ผู้ให้ข้อมูลได้เปิดเผยให้แก่ผู้รับข้อมูล หรือตัวแทนของผู้รับข้อมูล ผู้รับข้อมูลจะต้องเก็บรักษาและระมัดระวังเอกสารข้อมูลที่เป็นความลับไว้อย่างเคร่งครัด ไม่เปิดเผย ไม่ทำสำเนา หรือทำการอื่นใดในทำนองเดียวกัน ผู้รับข้อมูลต้องใช้มาตรการที่เหมาะสมในการเก็บรักษาข้อมูลที่เป็นความลับ เพื่อป้องกันมิให้ข้อมูลที่เป็นความลับถูกนำไปใช้หรือเผยแพร่บุคคลภายนอก
                                                </>
                                            ) : (
                                                <>
                                                    The Receiving Party shall exercise the utmost care to maintain the strict confidentiality of all disclosed materials, taking reasonable and necessary security measures to prevent unauthorized disclosure, duplication, or dissemination to third parties.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Clause 3 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">3</span>
                                            {lang === 'th' ? 'ข้อจำกัดการใช้ข้อมูลและการห้ามติดต่อลูกค้า' : 'Non-Disclosure and Use Restrictions'}
                                        </h3>
                                        <p className="pl-8">
                                            {lang === 'th' ? (
                                                <>
                                                    ผู้รับข้อมูล ลูกจ้าง หรือตัวแทนของผู้รับข้อมูลที่ได้รับทราบข้อมูลของผู้ให้ข้อมูลต้องตระหนักถึงความเป็นความลับของข้อมูล และจะไม่นำข้อมูลของผู้ให้ข้อมูลไม่ว่าทั้งหมดหรือแต่บางส่วนไปใช้ในการอื่นใด หรือนำไปเปิดเผยต่อบุคคลภายนอก และไม่นำข้อมูลของผู้ให้ข้อมูลไปติดต่อลูกค้าของผู้ให้ข้อมูล หรือนำข้อมูลไปติดต่อบุคคลที่สาม หรือทำการอื่นใดในทำนองเดียวกัน รวมทั้งซื้อขายข้อมูล แลกเปลี่ยนข้อมูล หรือหาประโยชน์จากข้อมูลโดยทางตรงและทางอ้อม เว้นแต่จะได้รับอนุญาตเป็นหนังสือจากผู้ให้ข้อมูล
                                                </>
                                            ) : (
                                                <>
                                                    The Receiving Party, its employees, and representatives shall not use the Confidential Information for any purpose other than authorized business evaluations, and shall not contact the Disclosing Party's clients, trade partners, or third parties using such information without prior written consent.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Clause 4 - Non-Circumvention (Highlighted Callout) */}
                                    <div className="pt-3">
                                        <div className="bg-sky-500/10 dark:bg-sky-950/40 border-2 border-sky-500/30 rounded-2xl p-5 sm:p-7 space-y-4">
                                            <div className="flex items-center gap-2.5 pb-2 border-b border-sky-500/20">
                                                <ShieldCheck className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                                <h3 className="font-extrabold text-foreground text-sm sm:text-base tracking-tight">
                                                    {lang === 'th'
                                                        ? '4. การไม่ก้าวข้ามหรือหลีกเลี่ยงผู้ให้ข้อมูล (Non-Circumvention)'
                                                        : '4. Non-Circumvention Covenants'}
                                                </h3>
                                            </div>

                                            <div className="space-y-3 pl-2 sm:pl-4">
                                                <p>
                                                    <strong className="text-sky-500">4.1</strong>{' '}
                                                    {lang === 'th' ? (
                                                        <>
                                                            ผู้รับข้อมูล ลูกจ้าง หรือตัวแทนของผู้รับข้อมูล จะไม่ติดต่อ ดำเนินธุรกรรม ทำสัญญา หรือดำเนินการใดๆ ไม่ว่าโดยทางตรงหรือทางอ้อม กับลูกค้า คู่ค้า พันธมิตร หรือบุคคลที่สาม (ต่อไปนี้เรียกว่า <strong>"บุคคลที่เกี่ยวข้อง"</strong>) ซึ่งผู้รับข้อมูลได้ทราบ ได้รับการแนะนำ หรือได้การติดต่อมาจากผู้ให้ข้อมูล หรือได้ข้อมูลมาจากผู้ให้ข้อมูลอันเนื่องมาจากข้อมูลความลับหรือการติดต่อกับผู้ให้ข้อมูลตามสัญญานี้ โดยมีวัตถุประสงค์เพื่อหลีกเลี่ยง ตัดผู้ให้ข้อมูลออกจากธุรกรรม ลดทอนผลประโยชน์ที่พึงได้ของผู้ให้ข้อมูล หรือเพื่อประโยชน์ของผู้รับข้อมูลเองหรือบุคคลที่สาม เว้นแต่จะได้รับความยินยอมเป็นหนังสือล่วงหน้าจากผู้ให้ข้อมูล
                                                        </>
                                                    ) : (
                                                        <>
                                                            The Receiving Party shall not directly or indirectly circumvent, avoid, or bypass the Disclosing Party with respect to any clients, suppliers, or business opportunities introduced by the Disclosing Party.
                                                        </>
                                                    )}
                                                </p>

                                                <p>
                                                    <strong className="text-sky-500">4.2</strong>{' '}
                                                    {lang === 'th' ? (
                                                        <>
                                                            ผู้รับข้อมูลตกลงที่จะไม่ชักชวน ชักจูง หรือกระทำการใดอันมีลักษณะเป็นการจูงใจให้บุคคลที่เกี่ยวข้อง ยุติ ละทิ้ง หรือเปลี่ยนแปลงความสัมพันธ์ทางธุรกิจที่มีอยู่กับผู้ให้ข้อมูล
                                                        </>
                                                    ) : (
                                                        <>
                                                            The Receiving Party agrees not to solicit, induce, or influence any related parties to terminate or modify their business relationships with the Disclosing Party.
                                                        </>
                                                    )}
                                                </p>

                                                <div className="p-3 bg-card/80 rounded-xl border border-sky-500/30 text-sky-500 font-semibold">
                                                    <p>
                                                        <strong className="text-foreground">4.3</strong>{' '}
                                                        {lang === 'th' ? (
                                                            <>
                                                                หน้าที่ตามข้อ 4 นี้มีผลผูกพันเป็นระยะเวลา <strong>2 (สอง) ปี</strong> นับแต่วันที่ทำสัญญา หรือนับแต่วันที่ผู้ให้ข้อมูลเปิดเผยข้อมูลความลับให้แก่ผู้รับข้อมูลเป็นครั้งสุดท้าย แล้วแต่วันใดจะถึงภายหลัง และให้คงมีผลบังคับต่อไปแม้สัญญานี้จะสิ้นสุดลงด้วยเหตุใดก็ตาม
                                                            </>
                                                        ) : (
                                                            <>
                                                                The covenants in this Section 4 shall remain binding for a period of <strong>2 (two) years</strong> from the effective date or last disclosure date, and shall survive termination.
                                                            </>
                                                        )}
                                                    </p>
                                                </div>

                                                <p>
                                                    <strong className="text-sky-500">4.4</strong>{' '}
                                                    {lang === 'th' ? (
                                                        <>
                                                            ความในข้อ 4 นี้ไม่ใช้บังคับแก่กรณีที่ผู้รับข้อมูลพิสูจน์ได้ด้วยหลักฐานเป็นลายลักษณ์อักษรว่า ผู้รับข้อมูลมีความสัมพันธ์ทางธุรกิจกับบุคคลที่เกี่ยวข้องนั้นอยู่ก่อนแล้ว ก่อนที่ตนจะได้รับข้อมูลความลับจากผู้ให้ข้อมูล หรือได้รู้จักบุคคลดังกล่าวจากแหล่งอื่นโดยชอบด้วยกฎหมายและโดยมิได้ผูกพันตามหน้าที่รักษาความลับ ทั้งนี้ ภาระการพิสูจน์ตกอยู่แก่ผู้รับข้อมูล
                                                        </>
                                                    ) : (
                                                        <>
                                                            Exclusion applies only if the Receiving Party provides clear written evidence of prior documented business relations preceding this Agreement. The burden of proof rests on the Receiving Party.
                                                        </>
                                                    )}
                                                </p>

                                                <p>
                                                    <strong className="text-sky-500">4.5</strong>{' '}
                                                    {lang === 'th' ? (
                                                        <>
                                                            ในกรณีที่มีการฝ่าฝืนข้อ 4 นี้ ผู้ให้ข้อมูลมีสิทธิเรียกร้องค่าเสียหายทั้งปวงที่เกิดขึ้น รวมถึงค่าตอบแทน ค่านายหน้า หรือผลกำไรที่ผู้รับข้อมูลหรือบุคคลที่สามได้รับจากธุรกรรมที่เกิดจากการฝ่าฝืนดังกล่าว และมีสิทธิร้องขอต่อศาลให้มีคำสั่งห้ามหรือคุ้มครองชั่วคราวได้ โดยไม่เป็นการตัดสิทธิเรียกร้องอื่นใดตามสัญญานี้หรือตามกฎหมาย
                                                        </>
                                                    ) : (
                                                        <>
                                                            In case of breach, the Disclosing Party is entitled to total monetary damages, disgorgement of profits/commissions, injunctive relief, and all remedies provided under applicable law.
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clause 5 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">5</span>
                                            {lang === 'th' ? 'ผลบังคับหลังสิ้นสุดสัญญา' : 'Survival of Obligations'}
                                        </h3>
                                        <p className="pl-8">
                                            {lang === 'th' ? (
                                                <>
                                                    ในกรณีที่ผู้รับข้อมูล ลูกจ้างหรือตัวแทนของผู้รับข้อมูล ฝ่าฝืนข้อกำหนดและเงื่อนไขตามสัญญาฉบับนี้ และหรือกรณีที่สัญญาฉบับนี้สิ้นสุดลงไม่ว่าในกรณีใดๆ ผู้รับข้อมูล ลูกจ้าง และหรือตัวแทนของผู้รับข้อมูลที่ได้ทราบข้อมูลของผู้ให้ข้อมูล ยังคงมีหน้าที่ต่อไปที่จะต้องเก็บรักษาหรือปกปิดข้อมูลของผู้ให้ข้อมูลไว้เป็นความลับ และจะต้องไม่ใช้ข้อมูลของผู้ให้ข้อมูลไม่ว่าจะด้วยวัตถุประสงค์ใดๆ ก็ตาม
                                                </>
                                            ) : (
                                                <>
                                                    Upon expiration or termination of this Agreement for any reason, the confidentiality obligations shall remain in full force and effect indefinitely.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Clause 6 */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 text-xs flex items-center justify-center font-mono font-bold">6</span>
                                            {lang === 'th' ? 'การผิดสัญญาและค่าเสียหาย' : 'Breach and Liability'}
                                        </h3>
                                        <p className="pl-8">
                                            {lang === 'th' ? (
                                                <>
                                                    ในกรณีที่ผู้รับข้อมูล ลูกจ้าง และหรือตัวแทนของผู้รับข้อมูลฝ่าฝืนข้อกำหนดและเงื่อนไขของสัญญาฉบับนี้ ให้ถือว่าผู้รับข้อมูลเป็นผู้ผิดสัญญาและตกลงชดใช้ค่าเสียหายทั้งปวงที่เกิดขึ้น โดยไม่มีข้อโต้แย้งใดๆ ทั้งสิ้น ให้แก่ผู้ให้ข้อมูล
                                                </>
                                            ) : (
                                                <>
                                                    Any breach by the Receiving Party or its representatives shall constitute a default, and the Receiving Party agrees to indemnify and hold harmless the Disclosing Party from any and all damages incurred without contest.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Conclusion */}
                                    <p className="indent-8 pt-4 text-foreground/95 border-t border-border/60">
                                        {lang === 'th' ? (
                                            <>
                                                สัญญานี้จัดทำขึ้น 2 (สอง) ฉบับ มีข้อความถูกต้องตรงกัน คู่สัญญาได้อ่านและเข้าใจข้อความในสัญญาฉบับนี้โดยตลอดแล้ว จึงได้ลงลายมือชื่อพร้อมทั้งประทับตรา (ถ้ามี) ไว้เป็นสำคัญต่อหน้าพยานและต่างยึดถือไว้ฝ่ายละฉบับ
                                            </>
                                        ) : (
                                            <>
                                                This Agreement is made in duplicate with identical wording. Both parties have thoroughly read, fully understood, and agreed to all terms, and have executed this instrument on the date indicated below.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Interactive Sign-off Form Section */}
                        <div id="sign-form" className="mt-12 sm:mt-16 scroll-mt-28 print:hidden">
                            <ScrollReveal animation="fade-up">
                                <div className="bg-card border-2 border-sky-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/5">
                                    <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/80">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-500/20">
                                            <PenTool className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                                {lang === 'th' ? 'แบบฟอร์มลงนามยอมรับสัญญาอิเล็กทรอนิกส์' : 'Electronic Acknowledgment & Signature Form'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                {lang === 'th'
                                                    ? 'กรุณากรอกข้อมูลและลงนามเพื่อยืนยันความยินยอมปฏิบัติตามสัญญา NC-NDA'
                                                    : 'Please complete your information and sign to acknowledge the NC-NDA agreement'}
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {/* Full Name */}
                                            <div className="space-y-2">
                                                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{lang === 'th' ? 'ชื่อ-สกุล' : 'Full Name / Representative'}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder={lang === 'th' ? 'ระบุชื่อและนามสกุล' : 'e.g. John Doe'}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>

                                            {/* ID Card / Passport */}
                                            <div className="space-y-2">
                                                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <CreditCard className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{lang === 'th' ? 'เลขบัตรประชาชน / Passport' : 'National ID / Passport No.'}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={idCard}
                                                    onChange={handleIdCardChange}
                                                    placeholder="X XXXX XXXXX XX X"
                                                    maxLength={17}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground font-mono outline-none transition-all tracking-wider"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2 sm:col-span-2">
                                                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{lang === 'th' ? 'อีเมล' : 'Email Address'}</span>
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <input
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
                                                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                                                    <Building2 className="w-3.5 h-3.5 text-sky-500" />
                                                    <span>{lang === 'th' ? 'ชื่อบริษัท / นิติบุคคล (ถ้ามี)' : 'Company Name (Optional)'}</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    placeholder={lang === 'th' ? 'ระบุชื่อบริษัท' : 'Company Co., Ltd.'}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                                                />
                                            </div>

                                            {/* Phone (Optional) */}
                                            <div className="space-y-2">
                                                <label className="text-xs sm:text-sm font-semibold text-foreground">
                                                    <span>{lang === 'th' ? 'เบอร์โทรศัพท์ (ถ้ามี)' : 'Phone Number (Optional)'}</span>
                                                </label>
                                                <input
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
                                                    <span>{lang === 'th' ? 'ลงลายมือชื่อดิจิทัล (Digital Signature)' : 'Digital Signature'}</span>
                                                </label>
                                                {hasSignature && (
                                                    <button
                                                        type="button"
                                                        onClick={clearSignature}
                                                        className="text-xs text-muted-foreground hover:text-rose-500 flex items-center gap-1 transition-colors"
                                                    >
                                                        <RefreshCw className="w-3 h-3" />
                                                        <span>{lang === 'th' ? 'ล้างลายเซ็น' : 'Clear'}</span>
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
                                                            {lang === 'th' ? 'เซ็นชื่อที่นี่ (ใช้นิ้วหรือเมาส์)' : 'Sign here (use finger or mouse)'}
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
                                                    {lang === 'th' ? (
                                                        <>
                                                            ข้าพเจ้าได้อ่านและเข้าใจข้อความในสัญญาการรักษาความลับ (NC-NDA) ฉบับนี้โดยตลอดแล้ว และตกลงยินยอมผูกพันตามข้อกำหนดและเงื่อนไขทุกประการ
                                                        </>
                                                    ) : (
                                                        <>
                                                            I have thoroughly read and understood the terms of this NC-NDA Agreement and agree to be legally bound by all conditions.
                                                        </>
                                                    )}
                                                </span>
                                            </label>
                                        </div>

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
                                                        <span>{lang === 'th' ? 'กำลังบันทึกข้อมูล...' : 'Submitting...'}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <span>{lang === 'th' ? 'ยืนยันและส่งแบบฟอร์ม (Submit)' : 'Submit Agreement'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Security Notice */}
                                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                                            <Lock className="w-3.5 h-3.5 text-sky-500" />
                                            <span>
                                                {lang === 'th'
                                                    ? 'ข้อมูลของท่านได้รับการเข้ารหัสความปลอดภัยตามมาตรฐาน PDPA'
                                                    : 'Your information is securely encrypted in compliance with PDPA standards'}
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>
            </main>

            {/* Success Modal */}
            {isSuccessModalOpen && submissionData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in print:hidden">
                    <div className="bg-card border border-sky-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <div className="text-center space-y-1.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                                {lang === 'th' ? 'ลงนามสัญญาสำเร็จ' : 'Agreement Signed Successfully'}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {lang === 'th'
                                    ? 'ระบบได้บันทึกการยอมรับสัญญาการรักษาความลับ (NC-NDA) เรียบร้อยแล้ว'
                                    : 'Your NC-NDA acknowledgment has been recorded in the system'}
                            </p>
                        </div>

                        {/* Confirmation Card */}
                        <div className="bg-muted/40 rounded-2xl p-4 space-y-2.5 text-xs sm:text-sm border border-border/60">
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{lang === 'th' ? 'รหัสอ้างอิง' : 'Reference ID'}</span>
                                <span className="font-mono font-bold text-sky-500">{submissionData.refId}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{lang === 'th' ? 'ผู้ลงนาม' : 'Signee'}</span>
                                <span className="font-semibold text-foreground">{submissionData.fullName}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{lang === 'th' ? 'เลขบัตร' : 'ID No.'}</span>
                                <span className="font-mono text-foreground">{submissionData.idCard}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-border/40">
                                <span className="text-muted-foreground">{lang === 'th' ? 'อีเมล' : 'Email'}</span>
                                <span className="text-foreground">{submissionData.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-muted-foreground">{lang === 'th' ? 'วันเวลาที่บันทึก' : 'Timestamp'}</span>
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
                                <span>{lang === 'th' ? 'พิมพ์หลักฐาน' : 'Print Receipt'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-500/25 transition-all"
                            >
                                {lang === 'th' ? 'เสร็จสิ้น' : 'Done'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <QuickContactWidget />
            <CookieConsent />
            <Footer />
        </div>
    );
}
