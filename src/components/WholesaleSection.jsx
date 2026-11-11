import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  MessageCircle, 
  FileText,
  DollarSign,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { WHOLESALE_TIERS, WHOLESALE_PACKAGES } from '../data/wholesaleDeals';
import { useBranch } from '../context/BranchContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function WholesaleSection({ onExploreBundles }) {
  const { currentBranch, selectedBranchId } = useBranch();
  const { addInquiry } = useProducts();
  const { addToCart } = useCart();

  // Profit Calculator State
  const [calcQuantity, setCalcQuantity] = useState(30);
  const [calcAvgRetail, setCalcAvgRetail] = useState(1200);
  const [calcWholesalePrice, setCalcWholesalePrice] = useState(650);

  // Wholesale Inquiry Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    town: '',
    categoryInterest: 'Streetwear T-Shirts & Khaki Pants',
    estimatedBudget: 'KES 25,000 - 50,000',
    notes: '',
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Calculations
  const totalCost = calcQuantity * calcWholesalePrice;
  const projectedRevenue = calcQuantity * calcAvgRetail;
  const projectedProfit = projectedRevenue - totalCost;
  const profitMargin = Math.round((projectedProfit / projectedRevenue) * 100);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    addInquiry({
      ...inquiryForm,
      targetBranch: selectedBranchId,
    });

    // Also trigger direct WhatsApp message
    const waText = 
`💼 *NEW WHOLESALE INQUIRY - TFC WHOLESALERS*
----------------------------------------
• *Contact Name:* ${inquiryForm.name}
• *Business/Shop Name:* ${inquiryForm.businessName || 'Starting Out'}
• *Phone:* ${inquiryForm.phone}
• *Town / County:* ${inquiryForm.town}
• *Preferred Branch:* ${currentBranch.name}
• *Category of Interest:* ${inquiryForm.categoryInterest}
• *Estimated Investment:* ${inquiryForm.estimatedBudget}
${inquiryForm.notes ? `• *Questions/Notes:* ${inquiryForm.notes}\n` : ''}
----------------------------------------
_I'd like to receive your wholesale catalog and stock availability!_`;

    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(waText)}`, '_blank');

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryModalOpen(false);
      setInquiryForm({
        name: '',
        businessName: '',
        phone: '',
        town: '',
        categoryInterest: 'Streetwear T-Shirts & Khaki Pants',
        estimatedBudget: 'KES 25,000 - 50,000',
        notes: '',
      });
    }, 2000);
  };

  const handleOrderBundle = (pkg) => {
    // Add wholesale package to cart or trigger direct WhatsApp
    const message = 
`Hello TFC Wholesalers (${currentBranch.name})!
I am interested in ordering the wholesale bundle:
• *Package:* ${pkg.title}
• *Wholesale Price:* KES ${pkg.price.toLocaleString()}
• *Included Items:* ${pkg.breakdown}
• *Sizes:* ${pkg.sizesIncluded}

