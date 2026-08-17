import { useState } from 'react';
import { PackageCheck, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AssetsForSaleSection() {
    const { t, lang } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const assets = [
        {
            id: 'ast-01',
            title: lang === 'th' ? 'เครื่อง CNC 5-Axis Milling Center (Mazak VARIAXIS)' : '5-Axis CNC Milling Center (Mazak VARIAXIS)',
            category: 'machinery',
            categoryName: lang === 'th' ? 'เครื่องจักรอุตสาหกรรม' : 'Industrial Machinery',
            year: '2023',
            condition: lang === 'th' ? 'สภาพ 95% ผ่านการตรวจรับรอง' : 'Certified 95% Condition',
            price: lang === 'th' ? '฿4,850,000 (หรือผ่อนเริ่มต้น ฿75,000/ด.)' : '฿4,850,000 (or Lease ฿75k/mo)',
            image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80',
            features: [
                lang === 'th' ? 'ชั่วโมงการทำงานต่ำกว่า 1,200 ชม.' : 'Under 1,200 operating hours',
                lang === 'th' ? 'ระบบควบคุม SmoothX CNC พร้อมใช้งาน' : 'Mazatrol SmoothX CNC unit installed',
                lang === 'th' ? 'มีประวัติบำรุงรักษาศูนย์บริการครบถ้วน' : 'Full authorized maintenance history',
            ],
        },
        {
            id: 'ast-02',
            title: lang === 'th' ? 'รถบรรทุกหัวลากไฟฟ้า Heavy-Duty EV Tractor 420kW' : 'Commercial Heavy-Duty EV Tractor 420kW',
            category: 'vehicles',
            categoryName: lang === 'th' ? 'ยานพาหนะเชิงพาณิชย์' : 'Commercial Fleet',
            year: '2024',
            condition: lang === 'th' ? 'รถใหม่ไมล์ศูนย์ รับประกันแบตเตอรี่ 8 ปี' : 'Zero-Mileage New (8-Yr Battery Warranty)',
            price: lang === 'th' ? '฿3,900,000 (หรือผ่อนเริ่มต้น ฿58,000/ด.)' : '฿3,900,000 (or Lease ฿58k/mo)',
            image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
            features: [
                lang === 'th' ? 'ระยะทางวิ่ง 350 กม. ต่อการชาร์จหนึ่งครั้ง' : '350 km range per single charge',
                lang === 'th' ? 'รองรับระบบชาร์จไว DC Ultra-Fast Charge' : 'DC Ultra-fast charging compatible',
                lang === 'th' ? 'ลดต้นทุนพลังงานและค่าบำรุงรักษา 40%' : 'Cuts operational fuel cost by 40%',
            ],
        },
        {
            id: 'ast-03',
            title: lang === 'th' ? 'เครื่องเอกซเรย์คอมพิวเตอร์ 128-Slice CT Scanner' : '128-Slice Diagnostic CT Scanner System',
            category: 'medical',
            categoryName: lang === 'th' ? 'อุปกรณ์การแพทย์' : 'Medical Tech',
            year: '2022',
            condition: lang === 'th' ? 'ผ่านการ Calibrate มาตรฐานโรงพยาบาล' : 'Refurbished Hospital-Grade Certified',
            price: lang === 'th' ? '฿8,200,000 (หรือผ่อนเริ่มต้น ฿125,000/ด.)' : '฿8,200,000 (or Lease ฿125k/mo)',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
            features: [
                lang === 'th' ? 'หลอดเอกซเรย์สภาพใหม่ สัญญา Service 2 ปี' : 'New X-ray tube + 2-Yr service warranty',
                lang === 'th' ? 'ระบบประมวลผลภาพ AI ความละเอียดสูง' : 'AI-powered high-resolution rendering',
                lang === 'th' ? 'บริการติดตั้งและเทรนนิ่งบุคลากรฟรี' : 'Free delivery, installation, and training',
            ],
        },
        {
            id: 'ast-04',
            title: lang === 'th' ? 'ระบบกักเก็บพลังงานแบตเตอรี่โรงงาน BESS 500kWh' : 'Industrial BESS Energy Storage 500kWh',
            category: 'energy',
            categoryName: lang === 'th' ? 'พลังงานสะอาด' : 'Clean Energy',
            year: '2024',
            condition: lang === 'th' ? 'ของใหม่ยังไม่แกะซีล รับประกัน 10 ปี' : 'Brand New Unopened (10-Yr Warranty)',
            price: lang === 'th' ? '฿2,650,000 (หรือผ่อนเริ่มต้น ฿39,000/ด.)' : '฿2,650,000 (or Lease ฿39k/mo)',
            image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80',
            features: [
                lang === 'th' ? 'ระบบเซลล์แบตเตอรี่ LiFePO4 ปลอดภัยสูง' : 'Tier-1 LiFePO4 battery chemistry',
                lang === 'th' ? 'รองรับ Peak-Shaving ลดค่าไฟฟ้าองค์กร' : 'Peak-shaving smart energy management',
                lang === 'th' ? 'เข้าเกณฑ์สินเชื่อสีเขียว Green Loan' : 'Eligible for Green Loan tax breaks',
            ],
        },
    ];

    const filteredAssets = selectedCategory === 'all'
        ? assets
        : assets.filter((a) => a.category === selectedCategory);

    const handleInquire = (assetTitle: string) => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
            if (messageInput) {
                messageInput.value = `${lang === 'th' ? 'สนใจสอบถามข้อมูลทรัพย์รอการขาย:' : 'Inquiring about asset for sale:'} ${assetTitle}`;
            }
        }
    };

    return (
        <section id="assets-for-sale" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <PackageCheck className="w-3.5 h-3.5" />
                            <span>{t('assetSale.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('assetSale.title')}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('assetSale.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Filter Pills */}
                <ScrollReveal animation="fade-up" delay={100}>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
                        {[
                            { id: 'all', label: t('assetSale.filterAll') },
                            { id: 'machinery', label: t('assetSale.filterMachinery') },
                            { id: 'vehicles', label: t('assetSale.filterVehicles') },
                            { id: 'medical', label: t('assetSale.filterMedical') },
                            { id: 'energy', label: t('assetSale.filterEnergy') },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                                    selectedCategory === cat.id
                                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                                        : 'glass text-muted-foreground hover:text-foreground hover:bg-white/10'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Assets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredAssets.map((item, idx) => (
                        <ScrollReveal
                            key={item.id}
                            animation="fade-up"
                            delay={idx * 140}
                            className="flex flex-col h-full"
                        >
                            <div className="glass-card rounded-3xl overflow-hidden border border-sky-500/15 flex flex-col justify-between group hover:border-sky-400/40 transition-all duration-300 h-full">
                                <div>
                                    {/* Photo Container */}
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                                                {item.categoryName}
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md">
                                                {t('assetSale.statusAvailable')}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                                            <span className="text-xs font-semibold text-sky-300">
                                                {item.condition}
                                            </span>
                                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                                                Yr {item.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-xl font-bold text-foreground mb-3 font-sans group-hover:text-sky-400 transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Features */}
                                        <div className="space-y-2 mb-6">
                                            {item.features.map((f, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Price & Inquire Action */}
                                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                            {lang === 'th' ? 'ราคา / ค่าเช่าประมาณการ' : 'Price / Estimated Lease'}
                                        </p>
                                        <p className="text-base sm:text-lg font-extrabold text-sky-400 font-sans mt-0.5">
                                            {item.price}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleInquire(item.title)}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-400 hover:text-white font-semibold text-xs transition-all duration-200 border border-sky-400/30"
                                    >
                                        <PhoneCall className="w-3.5 h-3.5" />
                                        <span>{t('assetSale.inquire')}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
