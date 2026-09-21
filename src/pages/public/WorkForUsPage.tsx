import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Briefcase, Sparkles, Heart, Award, ShieldCheck, 
    Coffee, Laptop, GraduationCap, Calendar, 
    ChevronDown, ChevronUp, ArrowRight, 
    MapPin, Users, Send, Zap, DollarSign,
    Target
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { careerService } from '@/services/careerService';

interface JobPosition {
    id: string;
    department: 'sales' | 'engineering' | 'tech' | 'finance';
    titleTh: string;
    titleEn: string;
    deptTh: string;
    deptEn: string;
    type: 'Full-time' | 'Hybrid';
    locationTh: string;
    locationEn: string;
    experienceTh: string;
    experienceEn: string;
    descriptionTh: string;
    descriptionEn: string;
    requirementsTh: string[];
    requirementsEn: string[];
}

const JOBS: JobPosition[] = [
    {
        id: 'job-credit-bd',
        department: 'sales',
        titleTh: 'เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ (Commercial Credit & BD)',
        titleEn: 'Commercial Credit & Business Development Specialist',
        deptTh: 'ฝ่ายพัฒนาธุรกิจสินเชื่อ (Business Development)',
        deptEn: 'Business Development & Credit',
        type: 'Hybrid',
        locationTh: 'กรุงเทพฯ (สุขุมวิท) / เข้าพบลูกค้าโรงงาน',
        locationEn: 'Bangkok (Sukhumvit) / On-site Plant Visits',
        experienceTh: 'ประสบการณ์ 2-5 ปี ด้านสินเชื่อธุรกิจ หรือลีสซิ่งเครื่องจักร',
        experienceEn: '2-5 years in commercial credit or machinery equipment leasing',
        descriptionTh: 'ดูแลและสร้างความสัมพันธ์กับผู้ประกอบการโรงงานอุตสาหกรรม วิเคราะห์โครงสร้างสินเชื่อเครื่องจักร และประสานงานจัดหาวงเงินที่เหมาะสม',
        descriptionEn: 'Manage corporate client accounts, assess machinery credit structures, and facilitate financing limits.',
        requirementsTh: [
            'วุฒิปริญญาตรีขึ้นไป สาขาการเงิน, การธนาคาร, เศรษฐศาสตร์ หรือวิศวกรรมศาสตร์',
            'มีทักษะการเจรจาต่อรองและการสื่อสารเชิงธุรกิจที่ดีเยี่ยม',
            'มีความเข้าใจในเอกสารงบการเงินและการวิเคราะห์เครดิตเบื้องต้น',
            'มีใบขับขี่และสามารถเดินทางไปเยี่ยมชมโรงงานของลูกค้าได้',
        ],
        requirementsEn: [
            "Bachelor's degree in Finance, Banking, Economics, or Engineering",
            'Excellent commercial negotiation and presentation skills',
            'Understanding of corporate balance sheets and preliminary credit analysis',
            'Valid driving license with mobility for factory visits',
        ],
    },
    {
        id: 'job-machinery-engineer',
        department: 'engineering',
        titleTh: 'วิศวกรประเมินราคาและตรวจสอบเครื่องจักร (Machinery Valuation Engineer)',
        titleEn: 'Industrial Machinery Valuation & Inspection Engineer',
        deptTh: 'ฝ่ายวิศวกรรมและประเมินหลักประกัน (Engineering & Asset Risk)',
        deptEn: 'Engineering & Valuation',
        type: 'Hybrid',
        locationTh: 'กรุงเทพฯ / ปริมณฑล / ลงพื้นที่โรงงาน',
        locationEn: 'Bangkok & Industrial Estates',
        experienceTh: 'ประสบการณ์ 2 ปีขึ้นไป ในงานวิศวกรรมโรงงาน หรือประเมินเครื่องจักร',
        experienceEn: '2+ years in plant maintenance or machinery asset appraisal',
        descriptionTh: 'ตรวจสอบสภาพเครื่องจักรและอุปกรณ์อุตสาหกรรม (ชิลเลอร์, เครื่องฉีดพลาสติก, โซลาร์รูฟท็อป, เครื่องปั่นไฟ) และจัดทำรายงานประเมินมูลค่าซาก/มูลค่าตลาด',
        descriptionEn: 'Inspect industrial equipment condition and generate accurate residual and fair market valuation reports.',
        requirementsTh: [
            'วุฒิปริญญาตรี สาขาวิศวกรรมเครื่องกล, ไฟฟ้า, อุตสาหการ หรือสาขาที่เกี่ยวข้อง',
            'มีความรู้ด้านเครื่องจักรอุตสาหกรรมและระบบไฟฟ้าโรงงาน',
            'มีความละเอียดรอบคอบในการจัดทำเอกสารตรวจสอบทางเทคนิค',
        ],
        requirementsEn: [
            "Bachelor's degree in Mechanical, Electrical, or Industrial Engineering",
            'Solid knowledge of manufacturing equipment and plant utility systems',
            'High attention to detail in technical asset reporting',
        ],
    },
    {
        id: 'job-fullstack-dev',
        department: 'tech',
        titleTh: 'นักพัฒนาระบบฟินเทค (Senior Full-Stack Developer)',
        titleEn: 'Senior Full-Stack FinTech Developer',
        deptTh: 'ฝ่ายเทคโนโลยีและดิจิทัล (Digital & FinTech Innovation)',
        deptEn: 'Technology & Digital',
        type: 'Hybrid',
        locationTh: 'กรุงเทพฯ (Sukhumvit Office & Remote)',
        locationEn: 'Bangkok / Hybrid Remote',
        experienceTh: 'ประสบการณ์ 3-6 ปี ในการพัฒนา Web Application (React, TypeScript, Node.js)',
        experienceEn: '3-6 years in React, TypeScript, Node.js modern stack',
        descriptionTh: 'ออกแบบและพัฒนาระบบ Management Portal, เครื่องมือคำนวณสินเชื่อ และระบบเชื่อมต่อ API สำหรับการพิจารณาสินเชื่อเครื่องจักรอัตโนมัติ',
        descriptionEn: 'Architect and scale our portal, automated underwriting engines, and internal financing tools.',
        requirementsTh: [
            'เชี่ยวชาญ React 18/19, TypeScript, Tailwind CSS, และ Node.js / Next.js',
            'คุ้นเคยกับการจัดการ State, Responsive Design, และ Clean Architecture',
            'มีใจรักในนวัตกรรม FinTech และพร้อมเรียนรู้เทคโนโลยีใหม่ๆ เสมอ',
        ],
        requirementsEn: [
            'Proficient in React, TypeScript, Tailwind CSS, and Node.js APIs',
            'Experienced in state management, responsive UI, and clean code',
            'Passionate about building intuitive FinTech experiences',
        ],
    },
    {
        id: 'job-finance-officer',
        department: 'finance',
        titleTh: 'เจ้าหน้าที่บริหารสัญญาและสินเชื่อ (Credit Administration & Operations)',
        titleEn: 'Credit Operations & Settlement Specialist',
        deptTh: 'ฝ่ายปฏิบัติการสินเชื่อ (Operations & Finance)',
        deptEn: 'Finance & Operations',
        type: 'Full-time',
        locationTh: 'สำนักงานใหญ่ กรุงเทพฯ (Sukhumvit)',
        locationEn: 'Head Office Bangkok',
        experienceTh: 'ประสบการณ์ 1-3 ปี ด้านปฏิบัติการสัญญา หรือสินเชื่อลีสซิ่ง',
        experienceEn: '1-3 years in credit administration or leasing operations',
        descriptionTh: 'จัดเตรียมเอกสารสัญญาเช่าซื้อ ประสานงานเบิกจ่ายเงินกู้ไปยังผู้จำหน่ายเครื่องจักร (Supplier) และดูแลความถูกต้องของหลักประกัน',
        descriptionEn: 'Prepare loan documentation, coordinate supplier payment disbursements, and manage collateral custody.',
        requirementsTh: [
            'วุฒิปริญญาตรี สาขาการเงิน, บัญชี, นิติศาสตร์ หรือบริหารธุรกิจ',
            'มีความละเอียดรอบคอบสูง ละเอียดในการตรวจทานเอกสารสัญญา',
            'สามารถใช้โปรแกรม Microsoft Office (Excel) ได้อย่างคล่องแคล่ว',
        ],
        requirementsEn: [
            "Bachelor's degree in Finance, Accounting, Law, or Business Administration",
            'High precision in legal contract validation and tracking',
            'Proficient in Microsoft Excel and corporate financial systems',
        ],
    },
];

