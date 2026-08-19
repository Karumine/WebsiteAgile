import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Cog, DollarSign, ArrowRight, Send, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function InjectionMoldingPage() {
    const { lang } = useLanguage();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        note: '',
    });

    const relatedIndustries = [
        {
            id: 1,
            titleTh: 'การผลิตน้ำดื่มและเครื่องดื่ม',
            titleEn: 'Drinking Water & Beverage Packaging',
            descTh: 'ใช้ในการขึ้นรูป Preform และบรรจุภัณฑ์พลาสติก เพื่อให้ได้ชิ้นงานที่ได้มาตรฐานและรองรับการผลิตปริมาณสูง',
            descEn: 'Used for high-speed PET preform injection and beverage closure molding, ensuring strict dimensional tolerance and mass-production yield.',
            image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80',
            badge: 'ขึ้นรูป Preform & ฝาขวดความเร็วสูง',
        },
        {
            id: 2,
            titleTh: 'การผลิตบรรจุภัณฑ์อาหาร',
            titleEn: 'Food Packaging Manufacturing',
            descTh: 'ใช้ในการผลิตภาชนะและบรรจุภัณฑ์พลาสติก เพื่อความสะอาด ปลอดภัย และความสม่ำเสมอของสินค้า',
            descEn: 'Engineered for thin-wall food containers, trays, and tamper-evident packaging, maintaining food-grade hygiene and consistency.',
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80',
            badge: 'Food-Grade Cleanroom Molding',
        },
        {
            id: 3,
            titleTh: 'การผลิตชิ้นส่วนยานยนต์',
            titleEn: 'Automotive Parts Production',
            descTh: 'ใช้ในการผลิตชิ้นส่วนพลาสติกที่มีความแม่นยำสูง เพื่อรองรับมาตรฐานอุตสาหกรรมและการใช้งานจริง',
            descEn: 'Manufactures precision automotive interior/exterior trim, connectors, and structural plastic parts compliant with OEM IATF standards.',
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&q=80',
            badge: 'มาตรฐานยานยนต์ OEM / IATF',
        },
        {
            id: 4,
            titleTh: 'การผลิตชิ้นส่วนอิเล็กทรอนิกส์',
            titleEn: 'Electronic Components Manufacturing',
            descTh: 'ใช้ในการผลิตชิ้นส่วนขนาดเล็กที่ต้องการความละเอียดสูง เพื่อให้ได้คุณภาพและความเสถียรของอุปกรณ์',
            descEn: 'Produces micro-precision connectors, housings, and semiconductor insulation components requiring ultra-tight micron tolerances.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
            badge: 'Micro Precision Micron Tolerances',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อและเบอร์โทรศัพท์' : 'Please provide your name and phone number');
            return;
        }

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            toast.success(
                lang === 'th' 
                    ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายสินเชื่อเครื่องฉีดพลาสติกจะติดต่อกลับภายใน 24 ชั่วโมง' 
                    : 'Inquiry submitted successfully! Our injection molding financing specialist will contact you within 24 hours.'
            );
        }, 800);
    };

    const scrollToForm = () => {
        const el = document.querySelector('#inquiry-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = lang === 'th' 
        ? 'สินเชื่อเช่าซื้อสำหรับเครื่องฉีดพลาสติก (Injection Molding Machine) | Agile Assets'
        : 'Plastic Injection Molding Machine Hire Purchase & Equipment Leasing | Agile Assets';
    const description = lang === 'th'
        ? 'Agile Assets บริการสินเชื่อเช่าซื้อเครื่องฉีดพลาสติก Injection Molding Machine สำหรับโรงงานผลิตบรรจุภัณฑ์ ชิ้นส่วนยานยนต์ และอิเล็กทรอนิกส์'
        : 'Agile Assets provides flexible machinery hire purchase for servo-hydraulic and all-electric plastic injection molding machines.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/injection-molding-machine/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Full Size as Home Page: min-h-[96vh]) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Unique Injection Molding & Preforms Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1920&q=85" 
                            alt="Plastic Injection Molding System" 
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/75 to-slate-950/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/75" />
                    </div>

                    {/* Glowing Ambient Lightings */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/80 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-sky-400/20 text-sky-300">
                                    <Cog className="w-3.5 h-3.5" />
                                </div>
                                <span>Financing Service • Industrial Equipment</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                Financing Service For Injection Molding Machine
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? 'เครื่องฉีดพลาสติก' : 'Injection Molding Machine Financing'}
                            </p>

                            {/* CTA Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <DollarSign className="w-5 h-5" />
                                    <span>{lang === 'th' ? 'ขอสินเชื่อกับเรา' : 'Financing with Us'}</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. Main Description & Target Industries ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    Financing Service for Injection Molding Machine
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 font-sans">
                                    {lang === 'th' ? 'เครื่องฉีดพลาสติก' : 'Plastic Injection Molding Solutions'}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {lang === 'th' 
                                        ? 'เครื่องฉีดพลาสติก (Injection Molding Machine) เป็นหัวใจสำคัญของอุตสาหกรรมการผลิตชิ้นส่วนพลาสติก ใช้ในการขึ้นรูปชิ้นงานด้วยความแม่นยำสูง รองรับการผลิตจำนวนมากอย่างมีประสิทธิภาพ พร้อมควบคุมคุณภาพและต้นทุนได้อย่างสม่ำเสมอ โดยมักแบ่งออกได้เป็น 2 หน้าที่หลัก คือ การหลอมและขึ้นรูปชิ้นงาน (Plasticizing & Molding) และ การควบคุมคุณภาพและขนาด (Pressure & Quality Control)' 
                                        : 'Plastic injection molding machines serve as the foundational cornerstone of the plastics manufacturing industry, enabling high-precision mass production with consistent dimensional quality, rapid cycle times, and optimized resin plasticizing control.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Section Subheading: อุตสาหกรรมที่เกี่ยวข้อง */}
                        <ScrollReveal animation="fade-up" delay={50}>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-8 text-center sm:text-left">
                                {lang === 'th' ? 'อุตสาหกรรมที่เกี่ยวข้อง' : 'Target Application Industries'}
                            </h3>
                        </ScrollReveal>

                        {/* 4 Related Industry Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
                            {relatedIndustries.map((m, idx) => (
                                <ScrollReveal key={m.id} animation="fade-up" delay={idx * 60}>
                                    <div className="glass-card h-full rounded-3xl p-5 sm:p-6 border border-border/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col group">
                                        {/* Image */}
                                        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-slate-900/40 flex items-center justify-center">
                                            <img
                                                src={m.image}
                                                alt={m.titleTh}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-sky-300">
                                                {m.badge}
                                            </div>
                                        </div>

                                        {/* Titles & Descriptions */}
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="text-base sm:text-lg font-extrabold text-foreground mb-1 group-hover:text-sky-400 transition-colors">
                                                {lang === 'th' ? m.titleTh : m.titleEn}
                                            </h4>
                                            <p className="text-xs font-medium text-sky-500/80 mb-3">
                                                {lang === 'th' ? m.titleEn : m.titleTh}
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                                                {lang === 'th' ? m.descTh : m.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Center CTA Button */}
                        <ScrollReveal animation="zoom-in">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] transition-all duration-200"
                                >
                                    <span>{lang === 'th' ? 'ขอสินเชื่อกับเรา' : 'Apply for Injection Molding Financing'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 3. Business Partnership Inquiries Form ─── */}
                <section id="inquiry-form" className="py-20 lg:py-28 relative overflow-hidden bg-slate-900/40 border-t border-border/60">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" 
                            alt="Business Partnership" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase font-sans mb-4">
                                    BUSINESS PARTNERSHIP INQUIRIES
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {lang === 'th'
                                        ? 'บริษัท อาไจล์ แอสเซ็ทส์ ขับเคลื่อนภายใต้วิสัยทัศน์ของผู้บริหาร เดินหน้าให้บริการเช่าซื้อเครื่องฉีดพลาสติกแก่โรงงานทั่วประเทศ ปัจจุบันดูแลลูกค้ามากกว่า 50 โรงงาน เพื่อรองรับความต้องการที่เพิ่มขึ้นอย่างต่อเนื่อง'
                                        : 'Agile Assets empowers plastics manufacturing enterprises nationwide with flexible equipment leasing and injection molding machinery finance.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Inquiry Contact Form */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center border border-sky-400/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {lang === 'th' ? 'ส่งข้อมูลเรียบร้อยแล้ว' : 'Inquiry Received'}
                                        </h3>
                                        <p className="text-xs text-slate-300 max-w-md mx-auto">
                                            {lang === 'th' 
                                                ? 'ขอบคุณที่ให้ความสนใจ เจ้าหน้าที่ผู้เชี่ยวชาญด้านสินเชื่อเครื่องฉีดพลาสติกจะติดต่อกลับไปยังท่านโดยเร็วที่สุด' 
                                                : 'Thank you for your inquiry. Our injection molding equipment financing specialist will reach out to you shortly.'}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: '', phone: '', email: '', company: '', note: '' });
                                            }}
                                            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                                        >
                                            {lang === 'th' ? 'ส่งข้อความใหม่อีกครั้ง' : 'Send Another Inquiry'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {lang === 'th' ? 'ชื่อ-นามสกุล ผู้ติดต่อ *' : 'Full Name *'}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={lang === 'th' ? 'คุณสมชาย ใจดี' : 'Your Full Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {lang === 'th' ? 'เบอร์โทรศัพท์ติดต่อ *' : 'Phone Number *'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="08X-XXX-XXXX"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {lang === 'th' ? 'อีเมล' : 'Email Address'}
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    {lang === 'th' ? 'ชื่อโรงงาน / บริษัท' : 'Company / Factory Name'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={lang === 'th' ? 'บริษัท พลาสติกอุตสาหกรรม จำกัด' : 'Your Company Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'ข้อความ / ขนาดเครื่องฉีดพลาสติกที่ต้องการขอสินเชื่อ' : 'Message / Desired Clamping Force (Tonnage) & Machine Details'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={lang === 'th' ? 'เช่น สนใจขอสินเชื่อเครื่องฉีดพลาสติกระบบ Servo Hydraulic ขนาด 350 ตัน พร้อมระบบหุ่นยนต์หยิบชิ้นงาน...' : 'Tell us about your required clamping tonnage, brand, mold specs, or financing budget...'}
                                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        <div className="pt-2 text-center">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                {submitting ? (
                                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>{lang === 'th' ? 'ส่งข้อมูลขอสินเชื่อ' : 'Submit Inquiry'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
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
