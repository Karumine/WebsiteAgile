import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function CookiePolicyPage() {
    const { lang } = useLanguage();

    const browserGuides = [
        {
            name: 'Google Chrome',
            url: 'https://support.google.com/chrome/answer/95647',
            descTh: 'สำหรับเดสก์ท็อป Windows / macOS',
            descEn: 'For desktop Windows / macOS',
        },
        {
            name: 'Mozilla Firefox',
            url: 'https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop',
            descTh: 'การจัดการคุกกี้และความเป็นส่วนตัว',
            descEn: 'Enhanced tracking protection & cookies',
        },
        {
            name: 'Apple Safari (macOS)',
            url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac',
            descTh: 'จัดการคุกกี้และข้อมูลเว็บไซต์บน Mac',
            descEn: 'Manage cookies and website data on Mac',
        },
        {
            name: 'Safari for iOS (iPhone / iPad)',
            url: 'https://support.apple.com/HT201265',
            descTh: 'ล้างประวัติและคุกกี้บนอุปกรณ์ iOS',
            descEn: 'Clear history and cookies on iOS devices',
        },
        {
            name: 'Chrome for Android',
            url: 'https://support.google.com/chrome/answer/114662',
            descTh: 'การตั้งค่าคุกกี้บนมือถือ Android',
            descEn: 'Manage cookies on Android mobile devices',
        },
        {
            name: 'Microsoft Edge',
            url: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
            descTh: 'การลบและบล็อกคุกกี้ใน Edge',
            descEn: 'Delete and block cookies in Edge',
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500/20 selection:text-sky-500">
            <Helmet>
                <title>
                    {lang === 'th'
                        ? 'นโยบายคุกกี้ (Cookies Policy) | Agile Assets'
                        : 'Cookies Policy | Agile Assets'}
                </title>
                <meta
                    name="description"
                    content={
                        lang === 'th'
                            ? 'นโยบายการใช้คุกกี้ (Cookies Policy) ของบริษัท Agile Assets จำกัด เพื่ออธิบายความหมาย การทำงาน วัตถุประสงค์ และการจัดการปฏิเสธคุกกี้'
                            : 'Cookies Policy of Agile Assets Co., Ltd. explaining our use of cookies, purpose, functionality, and how to manage cookie preferences.'
                    }
                />
            </Helmet>

            {/* Global Navbar */}
            <Navbar />

            <main className="flex-1">
                {/* Hero Header Section */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-sky-900/20 via-background to-background overflow-hidden border-b border-border/40">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.15),transparent)]" />
                    
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal animation="fade-up">
                            {/* Breadcrumbs */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-400 mb-6">
                                <Link to="/" className="hover:underline">
                                    {lang === 'th' ? 'หน้าแรก' : 'Home'}
                                </Link>
                                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                                <span>{lang === 'th' ? 'นโยบายคุกกี้' : 'Cookies Policy'}</span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-sky-500 uppercase tracking-widest mb-2 font-mono">
                                Cookies Policy
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                                {lang === 'th' ? 'นโยบายคุกกี้' : 'Cookies Policy'}
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {lang === 'th'
                                    ? 'การคุ้มครองความเป็นส่วนตัวและความโปร่งใสในการเก็บรวบรวมข้อมูลผ่านเว็บไซต์ agileassets.co.th'
                                    : 'Privacy protection and transparency regarding data collection on agileassets.co.th'}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Content Body */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-10 sm:space-y-12">
                            
                            {/* Overview Box */}
                            <ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl glass border border-sky-500/20 bg-sky-500/5 relative overflow-hidden">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400 mt-1">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-3 font-sans">
                                            <p>
                                                {lang === 'th' ? (
                                                    <>
                                                        เมื่อท่านได้เข้าสู่เว็บไซต์ <strong className="text-sky-500">agileassets.co.th</strong> ข้อมูลที่เกี่ยวข้องกับการเข้าสู่เว็บไซต์ของท่านจะถูกเก็บเอาไว้ในรูปแบบของคุกกี้ โดยนโยบายคุกกี้นี้จะอธิบายความหมาย การทำงาน วัตถุประสงค์การรวม และการปฏิเสธการเก็บคุกกี้ เพื่อความเป็นส่วนตัวของท่าน
                                                    </>
                                                ) : (
                                                    <>
                                                        When you visit the <strong className="text-sky-500">agileassets.co.th</strong> website, information relating to your site visits will be stored in the form of cookies. This Cookies Policy explains the meaning, functionality, purpose, and options to refuse cookie storage for your personal privacy.
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {lang === 'th'
                                                    ? 'การเข้าสู่เว็บไซต์นี้ถือว่าท่านได้อนุญาตให้เราใช้คุกกี้ตามนโยบายคุกกี้ที่มีรายละเอียด ดังต่อไปนี้'
                                                    : 'By continuing to use this website, you are considered to have consented to our use of cookies according to the details specified below.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Section 1: What are cookies */}
                            <ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            1
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {lang === 'th' ? 'คุกกี้คืออะไร' : 'What Are Cookies?'}
                                        </h2>
                                    </div>

                                    <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {lang === 'th'
                                                ? 'คุกกี้ คือ ไฟล์ขนาดเล็กเพื่อจัดเก็บข้อมูล โดยจะบันทึกลงในอุปกรณ์คอมพิวเตอร์ และ/หรือ เครื่องมือสื่อสารที่เข้าใช้งานของท่าน เช่น สมาร์ทโฟน แท็บเล็ต เป็นต้น ผ่านทางเว็บบราวเซอร์ในขณะที่ท่านเข้าสู่เว็บไซต์ของเรา โดยคุกกี้จะไม่ก่อให้เกิดอันตรายต่ออุปกรณ์คอมพิวเตอร์ และ/หรือ เครื่องมือสื่อสารของท่าน'
                                                : 'Cookies are small text files used to store data, saved onto your computer and/or mobile communication devices (such as smartphones or tablets) via your web browser while accessing our website. Cookies do not pose any threat or damage to your computer systems or devices.'}
                                        </p>
                                        <p>
                                            {lang === 'th'
                                                ? 'ในกรณีนี้ ข้อมูลส่วนบุคคลของท่านจะถูกจัดเก็บ เพื่อใช้เพิ่มประสบการณ์การใช้งานบริการของเราทางออนไลน์ โดยจะจำเอกลักษณ์ของภาษาและปรับแต่งข้อมูลการใช้งานตามความต้องการของท่าน โดยการเก็บข้อมูลนี้เพื่อเป็นการยืนยันคุณลักษณะเฉพาะตัว ข้อมูลความปลอดภัยของท่าน รวมถึงผลิตภัณฑ์และบริการที่ท่านสนใจ นอกจากนี้ คุกกี้ยังถูกใช้เพื่อวัดปริมาณการเข้าใช้งานบริการทางออนไลน์ การปรับเปลี่ยนเนื้อหาตามการใช้งานของท่านทั้งในก่อนหน้าและปัจจุบัน หรือเพื่อวัตถุประสงค์ในการโฆษณาและประชาสัมพันธ์'
                                                : 'In this regard, your personal data will be collected to optimize your online user experience by remembering language preferences and customizing service data according to your needs. This data helps authenticate identity, verify security credentials, and track products or services of interest. Furthermore, cookies are utilized to measure online traffic volumes, adapt content based on past and current usage, and support advertising or PR outreach.'}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Section 2: How we use cookies */}
                            <ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            2
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {lang === 'th' ? 'เราใช้คุกกี้อย่างไร' : 'How We Use Cookies'}
                                        </h2>
                                    </div>

                                    <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {lang === 'th'
                                                ? 'เราใช้คุกกี้เพื่อเพิ่มประสบการณ์และความพึงพอใจของท่าน โดยจะทำให้เราเข้าใจลักษณะการใช้งานเว็บไซต์ของท่านได้เร็ว และทำให้เว็บไซต์ของเราเข้าถึงได้ง่าย สะดวกยิ่งขึ้น'
                                                : 'We use cookies to enhance your browsing experience and satisfaction, helping us understand usage behavior rapidly and making our website more accessible and convenient.'}
                                        </p>
                                        <p>
                                            {lang === 'th'
                                                ? 'บางกรณีเราจำเป็นต้องให้บุคคลที่สามดำเนินการ ซึ่งอาจต้องใช้ IP Address และคุกกี้เพื่อการวิเคราะห์ทางสถิติ รวมถึงเชื่อมโยงข้อมูล และประมวลผลตามวัตถุประสงค์ทางการตลาด'
                                                : 'In certain circumstances, we engage trusted third-party analytics providers which may process IP Addresses and cookie data for statistical evaluation, data correlation, and marketing optimization purposes.'}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Section 3: Cookie Management & Browser Guides */}
                            <ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            3
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {lang === 'th' ? 'การจัดการคุกกี้' : 'Cookie Management & Settings'}
                                        </h2>
                                    </div>

                                    <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11 space-y-4">
                                        <p>
                                            {lang === 'th'
                                                ? 'ท่านสามารถลบและปฏิเสธการเก็บคุกกี้ได้โดยศึกษาตามวิธีการที่ระบุในแต่ละเว็บบราวเซอร์ที่ท่านใช้อยู่ เช่น Chrome / Firefox / Internet Explorer / Safari / Edge เป็นต้น'
                                                : 'You can delete, disable, or decline cookie collection at any time by configuring settings in your specific web browser, such as Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, etc.'}
                                        </p>

                                        {/* Browser Links Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            {browserGuides.map((guide) => (
                                                <a
                                                    key={guide.name}
                                                    href={guide.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/50 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all group"
                                                >
                                                    <div className="min-w-0 pr-2">
                                                        <p className="text-xs font-bold text-foreground group-hover:text-sky-500 transition-colors truncate">
                                                            {guide.name}
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground truncate">
                                                            {lang === 'th' ? guide.descTh : guide.descEn}
                                                        </p>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-sky-400 flex-shrink-0 transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Section 4: Changes to policy */}
                            <ScrollReveal animation="fade-up">
                                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                                            4
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            {lang === 'th' ? 'การเปลี่ยนแปลงนโยบายคุกกี้' : 'Changes to This Cookies Policy'}
                                        </h2>
                                    </div>

                                    <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                                        <p>
                                            {lang === 'th'
                                                ? 'นโยบายคุกกี้นี้อาจมีการปรับปรุงแก้ไขตามความเหมาะสม เพื่อให้สอดคล้องตามกฎระเบียบ พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) และมาตรฐานการกำกับดูแล และจะได้รับการประกาศไว้ที่เว็บไซต์ agileassets.co.th ในหัวข้อ "ประกาศเรื่องนโยบายคุกกี้"'
                                                : 'This Cookies Policy may be updated or amended periodically to remain compliant with evolving statutory regulations, the Personal Data Protection Act (PDPA), and institutional governing standards. All revisions will be officially published on agileassets.co.th under "Cookies Policy".'}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground font-mono pt-2">
                                            {lang === 'th' ? 'ปรับปรุงล่าสุด: 31 สิงหาคม 2569' : 'Last Updated: August 31, 2026'}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>
                    </div>
                </section>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating Widgets */}
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
