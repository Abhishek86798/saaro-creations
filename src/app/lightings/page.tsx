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
  originalPrice?: number;
  discount?: number;
  image: string;
  image2?: string;
  status: 'NEW' | 'READY TO SHIP' | 'MADE TO ORDER' | 'SOLD OUT';
  category: 'Table Lamps' | 'Floor Lamps' | 'Pendant Lights' | 'Lighting';
  size?: string;
  emi: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Ciana Floor Lamp Nox - Set of 3',
    price: 69750,
    originalPrice: 93000,
    discount: 25,
    image: '/images/lightings/Ciana_Floor_Lamp_Nox_-_Set_of_3.webp',
    image2: '/images/lightings/Ciana_Floor_Lamp_Nox_-_Set_of_3 (1).webp',
    status: 'NEW',
    category: 'Floor Lamps',
    emi: 7312.31
  },
  {
    id: '2',
    name: 'Ciana Floor Lamp - Set of 3',
    price: 69750,
    originalPrice: 93000,
    discount: 25,
    image: '/images/lightings/Ciana_Floor_Lamp_-_Set_of_3.webp',
    status: 'NEW',
    category: 'Floor Lamps',
    emi: 7312.31
  },
  {
    id: '3',
    name: 'Ciana Table Lamp',
    price: 19800,
    originalPrice: 26400,
    discount: 25,
    image: '/images/lightings/Ciana_Table_Lamp.webp',
    image2: '/images/lightings/Ciana_Table_Lamp (1).webp',
    status: 'NEW',
    category: 'Table Lamps',
    emi: 2075.75
  },
  {
    id: '4',
    name: 'Ciana Floor Lamp - M',
    price: 24000,
    originalPrice: 32000,
    discount: 25,
    image: '/images/lightings/Ciana_Floor_Lamp_-_M.webp',
    image2: '/images/lightings/Ciana_Floor_Lamp_-_M (1).webp',
    status: 'NEW',
    category: 'Floor Lamps',
    size: 'M',
    emi: 2516.07
  },
  {
    id: '5',
    name: 'Ciana Floor Lamp - L',
    price: 29925,
    originalPrice: 39900,
    discount: 25,
    image: '/images/lightings/Ciana_Floor_Lamp_-_L.webp',
    image2: '/images/lightings/Ciana_Floor_Lamp_-_L (1).webp',
    status: 'NEW',
    category: 'Floor Lamps',
    size: 'L',
    emi: 3137.22
  },
  {
    id: '6',
    name: 'Candlevine Pendant Light',
    price: 25900,
    image: '/images/lightings/Candlevine_Pendant_Light.webp',
    image2: '/images/lightings/Candlevine_Pendant_Light (1).webp',
    status: 'READY TO SHIP',
    category: 'Pendant Lights',
    emi: 2715.25
  },
  {
    id: '7',
    name: 'Kasha Pendant Light',
    price: 23655,
    originalPrice: 24900,
    discount: 5,
    image: '/images/lightings/Kasha_Pendant_Light.webp',
    image2: '/images/lightings/Kasha_Pendant_Light (1).webp',
    status: 'NEW',
    category: 'Pendant Lights',
    emi: 2479.9
  },
  {
    id: '8',
    name: 'Frost Cascade Pendant Light',
    price: 24900,
    image: '/images/lightings/Frost_Cascade_Pendant_Light.webp',
    image2: '/images/lightings/Frost_Cascade_Pendant_Light (1).webp',
    status: 'SOLD OUT',
    category: 'Pendant Lights',
    emi: 2610.42
  },
  {
    id: '9',
    name: 'Tassia Table Lamp',
    price: 19380,
    originalPrice: 22800,
    discount: 15,
    image: '/images/lightings/Tassia_Table_Lamp.webp',
    status: 'NEW',
    category: 'Table Lamps',
    emi: 2031.72
  },
  {
    id: '10',
    name: 'Cirella Table Lamp',
    price: 24140,
    originalPrice: 28400,
    discount: 15,
    image: '/images/lightings/Cirella_Table_Lamp.webp',
    image2: '/images/lightings/Cirella_Table_Lamp (1).webp',
    status: 'NEW',
    category: 'Table Lamps',
    emi: 2530.74
  },
  {
    id: '11',
    name: 'Orvia Table Lamp',
    price: 19380,
    originalPrice: 22800,
    discount: 15,
    image: '/images/lightings/Orvia_Table_Lamp.webp',
    image2: '/images/lightings/Orvia_Table_Lamp (1).webp',
    status: 'NEW',
    category: 'Table Lamps',
    emi: 2031.72
  },
  {
    id: '12',
    name: 'Rustique Pendant Light',
    price: 29665,
    originalPrice: 34900,
    discount: 15,
    image: '/images/lightings/Rustique_Pendant_Light.webp',
    image2: '/images/lightings/Rustique_Pendant_Light (1).webp',
    status: 'NEW',
    category: 'Pendant Lights',
    emi: 3109.96
  },
  {
    id: '13',
    name: 'Twilight Pendant Light',
    price: 22950,
    originalPrice: 27000,
    discount: 15,
    image: '/images/lightings/Twilight_Pendant_Light.webp',
    image2: '/images/lightings/Twilight_Pendant_Light (1).webp',
    status: 'READY TO SHIP',
    category: 'Pendant Lights',
    emi: 2405.99
  },
  {
    id: '14',
    name: 'Concha Pendant Light-XS',
    price: 8010,
    originalPrice: 8900,
    discount: 10,
    image: '/images/lightings/Concha_Pendant_Light-XS.webp',
    status: 'READY TO SHIP',
    category: 'Pendant Lights',
    emi: 839.74
  },
  {
    id: '15',
    name: 'Giya Cemento Table Lamp - White',
    price: 21675,
    originalPrice: 25500,
    discount: 15,
    image: '/images/lightings/Giya_Cemento_Table_Lamp_-_White.webp',
    image2: '/images/lightings/Giya_Cemento_Table_Lamp_-_White (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 2272.32
  },
  {
    id: '16',
    name: 'Giya Cemento Table Lamp - Black',
    price: 21675,
    originalPrice: 25500,
    discount: 15,
    image: '/images/lightings/Giya_Cemento_Table_Lamp_-_Black.webp',
    image2: '/images/lightings/Giya_Cemento_Table_Lamp_-_Black (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 2272.32
  },
  {
    id: '17',
    name: 'Samudra-Mudka Terracotta Table Lamp - Green',
    price: 24140,
    originalPrice: 28400,
    discount: 15,
    image: '/images/lightings/Samudra-Mudka_Terracotta_Table_Lamp_-_Green.webp',
    image2: '/images/lightings/Samudra-Mudka_Terracotta_Table_Lamp_-_Green (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 2530.74
  },
  {
    id: '18',
    name: 'Creo Cemento Tall Floor Lamp - Black',
    price: 48450,
    originalPrice: 57000,
    discount: 15,
    image: '/images/lightings/Creo_Cemento_Tall_Floor_Lamp_-_Black.webp',
    image2: '/images/lightings/Creo_Cemento_Tall_Floor_Lamp_-_Black (1).webp',
    status: 'SOLD OUT',
    category: 'Floor Lamps',
    emi: 5079.31
  },
  {
    id: '19',
    name: 'Creo Cemento Tall Floor Lamp- White',
    price: 48450,
    originalPrice: 57000,
    discount: 15,
    image: '/images/lightings/Creo_Cemento_Tall_Floor_Lamp-_White.webp',
    image2: '/images/lightings/Creo_Cemento_Tall_Floor_Lamp-_White (1).webp',
    status: 'SOLD OUT',
    category: 'Floor Lamps',
    emi: 5079.31
  },
  {
    id: '20',
    name: 'Mrinal-Mudka Terracotta Table Lamp - Black (L)',
    price: 32640,
    originalPrice: 38400,
    discount: 15,
    image: '/images/lightings/Mrinal-Mudka_Terracotta_Table_Lamp_-_Black_L.webp',
    image2: '/images/lightings/Mrinal-Mudka_Terracotta_Table_Lamp_-_Black_L (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    size: 'L',
    emi: 3421.85
  },
  {
    id: '21',
    name: 'Mrinal-Mudka Terracotta Table Lamp (L)',
    price: 32640,
    originalPrice: 38400,
    discount: 15,
    image: '/images/lightings/Mrinal-Mudka_Terracotta_Table_Lamp_L.webp',
    image2: '/images/lightings/Mrinal-Mudka_Terracotta_Table_Lamp_L (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    size: 'L',
    emi: 3421.85
  },
  {
    id: '22',
    name: 'Prithvi-Mudka Terracotta Table Lamp (L)',
    price: 24140,
    originalPrice: 28400,
    discount: 15,
    image: '/images/lightings/Prithvi-Mudka_Terracotta_Table_Lamp_L.webp',
    image2: '/images/lightings/Prithvi-Mudka_Terracotta_Table_Lamp_L (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    size: 'L',
    emi: 2530.74
  },
  {
    id: '23',
    name: 'Mudra Artisan Table Lamp - Black - Oversized',
    price: 59415,
    originalPrice: 69900,
    discount: 15,
    image: '/images/lightings/Mudra_Artisan_Table_Lamp_-_Black_-_Oversized.webp',
    image2: '/images/lightings/Mudra_Artisan_Table_Lamp_-_Black_-_Oversized (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 6228.83
  },
  {
    id: '24',
    name: 'Mudra Artisan Table Lamp - Terracotta - Oversized',
    price: 59415,
    originalPrice: 69900,
    discount: 15,
    image: '/images/lightings/Mudra_Artisan_Table_Lamp_-_Terracotta_-_Oversized.webp',
    image2: '/images/lightings/Mudra_Artisan_Table_Lamp_-_Terracotta_-_Oversized (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 6228.83
  },
  {
    id: '25',
    name: 'Ciana Table Lamp - Nox',
    price: 20250,
    originalPrice: 27000,
    discount: 25,
    image: '/images/lightings/Ciana_Table_Lamp_-_Nox.webp',
    status: 'MADE TO ORDER',
    category: 'Table Lamps',
    emi: 2122.93
  },
  {
    id: '26',
    name: 'Ciana Floor Lamp - Nox M',
    price: 30400,
    originalPrice: 32000,
    discount: 5,
    image: '/images/lightings/Ciana_Floor_Lamp_-_Nox_M.webp',
    image2: '/images/lightings/Ciana_Floor_Lamp_-_Nox_M (1).webp',
    status: 'MADE TO ORDER',
    category: 'Floor Lamps',
    size: 'M',
    emi: 3187.02
  },
  {
    id: '27',
    name: 'Ciana Floor Lamp - Nox L',
    price: 35530,
    originalPrice: 37400,
    discount: 5,
    image: '/images/lightings/Ciana_Floor_Lamp_-_Nox_L.webp',
    image2: '/images/lightings/Ciana_Floor_Lamp_-_Nox_L (1).webp',
    status: 'MADE TO ORDER',
    category: 'Floor Lamps',
    size: 'L',
    emi: 3724.82
  },
  {
    id: '28',
    name: 'Zaire Heritage Table Lamp - Oversized',
    price: 35910,
    originalPrice: 39900,
    discount: 10,
    image: '/images/lightings/Zaire_Heritage_Table_Lamp_-_Oversized.webp',
    status: 'MADE TO ORDER',
    category: 'Table Lamps',
    emi: 3764.66
  },
  {
    id: '29',
    name: 'Lyra Glass Table Lamp - Clear',
    price: 23760,
    originalPrice: 26400,
    discount: 10,
    image: '/images/lightings/Lyra_Glass_Table_Lamp_-_Clear.webp',
    image2: '/images/lightings/Lyra_Glass_Table_Lamp_-_Clear (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 2490.9
  },
  {
    id: '30',
    name: 'Lyra Glass Table Lamp - Amber',
    price: 24750,
    originalPrice: 27500,
    discount: 10,
    image: '/images/lightings/Lyra_Glass_Table_Lamp_-_Amber.webp',
    image2: '/images/lightings/Lyra_Glass_Table_Lamp_-_Amber (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 2594.69
  },
  {
    id: '31',
    name: 'Orla Circle Table Lamp - Pristine White',
    price: 11830,
    originalPrice: 16900,
    discount: 30,
    image: '/images/lightings/Orla_Circle_Table_Lamp_-_Pristine_White.webp',
    image2: '/images/lightings/Orla_Circle_Table_Lamp_-_Pristine_White (1).webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 1240.21
  },
  {
    id: '32',
    name: 'Orla Circle Table Lamp - Indigo',
    price: 11830,
    originalPrice: 16900,
    discount: 30,
    image: '/images/lightings/Orla_Circle_Table_Lamp_-_Indigo.webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 1240.21
  },
  {
    id: '33',
    name: 'Orla Circle Table Lamp - Sage Green',
    price: 11830,
    originalPrice: 16900,
    discount: 30,
    image: '/images/lightings/Orla_Circle_Table_Lamp_-_Sage_Green.webp',
    image2: '/images/lightings/Orla_Circle_Table_Lamp_-_Sage_Green (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 1240.21
  },
  {
    id: '34',
    name: 'Brie Glass Table Lamp - Amber',
    price: 19710,
    originalPrice: 21900,
    discount: 10,
    image: '/images/lightings/Brie_Glass_Table_Lamp_-_Amber.webp',
    image2: '/images/lightings/Brie_Glass_Table_Lamp_-_Amber (1).webp',
    status: 'READY TO SHIP',
    category: 'Table Lamps',
    emi: 2066.32
  },
  {
    id: '35',
    name: 'Ersa Ribbed Glass Table Lamp - Clear',
    price: 13860,
    originalPrice: 15400,
    discount: 10,
    image: '/images/lightings/Ersa_Ribbed_Glass_Table_Lamp_-_Clear.webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 1453.03
  },
  {
    id: '36',
    name: 'Ersa Ribbed Glass Table Lamp- Amber',
    price: 13860,
    originalPrice: 15400,
    discount: 10,
    image: '/images/lightings/Ersa_Ribbed_Glass_Table_Lamp-_Amber.webp',
    status: 'SOLD OUT',
    category: 'Table Lamps',
    emi: 1453.03
  }
];

