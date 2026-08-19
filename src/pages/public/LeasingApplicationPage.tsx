import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Send, CheckCircle2, ShieldCheck, FileText, CheckCircle, 
    Building2, RefreshCw, Clock 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function LeasingApplicationPage() {
    const { lang } = useLanguage();

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
        acceptConsent: true,
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const title = lang === 'en'
        ? 'Leasing Application Form | Agile Assets'
        : 'ใบสมัครสินเชื่อเช่าซื้อเครื่องจักร | Agile Assets';
    const description = lang === 'en'
        ? 'Apply for industrial machinery leasing and hire purchase financing with Agile Assets.'
        : 'สมัครขอสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม และโซลูชันเงินทุนเพื่อการเติบโตของธุรกิจกับ Agile Assets';

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
                            src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1800&q=80"
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
                                LEASING APPLICATION FORM
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sans drop-shadow-md">
                                {lang === 'th' ? 'ใบสมัครสินเชื่อเช่าซื้อเครื่องจักร' : 'Machinery Leasing Application Form'}
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Content & Two-Column Application Form */}
                <section className="py-14 sm:py-20 bg-slate-50/60 dark:bg-slate-950/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Centered Heading */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12 sm:mb-16">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
                                    {lang === 'th' ? 'ใบสมัครสินเชื่อเช่าซื้อเครื่องจักร' : 'Machinery Hire Purchase Application'}
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
                                            {lang === 'th' ? 'เช่าซื้อเครื่องจักรกับ AGILE ASSETS' : 'Machinery Leasing with AGILE ASSETS'}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {lang === 'th' ? 'บริการของเรา (Our Services)' : 'Our Financial Services'}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">
                                                    {lang === 'th' ? 'เช่าซื้อ (High Purchase) เครื่องจักรใหม่' : 'Hire Purchase (New Machinery)'}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                    {lang === 'th'
                                                        ? 'ได้เครื่องจักรเป็นของตัวเอง เมื่อครบสัญญาเป็นเจ้าของกรรมสิทธิ์ทันที'
                                                        : 'Gain full machinery ownership upon lease term completion with clear title transfer.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0">
                                                <RefreshCw className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">
                                                    {lang === 'th' ? 'High Purchase Back' : 'Sale and Leaseback'}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                    {lang === 'th'
                                                        ? 'นำสินทรัพย์ที่มีอยู่มาจำหน่ายให้บริษัท แล้วทำสัญญาเช่าซื้อกลับไปเพื่อใช้ประโยชน์ในธุรกิจต่อไป เหมาะสำหรับผู้ที่ต้องการเงินทุนหมุนเวียน'
                                                        : 'Monetize existing machinery to unlock working liquidity while continuously utilizing assets in operations.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Conditions */}
                                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border space-y-5">
                                    <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                                        {lang === 'th' ? 'เงื่อนไขการขอสินเชื่อเช่าซื้อเครื่องจักร' : 'Leasing Eligibility & Terms'}
                                    </h3>

                                    <div className="space-y-4 text-xs sm:text-sm">
                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>{lang === 'th' ? 'ลูกค้านิติบุคคลเท่านั้น' : 'Corporate Entities Only'}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {lang === 'th'
                                                    ? 'ให้บริการเฉพาะผู้ประกอบการที่จดทะเบียนในรูปแบบนิติบุคคลเท่านั้น เพื่อสร้างความเชื่อมั่นทางการเงินและการดำเนินธุรกิจอย่างเป็นระบบและตรวจสอบได้'
                                                    : 'Exclusively available to registered corporate entities to uphold institutional transparency and governance.'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>{lang === 'th' ? 'ปล่อยสินเชื่อเช่าซื้อเครื่องจักรเป็นหลัก' : 'Machinery-Centric Underwriting'}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {lang === 'th'
                                                    ? 'เราพิจารณาอนุมัติจากศักยภาพของเครื่องจักร และความเป็นไปได้ของโครงการเป็นหลัก ทำให้การขอสินเชื่อง่ายและไม่จำกัดอยู่เฉพาะหลักประกันที่เป็นอสังหาริมทรัพย์'
                                                    : 'Credit assessment prioritizes equipment productivity and project feasibility rather than stringent real estate collateral.'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{lang === 'th' ? 'ผ่อนยาว 3-5 ปี' : 'Flexible 3 - 5 Year Terms'}</span>
                                            </h4>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {lang === 'th'
                                                    ? 'ระยะเวลาการผ่อนชำระที่ยืดหยุ่นตั้งแต่ 3 - 5 ปี เพื่อให้ธุรกิจสามารถวางแผนจัดการสภาพคล่อง และมีกระแสเงินสดหมุนเวียนได้อย่างราบรื่น'
                                                    : 'Customized repayment amortizations up to 60 months, aligned with production revenue cycles.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Required Documents */}
                                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <FileText className="w-5 h-5 text-sky-500" />
                                        <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                                            {lang === 'th' ? 'เอกสารประกอบการสมัครสินเชื่อ' : 'Required Documentation'}
                                        </h3>
                                    </div>

                                    <div className="space-y-2.5 text-xs text-muted-foreground">
                                        <p className="font-semibold text-foreground">
                                            {lang === 'th' ? 'เอกสารสำหรับนิติบุคคล:' : 'Corporate Applicants:'}
                                        </p>
                                        <ul className="space-y-2 pl-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>สำเนาหนังสือรับรองบริษัท พร้อมวัตถุประสงค์ (ออกไม่เกิน 3 เดือน)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>สำเนาทะเบียนบ้านและบัตรประชาชนกรรมการผู้มีอำนาจลงนาม</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>สำเนา บอจ.5 / ภพ.20 (ถ้ามี) ย้อนหลัง 3 เดือน</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>บัญชีรายชื่อผู้ถือหุ้น และสำเนาบัตรประชาชนผู้ค้ำประกัน (ถ้ามี)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>รายการเดินบัญชีธนาคาร (Bank Statement) ย้อนหลัง 6 เดือน</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>งบการเงินย้อนหลัง 3 ปี (พร้อมรายงานผู้สอบบัญชีรับอนุญาต)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>เอกสารและใบเสนอราคา (Quotation) หรือ Proforma Invoice เครื่องจักรที่ต้องการขอสินเชื่อ</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-sky-500 font-bold">•</span>
                                                <span>แผนที่ตั้งโรงงานหรือสถานที่ติดตั้งเครื่องจักร</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Right Column: Application Form */}
                            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7">
                                <div className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-500/25 shadow-2xl bg-card">
                                    {submitted ? (
                                        <div className="py-12 text-center space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground">
                                                {lang === 'th' ? 'ส่งใบสมัครสินเชื่อเรียบร้อยแล้ว' : 'Application Received Successfully!'}
                                            </h3>
                                            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                                                {lang === 'th'
                                                    ? 'เจ้าหน้าที่ฝ่ายสินเชื่อเครื่องจักรจะติดต่อกลับไปยังหมายเลขโทรศัพท์และอีเมลของท่านภายใน 24 ชั่วโมง เพื่อแนะนำขั้นตอนถัดไป'
                                                    : 'Our machinery leasing credit specialists will contact you within 24 hours to proceed with documentation review.'}
                                            </p>
                                            <div className="pt-4">
                                                <button
                                                    onClick={() => setSubmitted(false)}
                                                    className="px-6 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-400 transition-all"
                                                >
                                                    {lang === 'th' ? 'ยื่นใบสมัครเพิ่มเติม' : 'Submit Another Application'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            {/* ผู้ขอสินเชื่อ Type Selector */}
                                            <div>
                                                <label className="block text-xs font-bold text-foreground mb-2">
                                                    {lang === 'th' ? 'ผู้ขอสินเชื่อ' : 'Applicant Category'}
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
                                                        <span>{lang === 'th' ? 'นิติบุคคล' : 'Corporate'}</span>
                                                    </label>

                                                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                                                        <input
                                                            type="radio"
                                                            name="applicantType"
                                                            checked={applicantType === 'individual'}
                                                            onChange={() => setApplicantType('individual')}
                                                            className="w-4 h-4 text-sky-500 focus:ring-sky-400"
                                                        />
                                                        <span>{lang === 'th' ? 'บุคคลธรรมดา' : 'Individual'}</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Row 1: Name | Last Name */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'ชื่อ *' : 'First Name *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.firstName}
                                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                        placeholder={lang === 'th' ? 'ชื่อ' : 'First name'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'นามสกุล *' : 'Last Name *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.lastName}
                                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                        placeholder={lang === 'th' ? 'นามสกุล' : 'Last name'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 2: Company Name */}
                                            <div>
                                                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                                    {lang === 'th' ? 'ชื่อกิจการ / ธุรกิจ / บริษัท *' : 'Company / Enterprise Name *'}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.companyName}
                                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                    placeholder={lang === 'th' ? 'ชื่อบริษัท' : 'Company name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Row 3: Business Type | Machine Interest */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'ประเภทธุรกิจของท่าน *' : 'Business Type *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.businessType}
                                                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                                        placeholder={lang === 'th' ? 'ประเภทธุรกิจ' : 'e.g. โรงงานน้ำดื่ม, เกษตรแปรรูป'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'เครื่องจักรที่สนใจ *' : 'Machinery Interested *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.machineInterest}
                                                        onChange={(e) => setFormData({ ...formData, machineInterest: e.target.value })}
                                                        placeholder={lang === 'th' ? 'เครื่องจักรที่สนใจ' : 'e.g. เครื่องเป่าขวด, Chiller, โซลาร์'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 4: Address 1 & Address 2 */}
                                            <div className="space-y-3">
                                                <label className="block text-xs font-bold text-foreground">
                                                    {lang === 'th' ? 'ที่อยู่สำนักงานการติดต่อ' : 'Contact Office Address'}
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs text-muted-foreground mb-1">
                                                            {lang === 'th' ? 'ที่อยู่ 1 *' : 'Address 1 *'}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={formData.address1}
                                                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                                                            placeholder={lang === 'th' ? 'ที่อยู่ 1' : 'Street address'}
                                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-muted-foreground mb-1">
                                                            {lang === 'th' ? 'ที่อยู่ 2' : 'Address 2'}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.address2}
                                                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                                            placeholder={lang === 'th' ? 'ที่อยู่ 2' : 'Building / Floor'}
                                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row 5: District | Province */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'อำเภอ / เขต *' : 'District *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.district}
                                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                        placeholder={lang === 'th' ? 'อำเภอ' : 'District'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'จังหวัด *' : 'Province *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.province}
                                                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                                        placeholder={lang === 'th' ? 'จังหวัด' : 'Province'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 6: Postal Code | Mobile Phone */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'รหัสไปรษณีย์ *' : 'Postal Code *'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.postalCode}
                                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                                        placeholder={lang === 'th' ? 'รหัสไปรษณีย์' : 'Postal code'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-muted-foreground mb-1">
                                                        {lang === 'th' ? 'โทรศัพท์มือถือ *' : 'Mobile Phone *'}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder={lang === 'th' ? 'หมายเลขโทรศัพท์มือถือ' : '081-234-5678'}
                                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 7: Email */}
                                            <div>
                                                <label className="block text-xs text-muted-foreground mb-1">
                                                    {lang === 'th' ? 'อีเมล *' : 'Email Address *'}
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={lang === 'th' ? 'อีเมล' : 'yourname@company.com'}
                                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Row 8: Purpose Checklist */}
                                            <div className="space-y-2 pt-1">
                                                <label className="block text-xs font-bold text-foreground">
                                                    {lang === 'th' ? 'วัตถุประสงค์การขอสินเชื่อ' : 'Financing Objective'}
                                                </label>
                                                <div className="space-y-2 text-xs">
                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeNew}
                                                            onChange={(e) => setFormData({ ...formData, purposeNew: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{lang === 'th' ? 'ลงทุนเครื่องจักรใหม่ เพื่อขยายกิจการ' : 'Invest in new machinery for business expansion'}</span>
                                                    </label>

                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeReplace}
                                                            onChange={(e) => setFormData({ ...formData, purposeReplace: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{lang === 'th' ? 'นำมาใช้ทดแทนเครื่องจักรเดิมที่มีอยู่ ซึ่งเสื่อมสภาพแล้ว' : 'Replace aged or depreciated machinery'}</span>
                                                    </label>

                                                    <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.purposeOther}
                                                            onChange={(e) => setFormData({ ...formData, purposeOther: e.target.checked })}
                                                            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                                                        />
                                                        <span>{lang === 'th' ? 'อื่นๆ (โปรดระบุรายละเอียด)' : 'Other (Please specify)'}</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Row 9: Other Details Textarea */}
                                            <div>
                                                <label className="block text-xs text-muted-foreground mb-1">
                                                    {lang === 'th' ? 'อื่นๆ ระบุรายละเอียด' : 'Additional Project Details'}
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.otherDetails}
                                                    onChange={(e) => setFormData({ ...formData, otherDetails: e.target.value })}
                                                    placeholder={lang === 'th' ? 'ระบุรายละเอียด' : 'Provide details regarding required capacity, machine brand, or project scope...'}
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
                                                        {lang === 'th'
                                                            ? 'ข้าพเจ้าได้อ่านและยอมรับข้อกำหนด เงื่อนไข และนโยบายความเป็นส่วนตัว'
                                                            : 'I have read and agree to the Terms of Service and Privacy Policy.'}
                                                    </span>
                                                </label>
                                            </div>

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
                                                            <span>{lang === 'th' ? 'กำลังส่งแบบฟอร์ม...' : 'Submitting...'}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-4 h-4" />
                                                            <span>{lang === 'th' ? 'ส่งแบบฟอร์ม' : 'Submit Application'}</span>
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
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
