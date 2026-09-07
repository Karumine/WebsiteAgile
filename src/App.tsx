import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

// Lazy loaded admin layout (public users never need this)
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout').then(m => ({ default: m.AdminLayout })));

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/public/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/pages/public/AboutPage').then(m => ({ default: m.AboutPage })));
const DrinkingWaterPage = lazy(() => import('@/pages/public/DrinkingWaterPage').then(m => ({ default: m.DrinkingWaterPage })));
const LivestockFarmPage = lazy(() => import('@/pages/public/LivestockFarmPage').then(m => ({ default: m.LivestockFarmPage })));
const FoodProcessingPage = lazy(() => import('@/pages/public/FoodProcessingPage').then(m => ({ default: m.FoodProcessingPage })));
const BiogasProductionPage = lazy(() => import('@/pages/public/BiogasProductionPage').then(m => ({ default: m.BiogasProductionPage })));
const SolarPowerPage = lazy(() => import('@/pages/public/SolarPowerPage').then(m => ({ default: m.SolarPowerPage })));
const ChillerPage = lazy(() => import('@/pages/public/ChillerPage').then(m => ({ default: m.ChillerPage })));
const InjectionMoldingPage = lazy(() => import('@/pages/public/InjectionMoldingPage').then(m => ({ default: m.InjectionMoldingPage })));
const GeneratorSetPage = lazy(() => import('@/pages/public/GeneratorSetPage').then(m => ({ default: m.GeneratorSetPage })));
const InvestorRelationsPage = lazy(() => import('@/pages/public/InvestorRelationsPage').then(m => ({ default: m.InvestorRelationsPage })));
const SustainabilityPage = lazy(() => import('@/pages/public/SustainabilityPage').then(m => ({ default: m.SustainabilityPage })));
const ProjectActivityPage = lazy(() => import('@/pages/public/ProjectActivityPage').then(m => ({ default: m.ProjectActivityPage })));
const NewsletterPage = lazy(() => import('@/pages/public/NewsletterPage').then(m => ({ default: m.NewsletterPage })));
const KnowledgePage = lazy(() => import('@/pages/public/KnowledgePage').then(m => ({ default: m.KnowledgePage })));
const NewsUpdatePage = lazy(() => import('@/pages/public/NewsUpdatePage').then(m => ({ default: m.NewsUpdatePage })));
const CalculatorPage = lazy(() => import('@/pages/public/CalculatorPage').then(m => ({ default: m.CalculatorPage })));
const InterestRateConversionPage = lazy(() => import('@/pages/public/InterestRateConversionPage').then(m => ({ default: m.InterestRateConversionPage })));
const FaqPage = lazy(() => import('@/pages/public/FaqPage').then(m => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('@/pages/public/ContactPage').then(m => ({ default: m.ContactPage })));
const LeasingApplicationPage = lazy(() => import('@/pages/public/LeasingApplicationPage').then(m => ({ default: m.LeasingApplicationPage })));
const AssetForSalePage = lazy(() => import('@/pages/public/AssetForSalePage').then(m => ({ default: m.AssetForSalePage })));
const CookiePolicyPage = lazy(() => import('@/pages/public/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const NcNdaPage = lazy(() => import('@/pages/public/NcNdaPage').then(m => ({ default: m.NcNdaPage })));
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage').then(m => ({ default: m.DashboardPage })));
const RatesEditor = lazy(() => import('@/pages/admin/RatesEditor').then(m => ({ default: m.RatesEditor })));
const BannerEditor = lazy(() => import('@/pages/admin/BannerEditor').then(m => ({ default: m.BannerEditor })));
const NewsEditor = lazy(() => import('@/pages/admin/NewsEditor').then(m => ({ default: m.NewsEditor })));
const CustomFieldsEditor = lazy(() => import('@/pages/admin/CustomFieldsEditor').then(m => ({ default: m.CustomFieldsEditor })));
const AssetsEditor = lazy(() => import('@/pages/admin/AssetsEditor').then(m => ({ default: m.AssetsEditor })));
const FaqEditor = lazy(() => import('@/pages/admin/FaqEditor').then(m => ({ default: m.FaqEditor })));
const CompanyInfoEditor = lazy(() => import('@/pages/admin/CompanyInfoEditor').then(m => ({ default: m.CompanyInfoEditor })));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <SiteSettingsProvider>
            <LanguageProvider>
              <ThemeProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <Toaster position="top-right" toastOptions={{ className: 'glass text-foreground', style: { background: 'rgba(30,30,40,0.85)', backdropFilter: 'blur(12px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/about-us" element={<AboutPage />} />
                      <Route path="/en/about-us" element={<AboutPage />} />
                      <Route path="/our-story" element={<AboutPage />} />
                      <Route path="/drinking-water-production" element={<DrinkingWaterPage />} />
                      <Route path="/livestock-farm" element={<LivestockFarmPage />} />
                      <Route path="/food-processing" element={<FoodProcessingPage />} />
                      <Route path="/biogas-production" element={<BiogasProductionPage />} />
                      <Route path="/solar-power-generation" element={<SolarPowerPage />} />
                      <Route path="/solar-power-generation-en" element={<SolarPowerPage />} />
                      <Route path="/en/solar-power-generation-en" element={<SolarPowerPage />} />
                      <Route path="/chiller" element={<ChillerPage />} />
                      <Route path="/injection-molding-machine" element={<InjectionMoldingPage />} />
                      <Route path="/injection-molding-machine-en" element={<InjectionMoldingPage />} />
                      <Route path="/en/injection-molding-machine-en" element={<InjectionMoldingPage />} />
                      <Route path="/generator-set" element={<GeneratorSetPage />} />
                      <Route path="/generator-set-2" element={<GeneratorSetPage />} />
                      <Route path="/en/generator-set-2" element={<GeneratorSetPage />} />
                      <Route path="/investor-relations" element={<InvestorRelationsPage />} />
                      <Route path="/investor-relations-2" element={<InvestorRelationsPage />} />
                      <Route path="/en/investor-relations" element={<InvestorRelationsPage />} />
                      <Route path="/en/investor-relations-2" element={<InvestorRelationsPage />} />
                      <Route path="/sustainability" element={<SustainabilityPage />} />
                      <Route path="/sustainability-strategy" element={<SustainabilityPage />} />
                      <Route path="/sustainability-campaign" element={<SustainabilityPage />} />
                      <Route path="/en/sustainability" element={<SustainabilityPage />} />
                      <Route path="/en/sustainability-2" element={<SustainabilityPage />} />
                      <Route path="/project" element={<ProjectActivityPage />} />
                      <Route path="/project-2" element={<ProjectActivityPage />} />
                      <Route path="/project-activity" element={<ProjectActivityPage />} />
                      <Route path="/projects" element={<ProjectActivityPage />} />
                      <Route path="/projects-activity" element={<ProjectActivityPage />} />
                      <Route path="/en/project-2" element={<ProjectActivityPage />} />
                      <Route path="/newsletter" element={<NewsletterPage />} />
                      <Route path="/newsletter-2" element={<NewsletterPage />} />
                      <Route path="/en/newsletter-2" element={<NewsletterPage />} />
                      <Route path="/knowledge" element={<KnowledgePage />} />
                      <Route path="/knowledge-2" element={<KnowledgePage />} />
                      <Route path="/knowledge-contents" element={<KnowledgePage />} />
                      <Route path="/en/knowledge-2" element={<KnowledgePage />} />
                      <Route path="/news" element={<NewsUpdatePage />} />
                      <Route path="/articles" element={<NewsUpdatePage />} />
                      <Route path="/news-update" element={<NewsUpdatePage />} />
                      <Route path="/news-update-2" element={<NewsUpdatePage />} />
                      <Route path="/en/news-update-2" element={<NewsUpdatePage />} />
                      <Route path="/calculator" element={<CalculatorPage />} />
                      <Route path="/financing-calculator" element={<CalculatorPage />} />
                      <Route path="/en/calculator" element={<CalculatorPage />} />
                      <Route path="/interest-rate-conversion" element={<InterestRateConversionPage />} />
                      <Route path="/interest-rate-conversion-2" element={<InterestRateConversionPage />} />
                      <Route path="/en/interest-rate-conversion-2" element={<InterestRateConversionPage />} />
                      <Route path="/faq" element={<FaqPage />} />
                      <Route path="/faq-2" element={<FaqPage />} />
                      <Route path="/frequently-asked-questions" element={<FaqPage />} />
                      <Route path="/en/faq-2" element={<FaqPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/contact-us" element={<ContactPage />} />
                      <Route path="/contact-2" element={<ContactPage />} />
                      <Route path="/en/contact-2" element={<ContactPage />} />
                      <Route path="/leasing-application" element={<LeasingApplicationPage />} />
                      <Route path="/leasing-application-form" element={<LeasingApplicationPage />} />
                      <Route path="/apply" element={<LeasingApplicationPage />} />
                      <Route path="/apply-loan" element={<LeasingApplicationPage />} />
                      <Route path="/en/leasing-application" element={<LeasingApplicationPage />} />
                      <Route path="/used-machine" element={<AssetForSalePage />} />
                      <Route path="/used-machine-2" element={<AssetForSalePage />} />
                      <Route path="/asset-for-sale" element={<AssetForSalePage />} />
                      <Route path="/assets-for-sale" element={<AssetForSalePage />} />
                      <Route path="/asset-for-sale-en" element={<AssetForSalePage />} />
                      <Route path="/en/asset-for-sale-en" element={<AssetForSalePage />} />

                      {/* Cookie & Privacy Policy */}
                      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                      <Route path="/cookies-policy" element={<CookiePolicyPage />} />
                      <Route path="/privacy-policy" element={<CookiePolicyPage />} />
                      <Route path="/en/cookie-policy" element={<CookiePolicyPage />} />

                      {/* NC-NDA (Non-Circumvention & Non-Disclosure Agreement) */}
                      <Route path="/nc-nda" element={<NcNdaPage />} />
                      <Route path="/nda" element={<NcNdaPage />} />
                      <Route path="/customer-nda" element={<NcNdaPage />} />
                      <Route path="/non-disclosure-agreement" element={<NcNdaPage />} />
                      <Route path="/en/nc-nda" element={<NcNdaPage />} />

                      {/* Hidden Admin Login */}
                      <Route path="/management-portal" element={<LoginPage />} />

                      {/* Protected Admin Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                          <Route path="/management-portal/dashboard" element={<DashboardPage />} />
                          <Route path="/management-portal/rates" element={<RatesEditor />} />
                          <Route path="/management-portal/banner" element={<BannerEditor />} />
                          <Route path="/management-portal/news" element={<NewsEditor />} />
                          <Route path="/management-portal/custom" element={<CustomFieldsEditor />} />
                          <Route path="/management-portal/assets" element={<AssetsEditor />} />
                          <Route path="/management-portal/faq" element={<FaqEditor />} />
                          <Route path="/management-portal/company" element={<CompanyInfoEditor />} />
                        </Route>
                      </Route>
                      {/* 404 Catch-All Route for Missing / Unloaded Pages */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </ThemeProvider>
            </LanguageProvider>
          </SiteSettingsProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
