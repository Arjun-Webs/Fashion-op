import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 499;
  const total = Math.max(subtotal - discountAmount + shipping, 0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VASTRA20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid code. Try "VASTRA20" for 20% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F3EEE7] border-l border-[#1C1C1C]/5 shadow-2xl flex flex-col justify-between text-[#1C1C1C]">
          
          <div className="p-6 border-b border-[#1C1C1C]/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 stroke-[1.5] text-[#1C1C1C]" />
              <h2 className="font-editorial text-xl font-light">Shopping Bag</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-[#666666] hover:text-[#1C1C1C] hover:bg-black/5">
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto stroke-[1]" />
                <p className="text-[#666666] text-xs font-mono">Your shopping bag is currently empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex space-x-4 p-3.5 rounded-2xl bg-[#F8F4EE] border border-[#1C1C1C]/5">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-white" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-editorial text-sm font-medium text-[#1C1C1C] line-clamp-1">{item.product.name}</h4>
                        <button onClick={() => onRemoveItem(item.product.id)} className="text-[#666666] hover:text-[#E53935]">
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#666666] pt-0.5">
                        Size: {item.selectedSize} • Color: {item.selectedColor}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-xs text-[#1C1C1C] font-bold">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center space-x-2 bg-white border border-[#1C1C1C]/5 rounded-full px-2.5 py-0.5 shadow-xs">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="text-[#666666] hover:text-[#1C1C1C]">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono text-[#1C1C1C] font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="text-[#666666] hover:text-[#1C1C1C]">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-[#1C1C1C]/5 bg-[#F8F4EE] space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (VASTRA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-white border border-[#1C1C1C]/10 text-xs text-[#1C1C1C] uppercase font-mono placeholder-gray-400 focus:outline-none focus:border-[#1C1C1C]"
                />
                <button onClick={handleApplyPromo} className="px-5 py-2.5 rounded-full bg-[#1C1C1C] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#B98A4B] transition">
                  Apply
                </button>
              </div>

              {promoApplied && (
                <div className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                  <Tag className="w-3 h-3 stroke-[1.5]" /> 20% Luxury Discount Applied!
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#666666]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1C1C1C]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="font-mono text-[#1C1C1C]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#1C1C1C]/5 font-bold text-sm text-[#1C1C1C]">
                  <span>Total</span>
                  <span className="font-mono font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center space-x-2 hover:bg-[#B98A4B] transition shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
