import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  AlertCircle,
  BadgeCheck
} from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  presetUsers: User[];
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  presetUsers,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'quick-demo' | 'signin' | 'signup'>('quick-demo');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuickDemoSelect = (user: User) => {
    onLoginSuccess(user);
    showToast(`Logged in as ${user.name} (${user.role})`);
    setTimeout(() => onClose(), 600);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !isOtpMode) {
      showToast('Please enter your email or phone number');
      return;
    }
    // Find matching preset user or create temporary authenticated user object
    const existing = presetUsers.find(u => u.role === selectedRole);
    const userToLogin: User = existing ? {
      ...existing,
      email: email || `${selectedRole.toLowerCase()}@vastra.com`,
    } : {
      id: `user-${Date.now()}`,
      name: email.split('@')[0] || 'VASTRA Member',
      username: `@${email.split('@')[0] || 'vastra_member'}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: selectedRole,
      communityId: 'comm-1',
      followersCount: 120,
      followingCount: 45,
      pageRankScore: 0.05,
      betweennessCentrality: 0.04,
      bio: 'Verified VASTRA Luxury Platform Member.',
      isVerified: true,
    };

    onLoginSuccess(userToLogin);
    showToast(`Welcome back, ${userToLogin.name}! Accessing ${selectedRole} Workspace.`);
    setTimeout(() => onClose(), 700);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('Please complete all required fields');
      return;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: fullName,
      username: `@${fullName.toLowerCase().replace(/\s+/g, '_')}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      role: selectedRole,
      communityId: 'comm-1',
      followersCount: 0,
      followingCount: 12,
      pageRankScore: 0.02,
      betweennessCentrality: 0.01,
      bio: `Official ${selectedRole} account on VASTRA Couture.`,
      isVerified: false,
    };
    onLoginSuccess(newUser);
    showToast(`Account created successfully! Logged in as ${newUser.name}.`);
    setTimeout(() => onClose(), 700);
  };

  const handleSendOtp = () => {
    if (!email) {
      showToast('Please enter your registered email/phone first');
      return;
    }
    setOtpSent(true);
    setOtpCode('849201'); // Demo OTP preset
    showToast('Demo OTP Code sent: 849201');
  };

  const roleDescriptions: Record<UserRole, { title: string; desc: string; icon: any; color: string }> = {
    Customer: {
      title: 'Customer Storefront',
      desc: 'Browse luxury drops, personal AI stylist, Amazon-style order tracking & cart.',
      icon: ShoppingBag,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    },
    Admin: {
      title: 'Admin Seller & Network Governance Portal',
      desc: 'Full inventory management, order dispatch center, community moderation & graph analytics.',
      icon: ShieldCheck,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    },
    Influencer: {
      title: 'Creator Studio & Virality Lab',
      desc: 'Post outfits, tag catalog items, analyze virality cascades & earn rewards.',
      icon: Sparkles,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-[110] bg-[#111111] text-white px-5 py-3 rounded-2xl shadow-2xl font-mono text-xs flex items-center space-x-2 border border-amber-500/30">
          <BadgeCheck className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      <div 
        className="bg-[#FAF6F0] rounded-3xl max-w-xl w-full border border-[#1C1C1C]/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Luxury Header */}
        <div className="bg-[#1C1C1C] text-white px-6 py-5 flex items-center justify-between relative border-b border-amber-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#B98A4B]/20 border border-[#B98A4B]/40 flex items-center justify-center text-[#B98A4B]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-editorial text-xl font-light tracking-[0.2em] text-white uppercase">
                VASTRA <span className="text-xs text-[#B98A4B] font-mono lowercase tracking-normal">id</span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                Multi-Role & Authentication Portal
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Authenticated User Status Banner if logged in */}
        {currentUser && (
          <div className="bg-[#F0EBE1] px-6 py-3 border-b border-[#1C1C1C]/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <img src={currentUser.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-[#1C1C1C] font-semibold">Currently signed in as: {currentUser.name} ({currentUser.role})</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              ACTIVE
            </span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-[#1C1C1C]/10 bg-[#FAF6F0] px-6 pt-3 space-x-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('quick-demo')}
            className={`pb-3 px-3 font-semibold transition border-b-2 ${
              activeTab === 'quick-demo'
                ? 'border-[#B98A4B] text-[#1C1C1C]'
                : 'border-transparent text-gray-500 hover:text-[#1C1C1C]'
            }`}
          >
            ⚡ Quick Demo Sign-In
          </button>
          <button
            onClick={() => setActiveTab('signin')}
            className={`pb-3 px-3 font-semibold transition border-b-2 ${
              activeTab === 'signin'
                ? 'border-[#B98A4B] text-[#1C1C1C]'
                : 'border-transparent text-gray-500 hover:text-[#1C1C1C]'
            }`}
          >
            🔑 Sign-In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`pb-3 px-3 font-semibold transition border-b-2 ${
              activeTab === 'signup'
                ? 'border-[#B98A4B] text-[#1C1C1C]'
                : 'border-transparent text-gray-500 hover:text-[#1C1C1C]'
            }`}
          >
            ✨ Create Account
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: QUICK DEMO ACCOUNTS (1-CLICK SIGN IN) */}
          {activeTab === 'quick-demo' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-start space-x-3 text-xs text-amber-900 font-sans">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Amazon Marketplace Role Isolation Mode:</span> Select any pre-configured role profile below to immediately launch into that user role's workspace with specialized features.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {presetUsers.map((user) => {
                  const info = roleDescriptions[user.role];
                  const Icon = info.icon;
                  const isCurrent = currentUser?.id === user.id;

                  return (
                    <button
                      key={user.id}
                      onClick={() => handleQuickDemoSelect(user)}
                      className={`text-left p-4 rounded-2xl border transition-all relative group flex flex-col justify-between ${
                        isCurrent 
                          ? 'bg-white border-[#B98A4B] ring-2 ring-[#B98A4B]/20 shadow-md' 
                          : 'bg-white/70 hover:bg-white border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${info.color}`}>
                            {user.role} Portal
                          </span>
                          <Icon className="w-4 h-4 text-gray-500 group-hover:text-[#1C1C1C]" />
                        </div>

                        <div className="flex items-center space-x-3 my-2">
                          <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#1C1C1C]/10" />
                          <div>
                            <h4 className="font-editorial text-sm font-semibold text-[#1C1C1C] leading-tight">
                              {user.name}
                            </h4>
                            <p className="text-[11px] font-mono text-gray-500">{user.username}</p>
                          </div>
                        </div>

                        <p className="text-[11px] font-sans text-gray-600 leading-snug line-clamp-2 mt-1">
                          {info.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-[#1C1C1C]/5 flex items-center justify-between text-xs font-mono font-semibold text-[#B98A4B] group-hover:text-[#1C1C1C]">
                        <span>Launch Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: AMAZON STANDARD SIGN-IN */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 block mb-2 font-semibold">
                  Select Target Role Workspace
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Customer', 'Admin', 'Influencer'] as UserRole[]).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setSelectedRole(r)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono text-center border transition ${
                        selectedRole === r
                          ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] font-bold shadow-sm'
                          : 'bg-white text-gray-700 border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email / Mobile */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 block mb-1 font-semibold">
                  Email or Mobile Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. customer@vastra.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B] font-sans shadow-xs"
                  />
                </div>
              </div>

              {/* Password or OTP */}
              {!isOtpMode ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 font-semibold">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(true)}
                      className="text-[11px] font-mono text-[#B98A4B] hover:underline"
                    >
                      Use OTP Login instead
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B] font-sans shadow-xs"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 font-semibold">
                      Enter 6-Digit OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(false)}
                      className="text-[11px] font-mono text-[#B98A4B] hover:underline"
                    >
                      Use Password instead
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="e.g. 849201"
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs font-mono text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B]"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 rounded-2xl bg-[#E9E2D8] hover:bg-[#DDD5C8] text-xs font-mono text-[#1C1C1C] font-semibold transition"
                    >
                      {otpSent ? 'Resend OTP' : 'Send Code'}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-gray-600 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#1C1C1C] focus:ring-0" />
                  <span>Keep me signed in</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link dispatched'); }} className="text-[#B98A4B] hover:underline">
                  Need help?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1C1C1C] text-white font-mono uppercase tracking-[0.18em] text-xs font-bold hover:bg-[#333333] transition shadow-md flex items-center justify-center space-x-2"
              >
                <span>Sign-In to {selectedRole} Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: CREATE ACCOUNT / REGISTER */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 block mb-1 font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Hema Patel"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B] font-sans shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 block mb-1 font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. hema@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#1C1C1C]/15 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B98A4B] font-sans shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-gray-600 block mb-2 font-semibold">
                  Register Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Customer', 'Influencer', 'Admin', 'Moderator'] as UserRole[]).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setSelectedRole(r)}
                      className={`p-3 rounded-2xl text-left border transition ${
                        selectedRole === r
                          ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-sm'
                          : 'bg-white text-gray-800 border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold">{r}</div>
                      <div className="text-[10px] text-gray-400 font-sans mt-0.5">
                        {r === 'Customer' && 'Shop & order tracking'}
                        {r === 'Admin' && 'Seller, fulfillment & governance'}
                        {r === 'Influencer' && 'Creator posts & virality'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#B98A4B] text-white font-mono uppercase tracking-[0.18em] text-xs font-bold hover:bg-[#A3773F] transition shadow-md flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Create Your VASTRA Account</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer Note */}
        <div className="bg-[#F0EBE1] px-6 py-3 border-t border-[#1C1C1C]/10 text-center text-[10px] font-mono text-gray-500">
          🔒 Amazon Security SSL Encrypted • Switch Roles Anytime from Header Menu
        </div>
      </div>
    </div>
  );
};
