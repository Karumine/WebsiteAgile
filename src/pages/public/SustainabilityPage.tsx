import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Droplets, ArrowRight, CheckCircle2, 
    Leaf, Factory, Zap, 
    Send, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

// Project Image Carousel with Auto-Slide & Manual Controls
function ProjectImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3.5 seconds
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [images]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full md:w-72 lg:w-80 h-56 sm:h-60 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg bg-slate-900 group">
            {/* Images */}
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img
                        src={img}
                        alt={`${title} - ${idx + 1}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Slide"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:scale-110 shadow-md"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Slide"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:scale-110 shadow-md"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </>
            )}

            {/* Slide Indicators / Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? 'w-5 h-1.5 bg-sky-400'
                                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function SustainabilityPage() {
    const { lang } = useLanguage();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        projectType: 'solar_water',
        note: '',
    });

    // 4 Problems of Unclean Water
    const waterCrisisItems = [
        {
            titleTh: 'ขาดแคลนน้ำดื่มสะอาดในชนบท',
            titleEn: 'Rural Clean Water Scarcity',
            descTh: 'แหล่งน้ำธรรมชาติปนเปื้อน ไม่ปลอดภัยในการบริโภคประจำวัน',
            descEn: 'Contaminated natural water sources unsafe for daily consumption',
            image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=400&q=80',
        },
        {
            titleTh: 'สารปนเปื้อนในน้ำ',
            titleEn: 'Chemical & Heavy Metal Contaminants',
            descTh: 'สารเคมี โลหะหนัก และเชื้อโรคที่ปนเปื้อนในแหล่งน้ำธรรมชาติ',
            descEn: 'Hazardous chemicals, heavy metals and pathogens in raw groundwater',
            image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&q=80',
        },
        {
            titleTh: 'คุณภาพน้ำประปาไม่ได้มาตรฐาน',
            titleEn: 'Substandard Tap Water Quality',
            descTh: 'ค่าความเค็ม ตะกอน และความกระด้างเกินเกณฑ์มาตรฐานในหลายพื้นที่',
            descEn: 'High salinity, turbidity and hardness exceeding certified safety limits',
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&q=80',
        },
        {
            titleTh: 'ผลกระทบต่อสุขภาพ',
            titleEn: 'Direct Public Health Impact',
            descTh: 'โรคระบบทางเดินอาหารและผลกระทบระยะยาวต่อสุขภาพของเด็กและชุมชน',
            descEn: 'Gastrointestinal diseases and long-term developmental risks for families',
            image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&q=80',
        },
    ];

    // 3 Sustainability Action Projects (Each with multiple curated images)
    const sustainabilityProjects = [
        {
            titleTh: 'การติดตั้งระบบโซลาร์เซลล์พลังงานแสงอาทิตย์ (SOLAR PV)',
            titleEn: 'Solar PV Clean Energy Integration (SOLAR PV)',
            descTh: 'การสนับสนุนสินเชื่อติดตั้งระบบ Solar Rooftop ให้แก่โรงงานผลิตน้ำดื่ม ช่วยลดการใช้พลังงานจากฟอสซิลและลดค่าไฟฟ้าในกระบวนการผลิตอย่างยั่งยืน',
            descEn: 'Financing rooftop solar PV installations for drinking water bottling facilities, cutting reliance on fossil fuels and lowering production carbon intensity.',
            impactTitleTh: 'ผลลัพธ์และความยั่งยืน',
            impactTitleEn: 'Sustainability Impact',
            stats: [
                { th: '⚡ ผลิตพลังงานสะอาดกว่า 240,000 kWh ต่อปี', en: '⚡ Over 240,000 kWh/year clean electricity generated' },
                { th: '📉 ลดการปล่อยก๊าซเรือนกระจก (CO2) กว่า 120 ตันต่อปี', en: '📉 120+ Tons/year CO2 greenhouse emissions avoided' },
            ],
            images: [
                'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=700&q=80',
                'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=700&q=80',
                'https://images.unsplash.com/photo-1545209179-a5dc700fe0d6?w=700&q=80',
                'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80',
            ],
        },
        {
            titleTh: 'การใช้ขวด PET และกลุ่มบรรจุภัณฑ์ที่นำกลับมารีไซเคิลได้',
            titleEn: 'Recyclable PET & Eco-Friendly Lightweight Packaging',
            descTh: 'ส่งเสริมการใช้เครื่องจักรเป่าขวดประหยัดพลังงานและการใช้วัสดุ rPET รีไซเคิล เพื่อลดปริมาณการใช้พลาสติกบริสุทธิ์ใหม่ (Virgin Plastic)',
            descEn: 'Enabling advanced energy-efficient bottle blow molding and supporting rPET recycled resin adoption to reduce virgin plastic usage.',
            impactTitleTh: 'ผลลัพธ์และความยั่งยืน',
            impactTitleEn: 'Sustainability Impact',
            stats: [
                { th: '♻️ ลดปริมาณขยะพลาสติกสู่สิ่งแวดล้อมกว่า 50 ตันต่อปี', en: '♻️ Over 50 Tons/year plastic waste diverted from landfills' },
                { th: '🌱 ส่งเสริมเศรษฐกิจหมุนเวียน (Circular Economy)', en: '🌱 Accelerated regional circular packaging value chain' },
            ],
            images: [
                'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=700&q=80',
                'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=700&q=80',
                'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=700&q=80',
                'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=700&q=80',
            ],
        },
        {
            titleTh: 'การรีไซเคิลขวด PET และการจัดการของเสียในกระบวนการผลิต',
            titleEn: 'PET Bottle Recycling & Closed-Loop Waste Management',
            descTh: 'โครงการรับคืนขวดบรรจุภัณฑ์และเชื่อมโยงระบบ Closed-Loop Recycling ร่วมกับโรงงานรีไซเคิลมาตรฐานสากลเพื่อลดคาร์บอนฟุตพริ้นท์',
            descEn: 'Establishing bottle take-back hubs and closed-loop material recovery partnerships with certified recyclers to eliminate production waste.',
            impactTitleTh: 'ผลลัพธ์และความยั่งยืน',
            impactTitleEn: 'Sustainability Impact',
            stats: [
                { th: '🌍 ลดการปล่อยคาร์บอนฟุตพริ้นท์ในห่วงโซ่อุปทานอย่างเป็นรูปธรรม', en: '🌍 Measurable supply chain carbon footprint reduction' },
                { th: '🤝 สร้างรายได้เสริมให้แก่ชุมชนผ่านระบบคัดแยกขยะรีไซเคิล', en: '🤝 Supplemental community income through material sorting' },
            ],
            images: [
                'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=700&q=80',
                'https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?w=700&q=80',
                'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=700&q=80',
                'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&q=80',
            ],
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
                    ? 'ส่งข้อมูลสำเร็จ! เจ้าหน้าที่ฝ่ายความยั่งยืนจะติดต่อกลับโดยเร็วที่สุด' 
                    : 'Inquiry submitted successfully! Our Sustainability team will contact you shortly.'
            );
        }, 800);
    };

    const scrollToProjects = () => {
        const el = document.querySelector('#sustainability-projects');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToForm = () => {
        const el = document.querySelector('#sustainability-form');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const title = lang === 'th'
        ? 'กลยุทธ์และการพัฒนาความยั่งยืน (Sustainability Strategy) | Agile Assets'
        : 'Sustainability Strategy & ESG Development | Agile Assets';
    const description = lang === 'th'
        ? 'กลยุทธ์และการพัฒนาความยั่งยืนของ Agile Assets - สินเชื่อโรงงานน้ำดื่ม พลังงานโซลาร์เซลล์ และเศรษฐกิจหมุนเวียนเพื่อชุมชนและสิ่งแวดล้อม'
        : 'Agile Assets Sustainability Strategy - Clean water financing, solar PV integration, circular economy, and community empowerment.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/sustainability/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Consistent min-h-[96vh] Container Height) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12">
                    {/* Background: Sustainability & Global Green Innovation */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=85" 
                            alt="Agile Assets Sustainability Strategy" 
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in opacity-90"
                            loading="eager"
                        />
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/80 to-slate-950/70" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/80" />
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-teal-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-sky-400/40 bg-slate-950/80 text-xs sm:text-sm font-bold text-sky-300 mb-6 shadow-lg shadow-sky-500/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-sky-400/20 text-sky-300">
                                    <Leaf className="w-3.5 h-3.5" />
                                </div>
                                <span>ESG & Sustainability Strategy • ความยั่งยืน</span>
                            </div>

                            {/* Main Titles */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl font-sans">
                                {lang === 'th' ? 'กลยุทธ์และการพัฒนาความยั่งยืน' : 'Sustainability Strategy & ESG'}
                            </h1>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-sky-200 tracking-wide mb-8 drop-shadow-lg font-sans">
                                {lang === 'th' ? 'ความมุ่งมั่นและความตั้งใจของเรา' : 'Our Dedication to Sustainable Enterprise & Green Energy'}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={scrollToProjects}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                                >
                                    <span>{lang === 'th' ? 'ดูโครงการความยั่งยืน' : 'Explore Sustainability Projects'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.03]"
                                >
                                    <span>{lang === 'th' ? 'ร่วมงานกับเรา' : 'Partner With Us'}</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ปัญหาของการบริโภคน้ำไม่สะอาด (Clean Water Crisis) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-red-600 dark:text-red-500 tracking-tight font-sans mb-3">
                                    {lang === 'th' ? 'ปัญหาของการบริโภคน้ำไม่สะอาด' : 'The Critical Challenge of Unsafe Water'}
                                </h2>
                                <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
                                    {lang === 'th' 
                                        ? 'ทำไมการสร้างโรงงานผลิตน้ำดื่มจึงเป็นภารกิจทางการเงินที่สำคัญ' 
                                        : 'Why drinking water plant financing is an essential sustainability mission'}
                                </p>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-600 dark:text-sky-400">
                                    {lang === 'th' ? 'วิกฤตน้ำดื่มสะอาดในประเทศไทย' : 'Clean Drinking Water Landscape in Thailand'}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 4 Circular Image Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {waterCrisisItems.map((item, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                                    <div className="rounded-3xl p-6 bg-card text-card-foreground border border-border shadow-lg hover:shadow-xl hover:border-red-500/40 transition-all duration-300 flex flex-col items-center text-center group h-full">
                                        {/* Circular Image */}
                                        <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                                            <img 
                                                src={item.image} 
                                                alt={item.titleTh} 
                                                className="w-full h-full object-cover object-center"
                                                loading="lazy"
                                            />
                                        </div>
                                        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                                            {lang === 'th' ? item.titleTh : item.titleEn}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {lang === 'th' ? item.descTh : item.descEn}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 3. เราเป็นใคร (Who We Are - Agile Corporate Deep Blue) ─── */}
                <section className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans mb-2">
                                    {lang === 'th' ? 'เราเป็นใคร' : 'Who We Are'}
                                </h2>
                                <p className="text-xl sm:text-2xl font-bold text-sky-300 font-sans">
                                    {lang === 'th' ? 'บริษัท อาไจล์ แอสเซ็ทส์ จำกัด' : 'Agile Assets Co., Ltd.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Top: Image + Corporate Description */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                            <div className="lg:col-span-5">
                                <ScrollReveal animation="fade-right">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
                                        <img 
                                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                                            alt="Agile Assets Clean Water Engineering" 
                                            className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>

                            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                <ScrollReveal animation="fade-left">
                                    <p>
                                        {lang === 'th'
                                            ? 'ผู้ให้บริการสินเชื่อเช่าซื้อและลีสซิ่งเครื่องจักรอุตสาหกรรม ที่มุ่งเน้นการสนับสนุนโครงสร้างพื้นฐานด้านการผลิตน้ำดื่มสะอาดให้แก่ผู้ประกอบการไทย โดยเราเชื่อมั่นว่าการเข้าถึงน้ำดื่มที่ได้มาตรฐานคือสิทธิขั้นพื้นฐานของคุณภาพชีวิตที่ดี'
                                            : 'Agile Assets is a premier equipment financing provider committed to funding clean water infrastructure for Thai SMEs, ensuring hygienic and certified water accessibility as a vital human right.'}
                                    </p>
                                    <p>
                                        {lang === 'th'
                                            ? 'ตลอดระยะเวลาที่ผ่านมา บริษัทฯ ได้ให้สินเชื่อเครื่องจักรโรงงานน้ำดื่มไปแล้วกว่า 40+ โรงงานทั่วประเทศ ครอบคลุมกำลังการผลิตน้ำดื่มสะอาดกว่า 1,500,000 ลิตรต่อวัน ช่วยให้ประชาชนในชุมชนกว่า 150,000 คน สามารถเข้าถึงน้ำดื่มที่มีคุณภาพ ปลอดภัย และราคาเข้าถึงได้'
                                            : 'To date, we have financed bottling systems for 40+ plants nationwide, delivering over 1,500,000 liters of purified water daily and directly benefiting more than 150,000 regional residents.'}
                                    </p>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* Bottom: เราทำอะไร (What We Do) */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {lang === 'th' ? 'เราทำอะไร' : 'What We Do'}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                                        <Factory className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-2">
                                        {lang === 'th' ? 'สนับสนุนเงินทุนสินเชื่อเครื่องจักร' : 'Capital Financing for Production Machinery'}
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        {lang === 'th' ? 'จัดหาวงเงินเช่าซื้อเครื่องจักรระบบ RO และสายการบรรจุขวดอัตโนมัติ' : 'Structured hire purchase for RO purification systems & bottling automation'}
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                                        <Droplets className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-2">
                                        {lang === 'th' ? 'สร้างการเข้าถึงน้ำดื่มสะอาดในชุมชน' : 'Expanding Community Clean Water Access'}
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        {lang === 'th' ? 'ยกระดับสุขอนามัยและกระจายการผลิตน้ำดื่มสู่ทุกภูมิภาคของไทย' : 'Elevating regional hygiene standards and distributing safe water nationwide'}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={scrollToProjects}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                                >
                                    <span>{lang === 'th' ? 'ดูรายละเอียดโครงการ' : 'View Project Details'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 4. โซลูชั่นของเรา (Our Solutions - Clean Light/Glass) ─── */}
                <section className="py-20 lg:py-28 relative bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-14">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans mb-3">
                                    {lang === 'th' ? 'โซลูชั่นของเรา' : 'Our Sustainable Solutions'}
                                </h2>
                                <p className="text-base sm:text-lg font-semibold text-sky-600 dark:text-sky-400 mb-4">
                                    {lang === 'th' ? 'การนำเทคโนโลยีและสินเชื่อเพื่อความยั่งยืนมาขับเคลื่อน' : 'Leveraging Green Technology & Sustainable Capital'}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                    {lang === 'th'
                                        ? 'บริษัทฯ ให้บริการสินเชื่อเครื่องจักรผลิตน้ำดื่มระบบ Reverse Osmosis (RO) และสายการบรรจุขวดอัตโนมัติที่มีประสิทธิภาพสูง ประหยัดพลังงาน และลดการสูญเสียน้ำในกระบวนการผลิต เพื่อให้ผู้ประกอบการท้องถิ่นสามารถผลิตน้ำดื่มสะอาดตามมาตรฐาน อย. และ GMP'
                                        : 'We finance high-efficiency Reverse Osmosis (RO) bottling and treatment lines designed to minimize water waste and energy consumption, empowering local producers to achieve full FDA and GMP compliance.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 3 Solution Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                { 
                                    icon: Droplets, 
                                    titleTh: 'น้ำดื่มสะอาดได้มาตรฐาน 100%', 
                                    titleEn: '100% Certified Clean Water',
                                    color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' 
                                },
                                { 
                                    icon: Zap, 
                                    titleTh: 'เทคโนโลยีประหยัดพลังงาน', 
                                    titleEn: 'Energy-Saving Technology',
                                    color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' 
                                },
                                { 
                                    icon: Leaf, 
                                    titleTh: 'ลดผลกระทบต่อสิ่งแวดล้อม', 
                                    titleEn: 'Eco-Friendly Low Footprint',
                                    color: 'text-teal-500 bg-teal-500/10 border-teal-500/30' 
                                },
                            ].map((item, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                                    <div className="rounded-2xl p-6 bg-card text-card-foreground border border-border shadow-md text-center flex flex-col items-center justify-center h-full">
                                        <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center mb-3`}>
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xs sm:text-sm font-bold text-foreground">
                                            {lang === 'th' ? item.titleTh : item.titleEn}
                                        </h3>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── 5. โครงการด้านความยั่งยืนของเรา (Our Sustainability Projects) ─── */}
                <section id="sustainability-projects" className="py-20 lg:py-28 relative bg-[#0a2540] text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans mb-3">
                                    {lang === 'th' ? 'โครงการด้านความยั่งยืนของเรา' : 'Our Sustainability Projects'}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300">
                                    {lang === 'th' 
                                        ? 'ตัวอย่างโครงการสินเชื่อเพื่อความยั่งยืนและสิ่งแวดล้อมที่ Agile Assets ให้การสนับสนุน' 
                                        : 'Featured green financing and ESG transformation projects backed by Agile Assets.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 3 Horizontal Project Cards */}
                        <div className="space-y-6 max-w-5xl mx-auto mb-12">
                            {sustainabilityProjects.map((p, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                                    <div className="rounded-3xl p-6 sm:p-8 bg-white text-slate-900 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                                        {/* Project Images Auto Carousel */}
                                        <ProjectImageCarousel 
                                            images={p.images} 
                                            title={lang === 'th' ? p.titleTh : p.titleEn} 
                                        />

                                        {/* Project Details */}
                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-base sm:text-lg font-bold text-sky-700">
                                                {lang === 'th' ? p.titleTh : p.titleEn}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {lang === 'th' ? p.descTh : p.descEn}
                                            </p>

                                            <div className="pt-2 border-t border-slate-100">
                                                <p className="text-xs font-bold text-emerald-700 mb-1.5 flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                    <span>{lang === 'th' ? p.impactTitleTh : p.impactTitleEn}</span>
                                                </p>
                                                <div className="space-y-1">
                                                    {p.stats.map((st, si) => (
                                                        <p key={si} className="text-xs font-semibold text-slate-700">
                                                            {lang === 'th' ? st.th : st.en}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Partner With Us Button */}
                        <div className="text-center">
                            <button
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:scale-105 transition-all"
                            >
                                <span>{lang === 'th' ? 'ร่วมงานกับเรา' : 'Partner With Us'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── 6. Sustainability Partnership Inquiry Form ─── */}
                <section id="sustainability-form" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1600&q=80" 
                            alt="Sustainability Partnership Form" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase font-sans mb-3">
                                    SUSTAINABILITY PARTNERSHIP INQUIRIES
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {lang === 'th'
                                        ? 'ร่วมขับเคลื่อนโครงการความยั่งยืนและสิ่งแวดล้อมกับ Agile Assets กรอกแบบฟอร์มเพื่อปรึกษาหรือขอรับการสนับสนุนสินเชื่อเครื่องจักรสีเขียว'
                                        : 'Collaborate on ESG green projects with Agile Assets. Submit your inquiry for clean technology financing and ESG partnerships.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Form Card */}
                        <ScrollReveal animation="zoom-in" delay={100}>
                            <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900/95 backdrop-blur-2xl">
                                {submitted ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-400/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {lang === 'th' ? 'ส่งข้อมูลเรียบร้อยแล้ว' : 'Inquiry Received'}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                                            {lang === 'th' 
                                                ? 'ขอบคุณที่ให้ความสนใจ เจ้าหน้าที่ฝ่ายพัฒนาความยั่งยืนจะติดต่อกลับไปยังท่านโดยเร็วที่สุด' 
                                                : 'Thank you for your interest. Our Sustainability team will contact you shortly.'}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: '', phone: '', email: '', company: '', projectType: 'solar_water', note: '' });
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
                                                    {lang === 'th' ? 'องค์กร / บริษัท / โรงงาน' : 'Organization / Company / Factory'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder={lang === 'th' ? 'ชื่อกิจการหรือโรงงานของท่าน' : 'Your Company Name'}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {lang === 'th' ? 'ประเภทโครงการความยั่งยืนที่สนใจ' : 'Sustainability Project Category'}
                                            </label>
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                            >
                                                <option value="solar_water">{lang === 'th' ? 'สินเชื่อโรงงานน้ำดื่มสะอาด & ระบบ RO' : 'Clean Water Bottling & RO Plant Financing'}</option>
                                                <option value="solar_pv">{lang === 'th' ? 'สินเชื่อระบบโซลาร์เซลล์โรงงาน (Solar PV Rooftop)' : 'Factory Solar PV Rooftop Financing'}</option>
                                                <option value="rpet_packaging">{lang === 'th' ? 'เทคโนโลยีบรรจุภัณฑ์ประหยัดพลังงาน & rPET' : 'rPET & Energy-Efficient Packaging Lines'}</option>
                                                <option value="other_esg">{lang === 'th' ? 'โครงการด้านความยั่งยืนอื่นๆ (Other ESG Projects)' : 'Other ESG & Green Financing Projects'}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                                {lang === 'th' ? 'ข้อความเพิ่มเติม' : 'Additional Project Details'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder={lang === 'th' ? 'ระบุข้อมูลโครงการหรือกำลังการผลิตที่ต้องการปรึกษา...' : 'Describe your project scope, capacity requirement, or partnership objectives...'}
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
                                                        <span>{lang === 'th' ? 'ส่งข้อมูลปรึกษาโครงการ' : 'Submit Sustainability Inquiry'}</span>
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
