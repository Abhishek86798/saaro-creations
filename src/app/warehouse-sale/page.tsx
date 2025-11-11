'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronDown } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  image2?: string;
  status: 'NEW' | 'READY TO SHIP' | 'MADE TO ORDER';
  category: string;
  configuration?: string;
  emi: number;
}

const products: Product[] = [
  {
    id: 'preston-lounge-chair',
    name: 'Preston Curved Lounge Chair - Manuka Honey',
    price: 130625,
    originalPrice: 137500,
    discount: 5,
    image: '/images/warehouse/Preston_Curved_Lounge_Chair_-_Manuka_Honey.webp',
    status: 'NEW',
    category: 'Accent | Lounge Chairs',
    emi: 13694.21
  },
  {
    id: 'preston-loveseat',
    name: 'Preston Curved Loveseat - Manuka Honey',
    price: 199500,
    originalPrice: 210000,
    discount: 5,
    image: '/images/warehouse/Preston_Curved_Loveseat_-_Manuka_Honey.webp',
    status: 'NEW',
    category: '2-Seater Sofas',
    emi: 20914.79
  },
  {
    id: 'preston-three-seater',
    name: 'Preston Curved Three Seater Sofa - Manuka Honey',
    price: 289750,
    originalPrice: 305000,
    discount: 5,
    image: '/images/warehouse/Preston_Curved_Three_Seater_Sofa_-_Manuka_Honey.webp',
    status: 'NEW',
    category: '3-Seater Sofas',
    emi: 30376.25
  },
  {
    id: 'toko-lounger',
    name: 'Toko Curved Lounger',
    price: 100700,
    originalPrice: 106000,
    discount: 5,
    image: '/images/warehouse/Toko_Curved_Lounger.webp',
    image2: '/images/warehouse/Toko_Curved_Lounger (1).webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 10556.99
  },
  {
    id: 'tess-curved-sofa',
    name: 'Tess Curved Sofa',
    price: 198600,
    originalPrice: 198600,
    discount: 0,
    image: '/images/warehouse/Tess_Curved_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 20820.44
  },
  {
    id: 'arque-curved-sofa',
    name: 'Arque Curved Sofa',
    price: 218500,
    originalPrice: 230000,
    discount: 5,
    image: '/images/warehouse/Arque_Curved_Sofa.webp',
    image2: '/images/warehouse/Arque_Curved_Sofa (1).webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 22906.68
  },
  {
    id: 'marlow-single-seater',
    name: 'Marlow Single Seater Sofa',
    price: 120700,
    originalPrice: 142000,
    discount: 15,
    image: '/images/warehouse/Marlow_Single_Seater_Sofa.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 12653.71
  },
  {
    id: 'marlow-four-seater',
    name: 'Marlow Four Seater Sofa',
    price: 242675,
    originalPrice: 285500,
    discount: 15,
    image: '/images/warehouse/Marlow_Four_Seater_Sofa.webp',
    image2: '/images/warehouse/Marlow_Four_Seater_Sofa (1).webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 25441.09
  },
  {
    id: 'marlow-chaise-sectional',
    name: 'Marlow Chaise Sectional Sofa',
    price: 413725,
    originalPrice: 435500,
    discount: 5,
    image: '/images/warehouse/Marlow_Chaise_Sectional_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 43373.3
  },
  {
    id: 'paulo-sectional',
    name: 'Paulo Sectional Sofa',
    price: 357000,
    originalPrice: 420000,
    discount: 15,
    image: '/images/warehouse/Paulo_Sectional_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 37426.47
  },
  {
    id: 'hebron-330',
    name: 'Hebron Chaise Sectional Sofa with Storage 330',
    price: 223890,
    originalPrice: 263400,
    discount: 15,
    image: '/images/warehouse/Hebron_Chaise_Sectional_Sofa_with_Storage_330.webp',
    status: 'MADE TO ORDER',
    category: 'Corner Sofas',
    configuration: 'Right Arm Chaise',
    emi: 23471.74
  },
  {
    id: 'hebron-370',
    name: 'Hebron Chaise Sectional Sofa with Storage 370',
    price: 249280,
    originalPrice: 262400,
    discount: 5,
    image: '/images/warehouse/Hebron_Chaise_Sectional_Sofa_with_Storage_370.webp',
    status: 'MADE TO ORDER',
    category: 'Corner Sofas',
    configuration: 'Right Arm Chaise',
    emi: 26133.53
  },
  {
    id: 'hebron-340',
    name: 'Hebron Chaise Sectional Sofa with Storage 340',
    price: 233665,
    originalPrice: 274900,
    discount: 15,
    image: '/images/warehouse/Hebron_Chaise_Sectional_Sofa_with_Storage_340.webp',
    status: 'MADE TO ORDER',
    category: 'Corner Sofas',
    emi: 24496.52
  },
  {
    id: 'jake-modular',
    name: 'Jake Modular Sectional Sofa',
    price: 333200,
    originalPrice: 392000,
    discount: 15,
    image: '/images/warehouse/Jake_Modular_Sectional_Sofa.webp',
    image2: '/images/warehouse/Jake_Modular_Sectional_Sofa (1).webp',
    status: 'MADE TO ORDER',
    category: 'Modular Sofas',
    emi: 34931.37
  },
  {
    id: 'zenora-three-seater',
    name: 'Zenora Three-Seater Sofa',
    price: 185250,
    originalPrice: 195000,
    discount: 5,
    image: '/images/warehouse/Zenora_Three-Seater_Sofa.webp',
    status: 'READY TO SHIP',
    category: '3-Seater Sofas',
    emi: 19420.88
  },
  {
    id: 'eloise-three-seater',
    name: 'Eloise Three Seater Sofa',
    price: 178030,
    originalPrice: 187400,
    discount: 5,
    image: '/images/warehouse/Eloise_Three_Seater_Sofa.webp',
    status: 'NEW',
    category: '3-Seater Sofas',
    emi: 18663.96
  },
  {
    id: 'marcus-3-seater',
    name: 'Marcus Chesterfield 3 Seater Sofa',
    price: 238000,
    originalPrice: 280000,
    discount: 15,
    image: '/images/warehouse/Marcus_Chesterfield_3_Seater_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 24950.98
  },
  {
    id: 'alonzo-accent',
    name: 'Alonzo Accent Chair - Charlotte 500',
    price: 76415,
    originalPrice: 89900,
    discount: 15,
    image: '/images/warehouse/Alonzo_Accent_Chair_-_Charlotte_500.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 8011.05
  },
  {
    id: 'akito-sectional',
    name: 'Akito Sectional Sofa',
    price: 378100,
    originalPrice: 398000,
    discount: 5,
    image: '/images/warehouse/Akito_Sectional_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 39638.51
  },
  {
    id: 'chelsea-modular',
    name: 'Chelsea Modular Sofa',
    price: 306000,
    originalPrice: 360000,
    discount: 15,
    image: '/images/warehouse/Chelsea_Modular_Sofa.webp',
    status: 'MADE TO ORDER',
    category: 'Modular Sofas',
    emi: 32079.83
  },
  {
    id: 'chelsea-modular-linen',
    name: 'Chelsea Modular Sofa - Linen',
    price: 323000,
    originalPrice: 380000,
    discount: 15,
    image: '/images/warehouse/Chelsea_Modular_Sofa_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: 'Modular Sofas',
    emi: 33862.04
  },
  {
    id: 'bryant-three-seater',
    name: 'Bryant Three Seater Sofa',
    price: 195500,
    originalPrice: 230000,
    discount: 15,
    image: '/images/warehouse/Bryant_Three_Seater_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 20495.45
  },
  {
    id: 'bryant-three-seater-linen',
    name: 'Bryant Three Seater Sofa - Linen',
    price: 204000,
    originalPrice: 240000,
    discount: 15,
    image: '/images/warehouse/Bryant_Three_Seater_Sofa_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 21386.55
  },
  {
    id: 'bryant-lounge-linen',
    name: 'Bryant Lounge Sofa - Linen',
    price: 112100,
    originalPrice: 118000,
    discount: 5,
    image: '/images/warehouse/Bryant_Lounge_Sofa_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 11752.12
  },
  {
    id: 'bryant-lounge',
    name: 'Bryant Lounge Sofa',
    price: 103455,
    originalPrice: 108900,
    discount: 5,
    image: '/images/warehouse/Bryant_Lounge_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 10845.81
  },
  {
    id: 'langston-four-seater',
    name: 'Langston Slipcover Four Seater',
    price: 272000,
    originalPrice: 320000,
    discount: 15,
    image: '/images/warehouse/Langston_Slipcover_Four_Seater.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 28515.41
  },
  {
    id: 'langston-four-seater-linen',
    name: 'Langston Slipcover Four Seater - Linen',
    price: 280500,
    originalPrice: 330000,
    discount: 15,
    image: '/images/warehouse/Langston_Slipcover_Four_Seater_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 29406.51
  },
  {
    id: 'ruth-three-seater-linen',
    name: 'Ruth Slipcover Three Seater - Split Seat - Linen',
    price: 212500,
    originalPrice: 250000,
    discount: 15,
    image: '/images/warehouse/Ruth_Slipcover_Three_Seater_-_Split_Seat_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 22277.66
  },
  {
    id: 'ruth-three-seater',
    name: 'Ruth Slipcover Three Seater - Split Seat',
    price: 204000,
    originalPrice: 240000,
    discount: 15,
    image: '/images/warehouse/Ruth_Slipcover_Three_Seater_-_Split_Seat.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 21386.55
  },
  {
    id: 'ruth-lounge-linen',
    name: 'Ruth Slipcover Lounge Sofa - Linen',
    price: 120650,
    originalPrice: 127000,
    discount: 5,
    image: '/images/warehouse/Ruth_Slipcover_Lounge_Sofa_-_Linen.webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 12648.47
  },
  {
    id: 'ruth-lounge',
    name: 'Ruth Slipcover Lounge Sofa',
    price: 111150,
    originalPrice: 117000,
    discount: 5,
    image: '/images/warehouse/Ruth_Slipcover_Lounge_Sofa.webp',
    status: 'READY TO SHIP',
    category: '2-Seater Sofas',
    emi: 11652.53
  },
  {
    id: 'silas-single-seater',
    name: 'Silas Rattan Single Seater',
    price: 81600,
    originalPrice: 96000,
    discount: 15,
    image: '/images/warehouse/Silas_Rattan_Single_Seater.webp',
    image2: '/images/warehouse/Silas_Rattan_Single_Seater (1).webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 8554.62
  },
  {
    id: 'keny-grass-loveseat',
    name: 'Keny Grass Boucle Loveseat',
    price: 119000,
    originalPrice: 140000,
    discount: 15,
    image: '/images/warehouse/Keny_Grass_Boucle_Loveseat.webp',
    image2: '/images/warehouse/Keny_Grass_Boucle_Loveseat (1).webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 12475.49
  },
  {
    id: 'keny-wine-loveseat',
    name: 'Keny Wine Boucle Loveseat',
    price: 119000,
    originalPrice: 140000,
    discount: 15,
    image: '/images/warehouse/Keny_Wine_Boucle_Loveseat.webp',
    image2: '/images/warehouse/Keny_Wine_Boucle_Loveseat (1).webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 12475.49
  },
  {
    id: 'keny-grass-club',
    name: 'Keny Grass Boucle Club Sofa',
    price: 84915,
    originalPrice: 99900,
    discount: 15,
    image: '/images/warehouse/Keny_Grass_Boucle_Club_Sofa.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 8902.15
  },
  {
    id: 'keny-wine-club',
    name: 'Keny Wine Boucle Club Sofa',
    price: 84915,
    originalPrice: 99900,
    discount: 15,
    image: '/images/warehouse/Keny_Wine_Boucle_Club_Sofa.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 8902.15
  },
  {
    id: 'silas-three-seater',
    name: 'Silas Rattan Three Seater',
    price: 144500,
    originalPrice: 170000,
    discount: 15,
    image: '/images/warehouse/Silas_Rattan_Three_Seater.webp',
    image2: '/images/warehouse/Silas_Rattan_Three_Seater (1).webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 15148.81
  },
  {
    id: 'abaca-three-seater',
    name: 'Abaca Three Seater',
    price: 110600,
    originalPrice: 158000,
    discount: 30,
    image: '/images/warehouse/Abaca_Three_Seater.webp',
    status: 'READY TO SHIP',
    category: '3-Seater Sofas',
    emi: 11594.87
  },
  {
    id: 'miller-three-seater',
    name: 'Miller Three Seater Sofa',
    price: 180000,
    originalPrice: 240000,
    discount: 25,
    image: '/images/warehouse/Miller_Three_Seater_Sofa.webp',
    image2: '/images/warehouse/Miller_Three_Seater_Sofa (1).webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 18870.49
  },
  {
    id: 'miller-sectional',
    name: 'Miller Sectional Sofa',
    price: 289000,
    originalPrice: 289000,
    discount: 0,
    image: '/images/warehouse/Miller_Sectional_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 30297.62
  },
  {
    id: 'nicholas-lounge',
    name: 'Nicholas Lounge Chair',
    price: 90000,
    originalPrice: 120000,
    discount: 25,
    image: '/images/warehouse/Nicholas_Lounge_Chair.webp',
    image2: '/images/warehouse/Nicholas_Lounge_Chair (1).webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 9435.24
  },
  {
    id: 'vincent-accent',
    name: 'Vincent Accent Chair',
    price: 89300,
    originalPrice: 94000,
    discount: 5,
    image: '/images/warehouse/Vincent_Accent_Chair.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 9361.86
  },
  {
    id: 'akito-single-seater',
    name: 'Akito Single Seater',
    price: 133000,
    originalPrice: 140000,
    discount: 5,
    image: '/images/warehouse/Akito_Single_Seater.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 13943.19
  },
  {
    id: 'akito-three-seater',
    name: 'Akito Three Seater Sofa',
    price: 245100,
    originalPrice: 258000,
    discount: 5,
    image: '/images/warehouse/Akito_Three_Seater_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '3-Seater Sofas',
    emi: 25695.32
  },
  {
    id: 'abaca-lounge',
    name: 'Abaca Lounge Chair',
    price: 65800,
    originalPrice: 94000,
    discount: 30,
    image: '/images/warehouse/Abaca_Lounge_Chair.webp',
    status: 'READY TO SHIP',
    category: 'Accent | Lounge Chairs',
    emi: 6898.21
  },
  {
    id: 'harbour-loveseat',
    name: 'Harbour Loveseat',
    price: 106800,
    originalPrice: 142400,
    discount: 25,
    image: '/images/warehouse/Harbour_Loveseat.webp',
    status: 'MADE TO ORDER',
    category: '2-Seater Sofas',
    emi: 11196.49
  },
  {
    id: 'harbour-single',
    name: 'Harbour Single Seater',
    price: 74925,
    originalPrice: 99900,
    discount: 25,
    image: '/images/warehouse/Harbour_Single_Seater.webp',
    status: 'MADE TO ORDER',
    category: 'Accent | Lounge Chairs',
    emi: 7854.84
  },
  {
    id: 'marcus-4-seater',
    name: 'Marcus Chesterfield 4 Seater Sofa',
    price: 283425,
    originalPrice: 377900,
    discount: 25,
    image: '/images/warehouse/Marcus_Chesterfield_4_Seater_Sofa.webp',
    status: 'MADE TO ORDER',
    category: '4-Seater & Large Sofas',
    emi: 29706.86
  }
];

