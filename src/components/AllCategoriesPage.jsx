import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Grid, 
  Shirt, 
  Footprints, 
  Home, 
  Briefcase, 
  Zap, 
  Package, 
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

const DEPARTMENTS = [
  {
    id: 'dept-ladies',
    name: "Ladies' Wear",
    icon: '👗',
    badge: 'BOUTIQUE HITS',
    description: 'Chic floral midi dresses, vintage high-waist mom jeans, cable-knit sweaters, tailored biker leather, and curvy plus-size outfits.',
    categoryFilter: 'ladies-wear',
    subcategories: ['All Ladies', 'Dresses', 'Mom Jeans', 'Sweaters', 'Leather Jackets', 'Jumpsuits', 'Plus-Size'],
  },
  {
    id: 'dept-mens',
    name: "Men's Fashion & Streetwear",
    icon: '👔',
    badge: 'TOP MENSWEAR KENYA',
    description: 'Executive stretch khakis, raw straight-cut denim, Egyptian cotton & Cuban shirts, heavy 380 GSM hoodies, polar fleeces & biker leather jackets.',
    categoryFilter: 'mens-wear',
    subcategories: ['All Men', 'Khakis', 'Jeans', 'Shirts', 'Jackets & Leather', 'Hoodies & Fleeces', 'T-Shirts'],
  },
  {
    id: 'dept-kids',
    name: "Children's Wear",
    icon: '🧒',
    badge: 'KIDS & TODDLERS',
    description: 'Cozy skin-friendly polar fleeces, winter hooded puffer jackets, playground athletic tracksuits, and junior club jerseys.',
    categoryFilter: 'childrens-wear',
    subcategories: ['All Kids', 'Fleeces', 'Puffer Jackets', 'Tracksuits', 'Junior Jerseys'],
  },
  {
    id: 'dept-sports',
    name: 'Sportswear & Official Club Jerseys',
    icon: '⚽',
    badge: 'THAI GRADE 2024/25',
    description: 'Official replica jerseys for Arsenal, Chelsea, Manchester City, and Manchester United, plus dry-fit athletic training tracksuits.',
    categoryFilter: 'sportswear',
    subcategories: ['All Sportswear', 'Arsenal FC', 'Chelsea FC', 'Man City', 'Man United', 'Tracksuits'],
  },
  {
    id: 'dept-bedding',
    name: 'Bedding, Duvets & Kenyan Home',
    icon: '🏠',
    badge: 'HOTEL GRADE',
    description: '6x6 heavyweight siliconized reversible duvets, pure cotton bedsheets, hotel pillows, original Kenyan Maasai shukas, and heavy blankets.',
    categoryFilter: 'bedding-home',
    subcategories: ['All Bedding', '6x6 Duvets', 'Bedsheet Sets', 'Hotel Pillows', 'Maasai Shukas', 'Heavy Blankets', 'Lesos'],
  },
  {
    id: 'dept-bags',
    name: 'Bags, Luggage & Accessories',
    icon: '🧳',
    badge: 'TRAVEL & ACCESSORIES',
    description: 'Waterproof 45L travel duffel bags with shoe compartments, solid cowhide leather belts, and heavy-duty canvas work aprons.',
    categoryFilter: 'bags-luggage',
    subcategories: ['All Bags', 'Travel Duffels', 'Leather Belts', 'Canvas Aprons'],
  },
  {
    id: 'dept-bales',
    name: 'Mixed Bales & Wholesale Packages',
    icon: '📦',
    badge: 'RESELLER HIGH MARGIN',
    description: 'Direct factory 50kg duvet export bales, 45kg velvet curtains bales, and 30-piece streetwear t-shirt reseller starter packs.',
    categoryFilter: 'bales',
    subcategories: ['All Bales', '50kg Duvet Bales', 'Velvet Bales', '30-Pc Starter Bundles'],
  },
];

export default function AllCategoriesPage({ onNavigateHome }) {
  const { products } = useProducts();
  const [localSearch, setLocalSearch] = useState('');
  const [activeDeptTab, setActiveDeptTab] = useState('all');

  const filteredProductsByDept = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      const items = products.filter((p) => {
        // Matches department category
        const matchesCat = 
          p.category === dept.categoryFilter || 
          p.parentCategory === dept.categoryFilter;

        // Matches search query if provided
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          return matchesCat && (matchName || matchDesc);
        }

        return matchesCat;
      });

      return {
        ...dept,
        items,
      };
    });
  }, [products, localSearch]);

  const scrollToDept = (deptId) => {
    setActiveDeptTab(deptId);
    const target = document.getElementById(deptId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 pb-20 text-left">
      
      {/* 1. Page Header & Hero Banner */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-950 text-white py-14 px-6 sm:px-8 lg:px-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-400">
            <button onClick={onNavigateHome} className="hover:text-amber-400 transition">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-amber-400 font-bold">All Categories Page</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>COMPLETE CATALOGUE DIRECTORY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white uppercase">
                ALL PRODUCT <span className="text-teal-400">CATEGORIES</span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-2 font-normal leading-relaxed">
                Browse our entire warehouse catalogue by department. Every product includes real-time retail pricing, wholesale bulk rates, and instant countrywide delivery options.
              </p>
            </div>

            {/* Quick in-page Search Filter */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search within all categories..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-xl py-3 pl-4 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-teal-400 shadow-md"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Sticky Department Quick-Jump Navigation Bar */}
      <nav className="sticky top-20 sm:top-22 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-3 px-6 sm:px-8 lg:px-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 sm:space-x-3 min-w-max">
          <span className="text-xs font-black uppercase tracking-wider text-stone-400 mr-2 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Jump To:</span>
          </span>

          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => scrollToDept(dept.id)}
              className={`text-xs font-bold px-3.5 py-2 rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
                activeDeptTab === dept.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-teal-50 text-stone-700 hover:text-teal-700 border border-stone-200/80'
              }`}
            >
              <span>{dept.icon}</span>
              <span>{dept.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 3. Department by Department Showcase Sections */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 space-y-16">
        {filteredProductsByDept.map((dept, index) => (
          <section 
            key={dept.id} 
            id={dept.id} 
            className="scroll-mt-36 pt-6 border-b border-stone-200/80 pb-16 last:border-b-0"
          >
            {/* Department Section Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{dept.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                    {dept.badge}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-950 uppercase tracking-tight">
                  {dept.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                  {dept.description}
                </p>
              </div>

              {/* Department Statistics / Count */}
              <div className="flex items-center space-x-4 shrink-0 text-right">
                <div className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-center">
                  <span className="text-lg font-black text-stone-950 block">
                    {dept.items.length}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-500">
                    Live Items
                  </span>
                </div>
              </div>
            </div>

            {/* Subcategory Pills bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 -mx-2 px-2 no-scrollbar">
              {dept.subcategories.map((sub, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setLocalSearch(sub.startsWith('All') ? '' : sub)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 transition border border-stone-200 shrink-0"
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Product Grid for this Department (4 Columns) */}
            {dept.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {dept.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
                <p className="text-xs font-bold text-stone-500">
                  No items found in {dept.name} matching "{localSearch}".
                </p>
                <button
                  onClick={() => setLocalSearch('')}
                  className="text-xs font-black text-teal-600 underline"
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* 4. Bottom Back to Home CTA */}
      <div className="text-center pt-10">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition"
        >
          <span>← Return to TFC Wholesalers Home</span>
        </button>
      </div>

    </div>
  );
}

