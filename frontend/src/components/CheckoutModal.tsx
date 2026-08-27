import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Sparkles, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya@vastra-fashion.in');
  const [address, setAddress] = useState('Bandra West, Hill Road, Mumbai, Maharashtra 400050');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      id: `VASTRA-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      totalAmount: subtotal,
      status: 'Dispatched',
      createdAt: new Date().toLocaleDateString(),
      trackingNumber: `VST-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setCreatedOrder(newOrder);
    setStep('success');
    onClearCart();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1C1C1C', '#B98A4B', '#C8A977'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F3EEE7] border border-[#1C1C1C]/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 sm:p-8 text-[#1C1C1C]">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2.5 rounded-full bg-[#F8F4EE] text-[#666666] hover:text-[#1C1C1C]">
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#666666] font-medium block">
                EXPRESS CHECKOUT
              </span>
              <h2 className="font-editorial text-2xl font-light text-[#1C1C1C] pt-1">
                Order Delivery & Payment
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#666666] mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#1C1C1C]/5 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] font-sans"
                />
              </div>

              <div>
                <label className="block text-[#666666] mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#1C1C1C]/5 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] font-sans"
                />
              </div>

              <div>
                <label className="block text-[#666666] mb-1 uppercase tracking-wider">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#1C1C1C]/5 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-center space-x-2 transition ${
                    paymentMethod === 'upi'
                      ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] font-semibold'
                      : 'bg-[#F8F4EE] border-[#1C1C1C]/5 text-[#666666]'
                  }`}
                >
                  <QrCode className="w-4 h-4 stroke-[1.5]" />
                  <span>UPI / GPay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-center space-x-2 transition ${
                    paymentMethod === 'card'
                      ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] font-semibold'
                      : 'bg-[#F8F4EE] border-[#1C1C1C]/5 text-[#666666]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 stroke-[1.5]" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-center space-x-2 transition ${
                    paymentMethod === 'cod'
                      ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] font-semibold'
                      : 'bg-[#F8F4EE] border-[#1C1C1C]/5 text-[#666666]'
                  }`}
                >
                  <span>Pay on Delivery</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold shadow-md hover:bg-[#B98A4B] transition"
            >
              Confirm Order & Pay • ₹{subtotal.toLocaleString('en-IN')}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div>
              <h2 className="font-editorial text-3xl font-light text-[#1C1C1C]">Order Confirmed</h2>
              <p className="text-[#666660] text-xs font-mono pt-1">
                Order ID: {createdOrder?.id} • Tracking: {createdOrder?.trackingNumber}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F4EE] border border-[#1C1C1C]/5 space-y-4">
              <div className="text-xs text-[#1C1C1C] font-mono flex items-center justify-between">
                <span>Express Courier Status</span>
                <span className="font-bold text-[#B98A4B]">STATUS: DISPATCHED</span>
              </div>

              <div className="flex items-center justify-between relative px-4">
                <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-black/10 -z-0" />
                
                {['Confirmed', 'Packed', 'Dispatched', 'Out for Delivery', 'Delivered'].map((st, i) => (
                  <div key={st} className="flex flex-col items-center z-10 space-y-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                      i <= 2 ? 'bg-[#1C1C1C] text-white shadow-xs' : 'bg-[#E9E2D8] text-[#666666]'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-mono text-[#666666]">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[#B98A4B] transition"
            >
              Return to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
