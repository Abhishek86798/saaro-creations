'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown, Heart } from 'lucide-react';
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
  discount?: number;
  configuration?: string;
}

const products: Product[] = [
  // Wardrobes
  { id: 1, name: 'Zigzag Wardrobe 4 Shutter', price: 237405, originalPrice: 273030, image: '/images/bedroom/Zigzag_Wardrobe_4_Shutter.webp', status: 'Made To Order', emi: '₹ 28623.39', category: 'Armoires | Wardrobes', configuration: 'SS + RR' },
  { id: 2, name: 'Zigzag Wardrobe 2 Shutter', price: 130530, originalPrice: 153805, image: '/images/bedroom/Zigzag_Wardrobe_2_Shutter.webp', status: 'Made To Order', emi: '₹ 16124.31', category: 'Armoires | Wardrobes', configuration: 'S + R' },
  { id: 3, name: 'Barrett Reaper Wardrobe - 2 Shutter', price: 164400, originalPrice: 174400, image: '/images/bedroom/Barrett_Reaper_Wardrobe_-_2_Shutter.webp', hoverImage: '/images/bedroom/Barrett_Reaper_Wardrobe_-_2_Shutter (1).webp', status: 'Made To Order', emi: '₹ 18283.41', category: 'Armoires | Wardrobes', configuration: 'S + R' },
  { id: 4, name: 'Barrett Reaper Wardrobe - 4 Shutter', price: 328500, originalPrice: 348500, image: '/images/bedroom/Barrett_Reaper_Wardrobe_-_4_Shutter.webp', status: 'Made To Order', emi: '₹ 36535.36', category: 'Armoires | Wardrobes', configuration: 'SS + RR' },
  { id: 5, name: 'Laraah Wardrobe - 4 Shutter', price: 220830, originalPrice: 246500, image: '/images/bedroom/Laraah_Wardrobe_-_4_Shutter.webp', hoverImage: '/images/bedroom/Laraah_Wardrobe_-_4_Shutter (1).webp', status: 'Made To Order', emi: '₹ 25842.09', category: 'Armoires | Wardrobes', configuration: 'SS + RR' },
  { id: 6, name: 'Laraah Wardrobe - 2 Shutter', price: 110415, originalPrice: 123250, image: '/images/bedroom/Laraah_Wardrobe_-_2_Shutter.webp', hoverImage: '/images/bedroom/Laraah_Wardrobe_-_2_Shutter (1).webp', status: 'Made To Order', emi: '₹ 12921.04', category: 'Armoires | Wardrobes', configuration: 'S + R' },
  { id: 7, name: 'Celeste Rattan Armoire', price: 260865, originalPrice: 285090, image: '/images/bedroom/Celeste_Rattan_Armoire.webp', hoverImage: '/images/bedroom/Celeste_Rattan_Armoire (1).webp', status: 'Made To Order', emi: '₹ 29887.71', category: 'Armoires | Wardrobes', configuration: 'SR + RS' },
  { id: 8, name: 'Timon Glass Shutter Armoire', price: 128350, originalPrice: 146200, image: '/images/bedroom/Timon_Glass_Shutter_Armoire.webp', status: 'Made To Order', emi: '₹ 15327.03', category: 'Armoires | Wardrobes', configuration: 'Shelves + Railing' },
  { id: 9, name: 'Hermes Rattan Shutter Armoire', price: 137700, originalPrice: 146200, image: '/images/bedroom/Hermes_Rattan_Shutter_Armoire.webp', status: 'Made To Order', emi: '₹ 15327.03', category: 'Armoires | Wardrobes', configuration: 'Railing' },
  { id: 10, name: 'Astle Display Storage Cabinet', price: 99000, image: '/images/bedroom/Astle_Display_Storage_Cabinet.webp', status: 'Made To Order', emi: '₹ 10378.77', category: 'Armoires | Wardrobes', configuration: 'Shelves (S)' },
  
  // Beds
  { id: 11, name: 'Rylaan Bed Cot-Single', price: 102000, originalPrice: 120000, image: '/images/bedroom/Rylaan_Bed_Cot-Single.webp', status: 'Made To Order', emi: '₹ 10693.28', category: 'Beds', discount: 15, size: 'Queen' },
  { id: 12, name: 'Palmira Poster Bed Cot', price: 200830, originalPrice: 212705, image: '/images/bedroom/Palmira_Poster_Bed_Cot.webp', badge: 'New', status: 'Made To Order', emi: '₹ 22299.15', category: 'Beds', size: 'King' },
  { id: 13, name: 'Rylaan Bed Cot', price: 184900, originalPrice: 199900, image: '/images/bedroom/Rylaan_Bed_Cot.webp', status: 'Made To Order', emi: '₹ 20956.73', category: 'Beds', size: 'King' },
  { id: 14, name: 'Liora Classic Rattan Bedcot', price: 158900, originalPrice: 168900, image: '/images/bedroom/Liora_Classic_Rattan_Bedcot.webp', status: 'Made To Order', emi: '₹ 17706.81', category: 'Beds', size: 'King' },
  { id: 15, name: 'Lorraine Poster Bed', price: 188400, originalPrice: 199900, image: '/images/bedroom/Lorraine_Poster_Bed.webp', hoverImage: '/images/bedroom/Lorraine_Poster_Bed (1).webp', status: 'Made To Order', emi: '₹ 20956.73', category: 'Beds', size: 'King' },
  { id: 16, name: 'Weston Woven Bed', price: 123172, originalPrice: 131472, image: '/images/bedroom/Weston_Woven_Bed.webp', hoverImage: '/images/bedroom/Weston_Woven_Bed (1).webp', status: 'Made To Order', emi: '₹ 13783.01', category: 'Beds', size: 'King' },
  { id: 17, name: 'Sapramanja Kattil - Daybed', price: 147740, originalPrice: 178000, image: '/images/bedroom/Sapramanja_Kattil_-_Daybed.webp', hoverImage: '/images/bedroom/Sapramanja_Kattil_-_Daybed (1).webp', status: 'Made To Order', emi: '₹ 15488.48', category: 'Daybeds & Diwans', discount: 17 },
  { id: 18, name: 'Lydia Bedcot', price: 138900, originalPrice: 148900, image: '/images/bedroom/Lydia_Bedcot.webp', hoverImage: '/images/bedroom/Lydia_Bedcot (1).webp', status: 'Made To Order', emi: '₹ 15610.09', category: 'Beds', size: 'King' },
  { id: 19, name: 'Magnus Four Poster Bed', price: 199900, originalPrice: 209900, image: '/images/bedroom/Magnus_Four_Poster_Bed.webp', status: 'Made To Order', emi: '₹ 22005.09', category: 'Beds', size: 'King' },
  { id: 20, name: 'Airi Rattan Bedcot', price: 144900, originalPrice: 154900, image: '/images/bedroom/Airi_Rattan_Bedcot.webp', status: 'Made To Order', emi: '₹ 16239.1', category: 'Beds', size: 'King' },
  { id: 21, name: 'Aanya Bed Cot', price: 184400, originalPrice: 194400, image: '/images/bedroom/Aanya_Bed_Cot.webp', status: 'Made To Order', emi: '₹ 20380.13', category: 'Beds', size: 'King' },
  { id: 22, name: 'Aanya Rattan Bed Cot', price: 165900, originalPrice: 175900, image: '/images/bedroom/Aanya_Rattan_Bed_Cot.webp', hoverImage: '/images/bedroom/Aanya_Rattan_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 18440.66', category: 'Beds', size: 'King' },
  { id: 23, name: 'Hektor Four Poster Bed', price: 163427, originalPrice: 171727, image: '/images/bedroom/Hektor_Four_Poster_Bed.webp', hoverImage: '/images/bedroom/Hektor_Four_Poster_Bed (1).webp', status: 'Made To Order', emi: '₹ 18003.18', category: 'Beds', size: 'King' },
  { id: 24, name: 'Oliver Tufted Bed Cot', price: 189900, originalPrice: 199900, image: '/images/bedroom/Oliver_Tufted_Bed_Cot.webp', hoverImage: '/images/bedroom/Oliver_Tufted_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 20956.73', category: 'Beds', size: 'King' },
  { id: 25, name: 'Moscow Upholstered Bed Cot', price: 188400, originalPrice: 198400, image: '/images/bedroom/Moscow_Upholstered_Bed_Cot.webp', status: 'Made To Order', emi: '₹ 20799.47', category: 'Beds', size: 'King' },
  { id: 26, name: 'Felix Upholstered Bed Cot', price: 168400, originalPrice: 178400, image: '/images/bedroom/Felix_Upholstered_Bed_Cot.webp', status: 'Made To Order', emi: '₹ 18702.75', category: 'Beds', size: 'King' },
  { id: 27, name: 'Sabie Upholstered Bed Cot', price: 174400, originalPrice: 184400, image: '/images/bedroom/Sabie_Upholstered_Bed_Cot.webp', hoverImage: '/images/bedroom/Sabie_Upholstered_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 19331.77', category: 'Beds', size: 'King' },
  { id: 28, name: 'Candella Poster Bedcot', price: 171000, originalPrice: 182875, image: '/images/bedroom/Candella_Poster_Bedcot.webp', status: 'Made To Order', emi: '₹ 19171.89', category: 'Beds', size: 'King' },
  { id: 29, name: 'Mellow Upholstered Winged Bed Cot', price: 188400, image: '/images/bedroom/Mellow_Upholstered_Winged_Bed_Cot.webp', hoverImage: '/images/bedroom/Mellow_Upholstered_Winged_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 19751.11', category: 'Beds', size: 'King' },
  { id: 30, name: 'Nestling Bed Cot', price: 175000, originalPrice: 185000, image: '/images/bedroom/Nestling_Bed_Cot.webp', hoverImage: '/images/bedroom/Nestling_Bed_Cot (1).webp', badge: 'Show Stopper', status: 'Made To Order', emi: '₹ 19394.67', category: 'Beds', size: 'King' },
  { id: 31, name: 'Kobbler Tan Bed Cot', price: 119852, originalPrice: 128152, image: '/images/bedroom/Kobbler_Tan_Bed_Cot.webp', hoverImage: '/images/bedroom/Kobbler_Tan_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 13434.95', category: 'Beds', size: 'King' },
  { id: 32, name: 'Handcarved Leon Rattan Bed Cot- TB', price: 164400, image: '/images/bedroom/Handcarved_Leon_Rattan_Bed_Cot-_TB.webp', hoverImage: '/images/bedroom/Handcarved_Leon_Rattan_Bed_Cot-_TB (1).webp', status: 'Made To Order', emi: '₹ 17235.05', category: 'Beds', size: 'King' },
  { id: 33, name: 'Anouk Upholstered Bed Cot', price: 151900, originalPrice: 161900, image: '/images/bedroom/Anouk_Upholstered_Bed_Cot.webp', hoverImage: '/images/bedroom/Anouk_Upholstered_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 16972.96', category: 'Beds', size: 'King' },
  { id: 34, name: 'Aida Poster Bed Cot', price: 164400, originalPrice: 174400, image: '/images/bedroom/Aida_Poster_Bed_Cot.webp', hoverImage: '/images/bedroom/Aida_Poster_Bed_Cot (1).webp', status: 'Made To Order', emi: '₹ 18283.41', category: 'Beds', size: 'King' },
  
  // Nightstands
  { id: 35, name: 'Barrett Reaper Nightstand', price: 41990, originalPrice: 49400, image: '/images/bedroom/Barrett_Reaper_Nightstand.webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 36, name: 'Lydia Nightstand', price: 34340, originalPrice: 40400, image: '/images/bedroom/Lydia_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 3600.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 37, name: 'Walter Nightstand', price: 41990, originalPrice: 49400, image: '/images/bedroom/Walter_Nightstand.webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 38, name: 'Kaden Nightstand', price: 44200, originalPrice: 52000, image: '/images/bedroom/Kaden_Nightstand.webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 39, name: 'Linden Nightstand', price: 44200, originalPrice: 52000, image: '/images/bedroom/Linden_Nightstand.webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 40, name: 'Daniel Nightstand', price: 44200, originalPrice: 52000, image: '/images/bedroom/Daniel_Nightstand.webp', hoverImage: '/images/bedroom/Daniel_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 41, name: 'Anisa Nightstand', price: 41990, originalPrice: 49400, image: '/images/bedroom/Anisa_Nightstand.webp', hoverImage: '/images/bedroom/Anisa_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 42, name: 'Kaleb Nightstand', price: 44200, originalPrice: 52000, image: '/images/bedroom/Kaleb_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 4633.75', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 43, name: 'Sylvie Nightstand', price: 34340, originalPrice: 40400, image: '/images/bedroom/Sylvie_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 3600.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 44, name: 'Enzo Nightstand', price: 29665, originalPrice: 34900, image: '/images/bedroom/Enzo_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 45, name: 'Thea Nightstand', price: 41990, originalPrice: 49400, image: '/images/bedroom/Thea_Nightstand.webp', badge: 'New', status: 'Made To Order', emi: '₹ 4402.07', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 46, name: 'Cooper Mesh End Table', price: 22865, originalPrice: 26900, image: '/images/bedroom/Cooper_Mesh_End_Table.webp', status: 'Ready To Ship', emi: '₹ 2397.08', category: 'Side Table', discount: 15, size: 'M' },
  { id: 47, name: 'Nestling Nightstand', price: 40400, image: '/images/bedroom/Nestling_Nightstand.webp', badge: 'Show Stopper', status: 'Made To Order', emi: '₹ 4235.38', category: 'Bedside Table', size: 'M' },
  { id: 48, name: 'Kobbler Tan Nightstand', price: 29665, originalPrice: 34900, image: '/images/bedroom/Kobbler_Tan_Nightstand.webp', hoverImage: '/images/bedroom/Kobbler_Tan_Nightstand (1).webp', badge: 'New', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 49, name: 'Pierre Nightstand', price: 29665, originalPrice: 34900, image: '/images/bedroom/Pierre_Nightstand.webp', hoverImage: '/images/bedroom/Pierre_Nightstand (1).webp', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 50, name: 'Zigzag Nightstand', price: 42415, originalPrice: 49900, image: '/images/bedroom/Zigzag_Nightstand.webp', status: 'Made To Order', emi: '₹ 4446.62', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 51, name: 'Vesto Nightstand', price: 32215, originalPrice: 37900, image: '/images/bedroom/Vesto_Nightstand.webp', status: 'Made To Order', emi: '₹ 3377.29', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 52, name: 'Airi Rattan Nightstand', price: 23715, originalPrice: 27900, image: '/images/bedroom/Airi_Rattan_Nightstand.webp', status: 'Made To Order', emi: '₹ 2486.19', category: 'Bedside Table', discount: 15, size: 'M' },
  { id: 53, name: 'Liva Nightstand', price: 29665, originalPrice: 34900, image: '/images/bedroom/Liva_Nightstand.webp', status: 'Made To Order', emi: '₹ 3109.96', category: 'Bedside Table', discount: 15, size: 'M' },
  
  // Chest of Drawers
  { id: 54, name: 'Alden Chest of Drawer (S)', price: 75960, originalPrice: 84400, image: '/images/bedroom/Alden_Chest_of_Drawer_S.webp', status: 'Made To Order', emi: '₹ 7963.35', category: 'Chest of Drawers', discount: 10, size: 'L' },
  { id: 55, name: 'Linden Chest Of Drawer', price: 137190, originalPrice: 161400, image: '/images/bedroom/Linden_Chest_Of_Drawer.webp', status: 'Made To Order', emi: '₹ 14382.46', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 56, name: 'Tambur Chest Of Drawer', price: 144415, originalPrice: 169900, image: '/images/bedroom/Tambur_Chest_Of_Drawer.webp', status: 'Made To Order', emi: '₹ 15139.9', category: 'Chest of Drawers', discount: 15, size: 'L' },
  { id: 57, name: 'Sueno Chest of Drawers | Storage Unit', price: 107100, originalPrice: 119000, image: '/images/bedroom/Sueno_Chest_of_Drawers_Storage_Unit.webp', status: 'Made To Order', emi: '₹ 11227.94', category: 'Chest of Drawers', discount: 10, size: 'L' },
  
  // Consoles
  { id: 58, name: 'Nestor Elements Console', price: 89925, originalPrice: 119900, image: '/images/bedroom/Nestor_Elements_Console.webp', status: 'Made To Order', emi: '₹ 9427.38', category: 'Consoles', discount: 25, size: 'L' },
  
  // Benches & Ottomans
  { id: 59, name: 'Meraki Upholstered Bench', price: 71250, originalPrice: 75000, image: '/images/bedroom/Meraki_Upholstered_Bench.webp', status: 'Made To Order', emi: '₹ 7469.57', category: 'Benches', discount: 5, size: 'L' },
  { id: 60, name: 'Ebba Ottoman', price: 52250, originalPrice: 55000, image: '/images/bedroom/Ebba_Ottoman.webp', status: 'Made To Order', emi: '₹ 5477.68', category: 'Ottomans', discount: 5, size: 'M' },
  { id: 61, name: 'Levi Upholstered Bench', price: 123405, originalPrice: 129900, image: '/images/bedroom/Levi_Upholstered_Bench.webp', badge: "Designer's Pick", status: 'Made To Order', emi: '₹ 12937.29', category: 'Benches', discount: 5, size: 'L' },
  { id: 62, name: 'Rever Bench', price: 51680, image: '/images/bedroom/Rever_Bench.webp', badge: 'New', status: 'Made To Order', emi: '₹ 5417.93', category: 'Benches', size: 'L' },
  { id: 63, name: 'Nestling Day Bench', price: 53900, image: '/images/bedroom/Nestling_Day_Bench.webp', hoverImage: '/images/bedroom/Nestling_Day_Bench (1).webp', status: 'Made To Order', emi: '₹ 5650.66', category: 'Benches', size: 'L' },
];

const categories = [
  { id: 1, name: 'Beds', image: '/images/bedroom/Beds-image.jpg' },
  { id: 2, name: 'Nightstands', image: '/images/bedroom/Nightstands-image.jpg' },
  { id: 3, name: 'Dressers', image: '/images/bedroom/Dressers-image.jpg' },
  { id: 4, name: 'Armoires | Wardrobes', image: '/images/bedroom/Armoires_Wardrobes-image.jpg' },
  { id: 5, name: 'Ottomans & Benches', image: '/images/bedroom/Ottomans_Benches-image.jpg' },
];

export default function BedroomPage() {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    price: { min: 0, max: 200000 },
    size: [] as string[],
    configuration: [] as string[],
    discount: 0,
  });
  const [sortBy, setSortBy] = useState('featured');
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
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
          <span className="text-gray-900">Bedroom</span>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bedroom</h1>

        {/* Category Carousel */}
        <div className="relative mb-12">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-4 min-w-[280px] p-4 border-2 border-gray-200 rounded-lg hover:border-orange-400 cursor-pointer transition-colors"
              >
                <div className="flex-1">
                  <span className="text-base font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
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
                <h4 className="font-medium mb-3">Product Type</h4>
                <div className="space-y-2">
                  {Object.entries(productTypeCounts).map(([type, count]) => (
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

              {/* Configuration */}
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
