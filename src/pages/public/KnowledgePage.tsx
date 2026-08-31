import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ChevronDown, ArrowRight, Search, X, DollarSign, Calculator } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

interface KnowledgeArticle {
    id: string;
    titleTh: string;
    titleEn: string;
    category: 'financing' | 'interest' | 'management' | 'esg';
    categoryTh: string;
    categoryEn: string;
    date: string;
    readTimeTh: string;
    readTimeEn: string;
    image: string;
    excerptTh: string;
    excerptEn: string;
    contentTh: string[];
    contentEn: string[];
}

export function KnowledgePage() {
    const { lang } = useLanguage();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

    const articles: KnowledgeArticle[] = [
        {
            id: 'article-1',
            titleTh: 'การเช่าซื้อเครื่องจักรอุตสาหกรรม (Hire Purchase) คืออะไร และช่วยเพิ่มสภาพคล่องอย่างไร?',
            titleEn: 'What is Industrial Machinery Hire Purchase & How Does It Boost Cash Flow?',
            category: 'financing',
            categoryTh: 'สินเชื่อและการเช่าซื้อ',
            categoryEn: 'Machinery Financing',
            date: '15 พฤษภาคม 2026',
            readTimeTh: '4 นาที',
            readTimeEn: '4 min read',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            excerptTh: 'เจาะลึกประโยชน์ของสินเชื่อเช่าซื้อเครื่องจักรเทียบกับการซื้อด้วยเงินสด ช่วยรักษาเงินทุนหมุนเวียนและเพิ่มขีดความสามารถการผลิตอย่างก้าวกระโดด',
            excerptEn: 'Explore the strategic advantages of machinery leasing versus upfront capital expenditure, keeping working capital intact.',
            contentTh: [
                'การจัดหาเครื่องจักรอุตสาหกรรมที่มีประสิทธิภาพสูง ถือเป็นหัวใจสำคัญของการเติบโตของโรงงานอุตสาหกรรมในยุคปัจจุบัน อย่างไรก็ดี การใช้เงินสดจำนวนมากในการซื้อเครื่องจักรอาจส่งผลกระทบต่อกระแสเงินสดหมุนเวียน (Cash Flow) ของกิจการ',
                'การเช่าซื้อเครื่องจักร (Hire Purchase) คือ รูปแบบสินเชื่อที่ผู้ประกอบการสามารถนำเครื่องจักรมาติดตั้งและเริ่มกระบวนการผลิตเพื่อสร้างรายได้ทันทีก่อน โดยทยอยผ่อนชำระค่างวดเป็นรายเดือนตามระยะเวลาที่ตกลงกัน เช่น 12 - 60 เดือน',
                'ข้อดีหลักของการเช่าซื้อเครื่องจักรกับ Agile Assets:',
                '1. ไม่ต้องใช้เงินก้อนใหญ่: รักษาเงินสดสำรองไว้สำหรับซื้อวัตถุดิบและบริหารกิจการ',
                '2. อัตราดอกเบี้ยคงที่และโปร่งใส: สามารถวางแผนต้นทุนทางการเงินล่วงหน้าได้อย่างแม่นยำ',
                '3. สิทธิประโยชน์ทางภาษี: ค่างวดและค่าเสื่อมราคาสามารถนำมาหักลดหย่อนภาษีนิติบุคคลได้ตามกฎหมาย',
                '4. เครื่องจักรกลายเป็นกรรมสิทธิ์ของบริษัททันทีเมื่อชำระครบตามสัญญา',
            ],
            contentEn: [
                'Acquiring high-performance industrial machinery is vital for modern manufacturing growth. However, using large cash reserves upfront can restrict operational working capital.',
                'Machinery Hire Purchase allows factories to install and operate equipment immediately to generate revenue, while spreading capital costs across 12 to 60 flexible monthly installments.',
                'Key Benefits with Agile Assets:',
                '1. Preserve Cash Reserves: Maintain healthy operational liquidity.',
                '2. Transparent Fixed Rates: Accurate long-term financial planning.',
                '3. Corporate Tax Deductions: Depreciation and interest allowances under applicable regulations.',
                '4. Full Ownership Transfer upon completion of the agreement term.',
            ],
        },
        {
            id: 'article-2',
            titleTh: 'วิธีคำนวณอัตราดอกเบี้ยคงที่ (Flat Rate) vs ดอกเบี้ยลดต้นลดดอก (Effective Rate)',
            titleEn: 'Understanding Flat Rate vs. Effective Rate for Equipment Financing',
            category: 'interest',
            categoryTh: 'การคำนวณและดอกเบี้ย',
            categoryEn: 'Interest & Calculations',
            date: '28 เมษายน 2026',
            readTimeTh: '5 นาที',
            readTimeEn: '5 min read',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
            excerptTh: 'ทำความเข้าใจความแตกต่างของวิธีการคิดดอกเบี้ยทั้งสองแบบ เพื่อเปรียบเทียบและวางแผนต้นทุนทางการเงินได้อย่างถูกต้อง',
            excerptEn: 'Learn how to compare flat rate and effective interest calculations to accurately project your true financing costs.',
            contentTh: [
                'ในการขอสินเชื่อเพื่อการพาณิชย์และเช่าซื้อเครื่องจักร ผู้ประกอบการมักจะพบคำว่า Flat Rate และ Effective Rate ซึ่งมีความหมายและวิธีการคิดที่แตกต่างกันอย่างสิ้นเชิง',
                '1. อัตราดอกเบี้ยคงที่ (Flat Rate): ดอกเบี้ยจะถูกคำนวณจากยอดวงเงินกู้ตั้งต้นตลอดอายุสัญญา ทำให้ค่างวดในแต่ละเดือนมีจำนวนเท่ากันทุกงวด เข้าใจง่าย และวางแผนการเงินได้สะดวก',
                '2. อัตราดอกเบี้ยลดต้นลดดอก (Effective Rate): ดอกเบี้ยจะถูกคำนวณจากเงินต้นคงเหลือจริงในแต่ละงวด เมื่อเงินต้นลดลง ดอกเบี้ยในงวดถัดไปก็จะลดลงตามไปด้วย',
                'สูตรแปลง Flat Rate เป็น Effective Rate โดยประมาณ:',
                'Effective Rate ≈ Flat Rate × 1.8 (สำหรับสัญญาผ่อนชำระ 3-5 ปี)',
                'ที่ Agile Assets เรามีเครื่องคำนวณสินเชื่อ (Financing Calculator) และตารางแปลงดอกเบี้ยที่ช่วยให้ผู้ประกอบการเห็นข้อมูลต้นทุนที่แท้จริงอย่างโปร่งใส',
            ],
            contentEn: [
                'When financing industrial machinery, business owners frequently encounter Flat Rate and Effective Rate models.',
                '1. Flat Rate: Interest is calculated on the original principal throughout the entire term, ensuring identical monthly repayments for easy budgeting.',
                '2. Effective Rate: Interest is calculated on the remaining outstanding principal balance each period.',
                'Approximate Conversion Rule: Effective Rate ≈ Flat Rate × 1.8 (for 3-5 year installment terms).',
                'Agile Assets provides built-in calculators and rate conversion tools for 100% financial transparency.',
            ],
        },
        {
            id: 'article-3',
            titleTh: 'การวางแผนภาษีและค่าเสื่อมราคาเครื่องจักรสำหรับโรงงานอุตสาหกรรม',
            titleEn: 'Tax Planning & Asset Depreciation Strategies for Industrial Plants',
            category: 'management',
            categoryTh: 'การบริหารการเงินโรงงาน',
            categoryEn: 'Factory Financial Management',
            date: '10 เมษายน 2026',
            readTimeTh: '6 นาที',
            readTimeEn: '6 min read',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            excerptTh: 'แนวทางการบันทึกบัญชีและการใช้ประโยชน์จากค่าเสื่อมราคาเครื่องจักรและสัญญาเช่าทางการเงินเพื่อประโยชน์สูงสุดของธุรกิจ',
            excerptEn: 'Strategic insights into asset accounting, depreciation schedules, and tax optimization under leasing contracts.',
            contentTh: [
                'การลงทุนในเครื่องจักรอุตสาหกรรมไม่เพียงแต่ช่วยเพิ่มผลผลิต แต่ยังสามารถสร้างข้อได้เปรียบทางภาษีให้กับโรงงานได้อย่างมีนัยสำคัญ',
                'ประเด็นสำคัญด้านภาษีที่ผู้ประกอบการควรรู้:',
                '1. การคิดค่าเสื่อมราคา (Depreciation): เครื่องจักรโรงงานสามารถหักค่าเสื่อมราคาได้ตามอัตราที่กรมสรรพากรกำหนด (ปกติ 20% ต่อปี นาน 5 ปี)',
                '2. สิทธิประโยชน์การลงทุนจาก BOI: โรงงานที่ได้รับการส่งเสริมการลงทุนสามารถยกเว้นอากรขาเข้าเครื่องจักรและยกเว้นภาษีเงินได้นิติบุคคลเพิ่มเติม',
                '3. ดอกเบี้ยจ่ายตามสัญญาเช่าซื้อ: ดอกเบี้ยที่จ่ายในแต่ละงวดสามารถนำมาบันทึกเป็นค่าใช้จ่ายในการดำเนินงานได้เต็มจำนวน',
            ],
            contentEn: [
                'Investing in high-grade industrial equipment enhances production capacity while providing substantial tax efficiency.',
                'Key Corporate Tax Benefits:',
                '1. Machinery Depreciation: Standard asset depreciation write-offs (typically 20% per year over 5 years).',
                '2. BOI Privileges: Potential duty-free machinery imports and corporate income tax holidays.',
                '3. Tax-Deductible Financing Interest: Interest payments are recognized as valid operational expenses.',
            ],
        },
        {
            id: 'article-4',
            titleTh: 'เทรนด์เครื่องจักรประหยัดพลังงานและการลงทุนพลังงานแสงอาทิตย์ (Solar Rooftop)',
            titleEn: 'Energy-Efficient Machinery & Solar Rooftop Investment Trends',
            category: 'esg',
            categoryTh: 'เทคโนโลยีและ ESG',
            categoryEn: 'Green Tech & ESG',
            date: '22 มีนาคม 2026',
            readTimeTh: '5 นาที',
            readTimeEn: '5 min read',
            image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80',
            excerptTh: 'การปรับเปลี่ยนเครื่องจักรสู่เทคโนโลยีสีเขียวและพลังงานสะอาด เพื่อลดต้นทุนค่าไฟฟ้าและสร้างความยั่งยืนตามมาตรฐาน ESG',
            excerptEn: 'How upgrading to green machinery and solar power generation lowers utility bills and fulfills ESG compliance standards.',
            contentTh: [
                'ค่าไฟฟ้าและพลังงานเป็นหนึ่งในต้นทุนผันแปรที่สูงที่สุดของภาคการผลิต การปรับเปลี่ยนเครื่องจักรรุ่นเก่ามาเป็นรุ่น Inverter และมอเตอร์ประสิทธิภาพสูง (IE3/IE4) สามารถลดการใช้พลังงานได้ถึง 20 - 40%',
                'นอกจากนี้ การติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาโรงงาน (Solar Rooftop) ยังช่วยให้โรงงานผลิตไฟฟ้าใช้เองในเวลากลางวัน ซึ่งเป็นช่วงเวลาที่ค่าไฟฟ้าแบบ TOU มีอัตราสูงสุด',
                'Agile Assets ให้การสนับสนุนสินเชื่อสีเขียว (Green & ESG Financing) สำหรับโครงการประหยัดพลังงานและโซลาร์เซลล์โรงงาน ด้วยเงื่อนไขพิเศษและระยะเวลาผ่อนชำระที่สอดคล้องกับระยะเวลาคืนทุน',
            ],
            contentEn: [
                'Electricity constitutes one of the largest ongoing expenses in manufacturing. Replacing older equipment with high-efficiency inverter-driven machinery (IE3/IE4) reduces power draw by 20–40%.',
                'Coupled with commercial solar rooftop installations, factories generate peak day-time clean power during high TOU tariff periods.',
                'Agile Assets provides specialized Green & ESG Financing tailored to energy payback schedules.',
            ],
        },
        {
            id: 'article-5',
            titleTh: '5 ขั้นตอนเตรียมเอกสารขอสินเชื่อเครื่องจักรให้ผ่านฉลุยใน 24 - 48 ชั่วโมง',
            titleEn: '5 Essential Steps to Expedite Equipment Loan Approval in 24–48 Hours',
            category: 'financing',
            categoryTh: 'สินเชื่อและการเช่าซื้อ',
            categoryEn: 'Machinery Financing',
            date: '08 มีนาคม 2026',
            readTimeTh: '3 นาที',
            readTimeEn: '3 min read',
            image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80',
            excerptTh: 'เช็กลิสต์เอกสารทางธุรกิจ งบการเงิน และใบเสนอราคาเครื่องจักรที่ต้องเตรียม เพื่อให้ขั้นตอนพิจารณาอนุมัติรวดเร็วที่สุด',
            excerptEn: 'Comprehensive document checklist and best practices to ensure seamless turnaround and rapid funding approval.',
            contentTh: [
                'ความรวดเร็วในการจัดหาเครื่องจักรหมายถึงโอกาสในการรับงานและขยายตลาดก่อนคู่แข่ง การเตรียมเอกสารให้พร้อมจะช่วยให้กระบวนการพิจารณาอนุมัติของ Agile Assets เสร็จสิ้นได้ภายใน 24 - 48 ชั่วโมง',
                'เอกสารที่ต้องจัดเตรียม:',
                '1. หนังสือรับรองบริษัทและวัตถุประสงค์ (อายุไม่เกิน 3 เดือน)',
                '2. ภ.พ.20 และสำเนาบัตรประชาชนกรรมการผู้มีอำนาจลงนาม',
                '3. งบการเงินย้อนหลัง 3 ปี (ที่ผ่านการตรวจสอบโดยผู้สอบบัญชีรับอนุญาต)',
                '4. รายการเดินบัญชีธนาคาร (Bank Statement) ย้อนหลัง 6 เดือน',
                '5. ใบเสนอราคาเครื่องจักร (Quotation / Proforma Invoice) และสเปกเครื่องจักร',
            ],
            contentEn: [
                'Speed to market allows manufacturers to fulfill new production contracts ahead of competitors.',
                'Required Documentation Checklist:',
                '1. Company registration affidavit & objectives (issued within 3 months).',
                '2. PP.20 VAT certificate and directors’ ID cards.',
                '3. Past 3 years audited financial statements.',
                '4. 6-month bank statements.',
                '5. Official machinery quotation / Proforma Invoice & technical specification sheet.',
            ],
        },
        {
            id: 'article-6',
            titleTh: 'เทคนิคการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance) เพื่อรักษามูลค่าสินทรัพย์',
            titleEn: 'Preventive Maintenance Strategies to Preserve Industrial Asset Value',
            category: 'management',
            categoryTh: 'การบริหารการเงินโรงงาน',
            categoryEn: 'Factory Financial Management',
            date: '18 กุมภาพันธ์ 2026',
            readTimeTh: '4 นาที',
            readTimeEn: '4 min read',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
            excerptTh: 'การวางแผนการตรวจเช็กและซ่อมบำรุงเครื่องจักรตามรอบเวลา เพื่อป้องกันสายการผลิตสะดุดและรักษามูลค่าตลาดของเครื่องจักร',
            excerptEn: 'Maintenance schedules and operational discipline that keep machinery in peak performance and extend asset lifespan.',
            contentTh: [
                'เครื่องจักรอุตสาหกรรมเป็นสินทรัพย์ที่มีมูลค่าสูง การบำรุงรักษาเชิงป้องกัน (Preventive Maintenance หรือ PM) เป็นกลยุทธ์สำคัญที่ป้องกันความเสียหายใหญ่ก่อนเกิดขึ้น',
                'ประโยชน์ของการทำ PM อย่างสม่ำเสมอ:',
                '1. ลดเวลาเครื่องจักรหยุดทำงาน (Zero Unplanned Downtime)',
                '2. รักษาระดับคุณภาพของชิ้นงานให้ได้มาตรฐานสม่ำเสมอ',
                '3. ยืดอายุการใช้งานของชิ้นส่วนสำคัญ เช่น มอเตอร์ ไฮดรอลิก และระบบระบายความร้อน',
                '4. รักษามูลค่าการประเมินราคาของสินทรัพย์ในกรณีต้องการ Re-financing หรือขายเปลี่ยนรุ่นในอนาคต',
            ],
            contentEn: [
                'Industrial equipment represents major capital. Structured Preventive Maintenance (PM) prevents unexpected operational downtime.',
                'Key Operational Advantages:',
                '1. Eliminate unplanned line stoppages.',
                '2. Ensure consistent part tolerances and output quality.',
                '3. Extend lifespan of hydraulic, thermal, and motor components.',
                '4. Retain high secondary market resale and refinancing valuation.',
            ],
        },
    ];

    const categories = [
        { id: 'all', labelTh: 'ทั้งหมด', labelEn: 'All Categories' },
        { id: 'financing', labelTh: 'สินเชื่อและเช่าซื้อ', labelEn: 'Machinery Financing' },
        { id: 'interest', labelTh: 'การคำนวณและดอกเบี้ย', labelEn: 'Interest & Rates' },
        { id: 'management', labelTh: 'การบริหารการเงินโรงงาน', labelEn: 'Factory Management' },
        { id: 'esg', labelTh: 'เทคโนโลยีและ ESG', labelEn: 'Green Tech & ESG' },
    ];

    const filteredArticles = articles.filter((article) => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === '' ||
            article.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerptTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerptEn.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const scrollToKnowledge = () => {
        const el = document.getElementById('knowledge');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pageTitle = lang === 'th'
        ? 'คลังความรู้ (Knowledge Center) | Agile Assets สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม'
        : 'Knowledge Center | Agile Assets - Industrial Machinery Financing Insights';
    const pageDescription = lang === 'th'
        ? 'ศูนย์รวมบทความ ความรู้ด้านการเช่าซื้อเครื่องจักรอุตสาหกรรม การคำนวณอัตราดอกเบี้ย การบริหารเงินทุน และเทรนด์ ESG โรงงาน'
        : 'Agile Assets Knowledge Center — Comprehensive guides on machinery leasing, interest calculations, financial management, and ESG sustainability.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/knowledge/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets Knowledge Center"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/15 via-transparent to-black/80" />
                        
                        {/* Soft Bottom Fog/Fade Gradient into next section */}
                        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-down">
                            {/* Breadcrumb / Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/30 text-xs font-semibold text-sky-300 mb-5 shadow-lg shadow-sky-500/10">
                                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                                <span>Knowledge Center · Financial & Machinery Insights</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-xl sm:text-3xl font-semibold text-sky-200/90 mb-3 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl font-sans mb-4 bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                                Knowledge Center
                            </h1>
                            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md mb-8">
                                {lang === 'th'
                                    ? 'ศูนย์รวมบทความและคู่มือวางแผนทางการเงิน จัดซื้อเครื่องจักร และเทรนด์ ESG เพื่อการเติบโตอย่างยั่งยืน'
                                    : 'Comprehensive guides on machinery financing, interest rate strategies, and industrial ESG innovations.'}
                            </p>

                            {/* Learn More Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToKnowledge}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <span>Learn More</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. คลังความรู้ (Main Knowledge Section) ─── */}
                <section id="knowledge" className="relative py-16 sm:py-24 overflow-hidden bg-background">
                    {/* Subtle Silk Wave Gradients */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
                        <svg className="absolute w-full h-full object-cover" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-100,300 C400,100 900,600 1600,200" stroke="url(#knowWaveGrad1)" strokeWidth="1.5" strokeDasharray="6 6" />
                            <path d="M-50,500 C450,250 950,750 1600,350" stroke="url(#knowWaveGrad2)" strokeWidth="2" />
                            <defs>
                                <linearGradient id="knowWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="knowWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
                                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px]" />
                        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 shadow-sm border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                                    Knowledge Center
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans mb-4 bg-gradient-to-r from-blue-900 via-sky-600 to-blue-800 dark:from-white dark:via-sky-200 dark:to-sky-400 bg-clip-text text-transparent">
                                    {lang === 'th' ? 'คลังความรู้' : 'Knowledge & Insights'}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                    {lang === 'th'
                                        ? 'เจาะลึกองค์ความรู้ เทคนิค และโซลูชันทางการเงินเพื่อการตัดสินใจที่แม่นยำ'
                                        : 'In-depth financial intelligence, calculator guides, and industrial strategies.'}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Search & Category Filter Bar */}
                        <div className="mb-12 space-y-4">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                {/* Category Buttons */}
                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                                selectedCategory === cat.id
                                                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                                                    : 'glass border border-slate-200 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:border-sky-500/30'
                                            }`}
                                        >
                                            {lang === 'th' ? cat.labelTh : cat.labelEn}
                                        </button>
                                    ))}
                                </div>

                                {/* Search Box */}
                                <div className="relative w-full md:w-72">
                                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder={lang === 'th' ? 'ค้นหาบทความ...' : 'Search articles...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Articles Grid */}
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">
                                    {lang === 'th' ? 'ไม่พบบทความที่ตรงกับการค้นหา' : 'No articles found matching your query.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                                {filteredArticles.map((article, idx) => (
                                    <ScrollReveal key={article.id} animation="fade-up" delay={idx * 60}>
                                        <div
                                            onClick={() => setActiveArticle(article)}
                                            className="h-full flex flex-col glass rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group cursor-pointer"
                                        >
                                            {/* Thumbnail Image */}
                                            <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={article.image}
                                                    alt={lang === 'th' ? article.titleTh : article.titleEn}
                                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-sky-500/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md shadow-sky-500/20">
                                                    {lang === 'th' ? article.categoryTh : article.categoryEn}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Meta Info */}
                                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{article.date}</span>
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{lang === 'th' ? article.readTimeTh : article.readTimeEn}</span>
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-2 mb-2 font-sans">
                                                        {lang === 'th' ? article.titleTh : article.titleEn}
                                                    </h3>

                                                    {/* Excerpt */}
                                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                                        {lang === 'th' ? article.excerptTh : article.excerptEn}
                                                    </p>
                                                </div>

                                                {/* Read More Link */}
                                                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                                    <span>{lang === 'th' ? 'อ่านรายละเอียด' : 'Read Article'}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}

                        {/* CTA Box */}
                        <ScrollReveal animation="fade-up">
                            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-500/20">
                                <div className="text-center md:text-left space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold font-sans">
                                        {lang === 'th' ? 'พร้อมวางแผนการเงินสำหรับเครื่องจักรของคุณ?' : 'Ready to Structure Your Machinery Financing?'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                                        {lang === 'th'
                                            ? 'ทีมผู้เชี่ยวชาญด้านสินเชื่อเครื่องจักรของ Agile Assets พร้อมให้คำปรึกษาและคำนวณวงเงินที่เหมาะสมกับธุรกิจคุณ'
                                            : 'Our industrial finance advisory team is ready to evaluate your machinery acquisition and cash flow structure.'}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                                    <a
                                        href="https://line.me/R/ti/p/%40884ukedb"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <DollarSign className="w-4 h-4" />
                                        <span>{lang === 'th' ? 'ปรึกษาขอสินเชื่อ' : 'Apply for Financing'}</span>
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigate('/#calculator');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <Calculator className="w-4 h-4" />
                                        <span>{lang === 'th' ? 'คำนวณค่างวด' : 'Loan Calculator'}</span>
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 3. Article Modal / Reader ─── */}
                {activeArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
                        <div
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveArticle(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Category Badge & Meta */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-lg bg-blue-900/10 dark:bg-blue-900/40 text-blue-900 dark:text-sky-300 text-xs font-bold">
                                    {lang === 'th' ? activeArticle.categoryTh : activeArticle.categoryEn}
                                </span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs text-slate-400">{activeArticle.date}</span>
                            </div>

                            {/* Article Title */}
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans mb-5 leading-snug">
                                {lang === 'th' ? activeArticle.titleTh : activeArticle.titleEn}
                            </h2>

                            {/* Hero Image in Modal */}
                            <div className="rounded-2xl overflow-hidden mb-6 aspect-16/9 bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={activeArticle.image}
                                    alt={lang === 'th' ? activeArticle.titleTh : activeArticle.titleEn}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Article Body */}
                            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                {(lang === 'th' ? activeArticle.contentTh : activeArticle.contentEn).map((para, pIdx) => (
                                    <p key={pIdx} className={para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') || para.startsWith('4.') || para.startsWith('5.') ? 'font-medium pl-2' : ''}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Modal Footer CTA */}
                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                <div className="text-xs text-slate-400">
                                    {lang === 'th' ? 'เผยแพร่โดย ฝ่ายวิเคราะห์สินเชื่อ Agile Assets' : 'Published by Agile Assets Credit Advisory Team'}
                                </div>
                                <a
                                    href="https://line.me/R/ti/p/%40884ukedb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs tracking-wide shadow-md hover:scale-105 transition-all"
                                >
                                    {lang === 'th' ? 'ปรึกษาผู้เชี่ยวชาญ' : 'Contact Consultant'}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
