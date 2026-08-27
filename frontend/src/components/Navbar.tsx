import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User as UserIcon,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Lock,
  Package,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Sparkle
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  userRole,
  setUserRole,
  currentUser,
  onOpenAuthModal,
  searchQuery,
  onSearchChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered navigation tabs based on User Role
  const roleNavItems: Record<UserRole, { id: string; label: string; icon?: any }[]> = {
    Customer: [
      { id: 'store', label: 'Shop Catalog' },
      { id: 'account', label: 'Your Orders & Account' },
      { id: 'ai', label: 'AI Stylist' },
      { id: 'social', label: 'Social Feed' },
    ],
    Admin: [
      { id: 'admin', label: 'Fulfillment & Admin' },
      { id: 'analytics', label: 'Platform Analytics' },
      { id: 'graph', label: 'Network Graph & Governance' },
      { id: 'communities', label: 'Community Clusters' },
      { id: 'store', label: 'Store Preview' },
    ],
    Influencer: [
      { id: 'social', label: 'Creator Studio' },
      { id: 'trends', label: 'Trend Analytics' },
      { id: 'ai', label: 'Virality Predictor' },
      { id: 'store', label: 'Shop & Tag' },
    ]
  };

  const navItems = roleNavItems[userRole] || roleNavItems.Customer;

  const roleBadges: Record<UserRole, { label: string; icon: any; color: string }> = {
    Customer: { label: 'Customer Mode', icon: ShoppingBag, color: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30 hover:bg-emerald-500/20' },
    Admin: { label: 'Admin & Governance', icon: ShieldCheck, color: 'bg-blue-500/10 text-blue-800 border-blue-500/30 hover:bg-blue-500/20' },
    Influencer: { label: 'Creator Hub', icon: Sparkles, color: 'bg-amber-500/10 text-amber-800 border-amber-500/30 hover:bg-amber-500/20' },
  };

  const handleHeaderSearchInput = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0 && activeTab !== 'store') {
      setActiveTab('store');
    }
  };

  const RoleIcon = roleBadges[userRole].icon;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#F0EBE1]/95 backdrop-blur-md border-b border-[#1C1C1C]/10 shadow-md py-2.5' 
        : 'bg-[#F0EBE1]/90 backdrop-blur-sm border-b border-[#1C1C1C]/10 py-3.5'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
        
        {/* TIER 1: BRAND LOGO, SEARCH BAR & USER/ROLE CONTROLS */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Deliver Location */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="cursor-pointer flex items-center space-x-2 group" onClick={() => setActiveTab('store')}>
              <span className="font-editorial text-2xl sm:text-3xl font-light tracking-[0.25em] text-[#1C1C1C] uppercase group-hover:text-[#B98A4B] transition-colors">
                VASTRA
              </span>
              <span className="bg-[#1C1C1C] text-white text-[9px] font-mono px-2 py-0.5 rounded-md tracking-wider uppercase font-bold hidden sm:inline-block shadow-xs">
                LUXURY
              </span>
            </div>

            <div className="hidden lg:block h-5 w-[1px] bg-[#1C1C1C]/15" />

            {/* Deliver-To Location Pill */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/10 text-xs font-mono text-gray-700 hover:border-[#B98A4B] transition cursor-pointer shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#B98A4B] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="text-gray-400 block text-[9px] uppercase font-medium">Deliver to {currentUser?.name.split(' ')[0] || 'Guest'}</span>
                <span className="font-semibold text-[#1C1C1C]">Mumbai 400001</span>
              </div>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-lg hidden sm:flex items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-500 pointer-events-none stroke-[1.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleHeaderSearchInput(e.target.value)}
                placeholder="Search silk, jacket, cashmere, sneakers..."
                className="w-full pl-10 pr-8 py-2 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] placeholder-gray-500 focus:outline-none focus:border-[#B98A4B] font-mono shadow-xs transition-all focus:bg-white focus:ring-2 focus:ring-[#B98A4B]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-[#1C1C1C] text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Role Switcher & Account Dropdown */}
          <div className="flex items-center space-x-3 text-[#1C1C1C] shrink-0">
            
            {/* Distinct Role Badge Switcher */}
            <button
              onClick={onOpenAuthModal}
              className={`hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono border transition shadow-2xs ${roleBadges[userRole].color}`}
              title="Click to switch workspace role"
            >
              <RoleIcon className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="font-bold text-[11px]">{roleBadges[userRole].label}</span>
            </button>

            <div className="h-5 w-[1px] bg-[#1C1C1C]/15 hidden md:block" />

            {/* Account & Orders Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] hover:bg-white hover:border-[#B98A4B] transition font-mono shadow-2xs"
              >
                {currentUser ? (
                  <img src={currentUser.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-black/10" />
                ) : (
                  <UserIcon className="w-4 h-4 text-gray-700" />
                )}
                <div className="text-left hidden lg:block leading-tight">
                  <span className="text-[9px] text-gray-500 block uppercase font-medium">
                    Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Sign in'}
                  </span>
                  <span className="font-bold text-[11px] flex items-center">
                    Account & Orders <ChevronDown className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FAF6F0] border border-[#1C1C1C]/15 rounded-2xl shadow-2xl p-2 z-50 font-mono text-xs animate-fadeIn">
                  <div className="p-3 bg-white rounded-xl border border-[#1C1C1C]/5 mb-2">
                    <div className="flex items-center space-x-3">
                      <img src={currentUser?.avatar} alt="" className="w-9 h-9 rounded-full object-cover border" />
                      <div>
                        <div className="font-editorial text-sm font-semibold text-[#1C1C1C]">
                          {currentUser?.name || 'Guest Member'}
                        </div>
                        <div className="text-[10px] text-gray-500">{currentUser?.email || 'customer@vastra.com'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('account');
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#E9E2D8] flex items-center space-x-2 transition"
                    >
                      <Package className="w-4 h-4 text-[#B98A4B]" />
                      <span>Your Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('account');
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#E9E2D8] flex items-center space-x-2 transition"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Your Wishlist ({wishlistCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAuthModal();
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-[#1C1C1C] text-white flex items-center justify-between font-bold transition shadow-xs mt-2"
                    >
                      <span className="flex items-center space-x-2">
                        <Lock className="w-3.5 h-3.5 text-[#B98A4B]" />
                        <span>Switch Role Workspace</span>
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{userRole}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => setActiveTab('account')}
              className="relative p-2 rounded-full hover:bg-black/5 text-[#1C1C1C] transition hidden sm:block"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E53935] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-black/5 text-[#1C1C1C] transition"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#1C1C1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#1C1C1C]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* TIER 2: CENTERED FLOATING NAVIGATION SUB-BAR */}
        <div className="hidden md:flex items-center justify-center border-t border-[#1C1C1C]/10 pt-2.5">
          <nav className="flex items-center space-x-8 bg-[#FAF6F0]/90 backdrop-blur-md px-8 py-2 rounded-full border border-[#1C1C1C]/10 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs font-mono uppercase tracking-[0.18em] transition-all duration-300 relative py-1 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-[#1C1C1C] font-bold'
                      : 'text-[#666666] hover:text-[#1C1C1C]'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B98A4B] shrink-0" />}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B98A4B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#1C1C1C]/10 px-6 pt-4 pb-8 space-y-4 font-mono mt-2">
          
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleHeaderSearchInput(e.target.value)}
              placeholder="Search silk, jacket, cashmere..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C]"
            />
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#1C1C1C]/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={currentUser?.avatar} alt="" className="w-9 h-9 rounded-full object-cover border" />
              <div>
                <div className="text-xs font-bold text-[#1C1C1C]">{currentUser?.name}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{userRole} Active</div>
              </div>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuthModal(); }}
              className="px-3.5 py-1.5 rounded-full bg-[#1C1C1C] text-white text-[10px] uppercase font-bold"
            >
              Switch Role
            </button>
          </div>

          <div className="space-y-1 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs uppercase tracking-[0.18em] transition ${
                    isActive
                      ? 'bg-[#1C1C1C] text-white font-extrabold'
                      : 'text-[#666666] hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
