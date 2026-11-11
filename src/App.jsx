import React, { useState, useEffect } from 'react';
import { BranchProvider } from './context/BranchContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ProductGrid from './components/ProductGrid';
import OurProductsPage from './components/OurProductsPage';
import CartPage from './components/CartPage';
import AccountModal from './components/AccountModal';
import WholesaleSection from './components/WholesaleSection';
import BranchLocations from './components/BranchLocations';
import AboutSection from './components/AboutSection';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';

import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminDashboard from './components/AdminDashboard';

function MainShopContent() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'cart'
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { setSelectedCategory } = useProducts();

  // Hidden admin access (Ctrl+Shift+A or #admin) & Hash navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };

    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || window.location.search.includes('admin=true')) {
        setAdminOpen(true);
      } else if (hash === '#products' || hash === '#categories') {
        setCurrentPage('products');
      } else if (hash === '#cart') {
        setCurrentPage('cart');
      } else if (hash === '#home') {
        setCurrentPage('home');
      }
    };

    checkHash();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const scrollToSection = (id) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreBundles = () => {
    setSelectedCategory('bales');
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Luxury Navbar with Integrated Search & Reasonable Spacing */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.location.hash = page;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollTo={scrollToSection}
        onOpenAccount={() => setAccountModalOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'products' ? (
          /* Dedicated Our Products Page (Exact match to reference design with orange header & checkbox filters) */
          <OurProductsPage 
            onNavigateHome={() => {
              setCurrentPage('home');
              window.location.hash = 'home';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCart={() => {
              setCurrentPage('cart');
              window.location.hash = 'cart';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentPage === 'cart' ? (
          /* Dedicated Shopping Cart Page */
          <CartPage 
            onNavigateHome={() => {
              setCurrentPage('home');
              window.location.hash = 'home';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateProducts={() => {
              setCurrentPage('products');
              window.location.hash = 'products';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceedToCheckout={() => setCheckoutOpen(true)}
          />
        ) : (
          /* Homepage with Hero Carousel, Showcase Cards, Trending Now, Wholesale, etc. */
          <>
            {/* Hero Section with Real Store Images Carousel */}
            <Hero 
              onShopClick={() => scrollToSection('products')}
              onWholesaleClick={() => scrollToSection('wholesale')}
              onNavigateCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage('products');
                window.location.hash = 'products';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Value Proposition & Trust Badges */}
            <TrustBadges />

            {/* Product Catalog ("TRENDING NOW" with Left Sidebar Filter & 4-Column Grid) */}
            <ProductGrid />

            {/* Wholesale Deals ("BUY MORE. SAVE MORE.") */}
            <WholesaleSection 
              onExploreBundles={handleExploreBundles}
            />

            {/* Branch Locations & Interactive Map */}
            <BranchLocations />

            {/* About TFC Wholesalers Section */}
            <AboutSection />

            {/* Instagram & TikTok Social Feed */}
            <SocialFeed />
          </>
        )}
      </main>

      {/* Website Footer */}
      <Footer 
        onScrollTo={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Customer Account Modal */}
      <AccountModal 
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal />

      {/* Slide-over Cart Drawer */}
      <CartDrawer 
        onProceedToCheckout={() => setCheckoutOpen(true)}
      />

      {/* Checkout Modal with WhatsApp Generator */}
      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* Persistent Floating WhatsApp Helper */}
      <FloatingWhatsApp />

      {/* Admin Dashboard (Hidden & Protected with PIN - Invisible to regular customers) */}
      <AdminDashboard 
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <BranchProvider>
      <ProductProvider>
        <CartProvider>
          <MainShopContent />
        </CartProvider>
      </ProductProvider>
    </BranchProvider>
  );
}
