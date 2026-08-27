import React, { useState } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_POSTS, 
  INITIAL_STORIES, 
  INITIAL_USERS, 
  INITIAL_COMMUNITIES, 
  INITIAL_GRAPH_DATA, 
  INITIAL_TREND_CASCADES 
} from './data/mockData';
import { Product, Post, User, CartItem, UserRole, GraphNode, Order } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SocialFeed } from './components/SocialFeed';
import { TrendPropagationView } from './components/TrendPropagationView';
import { CommunityDetectionView } from './components/CommunityDetectionView';
import { GraphAnalyticsView } from './components/GraphAnalyticsView';
import { AIRecommenderView } from './components/AIRecommenderView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CustomerAccountView } from './components/CustomerAccountView';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

// Preset Amazon Role Profiles
const PRESET_USERS: User[] = [
  {
    id: 'user-customer',
    name: 'Priyanshu Patel',
    username: '@priyanshu_buyer',
    email: 'customer@vastra.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'Customer',
    communityId: 'comm-1',
    followersCount: 140,
    followingCount: 65,
    pageRankScore: 0.05,
    betweennessCentrality: 0.04,
    bio: 'Luxury haute couture collector & verified VASTRA Gold buyer.',
    isVerified: true,
  },
  {
    id: 'user-admin',
    name: 'Alex Vance & Governance Team',
    username: '@alex_admin',
    email: 'admin@vastra.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'Admin',
    communityId: 'comm-[#1C1C1C]',
    followersCount: 12400,
    followingCount: 120,
    pageRankScore: 0.15,
    betweennessCentrality: 0.22,
    bio: 'Head Store Operations, Ecosystem Network Administrator & Content Guardian.',
    isVerified: true,
  },
  {
    id: 'user-influencer',
    name: 'Ananya Sharma',
    username: '@ananya_vogue',
    email: 'influencer@vastra.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    role: 'Influencer',
    influencerTier: 'Celebrity',
    communityId: 'comm-2',
    followersCount: 2450000,
    followingCount: 380,
    pageRankScore: 0.098,
    betweennessCentrality: 0.154,
    bio: 'High fashion editorial curator & creative director. Mumbai / Paris.',
    isVerified: true,
  }
];

// Initial Platform Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-84920',
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1, selectedSize: 'M', selectedColor: 'Royal Gold' }
    ],
    totalAmount: 24999,
    status: 'Out for Delivery',
    createdAt: 'Today, 08:30 AM',
    trackingNumber: 'AMZ-VSTR-948201',
    customerName: 'Priyanshu Patel',
    customerEmail: 'customer@vastra.com',
    shippingAddress: 'Altamount Road, South Mumbai 400026',
    paymentMethod: 'VASTRA Pay Gold'
  },
  {
    id: 'ORD-73918',
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 1, selectedSize: '32', selectedColor: 'Dark Wash Indigo' }
    ],
    totalAmount: 2599,
    status: 'Dispatched',
    createdAt: 'Yesterday, 04:15 PM',
    trackingNumber: 'AMZ-VSTR-739182',
    customerName: 'Priyanshu Patel',
    customerEmail: 'customer@vastra.com',
    shippingAddress: 'BKC Atelier Tower, Mumbai 400051',
    paymentMethod: 'HDFC Infinia Visa'
  },
  {
    id: 'ORD-51920',
    items: [
      { product: INITIAL_PRODUCTS[2] || INITIAL_PRODUCTS[0], quantity: 2, selectedSize: 'L', selectedColor: 'Charcoal' }
    ],
    totalAmount: 7998,
    status: 'Delivered',
    createdAt: '3 days ago',
    trackingNumber: 'AMZ-VSTR-519203',
    customerName: 'Priyanshu Patel',
    customerEmail: 'customer@vastra.com',
    shippingAddress: 'Altamount Road, South Mumbai 400026',
    paymentMethod: 'UPI Express'
  }
];

