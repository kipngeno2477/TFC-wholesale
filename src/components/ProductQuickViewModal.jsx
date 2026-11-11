import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Check, Star, ShieldCheck, MapPin, Sparkles, Plus, Minus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';

export default function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();
  const { currentBranch, selectedBranchId } = useBranch();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const branchStockNairobi = product.stock?.nairobi ?? 20;
  const branchStockEldoret = product.stock?.eldoret ?? 15;

  // Wholesale calculation
  const isWholesaleQualifying = quantity >= (product.wholesaleMoq || 6);
  const effectivePrice = isWholesaleQualifying ? product.wholesalePrice : product.retailPrice;
  const totalCost = effectivePrice * quantity;
  const regularTotal = product.retailPrice * quantity;
  const totalSavings = regularTotal - totalCost;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const rateText = isWholesaleQualifying 
      ? `Wholesale Rate (@ KES ${product.wholesalePrice.toLocaleString()})`
      : `Retail Rate (@ KES ${product.retailPrice.toLocaleString()})`;

    const message = 
`Hello TFC Wholesalers (${currentBranch.name})!
I want to order via website:
• *Product:* ${product.name}
• *Quantity:* ${quantity} pcs ${rateText}
• *Size:* ${selectedSize}
• *Color:* ${selectedColor}
• *Total Payable:* KES ${totalCost.toLocaleString()}
${isWholesaleQualifying ? `🎉 (Wholesale Savings Applied: KES ${totalSavings.toLocaleString()})\n` : ''}
Please confirm availability at ${currentBranch.mall} and advise on pickup or delivery!`;

    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-left animate-in fade-in zoom-in-95 duration-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-stone-50 border-r border-stone-200 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImage === img ? 'border-amber-500 scale-105 shadow-sm' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Branch Stock Badges */}
            <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                <span className="text-[10px] text-stone-500 block font-bold">Nairobi Diamond Plaza</span>
                <span className="font-extrabold text-emerald-700 flex items-center space-x-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  <span>{branchStockNairobi} pcs in stock</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                <span className="text-[10px] text-stone-500 block font-bold">Eldoret Seven Sunday</span>
                <span className="font-extrabold text-emerald-700 flex items-center space-x-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  <span>{branchStockEldoret} pcs in stock</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-stone-400 font-normal">({product.reviewsCount || 120} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-stone-950 mt-2 leading-tight">
                {product.name}
              </h2>

              {/* Fabric Specs */}
              {product.fabric && (
                <div className="inline-flex items-center space-x-1.5 text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md mt-2 border border-stone-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fabric: {product.fabric}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Dual Price Comparison Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block tracking-wider">
                      Retail Price
                    </span>
                    <span className={`text-xl font-bold ${isWholesaleQualifying ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                      KES {product.retailPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-black text-amber-800 block tracking-wider">
                      Wholesale (From {product.wholesaleMoq} pcs)
                    </span>
                    <span className="text-2xl font-black text-amber-600">
                      KES {product.wholesalePrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Wholesale Motivator */}
                <div className="mt-3 pt-3 border-t border-amber-200/80">
                  {isWholesaleQualifying ? (
                    <div className="flex items-center space-x-2 text-xs text-emerald-800 font-bold bg-emerald-100 p-2 rounded-lg border border-emerald-300">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Wholesale Rate Unlocked! You save KES {totalSavings.toLocaleString()} on this order.</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-xs text-amber-900 font-medium">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Order <strong className="text-amber-700 font-bold">{product.wholesaleMoq - quantity} more</strong> to unlock Wholesale Price of KES {product.wholesalePrice.toLocaleString()}!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-700 uppercase tracking-wider">Available Sizes:</span>
                    <span className="text-amber-700 font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition ${
                          selectedSize === size
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-black shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-700 uppercase tracking-wider">Color:</span>
                    <span className="text-amber-700 font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-7 h-7 rounded-full border-2 transition transform ${
                          selectedColor === color.name
                            ? 'ring-2 ring-amber-500 scale-110 border-white'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="mt-5 flex items-center justify-between bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-stone-950 text-base w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-semibold">Subtotal</span>
                  <span className="text-sm font-black text-amber-600">KES {totalCost.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/20 ${
                  justAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order ({currentBranch.name.split(' ')[0]})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
