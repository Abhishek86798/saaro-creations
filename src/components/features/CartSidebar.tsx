'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/transforms';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const totalAmount = getTotal();
  const savings = calculateSavings();
  const itemCount = getItemCount();

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Close cart"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      title={`Remove ${item.name} from cart`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {item.badge && (
                    <span className="text-xs text-gray-500 mt-1 block">{item.badge}</span>
                  )}
                  <div className="mt-2 flex justify-between items-end">
                    <div>
                      <span className="text-lg font-semibold">₹{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="ml-2 text-xs line-through text-gray-400">
                          ₹{formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                        title={`Decrease ${item.name} quantity`}
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                        title={`Increase ${item.name} quantity`}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                <span className="font-semibold">₹{formatPrice(totalAmount)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Total Savings</span>
                  <span>₹{formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">₹{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
            
            <Link href="/checkout" onClick={onClose}>
              <Button 
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3"
              >
                Proceed to Checkout
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;