import type { PageSectionSchema } from '@/lib/pageSections';

export const projectsSections: PageSectionSchema[] = [
    {
        id: "companies",
        label: "โครงการและกิจกรรมของเรา (บริษัทลูกค้า)",
        fields: [
            { key: "t01", label: "ข้อความ — \"Project & Activity\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"โครงการและกิจกรรมของเรา\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"ร่วมขับเคลื่อนธุรกิจภาคอุตสาหกรรม กา…\"", type: "textarea" },
        ],
        list: {
            label: "บริษัท / โครงการ",
            titleKey: "title",
            fields: [
                { key: "title", label: "ชื่อบริษัท", type: "text" },
                { key: "images", label: "รูปภาพสไลด์ (URL บรรทัดละ 1 รูป)", type: "lines", bilingual: false },
            ],
        },
        defaults: {
            fields: {
                t01Th: "Project & Activity",
                t01En: "Project & Activity",
                t02Th: "โครงการและกิจกรรมของเรา",
                t02En: "Our Projects & Activities",
                t03Th: "ร่วมขับเคลื่อนธุรกิจภาคอุตสาหกรรม การผลิต และการเกษตรกรรมไทยให้เติบโตอย่างมั่นคง",
                t03En: "Partnering with manufacturers, food producers, and agro-industrial enterprises across Thailand.",
            },
            items: [
                { titleTh: "บริษัท ชัยพร โฮลดิ้ง จำกัด", titleEn: "Chaiyaporn Holding Co., Ltd.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237159_0-1.jpg?t=1728555014\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237153_0.jpg?t=1728554825\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237161_0.jpg?t=1728557031\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237158_0.jpg?t=1728557031\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237156_0.jpg?t=1728557031", id: "companies-1" },
                { titleTh: "หจก.ไลฟ์ รีพับลิก", titleEn: "Life Republic Ltd., Part.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/20240910_142452.jpg?t=1728555279\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/20240910_135826.jpg?t=1728555319\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/Seaming_0.jpg?t=1728555320\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/Weighing_0.jpg?t=1728556692", id: "companies-2" },
                { titleTh: "บริษัท ชุมพรเอกฟ้า จำกัด", titleEn: "Chumphon Aek Fah Co., Ltd.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/338336402_2.jpg?t=1728556109\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/338209033_1.jpg?t=1728555902\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%9F%E0%B9%89%E0%B8%B2_001.jpg?t=1728555759\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/939C07D3-25EC-484F-95B5-E228DE296B1F.jpg?t=1728555759", id: "companies-3" },
                { titleTh: "บริษัท น้ำดื่มวินวิน จำกัด", titleEn: "Win Win Drinking Water Co., Ltd.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580756.jpg?t=1759907825\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580760.jpg?t=1759907825\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580772.jpg?t=1759907825\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580767.jpg?t=1759907825\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580771.jpg?t=1759907825", id: "companies-4" },
                { titleTh: "บริษัท มิลเลี่ยน แม็กไพส์ จำกัด", titleEn: "Million Magpies Co., Ltd.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2.jpg?t=1759908530\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_1.jpg?t=1759908530\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_3.jpg?t=1759908530\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_4.jpg?t=1759908530", id: "companies-5" },
                { titleTh: "อุดมทรัพย์ฟาร์ม", titleEn: "Udomsap Farm", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237098_0.jpg?t=1728554560\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237096_0.jpg?t=1728554560\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237116_0.jpg?t=1728554560\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237099_0.jpg?t=1728554560", id: "companies-6" },
                { titleTh: "บริษัท นันทวรรณ กรีนดริ้งค์ จำกัด", titleEn: "Nanthawan GreenDrink Co., Ltd.", images: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/286157.jpg?t=1759908780\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/286165.jpg?t=1759908781\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933336.jpg?t=1759908781\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933331.jpg?t=1759908781\nhttps://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933334.jpg?t=1759908781", id: "companies-7" },
                { titleTh: "บริษัท น้ำดื่มขอนแก่น จำกัด", titleEn: "Khon Kaen Drinking Water Co., Ltd.", images: "", id: "companies-8" },
            ],
        },
    },
    {
        id: "collage",
        label: "ภาพกิจกรรม (Photo Grid)",
        list: {
            label: "รูปภาพ",
            titleKey: "alt",
            fields: [
                { key: "src", label: "รูปภาพ (URL)", type: "image" },
                { key: "alt", label: "คำอธิบายรูป", type: "plain" },
            ],
        },
        defaults: {
            items: [
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/307397-1024x1024.jpg", alt: "Executive visit and client partnership handshake", id: "collage-1" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/S__1933333-1024x768.jpg", alt: "Factory project consultation meeting", id: "collage-2" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2-1024x768.jpg", alt: "Machinery handover team group photo", id: "collage-3" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/11896-1024x768.jpg", alt: "Conference room project briefing", id: "collage-4" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/237098_0-1024x768.jpg", alt: "Poultry farm ventilation and climate system commissioning", id: "collage-5" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/338213071_6247572745332805_2982020131925519013_n-1024x689.jpg", alt: "Corporate ceremonial plaque handover", id: "collage-6" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/20240910_142452-1024x768.jpg", alt: "MOU signing and formal financial cooperation", id: "collage-7" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/237159_0-1-1024x768.jpg", alt: "Electrical switchgear and substation audit", id: "collage-8" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_754/https://agileassets.co.th/wp-content/uploads/2022/01/263065161_417825200062927_7117604202506920683_n-754x1024-1.jpg", alt: "Industrial chiller piping and high-grade valve installation", id: "collage-9" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361722-1024x478.jpg", alt: "Heavy borehole drilling and water equipment project site", id: "collage-10" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_768/https://agileassets.co.th/wp-content/uploads/2022/03/361724-768x1645.jpg", alt: "High-power diesel generator set motor unit", id: "collage-11" },
                { src: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361726-1024x478.jpg", alt: "Industrial machinery commissioning and engineer site review", id: "collage-12" },
            ],
        },
    },
    {
        id: "actions",
        label: "ปุ่มด้านล่าง",
        fields: [
            { key: "link01", label: "ลิงก์ปลายทาง — \"https://line.me/R/ti/p/%40884ukedb\"", type: "link" },
            { key: "t02", label: "ข้อความ — \"Financing with Us\"", type: "text" },
            { key: "link03", label: "ลิงก์ปลายทาง — \"https://agileassets.co.th/wp-content/uploads/2021/11/Company-Profile-Agile-Assets.pdf\"", type: "link" },
            { key: "t04", label: "ข้อความ — \"Company Profile\"", type: "text" },
            { key: "t05", label: "ข้อความ — \"Newsletter\"", type: "text" },
        ],
        defaults: {
            fields: {
                link01: "https://line.me/R/ti/p/%40884ukedb",
                t02Th: "Financing with Us",
                t02En: "Financing with Us",
                link03: "https://agileassets.co.th/wp-content/uploads/2021/11/Company-Profile-Agile-Assets.pdf",
                t04Th: "Company Profile",
                t04En: "Company Profile",
                t05Th: "Newsletter",
                t05En: "Newsletter",
            },
        },
    },
];
