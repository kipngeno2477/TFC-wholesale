import React, { useState } from 'react';
import { MessageCircle, X, MapPin, ChevronRight, Phone } from 'lucide-react';
import { BRANCHES } from '../data/branches';
import { useBranch } from '../context/BranchContext';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBranch, selectedBranchId, setBranch } = useBranch();

  return (
    <div className="fixed bottom-6 right-6 z-40 text-left">
      {/* Popover Selection Box */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white border border-stone-200 rounded-2xl shadow-2xl p-4 text-stone-900 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-xs font-black text-amber-700">TFC WhatsApp Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-stone-600 mb-3 leading-relaxed">
            Choose your preferred branch to order or ask questions directly with our sales team:
          </p>

          <div className="space-y-2">
            {Object.values(BRANCHES).map((branch) => (
              <a
                key={branch.id}
                href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hello TFC Wholesalers ${branch.name}! I need assistance with an order.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setBranch(branch.id)}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 flex items-center justify-between transition group block shadow-sm"
              >
                <div>
                  <div className="text-xs font-bold text-stone-900 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{branch.name}</span>
                  </div>
                  <div className="text-[10px] text-stone-500">{branch.mall}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">{branch.phoneDisplay}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
              </a>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-500 text-center">
            Online Mon–Sat 8am–7:30pm • Fast countrywide courier
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 border-2 border-white relative group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[9px] font-black text-stone-950">
          1
        </span>
      </button>
    </div>
  );
}
