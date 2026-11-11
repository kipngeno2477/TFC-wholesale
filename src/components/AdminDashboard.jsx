import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck,
  Search,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../data/products';
import { BRANCHES } from '../data/branches';

export default function AdminDashboard({ isOpen, onClose }) {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus,
    inquiries 
  } = useProducts();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'inquiries', 'branches'
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Form State for Add / Edit Product
  const [formProduct, setFormProduct] = useState({
    name: '',
    category: 't-shirts',
    retailPrice: 1200,
    wholesalePrice: 750,
    wholesaleMoq: 6,
    badge: 'NEW ARRIVAL',
    image: '',
    fabric: '100% Premium Cotton',
    sizes: 'M, L, XL, 2XL',
    stockNairobi: 50,
    stockEldoret: 35,
    description: '',
  });

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md text-left">
        <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-900">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black font-heading text-stone-950">
                Staff & Admin Portal
              </h3>
              <p className="text-xs text-stone-500">
                Authorized Store Personnel Only
              </p>
            </div>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Admin Security PIN
              </label>
              <input
                type="password"
                autoFocus
                placeholder="Enter PIN (e.g. 2026)"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-500 font-mono tracking-widest text-center text-lg"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-bold mt-1.5">
                  Incorrect PIN. Please enter the valid admin PIN.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 rounded-xl font-black text-xs tracking-wider uppercase shadow-md shadow-amber-500/20"
            >
              Unlock Dashboard
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Authorized TFC Wholesalers Management
            </p>
          </form>
        </div>
      </div>
    );
  }

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormProduct({
      name: '',
      category: 't-shirts',
      retailPrice: 1200,
      wholesalePrice: 750,
      wholesaleMoq: 6,
      badge: 'NEW ARRIVAL',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      fabric: '100% Premium Heavy Cotton',
      sizes: 'M, L, XL, 2XL',
      stockNairobi: 50,
      stockEldoret: 35,
      description: 'Trendy Kenyan streetwear piece. Premium stitching and durability.',
    });
    setProductModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProductId(p.id);
    setFormProduct({
      name: p.name,
      category: p.category,
      retailPrice: p.retailPrice,
      wholesalePrice: p.wholesalePrice,
      wholesaleMoq: p.wholesaleMoq || 6,
      badge: p.badge || '',
      image: p.image,
      fabric: p.fabric || '100% Cotton',
      sizes: p.sizes ? p.sizes.join(', ') : 'M, L, XL',
      stockNairobi: p.stock?.nairobi ?? 20,
      stockEldoret: p.stock?.eldoret ?? 15,
      description: p.description || '',
    });
    setProductModalOpen(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const parsedSizes = formProduct.sizes.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload = {
      name: formProduct.name,
      category: formProduct.category,
      retailPrice: Number(formProduct.retailPrice),
      wholesalePrice: Number(formProduct.wholesalePrice),
      wholesaleMoq: Number(formProduct.wholesaleMoq),
      badge: formProduct.badge,
      image: formProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      gallery: [formProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
      fabric: formProduct.fabric,
      sizes: parsedSizes.length > 0 ? parsedSizes : ['M', 'L', 'XL'],
      colors: [
        { name: 'Black', hex: '#111111' },
        { name: 'White', hex: '#FFFFFF' }
      ],
      stock: {
        nairobi: Number(formProduct.stockNairobi),
        eldoret: Number(formProduct.stockEldoret),
      },
      description: formProduct.description,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setProductModalOpen(false);
  };

  // Stats
  const totalStockCount = products.reduce((acc, p) => acc + (p.stock?.nairobi || 0) + (p.stock?.eldoret || 0), 0);
  const totalSimulatedRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto text-left">
      <div 
        className="relative w-full max-w-6xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl text-stone-900 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-stone-950">
                TFC Wholesalers <span className="gold-gradient-text">Admin Management Portal</span>
              </h2>
              <p className="text-xs text-stone-500">
                Store Owner Dashboard • Nairobi & Eldoret Operations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenAddModal}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition border border-stone-200 shadow-sm"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-5 sm:px-6 bg-stone-50/60 border-b border-stone-200 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Active Apparel Products</span>
            <span className="text-2xl font-black text-stone-950 mt-1 block">{products.length} Items</span>
            <span className="text-[10px] text-amber-700 font-bold">{totalStockCount} units in stock</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Recorded Customer Orders</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{orders.length} Orders</span>
            <span className="text-[10px] text-emerald-700 font-bold">KES {totalSimulatedRevenue.toLocaleString()} volume</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Reseller Inquiries</span>
            <span className="text-2xl font-black text-stone-950 mt-1 block">{inquiries.length} Inquiries</span>
            <span className="text-[10px] text-blue-600 font-semibold">Across Nairobi, Eldoret, Kisumu</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Active Showrooms</span>
            <span className="text-2xl font-black text-stone-950 mt-1 block">2 Hubs</span>
            <span className="text-[10px] text-emerald-700 font-bold">Nairobi & Eldoret Connected</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-white text-xs font-bold space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'products'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'inquiries'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Wholesale Leads ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`py-3.5 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'branches'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Showroom Branches</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-stone-50/30">
          
          {/* TAB 1: PRODUCT CATALOG */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Manage inventory, KES retail prices, wholesale MOQ, and branch stock levels.
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                  <thead className="bg-stone-100 text-stone-600 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Retail (KES)</th>
                      <th className="p-3">Wholesale (KES)</th>
                      <th className="p-3">MOQ</th>
                      <th className="p-3">NRB Stock</th>
                      <th className="p-3">ELD Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-amber-50/40 transition">
                        <td className="p-3 flex items-center space-x-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block max-w-xs truncate">{p.name}</span>
                            <span className="text-[10px] text-amber-700 font-bold">{p.badge || 'Standard Item'}</span>
                          </div>
                        </td>
                        <td className="p-3 capitalize text-stone-600 font-medium">{p.category.replace('-', ' ')}</td>
                        <td className="p-3 font-bold text-stone-900">KES {p.retailPrice.toLocaleString()}</td>
                        <td className="p-3 font-black text-amber-600">KES {p.wholesalePrice.toLocaleString()}</td>
                        <td className="p-3 text-stone-700">{p.wholesaleMoq} pcs</td>
                        <td className="p-3 text-stone-700">{p.stock?.nairobi ?? 0} pcs</td>
                        <td className="p-3 text-stone-700">{p.stock?.eldoret ?? 0} pcs</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-stone-400 hover:text-amber-600 rounded-lg hover:bg-stone-100 transition"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <span className="text-xs text-neutral-400 block">
                Track customer checkout orders formatted for WhatsApp dispatch and M-Pesa settlements.
              </span>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-stone-900">{order.id}</span>
                          <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-medium">
                            {order.date}
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-bold">
                            {order.branchName}
                          </span>
                        </div>
                        <div className="text-xs text-stone-600 mt-1">
                          👤 <strong className="text-stone-900">{order.customerName}</strong> ({order.phone}) • 📍 {order.deliveryAddress}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-stone-50 border border-stone-300 text-xs rounded-xl px-3 py-1.5 text-stone-900 focus:outline-none focus:border-amber-500 font-bold shadow-sm"
                        >
                          <option>Pending WhatsApp Review</option>
                          <option>Paid via M-Pesa</option>
                          <option>Dispatched via Parcel</option>
                          <option>Delivered & Complete</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-1.5 text-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-stone-700">
                          <span>
                            • {it.name} ({it.variant}) × <strong className="text-stone-900">{it.qty}</strong>
                          </span>
                          <span className="font-bold text-stone-900">KES {it.total.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-200">
                      <span className="text-stone-500">
                        Delivery Method: <strong className="text-stone-800">{order.deliveryMethod}</strong>
                      </span>
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block font-semibold">Order Total:</span>
                        <span className="text-base font-black text-amber-600">
                          KES {order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WHOLESALE LEADS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <span className="text-xs text-stone-500 block">
                Wholesale inquiries submitted by boutique owners and resellers across Kenya.
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">{inq.name}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-black">
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-stone-600">
                      <div>🏢 <strong className="text-stone-800">Shop:</strong> {inq.businessName}</div>
                      <div>📞 <strong className="text-stone-800">Phone:</strong> {inq.phone}</div>
                      <div>📍 <strong className="text-stone-800">Town:</strong> {inq.town}</div>
                      <div>💰 <strong className="text-stone-800">Budget:</strong> {inq.estimatedBudget}</div>
                      <div>📦 <strong className="text-stone-800">Interest:</strong> {inq.categoryInterest}</div>
                      {inq.notes && <div>📝 <strong className="text-stone-800">Notes:</strong> {inq.notes}</div>}
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
                      <span className="text-[10px] text-stone-400">{inq.date}</span>
                      <a
                        href={`https://wa.me/254${inq.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(`Hello ${inq.name}! This is TFC Wholesalers regarding your wholesale inquiry.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-800 font-bold"
                      >
                        Message on WhatsApp →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHOWROOM BRANCHES */}
          {activeTab === 'branches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(BRANCHES).map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-stone-900">{branch.name}</h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                      Operational
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 space-y-1.5">
                    <p><strong className="text-stone-800">Building:</strong> {branch.mall}</p>
                    <p><strong className="text-stone-800">Address:</strong> {branch.address}</p>
                    <p><strong className="text-stone-800">WhatsApp Line:</strong> {branch.phoneDisplay}</p>
                    <p><strong className="text-stone-800">Operating Hours:</strong> {branch.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-stone-900 text-left animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black font-heading text-stone-950 mb-4">
              {editingProductId ? 'Edit Product Item' : 'Add New Apparel Product'}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Acid-Washed Oversized Hoodie"
                  value={formProduct.name}
                  onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formProduct.category}
                    onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 capitalize shadow-sm"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. HOT SELLER, NEW ARRIVAL"
                    value={formProduct.badge}
                    onChange={(e) => setFormProduct({ ...formProduct, badge: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Retail (KES) *</label>
                  <input
                    type="number"
                    required
                    value={formProduct.retailPrice}
                    onChange={(e) => setFormProduct({ ...formProduct, retailPrice: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Wholesale (KES) *</label>
                  <input
                    type="number"
                    required
                    value={formProduct.wholesalePrice}
                    onChange={(e) => setFormProduct({ ...formProduct, wholesalePrice: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">MOQ (Pcs) *</label>
                  <input
                    type="number"
                    required
                    value={formProduct.wholesaleMoq}
                    onChange={(e) => setFormProduct({ ...formProduct, wholesaleMoq: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Nairobi Stock (Pcs)</label>
                  <input
                    type="number"
                    value={formProduct.stockNairobi}
                    onChange={(e) => setFormProduct({ ...formProduct, stockNairobi: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Eldoret Stock (Pcs)</label>
                  <input
                    type="number"
                    value={formProduct.stockEldoret}
                    onChange={(e) => setFormProduct({ ...formProduct, stockEldoret: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formProduct.image}
                  onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Available Sizes (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="M, L, XL, 2XL"
                  value={formProduct.sizes}
                  onChange={(e) => setFormProduct({ ...formProduct, sizes: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Description</label>
                <textarea
                  rows="2"
                  value={formProduct.description}
                  onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 shadow-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 rounded-xl font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                <span>{editingProductId ? 'Update Product' : 'Add to Catalog'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
