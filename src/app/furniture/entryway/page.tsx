'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  status: string;
  emi: string;
  category: string;
  size?: string;
  discount?: number;
}

const EntrywayPage = () => {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    priceRange: { min: 0, max: 200000 },
    size: [] as string[],
    discount: [] as number[],
  });

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Category tabs for Entryway
  const categories = [
    {
      id: 1,
      name: 'Consoles',
      image: '/images/entryway/Consoles-image.jpg',
    },
    {
      id: 2,
      name: 'Shoe Rack',
      image: '/images/entryway/Shoe_Rack-image.jpg',
    },
    {
      id: 3,
      name: 'Benches',
      image: '/images/entryway/Benches-image.jpg',
    },
    {
      id: 4,
      name: 'Swing',
      image: '/images/entryway/image_990x341_101.webp',
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Nakashi Chiseled Arch Console',
      price: 164000,
      image: '/images/entryway/Nakashi_Chiseled_Arch_Console.webp',
      hoverImage: '/images/entryway/Nakashi_Chiseled_Arch_Console (1).webp',
      badge: 'Statement Piece',
      status: 'Made To Order',
      emi: '₹ 17193.11',
      category: 'Consoles',
    },
    {
      id: 2,
      name: 'Tamera Two-Way Reaper Swing',
      price: 90950,
      originalPrice: 103190,
      image: '/images/entryway/Tamera_Two-Way_Reaper_Swing.webp',
      status: 'Made To Order',
      emi: '₹ 10818.03',
      category: 'Swing',
      discount: 12,
    },
    {
      id: 3,
      name: 'Cairn Chiseled Console',
      price: 82555,
      originalPrice: 86900,
      image: '/images/entryway/Cairn_Chiseled_Console.webp',
      hoverImage: '/images/entryway/Cairn_Chiseled_Console (1).webp',
      status: 'Made To Order',
      emi: '₹ 8654.74',
      category: 'Consoles',
      discount: 5,
    },
    {
      id: 4,
      name: 'Kezia Two-Way Rattan Swing',
      price: 96900,
      originalPrice: 109140,
      image: '/images/entryway/Kezia_Two-Way_Rattan_Swing.webp',
      hoverImage: '/images/entryway/Kezia_Two-Way_Rattan_Swing (1).webp',
      badge: 'Trending Now',
      status: 'Made To Order',
      emi: '₹ 11441.81',
      category: 'Swing',
      discount: 11,
    },
    {
      id: 5,
      name: 'Ahava Chiseled Console',
      price: 95200,
      originalPrice: 112000,
      image: '/images/entryway/Ahava_Chiseled_Console.webp',
      status: 'Made To Order',
      emi: '₹ 9980.39',
      category: 'Consoles',
      discount: 15,
    },
    {
      id: 6,
      name: 'Vivo Slatted Shoe Console',
      price: 106165,
      originalPrice: 124900,
      image: '/images/entryway/Vivo_Slatted_Shoe_Console.webp',
      badge: 'Trending Now',
      status: 'Made To Order',
      emi: '₹ 11129.92',
      category: 'Shoe Cabinet',
      size: 'L',
      discount: 15,
    },
    {
      id: 7,
      name: 'Mecai Console Desk',
      price: 49900,
      image: '/images/entryway/Mecai_Console_Desk.webp',
      hoverImage: '/images/entryway/Mecai_Console_Desk (1).webp',
      status: 'Made To Order',
      emi: '₹ 5231.32',
      category: 'Consoles',
    },
    {
      id: 8,
      name: 'Reeve Console Table',
      price: 83030,
      originalPrice: 87400,
      image: '/images/entryway/Reeve_Console_Table.webp',
      hoverImage: '/images/entryway/Reeve_Console_Table (1).webp',
      status: 'Made To Order',
      emi: '₹ 8704.54',
      category: 'Console Tables',
      discount: 5,
    },
    {
      id: 9,
      name: 'Vivo Slatted Shoe Chest',
      price: 80240,
      originalPrice: 94400,
      image: '/images/entryway/Vivo_Slatted_Shoe_Chest.webp',
      hoverImage: '/images/entryway/Vivo_Slatted_Shoe_Chest (1).webp',
      status: 'Made To Order',
      emi: '₹ 8412.04',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 10,
      name: 'Vivo Slatted Shoe Rack',
      price: 55165,
      originalPrice: 64900,
      image: '/images/entryway/Vivo_Slatted_Shoe_Rack.webp',
      hoverImage: '/images/entryway/Vivo_Slatted_Shoe_Rack (1).webp',
      status: 'Made To Order',
      emi: '₹ 5783.28',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 11,
      name: 'Brio Rattan Shoe Chest',
      price: 76415,
      originalPrice: 89900,
      image: '/images/entryway/Brio_Rattan_Shoe_Chest.webp',
      hoverImage: '/images/entryway/Brio_Rattan_Shoe_Chest (1).webp',
      status: 'Made To Order',
      emi: '₹ 8011.05',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 12,
      name: 'Brio Rattan Shoe Console',
      price: 101915,
      originalPrice: 119900,
      image: '/images/entryway/Brio_Rattan_Shoe_Console.webp',
      hoverImage: '/images/entryway/Brio_Rattan_Shoe_Console (1).webp',
      status: 'Made To Order',
      emi: '₹ 10684.37',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 13,
      name: 'Brio Rattan Shoe Rack',
      price: 50915,
      originalPrice: 59900,
      image: '/images/entryway/Brio_Rattan_Shoe_Rack.webp',
      hoverImage: '/images/entryway/Brio_Rattan_Shoe_Rack (1).webp',
      status: 'Made To Order',
      emi: '₹ 5337.73',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 14,
      name: 'Rio Rattan Shoe Chest',
      price: 76415,
      originalPrice: 89900,
      image: '/images/entryway/Rio_Rattan_Shoe_Chest.webp',
      hoverImage: '/images/entryway/Rio_Rattan_Shoe_Chest (1).webp',
      status: 'Made To Order',
      emi: '₹ 8011.05',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 15,
      name: 'Rio Rattan Shoe Console',
      price: 101915,
      originalPrice: 119900,
      image: '/images/entryway/Rio_Rattan_Shoe_Console.webp',
      hoverImage: '/images/entryway/Rio_Rattan_Shoe_Console (1).webp',
      status: 'Made To Order',
      emi: '₹ 10684.37',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 16,
      name: 'Rio Rattan Shoe Rack',
      price: 50915,
      originalPrice: 59900,
      image: '/images/entryway/Rio_Rattan_Shoe_Rack.webp',
      hoverImage: '/images/entryway/Rio_Rattan_Shoe_Rack (1).webp',
      status: 'Made To Order',
      emi: '₹ 5337.73',
      category: 'Shoe Cabinet',
      discount: 15,
    },
    {
      id: 17,
      name: 'Richmond Divider Console',
      price: 102000,
      originalPrice: 120000,
      image: '/images/entryway/Richmond_Divider_Console.webp',
      hoverImage: '/images/entryway/Richmond_Divider_Console (1).webp',
      status: 'Made To Order',
      emi: '₹ 10693.28',
      category: 'Consoles',
      discount: 15,
    },
    {
      id: 18,
      name: 'Ahava Treo Pebble Console',
      price: 76230,
      originalPrice: 108900,
      image: '/images/entryway/Ahava_Treo_Pebble_Console.webp',
      badge: 'Top Rated',
      status: 'Ready To Ship',
      emi: '₹ 7991.65',
      category: 'Consoles',
      discount: 30,
    },
    {
      id: 19,
      name: 'Esme Console',
      price: 112200,
      originalPrice: 132000,
      image: '/images/entryway/Esme_Console.webp',
      hoverImage: '/images/entryway/Esme_Console (1).webp',
      status: 'Made To Order',
      emi: '₹ 11762.6',
      category: 'Consoles',
      discount: 15,
    },
    {
      id: 20,
      name: 'Belmont Console',
      price: 84915,
      originalPrice: 99900,
      image: '/images/entryway/Belmont_Console.webp',
      status: 'Made To Order',
      emi: '₹ 8902.15',
      category: 'Consoles',
      discount: 15,
    },
    {
      id: 21,
      name: 'Saturn Nox Console',
      price: 84550,
      originalPrice: 89000,
      image: '/images/entryway/Saturn_Nox_Console.webp',
      badge: 'Top Rated',
      status: 'Ready To Ship',
      emi: '₹ 8863.89',
      category: 'Consoles',
      discount: 5,
    },
    {
      id: 22,
      name: 'Monroe Upholstered Bench',
      price: 79230,
      originalPrice: 83400,
      image: '/images/entryway/Monroe_Upholstered_Bench.webp',
      status: 'Made To Order',
      emi: '₹ 8306.16',
      category: 'Benches',
      discount: 5,
    },
    {
      id: 23,
      name: 'Nakashi Hand Chiseled Coffee Table | Bench',
      price: 78540,
      originalPrice: 92400,
      image: '/images/entryway/Nakashi_Hand_Chiseled_Coffee_Table_Bench.webp',
      status: 'Made To Order',
      emi: '₹ 8233.82',
      category: 'Benches',
      discount: 15,
    },
    {
      id: 24,
      name: 'Amour Treo Pebble Console - Blue',
      price: 76230,
      originalPrice: 108900,
      image: '/images/entryway/Amour_Treo_Pebble_Console_-_Blue.webp',
      hoverImage: '/images/entryway/Amour_Treo_Pebble_Console_-_Blue (1).webp',
      status: 'Made To Order',
      emi: '₹ 7991.65',
      category: 'Consoles',
      discount: 30,
    },
    {
      id: 25,
      name: 'Amore Shoe Cabinet',
      price: 68880,
      originalPrice: 98400,
      image: '/images/entryway/Amore_Shoe_Cabinet.webp',
      status: 'Made To Order',
      emi: '₹ 7221.11',
      category: 'Shoe Cabinet',
      discount: 30,
    },
    {
      id: 26,
      name: 'Saturn Console',
      price: 84550,
      originalPrice: 89000,
      image: '/images/entryway/Saturn_Console.webp',
      hoverImage: '/images/entryway/Saturn_Console (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 8863.89',
      category: 'Consoles',
      discount: 5,
    },
    {
      id: 27,
      name: 'Amour Treo Pebble Console',
      price: 76230,
      originalPrice: 108900,
      image: '/images/entryway/Amour_Treo_Pebble_Console.webp',
      status: 'Made To Order',
      emi: '₹ 7991.65',
      category: 'Consoles',
      discount: 30,
    },
    {
      id: 28,
      name: 'Sinag Bench',
      price: 39900,
      image: '/images/entryway/Sinag_Bench.webp',
      status: 'Ready To Ship',
      emi: '₹ 4182.96',
      category: 'Benches',
    },
    {
      id: 29,
      name: 'Meraki Upholstered Bench',
      price: 71250,
      originalPrice: 75000,
      image: '/images/entryway/Meraki_Upholstered_Bench.webp',
      status: 'Made To Order',
      emi: '₹ 7469.57',
      category: 'Benches',
      discount: 5,
    },
    {
      id: 30,
      name: 'Ebba Upholstered Bench',
      price: 72675,
      image: '/images/entryway/Ebba_Upholstered_Bench.webp',
      status: 'Made To Order',
      emi: '₹ 7618.96',
      category: 'Benches',
    },
    {
      id: 31,
      name: 'Kairos Console Table (4 drawers)',
      price: 106165,
      originalPrice: 124900,
      image: '/images/entryway/Kairos_Console_Table_4_drawers.webp',
      hoverImage: '/images/entryway/Kairos_Console_Table_4_drawers (1).webp',
      badge: 'Designer\'s Pick',
      status: 'Made To Order',
      emi: '₹ 11129.92',
      category: 'Console Tables',
      discount: 15,
    },
    {
      id: 32,
      name: 'Dante Upholstered Bench',
      price: 61655,
      image: '/images/entryway/Dante_Upholstered_Bench.webp',
      hoverImage: '/images/entryway/Dante_Upholstered_Bench (1).webp',
      status: 'Made To Order',
      emi: '₹ 6463.67',
      category: 'Benches',
    },
    {
      id: 33,
      name: 'Maisie Rattan Shoe Rack -Golden Teak-M',
      price: 73710,
      originalPrice: 81900,
      image: '/images/entryway/Maisie_Rattan_Shoe_Rack_-Golden_Teak-M.webp',
      status: 'Made To Order',
      emi: '₹ 7727.47',
      category: 'Shoe Cabinet',
      size: 'M',
      discount: 10,
    },
    {
      id: 34,
      name: 'Maisie Rattan Shoe Rack -Golden Teak-L',
      price: 89010,
      originalPrice: 98900,
      image: '/images/entryway/Maisie_Rattan_Shoe_Rack_-Golden_Teak-L.webp',
      badge: 'Best Seller',
      status: 'Made To Order',
      emi: '₹ 9331.46',
      category: 'Shoe Cabinet',
      size: 'L',
      discount: 10,
    },
    {
      id: 35,
      name: 'Milana Rattan Shoe Rack (Duo)',
      price: 96300,
      originalPrice: 107000,
      image: '/images/entryway/Milana_Rattan_Shoe_Rack_Duo.webp',
      status: 'Made To Order',
      emi: '₹ 10095.71',
      category: 'Shoe Cabinet',
      discount: 10,
    },
    {
      id: 36,
      name: 'Oliana Rattan Shoe Rack (Duo)',
      price: 96300,
      originalPrice: 107000,
      image: '/images/entryway/Oliana_Rattan_Shoe_Rack_Duo.webp',
      status: 'Made To Order',
      emi: '₹ 10095.71',
      category: 'Shoe Cabinet',
      discount: 10,
    },
    {
      id: 37,
      name: 'Chaussure Louvered Shoe Rack (Duo)',
      price: 96300,
      originalPrice: 107000,
      image: '/images/entryway/Chaussure_Louvered_Shoe_Rack_Duo.webp',
      badge: 'Top Rated',
      status: 'Made To Order',
      emi: '₹ 10095.71',
      category: 'Shoe Cabinet',
      discount: 10,
    },
    {
      id: 38,
      name: 'Chaussure Louvered Shoe Rack (L)',
      price: 51300,
      originalPrice: 57000,
      image: '/images/entryway/Chaussure_Louvered_Shoe_Rack_L.webp',
      hoverImage: '/images/entryway/Chaussure_Louvered_Shoe_Rack_L (1).webp',
      status: 'Made To Order',
      emi: '₹ 5378.09',
      category: 'Shoe Cabinet',
      size: 'L',
      discount: 10,
    },
    {
      id: 39,
      name: 'Oliana Rattan Shoe Rack (L)',
      price: 51300,
      originalPrice: 57000,
      image: '/images/entryway/Oliana_Rattan_Shoe_Rack_L.webp',
      hoverImage: '/images/entryway/Oliana_Rattan_Shoe_Rack_L (1).webp',
      status: 'Made To Order',
      emi: '₹ 5378.09',
      category: 'Shoe Cabinet',
      size: 'L',
      discount: 10,
    },
    {
      id: 40,
      name: 'Milana Rattan Shoe Rack (L)',
      price: 51300,
      originalPrice: 57000,
      image: '/images/entryway/Milana_Rattan_Shoe_Rack_L.webp',
      hoverImage: '/images/entryway/Milana_Rattan_Shoe_Rack_L (1).webp',
      status: 'Made To Order',
      emi: '₹ 5378.09',
      category: 'Shoe Cabinet',
      size: 'L',
      discount: 10,
    },
    {
      id: 41,
      name: 'Sitar Upholstered Bench',
      price: 54400,
      originalPrice: 64000,
      image: '/images/entryway/Sitar_Upholstered_Bench.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 5703.08',
      category: 'Benches',
      discount: 15,
    },
    {
      id: 42,
      name: 'Kaatre Rattan Swing',
      price: 98910,
      originalPrice: 113850,
      image: '/images/entryway/Kaatre_Rattan_Swing.webp',
      hoverImage: '/images/entryway/Kaatre_Rattan_Swing (1).webp',
      badge: 'Best Seller',
      status: 'Made To Order',
      emi: '₹ 11935.58',
      category: 'Swing',
      discount: 13,
    },
    {
      id: 43,
      name: 'Moon Rattan Two-Seater Bench',
      price: 53000,
      image: '/images/entryway/Moon_Rattan_Two-Seater_Bench.webp',
      hoverImage: '/images/entryway/Moon_Rattan_Two-Seater_Bench (1).webp',
      status: 'Made To Order',
      emi: '₹ 5556.31',
      category: 'Benches',
    },
    {
      id: 44,
      name: 'Moon Rattan Three-Seater Bench',
      price: 72900,
      image: '/images/entryway/Moon_Rattan_Three-Seater_Bench.webp',
      status: 'Made To Order',
      emi: '₹ 7642.55',
      category: 'Benches',
    },
    {
      id: 45,
      name: 'Moon Rattan Four-Seater Bench',
      price: 98900,
      image: '/images/entryway/Moon_Rattan_Four-Seater_Bench.webp',
      hoverImage: '/images/entryway/Moon_Rattan_Four-Seater_Bench (1).webp',
      status: 'Made To Order',
      emi: '₹ 10368.29',
      category: 'Benches',
    },
    {
      id: 46,
      name: 'Calypso Bolster Diwan',
      price: 118490,
      image: '/images/entryway/Calypso_Bolster_Diwan.webp',
      badge: 'Trending Now',
      status: 'Made To Order',
      emi: '₹ 12422.02',
      category: 'Daybeds & Diwans',
    },
    {
      id: 47,
      name: 'Nakashi Dining Bench',
      price: 0, // Price not shown in reference
      image: '/images/entryway/Nakashi_Dining_Bench.webp',
      hoverImage: '/images/entryway/Nakashi_Dining_Bench (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Benches',
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Product type filter
    if (filters.productType.length > 0 && !filters.productType.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    // Size filter
    if (filters.size.length > 0 && product.size && !filters.size.includes(product.size)) {
      return false;
    }

    // Discount filter
    if (filters.discount.length > 0) {
      const hasMatchingDiscount = filters.discount.some((discountThreshold) => {
        if (!product.discount) return false;
        return product.discount >= discountThreshold;
      });
      if (!hasMatchingDiscount) return false;
    }

    return true;
  });

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId.toString());
  };

  const toggleWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const toggleFilter = (filterType: 'productType' | 'size', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const toggleDiscountFilter = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      discount: prev.discount.includes(value)
        ? prev.discount.filter((item) => item !== value)
        : [...prev.discount, value],
    }));
  };

  // Calculate product type counts
  const productTypeCounts = {
    'Shoe Cabinet': products.filter(p => p.category === 'Shoe Cabinet').length,
    'Benches': products.filter(p => p.category === 'Benches').length,
    'Console Tables': products.filter(p => p.category === 'Console Tables').length,
    'Consoles': products.filter(p => p.category === 'Consoles').length,
    'Daybeds & Diwans': products.filter(p => p.category === 'Daybeds & Diwans').length,
    'Center Tables': products.filter(p => p.category === 'Center Tables').length,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/furniture" className="hover:text-gray-900">Furniture</Link>
            <span>/</span>
            <span className="text-gray-900">Entryway</span>
          </div>
        </div>
      </div>

      {/* Category Navigation Carousel */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6 relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div
            id="category-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 group cursor-pointer"
              >
                {/* Horizontal Card: Text Left, Image Right */}
                <div className="flex items-center gap-4 min-w-[280px] p-4 border-2 border-gray-200 rounded-lg hover:border-orange-400 transition-colors bg-white">
                  {/* Category Name - Left Side */}
                  <div className="flex-1">
                    <span className="text-base font-medium text-gray-900 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Category Image - Right Side */}
                  <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Browse by</h2>

              {/* Product Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center justify-between">
                  <span>Product Type</span>
                </h3>
                <div className="space-y-2">
                  {Object.entries(productTypeCounts).map(([type, count]) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.productType.includes(type)}
                        onChange={() => toggleFilter('productType', type)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        {type} ({count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={filters.priceRange.min || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: Number(e.target.value) },
                      }))
                    }
                  />
                  <span className="text-sm">to</span>
                  <input
                    type="number"
                    placeholder="₹ 200000"
                    className="w-24 px-2 py-1 border rounded text-sm"
                    value={filters.priceRange.max || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: Number(e.target.value) },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {['L', 'M', '8 feet', '9 feet'].map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.size.includes(size)}
                        onChange={() => toggleFilter('size', size)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{size} ({size === 'L' ? '6' : size === 'M' ? '6' : '1'})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Discount</h3>
                <div className="space-y-2">
                  {[10, 30].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.discount.includes(discount)}
                        onChange={() => toggleDiscountFilter(discount)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{discount}% and above</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">{filteredProducts.length} Results</h1>
              <select className="px-4 py-2 border rounded-md text-sm">
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Discount</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-2 py-1 rounded">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:opacity-0 transition-opacity duration-300"
                      />
                      {product.hoverImage && (
                        <Image
                          src={product.hoverImage}
                          alt={product.name}
                          fill
                          className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.status}
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium text-sm hover:text-orange-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      {product.price > 0 && (
                        <>
                          <span className="font-semibold">₹{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-gray-400 line-through text-sm">
                                ₹{formatPrice(product.originalPrice)}
                              </span>
                              {product.discount && (
                                <span className="text-green-600 text-sm">{product.discount}%Off</span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {product.emi && (
                      <div className="text-xs text-gray-500">EMI starts from {product.emi}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrywayPage;