export function App() {
  const [currentUser, setCurrentUser] = useState<User>(PRESET_USERS[0]);
  const [userRole, setUserRole] = useState<UserRole>('Customer');
  const [activeTab, setActiveTab] = useState<string>('store');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories] = useState(INITIAL_STORIES);
  const [users] = useState<User[]>(INITIAL_USERS);
  const [communities] = useState(INITIAL_COMMUNITIES);
  const [graphData, setGraphData] = useState(INITIAL_GRAPH_DATA);
  const [cascades] = useState(INITIAL_TREND_CASCADES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-2']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Selected Product for Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Auth & Role Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setIsAuthModalOpen(false);

    // Auto navigate to default role view
    if (user.role === 'Admin') setActiveTab('admin');
    else if (user.role === 'Influencer') setActiveTab('social');
    else setActiveTab('store');
  };

  const handleRoleChangeDirect = (role: UserRole) => {
    setUserRole(role);
    const matchingPreset = PRESET_USERS.find(u => u.role === role);
    if (matchingPreset) {
      setCurrentUser(matchingPreset);
    }
    if (role === 'Admin') setActiveTab('admin');
    else if (role === 'Influencer') setActiveTab('social');
    else setActiveTab('store');
  };

  // Order Handlers
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleCreateOrderFromCheckout = () => {
    if (cartItems.length === 0) return;
    const totalAmount = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cartItems],
      totalAmount,
      status: 'Processing',
      createdAt: 'Just now',
      trackingNumber: `VSTR-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: currentUser.name,
      customerEmail: currentUser.email || 'customer@vastra.com',
      shippingAddress: 'Altamount Road, South Mumbai 400026',
      paymentMethod: 'VASTRA Pay Gold'
    };

    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setActiveTab('account'); // Open "Your Orders" view!
  };

  // Cart & Wishlist Handlers
  const handleAddToCart = (product: Product, size = 'M', color = 'Black') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCartItems(prev =>
        prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  const handleCreatePost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      author: currentUser,
      imageUrl: newPostData.imageUrl || '',
      caption: newPostData.caption || '',
      taggedProductIds: newPostData.taggedProductIds || [],
      taggedProducts: newPostData.taggedProducts || [],
      hashtags: newPostData.hashtags || [],
      communityId: newPostData.communityId || 'comm-1',
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      viralityScore: newPostData.viralityScore || 80,
      createdAt: 'Just now',
    };
    setPosts([newPost, ...posts]);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts([newProd, ...products]);
    const newGraphNode: GraphNode = {
      id: newProd.id,
      label: newProd.name,
      type: 'Product',
      communityId: newProd.communityId,
      image: newProd.image,
      pageRank: 0.08,
      degree: 4,
    };
    setGraphData(prev => ({
      ...prev,
      nodes: [...prev.nodes, newGraphNode]
    }));
  };

  const handleInjectNode = (newNode: GraphNode) => {
    setGraphData(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C1C1C] flex flex-col justify-between transition-colors duration-500">
      
      {/* Top Navigation Bar with Account Menu & Role Router */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        userRole={userRole}
        setUserRole={handleRoleChangeDirect}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1 bg-[#FAF6F0]">
        
        {/* STORE CATALOG */}
        {activeTab === 'store' && (
          <>
            <HeroSection
              onExploreClick={() => {
                const el = document.getElementById('boutique-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onGraphClick={() => setActiveTab('graph')}
              onTrendClick={() => setActiveTab('trends')}
            />
            <div id="boutique-catalog">
              <ProductCatalog
                products={products}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </>
        )}

        {/* CUSTOMER ORDERS & ACCOUNT HUB (AMAZON STYLE) */}
        {activeTab === 'account' && (
          <CustomerAccountView
            user={currentUser}
            orders={orders}
            wishlistProducts={wishlistProducts}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onNavigateStore={() => setActiveTab('store')}
          />
        )}

        {/* SOCIAL FEED / CREATOR STUDIO */}
        {activeTab === 'social' && (
          <SocialFeed
            posts={posts}
            stories={stories}
            currentUser={currentUser}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onCreatePost={handleCreatePost}
            products={products}
            communities={communities}
          />
        )}

        {/* TREND PROPAGATION & VIRALITY */}
        {activeTab === 'trends' && (
          <TrendPropagationView cascades={cascades} />
        )}

        {/* COMMUNITY CLUSTERS & DETECTION */}
        {activeTab === 'communities' && (
          <CommunityDetectionView
            communities={communities}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {/* CYTOSCAPE NETWORK MAP */}
        {activeTab === 'graph' && (
          <GraphAnalyticsView graphData={graphData} />
        )}

        {/* AI STYLIST & VIRALITY RECOMMENDATIONS */}
        {activeTab === 'ai' && (
          <AIRecommenderView
            products={products}
            posts={posts}
            users={users}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {/* ECOSYSTEM INSIGHTS & ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard users={users} />
        )}

        {/* ADMIN SELLER & FULFILLMENT CENTER */}
        {activeTab === 'admin' && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onInjectNode={handleInjectNode}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        presetUsers={PRESET_USERS}
        currentUser={currentUser}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleCreateOrderFromCheckout}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
