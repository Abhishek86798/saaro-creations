import React from 'react';
import { Search, ShoppingBag, Package } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'search' | 'cart' | 'package' | 'default';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  search: Search,
  cart: ShoppingBag,
  package: Package,
  default: Package,
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'default',
  action,
}) => {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
