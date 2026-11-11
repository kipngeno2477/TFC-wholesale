import React from 'react';
import { Truck, Store, Tag, ShieldCheck, Clock, Award } from 'lucide-react';

export default function TrustBadges() {
  const benefits = [
    {
      icon: Store,
      title: '2 Physical Branches',
      desc: 'Diamond Plaza 1 (Nairobi) & Seven Sunday Bldg (Eldoret). Walk in anytime to view & test fabric quality.'
    },
    {
      icon: Tag,
      title: 'Factory-Direct Wholesale',
      desc: 'Save 35% - 55% with low minimum order quantities (from 3–6 pcs) or pre-packaged reseller bales.'
    },
    {
      icon: Truck,
      title: 'Countrywide Delivery',
      desc: 'Daily 4:00 PM parcel dispatch to all 47 counties via Easy Coach, Guardian, North Rift & Fargo.'
    },
    {
      icon: Award,
      title: 'Kenyan Reseller Partner',
      desc: 'Empowering over 1,500 boutique owners, Instagram fashion sellers, and campus entrepreneurs.'
    }
  ];

  return (
    <section className="bg-white border-y border-stone-200/90 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 to-white border border-stone-200/80 hover:border-amber-400 hover:shadow-md transition-all text-left"
              >
                <div className="p-3 rounded-xl bg-amber-500/15 text-amber-600 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-stone-900 tracking-wide">{item.title}</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
