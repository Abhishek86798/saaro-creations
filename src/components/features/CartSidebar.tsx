'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/lib/transforms';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount, isOpen, setCartOpen } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

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

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Close cart and trigger login modal
      setCartOpen(false);
      // Trigger login modal (we'll need to add this to the auth store or use a modal store)
      router.push('/my-account?redirect=checkout');
    } else {
      // Proceed to checkout
      setCartOpen(false);
      router.push('/checkout');
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isOpen
            ? 'bg-black/50 backdrop-blur-sm z-40 pointer-events-auto'
            : 'bg-black/0 -z-10 pointer-events-none'
        }`}
        onClick={() => isOpen && setCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            {itemCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
            )}
          </div>
          <button 
            onClick={() => setCartOpen(false)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Close cart"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Add some products to get started
              </p>
              <Button 
                onClick={() => setCartOpen(false)} 
                variant="outline"
                className="px-6"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Remove Button */}
                    <div className="flex justify-between gap-2 mb-1">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        title={`Remove ${item.name}`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mb-2">
                        {item.badge}
                      </span>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-gray-900">
                            ₹{formatPrice(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs line-through text-gray-400">
                              ₹{formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-green-600 font-medium mt-0.5">
                            Save ₹{formatPrice(item.originalPrice - item.price)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          title="Increase quantity"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Footer - Fixed */}
        {items.length > 0 && (
          <div className="border-t bg-gray-50 p-6 space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span className="font-semibold text-gray-900">₹{formatPrice(totalAmount)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Total Savings</span>
                  <span className="font-semibold text-green-600">-₹{formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">₹{formatPrice(totalAmount)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>

              {/* Continue Shopping */}
              <Button 
                variant="outline"
                className="w-full mt-3 py-5 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 pt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;