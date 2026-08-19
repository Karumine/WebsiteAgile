import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { ServicesRangeSection } from '@/components/sections/ServicesRangeSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { KeyFinancingServicesSection } from '@/components/sections/KeyFinancingServicesSection';
import { CustomerEligibilitySection } from '@/components/sections/CustomerEligibilitySection';
import { OurProjectsSection } from '@/components/sections/OurProjectsSection';
import { OurPartnerSection } from '@/components/sections/OurPartnerSection';
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
                <meta property="og:image" content="/assets/Hero-Banner-Website-3-scaled.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Helmet>

            {/* Top Navigation */}
            <Navbar />

            <main className="flex-1">
                {/* 1. Hero Banner with Central AA Logo & Single CTA */}
                <HeroBanner />

                {/* 2. OUR STORY (เรื่องราวของเรา - 3 Pillars) */}
                <OurStorySection />

                {/* 3. OUR FINANCING SERVICES (โซลูชั่นทางการเงินของเราในอุตสาหกรรม - 3 Cards Carousel) */}
                <ServicesRangeSection />

                {/* 4. WHAT WE DO (ก้าวแรกของการเติบโต / ABOUT AGILE ASSETS / CLOSE • CARING • FLEXIBLE) */}
                <WhatWeDoSection />

                {/* 5. KEY FINANCING SERVICES (บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม - 3 Machinery Carousel) */}
                <KeyFinancingServicesSection />

                {/* 6. CUSTOMER ELIGIBILITY CRITERIAS (เกณฑ์การเป็นลูกค้า + สถิติ 40 โรงงาน / 50 สัญญา / 400 MB) */}
                <CustomerEligibilitySection />

                {/* 7. OUR PROJECTS (โครงการของเรา - 12 Photographic Activity Grid) */}
                <OurProjectsSection />

                {/* 8. OUR PARTNER & MACHINE (คู่ค้าและเครื่องจักรที่เราให้บริการ - 4 Brand Carousel) */}
                <OurPartnerSection />

                {/* 9. BUSINESS PARTNERSHIP INQUIRIES (Consultation Form) */}
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Bottom PDPA Cookie Consent Banner */}
            <CookieConsent />

            {/* Floating Quick Action Widget & Back-to-Top */}
            <QuickContactWidget />
        </div>
    );
}
