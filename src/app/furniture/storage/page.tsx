'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  status?: string;
  emi?: string;
  category: string;
  size?: string;
  configuration?: string;
  discount?: number;
}

const products: Product[] = [
  // Voss Storage Cabinets
  { id: 1, name: 'Voss Reaper Multifunctional Storage Cabinet - Dual Shade', price: 118900, image: '/images/storage/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Dual.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  { id: 2, name: 'Voss Reaper Multifunctional Storage Cabinet - Golden Teak', price: 118900, image: '/images/storage/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Gold.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  { id: 3, name: 'Voss Reaper Multifunctional Storage Cabinet - Carbon Black', price: 118900, image: '/images/storage/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Carb.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  
  // Buffets & Consoles
  { id: 4, name: 'Monarch Buffet Sideboard Console', price: 120700, originalPrice: 142000, image: '/images/storage/Monarch_Buffet_Sideboard_Console.webp', hoverImage: '/images/storage/Monarch_Buffet_Sideboard_Console (1).webp', status: 'Made To Order', emi: '₹ 12653.71', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 5, name: 'Astle Display Storage Cabinet', price: 99000, image: '/images/storage/Astle_Display_Storage_Cabinet.webp', status: 'Made To Order', emi: '₹ 10378.77', category: 'Bookcase & Shelves' },
  { id: 6, name: 'Rigel Open Display Metal Shelf', price: 89900, image: '/images/storage/Rigel_Open_Display_Metal_Shelf.webp', hoverImage: '/images/storage/Rigel_Open_Display_Metal_Shelf (1).webp', status: 'Made To Order', emi: '₹ 9424.76', category: 'Bookcase & Shelves' },
  { id: 7, name: 'Alder Open Display Shelf', price: 94905, originalPrice: 99900, image: '/images/storage/Alder_Open_Display_Shelf.webp', hoverImage: '/images/storage/Alder_Open_Display_Shelf (1).webp', status: 'Made To Order', emi: '₹ 9949.47', category: 'Bookcase & Shelves', discount: 5 },
  
  // Satori Collection
  { id: 8, name: 'Satori Rattan Buffet Console', price: 101915, originalPrice: 119900, image: '/images/storage/Satori_Rattan_Buffet_Console.webp', hoverImage: '/images/storage/Satori_Rattan_Buffet_Console (1).webp', status: 'Made To Order', emi: '₹ 10684.37', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 9, name: 'Satori Rattan Console', price: 59415, originalPrice: 69900, image: '/images/storage/Satori_Rattan_Console.webp', hoverImage: '/images/storage/Satori_Rattan_Console (1).webp', status: 'Made To Order', emi: '₹ 6228.83', category: 'Consoles', discount: 15, size: 'M' },
  { id: 10, name: 'Satori Rattan Chest Console', price: 89675, originalPrice: 105500, image: '/images/storage/Satori_Rattan_Chest_Console.webp', hoverImage: '/images/storage/Satori_Rattan_Chest_Console (1).webp', status: 'Made To Order', emi: '₹ 9401.17', category: 'Consoles', discount: 15, size: 'M' },
  { id: 11, name: 'Satori Reaper Console', price: 63665, originalPrice: 74900, image: '/images/storage/Satori_Reaper_Console.webp', hoverImage: '/images/storage/Satori_Reaper_Console (1).webp', status: 'Made To Order', emi: '₹ 6674.39', category: 'Consoles', discount: 15, size: 'M' },
  { id: 12, name: 'Satori Rattan Buffet Console (Natural)', price: 101915, originalPrice: 119900, image: '/images/storage/Satori_Rattan_Buffet_Console_Natural.webp', hoverImage: '/images/storage/Satori_Rattan_Buffet_Console_Natural (1).webp', status: 'Made To Order', emi: '₹ 10684.37', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 13, name: 'Satori Rattan Console (Natural)', price: 59415, originalPrice: 69900, image: '/images/storage/Satori_Rattan_Console_Natural.webp', hoverImage: '/images/storage/Satori_Rattan_Console_Natural (1).webp', status: 'Made To Order', emi: '₹ 6228.83', category: 'Consoles', discount: 15, size: 'M' },
  { id: 14, name: 'Satori Rattan Chest Console (Natural)', price: 89675, originalPrice: 105500, image: '/images/storage/Satori_Rattan_Chest_Console_Natural.webp', status: 'Made To Order', emi: '₹ 9401.17', category: 'Consoles', discount: 15, size: 'M' },
  
  // Samara Media Consoles
  { id: 15, name: 'Samara Fluted Media Console', price: 101915, originalPrice: 119900, image: '/images/storage/Samara_Fluted_Media_Console.webp', status: 'Made To Order', emi: '₹ 10684.37', category: 'Media Unit', discount: 15, size: 'M' },
  { id: 16, name: 'Samara Modular Fluted Media Console with 2 Tall Cabinets', price: 271915, originalPrice: 319900, image: '/images/storage/Samara_Modular_Fluted_Media_Console_with_2_Tall_Ca.webp', status: 'Ready To Ship', emi: '₹ 28506.49', category: 'Media Unit', discount: 15, size: 'L' },
  { id: 17, name: 'Samara Modular Media Console with 2 Tall Cabinets', price: 254915, originalPrice: 299900, image: '/images/storage/Samara_Modular_Media_Console_with_2_Tall_Cabinets.webp', status: 'Made To Order', emi: '₹ 26724.28', category: 'Media Unit', discount: 15, size: 'L' },
  { id: 18, name: 'Samara Modular Rattan Media Console with 2 Tall Cabinets', price: 254915, originalPrice: 299900, image: '/images/storage/Samara_Modular_Rattan_Media_Console_with_2_Tall_Ca.webp', status: 'Made To Order', emi: '₹ 26724.28', category: 'Media Unit', discount: 15, size: 'L' },
  
  // Display Consoles
  { id: 19, name: 'Spencer Open Display Console', price: 76415, originalPrice: 89900, image: '/images/storage/Spencer_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 8011.05', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 20, name: 'Whitmore Buffet Console', price: 129200, originalPrice: 152000, image: '/images/storage/Whitmore_Buffet_Console.webp', status: 'Made To Order', emi: '₹ 13544.82', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 21, name: 'Paros Accent Console', price: 103700, originalPrice: 122000, image: '/images/storage/Paros_Accent_Console.webp', status: 'Made To Order', emi: '₹ 10871.5', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 22, name: 'Heron Display Console', price: 86700, originalPrice: 102000, image: '/images/storage/Heron_Display_Console.webp', status: 'Made To Order', emi: '₹ 9089.29', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 23, name: 'Kleon Storage Console', price: 95965, originalPrice: 112900, image: '/images/storage/Kleon_Storage_Console.webp', status: 'Made To Order', emi: '₹ 10060.59', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 24, name: 'Ares Chest Console', price: 100300, originalPrice: 118000, image: '/images/storage/Ares_Chest_Console.webp', status: 'Made To Order', emi: '₹ 10515.06', category: 'Consoles', discount: 15, size: 'M' },
  { id: 25, name: 'Marios Storage Chest', price: 92990, originalPrice: 109400, image: '/images/storage/Marios_Storage_Chest.webp', status: 'Made To Order', emi: '₹ 9748.7', category: 'Chest of Drawers', discount: 15, size: 'M' },
  { id: 26, name: 'Aegean Harmony Console', price: 69750, originalPrice: 93000, image: '/images/storage/Aegean_Harmony_Console.webp', status: 'Made To Order', emi: '₹ 7312.31', category: 'Console Tables', discount: 25, size: 'M' },
  { id: 27, name: 'Nestor Elements Console', price: 89925, originalPrice: 119900, image: '/images/storage/Nestor_Elements_Console.webp', status: 'Made To Order', emi: '₹ 9427.38', category: 'Console Tables', discount: 25, size: 'L' },
  { id: 28, name: 'Irene Serenity Chest', price: 42500, originalPrice: 50000, image: '/images/storage/Irene_Serenity_Chest.webp', status: 'Made To Order', emi: '₹ 4455.53', category: 'Chest of Drawers', discount: 15, size: 'S' },
  
  // Nightstands
  { id: 29, name: 'Barrett Reaper Nightstand', price: 41990, originalPrice: 49400, image: '/images/storage/Barrett_Reaper_Nightstand.webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 30, name: 'Alden Chest of Drawer (S)', price: 75960, originalPrice: 84400, image: '/images/storage/Alden_Chest_of_Drawer_S.webp', status: 'Made To Order', emi: '₹ 7963.35', category: 'Chest of Drawers', discount: 10, size: 'L' },
  { id: 31, name: 'Oxford Bookshelf', price: 95540, originalPrice: 112400, image: '/images/storage/Oxford_Bookshelf.webp', status: 'Made To Order', emi: '₹ 10016.04', category: 'Bookcase & Shelves', discount: 15 },
  { id: 32, name: 'Lydia Nightstand', price: 34340, originalPrice: 40400, image: '/images/storage/Lydia_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 3600.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 33, name: 'Walter Nightstand', price: 41990, originalPrice: 49400, image: '/images/storage/Walter_Nightstand.webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 34, name: 'Kaden Chest Of Drawer', price: 132090, originalPrice: 155400, image: '/images/storage/Kaden_Chest_Of_Drawer.webp', status: 'Made To Order', emi: '₹ 13847.79', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 35, name: 'Kaden Nightstand', price: 44200, originalPrice: 52000, image: '/images/storage/Kaden_Nightstand.webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 36, name: 'Linden Chest Of Drawer', price: 137190, originalPrice: 161400, image: '/images/storage/Linden_Chest_Of_Drawer.webp', status: 'Made To Order', emi: '₹ 14382.46', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 37, name: 'Ashford Glass Console', price: 122740, originalPrice: 144400, image: '/images/storage/Ashford_Glass_Console.webp', status: 'Made To Order', emi: '₹ 12867.58', category: 'Console Tables', discount: 15, size: 'L' },
  { id: 38, name: 'Bolton Open Display Console', price: 80240, originalPrice: 94400, image: '/images/storage/Bolton_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 8412.04', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 39, name: 'Fairmont Open Display Console', price: 71400, originalPrice: 84000, image: '/images/storage/Fairmont_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 7485.29', category: 'Console Tables', discount: 15, size: 'M' },
  { id: 40, name: 'Havanah Buffet Console-Carbon Black-L', price: 122740, originalPrice: 144400, image: '/images/storage/Havanah_Buffet_Console-Carbon_Black-L.webp', status: 'Made To Order', emi: '₹ 12867.58', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 41, name: 'Barrett Reaper Sideboard Console-M', price: 131665, originalPrice: 154900, image: '/images/storage/Barrett_Reaper_Sideboard_Console-M.webp', status: 'Made To Order', emi: '₹ 13803.24', category: 'Sideboards', discount: 15, size: 'M' },
  { id: 42, name: 'Barrett Reaper Sideboard Console-S', price: 116790, originalPrice: 137400, image: '/images/storage/Barrett_Reaper_Sideboard_Console-S.webp', status: 'Made To Order', emi: '₹ 12243.8', category: 'Sideboards', discount: 15, size: 'S' },
  { id: 43, name: 'Walter Chest Of Drawer/Console', price: 107100, originalPrice: 126000, image: '/images/storage/Walter_Chest_Of_DrawerConsole.webp', status: 'Made To Order', emi: '₹ 11227.94', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 44, name: 'Gideon Console Table/ Sideboard', price: 145690, originalPrice: 171400, image: '/images/storage/Gideon_Console_Table_Sideboard.webp', status: 'Made To Order', emi: '₹ 15273.56', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 45, name: 'Tambur Chest Of Drawer', price: 144415, originalPrice: 169900, image: '/images/storage/Tambur_Chest_Of_Drawer.webp', status: 'Made To Order', emi: '₹ 15139.9', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 46, name: 'Linden Nightstand', price: 44200, originalPrice: 52000, image: '/images/storage/Linden_Nightstand.webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 47, name: 'Barrett Reaper Sideboard Console - Golden Teak - L', price: 140250, originalPrice: 165000, image: '/images/storage/Barrett_Reaper_Sideboard_Console_-_Golden_Teak_-_L.webp', status: 'Made To Order', emi: '₹ 14703.26', category: 'Sideboards', discount: 15, size: 'L' },
  { id: 48, name: 'Daniel Nightstand', price: 44200, originalPrice: 52000, image: '/images/storage/Daniel_Nightstand.webp', hoverImage: '/images/storage/Daniel_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  
  // Additional Storage Items
  { id: 49, name: 'Kaleb Nightstand', price: 44200, originalPrice: 52000, image: '/images/storage/Kaleb_Nightstand.webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 50, name: 'Sylvie Nightstand', price: 34340, originalPrice: 40400, image: '/images/storage/Sylvie_Nightstand.webp', status: 'Made To Order', emi: '₹ 3600.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 51, name: 'Enzo Nightstand', price: 29665, originalPrice: 34900, image: '/images/storage/Enzo_Nightstand.webp', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 52, name: 'Thea Nightstand', price: 41990, originalPrice: 49400, image: '/images/storage/Thea_Nightstand.webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 53, name: 'Pierre Nightstand', price: 29665, originalPrice: 34900, image: '/images/storage/Pierre_Nightstand.webp', hoverImage: '/images/storage/Pierre_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 54, name: 'Vesto Nightstand', price: 32215, originalPrice: 37900, image: '/images/storage/Vesto_Nightstand.webp', status: 'Made To Order', emi: '₹ 3377.29', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 55, name: 'Kobbler Tan Nightstand', price: 29665, originalPrice: 34900, image: '/images/storage/Kobbler_Tan_Nightstand.webp', hoverImage: '/images/storage/Kobbler_Tan_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 56, name: 'Anisa Nightstand', price: 41990, originalPrice: 49400, image: '/images/storage/Anisa_Nightstand.webp', hoverImage: '/images/storage/Anisa_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 57, name: 'Nestling Nightstand', price: 40400, image: '/images/storage/Nestling_Nightstand.webp', status: 'Made To Order', emi: '₹ 4235.38', category: 'Bedside Table', size: 'M' },
  { id: 58, name: 'Sueno Chest of Drawers | Storage Unit', price: 107100, originalPrice: 119000, image: '/images/storage/Sueno_Chest_of_Drawers_Storage_Unit.webp', status: 'Made To Order', emi: '₹ 11227.94', category: 'Chest of Drawers', discount: 10, size: 'L' },
  { id: 59, name: 'Karma Display Rack', price: 94690, originalPrice: 111400, image: '/images/storage/Karma_Display_Rack.webp', status: 'Made To Order', emi: '₹ 9926.93', category: 'Bookcase & Shelves', discount: 15 },
  { id: 60, name: 'Sinag Buffet Console', price: 164900, image: '/images/storage/Sinag_Buffet_Console.webp', status: 'Made To Order', emi: '₹ 17293.18', category: 'Sideboards', size: 'L' },
  { id: 61, name: 'Travancore Chooral Console', price: 174900, image: '/images/storage/Travancore_Chooral_Console.webp', status: 'Made To Order', emi: '₹ 18342.18', category: 'Sideboards', size: 'L' },
  { id: 62, name: 'Sterling Buffet Console - Pearl Blue', price: 164900, image: '/images/storage/Sterling_Buffet_Console_-_Pearl_Blue.webp', status: 'Made To Order', emi: '₹ 17293.18', category: 'Sideboards', size: 'L' },
  { id: 63, name: 'Novel Rattan Sideboard Console', price: 133900, image: '/images/storage/Novel_Rattan_Sideboard_Console.webp', status: 'Made To Order', emi: '₹ 14038.1', category: 'Sideboards', size: 'L' },
  { id: 64, name: 'Merino Buffet Console', price: 164900, image: '/images/storage/Merino_Buffet_Console.webp', status: 'Made To Order', emi: '₹ 17293.18', category: 'Sideboards', size: 'L' },
];

export default function StoragePage() {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    price: { min: 0, max: 300000 },
    size: [] as string[],
    configuration: [] as string[],
    discount: 0,
  });
  const [sortBy, setSortBy] = useState('featured');

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

  const productTypeCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeCounts = products.reduce((acc, product) => {
    if (product.size) {
      acc[product.size] = (acc[product.size] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const configurationCounts = products.reduce((acc, product) => {
    if (product.configuration) {
      acc[product.configuration] = (acc[product.configuration] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const filteredProducts = products.filter((product) => {
    if (filters.productType.length > 0 && !filters.productType.includes(product.category)) return false;
    if (product.price < filters.price.min || product.price > filters.price.max) return false;
    if (filters.size.length > 0 && (!product.size || !filters.size.includes(product.size))) return false;
    if (filters.configuration.length > 0 && (!product.configuration || !filters.configuration.includes(product.configuration))) return false;
    if (filters.discount > 0 && (!product.discount || product.discount < filters.discount)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link href="/furniture" className="hover:text-orange-500">Furniture</Link>
          <span>/</span>
          <span className="text-gray-900">Storage Furniture</span>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Storage Furniture</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Browse by</h3>

              {/* Product Type */}
              <div className="mb-6">
                <div className="space-y-2">
                  {Object.entries(productTypeCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, count]) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.productType.includes(type)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              productType: e.target.checked
                                ? [...filters.productType, type]
                                : filters.productType.filter((t) => t !== type),
                            });
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{type} ({count})</span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price</h4>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.price.min}
                    onChange={(e) => setFilters({ ...filters, price: { ...filters.price, min: Number(e.target.value) } })}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.price.max}
                    onChange={(e) => setFilters({ ...filters, price: { ...filters.price, max: Number(e.target.value) } })}
                    className="w-28 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              {/* Size */}
              {Object.keys(sizeCounts).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Size</h4>
                  <div className="space-y-2">
                    {Object.entries(sizeCounts).map(([size, count]) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.size.includes(size)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              size: e.target.checked
                                ? [...filters.size, size]
                                : filters.size.filter((s) => s !== size),
                            });
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{size} ({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Configuration */}
              {Object.keys(configurationCounts).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Configuration</h4>
                  <div className="space-y-2">
                    {Object.entries(configurationCounts).map(([config, count]) => (
                      <label key={config} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.configuration.includes(config)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              configuration: e.target.checked
                                ? [...filters.configuration, config]
                                : filters.configuration.filter((c) => c !== config),
                            });
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{config} ({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Discount</h4>
                <div className="space-y-2">
                  {[10, 20, 30].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="discount"
                        checked={filters.discount === discount}
                        onChange={() => setFilters({ ...filters, discount })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{discount}% and above</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{sortedProducts.length} Results</p>
              <div className="flex items-center gap-2">
                <label className="text-sm">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:opacity-0 transition-opacity"
                    />
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium rounded">
                        {product.badge}
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {product.status && (
                      <p className="text-xs text-gray-500">{product.status}</p>
                    )}
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-red-500 font-medium">
                              {product.discount}%Off
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    {product.emi && (
                      <p className="text-xs text-gray-500">EMI starts from {product.emi}</p>
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
}
