import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CartConciergeDrawer } from './components/common/CartConciergeDrawer';
import { LuxuryCustomCursor } from './components/effects/LuxuryCustomCursor';
import { ScrollProgressBar } from './components/effects/ScrollProgressBar';
import { HomePage } from './pages/HomePage';
import { RingsPage } from './pages/RingsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { CraftsmanshipPage } from './pages/CraftsmanshipPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F2E9] text-[#18130F] selection:bg-[#C99A54]/30 selection:text-[#170C06] pb-14 md:pb-0">
      {/* Luxury Hairline Scroll Progress Bar & Chapter Radar */}
      <ScrollProgressBar />

      {/* Desktop Inertial Custom Cursor & Stardust Trail */}
      <LuxuryCustomCursor />

      {/* Header with transparent mode over hero on homepage, solid on inner pages */}
      <Header isTransparent={isHomePage} />

      {/* Slide-over Luxury Cart & WhatsApp Concierge Drawer */}
      <CartConciergeDrawer />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rings" element={<RingsPage />} />
          <Route path="/rings/:slug" element={<ProductDetailPage />} />
          <Route path="/collections/:category" element={<RingsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Fixed Luxury Mobile Bottom Dock */}
      <MobileBottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;
