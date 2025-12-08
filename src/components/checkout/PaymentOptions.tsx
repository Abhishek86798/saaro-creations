'use client';

import React, { useState } from 'react';
import { CreditCard, Wallet, Calendar, Truck, Shield } from 'lucide-react';

export type PaymentMethod = 'COD' | 'ONLINE' | 'EMI';

interface PaymentOptionsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  orderTotal: number;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedMethod,
  onMethodChange,
  orderTotal,
}) => {
  const [emiTenure, setEmiTenure] = useState<3 | 6 | 9 | 12>(3);

  const calculateEMI = (tenure: number) => {
    const interestRate = 0.12; // 12% annual interest
    const monthlyRate = interestRate / 12;
    const emi = (orderTotal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const paymentMethods = [
    {
      id: 'COD' as PaymentMethod,
      name: 'Cash on Delivery',
      icon: Truck,
      description: 'Pay when your order arrives',
      details: '₹0 additional charges',
      badge: 'Most Popular',
      badgeColor: 'bg-green-500',
    },
    {
      id: 'ONLINE' as PaymentMethod,
      name: 'Online Payment',
      icon: Wallet,
      description: 'UPI, Cards, Net Banking',
      details: 'Get instant confirmation',
      badge: 'Secure',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 'EMI' as PaymentMethod,
      name: 'EMI Options',
      icon: Calendar,
      description: 'Pay in easy installments',
      details: 'Starting from 3 months',
      badge: 'Flexible',
      badgeColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Payment Method Selection */}
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedMethod === method.id
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Radio Button */}
            <div className="mt-1">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedMethod === method.id && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Icon */}
            <div
              className={`p-2 rounded-lg ${
                selectedMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'
              }`}
            >
              <method.icon
                className={`w-6 h-6 ${
                  selectedMethod === method.id ? 'text-orange-500' : 'text-gray-600'
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-gray-900">{method.name}</h3>
                <span
                  className={`${method.badgeColor} text-white text-xs px-2 py-0.5 rounded-full`}
                >
                  {method.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{method.description}</p>
              <p className="text-xs text-gray-500">{method.details}</p>
            </div>
          </div>

          {/* Expanded Details */}
          {selectedMethod === method.id && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {method.id === 'COD' && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-gray-700">
                      Pay cash/card/UPI at the time of delivery. No advance payment required.
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    Note: COD available for orders up to ₹1,00,000
                  </p>
                </div>
              )}

              {method.id === 'ONLINE' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Choose your payment method:</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-orange-500 cursor-pointer transition-colors">
                      <CreditCard className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-700">Credit/Debit Card</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-orange-500 cursor-pointer transition-colors">
                      <Wallet className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-700">UPI</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-orange-500 cursor-pointer transition-colors">
                      <CreditCard className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-700">Net Banking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-blue-50 p-2 rounded">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                </div>
              )}

              {method.id === 'EMI' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 font-medium">Select EMI Tenure:</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[3, 6, 9, 12].map((tenure) => (
                      <button
                        key={tenure}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEmiTenure(tenure as 3 | 6 | 9 | 12);
                        }}
                        className={`border-2 rounded-lg p-3 text-center transition-all ${
                          emiTenure === tenure
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900">{tenure} months</p>
                        <p className="text-xs text-gray-600 mt-1">
                          ₹{calculateEMI(tenure).toLocaleString()}/mo
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* EMI Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">EMI Breakdown</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Principal Amount:</span>
                      <span className="font-medium text-gray-900">₹{orderTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly EMI ({emiTenure} months):</span>
                      <span className="font-medium text-gray-900">
                        ₹{calculateEMI(emiTenure).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Interest (12% p.a.):</span>
                      <span className="font-medium text-gray-900">
                        ₹{(calculateEMI(emiTenure) * emiTenure - orderTotal).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="font-semibold text-gray-900">Total Amount:</span>
                      <span className="font-semibold text-orange-500">
                        ₹{(calculateEMI(emiTenure) * emiTenure).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    * Interest rates may vary based on your credit card issuer
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
