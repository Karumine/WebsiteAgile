import type { PageSectionSchema } from '@/lib/pageSections';

export const homeWhatWeDoSections: PageSectionSchema[] = [
    {
        id: "what-we-do",
        label: "หน้าแรก: What We Do",
        fields: [
            { key: "img01", label: "รูปภาพ (URL)", type: "image" },
            { key: "t02", label: "หัวข้อ — \"WHAT WE DO\"", type: "text" },
            { key: "t03", label: "หัวข้อย่อย — \"ก้าวแรกของการเติบโต\"", type: "text" },
            { key: "t04", label: "ข้อความ — \"ธุรกิจจำนวนมากยังเข้าไม่ถึงเงินทุน โ…\"", type: "textarea" },
            { key: "t05", label: "หัวข้อย่อย — \"ABOUT AGILE ASSETS\"", type: "text" },
            { key: "t06", label: "ข้อความ — \"บริษัท อาไจล์ แอสเซ็ทส์ ขับเคลื่อนภา…\"", type: "textarea" },
            { key: "t07", label: "ข้อความ — \"ปัจจุบันบริษัทดูแลลูกค้ามากกว่า 50 โ…\"", type: "textarea" },
            { key: "t08", label: "ข้อความ — \"รู้จักเราให้มากขึ้น\"", type: "text" },
        ],
        list: {
            label: "การ์ดเสาหลัก",
            fields: [
                { key: "icon", label: "icon", type: "icon" },
                { key: "title", label: "title", type: "plain" },
                { key: "desc", label: "desc", type: "text" },
            ],
        },
        defaults: {
            fields: {
                img01: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1024&q=80",
                t02Th: "WHAT WE DO",
                t02En: "WHAT WE DO",
                t03Th: "ก้าวแรกของการเติบโต",
                t03En: "The First Step of Growth",
                t04Th: "ธุรกิจจำนวนมากยังเข้าไม่ถึงเงินทุน โดยเฉพาะในต่างจังหวัด เราจึงเข้าไปเติมเต็มโอกาสและมุ่งสนับสนุนให้การเติบโตของอุตสาหกรรมกระจายสู่ภูมิภาค",
                t04En: "Many enterprises still lack access to capital, particularly in provincial areas. We step in to bridge this opportunity and drive industrial growth across all regions.",
                t05Th: "ABOUT AGILE ASSETS",
                t05En: "ABOUT AGILE ASSETS",
                t06Th: "บริษัท อาไจล์ แอสเซ็ทส์ ขับเคลื่อนภายใต้วิสัยทัศน์ของผู้บริหาร เดินหน้าให้บริการเช่าซื้อเครื่องจักรแก่โรงงานทั่วประเทศ ครอบคลุมอุตสาหกรรมน้ำดื่ม น้ำแข็ง เครื่องกำเนิดไฟฟ้า พลังงานไบโอแก๊ส และฟาร์มปศุสัตว์",
                t06En: "Agile Assets Co., Ltd. operates under forward-thinking executive leadership, providing machinery leasing to industrial plants nationwide across drinking water, ice manufacturing, generators, biogas energy, and livestock farming.",
                t07Th: "ปัจจุบันบริษัทดูแลลูกค้ามากกว่า 50 โรงงาน และขยายบริการสู่หลากหลายอุตสาหกรรมเพิ่มมากขึ้น เพื่อรองรับความต้องการที่เพิ่มขึ้นอย่างต่อเนื่อง พร้อมมองเห็นโอกาสเติบโตในอุตสาหกรรมอาหารและพลาสติก รวมถึงเปิดรับพันธมิตรที่มีวิสัยทัศน์ร่วม ทั้งในด้านการลงทุน ความเชี่ยวชาญเฉพาะทาง และเครือข่ายอุตสาหกรรม เพื่อขับเคลื่อนธุรกิจไทยสู่ความยั่งยืน",
                t07En: "Today, the company oversees over 50 industrial plants and continues to expand across diverse sectors to satisfy rising demand. We welcome visionary partners in investment, specialized engineering, and industrial networks to empower sustainable growth.",
                t08Th: "รู้จักเราให้มากขึ้น",
                t08En: "Learn More About Us",
            },
            items: [
                { icon: "Handshake", title: "CLOSE", descTh: "ดูแลใกล้ชิด เสมือนพี่เลี้ยง", descEn: "Dedicated mentorship & close partnership", id: "what-we-do-1" },
                { icon: "HeartHandshake", title: "CARING", descTh: "เข้าใจและสนองความต้องการของ SMEs", descEn: "Attentive to SME growth challenges", id: "what-we-do-2" },
                { icon: "ShieldCheck", title: "FLEXIBLE", descTh: "ใช้หลักประกันน้อยและยืดหยุ่น", descEn: "Low collateral requirements & flexible terms", id: "what-we-do-3" },
            ],
        },
    },
];
