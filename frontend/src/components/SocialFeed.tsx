import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Plus, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  ShoppingBag,
  Tag,
  Zap,
  Eye,
  X,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Post, SocialStory, User, Product, Community } from '../types';

interface SocialFeedProps {
  posts: Post[];
  stories: SocialStory[];
  currentUser: User;
  onSelectProduct: (product: Product) => void;
  onCreatePost: (newPost: Partial<Post>) => void;
  products: Product[];
  communities: Community[];
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  stories,
  currentUser,
  onSelectProduct,
  onCreatePost,
  products,
  communities,
}) => {
  const [activeFeedTab, setActiveFeedTab] = useState<'for-you' | 'following' | 'trending'>('for-you');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  
  // Selected story for viewing full look
  const [selectedStory, setSelectedStory] = useState<SocialStory | null>(null);

  // Multi-product selection for Publish / Share Look
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([products[0]?.id || '', products[1]?.id || '']);
  const [hashtagsStr, setHashtagsStr] = useState('#EthnicFusion #VASTRAFestive #Handloom');
  const [selectedCommunityId, setSelectedCommunityId] = useState(communities[0]?.id || '');

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleProductSelectInModal = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taggedProds = products.filter(p => selectedProductIds.includes(p.id));
    const tagsArr = hashtagsStr.split(' ').filter(t => t.startsWith('#'));

    onCreatePost({
      caption,
      imageUrl,
      taggedProductIds: selectedProductIds,
      taggedProducts: taggedProds,
      hashtags: tagsArr,
      communityId: selectedCommunityId,
      viralityScore: Math.floor(88 + Math.random() * 11),
    });

    setIsCreateModalOpen(false);
    setCaption('');
  };

  // Filter posts based on active feed tab
  const filteredPosts = posts.filter(post => {
    if (activeFeedTab === 'following') {
      // Show posts from influencers or creators user follows (or top creators)
      return post.author.role === 'Influencer' || post.author.followersCount > 500000;
    }
    if (activeFeedTab === 'trending') {
      // High virality score posts
      return post.viralityScore >= 90;
    }
    return true; // For You shows all
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-[#111111]">
      
      {/* Story Tray & Share Look Trigger */}
      <div className="bg-white p-4 rounded-3xl border border-black/10 shadow-xs">
        <div className="flex items-center space-x-5 overflow-x-auto pb-2 scrollbar-none">
          
          {/* Share Look Creator Trigger Pill */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center space-y-1.5 shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-dashed border-[#B98A4B] flex items-center justify-center group-hover:scale-105 transition shadow-xs">
              <Plus className="w-6 h-6 text-[#B98A4B] stroke-[2]" />
            </div>
            <span className="text-[10px] font-mono text-[#111111] font-bold uppercase tracking-wider">Share Look</span>
          </button>

          {/* Stories with Tagged Garments */}
          {stories.map((story) => {
            const taggedProduct = products.find(p => p.id === story.taggedProductId) || products[0];
            return (
              <div 
                key={story.id} 
                onClick={() => setSelectedStory(story)}
                className="flex flex-col items-center space-y-1.5 shrink-0 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#111111] via-[#B98A4B] to-[#E5C158] group-hover:scale-105 transition shadow-xs">
                  <img
                    src={story.mediaUrl}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#6E6E73] truncate max-w-[70px] font-medium">
                  {story.user.username}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feed Navigation Tabs & Style Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
        <div className="flex items-center space-x-2 bg-[#F5F5F2] p-1.5 rounded-full border border-black/5">
          {[
            { id: 'for-you', label: 'For You', desc: 'Curated Editorial Looks' },
            { id: 'following', label: 'Following Feed', desc: 'Creator Outfits & Breakdown' },
            { id: 'trending', label: 'Trending Styles', desc: 'Viral Cascade Grid' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFeedTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-[0.1em] transition flex items-center space-x-2 ${
                activeFeedTab === tab.id
                  ? 'bg-[#111111] text-white font-semibold shadow-md'
                  : 'text-[#6E6E73] hover:text-[#111111]'
              }`}
            >
              <span>{tab.label}</span>
              {activeFeedTab === tab.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#B98A4B]" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold shadow-md hover:bg-[#2C2C2E] transition"
        >
          <Sparkles className="w-4 h-4 text-[#B98A4B]" />
          <span>Publish & Tag Look</span>
        </button>
      </div>

      {/* TAB 1: FOR YOU (Editorial Single Column Cards with Overlaid Garment Badges) */}
      {activeFeedTab === 'for-you' && (
        <div className="space-y-10 max-w-2xl mx-auto">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id] || post.isLiked;
            const isSaved = savedPosts[post.id] || post.isSaved;
            const currentLikes = (post.likesCount || 0) + (likedPosts[post.id] ? 1 : 0);
            const taggedProds = post.taggedProducts && post.taggedProducts.length > 0
              ? post.taggedProducts
              : products.slice(0, 2);

            return (
              <article key={post.id} className="rounded-3xl bg-white border border-black/10 overflow-hidden shadow-lg space-y-4">
                
                {/* Author Header */}
                <div className="p-5 flex items-center justify-between border-b border-black/5">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover border border-black/10" />
                      {post.author.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-[#111111] bg-white rounded-full absolute -bottom-0.5 -right-0.5 fill-current" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-editorial text-base font-semibold text-[#111111]">{post.author.name}</h4>
                        {post.author.influencerTier && (
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#B98A4B]/15 text-[#B98A4B] font-bold">
                            {post.author.influencerTier}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                        <span>{post.author.username}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-black/10 text-[#111111] text-[11px] font-mono font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#B98A4B]" />
                    <span>VIRALITY SCORE: {post.viralityScore}/100</span>
                  </div>
                </div>

                {/* Main Look Photo */}
                <div className="relative aspect-[4/3] bg-[#F5F5F2] overflow-hidden group">
                  <img src={post.imageUrl} alt="Outfit Look" className="w-full h-full object-cover group-hover:scale-102 transition duration-700" />

                  {/* Overlaid Garment Badges Container */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2.5 pointer-events-auto">
                    {taggedProds.map((prod, idx) => (
                      <div
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 flex items-center space-x-3 cursor-pointer hover:shadow-xl hover:scale-104 transition duration-300 shadow-md"
                      >
                        <img src={prod.image} alt="" className="w-9 h-9 rounded-xl object-cover bg-white border border-black/5" />
                        <div>
                          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">GARMENT #{idx + 1}</div>
                          <div className="font-editorial text-xs font-semibold text-[#111111] line-clamp-1">{prod.name}</div>
                          <div className="text-xs font-mono text-[#B98A4B] font-bold">₹{prod.price.toLocaleString('en-IN')}</div>
                        </div>
                        <ShoppingBag className="w-4 h-4 text-[#111111] shrink-0 ml-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toolbar */}
                <div className="px-6 pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 text-xs font-mono transition ${
                        isLiked ? 'text-rose-600 font-bold scale-105' : 'text-gray-600 hover:text-[#111111]'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{currentLikes.toLocaleString()}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-xs font-mono text-gray-600 hover:text-[#111111] transition">
                      <MessageCircle className="w-5 h-5 stroke-[1.5]" />
                      <span>{post.commentsCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-xs font-mono text-gray-600 hover:text-[#111111] transition">
                      <Share2 className="w-5 h-5 stroke-[1.5]" />
                      <span>{post.sharesCount}</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => toggleSave(post.id)} 
                    className={`transition ${isSaved ? 'text-[#111111]' : 'text-gray-400 hover:text-[#111111]'}`}
                  >
                    <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Caption & Tagged Products Pills */}
                <div className="px-6 pb-6 space-y-3 text-xs">
                  <p className="text-[#2C2C2E] leading-relaxed font-sans">
                    <span className="font-bold text-[#111111] font-mono mr-2">{post.author.username}</span>
                    {post.caption}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {post.hashtags.map((ht) => (
                      <span key={ht} className="text-[#B98A4B] font-mono text-xs font-semibold hover:underline cursor-pointer">
                        {ht}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* TAB 2: FOLLOWING FEED (Creator Outfit Breakdown & Multi-Garment Shopping Carousels) */}
      {activeFeedTab === 'following' && (
        <div className="space-y-12 max-w-3xl mx-auto">
          {filteredPosts.map((post) => {
            const taggedProds = post.taggedProducts && post.taggedProducts.length > 0 
              ? post.taggedProducts 
              : products.slice(0, 3);

            return (
              <article key={post.id} className="rounded-3xl bg-white border border-black/10 p-6 space-y-6 shadow-xl">
                
                {/* Creator Header */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={post.author.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-black/10" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-editorial text-lg font-bold text-[#111111]">{post.author.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-bold">
                          FOLLOWING
                        </span>
                      </div>
                      <p className="text-xs font-mono text-gray-500">{post.author.bio}</p>
                    </div>
                  </div>

                  <button className="px-4 py-1.5 rounded-full bg-[#111111] text-white font-mono text-xs font-semibold uppercase tracking-wider">
                    View Studio
                  </button>
                </div>

                {/* Post Main Media */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#FAF6F0] relative">
                  <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#B98A4B]" />
                    <span>{taggedProds.length} GARMENTS TAGGED IN LOOK</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm font-sans text-gray-800 leading-relaxed">
                  <span className="font-bold text-[#111111] font-mono mr-2">{post.author.username}:</span>
                  {post.caption}
                </p>

                {/* Dedicated Outfit Breakdown Multi-Product Showcase Grid */}
                <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-black/5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111111]">
                    <span className="uppercase tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#B98A4B]" />
                      <span>SHOP THE COMPLETE OUTFIT LOOK</span>
                    </span>
                    <span className="text-gray-500 font-normal">{taggedProds.length} Items</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {taggedProds.map((prod) => (
                      <div 
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className="bg-white p-3 rounded-xl border border-black/10 space-y-2 cursor-pointer hover:shadow-md transition group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-[#F5F5F2] relative">
                          <img src={prod.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#111111] text-white font-mono text-[9px] font-bold rounded uppercase">
                            {prod.category}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-gray-400 uppercase">{prod.brand}</div>
                          <h4 className="font-editorial text-xs font-medium text-[#111111] line-clamp-1">{prod.name}</h4>
                          <div className="font-mono text-xs font-bold text-[#B98A4B] pt-1">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelectProduct(prod); }}
                          className="w-full py-1.5 rounded-lg bg-[#111111] text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:bg-[#B98A4B] transition"
                        >
                          Shop Garment
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* TAB 3: TRENDING STYLES (High-Virality Masonry Grid with Virality Leaderboard) */}
      {activeFeedTab === 'trending' && (
        <div className="space-y-8">
          <div className="bg-[#111111] text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#B98A4B]/20 text-[#B98A4B] flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-light tracking-wide text-white uppercase">
                  VIRAL TREND CASCADES & LOOKBOOK
                </h3>
                <p className="text-xs text-gray-400">High-propagation outfits tagged across the Cytoscape graph network.</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs text-[#B98A4B] font-bold uppercase tracking-wider">
              🔥 Real-time Network Cascades
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => {
              const taggedProds = post.taggedProducts && post.taggedProducts.length > 0 
                ? post.taggedProducts 
                : products.slice(0, 2);

              return (
                <div key={post.id} className="rounded-3xl bg-white border border-black/10 overflow-hidden shadow-lg space-y-4 flex flex-col justify-between">
                  <div>
                    {/* Image with Virality Rank Overlay */}
                    <div className="relative aspect-[4/3] bg-[#FAF6F0] overflow-hidden group">
                      <img src={post.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-104 transition duration-500" />
                      
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#111111] text-[#B98A4B] font-mono text-xs font-bold uppercase tracking-wider shadow-md">
                        #{idx + 1} VIRAL TREND
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#111111] font-mono text-xs font-bold">
                        SCORE: {post.viralityScore}/100
                      </div>

                      {/* Tagged Products Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                        {taggedProds.map((prod) => (
                          <div 
                            key={prod.id}
                            onClick={() => onSelectProduct(prod)}
                            className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 flex items-center space-x-2 cursor-pointer hover:bg-[#111111] hover:text-white transition shadow-sm text-xs font-mono"
                          >
                            <span className="font-bold text-[#B98A4B]">₹{prod.price.toLocaleString('en-IN')}</span>
                            <span className="truncate max-w-[120px] font-sans font-semibold">{prod.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Author & Stats */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                        <span className="font-bold text-[#111111]">{post.author.name} ({post.author.username})</span>
                        <span className="text-emerald-700 font-semibold">{post.sharesCount.toLocaleString()} Shares</span>
                      </div>
                      <p className="text-xs font-sans text-gray-700 line-clamp-2">{post.caption}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#B98A4B]">{post.hashtags.join(' ')}</span>
                    <button 
                      onClick={() => onSelectProduct(taggedProds[0])}
                      className="px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-[#B98A4B] transition uppercase tracking-wider"
                    >
                      Shop Look ({taggedProds.length} items)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STORY LOOK VIEW MODAL (Filled with products) */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-black/10 pb-3">
              <img src={selectedStory.user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <h4 className="font-editorial text-base font-bold text-[#111111]">{selectedStory.user.name}</h4>
                <p className="text-xs font-mono text-gray-500">{selectedStory.title}</p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6F0] relative">
              <img src={selectedStory.mediaUrl} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Tagged Products in Story */}
            <div className="bg-[#FAF6F0] p-4 rounded-2xl space-y-2 font-mono">
              <div className="text-xs font-bold text-gray-500 uppercase">FEATURED GARMENTS IN STORY LOOK</div>
              {products.slice(0, 3).map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => { setSelectedStory(null); onSelectProduct(prod); }}
                  className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center justify-between cursor-pointer hover:border-[#B98A4B] transition"
                >
                  <div className="flex items-center space-x-3">
                    <img src={prod.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <div className="font-editorial text-xs font-semibold text-[#111111]">{prod.name}</div>
                      <div className="text-xs text-[#B98A4B] font-bold">₹{prod.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] uppercase font-bold">
                    View
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* SHARE / PUBLISH LOOK CREATOR MODAL (Filled with Multi-Product Tagging) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white border border-black/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#B98A4B] uppercase tracking-widest font-bold">CREATOR LOOKBOOK STUDIO</span>
                <h3 className="font-editorial text-2xl font-semibold flex items-center gap-2 text-[#111111]">
                  <Sparkles className="w-5 h-5 text-[#B98A4B]" /> Publish Outfit Look & Tag Garments
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#111111]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-6 text-xs font-mono">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1 uppercase tracking-wider font-semibold">Image URL</label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none focus:border-[#B98A4B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 mb-1 uppercase tracking-wider font-semibold">Target Community Niche</label>
                  <select
                    value={selectedCommunityId}
                    onChange={(e) => setSelectedCommunityId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none"
                  >
                    {communities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 mb-1 uppercase tracking-wider font-semibold">Look Caption & Styling Notes</label>
                <textarea
                  rows={2}
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe your outfit silhouette, fabric draping, and styling advice..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none focus:border-[#B98A4B] font-sans text-xs"
                />
              </div>

              {/* Multi-Product Garment Picker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-gray-600 font-semibold uppercase">
                  <span>Tag Catalog Garments ({selectedProductIds.length} Selected)</span>
                  <span className="text-[#B98A4B]">Multi-Product Tagging Active</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-[#FAF6F0] rounded-2xl border border-black/10">
                  {products.map((prod) => {
                    const isSelected = selectedProductIds.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => toggleProductSelectInModal(prod.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          isSelected 
                            ? 'bg-[#111111] text-white border-[#111111] shadow-xs' 
                            : 'bg-white text-gray-800 border-black/10 hover:border-[#B98A4B]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img src={prod.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <div className="leading-tight">
                            <div className="font-editorial text-xs font-semibold line-clamp-1">{prod.name}</div>
                            <div className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#B98A4B]' : 'text-gray-500'}`}>
                              ₹{prod.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected ? 'bg-[#B98A4B] text-white border-[#B98A4B]' : 'border-gray-400'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-gray-500 mb-1 uppercase tracking-wider font-semibold">Hashtags</label>
                <input
                  type="text"
                  value={hashtagsStr}
                  onChange={(e) => setHashtagsStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#2C2C2E] transition shadow-lg flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#B98A4B]" />
                <span>Publish Look with Tagged Garments</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
