'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Package, MapPin, CreditCard, Truck, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrderStore, Order } from '@/store/orderStore';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const { createOrder } = useOrderStore();

  useEffect(() => {
    // Try to get order from sessionStorage first (just placed order)
    const sessionOrder = sessionStorage.getItem('currentOrder');
    
    if (sessionOrder) {
      const orderData = JSON.parse(sessionOrder);
      
      // Save to order store
      createOrder(orderData);
      
      setOrder({ ...orderData, status: 'pending' });
      
      // Clear session storage
      sessionStorage.removeItem('currentOrder');
    } else {
      // Try to get from order store (returning user)
      const { getOrderById } = useOrderStore.getState();
      const storedOrder = getOrderById(orderId);
      
      if (storedOrder) {
        setOrder(storedOrder);
      } else {
        // Order not found, redirect to home
        router.push('/');
      }
    }
  }, [orderId, createOrder, router]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const getPaymentMethodDisplay = () => {
    switch (order.paymentMethod) {
      case 'COD':
        return 'Cash on Delivery';
      case 'ONLINE':
        return 'Online Payment';
      case 'EMI':
        return 'EMI Payment';
      default:
        return order.paymentMethod;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We&apos;ll send you shipping confirmation when your items ship.
          </p>

          <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-lg">
            <span className="text-sm text-gray-600">Order ID:</span>
            <span className="text-lg font-bold text-gray-900">{order.orderId}</span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">{order.address.fullName}</p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <p className="text-gray-600">{order.address.phoneNumber}</p>
              </div>
              <div className="flex items-start gap-2">
                <Home className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-gray-600">
                  <p>{order.address.addressLine1}</p>
                  {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                  <p>
                    {order.address.city}, {order.address.state} - {order.address.pinCode}
                  </p>
                  <p>{order.address.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
              </div>
              <p className="text-sm text-gray-600">{getPaymentMethodDisplay()}</p>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Estimated Delivery</h2>
              </div>
              <p className="text-sm font-medium text-gray-900">{order.estimatedDelivery}</p>
              <p className="text-xs text-gray-500 mt-1">Delivery within 7-10 business days</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Order Items ({order.items.length})</h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({order.items.length} items)</span>
              <span className="font-medium text-gray-900">₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Savings</span>
              <span className="font-medium text-green-600">-₹{order.savings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-orange-500">₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="flex-1 py-3"
          >
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <Button
            onClick={() => router.push('/my-account?tab=orders')}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3"
          >
            <Package className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help with your order?{' '}
            <a href="/contact" className="text-orange-500 hover:text-orange-600 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
