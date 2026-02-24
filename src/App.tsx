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
import { AdminLayout } from '@/components/layout/AdminLayout';

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/public/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage').then(m => ({ default: m.DashboardPage })));
const RatesEditor = lazy(() => import('@/pages/admin/RatesEditor').then(m => ({ default: m.RatesEditor })));
const BannerEditor = lazy(() => import('@/pages/admin/BannerEditor').then(m => ({ default: m.BannerEditor })));
const NewsEditor = lazy(() => import('@/pages/admin/NewsEditor').then(m => ({ default: m.NewsEditor })));
const CustomFieldsEditor = lazy(() => import('@/pages/admin/CustomFieldsEditor').then(m => ({ default: m.CustomFieldsEditor })));

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
                  <Toaster position="top-right" toastOptions={{ className: 'glass text-foreground', style: { background: 'rgba(30,30,40,0.85)', backdropFilter: 'blur(12px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public */}
                      <Route path="/" element={<HomePage />} />

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
                        </Route>
                      </Route>
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
