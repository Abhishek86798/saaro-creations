'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';

interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  emi: number;
  status: 'Ready To Ship' | 'Made To Order' | 'Sold Out';
  category: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'teagon-dining-table',
    name: 'Teagon Dining Table',
    description: 'Discover the pinnacle of outdoor dining luxury with the Teagon Dining Table. Fashioned from a harmonious blend of premium wood planks and contemporary design elements, this table is a masterpiece of timeless elegance.',
    image: '/images/outdoor/Teagon_Outdoor_Dining_Table.webp',
  },
  {
    id: 'wren-lounge-chair',
    name: 'Wren Lounge Chair',
    description: 'Find serenity in the Wren Lounge Chair. Crafted to mirror the agility of the wren, this chair harmoniously fuses a streamlined design with functionality.',
    image: '/images/outdoor/Wren_Outdoor_Lounge_Chair.webp',
  },
];

const outdoorProducts: Product[] = [
  {
    id: 'davyn-outdoor-lounge-chair',
    name: 'Davyn Outdoor Lounge Chair',
    image: '/images/outdoor/Davyn_Outdoor_Lounge_Chair.webp',
    hoverImage: '/images/outdoor/Davyn_Outdoor_Lounge_Chair (1).webp',
    price: 66405,
    originalPrice: 69900,
    discount: 5,
    emi: 5899.69,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'davyn-outdoor-loveseat',
    name: 'Davyn Outdoor Loveseat',
    image: '/images/outdoor/Davyn_Outdoor_Loveseat.webp',
    hoverImage: '/images/outdoor/Davyn_Outdoor_Loveseat (1).webp',
    price: 116755,
    originalPrice: 122900,
    discount: 5,
    emi: 10372.99,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'davyn-outdoor-nesting-coffee-table',
    name: 'Davyn Outdoor Nesting Coffee Table (Set of 2)',
    image: '/images/outdoor/Davyn_Outdoor_Nesting_Coffee_Table_Set_of_2.webp',
    hoverImage: '/images/outdoor/Davyn_Outdoor_Nesting_Coffee_Table_Set_of_2 (1).webp',
    price: 52155,
    originalPrice: 54900,
    discount: 5,
    emi: 4633.66,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'wren-outdoor-lounge-chair',
    name: 'Wren Outdoor Lounge Chair',
    image: '/images/outdoor/Wren_Outdoor_Lounge_Chair.webp',
    price: 44080,
    originalPrice: 46400,
    discount: 5,
    emi: 3916.25,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'wren-outdoor-loveseat',
    name: 'Wren Outdoor Loveseat',
    image: '/images/outdoor/Wren_Outdoor_Loveseat.webp',
    price: 85405,
    originalPrice: 89900,
    discount: 5,
    emi: 7587.73,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'wren-outdoor-coffee-table',
    name: 'Wren Outdoor Coffee Table',
    image: '/images/outdoor/Wren_Outdoor_Coffee_Table.webp',
    price: 33630,
    originalPrice: 35400,
    discount: 5,
    emi: 2987.83,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'revia-outdoor-bench-terracotta',
    name: 'Revia Outdoor Bench - Terracotta',
    image: '/images/outdoor/Revia_Outdoor_Bench_-_Terracotta.webp',
    hoverImage: '/images/outdoor/Revia_Outdoor_Bench_-_Terracotta (1).webp',
    price: 101555,
    originalPrice: 106900,
    discount: 5,
    emi: 9022.56,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'revia-outdoor-bench-twisted',
    name: 'Revia Outdoor Bench - Twisted Banana Leaf',
    image: '/images/outdoor/Revia_Outdoor_Bench_-_Twisted_Banana_Leaf.webp',
    price: 101555,
    originalPrice: 106900,
    discount: 5,
    emi: 9022.56,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'zenith-foldable-2-seat-walnut',
    name: 'Zenith Foldable 2 Seat Outdoor Set (1 Table & 2 Chairs) - Walnut',
    image: '/images/outdoor/Zenith_Foldable_2_Seat_Outdoor_Set_1_Table_2_Chair.webp',
    hoverImage: '/images/outdoor/Zenith_Foldable_2_Seat_Outdoor_Set_1_Table_2_Chair (1).webp',
    price: 32925,
    originalPrice: 43900,
    discount: 25,
    emi: 2925.19,
    status: 'Ready To Ship',
    category: 'Outdoor Dining',
  },
  {
    id: 'ethan-outdoor-lounge-chair',
    name: 'Ethan Outdoor Lounge Chair',
    image: '/images/outdoor/Ethan_Outdoor_Lounge_Chair.webp',
    price: 74955,
    originalPrice: 78900,
    discount: 5,
    emi: 6659.31,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'ethan-outdoor-loveseat',
    name: 'Ethan Outdoor Loveseat',
    image: '/images/outdoor/Ethan_Outdoor_Loveseat.webp',
    price: 117230,
    originalPrice: 123400,
    discount: 5,
    emi: 10415.2,
    status: 'Sold Out',
    category: 'Outdoor Lounge',
  },
  {
    id: 'miami-outdoor-corner-sofa',
    name: 'Miami Outdoor Corner Sofa',
    image: '/images/outdoor/Miami_Outdoor_Corner_Sofa.webp',
    hoverImage: '/images/outdoor/Miami_Outdoor_Corner_Sofa (1).webp',
    price: 253080,
    originalPrice: 266400,
    discount: 5,
    emi: 22484.67,
    status: 'Made To Order',
    category: 'Outdoor Lounge',
  },
  {
    id: 'miami-outdoor-coffee-table',
    name: 'Miami Outdoor Coffee Table',
    image: '/images/outdoor/Miami_Outdoor_Coffee_Table.webp',
    hoverImage: '/images/outdoor/Miami_Outdoor_Coffee_Table (1).webp',
    price: 44555,
    originalPrice: 46900,
    discount: 5,
    emi: 3958.45,
    status: 'Sold Out',
    category: 'Outdoor Lounge',
  },
  {
    id: 'teagon-outdoor-dining-table',
    name: 'Teagon Outdoor Dining Table',
    image: '/images/outdoor/Teagon_Outdoor_Dining_Table.webp',
    hoverImage: '/images/outdoor/Teagon_Outdoor_Dining_Table (1).webp',
    price: 145180,
    originalPrice: 207400,
    discount: 30,
    emi: 12898.39,
    status: 'Sold Out',
    category: 'Outdoor Dining',
  },
  {
    id: 'teagon-outdoor-dining-bench',
    name: 'Teagon Outdoor Dining Bench',
    image: '/images/outdoor/Teagon_Outdoor_Dining_Bench.webp',
    hoverImage: '/images/outdoor/Teagon_Outdoor_Dining_Bench (1).webp',
    price: 80180,
    originalPrice: 84400,
    discount: 5,
    emi: 7123.52,
    status: 'Sold Out',
    category: 'Outdoor Dining',
  },
  {
    id: 'murre-wicker-outdoor-lounge-chair',
    name: 'Murre Wicker Outdoor Lounge Chair',
    image: '/images/outdoor/Murre_Wicker_Outdoor_Lounge_Chair.webp',
    price: 53890,
    originalPrice: 63400,
    discount: 15,
    emi: 4787.81,
    status: 'Sold Out',
    category: 'Outdoor Lounge',
  },
  {
    id: 'murre-wicker-outdoor-loveseat',
    name: 'Murre Wicker Outdoor Loveseat',
    image: '/images/outdoor/Murre_Wicker_Outdoor_Loveseat.webp',
    price: 114950,
    originalPrice: 121000,
    discount: 5,
    emi: 10212.63,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'murre-wicker-outdoor-coffee-table',
    name: 'Murre Wicker Outdoor Coffee Table',
    image: '/images/outdoor/Murre_Wicker_Outdoor_Coffee_Table.webp',
    hoverImage: '/images/outdoor/Murre_Wicker_Outdoor_Coffee_Table (1).webp',
    price: 29830,
    originalPrice: 31400,
    discount: 5,
    emi: 2650.22,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'murre-wicker-outdoor-chair',
    name: 'Murre Wicker Outdoor Chair',
    image: '/images/outdoor/Murre_Wicker_Outdoor_Chair.webp',
    hoverImage: '/images/outdoor/Murre_Wicker_Outdoor_Chair (1).webp',
    price: 38950,
    originalPrice: 41000,
    discount: 5,
    emi: 3460.48,
    status: 'Ready To Ship',
    category: 'Outdoor Dining',
  },
  {
    id: 'lenni-wicker-outdoor-loveseat',
    name: 'Lenni Wicker Outdoor Loveseat',
    image: '/images/outdoor/Lenni_Wicker_Outdoor_Loveseat.webp',
    price: 117230,
    originalPrice: 123400,
    discount: 5,
    emi: 10415.2,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'eleanor-wicker-outdoor-sectional',
    name: 'Eleanor Wicker Outdoor Sectional',
    image: '/images/outdoor/Eleanor_Wicker_Outdoor_Sectional.webp',
    price: 253080,
    originalPrice: 266400,
    discount: 5,
    emi: 22484.67,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'eleanor-wicker-outdoor-club-chair',
    name: 'Eleanor Wicker Outdoor Club Chair',
    image: '/images/outdoor/Eleanor_Wicker_Outdoor_Club_Chair.webp',
    hoverImage: '/images/outdoor/Eleanor_Wicker_Outdoor_Club_Chair (1).webp',
    price: 50915,
    originalPrice: 59900,
    discount: 15,
    emi: 4523.5,
    status: 'Sold Out',
    category: 'Outdoor Lounge',
  },
  {
    id: 'eleanor-wicker-outdoor-coffee-table',
    name: 'Eleanor Wicker Outdoor Coffee Table',
    image: '/images/outdoor/Eleanor_Wicker_Outdoor_Coffee_Table.webp',
    hoverImage: '/images/outdoor/Eleanor_Wicker_Outdoor_Coffee_Table (1).webp',
    price: 44080,
    originalPrice: 46400,
    discount: 5,
    emi: 3916.25,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'shannon-wicker-outdoor-lounge-chair',
    name: 'Shannon Wicker Outdoor Lounge Chair',
    image: '/images/outdoor/Shannon_Wicker_Outdoor_Lounge_Chair.webp',
    price: 73055,
    originalPrice: 76900,
    discount: 5,
    emi: 6490.51,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'shannon-wicker-outdoor-loveseat',
    name: 'Shannon Wicker Outdoor Loveseat',
    image: '/images/outdoor/Shannon_Wicker_Outdoor_Loveseat.webp',
    price: 130530,
    originalPrice: 137400,
    discount: 5,
    emi: 11596.82,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'shannon-wicker-outdoor-coffee-table',
    name: 'Shannon Wicker Outdoor Coffee Table',
    image: '/images/outdoor/Shannon_Wicker_Outdoor_Coffee_Table.webp',
    price: 39805,
    originalPrice: 41900,
    discount: 5,
    emi: 3536.44,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'ethan-outdoor-coffee-table',
    name: 'Ethan Outdoor Coffee Table',
    image: '/images/outdoor/Ethan_Outdoor_Coffee_Table.webp',
    price: 37905,
    originalPrice: 39900,
    discount: 5,
    emi: 3367.64,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'sinag-outdoor-lounge-chair',
    name: 'Sinag Outdoor Lounge Chair',
    image: '/images/outdoor/Sinag_Outdoor_Lounge_Chair.webp',
    price: 67830,
    originalPrice: 71400,
    discount: 5,
    emi: 6026.3,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'sinag-outdoor-lounge-loveseat',
    name: 'Sinag Outdoor Lounge Loveseat',
    image: '/images/outdoor/Sinag_Outdoor_Lounge_Loveseat.webp',
    hoverImage: '/images/outdoor/Sinag_Outdoor_Lounge_Loveseat (1).webp',
    price: 122930,
    originalPrice: 129400,
    discount: 5,
    emi: 10921.61,
    status: 'Ready To Ship',
    category: 'Outdoor Lounge',
  },
  {
    id: 'sinag-outdoor-corner',
    name: 'Sinag Outdoor Corner',
    image: '/images/outdoor/Sinag_Outdoor_Corner.webp',
    hoverImage: '/images/outdoor/Sinag_Outdoor_Corner (1).webp',
    price: 253080,
    originalPrice: 266400,
    discount: 5,
    emi: 22484.67,
    status: 'Made To Order',
    category: 'Outdoor Lounge',
  },
  {
    id: 'sinag-outdoor-hocker',
    name: 'Sinag Outdoor Hocker',
    image: '/images/outdoor/Sinag_Outdoor_Hocker.webp',
    hoverImage: '/images/outdoor/Sinag_Outdoor_Hocker (1).webp',
    price: 32205,
    originalPrice: 33900,
    discount: 5,
    emi: 2861.22,
    status: 'Made To Order',
    category: 'Outdoor Lounge',
  },
  {
    id: 'ethan-outdoor-lounge-sectional',
    name: 'Ethan Outdoor Lounge Sectional',
    image: '/images/outdoor/Ethan_Outdoor_Lounge_Sectional.webp',
    price: 253080,
    originalPrice: 266400,
    discount: 5,
    emi: 22484.67,
    status: 'Sold Out',
    category: 'Outdoor Lounge',
  },
];

