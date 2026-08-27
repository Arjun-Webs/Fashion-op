import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Heart, 
  RotateCcw, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  User as UserIcon,
  Search,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Order, Product, User } from '../types';

interface CustomerAccountViewProps {
  user: User;
  orders: Order[];
  wishlistProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateStore: () => void;
}

export const CustomerAccountView: React.FC<CustomerAccountViewProps> = ({
  user,
  orders,
  wishlistProducts,
  onSelectProduct,
  onNavigateStore,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments' | 'wishlist'>('orders');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.items.some(i => i.product.name.toLowerCase().includes(orderSearchQuery.toLowerCase()));
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return { color: 'bg-amber-500/10 text-amber-800 border-amber-500/30', icon: Clock, label: 'Order Processing' };
      case 'Dispatched':
        return { color: 'bg-blue-500/10 text-blue-800 border-blue-500/30', icon: Package, label: 'Dispatched & In Transit' };
      case 'Out for Delivery':
        return { color: 'bg-purple-500/10 text-purple-800 border-purple-500/30', icon: Truck, label: 'Out for Delivery Today' };
      case 'Delivered':
        return { color: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30', icon: CheckCircle2, label: 'Delivered' };
      case 'Cancelled':
        return { color: 'bg-rose-500/10 text-rose-800 border-rose-500/30', icon: AlertCircle, label: 'Cancelled' };
      default:
        return { color: 'bg-gray-500/10 text-gray-800 border-gray-500/30', icon: Clock, label: status };
    }
  };

  const getStepProgress = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Dispatched': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-[#1C1C1C]">
      
      {/* Account Profile Header */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#1C1C1C]/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img 
            src={user.avatar} 
            alt="" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#B98A4B] shadow-md" 
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-editorial text-2xl sm:text-3xl font-light text-[#1C1C1C]">
                {user.name}
              </h1>
              <span className="bg-[#B98A4B]/15 text-[#B98A4B] border border-[#B98A4B]/30 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> VASTRA Gold Member
              </span>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-1">{user.email || 'customer@vastra.com'} • {user.username}</p>
            <p className="text-xs font-sans text-gray-600 mt-1">Shipping Default: Mumbai, India (400001)</p>
          </div>
        </div>

        {/* Account Quick Stats */}
        <div className="flex items-center gap-3 font-mono text-xs w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="bg-white px-4 py-3 rounded-2xl border border-[#1C1C1C]/10 text-center min-w-[100px] shadow-xs">
            <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Total Orders</span>
            <span className="font-editorial text-2xl font-semibold text-[#1C1C1C]">{orders.length}</span>
          </div>
          <div className="bg-white px-4 py-3 rounded-2xl border border-[#1C1C1C]/10 text-center min-w-[100px] shadow-xs">
            <span className="text-gray-500 block text-[10px] uppercase tracking-wider">In Transit</span>
            <span className="font-editorial text-2xl font-semibold text-blue-600">
              {orders.filter(o => o.status === 'Dispatched' || o.status === 'Out for Delivery' || o.status === 'Processing').length}
            </span>
          </div>
          <div className="bg-white px-4 py-3 rounded-2xl border border-[#1C1C1C]/10 text-center min-w-[100px] shadow-xs">
            <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Wishlist</span>
            <span className="font-editorial text-2xl font-semibold text-[#B98A4B]">{wishlistProducts.length}</span>
          </div>
        </div>
      </div>

      {/* Navigation Hub Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <button
          onClick={() => setActiveTab('orders')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs flex flex-col justify-between ${
            activeTab === 'orders'
              ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
              : 'bg-white text-[#1C1C1C] border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <Package className={`w-5 h-5 ${activeTab === 'orders' ? 'text-[#B98A4B]' : 'text-gray-600'}`} />
            <span className="text-[10px] uppercase font-bold">{orders.length} Orders</span>
          </div>
          <div className="mt-4">
            <h3 className="font-editorial text-base font-semibold">Your Orders</h3>
            <p className="text-[11px] font-sans text-gray-400 mt-0.5">Track packages, returns & invoices</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs flex flex-col justify-between ${
            activeTab === 'wishlist'
              ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
              : 'bg-white text-[#1C1C1C] border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <Heart className={`w-5 h-5 ${activeTab === 'wishlist' ? 'text-rose-400' : 'text-gray-600'}`} />
            <span className="text-[10px] uppercase font-bold">{wishlistProducts.length} Saved</span>
          </div>
          <div className="mt-4">
            <h3 className="font-editorial text-base font-semibold">Your Wishlist</h3>
            <p className="text-[11px] font-sans text-gray-400 mt-0.5">Saved outfits & price drops</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs flex flex-col justify-between ${
            activeTab === 'addresses'
              ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
              : 'bg-white text-[#1C1C1C] border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <MapPin className={`w-5 h-5 ${activeTab === 'addresses' ? 'text-[#B98A4B]' : 'text-gray-600'}`} />
            <span className="text-[10px] uppercase font-bold">2 Addresses</span>
          </div>
          <div className="mt-4">
            <h3 className="font-editorial text-base font-semibold">Saved Addresses</h3>
            <p className="text-[11px] font-sans text-gray-400 mt-0.5">Manage delivery instructions</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs flex flex-col justify-between ${
            activeTab === 'payments'
              ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
              : 'bg-white text-[#1C1C1C] border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <CreditCard className={`w-5 h-5 ${activeTab === 'payments' ? 'text-[#B98A4B]' : 'text-gray-600'}`} />
            <span className="text-[10px] uppercase font-bold">VASTRA Pay</span>
          </div>
          <div className="mt-4">
            <h3 className="font-editorial text-base font-semibold">Payment Methods</h3>
            <p className="text-[11px] font-sans text-gray-400 mt-0.5">UPI, Cards & Wallet Balance</p>
          </div>
        </button>
      </div>

      {/* TAB 1: YOUR ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#1C1C1C]/10 pb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search all orders by item name, ID or tracking number..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B] font-sans shadow-xs"
              />
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-gray-500 text-[11px] uppercase">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none"
              >
                <option value="all">All Orders ({orders.length})</option>
                <option value="processing">Processing</option>
                <option value="dispatched">Dispatched</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#1C1C1C]/10 space-y-4">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-editorial text-2xl font-light text-[#1C1C1C]">No matching orders found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                You haven't placed any orders matching this criteria yet. Explore our luxury collection to place your first drop order!
              </p>
              <button
                onClick={onNavigateStore}
                className="px-6 py-2.5 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition"
              >
                Browse VASTRA Store
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                const StatusIcon = badge.icon;
                const progressStep = getStepProgress(order.status);

                return (
                  <div 
                    key={order.id}
                    className="bg-white rounded-3xl border border-[#1C1C1C]/10 shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    {/* Order Header */}
                    <div className="bg-[#FAF6F0] px-6 py-4 border-b border-[#1C1C1C]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex flex-wrap items-center gap-6">
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase block">Order Placed</span>
                          <span className="font-semibold text-[#1C1C1C]">{order.createdAt}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase block">Total Amount</span>
                          <span className="font-bold text-[#1C1C1C]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase block">Ship To</span>
                          <span className="font-semibold text-[#1C1C1C]">{order.customerName || user.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500 text-[11px]">ID: <strong className="text-[#1C1C1C]">{order.id}</strong></span>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${badge.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Order Tracking Progress Line */}
                    <div className="px-6 py-5 border-b border-[#1C1C1C]/5 bg-gradient-to-r from-[#FAF6F0]/50 to-white">
                      <div className="max-w-xl mx-auto space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-gray-600">
                          <span className={progressStep >= 1 ? 'text-[#1C1C1C] font-bold' : ''}>1. Placed</span>
                          <span className={progressStep >= 2 ? 'text-blue-700 font-bold' : ''}>2. Dispatched</span>
                          <span className={progressStep >= 3 ? 'text-purple-700 font-bold' : ''}>3. Out for Delivery</span>
                          <span className={progressStep >= 4 ? 'text-emerald-700 font-bold' : ''}>4. Delivered</span>
                        </div>
                        
                        {/* Bar */}
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                          <div className={`h-full transition-all duration-700 ${
                            progressStep === 1 ? 'w-1/4 bg-amber-500' :
                            progressStep === 2 ? 'w-2/4 bg-blue-600' :
                            progressStep === 3 ? 'w-3/4 bg-purple-600' :
                            progressStep === 4 ? 'w-full bg-emerald-600' : 'w-0'
                          }`} />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-1">
                          <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                          <span>Carrier: VASTRA Express Courier</span>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-6 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={item.product.image} 
                              alt="" 
                              className="w-16 h-20 rounded-2xl object-cover bg-[#F5F5F2] border border-[#1C1C1C]/10 cursor-pointer hover:opacity-90 transition"
                              onClick={() => onSelectProduct(item.product)}
                            />
                            <div>
                              <h4 
                                className="font-editorial text-base font-medium text-[#1C1C1C] hover:text-[#B98A4B] cursor-pointer transition"
                                onClick={() => onSelectProduct(item.product)}
                              >
                                {item.product.name}
                              </h4>
                              <p className="text-xs font-mono text-gray-500 mt-0.5">
                                Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                              </p>
                              <p className="text-xs font-semibold text-[#1C1C1C] mt-1 font-mono">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 font-mono text-xs w-full sm:w-auto justify-end">
                            <button
                              onClick={() => onSelectProduct(item.product)}
                              className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#E9E2D8] border border-[#1C1C1C]/10 text-[#1C1C1C] transition font-semibold"
                            >
                              Buy Again
                            </button>
                            <button
                              onClick={() => setTrackingModalOrder(order)}
                              className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#333333] text-white transition font-semibold flex items-center space-x-1"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Live Map</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-light text-[#1C1C1C]">
              Your Saved Outfits & Wishlist ({wishlistProducts.length})
            </h3>
            <button
              onClick={onNavigateStore}
              className="text-xs font-mono text-[#B98A4B] font-semibold hover:underline flex items-center gap-1"
            >
              Explore Catalog <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#1C1C1C]/10 space-y-4">
              <Heart className="w-12 h-12 text-rose-300 mx-auto" />
              <h4 className="font-editorial text-xl text-[#1C1C1C]">Your Wishlist is Empty</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Tap the heart icon on any luxury piece to save it for later or track limited drop discounts!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#1C1C1C]/10 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <img 
                      src={product.image} 
                      alt="" 
                      className="w-full h-56 object-cover cursor-pointer hover:opacity-95 transition"
                      onClick={() => onSelectProduct(product)}
                    />
                    <div className="p-5 space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#B98A4B] font-bold">
                        {product.brand}
                      </div>
                      <h4 
                        className="font-editorial text-lg font-medium text-[#1C1C1C] hover:text-[#B98A4B] cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      >
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold font-mono text-[#1C1C1C]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2.5 rounded-2xl bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>View & Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <h3 className="font-editorial text-2xl font-light text-[#1C1C1C]">Your Delivery Addresses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#B98A4B] shadow-sm relative space-y-3">
              <span className="bg-[#B98A4B] text-white font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full absolute top-4 right-4">
                DEFAULT ADDRESS
              </span>
              <h4 className="font-bold text-sm text-[#1C1C1C] font-mono">{user.name}</h4>
              <p className="text-gray-600 leading-relaxed">
                Flat 402, Royal Palms Residency, Altamount Road,<br />
                Near Cumballa Hill, South Mumbai,<br />
                Maharashtra - 400026, India
              </p>
              <p className="font-mono text-gray-500 text-[11px]">Phone: +91 98201 44820</p>
              <div className="pt-2 flex space-x-3 font-mono text-xs">
                <button className="text-[#B98A4B] font-semibold hover:underline">Edit Address</button>
                <span className="text-gray-300">•</span>
                <button className="text-gray-500 hover:underline">Delivery Instructions</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#1C1C1C]/10 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-[#1C1C1C] font-mono">Work / Studio Address</h4>
              <p className="text-gray-600 leading-relaxed">
                VASTRA Atelier Design Center, Tower 3, Level 14,<br />
                Bandra Kurla Complex (BKC),<br />
                Mumbai, Maharashtra - 400051, India
              </p>
              <p className="font-mono text-gray-500 text-[11px]">Phone: +91 98201 44820</p>
              <div className="pt-2 flex space-x-3 font-mono text-xs">
                <button className="text-[#B98A4B] font-semibold hover:underline">Set as Default</button>
                <span className="text-gray-300">•</span>
                <button className="text-gray-500 hover:underline">Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <h3 className="font-editorial text-2xl font-light text-[#1C1C1C]">Payment Methods & VASTRA Wallet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1C1C1C] to-[#333333] text-white p-6 rounded-3xl shadow-md space-y-6 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-xs tracking-widest font-bold">VASTRA LUXURY PAY</span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-gray-400 uppercase">Available Store Balance</div>
                <div className="font-editorial text-3xl font-light text-white">₹45,000.00</div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
                <span>Cardholder: {user.name}</span>
                <span>Valid Thru: 12/28</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#1C1C1C]/10 shadow-xs space-y-4 font-mono text-xs">
              <h4 className="font-bold text-sm text-[#1C1C1C]">Saved Payment Options</h4>
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#1C1C1C]/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-[#B98A4B]" />
                  <div>
                    <div className="font-semibold text-[#1C1C1C]">HDFC Bank Infinia Visa Metal</div>
                    <div className="text-[10px] text-gray-500">Ending in **** 4892</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Primary</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#1C1C1C]/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-[#1C1C1C]">Instant UPI Payment</div>
                    <div className="text-[10px] text-gray-500">hema@okhdfcbank</div>
                  </div>
                </div>
                <button className="text-[#B98A4B] font-semibold hover:underline">Manage</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Package Tracking Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#1C1C1C]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#1C1C1C]">
                  Live Amazon Tracking Map
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Tracking Number: {trackingModalOrder.trackingNumber}
                </p>
              </div>
              <button 
                onClick={() => setTrackingModalOrder(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Simulated Live Route Map */}
            <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-4 relative overflow-hidden flex flex-col justify-between text-white font-mono text-xs">
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="relative z-10 flex justify-between items-center">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-1 rounded-full text-[10px] font-bold">
                  📍 Vehicle Location: Express Hub BKC
                </span>
                <span className="text-amber-400 font-bold">ETA: 45 Mins</span>
              </div>

              <div className="relative z-10 text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 mx-auto flex items-center justify-center animate-bounce">
                  <Truck className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold">Driver: Ramesh Kumar (+91 98210 11920)</p>
              </div>

              <div className="relative z-10 text-[10px] text-gray-400 flex justify-between border-t border-white/10 pt-2">
                <span>Dispatch: VASTRA Hub Kurla</span>
                <span>Destination: Altamount Rd, Mumbai</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Package scanned out of dispatch hub today 08:30 AM</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Out for delivery with Amazon Express Courier</span>
              </div>
            </div>

            <button
              onClick={() => setTrackingModalOrder(null)}
              className="w-full py-3 rounded-2xl bg-[#1C1C1C] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#333333]"
            >
              Close Live Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
