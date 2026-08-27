import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Mic,
  Star,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery: searchQueryProp,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const [selectedTrendTier, setSelectedTrendTier] = useState<string>('All');
  const [minSustainability, setMinSustainability] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'graph'>('featured');
  const [isListening, setIsListening] = useState<boolean>(false);

  const activeSearchQuery = searchQueryProp !== undefined ? searchQueryProp : localSearchQuery;
  const handleSearchInput = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    else setLocalSearchQuery(val);
  };

  const categories: string[] = [
    'All',
    'Men',
    'Women',
    'Accessories',
    'Ethnic Fusion',
    'Quiet Luxury',
    'Streetwear',
    'Sneakers',
    'Techwear',
    'Retro Y2K',
    'Minimal',
    'Sustainable'
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedTrendTier !== 'All' && product.trendTier !== selectedTrendTier) return false;
    if (product.sustainabilityScore < minSustainability) return false;
    
    if (activeSearchQuery.trim() !== '') {
      const q = activeSearchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTag = product.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchCategory && !matchDesc && !matchTag) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'graph') return b.graphConnectionsCount - a.graphConnectionsCount;
    return 0;
  });

  const toggleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      handleSearchInput('Silk');
      setIsListening(false);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#1C1C1C]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1C1C]/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#666666] font-medium block mb-1">
            BOUTIQUE CATALOG
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#1C1C1C]">
            Selected Garments <span className="text-[#666666] font-normal">({sortedProducts.length})</span>
          </h2>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search garments, styles..."
              value={activeSearchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="w-64 sm:w-72 pl-9 pr-9 py-2.5 rounded-full bg-[#F8F4EE] border border-[#1C1C1C]/5 text-xs text-[#1C1C1C] placeholder-[#666666] focus:outline-none focus:border-[#1C1C1C]/20 transition font-mono"
            />
            <Search className="w-3.5 h-3.5 text-[#666666] absolute left-3 top-3 stroke-[1.5]" />
            <button
              onClick={() => {
                setIsListening(true);
                setTimeout(() => {
                  handleSearchInput('Jeans');
                  setIsListening(false);
                }, 1200);
              }}
              className={`absolute right-3 top-2.5 p-0.5 text-xs transition ${
                isListening ? 'text-[#1C1C1C] animate-pulse' : 'text-[#666666] hover:text-[#1C1C1C]'
              }`}
              title="Voice Search"
            >
              <Mic className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-[#F8F4EE] border border-[#1C1C1C]/5 text-xs text-[#1C1C1C] focus:outline-none font-mono"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="graph">Network Match Score</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.12em] transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#1C1C1C] text-white font-semibold shadow-xs'
                : 'bg-[#F8F4EE] text-[#666666] hover:text-[#1C1C1C] hover:bg-[#E9E2D8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <div
              key={product.id}
              className="group rounded-[2.5rem] bg-[#F8F4EE] border border-[#1C1C1C]/5 overflow-hidden hover:shadow-threadlab-hover transition-all duration-500 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div 
                className="relative aspect-[4/5] overflow-hidden bg-[#E9E2D8] cursor-pointer" 
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  {product.trendTier === 'Trending Hot' && (
                    <span className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.15em] font-semibold bg-[#1C1C1C] text-white shadow-xs">
                      TRENDING
                    </span>
                  )}
                  {product.isLimitedDrop && (
                    <span className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.15em] font-semibold bg-[#B98A4B] text-white shadow-xs">
                      LIMITED DROP
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product);
                  }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition ${
                    isWishlisted
                      ? 'bg-[#E53935] text-white shadow-xs'
                      : 'bg-white/80 text-[#1C1C1C] border border-[#1C1C1C]/5 hover:text-[#1C1C1C] hover:scale-105'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 stroke-[1.5]" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-full bg-[#F8F4EE]/90 backdrop-blur-md text-[#1C1C1C] text-xs font-mono uppercase tracking-[0.1em] font-semibold shadow-xs flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 stroke-[1.5]" /> Quick View
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-1">
                    <span className="uppercase tracking-wider">{product.brand}</span>
                    <span className="flex items-center text-[#B98A4B] gap-1 font-sans font-medium">
                      <Star className="w-3 h-3 fill-current" /> {product.rating}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-editorial text-lg font-normal text-[#1C1C1C] group-hover:text-[#666666] transition cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2 pt-1 text-xs font-mono text-[#666666]">
                    <span>Eco Score: {product.sustainabilityScore}%</span>
                    <span>•</span>
                    <span>{product.graphConnectionsCount} Style Links</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1C1C1C]/5">
                  <div>
                    <span className="font-editorial text-xl font-light text-[#1C1C1C]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs font-mono text-[#666666] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {product.productLink && (
                      <a
                        href={product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/10 text-[#1C1C1C] hover:bg-[#E9E2D8] transition-all duration-200 shadow-xs"
                        title="Buy on Official Store / Amazon"
                      >
                        <ExternalLink className="w-4 h-4 stroke-[1.5] text-[#B98A4B]" />
                      </a>
                    )}
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-3 rounded-full bg-[#1C1C1C] text-white hover:bg-[#B98A4B] transition-all duration-200 shadow-xs"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
