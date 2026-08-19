import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building, Cog, Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function useCounter(end: number, duration: number = 2000, trigger: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration, trigger]);

    return count;
}

export function CustomerEligibilitySection() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const factoryCount = useCounter(40, 1600, isVisible);
    const contractsCount = useCounter(50, 1800, isVisible);
    const valueCount = useCounter(400, 2000, isVisible);

    const criterias = [
        {
            icon: Building,
            title: lang === 'th' ? 'ลูกค้านิติบุคคลเท่านั้น' : 'Corporate Entities Only',
            desc: lang === 'th'
                ? 'ให้บริการเฉพาะผู้ประกอบการที่จดทะเบียนในรูปแบบนิติบุคคลเท่านั้น เพื่อสร้างมาตรฐานความร่วมมือทางธุรกิจอย่างมืออาชีพและตรวจสอบได้'
                : 'Exclusively servicing registered corporate enterprises to ensure institutional business governance and transparency.',
        },
        {
            icon: Cog,
            title: lang === 'th' ? 'ปล่อยสินเชื่อเช่าซื้อเครื่องจักรเป็นหลัก' : 'Machinery Hire Purchase Focus',
            desc: lang === 'th'
                ? 'เราพิจารณาสินเชื่อเครื่องจักรอุตสาหกรรมประเภทต่างๆ เพื่อส่งมอบศักยภาพในการผลิตให้ถึงมือผู้ใช้โดยตรง โดยไม่ใช่การปล่อยกู้เป็นเงินสด เพื่อต่อยอดการเติบโตของธุรกิจ'
                : 'Credit facilities dedicated directly to industrial equipment delivery rather than cash lending, empowering immediate operational capability.',
        },
        {
            icon: Clock,
            title: lang === 'th' ? 'ผ่อนยาว 3-5 ปี' : 'Flexible 3 – 5 Year Terms',
            desc: lang === 'th'
                ? 'ระยะเวลาการผ่อนชำระที่ยืดหยุ่นตั้งแต่ 3 – 5 ปี เพื่อให้ธุรกิจสามารถบริหารจัดการกระแสเงินสด เพื่อให้สอดคล้องกับการหมุนเวียนในธุรกิจ'
                : 'Extended repayment structures from 3 to 5 years designed to optimize cash flow alignment with revenue generation.',
        },
        {
            icon: ShieldCheck,
            title: lang === 'th' ? 'หลักประกันยืดหยุ่นได้' : 'Flexible Collateral Requirements',
            desc: lang === 'th'
                ? 'มีเครื่องจักรที่เช่าซื้อเป็นหลักประกัน ประกอบกับหลักประกันอื่นๆ เสริม ที่สามารถยืดหยุ่นได้ เพื่อลดความเสี่ยง'
                : 'Financed equipment acts as core security, augmented by flexible secondary guarantees tailored to mitigate project risks.',
        },
        {
            icon: TrendingUp,
            title: lang === 'th' ? 'สนับสนุนกิจการพร้อมโต' : 'Supporting High-Growth Ventures',
            desc: lang === 'th'
                ? 'คัดเลือกธุรกิจที่มีความ พร้อมในการขยายกำลังการผลิต และสามารถสร้างยอดขายเพิ่มขึ้นได้ทันทีที่เครื่องจักรถูกส่งมอบและติดตั้ง เพื่อผลกำไรเติบโตอย่างก้าวกระโดด'
                : 'Partnering with enterprises primed for manufacturing expansion, ensuring rapid ROI and multiplied profitability.',
        },
    ];

    return (
        <section ref={sectionRef} className="relative pt-20 sm:pt-24 pb-28 bg-[#0a234d] text-white overflow-hidden">
            {/* Background Decorative Grid and Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-400 mb-3 font-sans">
                            CUSTOMER ELIGIBILITY CRITERIAS
                        </p>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
                            {lang === 'th' ? 'เกณฑ์การเป็นลูกค้าของอาไจล์ แอสเซ็ทส์' : 'Agile Assets Customer Eligibility Criteria'}
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 6-Card Grid (5 Criteria Cards + 1 CTA Card) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
                    {criterias.map((item, index) => (
                        <ScrollReveal
                            key={index}
                            animation="fade-up"
                            delay={index * 80}
                            className="flex flex-col h-full"
                        >
                            <div className="group flex flex-col h-full rounded-3xl p-7 sm:p-8 bg-white text-slate-900 shadow-xl border border-white/20 hover:shadow-2xl hover:border-sky-400/60 transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-lg sm:text-xl font-extrabold text-sky-900 font-sans mb-3 group-hover:text-sky-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}

                    {/* Card 6: CTA Card */}
                    <ScrollReveal animation="fade-up" delay={400} className="flex flex-col h-full">
                        <div className="relative flex flex-col items-center justify-center text-center h-full rounded-3xl p-7 sm:p-8 bg-white text-slate-900 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                            {/* Decorative Silk Ribbon Pattern */}
                            <div className="absolute inset-0 pointer-events-none opacity-35">
                                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-50,250 C100,50 300,280 450,120" stroke="#0284c7" strokeWidth="2" strokeOpacity="0.4" />
                                    <path d="M-20,280 C150,100 320,320 480,180" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.3" />
                                </svg>
                            </div>

                            <div className="relative z-10 space-y-3">
                                <h3 className="text-lg sm:text-xl font-extrabold text-sky-900 font-sans">
                                    {lang === 'th' ? 'ขอสินเชื่อกับ Agile Assets' : 'Apply with Agile Assets'}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    {lang === 'th' ? 'กรอกฟอร์มเพื่อให้เจ้าหน้าที่ติดต่อกลับ' : 'Fill out application form for specialist callback'}
                                </p>
                                <div className="pt-2">
                                    <button
                                        onClick={() => {
                                            navigate('/leasing-application');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <span>{lang === 'th' ? 'คลิกที่นี่' : 'Click Here'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Floating Impact Stats Card at Bottom */}
                <ScrollReveal animation="zoom-in" delay={200}>
                    <div className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl border border-white/40 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                            {/* Counter 1 */}
                            <div className="text-center pt-4 sm:pt-0 first:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {factoryCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {lang === 'th' ? 'โรงงาน' : 'Industrial Plants'}
                                </div>
                            </div>

                            {/* Counter 2 */}
                            <div className="text-center pt-6 sm:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {contractsCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {lang === 'th' ? 'สัญญาเช่าซื้อ' : 'Active Leasing Contracts'}
                                </div>
                            </div>

                            {/* Counter 3 */}
                            <div className="text-center pt-6 sm:pt-0 sm:px-4">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 font-sans tracking-tight mb-2">
                                    {valueCount}
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-700 font-sans">
                                    {lang === 'th' ? 'มูลค่าสินเชื่อที่บริหารรวม (MB)' : 'Total Managed Value (MB)'}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
