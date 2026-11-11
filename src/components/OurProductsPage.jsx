import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Search, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';

const FILTER_CATEGORIES = [
  { id: 'dresses', label: 'Dresses', parentMatch: ['dresses', 'ladies-wear'] },
  { id: 'accessories', label: 'Accessories', parentMatch: ['accessories', 'bags-luggage'] },
  { id: 'shoes', label: 'Shoes', parentMatch: ['shoes'] },
  { id: 'male', label: 'MALE', parentMatch: ['mens-wear', 'khakis', 'jeans', 'shirts', 'jackets', 'hoodies', 't-shirts'] },
  { id: 'pallazos', label: 'PALLAZOS & Pants', parentMatch: ['khakis', 'jeans', 'ladies-jeans'] },
  { id: 'kids', label: 'KIDS SHOES & Wear', parentMatch: ['childrens-wear', 'kids-fleece', 'kids-jackets', 'kids-tracksuits'] },
  { id: 'bedding', label: 'Bedding & Duvets', parentMatch: ['bedding-home', 'duvets-6x6', 'bedsheets', 'pillows', 'maasai-shuka'] },
  { id: 'sportswear', label: 'Sportswear', parentMatch: ['sportswear', 'arsenal', 'chelsea', 'man-city', 'man-united', 'tracksuits'] },
  { id: 'bales', label: 'Mixed Bales', parentMatch: ['bales', 'wholesale-packages'] },
];