export default function LightingsPage() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = React.useState('featured');
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);

  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  const categoryCount = {
    'Table Lamps': products.filter(p => p.category === 'Table Lamps').length,
    'Floor Lamps': products.filter(p => p.category === 'Floor Lamps').length,
    'Pendant Lights': products.filter(p => p.category === 'Pendant Lights').length,
    'Lighting': products.filter(p => p.category === 'Lighting').length,
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
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
    if (selectedSizes.length > 0 && product.size && !selectedSizes.includes(product.size)) {
      return false;
    }
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    if (selectedDiscounts.length > 0) {
      if (selectedDiscounts.includes('10% and above') && (!product.discount || product.discount < 10)) {
        return false;
      }
      if (selectedDiscounts.includes('20% and above') && (!product.discount || product.discount < 20)) {
        return false;
      }
      if (selectedDiscounts.includes('30% and above') && (!product.discount || product.discount < 30)) {
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
            <Link href="/accents" className="hover:text-gray-900">Accents</Link>
            <span>/</span>
            <span className="text-gray-900">Lightings</span>
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
                <ChevronDown className="h-4 w-4" />
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
                  placeholder="₹ 100000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-28 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Size</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {['L', 'S', 'M'].map((size) => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{size}</span>
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
                      product.status === 'SOLD OUT' ? 'bg-red-100 text-red-700' :
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
                    {product.originalPrice && (
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
