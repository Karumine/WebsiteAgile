import { useState, useMemo } from 'react';
import { ArrowRight, CalendarDays, MessageSquare, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { formatDate } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export interface NewsItem {
    id: string;
    category: 'FINANCE' | 'NEWS' | 'ACTIVITY';
    titleTh: string;
    titleEn: string;
    excerptTh: string;
    excerptEn: string;
    contentTh: string;
    contentEn: string;
    dateTh: string;
    dateEn: string;
    commentsTh: string;
    commentsEn: string;
    image: string;
}

const LATEST_NEWS_DATA: NewsItem[] = [
    {
        id: 'news-hire-purchase-vs-leasing',
        category: 'FINANCE',
        titleTh: 'เช่าซื้อ กับลีสซิ่งต่างกันอย่างไร',
        titleEn: 'Difference Between Hire Purchase and Financial Leasing',
        excerptTh: 'เจาะลึกความแตกต่างระหว่างการเช่าซื้อเครื่องจักรและการทำสัญญา ลีสซิ่ง (Leasing) เพื่อให้ผู้ประกอบการเลือกเครื่องมือทางการเงินที่เหมาะสมที่สุด',
        excerptEn: 'In-depth comparison between Hire Purchase and Financial Leasing to help industrial business owners select the optimal financing structure.',
        contentTh: `
            <p className="mb-4">ในการจัดหาเครื่องจักรและอุปกรณ์เพื่อการผลิต ผู้ประกอบการมักจะลังเลระหว่าง <strong>"สัญญาเช่าซื้อ (Hire Purchase)"</strong> และ <strong>"สัญญาเช่าแบบลีสซิ่ง (Leasing)"</strong> ซึ่งทั้งสองรูปแบบมีวัตถุประสงค์และสิทธิประโยชน์ทางภาษีที่แตกต่างกันอย่างสิ้นเชิง</p>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">1. สัญญาเช่าซื้อ (Hire Purchase)</h4>
            <p className="mb-4">ผู้เช่าซื้อชำระเงินค่างวดครบตามสัญญา กรรมสิทธิ์ในเครื่องจักรจะตกเป็นของผู้เช่าซื้อทันที โดยในทางบัญชีสามารถบันทึกเป็นสินทรัพย์ของบริษัทและตัดค่าเสื่อมราคาได้</p>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">2. สัญญาเช่าแบบลีสซิ่ง (Leasing)</h4>
            <p className="mb-4">เหมาะสำหรับบริษัทที่ต้องการนำค่างวดไปหักเป็นค่าใช้จ่ายทางภาษีได้เต็มจำนวน (Up to tax ceiling limits) โดยเมื่อจบสัญญาสามารถเลือกซื้อเครื่องจักรคืนในราคาซาก (Residual Value) หรือคืนเครื่องจักรได้</p>
        `,
        contentEn: `
            <p className="mb-4">When acquiring machinery and industrial equipment, businesses often decide between <strong>Hire Purchase</strong> and <strong>Financial Leasing</strong>. Both options serve different balance sheet and tax optimization goals.</p>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">1. Hire Purchase</h4>
            <p className="mb-4">Ownership automatically transfers to the buyer upon final installment completion. The equipment is recorded as a fixed asset with annual depreciation tax benefits.</p>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">2. Financial Leasing</h4>
            <p className="mb-4">Ideal for operating cash flow management as rental payments can be treated as corporate tax-deductible operational expenses. At the end of term, options include purchasing at residual value or returning the machinery.</p>
        `,
        dateTh: '20/08/2569',
        dateEn: '20/08/2026',
        commentsTh: 'ไม่มีความคิดเห็น',
        commentsEn: 'No Comments',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    },
    {
        id: 'news-agile-yumita-mou',
        category: 'NEWS',
        titleTh: 'Agile Assets ลงนามความร่วมมือกับ ยูมิตะ (TK)',
        titleEn: 'Agile Assets Signs Partnership Agreement with Yumita (TK)',
        excerptTh: 'บริษัท อาไจล์ แอสเซ็ทส์ จำกัด ร่วมลงนามความร่วมมือทางธุรกิจกับ ยูมิตะ (TK) เพื่อสนับสนุนสินเชื่อเครื่องจักรอุตสาหกรรมแก่ผู้ประกอบการ SME ไทย',
        excerptEn: 'Agile Assets Co., Ltd. officially signed a business partnership agreement with Yumita (TK) to expand specialized machinery financing solutions for Thai SMEs.',
        contentTh: `
            <p className="mb-4">บริษัท อาไจล์ แอสเซ็ทส์ จำกัด (Agile Assets Co., Ltd.) ได้จัดพิธีลงนามบันทึกความเข้าใจ (MoU) ร่วมกับ <strong>บริษัท ยูมิตะ (TK) จำกัด</strong> ผู้จำหน่ายเครื่องจักรอุตสาหกรรมชั้นนำ</p>
            <p className="mb-4">ความร่วมมือในครั้งนี้มีวัตถุประสงค์เพื่ออำนวยความสะดวกให้แก่ผู้ประกอบการโรงงานอุตสาหกรรม สามารถเข้าถึงแหล่งเงินทุนในการซื้อและติดตั้งเครื่องจักรใหม่ได้อย่างรวดเร็ว ด้วยเงื่อนไขสินเชื่อที่ยืดหยุ่นและอัตราดอกเบี้ยที่เหมาะสม</p>
        `,
        contentEn: `
            <p className="mb-4">Agile Assets Co., Ltd. formally executed a Memorandum of Understanding (MoU) with <strong>Yumita (TK) Co., Ltd.</strong>, a premier industrial equipment supplier in Thailand.</p>
            <p className="mb-4">This joint initiative simplifies machinery credit access for manufacturing plants, enabling rapid factory expansion with flexible payment terms and tailored credit limits.</p>
        `,
        dateTh: '21/04/2569',
        dateEn: '21/04/2026',
        commentsTh: 'ไม่มีความคิดเห็น',
        commentsEn: 'No Comments',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    },
    {
        id: 'news-ayutthaya-local-business',
        category: 'NEWS',
        titleTh: 'อาไจล์เคียงข้างผู้ประกอบการท้องถิ่น สนับสนุนสินเชื่อเครื่องส่งน้ำดื่มในอยุธยา',
        titleEn: 'Agile Assets Supports Local Entrepreneurs: Beverage & Water Machinery Loans in Ayutthaya',
        excerptTh: 'ทีมงานอาไจล์ แอสเซ็ทส์ ลงพื้นที่สนับสนุนสินเชื่อเครื่องบรรจุน้ำดื่มความเร็วสูงแก่โรงงานผลิตน้ำดื่มในจังหวัดพระนครศรีอยุธยา',
        excerptEn: 'Agile Assets team conducted on-site machinery commissioning inspection for high-speed water bottling equipment at a local production plant in Ayutthaya.',
        contentTh: `
            <p className="mb-4">อาไจล์ แอสเซ็ทส์ มุ่งมั่นเคียงข้างผู้ประกอบการท้องถิ่นทั่วประเทศไทย โดยล่าสุดได้อนุมัติและสนับสนุนสินเชื่อเช่าซื้อ <strong>เครื่องส่งและบรรจุน้ำดื่มอัจฉริยะ</strong> ให้แก่ผู้ประกอบการในจังหวัดพระนครศรีอยุธยา</p>
            <p className="mb-4">ช่วยเพิ่มกำลังการผลิตน้ำดื่มบรรจุขวดได้มากกว่า 40% รองรับความต้องการบริโภคที่เพิ่มสูงขึ้นในภาคกลางและสร้างความเข้มแข็งให้แก่เศรษฐกิจในชุมชน</p>
        `,
        contentEn: `
            <p className="mb-4">Agile Assets continues to empower local manufacturing enterprises. Most recently, our underwriting team funded an automated <strong>high-speed beverage bottling & conveyance line</strong> for a premier water plant in Phra Nakhon Si Ayutthaya.</p>
            <p className="mb-4">This upgrade expanded client daily production capacity by over 40%, meeting surge demand across central Thailand.</p>
        `,
        dateTh: '14/10/2568',
        dateEn: '14/10/2025',
        commentsTh: 'ไม่มีความคิดเห็น',
        commentsEn: 'No Comments',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    },
    {
        id: 'news-one-one-intergroup',
        category: 'NEWS',
        titleTh: 'อาไจล์หนุนสินเชื่อเครื่องจักรแก่บริษัท วัน วัน อินเตอร์กรุ๊ป จำกัด เสริมศักยภาพการผลิตน้ำดื่มในสมุทรสาคร',
        titleEn: 'Financing Machinery for One One Intergroup Co., Ltd. Boosting Water Bottling Capacity in Samut Sakhon',
        excerptTh: 'สนับสนุนเงินทุนส่งเสริมศักยภาพการผลิตน้ำดื่มให้แก่ บริษัท วัน วัน อินเตอร์กรุ๊ป จำกัด เพิ่มสายการผลิตและยกระดับมาตรฐานโรงงาน',
        excerptEn: 'Agile Assets provided customized equipment financing to One One Intergroup Co., Ltd. to upgrade automated bottling production lines in Samut Sakhon.',
        contentTh: `
            <p className="mb-4">อาไจล์ แอสเซ็ทส์ ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนความสำเร็จของ <strong>บริษัท วัน วัน อินเตอร์กรุ๊ป จำกัด</strong> ผู้ผลิตและจัดจำหน่ายน้ำดื่มรายใหญ่ในจังหวัดสมุทรสาคร</p>
            <p className="mb-4">โดยให้สินเชื่อเครื่องจักรเป่าขวด PET และเครื่องบรรจุอัตโนมัติ ช่วยลดต้นทุนการผลิตรายขวดลง 15% พร้อมเพิ่มประสิทธิภาพระบบบริหารจัดการโรงงานยั่งยืน</p>
        `,
        contentEn: `
            <p className="mb-4">Agile Assets partnered with <strong>One One Intergroup Co., Ltd.</strong>, a major water production and distribution company based in Samut Sakhon.</p>
            <p className="mb-4">By providing customized financing for automated PET bottle blowing and capping machinery, the client achieved a 15% reduction in per-unit manufacturing costs.</p>
        `,
        dateTh: '14/10/2568',
        dateEn: '14/10/2025',
        commentsTh: 'ไม่มีความคิดเห็น',
        commentsEn: 'No Comments',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    },
];

export function LatestNewsSection() {
    const { lang } = useLanguage();
    const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

    const { settings } = useSiteSettings();
    const sectionTitle = lang === 'en' ? 'LATEST NEWS & ACTIVITIES' : 'LATEST NEWS & ACTIVITYS';
    const sectionSubtitle = lang === 'en' ? 'Company News and Corporate Activities' : 'ข่าวสารและกิจกรรมของบริษัท';

    const newsList = useMemo(() => {
        if (!settings?.news || settings.news.length === 0) {
            return LATEST_NEWS_DATA;
        }
        return settings.news.map((item) => ({
            id: item.id,
            category: (item.category?.toUpperCase() || 'NEWS') as 'FINANCE' | 'NEWS' | 'ACTIVITY',
            titleTh: item.title || '',
            titleEn: item.title_en || item.title || '',
            excerptTh: item.excerpt || '',
            excerptEn: item.excerpt_en || item.excerpt || '',
            contentTh: item.content || '',
            contentEn: item.content_en || item.content || '',
            dateTh: item.date ? formatDate(item.date) : '20/08/2569',
            dateEn: item.date ? formatDate(item.date) : '20/08/2026',
            commentsTh: 'ไม่มีความคิดเห็น',
            commentsEn: 'No Comments',
            image: item.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        }));
    }, [settings.news]);

    return (
        <>
            <section className="py-16 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40 relative overflow-hidden border-t border-slate-200/60 dark:border-slate-800/80">
                {/* Background ambient lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full filter blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 @container">
                    {/* Header */}
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase font-sans">
                                {sectionTitle}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium mt-2">
                                {sectionSubtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 4 Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 @[480px]:grid-cols-2 @[800px]:grid-cols-4 gap-4 sm:gap-6">
                        {newsList.map((item, index) => {
                            const title = lang === 'en' ? item.titleEn : item.titleTh;
                            const excerpt = lang === 'en' ? item.excerptEn : item.excerptTh;
                            const dateStr = lang === 'en' ? item.dateEn : item.dateTh;
                            const commentsStr = lang === 'en' ? item.commentsEn : item.commentsTh;

                            return (
                                <ScrollReveal
                                    key={item.id}
                                    animation="fade-up"
                                    delay={index * 100}
                                    className="flex"
                                >
                                    <article
                                        className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full h-full cursor-pointer"
                                        onClick={() => setSelectedArticle(item)}
                                    >
                                        {/* Image Header with Top-Right Category Badge */}
                                        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={title}
                                                loading="lazy"
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3 z-10">
                                                <span className="px-2 py-0.5 rounded bg-slate-700/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between min-w-0">
                                            <div>
                                                <h3 className="text-sky-600 dark:text-sky-400 font-bold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors mb-2 min-h-[2.5rem] font-sans break-words">
                                                    {title}
                                                </h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 hidden sm:block">
                                                    {excerpt}
                                                </p>
                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    className="text-sky-600 dark:text-sky-400 font-bold text-xs tracking-wide uppercase flex items-center gap-1.5 hover:gap-2.5 transition-all mt-4 group-hover:text-sky-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedArticle(item);
                                                    }}
                                                >
                                                    <span>READ MORE</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>

                                                {/* Card Footer Divider */}
                                                <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[12px] text-slate-400 font-normal">
                                                    <div className="flex items-center gap-1">
                                                        <CalendarDays className="w-3 h-3 text-slate-400" />
                                                        <span>{dateStr}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageSquare className="w-3 h-3 text-slate-400" />
                                                        <span>{commentsStr}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Article Detail Modal */}
            {selectedArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-slide-up flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="relative h-60 sm:h-72 overflow-hidden flex-shrink-0">
                            <img
                                src={selectedArticle.image}
                                alt={lang === 'en' ? selectedArticle.titleEn : selectedArticle.titleTh}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <button
                                type="button"
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-lg z-10"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                                <span className="px-3 py-1 rounded bg-sky-600 text-white text-xs font-bold uppercase tracking-wider">
                                    {selectedArticle.category}
                                </span>
                                <span className="text-slate-200 text-xs font-medium flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                    {lang === 'en' ? selectedArticle.dateEn : selectedArticle.dateTh}
                                </span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                                {lang === 'en' ? selectedArticle.titleEn : selectedArticle.titleTh}
                            </h3>
                            <div
                                className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3"
                                dangerouslySetInnerHTML={{
                                    __html: lang === 'en' ? selectedArticle.contentEn : selectedArticle.contentTh,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
