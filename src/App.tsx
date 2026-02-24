import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { HomePage } from '@/pages/public/HomePage';
import { LoginPage } from '@/pages/admin/LoginPage';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { RatesEditor } from '@/pages/admin/RatesEditor';
import { BannerEditor } from '@/pages/admin/BannerEditor';
import { NewsEditor } from '@/pages/admin/NewsEditor';
import { CustomFieldsEditor } from '@/pages/admin/CustomFieldsEditor';

export default function App() {
  return (
    <AuthProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </SiteSettingsProvider>
    </AuthProvider>
  );
}
