import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { LandingPage } from './modules/public/LandingPage';
import { SearchPage } from './modules/public/SearchPage';
import { ListingDetailsPage } from './modules/public/ListingDetailsPage';
import { LoginPage } from './modules/auth/LoginPage';
import { RegisterPage } from './modules/auth/RegisterPage';
import { ProviderDashboardPage } from './modules/provider/ProviderDashboardPage';
import { ProviderPropertiesPage } from './modules/provider/ProviderPropertiesPage';
import { AdminDashboardPage } from './modules/admin/AdminDashboardPage';
import { AdminApprovalsPage } from './modules/admin/AdminApprovalsPage';
import { MpesaCheckoutPage } from './modules/payments/MpesaCheckoutPage';
import { NotFoundPage } from './modules/public/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listings/:id" element={<ListingDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/provider" element={<ProviderDashboardPage />} />
          <Route path="/provider/properties" element={<ProviderPropertiesPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
          <Route path="/pay/mpesa" element={<MpesaCheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
