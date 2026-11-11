import React from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';

export default function CartPage({ onNavigateHome, onNavigateProducts, onProceedToCheckout }) {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    totalSavings, 
    deliveryMethod, 
    setDeliveryMethod, 
    deliveryCost, 
    orderTotal, 
    orderBranch, 
    setOrderBranch, 
    removeFromCart, 
    updateQuantity,
    deliveryOptions,
    clearCart,
    createWhatsAppOrderUrl
  } = useCart();

  const { allBranches, currentBranch } = useBranch();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-24 text-left">
      
      {/* 1. Header Banner */}
      <section className="bg-stone-900 text-white py-10 px-6 sm:px-8 lg:px-12 shadow-sm border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-400">
            <button onClick={onNavigateHome} className="hover:text-amber-400 transition">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <button onClick={onNavigateProducts} className="hover:text-amber-400 transition">
              Our Products
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-orange-400 font-bold">Shopping Cart</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white uppercase">
              Shopping Cart
            </h1>
            <span className="text-xs font-black uppercase tracking-wider bg-orange-600 text-white px-3 py-1 rounded-full shadow-sm">
              {cartCount} Items
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Cart Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Area: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm divide-y divide-stone-100">
                <div className="pb-4 flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 font-heading">
                    Items in Your Order ({cart.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline"
                  >
                    Clear All Items
                  </button>
                </div>

                <div className="pt-2 divide-y divide-stone-100">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="py-4 flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-sm font-bold text-stone-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium">
                          Variant: <strong className="text-stone-800">{item.selectedSize} / {item.selectedColor}</strong>
                        </p>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="font-black text-stone-950">
                            KES {item.activePrice.toLocaleString()} each
                          </span>
                          {item.isWholesaleApplied && (
                            <span className="text-[10px] font-black uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                              Wholesale Rate Applied
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition border border-stone-200"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition border border-stone-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right shrink-0 w-24">
                        <span className="text-sm font-black text-stone-950 block">
                          KES {item.lineTotal.toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 transition p-1 mt-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping Button */}
              <div className="pt-2">
                <button
                  onClick={onNavigateProducts}
                  className="text-xs font-black text-orange-600 hover:text-orange-700 hover:underline flex items-center space-x-1"
                >
                  <span>← Continue Shopping Our Products</span>
                </button>
              </div>
            </div>

            {/* Right Area: Order Summary & Checkout Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 pb-3 border-b border-stone-100 font-heading">
                  Order Summary
                </h2>

                {/* Subtotal & Savings */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-stone-900">
                      KES {cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-teal-700 font-bold bg-teal-50 p-2 rounded-lg border border-teal-200">
                      <span>Wholesale Savings:</span>
                      <span>- KES {totalSavings.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Delivery Selection */}
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700">
                      Select Delivery Method:
                    </label>
                    <div className="space-y-1.5">
                      {deliveryOptions.map((opt) => (
                        <label
                          key={opt.id}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            deliveryMethod === opt.id
                              ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100/70 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="cart_delivery"
                              checked={deliveryMethod === opt.id}
                              onChange={() => setDeliveryMethod(opt.id)}
                              className="accent-orange-600"
                            />
                            <span>{opt.label}</span>
                          </div>
                          <span className="font-bold">
                            {opt.cost === 0 ? 'FREE' : `+KES ${opt.cost}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Fee Line */}
                  <div className="flex items-center justify-between text-stone-600 pt-2">
                    <span>Delivery Fee:</span>
                    <span className="font-bold text-stone-900">
                      {deliveryCost === 0 ? 'FREE' : `KES ${deliveryCost.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* Total Payable */}
                <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                  <span className="text-sm font-black text-stone-900 uppercase">
                    Total Payable:
                  </span>
                  <span className="text-2xl font-black text-orange-600 font-heading">
                    KES {orderTotal.toLocaleString()}
                  </span>
                </div>

                {/* Primary Checkout Action: WhatsApp / Direct Order */}
                <div className="space-y-2 pt-2">
                  <a
                    href={createWhatsAppOrderUrl(currentBranch.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp ({currentBranch.name.split(' ')[0]})</span>
                  </a>

                  {onProceedToCheckout && (
                    <button
                      onClick={onProceedToCheckout}
                      className="w-full py-3 px-4 bg-stone-950 hover:bg-stone-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-sm transition"
                    >
                      Fill Online Delivery Form
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-stone-500 text-center space-y-1 pt-2">
                  <p>✓ Countrywide Dispatch via Easy Coach, Guardian & Fargo</p>
                  <p>✓ Pay on Delivery or via M-Pesa</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200/90 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-stone-900">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-xs text-stone-500">
              Discover our latest products in streetwear, dresses, duvets, jerseys, and wholesale bales.
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateProducts}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
              >
                Start Shopping Our Products →
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

