import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CartConciergeDrawer } from './components/common/CartConciergeDrawer';
import { LuxuryCustomCursor } from './components/effects/LuxuryCustomCursor';
import { ScrollProgressBar } from './components/effects/ScrollProgressBar';
import { SmoothScrollProvider } from './components/effects/SmoothScrollProvider';

// Route-level code splitting for peak initial load performance
import { HomePage } from './pages/HomePage';
const RingsPage = lazy(() => import('./pages/RingsPage').then(m => ({ default: m.RingsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const OurStoryPage = lazy(() => import('./pages/OurStoryPage').then(m => ({ default: m.OurStoryPage })));
const CraftsmanshipPage = lazy(() => import('./pages/CraftsmanshipPage').then(m => ({ default: m.CraftsmanshipPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#170C06] text-[#E7C58A] select-none">
    <div className="w-12 h-12 border-2 border-[#C99A54]/30 border-t-[#E7C58A] rounded-full animate-spin mb-4" />
    <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-[#C99A54]">
      VALERIE ATELIER • LOADING
    </span>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPDP = location.pathname.startsWith('/rings/') && location.pathname !== '/rings';

  return (
    <div className={`flex flex-col min-h-screen bg-[#F8F2E9] text-[#18130F] selection:bg-[#C99A54]/30 selection:text-[#170C06] ${isPDP ? 'pb-20 md:pb-0' : 'pb-16 md:pb-0'}`}>
      {/* Luxury Hairline Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Desktop Inertial Custom Cursor */}
      <LuxuryCustomCursor />

      {/* Header with transparent mode over hero on homepage, solid on inner pages */}
      <Header isTransparent={isHomePage} />

      {/* Slide-over Luxury Cart & WhatsApp Concierge Drawer */}
      <CartConciergeDrawer />

      {/* Main Routed Page Content with Suspense */}
      <div className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
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
        </Suspense>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Fixed Luxury Mobile Bottom Dock (Hidden on PDP to prioritize direct Reserve action bar) */}
      {!isPDP && <MobileBottomNav />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <SmoothScrollProvider>
          <Router>
            <AppContent />
          </Router>
        </SmoothScrollProvider>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;