export function WorkForUsPage() {
    const { lang } = useLanguage();

    // Connect to universal page content system
    const { content } = usePageContent('work-for-us', DEFAULT_PAGE_CONTENTS['work-for-us']);

    const [selectedDept, setSelectedDept] = useState<'all' | 'sales' | 'engineering' | 'tech' | 'finance'>('all');

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [appliedPosition, setAppliedPosition] = useState('job-credit-bd');
    const [experienceYears, setExperienceYears] = useState('2-5 ปี');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // FAQ Accordion state
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const filteredJobs = useMemo(() => {
        if (selectedDept === 'all') return JOBS;
        return JOBS.filter((j) => j.department === selectedDept);
    }, [selectedDept]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !email.trim() || !phone.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' : 'Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await careerService.applyJob({
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                positionId: appliedPosition,
                positionTitle: JOBS.find((j) => j.id === appliedPosition)?.titleTh || appliedPosition,
                expectedSalary: expectedSalary.trim(),
                resumeUrl: resumeUrl.trim(),
                coverLetter: coverLetter.trim(),
            });

            if (!res.success) {
                console.warn('API returned non-success response:', res.error);
            }
        } catch (err) {
            console.warn('Network error while sending application to backend:', err);
        } finally {
            setIsSubmitting(false);
        }

        toast.success(
            lang === 'th'
                ? 'ส่งใบสมัครเรียบร้อยแล้ว! ทีม HR ของ Agile Assets จะติดต่อกลับภายใน 2-3 วันทำการ'
                : 'Application submitted successfully! Our HR team will get in touch within 2-3 business days.'
        );

        // Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setExpectedSalary('');
        setResumeUrl('');
        setCoverLetter('');
    };

    const handleApplyClick = (job: JobPosition) => {
        setAppliedPosition(job.id);
        const formEl = document.getElementById('application-form');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const benefits = [
        {
            icon: DollarSign,
            titleTh: 'ผลตอบแทน & โบนัสตามผลงาน',
            titleEn: 'Competitive Salary & Bonus',
            descTh: 'เงินเดือนที่แข่งขันได้ในตลาด พร้อมการันตีโบนัส และ Performance Incentive รายไตรมาสสำหรับผลงานที่โดดเด่น',
            descEn: 'Competitive salary packages, guaranteed bonuses, and quarterly performance incentives for top achievers.',
        },
        {
            icon: Heart,
            titleTh: 'ประกันสุขภาพกลุ่ม & ทันตกรรม',
            titleEn: 'Comprehensive Health & Dental',
            descTh: 'ครอบคลุมทั้งผู้ป่วยใน (IPD) และผู้ป่วยนอก (OPD) พร้อมวงเงินทันตกรรมและประกันอุบัติเหตุ 24 ชั่วโมง',
            descEn: 'Full IPD & OPD coverage with dental allowance and 24/7 personal accident insurance protection.',
        },
        {
            icon: ShieldCheck,
            titleTh: 'กองทุนสำรองเลี้ยงชีพ (Provident Fund)',
            titleEn: 'Provident Fund Program',
            descTh: 'วางแผนเพื่ออนาคตที่มั่นคง บริษัทร่วมสมทบเงินสูงสุดตามกฎหมาย เสริมความมั่งคั่งให้พนักงานในระยะยาว',
            descEn: 'Co-contributed retirement plan with maximum allowable matching rates for your long-term security.',
        },
        {
            icon: Laptop,
            titleTh: 'เวลาทำงานยืดหยุ่น & Hybrid Work',
            titleEn: 'Hybrid & Flexible Working',
            descTh: 'อิสระในการจัดสรรเวลาทำงาน (Flex Time) พร้อมทางเลือกสลับทำงานที่บ้าน (Work From Anywhere) เพื่อความสมดุลในชีวิต',
            descEn: 'Flex-hour schedule and hybrid remote options empowering work-life harmony and personal autonomy.',
        },
        {
            icon: Calendar,
            titleTh: 'วันลาพักผ่อน 12-15 วัน + ลาวันเกิด',
            titleEn: 'Generous Leave & Birthday Off',
            descTh: 'วันลาพักร้อนประจำปีสะสมได้ วันหยุดพิเศษในวันเกิด และวันลาเพื่อการศึกษาหรืออบรมพัฒนาตนเอง',
            descEn: 'Annual paid leave starting from 12-15 days, special birthday leave, and study leaves.',
        },
        {
            icon: GraduationCap,
            titleTh: 'งบพัฒนาทักษะ 15,000+ บาท/ปี',
            titleEn: 'Upskilling & Learning Budget',
            descTh: 'สนับสนุนการเรียนรู้ตลอดชีวิต งบสำหรับคอร์สอบรม สัมมนา หนังสือ หรือสอบใบเซอร์วิชาชีพที่สนใจ',
            descEn: 'Personal development stipend for certified courses, technical seminars, and international certificates.',
        },
        {
            icon: Coffee,
            titleTh: 'ออฟฟิศใจกลางเมือง & ขนม/กาแฟฟรี',
            titleEn: 'Modern Hub & Free Refreshments',
            descTh: 'เดินทางสะดวกติดแนวรถไฟฟ้า มีบาร์กาแฟสด เครื่องดื่ม และสแน็คบาร์บริการฟรีตลอดวัน',
            descEn: 'Prime Sukhumvit office connected to BTS. Complimentary premium espresso bar and daily snacks.',
        },
        {
            icon: Sparkles,
            titleTh: 'Company Outing & งานเลี้ยงสังสรรค์',
            titleEn: 'Annual Outing & Social Events',
            descTh: 'กิจกรรม Outing ทริปท่องเที่ยวประจำปี งานเลี้ยงฉลองความสำเร็จ และปาร์ตี้สร้างความสัมพันธ์ในทีม',
            descEn: 'All-inclusive annual company trip, milestone celebrations, and fun Friday social gatherings.',
        },
    ];

    const whyAgilePillars = [
        {
            icon: Zap,
            badge: 'SPEED & AGILITY',
            titleTh: 'ทำงานคล่องตัว กล้าคิด กล้าทำ',
            titleEn: 'Fast Execution & True Agility',
            descTh: 'ที่ Agile Assets เราตัดขั้นตอนและระบบเอกสารที่ซ้ำซ้อนออก ให้ความสำคัญกับความเร็ว ความคิดสร้างสรรค์ และการลงมือปฏิบัติจริง คุณจะได้เห็นผลลัพธ์ของสิ่งที่คุณสร้างอย่างรวดเร็ว',
            descEn: 'We eliminate bureaucratic bottlenecks. Fast decision-making, autonomy, and ownership empower you to see the direct fruit of your daily work.',
        },
        {
            icon: Target,
            badge: 'ESG & REAL IMPACT',
            titleTh: 'สร้างผลลัพธ์จริงเพื่อสังคมและสิ่งแวดล้อม',
            titleEn: 'Real Economic & Green Impact',
            descTh: 'เราไม่ได้เป็นเพียงผู้ปล่อยสินเชื่อ แต่เราเป็นตัวเร่งให้โรงงานไทยเปลี่ยนผ่านสู่พลังงานสะอาด (Green Energy) และลดคาร์บอนฟุตพริ้นท์ ทุกโครงการที่คุณมีส่วนร่วมจึงมีความหมายอย่างแท้จริง',
            descEn: 'More than a financier, we accelerate Thai industrial transition to renewable solar and automated manufacturing with sustainable ESG capital.',
        },
        {
            icon: Users,
            badge: 'OPEN CULTURE',
            titleTh: 'วัฒนธรรมเปิดกว้าง ไร้ลำดับชั้นที่ซับซ้อน',
            titleEn: 'Flat & Inclusive Organization',
            descTh: 'เราเปิดรับทุกไอเดียจากทุกคน ไม่ว่าคุณจะเพิ่งเริ่มต้นทำงานหรือมีประสบการณ์สูง ผู้บริหารพร้อมเปิดรับฟัง มีระบบ Mentorship ใกล้ชิด และร่วมฉลองความสำเร็จร่วมกันเสมอ',
            descEn: 'Flat hierarchy where fresh ideas thrive. Direct mentorship with leadership and a supportive team that celebrates every shared milestone.',
        },
        {
            icon: Award,
            badge: 'FAST CAREER PATH',
            titleTh: 'เติบโตอย่างก้าวกระโดดตามผลงาน',
            titleEn: 'Rapid Merit-Based Advancement',
            descTh: 'ความก้าวหน้าของคุณขึ้นอยู่กับความสามารถและผลงาน (Meritocracy) เรามีโครงสร้างการเติบโตที่ชัดเจน พร้อมส่งเสริมให้คุณก้าวขึ้นเป็นผู้นำและผู้เชี่ยวชาญในสายงาน',
            descEn: 'Promotions based purely on capability and results. Fast-track leadership opportunities for driven talents ready to excel.',
        },
    ];

    const faqs = [
        {
            qTh: 'ขั้นตอนการสมัครงานและการสัมภาษณ์ใช้เวลานานเท่าไร?',
            qEn: 'How long does the recruitment process take?',
            aTh: 'โดยปกติกระบวนการทั้งหมดตั้งแต่ยื่นใบสมัครจนถึงทราบผลการคัดเลือกจะใช้เวลาประมาณ 1-2 สัปดาห์ โดยฝ่ายทรัพยากรบุคคลจะติดต่อกลับผู้สมัครที่ผ่านเกณฑ์เบื้องต้นภายใน 2-3 วันทำการ',
            aEn: 'The entire journey usually takes 1-2 weeks. Qualified candidates will receive an initial contact within 2-3 business days.',
        },
        {
            qTh: 'นักศึกษาจบใหม่ (Fresh Graduate) สามารถสมัครได้หรือไม่?',
            qEn: 'Do you accept applications from fresh graduates?',
            aTh: 'ยินดีรับเป็นอย่างยิ่ง! เรามีตำแหน่งระดับ Entry-Level สำหรับผู้ที่มีความกระตือรือร้น พร้อมเรียนรู้ และมีทัศนคติเชิงบวก โดยมีทีมพี่เลี้ยงคอยดูแลและให้คำแนะนำอย่างใกล้ชิด',
            aEn: 'Absolutely! We offer entry-level openings for proactive individuals eager to learn, supported by senior mentors.',
        },
        {
            qTh: 'รูปแบบการทำงานแบบ Hybrid Work มีรายละเอียดอย่างไร?',
            qEn: 'What does the Hybrid Work arrangement look like?',
            aTh: 'พนักงานสามารถสลับทำงานระหว่างที่สำนักงานใหญ่สุขุมวิท และ Work from Anywhere ได้ตามความเหมาะสมของแต่ละฝ่าย โดยเน้นการวัดผลงานและประสิทธิภาพเป็นหลัก',
            aEn: 'Employees balance between our Sukhumvit headquarters and remote workspaces, evaluated on outputs and team synergy.',
        },
        {
            qTh: 'สถานที่ทำงานตั้งอยู่ที่ไหน และเดินทางอย่างไร?',
            qEn: 'Where is the office located and how do I commute?',
            aTh: 'สำนักงานใหญ่ของ Agile Assets ตั้งอยู่ในย่านธุรกิจสุขุมวิท กรุงเทพฯ เดินทางสะดวกด้วยระบบขนส่งสาธารณะ (BTS / MRT) และมีที่จอดรถรองรับสำหรับพนักงาน',
            aEn: 'Our headquarters is located in Sukhumvit commercial district, easily accessible via BTS/MRT with dedicated parking facilities.',
        },
    ];

    const pageTitle = lang === 'th' ? 'ร่วมงานกับเรา (Work For Us) | Agile Assets' : 'Careers & Work For Us | Agile Assets';
    const pageDesc = lang === 'th'
        ? 'ร่วมขับเคลื่อนอนาคตอุตสาหกรรมไทยและพลังงานสะอาดไปพร้อมกับ Agile Assets สวัสดิการระดับพรีเมียม โบนัส และโอกาสเติบโตแบบก้าวกระโดด'
        : 'Join Agile Assets to lead the green capital transformation. Enjoy top-tier benefits, flexible work, and accelerated career growth.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={content.heroImage} />
            </Helmet>

            {/* Top Navigation */}
            <Navbar />

            <main className="flex-1">
                {/* 1. Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden gradient-hero">
                    {/* Background Decorative Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in shadow-sm">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{lang === 'th' ? content.heroBadgeTh : content.heroBadgeEn}</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
                            {lang === 'th' ? content.heroTitleTh : content.heroTitleEn}
                        </h1>

                        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {lang === 'th' ? content.heroSubtitleTh : content.heroSubtitleEn}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#open-positions"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-400/25 hover:shadow-blue-400/45 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <span>{lang === 'th' ? 'ดูตำแหน่งงานว่าง' : 'Explore Open Positions'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#why-agile"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass border border-border text-foreground font-semibold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <span>{lang === 'th' ? 'ทำไมต้องทำกับ Agile?' : 'Why Work with Us?'}</span>
                            </a>
                        </div>

                        {/* Key Stats Bar */}
                        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {[
                                { num: '100%+', labelTh: 'อัตราการเติบโตธุรกิจ', labelEn: 'Annual Growth Rate' },
                                { num: '500M+ ฿', labelTh: 'พอร์ตสินเชื่อสีเขียว ESG', labelEn: 'Green Energy Assets' },
                                { num: 'Hybrid', labelTh: 'เวลาทำงานยืดหยุ่น', labelEn: 'Flexible Work Style' },
                                { num: '4.9 / 5', labelTh: 'คะแนนความสุขพนักงาน', labelEn: 'Team Satisfaction' },
                            ].map((stat, i) => (
                                <div key={i} className="glass rounded-xl p-4 border border-border/80">
                                    <p className="text-2xl sm:text-3xl font-black text-primary">{stat.num}</p>
                                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                                        {lang === 'th' ? stat.labelTh : stat.labelEn}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Section: Why Work With Agile? (ทำไมต้องทำกับ Agile) */}
                <section id="why-agile" className="py-20 md:py-28 border-t border-border/60 bg-card/30 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                OUR CULTURE & VALUES
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {lang === 'th' ? 'ทำไมต้องร่วมงานกับ Agile Assets?' : 'Why Work With Agile Assets?'}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {lang === 'th'
                                    ? 'เราเชื่อมั่นว่า "คนที่ใช่" ใน "สภาพแวดล้อมที่ดี" จะสร้างสรรค์สิ่งมหัศจรรย์ได้เสมอ ที่นี่เราจึงมุ่งสร้างบรรยากาศที่ส่งเสริมทั้งศักยภาพและความสุขของคุณ'
                                    : 'We believe exceptional people in an inspiring culture build outstanding impact. Here is what defines our everyday mission.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {whyAgilePillars.map((pillar, idx) => (
                                <div
                                    key={idx}
                                    className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <pillar.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-navy-light text-muted-foreground border border-border">
                                                {pillar.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {lang === 'th' ? pillar.titleTh : pillar.titleEn}
                                        </h3>
                                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                            {lang === 'th' ? pillar.descTh : pillar.descEn}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-border/40 flex items-center text-xs font-semibold text-primary gap-1">
                                        <span>{lang === 'th' ? 'ร่วมสัมผัสประสบการณ์จริง' : 'Experience this impact'}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Section: Benefits & What You Get (ทำงานกับ Agile ได้อะไร) */}
                <section className="py-20 md:py-28 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                COMPREHENSIVE PERKS & WELLNESS
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {lang === 'th' ? 'ทำงานกับ Agile ได้อะไรบ้าง? (สวัสดิการจัดเต็ม)' : 'What You Get: Benefits & Perks'}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {lang === 'th'
                                    ? 'เราดูแลคุณเสมือนครอบครัว ด้วยแพ็กเกจสวัสดิการที่ครอบคลุมทั้งสุขภาพ การเงิน การเติบโตทางอาชีพ และคุณภาพชีวิตที่ดี'
                                    : 'We support our people with thoughtful benefits ensuring physical wellness, long-term financial security, and career advancement.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {benefits.map((benefit, i) => (
                                <div
                                    key={i}
                                    className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all flex flex-col justify-between hover:translate-y-[-3px]"
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                                            <benefit.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground">
                                            {lang === 'th' ? benefit.titleTh : benefit.titleEn}
                                        </h3>
                                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                            {lang === 'th' ? benefit.descTh : benefit.descEn}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Section: Open Positions (ตำแหน่งงานที่เปิดรับ) */}
                <section id="open-positions" className="py-20 md:py-28 border-t border-border/60 bg-card/20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                JOIN OUR TEAM
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {lang === 'th' ? 'ตำแหน่งงานที่เปิดรับสมัคร' : 'Current Open Positions'}
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                                {lang === 'th'
                                    ? 'ค้นหาตำแหน่งที่เหมาะกับความฝันและทักษะของคุณ แล้วส่งใบสมัครมาร่วมทีมกันได้เลย'
                                    : 'Explore our curated openings and find the ideal role to elevate your professional trajectory.'}
                            </p>
                        </div>

                        {/* Department Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                            {[
                                { id: 'all', labelTh: 'ทุกตำแหน่ง (All)', labelEn: 'All Roles' },
                                { id: 'sales', labelTh: 'สินเชื่อ & พัฒนาธุรกิจ', labelEn: 'Credit & BD' },
                                { id: 'engineering', labelTh: 'วิศวกรรม & ประเมินเครื่องจักร', labelEn: 'Engineering' },
                                { id: 'tech', labelTh: 'เทคโนโลยี & ฟินเทค', labelEn: 'Tech & IT' },
                                { id: 'finance', labelTh: 'ปฏิบัติการสินเชื่อ & การเงิน', labelEn: 'Finance & Ops' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setSelectedDept(tab.id as any)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        selectedDept === tab.id
                                            ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                                            : 'glass border border-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                                    }`}
                                >
                                    {lang === 'th' ? tab.labelTh : tab.labelEn}
                                </button>
                            ))}
                        </div>

                        {/* Job Cards */}
                        <div className="space-y-4 max-w-5xl mx-auto">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="glass rounded-2xl p-6 border border-border hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                                >
                                    <div className="space-y-2 min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                                {lang === 'th' ? job.deptTh : job.deptEn}
                                            </span>
                                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                {job.type}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {lang === 'th' ? job.titleTh : job.titleEn}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                            {lang === 'th' ? job.descriptionTh : job.descriptionEn}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                                <span>{lang === 'th' ? job.locationTh : job.locationEn}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5 text-primary" />
                                                <span>{lang === 'th' ? job.experienceTh : job.experienceEn}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleApplyClick(job)}
                                            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <span>{lang === 'th' ? 'สมัครตำแหน่งนี้' : 'Apply Now'}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Section: Online Application Form (แบบฟอร์มสมัครงาน) */}
                <section id="application-form" className="py-20 md:py-28 relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                ONLINE APPLICATION
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                                {lang === 'th' ? 'ส่งใบสมัครงานของคุณ (Apply Online)' : 'Submit Your Job Application'}
                            </h2>
                            <p className="mt-3 text-sm text-muted-foreground">
                                {lang === 'th'
                                    ? 'กรอกข้อมูลและแนบลิงก์ผลงานของคุณ ทีมงานของเราพร้อมต้อนรับคุณเข้าสู่ครอบครัว Agile'
                                    : 'Complete the form below to begin your career journey with Agile Assets.'}
                            </p>
                        </div>

                        <div className="glass rounded-3xl p-6 sm:p-10 border border-border shadow-2xl relative">
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ชื่อ - นามสกุล *' : 'Full Name *'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder={lang === 'th' ? 'เช่น สมชาย ใจดี' : 'e.g. Somchai Jaidee'}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'เบอร์โทรศัพท์ติดต่อ *' : 'Phone Number *'}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="08X-XXX-XXXX"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'อีเมลสำหรับติดต่อ *' : 'Email Address *'}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="youremail@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ตำแหน่งที่สนใจสมัคร *' : 'Position Applied For *'}
                                        </label>
                                        <select
                                            value={appliedPosition}
                                            onChange={(e) => setAppliedPosition(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        >
                                            {JOBS.map((j) => (
                                                <option key={j.id} value={j.id} className="bg-navy text-foreground">
                                                    {lang === 'th' ? j.titleTh : j.titleEn}
                                                </option>
                                            ))}
                                            <option value="other" className="bg-navy text-foreground">
                                                {lang === 'th' ? 'ตำแหน่งอื่นๆ (Other Openings)' : 'Other / Talent Pool'}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'ประสบการณ์ทำงานโดยประมาณ' : 'Years of Experience'}
                                        </label>
                                        <select
                                            value={experienceYears}
                                            onChange={(e) => setExperienceYears(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        >
                                            <option value="จบใหม่ / 0-1 ปี" className="bg-navy">จบใหม่ / 0-1 ปี (Fresh Graduate)</option>
                                            <option value="1-2 ปี" className="bg-navy">1-2 ปี (Junior)</option>
                                            <option value="2-5 ปี" className="bg-navy">2-5 ปี (Mid-Level)</option>
                                            <option value="5+ ปีขึ้นไป" className="bg-navy">5+ ปีขึ้นไป (Senior / Lead)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-foreground mb-2">
                                            {lang === 'th' ? 'เงินเดือนที่คาดหวัง (บาท/เดือน)' : 'Expected Salary (THB/Month)'}
                                        </label>
                                        <input
                                            type="text"
                                            value={expectedSalary}
                                            onChange={(e) => setExpectedSalary(e.target.value)}
                                            placeholder={lang === 'th' ? 'เช่น 35,000 - 45,000 หรือ ตามโครงสร้าง' : 'e.g. 40,000 - 55,000'}
                                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-foreground mb-2">
                                        {lang === 'th' ? 'ลิงก์ Resume / CV / LinkedIn / Portfolio' : 'Resume / Portfolio / LinkedIn URL'}
                                    </label>
                                    <input
                                        type="url"
                                        value={resumeUrl}
                                        onChange={(e) => setResumeUrl(e.target.value)}
                                        placeholder="https://drive.google.com/... หรือ https://linkedin.com/in/..."
                                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                                    />
                                    <p className="text-[11px] text-muted-foreground mt-1">
                                        {lang === 'th'
                                            ? '* สามารถวางลิงก์ Google Drive, Dropbox หรือโปรไฟล์ LinkedIn ของท่านได้'
                                            : '* Provide a public link to your CV, Google Drive folder, or LinkedIn profile.'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-foreground mb-2">
                                        {lang === 'th' ? 'แนะนำตัวเองเบื้องต้น หรือเหตุผลที่อยากร่วมงานกับเรา' : 'Short Cover Letter / Introduction'}
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder={lang === 'th' ? 'เล่าสั้นๆ เกี่ยวกับทักษะ ประสบการณ์ และแรงบันดาลใจของคุณ...' : 'Tell us about your background and why you want to join Agile Assets...'}
                                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 leading-relaxed"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-400/25 hover:shadow-blue-400/50 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>{lang === 'th' ? 'กำลังส่งข้อมูล...' : 'Submitting...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{lang === 'th' ? 'ส่งใบสมัครงานทันที' : 'Submit Application'}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* 6. Section: Recruitment Process (ขั้นตอนการคัดเลือก) */}
                <section className="py-20 border-t border-border/60 bg-card/20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                                SELECTION JOURNEY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                                {lang === 'th' ? '4 ขั้นตอนการคัดเลือกที่กระชับและโปร่งใส' : 'Our 4-Step Hiring Process'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {[
                                { step: '01', titleTh: 'ยื่นใบสมัครออนไลน์', titleEn: 'Apply Online', descTh: 'กรอกแบบฟอร์มด้านบนหรือส่ง Resume ให้เรา', descEn: 'Complete online application form or share your CV link' },
                                { step: '02', titleTh: 'สัมภาษณ์เบื้องต้น', titleEn: 'Intro Screening', descTh: 'พูดคุย 15-30 นาทีเพื่อทำความรู้จักและสอบถามเป้าหมาย', descEn: '15-30 min phone/video discussion exploring mutual goals' },
                                { step: '03', titleTh: 'สัมภาษณ์เชิงลึกกับทีม', titleEn: 'Team Interview', descTh: 'พูดคุยทัศนคติและโจทย์การทำงานกับทีมงานและผู้บริหาร', descEn: 'Deep-dive discussion with team leads and executives' },
                                { step: '04', titleTh: 'รับ Offer & เริ่มงาน', titleEn: 'Job Offer & Welcome', descTh: 'เสนอสัญญาจ้างที่เหมาะสมและต้อนรับสู่ทีม Agile', descEn: 'Competitive offer letter and warm team welcome' },
                            ].map((step, idx) => (
                                <div key={idx} className="glass rounded-2xl p-6 border border-border relative text-center">
                                    <span className="text-3xl font-black text-primary/40 block mb-2">
                                        {step.step}
                                    </span>
                                    <h3 className="text-sm font-bold text-foreground">
                                        {lang === 'th' ? step.titleTh : step.titleEn}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                        {lang === 'th' ? step.descTh : step.descEn}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Section: Careers FAQ */}
                <section className="py-20 relative">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                                {lang === 'th' ? 'คำถามที่พบบ่อยเกี่ยวกับการสมัครงาน' : 'Careers FAQ'}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => {
                                const isOpen = openFaqIndex === i;
                                return (
                                    <div key={i} className="glass rounded-xl border border-border overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:text-primary transition-colors"
                                        >
                                            <span>{lang === 'th' ? faq.qTh : faq.qEn}</span>
                                            {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-4 text-xs sm:text-sm text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                                                {lang === 'th' ? faq.aTh : faq.aEn}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />

            {/* Bottom PDPA Cookie Consent Banner */}
            <CookieConsent />

            {/* Floating Quick Action Widget & Back-to-Top */}
            <QuickContactWidget />
        </div>
    );
}
