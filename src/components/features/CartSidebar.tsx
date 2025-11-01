'use client';

import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem } = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return items.reduce((total, item) => 
      total + (((item.originalPrice || item.price) - item.price) * item.quantity), 0);
  };

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
          {items.map(item => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <Image 
                src={item.image} 
                alt={item.name}
                width={96}
                height={96}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="text-gray-400 hover:text-gray-600"
                    title={`Remove ${item.name} from cart`}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <div>
                    <span className="text-lg font-semibold">₹{item.price.toLocaleString()}</span>
                    {item.originalPrice !== null && item.originalPrice > item.price && (
                      <>
                        <span className="ml-2 text-sm line-through text-gray-400">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                        <span className="ml-2 text-sm text-orange-500">{item.discount}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={`Decrease ${item.name} quantity`}
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={`Increase ${item.name} quantity`}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-orange-500">
                <span>Total Savings</span>
                <span>₹{calculateSavings().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3"
              onClick={() => {/* Implement checkout */}}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;