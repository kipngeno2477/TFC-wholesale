import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Store, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      title: 'Direct Factory Sourcing',
      desc: 'We bypass middle-men to import directly, passing substantial wholesale savings on to Kenyan entrepreneurs and retail shoppers.',
      icon: TrendingUp
    },
    {
      title: 'Premium Quality Standards',
      desc: 'From heavyweight 280 GSM cotton tees to 13.5oz ring-spun denim, every fabric is inspected for durability and colorfastness.',
      icon: ShieldCheck
    },
    {
      title: 'Two Strategic Hubs',
      desc: 'Convenient walk-in branches at Diamond Plaza 1 (Nairobi) and Seven Sunday Building (Eldoret) for immediate stock inspection.',
      icon: Store
    },
    {
      title: 'Rapid Countrywide Logistics',
      desc: 'Daily 4:00 PM parcel dispatch to bus stages and doorstep couriers across all 47 Kenyan counties.',
      icon: Truck
    }
  ];

  return (
    <section id="about" className="py-20 bg-white text-stone-900 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-2xl bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80"
                  alt="TFC Wholesalers Fashion Brand"
                  className="w-full h-[480px] object-cover object-top"
                />
              </div>

              {/* Trust Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-amber-300 rounded-2xl p-4 shadow-xl text-left max-w-xs text-stone-900">
                <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-xs">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>KENYA'S TRUSTED WHOLESALER</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Supplying over 1,500 clothing boutiques and online sellers nationwide.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Copy & Value Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>THE TFC WHOLESALERS DIFFERENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight text-stone-950">
              YOUR TRUSTED FASHION <br className="hidden sm:inline" />
              <span className="gold-gradient-text">WHOLESALER IN KENYA</span>
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              At <strong className="text-stone-950 font-bold">TFC Wholesalers</strong>, we bridge the gap between world-class contemporary menswear and affordable wholesale commerce in Kenya. Headquartered with physical showrooms in <strong className="text-amber-700 font-bold">Nairobi (Diamond Plaza 1)</strong> and <strong className="text-amber-700 font-bold">Eldoret (Seven Sunday Building)</strong>, we supply trendy, high-demand clothing designed for high retail turnover.
            </p>

            <p className="text-sm text-stone-500 leading-relaxed">
              Whether you are an aspiring university student starting an Instagram thrift or streetwear page with Ksh 15,000, an established boutique owner seeking fresh weekly restocks, or an individual wanting stylish clothes at factory rates — TFC is built for you.
            </p>

            {/* 4 Feature Pillars Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-extrabold text-stone-900">{item.title}</h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center space-x-4 text-xs font-bold text-stone-500">
              <span className="flex items-center space-x-1 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Diamond Plaza Gate 2</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Seven Sunday Eldoret</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
