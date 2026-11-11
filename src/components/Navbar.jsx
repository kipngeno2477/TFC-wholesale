import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Heart,
  User,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';
import { useProducts } from '../context/ProductContext';

export default function Navbar({ currentPage, onNavigate, onScrollTo, onOpenAccount }) {
  const { cartCount, wishlistCount } = useCart();
  const { selectedBranchId, setBranch, currentBranch, allBranches } = useBranch();
  const { searchQuery, setSearchQuery, setSelectedCategory } = useProducts();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const handleNavClick = (pageOrSection, category = null) => {
    setMobileMenuOpen(false);

    if (pageOrSection === 'products') {
      if (onNavigate) onNavigate('products');
      if (category) setSelectedCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pageOrSection === 'cart') {
      if (onNavigate) onNavigate('cart');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pageOrSection === 'home' || pageOrSection === 'hero') {
      if (onNavigate) onNavigate('home');
      setSelectedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default to home page sections
    if (onNavigate) onNavigate('home');
    if (category) {
      setSelectedCategory(category);
    }
    if (onScrollTo) {
      setTimeout(() => onScrollTo(pageOrSection), 100);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentPage !== 'products' && onNavigate) {
        onNavigate('products');
      }
    }
  };

  return (
    <>
      {/* 1. Top Announcement & Branch Switcher Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-xs text-stone-950 border-b border-amber-300 py-2 px-6 sm:px-8 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-stone-950 text-amber-300 shadow-sm">
              KENYA WHOLESALE & RETAIL
            </span>
            <span className="hidden md:inline text-amber-900/40 font-bold">|</span>
            <span className="font-semibold text-stone-950">
              Countrywide Parcel Dispatch Daily via Easy Coach, Guardian & Fargo
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            {/* Branch Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="flex items-center space-x-1.5 py-1 px-3 rounded-lg bg-stone-950/10 hover:bg-stone-950/15 border border-stone-950/20 text-stone-950 text-xs font-bold transition shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-stone-900" />
                <span className="font-black text-stone-950">{currentBranch.name}</span>
                <ChevronDown className="w-3 h-3 text-stone-800" />
              </button>

              {branchDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-64 bg-white border border-stone-200 rounded-xl shadow-2xl p-2 z-50 text-left"
                  onMouseLeave={() => setBranchDropdownOpen(false)}
                >
                  <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 px-2 py-1">
                    Select Nearest Branch:
                  </p>
                  {Object.values(allBranches).map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        setBranch(branch.id);
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg transition flex items-start space-x-2.5 my-0.5 ${
                        selectedBranchId === branch.id
                          ? 'bg-amber-100 border border-amber-300 text-stone-950 font-bold'
                          : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs text-stone-900">{branch.name}</div>
                        <div className="text-[11px] text-stone-500 leading-tight">{branch.mall}</div>
                        <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">📞 {branch.phoneDisplay}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick WhatsApp Contact Link */}
            <a
              href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent("Hello TFC Wholesalers! I'm browsing your online store.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1 text-stone-950 hover:text-stone-800 font-bold transition"
            >
              <span>WhatsApp:</span>
              <span className="font-black">{currentBranch.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Header with Spacious Layout, Navigation & Search at End */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="flex items-center justify-between h-20 sm:h-22 gap-4 lg:gap-8">
            
            {/* Brand Logo (Left) */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center space-x-3 group text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-heading font-black text-xl text-white tracking-tighter">TFC</span>
                </div>
                <div>
                  <span className="font-heading font-black text-xl sm:text-2xl text-stone-950 tracking-tight block">
                    TFC <span className="text-teal-600 font-black">Wholesalers</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 block -mt-1 font-bold">
                    NAIROBI • ELDORET
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links with Reasonable Spacing (No dropdown menu, No wholesale tab) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 shrink-0">
              
              <button
                onClick={() => handleNavClick('home')}
                className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition ${
                  currentPage === 'home'
                    ? 'text-teal-600 font-black'
                    : 'text-stone-700 hover:text-teal-600'
                }`}
              >
                Home
              </button>

              {/* Our Products Page (Direct Link - NO dropdown menu as requested) */}
              <button
                onClick={() => handleNavClick('products')}
                className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition ${
                  currentPage === 'products'
                    ? 'text-orange-600 font-black'
                    : 'text-stone-700 hover:text-orange-600'
                }`}
              >
                Our Products
              </button>

              <button
                onClick={() => handleNavClick('products', 'male')}
                className="text-xs xl:text-sm font-bold uppercase tracking-wider text-stone-700 hover:text-teal-600 transition"
              >
                Men
              </button>

              <button
                onClick={() => handleNavClick('products', 'dresses')}
                className="text-xs xl:text-sm font-bold uppercase tracking-wider text-stone-700 hover:text-teal-600 transition"
              >
                Women
              </button>

              <button
                onClick={() => handleNavClick('products', 'kids')}
                className="text-xs xl:text-sm font-bold uppercase tracking-wider text-stone-700 hover:text-teal-600 transition"
              >
                Kids
              </button>

              <button
                onClick={() => handleNavClick('branches')}
                className="text-xs xl:text-sm font-bold uppercase tracking-wider text-stone-700 hover:text-teal-600 transition"
              >
                Branches
              </button>
            </nav>

            {/* End of Navbar Content: Search Bar, Account Button, Wishlist, Cart Page, WhatsApp */}
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              
              {/* Search Bar (Moved to the end of the navbar content) */}
              <div className="hidden md:flex relative w-44 lg:w-56 xl:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className="w-full bg-stone-50 hover:bg-stone-100/90 focus:bg-white border border-stone-200/90 rounded-full py-2 pl-3.5 pr-9 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-sm transition-all"
                />
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600 transition"
                  title="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Account Button */}
              <button
                onClick={onOpenAccount}
                className="flex items-center space-x-1.5 py-2 px-3 rounded-full text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition duration-150"
                title="Customer Account"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span className="hidden sm:inline">Account</span>
              </button>

              {/* Wishlist Heart Icon with counter */}
              <button
                onClick={() => handleNavClick('products')}
                className="relative p-2 text-stone-700 hover:text-rose-600 transition duration-200"
                title="Wishlist Favorites"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700 hover:text-rose-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Page Button at the end */}
              <button
                onClick={() => handleNavClick('cart')}
                className={`relative flex items-center space-x-1.5 py-2 px-3 sm:px-4 rounded-full text-xs font-bold transition duration-200 ${
                  currentPage === 'cart'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
                title="Open Cart Page"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline uppercase tracking-wider font-black">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-1.5 py-0.2 rounded-full ml-1">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick CTA */}
              <a
                href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent("Hello TFC Wholesalers! I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition-all hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
            
            {/* Mobile Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-teal-500"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Branch Switcher */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <div className="text-xs font-bold text-stone-600 mb-2 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Active Branch:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setBranch('nairobi')}
                  className={`py-2 px-3 text-xs rounded-lg font-bold text-center transition ${
                    selectedBranchId === 'nairobi'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200'
                  }`}
                >
                  Nairobi (Diamond Plaza)
                </button>
                <button
                  onClick={() => setBranch('eldoret')}
                  className={`py-2 px-3 text-xs rounded-lg font-bold text-center transition ${
                    selectedBranchId === 'eldoret'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200'
                  }`}
                >
                  Eldoret (Seven Sunday)
                </button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-2 text-left">
              <button
                onClick={() => handleNavClick('home')}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 text-left"
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('products')}
                className="py-2 text-base font-bold text-orange-600 flex items-center justify-between text-left"
              >
                <span>Our Products</span>
                <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-black">
                  ALL STORE ITEMS
                </span>
              </button>

              <button
                onClick={() => handleNavClick('products', 'male')}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 text-left"
              >
                Men's Fashion
              </button>

              <button
                onClick={() => handleNavClick('products', 'dresses')}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 text-left"
              >
                Women's Dresses & Wear
              </button>

              <button
                onClick={() => handleNavClick('products', 'kids')}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 text-left"
              >
                Kids' Shoes & Wear
              </button>

              <button
                onClick={() => handleNavClick('cart')}
                className="py-2 text-base font-bold text-teal-700 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-teal-600" />
                  <span>Shopping Cart</span>
                </div>
                <span className="text-xs bg-teal-100 text-teal-800 font-black px-2 py-0.5 rounded-full">
                  {cartCount} items
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAccount) onOpenAccount();
                }}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 flex items-center space-x-2 text-left"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span>Customer Account</span>
              </button>

              <button
                onClick={() => handleNavClick('branches')}
                className="py-2 text-base font-semibold text-stone-800 hover:text-teal-600 text-left"
              >
                Branch Locations (Nairobi & Eldoret)
              </button>
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <a
                href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent("Hello TFC Wholesalers! I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
              >
                <span>WhatsApp {currentBranch.name}: {currentBranch.phoneDisplay}</span>
              </a>
              <a
                href={`tel:${currentBranch.phone}`}
                className="w-full py-2.5 bg-stone-100 border border-stone-200 text-stone-800 font-bold rounded-xl text-center flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call {currentBranch.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
