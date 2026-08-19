import { useState, useEffect } from 'react';
import { 
    Droplets, Wheat, Factory, Flame, Sun, Snowflake, Cog, Zap, 
    ArrowRight, CheckCircle2, ShieldCheck, Layers, Boxes 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function EquipmentFinancingSection() {
    const { t, lang } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'industry' | 'industrial'>('all');
    const [activeTab, setActiveTab] = useState<string>('drinking-water');

    const products = [
        // ─── Category 1: Industry Solutions ───
        {
            id: 'drinking-water',
            category: 'industry' as const,
            icon: Droplets,
            categoryLabel: lang === 'th' ? 'Industry Solutions' : 'Industry Solutions',
            title: lang === 'th' ? 'Drinking Water Production (โรงงานผลิตน้ำดื่ม)' : 'Drinking Water Production Line Financing',
            subtitle: lang === 'th' 
                ? 'สินเชื่อเช่าซื้อเครื่องจักรสำหรับโรงงานผลิตน้ำดื่ม: เครื่องกรองน้ำ RO, เครื่องเป่าขวด, เครื่องบรรจุขวดอัตโนมัติ, เครื่องติดฉลาก และสายแพ็คเกจจิ้ง' 
                : 'Complete turnkey financing for reverse osmosis (RO) filtration, PET bottle blowing, automated filling lines, labeling, and robotic packaging.',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยพิเศษเริ่มต้น 4.50% ต่อปี' : 'Rates starting from 4.50% p.a.',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 84 เดือน' : 'Repayment up to 84 months',
            benefits: [
                lang === 'th' ? 'วงเงินครอบคลุมทั้งสายการผลิต (Turnkey Bottling Line) สูงสุด 100%' : 'Turnkey line financing up to 100% equipment valuation',
                lang === 'th' ? 'ใช้เครื่องจักรและอุปกรณ์ในโครงการเป็นหลักประกัน' : 'Machinery serves as core collateral with flexible terms',
                lang === 'th' ? 'รองรับกำลังการผลิตตั้งแต่ 1,000 - 12,000 ขวด/ชั่วโมง' : 'Scalable for output capacities from 1,000 to 12,000 BPH',
                lang === 'th' ? 'อนุมัติวงเงินเบื้องต้นรวดเร็วภายใน 24-48 ชั่วโมง' : 'Fast preliminary credit pre-approval within 24-48 hours',
                lang === 'th' ? 'หักค่าใช้จ่ายทางภาษีตามสิทธิประโยชน์สัญญาเช่าซื้อ' : 'Tax deductible leasing expense benefits for corporate tax',
            ],
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=900&q=80',
        },
        {
            id: 'livestock-farm',
            category: 'industry' as const,
            icon: Wheat,
            categoryLabel: lang === 'th' ? 'Industry Solutions' : 'Industry Solutions',
            title: lang === 'th' ? 'Livestock Farm (ฟาร์มปศุสัตว์)' : 'Livestock Farm & Agro-Industrial Systems',
            subtitle: lang === 'th' 
                ? 'สินเชื่อระบบโรงเรือนและเครื่องจักรอัตโนมัติ: ระบบโรงเรือน Evaporative (Evap), ไซโลเก็บอาหาร, สายพานลำเลียงอาหารอัตโนมัติ, ระบบระบายอากาศ และระบบควบคุมอุณหภูมิอัจฉริยะ' 
                : 'Specialized financing for closed Evaporative cooling houses, automated feeding silos, climate control sensors, and egg/swine handling systems.',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยส่งเสริมภาคเกษตรและปศุสัตว์' : 'Preferential Agro-industrial loan rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 84 เดือน' : 'Terms up to 84 months',
            benefits: [
                lang === 'th' ? 'รองรับฟาร์มสุกร ฟาร์มไก่เนื้อ ไก่ไข่ และฟาร์มโคนมมาตรฐานสากล' : 'Tailored for swine, poultry, broiler, layer, and dairy farm facilities',
                lang === 'th' ? 'โครงสร้างค่างวดปรับตามรอบผลผลิต (Crop/Harvest Cycle)' : 'Flexible installment schedules structured around production harvest cycles',
                lang === 'th' ? 'รองรับมาตรฐาน Smart Farm ยกระดับอัตราการรอดและผลผลิต' : 'Supports smart farm automation to improve FCR and operational yield',
                lang === 'th' ? 'วงเงินยืดหยุ่นขยายได้ตามจำนวนโรงเรือน' : 'Scalable credit lines accommodating multi-barn farm expansion',
            ],
            image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&q=80',
        },
        {
            id: 'food-processing',
            category: 'industry' as const,
            icon: Factory,
            categoryLabel: lang === 'th' ? 'Industry Solutions' : 'Industry Solutions',
            title: lang === 'th' ? 'Food Processing (อุตสาหกรรมแปรรูปอาหาร)' : 'Food Processing & Packaging Lines',
            subtitle: lang === 'th' 
                ? 'สินเชื่อเครื่องจักรแปรรูปอาหารและเครื่องดื่ม: เครื่องแช่เยือกแข็งแบบเร็ว IQF, เครื่องอบแห้งสุญญากาศ, หม้อต้มฆ่าเชื้อ Retort, เครื่องบรรจุสุญญากาศ และเครื่องตรวจจับสิ่งแปลกปลอม X-Ray' 
                : 'Advanced machinery financing for IQF spiral freezers, freeze dryers, industrial retorts, automated vacuum sealers, and foreign body X-ray inspection.',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยส่งเสริมอุตสาหกรรมอาหารส่งออก' : 'Preferential food export enterprise rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระ 24 - 84 เดือน' : 'Repayment 24 - 84 months',
            benefits: [
                lang === 'th' ? 'รองรับเครื่องจักรและอุปกรณ์สเตนเลสมาตรฐาน GMP / HACCP / อย.' : 'Fully compliant with GMP, HACCP, FDA, and sanitary standard equipment',
                lang === 'th' ? 'วงเงินสูงสุด 100% ครอบคลุมทั้งเครื่องนำเข้าและเครื่องในประเทศ' : 'Up to 100% financing for both imported and domestic machinery',
                lang === 'th' ? 'ช่วยรักษาสภาพคล่อง หมุนเวียนรับออเดอร์ส่งออกขนาดใหญ่' : 'Preserve operational cash reserves to fulfill large overseas export contracts',
                lang === 'th' ? 'วางโครงสร้างผ่อนชำระสอดรับกับรอบฤดูกาลวัตถุดิบ' : 'Seasonally adjustable repayments matched to agricultural raw material supply',
            ],
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
        },
        {
            id: 'biogas-production',
            category: 'industry' as const,
            icon: Flame,
            categoryLabel: lang === 'th' ? 'Industry Solutions' : 'Industry Solutions',
            title: lang === 'th' ? 'Biogas Production (ระบบผลิตก๊าซชีวภาพ & พลังงานทดแทน)' : 'Biogas Production & Waste-to-Energy',
            subtitle: lang === 'th' 
                ? 'สินเชื่อระบบบำบัดน้ำเสียและผลิตก๊าซชีวภาพ: บ่อหมัก Covered Lagoon, CSTR, UASB, ระบบกำจัดก๊าซ H2S และเครื่องกำเนิดไฟฟ้าจากก๊าซชีวภาพ (Biogas Generator)' 
                : 'Turnkey funding for anaerobic digesters, covered lagoons, CSTR, H2S biological scrubbing systems, and biogas combined heat and power (CHP) generators.',
            rateHighlight: lang === 'th' ? 'อัตราดอกเบี้ยสีเขียวพิเศษ (Green ESG Loan)' : 'Subsidized ESG Green Loan rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 96 เดือน (8 ปี)' : 'Extended terms up to 96 months (8 years)',
            benefits: [
                lang === 'th' ? 'เปลี่ยนน้ำเสีย/มูลสัตว์เป็นไฟฟ้า ลดต้นทุนค่าไฟโรงงานและฟาร์มได้ถึง 70-100%' : 'Converts waste slurry into on-site power, slashing utility costs by 70-100%',
                lang === 'th' ? 'เข้าเกณฑ์สิทธิประโยชน์ทางภาษี BOI และการขาย Carbon Credit' : 'Eligible for BOI tax privileges and Carbon Credit registry revenue',
                lang === 'th' ? 'ผลตอบแทนจากการประหยัดพลังงานนำมาผ่อนชำระค่างวดได้พอดี' : 'Energy cost savings directly offset monthly loan amortization installments',
                lang === 'th' ? 'ยกระดับองค์กรสู่มาตรฐานความยั่งยืนด้านสิ่งแวดล้อม' : 'Strengthens corporate ESG credentials and community environmental compliance',
            ],
            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80',
        },
        {
            id: 'solar-power',
            category: 'industry' as const,
            icon: Sun,
            categoryLabel: lang === 'th' ? 'Industry Solutions' : 'Industry Solutions',
            title: lang === 'th' ? 'Solar Power Generation – EN (ระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์)' : 'Solar Power Generation – Commercial & Industrial',
            subtitle: lang === 'th' 
                ? 'สินเชื่อระบบโซลาร์เซลล์อุตสาหกรรม: Solar Rooftop โรงงาน, Solar Farm, Solar Floating, อินเวอร์เตอร์อุตสาหกรรม และระบบกักเก็บพลังงานแบตเตอรี่ BESS' 
                : 'Comprehensive financing for commercial solar rooftop installations, ground mounts, floating solar, industrial inverters, and battery energy storage (BESS).',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ย Green Clean Energy อัตราพิเศษ' : 'Low-rate Green Clean Energy loan scheme',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 96 เดือน' : 'Extended repayment up to 96 months',
            benefits: [
                lang === 'th' ? 'ประหยัดค่าไฟทันทีหลังติดตั้ง นำเงินค่าไฟที่ประหยัดได้มาผ่อนค่างวด (Self-Funding)' : 'Immediate electric bill savings fund loan payments from day one (Self-Funding)',
                lang === 'th' ? 'สิทธิประโยชน์ยกเว้นภาษีเงินได้นิติบุคคลจาก BOI สูงสุด 50%' : 'Qualifies for BOI corporate tax exemption up to 50% of investment capital',
                lang === 'th' ? 'รับประกันผลงานและประสิทธิภาพแผงโซลาร์ยาวนาน 25-30 ปี' : '25 to 30 years linear solar panel power output performance warranty',
                lang === 'th' ? 'ฟรีการสำรวจหน้างานและวิเคราะห์ผลตอบแทนการลงทุน (ROI)' : 'Complimentary engineering rooftop survey and financial ROI feasibility report',
            ],
            image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&q=80',
        },

        // ─── Category 2: Industrial Equipment ───
        {
            id: 'chiller',
            category: 'industrial' as const,
            icon: Snowflake,
            categoryLabel: lang === 'th' ? 'Industrial Equipment' : 'Industrial Equipment',
            title: lang === 'th' ? 'Financing Service for Chiller (เครื่องทำความเย็นอุตสาหกรรม)' : 'Financing Service for Industrial Chiller Systems',
            subtitle: lang === 'th' 
                ? 'สินเชื่อเช่าซื้อเครื่องทำความเย็นอุตสาหกรรม: Water-Cooled Chillers, Air-Cooled Chillers, Magnetic Bearing Chillers, Cooling Tower และระบบท่อส่งความเย็น' 
                : 'Bespoke financing for industrial water-cooled & air-cooled chillers, oil-free magnetic bearing units, cooling towers, and HVAC plant retrofits.',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยเริ่มต้น 4.50% ต่อปี' : 'Rates starting from 4.50% p.a.',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 84 เดือน' : 'Terms up to 84 months',
            benefits: [
                lang === 'th' ? 'รองรับโรงงานอุตสาหกรรม อาคารสำนักงาน โรงพยาบาล และศูนย์การค้า' : 'Ideal for manufacturing plants, commercial buildings, hospitals, and datacenters',
                lang === 'th' ? 'ลดค่าไฟฟ้าด้วยเครื่องประหยัดพลังงานประสิทธิภาพสูง (High COP)' : 'Drastically lowers electricity spend via high-COP energy efficient compressors',
                lang === 'th' ? 'ไม่ต้องใช้ที่ดินค้ำประกัน (ใช้เครื่องชิลเลอร์เป็นหลักทรัพย์)' : 'No real estate mortgage needed — equipment functions as collateral',
                lang === 'th' ? 'นำดอกเบี้ยและค่าเสื่อมราคาไปหักลดหย่อนภาษีนิติบุคคลได้' : 'Full corporate tax deduction benefits on leasing depreciation and interest',
            ],
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80',
        },
        {
            id: 'injection-molding',
            category: 'industrial' as const,
            icon: Cog,
            categoryLabel: lang === 'th' ? 'Industrial Equipment' : 'Industrial Equipment',
            title: lang === 'th' ? 'Financing Service for Injection Molding Machine (เครื่องฉีดพลาสติก)' : 'Financing Service for Injection Molding Machines',
            subtitle: lang === 'th' 
                ? 'สินเชื่อเครื่องฉีดพลาสติกและอุปกรณ์ต่อพ่วง: เครื่องฉีดระบบไฮดรอลิก, เซอร์โว และไฟฟ้า 100% (All-Electric), แขนกลโรบอทหยิบชิ้นงาน, เครื่องผสมเม็ดพลาสติก และแม่พิมพ์' 
                : 'Financing for hydraulic, servo, and all-electric injection molding machines, robotic take-out arms, resin dryers, blenders, and precision tooling molds.',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยพิเศษกลุ่มยานยนต์และบรรจุภัณฑ์' : 'Preferential automotive & packaging rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 84 เดือน' : 'Terms up to 84 months',
            benefits: [
                lang === 'th' ? 'วงเงินสูงสุด 100% สำหรับเครื่องฉีดใหม่และเครื่องมืองสองสภาพดีเยี่ยม' : 'Financing up to 100% value for brand new and certified pre-owned machines',
                lang === 'th' ? 'รองรับเครื่องฉีดขนาดแรงปิดตั้งแต่ 50 ตัน ถึง 3,000+ ตัน' : 'Supports clamping tonnage ranging from 50 tons to 3,000+ tons',
                lang === 'th' ? 'อนุมัติเบื้องต้นไว ภายใน 24-48 ชั่วโมง ช่วยรับงานด่วนได้ทันท่วงที' : 'Fast credit approval in 24-48 hours to secure rapid production orders',
                lang === 'th' ? 'ดาวน์เริ่มต้นเพียง 0 - 10% พร้อมโครงสร้างผ่อนชำระยืดหยุ่น' : 'Down payments starting as low as 0 - 10% with flexible structuring',
            ],
            image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=900&q=80',
        },
        {
            id: 'generator-set',
            category: 'industrial' as const,
            icon: Zap,
            categoryLabel: lang === 'th' ? 'Industrial Equipment' : 'Industrial Equipment',
            title: lang === 'th' ? 'Financing Service for Generator Set (เครื่องกำเนิดไฟฟ้า / เครื่องปั่นไฟ)' : 'Financing Service for Diesel & Gas Generator Sets',
            subtitle: lang === 'th' 
                ? 'สินเชื่อเครื่องปั่นไฟและระบบไฟสำรองฉุกเฉิน: Diesel Generator Standby & Prime Power ขนาด 50 kVA - 2,500 kVA, สวิตช์สลับแหล่งจ่ายไฟอัตโนมัติ ATS และตู้ควบคุม Synchronize' 
                : 'Reliable financing for standby and prime diesel generator sets (50 kVA to 2,500 kVA), automatic transfer switches (ATS), soundproof canopies, and sync panels.',
            rateHighlight: lang === 'th' ? 'อัตราดอกเบี้ยคงที่ ผ่อนสบาย' : 'Fixed competitive interest rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระ 12 - 72 เดือน' : 'Repayment 12 - 72 months',
            benefits: [
                lang === 'th' ? 'ป้องกันความเสียหายจากไฟดับในโรงงาน ศูนย์ข้อมูล (Data Center) และอาคารสูง' : 'Zero downtime protection for industrial production lines and critical datacenters',
                lang === 'th' ? 'วงเงินครอบคลุมทั้งเครื่องยนต์ ตู้เก็บเสียง การขนส่ง และงานติดตั้ง' : 'Comprehensive coverage including generator, soundproof enclosure, and installation',
                lang === 'th' ? 'ผ่อนชำระสบาย ไม่ดึงเงินสดสภาพคล่องของกิจการ' : 'Preserves working capital while ensuring uninterrupted enterprise power security',
                lang === 'th' ? 'อนุมัติวงเงินสะดวกรวดเร็ว เอกสารไม่ยุ่งยาก' : 'Streamlined underwriting process with fast document turnarounds',
            ],
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80',
        },
    ];

    // Listen to custom event when a user clicks a specific item in Navbar dropdown
    useEffect(() => {
        const handleSelect = (e: Event) => {
            const customEvent = e as CustomEvent<{ itemId: string }>;
            const itemId = customEvent.detail?.itemId;
            if (itemId) {
                const target = products.find(p => p.id === itemId);
                if (target) {
                    setActiveTab(target.id);
                    setSelectedCategory(target.category);
                }
            }
        };
        window.addEventListener('selectFinancingProduct', handleSelect);
        return () => window.removeEventListener('selectFinancingProduct', handleSelect);
    }, [products]);

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const currentProduct = products.find(p => p.id === activeTab) || filteredProducts[0] || products[0];

    const handleApply = (productTitle: string) => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const inputProduct = document.querySelector('select[name="productType"]') as HTMLSelectElement;
            if (inputProduct) {
                inputProduct.value = productTitle;
            }
        }
    };

    return (
        <section id="financing" className="py-16 lg:py-24 relative overflow-hidden bg-background">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t('financing.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('financing.title')}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('financing.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Selection Filter Pills */}
                <ScrollReveal animation="fade-up" delay={50}>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                            }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                                selectedCategory === 'all'
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.03]'
                                    : 'glass border border-border/80 text-muted-foreground hover:text-foreground hover:bg-white/5'
                            }`}
                        >
                            <Layers className="w-3.5 h-3.5" />
                            <span>{lang === 'th' ? 'บริการทั้งหมด (All Solutions)' : 'All Solutions'}</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">8</span>
                        </button>

                        <button
                            onClick={() => {
                                setSelectedCategory('industry');
                                if (!products.filter(p => p.category === 'industry').some(p => p.id === activeTab)) {
                                    setActiveTab('drinking-water');
                                }
                            }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                                selectedCategory === 'industry'
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.03]'
                                    : 'glass border border-border/80 text-muted-foreground hover:text-foreground hover:bg-white/5'
                            }`}
                        >
                            <Factory className="w-3.5 h-3.5" />
                            <span>{lang === 'th' ? 'Industry Solutions (ตามกลุ่มอุตสาหกรรม)' : 'Industry Solutions'}</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">5</span>
                        </button>

                        <button
                            onClick={() => {
                                setSelectedCategory('industrial');
                                if (!products.filter(p => p.category === 'industrial').some(p => p.id === activeTab)) {
                                    setActiveTab('chiller');
                                }
                            }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                                selectedCategory === 'industrial'
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.03]'
                                    : 'glass border border-border/80 text-muted-foreground hover:text-foreground hover:bg-white/5'
                            }`}
                        >
                            <Boxes className="w-3.5 h-3.5" />
                            <span>{lang === 'th' ? 'Industrial Equipment (เครื่องจักรอุตสาหกรรม)' : 'Industrial Equipment'}</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">3</span>
                        </button>
                    </div>
                </ScrollReveal>

                {/* Sub-item Tabs Carousel / Grid */}
                <ScrollReveal animation="fade-up" delay={100}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-2.5 mb-10">
                        {filteredProducts.map((p) => {
                            const isCurrent = currentProduct.id === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setActiveTab(p.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-2xl text-center transition-all duration-200 border ${
                                        isCurrent
                                            ? 'bg-sky-500/15 border-sky-400/70 shadow-lg shadow-sky-500/15 text-sky-400 scale-[1.02]'
                                            : 'glass hover:bg-white/5 border-border/80 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                                            isCurrent ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'bg-sky-500/10 text-sky-400'
                                        }`}
                                    >
                                        <p.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-semibold leading-snug line-clamp-2">
                                        {p.title.split('(')[0].trim()}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </ScrollReveal>

                {/* Active Tab Spotlight Showcase Card */}
                {currentProduct && (
                    <ScrollReveal animation="zoom-in" delay={150}>
                        <div className="glass-card rounded-3xl overflow-hidden border border-sky-500/25 shadow-2xl animate-fade-in">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                {/* Left: Product Information */}
                                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                                    <div>
                                        {/* Category Badge & Highlights */}
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 font-bold text-xs border border-sky-400/30 uppercase tracking-wide">
                                                {currentProduct.categoryLabel}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 font-semibold text-xs border border-sky-400/20">
                                                {currentProduct.rateHighlight}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700">
                                                {currentProduct.termHighlight}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 font-sans">
                                            {currentProduct.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                            {currentProduct.subtitle}
                                        </p>

                                        {/* Key Benefits List */}
                                        <div className="space-y-3 mb-8">
                                            {currentProduct.benefits.map((b, bIdx) => (
                                                <div key={bIdx} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-sky-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-400">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                                                        {b}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border/80">
                                        <button
                                            onClick={() => handleApply(currentProduct.title)}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 transition-all duration-200 hover:scale-[1.02]"
                                        >
                                            <span>{t('financing.apply')}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => {
                                                const calc = document.querySelector('#calculator');
                                                calc?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-white/10 text-foreground font-semibold text-xs border border-border transition-all duration-200"
                                        >
                                            {t('calc.title')}
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Featured Photo */}
                                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[440px] overflow-hidden group">
                                    <img
                                        src={currentProduct.image}
                                        alt={currentProduct.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent lg:bg-gradient-to-r lg:from-card lg:via-transparent lg:to-transparent" />
                                    
                                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-white/20 bg-black/50 backdrop-blur-xl">
                                        <p className="text-white font-bold text-sm">
                                            Agile Assets — Structured Capital
                                        </p>
                                        <p className="text-sky-300 text-xs mt-0.5">
                                            {lang === 'th' ? 'ออกแบบวงเงินและโครงสร้างสินเชื่อตรงตามโมเดลธุรกิจคุณ' : 'Bespoke credit structure designed for your enterprise scale'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
}
