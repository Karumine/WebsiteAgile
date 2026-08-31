import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { useLanguage } from '@/contexts/LanguageContext';

// Below-the-fold sections — lazy loaded to reduce initial bundle
const ServicesRangeSection = lazy(() => import('@/components/sections/ServicesRangeSection').then(m => ({ default: m.ServicesRangeSection })));
const WhatWeDoSection = lazy(() => import('@/components/sections/WhatWeDoSection').then(m => ({ default: m.WhatWeDoSection })));
const KeyFinancingServicesSection = lazy(() => import('@/components/sections/KeyFinancingServicesSection').then(m => ({ default: m.KeyFinancingServicesSection })));
const CustomerEligibilitySection = lazy(() => import('@/components/sections/CustomerEligibilitySection').then(m => ({ default: m.CustomerEligibilitySection })));
const OurProjectsSection = lazy(() => import('@/components/sections/OurProjectsSection').then(m => ({ default: m.OurProjectsSection })));
const OurPartnerSection = lazy(() => import('@/components/sections/OurPartnerSection').then(m => ({ default: m.OurPartnerSection })));
const LatestNewsSection = lazy(() => import('@/components/sections/LatestNewsSection').then(m => ({ default: m.LatestNewsSection })));
const ContactSection = lazy(() => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

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

            {/* Top Navigation */}
            <Navbar />

            <main className="flex-1">
                {/* 1. Hero Banner with Central AA Logo & Single CTA */}
                <HeroBanner />

                {/* 2. OUR STORY (เรื่องราวของเรา - 3 Pillars) */}
                <OurStorySection />

                {/* Below-the-fold sections — progressively loaded */}
                <Suspense fallback={<div className="min-h-[200px]" />}>
                    {/* 3. OUR FINANCING SERVICES */}
                    <ServicesRangeSection />

                    {/* 4. WHAT WE DO */}
                    <WhatWeDoSection />

                    {/* 5. KEY FINANCING SERVICES */}
                    <KeyFinancingServicesSection />

                    {/* 6. CUSTOMER ELIGIBILITY CRITERIAS */}
                    <CustomerEligibilitySection />

                    {/* 7. OUR PROJECTS */}
                    <OurProjectsSection />

                    {/* 8. OUR PARTNER & MACHINE */}
                    <OurPartnerSection />

                    {/* 9. LATEST NEWS & ACTIVITYS */}
                    <LatestNewsSection />

                    {/* 10. BUSINESS PARTNERSHIP INQUIRIES */}
                    <ContactSection />
                </Suspense>
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
