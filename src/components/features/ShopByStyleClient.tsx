'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface StyleCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
}

const styleCategories: StyleCategory[] = [
  {
    id: 'coastal-farmhouse',
    name: 'COASTAL',
    tagline: 'FARMHOUSE',
    description: 'Effortlessly Chic',
    image: '/images/shopbytype/image_1050x479_1.webp',
    href: '/style/coastal-farmhouse'
  },
  {
    id: 'contemporary-modern',
    name: 'CONTEMPORARY',
    tagline: 'MODERN',
    description: 'Trending & Chic',
    image: '/images/shopbytype/image_1050x479_2.webp',
    href: '/style/contemporary-modern'
  },
  {
    id: 'classic-modern',
    name: 'CLASSIC',
    tagline: 'MODERN',
    description: 'Elegant & Timeless',
    image: '/images/shopbytype/image_1050x479_3.webp',
    href: '/style/classic-modern'
  },
  {
    id: 'tropical-modern',
    name: 'TROPICAL',
    tagline: 'MODERN',
    description: 'Lush and Vibrant',
    image: '/images/shopbytype/image_1050x479_4.webp',
    href: '/style/tropical-modern'
  },
  {
    id: 'mid-century-modern',
    name: 'MID-CENTURY',
    tagline: 'MODERN',
    description: 'Retro & Timeless',
    image: '/images/shopbytype/image_1050x479_5.webp',
    href: '/style/mid-century-modern'
  }
];

export function ShopByStyleClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-100 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Small heading */}
            <p className="text-sm md:text-base text-gray-600 mb-4 tracking-widest uppercase">
              A Style To Love Edition
            </p>
            
            {/* Main heading with script font style */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-gray-800 mb-8">
              Shop By Style
            </h1>

            {/* Description Section */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                We are Obsessed with Finding You The Best Styles
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Whether you&apos;re going for the traditional, ornaments of a classic particular or the rustic, easy-going feel of 
                a seaside bungalow, we&apos;ve got you covered. Pick your favourite style from our pre-curated life-style collections!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Style Categories */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="space-y-0">
          {styleCategories.map((style, index) => (
            <Link
              key={style.id}
              href={style.href}
              className="block group"
            >
              <div className="relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden">
                {/* Background Image */}
                <Image
                  src={style.image}
                  alt={`${style.name} ${style.tagline}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
                  <div className="text-right text-white">
                    <p className="text-sm md:text-base tracking-wider mb-2">
                      {style.description}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-1">
                      {style.name}
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest">
                      {style.tagline}
                    </h3>
                  </div>
                </div>

                {/* Small Label on Left (Optional) */}
                {index === 1 && (
                  <div className="absolute left-8 top-1/2 -translate-y-1/2">
                    <div className="bg-gray-800/80 text-white px-6 py-3 backdrop-blur-sm">
                      <p className="text-xs tracking-wider">Trending & Chic</p>
                      <p className="text-lg font-bold">CONTEMPORARY</p>
                      <p className="text-lg font-light">MODERN</p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
