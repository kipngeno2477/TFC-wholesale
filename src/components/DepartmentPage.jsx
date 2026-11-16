import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Search, 
  ChevronRight, 
  Filter, 
  Check, 
  Sparkles,
  Info,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';

const DEPT_CONFIGS = {
  men: {
    key: 'mens-wear',
    navKey: 'men',
    title: "Men's Fashion & Streetwear",
    badge: "MEN'S COLLECTION 2026",
    subtitle: "Plain Buggy Jeans (KES 1,450), Patterned & Graphic Buggy Jeans (KES 1,500), executive stretch khakis, tactical cargos, raw denim jeans, Cuban shirts, 380 GSM heavyweight hoodies, and biker leather jackets.",
    gradient: "from-stone-900 via-stone-850 to-stone-950",
    accentColor: "text-amber-400",
    borderAccent: "border-amber-500/30",
    subcategories: [
      { id: 'all', label: 'All Men' },
      { id: 'plain-buggy', label: 'Plain Buggy (KES 1,450)', filter: (p) => p.subCategory === 'buggy-jeans' && p.retailPrice === 1450 },
      { id: 'patterned-buggy', label: 'Patterned Buggy (KES 1,500)', filter: (p) => p.subCategory === 'buggy-jeans' && p.retailPrice === 1500 },
      { id: 'all-buggy', label: 'Buggy Jeans (All 36)', filter: (p) => p.subCategory === 'buggy-jeans' || p.name?.toLowerCase().includes('buggy') || p.name?.toLowerCase().includes('baggy') },
      { id: 'khakis', label: 'Khakis & Cargos', match: ['khakis', 'cargo', 'trao', 'gagis'] },
      { id: 'jeans', label: 'Denim Jeans (All)', match: ['jeans', 'denim', 'g star'] },
      { id: 'shirts', label: 'Shirts & Cubans', match: ['shirts', 'cuban', 'official'] },
      { id: 't-shirts', label: 'Heavyweight Tees', match: ['t-shirts', 'tsh', 'tisho', 'longsleeve'] },
      { id: 'hoodies', label: 'Hoodies & Fleeces', match: ['hoodies', 'fleece', 'flece', 'alo'] },
      { id: 'jackets', label: 'Jackets & Leather', match: ['jackets', 'leather', 'jkt', 'jaket'] },
      { id: 'sweaters', label: 'Thermal Sweaters', match: ['sweaters', 'pullover'] },
    ]
  },
  women: {
    key: 'ladies-wear',
    navKey: 'women',
    title: "Women's Boutique & Dresses",
    badge: "WOMEN'S BOUTIQUE 2026",
    subtitle: "Chic floral midi dresses, vintage high-waist mom jeans, soft knit sweaters, tailored biker leather, and elegant plus-size gowns.",
    gradient: "from-rose-950 via-stone-900 to-stone-950",
    accentColor: "text-rose-400",
    borderAccent: "border-rose-500/30",
    subcategories: [
      { id: 'all', label: 'All Women' },
      { id: 'dresses', label: 'Dresses & Gowns', match: ['dresses', 'dress'] },
      { id: 'ladies-jeans', label: 'Mom Jeans & Pants', match: ['ladies-jeans', 'mumy', 'jean'] },
      { id: 'ladies-sweaters', label: 'Knit Sweaters', match: ['ladies-sweaters', 'sw', 'sweater'] },
      { id: 'ladies-jackets', label: 'Leather Jackets', match: ['ladies-jackets', 'leather', 'jck'] },
      { id: 'jumpsuits', label: 'Jumpsuits & Co-ords', match: ['jumpsuit', 'jumpsuits'] },
      { id: 'plus-size', label: 'Plus-Size Occasion', match: ['plus-size', 'big mma'] },
    ]
  },
  kids: {
    key: 'childrens-wear',
    navKey: 'kids',
    title: "Children's Wear & Toddlers",
    badge: "KIDS & TODDLERS 2026",
    subtitle: "Cozy skin-friendly polar fleeces, winter hooded puffer jackets, playground athletic tracksuits, and junior club matchday jerseys.",
    gradient: "from-amber-950 via-stone-900 to-stone-950",
    accentColor: "text-amber-400",
    borderAccent: "border-amber-500/30",
    subcategories: [
      { id: 'all', label: 'All Kids' },
      { id: 'kids-fleece', label: 'Polar Fleeces', match: ['kids-fleece', 'flece', 'fleece'] },
      { id: 'kids-hoodies', label: 'Warm Hoodies', match: ['kids-hoodies', 'hood'] },
      { id: 'kids-jackets', label: 'Puffer Jackets', match: ['kids-jackets', 'jacket'] },
      { id: 'kids-tracksuits', label: 'Tracksuits & Joggers', match: ['kids-tracksuits', 'trao'] },
      { id: 'kids-jerseys', label: 'Junior Jerseys', match: ['kids-jerseys', 'jersey'] },
    ]
  },
  bedding: {
    key: 'bedding-home',
    navKey: 'bedding',
    title: "Bedding, Duvets & Kenyan Home",
    badge: "HOTEL GRADE BEDDING",
    subtitle: "6x6 heavyweight siliconized microfiber duvets, pure glazed cotton bedsheets, authentic Maasai shukas, hotel pillows, and Korean blankets.",
    gradient: "from-emerald-950 via-stone-900 to-teal-950",
    accentColor: "text-emerald-400",
    borderAccent: "border-emerald-500/30",
    subcategories: [
      { id: 'all', label: 'All Bedding' },
      { id: 'duvets-6x6', label: '6x6 Microfiber Duvets', match: ['duvets-6x6', 'duve', 'dvtt', 'dvtx'] },
      { id: 'bedsheet-sets', label: 'Cotton Bedsheets', match: ['bedsheet-sets', 'bdsheet', 'bed'] },
      { id: 'maasai-shuka', label: 'Maasai Shukas', match: ['maasai-shuka', 'maasai', 'masai', 'shuka'] },
      { id: 'hotel-pillows', label: 'Hotel Pillows', match: ['hotel-pillows', 'pillow'] },
      { id: 'heavy-blankets', label: 'Mink Blankets', match: ['heavy-blankets', 'blanket'] },
      { id: 'lesos', label: 'Coastal Lesos', match: ['lesos', 'leso'] },
    ]
  },
  sportswear: {
    key: 'sportswear',
    navKey: 'sportswear',
    title: "Sportswear & Official Club Jerseys",
    badge: "THAI GRADE MATCHDAY 2024/25",
    subtitle: "Official replica kits for Arsenal, Chelsea, Manchester City, and Manchester United, plus dry-fit athletic training tracksuits and varsity jackets.",
    gradient: "from-blue-950 via-stone-900 to-indigo-950",
    accentColor: "text-blue-400",
    borderAccent: "border-blue-500/30",
    subcategories: [
      { id: 'all', label: 'All Sportswear' },
      { id: 'arsenal', label: 'Arsenal FC', match: ['arsenal'] },
      { id: 'chelsea', label: 'Chelsea FC', match: ['chelsea'] },
      { id: 'city', label: 'Man City', match: ['city'] },
      { id: 'united', label: 'Man United', match: ['united'] },
      { id: 'training', label: 'Training Tracksuits', match: ['training', 'sports'] },
      { id: 'varsity', label: 'Varsity Jackets', match: ['varsity', 'baseball'] },
    ]
  }
};

