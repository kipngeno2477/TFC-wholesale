import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';
import { useCart } from '../context/CartContext';

export default function AccountModal({ isOpen, onClose }) {
  const { currentBranch, selectedBranchId, setBranch, allBranches } = useBranch();
  const { wishlistCount, cartCount } = useCart();

  const [customerName, setCustomerName] = useState(() => localStorage.getItem('tfc_customer_name') || 'Guest Shopper');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('tfc_customer_phone') || '');
  const [customerAddress, setCustomerAddress] = useState(() => localStorage.getItem('tfc_customer_addr') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('tfc_customer_name', customerName);
    localStorage.setItem('tfc_customer_phone', customerPhone);
    localStorage.setItem('tfc_customer_addr', customerAddress);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm text-left">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 text-stone-900 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading text-stone-950">
                Customer Account
              </h2>
              <p className="text-xs text-stone-500">
                TFC Wholesalers Shopper Profile & Preferences
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Cart Items
            </span>
            <span className="text-xl font-black text-stone-950 mt-0.5 block">
              {cartCount} Items
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Wishlist Saved
            </span>
            <span className="text-xl font-black text-rose-600 mt-0.5 block">
              {wishlistCount} Saved
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Brian Kiprop"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 0712 345 678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              Default Delivery Address / County
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="e.g. Eldoret Town, Opposite Naivas"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Preferred Branch Selector */}
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              Preferred Pickup / Ordering Branch
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBranch('nairobi')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedBranchId === 'nairobi'
                    ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                <div className="font-black text-xs">Nairobi Branch</div>
                <div className="text-[10px] text-stone-500">Diamond Plaza 1</div>
              </button>

              <button
                type="button"
                onClick={() => setBranch('eldoret')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedBranchId === 'eldoret'
                    ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                <div className="font-black text-xs">Eldoret Branch</div>
                <div className="text-[10px] text-stone-500">Seven Sunday Bldg</div>
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl flex items-center space-x-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Preferences saved successfully!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-black uppercase tracking-wider rounded-xl transition shadow-md"
          >
            Save Account Details
          </button>
        </form>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Active Branch: <strong className="text-stone-900">{currentBranch.name}</strong></span>
          <a
            href={`https://wa.me/${currentBranch.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 font-bold hover:underline flex items-center space-x-1"
          >
            <span>Branch WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

