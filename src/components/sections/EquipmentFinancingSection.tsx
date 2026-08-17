import { useState } from 'react';
import { Building2, Stethoscope, Truck, Sun, RefreshCw, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function EquipmentFinancingSection() {
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<number>(0);

    const products = [
        {
            id: 'industrial',
            icon: Building2,
            title: lang === 'th' ? 'เครื่องจักรอุตสาหกรรมและการผลิต' : 'Industrial Machinery & Automation',
            subtitle: lang === 'th' ? 'CNC, หุ่นยนต์แขนกล, เครื่องฉีดพลาสติก, สายการผลิตอัตโนมัติ' : 'CNC machines, robotic automation, injection molding, precision tooling',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยเริ่มต้น 4.50% ต่อปี' : 'Rates from 4.50% p.a.',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 84 เดือน' : 'Terms up to 84 months',
            benefits: [
                lang === 'th' ? 'วงเงินสูงสุด 100% ของมูลค่าเครื่องจักร' : 'Up to 100% equipment value financing',
                lang === 'th' ? 'ไม่ต้องใช้หลักทรัพย์ค้ำประกันเพิ่มเติม (ใช้เครื่องจักรเป็นหลักประกัน)' : 'No additional real estate collateral required',
                lang === 'th' ? 'อนุมัติวงเงินเบื้องต้นภายใน 24-48 ชั่วโมง' : 'Fast preliminary approval in 24-48 hours',
                lang === 'th' ? 'สิทธิประโยชน์ทางภาษีสำหรับการเช่าซื้อ/ลีสซิ่ง' : 'Tax-deductible leasing expense structure',
            ],
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        },
        {
            id: 'medical',
            icon: Stethoscope,
            title: lang === 'th' ? 'เครื่องมือและอุปกรณ์การแพทย์' : 'Medical & Healthcare Technology',
            subtitle: lang === 'th' ? 'เครื่องตรวจ MRI, CT Scan, เลเซอร์ความงาม, เครื่องช่วยหายใจ' : 'Diagnostic imaging, MRI, surgical lasers, aesthetic medical devices',
            rateHighlight: lang === 'th' ? 'ดอกเบี้ยพิเศษสำหรับบุคลากรทางการแพทย์' : 'Preferential medical professional rates',
            termHighlight: lang === 'th' ? 'ระยะเวลา 24 - 84 เดือน' : 'Terms 24 - 84 months',
            benefits: [
                lang === 'th' ? 'รองรับทั้งโรงพยาบาล คลินิกเวชกรรม และทันตกรรม' : 'Suitable for hospitals, clinics, and specialized centers',
                lang === 'th' ? 'แผนการผ่อนชำระแบบขั้นบันได (Step-up payment) สอดรับการเติบโต' : 'Step-up structured payments matching patient ramp-up',
                lang === 'th' ? 'วงเงินยืดหยุ่นสูงสุด 50 ล้านบาทต่อโครงการ' : 'Credit lines up to 50M THB per project',
                lang === 'th' ? 'ดูแลการจัดหาและนำเข้าโดยผู้เชี่ยวชาญ' : 'End-to-end import & vendor coordination',
            ],
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
        },
        {
            id: 'fleet',
            icon: Truck,
            title: lang === 'th' ? 'ยานพาหนะเชิงพาณิชย์และโลจิสติกส์' : 'Commercial Transport & Fleet',
            subtitle: lang === 'th' ? 'รถบรรทุกหัวลาก, รถควบคุมอุณหภูมิ, รถบัสรับส่งพนักงาน, โฟล์คลิฟท์' : 'Prime movers, refrigerated trucks, transport vans, electric forklifts',
            rateHighlight: lang === 'th' ? 'ดาวน์เริ่มต้น 0 - 10%' : 'Down payments from 0 - 10%',
            termHighlight: lang === 'th' ? 'ผ่อนนาน 12 - 72 เดือน' : 'Terms 12 - 72 months',
            benefits: [
                lang === 'th' ? 'บริการสินเชื่อกองยานพาหนะ (Fleet Financing) สัญญารวม' : 'Integrated master fleet financing agreements',
                lang === 'th' ? 'รวมค่าประกันภัย พรบ. และระบบ GPS ในค่างวดได้' : 'Bundled insurance, registration, and telematics GPS',
                lang === 'th' ? 'รองรับรถพลังงานไฟฟ้า EV เพื่อการขนส่งเชิงพาณิชย์' : 'Commercial EV fleet green transition financing',
                lang === 'th' ? 'อนุมัติวงเงินล่วงหน้าเพื่อความคล่องตัวในการสั่งซื้อ' : 'Pre-approved fleet credit limits for fast dispatch',
            ],
            image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
        },
        {
            id: 'clean-energy',
            icon: Sun,
            title: lang === 'th' ? 'พลังงานสะอาดและโซลาร์เซลล์ (ESG)' : 'Clean Tech & Solar Energy',
            subtitle: lang === 'th' ? 'โซลาร์รูฟท็อปโรงงาน, โซลาร์ฟาร์ม, ระบบกักเก็บพลังงาน BESS' : 'Commercial solar rooftop, energy storage systems, green infrastructure',
            rateHighlight: lang === 'th' ? 'อัตราดอกเบี้ยสีเขียวพิเศษ (Green Loan Rate)' : 'Subsidized Green Loan interest rates',
            termHighlight: lang === 'th' ? 'ผ่อนชำระสูงสุด 96 เดือน' : 'Extended terms up to 96 months',
            benefits: [
                lang === 'th' ? 'ประหยัดค่าไฟทันทีหลังติดตั้ง นำค่าไฟที่ประหยัดมาผ่อนค่างวด' : 'Self-funding: electric bill savings cover monthly payments',
                lang === 'th' ? 'สิทธิประโยชน์ลดหย่อนภาษีจาก BOI สูงสุด 50%' : 'Qualifies for BOI 50% corporate tax exemption',
                lang === 'th' ? 'ยกระดับองค์กรสู่มาตรฐานความยั่งยืน ESG และ Carbon Neutral' : 'Enhances corporate ESG rating and carbon neutrality',
                lang === 'th' ? 'ฟรีการประเมินความคุ้มค่าและสำรวจหน้างาน' : 'Complimentary engineering & financial feasibility study',
            ],
            image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80',
        },
        {
            id: 'factoring',
            icon: RefreshCw,
            title: lang === 'th' ? 'สินเชื่อหมุนเวียนธุรกิจ & แฟคตอริ่ง' : 'Factoring & Working Capital',
            subtitle: lang === 'th' ? 'เปลี่ยนใบแจ้งหนี้ / ใบสั่งซื้อ (PO) เป็นเงินสดหมุนเวียนทันที' : 'Convert unpaid invoices and purchase orders into immediate working liquidity',
            rateHighlight: lang === 'th' ? 'เบิกถอนได้สูงสุด 90% ของมูลค่าแจ้งหนี้' : 'Advance rate up to 90% invoice value',
            termHighlight: lang === 'th' ? 'รับเงินภายใน 24 ชั่วโมง' : 'Same-day cash disbursement',
            benefits: [
                lang === 'th' ? 'ไม่ต้องรอเครดิตเทอม 30 - 90 วันจากคู่ค้า' : 'Eliminates waiting 30-90 days credit terms from buyers',
                lang === 'th' ? 'ช่วยเพิ่มสภาพคล่องรับงานใหม่และขยายออเดอร์' : 'Instant liquidity to accept larger supplier orders',
                lang === 'th' ? 'วงเงินหมุนเวียนปรับเพิ่มได้ตามยอดขายที่โตขึ้น' : 'Credit limit grows naturally with your revenue',
                lang === 'th' ? 'ดูแลการรับชำระเงินอย่างมืออาชีพ' : 'Professional invoice collection administration',
            ],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        },
        {
            id: 'sale-leaseback',
            icon: Sparkles,
            title: lang === 'th' ? 'ขายและเช่ากลับ (Sale & Leaseback)' : 'Sale & Leaseback Solutions',
            subtitle: lang === 'th' ? 'เปลี่ยนเครื่องจักรเดิมที่มีอยู่เป็นเงินสดก้อนใหญ่ โดยยังใช้งานได้ต่อเนื่อง' : 'Unlock locked-up capital from existing operational equipment without interruption',
            rateHighlight: lang === 'th' ? 'ประเมินมูลค่าตามราคาตลาดที่เป็นธรรม' : 'Fair market asset valuation',
            termHighlight: lang === 'th' ? 'สัญญา 12 - 60 เดือน' : 'Agreements 12 - 60 months',
            benefits: [
                lang === 'th' ? 'รับเงินทุนก้อนใหญ่ทันทีเพื่อเสริมสภาพคล่องหรือลงทุนต่อยอด' : 'Substantial immediate cash injection for strategic growth',
                lang === 'th' ? 'โรงงานยังคงเดินเครื่องผลิตได้ตามปกติ 100%' : 'Zero operational disruption — machinery stays in place',
                lang === 'th' ? 'สิทธิซื้อคืนเครื่องจักรเมื่อสิ้นสุดสัญญา' : 'Option to repurchase equipment at contract maturity',
                lang === 'th' ? 'ช่วยปรับปรุงโครงสร้างงบดุลและสัดส่วนหนี้สิน' : 'Optimizes balance sheet structure and debt-to-equity ratio',
            ],
            image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&q=80',
        },
    ];

    const handleApply = (productTitle: string) => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Populate contact input if available
            const inputProduct = document.querySelector('select[name="productType"]') as HTMLSelectElement;
            if (inputProduct) {
                inputProduct.value = productTitle;
            }
        }
    };

    return (
        <section id="financing" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

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

                {/* Interactive Product Selector Tabs */}
                <ScrollReveal animation="fade-up" delay={100}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
                        {products.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => setActiveTab(idx)}
                                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl text-center transition-all duration-300 border ${
                                    activeTab === idx
                                        ? 'bg-sky-500/15 border-sky-400/60 shadow-lg shadow-sky-500/10 text-sky-400 scale-[1.02]'
                                        : 'glass hover:bg-white/5 border-border/80 text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                                        activeTab === idx ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'bg-sky-500/10 text-sky-400'
                                    }`}
                                >
                                    <p.icon className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold leading-tight line-clamp-2">
                                    {p.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Active Tab Spotlight Showcase Card */}
                {products[activeTab] && (
                    <ScrollReveal animation="zoom-in" delay={150}>
                        <div className="glass-card rounded-3xl overflow-hidden border border-sky-500/25 shadow-2xl animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            {/* Left: Product Information */}
                            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 font-semibold text-xs border border-sky-400/30">
                                            {products[activeTab].rateHighlight}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700">
                                            {products[activeTab].termHighlight}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 font-sans">
                                        {products[activeTab].title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                        {products[activeTab].subtitle}
                                    </p>

                                    {/* Key Benefits List */}
                                    <div className="space-y-3 mb-8">
                                        {products[activeTab].benefits.map((b, bIdx) => (
                                            <div key={bIdx} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-sky-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-400">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                                                    {b}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border/80">
                                    <button
                                        onClick={() => handleApply(products[activeTab].title)}
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
                            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[420px] overflow-hidden">
                                <img
                                    src={products[activeTab].image}
                                    alt={products[activeTab].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-card lg:via-transparent lg:to-transparent" />
                                
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-white/20 bg-black/40 backdrop-blur-xl">
                                    <p className="text-white font-bold text-sm">
                                        Agile Assets Partnership
                                    </p>
                                    <p className="text-sky-300 text-xs mt-0.5">
                                        {lang === 'th' ? 'ให้คำปรึกษาและออกแบบโครงสร้างการเงินเฉพาะกิจการ' : 'Custom financial structuring for your business'}
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
