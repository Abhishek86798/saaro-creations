'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [vestaIndex, setVestaIndex] = React.useState(0);
  
  const vestaImages = [
    '/images/vesta.webp',
    '/images/vesta (1).webp',
    '/images/vesta (2).webp',
    '/images/vesta (3).webp',
    '/images/vesta (4).webp',
    '/images/vesta (5).webp',
    '/images/vesta (6).webp',
    '/images/vesta (7).webp',
    '/images/vesta (8).webp',
    '/images/vesta (9).webp',
  ];

  const nextVesta = () => {
    setVestaIndex((prev) => (prev + 1) % vestaImages.length);
  };

  const prevVesta = () => {
    setVestaIndex((prev) => (prev - 1 + vestaImages.length) % vestaImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/New_Arrivals.webp"
          alt="New Arrivals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center px-4 max-w-4xl z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white font-serif">
            New Arrivals, New Stories
          </h1>
          <p className="text-2xl mb-2 text-white/90">
            Step into a world of crafted design
          </p>
          <p className="text-xl mb-8 text-white/80">
            where every piece feels like a first.
          </p>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 text-lg"
          >
            SHOP NOW +
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Every Collection is a Chapter</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Incurve Episodes', image: '/images/Incurve_Episodes.webp' },
              { name: 'Monocraft Collection', image: '/images/Monocraft_Collection.webp' },
              { name: 'Home and Cottage', image: '/images/Home_and_Cottage.webp' },
              { name: 'French Country Collection', image: '/images/French_Country_Collection.webp' }
            ].map((collection, index) => (
              <Link 
                key={index} 
                href={`/collections/${collection.name.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Discover timeless pieces for every room</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Sofas', image: '/images/Sofas.webp', count: '150+ Designs' },
              { name: 'Coffee Tables', image: '/images/Coffee_Tables.webp', count: '80+ Designs' },
              { name: 'Accents', image: '/images/Accents.webp', count: '200+ Pieces' },
              { name: 'Beds', image: '/images/Beds.webp', count: '60+ Styles' },
              { name: 'Lightings', image: '/images/Lightings.webp', count: '100+ Fixtures' },
              { name: 'Armoires & Wardrobes', image: '/images/Armoires_Wardrobes.webp', count: '40+ Units' },
              { name: 'Dining Tables', image: '/images/Dining_Tables.webp', count: '70+ Tables' },
              { name: 'Dining Chairs', image: '/images/Dining_Chairs.webp', count: '120+ Chairs' }
            ].map((product, index) => (
              <Link 
                key={index} 
                href={`/products/${product.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Best Sellers</h2>
            <p className="text-gray-600 text-lg">Our most loved furniture pieces</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Preston Curved Lounge Chair', 
                image: '/images/Sofas.webp',
                price: '₹130,625',
                discount: '5% Off',
                emi: '₹11,605.26',
                badge: 'NEW',
                status: 'Made To Order'
              },
              { 
                name: 'Arque Curved Sofa', 
                image: '/images/Coffee_Tables.webp',
                price: '₹218,500',
                discount: '5% Off',
                emi: '₹19,412.44',
                badge: 'NEW',
                status: 'Made To Order'
              },
              { 
                name: 'Tess Curved Sofa', 
                image: '/images/Beds.webp',
                price: '₹198,600',
                discount: null,
                emi: '₹17,644.44',
                badge: 'NEW',
                status: 'Made To Order'
              },
              { 
                name: 'Apollo Club Sofa', 
                image: '/images/Dining_Tables.webp',
                price: '₹96,000',
                discount: '25% Off',
                emi: '₹8,529.03',
                badge: 'SALE',
                status: 'Made To Order'
              }
            ].map((product, index) => (
              <Link 
                key={index}
                href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded ${
                        product.badge === 'NEW' ? 'bg-amber-600' : 'bg-red-600'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded">
                      {product.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.discount && (
                        <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">EMI starts from {product.emi}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vesta Collection Gallery with Carousel */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-serif">The Vesta Collection</h2>
            <p className="text-gray-300 text-lg">Explore our exclusive Vesta series</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={vestaImages[vestaIndex]}
                alt={`Vesta ${vestaIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            <button
              onClick={prevVesta}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextVesta}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Shop by Room</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Living Room', image: '/images/Living_Room.webp' },
              { name: 'Dining Room', image: '/images/Dining_Room.webp' },
              { name: 'Bed Room', image: '/images/Bed_Room.webp' },
              { name: 'Outdoor & Indoor Living', image: '/images/Outdoor_Indoor_Living.webp' }
            ].map((room, index) => (
              <Link 
                key={index} 
                href={`/rooms/${room.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="group"
              >
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Style Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Shop By Style</h2>
            <p className="text-gray-600 text-lg">Find furniture that matches your aesthetic</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Coastal Farmhouse', image: '/images/Home_and_Cottage.webp' },
              { name: 'Contemporary Modern', image: '/images/Monocraft_Collection.webp' },
              { name: 'Tropical Modern', image: '/images/Incurve_Episodes.webp' },
              { name: 'Classic Modern', image: '/images/French_Country_Collection.webp' },
              { name: 'Mid-century Modern', image: '/images/Living_Room.webp' }
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
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm md:text-base font-bold text-white text-center group-hover:text-amber-400 transition-colors">
                      {style.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Design Masters Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif">Meet our Design Masters</h2>
            <Link 
              href="/design-masters" 
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 group"
            >
              View All
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Says Who',
                specialty: 'Creative Directors',
                description: 'Contemporary design duo known for their minimalist and functional approach to furniture design.',
                featured: 'Modern Collection'
              },
              {
                name: 'Sanne Protin',
                specialty: 'Industrial Designer',
                description: 'Innovative designer blending traditional craftsmanship with contemporary aesthetics.',
                featured: 'Signature Series'
              },
              {
                name: 'Morten Georgsen',
                specialty: 'Furniture Designer',
                description: 'Danish designer focused on timeless pieces that merge elegance with comfort.',
                featured: 'Classic Elegance'
              },
              {
                name: 'Jacob Amtorp',
                specialty: 'Product Designer',
                description: 'Award-winning designer creating sophisticated furniture with sustainable materials.',
                featured: 'Eco Luxe Line'
              }
            ].map((designer, index) => (
              <div 
                key={index} 
                className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{designer.name}</h3>
                  <p className="text-sm text-amber-600 font-medium mb-3">{designer.specialty}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {designer.description}
                  </p>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Featured Work</p>
                    <p className="text-sm font-semibold text-gray-900">{designer.featured}</p>
                  </div>
                  <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Work
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In - Media Awards */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 font-serif">Featured In</h2>
            <p className="text-gray-600">Recognized by leading media outlets</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              '/images/media-awards.jpg',
              '/images/media-awards (1).jpg',
              '/images/media-awards (2).jpg',
              '/images/media-awards (3).jpg'
            ].map((award, index) => (
              <div key={index} className="relative h-24 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={award}
                  alt={`Media Award ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Ship / In Stock Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Ready to Ship</h2>
            <p className="text-gray-600 text-lg">In stock furniture available for immediate delivery</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Luna Ottoman', 
                image: '/images/Accents.webp',
                price: '₹43,690',
                discount: '15% Off',
                emi: '₹3,881.60',
                badge: 'IN STOCK',
                status: 'Ready to Ship'
              },
              { 
                name: 'Charlotte Cuddle Couch', 
                image: '/images/Sofas.webp',
                price: '₹108,715',
                discount: '15% Off',
                emi: '₹9,658.69',
                badge: 'IN STOCK',
                status: 'Ready to Ship'
              },
              { 
                name: 'Sylvia Loveseat', 
                image: '/images/Dining_Chairs.webp',
                price: '₹127,415',
                discount: '15% Off',
                emi: '₹11,320.07',
                badge: 'IN STOCK',
                status: 'Ready to Ship'
              },
              { 
                name: 'Keny Boucle Club Sofa', 
                image: '/images/Coffee_Tables.webp',
                price: '₹84,915',
                discount: '15% Off',
                emi: '₹7,544.20',
                badge: 'IN STOCK',
                status: 'Ready to Ship'
              }
            ].map((product, index) => (
              <Link 
                key={index}
                href={`/ready-to-ship/${product.name.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white bg-green-600 rounded">
                      {product.badge}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded">
                      {product.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.discount && (
                        <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">EMI starts from {product.emi}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              View All In Stock Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Curated Galleries - Store Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Curated Galleries</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our stores exude an aura that&apos;s irresistible with great wood and fabric.
              <br />
              Catching your eyes and captivating your mind, our art stands at every nook and corner
              <br />
              looking at you. Visit and get consumed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                city: 'Dtale Bengaluru',
                image: '/images/Dtale_Bengaluru.webp',
                location: 'Bengaluru, Karnataka'
              },
              {
                city: 'DTALE Kochi',
                image: '/images/DTALE_Kochi.webp',
                location: 'Kochi, Kerala'
              },
              {
                city: 'Dtale Thrissur',
                image: '/images/Dtale_Thrissur.webp',
                location: 'Thrissur, Kerala'
              }
            ].map((store, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 mb-4">
                  <Image
                    src={store.image}
                    alt={store.city}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{store.city}</h3>
                    <p className="text-white/90">{store.location}</p>
                  </div>
                </div>
                <Link 
                  href="/stores"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Explore Our Store
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Features Section - DTale Modern Style */}
      <section className="py-16 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
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
                  <div className="w-16 h-16 flex items-center justify-center mb-3 text-4xl">
                    {feature.icon}
                  </div>
                  <h4 className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">
                    {feature.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Your home is an extension of your personal space and choices
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            This haven deserves nothing short of what&apos;s the best.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-amber-600"
          >
            Explore Our Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