export default function DepartmentPage({ department, onNavigate }) {
  const config = DEPT_CONFIGS[department] || DEPT_CONFIGS.men;
  const { products, setQuickViewProduct } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { currentBranch } = useBranch();

  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [localSearch, setLocalSearch] = useState('');
  const [showInStockOnly, setShowInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [addedProductIds, setAddedProductIds] = useState([]);

  // Base products for this department
  const deptProducts = useMemo(() => {
    return products.filter(p => p.category === config.key || p.parentCategory === config.key);
  }, [products, config.key]);

  // Subcategory count lookup
  const subcategoryCounts = useMemo(() => {
    const counts = { all: deptProducts.length };
    config.subcategories.forEach(sub => {
      if (sub.id === 'all') return;
      const count = deptProducts.filter(p => {
        if (sub.filter) return sub.filter(p);
        return sub.match?.some(m => 
          p.subCategory?.toLowerCase().includes(m) || 
          p.name?.toLowerCase().includes(m) || 
          p.description?.toLowerCase().includes(m)
        );
      }).length;
      counts[sub.id] = count;
    });
    return counts;
  }, [deptProducts, config.subcategories]);

  // Filtered & sorted products list
  const filteredProducts = useMemo(() => {
    return deptProducts.filter(p => {
      // Stock filter
      if (showInStockOnly && p.stock) {
        const totalStock = (p.stock.nairobi || 0) + (p.stock.eldoret || 0);
        if (totalStock <= 0) return false;
      }

      // Subcategory filter
      if (activeSubcategory !== 'all') {
        const sub = config.subcategories.find(s => s.id === activeSubcategory);
        if (sub) {
          if (sub.filter) {
            if (!sub.filter(p)) return false;
          } else if (sub.match) {
            const matches = sub.match.some(m => 
              p.subCategory?.toLowerCase().includes(m) || 
              p.name?.toLowerCase().includes(m) || 
              p.description?.toLowerCase().includes(m)
            );
            if (!matches) return false;
          }
        }
      }

      // Search query
      if (localSearch.trim()) {
        const q = localSearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchSub = p.subCategory?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchSub) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.retailPrice - b.retailPrice;
      if (sortBy === 'price-high') return b.retailPrice - a.retailPrice;
      if (sortBy === 'wholesale-savings') {
        const saveA = a.wholesalePrice ? a.retailPrice - a.wholesalePrice : 0;
        const saveB = b.wholesalePrice ? b.retailPrice - b.wholesalePrice : 0;
        return saveB - saveA;
      }
      return 0; // featured default
    });
  }, [deptProducts, activeSubcategory, localSearch, showInStockOnly, sortBy, config.subcategories]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  const handleWhatsAppOrder = (e, product) => {
    e.stopPropagation();
    const msg = `Hello TFC Wholesalers (${currentBranch.name})! I'm on your ${config.title} page and want to order: ${product.name} at KES ${product.retailPrice.toLocaleString()}. Please confirm stock.`;
    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-24 text-left">
      
      {/* 1. Header Banner */}
      <section className={`bg-gradient-to-r ${config.gradient} text-white py-12 px-6 sm:px-8 lg:px-12 shadow-sm border-b border-stone-800`}>
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-400">
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              className="hover:text-amber-400 transition"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <button 
              onClick={() => onNavigate && onNavigate('products')} 
              className="hover:text-amber-400 transition"
            >
              Products
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className={`${config.accentColor} font-bold`}>{config.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <div className={`inline-flex items-center space-x-2 bg-white/10 ${config.accentColor} border ${config.borderAccent} px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{config.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight uppercase">
                {config.title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-2 font-normal leading-relaxed">
                {config.subtitle}
              </p>
            </div>

            {/* Quick in-page Search Box */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder={`Search in ${config.title}...`}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl py-3 pl-4 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 shadow-md"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Department Quick Switcher Bar (Jump between Men, Women, Kids, Bedding, Sportswear, All) */}
      <nav className="sticky top-20 sm:top-22 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-3 px-6 sm:px-8 lg:px-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 sm:space-x-3 min-w-max">
          <span className="text-xs font-black uppercase tracking-wider text-stone-400 mr-2 flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Store Departments:</span>
          </span>

          <button
            onClick={() => onNavigate && onNavigate('products')}
            className="text-xs font-bold px-3.5 py-2 rounded-full transition bg-stone-100 hover:bg-stone-200 text-stone-700"
          >
            All Products (170)
          </button>

          <button
            onClick={() => onNavigate && onNavigate('men')}
            className={`text-xs font-bold px-3.5 py-2 rounded-full transition ${
              department === 'men' 
                ? 'bg-stone-950 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Men's Fashion (99)
          </button>

          <button
            onClick={() => onNavigate && onNavigate('women')}
            className={`text-xs font-bold px-3.5 py-2 rounded-full transition ${
              department === 'women' 
                ? 'bg-rose-600 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Women's Boutique (23)
          </button>

          <button
            onClick={() => onNavigate && onNavigate('kids')}
            className={`text-xs font-bold px-3.5 py-2 rounded-full transition ${
              department === 'kids' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Children's Wear (12)
          </button>

          <button
            onClick={() => onNavigate && onNavigate('bedding')}
            className={`text-xs font-bold px-3.5 py-2 rounded-full transition ${
              department === 'bedding' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Bedding & Home (18)
          </button>

          <button
            onClick={() => onNavigate && onNavigate('sportswear')}
            className={`text-xs font-bold px-3.5 py-2 rounded-full transition ${
              department === 'sportswear' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Sportswear & Kits (12)
          </button>
        </div>
      </nav>

      {/* 3. Subcategories Filter Pills Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
          {config.subcategories.map(sub => {
            const count = subcategoryCounts[sub.id] || 0;
            const isSelected = activeSubcategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{sub.label}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-stone-700 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Controls Bar (Count, In-Stock Toggle, Sort) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          
          <div className="flex items-center space-x-3 text-xs text-stone-700">
            <span>
              Showing <strong className="text-stone-950 font-black">{filteredProducts.length}</strong> items in{' '}
              <strong className="text-teal-700 font-bold">{config.title}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            {/* In-Stock Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="accent-teal-600 rounded"
              />
              <span className="text-stone-700 font-medium">In-Stock Only</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-stone-400 font-bold uppercase text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-semibold focus:outline-none focus:border-teal-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="wholesale-savings">Wholesale Savings</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Main Product Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(product => {
              const isFavorited = isInWishlist(product.id);
              const isAdded = addedProductIds.includes(product.id);
              const discountPct = product.wholesalePrice
                ? Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100)
                : 35;

              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Discount & Custom Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                      <span className="bg-[#EA580C] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md">
                        -{discountPct > 0 ? discountPct : 30}%
                      </span>
                      {product.badge && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shadow-md tracking-wider ${
                          product.retailPrice === 1450
                            ? 'bg-emerald-600 text-white'
                            : product.retailPrice === 1500
                            ? 'bg-purple-700 text-white'
                            : 'bg-stone-900/90 text-amber-400'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-md transition z-10"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-1 rounded-md shadow-md border border-amber-500">
                        Price KES {product.retailPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        {product.subCategory?.replace('-', ' ')}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                      {product.wholesalePrice && (
                        <p className="text-xs text-stone-500 font-medium mt-1">
                          Wholesale: <strong className="text-teal-700 font-bold">KES {product.wholesalePrice.toLocaleString()}</strong> (Min {product.wholesaleMoq || 6} pcs)
                        </p>
                      )}
                    </div>

                    {/* Stock Branch Indicators */}
                    <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                      <span>Nairobi: <strong className="text-emerald-700 font-bold">{product.stock?.nairobi || 25} pcs</strong></span>
                      <span>Eldoret: <strong className="text-emerald-700 font-bold">{product.stock?.eldoret || 18} pcs</strong></span>
                    </div>

                    {/* Actions: Add to Cart & WhatsApp */}
                    <div className="pt-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-950 hover:bg-amber-600 hover:text-stone-950 text-white active:scale-95'
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
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <p className="text-sm font-bold text-stone-700">
              No products found in {config.title} matching your search or filters.
            </p>
            <button
              onClick={() => { setActiveSubcategory('all'); setLocalSearch(''); }}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
