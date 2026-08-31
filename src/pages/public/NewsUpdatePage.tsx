import { Helmet } from 'react-helmet-async';
import { ChevronDown, Award, TrendingUp, Calendar, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

export function NewsUpdatePage() {
    const { lang } = useLanguage();

    const scrollToNews = () => {
        const el = document.getElementById('news');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Featured Shareholders
    const shareholders = [
        {
            name: lang === 'th' ? 'คุณโชน โสภณพนิช' : 'Mr. Chone Sophonpanich',
            position: lang === 'th'
                ? 'กรรมการผู้จัดการใหญ่และประธานเจ้าหน้าที่บริหาร\nบริษัท กรุงเทพประกันชีวิต จำกัด (มหาชน)'
                : 'President and Chief Executive Officer\nBangkok Life Assurance Public Co., Ltd.',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/elementor/thumbs/S__44187672_0-e1776838737858-rmdbfhtslbh5zk6f2p7f2gwtfrfocu2qupe8q4iuv8.jpg',
        },
        {
            name: lang === 'th' ? 'ดร.ธรรม์ จิราธิวัฒน์' : 'Dr. Tham Chirathivat',
            position: lang === 'th'
                ? 'ประธานเจ้าหน้าที่บริหาร\nเซ็นทรัล รีเทล เวียดนาม'
                : 'Chief Executive Officer\nCentral Retail Vietnam',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_570,h_570/https://agileassets.co.th/wp-content/uploads/2026/04/190.ธรรม์-จิราธิวัฒน์2_570x570_acf_cropped.jpg',
        },
    ];

    // Corporate Press Releases
    const corporateNews = [
        {
            id: 'corp-1',
            tag: lang === 'th' ? 'ผลประกอบการ' : 'Financial Performance',
            date: '2026',
            titleTh: 'บริษัทอาไจล์ แอสเซ็ทส์ มีกำไรทางบัญชีต่อเนื่อง',
            titleEn: 'Agile Assets Reports Sustained Net Accounting Profit',
            subtitleTh: 'เรามีกำไรทางบัญชีในปี 2568 มากกว่า 3.9 ล้านบาท',
            subtitleEn: 'Achieved over 3.9 Million Baht net accounting profit in 2025',
            descTh: 'สะท้อนถึงการเติบโตและการพัฒนาอย่างต่อเนื่องขององค์กรและทีมงานของเรา เราสัญญาว่าจะยึดมั่นในความโปร่งใสและมุ่งมั่นเพื่อลูกค้าของเราสามารถเติบโตไปพร้อม ๆ กันอย่างมั่นคง',
            descEn: 'Reflecting resilient operational growth, credit underwriting rigor, and sustainable client partnerships across nationwide manufacturing plants.',
            icon: TrendingUp,
        },
        {
            id: 'corp-2',
            tag: lang === 'th' ? 'การขยายธุรกิจ' : 'Business Expansion',
            date: '2026',
            titleTh: 'ขยายการให้บริการสินเชื่อเครื่องจักรดูแลลูกค้ากว่า 50 โรงงานทั่วประเทศ',
            titleEn: 'Serving Over 50 Industrial Plants Nationwide Across Key Sectors',
            subtitleTh: 'ครอบคลุมอุตสาหกรรมน้ำดื่ม ฟาร์มปศุสัตว์ แปรรูปอาหาร และพลังงานหมุนเวียน',
            subtitleEn: 'Covering drinking water, livestock cooling, food processing, and renewables',
            descTh: 'เดินหน้าสนับสนุนสินเชื่อเครื่องจักรและอุปกรณ์อุตสาหกรรมครบวงจร เสริมสภาพคล่องให้โรงงานไทยขยายกำลังการผลิตได้อย่างต่อเนื่อง',
            descEn: 'Expanding tailored machinery leasing and working capital solutions to meet accelerating private sector industrial expansion.',
            icon: Building2,
        },
        {
            id: 'corp-3',
            tag: lang === 'th' ? 'ความยั่งยืน ESG' : 'ESG Sustainability',
            date: '2026',
            titleTh: 'ยกระดับมาตรฐานความโปร่งใสและการสนับสนุนสินเชื่อเพื่อสิ่งแวดล้อม',
            titleEn: 'Elevating Corporate Governance & Green ESG Machinery Financing',
            subtitleTh: 'ส่งเสริมการลงทุนเครื่องจักรประหยัดพลังงานและระบบโซลาร์เซลล์โรงงาน',
            subtitleEn: 'Promoting energy-efficient machinery upgrades and commercial solar',
            descTh: 'ขับเคลื่อนธุรกิจภายใต้หลักธรรมาภิบาล พร้อมเปิดรับพันธมิตรที่มีวิสัยทัศน์ร่วมกันเพื่อร่วมสร้างความมั่นคงทางพลังงานและเศรษฐกิจหมุนเวียน',
            descEn: 'Adhering to strict ESG standards, transparent underwriting, and collaborative value creation for all stakeholders.',
            icon: ShieldCheck,
        },
    ];

    const pageTitle = lang === 'th'
        ? 'ข่าวสารประชาสัมพันธ์ (News Update) | Agile Assets'
        : 'News Update | Agile Assets - Corporate Announcements & Insights';
    const pageDescription = lang === 'th'
        ? 'ข่าวประชาสัมพันธ์ล่าสุด อัปเดตความเคลื่อนไหวบริษัท กิจกรรม และความร่วมมือทางธุรกิจ ครบถ้วนในที่เดียว ติดตามข่าวสารล่าสุดของอาไจล์ ได้ที่นี่'
        : 'Agile Assets News Updates — Corporate milestones, shareholder announcements, and industrial machinery financing news.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://agileassets.co.th/news-update/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Exact Tree of Growth as Home & Project Pages) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets News Update"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-3 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans mb-8">
                                News Update
                            </h1>

                            {/* Learn More Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={scrollToNews}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <span>Learn More</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. ข่าวสารประชาสัมพันธ์ (Main News Section) ─── */}
                <section id="news" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12 sm:mb-16">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                                    News Update
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight font-sans">
                                    {lang === 'th' ? 'ข่าวสารประชาสัมพันธ์' : 'Corporate News & Announcements'}
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* ─── 3. ข่าวเด่นประจำเดือน: แนะนำผู้ถือหุ้นใหม่ ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="mb-20 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
                                <div className="text-center max-w-3xl mx-auto mb-10">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 dark:bg-blue-900/40 text-blue-900 dark:text-sky-300 text-xs font-bold mb-3">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'ข่าวเด่นประจำเดือน' : 'Featured Announcement'}</span>
                                    </div>
                                    <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans mb-3">
                                        {lang === 'th' ? 'แนะนำผู้ถือหุ้นใหม่ บริษัทอาไจล์ แอสเซ็ทส์' : 'Introducing New Strategic Shareholders of Agile Assets'}
                                    </h3>
                                    <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-4">
                                        {lang === 'th'
                                            ? 'บริษัทอาไจล์ แอสเซ็ทส์ ขอต้อนรับผู้ถือหุ้นใหม่ เพื่อเสริมศักยภาพการเติบโต'
                                            : 'Agile Assets Welcomes Distinguished Shareholders to Strengthen Growth Potential'}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {lang === 'th'
                                            ? 'สะท้อนถึงความเชื่อมั่นในทิศทางการดำเนินงานของบริษัท และเป็นปัจจัยสำคัญที่ช่วยเสริมความมั่นคงของโครงสร้างทางการเงิน รวมถึงเพิ่มโอกาสในการเติบโตอย่างต่อเนื่องในอนาคต บริษัทฯ ยังคงมุ่งมั่นในการดำเนินธุรกิจด้วยความโปร่งใส และสร้างคุณค่าให้กับผู้มีส่วนได้ส่วนเสียทุกภาคส่วน พร้อมเดินหน้าสู่การเติบโตอย่างมีคุณภาพและยั่งยืนต่อไป'
                                            : 'Reflecting profound market confidence in the company’s strategic vision and fortifying our financial capital structure. Agile Assets remains steadfast in transparent corporate governance, creating enduring value for all industrial stakeholders.'}
                                    </p>
                                </div>

                                {/* 2 Shareholders Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                    {shareholders.map((person, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                                        >
                                            <div className="aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-6 text-center flex-1 flex flex-col justify-center">
                                                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans mb-2">
                                                    {person.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                                                    {person.position}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* ─── 4. ข่าวสารประชาสัมพันธ์ของบริษัท (Corporate Milestones) ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-10">
                                <h3 className="text-xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 font-sans">
                                    {lang === 'th' ? 'ข่าวสารประชาสัมพันธ์ของบริษัท' : 'Corporate Press Releases & Milestones'}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                                {corporateNews.map((news) => {
                                    const IconComp = news.icon;
                                    return (
                                        <div
                                            key={news.id}
                                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between group"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-4">
                                                    <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold">
                                                        {news.tag}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{news.date}</span>
                                                    </span>
                                                </div>

                                                <div className="w-10 h-10 rounded-xl bg-blue-900/10 dark:bg-blue-900/30 text-blue-900 dark:text-sky-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <IconComp className="w-5 h-5" />
                                                </div>

                                                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans mb-2 group-hover:text-sky-500 transition-colors">
                                                    {lang === 'th' ? news.titleTh : news.titleEn}
                                                </h4>

                                                <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mb-2">
                                                    {lang === 'th' ? news.subtitleTh : news.subtitleEn}
                                                </p>

                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {lang === 'th' ? news.descTh : news.descEn}
                                                </p>
                                            </div>

                                            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                                <span>Agile Assets Official</span>
                                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