export function OutdoorClient() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const { toggleItem, isInWishlist } = useWishlistStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number): string => {
    const priceStr = Math.round(price).toString();
    const lastThree = priceStr.substring(priceStr.length - 3);
    const otherNumbers = priceStr.substring(0, priceStr.length - 3);
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const toggleWishlist = (product: Product) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <Link href="/collections" className="hover:text-amber-600">Collections</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Outdoor Collections</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <Image
          src="/images/outdoor/image_1200x415_51.webp"
          alt="Outdoor & Indoor Living"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-playfair text-white tracking-wider">
            OUTDOOR & INDOOR LIVING
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h2 className="text-3xl font-playfair text-amber-600 mb-6">
          Outdoor & Indoor Living
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Embark on a journey of outdoor rejuvenation, where every piece of furniture exudes allure and charm, 
          beckoning you to unwind and immerse yourself in the beauty of nature. Let your outdoor space undergo 
          a remarkable makeover showcasing exquisite furnishings from <span className="font-semibold">Saaro Creations</span> that 
          promise to elevate your outdoor experience to new heights of elegance and sophistication.
        </p>
      </div>

      {/* Designer's Choice Carousel */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-center gap-8">
              {/* Left Content */}
              <div className="w-1/3 bg-white p-8 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                  DESIGNER&apos;S CHOICE
                </p>
                <h3 className="text-3xl font-playfair mb-6">
                  {featuredProducts[currentSlide].name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {featuredProducts[currentSlide].description}
                </p>
                <Link href={`/product/${featuredProducts[currentSlide].id}`}>
                  <Button variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                    Explore
                  </Button>
                </Link>
              </div>

              {/* Right Image */}
              <div className="flex-1 relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={featuredProducts[currentSlide].image}
                  alt={featuredProducts[currentSlide].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-600">
                {currentSlide + 1} / {featuredProducts.length}
              </span>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explore More Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair mb-4">Explore more</h2>
          <p className="text-gray-600">
            Furniture to choose from our most promising range of artistries.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outdoorProducts.map((product) => {
            const inWishlist = mounted && isInWishlist(product.id);
            const isHovered = hoveredProduct === product.id;
            const displayImage = isHovered && product.hoverImage ? product.hoverImage : product.image;

            return (
              <div
                key={product.id}
                className="group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      
                      {/* Status Badge */}
                      {product.status && (
                        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded ${
                          product.status === 'Sold Out' 
                            ? 'bg-red-100 text-red-700'
                            : product.status === 'Made To Order'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {product.status}
                        </span>
                      )}
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart 
                          className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </button>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-amber-600 uppercase tracking-wider mb-2">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors min-h-[2.5rem]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Pricing */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-xs text-white bg-green-600 px-2 py-0.5 rounded font-medium">
                              {product.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>
                      {product.emi > 0 && (
                        <p className="text-xs text-gray-500">
                          EMI starts from ₹{formatPrice(Math.round(product.emi))}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-playfair text-center mb-12">
              Shop for Outdoor Furniture That Matches Your Space Aesthetics from Saaro Creations
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              Outdoor furniture is the key to transforming your backyard, patio, or balcony into a comfortable and 
              inviting living space. The perfect outdoor furniture online provides a space to host summer barbecues, 
              relax with a good book or simply enjoy the fresh air. High-quality outdoor furniture enhances your 
              outdoor experience and extends your home&apos;s livable area.
            </p>

            <p className="text-gray-700 leading-relaxed mb-12">
              Saaro Creations offers a range of products that can beautify your outdoor setting to refresh your body 
              and soul. Purchase perfect pieces for your outdoor oasis, inviting you to relax, entertain and embrace 
              the beauty of open-air living.
            </p>

            {/* Why Is Outdoor Furniture Important */}
            <div className="mb-12">
              <h3 className="text-2xl font-playfair mb-6">Why Is Outdoor Furniture Important?</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Outdoor furniture for your space, especially your home, is important for several reasons. It is the 
                space the best for relaxation, socialising or aesthetics. The below-mentioned are the key reasons 
                why outdoor furniture plays a significant role:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3">Aesthetic Appeal:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    High-quality outdoor furniture is the easiest way to enhance the visual appeal of outdoor spaces. 
                    It can enhance the style and personality of your space, making your backyard or patio more polished 
                    and inviting. Outdoor furniture is available in different designs, colours and materials that can 
                    complement the overall outdoor decor.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Comfort and Relaxation:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Setting up an outdoor space is an excellent choice; it provides a comfortable space for individuals 
                    and families to unwind and enjoy nature. The best outdoor furniture can turn outdoor areas into 
                    extensions of living spaces where people can have some quality time with themselves or their loved ones.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Social Gathering:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Outdoor furniture is the best way to socialise, as it offers comfortable seating areas for gatherings, 
                    barbecues and other outdoor events. Having the perfect outdoor furniture makes it easier to host guests 
                    in your garden, patio or terrace.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Maximising Outdoor Space:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Outdoor furniture helps in effectively utilising available outdoor space. Whether your space is small 
                    or large, the right set of furniture pieces can make the area extra functional and enjoyable, allowing 
                    homeowners to make the most of their outdoor living area.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Enhancing Well-Being:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    After a long day or for a cosy weekend, spending hours outside your home has proven mental and physical 
                    health benefits. The comfortable furniture can make your time outside more enjoyable, helping to reduce 
                    stress, boost mood and promote relaxation.
                  </p>
                </div>
              </div>
            </div>

            {/* Types of Outdoor Furniture */}
            <div className="mb-12">
              <h3 className="text-2xl font-playfair mb-6">
                Types of Outdoor Furniture for Balconies and Patios from Saaro Creations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Saaro Creations, we take the initiative to make your outdoor furniture the best. To have a cosy morning 
                tea, breakfast, or dinner or just to wind up your entire day&apos;s stress, outdoor furniture has a huge role to 
                play. Here are some of the premium outdoor furniture that you can avail of from Saaro Creations.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3">Outdoor Lounge</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The outdoor lounge offers a perfect blend of comfort and nature, creating an inviting space to relax 
                    and unwind in your backyard or patio. Saaro Creations has premium outdoor sofas & sectionals, outdoor 
                    lounge chairs, outdoor gazebo daybeds, outdoor coffee tables and outdoor ottomans. If you are hosting 
                    a summer barbecue or enjoying a quiet evening under the stars, the outdoor lounge provides the ideal 
                    setting for all your outdoor living needs.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Outdoor Dining</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The outdoor dining is all about a refreshing al fresco experience, allowing patrons to enjoy their meals 
                    surrounded by nature&apos;s beauty or urban landscapes. Saaro Creations has a premium collection of outdoor 
                    dining tables and outdoor chairs & benches that suit your space beautifully. Whether you are planning for 
                    a casual brunch or a romantic dinner under the stars, outdoor dining offers you a delightful escape from 
                    the confines of indoor spaces.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Outdoor Patio & Balcony</h4>
                  <p className="text-gray-700 leading-relaxed">
                    An outdoor balcony or patio has all the potential to transform your space, especially if it&apos;s a home. 
                    It offers a space for a serene retreat to enjoy fresh air and nature. Accent or lounge chairs from Saaro 
                    Creations&apos; outdoor patio collection are just the outdoor balcony furniture pieces if you want a space for 
                    spinning your morning coffee, entertaining friends or stargazing at night.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-playfair mb-6">
                Find Premium Outdoor Furniture Online from Saaro Creations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Outdoor furniture is just as important as the ones in your outdoor space. It has to align perfectly with 
                the aesthetic of your outdoors. There is no better place to enjoy a tranquil moment in your space.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With Saaro Creations&apos; wide range of collections, you will find the perfect outdoor furniture where you can 
                unwind perfectly more than any other indoor space. Take your outdoor space into a peaceful, comfortable space 
                and heaven of style with the best online furniture store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
