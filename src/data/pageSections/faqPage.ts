import type { PageSectionSchema } from '@/lib/pageSections';

export const faqPageSections: PageSectionSchema[] = [
    {
        id: "hero-extras",
        label: "ข้อความเพิ่มเติมใน Hero",
        canHide: false,
        fields: [
            { key: "t01", label: "ข้อความ — \"Agile Assets\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "Agile Assets",
                t01En: "Agile Assets",
            },
        },
    },
    {
        id: "faq-body",
        label: "หัวข้อ & กล่องติดต่อในหน้า FAQ",
        hint: "รายการคำถาม-คำตอบ แก้ได้ที่เมนู คำถามที่พบบ่อย (FAQ)",
        fields: [
            { key: "t01", label: "ข้อความ — \"Frequently Asked Questions (FAQ)\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"คำถามที่พบบ่อย\"", type: "text" },
            { key: "t03", label: "หัวข้อย่อย — \"มีข้อสงสัยหรือต้องการสอบถามเพิ่มเติม?\"", type: "text" },
            { key: "t04", label: "ข้อความ — \"เจ้าหน้าที่สินเชื่อผู้เชี่ยวชาญพร้อม…\"", type: "textarea" },
            { key: "link05", label: "ลิงก์ปลายทาง — \"https://line.me/R/ti/p/%40884ukedb\"", type: "link" },
            { key: "t06", label: "ข้อความ — \"ติดต่อที่ปรึกษาทาง LINE\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "Frequently Asked Questions (FAQ)",
                t01En: "Frequently Asked Questions (FAQ)",
                t02Th: "คำถามที่พบบ่อย",
                t02En: "Frequently Asked Questions",
                t03Th: "มีข้อสงสัยหรือต้องการสอบถามเพิ่มเติม?",
                t03En: "Need More Information or Personalized Advice?",
                t04Th: "เจ้าหน้าที่สินเชื่อผู้เชี่ยวชาญพร้อมให้คำปรึกษาและประเมินวงเงินเบื้องต้นฟรี",
                t04En: "Our financing specialists are ready to provide initial credit assessments and tailor solutions for your factory.",
                link05: "https://line.me/R/ti/p/%40884ukedb",
                t06Th: "ติดต่อที่ปรึกษาทาง LINE",
                t06En: "Chat via LINE Official",
            },
        },
    },
];
