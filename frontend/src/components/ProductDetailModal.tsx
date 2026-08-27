import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  RotateCw, 
  Network,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Black');
  const [is3DView, setIs3DView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'graph'>('details');

  const allImages = [product.image, ...product.secondaryImages];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F8F4EE] border border-[#1C1C1C]/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-8 text-[#1C1C1C]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#E9E2D8] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative p-6 bg-[#E9E2D8] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1C1C1C]/5">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#1C1C1C]/5">
              <img
                src={selectedImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  is3DView ? 'animate-pulse scale-105 filter brightness-105' : ''
                }`}
              />

              {is3DView && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 border border-[#1C1C1C]/10 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-[#B98A4B]" />
                  <span>360° VIEW</span>
                </div>
              )}

              <button
                onClick={() => setIs3DView(!is3DView)}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 border border-[#1C1C1C]/10 text-[#1C1C1C] text-xs font-mono flex items-center gap-2 backdrop-blur-md hover:bg-[#1C1C1C] hover:text-white transition shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{is3DView ? 'Exit 360' : '360° View'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 pt-4 overflow-x-auto">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setIs3DView(false);
                  }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition ${
                    selectedImage === img && !is3DView
                      ? 'border-[#B98A4B] scale-105'
                      : 'border-[#1C1C1C]/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#666666] uppercase tracking-wider">
                <span>{product.brand}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E9E2D8] text-[#1C1C1C] font-semibold">
                  {product.category}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1C1C1C] pt-2">
                {product.name}
              </h2>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-baseline space-x-2">
                  <span className="font-editorial text-2xl font-light text-[#1C1C1C]">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-[#666666] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <div className="flex items-center text-[#B98A4B] text-xs font-medium gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <div className="flex border-b border-[#1C1C1C]/5 mt-6 space-x-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 text-xs font-mono font-semibold uppercase tracking-wider transition border-b-2 ${
                    activeTab === 'details' ? 'border-[#B98A4B] text-[#1C1C1C]' : 'border-transparent text-[#666666]'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('graph')}
                  className={`pb-2 text-xs font-mono font-semibold uppercase tracking-wider transition border-b-2 ${
                    activeTab === 'graph' ? 'border-[#B98A4B] text-[#1C1C1C]' : 'border-transparent text-[#666666]'
                  }`}
                >
                  Style Network ({product.graphConnectionsCount})
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-4 pt-4 text-xs text-[#666666] leading-relaxed">
                  <p>{product.description}</p>
                  
                  <div>
                    <span className="font-mono text-[#1C1C1C] font-semibold block mb-2">Select Size:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition ${
                            selectedSize === sz
                              ? 'bg-[#1C1C1C] text-white font-semibold'
                              : 'bg-[#E9E2D8] border border-[#1C1C1C]/5 text-[#1C1C1C] hover:border-[#1C1C1C]/20'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[#1C1C1C] font-semibold block mb-2">Color Way:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((clr) => (
                        <button
                          key={clr}
                          onClick={() => setSelectedColor(clr)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition ${
                            selectedColor === clr
                              ? 'bg-[#1C1C1C] text-white font-semibold'
                              : 'bg-[#E9E2D8] border border-[#1C1C1C]/5 text-[#1C1C1C] hover:border-[#1C1C1C]/20'
                          }`}
                        >
                          {clr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'graph' && (
                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-2xl bg-[#E9E2D8] border border-[#1C1C1C]/5 text-xs text-[#1C1C1C] flex items-start space-x-2">
                    <Network className="w-4 h-4 text-[#B98A4B] mt-0.5 shrink-0 stroke-[1.5]" />
                    <div>
                      <span className="font-bold text-[#1C1C1C] block mb-1">High Style Link Connectivity</span>
                      Co-purchased frequently with Banarasi silk jackets and cashmere fleece items by style leaders across Mumbai and Paris.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#1C1C1C]/5">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-4 rounded-full border flex items-center justify-center transition ${
                  isWishlisted
                    ? 'bg-[#E53935] text-white border-[#E53935]'
                    : 'bg-[#E9E2D8] border-[#1C1C1C]/5 text-[#1C1C1C] hover:text-[#1C1C1C]'
                }`}
              >
                <Heart className="w-4 h-4 stroke-[1.5]" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              {product.productLink && (
                <a
                  href={product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/15 text-[#1C1C1C] font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#E5DDD0] transition flex items-center justify-center space-x-2"
                >
                  <span>View on Store</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[1.5] text-[#B98A4B]" />
                </a>
              )}

              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedColor);
                  onClose();
                }}
                className="flex-1 py-4 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#B98A4B] transition shadow-md"
              >
                Add to Cart • ₹{product.price.toLocaleString('en-IN')}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
