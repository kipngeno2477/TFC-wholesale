import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  CreditCard
} from 'lucide-react';
import { InstagramIcon, TikTokIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';
import { BRANCHES } from '../data/branches';
import { SOCIAL_LINKS } from '../data/socialPosts';

export default function Footer({ onScrollTo, onOpenAdmin }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);

  const handleSecretAdminTrigger = () => {
    setAdminClicks(prev => {
      const next = prev + 1;
      if (next >= 3) {
        if (onOpenAdmin) onOpenAdmin();
        return 0;
      }
      return next;
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-white text-stone-600 border-t border-stone-200 text-left pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid (Exact match to reference image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-stone-200">
          
          {/* Col 1: CUSTOMER SERVICE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 font-heading">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600">
              <li>
                <a href="#about" onClick={() => onScrollTo('about')} className="hover:text-teal-600 transition">
                  Help & FAQs
                </a>
              </li>
              <li>
                <span className="hover:text-teal-600 transition cursor-pointer">
                  Countrywide Courier Dispatch
                </span>
              </li>
              <li>
                <span className="hover:text-teal-600 transition cursor-pointer">
                  Wholesale Return Policy
                </span>
              </li>
              <li>
                <a href={`https://wa.me/${BRANCHES.nairobi.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition">
                  Track Parcel / Delivery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 font-heading">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600">
              <li>
                <button onClick={() => onScrollTo('about')} className="hover:text-teal-600 transition">
                  About TFC Wholesalers
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('branches')} className="hover:text-teal-600 transition">
                  Branch Locations (Nairobi & Eldoret)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('wholesale')} className="hover:text-teal-600 transition font-bold text-teal-700">
                  Wholesale Deals & Bales
                </button>
              </li>
              <li>
                <a href={`tel:${BRANCHES.nairobi.phone}`} className="hover:text-teal-600 transition">
                  Contact Store Line
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: FOLLOW US */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 font-heading">
              FOLLOW US
            </h4>
            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 text-white hover:bg-teal-600 flex items-center justify-center transition shadow-sm"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 text-white hover:bg-teal-600 flex items-center justify-center transition shadow-sm"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 text-white hover:bg-teal-600 flex items-center justify-center transition shadow-sm"
                title="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${BRANCHES.nairobi.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 text-white hover:bg-emerald-600 flex items-center justify-center transition shadow-sm"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              Follow our daily video unboxings on Instagram & TikTok.
            </p>
          </div>

          {/* Col 4: JOIN OUR NEWSLETTER (Email + Black Subscribe button) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 font-heading">
              JOIN OUR NEWSLETTER
            </h4>
            {subscribed ? (
              <div className="text-xs text-emerald-700 font-bold flex items-center space-x-1.5 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subscribed! Check WhatsApp/Email soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-md px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-black uppercase tracking-wider py-2.5 rounded-md transition shadow-sm active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Row: Payment Logos & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          {/* Payment Badges (matching reference image) */}
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-wider">
            <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200 text-emerald-800 font-black">
              M-PESA
            </span>
            <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200 text-blue-800 font-bold">
              VISA
            </span>
            <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200 text-red-800 font-bold">
              MASTERCARD
            </span>
            <span className="px-2 py-1 rounded bg-stone-100 border border-stone-200 text-stone-700 font-bold">
              CASH ON DELIVERY
            </span>
          </div>

          {/* Copyright & Hidden Admin access */}
          <p 
            onClick={handleSecretAdminTrigger} 
            title="TFC Wholesalers Kenya" 
            className="cursor-default select-none text-[11px] text-stone-400 hover:text-stone-600 transition"
          >
            © 2026 TFC Wholesalers. All rights reserved. Terms & Conditions
          </p>
        </div>

      </div>
    </footer>
  );
}
