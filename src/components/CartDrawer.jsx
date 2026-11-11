import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  MapPin, 
  MessageCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';

export default function CartDrawer({ onProceedToCheckout }) {
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
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity,
    deliveryOptions,
    clearCart
  } = useCart();

  const { allBranches } = useBranch();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-stone-950">Your Shopping Cart</h2>
              <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                {cartCount} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wholesale Savings Banner */}
          {totalSavings > 0 && (
            <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-center space-x-2 text-xs text-amber-900 font-bold">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
              <span>You're saving KES {totalSavings.toLocaleString()} with wholesale volume rates!</span>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Explore our latest graphic tees, khaki pants, hoodies, and wholesale bales to start shopping.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex gap-3 relative group shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-xl border border-stone-200 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 pr-6">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-red-500 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-bold">
                          Size: {item.size}
                        </span>
                        <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-bold">
                          {item.color}
                        </span>
                      </div>

                      {/* Wholesale status */}
                      {item.isWholesale ? (
                        <div className="text-[10px] font-extrabold text-amber-700 flex items-center space-x-1 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-amber-600" />
                          <span>Wholesale Price Applied</span>
                        </div>
                      ) : (
                        item.neededForWholesale > 0 && (
                          <div className="text-[10px] text-stone-500 mt-1">
                            Add <span className="text-amber-700 font-bold">{item.neededForWholesale} more</span> for wholesale (KES {item.wholesalePrice})
                          </div>
                        )
                      )}
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200">
                      <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border border-stone-300 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-950 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-amber-600">
                          KES {item.itemSubtotal.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          @ KES {item.effectiveUnitPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              
              {/* Branch Selection for Fulfillment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Choose Fulfillment Branch:</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.values(allBranches).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setOrderBranch(b.id)}
                      className={`p-2 rounded-xl border text-left transition ${
                        orderBranch === b.id
                          ? 'bg-amber-100 border-amber-400 text-stone-950 font-bold shadow-sm'
                          : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <div className="truncate font-semibold">{b.name}</div>
                      <div className="text-[10px] text-stone-500 truncate">{b.mall}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Option Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Delivery Method:</span>
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500 shadow-sm"
                >
                  {deliveryOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label} — {opt.cost === 0 ? 'FREE' : `KES ${opt.cost.toLocaleString()}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span className="text-stone-500">Items Subtotal:</span>
                  <span className="font-bold text-stone-900">KES {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="font-bold text-stone-900">
                    {deliveryCost === 0 ? 'FREE' : `KES ${deliveryCost.toLocaleString()}`}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>Wholesale Volume Savings:</span>
                    <span>- KES {totalSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-stone-950 pt-2 border-t border-stone-200">
                  <span>Total Payable:</span>
                  <span className="text-amber-600 font-heading">
                    KES {orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full btn-gold py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-500">
                Direct dispatch to Nairobi, Eldoret, and all 47 counties via verified couriers.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
