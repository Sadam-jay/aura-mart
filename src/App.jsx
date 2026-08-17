import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import NotFound from './pages/NotFound';
import LoginModal from './components/auth/LoginModal';
import CheckoutModal from './components/cart/CheckoutModal';
import TermsPrivacyModal from './components/legal/TermsPrivacyModal';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Modals & Notifications */}
      <LoginModal />
      <CheckoutModal />
      <TermsPrivacyModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
