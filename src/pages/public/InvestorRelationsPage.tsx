import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    TrendingUp, Award, ArrowRight, Send, Check, 
    Droplets, Wheat, Factory, Flame, Sun, ChevronRight,
    Building, FileCheck, Phone, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function InvestorRelationsPage() {
    const { lang } = useLanguage();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        interestType: 'equity',
        note: '',
    });

    // Key Performance Metrics (Counters)
    const keyStats = [
        {
            value: '40',
            unit: '+',
            labelTh: 'โรงงานที่ให้สินเชื่อ',
            labelEn: 'Client Factories Supported',
            subTh: 'กระจายตัวในหลากหลายอุตสาหกรรมทั่วประเทศ',
            subEn: 'Diversified nationwide across critical sectors',
            icon: Factory,
        },
        {
            value: '54',
            unit: '+',
            labelTh: 'สัญญาเช่าซื้อสะสม',
            labelEn: 'Hire Purchase Contracts',
            subTh: 'บริหารความเสี่ยงแบบ 100% Asset-Backed',
            subEn: '100% Asset-backed structured financing',
            icon: FileCheck,
        },
        {
            value: '399',
            unit: 'MB+',
            labelTh: 'มูลค่าสินเชื่อที่บริหารรวม',
            labelEn: 'Total Portfolio Managed',
            subTh: 'เติบโตอย่างมั่นคงต่อเนื่องทุกไตรมาส',
            subEn: 'Consistent quarterly expansion & strong cashflow',
            icon: TrendingUp,
        },
    ];

    // Investment Vehicles
    const investmentOptions = [
        {
            titleTh: 'ลงทุนในหุ้นสามัญของบริษัท',
            titleEn: 'Invest in Ordinary Equity Shares',
            badgeTh: 'อัตราการเติบโตสูง (High Growth)',
            badgeEn: 'High Growth Opportunity',
            descTh: 'ร่วมเป็นเจ้าของและเติบโตไปพร้อมกับธุรกิจสินเชื่อเครื่องจักรที่ตอบสนองความต้องการจริงของภาคการผลิตไทย',
            descEn: 'Co-own and scale alongside our expanding machinery hire-purchase portfolio fulfilling real manufacturing demand in Thailand.',
            highlightsTh: [
                'โอกาสผลตอบแทนเติบโตตามมูลค่าพอร์ตสินเชื่อ',
                'โครงสร้างธุรกิจมีกระแสเงินสดชัดเจนและต่อเนื่อง',
                'ผู้บริหารมีประสบการณ์ตรงในวงการเครื่องจักรและสถาบันการเงิน',
            ],
            highlightsEn: [
                'Capital appreciation driven by robust loan book growth',
                'Predictable recurring monthly cashflows',
                'Executive team with deep equipment & financial expertise',
            ],
        },
        {
            titleTh: 'ลงทุนในตั๋วเงินกับเรา',
            titleEn: 'Invest in Promissory Notes / Commercial Bills',
            badgeTh: 'ดอกเบี้ยสูง • ความเสี่ยงต่ำ',
            badgeEn: 'High Yield • Low Risk Backed by Hard Assets',
            descTh: 'ทางเลือกการลงทุนระยะสั้นถึงปานกลางที่ให้ผลตอบแทนแน่นอน มีสัญญาเช่าซื้อและเครื่องจักรรองรับสินทรัพย์',
            descEn: 'Short-to-medium term fixed income vehicle offering attractive yields backed by registered industrial machinery assets.',
            highlightsTh: [
                'ผลตอบแทนอัตราดอกเบี้ยคงที่ที่แข่งขันได้',
                'มีหลักประกันเครื่องจักรและสัญญาเช่าซื้อกำกับ',
                'เงื่อนไขและระยะเวลาการลงทุนยืดหยุ่นตามความต้องการ',
            ],
            highlightsEn: [
                'Competitive fixed annual percentage yield (APY)',
                'Secured against physical operational machinery and contracts',
                'Flexible tenure tailored to institutional and private investors',
            ],
        },
    ];

    // 5 Financing Service Areas
    const financingServices = [
        {
            titleTh: 'ธุรกิจผลิตน้ำดื่ม',
            titleEn: 'Drinking Water Production',
            href: '/drinking-water-production',
            icon: Droplets,
            descTh: 'ระบบ Reverse Osmosis และสายการบรรจุขวดอัตโนมัติ',
            descEn: 'RO purification and high-speed bottling machinery',
        },
        {
            titleTh: 'ฟาร์มปศุสัตว์',
            titleEn: 'Livestock Farm',
            href: '/livestock-farm',
            icon: Wheat,
            descTh: 'ระบบฟาร์มไก่ ฟาร์มหมู และระบบควบคุม Evap อัจฉริยะ',
            descEn: 'Smart feeding, climate control and farm infrastructure',
        },
        {
            titleTh: 'ธุรกิจแปรรูปอาหาร',
            titleEn: 'Food Processing',
            href: '/food-processing',
            icon: Factory,
            descTh: 'เครื่องจักรแปรรูป สายพานลำเลียง และห้องเย็นอุตสาหกรรม',
            descEn: 'Industrial processing lines, refrigeration & conveyor systems',
        },
        {
            titleTh: 'ธุรกิจผลิตพลังงานจากก๊าซชีวภาพ',
            titleEn: 'Biogas Production',
            href: '/biogas-production',
            icon: Flame,
            descTh: 'ระบบหมักก๊าซชีวภาพ เครื่องปั่นไฟก๊าซ และระบบบำบัด',
            descEn: 'Biogas digester domes, CHP gas gensets & scrubbing systems',
        },
        {
            titleTh: 'ธุรกิจผลิตพลังงานจากแสงอาทิตย์',
            titleEn: 'Solar Power Generation',
            href: '/solar-power-generation',
            icon: Sun,
            descTh: 'โซลาร์รูฟท็อปโรงงาน และระบบผลิตไฟฟ้าพลังงานสะอาด',
            descEn: 'Factory solar rooftop PV systems & grid synchronization',
        },
    ];

    // Financial Institution Partner Logos/Meetings
    const financialPartners = [
        {
            name: 'Kiatnakin Phatra Bank (KKP)',
            typeTh: 'สถาบันการเงินและวาณิชธนกิจชั้นนำ',
            typeEn: 'Leading Commercial Bank & Investment Banking',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/kiatnakin.jpg',
        },
        {
            name: 'Ngern Tid Lor (TIDLOR)',
            typeTh: 'ผู้นำสินเชื่อและนายหน้าประกันภัย',
            typeEn: 'Financial Services Leader',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/tidlor.jpg',
        },
        {
            name: '9 Basil Private Equity',
            typeTh: 'กองทุนการลงทุนในภูมิภาคเอเชียตะวันออกเฉียงใต้',
            typeEn: 'Southeast Asian Private Equity Platform',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/9basil.jpg',
        },
        {
            name: 'Asia Sermkij Leasing (ASK)',
            typeTh: 'ผู้เชี่ยวชาญด้านสินเชื่อเช่าซื้อยานพาหนะและเครื่องจักร',
            typeEn: 'Vehicle & Machinery Equipment Leasing Expert',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/ask.jpg',
        },
        {
            name: 'ORIX Corporation',
            typeTh: 'กลุ่มธุรกิจบริการทางการเงินครบวงจรระดับสากล',
            typeEn: 'Global Diversified Financial Services Group',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/orix.jpg',
        },
        {
            name: 'Kokopelli',
            typeTh: 'แพลตฟอร์มสนับสนุนทางการเงินและเทคโนโลยี SMEs',
            typeEn: 'SME Financial & Technology Enablement',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_640,h_360/https://agileassets.co.th/wp-content/uploads/2026/03/kokopelli.jpg',
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
                    ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายนักลงทุนสัมพันธ์จะติดต่อกลับโดยเร็วที่สุด' 
                    : 'Inquiry submitted successfully! Our Investor Relations team will contact you shortly.'
            );
        }, 800);
    };

    const scrollToForm = () => {
        const el = document.querySelector('#investor-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = lang === 'th'
        ? 'นักลงทุนสัมพันธ์ (Investor Relations) | Agile Assets'
        : 'Investor Relations | Agile Assets - Machinery Hire Purchase & Growth';
    const description = lang === 'th'
        ? 'ฝ่ายนักลงทุนสัมพันธ์ Agile Assets - ข้อมูลโครงสร้างการลงทุน หุ้นสามัญ ตั๋วเงิน ผลการดำเนินงานพอร์ตสินเชื่อ และโอกาสเติบโตร่วมกับเรา'
        : 'Agile Assets Investor Relations - Learn about our investment vehicles, asset-backed portfolio performance, equity participation, and commercial paper.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/investor-relations/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Consistent min-h-[96vh] Container Height) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12">
                    {/* Deep Futuristic Global Network Background */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={heroBg} 
                            alt="Agile Assets Investor Relations" 
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* High-Contrast Vignettes & Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Glowing Ambient Lightings */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/80 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-sky-400/20 text-sky-300">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                </div>
                                <span>Investor Relations • นักลงทุนสัมพันธ์</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                Agile Assets
                            </h1>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                Investor Relations
                            </p>

                            {/* CTA Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <span>{lang === 'th' ? 'ติดต่อฝ่ายนักลงทุนสัมพันธ์' : 'Contact Investor Relations'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* ─── Key Metrics Strip (Counters with Sharp High Contrast) ─── */}
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
                        <ScrollReveal animation="fade-up" delay={100}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                {keyStats.map((st, i) => (
                                    <div 
                                        key={i} 
                                        className="rounded-2xl p-6 sm:p-7 bg-card text-card-foreground border border-border shadow-2xl hover:border-sky-500/60 transition-all duration-300 hover:shadow-sky-500/10 text-center flex flex-col items-center justify-center group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                                            <st.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-baseline gap-1 mb-1">
                                            <span className="text-4xl sm:text-5xl font-black text-sky-600 dark:text-sky-400 tracking-tight font-sans">
                                                {st.value}
                                            </span>
                                            <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-sky-300">
                                                {st.unit}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                                            {lang === 'th' ? st.labelTh : st.labelEn}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {lang === 'th' ? st.subTh : st.subEn}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ร่วมเป็นส่วนหนึ่งของการเติบโตไปกับเรา (Be a Part of Our Growth) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Column: Business Model & Vision */}
                            <div className="lg:col-span-7 space-y-6">
                                <ScrollReveal animation="fade-right">
                                    <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
                                        GROWTH & INVESTMENT
                                    </p>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mt-2">
                                        {lang === 'th' ? 'ร่วมเป็นส่วนหนึ่งของการเติบโตไปกับเรา' : 'Be a Part of Our Sustainable Growth'}
                                    </h2>
                                    
                                    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pt-3">
                                        <p>
                                            {lang === 'th'
                                                ? 'บริษัท อาไจล์ แอสเซ็ทส์ จำกัด ดำเนินธุรกิจด้านสินเชื่อเช่าซื้อ (Hire Purchase) และลีสซิ่ง (Leasing) สำหรับเครื่องจักรอุตสาหกรรมและอุปกรณ์เพื่อธุรกิจ โดยมุ่งเน้นการสนับสนุนผู้ประกอบการ SMEs และกิจการในต่างจังหวัดให้สามารถเข้าถึงโอกาสในการเติบโตของธุรกิจได้อย่างมั่นคง'
                                                : 'Agile Assets Co., Ltd. specializes in structured hire purchase and equipment leasing for commercial machinery, empowering dynamic SMEs and regional production plants across Thailand to access growth capital safely.'}
                                        </p>
                                        <p>
                                            {lang === 'th'
                                                ? 'บริษัทฯ ให้บริการสินเชื่อเช่าซื้อเครื่องจักร เช่น เครื่องปั่นไฟอุตสาหกรรม เครื่องเป่าขวดพลาสติก เครื่องบรรจุน้ำ เครื่องทำน้ำแข็ง เครื่องจักรและอุปกรณ์ในฟาร์มไก่ ฟาร์มหมู รวมถึงระบบพลังงานสะอาด โดยเชื่อมโยงกับเศรษฐกิจพื้นฐานของประเทศ พร้อมบริหารความเสี่ยงและสินทรัพย์อย่างรอบคอบแบบ 100% Asset-Backed'
                                                : 'We provide asset financing for industrial gensets, plastic bottle blowers, water bottling automation, food processing, smart livestock facilities, biogas and solar energy systems—all strictly backstopped by physical income-generating machinery.'}
                                        </p>
                                        <p>
                                            {lang === 'th'
                                                ? 'ด้วยแนวทางการดำเนินธุรกิจที่มีการคัดเลือกโครงการอย่างระมัดระวัง และการเติบโตควบคู่กับพันธมิตรทางธุรกิจ บริษัทฯ มุ่งหวังที่จะเป็นอีกหนึ่งทางเลือกของการลงทุนที่เชื่อมโยงกับเศรษฐกิจภาคธุรกิจจริงของประเทศไทยอย่างมั่นคง'
                                                : 'With stringent credit underwriting, high-collateral coverage, and a fast-growing nationwide footprint, Agile Assets offers institutional and private investors a secure avenue linked to real economy assets.'}
                                        </p>
                                    </div>

                                    {/* 3 Bullet List */}
                                    <div className="pt-4 space-y-2.5">
                                        <p className="text-sm font-bold text-foreground">
                                            {lang === 'th' ? 'ช่องทางการร่วมลงทุนและโอกาสความร่วมมือ:' : 'Available Investment Channels:'}
                                        </p>
                                        <div className="space-y-2">
                                            {[
                                                { th: 'ลงทุนในหุ้นสามัญของบริษัท (Equity Shares)', en: 'Invest in Ordinary Equity Shares' },
                                                { th: 'ลงทุนในตั๋วเงินกับเรา (Commercial Bills / Promissory Notes)', en: 'Invest in Secured Promissory Notes' },
                                                { th: 'เสนอพิจารณาเฉพาะกลุ่ม (Private Placement & Syndication)', en: 'Private Placement & Syndicated Financing' },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                                                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-foreground">
                                                        {lang === 'th' ? item.th : item.en}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column: 2 Investment Vehicle Cards & Direct Contact Box */}
                            <div className="lg:col-span-5 space-y-6">
                                <ScrollReveal animation="fade-left">
                                    <div className="space-y-4">
                                        {investmentOptions.map((opt, idx) => (
                                            <div 
                                                key={idx}
                                                className="rounded-3xl p-6 sm:p-7 bg-card text-card-foreground border border-sky-500/30 dark:border-sky-500/20 shadow-xl hover:scale-[1.01] transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {lang === 'th' ? opt.titleTh : opt.titleEn}
                                                    </h3>
                                                    <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 text-[10px] font-bold border border-sky-500/30 flex-shrink-0">
                                                        {lang === 'th' ? opt.badgeTh : opt.badgeEn}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                                    {lang === 'th' ? opt.descTh : opt.descEn}
                                                </p>
                                                <div className="space-y-1.5 border-t border-border pt-3">
                                                    {(lang === 'th' ? opt.highlightsTh : opt.highlightsEn).map((h, hi) => (
                                                        <div key={hi} className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                                                            <span>{h}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Contact Investor Relations Department Box */}
                                        <div className="rounded-3xl p-6 border border-sky-500/40 bg-card text-card-foreground shadow-xl">
                                            <p className="text-xs font-semibold text-sky-600 dark:text-sky-300 mb-2">
                                                {lang === 'th' 
                                                    ? 'สำหรับข้อมูลด้านการลงทุน ความร่วมมือทางธุรกิจ หรือรายละเอียดโครงสร้างการลงทุน กรุณาติดต่อฝ่ายนักลงทุนสัมพันธ์' 
                                                    : 'For investment inquiries, partnership proposals, or structural terms:'}
                                            </p>
                                            <h4 className="text-base font-extrabold text-foreground mb-3">
                                                Investor Relations Department
                                            </h4>
                                            <div className="space-y-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                                                    <a href="mailto:marketing@agileassets.co.th" className="hover:text-sky-500 text-foreground font-medium underline underline-offset-2 transition-colors">
                                                        marketing@agileassets.co.th
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                                                    <a href="tel:0625902227" className="hover:text-sky-500 text-foreground font-bold transition-colors">
                                                        062-590-2227
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 3. ขอบคุณจากใจถึงนักลงทุน & ความมุ่งมั่นของเรา ─── */}
                <section className="py-20 lg:py-24 relative bg-slate-900/10 dark:bg-slate-900/40 border-y border-border/80 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            {/* Left: Thank You & Commitment Text */}
                            <div className="lg:col-span-7 space-y-6">
                                <ScrollReveal animation="fade-right">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400 mb-2">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>Gratitude & Commitment</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
                                        {lang === 'th' ? 'ขอบคุณจากใจถึงนักลงทุนทุกท่าน' : 'Heartfelt Thanks to Our Valued Investors'}
                                    </h2>
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {lang === 'th' ? (
                                            <>
                                                <strong className="text-foreground">บริษัท Agile Assets Co., Ltd. (อาไจล์ แอสเซ็ทส์)</strong> ขอขอบพระคุณนักลงทุนทุกท่านอย่างจริงใจ ที่ได้ให้การสนับสนุนและมอบความไว้วางใจแก่บริษัทตลอดช่วงระยะเวลาการระดมทุนที่ผ่านมา การตอบรับที่ดีอย่างยิ่งสะท้อนถึงความเชื่อมั่นที่ท่านมีต่อวิสัยทัศน์และการดำเนินงานของเรา ซึ่งเป็นแรงผลักดันสำคัญในการขับเคลื่อนองค์กรให้เติบโตอย่างมั่นคง
                                            </>
                                        ) : (
                                            <>
                                                <strong className="text-foreground">Agile Assets Co., Ltd.</strong> extends our deepest gratitude to all investors and capital partners for your continued trust and support. Your partnership is the cornerstone of our disciplined expansion across Thailand's productive sectors.
                                            </>
                                        )}
                                    </p>

                                    <div className="pt-4 border-t border-border">
                                        <h3 className="text-xl font-bold text-foreground mb-4">
                                            {lang === 'th' ? 'ความมุ่งมั่น 3 ประการของเรา' : 'Our Three Core Commitments'}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {[
                                                { 
                                                    titleTh: 'การเติบโตร่วมกัน', 
                                                    titleEn: 'Shared Growth', 
                                                    descTh: 'เติบโตเคียงข้างผู้ประกอบการและพันธมิตร',
                                                    descEn: 'Scaling together with clients & partners'
                                                },
                                                { 
                                                    titleTh: 'ความมั่นคงระยะยาว', 
                                                    titleEn: 'Sustainable Value', 
                                                    descTh: 'บริหารความเสี่ยง 100% Asset-Backed',
                                                    descEn: 'Prudent 100% asset-backed risk policy'
                                                },
                                                { 
                                                    titleTh: 'ผลตอบแทนเหมาะสมสูงสุด', 
                                                    titleEn: 'Optimal Returns', 
                                                    descTh: 'สร้างมูลค่าเพิ่มสูงสุดแก่นักลงทุน',
                                                    descEn: 'Maximizing long-term investor returns'
                                                },
                                            ].map((c, idx) => (
                                                <div key={idx} className="bg-card text-card-foreground p-4 rounded-2xl border border-sky-500/20 text-center shadow-md">
                                                    <div className="w-8 h-8 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                                                        0{idx + 1}
                                                    </div>
                                                    <h4 className="text-sm font-bold text-foreground mb-1">
                                                        {lang === 'th' ? c.titleTh : c.titleEn}
                                                    </h4>
                                                    <p className="text-[11px] text-muted-foreground">
                                                        {lang === 'th' ? c.descTh : c.descEn}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right: Visual Illustration */}
                            <div className="lg:col-span-5">
                                <ScrollReveal animation="fade-left">
                                    <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl group">
                                        <img 
                                            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80" 
                                            alt="Partnership & Investment" 
                                            className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-white/15 backdrop-blur-xl">
                                            <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">
                                                Strong Financial Stewardship
                                            </p>
                                            <p className="text-xs text-white mt-1">
                                                {lang === 'th'
                                                    ? 'วินัยทางการเงินที่เคร่งครัด พร้อมการคัดกรองสัญญาคุณภาพสูง'
                                                    : 'Disciplined financial governance & high-yield asset origination.'}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 4. บริการทางการเงินของเรา (5 Industry Core Sectors) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                                    Financing Portfolios
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                                    {lang === 'th' ? 'บริการทางการเงินของเรา' : 'Our Industry Financing Verticals'}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {lang === 'th' 
                                        ? 'พอร์ตโฟลิโอสินเชื่อเช่าซื้อที่ครอบคลุม 5 อุตสาหกรรมหลักที่มีการเติบโตต่อเนื่องและเป็นรากฐานสำคัญของเศรษฐกิจไทย' 
                                        : 'A resilient, diversified hire-purchase portfolio spanning five high-demand industrial sectors nationwide.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 5 Industry Horizontal Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
                            {financingServices.map((srv, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <a 
                                        href={srv.href}
                                        className="rounded-2xl p-5 bg-card text-card-foreground border border-border hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col items-center text-center group h-full"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 transition-all">
                                            <srv.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-sky-500 transition-colors">
                                            {lang === 'th' ? srv.titleTh : srv.titleEn}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                                            {lang === 'th' ? srv.descTh : srv.descEn}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-border w-full flex items-center justify-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                            <span>{lang === 'th' ? 'ดูรายละเอียด' : 'Explore'}</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </div>
                                    </a>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 5. ยอดรวมพอร์ตสินเชื่อ (Portfolio Total) ─── */}
                <section className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500 rounded-full blur-[140px]" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[140px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center sm:text-left mb-12">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
                                    {lang === 'th' ? 'ยอดรวมพอร์ตสินเชื่อ' : 'Total Portfolio Overview'}
                                </h2>
                                <p className="text-2xl sm:text-3xl font-bold text-sky-300 tracking-wide font-sans mt-1">
                                    Portfolio Total
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 2-Column Grid: Bar Chart (Left) + Executive Growth Image (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* Left Column: Responsive Interactive Bar Chart */}
                            <div className="lg:col-span-6 flex">
                                <ScrollReveal animation="fade-right" className="w-full flex">
                                    <div className="w-full rounded-3xl p-6 sm:p-8 bg-white text-slate-900 shadow-2xl flex flex-col justify-between">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-sky-500" />
                                                <span className="text-xs font-bold text-slate-700 tracking-wide">
                                                    {lang === 'th' ? 'มูลค่าพอร์ตสินเชื่อรวม (ล้านบาท)' : 'Portfolio Total Value (Million Baht)'}
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-400">
                                                {lang === 'th' ? 'พ.ศ. 2566 - 2569' : '2023 - 2026'}
                                            </span>
                                        </div>

                                        {/* Chart Area */}
                                        <div className="relative flex-1 min-h-[320px] sm:min-h-[360px] flex flex-col justify-end pt-6">
                                            {/* Y-Axis Grid Lines & Values (0, 100, 200, 300, 400) */}
                                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2 pb-10">
                                                {[400, 300, 200, 100, 0].map((val) => (
                                                    <div key={val} className="flex items-center gap-3 w-full">
                                                        <span className="text-xs font-bold text-slate-500 w-8 text-right font-sans">
                                                            {val}
                                                        </span>
                                                        <div className="flex-1 h-[1px] bg-slate-200" />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bars Container */}
                                            <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-6 pl-12 pr-2 h-[260px] sm:h-[300px] items-end pb-8">
                                                {[
                                                    { year: '2566', yearEn: '2023', mb: 150, heightPercent: '37.5%' },
                                                    { year: '2567', yearEn: '2024', mb: 210, heightPercent: '52.5%' },
                                                    { year: '2568', yearEn: '2025', mb: 400, heightPercent: '100%' },
                                                    { year: '2569', yearEn: '2026', mb: 390, heightPercent: '97.5%' },
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                                                        {/* The Bar */}
                                                        <div 
                                                            className="w-full max-w-[72px] bg-[#4299e1] hover:bg-[#3182ce] rounded-t-md transition-all duration-700 relative flex items-center justify-center shadow-md group-hover:shadow-lg"
                                                            style={{ height: item.heightPercent }}
                                                        >
                                                            {/* Value inside the Bar */}
                                                            <span className="text-[11px] sm:text-xs font-extrabold text-white whitespace-nowrap drop-shadow-sm px-1">
                                                                {item.mb} MB
                                                            </span>
                                                        </div>

                                                        {/* X-Axis Year Label */}
                                                        <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 font-sans">
                                                            {lang === 'th' ? item.year : item.yearEn}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column: Executive Corporate Growth Image */}
                            <div className="lg:col-span-6 flex">
                                <ScrollReveal animation="fade-left" className="w-full flex">
                                    <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 relative flex flex-col justify-end bg-slate-900 group min-h-[360px]">
                                        <img 
                                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_700/https://agileassets.co.th/wp-content/uploads/2026/03/Investors-1.png"
                                            onError={(e) => {
                                                // Fallback image if network fails
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80';
                                            }}
                                            alt="Agile Assets Corporate Growth" 
                                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                                        
                                        <div className="relative z-10 p-6 sm:p-8">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-xs font-bold text-sky-300 mb-3">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                <span>Strong Momentum</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                                                {lang === 'th' ? 'การเติบโตอย่างมั่นคงและยั่งยืน' : 'Sustainable & Disciplined Loan Book Expansion'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                                {lang === 'th'
                                                    ? 'อัตราการเติบโตของพอร์ตสินเชื่อเช่าซื้อเครื่องจักรสะท้อนถึงความเชื่อมั่นของลูกค้าและพันธมิตรทางธุรกิจทั่วประเทศ ภายใต้การบริหารจัดการความเสี่ยงอย่างรอบคอบ'
                                                    : 'Our continuous portfolio expansion underscores robust SME demand for machinery equipment finance, supported by proactive credit risk management and high collateral quality.'}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 6. เข้าพบผู้บริหารสถาบันการเงิน (Financial Institutions) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400 mb-3">
                                    <Building className="w-3.5 h-3.5" />
                                    <span>INSTITUTIONAL ENGAGEMENTS</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans mb-4">
                                    {lang === 'th' ? 'เข้าพบผู้บริหารสถาบันการเงิน' : 'Meetings with Financial Institutions'}
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {lang === 'th' 
                                        ? 'ผู้บริหาร Agile Assets เข้าพบผู้บริหารสถาบันการเงินชั้นนำ เพื่อเสริมสร้างความร่วมมือในการขยายตลาดธุรกรรม เพิ่มศักยภาพการเติบโตที่แข็งแรงกว่าเดิม' 
                                        : 'Agile Assets leadership actively engages with premier banking groups, funds, and leasing institutions to scale transaction syndication and co-lending capacity.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 6 Partner Photo/Logo Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {financialPartners.map((p, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="rounded-3xl overflow-hidden bg-card text-card-foreground border border-border hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col group h-full shadow-md">
                                        <div className="relative w-full h-48 bg-slate-900/60 overflow-hidden flex items-center justify-center">
                                            <img 
                                                src={p.image} 
                                                alt={p.name} 
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                        </div>
                                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-500 transition-colors mb-1">
                                                    {p.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {lang === 'th' ? p.typeTh : p.typeEn}
                                                </p>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                                                <span>Strategic Partnership</span>
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 7. ข่าวสารความยั่งยืน Banner (Sustainability Campaign) ─── */}
                <section className="py-12 relative bg-slate-900/10 dark:bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="zoom-in">
                            <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 bg-slate-950 p-8 sm:p-12 text-center text-white shadow-2xl">
                                <div className="absolute inset-0 z-0 opacity-40">
                                    <img 
                                        src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1600&q=80" 
                                        alt="Sustainability Campaign" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/85" />
                                </div>

                                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                                        ESG & SUSTAINABILITY
                                    </p>
                                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                                        SUSTAINABILITY CAMPAIGN
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {lang === 'th' 
                                            ? 'พันธกิจความยั่งยืนของเรา ร่วมสนับสนุนพลังงานสะอาดและส่งเสริมอุตสาหกรรมไทยสู่ Net Zero' 
                                            : 'Our Unwavering Commitment — Driving clean energy adoption and fostering sustainable industrial growth.'}
                                    </p>
                                    <div className="pt-2">
                                        <a
                                            href="/sustainability"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                                        >
                                            <span>{lang === 'th' ? 'อ่านรายละเอียดเพิ่มเติม' : 'See More'}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 8. Investor Inquiries & Business Partnership Form ─── */}
                <section id="investor-form" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" 
                            alt="Investor Relations Partnership" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase font-sans mb-4">
                                    INVESTOR & PARTNERSHIP INQUIRIES
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {lang === 'th'
                                        ? 'ร่วมสร้างผลตอบแทนที่มั่นคงและเติบโตเคียงข้างภาคอุตสาหกรรมไทย กรอกแบบฟอร์มเพื่อรับเอกสารสรุปการลงทุนหรือนัดหมายสนทนากับฝ่ายบริหาร'
                                        : 'Partner with Agile Assets for robust asset-backed returns. Submit your inquiry to request investment prospectuses or schedule an executive meeting.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Inquiry Contact Form */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900/95 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-500 dark:text-sky-400 mx-auto flex items-center justify-center border border-sky-400/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {lang === 'th' ? 'ส่งข้อมูลเรียบร้อยแล้ว' : 'Inquiry Received'}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                            {lang === 'th' 
                                                ? 'ขอบคุณที่ให้ความสนใจ เจ้าหน้าที่ฝ่ายนักลงทุนสัมพันธ์จะติดต่อกลับไปยังท่านโดยเร็วที่สุด' 
                                                : 'Thank you for your interest. Our Investor Relations specialist will contact you shortly.'}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: '', phone: '', email: '', company: '', interestType: 'equity', note: '' });
                                            }}
                                            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold"
                                        >
                                            {lang === 'th' ? 'ส่งข้อความใหม่อีกครั้ง' : 'Send Another Inquiry'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {lang === 'th' ? 'ชื่อ-นามสกุล ผู้ติดต่อ *' : 'Full Name *'}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={lang === 'th' ? 'คุณสมชาย ใจดี' : 'Your Full Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {lang === 'th' ? 'เบอร์โทรศัพท์ติดต่อ *' : 'Phone Number *'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="08X-XXX-XXXX"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {lang === 'th' ? 'อีเมล' : 'Email Address'}
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                    {lang === 'th' ? 'องค์กร / บริษัท / กองทุน' : 'Organization / Fund / Company'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={lang === 'th' ? 'บริษัท หรือ กองทุนของท่าน' : 'Your Firm or Fund'}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {lang === 'th' ? 'ความสนใจในการลงทุน' : 'Primary Investment Interest'}
                                            </label>
                                            <select
                                                value={formData.interestType}
                                                onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                            >
                                                <option value="equity">{lang === 'th' ? 'หุ้นสามัญของบริษัท (Equity Shares)' : 'Ordinary Equity Participation'}</option>
                                                <option value="promissory_notes">{lang === 'th' ? 'ตั๋วเงิน / ผลตอบแทนคงที่ (Commercial Bills / Promissory Notes)' : 'Fixed Income / Promissory Notes'}</option>
                                                <option value="syndication">{lang === 'th' ? 'ร่วมปล่อยสินเชื่อ / Co-Lending Syndication' : 'Co-Lending / Credit Syndication'}</option>
                                                <option value="other">{lang === 'th' ? 'ความร่วมมือทางธุรกิจอื่นๆ' : 'Other Strategic Partnership'}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {lang === 'th' ? 'ข้อความเพิ่มเติม' : 'Additional Message / Inquiries'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={lang === 'th' ? 'ระบุข้อมูลที่ต้องการสอบถาม หรือวงเงินที่สนใจร่วมลงทุน...' : 'Specify your questions, intended ticket size, or preferred meeting schedule...'}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
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
                                                        <span>{lang === 'th' ? 'ส่งข้อมูลสอบถามการลงทุน' : 'Submit Investment Inquiry'}</span>
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
