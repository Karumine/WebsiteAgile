import type { PageSectionSchema } from '@/lib/pageSections';

export const cookiePolicySections: PageSectionSchema[] = [
    {
        id: "overview",
        label: "กล่องสรุปนโยบาย",
        fields: [
            { key: "t01", label: "ข้อความ — \"เมื่อท่านได้เข้าสู่เว็บไซต์\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"agileassets.co.th\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"ข้อมูลที่เกี่ยวข้องกับการเข้าสู่เว็บ…\"", type: "textarea" },
            { key: "t04", label: "ข้อความ — \"การเข้าสู่เว็บไซต์นี้ถือว่าท่านได้อน…\"", type: "textarea" },
        ],
        defaults: {
            fields: {
                t01Th: "เมื่อท่านได้เข้าสู่เว็บไซต์",
                t01En: "When you visit the",
                t02Th: "agileassets.co.th",
                t02En: "agileassets.co.th",
                t03Th: "ข้อมูลที่เกี่ยวข้องกับการเข้าสู่เว็บไซต์ของท่านจะถูกเก็บเอาไว้ในรูปแบบของคุกกี้ โดยนโยบายคุกกี้นี้จะอธิบายความหมาย การทำงาน วัตถุประสงค์การรวม และการปฏิเสธการเก็บคุกกี้ เพื่อความเป็นส่วนตัวของท่าน",
                t03En: "website, information relating to your site visits will be stored in the form of cookies. This Cookies Policy explains the meaning, functionality, purpose, and options to refuse cookie storage for your personal privacy.",
                t04Th: "การเข้าสู่เว็บไซต์นี้ถือว่าท่านได้อนุญาตให้เราใช้คุกกี้ตามนโยบายคุกกี้ที่มีรายละเอียด ดังต่อไปนี้",
                t04En: "By continuing to use this website, you are considered to have consented to our use of cookies according to the details specified below.",
            },
        },
    },
    {
        id: "what",
        label: "1. คุกกี้คืออะไร",
        fields: [
            { key: "t01", label: "หัวข้อ — \"คุกกี้คืออะไร\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"คุกกี้ คือ ไฟล์ขนาดเล็กเพื่อจัดเก็บข…\"", type: "textarea" },
            { key: "t03", label: "ข้อความ — \"ในกรณีนี้ ข้อมูลส่วนบุคคลของท่านจะถู…\"", type: "textarea" },
        ],
        defaults: {
            fields: {
                t01Th: "คุกกี้คืออะไร",
                t01En: "What Are Cookies?",
                t02Th: "คุกกี้ คือ ไฟล์ขนาดเล็กเพื่อจัดเก็บข้อมูล โดยจะบันทึกลงในอุปกรณ์คอมพิวเตอร์ และ/หรือ เครื่องมือสื่อสารที่เข้าใช้งานของท่าน เช่น สมาร์ทโฟน แท็บเล็ต เป็นต้น ผ่านทางเว็บบราวเซอร์ในขณะที่ท่านเข้าสู่เว็บไซต์ของเรา โดยคุกกี้จะไม่ก่อให้เกิดอันตรายต่ออุปกรณ์คอมพิวเตอร์ และ/หรือ เครื่องมือสื่อสารของท่าน",
                t02En: "Cookies are small text files used to store data, saved onto your computer and/or mobile communication devices (such as smartphones or tablets) via your web browser while accessing our website. Cookies do not pose any threat or damage to your computer systems or devices.",
                t03Th: "ในกรณีนี้ ข้อมูลส่วนบุคคลของท่านจะถูกจัดเก็บ เพื่อใช้เพิ่มประสบการณ์การใช้งานบริการของเราทางออนไลน์ โดยจะจำเอกลักษณ์ของภาษาและปรับแต่งข้อมูลการใช้งานตามความต้องการของท่าน โดยการเก็บข้อมูลนี้เพื่อเป็นการยืนยันคุณลักษณะเฉพาะตัว ข้อมูลความปลอดภัยของท่าน รวมถึงผลิตภัณฑ์และบริการที่ท่านสนใจ นอกจากนี้ คุกกี้ยังถูกใช้เพื่อวัดปริมาณการเข้าใช้งานบริการทางออนไลน์ การปรับเปลี่ยนเนื้อหาตามการใช้งานของท่านทั้งในก่อนหน้าและปัจจุบัน หรือเพื่อวัตถุประสงค์ในการโฆษณาและประชาสัมพันธ์",
                t03En: "In this regard, your personal data will be collected to optimize your online user experience by remembering language preferences and customizing service data according to your needs. This data helps authenticate identity, verify security credentials, and track products or services of interest. Furthermore, cookies are utilized to measure online traffic volumes, adapt content based on past and current usage, and support advertising or PR outreach.",
            },
        },
    },
    {
        id: "how",
        label: "2. เราใช้คุกกี้อย่างไร",
        fields: [
            { key: "t01", label: "หัวข้อ — \"เราใช้คุกกี้อย่างไร\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"เราใช้คุกกี้เพื่อเพิ่มประสบการณ์และค…\"", type: "textarea" },
            { key: "t03", label: "ข้อความ — \"บางกรณีเราจำเป็นต้องให้บุคคลที่สามดำ…\"", type: "textarea" },
        ],
        defaults: {
            fields: {
                t01Th: "เราใช้คุกกี้อย่างไร",
                t01En: "How We Use Cookies",
                t02Th: "เราใช้คุกกี้เพื่อเพิ่มประสบการณ์และความพึงพอใจของท่าน โดยจะทำให้เราเข้าใจลักษณะการใช้งานเว็บไซต์ของท่านได้เร็ว และทำให้เว็บไซต์ของเราเข้าถึงได้ง่าย สะดวกยิ่งขึ้น",
                t02En: "We use cookies to enhance your browsing experience and satisfaction, helping us understand usage behavior rapidly and making our website more accessible and convenient.",
                t03Th: "บางกรณีเราจำเป็นต้องให้บุคคลที่สามดำเนินการ ซึ่งอาจต้องใช้ IP Address และคุกกี้เพื่อการวิเคราะห์ทางสถิติ รวมถึงเชื่อมโยงข้อมูล และประมวลผลตามวัตถุประสงค์ทางการตลาด",
                t03En: "In certain circumstances, we engage trusted third-party analytics providers which may process IP Addresses and cookie data for statistical evaluation, data correlation, and marketing optimization purposes.",
            },
        },
    },
    {
        id: "manage",
        label: "3. การจัดการคุกกี้ & คู่มือเบราว์เซอร์",
        fields: [
            { key: "t01", label: "หัวข้อ — \"การจัดการคุกกี้\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"ท่านสามารถลบและปฏิเสธการเก็บคุกกี้ได…\"", type: "textarea" },
        ],
        list: {
            label: "ลิงก์คู่มือเบราว์เซอร์",
            titleKey: "name",
            fields: [
                { key: "name", label: "ชื่อเบราว์เซอร์", type: "plain" },
                { key: "url", label: "ลิงก์คู่มือ", type: "link" },
                { key: "desc", label: "คำอธิบาย", type: "text" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "การจัดการคุกกี้",
                t01En: "Cookie Management & Settings",
                t02Th: "ท่านสามารถลบและปฏิเสธการเก็บคุกกี้ได้โดยศึกษาตามวิธีการที่ระบุในแต่ละเว็บบราวเซอร์ที่ท่านใช้อยู่ เช่น Chrome / Firefox / Internet Explorer / Safari / Edge เป็นต้น",
                t02En: "You can delete, disable, or decline cookie collection at any time by configuring settings in your specific web browser, such as Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, etc.",
            },
            items: [
                { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647", descTh: "สำหรับเดสก์ท็อป Windows / macOS", descEn: "For desktop Windows / macOS", id: "manage-1" },
                { name: "Mozilla Firefox", url: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop", descTh: "การจัดการคุกกี้และความเป็นส่วนตัว", descEn: "Enhanced tracking protection & cookies", id: "manage-2" },
                { name: "Apple Safari (macOS)", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac", descTh: "จัดการคุกกี้และข้อมูลเว็บไซต์บน Mac", descEn: "Manage cookies and website data on Mac", id: "manage-3" },
                { name: "Safari for iOS (iPhone / iPad)", url: "https://support.apple.com/HT201265", descTh: "ล้างประวัติและคุกกี้บนอุปกรณ์ iOS", descEn: "Clear history and cookies on iOS devices", id: "manage-4" },
                { name: "Chrome for Android", url: "https://support.google.com/chrome/answer/114662", descTh: "การตั้งค่าคุกกี้บนมือถือ Android", descEn: "Manage cookies on Android mobile devices", id: "manage-5" },
                { name: "Microsoft Edge", url: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09", descTh: "การลบและบล็อกคุกกี้ใน Edge", descEn: "Delete and block cookies in Edge", id: "manage-6" },
            ],
        },
    },
    {
        id: "changes",
        label: "4. การเปลี่ยนแปลงนโยบาย",
        fields: [
            { key: "t01", label: "หัวข้อ — \"การเปลี่ยนแปลงนโยบายคุกกี้\"", type: "text" },
            { key: "t02", label: "ข้อความ — \"นโยบายคุกกี้นี้อาจมีการปรับปรุงแก้ไข…\"", type: "textarea" },
            { key: "t03", label: "ข้อความ — \"ปรับปรุงล่าสุด: 31 สิงหาคม 2569\"", type: "text" },
        ],
        defaults: {
            fields: {
                t01Th: "การเปลี่ยนแปลงนโยบายคุกกี้",
                t01En: "Changes to This Cookies Policy",
                t02Th: "นโยบายคุกกี้นี้อาจมีการปรับปรุงแก้ไขตามความเหมาะสม เพื่อให้สอดคล้องตามกฎระเบียบ พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) และมาตรฐานการกำกับดูแล และจะได้รับการประกาศไว้ที่เว็บไซต์ agileassets.co.th ในหัวข้อ \"ประกาศเรื่องนโยบายคุกกี้\"",
                t02En: "This Cookies Policy may be updated or amended periodically to remain compliant with evolving statutory regulations, the Personal Data Protection Act (PDPA), and institutional governing standards. All revisions will be officially published on agileassets.co.th under \"Cookies Policy\".",
                t03Th: "ปรับปรุงล่าสุด: 31 สิงหาคม 2569",
                t03En: "Last Updated: August 31, 2026",
            },
        },
    },
];
