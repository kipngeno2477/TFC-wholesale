import React, { useState, useEffect } from 'react';
import { BranchProvider } from './context/BranchContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ProductGrid from './components/ProductGrid';
import BuggyJeansSpotlight from './components/BuggyJeansSpotlight';
import OurProductsPage from './components/OurProductsPage';
import DepartmentPage from './components/DepartmentPage';
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
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'men' | 'women' | 'kids' | 'bedding' | 'sportswear' | 'cart'
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { setSelectedCategory } = useProducts();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hidden admin access (Ctrl+Shift+A or #admin) & Hash navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };

    const checkHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash === 'admin' || window.location.search.includes('admin=true')) {
        setAdminOpen(true);
      } else if (['men', 'women', 'kids', 'bedding', 'sportswear', 'products', 'cart', 'home'].includes(hash)) {
        setCurrentPage(hash);
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
      window.location.hash = 'home';
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
    handleNavigate('products');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Luxury Navbar with Dedicated Department Links & Integrated Search */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onScrollTo={scrollToSection}
        onOpenAccount={() => setAccountModalOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'men' ? (
          /* Dedicated Men's Fashion & Clothes Page */
          <DepartmentPage 
            department="men"
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'women' ? (
          /* Dedicated Women's Boutique & Clothes Page */
          <DepartmentPage 
            department="women"
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'kids' ? (
          /* Dedicated Children's Wear & Clothes Page */
          <DepartmentPage 
            department="kids"
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'bedding' ? (
          /* Dedicated Bedding, Duvets & Maasai Shukas Page */
          <DepartmentPage 
            department="bedding"
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'sportswear' ? (
          /* Dedicated Sportswear & Club Matchday Jerseys Page */
          <DepartmentPage 
            department="sportswear"
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'products' ? (
          /* Master "Our Products" Catalog Page (170 products with user's orange banner & checkboxes) */
          <OurProductsPage 
            onNavigateHome={() => handleNavigate('home')}
            onOpenCart={() => handleNavigate('cart')}
          />
        ) : currentPage === 'cart' ? (
          /* Dedicated Shopping Cart Page */
          <CartPage 
            onNavigateHome={() => handleNavigate('home')}
            onNavigateProducts={() => handleNavigate('products')}
            onProceedToCheckout={() => setCheckoutOpen(true)}
          />
        ) : (
          /* Homepage with Hero Carousel, Showcase Cards, Trending Now, Wholesale, etc. */
          <>
            {/* Hero Section with Real Store Images Carousel */}
            <Hero 
              onShopClick={() => handleNavigate('products')}
              onWholesaleClick={() => scrollToSection('wholesale')}
              onNavigateCategory={(cat) => {
                if (cat === 'mens-wear') handleNavigate('men');
                else if (cat === 'ladies-wear') handleNavigate('women');
                else if (cat === 'childrens-wear') handleNavigate('kids');
                else if (cat === 'bedding-home') handleNavigate('bedding');
                else if (cat === 'sportswear') handleNavigate('sportswear');
                else handleNavigate('products');
              }}
            />

            {/* Value Proposition & Trust Badges */}
            <TrustBadges />

            {/* Featured Collection Spotlight: Men's Buggy Jeans (Plain KES 1,450 / Patterned KES 1,500) */}
            <BuggyJeansSpotlight onExploreMen={handleNavigate} />

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
