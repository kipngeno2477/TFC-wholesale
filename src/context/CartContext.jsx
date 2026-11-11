import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRANCHES } from '../data/branches';

const CartContext = createContext();

export const DELIVERY_OPTIONS = [
  { id: 'nairobi_pickup', label: 'Nairobi Diamond Plaza 1 (Store Pickup)', cost: 0, branch: 'nairobi' },
  { id: 'nairobi_doorstep', label: 'Nairobi Doorstep Delivery (Boda / Rider)', cost: 300, branch: 'nairobi' },
  { id: 'eldoret_pickup', label: 'Eldoret Seven Sunday Building (Store Pickup)', cost: 0, branch: 'eldoret' },
  { id: 'eldoret_doorstep', label: 'Eldoret Doorstep Delivery', cost: 200, branch: 'eldoret' },
  { id: 'countrywide_courier', label: 'Countrywide Parcel Courier (Easy Coach / Guardian / Fargo)', cost: 450, branch: 'any' },
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tfc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('countrywide_courier');
  const [orderBranch, setOrderBranch] = useState('nairobi');

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('tfc_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tfc_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    try {
      localStorage.setItem('tfc_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add to cart with size, color, quantity
  const addToCart = (product, quantity = 1, size = null, color = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          retailPrice: product.retailPrice,
          wholesalePrice: product.wholesalePrice,
          wholesaleMoq: product.wholesaleMoq || 6,
          image: product.image,
          size: chosenSize,
          color: chosenColor,
          quantity: quantity,
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations:
  // For each item, if total quantity of that product in cart >= wholesaleMoq, apply wholesale price!
  const productQuantities = cart.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {});

  const calculatedItems = cart.map(item => {
    const totalProductQty = productQuantities[item.productId] || item.quantity;
    const isWholesale = totalProductQty >= item.wholesaleMoq;
    const effectiveUnitPrice = isWholesale ? item.wholesalePrice : item.retailPrice;
    const itemSubtotal = effectiveUnitPrice * item.quantity;
    const itemRetailSubtotal = item.retailPrice * item.quantity;
    const savings = itemRetailSubtotal - itemSubtotal;

    return {
      ...item,
      isWholesale,
      effectiveUnitPrice,
      itemSubtotal,
      savings,
      neededForWholesale: Math.max(0, item.wholesaleMoq - totalProductQty),
    };
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = calculatedItems.reduce((sum, item) => sum + item.itemSubtotal, 0);
  const totalSavings = calculatedItems.reduce((sum, item) => sum + item.savings, 0);

  const currentDelivery = DELIVERY_OPTIONS.find(d => d.id === deliveryMethod) || DELIVERY_OPTIONS[0];
  const deliveryCost = currentDelivery ? currentDelivery.cost : 0;
  const orderTotal = cartSubtotal + deliveryCost;

  // Generate WhatsApp order message with encoding
  const createWhatsAppOrderUrl = (customerDetails, targetBranchId = orderBranch) => {
    const branch = BRANCHES[targetBranchId] || BRANCHES.nairobi;
    const branchPhone = branch.whatsapp;

    const itemsSummary = calculatedItems.map((item, idx) => {
      const rateLabel = item.isWholesale ? `(Wholesale Rate @ KES ${item.wholesalePrice.toLocaleString()})` : `@ KES ${item.retailPrice.toLocaleString()}`;
      return `${idx + 1}. *${item.name}*\n   • Variant: Size ${item.size} | Color: ${item.color}\n   • Qty: ${item.quantity} pcs ${rateLabel}\n   • Subtotal: KES ${item.itemSubtotal.toLocaleString()}`;
    }).join('\n\n');

    const message = 
`🛍️ *NEW ORDER - TFC WHOLESALERS KENYA*
----------------------------------------
*CUSTOMER DETAILS:*
• *Name:* ${customerDetails.name || 'Valued Customer'}
• *Phone:* ${customerDetails.phone || 'N/A'}
• *County / Town:* ${customerDetails.location || 'Nairobi/Eldoret'}
• *Specific Landmark/Address:* ${customerDetails.address || 'CBD Pick-up'}
• *Fulfillment Branch:* ${branch.name} (${branch.mall})
• *Delivery Method:* ${currentDelivery.label} (${deliveryCost === 0 ? 'FREE' : `KES ${deliveryCost.toLocaleString()}`})
${customerDetails.notes ? `• *Special Notes:* ${customerDetails.notes}\n` : ''}
----------------------------------------
*ITEMS ORDERED:*
${itemsSummary}

----------------------------------------
• *Items Subtotal:* KES ${cartSubtotal.toLocaleString()}
• *Delivery Fee:* ${deliveryCost === 0 ? 'FREE' : `KES ${deliveryCost.toLocaleString()}`}
${totalSavings > 0 ? `• *Wholesale Savings:* KES ${totalSavings.toLocaleString()} 🎉\n` : ''}
⭐ *TOTAL PAYABLE: KES ${orderTotal.toLocaleString()}*
----------------------------------------
_Sent from TFC Wholesalers Website. Kindly confirm stock availability and send M-Pesa payment details._`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${branchPhone}?text=${encoded}`;
  };

  return (
    <CartContext.Provider value={{
      cart: calculatedItems,
      rawCart: cart,
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
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      createWhatsAppOrderUrl,
      deliveryOptions: DELIVERY_OPTIONS,
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
