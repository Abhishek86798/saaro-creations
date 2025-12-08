'use client';

import React from 'react';
import { MapPin, Edit2, Trash2, Check } from 'lucide-react';
import { Address } from '@/store/addressStore';

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <div
      className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
        isSelected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
      onClick={() => onSelect?.(address.id)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Address Type Badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded ${
            address.addressType === 'Home'
              ? 'bg-blue-100 text-blue-700'
              : address.addressType === 'Office'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <MapPin className="w-3 h-3" />
          {address.addressType}
        </span>
        {address.isDefault && (
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
            Default
          </span>
        )}
      </div>

      {/* Name and Phone */}
      <h3 className="font-semibold text-gray-900 mb-1">{address.fullName}</h3>
      <p className="text-sm text-gray-600 mb-2">{address.phoneNumber}</p>

      {/* Address */}
      <p className="text-sm text-gray-700 mb-1">
        {address.addressLine1}
        {address.addressLine2 && `, ${address.addressLine2}`}
      </p>
      <p className="text-sm text-gray-700">
        {address.city}, {address.state} {address.pinCode}
      </p>
      <p className="text-sm text-gray-700">{address.country}</p>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(address);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(address.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
