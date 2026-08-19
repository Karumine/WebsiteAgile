import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Droplets, DollarSign, ArrowRight, Send, Download, ShieldCheck, 
    FileText, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function DrinkingWaterPage() {
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

    const machines = [
        {
            id: 1,
            titleTh: 'เครื่องเป่าขวด',
            titleEn: 'PET Bottle Blow Molding Machine',
            descTh: 'ใช้ในการขึ้นรูปขวดพลาสติกจาก Preform เพื่อให้ได้ขวดที่ได้มาตรฐาน รองรับการผลิตปริมาณสูง',
            descEn: 'High-speed automated PET bottle blow molding system from preforms for consistent, food-grade bottle production.',
            image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80',
            badge: 'ความเร็วสูง / High Speed',
        },
        {
            id: 2,
            titleTh: 'เครื่องบรรจุน้ำ',
            titleEn: 'Automatic Water Bottling Machine',
            descTh: 'ใช้ในการบรรจุน้ำลงขวดด้วยความแม่นยำ เพื่อควบคุมปริมาณ ความสะอาด และกระบวนการผลิต',
            descEn: 'Precision 3-in-1 monoblock rotary rinsing, filling, and capping system ensuring hygienic packaging.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            badge: 'ระบบ 3-in-1 อัตโนมัติ',
        },
        {
            id: '3',
            titleTh: 'เครื่องสวมฉลาก',
            titleEn: 'Automatic Sleeve Labeling Machine',
            descTh: 'ใช้ในการติดฉลากลงบนขวดหรือบรรจุภัณฑ์อัตโนมัติ เพื่อให้ตำแหน่งถูกต้อง สม่ำเสมอ และสินค้าเป็นมาตรฐาน',
            descEn: 'High-precision automated shrink sleeve labeling and positioning machine for all bottle shapes.',
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80',
            badge: 'ตำแหน่งแม่นยำ 100%',
        },
        {
            id: 4,
            titleTh: 'เครื่องซีนและอบร้อน',
            titleEn: 'Cap Sealing & Shrink Tunnel',
            descTh: 'ใช้ในการซีลฝาและหุ้มฟิล์มสินค้า เพื่อป้องกันการรั่วซึมและเพิ่มความปลอดภัยของผลิตภัณฑ์',
            descEn: 'Steam/electric heat shrink tunnel for tamper-evident cap sealing and bundle wrap packaging.',
            image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80',
            badge: 'ซีลสุญญากาศมาตรฐาน อย.',
        },
        {
            id: 5,
            titleTh: 'ชุดปั้มลม (Air Compressor)',
            titleEn: 'High-Pressure Air Compressor',
            descTh: 'ใช้จ่ายลมให้กับเครื่องจักรในสายการผลิต เพื่อรองรับการทำงานอย่างต่อเนื่องและมีประสิทธิภาพ',
            descEn: 'Industrial oil-free screw air compressor supplying continuous pneumatic power to bottling lines.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            badge: 'ลมสะอาด Oil-Free',
        },
        {
            id: 6,
            titleTh: 'เครื่องปั้มวันที่',
            titleEn: 'Inkjet / Laser Date Coding Printer',
            descTh: 'ใช้พิมพ์วันผลิตและวันหมดอายุบนสินค้า เพื่อความถูกต้องและเป็นไปตามมาตรฐาน',
            descEn: 'Continuous inkjet / laser marking for real-time batch numbers, MFG, and EXP date printing.',
            image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80',
            badge: 'พิมพ์คมชัด รวดเร็ว',
        },
        {
            id: 7,
            titleTh: 'ระบบกรองน้ำ RO',
            titleEn: 'RO Water Purification System',
            descTh: 'ใช้ในการกรองและปรับคุณภาพน้ำ เพื่อให้ได้น้ำที่สะอาด ปลอดภัย และได้มาตรฐาน',
            descEn: 'Multi-stage Reverse Osmosis & UV sterilization system guaranteeing ultra-pure drinking water.',
            image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&q=80',
            badge: 'มาตรฐานสากล GMP / อย.',
        },
        {
            id: 8,
            titleTh: 'ระบบสายพานลำเลียง',
            titleEn: 'Automated Conveyor System',
            descTh: 'ใช้ในการลำเลียงสินค้าในสายการผลิต เพิ่มความต่อเนื่อง ลดแรงงาน และเพิ่มประสิทธิภาพการผลิต',
            descEn: 'Stainless steel modular belt conveyor network connecting all manufacturing stages seamlessly.',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
            badge: 'สเตนเลส SUS304',
        },
    ];

    const clientPhotos = [
        {
            titleTh: 'ส่งมอบสายการผลิตน้ำดื่ม จ.นครปฐม',
            titleEn: 'Turnkey Bottling Line Delivery - Nakhon Pathom Plant',
            descTh: 'ติดตั้งสายการผลิตน้ำดื่มกำลังการผลิต 6,000 ขวด/ชม. พร้อมระบบ RO',
            descEn: 'Completed installation of 6,000 BPH automated bottling line with advanced RO purification.',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
        },
        {
            titleTh: 'โรงงานน้ำดื่มมาตรฐานส่งออก จ.สมุทรสาคร',
            titleEn: 'Export-Grade Water Bottling Facility - Samut Sakhon',
            descTh: 'สนับสนุนสินเชื่อเช่าซื้อเครื่องเป่าขวดและเครื่องบรรจุอัตโนมัติ',
            descEn: 'Financed high-speed PET blow molding and precision filling machinery.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        },
        {
            titleTh: 'โครงการขยายกำลังการผลิต จ.ขอนแก่น',
            titleEn: 'Capacity Expansion Project - Khon Kaen',
            descTh: 'ส่งมอบเครื่องจักรระบบบรรจุขวดน้ำดื่มและหุ้มฟิล์มแพ็คเกจจิ้ง',
            descEn: 'Delivered automated shrink sleeve and heat tunnel packaging lines for regional expansion.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        },
        {
            titleTh: 'ตรวจรับเครื่องจักรระบบ RO & สายพาน จ.ชลบุรี',
            titleEn: 'Final Acceptance of RO Line & Conveyor - Chonburi',
            descTh: 'ทีมงาน Agile Assets ร่วมตรวจรับหน้างานพร้อมผู้บริหารโรงงาน',
            descEn: 'Joint engineering inspection and final commissioning with plant executives.',
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
        ? 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม (Drinking Water Production) | Agile Assets'
        : 'Drinking Water Production Line Financing | Agile Assets';
    const description = lang === 'th'
        ? 'Agile Assets บริการสินเชื่อเช่าซื้อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม เช่าซื้อเครื่องเป่าขวด เครื่องบรรจุน้ำดื่ม เครื่องสวมฉลาก และระบบกรองน้ำ RO'
        : 'Agile Assets provides comprehensive machinery hire-purchase financing for drinking water production lines, blow molding, filling, and RO systems.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/drinking-water-production/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Full Size as Home Page: min-h-[96vh]) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Unique Drinking Water Bottling Plant Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=1920&q=85" 
                            alt="Drinking Water Production Line" 
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
                                    <Droplets className="w-3.5 h-3.5" />
                                </div>
                                <span>Financing Service • Industry Solutions</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                Drinking Water Production
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม' : 'Machinery & Turnkey Line Financing'}
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

                {/* ─── 2. Main Machinery Showcase (8 Machines Grid) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    {lang === 'th' ? 'สินเชื่อเครื่องจักรสำหรับธุรกิจผลิตน้ำดื่ม' : 'EQUIPMENT FINANCING'}
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 font-sans">
                                    {lang === 'th' ? 'ธุรกิจผลิตน้ำดื่ม' : 'Drinking Water Industry Solutions'}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {lang === 'th' 
                                        ? 'สินเชื่อสำหรับเครื่องจักรและอุปกรณ์ในการผลิตน้ำดื่ม ที่จะช่วยอำนวยความสะดวกในการประกอบธุรกิจให้เติบโตและมีผลผลิตเพิ่มขึ้นอย่างมีคุณภาพ พร้อมกับมีกำไรที่สูงขึ้นแก่ผู้ประกอบการ' 
                                        : 'Comprehensive financing solutions for drinking water manufacturing equipment, empowering your business to scale production, enhance product quality, and maximize enterprise profitability.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 8 Machinery Cards Grid (4 columns on desktop, exactly like the original site) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
                            {machines.map((m, idx) => (
                                <ScrollReveal key={m.id} animation="fade-up" delay={idx * 50}>
                                    <div className="glass-card h-full rounded-3xl p-5 sm:p-6 border border-border/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col group">
                                        {/* Machine Image */}
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
                                    <span>{lang === 'th' ? 'ขอสินเชื่อซื้อเครื่องจักร' : 'Apply for Equipment Leasing'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 3. Our Clients (ลูกค้าสินเชื่อน้ำดื่มของเรา) ─── */}
                <section className="py-20 lg:py-28 relative bg-slate-900/30 border-y border-border/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3 font-sans">
                                    Our Clients
                                </h2>
                                <p className="text-lg font-semibold text-sky-400">
                                    {lang === 'th' ? 'ลูกค้าสินเชื่อน้ำดื่มของเรา' : 'Trusted by Leading Bottling Plants Nationwide'}
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
                                onClick={(e) => { e.preventDefault(); toast.success('Drinking Water Catalogue Downloaded'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <FileText className="w-3.5 h-3.5 text-sky-400" />
                                <span>Drinking Water Catalogue (PDF)</span>
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); toast.success('Machinery Leasing Guide Downloaded'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/80 hover:border-sky-400 text-xs font-semibold text-foreground hover:text-sky-400 transition-all"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                                <span>Equipment Financing Guide</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ─── 4. Business Partnership Inquiries Form ─── */}
                <section id="inquiry-form" className="py-20 lg:py-28 relative overflow-hidden">
                    {/* Background Handshake / Corporate Image with Dark Luxury Overlay */}
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
                                        ? 'บริษัท อาไจล์ แอสเซ็ทส์ ขับเคลื่อนภายใต้วิสัยทัศน์ของผู้บริหาร เดินหน้าให้บริการเช่าซื้อเครื่องจักรแก่โรงงานทั่วประเทศ ปัจจุบันดูแลลูกค้ามากกว่า 50 โรงงาน และขยายบริการสู่หลากหลายอุตสาหกรรมเพิ่มมากขึ้น เพื่อรองรับความต้องการที่เพิ่มขึ้นอย่างต่อเนื่อง'
                                        : 'Agile Assets empowers industrial enterprises nationwide with tailored machinery leasing. Serving over 50+ manufacturing plants across diverse industrial sectors.'}
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
                                                ? 'ขอบคุณที่ให้ความสนใจ เจ้าหน้าที่ผู้เชี่ยวชาญด้านสินเชื่อเครื่องจักรผลิตน้ำดื่มจะติดต่อกลับไปยังท่านโดยเร็วที่สุด' 
                                                : 'Thank you for your inquiry. Our equipment financing specialist will reach out to you shortly.'}
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
                                                    {lang === 'th' ? 'ชื่อบริษัท / โรงงาน' : 'Company / Factory Name'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={lang === 'th' ? 'บริษัท ผลิตน้ำดื่ม จำกัด' : 'Your Company Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                {lang === 'th' ? 'ข้อความ / เครื่องจักรที่ต้องการขอสินเชื่อ' : 'Message / Desired Machinery & Financing Details'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={lang === 'th' ? 'เช่น สนใจขอสินเชื่อเครื่องเป่าขวดและเครื่องบรรจุขวดน้ำดื่ม วงเงินประมาณ 5 ล้านบาท...' : 'Tell us about your required machinery or project scale...'}
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
