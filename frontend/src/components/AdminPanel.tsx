import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Download, 
  Network,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product, GraphNode, Order } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onInjectNode: (node: GraphNode) => void;
  orders?: Order[];
  onUpdateOrderStatus?: (orderId: string, status: Order['status']) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onInjectNode,
  orders = [],
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'fulfillment' | 'products' | 'graph-injection'>('fulfillment');

  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('VASTRA Luxe');
  const [productPrice, setProductPrice] = useState(2499);
  const [productCategory, setProductCategory] = useState<any>('Ethnic Fusion');
  const [productImg, setProductImg] = useState('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80');

  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeType, setNodeType] = useState<any>('Product');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: productName,
      brand: productBrand,
      price: Number(productPrice),
      category: productCategory,
      communityId: 'comm-7',
      image: productImg,
      secondaryImages: [],
      description: 'Luxury handcrafted garment engineered for VASTRA fashion platform.',
      tags: ['#NewDrop', `#${productCategory}`],
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      sustainabilityScore: 92,
      trendTier: 'Trending Hot',
      graphConnectionsCount: 15,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Royal Gold']
    };
    onAddProduct(newProd);
    setProductName('');
    alert('New Product added to Store & Network Map!');
  };

  const handleNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNode: GraphNode = {
      id: `node-${Date.now()}`,
      label: nodeLabel,
      type: nodeType,
      pageRank: 0.08,
      degree: 5
    };
    onInjectNode(newNode);
    setNodeLabel('');
    alert('New Node injected into Cytoscape Network Map!');
  };

  const exportGraphData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ products, count: products.length, orders }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "vastra_seller_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.customerName && o.customerName.toLowerCase().includes(orderSearch.toLowerCase()));
    
    if (orderFilter === 'all') return matchesSearch;
    return matchesSearch && o.status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#111111]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E73] font-medium">
              AMAZON SELLER & ADMIN CONTROL CENTER
            </span>
            <span className="bg-blue-500/10 text-blue-700 border border-blue-500/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              ADMIN MODE
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Store Fulfillment & Network Governance
          </h2>
        </div>

        <button
          onClick={exportGraphData}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#2C2C2E] transition shadow-sm"
        >
          <Download className="w-4 h-4 stroke-[1.5]" />
          <span>Export Store & Orders Data</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-black/5 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('fulfillment')}
          className={`px-4 py-2 rounded-full uppercase tracking-wider transition flex items-center space-x-1.5 ${
            activeTab === 'fulfillment' ? 'bg-[#111111] text-white font-semibold shadow-xs' : 'text-[#6E6E73] hover:text-[#111111]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order Fulfillment Center ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-full uppercase tracking-wider transition flex items-center space-x-1.5 ${
            activeTab === 'products' ? 'bg-[#111111] text-white font-semibold shadow-xs' : 'text-[#6E6E73] hover:text-[#111111]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Manage Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('graph-injection')}
          className={`px-4 py-2 rounded-full uppercase tracking-wider transition flex items-center space-x-1.5 ${
            activeTab === 'graph-injection' ? 'bg-[#111111] text-white font-semibold shadow-xs' : 'text-[#6E6E73] hover:text-[#111111]'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Inject Network Nodes</span>
        </button>
      </div>

      {/* TAB 1: ORDER FULFILLMENT CENTER */}
      {activeTab === 'fulfillment' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-black/5 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by customer, order ID or tracking #..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#F5F5F2] border border-black/5 text-xs text-[#111111] focus:outline-none focus:border-black font-sans"
              />
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-gray-500 uppercase text-[10px]">Filter Status:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F5F5F2] border border-black/5 text-xs focus:outline-none"
              >
                <option value="all">All ({orders.length})</option>
                <option value="processing">Processing</option>
                <option value="dispatched">Dispatched</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-black/5 space-y-3">
              <Package className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="font-editorial text-xl font-light">No platform orders found</h3>
              <p className="text-xs text-gray-500 font-mono">
                Place a test order from the Customer Shop to see dispatch workflow in action!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl p-6 border border-black/5 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-4 font-mono text-xs">
                    <div>
                      <span className="text-[#6E6E73] text-[10px] uppercase block">Order & Customer</span>
                      <span className="font-bold text-[#111111] text-sm">{order.id}</span>
                      <span className="text-gray-500 ml-2 font-sans">({order.customerName || 'Priyanshu Patel'})</span>
                    </div>

                    <div>
                      <span className="text-[#6E6E73] text-[10px] uppercase block">Date & Total</span>
                      <span className="font-bold text-[#111111]">{order.createdAt} • ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <span className="text-[#6E6E73] text-[10px] uppercase block">Tracking #</span>
                      <span className="font-bold text-[#B98A4B]">{order.trackingNumber}</span>
                    </div>

                    <div>
                      <span className="text-[#6E6E73] text-[10px] uppercase block mb-1">Current Status</span>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                        order.status === 'Processing' ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20' :
                        order.status === 'Dispatched' ? 'bg-blue-500/10 text-blue-800 border border-blue-500/20' :
                        order.status === 'Out for Delivery' ? 'bg-purple-500/10 text-purple-800 border border-purple-500/20' :
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5">
                        <img src={i.product.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                        <div className="font-mono text-xs">
                          <div className="font-editorial text-sm font-medium text-[#111111]">{i.product.name}</div>
                          <div className="text-[10px] text-gray-500">
                            Size: {i.selectedSize} • Qty: {i.quantity} • ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dispatch Action Control Buttons */}
                  <div className="pt-2 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <span className="text-gray-500 text-[11px]">
                      📍 Shipping to: {order.shippingAddress || 'Mumbai, Maharashtra (400001)'}
                    </span>

                    {onUpdateOrderStatus && (
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Advance Pipeline:</span>
                        
                        {order.status === 'Processing' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'Dispatched')}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center space-x-1"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>Mark Dispatched</span>
                          </button>
                        )}

                        {order.status === 'Dispatched' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'Out for Delivery')}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition flex items-center space-x-1"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Mark Out for Delivery</span>
                          </button>
                        )}

                        {order.status === 'Out for Delivery' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'Delivered')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center space-x-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Delivered</span>
                          </button>
                        )}

                        {order.status === 'Delivered' && (
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Fulfillment Complete
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STORE CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-black/5 space-y-4 shadow-velaro">
            <h3 className="font-editorial text-xl font-light text-[#111111] flex items-center gap-2">
              <Plus className="w-5 h-5 stroke-[1.5]" /> Add Product to Store
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Product Title</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Raw Silk Heritage Jacket"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#111111] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Brand Name</label>
                <input
                  type="text"
                  required
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#111111] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#111111] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#2C2C2E] focus:outline-none focus:border-black"
                >
                  {['Ethnic Fusion', 'Quiet Luxury', 'Sneakers', 'Streetwear', 'Techwear', 'Retro Y2K', 'Minimal', 'Sustainable'].map(c => (
                    <option key={c} value={c} className="bg-white">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  required
                  value={productImg}
                  onChange={(e) => setProductImg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#111111] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#111111] text-white font-mono uppercase tracking-[0.15em] font-semibold hover:bg-[#2C2C2E] transition shadow-md"
              >
                Publish Store Item
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-black/5 space-y-4 shadow-velaro">
            <h3 className="font-editorial text-xl font-light text-[#111111]">
              Inventory Items ({products.length})
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F5F2] border border-black/5">
                  <div className="flex items-center space-x-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-xl object-cover bg-white" />
                    <div>
                      <div className="font-editorial text-sm font-medium text-[#111111]">{p.name}</div>
                      <div className="text-[10px] font-mono text-[#6E6E73]">{p.brand} • ₹{p.price.toLocaleString('en-IN')} • {p.category}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GRAPH INJECTION */}
      {activeTab === 'graph-injection' && (
        <div className="p-6 rounded-3xl bg-white border border-black/5 space-y-4 shadow-velaro max-w-xl mx-auto">
          <h3 className="font-editorial text-xl font-light text-[#111111] flex items-center gap-2">
            <Network className="w-5 h-5 stroke-[1.5]" /> Inject Custom Network Node
          </h3>

          <form onSubmit={handleNodeSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Node Title / Label</label>
              <input
                type="text"
                required
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                placeholder="e.g. #EthnicFusion or Mumbai Seed Node"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#111111] focus:outline-none focus:border-black font-sans"
              />
            </div>

            <div>
              <label className="text-[#6E6E73] block mb-1 uppercase tracking-wider">Node Type</label>
              <select
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F2] border border-black/5 text-[#2C2C2E] focus:outline-none focus:border-black"
              >
                {['User', 'Product', 'Hashtag', 'Community', 'Brand'].map(t => (
                  <option key={t} value={t} className="bg-white">{t}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#111111] text-white font-mono uppercase tracking-[0.15em] font-semibold hover:bg-[#2C2C2E] transition shadow-md"
            >
              Inject Node into Canvas
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
