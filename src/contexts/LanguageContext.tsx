import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Lang = 'th' | 'en';

const LANG_STORAGE_KEY = 'agile_assets_lang';

// ─── Translation Dictionary ───
const translations: Record<string, Record<Lang, string>> = {
    // Navbar
    'nav.home': { en: 'Home', th: 'หน้าหลัก' },
    'nav.rates': { en: 'Rates', th: 'อัตราดอกเบี้ย' },
    'nav.news': { en: 'News', th: 'ข่าวสาร' },
    'nav.about': { en: 'About', th: 'เกี่ยวกับเรา' },
    'nav.contact': { en: 'Contact', th: 'ติดต่อเรา' },

    // Hero Banner
    'hero.badge': { en: 'Trusted by 10,000+ Investors Since 2010', th: 'ได้รับความไว้วางใจจากนักลงทุนกว่า 10,000 ราย ตั้งแต่ปี 2010' },
    'hero.learnMore': { en: 'Learn More', th: 'เรียนรู้เพิ่มเติม' },
    'hero.stat.aum': { en: 'Assets Under Management', th: 'สินทรัพย์ภายใต้การจัดการ' },
    'hero.stat.years': { en: 'Years of Excellence', th: 'ปีแห่งความเป็นเลิศ' },
    'hero.stat.approval': { en: 'Average Loan Approval', th: 'อนุมัติสินเชื่อเฉลี่ย' },
    'hero.stat.approvalValue': { en: '24 Hours', th: '24 ชั่วโมง' },

    // Interest Rates
    'rates.badge': { en: 'Live Rates', th: 'อัตราล่าสุด' },
    'rates.title': { en: 'Competitive Interest Rates', th: 'อัตราดอกเบี้ยที่แข่งขันได้' },
    'rates.subtitle': { en: 'Transparent, competitive rates across all our lending products. Updated in real-time.', th: 'อัตราดอกเบี้ยที่โปร่งใสและแข่งขันได้สำหรับทุกผลิตภัณฑ์สินเชื่อ อัปเดตแบบเรียลไทม์' },
    'rates.featured': { en: 'Featured', th: 'แนะนำ' },
    'rates.apr': { en: 'APR', th: 'ต่อปี' },
    'rates.term': { en: 'Term', th: 'ระยะเวลา' },
    'rates.disclaimer': { en: '* Rates are subject to change and may vary based on creditworthiness and loan amount. Contact us for a personalized quote.', th: '* อัตราดอกเบี้ยอาจมีการเปลี่ยนแปลง และอาจแตกต่างกันตามความน่าเชื่อถือและยอดสินเชื่อ ติดต่อเราเพื่อรับใบเสนอราคาเฉพาะบุคคล' },

    // News
    'news.badge': { en: 'Latest Updates', th: 'ข่าวสารล่าสุด' },
    'news.title': { en: 'News & Announcements', th: 'ข่าวสาร & ประกาศ' },
    'news.subtitle': { en: 'Stay informed with the latest market insights, company news, and financial updates.', th: 'ติดตามข่าวสาร ข้อมูลเชิงลึกเกี่ยวกับตลาด และอัปเดตทางการเงินล่าสุด' },
    'news.pinned': { en: 'Pinned', th: 'ปักหมุด' },
    'news.readMore': { en: 'Read More', th: 'อ่านต่อ' },

    // About
    'about.title': { en: 'Why Choose', th: 'ทำไมต้องเลือก' },
    'about.subtitle': { en: 'We combine decades of financial expertise with cutting-edge technology to deliver unmatched value to our clients and investors.', th: 'เรารวมประสบการณ์ด้านการเงินหลายทศวรรษเข้ากับเทคโนโลยีล้ำสมัย เพื่อส่งมอบคุณค่าที่ดีที่สุดให้แก่ลูกค้าและนักลงทุน' },
    'about.precision': { en: 'Precision', th: 'ความแม่นยำ' },
    'about.precision.desc': { en: 'Every financial decision is backed by rigorous analysis and market intelligence.', th: 'ทุกการตัดสินใจทางการเงินได้รับการสนับสนุนจากการวิเคราะห์อย่างรอบคอบ' },
    'about.clientFirst': { en: 'Client-First', th: 'ลูกค้าต้องมาก่อน' },
    'about.clientFirst.desc': { en: 'Your success is our benchmark. We build lasting relationships, not just transactions.', th: 'ความสำเร็จของคุณคือเกณฑ์มาตรฐานของเรา เราสร้างความสัมพันธ์ที่ยั่งยืน' },
    'about.excellence': { en: 'Excellence', th: 'ความเป็นเลิศ' },
    'about.excellence.desc': { en: '16 years of delivering best-in-class financial products and advisory services.', th: '16 ปีแห่งการส่งมอบผลิตภัณฑ์ทางการเงินและบริการที่ปรึกษาระดับสูง' },
    'about.innovation': { en: 'Innovation', th: 'นวัตกรรม' },
    'about.innovation.desc': { en: 'Leveraging technology to provide faster approvals and smarter lending solutions.', th: 'ใช้เทคโนโลยีเพื่อการอนุมัติที่รวดเร็วและโซลูชันสินเชื่อที่ชาญฉลาด' },

    // Contact
    'contact.title': { en: 'Get in Touch', th: 'ติดต่อเรา' },
    'contact.subtitle': { en: 'Ready to explore your financial options? Our team is here to help.', th: 'พร้อมที่จะสำรวจทางเลือกทางการเงินของคุณ? ทีมงานของเราพร้อมช่วยเหลือ' },
    'contact.info': { en: 'Contact Information', th: 'ข้อมูลติดต่อ' },
    'contact.phone': { en: 'Phone', th: 'โทรศัพท์' },
    'contact.email': { en: 'Email', th: 'อีเมล' },
    'contact.address': { en: 'Address', th: 'ที่อยู่' },
    'contact.hours': { en: 'Business Hours', th: 'เวลาทำการ' },
    'contact.hours.weekday': { en: 'Monday – Friday: 8:00 AM – 6:00 PM EST', th: 'จันทร์ – ศุกร์: 8:00 – 18:00 น.' },
    'contact.hours.saturday': { en: 'Saturday: 9:00 AM – 1:00 PM EST', th: 'เสาร์: 9:00 – 13:00 น.' },
    'contact.hours.sunday': { en: 'Sunday: Closed', th: 'อาทิตย์: ปิดทำการ' },
    'contact.form.title': { en: 'Send Us a Message', th: 'ส่งข้อความถึงเรา' },
    'contact.form.name': { en: 'Full Name', th: 'ชื่อ-นามสกุล' },
    'contact.form.namePlaceholder': { en: 'Your full name', th: 'กรอกชื่อ-นามสกุล' },
    'contact.form.email': { en: 'Email', th: 'อีเมล' },
    'contact.form.emailPlaceholder': { en: 'your.email@example.com', th: 'your.email@example.com' },
    'contact.form.message': { en: 'Message', th: 'ข้อความ' },
    'contact.form.messagePlaceholder': { en: 'How can we help you?', th: 'คุณต้องการสอบถามเรื่องใด?' },
    'contact.form.submit': { en: 'Send Message', th: 'ส่งข้อความ' },
    'contact.form.success': { en: 'Thank you! Your message has been sent successfully.', th: 'ขอบคุณ! ข้อความของคุณได้ถูกส่งเรียบร้อยแล้ว' },

    // Footer
    'footer.quickLinks': { en: 'Quick Links', th: 'ลิงก์ด่วน' },
    'footer.contact': { en: 'Contact', th: 'ติดต่อ' },
    'footer.copyright': { en: 'All rights reserved.', th: 'สงวนลิขสิทธิ์' },
    'footer.license': { en: 'Licensed by the Department of Financial Institutions. NMLS #123456', th: 'ได้รับอนุญาตจากกรมสถาบันการเงิน เลขที่ NMLS #123456' },
};

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        return (stored === 'th' || stored === 'en') ? stored : 'th';
    });

    useEffect(() => {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    }, [lang]);

    const setLang = (newLang: Lang) => setLangState(newLang);

    const t = useCallback((key: string): string => {
        return translations[key]?.[lang] ?? key;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
