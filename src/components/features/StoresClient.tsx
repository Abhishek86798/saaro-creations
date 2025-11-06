'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ExternalLink, Calendar } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  mapLink: string;
  whatsappLink: string;
  images: string[];
}

const stores: Store[] = [
  {
    id: 'pune',
    name: 'Pune Studio',
    address: 'S no 20/3, Hotel Samdhan, Mundhwa - Kharadi Rd, Opp. Bharat Petroleum, Raghoba Patil Nagar, Shree Datta Colony, Wadgaon Sheri, Pune, Maharashtra 411014',
    phone: '+91 99211 25000',
    email: 'hello@saarofurniture.com',
    timings: 'All Week: 10 AM – 8 PM',
    mapLink: 'https://www.google.com/maps/place/Saaro+Creations/@18.5506735,73.9383977,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c1e6f6c6c6c7:0x1e6c6c7c6c6c6c6c!8m2!3d18.5506735!4d73.9409726!16s%2Fg%2F11y3qx7y3q',
    whatsappLink: 'https://wa.me/919921125000?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment',
    images: [
      '/images/store/pune_studio.webp',
      '/images/store/pune_studio_2.webp',
      '/images/store/pune_studio_3.webp'
    ]
  }
];

export function StoresClient() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState<{ [key: string]: number }>({
    pune: 0
  });

  const nextImage = (storeId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [storeId]: (prev[storeId] + 1) % totalImages
    }));
  };

  const prevImage = (storeId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [storeId]: prev[storeId] === 0 ? totalImages - 1 : prev[storeId] - 1
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Our Store</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Title & Intro */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-playfair text-gray-900 mb-6">
            Our Store
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Step into the world of Saaro Furniture Studio, where craftsmanship meets contemporary design. 
            From hand-polished teakwood to elegant rattan textures, every corner is crafted to inspire. 
            Experience the artistry of furniture at our Pune studio and bring timeless beauty home.
          </p>
        </div>
      </div>

      {/* Store Cards */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {stores.map((store) => (
          <div key={store.id} className="mb-16 last:mb-0">
            <StoreCard 
              store={store}
              currentImageIndex={currentImageIndex[store.id]}
              onNextImage={() => nextImage(store.id, store.images.length)}
              onPrevImage={() => prevImage(store.id, store.images.length)}
            />
          </div>
        ))}
      </div>

      {/* Bottom Info Section */}
      <div className="bg-white py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Good Design */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Good Design</h3>
              <p className="text-sm text-gray-600">
                Thoughtfully curated collections that blend form and function
              </p>
            </div>

            {/* Good for You */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Good for You</h3>
              <p className="text-sm text-gray-600">
                Sustainable materials and ergonomic designs for your wellbeing
              </p>
            </div>

            {/* Good for Nature */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Good for Nature</h3>
              <p className="text-sm text-gray-600">
                Responsibly sourced wood and eco-friendly finishing practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StoreCardProps {
  store: Store;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
}

function StoreCard({ store, currentImageIndex, onNextImage, onPrevImage }: StoreCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Image Section with Carousel */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
        <Image
          src={store.images[currentImageIndex] || '/images/store/pune_studio.webp'}
          alt={`${store.name} - View ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />

        {/* Carousel Controls */}
        {store.images.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {store.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {}}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Store Name Badge */}
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <h2 className="text-xl font-playfair text-gray-900">{store.name}</h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{store.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <a href={`tel:${store.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                  {store.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <a href={`mailto:${store.email}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                  {store.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Timings & Map */}
          <div className="space-y-6">
            {/* Timings */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Store Hours</h3>
                <p className="text-gray-600">{store.timings}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={`https://maps.google.com/maps?q=18.5506735,73.9409726&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="250"
                className="border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={`${store.name} location`}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <a
            href={store.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <ExternalLink className="h-5 w-5" />
            <span>Get Directions</span>
          </a>
          <a
            href={store.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <Calendar className="h-5 w-5" />
            <span>Book an Appointment</span>
          </a>
        </div>
      </div>
    </div>
  );
}
