import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  Sparkles,
  Check
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useBranch } from '../context/BranchContext';
import ProductCard from './ProductCard';

const COLOR_OPTIONS = [
  { name: 'All', hex: '#E5E7EB' },
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Khaki', hex: '#C3B091' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Grey', hex: '#6B7280' },
];

const SIZE_OPTIONS = ['All', 'S', 'M', 'L', 'XL', '2XL'];

const CATEGORY_SIDEBAR_ITEMS = [
  { id: 'all', name: 'All Collections' },
  { id: 'new-arrivals', name: 'New Arrivals' },
  { id: 'ladies-wear', name: 'Women' },
  { id: 'mens-wear', name: 'Men' },
  { id: 'sportswear', name: 'Sportswear & Jerseys' },
  { id: 'bedding-home', name: 'Bedding & Home' },
  { id: 'bags-luggage', name: 'Accessories & Bags' },
  { id: 'bales', name: 'Mixed Bales & Wholesale' },
];

export default function ProductGrid() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wholesaleOnly,
    setWholesaleOnly,
    sortBy,
    setSortBy,
  } = useProducts();

  const { selectedBranchId, setBranch } = useBranch();

  // Local filter states for sidebar matching reference image
  const [maxPrice, setMaxPrice] = useState(30000);
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');

  // Accordion collapsed state
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
    brand: true,
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(30000);
    setSelectedColor('All');
    setSelectedSize('All');
    setWholesaleOnly(false);
  };

  // Filter products based on sidebar criteria
  const finalProducts = useMemo(() => {
    return filteredProducts.filter((product) => {
      // Price filter
      if (product.retailPrice > maxPrice) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = product.colors?.some(c => 
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }
      // Size filter
      if (selectedSize !== 'All') {
        const hasSize = product.sizes?.some(s => 
          s.toUpperCase().includes(selectedSize.toUpperCase())
        );
        if (!hasSize) return false;
      }
      return true;
    });
  }, [filteredProducts, maxPrice, selectedColor, selectedSize]);

  return (
    <section id="products" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">

      {/* 1. Header: TRENDING NOW (Exact match to reference image) */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-stone-950 uppercase tracking-tight">
          TRENDING NOW
        </h2>
        <div className="w-12 h-1 bg-teal-600 mx-auto mt-2 rounded-full" />
      </div>

      {/* 2. Main 2-Column Layout (Sidebar + Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Filter Sidebar (Matching reference image) */}
        <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
          
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-stone-400 hover:text-teal-600 transition flex items-center space-x-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Section 1: CATEGORIES Accordion */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-teal-600 transition"
            >
              <span>CATEGORIES</span>
              {openSections.categories ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {openSections.categories && (
              <div className="mt-3 space-y-1.5 pl-1">
                {CATEGORY_SIDEBAR_ITEMS.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between py-1 text-xs transition ${
                        isActive
                          ? 'font-bold text-teal-700'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-teal-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: PRICE RANGE Accordion */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-teal-600 transition"
            >
              <span>PRICE RANGE</span>
              {openSections.price ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {openSections.price && (
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>KES 400</span>
                  <span className="text-teal-700 font-black">KES {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="30000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>
            )}
          </div>

          {/* Section 3: COLOR Accordion */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleSection('color')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-teal-600 transition"
            >
              <span>COLOR</span>
              {openSections.color ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {openSections.color && (
              <div className="mt-3 flex items-center flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = selectedColor === c.name;
                  if (c.name === 'All') {
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor('All')}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border transition ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        All
                      </button>
                    );
                  }
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border transition transform ${
                        isSelected 
                          ? 'ring-2 ring-teal-600 scale-110 border-white' 
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      title={c.name}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 4: SIZE Accordion */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-teal-600 transition"
            >
              <span>SIZE</span>
              {openSections.size ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {openSections.size && (
              <div className="mt-3 flex items-center flex-wrap gap-1.5">
                {SIZE_OPTIONS.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs font-bold px-3 py-1 rounded border transition ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 5: BRAND / BRANCH Accordion */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-teal-600 transition"
            >
              <span>BRANCH / LOCATION</span>
              {openSections.brand ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {openSections.brand && (
              <div className="mt-3 space-y-1.5 pl-1">
                <button
                  onClick={() => setBranch('nairobi')}
                  className={`w-full flex items-center justify-between py-1 text-xs transition ${
                    selectedBranchId === 'nairobi'
                      ? 'font-bold text-teal-700'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>Nairobi (Diamond Plaza 1)</span>
                  {selectedBranchId === 'nairobi' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>

                <button
                  onClick={() => setBranch('eldoret')}
                  className={`w-full flex items-center justify-between py-1 text-xs transition ${
                    selectedBranchId === 'eldoret'
                      ? 'font-bold text-teal-700'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>Eldoret (Seven Sunday)</span>
                  {selectedBranchId === 'eldoret' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              </div>
            )}
          </div>

        </aside>

        {/* Right Column: Products Display */}
        <div className="lg:col-span-9 space-y-5">
          
          {/* Top Bar above Products: Product Count & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
            <div className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-900 font-bold">{finalProducts.length}</strong> items in{' '}
              <span className="text-teal-700 font-bold uppercase">{selectedCategory.replace('-', ' ')}</span>
            </div>

            {/* Wholesale Only Toggle & Sort Dropdown */}
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => setWholesaleOnly(!wholesaleOnly)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition flex items-center space-x-1.5 ${
                  wholesaleOnly
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                <span>Wholesale Deals Only</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-stone-200 text-stone-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal-500 shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="wholesale-savings">Highest Wholesale Savings</option>
              </select>
            </div>
          </div>

          {/* 4-Column Grid of Product Cards (from reference image) */}
          {finalProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {finalProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                No products found matching your current filters
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try adjusting your price range, color, size, or category filter to discover more products.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
