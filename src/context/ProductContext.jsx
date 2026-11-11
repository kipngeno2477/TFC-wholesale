import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductContext = createContext();

const INITIAL_ORDERS = [
  {
    id: 'TFC-ORD-1092',
    customerName: 'Brian Kiprop',
    phone: '0712 345 678',
    branch: 'eldoret',
    branchName: 'Eldoret Seven Sunday',
    deliveryMethod: 'Countrywide Parcel Courier (Easy Coach)',
    deliveryAddress: 'Kitale Town, Near Posta',
    items: [
      { name: 'Chrome Hearts Heavy Graphic Tee', qty: 10, variant: 'Size L / Onyx Black', total: 6000 },
      { name: 'Stretch Slim-Fit Executive Khaki Trousers', qty: 6, variant: 'Size 32 / Classic Khaki', total: 6300 }
    ],
    totalAmount: 12750,
    status: 'Dispatched via Parcel',
    date: '2026-03-09 11:20 AM',
    notes: 'Please label parcel clearly for Kitale booking office'
  },
  {
    id: 'TFC-ORD-1091',
    customerName: 'Kevin Mwangi',
    phone: '0722 890 123',
    branch: 'nairobi',
    branchName: 'Nairobi Diamond Plaza',
    deliveryMethod: 'Nairobi Doorstep Delivery (Rider)',
    deliveryAddress: 'Kilimani, Denis Pritt Rd, Apt 4B',
    items: [
      { name: 'Reseller Starter Bale: 30 Pcs Mixed Graphic Tees', qty: 1, variant: 'Pre-sorted Bale', total: 17500 }
    ],
    totalAmount: 17800,
    status: 'Paid via M-Pesa',
    date: '2026-03-09 09:45 AM',
    notes: 'Boda rider to call upon arrival'
  },
  {
    id: 'TFC-ORD-1090',
    customerName: 'Amina Hassan',
    phone: '0799 443 211',
    branch: 'nairobi',
    branchName: 'Nairobi Diamond Plaza',
    deliveryMethod: 'Diamond Plaza 1 (Store Pickup)',
    deliveryAddress: 'Walk-in Diamond Plaza 2nd Floor',
    items: [
      { name: '2-Piece Textured Casual Full Set', qty: 4, variant: 'Size M / Oatmeal Beige', total: 5600 }
    ],
    totalAmount: 5600,
    status: 'Pending WhatsApp Review',
    date: '2026-03-08 04:15 PM',
    notes: 'Will pick up tomorrow at 2pm'
  }
];

const INITIAL_INQUIRIES = [
  {
    id: 'INQ-501',
    name: 'Samuel Ochieng',
    businessName: 'Lake Drip Boutique (Kisumu)',
    phone: '0720 112 233',
    email: 'samuel@lakedrip.co.ke',
    town: 'Kisumu',
    targetBranch: 'eldoret',
    estimatedBudget: 'KES 50,000 - 100,000',
    categoryInterest: 'Khaki Pants & Streetwear Bales',
    date: '2026-03-09 10:15 AM',
    status: 'New'
  },
  {
    id: 'INQ-502',
    name: 'Faith Chebet',
    businessName: 'Apex Fashion Vault (Nakuru)',
    phone: '0715 998 877',
    email: 'faith.chebet@gmail.com',
    town: 'Nakuru',
    targetBranch: 'nairobi',
    estimatedBudget: 'KES 25,000 - 50,000',
    categoryInterest: '2-Piece Sets & Graphic Tees',
    date: '2026-03-08 02:40 PM',
    status: 'Contacted'
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('tfc_products_catalog_v4');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('tfc_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('tfc_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [wholesaleOnly, setWholesaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('tfc_products_catalog_v4', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('tfc_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tfc_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  // Admin Actions
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `tfc-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      isNewArrival: true,
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `TFC-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Pending WhatsApp Review'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const addInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  // Filter products logic
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        if (!product.isNewArrival) return false;
      } else if (selectedCategory === 'wholesale-packages' || selectedCategory === 'bales') {
        if (product.category !== 'bales' && product.parentCategory !== 'bales' && product.category !== 'wholesale-packages') return false;
      } else if (
        product.category !== selectedCategory &&
        product.parentCategory !== selectedCategory &&
        product.subCategory !== selectedCategory
      ) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // Wholesale only filter
    if (wholesaleOnly) {
      if (!product.wholesalePrice || product.wholesalePrice >= product.retailPrice) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.retailPrice - b.retailPrice;
    if (sortBy === 'price-high') return b.retailPrice - a.retailPrice;
    if (sortBy === 'wholesale-savings') {
      const savingsA = a.retailPrice - a.wholesalePrice;
      const savingsB = b.retailPrice - b.wholesalePrice;
      return savingsB - savingsA;
    }
    if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    return 0; // default order
  });

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      wholesaleOnly,
      setWholesaleOnly,
      sortBy,
      setSortBy,
      quickViewProduct,
      setQuickViewProduct,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      addOrder,
      updateOrderStatus,
      inquiries,
      addInquiry,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
