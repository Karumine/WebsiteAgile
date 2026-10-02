import type { PageSectionSchema } from '@/lib/pageSections';

export const newsletterPageSections: PageSectionSchema[] = [
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
        id: "issues",
        label: "จดหมายข่าวประจำปี (PDF)",
        fields: [
            { key: "t01", label: "ข้อความ — \"Agile Newsletter\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"จดหมายข่าวประจำปี\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"ดาวน์โหลดและอ่านฉบับเต็มของจดหมายข่า…\"", type: "text" },
            { key: "t04", label: "คำอธิบายเมื่อชี้ — \"เปิดดูเต็มจอ\"", type: "text" },
            { key: "t05", label: "คำอธิบายเมื่อชี้ — \"ดาวน์โหลดเอกสาร\"", type: "text" },
            { key: "t06", label: "ข้อความ — \"PDF • Agile Assets\"", type: "text" },
            { key: "t07", label: "ข้อความ — \"อ่านฉบับเต็ม\"", type: "text" },
        ],
        list: {
            label: "ฉบับจดหมายข่าว",
            titleKey: "title",
            fields: [
                { key: "title", label: "ชื่อฉบับ", type: "text" },
                { key: "issue", label: "ฉบับที่", type: "text" },
                { key: "pdfUrl", label: "ลิงก์ไฟล์ PDF", type: "link" },
                { key: "year", label: "ปี", type: "plain" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "Agile Newsletter",
                t01En: "Agile Newsletter",
                t02Th: "จดหมายข่าวประจำปี",
                t02En: "Annual Newsletters",
                t03Th: "ดาวน์โหลดและอ่านฉบับเต็มของจดหมายข่าว Agile Assets แบบ Interactive",
                t03En: "Download and read full interactive editions of Agile Assets annual reports.",
                t04Th: "เปิดดูเต็มจอ",
                t04En: "Open in New Tab",
                t05Th: "ดาวน์โหลดเอกสาร",
                t05En: "Download PDF",
                t06Th: "PDF • Agile Assets",
                t06En: "PDF • Agile Assets",
                t07Th: "อ่านฉบับเต็ม",
                t07En: "Read Full PDF",
            },
            items: [
                { id: "newsletter-1", titleTh: "Agile Assets Newsletter No.1", titleEn: "Agile Assets Newsletter No.1", issueTh: "ฉบับที่ 1", issueEn: "Issue No.1", pdfUrl: "https://agileassets.co.th/wp-content/uploads/2026/03/Agile-Assets-Newsletter.-No1.pdf", year: "2026" },
                { id: "newsletter-2", titleTh: "Agile Assets Newsletter No.2", titleEn: "Agile Assets Newsletter No.2", issueTh: "ฉบับที่ 2", issueEn: "Issue No.2", pdfUrl: "https://agileassets.co.th/wp-content/uploads/2026/03/Agile-Assets-Newsletter.-No2.pdf", year: "2026" },
                { id: "newsletter-3", titleTh: "Newsletter Issue 3 Final", titleEn: "Newsletter Issue 3 Final", issueTh: "ฉบับที่ 3 (ล่าสุด)", issueEn: "Issue No.3 (Latest)", pdfUrl: "https://agileassets.co.th/wp-content/uploads/2026/06/Newsletter-issue-3_Final.pdf", year: "2026" },
            ],
        },
    },
];
