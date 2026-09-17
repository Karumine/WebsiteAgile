import { useState, useMemo } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PageCustomContent, PageSectionItem } from '@/types';
import { 
    FileEdit, Save, RotateCcw, ExternalLink, Plus, Trash2, 
    Search, Layers, Sparkles, CheckCircle, Image as ImageIcon,
    Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PageDefinition {
    id: string;
    category: string;
    nameTh: string;
    nameEn: string;
    path: string;
    defaultHeroTitleTh: string;
    defaultHeroTitleEn: string;
    defaultHeroSubtitleTh: string;
    defaultHeroSubtitleEn: string;
    defaultBadgeTh: string;
    defaultBadgeEn: string;
    defaultImage: string;
    defaultCtaTextTh?: string;
    defaultCtaLink?: string;
}

const PAGES_LIST: PageDefinition[] = [
    // 1. หน้าหลักและทั่วไป
    {
        id: 'home',
        category: 'หน้าหลัก',
        nameTh: 'หน้าแรก (Home Page)',
        nameEn: 'Home Page',
        path: '/',
        defaultHeroTitleTh: 'Growth – Good Capital',
        defaultHeroTitleEn: 'Growth – Good Capital',
        defaultHeroSubtitleTh: 'ทุนเติบโต - ดี - งาม — Agile Assets ผู้ให้บริการสินเชื่อเครื่องจักรและโซลูชันทางการเงินเพื่อการเติบโตอย่างยั่งยืน',
        defaultHeroSubtitleEn: 'Premier equipment financing and bespoke capital solutions empowering enterprises with speed and transparency.',
        defaultBadgeTh: 'AGILE ASSETS',
        defaultBadgeEn: 'AGILE ASSETS',
        defaultImage: '/assets/Hero-Banner-Website-3-scaled.png',
        defaultCtaTextTh: 'Financing with Us',
        defaultCtaLink: '#financing',
    },
    {
        id: 'about',
        category: 'หน้าหลัก',
        nameTh: 'เกี่ยวกับเรา (About Us)',
        nameEn: 'About Us',
        path: '/about',
        defaultHeroTitleTh: 'เรื่องราวและวิสัยทัศน์ของเรา',
        defaultHeroTitleEn: 'Our Vision & Purpose',
        defaultHeroSubtitleTh: 'มุ่งมั่นสนับสนุนผู้ประกอบการไทยด้วยเงินทุนเครื่องจักรและเทคโนโลยีสะอาด เพื่อขับเคลื่อนเศรษฐกิจอย่างยั่งยืน',
        defaultHeroSubtitleEn: 'Empowering enterprises with bespoke capital and clean technology for sustainable economic growth.',
        defaultBadgeTh: 'ABOUT US',
        defaultBadgeEn: 'ABOUT US',
        defaultImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        defaultCtaTextTh: 'ร่วมงานกับเรา',
        defaultCtaLink: '/work-for-us',
    },
    {
        id: 'work-for-us',
        category: 'หน้าหลัก',
        nameTh: 'ร่วมงานกับเรา (Work for Us)',
        nameEn: 'Work For Us',
        path: '/work-for-us',
        defaultHeroTitleTh: 'ร่วมงานกับ Agile Assets',
        defaultHeroTitleEn: 'Work with Agile Assets',
        defaultHeroSubtitleTh: 'ร่วมขับเคลื่อนอนาคตอุตสาหกรรมไทยและพลังงานสะอาดไปพร้อมกับเรา เติบโตอย่างก้าวกระโดดด้วยวัฒนธรรมที่เปิดกว้างและสวัสดิการจัดเต็ม',
        defaultHeroSubtitleEn: 'Join us to empower Thai manufacturing with clean tech and dynamic capital. Grow rapidly with an inclusive culture and top-tier benefits.',
        defaultBadgeTh: 'CAREERS & OPPORTUNITIES',
        defaultBadgeEn: 'CAREERS & OPPORTUNITIES',
        defaultImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
        defaultCtaTextTh: 'ดูตำแหน่งงานว่าง',
        defaultCtaLink: '#open-positions',
    },

    // 2. โซลูชันสินเชื่ออุตสาหกรรม
    {
        id: 'drinking-water',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'โรงงานผลิตน้ำดื่ม (Drinking Water)',
        nameEn: 'Drinking Water Production',
        path: '/drinking-water-production',
        defaultHeroTitleTh: 'สินเชื่อเครื่องจักรโรงงานผลิตน้ำดื่ม',
        defaultHeroTitleEn: 'Financing for Drinking Water Production Line',
        defaultHeroSubtitleTh: 'สนับสนุนเงินทุนจัดซื้อเครื่องเป่าขวด PET เครื่องบรรจุน้ำอัตโนมัติความเร็วสูง และระบบกรอง RO',
        defaultHeroSubtitleEn: 'High-speed automated PET bottle blowing, filling line, and industrial RO purification systems.',
        defaultBadgeTh: 'DRINKING WATER INDUSTRY',
        defaultBadgeEn: 'DRINKING WATER INDUSTRY',
        defaultImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=1200&q=80',
        defaultCtaTextTh: 'ขอสินเชื่อโรงงานน้ำดื่ม',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'livestock-farm',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'ฟาร์มปศุสัตว์ (Livestock Farm)',
        nameEn: 'Livestock Farm Equipment',
        path: '/livestock-farm',
        defaultHeroTitleTh: 'สินเชื่อเครื่องจักรและอุปกรณ์ฟาร์มปศุสัตว์',
        defaultHeroTitleEn: 'Financing for Livestock & Smart Farming',
        defaultHeroSubtitleTh: 'ระบบระบายอากาศ EVAP พัดลมฟาร์มอัจฉริยะ ระบบให้อาหารอัตโนมัติ และระบบควบคุมความชื้นมาตรฐานสากล',
        defaultHeroSubtitleEn: 'EVAP cooling systems, intelligent livestock ventilation, and automated feed distribution lines.',
        defaultBadgeTh: 'SMART LIVESTOCK FARM',
        defaultBadgeEn: 'SMART LIVESTOCK FARM',
        defaultImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
        defaultCtaTextTh: 'ขอคำปรึกษาสินเชื่อฟาร์ม',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'food-processing',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'โรงงานแปรรูปอาหาร (Food Processing)',
        nameEn: 'Food Processing Plant',
        path: '/food-processing',
        defaultHeroTitleTh: 'สินเชื่อเครื่องจักรแปรรูปและบรรจุอาหาร',
        defaultHeroTitleEn: 'Financing for Food Processing & Packaging',
        defaultHeroSubtitleTh: 'ห้องเย็นอุตสาหกรรม เครื่องบรรจุสุญญากาศ สายพานลำเลียงสแตนเลส มาตรฐานสุขอนามัย GMP/HACCP',
        defaultHeroSubtitleEn: 'Cold storage, vacuum packaging, and sanitary stainless steel conveyor lines compliant with GMP/HACCP.',
        defaultBadgeTh: 'FOOD & BEVERAGE INDUSTRY',
        defaultBadgeEn: 'FOOD & BEVERAGE INDUSTRY',
        defaultImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
        defaultCtaTextTh: 'ยื่นขอสินเชื่อแปรรูปอาหาร',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'biogas-production',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'โรงไฟฟ้าก๊าซชีวภาพ (Biogas Production)',
        nameEn: 'Biogas Power Generation',
        path: '/biogas-production',
        defaultHeroTitleTh: 'สินเชื่อระบบผลิตไฟฟ้าจากก๊าซชีวภาพ (Biogas)',
        defaultHeroTitleEn: 'Financing for Biogas Power Generation',
        defaultHeroSubtitleTh: 'เปลี่ยนน้ำเสียและของเสียเกษตรกรรมเป็นพลังงานไฟฟ้าสะอาด ด้วยระบบบ่อหมัก CSTR เครื่องกำเนิดไฟฟ้าก๊าซชีวภาพ และระบบดักความชื้น',
        defaultHeroSubtitleEn: 'Convert agricultural waste into green power with anaerobic digesters, gas scrubbers, and CHP generators.',
        defaultBadgeTh: 'GREEN ENERGY & BIOGAS',
        defaultBadgeEn: 'GREEN ENERGY & BIOGAS',
        defaultImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80',
        defaultCtaTextTh: 'ขอสินเชื่อระบบก๊าซชีวภาพ',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'solar-power',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'พลังงานแสงอาทิตย์ (Solar Rooftop)',
        nameEn: 'Solar Power Generation',
        path: '/solar-power-generation',
        defaultHeroTitleTh: 'สินเชื่อติดตั้ง Solar Rooftop โรงงานอุตสาหกรรม',
        defaultHeroTitleEn: 'Industrial Solar Rooftop Financing',
        defaultHeroSubtitleTh: 'ลดค่าไฟฟ้าโรงงานได้สูงสุด 40-70% พร้อมยกระดับสู่ Carbon Neutrality ดอกเบี้ยพิเศษ Green Loan ผ่อนนานสูงสุด 84 เดือน',
        defaultHeroSubtitleEn: 'Reduce utility costs up to 70% and reach corporate ESG goals with low-interest Green financing up to 84 months.',
        defaultBadgeTh: 'CLEAN ENERGY SOLUTION',
        defaultBadgeEn: 'CLEAN ENERGY SOLUTION',
        defaultImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&q=80',
        defaultCtaTextTh: 'คำนวณสินเชื่อโซลาร์เซลล์',
        defaultCtaLink: '/calculator',
    },
    {
        id: 'chiller',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'เครื่องทำความเย็น (Industrial Chiller)',
        nameEn: 'Industrial Chiller',
        path: '/chiller',
        defaultHeroTitleTh: 'สินเชื่อระบบชิลเลอร์ระบายความร้อนอุตสาหกรรม',
        defaultHeroTitleEn: 'Financing for Industrial Water & Air Chillers',
        defaultHeroSubtitleTh: 'เพิ่มประสิทธิภาพสายการผลิต ควบคุมอุณหภูมิแม่นยำ ประหยัดพลังงานด้วยระบบ Magnetic Bearing Inverter',
        defaultHeroSubtitleEn: 'High-efficiency industrial water-cooled and air-cooled magnetic bearing inverter chillers.',
        defaultBadgeTh: 'CHILLER & HVAC SOLUTION',
        defaultBadgeEn: 'CHILLER & HVAC SOLUTION',
        defaultImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
        defaultCtaTextTh: 'ขอสินเชื่อชิลเลอร์',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'injection-molding',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'เครื่องฉีดพลาสติก (Injection Molding)',
        nameEn: 'Injection Molding Machine',
        path: '/injection-molding-machine',
        defaultHeroTitleTh: 'สินเชื่อเครื่องฉีดพลาสติกแม่นยำสูง',
        defaultHeroTitleEn: 'Financing for Plastic Injection Molding Machines',
        defaultHeroSubtitleTh: 'รองรับการผลิตบรรจุภัณฑ์ ชิ้นส่วนยานยนต์ และอิเล็กทรอนิกส์ ระบบไฮดรอลิกเซอร์โวและเครื่อง All-Electric',
        defaultHeroSubtitleEn: 'High-precision servo-hydraulic and all-electric injection machines for automotive and packaging parts.',
        defaultBadgeTh: 'PLASTIC INJECTION MOLDING',
        defaultBadgeEn: 'PLASTIC INJECTION MOLDING',
        defaultImage: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Injection-Machine-Agile-Assets-1024x683.jpg',
        defaultCtaTextTh: 'ยื่นกู้เครื่องฉีดพลาสติก',
        defaultCtaLink: '/leasing-application',
    },
    {
        id: 'generator-set',
        category: 'สินเชื่ออุตสาหกรรม',
        nameTh: 'เครื่องกำเนิดไฟฟ้า (Generator Set)',
        nameEn: 'Industrial Generator Set',
        path: '/generator-set',
        defaultHeroTitleTh: 'สินเชื่อเครื่องกำเนิดไฟฟ้าดีเซลสำรองฉุกเฉิน',
        defaultHeroTitleEn: 'Financing for Heavy-Duty Diesel Generator Sets',
        defaultHeroSubtitleTh: 'ความจุตั้งแต่ 50 kVA ถึง 2,500 kVA พร้อมตู้เก็บเสียง Soundproof และตู้สลับแหล่งจ่ายไฟอัตโนมัติ ATS',
        defaultHeroSubtitleEn: 'Reliable emergency standby and continuous power generation with ATS panels from 50 to 2,500 kVA.',
        defaultBadgeTh: 'POWER GENERATOR SOLUTION',
        defaultBadgeEn: 'POWER GENERATOR SOLUTION',
        defaultImage: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Generator-Agile-Assets-1024x683.jpg',
        defaultCtaTextTh: 'ขอสินเชื่อเครื่องปั่นไฟ',
        defaultCtaLink: '/leasing-application',
    },

    // 3. องค์กรและบริการ
    {
        id: 'sustainability',
        category: 'องค์กรและบริการ',
        nameTh: 'ความยั่งยืน & ESG (Sustainability)',
        nameEn: 'Sustainability & ESG',
        path: '/sustainability',
        defaultHeroTitleTh: 'ขับเคลื่อนความยั่งยืนด้วย Good Capital',
        defaultHeroTitleEn: 'Sustainability Strategy & ESG Impact',
        defaultHeroSubtitleTh: 'พันธกิจในการสนับสนุนอุตสาหกรรมสีเขียว ลดการปล่อยก๊าซเรือนกระจก และสร้างคุณค่าระยะยาวให้แก่สังคมไทย',
        defaultHeroSubtitleEn: 'Financing green transformation, decarbonization, and ESG-aligned operations for Thai enterprises.',
        defaultBadgeTh: 'ESG & SUSTAINABILITY',
        defaultBadgeEn: 'ESG & SUSTAINABILITY',
        defaultImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80',
    },
    {
        id: 'investor-relations',
        category: 'องค์กรและบริการ',
        nameTh: 'นักลงทุนสัมพันธ์ (Investor Relations)',
        nameEn: 'Investor Relations',
        path: '/investor-relations',
        defaultHeroTitleTh: 'นักลงทุนสัมพันธ์ Agile Assets',
        defaultHeroTitleEn: 'Investor Relations Portal',
        defaultHeroSubtitleTh: 'ข้อมูลทางการเงิน นโยบายการกำกับดูแลกิจการ และรายงานประจำปีเพื่อความโปร่งใสสูงสุดต่อนักลงทุน',
        defaultHeroSubtitleEn: 'Financial disclosures, corporate governance standards, and operational reports for stakeholders.',
        defaultBadgeTh: 'INVESTOR RELATIONS',
        defaultBadgeEn: 'INVESTOR RELATIONS',
        defaultImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    },
    {
        id: 'projects',
        category: 'องค์กรและบริการ',
        nameTh: 'โครงการ & กิจกรรม (Projects & Activity)',
        nameEn: 'Projects & Activity',
        path: '/project',
        defaultHeroTitleTh: 'โครงการและกิจกรรมความสำเร็จ',
        defaultHeroTitleEn: 'Our Projects & Key Milestones',
        defaultHeroSubtitleTh: 'ภาพความสำเร็จในการส่งมอบเครื่องจักรและร่วมมือกับโรงงานอุตสาหกรรมชั้นนำทั่วประเทศ',
        defaultHeroSubtitleEn: 'Showcase of completed machinery deliveries and successful corporate partnerships nationwide.',
        defaultBadgeTh: 'PROJECTS & ACTIVITY',
        defaultBadgeEn: 'PROJECTS & ACTIVITY',
        defaultImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    },
    {
        id: 'contact',
        category: 'องค์กรและบริการ',
        nameTh: 'ติดต่อเรา (Contact Us)',
        nameEn: 'Contact Us',
        path: '/contact',
        defaultHeroTitleTh: 'ติดต่อทีมงาน Agile Assets',
        defaultHeroTitleEn: 'Get in Touch with Our Specialists',
        defaultHeroSubtitleTh: 'ปรึกษาทีมผู้เชี่ยวชาญด้านสินเชื่อเครื่องจักร หรือติดต่อสำนักงานใหญ่ ยินดีให้บริการทุกวันทำการ',
        defaultHeroSubtitleEn: 'Consult our equipment credit specialists or visit our headquarters. We are ready to assist you.',
        defaultBadgeTh: 'CONTACT US',
        defaultBadgeEn: 'CONTACT US',
        defaultImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        defaultCtaTextTh: 'ส่งข้อความติดต่อ',
        defaultCtaLink: '#contact-form',
    },
    {
        id: 'calculator',
        category: 'เครื่องมือและข้อตกลง',
        nameTh: 'คำนวณสินเชื่อ (Financing Calculator)',
        nameEn: 'Loan Calculator',
        path: '/calculator',
        defaultHeroTitleTh: 'โปรแกรมคำนวณค่างวดสินเชื่อเครื่องจักร',
        defaultHeroTitleEn: 'Financing Installment Calculator',
        defaultHeroSubtitleTh: 'วางแผนทางการเงินล่วงหน้า จำลองค่างวดต่อเดือน อัตราดอกเบี้ย และเงินดาวน์ได้อย่างแม่นยำ',
        defaultHeroSubtitleEn: 'Simulate monthly installments, interest expenses, and cash flow structures with precision.',
        defaultBadgeTh: 'CALCULATOR TOOL',
        defaultBadgeEn: 'CALCULATOR TOOL',
        defaultImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    },
    {
        id: 'interest-rate',
        category: 'เครื่องมือและข้อตกลง',
        nameTh: 'แปลงอัตราดอกเบี้ย (Interest Rate Conversion)',
        nameEn: 'Interest Rate Converter',
        path: '/interest-rate-conversion',
        defaultHeroTitleTh: 'เครื่องมือเปรียบเทียบอัตราดอกเบี้ย',
        defaultHeroTitleEn: 'Interest Rate Conversion Tool',
        defaultHeroSubtitleTh: 'แปลงระหว่าง Flat Rate (อัตราคงที่) และ Effective Rate (อัตราลดต้นลดดอก) เพื่อการตัดสินใจที่ดีที่สุด',
        defaultHeroSubtitleEn: 'Compare Flat Rate and Effective Interest Rates easily to make informed financing choices.',
        defaultBadgeTh: 'RATE CONVERTER',
        defaultBadgeEn: 'RATE CONVERTER',
        defaultImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    },
    {
        id: 'nc-nda',
        category: 'เครื่องมือและข้อตกลง',
        nameTh: 'สัญญา NC-NDA (Non-Disclosure Agreement)',
        nameEn: 'NC-NDA Agreement',
        path: '/nc-nda',
        defaultHeroTitleTh: 'สัญญาการไม่เปิดเผยและรักษาความลับ (NC-NDA)',
        defaultHeroTitleEn: 'Non-Circumvention & Non-Disclosure Agreement',
        defaultHeroSubtitleTh: 'ความคุ้มครองทางกฎหมายและมาตรฐานการรักษาความลับทางการค้าสำหรับคู่ค้าและลูกค้าทุกท่าน',
        defaultHeroSubtitleEn: 'Standard confidentiality and trade secret protection for all business partners and clients.',
        defaultBadgeTh: 'LEGAL AGREEMENT',
        defaultBadgeEn: 'LEGAL AGREEMENT',
        defaultImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80',
    },
    {
        id: 'cookie-policy',
        category: 'เครื่องมือและข้อตกลง',
        nameTh: 'นโยบายคุกกี้ (Cookie & Privacy Policy)',
        nameEn: 'Cookie Policy',
        path: '/cookie-policy',
        defaultHeroTitleTh: 'นโยบายการใช้งานคุกกี้และความเป็นส่วนตัว',
        defaultHeroTitleEn: 'Cookie & Data Privacy Policy',
        defaultHeroSubtitleTh: 'เรียนรู้วิธีการที่เรารักษาความปลอดภัยและจัดการข้อมูลส่วนบุคคลตามมาตรฐาน พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
        defaultHeroSubtitleEn: 'How we process and protect your personal information in strict compliance with the PDPA.',
        defaultBadgeTh: 'PDPA & PRIVACY',
        defaultBadgeEn: 'PDPA & PRIVACY',
        defaultImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80',
    },
];

export function PageContentEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [selectedPageId, setSelectedPageId] = useState<string>('drinking-water');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const activePageDef = useMemo(() => {
        return PAGES_LIST.find((p) => p.id === selectedPageId) || PAGES_LIST[0];
    }, [selectedPageId]);

    // Current page content state (saved or fallback to default)
    const [editContent, setEditContent] = useState<PageCustomContent>(() => {
        const saved = settings.pageContents?.[selectedPageId];
        const def = activePageDef;
        return {
            id: def.id,
            pageName: def.nameTh,
            titleTh: saved?.titleTh || def.defaultHeroTitleTh,
            titleEn: saved?.titleEn || def.defaultHeroTitleEn,
            metaTitle: saved?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: saved?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: saved?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: saved?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: saved?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: saved?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: saved?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: saved?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: saved?.heroImage || def.defaultImage,
            ctaTextTh: saved?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อออนไลน์',
            ctaTextEn: saved?.ctaTextEn || 'Apply for Financing',
            ctaLink: saved?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: saved?.contentTh || '',
            contentEn: saved?.contentEn || '',
            items: saved?.items || [],
        };
    });

    // When selectedPageId changes, reload form
    const handleSelectPage = (pageId: string) => {
        setSelectedPageId(pageId);
        const def = PAGES_LIST.find((p) => p.id === pageId) || PAGES_LIST[0];
        const saved = settings.pageContents?.[pageId];
        setEditContent({
            id: def.id,
            pageName: def.nameTh,
            titleTh: saved?.titleTh || def.defaultHeroTitleTh,
            titleEn: saved?.titleEn || def.defaultHeroTitleEn,
            metaTitle: saved?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: saved?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: saved?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: saved?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: saved?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: saved?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: saved?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: saved?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: saved?.heroImage || def.defaultImage,
            ctaTextTh: saved?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อออนไลน์',
            ctaTextEn: saved?.ctaTextEn || 'Apply for Financing',
            ctaLink: saved?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: saved?.contentTh || '',
            contentEn: saved?.contentEn || '',
            items: saved?.items || [],
        });
    };

    const updateField = <K extends keyof PageCustomContent>(key: K, value: PageCustomContent[K]) => {
        setEditContent((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Equipment / Feature Items manipulation
    const addItem = () => {
        const newItem: PageSectionItem = {
            id: `item-${Date.now()}`,
            title: 'เครื่องจักร / ฟีเจอร์ใหม่',
            titleEn: 'New Equipment / Feature',
            description: 'รายละเอียดคุณสมบัติ ประสิทธิภาพ และประโยชน์ที่ลูกค้าจะได้รับ',
            descEn: 'Specification details, operating efficiency, and commercial benefits.',
            badge: 'คุณสมบัติเด่น',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            link: '/leasing-application',
        };
        setEditContent((prev) => ({
            ...prev,
            items: [...(prev.items || []), newItem],
        }));
    };

    const removeItem = (id: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).filter((item) => item.id !== id),
        }));
    };

    const updateItemField = (id: string, field: keyof PageSectionItem, value: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleSave = () => {
        const existing = settings.pageContents || {};
        const updatedPages = {
            ...existing,
            [selectedPageId]: {
                ...editContent,
                lastUpdated: new Date().toISOString(),
            },
        };

        updateSettings({ pageContents: updatedPages });
        toast.success(
            lang === 'th'
                ? `บันทึกเนื้อหาหน้า "${activePageDef.nameTh}" เรียบร้อยแล้ว!`
                : `Page "${activePageDef.nameEn}" content saved successfully!`
        );
    };

    const handleReset = () => {
        const def = activePageDef;
        const freshDefault: PageCustomContent = {
            id: def.id,
            pageName: def.nameTh,
            titleTh: def.defaultHeroTitleTh,
            titleEn: def.defaultHeroTitleEn,
            metaTitle: `${def.nameTh} | Agile Assets`,
            metaDescription: def.defaultHeroSubtitleTh,
            heroBadgeTh: def.defaultBadgeTh,
            heroBadgeEn: def.defaultBadgeEn,
            heroTitleTh: def.defaultHeroTitleTh,
            heroTitleEn: def.defaultHeroTitleEn,
            heroSubtitleTh: def.defaultHeroSubtitleTh,
            heroSubtitleEn: def.defaultHeroSubtitleEn,
            heroImage: def.defaultImage,
            ctaTextTh: def.defaultCtaTextTh || 'ขอสินเชื่อออนไลน์',
            ctaTextEn: 'Apply for Financing',
            ctaLink: def.defaultCtaLink || '/leasing-application',
            contentTh: '',
            contentEn: '',
            items: [],
        };

        setEditContent(freshDefault);

        const existing = { ...(settings.pageContents || {}) };
        delete existing[selectedPageId];
        updateSettings({ pageContents: existing });

        toast.success(
            lang === 'th'
                ? `รีเซ็ตเนื้อหาหน้า "${def.nameTh}" กลับเป็นค่าเริ่มต้นแล้ว`
                : `Reset "${def.nameEn}" to system defaults.`
        );
    };

    // Filter pages list
    const filteredPages = useMemo(() => {
        return PAGES_LIST.filter((p) => {
            const matchesSearch =
                p.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.path.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const categories = ['all', ...new Set(PAGES_LIST.map((p) => p.category))];

    const isPageCustomized = !!settings.pageContents?.[selectedPageId];

    return (
        <div className="space-y-8 max-w-7xl">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'ระบบจัดการเนื้อหาทุกหน้า' : 'Universal Page Content Editor'}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {lang === 'th' ? 'จัดการเนื้อหาทุกหน้าของเว็บไซต์' : 'Edit Content Across All Pages'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {lang === 'th'
                            ? 'เลือหน้าที่ต้องการแก้ไข ปรับแต่งข้อความพาดหัว สโลแกน รายการเครื่องจักร ภาพประกอบ และ SEO ได้ครบจบในที่เดียว'
                            : 'Select any page to customize headlines, descriptions, equipment cards, images, and SEO metadata.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={activePageDef.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>{lang === 'th' ? 'ดูหน้าเว็บจริง' : 'View Live Page'}</span>
                    </a>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>{lang === 'th' ? 'รีเซ็ตหน้านี้' : 'Reset Page'}</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        <span>{lang === 'th' ? 'บันทึกข้อมูลหน้านี้' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Layout: Left Page Selector (4 cols) & Right Editor Form (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Page Navigator */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="glass rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-sky-400" />
                                {lang === 'th' ? 'เลือกหน้าที่ต้องการแก้ไข' : 'Select Page'}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                {filteredPages.length} {lang === 'th' ? 'หน้า' : 'pages'}
                            </span>
                        </div>

                        {/* Search input */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={lang === 'th' ? 'ค้นหาชื่อหน้า หรือ URL...' : 'Search page or url...'}
                                className="w-full pl-8 pr-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-white/5 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {cat === 'all' ? (lang === 'th' ? 'ทั้งหมด' : 'All') : cat}
                                </button>
                            ))}
                        </div>

                        {/* Page items list */}
                        <div className="max-h-[580px] overflow-y-auto space-y-1.5 pr-1 pt-2">
                            {filteredPages.map((page) => {
                                const isSelected = page.id === selectedPageId;
                                const hasCustom = !!settings.pageContents?.[page.id];
                                return (
                                    <button
                                        key={page.id}
                                        type="button"
                                        onClick={() => handleSelectPage(page.id)}
                                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 group ${
                                            isSelected
                                                ? 'border-primary bg-primary/10 shadow-sm'
                                                : 'border-border/60 hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <p className={`text-xs font-bold truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                    {lang === 'th' ? page.nameTh : page.nameEn}
                                                </p>
                                                {hasCustom && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="มีข้อมูลแก้ไขพิเศษ" />
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                                                {page.path}
                                            </p>
                                        </div>

                                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground shrink-0">
                                            {page.category}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Form Editor */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Page Active Banner */}
                    <div className="glass rounded-2xl p-5 flex items-center justify-between gap-4 border-l-4 border-l-primary">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-bold text-foreground truncate">
                                    {lang === 'th' ? activePageDef.nameTh : activePageDef.nameEn}
                                </h2>
                                {isPageCustomized ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                                        <CheckCircle className="w-3 h-3" />
                                        <span>กำหนดเอง (Customized)</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-semibold">
                                        <span>ค่าเริ่มต้น (Default)</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-mono text-muted-foreground mt-0.5">
                                URL Path: <a href={activePageDef.path} target="_blank" rel="noreferrer" className="text-primary hover:underline">{activePageDef.path}</a>
                            </p>
                        </div>

                        <a
                            href={activePageDef.path}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 p-2 rounded-xl bg-navy-light hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                            title="เปิดดูหน้าจริง"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Section 1: Hero Banner Text (TH / EN) */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '1. ส่วนหัวและแบนเนอร์หลัก (Hero Section)' : '1. Hero Section'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge ป้ายกำกับ (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeTh || ''}
                                    onChange={(e) => updateField('heroBadgeTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น SMART INDUSTRY"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge Label (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeEn || ''}
                                    onChange={(e) => updateField('heroBadgeEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. SMART INDUSTRY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    พาดหัวหลัก Hero Title (TH) *
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleTh || ''}
                                    onChange={(e) => updateField('heroTitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความพาดหัวหลักของหน้าภาษาไทย"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Hero Title (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleEn || ''}
                                    onChange={(e) => updateField('heroTitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Hero headline in English"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    คำบรรยายรอง Subtitle (TH)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleTh || ''}
                                    onChange={(e) => updateField('heroSubtitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความบรรยายรายละเอียดใต้พาดหัว"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Subtitle (EN)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleEn || ''}
                                    onChange={(e) => updateField('heroSubtitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Intro description in English"
                                />
                            </div>
                        </div>

                        {/* Hero Image URL */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                URL รูปภาพประกอบหลัก (Hero Image URL)
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <ImageIcon className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={editContent.heroImage || ''}
                                        onChange={(e) => updateField('heroImage', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                        placeholder="https://... หรือ /assets/..."
                                    />
                                </div>
                                {editContent.heroImage && (
                                    <img
                                        src={editContent.heroImage}
                                        alt="Preview"
                                        className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ข้อความปุ่ม CTA (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextTh || ''}
                                    onChange={(e) => updateField('ctaTextTh', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น ขอสินเชื่อด่วน"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    CTA Button Text (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextEn || ''}
                                    onChange={(e) => updateField('ctaTextEn', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. Apply Now"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ลิงก์ปลายทาง (Link URL)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaLink || ''}
                                    onChange={(e) => updateField('ctaLink', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary font-mono"
                                    placeholder="/leasing-application"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Section / Equipment Items */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-sky-400" />
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                    {lang === 'th' ? '2. รายการเครื่องจักร & ไฮไลต์ (Section Items)' : '2. Highlighted Items'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={addItem}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{lang === 'th' ? 'เพิ่มรายการ' : 'Add Item'}</span>
                            </button>
                        </div>

                        {(!editContent.items || editContent.items.length === 0) ? (
                            <div className="text-center py-6 border border-dashed border-border rounded-xl">
                                <p className="text-xs text-muted-foreground">
                                    {lang === 'th'
                                        ? 'ยังไม่มีรายการเครื่องจักรที่กำหนดเอง (ระบบจะใช้รายการพื้นฐานของหน้านี้)'
                                        : 'No custom section items added. Default template items will be used.'}
                                </p>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="mt-2 text-xs font-semibold text-primary hover:underline"
                                >
                                    + {lang === 'th' ? 'คลิกเพื่อเพิ่มรายการแรก' : 'Click to add first item'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {editContent.items.map((item, index) => (
                                    <div key={item.id} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary">
                                                #{index + 1} {item.title || 'รายการใหม่'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive p-1"
                                                title="ลบรายการนี้"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ชื่อเครื่องจักร / หัวข้อ (TH)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateItemField(item.id, 'title', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Title (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.titleEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'titleEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    คำอธิบาย (TH)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.description}
                                                    onChange={(e) => updateItemField(item.id, 'description', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Description (EN)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.descEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'descEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    URL รูปภาพ
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.image || ''}
                                                    onChange={(e) => updateItemField(item.id, 'image', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ป้ายกำกับ (Badge Tag)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.badge || ''}
                                                    onChange={(e) => updateItemField(item.id, 'badge', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="เช่น มาตรฐานสากล"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Section 3: SEO Metadata */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '3. ข้อมูล SEO & Search Engines' : '3. SEO & Metadata'}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Title (ชื่อที่จะปรากฏบนแถบเบราว์เซอร์และผลการค้นหา Google)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.metaTitle || ''}
                                    onChange={(e) => updateField('metaTitle', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น สินเชื่อโรงงานผลิตน้ำดื่ม | Agile Assets"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Description (คำอธิบายย่อสำหรับการค้นหา)
                                </label>
                                <textarea
                                    rows={2}
                                    value={editContent.metaDescription || ''}
                                    onChange={(e) => updateField('metaDescription', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="คำอธิบายสรุปความยาวประมาณ 120-160 ตัวอักษร"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-between p-4 glass rounded-2xl">
                        <span className="text-xs text-muted-foreground">
                            {lang === 'th'
                                ? 'อย่าลืมกด "บันทึกข้อมูลหน้านี้" เพื่อบันทึกการแก้ไขลงในระบบ'
                                : 'Remember to click Save Changes to apply your updates.'}
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                            >
                                {lang === 'th' ? 'รีเซ็ตหน้านี้' : 'Reset'}
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01]"
                            >
                                {lang === 'th' ? 'บันทึกข้อมูลหน้านี้' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
