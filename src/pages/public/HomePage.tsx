import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { InterestRates } from '@/components/sections/InterestRates';
import { NewsFeed } from '@/components/sections/NewsFeed';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

export function HomePage() {
    const { lang } = useLanguage();

    // Default SEO metadata based on language
    const title = lang === 'en'
        ? 'Agile Assets | Premium Financial Lending'
        : 'Agile Assets | บริการสินเชื่อทางการเงินระดับพรีเมียม';
    const description = lang === 'en'
        ? "We provide competitive interest rates, fast approvals, and unmatched customer service for all your lending needs."
        : "เรามอบอัตราดอกเบี้ยที่แข่งขันได้ การอนุมัติที่รวดเร็ว และบริการลูกค้าที่ไม่มีใครเทียบได้ สำหรับทุกความต้องการด้านสินเชื่อของคุณ";

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <link rel="canonical" href={window.location.origin} />
            </Helmet>
            <Navbar />
            <main>
                <HeroBanner />
                <InterestRates />
                <NewsFeed />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
