import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  Truck, 
  Phone, 
  User, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';
import { useProducts } from '../context/ProductContext';
import { BRANCHES } from '../data/branches';

export default function CheckoutModal({ isOpen, onClose }) {
  const { 
    cart, 
    cartSubtotal, 
    deliveryCost, 
    orderTotal, 
    totalSavings, 
    deliveryMethod, 
    setDeliveryMethod, 
    orderBranch, 
    setOrderBranch, 
    deliveryOptions,
    createWhatsAppOrderUrl,
    clearCart
  } = useCart();

  const { addOrder } = useProducts();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    town: '',
    address: '',
    notes: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState(null);

  if (!isOpen) return null;

  const currentBranch = BRANCHES[orderBranch] || BRANCHES.nairobi;
  const currentDelivery = deliveryOptions.find(d => d.id === deliveryMethod) || deliveryOptions[0];

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    // 1. Create simulated order for Admin tracking
    const orderData = {
      customerName: customer.name,
      phone: customer.phone,
      branch: orderBranch,
      branchName: currentBranch.name,
      deliveryMethod: currentDelivery.label,
      deliveryAddress: `${customer.town}, ${customer.address}`,
      items: cart.map(item => ({
        name: item.name,
        qty: item.quantity,
        variant: `Size ${item.size} / ${item.color}`,
        total: item.itemSubtotal
      })),
      totalAmount: orderTotal,
      notes: customer.notes
    };

    const newOrder = addOrder(orderData);
    setPlacedOrderSummary(newOrder);

    // 2. Build WhatsApp URL
    const waUrl = createWhatsAppOrderUrl({
      name: customer.name,
      phone: customer.phone,
      location: customer.town,
      address: customer.address,
      notes: customer.notes
    }, orderBranch);

    // 3. Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // 4. Show success & clear cart
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto text-left">
      <div 
        className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-stone-900 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-400 hover:text-stone-900 transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {orderPlaced ? (
          /* Order Confirmation View */
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">
                ORDER DISPATCHED TO WHATSAPP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                Thank You, {customer.name || 'Valued Customer'}!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your order <strong className="text-amber-700">{placedOrderSummary?.id}</strong> has been generated and sent to our <strong className="text-stone-900">{currentBranch.name}</strong> customer service team.
              </p>
            </div>

            {/* M-Pesa Instructions Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3 shadow-sm">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                <CreditCard className="w-4 h-4" />
                <span>M-Pesa Payment Instructions</span>
              </div>
              <p className="text-xs text-stone-600">
                Our sales team in {currentBranch.mall} will confirm parcel packaging and send the official Buy Goods Till Number or Paybill on WhatsApp.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs shadow-sm">
                <div>
                  <span className="text-stone-400 block text-[10px] font-bold">Total Order Amount:</span>
                  <span className="text-base font-black text-amber-600">
                    KES {placedOrderSummary?.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] font-bold">Contact Branch:</span>
                  <span className="font-bold text-stone-900">{currentBranch.phoneDisplay}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${currentBranch.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat Directly</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-200"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-700">
                <ShoppingBag className="w-4 h-4" />
                <span>DIRECT STORE CHECKOUT</span>
              </div>
              <h2 className="text-2xl font-black text-stone-950">
                Complete Your Delivery Details
              </h2>
              <p className="text-xs text-stone-500">
                Your order is formatted and directly transmitted to our Nairobi or Eldoret WhatsApp branch for instant fulfillment.
              </p>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              
              {/* Branch Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  1. Select Branch for Fulfillment *
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {Object.values(BRANCHES).map((branch) => (
                    <button
                      type="button"
                      key={branch.id}
                      onClick={() => setOrderBranch(branch.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        orderBranch === branch.id
                          ? 'bg-amber-100 border-amber-400 text-stone-950 font-bold shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <div className="font-bold text-sm text-stone-900">{branch.name}</div>
                      <div className="text-[11px] text-stone-500">{branch.mall}</div>
                      <div className="text-[10px] text-amber-700 font-semibold mt-1">WA: {branch.phoneDisplay}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Customer Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victor Koech"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    M-Pesa Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="07XX XXX XXX or +254..."
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Delivery Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    County / Destination Town *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nairobi, Eldoret, Nakuru, Kisumu..."
                      value={customer.town}
                      onChange={(e) => setCustomer({ ...customer, town: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Delivery Method *
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  >
                    {deliveryOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label} — {opt.cost === 0 ? 'FREE' : `KES ${opt.cost.toLocaleString()}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Specific Estate / Building / Courier Stage Pickup Point *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Easy Coach Eldoret Stage, or Roysambu Lumumba Dr, Apt 2"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Order Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Special packing instructions or specific size preferences..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                />
              </div>

              {/* Order Cost Summary */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5 text-xs shadow-inner">
                <div className="flex justify-between text-stone-600">
                  <span>Selected Items ({cart.length}):</span>
                  <span className="text-stone-900 font-bold">KES {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery ({currentDelivery.label.split('(')[0]}):</span>
                  <span className="text-stone-900 font-bold">
                    {deliveryCost === 0 ? 'FREE' : `KES ${deliveryCost.toLocaleString()}`}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-amber-700 font-black">
                    <span>Wholesale Volume Savings:</span>
                    <span>- KES {totalSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-stone-950 pt-2 border-t border-amber-200">
                  <span>Total Payable:</span>
                  <span className="text-amber-600 font-heading">
                    KES {orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-gold py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CONFIRM & SEND ORDER VIA WHATSAPP ({currentBranch.name.split(' ')[0].toUpperCase()})</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Countrywide verified delivery. Safe M-Pesa payments upon packaging verification.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