export default function OurProductsPage({ onNavigateHome, onOpenCart }) {
  const { products, setQuickViewProduct, searchQuery, setSearchQuery } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { currentBranch } = useBranch();

  // Multi-select categories matching the checkboxes in user's image
  const [selectedCats, setSelectedCats] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(true);
  const [addedProductIds, setAddedProductIds] = useState([]);

  // Calculate live count for each category
  const categoryCounts = useMemo(() => {
    const counts = {};
    FILTER_CATEGORIES.forEach((cat) => {
      const matchCount = products.filter((p) => {
        return cat.parentMatch.some(
          m => p.category?.toLowerCase().includes(m) || 
               p.parentCategory?.toLowerCase().includes(m) || 
               p.subCategory?.toLowerCase().includes(m)
        );
      }).length;
      counts[cat.id] = matchCount || 0;
    });
    return counts;
  }, [products]);

  // Toggle category checkbox
  const handleToggleCategory = (catId) => {
    setSelectedCats(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId) 
        : [...prev, catId]
    );
  };

  // Filtered products list
  const filteredList = useMemo(() => {
    return products.filter((p) => {
      // In-stock filter
      if (showInStockOnly && p.stock) {
        const totalStock = (p.stock.nairobi || 0) + (p.stock.eldoret || 0);
        if (totalStock <= 0) return false;
      }

      // Category filter (if none selected, show all)
      if (selectedCats.length > 0) {
        const matchesAny = selectedCats.some((selectedId) => {
          const catConfig = FILTER_CATEGORIES.find(c => c.id === selectedId);
          if (!catConfig) return false;
          return catConfig.parentMatch.some(
            m => p.category?.toLowerCase().includes(m) || 
                 p.parentCategory?.toLowerCase().includes(m) || 
                 p.subCategory?.toLowerCase().includes(m)
          );
        });
        if (!matchesAny) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchCat = p.category?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [products, selectedCats, showInStockOnly, searchQuery]);

  const handleAddToCart = (e, p) => {
    e.stopPropagation();
    addToCart(p, 1);
    setAddedProductIds(prev => [...prev, p.id]);
    setTimeout(() => {
      setAddedProductIds(prev => prev.filter(id => id !== p.id));
    }, 1500);
  };

  const handleWhatsAppOrder = (e, p) => {
    e.stopPropagation();
    const msg = `Hello TFC Wholesalers (${currentBranch.name})! I want to order ${p.name} at KES ${p.retailPrice.toLocaleString()}. Please confirm stock.`;
    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-20 text-left">
      
      {/* 1. Top Orange Header Banner (Exact match to reference image) */}
      <section className="bg-[#EA580C] text-white py-10 px-6 sm:px-8 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
            Our Products
          </h1>
          <div className="flex items-center space-x-2 text-xs font-semibold text-orange-100">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-white hover:underline transition"
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="text-white font-bold">Products</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Layout (Left Categories Sidebar + Right Product List) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Categories Checkbox Card (Exact match to reference image) */}
          <aside className="lg:col-span-3 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-black text-stone-900 tracking-tight pb-3 border-b border-stone-100 font-heading">
              Categories
            </h2>

            {/* Checkbox Category List */}
            <div className="mt-4 space-y-3">
              {FILTER_CATEGORIES.map((cat) => {
                const isChecked = selectedCats.includes(cat.id);
                const count = categoryCounts[cat.id] || 0;
                return (
                  <label
                    key={cat.id}
                    onClick={() => handleToggleCategory(cat.id)}
                    className="flex items-center justify-between cursor-pointer group select-none py-1 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Checkbox Square matching reference image */}
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked 
                          ? 'bg-orange-600 border-orange-600 text-white' 
                          : 'border-stone-300 group-hover:border-orange-500 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Category Label */}
                      <span className={`font-semibold transition-colors ${
                        isChecked ? 'text-orange-700 font-bold' : 'text-stone-700 group-hover:text-stone-950'
                      }`}>
                        {cat.label}
                      </span>
                    </div>

                    {/* Count Pill matching reference image */}
                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Reset Filter Button */}
            {selectedCats.length > 0 && (
              <div className="pt-5 mt-5 border-t border-stone-100">
                <button
                  onClick={() => setSelectedCats([])}
                  className="w-full py-2 text-xs font-black text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition"
                >
                  Clear Categories ({selectedCats.length})
                </button>
              </div>
            )}
          </aside>

          {/* Right Column: In-Stock Banner, Count Card, Product Grid */}
          <main className="lg:col-span-9 space-y-4">
            
            {/* Top In-Stock Notice Card (Exact match to reference image) */}
            <div className="bg-[#FFF8F0] border border-orange-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-800 shadow-sm">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="font-medium">
                  Showing items that are in stock. Do you want to see all?
                </span>
              </div>
              <button
                onClick={() => setShowInStockOnly(!showInStockOnly)}
                className="font-bold text-orange-600 hover:text-orange-700 hover:underline shrink-0"
              >
                {showInStockOnly ? 'Show All Items' : 'Show In-Stock Only'}
              </button>
            </div>

            {/* Products Counter Card (Exact match to reference image) */}
            <div className="bg-white border border-stone-200/90 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="text-sm text-stone-700">
                Showing <strong className="text-stone-950 font-black">{filteredList.length}</strong> products
              </div>

              {/* In-page quick search */}
              <div className="relative w-56 sm:w-64">
                <input
                  type="text"
                  placeholder="Filter within results..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 pl-3 pr-8 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Product Cards Grid matching the reference image */}
            {filteredList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 pt-2">
                {filteredList.map((product) => {
                  const isFavorited = isInWishlist(product.id);
                  const isAdded = addedProductIds.includes(product.id);
                  
                  // Compute mock discount for display tag (matching the -58%, -80% tags in reference)
                  const discountPct = product.wholesalePrice
                    ? Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100)
                    : 30;

                  return (
                    <div
                      key={product.id}
                      onClick={() => setQuickViewProduct(product)}
                      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />

                        {/* Orange Discount Badge (from reference image -58%, -80%) */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-[#EA580C] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md">
                            -{discountPct > 0 ? discountPct : 35}%
                          </span>
                        </div>

                        {/* Floating Wishlist Heart */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-md transition z-10"
                        >
                          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Price Tag Overlay (like the yellow "Price 420" badge in reference image) */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-1 rounded-md shadow-md border border-amber-500">
                            Price KES {product.retailPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                            {product.category?.replace('-', ' ')}
                          </span>
                          <h3 className="text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1 mt-0.5">
                            {product.name}
                          </h3>
                          {product.wholesalePrice && (
                            <p className="text-xs text-stone-500 font-medium mt-1">
                              Wholesale: <strong className="text-teal-700">KES {product.wholesalePrice.toLocaleString()}</strong> (Min {product.wholesaleMoq || 6} pcs)
                            </p>
                          )}
                        </div>

                        {/* Action Buttons: Add to Cart & WhatsApp */}
                        <div className="pt-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-950 hover:bg-orange-600 text-white active:scale-95'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                          </button>

                          <button
                            onClick={(e) => handleWhatsAppOrder(e, product)}
                            className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition shadow-sm"
                            title="Order via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
                <p className="text-sm font-bold text-stone-700">
                  No products found for the selected categories or search terms.
                </p>
                <button
                  onClick={() => { setSelectedCats([]); setSearchQuery(''); }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}

