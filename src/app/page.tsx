'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/features/ProductCard';

export default function HomePage() {
  const [vestaIndex, setVestaIndex] = React.useState(0);
  const [heroImageIndex, setHeroImageIndex] = React.useState(0);
  
  const vestaImages = [
    '/images/products/vesta.webp',
    '/images/products/vesta (1).webp',
    '/images/products/vesta (2).webp',
    '/images/products/vesta (3).webp',
    '/images/products/vesta (4).webp',
    '/images/products/vesta (5).webp',
    '/images/products/vesta (6).webp',
    '/images/products/vesta (7).webp',
    '/images/products/vesta (8).webp',
    '/images/products/vesta (9).webp',
  ];

  // Hero section rotating images
  const heroImages = [
    '/images/best-sellers/Jake_Modular_Sectional_Sofa.webp',
    '/images/best-sellers/Nakashi_Dining_Table.webp',
    '/images/best-sellers/Moscow_Upholstered_Bed_Cot.webp',
    '/images/best-sellers/Rover_Armchair.webp',
    '/images/best-sellers/Saturn_Single_Pillar_Dining_Table_-_5_Feet.webp',
  ];

  // Auto-rotate hero images every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextVesta = () => {
    setVestaIndex((prev) => (prev + 1) % vestaImages.length);
  };

  const prevVesta = () => {
    setVestaIndex((prev) => (prev - 1 + vestaImages.length) % vestaImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Animated Product Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
                index === heroImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center px-4 sm:px-6 max-w-4xl z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 text-white font-serif leading-tight">
            New Arrivals, New Stories
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 text-white/90">
            Step into a world of crafted design
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/80">
            where every piece feels like a first.
          </p>
          <Link href="/furniture">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg"
            >
              SHOP NOW +
            </Button>
          </Link>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 font-serif">Every Collection is a Chapter</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { name: 'Incurve Episodes', image: '/images/collections/Incurve_Episodes.webp', href: '/furniture/living?category=Chairs' },
              { name: 'Monocraft Collection', image: '/images/collections/Monocraft_Collection.webp', href: '/decor' },
              { name: 'Home and Cottage', image: '/images/collections/Home_and_Cottage.webp', href: '/lightings' },
              { name: 'French Country Collection', image: '/images/collections/French_Country_Collection.webp', href: '/furniture/living?category=Sofas+%26+Sectionals' }
            ].map((collection, index) => (
              <Link 
                key={index} 
                href={collection.href}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 font-serif">Shop by Category</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Discover timeless pieces for every room</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Sofas', image: '/images/product-types/Sofas.webp', count: '150+ Designs', href: '/furniture?type=Sofas%20%26%20Sectionals' },
              { name: 'Coffee Tables', image: '/images/product-types/Coffee_Tables.webp', count: '80+ Designs', href: '/furniture?type=Coffee%20Tables' },
              { name: 'Accents', image: '/images/categories/Accents.webp', count: '200+ Pieces', href: '/decor' },
              { name: 'Beds', image: '/images/product-types/Beds.webp', count: '60+ Styles', href: '/furniture/bedroom' },
              { name: 'Lightings', image: '/images/categories/Lightings.webp', count: '100+ Fixtures', href: '/lightings' },
              { name: 'Armoires & Wardrobes', image: '/images/categories/Armoires_Wardrobes.webp', count: '40+ Units', href: '/furniture/bedroom' },
              { name: 'Dining Tables', image: '/images/product-types/Dining_Tables.webp', count: '70+ Tables', href: '/furniture/dining' },
              { name: 'Dining Chairs', image: '/images/product-types/Dining_Chairs.webp', count: '120+ Chairs', href: '/furniture/dining' }
            ].map((product, index) => (
              <Link 
                key={index} 
                href={product.href}
                className="group"
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-semibold">{product.count}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 font-serif">Best Sellers</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Our most loved furniture pieces</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ProductCard
              id="nicholas-lounge-chair"
              name="Nicholas Lounge Chair"
              price={90000}
              originalPrice={120000}
              discount={25}
              image="/images/furniture/Nicholas_Lounge_Chair.webp"
              badge="SALE"
              emi={9435}
            />
            <ProductCard
              id="jake-modular-sectional-sofa"
              name="Jake Modular Sectional Sofa"
              price={333200}
              originalPrice={392000}
              discount={15}
              image="/images/best-sellers/Jake_Modular_Sectional_Sofa.webp"
              badge="NEW"
              emi={34945}
            />
            <ProductCard
              id="ebba-chaise-sectional-sofa"
              name="Ebba Chaise Sectional Sofa"
              price={301750}
              originalPrice={301750}
              discount={0}
              image="/images/furniture/Ebba_Chaise_Sectional_Sofa.webp"
              badge="MADE TO ORDER"
              emi={31634}
            />
            <ProductCard
              id="candice-rattan-single-seater"
              name="Candice Rattan Single Seater"
              price={65925}
              originalPrice={65925}
              discount={0}
              image="/images/furniture/Candice_Rattan_Single_Seater.webp"
              badge="MADE TO ORDER"
              emi={6911}
            />
          </div>
        </div>
      </section>

      {/* Vesta Collection Gallery with Carousel */}
      <section className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 font-serif">The Vesta Collection</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">Explore our exclusive Vesta series</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={vestaImages[vestaIndex]}
                alt={`Vesta ${vestaIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            <button
              onClick={prevVesta}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            
            <button
              onClick={nextVesta}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            
            <div className="flex justify-center gap-2 mt-6">
              {vestaImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setVestaIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === vestaIndex ? 'bg-amber-500 w-8' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 font-serif">Shop by Room</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Living Room', image: '/images/categories/Living_Room.webp', href: '/furniture/living' },
              { name: 'Dining Room', image: '/images/categories/Dining_Room.webp', href: '/furniture/dining' },
              { name: 'Bed Room', image: '/images/categories/Bed_Room.webp', href: '/furniture/bedroom' },
              { name: 'Outdoor & Indoor Living', image: '/images/categories/Outdoor_Indoor_Living.webp', href: '/outdoor' }
            ].map((room, index) => (
              <Link 
                key={index} 
                href={room.href}
                className="group"
              >
                <div className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Type Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 font-serif">Shop By Type</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Find furniture that matches your aesthetic</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {[
              { name: 'Coastal Farmhouse', image: '/images/collections/Home_and_Cottage.webp' },
              { name: 'Contemporary Modern', image: '/images/collections/Monocraft_Collection.webp' },
              { name: 'Tropical Modern', image: '/images/collections/Incurve_Episodes.webp' },
              { name: 'Classic Modern', image: '/images/collections/French_Country_Collection.webp' },
              { name: 'Mid-century Modern', image: '/images/categories/Living_Room.webp' }
            ].map((style, index) => (
              <Link 
                key={index}
                href={`/styles/${style.name.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white text-center group-hover:text-amber-400 transition-colors leading-tight">
                      {style.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Features Section - DTale Modern Style */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-50 border-y">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
            {[
              {
                icon: '🛡️',
                title: '10 Year Warranty'
              },
              {
                icon: '🏭',
                title: 'Direct Selling : Factory To Customer'
              },
              {
                icon: '✅',
                title: '66 Quality Checks'
              },
              {
                icon: '🌳',
                title: 'KD (Kiln Dried) and HT (Heat Treated)'
              },
              {
                icon: '📐',
                title: 'Ergonomically Designed'
              },
              {
                icon: '⏳',
                title: 'Generations Long Durability'
              },
              {
                icon: '🇮🇳',
                title: 'All India Service Warranty'
              },
              {
                icon: '👶',
                title: 'Free Of Child Labour'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl">
                    {feature.icon}
                  </div>
                  <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 leading-tight px-1">
                    {feature.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 font-serif leading-tight">
            Your home is an extension of your personal space and choices
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            This haven deserves nothing short of what&apos;s the best.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-amber-600 text-sm sm:text-base"
          >
            Explore Our Collections
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
