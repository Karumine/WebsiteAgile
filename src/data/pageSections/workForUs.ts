import type { PageSectionSchema } from '@/lib/pageSections';
import { F, header } from './fields';

export const workForUsSections: PageSectionSchema[] = [
    {
        id: 'hero-extras',
        label: 'ปุ่มและสถิติใต้ Hero',
        fields: [
            { key: 'primaryBtn', label: 'ข้อความปุ่มหลัก' },
            { key: 'secondaryBtn', label: 'ข้อความปุ่มรอง' },
        ],
        list: { label: 'ตัวเลขสถิติ', titleKey: 'value', fields: [F.value, F.label] },
        defaults: {
            fields: {
                primaryBtnTh: 'ดูตำแหน่งงานว่าง', primaryBtnEn: 'Explore Open Positions',
                secondaryBtnTh: 'ทำไมต้องทำกับ Agile?', secondaryBtnEn: 'Why Work with Us?',
            },
            items: [
                { id: 'st1', value: '100%+', labelTh: 'อัตราการเติบโตธุรกิจ', labelEn: 'Annual Growth Rate' },
                { id: 'st2', value: '500M+ ฿', labelTh: 'พอร์ตสินเชื่อสีเขียว ESG', labelEn: 'Green Energy Assets' },
                { id: 'st3', value: 'Hybrid', labelTh: 'เวลาทำงานยืดหยุ่น', labelEn: 'Flexible Work Style' },
                { id: 'st4', value: '4.9 / 5', labelTh: 'คะแนนความสุขพนักงาน', labelEn: 'Team Satisfaction' },
            ],
        },
    },
    {
        id: 'why',
        label: 'ทำไมต้องร่วมงานกับ Agile (Culture & Values)',
        fields: [...header(), { key: 'cardCta', label: 'ข้อความท้ายการ์ด' }],
        list: { label: 'การ์ดเสาหลัก', titleKey: 'title', fields: [F.icon, { ...F.badge, bilingual: false, type: 'plain' }, F.title, F.desc] },
        defaults: {
            fields: {
                badgeTh: 'OUR CULTURE & VALUES', badgeEn: 'OUR CULTURE & VALUES',
                titleTh: 'ทำไมต้องร่วมงานกับ Agile Assets?', titleEn: 'Why Work With Agile Assets?',
                subtitleTh: 'เราเชื่อมั่นว่า "คนที่ใช่" ใน "สภาพแวดล้อมที่ดี" จะสร้างสรรค์สิ่งมหัศจรรย์ได้เสมอ ที่นี่เราจึงมุ่งสร้างบรรยากาศที่ส่งเสริมทั้งศักยภาพและความสุขของคุณ',
                subtitleEn: 'We believe exceptional people in an inspiring culture build outstanding impact. Here is what defines our everyday mission.',
                cardCtaTh: 'ร่วมสัมผัสประสบการณ์จริง', cardCtaEn: 'Experience this impact',
            },
            items: [
                {
                    id: 'p1', icon: 'Zap', badge: 'SPEED & AGILITY',
                    titleTh: 'ทำงานคล่องตัว กล้าคิด กล้าทำ', titleEn: 'Fast Execution & True Agility',
                    descTh: 'ที่ Agile Assets เราตัดขั้นตอนและระบบเอกสารที่ซ้ำซ้อนออก ให้ความสำคัญกับความเร็ว ความคิดสร้างสรรค์ และการลงมือปฏิบัติจริง คุณจะได้เห็นผลลัพธ์ของสิ่งที่คุณสร้างอย่างรวดเร็ว',
                    descEn: 'We eliminate bureaucratic bottlenecks. Fast decision-making, autonomy, and ownership empower you to see the direct fruit of your daily work.',
                },
                {
                    id: 'p2', icon: 'Target', badge: 'ESG & REAL IMPACT',
                    titleTh: 'สร้างผลลัพธ์จริงเพื่อสังคมและสิ่งแวดล้อม', titleEn: 'Real Economic & Green Impact',
                    descTh: 'เราไม่ได้เป็นเพียงผู้ปล่อยสินเชื่อ แต่เราเป็นตัวเร่งให้โรงงานไทยเปลี่ยนผ่านสู่พลังงานสะอาด (Green Energy) และลดคาร์บอนฟุตพริ้นท์ ทุกโครงการที่คุณมีส่วนร่วมจึงมีความหมายอย่างแท้จริง',
                    descEn: 'More than a financier, we accelerate Thai industrial transition to renewable solar and automated manufacturing with sustainable ESG capital.',
                },
                {
                    id: 'p3', icon: 'Users', badge: 'OPEN CULTURE',
                    titleTh: 'วัฒนธรรมเปิดกว้าง ไร้ลำดับชั้นที่ซับซ้อน', titleEn: 'Flat & Inclusive Organization',
                    descTh: 'เราเปิดรับทุกไอเดียจากทุกคน ไม่ว่าคุณจะเพิ่งเริ่มต้นทำงานหรือมีประสบการณ์สูง ผู้บริหารพร้อมเปิดรับฟัง มีระบบ Mentorship ใกล้ชิด และร่วมฉลองความสำเร็จร่วมกันเสมอ',
                    descEn: 'Flat hierarchy where fresh ideas thrive. Direct mentorship with leadership and a supportive team that celebrates every shared milestone.',
                },
                {
                    id: 'p4', icon: 'Award', badge: 'FAST CAREER PATH',
                    titleTh: 'เติบโตอย่างก้าวกระโดดตามผลงาน', titleEn: 'Rapid Merit-Based Advancement',
                    descTh: 'ความก้าวหน้าของคุณขึ้นอยู่กับความสามารถและผลงาน (Meritocracy) เรามีโครงสร้างการเติบโตที่ชัดเจน พร้อมส่งเสริมให้คุณก้าวขึ้นเป็นผู้นำและผู้เชี่ยวชาญในสายงาน',
                    descEn: 'Promotions based purely on capability and results. Fast-track leadership opportunities for driven talents ready to excel.',
                },
            ],
        },
    },
    {
        id: 'benefits',
        label: 'สวัสดิการ (Benefits & Perks)',
        fields: header(),
        list: { label: 'รายการสวัสดิการ', titleKey: 'title', fields: [F.icon, F.title, F.desc] },
        defaults: {
            fields: {
                badgeTh: 'COMPREHENSIVE PERKS & WELLNESS', badgeEn: 'COMPREHENSIVE PERKS & WELLNESS',
                titleTh: 'ทำงานกับ Agile ได้อะไรบ้าง? (สวัสดิการจัดเต็ม)', titleEn: 'What You Get: Benefits & Perks',
                subtitleTh: 'เราดูแลคุณเสมือนครอบครัว ด้วยแพ็กเกจสวัสดิการที่ครอบคลุมทั้งสุขภาพ การเงิน การเติบโตทางอาชีพ และคุณภาพชีวิตที่ดี',
                subtitleEn: 'We support our people with thoughtful benefits ensuring physical wellness, long-term financial security, and career advancement.',
            },
            items: [
                { id: 'b1', icon: 'DollarSign', titleTh: 'ผลตอบแทน & โบนัสตามผลงาน', titleEn: 'Competitive Salary & Bonus', descTh: 'เงินเดือนที่แข่งขันได้ในตลาด พร้อมการันตีโบนัส และ Performance Incentive รายไตรมาสสำหรับผลงานที่โดดเด่น', descEn: 'Competitive salary packages, guaranteed bonuses, and quarterly performance incentives for top achievers.' },
                { id: 'b2', icon: 'Heart', titleTh: 'ประกันสุขภาพกลุ่ม & ทันตกรรม', titleEn: 'Comprehensive Health & Dental', descTh: 'ครอบคลุมทั้งผู้ป่วยใน (IPD) และผู้ป่วยนอก (OPD) พร้อมวงเงินทันตกรรมและประกันอุบัติเหตุ 24 ชั่วโมง', descEn: 'Full IPD & OPD coverage with dental allowance and 24/7 personal accident insurance protection.' },
                { id: 'b3', icon: 'ShieldCheck', titleTh: 'กองทุนสำรองเลี้ยงชีพ (Provident Fund)', titleEn: 'Provident Fund Program', descTh: 'วางแผนเพื่ออนาคตที่มั่นคง บริษัทร่วมสมทบเงินสูงสุดตามกฎหมาย เสริมความมั่งคั่งให้พนักงานในระยะยาว', descEn: 'Co-contributed retirement plan with maximum allowable matching rates for your long-term security.' },
                { id: 'b4', icon: 'Laptop', titleTh: 'เวลาทำงานยืดหยุ่น & Hybrid Work', titleEn: 'Hybrid & Flexible Working', descTh: 'อิสระในการจัดสรรเวลาทำงาน (Flex Time) พร้อมทางเลือกสลับทำงานที่บ้าน (Work From Anywhere) เพื่อความสมดุลในชีวิต', descEn: 'Flex-hour schedule and hybrid remote options empowering work-life harmony and personal autonomy.' },
                { id: 'b5', icon: 'Calendar', titleTh: 'วันลาพักผ่อน 12-15 วัน + ลาวันเกิด', titleEn: 'Generous Leave & Birthday Off', descTh: 'วันลาพักร้อนประจำปีสะสมได้ วันหยุดพิเศษในวันเกิด และวันลาเพื่อการศึกษาหรืออบรมพัฒนาตนเอง', descEn: 'Annual paid leave starting from 12-15 days, special birthday leave, and study leaves.' },
                { id: 'b6', icon: 'GraduationCap', titleTh: 'งบพัฒนาทักษะ 15,000+ บาท/ปี', titleEn: 'Upskilling & Learning Budget', descTh: 'สนับสนุนการเรียนรู้ตลอดชีวิต งบสำหรับคอร์สอบรม สัมมนา หนังสือ หรือสอบใบเซอร์วิชาชีพที่สนใจ', descEn: 'Personal development stipend for certified courses, technical seminars, and international certificates.' },
                { id: 'b7', icon: 'Coffee', titleTh: 'ออฟฟิศใจกลางเมือง & ขนม/กาแฟฟรี', titleEn: 'Modern Hub & Free Refreshments', descTh: 'เดินทางสะดวกติดแนวรถไฟฟ้า มีบาร์กาแฟสด เครื่องดื่ม และสแน็คบาร์บริการฟรีตลอดวัน', descEn: 'Prime Sukhumvit office connected to BTS. Complimentary premium espresso bar and daily snacks.' },
                { id: 'b8', icon: 'Sparkles', titleTh: 'Company Outing & งานเลี้ยงสังสรรค์', titleEn: 'Annual Outing & Social Events', descTh: 'กิจกรรม Outing ทริปท่องเที่ยวประจำปี งานเลี้ยงฉลองความสำเร็จ และปาร์ตี้สร้างความสัมพันธ์ในทีม', descEn: 'All-inclusive annual company trip, milestone celebrations, and fun Friday social gatherings.' },
            ],
        },
    },
    {
        id: 'departments',
        label: 'แท็บกรองแผนก (ตำแหน่งงาน)',
        hint: 'รหัสแผนกต้องตรงกับ "รหัสแผนก" ของแต่ละตำแหน่งงาน — แท็บแรกที่รหัสเป็น all จะแสดงทุกตำแหน่ง',
        list: { label: 'แท็บแผนก', titleKey: 'label', fields: [{ key: 'code', label: 'รหัสแผนก', type: 'plain', placeholder: 'เช่น sales' }, F.label] },
        defaults: {
            items: [
                { id: 'all', code: 'all', labelTh: 'ทุกตำแหน่ง (All)', labelEn: 'All Roles' },
                { id: 'sales', code: 'sales', labelTh: 'สินเชื่อ & พัฒนาธุรกิจ', labelEn: 'Credit & BD' },
                { id: 'engineering', code: 'engineering', labelTh: 'วิศวกรรม & ประเมินเครื่องจักร', labelEn: 'Engineering' },
                { id: 'tech', code: 'tech', labelTh: 'เทคโนโลยี & ฟินเทค', labelEn: 'Tech & IT' },
                { id: 'finance', code: 'finance', labelTh: 'ปฏิบัติการสินเชื่อ & การเงิน', labelEn: 'Finance & Ops' },
            ],
        },
    },
    {
        id: 'jobs',
        label: 'ตำแหน่งงานที่เปิดรับ (Open Positions)',
        fields: [...header(), { key: 'applyBtn', label: 'ข้อความปุ่มสมัคร' }],
        list: {
            label: 'ตำแหน่งงาน',
            titleKey: 'title',
            fields: [
                F.title,
                { key: 'department', label: 'รหัสแผนก (ใช้กรองแท็บ)', type: 'plain', placeholder: 'เช่น sales' },
                { key: 'dept', label: 'ชื่อแผนก' },
                { key: 'type', label: 'รูปแบบงาน', type: 'plain', placeholder: 'Full-time / Hybrid' },
                F.desc,
                { key: 'location', label: 'สถานที่ทำงาน' },
                { key: 'experience', label: 'ประสบการณ์ที่ต้องการ' },
            ],
        },
        defaults: {
            fields: {
                badgeTh: 'JOIN OUR TEAM', badgeEn: 'JOIN OUR TEAM',
                titleTh: 'ตำแหน่งงานที่เปิดรับสมัคร', titleEn: 'Current Open Positions',
                subtitleTh: 'ค้นหาตำแหน่งที่เหมาะกับความฝันและทักษะของคุณ แล้วส่งใบสมัครมาร่วมทีมกันได้เลย',
                subtitleEn: 'Explore our curated openings and find the ideal role to elevate your professional trajectory.',
                applyBtnTh: 'สมัครตำแหน่งนี้', applyBtnEn: 'Apply Now',
            },
            items: [
                {
                    id: 'job-credit-bd', department: 'sales', type: 'Hybrid',
                    titleTh: 'เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ (Commercial Credit & BD)', titleEn: 'Commercial Credit & Business Development Specialist',
                    deptTh: 'ฝ่ายพัฒนาธุรกิจสินเชื่อ (Business Development)', deptEn: 'Business Development & Credit',
                    locationTh: 'กรุงเทพฯ (สุขุมวิท) / เข้าพบลูกค้าโรงงาน', locationEn: 'Bangkok (Sukhumvit) / On-site Plant Visits',
                    experienceTh: 'ประสบการณ์ 2-5 ปี ด้านสินเชื่อธุรกิจ หรือลีสซิ่งเครื่องจักร', experienceEn: '2-5 years in commercial credit or machinery equipment leasing',
                    descTh: 'ดูแลและสร้างความสัมพันธ์กับผู้ประกอบการโรงงานอุตสาหกรรม วิเคราะห์โครงสร้างสินเชื่อเครื่องจักร และประสานงานจัดหาวงเงินที่เหมาะสม',
                    descEn: 'Manage corporate client accounts, assess machinery credit structures, and facilitate financing limits.',
                },
                {
                    id: 'job-machinery-engineer', department: 'engineering', type: 'Hybrid',
                    titleTh: 'วิศวกรประเมินราคาและตรวจสอบเครื่องจักร (Machinery Valuation Engineer)', titleEn: 'Industrial Machinery Valuation & Inspection Engineer',
                    deptTh: 'ฝ่ายวิศวกรรมและประเมินหลักประกัน (Engineering & Asset Risk)', deptEn: 'Engineering & Valuation',
                    locationTh: 'กรุงเทพฯ / ปริมณฑล / ลงพื้นที่โรงงาน', locationEn: 'Bangkok & Industrial Estates',
                    experienceTh: 'ประสบการณ์ 2 ปีขึ้นไป ในงานวิศวกรรมโรงงาน หรือประเมินเครื่องจักร', experienceEn: '2+ years in plant maintenance or machinery asset appraisal',
                    descTh: 'ตรวจสอบสภาพเครื่องจักรและอุปกรณ์อุตสาหกรรม (ชิลเลอร์, เครื่องฉีดพลาสติก, โซลาร์รูฟท็อป, เครื่องปั่นไฟ) และจัดทำรายงานประเมินมูลค่าซาก/มูลค่าตลาด',
                    descEn: 'Inspect industrial equipment condition and generate accurate residual and fair market valuation reports.',
                },
                {
                    id: 'job-fullstack-dev', department: 'tech', type: 'Hybrid',
                    titleTh: 'นักพัฒนาระบบฟินเทค (Senior Full-Stack Developer)', titleEn: 'Senior Full-Stack FinTech Developer',
                    deptTh: 'ฝ่ายเทคโนโลยีและดิจิทัล (Digital & FinTech Innovation)', deptEn: 'Technology & Digital',
                    locationTh: 'กรุงเทพฯ (Sukhumvit Office & Remote)', locationEn: 'Bangkok / Hybrid Remote',
                    experienceTh: 'ประสบการณ์ 3-6 ปี ในการพัฒนา Web Application (React, TypeScript, Node.js)', experienceEn: '3-6 years in React, TypeScript, Node.js modern stack',
                    descTh: 'ออกแบบและพัฒนาระบบ Management Portal, เครื่องมือคำนวณสินเชื่อ และระบบเชื่อมต่อ API สำหรับการพิจารณาสินเชื่อเครื่องจักรอัตโนมัติ',
                    descEn: 'Architect and scale our portal, automated underwriting engines, and internal financing tools.',
                },
                {
                    id: 'job-finance-officer', department: 'finance', type: 'Full-time',
                    titleTh: 'เจ้าหน้าที่บริหารสัญญาและสินเชื่อ (Credit Administration & Operations)', titleEn: 'Credit Operations & Settlement Specialist',
                    deptTh: 'ฝ่ายปฏิบัติการสินเชื่อ (Operations & Finance)', deptEn: 'Finance & Operations',
                    locationTh: 'สำนักงานใหญ่ กรุงเทพฯ (Sukhumvit)', locationEn: 'Head Office Bangkok',
                    experienceTh: 'ประสบการณ์ 1-3 ปี ด้านปฏิบัติการสัญญา หรือสินเชื่อลีสซิ่ง', experienceEn: '1-3 years in credit administration or leasing operations',
                    descTh: 'จัดเตรียมเอกสารสัญญาเช่าซื้อ ประสานงานเบิกจ่ายเงินกู้ไปยังผู้จำหน่ายเครื่องจักร (Supplier) และดูแลความถูกต้องของหลักประกัน',
                    descEn: 'Prepare loan documentation, coordinate supplier payment disbursements, and manage collateral custody.',
                },
            ],
        },
    },
    {
        id: 'apply',
        label: 'แบบฟอร์มสมัครงาน (Apply Online)',
        fields: [...header(), { key: 'resumeHint', label: 'คำแนะนำใต้ช่องลิงก์ Resume' }, { key: 'submitBtn', label: 'ข้อความปุ่มส่งใบสมัคร' }],
        defaults: {
            fields: {
                badgeTh: 'ONLINE APPLICATION', badgeEn: 'ONLINE APPLICATION',
                titleTh: 'ส่งใบสมัครงานของคุณ (Apply Online)', titleEn: 'Submit Your Job Application',
                subtitleTh: 'กรอกข้อมูลและแนบลิงก์ผลงานของคุณ ทีมงานของเราพร้อมต้อนรับคุณเข้าสู่ครอบครัว Agile',
                subtitleEn: 'Complete the form below to begin your career journey with Agile Assets.',
                resumeHintTh: '* สามารถวางลิงก์ Google Drive, Dropbox หรือโปรไฟล์ LinkedIn ของท่านได้',
                resumeHintEn: '* Provide a public link to your CV, Google Drive folder, or LinkedIn profile.',
                submitBtnTh: 'ส่งใบสมัครงานทันที', submitBtnEn: 'Submit Application',
            },
        },
    },
    {
        id: 'process',
        label: 'ขั้นตอนการคัดเลือก (Hiring Process)',
        fields: [F.badge, F.title],
        list: { label: 'ขั้นตอน', titleKey: 'title', fields: [{ key: 'step', label: 'ลำดับ', type: 'plain' }, F.title, F.desc] },
        defaults: {
            fields: {
                badgeTh: 'SELECTION JOURNEY', badgeEn: 'SELECTION JOURNEY',
                titleTh: '4 ขั้นตอนการคัดเลือกที่กระชับและโปร่งใส', titleEn: 'Our 4-Step Hiring Process',
            },
            items: [
                { id: 's1', step: '01', titleTh: 'ยื่นใบสมัครออนไลน์', titleEn: 'Apply Online', descTh: 'กรอกแบบฟอร์มด้านบนหรือส่ง Resume ให้เรา', descEn: 'Complete online application form or share your CV link' },
                { id: 's2', step: '02', titleTh: 'สัมภาษณ์เบื้องต้น', titleEn: 'Intro Screening', descTh: 'พูดคุย 15-30 นาทีเพื่อทำความรู้จักและสอบถามเป้าหมาย', descEn: '15-30 min phone/video discussion exploring mutual goals' },
                { id: 's3', step: '03', titleTh: 'สัมภาษณ์เชิงลึกกับทีม', titleEn: 'Team Interview', descTh: 'พูดคุยทัศนคติและโจทย์การทำงานกับทีมงานและผู้บริหาร', descEn: 'Deep-dive discussion with team leads and executives' },
                { id: 's4', step: '04', titleTh: 'รับ Offer & เริ่มงาน', titleEn: 'Job Offer & Welcome', descTh: 'เสนอสัญญาจ้างที่เหมาะสมและต้อนรับสู่ทีม Agile', descEn: 'Competitive offer letter and warm team welcome' },
            ],
        },
    },
    {
        id: 'faq',
        label: 'คำถามที่พบบ่อยเกี่ยวกับการสมัครงาน',
        fields: [F.title],
        list: { label: 'คำถาม', titleKey: 'q', fields: [F.q, F.a] },
        defaults: {
            fields: { titleTh: 'คำถามที่พบบ่อยเกี่ยวกับการสมัครงาน', titleEn: 'Careers FAQ' },
            items: [
                { id: 'f1', qTh: 'ขั้นตอนการสมัครงานและการสัมภาษณ์ใช้เวลานานเท่าไร?', qEn: 'How long does the recruitment process take?', aTh: 'โดยปกติกระบวนการทั้งหมดตั้งแต่ยื่นใบสมัครจนถึงทราบผลการคัดเลือกจะใช้เวลาประมาณ 1-2 สัปดาห์ โดยฝ่ายทรัพยากรบุคคลจะติดต่อกลับผู้สมัครที่ผ่านเกณฑ์เบื้องต้นภายใน 2-3 วันทำการ', aEn: 'The entire journey usually takes 1-2 weeks. Qualified candidates will receive an initial contact within 2-3 business days.' },
                { id: 'f2', qTh: 'นักศึกษาจบใหม่ (Fresh Graduate) สามารถสมัครได้หรือไม่?', qEn: 'Do you accept applications from fresh graduates?', aTh: 'ยินดีรับเป็นอย่างยิ่ง! เรามีตำแหน่งระดับ Entry-Level สำหรับผู้ที่มีความกระตือรือร้น พร้อมเรียนรู้ และมีทัศนคติเชิงบวก โดยมีทีมพี่เลี้ยงคอยดูแลและให้คำแนะนำอย่างใกล้ชิด', aEn: 'Absolutely! We offer entry-level openings for proactive individuals eager to learn, supported by senior mentors.' },
                { id: 'f3', qTh: 'รูปแบบการทำงานแบบ Hybrid Work มีรายละเอียดอย่างไร?', qEn: 'What does the Hybrid Work arrangement look like?', aTh: 'พนักงานสามารถสลับทำงานระหว่างที่สำนักงานใหญ่สุขุมวิท และ Work from Anywhere ได้ตามความเหมาะสมของแต่ละฝ่าย โดยเน้นการวัดผลงานและประสิทธิภาพเป็นหลัก', aEn: 'Employees balance between our Sukhumvit headquarters and remote workspaces, evaluated on outputs and team synergy.' },
                { id: 'f4', qTh: 'สถานที่ทำงานตั้งอยู่ที่ไหน และเดินทางอย่างไร?', qEn: 'Where is the office located and how do I commute?', aTh: 'สำนักงานใหญ่ของ Agile Assets ตั้งอยู่ในย่านธุรกิจสุขุมวิท กรุงเทพฯ เดินทางสะดวกด้วยระบบขนส่งสาธารณะ (BTS / MRT) และมีที่จอดรถรองรับสำหรับพนักงาน', aEn: 'Our headquarters is located in Sukhumvit commercial district, easily accessible via BTS/MRT with dedicated parking facilities.' },
            ],
        },
    },
];
