import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { EquipmentFinancingSection } from '@/components/sections/EquipmentFinancingSection';
import { LoanCalculatorSection } from '@/components/sections/LoanCalculatorSection';
import { AssetsForSaleSection } from '@/components/sections/AssetsForSaleSection';
import { InterestRates } from '@/components/sections/InterestRates';
import { NewsFeed } from '@/components/sections/NewsFeed';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';

export function HomePage() {
    const { lang } = useLanguage();

    const title = lang === 'en'
        ? 'Agile Assets | Growth – Good Capital • Equipment Financing'
        : 'Agile Assets | Growth – Good Capital • ทุนเติบโต ดี งาม • สินเชื่อเครื่องจักรและอุปกรณ์';
    const description = lang === 'en'
        ? 'Agile Assets provides bespoke equipment leasing, industrial machinery loans, commercial transport financing, and fast working capital in Thailand.'
        : 'Agile Assets ผู้ให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม ยานพาหนะเชิงพาณิชย์ เครื่องมือแพทย์ และโซลูชันเงินทุนเพื่อการเติบโตอย่างยั่งยืน';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://agileassets.co.th/" />
                <meta property="og:image" content="/assets/Hero-Banner-Website-3-scaled.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* 1. Hero Banner with Growth Tree & AA Central Logo */}
                <HeroBanner />

                {/* 2. Our Story (เรื่องราวของเรา - 3 Pillars of Agile Assets) */}
                <OurStorySection />

                {/* 3. Core Equipment Financing Products */}
                <EquipmentFinancingSection />

                {/* 3. Interactive Loan & Installment Calculator */}
                <LoanCalculatorSection />

                {/* 4. Assets for Sale (ทรัพย์รอการขาย) */}
                <AssetsForSaleSection />

                {/* 5. Live Interest Rates Table / Cards */}
                <InterestRates />

                {/* 6. Press Center & Latest Market Updates */}
                <NewsFeed />

                {/* 7. About Us, Corporate Values & 16-Year Timeline */}
                <AboutSection />

                {/* 8. Contact & Financing Consultation Form */}
                <ContactSection />
            </main>

            <Footer />

            {/* Bottom PDPA Cookie Consent Banner */}
            <CookieConsent />

            {/* Floating Quick Action Widget & Back-to-Top */}
            <QuickContactWidget />
        </div>
    );
}
