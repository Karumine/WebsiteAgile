import type { PageSectionSchema } from '@/lib/pageSections';

export const homeProjectsSections: PageSectionSchema[] = [
    {
        id: "projects-gallery",
        label: "หน้าแรก: ผลงานของเรา (Our Projects)",
        fields: [
            { key: "t01", label: "ข้อความ — \"OUR PROJECTS\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"โครงการของเรา\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"เราให้การสนับสนุนผู้รับสินเชื่อและสน…\"", type: "text" },
            { key: "t04", label: "ข้อความ — \"ดูโครงการทั้งหมดของเรา\"", type: "text" },
        ],
        list: {
            label: "รูปผลงาน",
            fields: [
                { key: "src", label: "src", type: "image" },
                { key: "fallback", label: "fallback", type: "textarea", bilingual: false },
                { key: "alt", label: "alt", type: "plain" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "OUR PROJECTS",
                t01En: "OUR PROJECTS",
                t02Th: "โครงการของเรา",
                t02En: "Our Financed Projects & Activities",
                t03Th: "เราให้การสนับสนุนผู้รับสินเชื่อและสนับสนุนคนขายเครื่องจักร",
                t03En: "Empowering machinery buyers and equipment distributors nationwide.",
                t04Th: "ดูโครงการทั้งหมดของเรา",
                t04En: "View All Our Projects",
            },
            items: [
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/307397-1024x1024.jpg", fallback: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", alt: "Factory project handover & customer partnership", id: "projects-gallery-1" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/338213071_6247572745332805_2982020131925519013_n-1024x689.jpg", fallback: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", alt: "Agile Assets signage and customer handover ceremony", id: "projects-gallery-2" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80", alt: "Machinery inspection team and plant managers", id: "projects-gallery-3" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/20240910_142452-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", alt: "Customer gift and financing agreement congratulation", id: "projects-gallery-4" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/S__1933333-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", alt: "Corporate plant signage and team audit", id: "projects-gallery-5" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/11896-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", alt: "Customer discussion and partnership gift handover", id: "projects-gallery-6" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/237098_0-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80", alt: "Agro-industrial livestock barn inspection site", id: "projects-gallery-7" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/237159_0-1-1024x768.jpg", fallback: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80", alt: "Engineering site visit and installation team review", id: "projects-gallery-8" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361722-1024x478.jpg", fallback: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80", alt: "Client office gift giving and financing support meeting", id: "projects-gallery-9" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361726-1024x478.jpg", fallback: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", alt: "Factory staff and Agile Assets engineering delegation", id: "projects-gallery-10" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_754/https://agileassets.co.th/wp-content/uploads/2022/01/263065161_417825200062927_7117604202506920683_n-754x1024-1.jpg", fallback: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", alt: "Plant delivery ceremony and banner handover", id: "projects-gallery-11" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_768/https://agileassets.co.th/wp-content/uploads/2022/03/361724-768x1645.jpg", fallback: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80", alt: "Industrial bottling warehouse plant commissioning", id: "projects-gallery-12" },
            ],
        },
    },
];
