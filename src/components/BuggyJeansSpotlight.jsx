import React from 'react';
import { Sparkles, ArrowRight, Check, Tag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function BuggyJeansSpotlight({ onExploreMen }) {
  const { setQuickViewProduct, products } = useProducts();

  // Pick top preview items: 2 plain and 2 patterned
  const plainSample = products.find(p => p.subCategory === 'buggy-jeans' && p.retailPrice === 1450);
  const patternSample = products.find(p => p.subCategory === 'buggy-jeans' && p.retailPrice === 1500);

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 border border-amber-500/30 shadow-2xl p-6 sm:p-10 text-white">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text / Info Column */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEW 2026 DROP • MEN'S STREETWEAR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading uppercase tracking-tight text-white leading-tight">
              Men's 14oz Heavyweight <br />
              <span className="text-amber-400">Wide-Leg Buggy Jeans</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
              Authentic streetwear drape engineered with pure ring-spun denim. 
              Features relaxed wide-leg cut, reinforced bar-tack pockets, and high-quality belts included with selected styles.
            </p>

            {/* Pricing Matrix Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    21 Plain Styles
                  </span>
                  <div className="text-lg font-black text-white">Plain Buggy</div>
                  <span className="text-[11px] text-stone-300">Washed Onyx, Indigo & Acid</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-400 font-heading">KES 1,450</span>
                  <span className="block text-[10px] text-stone-400">Wholesale: KES 950</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block">
                    15 Patterned Styles
                  </span>
                  <div className="text-lg font-black text-white">Patterned Buggy</div>
                  <span className="text-[11px] text-stone-300">Graphic, Monogram & Bleach</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-400 font-heading">KES 1,500</span>
                  <span className="block text-[10px] text-stone-400">Wholesale: KES 1,000</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onExploreMen && onExploreMen('men')}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg flex items-center space-x-2"
              >
                <span>Shop All 36 Buggy Jeans</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExploreMen && onExploreMen('men')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition border border-white/20"
              >
                Go To Men's Wear
              </button>
            </div>
          </div>

          {/* Right Visual Previews Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {/* Plain Preview Card */}
            {plainSample && (
              <div 
                onClick={() => setQuickViewProduct(plainSample)}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/15 cursor-pointer hover:border-amber-400 transition-all hover:scale-[1.02] duration-300 flex flex-col"
              >
                <div className="aspect-[4/5] bg-stone-900 overflow-hidden relative">
                  <img 
                    src={plainSample.image} 
                    alt={plainSample.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    PLAIN: KES 1,450
                  </div>
                </div>
                <div className="p-3 bg-stone-950/80 backdrop-blur-sm text-left">
                  <p className="text-xs font-bold text-white line-clamp-1">{plainSample.name}</p>
                  <p className="text-[11px] text-amber-400 font-extrabold mt-0.5">KES 1,450</p>
                </div>
              </div>
            )}

            {/* Patterned Preview Card */}
            {patternSample && (
              <div 
                onClick={() => setQuickViewProduct(patternSample)}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/15 cursor-pointer hover:border-amber-400 transition-all hover:scale-[1.02] duration-300 flex flex-col"
              >
                <div className="aspect-[4/5] bg-stone-900 overflow-hidden relative">
                  <img 
                    src={patternSample.image} 
                    alt={patternSample.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2.5 left-2.5 bg-purple-700 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    PATTERNED: KES 1,500
                  </div>
                </div>
                <div className="p-3 bg-stone-950/80 backdrop-blur-sm text-left">
                  <p className="text-xs font-bold text-white line-clamp-1">{patternSample.name}</p>
                  <p className="text-[11px] text-amber-400 font-extrabold mt-0.5">KES 1,500</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
