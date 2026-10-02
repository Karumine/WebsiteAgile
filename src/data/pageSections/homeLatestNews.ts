import type { PageSectionSchema } from '@/lib/pageSections';

export const homeLatestNewsSections: PageSectionSchema[] = [
    {
        id: "latest-news",
        label: "หน้าแรก: หัวข้อส่วนข่าวล่าสุด",
        fields: [
            { key: "t01", label: "ข้อความ — \"LATEST NEWS & ACTIVITYS\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"ข่าวสารและกิจกรรมของบริษัท\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"READ MORE\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "LATEST NEWS & ACTIVITYS",
                t01En: "LATEST NEWS & ACTIVITIES",
                t02Th: "ข่าวสารและกิจกรรมของบริษัท",
                t02En: "Company News and Corporate Activities",
                t03Th: "READ MORE",
                t03En: "READ MORE",
            },
        },
    },
];
