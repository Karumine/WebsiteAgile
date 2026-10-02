import type { PageSectionSchema } from '@/lib/pageSections';

export const newsPageSections: PageSectionSchema[] = [
    {
        id: "hero-extras",
        label: "ข้อความเพิ่มเติมใน Hero",
        canHide: false,
        fields: [
            { key: "t01", label: "ข้อความ — \"Agile Assets\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"Learn More\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "Agile Assets",
                t01En: "Agile Assets",
                t02Th: "Learn More",
                t02En: "Learn More",
            },
        },
    },
    {
        id: "main",
        label: "หัวข้อข่าวสารประชาสัมพันธ์",
        fields: [
            { key: "t01", label: "ข้อความ — \"News Update\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"ข่าวสารประชาสัมพันธ์\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"ติดตามข่าวสารความเคลื่อนไหว กิจกรรมอ…\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "News Update",
                t01En: "News Update",
                t02Th: "ข่าวสารประชาสัมพันธ์",
                t02En: "Corporate News & Announcements",
                t03Th: "ติดตามข่าวสารความเคลื่อนไหว กิจกรรมองค์กร และความร่วมมือทางธุรกิจ",
                t03En: "Stay informed with the latest corporate press releases, milestones, and announcements.",
            },
        },
    },
    {
        id: "shareholders",
        label: "ข่าวเด่น: แนะนำผู้ถือหุ้น",
        fields: [
            { key: "t01", label: "ข้อความ — \"ข่าวเด่นประจำเดือน\"", type: "text" },
            { key: "t02", label: "หัวข้อย่อย — \"แนะนำผู้ถือหุ้นใหม่ บริษัทอาไจล์ แอส…\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"บริษัทอาไจล์ แอสเซ็ทส์ ขอต้อนรับผู้ถ…\"", type: "textarea" },
            { key: "t04", label: "ข้อความ — \"สะท้อนถึงความเชื่อมั่นในทิศทางการดำเ…\"", type: "textarea" },
        ],
        list: {
            label: "ผู้ถือหุ้น",
            titleKey: "name",
            fields: [
                { key: "name", label: "ชื่อ", type: "text" },
                { key: "position", label: "ตำแหน่ง (ขึ้นบรรทัดใหม่ได้)", type: "textarea" },
                { key: "image", label: "รูปภาพ (URL)", type: "image" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "ข่าวเด่นประจำเดือน",
                t01En: "Featured Announcement",
                t02Th: "แนะนำผู้ถือหุ้นใหม่ บริษัทอาไจล์ แอสเซ็ทส์",
                t02En: "Introducing New Strategic Shareholders of Agile Assets",
                t03Th: "บริษัทอาไจล์ แอสเซ็ทส์ ขอต้อนรับผู้ถือหุ้นใหม่ เพื่อเสริมศักยภาพการเติบโต",
                t03En: "Agile Assets Welcomes Distinguished Shareholders to Strengthen Growth Potential",
                t04Th: "สะท้อนถึงความเชื่อมั่นในทิศทางการดำเนินงานของบริษัท และเป็นปัจจัยสำคัญที่ช่วยเสริมความมั่นคงของโครงสร้างทางการเงิน รวมถึงเพิ่มโอกาสในการเติบโตอย่างต่อเนื่องในอนาคต บริษัทฯ ยังคงมุ่งมั่นในการดำเนินธุรกิจด้วยความโปร่งใส และสร้างคุณค่าให้กับผู้มีส่วนได้ส่วนเสียทุกภาคส่วน พร้อมเดินหน้าสู่การเติบโตอย่างมีคุณภาพและยั่งยืนต่อไป",
                t04En: "Reflecting profound market confidence in the company’s strategic vision and fortifying our financial capital structure. Agile Assets remains steadfast in transparent corporate governance, creating enduring value for all industrial stakeholders.",
            },
            items: [
                { nameTh: "คุณโชน โสภณพนิช", nameEn: "Mr. Chone Sophonpanich", positionTh: "กรรมการผู้จัดการใหญ่และประธานเจ้าหน้าที่บริหาร\nบริษัท กรุงเทพประกันชีวิต จำกัด (มหาชน)", positionEn: "President and Chief Executive Officer\nBangkok Life Assurance Public Co., Ltd.", image: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/elementor/thumbs/S__44187672_0-e1776838737858-rmdbfhtslbh5zk6f2p7f2gwtfrfocu2qupe8q4iuv8.jpg", id: "shareholders-1" },
                { nameTh: "ดร.ธรรม์ จิราธิวัฒน์", nameEn: "Dr. Tham Chirathivat", positionTh: "ประธานเจ้าหน้าที่บริหาร\nเซ็นทรัล รีเทล เวียดนาม", positionEn: "Chief Executive Officer\nCentral Retail Vietnam", image: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_570,h_570/https://agileassets.co.th/wp-content/uploads/2026/04/190.ธรรม์-จิราธิวัฒน์2_570x570_acf_cropped.jpg", id: "shareholders-2" },
            ],
        },
    },
    {
        id: "press",
        label: "ข่าวประชาสัมพันธ์ของบริษัท",
        fields: [
            { key: "t01", label: "หัวข้อย่อย — \"ข่าวสารประชาสัมพันธ์ของบริษัท\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"Agile Assets Official\"", type: "text" },
        ],
        list: {
            label: "ข่าวประชาสัมพันธ์",
            titleKey: "title",
            fields: [
                { key: "tag", label: "แท็ก", type: "text" },
                { key: "date", label: "วันที่/ปี", type: "plain" },
                { key: "title", label: "หัวข้อ", type: "text" },
                { key: "subtitle", label: "subtitle", type: "textarea" },
                { key: "desc", label: "desc", type: "textarea" },
                { key: "icon", label: "icon", type: "icon" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "ข่าวสารประชาสัมพันธ์ของบริษัท",
                t01En: "Corporate Press Releases & Milestones",
                t02Th: "Agile Assets Official",
                t02En: "Agile Assets Official",
            },
            items: [
                { id: "corp-1", tagTh: "ผลประกอบการ", tagEn: "Financial Performance", date: "2026", titleTh: "บริษัทอาไจล์ แอสเซ็ทส์ มีกำไรทางบัญชีต่อเนื่อง", titleEn: "Agile Assets Reports Sustained Net Accounting Profit", subtitleTh: "เรามีกำไรทางบัญชีในปี 2568 มากกว่า 3.9 ล้านบาท", subtitleEn: "Achieved over 3.9 Million Baht net accounting profit in 2025", descTh: "สะท้อนถึงการเติบโตและการพัฒนาอย่างต่อเนื่องขององค์กรและทีมงานของเรา เราสัญญาว่าจะยึดมั่นในความโปร่งใสและมุ่งมั่นเพื่อลูกค้าของเราสามารถเติบโตไปพร้อม ๆ กันอย่างมั่นคง", descEn: "Reflecting resilient operational growth, credit underwriting rigor, and sustainable client partnerships across nationwide manufacturing plants.", icon: "TrendingUp" },
                { id: "corp-2", tagTh: "การขยายธุรกิจ", tagEn: "Business Expansion", date: "2026", titleTh: "ขยายการให้บริการสินเชื่อเครื่องจักรดูแลลูกค้ากว่า 50 โรงงานทั่วประเทศ", titleEn: "Serving Over 50 Industrial Plants Nationwide Across Key Sectors", subtitleTh: "ครอบคลุมอุตสาหกรรมน้ำดื่ม ฟาร์มปศุสัตว์ แปรรูปอาหาร และพลังงานหมุนเวียน", subtitleEn: "Covering drinking water, livestock cooling, food processing, and renewables", descTh: "เดินหน้าสนับสนุนสินเชื่อเครื่องจักรและอุปกรณ์อุตสาหกรรมครบวงจร เสริมสภาพคล่องให้โรงงานไทยขยายกำลังการผลิตได้อย่างต่อเนื่อง", descEn: "Expanding tailored machinery leasing and working capital solutions to meet accelerating private sector industrial expansion.", icon: "Building2" },
                { id: "corp-3", tagTh: "ความยั่งยืน ESG", tagEn: "ESG Sustainability", date: "2026", titleTh: "ยกระดับมาตรฐานความโปร่งใสและการสนับสนุนสินเชื่อเพื่อสิ่งแวดล้อม", titleEn: "Elevating Corporate Governance & Green ESG Machinery Financing", subtitleTh: "ส่งเสริมการลงทุนเครื่องจักรประหยัดพลังงานและระบบโซลาร์เซลล์โรงงาน", subtitleEn: "Promoting energy-efficient machinery upgrades and commercial solar", descTh: "ขับเคลื่อนธุรกิจภายใต้หลักธรรมาภิบาล พร้อมเปิดรับพันธมิตรที่มีวิสัยทัศน์ร่วมกันเพื่อร่วมสร้างความมั่นคงทางพลังงานและเศรษฐกิจหมุนเวียน", descEn: "Adhering to strict ESG standards, transparent underwriting, and collaborative value creation for all stakeholders.", icon: "ShieldCheck" },
            ],
        },
    },
];
