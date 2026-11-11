import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Clock, 
  Store, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BRANCHES } from '../data/branches';
import { useBranch } from '../context/BranchContext';

export default function BranchLocations() {
  const { selectedBranchId, setBranch } = useBranch();
  const [activeTab, setActiveTab] = useState(selectedBranchId || 'nairobi');

  const branch = BRANCHES[activeTab] || BRANCHES.nairobi;

  return (
    <section id="branches" className="py-20 bg-stone-50/90 border-t border-stone-200 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
            <Store className="w-4 h-4 text-amber-600" />
            <span>VISIT OUR PHYSICAL WALK-IN SHOWROOMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-stone-950">
            OUR BRANCH <span className="gold-gradient-text">LOCATIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600">
            Come touch the fabrics, fit sizes in person, or pick up bulk wholesale orders directly from our dedicated showrooms in Nairobi and Eldoret.
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300 inline-flex space-x-2 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('nairobi');
                setBranch('nairobi');
              }}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
                activeTab === 'nairobi'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Nairobi Branch (Diamond Plaza 1)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('eldoret');
                setBranch('eldoret');
              }}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
                activeTab === 'eldoret'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Eldoret Branch (Seven Sunday)</span>
            </button>
          </div>
        </div>

        {/* Active Branch Showcase Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 text-left">
          
          {/* Branch Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs text-amber-800 font-bold">
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>{branch.name} — Open Daily</span>
              </div>

              <h3 className="text-3xl font-black font-heading text-stone-950">
                {branch.mall}
              </h3>

              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Exact Address:</span>
                    <p className="text-stone-600 text-xs sm:text-sm">{branch.address}</p>
                    <p className="text-stone-400 text-xs mt-0.5 italic">{branch.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Operating Hours:</span>
                    <p className="text-stone-600 text-xs sm:text-sm">{branch.hours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Primary Phone / WhatsApp:</span>
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-amber-700 font-black hover:underline text-sm block"
                    >
                      {branch.phone} ({branch.phoneDisplay})
                    </a>
                  </div>
                </div>

                {branch.alternatePhones && (
                  <div className="pl-8 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">Alternate Support Lines: </span>
                    {branch.alternatePhones.map((alt, i) => (
                      <span key={i} className="mr-2">
                        <a href={`tel:${alt}`} className="hover:text-amber-700 underline font-medium">
                          {alt}
                        </a>
                        {i < branch.alternatePhones.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${branch.phone}`}
                className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center space-x-2 transition shadow-sm"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hello TFC Wholesalers ${branch.name}! I would like to visit your shop.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl btn-gold text-stone-950 text-xs font-black flex items-center justify-center space-x-2 transition shadow-md shadow-amber-500/20"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full bg-stone-100 border-t lg:border-t-0 lg:border-l border-stone-200">
            <iframe
              title={`Google Map - ${branch.name}`}
              src={branch.embedMap}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-95 hover:opacity-100 transition-all duration-500"
            />
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 text-[11px] text-stone-800 font-bold shadow-md pointer-events-none">
              📍 Verified Storefront
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
