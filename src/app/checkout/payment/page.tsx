'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Check, Package, Truck, ArrowLeft } from 'lucide-react';
import { PaymentOptions, PaymentMethod } from '@/components/checkout/PaymentOptions';
import { Button } from '@/components/ui/button';
import { useAddressStore } from '@/store/addressStore';
import { useCartStore } from '@/store/cartStore';

export default function PaymentPage() {
  const router = useRouter();
  const { addresses, selectedAddressId } = useAddressStore();
  const { items, getTotal, clearCart } = useCartStore();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('COD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
  const subtotal = getTotal();
  const savings = items.reduce((acc, item) => {
    const originalPrice = item.price * 1.2;
    return acc + (originalPrice - item.price) * item.quantity;
  }, 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  // Redirect if no address selected
  useEffect(() => {
    if (!selectedAddressId) {
      router.push('/checkout');
    }
  }, [selectedAddressId, router]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;

    setIsPlacingOrder(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order ID
    const orderId = `ORD${Date.now()}`;

    // Store order data in sessionStorage for confirmation page
    const orderData = {
      orderId,
      items,
      address: selectedAddress,
      paymentMethod: selectedPayment,
      subtotal,
      savings,
      shipping,
      total,
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    sessionStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Clear cart
    clearCart();

    // Redirect to confirmation
    router.push(`/order/confirmation/${orderId}`);
  };

  if (!selectedAddress) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            {/* Cart */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Cart</span>
            </div>

            <div className="w-16 h-0.5 bg-green-500"></div>

            {/* Address */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Address</span>
            </div>

            <div className="w-16 h-0.5 bg-orange-500"></div>

            {/* Payment */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-orange-500">Payment</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Confirmation */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back to address selection"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
              </div>
              <div className="pl-7 space-y-1">
                <p className="font-medium text-gray-900">{selectedAddress.fullName}</p>
                <p className="text-sm text-gray-600">{selectedAddress.phoneNumber}</p>
                <p className="text-sm text-gray-600">
                  {selectedAddress.addressLine1}
                  {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
                </p>
                <p className="text-sm text-gray-600">{selectedAddress.country}</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h2>
              <PaymentOptions
                selectedMethod={selectedPayment}
                onMethodChange={setSelectedPayment}
                orderTotal={total}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Products List */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Savings</span>
                  <span className="font-medium text-green-600">-₹{savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-orange-500">₹{total.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className={`w-full ${
                    isPlacingOrder ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
                  } text-white py-3 text-base font-semibold`}
                >
                  {isPlacingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Placing Order...
                    </span>
                  ) : (
                    `Place Order - ₹${total.toLocaleString()}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </div>

              {/* Payment Method Badge */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-600 mb-2">Selected Payment Method:</p>
                <div className="flex items-center gap-2">
                  {selectedPayment === 'COD' && (
                    <>
                      <Truck className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                    </>
                  )}
                  {selectedPayment === 'ONLINE' && (
                    <>
                      <Check className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900">Online Payment</span>
                    </>
                  )}
                  {selectedPayment === 'EMI' && (
                    <>
                      <Package className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-900">EMI Payment</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