export default function WarehouseSalePage() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedConfigurations, setSelectedConfigurations] = React.useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 500000 });
  const [sortBy, setSortBy] = React.useState('featured');
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);

  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  const categoryCount = {
    'Accent | Lounge Chairs': products.filter(p => p.category === 'Accent | Lounge Chairs').length,
    'Corner Sofas': products.filter(p => p.category === 'Corner Sofas').length,
    '3-Seater Sofas': products.filter(p => p.category === '3-Seater Sofas').length,
    '4-Seater & Large Sofas': products.filter(p => p.category === '4-Seater & Large Sofas').length,
    '2-Seater Sofas': products.filter(p => p.category === '2-Seater Sofas').length,
    'Daybeds & Diwans': products.filter(p => p.category === 'Daybeds & Diwans').length,
    'Modular Sofas': products.filter(p => p.category === 'Modular Sofas').length,
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleConfiguration = (config: string) => {
    setSelectedConfigurations(prev =>
      prev.includes(config) ? prev.filter(c => c !== config) : [...prev, config]
    );
  };

  const toggleDiscount = (discount: string) => {
    setSelectedDiscounts(prev =>
      prev.includes(discount) ? prev.filter(d => d !== discount) : [...prev, discount]
    );
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (selectedConfigurations.length > 0 && product.configuration && !selectedConfigurations.includes(product.configuration)) {
      return false;
    }
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    if (selectedDiscounts.length > 0) {
      if (selectedDiscounts.includes('10% and above') && product.discount < 10) {
        return false;
      }
      if (selectedDiscounts.includes('20% and above') && product.discount < 20) {
        return false;
      }
      if (selectedDiscounts.includes('30% and above') && product.discount < 30) {
        return false;
      }
    }
    return true;
  });

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistToggle = (product: Product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image
      });
    }
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
            <Link href="/furniture/living" className="hover:text-gray-900">Living</Link>
            <span>/</span>
            <span className="text-gray-900">Sofas & Sectionals</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-6">Browse by</h3>

            {/* Product Type */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Product Type</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {Object.entries(categoryCount).map(([category, count]) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      {category} <span className="text-gray-500">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Price</h4>
                <button className="text-sm text-orange-500">Clear</button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-20 px-2 py-1 border rounded text-sm"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="₹ 500000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-28 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>

            {/* Select Configuration */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Select Configuration</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {['Right Arm Chaise', 'Left Arm Chaise'].map((config) => (
                  <label key={config} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedConfigurations.includes(config)}
                      onChange={() => toggleConfiguration(config)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{config} ({config === 'Right Arm Chaise' ? '6' : '4'})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Discount</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {['10% and above', '20% and above', '30% and above'].map((discount) => (
                  <label key={discount} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDiscounts.includes(discount)}
                      onChange={() => toggleDiscount(discount)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{discount}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{filteredProducts.length} Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort:</span>
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square mb-3 overflow-hidden bg-gray-100">
                    {/* Status Badge */}
                    {product.status === 'NEW' && (
                      <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 z-10">
                        NEW
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>

                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === product.id && product.image2 ? product.image2 : product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Status Label */}
                  <div className="mb-2">
                    <span className={`text-xs px-2 py-1 ${
                      product.status === 'MADE TO ORDER' ? 'bg-gray-100 text-gray-700' :
                      product.status === 'READY TO SHIP' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Product Info */}
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm mb-2 hover:text-gray-600">{product.name}</h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-orange-500">{product.discount}%Off</span>
                      </>
                    )}
                  </div>

                  {/* EMI */}
                  <p className="text-xs text-orange-500">
                    EMI starts from ₹ {product.emi.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
