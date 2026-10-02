import type { PageSectionSchema } from '@/lib/pageSections';

export const homeEligibilitySections: PageSectionSchema[] = [
    {
        id: "eligibility",
        label: "หน้าแรก: คุณสมบัติลูกค้า (Eligibility)",
        fields: [
            { key: "t01", label: "ข้อความ — \"CUSTOMER ELIGIBILITY CRITERIAS\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"เกณฑ์การเป็นลูกค้าของอาไจล์ แอสเซ็ทส์\"", type: "text" },
            { key: "t03", label: "หัวข้อย่อย — \"ขอสินเชื่อกับ Agile Assets\"", type: "text" },
            { key: "t04", label: "ข้อความ — \"กรอกฟอร์มเพื่อให้เจ้าหน้าที่ติดต่อกลับ\"", type: "text" },
            { key: "t05", label: "ข้อความ — \"คลิกที่นี่\"", type: "text" },
            { key: "t06", label: "ข้อความ — \"โรงงาน\"", type: "text" },
            { key: "t07", label: "ข้อความ — \"สัญญาเช่าซื้อ\"", type: "text" },
            { key: "t08", label: "ข้อความ — \"มูลค่าสินเชื่อที่บริหารรวม (MB)\"", type: "text" },
        ],
        list: {
            label: "เกณฑ์คุณสมบัติ",
            titleKey: "title",
            fields: [
                { key: "icon", label: "icon", type: "icon" },
                { key: "title", label: "title", type: "text" },
                { key: "desc", label: "desc", type: "textarea" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "CUSTOMER ELIGIBILITY CRITERIAS",
                t01En: "CUSTOMER ELIGIBILITY CRITERIAS",
                t02Th: "เกณฑ์การเป็นลูกค้าของอาไจล์ แอสเซ็ทส์",
                t02En: "Agile Assets Customer Eligibility Criteria",
                t03Th: "ขอสินเชื่อกับ Agile Assets",
                t03En: "Apply with Agile Assets",
                t04Th: "กรอกฟอร์มเพื่อให้เจ้าหน้าที่ติดต่อกลับ",
                t04En: "Fill out application form for specialist callback",
                t05Th: "คลิกที่นี่",
                t05En: "Click Here",
                t06Th: "โรงงาน",
                t06En: "Industrial Plants",
                t07Th: "สัญญาเช่าซื้อ",
                t07En: "Active Leasing Contracts",
                t08Th: "มูลค่าสินเชื่อที่บริหารรวม (MB)",
                t08En: "Total Managed Value (MB)",
            },
            items: [
                { icon: "Building", titleTh: "ลูกค้านิติบุคคลเท่านั้น", titleEn: "Corporate Entities Only", descTh: "ให้บริการเฉพาะผู้ประกอบการที่จดทะเบียนในรูปแบบนิติบุคคลเท่านั้น เพื่อสร้างมาตรฐานความร่วมมือทางธุรกิจอย่างมืออาชีพและตรวจสอบได้", descEn: "Exclusively servicing registered corporate enterprises to ensure institutional business governance and transparency.", id: "eligibility-1" },
                { icon: "Cog", titleTh: "ปล่อยสินเชื่อเช่าซื้อเครื่องจักรเป็นหลัก", titleEn: "Machinery Hire Purchase Focus", descTh: "เราพิจารณาสินเชื่อเครื่องจักรอุตสาหกรรมประเภทต่างๆ เพื่อส่งมอบศักยภาพในการผลิตให้ถึงมือผู้ใช้โดยตรง โดยไม่ใช่การปล่อยกู้เป็นเงินสด เพื่อต่อยอดการเติบโตของธุรกิจ", descEn: "Credit facilities dedicated directly to industrial equipment delivery rather than cash lending, empowering immediate operational capability.", id: "eligibility-2" },
                { icon: "Clock", titleTh: "ผ่อนยาว 3-5 ปี", titleEn: "Flexible 3 – 5 Year Terms", descTh: "ระยะเวลาการผ่อนชำระที่ยืดหยุ่นตั้งแต่ 3 – 5 ปี เพื่อให้ธุรกิจสามารถบริหารจัดการกระแสเงินสด เพื่อให้สอดคล้องกับการหมุนเวียนในธุรกิจ", descEn: "Extended repayment structures from 3 to 5 years designed to optimize cash flow alignment with revenue generation.", id: "eligibility-3" },
                { icon: "ShieldCheck", titleTh: "หลักประกันยืดหยุ่นได้", titleEn: "Flexible Collateral Requirements", descTh: "มีเครื่องจักรที่เช่าซื้อเป็นหลักประกัน ประกอบกับหลักประกันอื่นๆ เสริม ที่สามารถยืดหยุ่นได้ เพื่อลดความเสี่ยง", descEn: "Financed equipment acts as core security, augmented by flexible secondary guarantees tailored to mitigate project risks.", id: "eligibility-4" },
                { icon: "TrendingUp", titleTh: "สนับสนุนกิจการพร้อมโต", titleEn: "Supporting High-Growth Ventures", descTh: "คัดเลือกธุรกิจที่มีความ พร้อมในการขยายกำลังการผลิต และสามารถสร้างยอดขายเพิ่มขึ้นได้ทันทีที่เครื่องจักรถูกส่งมอบและติดตั้ง เพื่อผลกำไรเติบโตอย่างก้าวกระโดด", descEn: "Partnering with enterprises primed for manufacturing expansion, ensuring rapid ROI and multiplied profitability.", id: "eligibility-5" },
            ],
        },
    },
];
