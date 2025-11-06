'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { functionTypes, roomTypes, type FunctionType, type RoomType } from '@/lib/shopByStyleData';

type TabType = 'function' | 'room';

export function ShopByStyleClient() {
  const [activeTab, setActiveTab] = React.useState<TabType>('function');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Shop by Style</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-amber-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair text-gray-900 mb-4">
            Shop by Style
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover furniture organized by type or room to find exactly what you need
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('function')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'function'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              By Function / Type
            </button>
            <button
              onClick={() => setActiveTab('room')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'room'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              By Room
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-12">
        {activeTab === 'function' ? (
          <FunctionTypeGrid types={functionTypes} />
        ) : (
          <RoomGrid rooms={roomTypes} />
        )}
      </div>
    </div>
  );
}

// Function/Type Grid Component
function FunctionTypeGrid({ types }: { types: FunctionType[] }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-playfair text-gray-900 mb-3">Browse by Function</h2>
        <p className="text-gray-600">Select a category to explore our curated collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {types.map((type) => (
          <Link
            key={type.id}
            href={`/shop-by-style/${type.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Category Header */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center">
                <div className="text-5xl mb-3">{type.icon}</div>
                <h3 className="text-2xl font-playfair text-gray-900 mb-2">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{type.description}</p>
                <p className="text-lg font-bold text-amber-600">
                  {type.totalCount} Items Available
                </p>
              </div>

              {/* Subcategories */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {type.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-amber-600">✓</span>
                      <span className="text-gray-700">{sub.name}</span>
                      <span className="text-gray-400 text-xs">({sub.count})</span>
                    </div>
                  ))}
                </div>

                {/* Browse Button */}
                <div className="flex items-center justify-center gap-2 text-amber-600 font-medium group-hover:gap-4 transition-all">
                  <span>Browse {type.name}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Room Grid Component
function RoomGrid({ rooms }: { rooms: RoomType[] }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-playfair text-gray-900 mb-3">Shop by Room</h2>
        <p className="text-gray-600">Find furniture perfectly suited for each space in your home</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/shop-by-style/room/${room.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Room Icon & Name Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                  <div className="text-5xl mb-3">{room.icon}</div>
                  <h3 className="text-2xl font-playfair mb-2">
                    {room.name}
                  </h3>
                  <p className="text-lg font-semibold">
                    {room.count} Products
                  </p>
                </div>

                {/* Featured Badge */}
                {room.featured && (
                  <span className="absolute top-4 right-4 z-30 px-3 py-1 text-xs font-bold text-white bg-amber-600 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              {/* Room Details */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{room.description}</p>
                
                {/* Items List */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.items.slice(0, 4).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {room.items.length > 4 && (
                    <span className="px-3 py-1 text-xs bg-amber-50 text-amber-600 rounded-full font-medium">
                      +{room.items.length - 4} more
                    </span>
                  )}
                </div>

                {/* Browse Button */}
                <div className="flex items-center justify-center gap-2 text-amber-600 font-medium group-hover:gap-4 transition-all">
                  <span>Shop {room.name}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
