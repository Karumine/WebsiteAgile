import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, PhoneCall } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.webp';

interface FaqItem {
    id: string;
    questionTh: string;
    questionEn: string;
    answerTh: string;
    answerEn: string;
}

export function FaqPage() {
    const { lang } = useLanguage();
    const { settings } = useSiteSettings();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const defaultFaqs: FaqItem[] = [
        {
            id: 'faq-1',
            questionTh: 'สินเชื่อเครื่องจักรคืออะไร',
            questionEn: 'What is Machinery Financing?',
            answerTh: 'ลูกค้าสามารถซื้อเครื่องจักรที่จะนำมาใช้ในธุรกิจ โดยไม่จำเป็นต้องจ่ายเป็นเงินก้อน สามารถจัดการแผนการผ่อนชำระได้ตามความต้องการ และเมื่อผ่อนชำระครบตามกำหนด เครื่องจักรจะกลายเป็นของลูกค้าทันทีโดยไม่มีเงื่อนไข',
            answerEn: 'Clients can acquire industrial machinery for business expansion without substantial upfront capital outlay. Repayments are structured according to cash flows, and full legal ownership transfers to the client automatically upon final settlement.',
        },
        {
            id: 'faq-2',
            questionTh: 'บุคคลธรรมดาขอสินเชื่อเครื่องจักรได้ไหม ?',
            questionEn: 'Can individuals apply for machinery financing?',
            answerTh: 'บริษัทมุ่งให้บริการสินเชื่อเช่าซื้อเครื่องจักรกับนิติบุคคลเป็นหลัก เพื่อสนับสนุนการลงทุนและการเติบโตทางธุรกิจ และลูกค้าสามารถนำใบเสนอราคาเครื่องจักรมายื่นประกอบการพิจารณา หรือให้เราช่วยจัดหาเครื่องจักรที่เหมาะสมจากผู้จำหน่ายได้ โดยบริษัทจะดูแลตั้งแต่การประสานงานซื้อ-ขาย ตรวจสอบรายละเอียดเบื้องต้น จนถึงขั้นตอนการอนุมัติสินเชื่อ เพื่อความสะดวกรวดเร็วของลูกค้า',
            answerEn: 'We primarily serve registered legal entities (corporations & juristic entities) to foster industrial capacity expansion. Clients can submit supplier quotation sheets directly or request our team to facilitate machine sourcing.',
        },
        {
            id: 'faq-3',
            questionTh: 'ขอสินเชื่อเป็นเงินสดได้ไหม ?',
            questionEn: 'Can financing be disbursed in cash?',
            answerTh: 'ไม่สามารถขอเป็นเงินสดได้ เนื่องจากสินเชื่อเครื่องจักรเป็นการปล่อยสินเชื่อเพื่อสนับสนุนการจัดซื้อเครื่องจักรและอุปกรณ์ที่ใช้ในการดำเนินธุรกิจโดยตรง โดยบริษัทจะเป็นผู้ชำระเงินค่าเครื่องจักรไปยังผู้จำหน่ายเครื่องจักร (Supplier) แทนลูกค้า เพื่อให้ลูกค้าได้รับเครื่องจักรไปใช้งานในธุรกิจได้ทันที',
            answerEn: 'Direct cash disbursement is not permitted. Funds are remitted directly to the vetted machinery suppliers or manufacturers on your behalf, ensuring compliant capital deployment.',
        },
        {
            id: 'faq-4',
            questionTh: 'ไม่มีเงินดาวน์ สามารถขอสินเชื่อได้หรือไม่',
            questionEn: 'Can I apply with zero down payment (0% down)?',
            answerTh: 'สามารถยื่นขอสินเชื่อได้ โดยการอนุมัติวงเงินดาวน์จะขึ้นอยู่กับการประเมินสถานะทางการเงินของกิจการ ประเภทเครื่องจักร และความเสี่ยงของโครงการ ทั้งนี้บริษัทมีทางเลือกเงินดาวน์เริ่มต้นตั้งแต่ 0% สำหรับธุรกิจที่มีประวัติการเงินและศักยภาพที่ดี',
            answerEn: 'Yes. Eligible enterprises with solid financial fundamentals, robust debt-service ratios, and high-spec collateral machinery may qualify for 0% down payment programs.',
        },
        {
            id: 'faq-5',
            questionTh: 'ธุรกิจประเภทใดที่สามารถขอสินเชื่อได้บ้าง?',
            questionEn: 'Which industries and business sectors are eligible?',
            answerTh: 'รองรับธุรกิจและโรงงานอุตสาหกรรมหลากหลายประเภท เช่น อุตสาหกรรมผลิตน้ำดื่ม, ฟาร์มปศุสัตว์, โรงงานแปรรูปอาหาร, โรงงานผลิตก๊าซชีวภาพ, ระบบพลังงานแสงอาทิตย์ (Solar Rooftop), เครื่องชิลเลอร์ (Chiller), เครื่องฉีดพลาสติก (Injection Molding), เครื่องกำเนิดไฟฟ้า (Generator Set) และเครื่องจักรอุตสาหกรรมทั่วไป',
            answerEn: 'We support widespread manufacturing industries: Drinking Water Bottling, Livestock Farming & Ventilation, Food Processing & Cold Storage, Biogas & Renewable Energy, Solar PV Rooftops, Industrial Chillers, Injection Molding, and Power Generators.',
        },
        {
            id: 'faq-6',
            questionTh: 'ติดเครดิตบูโร สามารถขอสินเชื่อได้ไหม',
            questionEn: 'Can I apply if there are past credit bureau records?',
            answerTh: 'เราพิจารณาจากภาพรวมของศักยภาพทางธุรกิจ กระแสเงินสด และแผนงานโครงการเป็นหลัก หากธุรกิจมีแนวโน้มการเติบโตและมีความสามารถในการชำระค่างวด เจ้าหน้าที่สินเชื่อจะช่วยหาแนวทางและโครงสร้างสินเชื่อที่เหมาะสมให้แก่ท่าน',
            answerEn: 'We emphasize realistic operating cash flows, future contract backlogs, and project viability over rigid historical scoring alone. Our underwriting team actively structures workable credit solutions.',
        },
        {
            id: 'faq-7',
            questionTh: 'สมัครสินเชื่อไปแล้ว แต่ยังไม่มีเจ้าหน้าที่ติดต่อกลับ ต้องทำอย่างไร ?',
            questionEn: 'What should I do if I have not received a callback after applying?',
            answerTh: 'โดยปกติเจ้าหน้าที่สินเชื่อของ Agile Assets จะติดต่อกลับภายใน 24 ชั่วโมงในวันทำการ หากท่านยังไม่ได้รับการติดต่อ สามารถติดต่อด่วนผ่านทาง LINE Official: @884ukedb หรือโทรสายด่วน 02-000-9392, 02-005-1599 ได้ตลอดเวลาทำการ',
            answerEn: 'Our credit specialists typically respond within 24 business hours. For expedited support, please connect directly via official LINE: @884ukedb or call 02-000-9392 / 02-005-1599.',
        },
        {
            id: 'faq-8',
            questionTh: 'อัตราดอกเบี้ยเท่าไร ?',
            questionEn: 'What are the interest rates?',
            answerTh: 'อัตราดอกเบี้ยเริ่มต้นที่ 8.90% ต่อปี (Flat Rate) โดยอัตราดอกเบี้ยที่แท้จริงจะขึ้นอยู่กับประเภทเครื่องจักร วงเงินสินเชื่อ ระยะเวลาการผ่อนชำระ และการประเมินความเสี่ยงของกิจการ ทั้งนี้ท่านสามารถทดลองคำนวณค่างวดเบื้องต้นได้ผ่านโปรแกรมคำนวณสินเชื่อบนหน้าเว็บไซต์',
            answerEn: 'Flat rates begin from 8.90% p.a. Specific rates depend upon machine asset class, term length, advance deposit, and overall creditworthiness. You can simulate rates via our online Financing Calculator.',
        },
    ];

    const cmsFaqs: FaqItem[] = settings.faqs?.map((item) => ({
        id: item.id,
        questionTh: item.question,
        questionEn: item.question_en || item.question,
        answerTh: item.answer,
        answerEn: item.answer_en || item.answer,
    })) || [];

    const faqs = [...cmsFaqs, ...defaultFaqs];

    const pageTitle = lang === 'th'
        ? 'คำถามที่พบบ่อย (Frequently Asked Questions - FAQ) | Agile Assets'
        : 'Frequently Asked Questions (FAQ) | Agile Assets';
    const pageDescription = lang === 'th'
        ? 'รวมคำถามที่พบบ่อยเกี่ยวกับสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม อัตราดอกเบี้ย เงื่อนไขการอนุมัติ และขั้นตอนการสมัคร'
        : 'Frequently Asked Questions about industrial equipment financing, hire purchase, eligibility, interest rates, and loan application procedures.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/faq/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets Frequently Asked Questions"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Ambient Aura Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-2 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-4">
                                Frequently Asked Questions (FAQ)
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. FAQ Accordion Section ─── */}
                <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12 sm:mb-16">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                                    Frequently Asked Questions (FAQ)
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight font-sans">
                                    {lang === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* Accordion List */}
                        <ScrollReveal animation="fade-up">
                            <div className="space-y-3 sm:space-y-4">
                                {faqs.map((faq, index) => {
                                    const isOpen = openIndex === index;
                                    return (
                                        <div
                                            key={faq.id}
                                            className={cn(
                                                "rounded-2xl border transition-all duration-200 overflow-hidden",
                                                isOpen
                                                    ? "bg-sky-50/50 dark:bg-slate-900 border-sky-300 dark:border-sky-700 shadow-md"
                                                    : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900"
                                            )}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between text-left gap-4"
                                            >
                                                <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 font-sans leading-snug">
                                                    {lang === 'th' ? faq.questionTh : faq.questionEn}
                                                </span>
                                                <div className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                                                    isOpen
                                                        ? "rotate-90 bg-sky-500 text-white shadow-sm"
                                                        : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                                )}>
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 animate-fade-in border-t border-sky-200/50 dark:border-slate-800">
                                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic bg-white dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                                                        “{lang === 'th' ? faq.answerTh : faq.answerEn}”
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Need More Assistance CTA Box */}
                            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-sky-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="space-y-1 text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-bold font-sans">
                                        {lang === 'th' ? 'มีข้อสงสัยหรือต้องการสอบถามเพิ่มเติม?' : 'Need More Information or Personalized Advice?'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-sky-200">
                                        {lang === 'th'
                                            ? 'เจ้าหน้าที่สินเชื่อผู้เชี่ยวชาญพร้อมให้คำปรึกษาและประเมินวงเงินเบื้องต้นฟรี'
                                            : 'Our financing specialists are ready to provide initial credit assessments and tailor solutions for your factory.'}
                                    </p>
                                </div>
                                <a
                                    href="https://line.me/R/ti/p/%40884ukedb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/30 flex items-center gap-2 flex-shrink-0 transition-all hover:scale-105 active:scale-95"
                                >
                                    <PhoneCall className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'ติดต่อที่ปรึกษาทาง LINE' : 'Chat via LINE Official'}</span>
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
