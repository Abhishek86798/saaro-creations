'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: 'Monocraft Collection',
      image: '/images/collections/Monocraft_Collection.webp',
      description: 'Accent Table Collection - One shade, endless form',
      slug: 'monocraft-collection'
    },
    {
      id: 2,
      name: 'Incurve Episodes',
      image: '/images/collections/Incurve_Episodes.webp',
      description: 'Contemporary curved furniture collection',
      slug: 'incurve-episodes'
    },
    {
      id: 3,
      name: 'Copenhagen Curves',
      image: '/images/collections/Copenhagen_Curves.webp',
      description: 'Scandinavian inspired curved designs',
      slug: 'copenhagen-curves'
    },
    {
      id: 4,
      name: 'Veda Sangrah',
      image: '/images/collections/Veda_Sangrah.webp',
      description: 'Modular sanctuary - Traditional meets modern',
      slug: 'veda-sangrah'
    },
    {
      id: 5,
      name: 'Isle of Greece',
      image: '/images/collections/Isle_of_Greece.webp',
      description: 'Mediterranean inspired furniture collection',
      slug: 'isle-of-greece'
    },
    {
      id: 6,
      name: 'Ebba',
      image: '/images/collections/Ebba.webp',
      description: 'EBBA 2.0 RELOADED - Classic elegance reimagined',
      slug: 'ebba'
    },
    {
      id: 7,
      name: 'Foster',
      image: '/images/collections/foster.webp',
      description: 'A DESIGNER\'S TOUCH - Our exclusive Foster collection',
      slug: 'foster'
    },
    {
      id: 8,
      name: 'Manhattan Collection',
      image: '/images/collections/Manhattan_Collection.webp',
      description: 'Urban sophistication meets timeless design',
      slug: 'manhattan-collection'
    },
    {
      id: 9,
      name: 'Home and Cottage',
      image: '/images/collections/Home_and_Cottage.webp',
      description: 'Rustic charm with modern comfort',
      slug: 'home-and-cottage'
    },
    {
      id: 10,
      name: 'Miller Lounge Series',
      image: '/images/collections/Miller_Lounge_Series.webp',
      description: 'Contemporary lounge furniture collection',
      slug: 'miller-lounge-series'
    },
    {
      id: 11,
      name: 'Bombay Club Collection',
      image: '/images/collections/Bombay_Club_Collection.webp',
      description: 'Colonial era inspired luxury furniture',
      slug: 'bombay-club-collection'
    },
    {
      id: 12,
      name: 'Travancore Roots',
      image: '/images/collections/Travancore_Roots.webp',
      description: 'Heritage inspired traditional series',
      slug: 'travancore-roots'
    },
    {
      id: 13,
      name: 'Ebba Collection',
      image: '/images/collections/Ebba_Collection.webp',
      description: 'Classic furniture with modern sensibilities',
      slug: 'ebba-collection'
    },
    {
      id: 14,
      name: 'Advi Collection',
      image: '/images/collections/Advi_Collection.webp',
      description: 'Contemporary minimalist series',
      slug: 'advi-collection'
    },
    {
      id: 15,
      name: 'Chandigarh Collection',
      image: '/images/collections/Chandigarh_Collection.webp',
      description: 'Mid-century modern inspired designs',
      slug: 'chandigarh-collection'
    },
    {
      id: 16,
      name: 'Kobbler Collection',
      image: '/images/collections/Kobbler_Collection.webp',
      description: 'Artisan crafted furniture pieces',
      slug: 'kobbler-collection'
    },
    {
      id: 17,
      name: 'Verandah Collection',
      image: '/images/collections/Verandah_Collection.webp',
      description: 'Outdoor living luxury collection',
      slug: 'verandah-collection'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/collections/Monocraft_Collection.webp"
            alt="Collections"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <p className="text-sm uppercase tracking-widest mb-4 text-gray-300">
              DISCOVER EACH PIECE FROM OUR
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              COLLECTIONS
            </h1>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Collection Name Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-2xl md:text-3xl font-serif font-bold mb-2 drop-shadow-lg">
                          {collection.name}
                        </h3>
                        <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Collection Name Below */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our design experts are here to help you create the perfect space with custom furniture solutions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Contact Our Design Team
          </Link>
        </div>
      </section>
    </div>
  );
}
