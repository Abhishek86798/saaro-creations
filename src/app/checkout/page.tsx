'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Plus, Check, Package, Truck } from 'lucide-react';
import { AddressCard } from '@/components/checkout/AddressCard';
import { AddressForm } from '@/components/checkout/AddressForm';
import { Button } from '@/components/ui/button';
import { useAddressStore, Address } from '@/store/addressStore';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { addresses, selectedAddressId, addAddress, updateAddress, deleteAddress, selectAddress } = useAddressStore();
  const { items, getTotal } = useCartStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const subtotal = getTotal();
  const savings = items.reduce((acc, item) => {
    const originalPrice = item.price * 1.2; // Assuming 20% discount
    return acc + (originalPrice - item.price) * item.quantity;
  }, 0);
  const shipping = subtotal > 50000 ? 0 : 500; // Free shipping above ₹50,000
  const total = subtotal + shipping;

  const handleAddAddress = (addressData: Omit<Address, 'id'>) => {
    addAddress(addressData);
  };

  const handleEditAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
      setEditingAddress(null);
    }
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleContinueToPayment = () => {
    if (selectedAddressId) {
      router.push('/checkout/payment');
    }
  };

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

            {/* Divider */}
            <div className="w-16 h-0.5 bg-orange-500"></div>

            {/* Address */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-orange-500">Address</span>
            </div>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Payment */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Payment</span>
            </div>

            {/* Divider */}
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
          {/* Address Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Select Delivery Address</h1>
              <Button
                onClick={() => {
                  setEditingAddress(null);
                  setIsFormOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
            </div>

            {/* Address List */}
            <div className="space-y-4">
              {addresses.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Addresses</h3>
                  <p className="text-gray-600 mb-6">Add a delivery address to continue with your order</p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddressId === address.id}
                    onSelect={() => selectAddress(address.id)}
                    onEdit={() => handleEditClick(address)}
                    onDelete={() => deleteAddress(address.id)}
                    showActions={true}
                  />
                ))
              )}
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
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-500">₹{total.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handleContinueToPayment}
                  disabled={!selectedAddressId}
                  className={`w-full ${
                    selectedAddressId
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  } text-white py-3 text-base font-semibold`}
                >
                  Continue to Payment
                </Button>

                {!selectedAddressId && (
                  <p className="text-xs text-red-500 text-center mt-2">
                    Please select a delivery address to continue
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center text-xs text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Secure Checkout
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-green-500 mr-2" />
                  Free Shipping above ₹50,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
        initialData={editingAddress}
      />
    </div>
  );
}
