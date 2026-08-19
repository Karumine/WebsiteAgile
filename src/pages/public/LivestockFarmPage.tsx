import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Wheat, DollarSign, ArrowRight, Send, Download, Building2, 
    Check, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function LivestockFarmPage() {
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

    const equipmentItems = [
        {
            id: 1,
            titleTh: 'ระบบให้อาหารอัตโนมัติ',
            titleEn: 'Automated Feeding System',
            descTh: 'ใช้จ่ายอาหารให้สัตว์ตามปริมาณและเวลาอัตโนมัติ เพื่อลดแรงงานและควบคุมการเลี้ยงได้อย่างสม่ำเสมอ',
            descEn: 'Precision automated feeding pans and distribution lines designed to optimize feed conversion ratio (FCR) and minimize manual labor.',
            image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80',
            badge: 'ระบบอัตโนมัติ Smart Feed',
        },
        {
            id: 2,
            titleTh: 'ไซโลอาหารสัตว์',
            titleEn: 'Livestock Feed Silo System',
            descTh: 'ใช้เก็บอาหารสัตว์ในปริมาณมาก เพื่อรักษาคุณภาพและรองรับการใช้งานอย่างต่อเนื่อง',
            descEn: 'Corrugated galvanized steel storage silos with moisture insulation to preserve nutritional value and ensure non-stop supply.',
            image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
            badge: 'กักเก็บมาตรฐานสากล',
        },
        {
            id: 3,
            titleTh: 'เครื่องปั่นไฟสำหรับฟาร์ม',
            titleEn: 'Farm Standby Generator Set',
            descTh: 'ใช้เป็นแหล่งจ่ายไฟฟ้าสำรองในฟาร์ม เพื่อให้ระบบสำคัญทำงานต่อเนื่องเมื่อไฟฟ้าขัดข้อง',
            descEn: 'Heavy-duty diesel standby generators with automatic transfer switches (ATS) ensuring 100% continuous power for ventilation and life support.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            badge: 'ระบบ ATS สำรองไฟฉุกเฉิน',
        },
        {
            id: 4,
            titleTh: 'พัดลมระบายอากาศ & Evap',
            titleEn: 'Ventilation Fan & Evaporative Cooling',
            descTh: 'ใช้ควบคุมการไหลเวียนของอากาศภายในโรงเรือน เพื่อรักษาอุณหภูมิที่เหมาะสมและลดความเครียดของสัตว์',
            descEn: 'High-CFM fiberglass exhaust fans and cooling pad systems maintaining optimal climate and biological comfort inside closed-loop barns.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            badge: 'ลดอุณหภูมิ ควบคุมความชื้น',
        },
    ];

    const clientPhotos = [
        {
            titleTh: 'โครงการโรงเรือนฟาร์มไก่เนื้อ จ.สระบุรี',
            titleEn: 'Closed-House Broiler Poultry Farm - Saraburi',
            descTh: 'ติดตั้งระบบระบายอากาศ Evap และระบบให้อาหารอัตโนมัติ 4 โรงเรือน',
            descEn: 'Installed advanced Evap ventilation and automated feeding systems across 4 closed-loop barns.',
            image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
        },
        {
            titleTh: 'ฟาร์มสุกรมาตรฐานพันธุ์ดี จ.ราชบุรี',
            titleEn: 'Modern Smart Swine Facility - Ratchaburi',
            descTh: 'สินเชื่อเช่าซื้อไซโลอาหารสัตว์และระบบเครื่องกำเนิดไฟฟ้าสำรอง',
            descEn: 'Provided structured leasing for galvanized feed silos and emergency backup generator systems.',
            image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
        },
        {
            titleTh: 'ฟาร์มโคนมระบบอัตโนมัติ จ.นครราชสีมา',
            titleEn: 'Automated Dairy Barn - Nakhon Ratchasima',
            descTh: 'ส่งมอบเครื่องจักรระบบลำเลียงอาหารและพัดลมระบายอากาศขนาดใหญ่',
            descEn: 'Delivered automated feed conveying lines and high-CFM industrial ventilation fans.',
            image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&q=80',
        },
        {
            titleTh: 'ตรวจรับงานติดตั้งไซโลและโรงเรือน จ.ลพบุรี',
            titleEn: 'On-Site Inspection & Acceptance - Lopburi',
            descTh: 'ทีมผู้เชี่ยวชาญ Agile Assets ร่วมตรวจรับงานระบบวิศวกรรมฟาร์ม',
            descEn: 'Agile Assets technical team conducted joint engineering inspection and project sign-off.',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
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
                    ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายสินเชื่อจะติดต่อกลับภายใน 24 ชั่วโมง' 
                    : 'Inquiry submitted successfully! Our financing specialist will contact you within 24 hours.'
            );
        }, 800);
    };

    const scrollToForm = () => {
        const el = document.querySelector('#inquiry-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = lang === 'th' 
        ? 'สินเชื่อเช่าซื้อเพื่อฟาร์มปศุสัตว์ (Livestock Farm) | Agile Assets'
        : 'Livestock Farm Equipment & Smart Barn Financing | Agile Assets';
    const description = lang === 'th'
        ? 'Agile Assets บริการสินเชื่อเช่าซื้อเครื่องจักร ฟาร์มปศุสัตว์ Livestock Farm เช่าซื้อไซโลอาหารสัตว์ ระบบให้อาหารอัตโนมัติ พัดลมระบายอากาศ เครื่องปั่นไฟ'
        : 'Agile Assets provides structured machinery leasing for modern livestock farms, automated feeding silos, ventilation fans, and backup generator sets.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/livestock-farm/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Full Size as Home Page: min-h-[96vh]) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Unique Modern Livestock Farm Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=85" 
                            alt="Livestock Farming" 
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/75 to-slate-950/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/75" />
                    </div>

                    {/* Glowing Ambient Lightings */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/80 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-sky-400/20 text-sky-300">
                                    <Wheat className="w-3.5 h-3.5" />
                                </div>
                                <span>Financing Service • Industry Solutions</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                Livestock Farming
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? 'ฟาร์มปศุสัตว์' : 'Agro-Industrial & Livestock Equipment Financing'}
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

                {/* ─── 2. Main Equipment Showcase (4 Core Farm Systems) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    {lang === 'th' ? 'สินเชื่อเช่าซื้อเพื่อฟาร์มปศุสัตว์' : 'LIVESTOCK FARMING SOLUTIONS'}
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 font-sans">
                                    {lang === 'th' ? 'ฟาร์มปศุสัตว์' : 'Livestock Farming'}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {lang === 'th' 
                                        ? 'สินเชื่อสำหรับเครื่องจักรและอุปกรณ์และระบบการจัดการแบบบูรณาการในฟาร์มปศุสัตว์ ที่ออกแบบมาเพื่อปรับปรุงการดำเนินงานในฟาร์ม เพิ่มผลผลิตและคุณภาพ และช่วยให้ผู้ประกอบการฟาร์มบรรลุผลกำไรที่สูงขึ้นและการเติบโตทางธุรกิจที่ยั่งยืน' 
                                        : 'Comprehensive machinery financing for integrated livestock farm systems, engineered to enhance operational efficiency, increase animal yield and welfare, and ensure resilient, profitable farm scalability.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 4 Farm Equipment Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
                            {equipmentItems.map((m, idx) => (
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
                                            <h3 className="text-lg font-extrabold text-foreground mb-1 group-hover:text-sky-400 transition-colors">
                                                {lang === 'th' ? m.titleTh : m.titleEn}
                                            </h3>
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
                                    <span>{lang === 'th' ? 'ขอสินเชื่อกับเรา' : 'Apply for Livestock Financing'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 3. Our Clients (ลูกค้าสินเชื่อฟาร์มปศุสัตว์ของเรา) ─── */}
                <section className="py-20 lg:py-28 relative bg-slate-900/30 border-y border-border/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    Our Clients
                                </h2>
                                <p className="text-lg font-semibold text-sky-400">
                                    {lang === 'th' ? 'ลูกค้าสินเชื่อฟาร์มปศุสัตว์ของเรา' : 'Trusted by Smart Livestock Farms Across Thailand'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Client Photo Gallery Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {clientPhotos.map((c, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="glass-card rounded-2xl overflow-hidden border border-border/80 group hover:border-sky-500/30 transition-all duration-300">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={c.image}
                                                alt={c.titleTh}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-xs font-bold text-foreground mb-1 line-clamp-1">
                                                {lang === 'th' ? c.titleTh : c.titleEn}
                                            </h4>
                                            <p className="text-[11px] text-muted-foreground line-clamp-2">
                                                {lang === 'th' ? c.descTh : c.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Download Catalogues Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); toast.success('Company Profile PDF Downloaded'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <Download className="w-3.5 h-3.5 text-sky-400" />
                                <span>Company Profile (PDF)</span>
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); toast.success('Construction Catalogue Downloaded'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <FileText className="w-3.5 h-3.5 text-sky-400" />
                                <span>Construction Catalogue (PDF)</span>
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); toast.success('Building Catalogue Downloaded'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                                <span>Building Catalogue (PDF)</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ─── 4. Business Partnership Inquiries Form ─── */}
                <section id="inquiry-form" className="py-20 lg:py-28 relative overflow-hidden">
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
                                        ? 'บริษัท อาไจล์ แอสเซ็ทส์ ขับเคลื่อนภายใต้วิสัยทัศน์ของผู้บริหาร เดินหน้าให้บริการเช่าซื้อเครื่องจักรและระบบฟาร์มปศุสัตว์ทั่วประเทศ ปัจจุบันดูแลลูกค้ามากกว่า 50 โรงงานและฟาร์มชั้นนำ เพื่อรองรับการขยายตัวอย่างยั่งยืน'
                                        : 'Agile Assets empowers livestock and agricultural enterprises nationwide with tailored equipment leasing and smart farm financing.'}
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
                                                ? 'ขอบคุณที่ให้ความสนใจ เจ้าหน้าที่ผู้เชี่ยวชาญด้านสินเชื่อฟาร์มปศุสัตว์จะติดต่อกลับไปยังท่านโดยเร็วที่สุด' 
                                                : 'Thank you for your inquiry. Our livestock equipment financing specialist will reach out to you shortly.'}
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
                                                    {lang === 'th' ? 'ชื่อฟาร์ม / บริษัท' : 'Farm / Company Name'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={lang === 'th' ? 'ฟาร์มสุกรเจริญรุ่งเรือง' : 'Your Farm / Company Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'ข้อความ / อุปกรณ์ฟาร์มที่ต้องการขอสินเชื่อ' : 'Message / Desired Farm Equipment & Details'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={lang === 'th' ? 'เช่น สนใจขอสินเชื่อไซโลอาหารสัตว์และระบบให้อาหารอัตโนมัติ สำหรับโรงเรือน 3 หลัง...' : 'Tell us about your required farm equipment or barn scale...'}
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
