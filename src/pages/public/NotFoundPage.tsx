import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Calculator, Phone, HelpCircle, Layers, FileQuestion, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';

export function NotFoundPage() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const isTh = lang === 'th';

    const popularLinks = [
        {
            titleTh: 'คำนวณสินเชื่อเช่าซื้อ',
            titleEn: 'Financing Calculator',
            descTh: 'คำนวณค่างวดและอัตราดอกเบี้ยเครื่องจักรอุตสาหกรรม',
            descEn: 'Calculate industrial machinery leasing installments',
            icon: Calculator,
            href: '/calculator',
        },
        {
            titleTh: 'บริการสินเชื่อเครื่องจักร',
            titleEn: 'Financing Services',
            descTh: 'โซลูชันทางการเงินสำหรับ 8 กลุ่มอุตสาหกรรมหลัก',
            descEn: 'Tailored equipment leasing across 8 key sectors',
            icon: Layers,
            href: '/#financing',
        },
        {
            titleTh: 'คำถามที่พบบ่อย (FAQ)',
            titleEn: 'Frequently Asked Questions',
            descTh: 'ข้อสงสัยเกี่ยวกับเงื่อนไข เอกสาร และขั้นตอนการขอสินเชื่อ',
            descEn: 'Common questions on eligibility, docs & approval process',
            icon: HelpCircle,
            href: '/faq',
        },
        {
            titleTh: 'ติดต่อสอบถามเจ้าหน้าที่',
            titleEn: 'Contact Support',
            descTh: 'ปรึกษาผู้เชี่ยวชาญด้านสินเชื่อเครื่องจักรได้โดยตรง',
            descEn: 'Speak directly with our specialized leasing consultants',
            icon: Phone,
            href: '/contact',
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{isTh ? '404 ไม่พบหน้านี้ (Page Not Found) | Agile Assets' : '404 Page Not Found | Agile Assets'}</title>
                <meta
                    name="description"
                    content={isTh ? 'ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หน้าดังกล่าวอาจถูกย้าย ลบ หรืออยู่ระหว่างพัฒนา' : 'Sorry, the page you are looking for does not exist or has been moved.'}
                />
            </Helmet>

            <Navbar />

            <main className="flex-1 relative flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-3xl w-full mx-auto text-center relative z-10 space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs sm:text-sm font-semibold shadow-inner">
                        <FileQuestion className="w-4 h-4" />
                        <span>{isTh ? '404 ERROR — ไม่พบหน้าที่ต้องการ' : '404 ERROR — PAGE NOT FOUND'}</span>
                    </div>

                    {/* Big 404 Headline */}
                    <div className="relative select-none">
                        <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 dark:from-white dark:via-slate-300 dark:to-slate-600 opacity-90">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-4xl sm:text-5xl font-extrabold text-sky-400/20 blur-sm">
                                NOT FOUND
                            </span>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="space-y-3 max-w-xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            {isTh ? 'หน้าที่คุณค้นหาไม่มีข้อมูล หรือยังไม่เปิดให้บริการ' : 'This page could not be found'}
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {isTh
                                ? 'หน้าที่คุณกำลังเข้าถึงอาจถูกย้าย เปลี่ยนชื่อ ลบออกไปแล้ว หรือเป็นหน้าส่วนที่ยังอยู่ระหว่างจัดเตรียมข้อมูล คุณสามารถกลับไปหน้าหลักหรือเลือกดูบริการอื่นๆ ได้จากเมนูด้านล่าง'
                                : 'The page you are looking for might have been moved, renamed, temporarily unavailable, or is currently under preparation. You can return home or explore our popular links below.'}
                        </p>
                    </div>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 active:scale-[0.98]"
                        >
                            <Home className="w-4 h-4" />
                            <span>{isTh ? 'กลับสู่หน้าหลัก' : 'Back to Home'}</span>
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-sm font-semibold hover:text-sky-400 transition-all duration-200 active:scale-[0.98]"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{isTh ? 'ย้อนกลับหน้าที่แล้ว' : 'Go Back'}</span>
                        </button>

                        <button
                            onClick={() => navigate('/contact')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass border border-border/80 hover:border-sky-500/40 text-foreground text-sm font-semibold hover:text-sky-400 transition-all duration-200 active:scale-[0.98]"
                        >
                            <Phone className="w-4 h-4" />
                            <span>{isTh ? 'แจ้งปัญหา / ติดต่อเรา' : 'Contact Support'}</span>
                        </button>
                    </div>

                    {/* Suggested Popular Destinations */}
                    <div className="pt-8 border-t border-border/60">
                        <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                            <span>{isTh ? 'หน้ายอดนิยมที่คุณอาจสนใจ' : 'Recommended Pages'}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                            {popularLinks.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate(item.href)}
                                    className="p-4 rounded-2xl glass border border-border/80 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-200 group flex items-start gap-3.5 shadow-sm hover:shadow-md"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-200">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-bold text-foreground group-hover:text-sky-400 transition-colors">
                                            {isTh ? item.titleTh : item.titleEn}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                            {isTh ? item.descTh : item.descEn}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
