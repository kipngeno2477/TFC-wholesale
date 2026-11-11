import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Check, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';
import { useProducts } from '../context/ProductContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { selectedBranchId, currentBranch } = useBranch();
  const { setQuickViewProduct } = useProducts();

  const [selectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor] = useState(product.colors?.[0]?.name || 'Default');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const branchStock = product.stock?.[selectedBranchId] ?? 25;
  const inStock = branchStock > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleWhatsAppQuickOrder = (e) => {
    e.stopPropagation();
    const message = 
`Hello TFC Wholesalers (${currentBranch.name})!
I want to order:
• *Product:* ${product.name}
• *Price:* KES ${product.retailPrice.toLocaleString()} (Wholesale: KES ${product.wholesalePrice.toLocaleString()})

Is this in stock at ${currentBranch.mall}?`;
    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer text-left relative"
    >
      {/* 1. Image Container with Floating Heart (Matching reference image) */}
      <div className="relative aspect-[4/5] bg-[#F5F5F7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Right Heart Wishlist Icon (from reference image) */}
        <button
          onClick={handleToggleFav}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-sm transition-all duration-200 z-10"
          title="Save to Wishlist"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
            }`} 
          />
        </button>

        {/* Top-Left Badge (if wholesale / new) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-stone-900/90 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Stock tag */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="bg-white/95 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-stone-200">
            {inStock ? `Stock: ${branchStock}` : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* 2. Product Information (Title, Price, Star Rating) */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Product Title */}
          <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-teal-600 transition-colors line-clamp-1">
            {product.name}
          </h4>

          {/* Pricing Row: Retail & Wholesale */}
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-sm sm:text-base font-black text-stone-950 font-heading">
              KES {product.retailPrice.toLocaleString()}
            </span>
            {product.wholesalePrice && (
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                WS: KES {product.wholesalePrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Star Rating Row (matching reference image: ★ 4.8 ★★★★★) */}
          <div className="flex items-center space-x-1.5 mt-1.5 text-xs">
            <span className="font-black text-stone-700 text-[11px]">
              ★ {product.rating || '4.8'}
            </span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[10px] text-stone-400">
              ({product.reviewsCount || 42})
            </span>
          </div>
        </div>

        {/* 3. Bottom Button Row (Solid Black ADD TO CART button + Heart) */}
        <div className="pt-2 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-200 shadow-sm ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-950 hover:bg-stone-800 text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>

          {/* Wishlist favorite button beside it (from reference image) */}
          <button
            onClick={handleToggleFav}
            className={`p-2 rounded-md border transition-colors ${
              isFavorited
                ? 'border-rose-300 bg-rose-50 text-rose-600'
                : 'border-stone-200 hover:border-stone-300 text-stone-500 bg-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Direct WhatsApp button */}
          <button
            onClick={handleWhatsAppQuickOrder}
            className="p-2 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            title="Order via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