Please confirm availability for pickup or parcel delivery!`;

    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-20 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 text-stone-900 relative border-t border-stone-200">
      
      {/* Decorative luxury gradient spots */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>KENYA'S BEST RESELLER MARGINS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight text-stone-950">
            BUY MORE. <span className="gold-gradient-text">SAVE MORE.</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Whether you operate a boutique in Nairobi, an Instagram store in Eldoret, or a physical shop in Kisumu, Nakuru or Mombasa — TFC Wholesalers delivers factory-direct rates to accelerate your business.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="btn-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg shadow-amber-500/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>START YOUR WHOLESALE ORDER</span>
            </button>
          </div>
        </div>

        {/* 1. Wholesale Price Tiers */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-950 text-center mb-8">
            Transparent Volume Pricing Tiers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHOLESALE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 text-left ${
                  tier.recommended
                    ? 'bg-gradient-to-b from-amber-50/70 to-white border-2 border-amber-500 shadow-xl shadow-amber-500/15 scale-105 z-10 text-stone-900'
                    : 'bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-lg text-stone-900 shadow-sm'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 font-black text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    MOST POPULAR FOR BOUTIQUES
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block">
                    {tier.tier}
                  </span>
                  <div className="mt-3 flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-stone-900">Save {tier.discountPercent}%</span>
                    <span className="text-xs text-stone-500 font-medium">vs Retail</span>
                  </div>
                  <p className="text-xs font-bold text-amber-800 mt-1">
                    Order {tier.minQty} {tier.maxQty !== 'Unlimited' ? `– ${tier.maxQty}` : '+'} Pieces
                  </p>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {tier.tagline}
                  </p>

                  <div className="mt-6 pt-6 border-t border-stone-200/80 space-y-3">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className={`w-full py-3 rounded-xl text-xs font-black transition flex items-center justify-center space-x-2 shadow-sm ${
                      tier.recommended
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-bold'
                    }`}
                  >
                    <span>Apply for {tier.tier.split(':')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Pre-Packaged Reseller Starter Bales */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-stone-950">
                Turn-Key Reseller Bundles & Bales
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Pre-packaged with assorted best-selling sizes and colorways for guaranteed fast turnover.
              </p>
            </div>
            <button
              onClick={onExploreBundles}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
            >
              <span>View All Wholesale Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHOLESALE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between text-left group shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm">
                    {pkg.tag}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md text-amber-800 text-xs font-black px-2.5 py-1 rounded border border-amber-300 shadow-sm">
                    {pkg.moq}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {pkg.breakdown}
                    </p>
                    <div className="text-[11px] text-stone-700 font-semibold mt-2">
                      Sizes: <span className="text-amber-700 font-bold">{pkg.sizesIncluded}</span>
                    </div>

                    {/* Price and Profit Estimate */}
                    <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-600 font-semibold">Bundle Price:</span>
                        <span className="text-xl font-black text-amber-700">
                          KES {pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-amber-200/50">
                        <span className="text-stone-600">Estimated Resale:</span>
                        <span className="font-bold text-stone-900">{pkg.resalePotential}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-emerald-700 font-black">
                        <span>Projected Net Profit:</span>
                        <span>{pkg.profitEstimate}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrderBundle(pkg)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Interactive Reseller Profit Calculator */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 text-left shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Reseller Calculator</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-stone-950">
                  Estimate Your Monthly Clothing Profits
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  See how much you can earn reselling TFC products in your boutique or online store.
                </p>
              </div>

              {/* Slider 1: Quantity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-stone-700">Pieces to Purchase (Monthly):</span>
                  <span className="text-amber-700 font-extrabold">{calcQuantity} Pieces</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="200"
                  step="2"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Slider 2: Wholesale Cost per piece */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-stone-700">TFC Wholesale Price (Avg per piece):</span>
                  <span className="text-amber-700 font-extrabold">KES {calcWholesalePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="380"
                  max="1600"
                  step="50"
                  value={calcWholesalePrice}
                  onChange={(e) => setCalcWholesalePrice(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Slider 3: Resell Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-stone-700">Your Retail Selling Price (Avg per piece):</span>
                  <span className="text-amber-700 font-extrabold">KES {calcAvgRetail.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="3000"
                  step="50"
                  value={calcAvgRetail}
                  onChange={(e) => setCalcAvgRetail(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Right: Profit Projection Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-yellow-50/60 rounded-2xl p-6 sm:p-8 border border-amber-300 shadow-xl flex flex-col justify-between space-y-6 text-stone-900">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-500 block">
                  Projected Monthly Net Profit
                </span>
                <div className="text-4xl sm:text-5xl font-black text-amber-600 mt-2">
                  KES {projectedProfit.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-emerald-700 font-bold flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{profitMargin}% Profit Margin on Capital Invested</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-amber-200/80">
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Capital Needed:</span>
                  <span className="font-bold text-stone-900">KES {totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Resale Revenue:</span>
                  <span className="font-bold text-stone-900">KES {projectedRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Turnaround Expectation:</span>
                  <span className="font-extrabold text-amber-700">10 – 14 Days</span>
                </div>
              </div>

              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full btn-gold py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <span>CLAIM WHOLESALE QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Wholesale Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left animate-in fade-in zoom-in-95 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">
                TFC WHOLESALERS PARTNERSHIP
              </span>
              <h3 className="text-2xl font-black text-stone-950">
                Start Your Wholesale Order
              </h3>
              <p className="text-xs text-stone-500">
                Fill out the quick form below. You'll be connected directly to the wholesale dispatch manager in {currentBranch.name}.
              </p>
            </div>

            {inquirySuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-stone-950">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-stone-600">
                  Opening WhatsApp to finalize your wholesale pricing and catalog dispatch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dennis Kemboi"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Boutique / Shop Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Kemboi Drip or 'Starting New'"
                      value={inquiryForm.businessName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, businessName: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Town / County *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eldoret, Nakuru, Kisumu"
                      value={inquiryForm.town}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, town: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Estimated Budget</label>
                    <select
                      value={inquiryForm.estimatedBudget}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, estimatedBudget: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    >
                      <option>KES 10,000 - 25,000</option>
                      <option>KES 25,000 - 50,000</option>
                      <option>KES 50,000 - 100,000</option>
                      <option>KES 100,000+ (Bulk Bale)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Primary Categories Wanted</label>
                  <select
                    value={inquiryForm.categoryInterest}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, categoryInterest: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  >
                    <option>Streetwear T-Shirts & Graphic Tees</option>
                    <option>Executive Khaki Pants & Jeans</option>
                    <option>2-Piece Sets & Shorts</option>
                    <option>Heavy Hoodies & Jackets</option>
                    <option>Mixed Reseller Bale (Assorted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Special Notes / Questions</label>
                  <textarea
                    rows="2"
                    placeholder="Tell us what you need or ask about parcel delivery to your stage..."
                    value={inquiryForm.notes}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry & Open WhatsApp</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
