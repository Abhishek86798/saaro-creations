"use client";

import React, { useState, useEffect } from 'react';
import { User, Package, FileText, ShoppingBag, Heart, MapPin, Lock, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface AccountSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sections: AccountSection[] = [
  { id: 'orders', label: 'Your Orders', icon: <Package className="w-4 h-4" /> },
  { id: 'quote', label: 'My Quote', icon: <FileText className="w-4 h-4" /> },
  { id: 'buy-again', label: 'Buy Again', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'account', label: 'Your Account', icon: <User className="w-4 h-4" /> },
  { id: 'wishlist', label: 'Your Wishlist', icon: <Heart className="w-4 h-4" /> },
  { id: 'address', label: 'Your Address', icon: <MapPin className="w-4 h-4" /> },
  { id: 'password', label: 'Change Password', icon: <Lock className="w-4 h-4" /> },
];

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: OrderItem[];
}

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const MyAccountClient: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('orders');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // Check URL parameter for section on mount
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/');
    }
  }, [mounted, isAuthenticated, router]);

  const userName = user?.name || 'Guest User';
  
  // Mock data - replace with actual API calls
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: 'October 15, 2024',
      status: 'delivered',
      total: 145000,
      items: [
        {
          id: 'davyn-sofa',
          name: 'Davyn 3-Seater Outdoor Sofa',
          image: '/images/outdoor/Davyn_Outdoor_Loveseat.webp',
          quantity: 1,
          price: 85000,
        },
        {
          id: 'teagon-coffee',
          name: 'Teagon Outdoor Coffee Table',
          image: '/images/outdoor/Teagon_Outdoor_Dining_Table.webp',
          quantity: 1,
          price: 60000,
        },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: 'October 28, 2024',
      status: 'shipped',
      total: 48000,
      items: [
        {
          id: 'wren-lounge',
          name: 'Wren Outdoor Lounge Chair',
          image: '/images/outdoor/Wren_Outdoor_Lounge_Chair.webp',
          quantity: 2,
          price: 48000,
        },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: 'November 5, 2024',
      status: 'processing',
      total: 125000,
      items: [
        {
          id: 'harlow-dining',
          name: 'Miami Outdoor Corner Sofa',
          image: '/images/outdoor/Miami_Outdoor_Corner_Sofa.webp',
          quantity: 1,
          price: 125000,
        },
      ],
    },
  ]);
  const [quotes] = useState<unknown[]>([]);
  const [buyAgainItems] = useState<Order[]>([
    {
      id: '4',
      orderNumber: 'ORD-2023-089',
      date: 'March 12, 2023',
      status: 'delivered',
      total: 32000,
      items: [
        {
          id: 'ceramic-vase',
          name: 'Eleanor Wicker Outdoor Club Chair',
          image: '/images/outdoor/Eleanor_Wicker_Outdoor_Club_Chair.webp',
          quantity: 2,
          price: 32000,
        },
      ],
    },
    {
      id: '5',
      orderNumber: 'ORD-2023-124',
      date: 'June 8, 2023',
      status: 'delivered',
      total: 18000,
      items: [
        {
          id: 'table-lamp',
          name: 'Ethan Outdoor Lounge Chair',
          image: '/images/outdoor/Ethan_Outdoor_Lounge_Chair.webp',
          quantity: 1,
          price: 18000,
        },
      ],
    },
  ]);
  const [wishlistItems] = useState<OrderItem[]>([
    {
      id: 'calloway-sectional',
      name: 'Sinag Outdoor Corner Sofa',
      image: '/images/outdoor/Sinag_Outdoor_Corner.webp',
      quantity: 1,
      price: 165000,
    },
    {
      id: 'lotus-sculpture',
      name: 'Murre Wicker Outdoor Chair',
      image: '/images/outdoor/Murre_Wicker_Outdoor_Chair.webp',
      quantity: 1,
      price: 24000,
    },
    {
      id: 'teak-bench',
      name: 'Revia Outdoor Bench - Terracotta',
      image: '/images/outdoor/Revia_Outdoor_Bench_-_Terracotta.webp',
      quantity: 1,
      price: 42000,
    },
    {
      id: 'moroccan-lantern',
      name: 'Shannon Wicker Outdoor Loveseat',
      image: '/images/outdoor/Shannon_Wicker_Outdoor_Loveseat.webp',
      quantity: 1,
      price: 15000,
    },
  ]);
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Ajay Patil',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 302, Sunshine Apartments',
      addressLine2: 'Lane 5, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Ajay Patil',
      phone: '+91 98765 43210',
      addressLine1: 'Office No. 15, Tech Tower',
      addressLine2: 'Hinjewadi Phase 1',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
      isDefault: false,
    },
  ]);
  
  const [accountDetails, setAccountDetails] = useState({
    firstName: user?.name?.split(' ')[0] || 'Ajay',
    lastName: user?.name?.split(' ')[1] || 'Patil',
    email: user?.email || 'admin123@gmail.com',
    mobile: '',
    dob: '',
    gender: 'male',
    newsletter: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveAccount = () => {
    // TODO: Implement save account logic with API call
  };

  const handleChangePassword = () => {
    // TODO: Implement password change logic with API call
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  };

  const handleAddAddress = () => {
    // TODO: Implement add address logic with API call
  };

  const renderOrders = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-32 h-32 mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100 20 L100 50 M80 35 L100 20 L120 35 M100 50 L70 70 L70 130 L100 150 L130 130 L130 70 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              />
              <line x1="70" y1="70" x2="130" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
              <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
              <line x1="70" y1="100" x2="130" y2="100" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Order Placed</h2>
          <p className="text-gray-600 mb-6">Looks like you haven&apos;t placed any orders. Let&apos;s change that!</p>
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium mb-6">My Quote</h1>
      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-32 h-32 mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100 20 L100 50 M80 35 L100 20 L120 35 M100 50 L70 70 L70 130 L100 150 L130 130 L130 70 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              />
              <line x1="70" y1="70" x2="130" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
              <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
              <line x1="70" y1="100" x2="130" y2="100" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Quotes</h2>
          <p className="text-gray-600 mb-6">Looks like you don&apos;t have any quotes. Let&apos;s change that!</p>
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Render quotes here */}
        </div>
      )}
    </div>
  );

  const renderBuyAgain = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium mb-6">Buy Again</h1>
      {buyAgainItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-gray-300 mb-6">
            <ShoppingBag className="w-32 h-32" />
          </div>
          <p className="text-gray-600 mb-6">No previous purchases to show</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyAgainItems.map((order) => (
            order.items.map((item) => (
              <div key={item.id} className="border border-gray-200 group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-medium line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-semibold">₹{item.price.toLocaleString()}</p>
                  <button className="w-full px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium mb-6">Account Settings</h1>
      <div className="max-w-3xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountDetails.firstName}
              onChange={(e) => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountDetails.lastName}
              onChange={(e) => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={accountDetails.mobile}
              onChange={(e) => setAccountDetails({ ...accountDetails, mobile: e.target.value })}
              placeholder="Mobile Number*"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={accountDetails.email}
              onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Date of Birth</label>
          <input
            type="date"
            value={accountDetails.dob}
            onChange={(e) => setAccountDetails({ ...accountDetails, dob: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm mb-3">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={accountDetails.gender === 'male'}
                onChange={(e) => setAccountDetails({ ...accountDetails, gender: e.target.value })}
                className="w-4 h-4 accent-orange-500"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={accountDetails.gender === 'female'}
                onChange={(e) => setAccountDetails({ ...accountDetails, gender: e.target.value })}
                className="w-4 h-4 accent-orange-500"
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={accountDetails.newsletter}
              onChange={(e) => setAccountDetails({ ...accountDetails, newsletter: e.target.checked })}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm">NewsLetter Subscription</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveAccount}
            className="px-12 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium mb-6">Wishlist Page</h1>
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-32 h-32 mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100 170 C 100 170, 40 120, 40 80 C 40 50, 60 30, 85 30 C 95 30, 100 35, 100 35 C 100 35, 105 30, 115 30 C 140 30, 160 50, 160 80 C 160 120, 100 170, 100 170 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Favorite yet</h2>
          <p className="text-gray-600 mb-6">Favourite Blinks you love so you can always find them here.</p>
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-gray-200 group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-medium line-clamp-2">{item.name}</h3>
                <p className="text-lg font-semibold">₹{item.price.toLocaleString()}</p>
                <button className="w-full px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium mb-6">Saved Addresses</h1>
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-gray-200">
          <h2 className="text-xl font-medium mb-4">No Addresses Found</h2>
          <button
            onClick={handleAddAddress}
            className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            Add New Address +
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleAddAddress}
            className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            Add New Address +
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 p-6 relative">
                {address.isDefault && (
                  <span className="absolute top-4 right-4 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                    DEFAULT
                  </span>
                )}
                <h3 className="font-medium mb-2">{address.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                <p className="text-sm text-gray-600 mb-1">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-sm text-gray-600 mb-1">{address.addressLine2}</p>
                )}
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <div className="mt-4 flex gap-4">
                  <button className="text-sm text-gray-900 hover:underline">Edit</button>
                  <button className="text-sm text-gray-900 hover:underline">Remove</button>
                  {!address.isDefault && (
                    <button className="text-sm text-gray-900 hover:underline">Set as Default</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPassword = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium mb-6">Change Password</h1>
      <div className="max-w-md space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm mb-2">
            Current Password<span className="text-red-500">*</span>
          </label>
          <input
            id="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm mb-2">
            New Password<span className="text-red-500">*</span>
          </label>
          <input
            id="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-2">
            Confirm New Password<span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleChangePassword}
            className="px-12 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="border border-gray-200 p-6 sticky top-4">
              {/* User Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Hello,</p>
                <h2 className="text-xl font-medium">{userName}</h2>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors mt-6 pt-6 border-t border-gray-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'orders' && renderOrders()}
            {activeSection === 'quote' && renderQuotes()}
            {activeSection === 'buy-again' && renderBuyAgain()}
            {activeSection === 'account' && renderAccount()}
            {activeSection === 'wishlist' && renderWishlist()}
            {activeSection === 'address' && renderAddress()}
            {activeSection === 'password' && renderPassword()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountClient;
